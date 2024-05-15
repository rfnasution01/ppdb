import { loginSchema } from '@/libs/schema/logins-schema'
import { useCreateLoginMutation } from '@/store/slices/loginAPI'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import Cookies from 'js-cookie'
import Loading from '@/components/atoms/Loading'
import {
  ArrowRightFromLine,
  CircleAlert,
  CircleCheck,
  UserCircle,
} from 'lucide-react'
import { Form } from '@/components/atoms/Form'
import { FormLabelInput } from '@/components/molecules/input'
import {
  FormListBulan,
  FormListTahun,
  FormListTanggal,
} from '@/components/molecules/form'

export function LoginForm() {
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [isChange, setIsChange] = useState<boolean>(false)
  const [tanggal, setTanggal] = useState<number>(1)
  const [bulan, setBulan] = useState<string>('januari')
  const [tahun, setTahun] = useState<number>(2024)
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
    try {
      const res = await createLogin({ data: values })
      if ('data' in res) {
        const token = res?.data?.data?.token
        const updateProfile = res?.data?.data?.update_profil
        const changePassword = res?.data?.data?.change_password
        localStorage.setItem('isUpdate', updateProfile ? 'yes' : 'no')
        setIsUpdate(updateProfile)
        setIsChange(changePassword)
        Cookies.set('token', token)
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
        navigate(
          isUpdate ? '/update-profile' : isChange ? '/ganti-password' : '/main',
        )
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

  console.log({ tanggal }, { bulan }, { tahun })

  return (
    <div className="flex flex-col gap-y-32">
      {disabled && <Loading />}
      {loginIsError && (
        <div className="flex items-center gap-x-12  border-l-8 border-red-500 bg-red-100 px-16 py-8 text-[2rem]">
          <span>
            <CircleAlert />
          </span>
          {msg}
        </div>
      )}
      {loginIsSuccess && (
        <div className="flex items-center gap-x-12  border-l-8 border-emerald-500 bg-emerald-100 px-16 py-8 text-[2rem]">
          <span>
            <CircleCheck />
          </span>
          {msg}
        </div>
      )}
      <p className="font-helvetica text-[2.8rem] font-semibold">Login</p>
      {/* --- Form --- */}
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-y-32"
          onSubmit={form.handleSubmit(handleFormLogin)}
        >
          <div className="flex flex-col gap-y-24 text-black">
            {/* --- Username --- */}
            <FormLabelInput
              form={form}
              placeholder="Masukkan NISN atau No. Peserta"
              name="username"
              prefix={<UserCircle size={16} />}
              type="text"
              className="col-span-6 phones:col-span-12"
              isDisabled={disabled}
            />
            {/* --- Tanggal Lahir --- */}
            <div className="flex items-center gap-32">
              <FormListTanggal setTanggal={setTanggal} />
              <FormListBulan setBulan={setBulan} />
              <FormListTahun setTahun={setTahun} />
            </div>
          </div>
          <div className="flex">
            <button
              type="submit"
              disabled={disabled}
              className="hover:bg-primary-shade-700 disabled:hover:bg-primary-shade-500 flex w-full items-center justify-center gap-x-8 rounded-2xl bg-primary py-12 text-[2rem] text-white disabled:cursor-not-allowed"
            >
              <p>Login</p>
              <span>
                <ArrowRightFromLine size={16} />
              </span>
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}
