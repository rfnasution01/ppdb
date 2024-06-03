import { ProfilData } from '@/libs/types/pendaftaran-type'
import { TiketDetailType } from '@/libs/types/tiket-type'
import { useGetProfilQuery } from '@/store/slices/pendaftaranAPI'
import {
  useCreateTiketChatMutation,
  useCreateTutupChatMutation,
  useGetTiketDetailQuery,
  useGetTiketNotifikasiQuery,
} from '@/store/slices/tiketAPI'
import { useEffect, useState } from 'react'
import { DetailTiketProfil } from './detail-tiket-profil'
import { DetailTiketData } from './detail-tiket-data'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { chatSchema, closeSchema } from '@/libs/schema/ticket-schema'
import { FormChat } from './form-chat'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { MultiSkeleton } from '@/components/molecules/skeleton'
import { DetailHistory } from './detail-tiket-history'
import clsx from 'clsx'
import { Form } from '@/components/atoms/Form'
import { ArrowLeft, Loader, Ticket } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function DetailTiket() {
  const searchParams = new URLSearchParams(location.search)
  const idParams = searchParams.get('id')

  //   --- Detail ---
  const [detail, setDetail] = useState<TiketDetailType>()
  const { data, isLoading, isFetching } = useGetTiketDetailQuery({
    id: idParams,
  })

  useEffect(() => {
    if (data?.data) {
      setDetail(data?.data)
    }
  }, [data?.data])

  // --- Profil ---
  const [profil, setProfil] = useState<ProfilData>()
  const { data: getProfil } = useGetProfilQuery()

  useEffect(() => {
    if (getProfil?.data) {
      setProfil(getProfil?.data)
    }
  }, [getProfil?.data])

  const pasPhoto = profil?.dokumen?.data?.find(
    (item) => item?.id === '1',
  )?.dok_siswa

  const [urls, setUrls] = useState<string[]>([])

  // --- Form Schema ---
  const form = useForm<zod.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {},
  })

  // --- Create Upload ---
  const [
    createUpload,
    {
      isError: isErrorUpload,
      error: errorUpload,
      isLoading: isLoadingUpload,
      isSuccess: isSuccessUpload,
    },
  ] = useCreateTiketChatMutation()

  const handleSubmit = async (values) => {
    const body = {
      id: idParams,
      isi: values?.isi,
      berkas: urls,
    }
    try {
      await createUpload({ data: body })
    } catch (error) {
      console.error('Gagal mengunggah file:', error)
    }
  }

  useEffect(() => {
    if (isSuccessUpload) {
      toast.success('Pesan berhasil dikirim!', {
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
      form.reset()
      setUrls([])
      //   window.location.reload()
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

  // --- Create Close ---
  const [
    createClose,
    {
      isError: isErrorClose,
      isLoading: isLoadingClose,
      error: errorClose,
      isSuccess: isSuccessClose,
    },
  ] = useCreateTutupChatMutation()

  const formClose = useForm<zod.infer<typeof closeSchema>>({
    resolver: zodResolver(closeSchema),
    defaultValues: {},
  })

  const handleSubmitClose = async () => {
    const body = {
      id: idParams,
    }
    try {
      await createClose({ data: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessClose) {
      toast.success('Tiket berhasil ditutup!', {
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
  }, [isSuccessClose])

  useEffect(() => {
    if (isErrorClose) {
      const errorMsg = errorClose as { data?: { message?: string } }

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
  }, [isErrorClose, errorClose])

  const navigate = useNavigate()

  const { data: notifData, refetch } = useGetTiketNotifikasiQuery()

  useEffect(() => {
    if (notifData?.data > 0) {
      refetch()
    }
  }, [notifData])

  return (
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex flex-col gap-12 border-b border-[#ccd2da] pb-16">
        <p className="text-[3rem]">{detail?.ticket?.judul ?? '-'}</p>
        <div className="flex items-center justify-between">
          <div
            className={clsx('rounded-full px-24 py-8 text-[2rem]', {
              'bg-blue-300 text-blue-700': detail?.ticket?.status === 0,
              'bg-orange-300 text-orange-700': detail?.ticket?.status === 1,
              'bg-green-300 text-green-700': detail?.ticket?.status === 2,
            })}
          >
            {detail?.ticket?.status === 1
              ? 'Berlangsung'
              : detail?.ticket?.status === 2
                ? 'Selesai'
                : 'Menunggu'}
          </div>
          <div className="flex items-center gap-24">
            <button
              onClick={() => {
                navigate('/main/pertanyaan')
              }}
              type="button"
              className="flex items-center gap-12 rounded-full bg-green-500 px-24 py-12 text-[2rem] text-white hover:bg-green-700 disabled:hover:cursor-not-allowed"
            >
              <ArrowLeft size={16} />
              Kembali
            </button>
            {detail?.ticket?.status !== 2 && (
              <Form {...formClose}>
                <form
                  className="scrollbar flex h-full w-full flex-col gap-32 overflow-auto rounded-2xl border"
                  onSubmit={formClose.handleSubmit(handleSubmitClose)}
                >
                  <button
                    disabled={detail?.ticket?.status === 2}
                    type="submit"
                    className="flex items-center gap-12 rounded-full bg-blue-500 px-24 py-12 text-[2rem] text-white hover:bg-blue-700 disabled:hover:cursor-not-allowed"
                  >
                    Tutup Tiket
                    {isLoadingClose ? (
                      <span className="animate-spin duration-300">
                        <Loader size={16} />
                      </span>
                    ) : (
                      <Ticket size={16} />
                    )}
                  </button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
      {/* --- Tiket --- */}
      <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto">
        {isFetching || isLoading ? (
          <MultiSkeleton />
        ) : (
          <div className="flex gap-32">
            {/* --- Image Profil --- */}
            <DetailTiketProfil pasPhoto={pasPhoto} profil={profil} />
            {/* --- Data Tiket --- */}
            <DetailTiketData profil={profil} detail={detail} />
          </div>
        )}
        <hr className="border" />

        {/* --- Chat --- */}
        <DetailHistory detail={detail} profil={profil} />

        {detail?.ticket?.status !== 2 ? (
          <div className="flex gap-32">
            {/* --- Image Profil --- */}
            <DetailTiketProfil pasPhoto={pasPhoto} profil={profil} />
            {/* --- Data Tiket --- */}
            <FormChat
              form={form}
              handleSubmit={handleSubmit}
              isLoadingUpload={isLoadingUpload}
              setUrls={setUrls}
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-red-300 bg-red-100 p-24 text-red-700">
            Tiket telah ditutup
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}
