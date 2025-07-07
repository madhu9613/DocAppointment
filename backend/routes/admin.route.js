import express from "express"

import { addDoctor,allAppointments,allDoctors,loginAdmin} from "../controllers/admin.controller.js"
import upload from "../middleware/multer.middleware.js"
import e from "express"
import varifyAdmin from "../middleware/auth.middleware.js"
import { changeAvailbility } from "../controllers/doctor.controller.js"

const adminRouter=express.Router()

adminRouter.post('/add-doctor',varifyAdmin,upload.single('image'),addDoctor)

adminRouter.post('/login',loginAdmin);
adminRouter.post('/all-doctors',varifyAdmin,allDoctors)
adminRouter.post('/change-availability',varifyAdmin,changeAvailbility)
adminRouter.get('/all-appoinments',varifyAdmin,allAppointments)

export default adminRouter