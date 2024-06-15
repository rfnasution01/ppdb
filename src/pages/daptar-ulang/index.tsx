import { useEffect, useState } from 'react'
import { MultiSkeleton } from '@/components/molecules/skeleton'
import { DaftarUlangData } from './daptar-ulang-data'
import { DaftarUlangHasil } from './daftar-ulang-hasil'
import { DashboardType } from '@/libs/types/dashboard-type'
import { useGetDashboardQuery } from '@/store/slices/dashboardAPI'

export default function DaftarUlang() {
  const [dashboard, setDashboard] = useState<DashboardType>()
  const { data, isFetching, isLoading } = useGetDashboardQuery()
  const load = isFetching || isLoading

  useEffect(() => {
    if (data) {
      setDashboard(data?.data)
    }
  }, [data])

  return (
    <div className="flex h-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex items-center justify-between gap-32">
        <p className="text-[3.2rem] font-bold phones:text-[3.6rem]">
          Daftar Ulang
        </p>
      </div>
      {/* --- Content --- */}
      {load ? <MultiSkeleton /> : <DaftarUlangHasil profil={dashboard} />}
      {dashboard?.status_pendaftaran?.registrasi_ulang === 1 && (
        <DaftarUlangData profil={dashboard} />
      )}
    </div>
  )
}
