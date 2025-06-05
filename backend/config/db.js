import mongoose, { connect } from "mongoose";

const ConnectDb=async () => {

    try {
      const conncect=  await mongoose.connect(`${process.env.MONGO_URI}`)
    console.log("DataBase connected succesfully ");
    console.log("HOST",conncect.connection.host);
    //doing some experimental things

    // console.log(conncect);
    // console.log(connect.connection);
    
    } catch (error) {
      console.log("Error occured when connected to Database",error);
      
      process.exit(1);
   
    }
    
}

export default ConnectDb;