import { Form } from '@/components/atoms/Form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { sekolahSebelumnyaSchema } from '@/libs/schema/biodata-schema'
import { FormAPendidkan } from './form-pendidikan'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import { useCreateSekolahMutation } from '@/store/slices/pendaftaranAPI'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Loader2, Save } from 'lucide-react'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import Loading from '@/components/atoms/Loading'
import { enumValidasi } from '@/libs/enum/enum-validasi'

export function BiodataPendidikan({
  setName,
  setActiveIndex,
  getProfil,
  isLoading,
}: {
  setName: Dispatch<SetStateAction<string>>
  setActiveIndex: Dispatch<SetStateAction<number>>
  getProfil: ProfilData
  isLoading: boolean
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // --- Form Schema ---
  const form = useForm<zod.infer<typeof sekolahSebelumnyaSchema>>({
    resolver: zodResolver(sekolahSebelumnyaSchema),
    defaultValues: {},
  })

  // --- Create Pendidikan ---
  const [
    createPendidikan,
    {
      isError: isErrorPendidikan,
      error: errorPendidikan,
      isLoading: isLoadingPendidikan,
      isSuccess: isSuccessPendidikan,
    },
  ] = useCreateSekolahMutation()

  const handleSubmit = (values) => {
    const body = {
      npsn: values?.npsn,
      nama_sekolah: values?.nama_sekolah,
      tahun_lulus: values?.tahun_lulus,
    }

    try {
      createPendidikan({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isSuccessPendidikan) {
      toast.success(`Pendidikan Sebelumnya berhasil disimpan!`, {
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
        setActiveIndex(3)
        setName('orang-tua')
        dispatch(setStateBiodata({ page: 'orang-tua' }))
        navigate(`/main/profil?page=${'orang-tua'}`)
      }, 2000)
    }
  }, [isSuccessPendidikan])

  useEffect(() => {
    if (isErrorPendidikan) {
      const errorMsg = errorPendidikan as {
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
  }, [isErrorPendidikan, errorPendidikan])

  const isValidasi = getProfil?.validasi?.status === enumValidasi?.SUDAHVALIDASI

  return (
    <Form {...form}>
      <form
        className="scrollbar flex h-full w-full flex-col overflow-auto"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="scrollbar flex h-full flex-1 flex-col gap-32 overflow-auto pb-32">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {/* --- Informasi Pribadi --- */}
              <FormAPendidkan
                form={form}
                getProfil={getProfil}
                isLoading={isLoading}
                disabled={isValidasi}
              />
            </>
          )}
        </div>
        {/* --- button --- */}
        <div className="flex items-center justify-between bg-primary-50 p-32">
          <p className="text-[1.8rem] text-emerald-800">* Wajib Diisi</p>
          <div className="flex items-center gap-16 text-[2rem]">
            <button
              className="rounded-2xl bg-primary-background px-24 py-12 text-white hover:bg-primary-700"
              type="button"
              disabled={isLoadingPendidikan}
              onClick={() => {
                setActiveIndex(1)
                setName('informasi-pribadi')
                dispatch(setStateBiodata({ page: 'informasi-pribadi' }))
                navigate(`/main/profil?page=${'informasi-pribadi'}`)
              }}
            >
              Kembali
            </button>
            <button
              disabled={isLoadingPendidikan}
              className="flex items-center gap-12 rounded-2xl bg-emerald-700 px-24 py-12 text-white hover:bg-emerald-900"
              type="submit"
            >
              Lanjut
              {isLoadingPendidikan ? (
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
