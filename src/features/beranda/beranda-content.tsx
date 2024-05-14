import { NoData } from '@/components/atoms/NoData'
import { SingleSkeleton } from '@/components/molecules/skeleton'
import { GelombangType, SekilasType } from '@/libs/types'
import { useGetGelombangQuery } from '@/store/slices/gelombangAPI'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export function BerandaContent({
  showJenjang,
  getSekilas,
  isLoading,
}: {
  showJenjang: string
  getSekilas: SekilasType
  isLoading: boolean
}) {
  console.log(showJenjang)
  // --- Gelombang ---
  const [gelombang, setGekombang] = useState<GelombangType[]>([])
  const {
    data: getGelombang,
    isLoading: isLoadingGelombang,
    isFetching: isFetchingGelombang,
  } = useGetGelombangQuery({
    jenjang: showJenjang.toLowerCase(),
  })

  const isLoadingGetGelombang = isLoadingGelombang || isFetchingGelombang

  useEffect(() => {
    if (getGelombang?.data) {
      setGekombang(getGelombang?.data)
    }
  }, [getGelombang?.data])

  return (
    <div
      className="flex flex-col gap-24 rounded-2xl border bg-white p-32 shadow-md"
      style={{ lineHeight: '130%' }}
    >
      {/* --- Gelombang --- */}
      <div className="grid grid-cols-12 gap-32">
        {isLoadingGetGelombang ? (
          <div className="col-span-4 flex flex-col gap-12 rounded-2xl p-24 shadow-md hover:cursor-pointer hover:shadow-lg phones:col-span-12">
            <SingleSkeleton height="h-[3.2rem]" width="w-2/5" />
            <SingleSkeleton height="h-[2.4rem]" />
            <SingleSkeleton height="h-[2.4rem]" />
          </div>
        ) : gelombang?.length === 0 ? (
          <div className="col-span-4 phones:col-span-12" />
        ) : (
          <>
            {gelombang?.map((item, idx) => (
              <div
                className="col-span-4 flex items-center gap-24 rounded-2xl p-24 shadow-md hover:cursor-pointer hover:shadow-lg phones:col-span-12"
                key={idx}
              >
                <div className="flex flex-1 flex-col">
                  <p className="font-bold">{item?.nama}</p>
                  <div className="text-[2rem] font-light phones:text-[2.4rem]">
                    Pendaftaran:{' '}
                    <span>
                      {dayjs(item?.tgl_awal_daftar)
                        .locale('id')
                        .format('DD MMMM YYYY')}
                    </span>{' '}
                    -{' '}
                    <span>
                      {dayjs(item?.tgl_akhir_daftar)
                        .locale('id')
                        .format('DD MMMM YYYY')}
                    </span>
                  </div>
                  <p className="text-[2rem] font-light phones:text-[2.4rem]">
                    Pengumuman:{' '}
                    <span className="font-bold">
                      {dayjs(item?.tgl_pengumuman)
                        .locale('id')
                        .format('DD MMMM YYYY hh:mm A')}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {isLoading ? (
        <SingleSkeleton />
      ) : getSekilas ? (
        <div dangerouslySetInnerHTML={{ __html: getSekilas?.isi }} />
      ) : (
        <NoData />
      )}
      {/* --- Title --- */}
      {/* <div className="font-nunito">
        Bagi masyarakat dan calon siswa dapat memanfaatkan fasilitas{' '}
        <Link
          to={`/pesan-anda?jenjang=${showJenjang.toLowerCase()}`}
          className="text-primary-background hover:cursor-pointer"
        >
          Pesan Anda
        </Link>{' '}
        di situs ini untuk bantuan informasi lebih lanjut. Bagi anda calon
        peserta, harap membaca Aturan dan{' '}
        <Link
          to={`/alur?jenjang=${showJenjang.toLowerCase()}`}
          className="text-primary-background hover:cursor-pointer"
        >
          Prosedur pendaftaran
        </Link>{' '}
        dengan seksama sebelum melakukan proses pendaftaran. Demikian informasi
        ini dan terima kasih atas perhatian dan kerjasamanya.
      </div> */}
      {/* --- Alur --- */}
      {/* <div className="grid grid-cols-12 gap-32">
        <Link
          to=""
          className="col-span-4 flex flex-col gap-y-12 rounded-lg border border-warning-tint-1 bg-warning-tint-2 p-32 shadow-md hover:cursor-pointer hover:shadow-lg phones:col-span-12"
        >
          <p className="text-[2.8rem] font-bold">Mengisi Formulir</p>
          <p>Mengisi Formulir di Sekolah Tujuan</p>
        </Link>
        <Link
          to=""
          className="col-span-4 flex flex-col gap-y-12 rounded-lg border border-warning-tint-1 bg-warning-tint-2 p-32 shadow-md hover:cursor-pointer hover:shadow-lg phones:col-span-12"
        >
          <p className="text-[2.8rem] font-bold">Input Pendaftaran</p>
          <p>Input Pendaftaran Oleh Operator PPDB Sekolah</p>
        </Link>
        <Link
          to="/seleksi"
          className="col-span-4 flex flex-col gap-y-12 rounded-lg border border-warning-tint-1 bg-warning-tint-2 p-32 shadow-md hover:cursor-pointer hover:shadow-lg phones:col-span-12"
        >
          <p className="text-[2.8rem] font-bold">Memantau Hasil Seleksi</p>
          <p>Memantau Hasil Seleksi Siswa Memantau Hasil Seleksi</p>
        </Link>
      </div> */}
      {/* --- Ask --- */}
      {/* <div className="flex flex-col gap-y-8 font-helvetica text-primary-900">
        {[
          'Mendaftar sebagai Peserta?',
          'Bagaimana Cara dan Aturan Pendaftaran?',
          'Saya harus kemana dulu?',
          'Sampai kapan daftarnya?',
          'Lihat Lokasi Sekolah?',
          'Lihat Daya tampung Sekolah?',
          'Lihat Statistik hasil?',
        ].map((item, idx) => (
          <Link
            to=""
            className="flex gap-8 hover:text-primary-background"
            key={idx}
          >
            <CircleHelp size={16} />
            {item}
          </Link>
        ))}
      </div> */}
    </div>
  )
}
