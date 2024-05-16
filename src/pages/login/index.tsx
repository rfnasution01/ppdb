import { LoginFooter, LoginForm } from '@/features/login'
import { useCreateLoginMutation } from '@/store/slices/loginAPI'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { loginSchema } from '@/libs/schema/logins-schema'
import Cookies from 'js-cookie'

export default function Login() {
  const [msg, setMsg] = useState<string>('')
  const navigate = useNavigate()
  // --- Post API ---
  const [
    createLogin,
    {
      isSuccess: loginIsSuccess,
      isError: loginIsError,
      error: loginError,
      isLoading: loginIsLoading,
    },
  ] = useCreateLoginMutation()

  const disabled = loginIsLoading

  // --- Form Schema ---
  const form = useForm<zod.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  })

  // --- Handle Login ---
  async function handleFormLogin(values) {
    const body = {
      username: values?.username,
      tanggal_lahir: `${values?.tahun_lahir}-${values?.bulan_lahir}-${values?.tanggal_lahir}`,
    }

    try {
      const res = await createLogin({ data: body })
      if ('data' in res) {
        const token = res?.data?.data?.token
        const jenjang = res?.data?.data?.jenjang
        const jalur = res?.data?.data?.jalur
        Cookies.set('token', token)
        Cookies.set('jalur', jalur)
        Cookies.set('jenjang', jenjang)
      } else {
        console.error('Error occurred:', res.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (loginIsSuccess) {
      setMsg('Login Berhasil!')
      setTimeout(() => {
        navigate('/main')
      }, 1000)
    }
  }, [loginIsSuccess])

  useEffect(() => {
    if (loginIsError) {
      const errorMsg = loginError as {
        data?: {
          message?: string
        }
      }
      setMsg(errorMsg?.data?.message)
    }
  }, [loginIsError, loginError])

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50">
      <div className="flex w-6/12 flex-col gap-32 rounded-2xl bg-white p-32 shadow-md phones:w-10/12">
        <Link to="/" className="flex items-center justify-center">
          <img src="/img/logo.png" alt="PPDB" className="p-24" />
        </Link>
        <LoginForm
          form={form}
          loginIsError={loginIsError}
          loginIsSuccess={loginIsSuccess}
          disabled={disabled}
          msg={msg}
          handleFormLogin={handleFormLogin}
        />
        <LoginFooter disabled={disabled} />
      </div>
    </div>
  )
}
