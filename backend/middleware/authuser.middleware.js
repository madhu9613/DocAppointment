import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized. Login again.",
      });
    }

    const decoded_token = jwt.verify(token, process.env.JWT_SEC);

    // ✅ Fix: match 'id' from decoded token
    req.user = { id: decoded_token.id };

    next();
  } catch (error) {
    console.log("error occurred in verifyUser:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default verifyUser;


