import mongoose  from "mongoose";
import bcrypt from "bcryptjs"
const userSchema=new mongoose.Schema({

    name:{type:String,
        required:[true," name is required"],
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
        default:""
      
    },
    address:{
        type:Object,
        default:{line1:'',line2:''}
    },
    gender:{
        type:String,
        default:"Not Selected"
    },
    dob:{
        type:String,
        default:"Not Selected"
    },
    phone:{
        type:String,
        default:"000-000-0000"
    }


  

})

userSchema.pre("save",async function (next) {
   if(!this.isModified("password")) return next() ;
   
    try {
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next(); 
    } catch (error) {
        next(error);

    }
})
userSchema.methods.ispasswordCorrect=async function (p) 
{
 const ans=await bcrypt.compare(p,this.password);
 return ans;
}


const userModel=mongoose.models.user || mongoose.model('user',userSchema);

export default userModel
