import express from "express"
import cors from "cors"
import 'dotenv/config'
import ConnectDb from "./config/db.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/admin.route.js"


//app config
const app=express()

//middleware

app.use(express.json())
app.use(cors())
//api end points

app.use('/api/admin',adminRouter)
//localhost:4000/api/admin/add-doctor



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
