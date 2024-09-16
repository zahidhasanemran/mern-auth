import bcryptjs from "bcryptjs"
import { sendEmailVerificationMail, sendWelcomeEmail, sendResetPasswordEmail, resetSuccessEmail } from "../configs/emails/emails.js"
import { User } from "../models/user.model.js"
import { generateJWToken, getVerificationToken } from "../utils/helper.js"
import crypto from "crypto"


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
  const {email, password} = req?.body;
  try {

    const user = await User.findOne({email});
    const isPasswordValid = bcryptjs.compare(user?.password, password);

    if(!user || !isPasswordValid){
      return res.status(400).json({success: false, message: 'Invalid credentials'})
    }

    generateJWToken(res, user?._id)

    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Looged In Successfully',
      user: {
        ...user?._doc,
        password: undefined,
      }
    })

  } catch (error) {
    res.status(200).json({success: false, message: 'Something went wrong'})
  }
}

export const logoutController = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({success: true, message: 'Logged out Successfully'})
}


export const forgotPassController = async (req, res) => {
  const {email} = req?.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success: false, message: 'User not found with this email'})
    }

    const resetToken = crypto.randomBytes(20).toString("hex")
    const resetTokenExpiresAt = Date.now() + 1 + 60 + 60 + 1000; //1 hour
    const ClientUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    await sendResetPasswordEmail(email, ClientUrl);
    return res.status(200).json({success: true, message: "Password Reset link sent"})

  } catch (error) {
    res.status(400).json({success: false, message: 'Failed'})
  }
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

export const resetPassController = async (req, res) => {
  const {password} = req?.body;
  const {token} = req?.params;
  
  try {
    const user = await User.findOne({resetPasswordToken: token });
  
    if(!user){
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token "
      })
    }
  
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined; 
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    console.log(user?.email)
    await resetSuccessEmail(user?.email);
  
    res.status(200).json({
      success: true,
      message: "Password reset Successfully"
    })
  } catch (error) {
    return res.status(400).json({success: false, message: "Email sent failed"})
  }
}