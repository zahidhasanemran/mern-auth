'use client'

import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
}

export const Loginpage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <form
      className="w-[500px] max-w-full px-6 py-6 rounded-xl flex mx-auto flex-col justify-center my-24 bg-slate-400"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4 font-bold mt-3">
        <h1 className=" text-2xl text-white ">Login</h1>
      </div>
      <div className="mb-4">
        <label className="w-full block text-white text-lg ">Email:</label>
        <input
          type="email"
          className="block w-full rounded px-2 py-1"
          {...register('email', { required: true })}
        />
        {errors?.email && <p>Email is required</p>}
      </div>
      <div className="mb-4">
        <label className="w-full block text-white text-lg ">Password:</label>
        <input
          type="password"
          className="block w-full rounded px-2 py-1"
          {...register('password', { required: true })}
        />
        {errors?.password && <p>Password is required</p>}
      </div>
      <button
        className="px-3 py-2 bg-amber-700 text-white rounded mb-3"
        type="submit"
      >
        Login
      </button>
      <div className="">
        <Link href="/register">Signup</Link>
      </div>
      <div className="">
        <Link href="/forgot-password">Forgot Password</Link>
      </div>
    </form>
  )
}

export default Loginpage
