import validator from "validator"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctor.model.js";
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointment.model.js";
//api for adding doctors

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imagefile = req.file;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email ID",
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password length should be at least 8 characters",
      });
    }

    // ✅ Check if email already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.json({
        success: false,
        message: "Doctor with this email already exists",
      });
    }

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imagefile.path, {
      resource_type: "image",
    });

    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    return res.status(201).json({
      success: true,
      message: "Doctor data saved successfully",
    });

  } catch (error) {
    console.log("Error occurred:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};



//login for admin

const loginAdmin=async(req,res)=>{
try {
    const {email,password}=req.body

    if(!email || !password)
    {
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }
    
    if(email==process.env.ADMIN_EMAIL && password==process.env.ADMIN_PASSWORD)
    {
        //success
        const token=jwt.sign(email+password,process.env.JWT_SEC)

        return res.status(200).json({
            success:true,
            message:"Login Succesfully",
            token
        })
        
    }
    else{
        return res.json({
            success:false,
            message:"Invalid Credential"
        })
    }
} catch (error) {
    console.log("error in admin login",error);
    
    return res.status(500).json({
        success:false,
        message:"Error occured",error
    })
    
}
}

//api to get all doctors data or list for admin panel

const allDoctors=async(req,res)=>{
  try {
    const doctors=await doctorModel.find({}).select('-password')
    res.json({
      success:true,
      doctors
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

// to get all appointment
const allAppointments = async (req, res) => {
  try {
 const appointments = await appointmentModel
  .find({})
  .populate('userId', 'username image')
  .populate('docId', 'name image');

      

    res.json({
      success: true,
      appointments
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

//api for cancell appointments from admin 

const cancellappointment = async (req, res) => {
  try {
  

    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({
        success: false,
        message: "Appointment not found",
      });
    }

    // 🛑 Prevent multiple cancellations
    if (appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment is already cancelled",
      });
    }

    // ✅ Cancel the appointment
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);
    if (!doctorData) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    let slots_booked = doctorData.slots_booked || {};

    // Ensure date exists
    if (Array.isArray(slots_booked[slotDate])) {
      slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);
    }

    await doctorModel.findByIdAndUpdate(docId, {
      slots_booked,
    });

    res.json({
      success: true,
      message: "Successfully cancelled the appointment",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// api for delete an appointment
const deleteAppointment = async (req, res) => {
  try {
    
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Only allow deletion if cancelled
    if (!appointment.cancelled) {
      return res.json({ success: false, message: "Only cancelled appointments can be deleted" });
    }

    await appointmentModel.findByIdAndDelete(appointmentId);

    res.json({ success: true, message: "Cancelled appointment deleted permanently" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export {addDoctor,
  loginAdmin,
  allDoctors,
allAppointments,
cancellappointment,
deleteAppointment

}