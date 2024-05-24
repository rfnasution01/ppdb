import { ProfilData } from '@/libs/types/pendaftaran-type'
import { ProfilAlamat } from './profil-alamat'
import { ProfilSekolah } from './profil-sekolah'
import Cookies from 'js-cookie'
import { ProfilOrangTua } from './profil-data-orang-tua'
import { ProfilDokumen } from './profil-data-dokumen'
import { ProfilPilihan } from './profil-data-pilihan'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ModalValidasi } from './modal-validasi'
import { AlertCircle } from 'lucide-react'
import { enumValidasi } from '@/libs/enum/enum-validasi'
import clsx from 'clsx'
import { enumVerifikasi } from '@/libs/enum/enum-verifikasi'
import { CetakBuktiPendaftaran } from './cetak-bukti-pendaftaran'
import { ProfilPrestaasi } from './profil-data-prestasi'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function ProfilDataSiswa({
  profil,
  isLoading,
}: {
  profil: ProfilData
  isLoading: boolean
}) {
  const jenjang = Cookies.get('jenjang')
  const navigate = useNavigate()
  const [show, setIsShow] = useState<boolean>(false)

  const isiDataSelesai = profil?.pilihan?.status
  const dataSudahValidasi =
    profil?.validasi?.status === enumValidasi?.SUDAHVALIDASI

  return (
    <div
      className="scrollbar flex-1 overflow-auto bg-white phones:overflow-visible"
      style={{ borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem' }}
    >
      <div
        className="flex h-full flex-col bg-white"
        style={{
          borderTopRightRadius: '1rem',
          borderBottomRightRadius: '1rem',
        }}
      >
        <div className="flex items-center justify-between gap-32 p-32 phones:flex-col phones:items-start">
          <div className="flex items-center gap-32 phones:flex-col phones:items-start phones:gap-12">
            <p className="font-roboto text-[2.8rem] font-bold uppercase phones:text-[3.2rem]">
              {profil?.biodata?.nama ?? '-'}
            </p>
            <div className="flex items-center gap-12 phones:flex-col phones:items-start phones:gap-12">
              <p
                className={clsx(
                  'rounded-full px-24 py-12 text-[2rem] phones:text-[2.4rem]',
                  {
                    'bg-slate-200 text-slate-700':
                      profil?.validasi?.status !== enumValidasi?.SUDAHVALIDASI,
                    'bg-emerald-200 text-emerald-700':
                      profil?.validasi?.status === enumValidasi?.SUDAHVALIDASI,
                  },
                )}
              >
                {profil?.validasi?.status === enumValidasi?.SUDAHVALIDASI
                  ? 'Sudah Validasi'
                  : 'Belum Validasi'}
              </p>
              {profil?.validasi?.status === enumValidasi?.SUDAHVALIDASI && (
                <p
                  className={clsx(
                    'rounded-full px-24 py-12 text-[2rem] phones:text-[2.4rem]',
                    {
                      'bg-orange-200 text-orange-700':
                        profil?.verifikasi?.status <= enumVerifikasi?.DIPROSES,
                      'bg-emerald-200 text-emerald-700':
                        profil?.verifikasi?.status ===
                        enumVerifikasi?.DISETUJUI,
                      'bg-red-200 text-red-700':
                        profil?.verifikasi?.status === enumVerifikasi?.DITOLAK,
                    },
                  )}
                >
                  {profil?.verifikasi?.status === enumVerifikasi?.DISETUJUI
                    ? 'Sudah Verifikasi'
                    : profil?.verifikasi?.status === enumVerifikasi?.DITOLAK
                      ? 'Verifikasi Ditolak'
                      : 'Menunggu Verifikasi'}
                </p>
              )}
            </div>
          </div>
          {profil?.validasi?.status === enumValidasi?.SUDAHVALIDASI && (
            <div className="flex items-center gap-32 phones:flex-col phones:items-start phones:gap-12">
              <CetakBuktiPendaftaran profil={profil} />
              {profil?.verifikasi?.status !== enumVerifikasi.DIPROSES && (
                <Link
                  to="/main/verifikasi"
                  className="rounded-full bg-primary px-24 py-12 text-[2rem] text-primary-50 hover:bg-primary-background"
                >
                  Lihat Hasil Verifikasi
                </Link>
              )}
            </div>
          )}
        </div>
        <hr className="border" />
        <div className="flex flex-col gap-32 p-32">
          <ProfilAlamat profil={profil} isLoading={isLoading} />
          {jenjang.toLowerCase() === 'smp' && (
            <ProfilSekolah profil={profil} isLoading={isLoading} />
          )}
          <ProfilOrangTua profil={profil} isLoading={isLoading} />
          <ProfilDokumen profil={profil} isLoading={isLoading} />
          <ProfilPrestaasi profil={profil} isLoading={isLoading} />
          <ProfilPilihan profil={profil} isLoading={isLoading} />
          <div className="flex items-center justify-between gap-32 text-[2rem] phones:flex-col phones:text-[2.4rem]">
            <div className="flex items-center gap-12 text-danger-300">
              <span className="hidden phones:block">
                <AlertCircle size={20} />
              </span>
              <span className="phones:hidden">
                <AlertCircle size={16} />
              </span>
              <p>
                <span className="font-bold">Informasi!</span> Pastikan semua
                data sudah terisi sebelum melakukan validasi
              </p>
            </div>
            <div className="flex items-center gap-32 phones:w-full phones:flex-col phones:gap-12">
              <button
                className="rounded-2xl bg-primary-background px-24 py-12 text-white hover:bg-primary-700 disabled:cursor-not-allowed phones:w-full"
                type="button"
                disabled={isLoading || dataSudahValidasi}
                onClick={() => {
                  navigate(`/main?page=${'jalur-pendaftaran'}`)
                }}
              >
                Edit
              </button>
              <button
                disabled={isLoading || !isiDataSelesai || dataSudahValidasi}
                className="flex items-center justify-center gap-12 rounded-2xl bg-emerald-700 px-24 py-12 text-center text-white hover:bg-emerald-900 disabled:cursor-not-allowed phones:w-full"
                type="button"
                onClick={() => setIsShow(true)}
              >
                Validasi
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalValidasi isOpen={show} setIsOpen={setIsShow} />
      <ToastContainer />
    </div>
  )
}
