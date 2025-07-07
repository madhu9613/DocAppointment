import doctorModel from "../models/doctor.model.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
const changeAvailbility = async (req, res) => {
    try {

        const { docID } = req.body

        if (!mongoose.Types.ObjectId.isValid(docID)) {
            return res.status(400).json({
                success: false,
                message: "Invalid doctor ID format",
            });
        }

        const docData = await doctorModel.findById(docID)

        if (!docData) {
            return res.json({
                success: false,
                message: "Doctor with this id doesnot Exist please add doctor first"
            })
        }
        await doctorModel.findByIdAndUpdate(docID, {
            availlable: !docData.availlable
        })
        res.json({
            success: true,
            message: 'Availibility Change'
        })

    } catch (error) {
        console.log(error);
        res.json(
            {
                success: false,
                message: error.message
            }
        )

    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({
            success: true,
            doctors
        })
    } catch (error) {

        res.json({
            success: false,
            message: error.message
        })

    }
}

const loginDoctor = async (req, res) => {

    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({
                success: false,
                message: "Doctor Not Found || add the doctor first"
            })
        }

        const isValid = doctor.ispasswordCorrect(password)
        if (!isValid) {
            return res.json({
                success: false,
                message: "Invalid Credential"
            })
        }

        const token = jwt.sign({ id: doctor._id },

            process.env.JWT_SEC
        )


        res.json({
            success:true,
            message:"Login Successfully",
            token
        })


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })

    }
}

export {
    changeAvailbility,
    doctorList,
    loginDoctor
}