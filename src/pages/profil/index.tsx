import { ProfilData } from '@/libs/types/pendaftaran-type'
import { useGetProfilQuery } from '@/store/slices/pendaftaranAPI'
import { useEffect, useState } from 'react'
import { ProfilDataPenting, ProfilDataSiswa } from '@/features/profil'

export default function Profil() {
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
    <div className="scrollbar flex h-full w-full overflow-auto phones:flex-col phones:gap-32">
      {/* --- Informasi Penting --- */}
      <ProfilDataPenting profil={profil} isLoading={isLoading} />
      <ProfilDataSiswa profil={profil} isLoading={isLoading} />
    </div>
  )
}
