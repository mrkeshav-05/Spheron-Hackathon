import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../utils/tokens/generateAccessToken.js';
import { generateRefreshToken } from '../utils/tokens/generateRefreshToken.js';

const artistSchema = new mongoose.Schema({
  artistName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
  },
  bio: {
    type: String,
  },
  genres: [
    {
      type: String
    }
  ],
  refreshToken: {
    type: String,
  }
  // valit address , watct time
  
}, { timestamps: true });


artistSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

artistSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
  // password is the password entered by the user
  // this.password is the hashed password in the database
}

artistSchema.methods.generateAccessToken = async function () {
  return generateAccessToken(this);
}

artistSchema.methods.generateRefreshToken = async function () {
  return generateRefreshToken(this);
}

artistSchema.methods.generateEmailVarificationToken = async function () {
  return generateEmailVerificationToken(this);
}


export const Artist = mongoose.model('Artist', artistSchema);