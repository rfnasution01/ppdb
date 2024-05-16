import { loginSchema } from '@/libs/schema/logins-schema'
import { useCreateLoginMutation } from '@/store/slices/loginAPI'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import Cookies from 'js-cookie'
import Loading from '@/components/atoms/Loading'
import { CircleAlert, CircleCheck } from 'lucide-react'
import { Form } from '@/components/atoms/Form'
import { FormLabelComponent } from '../biodata/form-label-component'
import { FormListTanggalLahir } from '@/components/molecules/form'
import { ListBulan } from '@/libs/dummy/list-tanggal'

export function LoginForm() {
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [isChange, setIsChange] = useState<boolean>(false)
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

  const ListTanggal = []

  for (let i = 1; i <= 31; i++) {
    ListTanggal.push({ value: i.toString(), label: String(i) })
  }

  const ListTahun = []
  const tahunSekarang = new Date().getFullYear()

  for (let i = tahunSekarang; i >= tahunSekarang - 30; i--) {
    ListTahun.push({ value: i.toString(), label: String(i) })
  }

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
      {/* --- Form --- */}
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-y-32"
          onSubmit={form.handleSubmit(handleFormLogin)}
        >
          <div className="flex flex-col items-center gap-y-24 text-black">
            {/* --- Username --- */}
            <FormLabelComponent
              form={form}
              placeHolder="Masukkan NISN atau No. Peserta"
              name="username"
              type="text"
              label="No. Peserta / NISN*"
            />
            {/* --- Tanggal Lahir --- */}
            <FormListTanggalLahir
              name="tanggal_lahir"
              placeholder="Pilih Tanggal Lahir"
              headerLabel="Tanggal Lahir*"
              form={form}
              data={ListTanggal}
            />

            <FormListTanggalLahir
              name="bulan_lahir"
              placeholder="Pilih Bulan Lahir"
              headerLabel="Bulan Lahir*"
              form={form}
              data={ListBulan}
            />

            <FormListTanggalLahir
              name="tahun_lahir"
              placeholder="Pilih Tahun Lahir"
              headerLabel="Tahun Lahir*"
              form={form}
              data={ListTahun}
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex w-4/6 flex-col justify-center gap-12 phones:w-full">
              <button
                type="submit"
                disabled={disabled}
                className="flex w-full items-center justify-center gap-x-8 rounded-2xl bg-green-700 py-12 text-[2rem] text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:bg-emerald-200 phones:w-full"
              >
                <p className="uppercase">Login</p>
              </button>
              <p className="text-right text-[1.8rem] text-blue-900 hover:cursor-pointer hover:text-blue-700">
                Lupa Password?
              </p>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
