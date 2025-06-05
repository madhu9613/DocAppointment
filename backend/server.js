import express from "express"
import cors from "cors"
import 'dotenv/config'
import ConnectDb from "./config/db.js"
import connectCloudinary from "./config/cloudinary.js"


//app config
const app=express()

app.use(express.json())
app.use(cors)



const port=process.env.PORT ||8000

ConnectDb()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

connectCloudinary()
