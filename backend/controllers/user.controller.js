import validator from "validator"
import userModel from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctor.model.js"
import appointmentModel from "../models/appointment.model.js"


//api controller function to register new user through email

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !password || !email) {
            return res.json({
                success: false,
                message: "All Feilds are required"
            })

        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Enter a valid email address"
            })
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password length should be minimum 8"
            })
        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.json({
                success: false,
                message: "User Already Exist"
            })
        }

         

        const userData = {
            username,
            email,
            password,
          
        }

        const newUser = new userModel(userData)

        const user = await newUser.save()

        //create token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SEC,
            { expiresIn: "7d" }
        );
        res.json({
            success: true,
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

//api for login user
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                success: false,
                message: "all fields are required"
            })
        }

        const user = await userModel.findOne({ email })


        if (!user) {
            return res.json({
                success: false,
                message: "user doesnot exist"
            })
        }

        const passwordcorrect = await user.ispasswordCorrect(password)

        if (!passwordcorrect) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SEC,
  { expiresIn: "7d" }
);


        res.json({
            success: true,
            message: "login Succesfully ",
            token
        })

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        })

    }
}

//api to get the user data

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;


    const userData = await userModel.findById(userId).select('-password');

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//api to update userprofile

const updateProfile=async(req,res)=>{

    try {
        const userId = req.user.id;

        const {usrId,username,phone,address,dob,gender}=req.body
        const imageFile=req.file
       
        if(!username || !phone  ||!dob  || !gender)
        {
            return res.json({
                success:false,
                message:"Data Missing"
            })
        }
        await userModel.findByIdAndUpdate(userId,{username,phone,address:JSON.parse(address),dob,gender})
         if(imageFile)
         {
            //upload image to cloudinary
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,
                {
                    resource_type:'image'
                }
            )

            const imageUrl=imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
         }

         res.json({
            success:true,
            message:"Profile Details Updated"
         })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
        
    }
}


//api to book appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { docId, slotDate, slotTime, override } = req.body;

 
    if (!slotDate) {
      return res.json({
        success: false,
        message: "Please select a Date"
      });
    }

    if (!slotTime) {
      return res.json({
        success: false,
        message: "Please Select a Time slot"
      });
    }

    // Check if same user has already booked the same time and date
    const existingAppointment = await appointmentModel.findOne({
      userId,
      slotDate,
      slotTime
    });

    if (existingAppointment && !override) {
      return res.json({
        success: false,
        alreadyBooked: true,
        message: "You already have an appointment at this time.",
        appointment: existingAppointment
      });
    }

    // 1. Fetch doctor
    const docData = await doctorModel.findById(docId).select('-password');
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    if (!docData.availlable) {
      return res.json({
        success: false,
        message: "Doctor not available"
      });
    }

    // 2. Check slot availability
    let slots_booked = docData.slots_booked || {};

    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = [];
    }

    if (slots_booked[slotDate].includes(slotTime)) {
      return res.json({
        success: false,
        message: "Doctor not available at this time"
      });
    }

    // 3. Add the slot
    slots_booked[slotDate].push(slotTime);

    // 4. Fetch user
    const userData = await userModel.findById(userId).select('-password');
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // 5. Prepare appointment data
    const appointmentData = {
      userId,
      docId,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now()
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // 6. Update doctor's booked slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({
      success: true,
      message: "Appointment booked successfully"
    });

  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};



// api to get all appointments of a user


const listappointment=async(req,res)=>{
    try {
        const   userId=req.user.id
        const appointments = await appointmentModel
                                      .find({ userId })
                                      .populate("docId", "name image speciality address")
                    
        res.json({
            success:true,
            appointments
        })

    } catch (error) {
        
     console.log(error);
     res.json({
        success:false,
        message:error.message
     })
     
    }
}

//api for cancell appointmenta

const cancellappointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({
        success: false,
        message: "Appointment not found",
      });
    }

    // 🔒 Check if the user is authorized to cancel
    if (appointmentData.userId.toString() !== userId) {
      return res.json({
        success: false,
        message: "Not Authorized User",
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

    // 🩺 Release the doctor’s slot
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

const deleteAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointment.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized" });
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



export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listappointment,
    cancellappointment,
    deleteAppointment
}