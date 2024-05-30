import { Mail, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useGetTiketQuery } from '@/store/slices/tiketAPI'
import { TiketType } from '@/libs/types/tiket-type'
import { NoData } from '@/components/atoms/NoData'
import { MappingLayanan } from './mapping-layanan'
import Loading from '@/components/atoms/Loading'
import { Link } from 'react-router-dom'

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
        <Link
          to={`${canAdd ? '/main/pertanyaan/tambah' : ''}`}
          className={`flex items-center justify-center gap-12 rounded-lg bg-green-700 px-24 py-12 text-[2rem] text-white hover:bg-green-900 ${canAdd ? 'hover:cursor-pointer' : 'cursor-not-allowed'}`}
        >
          <Plus size={16} />
          Buat Ticket
        </Link>
      </div>
      {/* --- Layanan --- */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex h-full flex-col gap-24">
          {layanan?.length === 0 ? (
            <NoData />
          ) : (
            <MappingLayanan data={layanan} />
          )}
        </div>
      )}

      <ToastContainer />
    </div>
  )
}
