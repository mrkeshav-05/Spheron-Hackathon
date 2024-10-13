import { Customer } from '../../models/customer.model.js'
import { Video } from '../../models/video.model.js'
import { asyncHandler } from '../../utils/error/asyncHandler.js'

const watchVideo = asyncHandler(async (req, res) => {
  
  const customer = await Customer.findById(userId);
  if (user.credits <= 0) {
    throw new Error('Insufficient credits');
  }
});