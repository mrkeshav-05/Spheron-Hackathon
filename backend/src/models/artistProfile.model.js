import mongoose from 'mongoose';

const artistProfileSchema = new mongoose.Schema({
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  allVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    }
  ]
  // valit address , watct time
  
}, { timestamps: true });



export const ArtistProfile = mongoose.model('Artist', artistProfileSchema);