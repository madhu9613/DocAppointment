import mongoose  from "mongoose";
import bcrypt from "bcryptjs"
const doctorSchema=new mongoose.Schema({

    name:{type:String,
        required:[true,"Doctor name is required"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
    type:String,
    required:true,

    },
    image:{
        type:String,
        required:true,
    },
    speciality:{
      type:String,
      required:true
    },
   degree:{
    type:String,
    required:true,

   },
   experience:{
    type:String,
    required:true,
   },
   about:{
    type:String,
    required:true,
   },
   availlable:{
    type:Boolean,
    required:true,
    default:false,
   },
   fees:{
    type:Number,
    required:true,
   },
   address:{
    type:Object,
    required:true,
   },
   date:{
    type:Number,
    required:true,
   },
   slots_booked:{
    type:Object,
    default:{}
   }


},{minimize:false})

doctorSchema.pre("save",async function (next) {
   if(!this.isModified("password")) return next() ;
   
    try {
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next(); 
    } catch (error) {
        next(error);

    }
})

doctorSchema.methods.ispasswordCorrect=async function (p) 
{
 const ans=await bcrypt.compare(p,this.password);
 return ans;
}

const doctorModel=mongoose.models.doctor || mongoose.model('doctor',doctorSchema);

export default doctorModel
