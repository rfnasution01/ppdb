import { FormTiket } from './form-tiket'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { tiketSchema } from '@/libs/schema/ticket-schema'
import { useEffect, useState } from 'react'
import { useEditTiketMutation, useGetTiketQuery } from '@/store/slices/tiketAPI'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import { useGetProfilQuery } from '@/store/slices/pendaftaranAPI'
import { TiketType } from '@/libs/types/tiket-type'

export default function EditTiket() {
  const [urls, setUrls] = useState([])

  const searchParams = new URLSearchParams(location.search)
  const idParams = searchParams.get('id')
  const navigate = useNavigate()

  // --- Form Schema ---
  const form = useForm<zod.infer<typeof tiketSchema>>({
    resolver: zodResolver(tiketSchema),
    defaultValues: {},
  })

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
    const body = {
      id: idParams,
      judul: values?.judul,
      keterangan: values?.keterangan,
      berkas: urls,
    }
    try {
      await createEdit({ data: body })
    } catch (error) {
      console.error('Gagal mengunggah file:', error)
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
      setTimeout(() => {
        navigate(`/main/pertanyaan`)
      }, 2000)
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

  // --- Profil ---
  const [profil, setProfil] = useState<ProfilData>()
  const { data: getProfil } = useGetProfilQuery()

  useEffect(() => {
    if (getProfil?.data) {
      setProfil(getProfil?.data)
    }
  }, [getProfil?.data])

  // --- Layanan ---
  const [layanan, setLayanan] = useState<TiketType[]>([])
  const { data: getLayanan } = useGetTiketQuery()

  useEffect(() => {
    if (getLayanan) {
      setLayanan(getLayanan?.data)
    }
  }, [getLayanan])

  const data = layanan?.find((item) => item?.id === idParams)

  return (
    <div className="flex w-full flex-col gap-32">
      <div className="flex flex-col gap-16">
        <p className="text-[5rem] font-bold text-[#00b0f0]">Open Ticket</p>
        <p className="text-[3rem] text-[#ff150c]">
          Silahkan sampaikan keluhan Anda dengan mengisi formulir di bawah ini
        </p>
      </div>

      <div className="flex w-1/2 items-center gap-32 text-[2rem] phones:w-full">
        <div className="flex w-1/2 flex-col gap-12">
          <p>Nama</p>
          <div className="flex rounded-lg bg-[#d9d9d9] p-16 hover:cursor-not-allowed">
            {profil?.biodata?.nama ?? '-'}
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-12">
          <p>Nomor Peserta</p>
          <div className="flex rounded-lg bg-[#d9d9d9] p-16 text-[2rem] hover:cursor-not-allowed">
            {profil?.biodata?.nomor_peserta ?? '-'}
          </div>
        </div>
      </div>
      <FormTiket
        form={form}
        handleSubmitEdit={handleSubmitEdit}
        isLoadingEdit={isLoadingEdit}
        isEdit
        setUrls={setUrls}
        data={data}
      />
      <ToastContainer />
    </div>
  )
}
