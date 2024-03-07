import express from "express";
import { registerUser,userSignIn,logout, findUser,deleteAll} from "../Controller/Auth/user";
import { registerAdmin,adminSignIn } from "../Controller/Auth/admin";
import { forgetpassword,verifyotp,resetpassword} from "../Controller/features/forgetpassword";
import { checkRole } from "../Middleware/Access";
import { upload } from "../Helper/Upload/uploadimagemulter";
import { uploadImage } from "../Helper/Upload/uploadimagecloudinary";


const router =express.Router();


router.post('/register',upload.single('image'), uploadImage,registerUser);
router.post('/signup',userSignIn);
router.get('/logout',logout);
router.post('/userbyId',findUser)

router.post('/admin/register',registerAdmin);
router.post('/admin/signup',adminSignIn);

router.post('/forgetpassword',forgetpassword);
router.post('/verifyotp',verifyotp);
router.post("/resetpassword",resetpassword);

router.post('/addPhoto',checkRole({allowedRoles: ['Admin']}),upload.single('image'), uploadImage);

export {router};