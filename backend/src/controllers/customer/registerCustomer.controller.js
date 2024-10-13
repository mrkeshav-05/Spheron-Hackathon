import { Customer } from "../../models/customer.model.js";
import { ApiError } from "../../utils/error/ApiError.js";
import { ApiResponse } from "../../utils/response/ApiResponse.js";
import { asyncHandler } from "../../utils/error/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloud/cloudinary.js";


const registerCustomer = asyncHandler(async (req, res, next) => {
  // steps to register a user ---
    // 1. get the user details from frontend(client)
    // 2. validation - not empty string
    // 3. check if the user is already registered: email, username
    // 4. check for avatar, check for images
    // 5. upload them on cludinary, avatar
    // 6. create a object of user -  create entry in the database
    //   (as respoonse from the database it give as it is do we have to hide the password and other details)
    // 7. remove password and refreshToken from the response
    // 8. check the user creation 
    // 9. send the response back to the client
  
  try {
    const { username, email, password, favoriteGeneres } = req.body;
    console.log(username, email, password, favoriteGeneres);
    if(
      [ username, email, password ].some((field)=>{
        field?.trim() === ""
      })
    ){
      throw new ApiError(400, "All fields are required");
    }
    // check if the user is already registered
    const existingCustomer = await Customer.findOne(
      {
        $or: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() }
        ]
      }
    ).then((customer)=>{
      if(customer){
        throw new ApiError(409, "User already exists with this email or username");
      }
    }).catch((error)=>{
      throw new ApiError(500, error.message);
    });
    // console.log(customer)
    if(existingCustomer){
      throw new ApiError(409, "User already exists !!!");
    }

    let profilePicture = "";
    const profilePictureLocalPath = req.files?.profilePicture[0].path;
    if (profilePictureLocalPath) {
      profilePicture = await uploadOnCloudinary(profilePictureLocalPath); // Upload only if present
      if (!profilePicture) {
        throw new ApiError(400, "Avatar upload failed");
      }
    }
    console.log(profilePicture);

  
    const newCustomer = await Customer.create({
      username,
      email: email.toLowerCase(),
      password,
      profilePicture: profilePicture?.url || "",
      favoriteGeneres: favoriteGeneres || []
    })
    console.log(newCustomer);
    
    const createdCustomer = await Customer.findById(newCustomer._id).select(
      "-password -refreshToken",
    );
    console.log(createdCustomer);
    if(!createdCustomer){
      throw new ApiError(500, "Somthing went wrong while entering the customer in the database");
    }
    
    return res
    .status(201)
    .json(
      new ApiResponse(201, "Register Successfully please check your email to verify.", createdCustomer)
    )
  } catch (error) {
    throw new ApiError(500, error.message);
  }

})

export {
  registerCustomer,
}