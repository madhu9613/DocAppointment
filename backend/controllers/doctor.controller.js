import doctorModel from "../models/doctor.model.js";
import mongoose from "mongoose";


const changeAvailbility=async(req,res)=>{
    try {
        
       const {docID}=req.body

       if (!mongoose.Types.ObjectId.isValid(docID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid doctor ID format",
      });
    }

       const docData=await doctorModel.findById(docID)

       if(!docData)
       {
       return res.json({
            success:false,
            message:"Doctor with this id doesnot Exist please add doctor first"
        })
       }
       await doctorModel.findByIdAndUpdate(docID,{
        availlable:!docData.availlable
       })
       res.json({
        success:true,
        message:'Availibility Change'
       })

    } catch (error) {
        console.log(error);
        res.json(
            {
                success:false,
                message:error.message
            }
        )
        
    }
}


export {
    changeAvailbility
}