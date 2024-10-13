import { Customer } from "../../models/customer.model.js";
import { ApiError } from "../../utils/error/ApiError.js";
import { ApiResponse } from "../../utils/response/ApiResponse.js";
import { asyncHandler } from "../../utils/error/asyncHandler.js";
import { generateAccessAndRefreshToken } from "../../utils/auth/generateAccessAndRefreshToken.js";

const loginCustomer = asyncHandler(async (req, res) => {
  try {
    const { email, username, password } = req.body; // Destructure username as well
    console.log(email, username);

    // Check if either email or username and password are provided
    if ((!email && !username) || !password) {
      throw new ApiError(400, "Email or username and password are required");
    }

    // Find user by email or username
    const existingCustomer = await Customer.findOne({
      $or: [
        { email: email?.toLowerCase() },
        { username: username?.toLowerCase() }
      ]
    });

    if (!existingCustomer) {
      throw new ApiError(404, "User not found");
    }

    // Check password
    const isPasswordValid = await existingCustomer.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid credentials");
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(existingCustomer._id);

    // Remove sensitive information from the response
    const loggedInCustomer = await Customer.findById(existingCustomer._id).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, "Customer logged in successfully", loggedInCustomer)
      );

  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export {
  loginCustomer,
};
