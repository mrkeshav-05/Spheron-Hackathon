import mongoose from 'mongoose';

const artistProfileSchema = new mongoose.Schema({
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  allSongs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
    }
  ]
  // valit address , watct time
  
}, { timestamps: true });



export const ArtistProfile = mongoose.model('Artist', artistProfileSchema);