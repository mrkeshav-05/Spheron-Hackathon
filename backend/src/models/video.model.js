import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  videofile: {
    type: String, // Cloudinary URL
    required: true,
  },
  thumbnail: {
    type: String, // Cloudinary URL
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // In seconds (to make it easier to validate)
    required: true,
    validate: {
      validator: function (value) {
        return value >= 600;
      },
      message: "Video length must be at least 10 minutes."
    }
  },
  views: {
    type: Number,
    default: 0
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  likes: {
    type: Number,
    default: 0
  },
  tags: [
    {
      type: String
    }
  ],
}, { timestamps: true });

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model('Video', videoSchema);