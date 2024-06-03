import { ProfilData } from '@/libs/types/pendaftaran-type'
import { useGetProfilQuery } from '@/store/slices/pendaftaranAPI'
import { useEffect, useState } from 'react'
import { MultiSkeleton } from '@/components/molecules/skeleton'
import { enumValidasi } from '@/libs/enum/enum-validasi'
import Cookies from 'js-cookie'
import { ValidasiHasil } from './validasi-hasil'
import { ValidasiData } from './validasi-data'

export default function Validasi() {
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
        <p className="text-[3.2rem] font-bold phones:text-[3.6rem]">Validasi</p>
      </div>
      {/* --- Content --- */}
      {isLoading ? (
        <MultiSkeleton />
      ) : (
        <ValidasiHasil jenjang={jenjang} profil={profil} />
      )}
      {profil?.validasi?.status === enumValidasi?.SUDAHVALIDASI && (
        <ValidasiData profil={profil} />
      )}
    </div>
  )
}
