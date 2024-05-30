import { Form } from '@/components/atoms/Form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { orangTuaSchema } from '@/libs/schema/biodata-schema'
import { FormAyah } from './form-ayah'
import { FormIbu } from './form-ibu'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import Cookies from 'js-cookie'
import { FormWali } from './form-wali'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCreateOrangTuaMutation } from '@/store/slices/pendaftaranAPI'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import Loading from '@/components/atoms/Loading'
import { enumValidasi } from '@/libs/enum/enum-validasi'

export function BiodataOrangTua({
  setName,
  setActiveIndex,
  getProfil,
  isLoadingProfil,
}: {
  setName: Dispatch<SetStateAction<string>>
  setActiveIndex: Dispatch<SetStateAction<number>>
  getProfil: ProfilData
  isLoadingProfil: boolean
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const jenjang = Cookies.get('jenjang') ?? 'sd'

  // --- Form Schema ---
  const form = useForm<zod.infer<typeof orangTuaSchema>>({
    resolver: zodResolver(orangTuaSchema),
    defaultValues: {},
  })

  // --- Create OrangTua ---
  const [
    createOrangTua,
    {
      isError: isErrorOrangTua,
      error: errorOrangTua,
      isLoading: isLoadingOrangTua,
      isSuccess: isSuccessOrangTua,
    },
  ] = useCreateOrangTuaMutation()

  // --- Handle Submit ---
  const handleSubmit = (values) => {
    const body = {
      status_ayah: values?.isHidupAyah ? 'Hidup' : 'Meninggal',
      nik_ayah: values?.nik_ayah ?? null,
      nama_ayah: values?.nama_ayah ?? null,
      hp_ayah: values?.telepon_ayah ?? null,
      pendidikan_ayah: values?.pendidikan_ayah ?? null,
      pekerjaan_ayah: values?.pekerjaan_ayah ?? null,
      status_ibu: values?.isHidupIbu ? 'Hidup' : 'Meninggal',
      nik_ibu: values?.nik_ibu ?? null,
      nama_ibu: values?.nama_ibu ?? null,
      hp_ibu: values?.telepon_ibu ?? null,
      pendidikan_ibu: values?.pendidikan_ibu ?? null,
      pekerjaan_ibu: values?.pekerjaan_ibu ?? null,
      nik_wali: values?.nik_wali ?? null,
      nama_wali: values?.nama_wali ?? null,
      hp_wali: values?.telepon_wali ?? null,
      pendidikan_wali: values?.pendidikan_wali ?? null,
      pekerjaan_wali: values?.pekerjaan_wali ?? null,
    }

    try {
      createOrangTua({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  // --- Sukses ---
  useEffect(() => {
    if (isSuccessOrangTua) {
      toast.success(`Data orang tua berhasil disimpan!`, {
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
        setActiveIndex(4)
        setName('kelengkapan-dokumen')
        dispatch(setStateBiodata({ page: 'kelengkapan-dokumen' }))
        navigate(`/main/profil?page=${'kelengkapan-dokumen'}`)
      }, 2000)
    }
  }, [isSuccessOrangTua])

  // --- Error ---
  useEffect(() => {
    if (isErrorOrangTua) {
      const errorMsg = errorOrangTua as {
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
  }, [isErrorOrangTua, errorOrangTua])

  const isLoading = isLoadingOrangTua || isLoadingProfil

  const isValidasi = getProfil?.validasi?.status === enumValidasi?.SUDAHVALIDASI

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-1 flex-col gap-32 pb-32">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {/* --- Ayah --- */}
              <div className="flex flex-col gap-24">
                <p className="font-bold">Ayah</p>
                <FormAyah
                  form={form}
                  isLoading={isLoading}
                  getProfil={getProfil}
                  disabled={isValidasi}
                />
              </div>
              {/* --- Ibu --- */}
              <div className="flex flex-col gap-24">
                <p className="font-bold">Ibu</p>
                <FormIbu
                  form={form}
                  isLoading={isLoading}
                  getProfil={getProfil}
                  disabled={isValidasi}
                />
              </div>
              {/* --- Wali --- */}
              <div className="flex flex-col gap-24">
                <p className="font-bold">Wali</p>
                <FormWali
                  form={form}
                  isLoading={isLoading}
                  getProfil={getProfil}
                  disabled={isValidasi}
                />
              </div>
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
              disabled={isLoading}
              onClick={() => {
                if (jenjang.toLowerCase() === 'sd') {
                  setActiveIndex(1)
                  setName('informasi-pribadi')
                  dispatch(setStateBiodata({ page: 'informasi-pribadi' }))
                  navigate(`/main/profil?page=${'informasi-pribadi'}`)
                } else {
                  setActiveIndex(2)
                  setName('pendidikan-sebelumnya')
                  dispatch(setStateBiodata({ page: 'pendidikan-sebelumnya' }))
                  navigate(`/main/profil?page=${'pendidikan-sebelumnya'}`)
                }
              }}
            >
              Kembali
            </button>
            <button
              disabled={isLoading}
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
