import bcryptjs from "bcryptjs"
import { sendEmailVerificationMail, sendWelcomeEmail } from "../configs/emails/emails.js"
import { User } from "../models/user.model.js"
import { generateJWToken, getVerificationToken } from "../utils/helper.js"


export const SignupController = async (req, res) => {
  const {email, password, name} = req?.body;
  try {

    if(!email || !password || !name){
      throw new Error("All fields are mandatory")
    }

    const isUserAlreadyExist = await User.findOne({email});
    if(isUserAlreadyExist){
      return res.status(400).json({success: false, message: "User already exists"})
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const verificationToken = await getVerificationToken()
    const user = new User({
      email,
      password: hashedPassword,
      name,
      isVerified: false,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 + 60 + 60 + 1000
    });

    await user.save();

    generateJWToken(res, user?._id)
    
    sendEmailVerificationMail(user?.email, verificationToken);
    
    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      user: {
        ...user._doc,
        password: undefined
      }
    })

  } catch (error) {
    res.status(400).json({success: false, message: error?.message});
  }
  
}


export const loginController = async (req, res) => {
  res.send("login router")
}

export const logoutController = async (req, res) => {
  res.send("logout router")
}


export const forgotPassController = async (req, res) => {
  res.send("Forgot password router")
}

export const verifyEmailController = async (req, res) => {
  const {code} = req?.body;
  
  try {
    const user = await User.findOne({
      verificationToken: code,
      // verificationTokenExpiresAt:  Date.now()
    })
    console.log(user);
    
    if(!user){
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code"
      })
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
  
    await user.save();
    
    await sendWelcomeEmail (user?.email, user?.name)
    
    return res.status(200).json({
      success: true, 
      message: 'Verified Successfully',
      user: {
        ...user?._doc,
        password: undefined
      }
    })

  } catch (error) {
    // console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}