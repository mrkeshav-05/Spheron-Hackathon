import { Artist } from "../../models/artist.model.js";

const generateAccessAndRefreshTokenForArtist = async (customer_id) => {
  try {
    // find customer by it's _id
    const artist = await Artist.findById(customer_id);
    console.log(artist)
    // geneating access token
    const accessToken = await artist.generateAccessToken();
    // generating refresh token
    const refreshToken = await artist.generateRefreshToken();
    // set the refresh token
    artist.refreshToken = refreshToken;
    console.log(artist.refreshToken)
    // it will shcow error while saving bcz wee are not providing other information
    await artist.save({validateBeforeSave: false});

    return {accessToken, refreshToken}
  } catch (error) {
    throw new ApiError(500, "Somthing went wrong while generating access and refresh token");
  }
}


export {
  generateAccessAndRefreshTokenForArtist,
}