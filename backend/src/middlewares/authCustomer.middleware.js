import { Customer } from "../models/customer.model.js";
import { ApiError } from "../utils/error/ApiError.js";
import { asyncHandler } from "../utils/error/asyncHandler.js";
import jwt from "jsonwebtoken";
export const verifyJWTForCustomer = asyncHandler(async (req, res, next) => {
  try {
    const tokenFromCustomer = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if(!tokenFromCustomer){
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(tokenFromCustomer, process.env.ACCESS_TOKEN_SECRET);
  // decodeToken has some things like - _id, payloads, etc.
  // this is find the user by their id in the decodedToken
    const CustomerWithDecodedTokenId = await Customer.findById(decodedToken?._id).select("-password -refreshToken");
    if(!ArtistWithDecodedTokenId){
      throw new ApiError(401, "Invalid Access Token");
    }
    console.log(CustomerWithDecodedTokenId);
    req.customer = CustomerWithDecodedTokenId;

    next();

  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token")
  }
});