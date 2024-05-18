import { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import FileUploadForm from './form-upload'
import Cookies from 'js-cookie'

export function BiodataDokumen({
  setName,
  setActiveIndex,
  getProfil,
  isLoading,
}: {
  setName: Dispatch<SetStateAction<string>>
  setActiveIndex: Dispatch<SetStateAction<number>>
  getProfil: ProfilData
  isLoading: boolean
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const jenjang = Cookies.get('jenjang')

  return (
    <div className="scrollbar flex h-full w-full flex-col overflow-auto">
      <div className="scrollbar flex h-full flex-1 flex-col gap-32 overflow-auto pb-32">
        {/* --- Dokumen --- */}
        <table className="flex-1 border-collapse text-[2.4rem]">
          <thead className="relative z-10 align-top leading-medium">
            <tr className="border-b-[1.6rem] border-transparent">
              <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                No
              </th>
              <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                File
              </th>
              <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                Format
              </th>
              <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                Upload
              </th>
              <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                Tampilkan
              </th>
              <th className="sticky right-0 top-0 text-nowrap border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                Status Verifikasi
              </th>
            </tr>
          </thead>
          <tbody>
            {getProfil?.dokumen?.data?.map((item, idx) => (
              <tr
                className="w-full border-b-[1.6rem] border-transparent transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warning-tint-2"
                key={idx}
              >
                <td className="px-24 py-12 leading-medium">{idx + 1}</td>
                <td className="px-24 py-12 leading-medium">
                  <div className="flex flex-col gap-8">
                    <p className="font-bold">
                      {item?.nama}{' '}
                      {item?.status && (
                        <span className="font-medium text-danger">
                          ({item?.status})
                        </span>
                      )}
                    </p>
                    <p>{item?.keterangan}</p>
                  </div>
                </td>
                <td className="px-24 py-12 leading-medium">
                  <Link
                    to={item?.format}
                    className="text-primary"
                    target="_blank"
                  >
                    Lihat Format
                  </Link>
                </td>
                <td className="px-24 py-12 leading-medium">
                  <FileUploadForm
                    id_dokumen={item?.id}
                    format={item?.pasfoto}
                    status_verifikasi={item?.status_verifikasi}
                    isLoading={isLoading}
                  />
                </td>
                <td className="px-24 py-12 leading-medium">
                  {item?.dok_siswa ? (
                    <Link
                      to={item?.dok_siswa}
                      className="text-primary"
                      target="_blank"
                    >
                      Tampilkan File
                    </Link>
                  ) : (
                    'File belum diupload'
                  )}
                </td>
                <td className="sticky right-0 bg-white px-24 py-12 leading-medium">
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
          </tbody>
        </table>
      </div>
      {/* --- button --- */}
      <div className="flex items-center justify-between bg-primary-50 p-32">
        <p className="text-[1.8rem] text-emerald-800">* Wajib Diisi</p>
        <div className="flex items-center gap-16 text-[2rem]">
          <button
            className="rounded-2xl bg-primary-background px-24 py-12 text-white hover:bg-primary-700"
            type="button"
            disabled={isLoading}
            onClick={() => {
              setActiveIndex(jenjang.toLowerCase() === 'sd' ? 3 : 4)
              setName('orang-tua')
              dispatch(setStateBiodata({ page: 'orang-tua' }))
              navigate(`/main?page=${'orang-tua'}`)
            }}
          >
            Kembali
          </button>
          <button
            disabled={isLoading}
            className="rounded-2xl bg-emerald-700 px-24 py-12 text-white hover:bg-emerald-900"
            type="submit"
            onClick={() => {
              setActiveIndex(5)
              setName('pilih-sekolah')
              dispatch(setStateBiodata({ page: 'pilih-sekolah' }))
              navigate(`/main?page=${'pilih-sekolah'}`)
            }}
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  )
}
