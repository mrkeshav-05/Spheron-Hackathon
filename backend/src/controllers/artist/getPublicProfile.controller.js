import { Artist } from "../../models/artist.model.js";
import { ApiError } from "../../utils/error/ApiError.js";
import { asyncHandler } from "../../utils/error/asyncHandler.js";
import { ApiResponse } from "../../utils/response/ApiResponse.js";

const getPublicProfile = asyncHandler(async (req, res) => {
  try{
    const artistId = req.params.artistId;
    const artist = await Artist.findById(artistId).select('artistName profilePicture bio genres');
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Artist profile", artist)
      )

  }catch(err){
    throw new ApiError(500, err.message);
  }
});

export {
  getPublicProfile
}