import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { daptarAkunSchema } from '@/libs/schema/daptar-akun-schema'
import { Form } from '@/components/atoms/Form'
import { FormDaptar } from './form-daptar'
import { useEffect, useState } from 'react'
import { useCreateAkunMutation } from '@/store/slices/daptarAkunAPI'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { Loader2, Save } from 'lucide-react'

export function FormDaptarAkun({
  showJenjang,
  jalur,
}: {
  showJenjang: string
  jalur: string
}) {
  const navigate = useNavigate()
  const [first, setFirst] = useState(true)
  const [isChecked, setIsChecked] = useState<boolean>(false)

  useEffect(() => {
    if (first) {
      setFirst(false)
    }
  }, [first])

  const form = useForm<zod.infer<typeof daptarAkunSchema>>({
    resolver: zodResolver(daptarAkunSchema),
    defaultValues: {},
  })

  // --- Submit ---
  const [
    createAkun,
    {
      isError: isErrorAkun,
      error: errorAkun,
      isLoading: isLoadingAkun,
      isSuccess: isSuccessAkun,
    },
  ] = useCreateAkunMutation()

  const handleFormLogin = (values) => {
    const body = {
      nisn: values?.nisn,
      nik: values?.nik,
      nama: values?.nama_lengkap,
      tanggal_lahir: values?.tgl_lahir,
    }
    try {
      createAkun({
        jenjang: showJenjang.toLowerCase(),
        jalur: jalur,
        data: body,
      })
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    if (isSuccessAkun) {
      toast.success(`Pendaftaran akun berhasil!`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }, [isSuccessAkun])

  useEffect(() => {
    if (isErrorAkun) {
      const errorMsg = errorAkun as {
        data?: {
          message?: string
        }
      }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorAkun, errorAkun])

  return (
    <Form {...form}>
      <form
        className="scrollbar flex h-full w-full flex-col overflow-auto"
        onSubmit={form.handleSubmit(handleFormLogin)}
      >
        <div className="scrollbar flex h-full flex-1 flex-col gap-32 overflow-auto pb-32">
          {/* --- Informasi Pribadi --- */}
          <FormDaptar
            form={form}
            showJenjang={showJenjang}
            setIsChecked={setIsChecked}
            isChecked={isChecked}
          />
        </div>
        {/* --- button --- */}
        <div className="flex items-center justify-between bg-primary-50 p-32">
          <p className="text-[1.8rem] text-emerald-800">* Wajib Diisi</p>
          <div className="flex items-center gap-16 text-[2rem]">
            <button
              disabled={isLoadingAkun}
              className="flex items-center gap-12 rounded-2xl bg-emerald-700 px-24 py-12 text-white hover:bg-emerald-900"
              type="submit"
            >
              <p>Simpan</p>
              {isLoadingAkun ? (
                <span className="animate-spin duration-300">
                  <Loader2 size={16} />
                </span>
              ) : (
                <Save size={16} />
              )}
            </button>
          </div>
        </div>
        <ToastContainer />
      </form>
    </Form>
  )
}
