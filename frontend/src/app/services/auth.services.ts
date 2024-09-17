import { publicAxios } from '../configs/axios.config'

export const loginFunc = async () => {
  const res = await publicAxios.post(`auth/login`)
  return res
}

export const registerFunc = async (data) => {
  const res = await publicAxios.post(`/auth/signup`, data)
  return res
}

export const forgotPassword = async () => {
  const res = await publicAxios.post(`auth/forgot-password`)
  return res
}

export const logout = async () => {
  const res = await publicAxios.post(`auth/logout`)
  return res
}

export const resetPassword = async () => {
  const res = await publicAxios.post(`auth/reset-password/:token`)
  return res
}

export const verifyEmail = async () => {
  const res = await publicAxios.post(`auth/verify-email`)
  return res
}
