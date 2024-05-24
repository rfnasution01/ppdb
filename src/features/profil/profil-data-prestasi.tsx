import { NoData } from '@/components/atoms/NoData'
import { MultiSkeleton } from '@/components/molecules/skeleton'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import clsx from 'clsx'
import { Medal } from 'lucide-react'
import { Link } from 'react-router-dom'

export function ProfilPrestaasi({
  profil,
  isLoading,
}: {
  profil: ProfilData
  isLoading?: boolean
}) {
  return (
    <div className="flex items-start gap-16">
      <Medal size={18} />
      <div className="flex w-full flex-col gap-12">
        <p className="font-bold">Prestasi</p>
        {isLoading ? (
          <MultiSkeleton />
        ) : (
          <div className="grid grid-cols-12 gap-24">
            {profil?.prestasi?.data?.length === 0 ? (
              <div className="col-span-12">
                <NoData />
              </div>
            ) : (
              <>
                {profil?.prestasi?.data?.map((item, idx) => (
                  <div
                    className="col-span-4 flex flex-col gap-12 p-12 shadow phones:col-span-12"
                    key={idx}
                  >
                    <div className="flex items-center gap-12 phones:flex-col phones:items-start">
                      <p
                        className={clsx(
                          'border-l-2 p-12 text-[1.8rem] phones:text-[2.2rem]',
                          {
                            'border-red-100 bg-red-50 bg-opacity-40 text-red-700':
                              !item?.sertifikat,
                            'border-green-100 bg-green-50 bg-opacity-40 text-green-700':
                              item?.sertifikat,
                          },
                        )}
                      >
                        {item?.sertifikat ? 'Sudah Unggah' : 'Belum Unggah'}
                      </p>
                      <p
                        className={clsx(
                          'border-l-2 p-12 text-[1.8rem] phones:text-[2.2rem]',
                          {
                            'border-red-100 bg-red-50 bg-opacity-40 text-red-700':
                              item?.sertifikat && item?.validasi === 2,
                            'border-green-100 bg-green-50 bg-opacity-40 text-green-700':
                              item?.sertifikat && item?.validasi === 1,
                            'border-yellow-100 bg-yellow-50 bg-opacity-40 text-yellow-700':
                              item?.sertifikat && item?.validasi === 0,
                            'border-slate-100 bg-slate-50 bg-opacity-40 text-slate-700':
                              !item?.sertifikat,
                          },
                        )}
                      >
                        {item?.validasi === 1
                          ? 'Sudah Verifikasi'
                          : item?.validasi === 2
                            ? 'Verifikasi Ditolak'
                            : item?.validasi === 0
                              ? 'Menunggu Persetujuan'
                              : 'Belum Unggah'}
                      </p>
                    </div>
                    <p className="flex-1 text-[2rem]  font-bold phones:text-[2.4rem]">
                      {item?.nama_prestasi ?? '-'}
                    </p>
                    {item?.sertifikat ? (
                      <Link
                        to={item?.sertifikat}
                        target="_blank"
                        className="text-[2rem]  text-primary phones:text-[2.4rem]"
                      >
                        Tampilkan File
                      </Link>
                    ) : (
                      <p className=" text-[2rem] phones:text-[2.4rem]">
                        File belum di unggah
                      </p>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
