
import { registerFunc } from '@/app/services/auth.services'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'

export type RegisterInputs = {
  name: string
  email: string
  password: string
}

export const useRegister = () => {
  const signup = async (data) => {
    try {
      const res = await registerFunc(data)
      console.log(res)
      toast.success(res?.data?.data?.message)
      return res
    } catch (error) {
      console.log(error)
      toast.warn(error?.response?.data?.message)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>()

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    signup(data)
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  }
}
