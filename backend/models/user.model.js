import mongoose  from "mongoose";

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

const userModel=mongoose.models.user || mongoose.model('user',userSchema);

export default userModel
