import { Artist } from "../../models/artist.model.js";
import { ApiError } from "../../utils/error/ApiError.js";
import { ApiResponse } from "../../utils/response/ApiResponse.js";
import { asyncHandler } from "../../utils/error/asyncHandler.js";
import { generateAccessAndRefreshTokenForArtist } from "../../utils/auth/generateAccessAndRefreshTokenForArtist.js";

const loginArtist = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body; // Destructure username as well
    console.log(email, password);

    // Check if either email or username and password are provided
    if ((!email) || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    // Find user by email or username
    const existingArtist = await Artist.findOne({
      email: email?.toLowerCase()
    });

    if (!existingArtist) {
      throw new ApiError(404, "User not found");
    }

    // Check password
    const isPasswordValid = await existingArtist.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid credentials");
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokenForArtist(existingArtist._id);

    // Remove sensitive information from the response
    const loggedInArtist = await Artist.findById(existingArtist._id).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true only in production
    };    

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, "Artist logged in successfully", loggedInArtist)
      );

  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export {
  loginArtist,
};
