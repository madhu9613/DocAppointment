import express from "express"
import { bookAppointment, cancellappointment, deleteAppointment, getProfile, listappointment, loginUser, registerUser, updateProfile } from "../controllers/user.controller.js"
import varifyUser from "../middleware/authuser.middleware.js"
import upload from "../middleware/multer.middleware.js"




const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',varifyUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),varifyUser,updateProfile)
userRouter.post('/book-appointment',varifyUser,bookAppointment)
userRouter.get('/appointments',varifyUser,listappointment)
userRouter.post('/cancel-apointment',varifyUser,cancellappointment)
userRouter.post('/delete-cancel-appointment',varifyUser,deleteAppointment)
export default userRouter