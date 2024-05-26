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
      <p className="text-[2.4rem] font-bold phones:text-[2.8rem]">
        Jadwal Pendaftaran
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
                className="col-span-4 flex items-center gap-24 rounded-2xl bg-white p-24 shadow-md hover:cursor-pointer hover:shadow-lg phones:col-span-12"
                key={idx}
              >
                <div className="flex flex-1 flex-col gap-12">
                  <p className="font-bold">{item?.nama}</p>
                  <div className="flex flex-col gap-8">
                    <DataComponent
                      label="Pendaftaran Online"
                      value1={item?.tgl_awal_daftar}
                      value2={item?.tgl_akhir_daftar}
                    />
                    <DataComponent
                      label="Verifikasi Sesuai Tujuan"
                      value1={item?.tgl_awal_daftar}
                      value2={item?.batas_verifikasi}
                    />
                    <div className="text-[2rem] font-light phones:text-[2.4rem]">
                      Pengumuman Kelulusan:{' '}
                      <span>
                        {dayjs(item?.tgl_pengumuman)
                          .locale('id')
                          .format('DD MMMM YYYY hh:mm:ss A')}
                      </span>
                    </div>
                    <DataComponent
                      label="Daptar Ulang"
                      value1={dayjs(item?.tgl_akhir_daftar)
                        .add(1, 'day')
                        .format()}
                      value2={item?.batas_daftar_ulang}
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
