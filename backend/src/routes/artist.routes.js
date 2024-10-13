import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { registerArtist } from '../controllers/artist/registerArtist.controller.js';
import { loginArtist } from '../controllers/artist/loginArtist.controller.js';


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


export default router;