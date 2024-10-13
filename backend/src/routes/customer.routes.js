import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { registerCustomer } from '../controllers/customer/registerCustomer.controller.js';
import { loginCustomer } from '../controllers/customer/loginCustomer.controller.js';

const router = Router();

router.route('/register').post(
  upload.fields([
    {
      name: "profilePicture",
      maxCount: 1,
    }
  ]),
  registerCustomer
);
router.route('/login').post(loginCustomer);

export default router;