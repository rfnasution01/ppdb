import { useEffect, useState } from 'react'
import { Profil } from './profil'
import { DashboardType, FaqType } from '@/libs/types/dashboard-type'
import { useGetDashboardQuery } from '@/store/slices/dashboardAPI'
import { MultiSkeleton } from '@/components/molecules/skeleton'
import { StatusPendaftaran } from './status-pendaftaran'
import { useCreateDaptarGelombangMutation } from '@/store/slices/daptarGelombangAPI'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { setStateJalur } from '@/store/reducer/stateJalur'
import { setStateGelombang } from '@/store/reducer/stateGelombang'

export default function SiswaBeranda() {
  const [dashboard, setDashboard] = useState<DashboardType>()
  const [faq, setFaq] = useState<FaqType[]>([])
  const { data, isFetching, isLoading } = useGetDashboardQuery()
  const load = isFetching || isLoading
  const [idGelombang, setIdGelombang] = useState<string>('')
  const [jalur, setJalur] = useState<string>('')

  useEffect(() => {
    if (data) {
      setDashboard(data?.data)
      setFaq(data?.data?.faq)
    }
  }, [data])

  // --- Create Daftar ---
  const navigate = useNavigate()
  const [createDaptar, { isSuccess, isError, error }] =
    useCreateDaptarGelombangMutation()

  const handleSubmit = async () => {
    try {
      const res = await createDaptar()

      if ('data' in res) {
        setIdGelombang(res?.data?.data?.id_gelombang)
        setJalur(res?.data?.data?.jalur)
      } else {
        console.error('Error occurred:', res.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Berhasil mendaftar ke gelombang 2!`, {
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
        Cookies.set('idGelombang', idGelombang)
        Cookies.set('jalur', jalur)
        dispatch(
          setStateGelombang({
            kode: idGelombang,
          }),
        )
        dispatch(
          setStateJalur({
            kode: jalur,
          }),
        )
        Cookies.set('jalur', jalur)
        navigate(`/main/profil`)
      }, 1000)
    }
  }, [isSuccess, idGelombang])

  useEffect(() => {
    if (isError) {
      const errorMsg = error as {
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
  }, [isError, error])

  return (
    <div className="flex h-full flex-col gap-32">
      {load ? (
        <MultiSkeleton />
      ) : (
        <>
          {/* --- Profil --- */}
          <Profil item={dashboard} />
          {/* --- Status Pendaftaran --- */}
          <StatusPendaftaran
            item={dashboard}
            faq={faq}
            handleSubmit={handleSubmit}
          />
        </>
      )}
      <ToastContainer />
    </div>
  )
}
