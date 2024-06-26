import clsx from 'clsx'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ModalDaptar } from './modal-lokasi'
import { DaptarAkunType } from '@/libs/types/daptar-akun'
import { capitalizeFirstLetterFromLowercase } from '@/libs/helpers/format-text'
import { SingleSkeleton } from '@/components/molecules/skeleton'
import { useSelector } from 'react-redux'
import { getPilihSekolahSlice } from '@/store/reducer/statePilihSekolah'

export function DaptarHeader({
  jenjang,
  kode,
  showJenjang,
  getDaftarAkun,
  isLoading,
}: {
  jenjang: string
  kode: string
  showJenjang: string
  getDaftarAkun: DaptarAkunType
  isLoading: boolean
}) {
  const [isShow, setIsShow] = useState<boolean>(false)
  const pilihSekolah = useSelector(getPilihSekolahSlice)

  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      {isLoading ? (
        <SingleSkeleton height="h-[3.2rem]" width="w-2/6" />
      ) : (
        <p className="text-[3.6rem]">
          {capitalizeFirstLetterFromLowercase(getDaftarAkun?.judul)}
        </p>
      )}
      <div className="flex items-center gap-64 phones:flex-col phones:gap-32">
        {isLoading ? (
          <SingleSkeleton height="h-[2.4rem]" />
        ) : (
          <p className="font-nunito">{getDaftarAkun?.deskripsi}</p>
        )}
        <div className="flex w-full flex-col gap-y-16">
          <Link
            to={`/daftar-akun?jenjang=${showJenjang?.toLowerCase()}&kode=${kode}`}
            className="animate-bounce rounded-lg bg-emerald-700 px-24 py-12 text-white duration-300 hover:bg-emerald-900 phones:w-full"
          >
            <p className="text-nowrap text-center">Daftar Akun</p>
          </Link>
          <div
            onClick={() => setIsShow(true)}
            className={clsx(
              'rounded-2xl px-24 py-12 text-center text-white hover:cursor-pointer phones:w-full',
              {
                'bg-primary hover:bg-primary-700':
                  showJenjang.toLowerCase() === 'smp',
                'bg-danger-100 hover:bg-danger-300':
                  showJenjang.toLowerCase() === 'sd',
              },
            )}
          >
            {pilihSekolah?.id ? (
              <div className="flex items-center gap-24 p-16">
                <div className="rounded-2xl bg-white p-4">
                  <img
                    src="/img/tutwuri.png"
                    alt="tutwuri"
                    className="w-[7rem]"
                  />
                </div>
                <div className="flex flex-col gap-16 text-left text-white">
                  <p className="font-bold uppercase">{pilihSekolah?.name}</p>
                  <p className="uppercase">
                    {pilihSekolah?.status} - {pilihSekolah?.npsn}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-nowrap">Pilih Loket Sekolah</p>
            )}
          </div>
        </div>
      </div>
      <ModalDaptar
        isOpen={isShow}
        setIsOpen={setIsShow}
        kode={kode}
        jenjang={jenjang}
        pilihSekolah={pilihSekolah}
      />
    </div>
  )
}
