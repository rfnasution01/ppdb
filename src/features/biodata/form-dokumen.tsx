import FileUploadForm from './form-upload'
import { Link } from 'react-router-dom'
import { NoData } from '@/components/atoms/NoData'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import './dokumen.css'

export function FormDokumen({
  getProfil,
  isLoading,
  isValidasi,
}: {
  getProfil: ProfilData
  isLoading: boolean
  isValidasi: boolean
}) {
  return (
    <table className="w-full flex-1 border-collapse text-[2.4rem]">
      <thead className="relative z-10 align-top leading-medium">
        <tr className="border-b-[1.6rem] border-transparent">
          <th className="no sticky top-0 !w-[5%] border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
            No
          </th>
          <th className="file sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
            File
          </th>
          <th className="upload sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
            Upload
          </th>
          <th className="status sticky top-0 text-nowrap border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
            Status Verifikasi
          </th>
        </tr>
      </thead>
      <tbody>
        {getProfil?.dokumen?.data.length === 0 ? (
          <tr>
            <td colSpan={6}>
              <NoData />
            </td>
          </tr>
        ) : (
          <>
            {getProfil?.dokumen?.data?.map((item, idx) => (
              <tr
                className="w-full border-b-[1.6rem] border-transparent transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warning-tint-2"
                key={idx}
              >
                <td className="px-24 py-12 text-center align-top leading-medium">
                  {idx + 1}
                </td>
                <td className="px-24 py-12 align-top leading-medium">
                  <div className="flex flex-col gap-8">
                    <p className="font-bold">
                      {item?.nama}{' '}
                      {item?.status && (
                        <span className="font-medium text-danger">
                          ({item?.status})
                        </span>
                      )}
                    </p>
                    <div className="text-[2rem] font-light text-slate-500 phones:text-[2.4rem]">
                      {item?.keterangan}{' '}
                      <Link
                        to={item?.format}
                        className="rounded-lg text-[2rem] italic text-primary phones:text-[2.4rem]"
                        target="_blank"
                      >
                        Lihat Format
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="px-24 py-12 align-top leading-medium">
                  <FileUploadForm
                    id_dokumen={item?.id}
                    format={item?.pasfoto}
                    status_verifikasi={item?.status_verifikasi}
                    isLoading={isLoading}
                    disabled={isValidasi}
                    dok_siswa={item?.dok_siswa}
                  />
                </td>

                <td className="px-24 py-12 align-top leading-medium">
                  <div className="flex flex-col gap-8">
                    {item?.status_verifikasi === 1 ? (
                      <p className="rounded-full bg-emerald-100 px-24 py-8 text-[1.8rem] text-emerald-700 phones:text-[2.2rem]">
                        Sudah Di Verifikasi
                      </p>
                    ) : item?.status_verifikasi === 2 ? (
                      <p className="rounded-full bg-rose-100 px-24 py-8 text-[1.8rem] text-rose-700 phones:text-[2.2rem]">
                        Verifikasi Gagal
                      </p>
                    ) : (
                      <p className="rounded-full bg-slate-100 px-24 py-8 text-[1.8rem] text-slate-700 phones:text-[2.2rem]">
                        Belum Di Verifikasi
                      </p>
                    )}
                    {item?.status_verifikasi > 0 && (
                      <p>Petugas: {item?.petugas}</p>
                    )}
                    {item?.status_verifikasi === 2 && (
                      <p>Komentar: {item?.komentar}</p>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  )
}
