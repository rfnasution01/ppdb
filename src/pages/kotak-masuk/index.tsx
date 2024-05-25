import { MultiSkeleton } from '@/components/molecules/skeleton'
import { enumVerifikasi } from '@/libs/enum/enum-verifikasi'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import { useGetProfilQuery } from '@/store/slices/pendaftaranAPI'
import { Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Accordion } from './accordion-verifikasi'
import { VerifikasiTitle } from './verif-title'
import { VerifikasiContent } from './verif-content'
import { NoData } from '@/components/atoms/NoData'

export default function KotakMasuk() {
  // --- Profil ---
  const [profil, setProfil] = useState<ProfilData>()
  const {
    data: getProfil,
    isLoading: isLoadingProfil,
    isFetching: isFetchingProfil,
  } = useGetProfilQuery()

  const isLoading = isFetchingProfil || isLoadingProfil

  useEffect(() => {
    if (getProfil?.data) {
      setProfil(getProfil?.data)
    }
  }, [getProfil?.data])

  return (
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Jumlah Email --- */}
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-32 rounded-2xl border bg-white p-16">
          <div className="flex flex-col gap-8">
            <p className="text-[3.2rem] font-bold phones:text-[3.6rem]">
              {profil?.verifikasi?.status === enumVerifikasi.DISETUJUI ||
              profil?.verifikasi?.status === enumVerifikasi.DITOLAK
                ? 1
                : 0}
            </p>
            <p>Pesan Baru</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-400 to-rose-600 p-12 text-white">
            <Mail size={24} />
          </div>
        </div>
      </div>
      {/* --- Email --- */}
      {isLoading ? (
        <MultiSkeleton />
      ) : (
        <div className="flex flex-col gap-24">
          {profil?.verifikasi?.status > enumVerifikasi.DIPROSES ? (
            <Accordion
              title={<VerifikasiTitle profil={profil} />}
              content={<VerifikasiContent profil={profil} />}
            />
          ) : (
            <NoData />
          )}
        </div>
      )}
    </div>
  )
}
