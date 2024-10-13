import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { registerArtist } from '../controllers/artist/registerArtist.controller.js';
import { loginArtist } from '../controllers/artist/loginArtist.controller.js';
import { getPublicProfile } from '../controllers/artist/getPublicProfile.controller.js';
import { getArtistDashboard } from '../controllers/artist/getArtistDashboard.controller.js';
import { verifyJWTForArtist } from '../middlewares/authArtist.middleware.js';


const router = Router();

router.route('/register').post(
  upload.fields([
    {
      name: "profilePicture",
      maxCount: 1,
    }
  ]),
  registerArtist
);
router.route('/login').post(loginArtist);
router.route('/:artistId/profile').get(getPublicProfile);
router.route('/dashboard').get(verifyJWTForArtist, getArtistDashboard);


export default router;