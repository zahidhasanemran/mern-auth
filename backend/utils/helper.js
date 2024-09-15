import jwt from "jsonwebtoken"

export const getVerificationToken = () => Math.floor(100000 + Math.random() * 900000).toString();
export const generateJWToken = (res, id) => {
  const token = jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 24 hours
  })
}