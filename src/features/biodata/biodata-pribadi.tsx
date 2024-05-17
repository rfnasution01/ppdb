import { Form } from '@/components/atoms/Form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { informasiPribadiSchema } from '@/libs/schema/biodata-schema'
import { FormBiodata } from './form-informasi-pribadi'
import { FormAlamat } from './form-alamat'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCreateBiodataMutation } from '@/store/slices/pendaftaranAPI'
import { Loader2, Save } from 'lucide-react'
import { ProfilData } from '@/libs/types/pendaftaran-type'

export function BiodataPribadi({
  setName,
  setActiveIndex,
  getProfil,
}: {
  setName: Dispatch<SetStateAction<string>>
  setActiveIndex: Dispatch<SetStateAction<number>>
  getProfil: ProfilData
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // --- Form Schema ---
  const form = useForm<zod.infer<typeof informasiPribadiSchema>>({
    resolver: zodResolver(informasiPribadiSchema),
    defaultValues: {
      provinsi: '9cfb949a-0f74-48b0-80ba-fb7c37c53325',
      kabupaten: '62716ac1-fc94-427b-bd30-342b3c946bd6',
    },
  })

  // --- Create Biodata ---
  const [
    createBiodata,
    {
      isError: isErrorBiodata,
      error: errorBiodata,
      isLoading: isLoadingBiodata,
      isSuccess: isSuccessBiodata,
    },
  ] = useCreateBiodataMutation()

  const handleSubmit = (values) => {
    const body = {
      tempat_lahir: values?.tempat_lahir,
      jenis_kelamin: values?.jenis_kelamin,
      nomor_kk: values?.kk,
      telepon: values?.no_hp,
      agama: values?.agama,
      id_provinsi: values?.provinsi,
      id_kabupaten: values?.kabupaten,
      id_kecamatan: values?.kecamatan,
      id_desa: values?.desa,
      id_dusun: values?.dusun ?? '',
      alamat_lengkap: values?.alamat,
    }

    try {
      createBiodata({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isSuccessBiodata) {
      toast.success(`Biodata berhasil disimpan!`, {
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
        setActiveIndex(2)
        setName('pendidikan-sebelumnya')
        dispatch(setStateBiodata({ page: 'pendidikan-sebelumnya' }))
        navigate(`/main?page=${'pendidikan-sebelumnya'}`)
      }, 2000)
    }
  }, [isSuccessBiodata])

  useEffect(() => {
    if (isErrorBiodata) {
      const errorMsg = errorBiodata as {
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
  }, [isErrorBiodata, errorBiodata])

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-1 flex-col gap-32 pb-32">
          {/* --- Informasi Pribadi --- */}
          <div className="flex flex-col gap-24">
            <p className="font-bold">Informasi Pribadi</p>
            <FormBiodata form={form} getProfil={getProfil} />
          </div>
          {/* --- Alamat --- */}
          <div className="flex flex-col gap-24">
            <p className="font-bold">Alamat</p>
            <FormAlamat form={form} getProfil={getProfil} />
          </div>
        </div>
        {/* --- button --- */}
        <div className="flex items-center justify-between bg-primary-50 p-32">
          <p className="text-[1.8rem] text-emerald-800">* Wajib Diisi</p>
          <div className="flex items-center gap-16 text-[2rem]">
            <button
              className="rounded-2xl bg-primary-background px-24 py-12 text-white hover:bg-primary-700"
              type="button"
              disabled={isLoadingBiodata}
              onClick={() => {
                setActiveIndex(0)
                setName('jalur-pendaftaran')
                dispatch(setStateBiodata({ page: 'jalur-pendaftaran' }))
                navigate(`/main?page=${'jalur-pendaftaran'}`)
              }}
            >
              Kembali
            </button>
            <button
              disabled={isLoadingBiodata}
              className="flex items-center gap-12 rounded-2xl bg-emerald-700 px-24 py-12 text-white hover:bg-emerald-900"
              type="submit"
            >
              Lanjut
              {isLoadingBiodata ? (
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
