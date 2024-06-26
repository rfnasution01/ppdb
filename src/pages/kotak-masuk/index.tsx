import { Mail, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  useGetTiketNotifikasiQuery,
  useGetTiketQuery,
} from '@/store/slices/tiketAPI'
import { TikeetNotificationType, TiketType } from '@/libs/types/tiket-type'
import { NoData } from '@/components/atoms/NoData'
import Loading from '@/components/atoms/Loading'
import { Link } from 'react-router-dom'
import { MappingTiket } from './mapping-tiket'

export default function KotakMasuk() {
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

  // --- Notifikasi ---
  const [notifikasi, setNotifikasi] = useState<TikeetNotificationType>()
  const {
    data: getNotifikasi,
    isLoading: isLoadingNotifikasi,
    isFetching: isFetchingNotifikasi,
  } = useGetTiketNotifikasiQuery()

  const isLoadingNotif = isFetchingNotifikasi || isLoadingNotifikasi

  useEffect(() => {
    if (getNotifikasi) {
      setNotifikasi(getNotifikasi)
    }
  }, [getNotifikasi])

  return (
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Jumlah Ticket --- */}
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-32 rounded-2xl border bg-white p-16">
          <div className="flex flex-col gap-8">
            {isLoadingNotif ? (
              <Loading />
            ) : (
              <p className="text-[3.2rem] font-bold phones:text-[3.6rem]">
                {notifikasi?.data ?? 0}
              </p>
            )}

            <p>Pesan Baru</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-400 to-rose-600 p-12 text-white">
            <Mail size={24} />
          </div>
        </div>
      </div>

      <div className="flex ">
        <Link
          to={`${canAdd ? '/main/pertanyaan/tambah' : ''}`}
          className={`flex items-center justify-center gap-12 rounded-lg bg-green-700 px-24 py-12 text-[2rem] text-white hover:bg-green-900 ${canAdd ? 'hover:cursor-pointer' : 'cursor-not-allowed'}`}
        >
          <Plus size={16} />
          Buat Ticket
        </Link>
      </div>
      <div className="scrollbar h-full flex-1 overflow-y-auto">
        {/* --- Layanan --- */}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="scrollbar flex h-full flex-col gap-24 overflow-y-auto">
            {layanan?.length === 0 ? (
              <NoData />
            ) : (
              <MappingTiket data={layanan} />
            )}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  )
}
