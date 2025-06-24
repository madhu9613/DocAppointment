import jwt from "jsonwebtoken"

const varifyAdmin=async(req,res,next)=>{

    try {

        const {atoken}=req.headers
        if(!atoken)
        {
            return res.json({
                success:false,
                message:"Not Authorized Login Again"
            })


        }


        const decoded_token=jwt.verify(atoken,process.env.JWT_SEC)

        if(decoded_token!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD)
        {
            return res.json({
                success:false,
                message:"Not Authorized Login Again"
            })
        }

        next();

    } catch (error) {
        console.log("error occured in varifyadmin",error);
        resizeBy.json({
            success:false,
            message:error.message
        })
    }
}

export default varifyAdmin;