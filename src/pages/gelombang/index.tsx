import { SingleSkeleton } from '@/components/molecules/skeleton'
import { GelombangType } from '@/libs/types'
import { useGetGelombangQuery } from '@/store/slices/gelombangAPI'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { DataComponent } from './data-component'

export default function Gelombang() {
  const jenjang = Cookies.get('jenjang')
  // --- Gelombang ---
  const [gelombang, setGekombang] = useState<GelombangType[]>([])
  const {
    data: getGelombang,
    isLoading: isLoadingGelombang,
    isFetching: isFetchingGelombang,
  } = useGetGelombangQuery({
    jenjang: jenjang.toLowerCase(),
  })

  const isLoadingGetGelombang = isLoadingGelombang || isFetchingGelombang

  useEffect(() => {
    if (getGelombang?.data) {
      setGekombang(getGelombang?.data)
    }
  }, [getGelombang?.data])
  return (
    <div className="flex h-full w-full flex-col gap-32">
      <p className="text-[3.2rem] font-bold phones:text-[3.6rem]">
        Jadwal Pendaftaran PPDB Online Tahun 2024
      </p>
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
                className="col-span-6 flex items-center gap-24 rounded-2xl bg-white p-24 shadow-md hover:cursor-pointer hover:shadow-lg phones:col-span-12"
                key={idx}
              >
                <div className="flex flex-1 flex-col gap-12">
                  <p className="bg-[#FF0000] p-16 font-bold text-white">
                    {item?.nama}
                  </p>
                  <div className="flex flex-col gap-8">
                    <DataComponent
                      label="Pendaftaran Online"
                      value1={item?.tgl_awal_daftar}
                      value2={item?.tgl_akhir_daftar}
                      title="daftar"
                    />
                    <DataComponent
                      label="Verifikasi Sesuai Tujuan"
                      value1={item?.tgl_awal_daftar}
                      value2={item?.batas_verifikasi}
                      title="verifikasi"
                    />
                    <div className="flex w-full bg-[#C0E6F5] px-16 py-12 text-[2rem] font-light phones:text-[2.4rem]">
                      <p className="w-1/3 phones:w-1/2">
                        Pengumuman Kelulusan:
                      </p>{' '}
                      <p className="w-2/3 phones:w-1/2">
                        <span>
                          :{' '}
                          {dayjs(item?.tgl_pengumuman)
                            .locale('id')
                            .format('DD MMMM YYYY hh:mm:ss A')}
                        </span>
                      </p>
                    </div>
                    <DataComponent
                      label="Daftar Ulang"
                      value1={dayjs(item?.tgl_akhir_daftar)
                        .add(1, 'day')
                        .format()}
                      value2={item?.batas_daftar_ulang}
                      title="daftar-ulang"
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
