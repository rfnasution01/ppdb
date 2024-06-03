import { ProfilData } from '@/libs/types/pendaftaran-type'
import { useGetProfilQuery } from '@/store/slices/pendaftaranAPI'
import { useEffect, useState } from 'react'
import { enumVerifikasi } from '@/libs/enum/enum-verifikasi'
import Cookies from 'js-cookie'
import { VerifikasiHasil } from './verifikasi-hasil'
import { VerifikasiData } from './verifikasi-data'
import { MultiSkeleton } from '@/components/molecules/skeleton'

export default function Verifikasi() {
  const jenjang = Cookies.get('jenjang')
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
    <div className="flex h-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex items-center justify-between gap-32">
        <p className="text-[3.2rem] font-bold phones:text-[3.6rem]">
          Verifikasi
        </p>
      </div>

      {isLoading ? (
        <MultiSkeleton />
      ) : (
        <VerifikasiHasil
          status={profil?.verifikasi?.status}
          jenjang={jenjang}
          sekolah={profil?.verifikasi?.sekolah_verifikasi}
          profil={profil}
        />
      )}
      {profil?.verifikasi?.status > enumVerifikasi.DIPROSES && (
        <VerifikasiData profil={profil} />
      )}
    </div>
  )
}
