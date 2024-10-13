import { Artist } from "../models/artist.model.js";
import { ApiError } from "../utils/error/ApiError.js";
import { asyncHandler } from "../utils/error/asyncHandler.js";
import jwt from "jsonwebtoken";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const tokenFromArtist = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if(!tokenFromArtist){
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(tokenFromArtist, process.env.ACCESS_TOKEN_SECRET);
  // decodeToken has some things like - _id, payloads, etc.
  // this is find the user by their id in the decodedToken
    const ArtistWithDecodedTokenId = await Artist.findById(decodedToken?._id).select("-password -refreshToken");
    if(!ArtistWithDecodedTokenId){
      throw new ApiError(401, "Invalid Access Token");
    }
    console.log(ArtistWithDecodedTokenId);
    req.artist = ArtistWithDecodedTokenId;

    next();

  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token")
  }
});