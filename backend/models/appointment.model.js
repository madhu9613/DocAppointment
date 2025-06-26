import mongoose from "mongoose";


const appointmentSchema=new mongoose.Schema({

userId:{type:String,required:true},
docId:{type:String,required:true},
slotDate:{type:String,required:true},
slotTime:{
    type:String, required:true
},
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
docId: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor', required: true },

amount:{
    type:Number,
    required:true,
},
date:{
    type:Number,
    required:true,
},
cancelled:{
    type:Boolean,
    default:false,
},
payment:{
    type:Boolean,
    default:false
},
isCompleted:{
    type:Boolean,
    default:false
}

})

const appointmentModel=mongoose.models.appointment || mongoose.model('appointment',appointmentSchema) 

export default appointmentModel