import { Mail, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { tiketSchema } from '@/libs/schema/ticket-schema'
import { FormTiket } from './form-tiket'
import {
  useCreateTiketMutation,
  useEditTiketMutation,
  useGetTiketQuery,
} from '@/store/slices/tiketAPI'
import { TiketType } from '@/libs/types/tiket-type'
import { NoData } from '@/components/atoms/NoData'
import { ModalLayanan } from './modal-layanan'
import { MappingLayanan } from './mapping-layanan'
import Loading from '@/components/atoms/Loading'

export default function KotakMasuk() {
  const [isShowTiket, setIsShowTiket] = useState<boolean>(false)
  const [isShowEdtTiket, setIsShowEditTiket] = useState<boolean>(false)

  // --- Layanan ---
  const [layanan, setLayanan] = useState<TiketType[]>([])
  const [canAdd, setCanAdd] = useState<boolean>(false)
  const {
    data: getLayanan,
    isLoading: isLoadingLayanan,
    isFetching: isFetchingLayanan,
  } = useGetTiketQuery()

  const isLoading = isFetchingLayanan || isLoadingLayanan

  useEffect(() => {
    if (getLayanan) {
      setLayanan(getLayanan?.data)
      setCanAdd(getLayanan?.can_add)
    }
  }, [getLayanan])

  // --- Form Schema ---
  const form = useForm<zod.infer<typeof tiketSchema>>({
    resolver: zodResolver(tiketSchema),
    defaultValues: {},
  })

  const [file, setFile] = useState<File | null>(null)
  const [id, setId] = useState<string>()

  // --- Create Upload ---
  const [
    createUpload,
    {
      isError: isErrorUpload,
      error: errorUpload,
      isLoading: isLoadingUpload,
      isSuccess: isSuccessUpload,
    },
  ] = useCreateTiketMutation()

  const handleSubmit = async (values) => {
    const formData = new FormData()
    formData.append('judul', values?.judul)
    formData.append('keterangan', values?.keterangan)

    if (file) {
      formData.append('berkas', file)
    }

    try {
      await createUpload({ data: formData })
    } catch (error) {
      console.error('Gagal mengunggah file:', error)
    } finally {
      setIsShowTiket(false)
    }
  }

  useEffect(() => {
    if (isSuccessUpload) {
      toast.success('Tiket berhasil dibuat!', {
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
  }, [isSuccessUpload])

  useEffect(() => {
    if (isErrorUpload) {
      const errorMsg = errorUpload as { data?: { message?: string } }

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
  }, [isErrorUpload, errorUpload])

  // --- Create Edit ---
  const [
    createEdit,
    {
      isError: isErrorEdit,
      error: errorEdit,
      isLoading: isLoadingEdit,
      isSuccess: isSuccessEdit,
    },
  ] = useEditTiketMutation()

  const handleSubmitEdit = async (values) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('judul', values?.judul)
    formData.append('keterangan', values?.keterangan)

    if (file) {
      formData.append('berkas', file)
    }

    try {
      await createEdit({ data: formData })
    } catch (error) {
      console.error('Gagal mengunggah file:', error)
    } finally {
      setIsShowEditTiket(false)
    }
  }

  useEffect(() => {
    if (isSuccessEdit) {
      toast.success('Tiket berhasil diedit!', {
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
  }, [isSuccessEdit])

  useEffect(() => {
    if (isErrorEdit) {
      const errorMsg = errorEdit as { data?: { message?: string } }

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
  }, [isErrorEdit, errorEdit])

  return (
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Jumlah Ticket --- */}
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-32 rounded-2xl border bg-white p-16">
          <div className="flex flex-col gap-8">
            <p className="text-[3.2rem] font-bold phones:text-[3.6rem]">
              {/* {layanan?.verifikasi?.status === enumVerifikasi.DISETUJUI ||
              layanan?.verifikasi?.status === enumVerifikasi.DITOLAK
                ? 1
                : 0} */}
              0
            </p>
            <p>Pesan Baru</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-400 to-rose-600 p-12 text-white">
            <Mail size={24} />
          </div>
        </div>
      </div>

      <div className="flex">
        <button
          type="button"
          disabled={!canAdd}
          onClick={() => {
            setIsShowTiket(true)
          }}
          className="flex items-center justify-center gap-12 rounded-lg bg-green-700 px-24 py-12 text-[2rem] text-white hover:bg-green-900 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
          Buat Ticket
        </button>
      </div>
      {/* --- Layanan --- */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex h-full flex-col gap-24">
          {layanan?.length === 0 ? (
            <NoData />
          ) : (
            <MappingLayanan
              setIsShow={setIsShowEditTiket}
              data={layanan}
              form={form}
              isShowEditTiket={isShowEdtTiket}
              setIsShowEditTiket={setIsShowEditTiket}
              handleSubmit={handleSubmit}
              handleSubmitEdit={handleSubmitEdit}
              isLoadingEdit={isLoadingEdit}
              isLoadingUpload={isLoadingUpload}
              setFile={setFile}
              id={id}
              setId={setId}
            />
          )}
        </div>
      )}

      <ModalLayanan
        isOpen={isShowTiket}
        setIsOpen={setIsShowTiket}
        title="Form Buat Tiket"
        children={
          <div className="flex w-full flex-col gap-32 text-[2rem]">
            <FormTiket
              setIsShowTiket={setIsShowTiket}
              form={form}
              setIsShowEditTiket={setIsShowEditTiket}
              handleSubmit={handleSubmit}
              handleSubmitEdit={handleSubmitEdit}
              isLoadingEdit={isLoadingEdit}
              isLoadingUpload={isLoadingUpload}
              setFile={setFile}
            />
          </div>
        }
      />

      <ToastContainer />
    </div>
  )
}
