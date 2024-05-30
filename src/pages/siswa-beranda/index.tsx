import { useEffect, useState } from 'react'
import { Profil } from './profil'
import { DashboardType, FaqType } from '@/libs/types/dashboard-type'
import { useGetDashboardQuery } from '@/store/slices/dashboardAPI'
import { MultiSkeleton } from '@/components/molecules/skeleton'
import { StatusPendaftaran } from './status-pendaftaran'

export default function SiswaBeranda() {
  const [dashboard, setDashboard] = useState<DashboardType>()
  const [faq, setFaq] = useState<FaqType[]>([])
  const { data, isFetching, isLoading } = useGetDashboardQuery()
  const load = isFetching || isLoading

  useEffect(() => {
    if (data) {
      setDashboard(data?.data)
      setFaq(data?.data?.faq)
    }
  }, [data])

  return (
    <div className="flex h-full flex-col gap-32">
      {load ? (
        <MultiSkeleton />
      ) : (
        <>
          {/* --- Profil --- */}
          <Profil item={dashboard} />
          {/* --- Status Pendaftaran --- */}
          <StatusPendaftaran item={dashboard} faq={faq} />
        </>
      )}
    </div>
  )
}
