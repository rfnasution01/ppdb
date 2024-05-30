import { Form } from '@/components/atoms/Form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { sekolahSchema } from '@/libs/schema/biodata-schema'
import { FormSekolah } from './form-sekolah'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCreatePilihanSekolahMutation } from '@/store/slices/pendaftaranAPI'
import Loading from '@/components/atoms/Loading'
import { enumValidasi } from '@/libs/enum/enum-validasi'
import { NoData } from '@/components/atoms/NoData'

export function BiodataSekolah({
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
  const form = useForm<zod.infer<typeof sekolahSchema>>({
    resolver: zodResolver(sekolahSchema),
    defaultValues: {},
  })

  // --- Create Pilihan ---
  const [
    createPilihan,
    {
      isError: isErrorPilihan,
      error: errorPilihan,
      isLoading: isLoadingPilihan,
      isSuccess: isSuccessPilihan,
    },
  ] = useCreatePilihanSekolahMutation()

  const handleSubmit = (values) => {
    const body = {
      pilihan1: values?.tujuan_pertama,
      pilihan2: values?.tujuan_kedua ?? null,
    }

    try {
      createPilihan({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isSuccessPilihan) {
      toast.success(`Pilihan sekolah berhasil disimpan!`, {
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
        navigate(`/main/biodata`)
      }, 2000)
    }
  }, [isSuccessPilihan])

  useEffect(() => {
    if (isErrorPilihan) {
      const errorMsg = errorPilihan as {
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
  }, [isErrorPilihan, errorPilihan])

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
              <FormSekolah
                form={form}
                isLoading={isLoading || isLoadingPilihan}
                getProfil={getProfil}
                disabled={isValidasi}
              />
            </>
          )}
          <div className="flex flex-col gap-24">
            <p className="font-bold">Rekomendasi</p>
            <div className="flex flex-col gap-12">
              {getProfil?.pilihan?.rekomendasi?.length === 0 ? (
                <NoData />
              ) : (
                <>
                  {getProfil?.pilihan?.rekomendasi.map((item, idx) => (
                    <div className="flex items-center gap-12" key={idx}>
                      <p>{idx + 1}</p>
                      <p>{item?.nama_sekolah}</p>
                      <p>({item?.skor})</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        {/* --- button --- */}
        <div className="flex items-center justify-between bg-primary-50 p-32">
          <p className="text-[1.8rem] text-emerald-800">* Wajib Diisi</p>
          <div className="flex items-center gap-16 text-[2rem]">
            <button
              className="rounded-2xl bg-primary-background px-24 py-12 text-white hover:bg-primary-700"
              type="button"
              onClick={() => {
                setActiveIndex(4)
                setName('kelengkapan-dokumen')
                dispatch(setStateBiodata({ page: 'kelengkapan-dokumen' }))
                navigate(`/main/profil?page=${'kelengkapan-dokumen'}`)
              }}
            >
              Kembali
            </button>
            <button
              className="rounded-2xl bg-emerald-700 px-24 py-12 text-white hover:bg-emerald-900"
              type="submit"
            >
              Lanjut
            </button>
          </div>
        </div>
        <ToastContainer />
      </form>
    </Form>
  )
}
