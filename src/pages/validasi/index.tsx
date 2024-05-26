import { ProfilData } from '@/libs/types/pendaftaran-type'
import { useGetProfilQuery } from '@/store/slices/pendaftaranAPI'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { MultiSkeleton } from '@/components/molecules/skeleton'
import { NoData } from '@/components/atoms/NoData'
import { enumValidasi } from '@/libs/enum/enum-validasi'
import { CetakBuktiPendaftaran } from '@/features/profil/cetak-bukti-pendaftaran'

export default function Validasi() {
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
        <p className="font-bold">Validasi</p>
        {profil?.validasi?.status === enumValidasi?.SUDAHVALIDASI && (
          <CetakBuktiPendaftaran profil={profil} />
        )}
      </div>
      {/* --- Content --- */}
      <div className="flex w-1/2 flex-col gap-12 rounded-2xl bg-white p-32 phones:w-full">
        {isLoading ? (
          <MultiSkeleton />
        ) : (
          <>
            {profil?.validasi?.status === enumValidasi.BELUMVALIDASI ? (
              <NoData title="Data Belum Divalidasi" />
            ) : (
              <>
                <div className="flex">
                  <p
                    className={clsx(
                      'border-l-2 p-12 text-[1.8rem] phones:text-[2.2rem]',
                      {
                        'border-green-100 bg-green-50 bg-opacity-40 text-green-700':
                          profil?.validasi?.status ===
                          enumValidasi?.SUDAHVALIDASI,
                      },
                    )}
                  >
                    {profil?.validasi?.status === enumValidasi?.SUDAHVALIDASI
                      ? 'Sudah Validasi'
                      : 'Belum Validasis'}
                  </p>
                </div>
                <p className="text-[2rem]">
                  Tanggal Validasi:{' '}
                  {profil?.validasi?.tanggal_validasi
                    ? dayjs(profil?.validasi?.tanggal_validasi)
                        .locale('id')
                        .format('DD MMMM YYYY hh:mm:ss A')
                    : '-'}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
