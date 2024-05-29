import { ProfilData } from '@/libs/types/pendaftaran-type'
import { useGetProfilQuery } from '@/store/slices/pendaftaranAPI'
import { useEffect, useState } from 'react'
import { enumVerifikasi } from '@/libs/enum/enum-verifikasi'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { MultiSkeleton } from '@/components/molecules/skeleton'
import { NoData } from '@/components/atoms/NoData'
import { enumValidasi } from '@/libs/enum/enum-validasi'
import { DataComponent } from './data-component'
import { HasilPendaftaran } from './cetak-hasil'
import Cookies from 'js-cookie'

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
        {profil?.verifikasi?.status === enumVerifikasi?.DISETUJUI && (
          <HasilPendaftaran jenjang={jenjang} profil={profil} />
        )}
      </div>
      {/* --- Content --- */}
      <div className="flex h-full w-full flex-col items-start gap-32">
        <div className="flex w-1/2 flex-col gap-12 rounded-2xl bg-white p-32 phones:w-full">
          {isLoading ? (
            <MultiSkeleton />
          ) : (
            <>
              {profil?.validasi?.status === enumValidasi.BELUMVALIDASI ? (
                <NoData title="Data Belum Divalidasi" />
              ) : profil?.verifikasi?.status <= enumVerifikasi?.DIPROSES ? (
                <NoData title="Menunggu Verifikasi" />
              ) : (
                <>
                  <div className="flex">
                    <p
                      className={clsx(
                        'border-l-2 p-12 text-[1.8rem] phones:text-[2.2rem]',
                        {
                          'border-red-100 bg-red-50 bg-opacity-40 text-red-700':
                            profil?.verifikasi?.status ===
                            enumVerifikasi?.DITOLAK,
                          'border-green-100 bg-green-50 bg-opacity-40 text-green-700':
                            profil?.verifikasi?.status ===
                            enumVerifikasi?.DISETUJUI,
                          'border-yellow-100 bg-yellow-50 bg-opacity-40 text-yellow-700':
                            profil?.verifikasi?.status <=
                            enumVerifikasi?.DIPROSES,
                        },
                      )}
                    >
                      {profil?.verifikasi?.status === enumVerifikasi?.DISETUJUI
                        ? 'Verifikasi Diterima'
                        : profil?.verifikasi?.status === enumVerifikasi?.DITOLAK
                          ? 'Verifikasi Ditolak'
                          : profil?.verifikasi?.status <=
                              enumVerifikasi?.DIPROSES
                            ? 'Menunggu Verifikasi'
                            : 'Belum Unggah'}
                    </p>
                  </div>
                  <DataComponent
                    label="Tanggal Verifikasi"
                    value={
                      profil?.verifikasi?.tanggal_verifikasi
                        ? dayjs(profil?.verifikasi?.tanggal_verifikasi)
                            .locale('id')
                            .format('DD MMMM YYYY hh:mm:ss A')
                        : '-'
                    }
                  />
                  <DataComponent
                    label="Petugas Verifikasi"
                    value={profil?.verifikasi?.petugas ?? '-'}
                  />

                  <DataComponent
                    label="Komentar"
                    value={profil?.verifikasi?.komentar ?? '-'}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
