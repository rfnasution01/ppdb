import { Accordion } from '@/features/aturan/accordion-aturan'
import { DashboardType, FaqType } from '@/libs/types/dashboard-type'
import clsx from 'clsx'
import { Check, Ticket, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export function StatusPendaftaran({
  item,
  faq,
}: {
  item: DashboardType
  faq: FaqType[]
}) {
  return (
    <div className="scrollbar flex h-full flex-col gap-64 overflow-y-auto">
      <div className="flex flex-col gap-16">
        <p className="text-[3rem] font-bold">Status Pendaftaran</p>
        <p>
          Sedang menunggu{' '}
          {item?.status_pendaftaran?.lulus === 1
            ? 'daftar ulang'
            : item?.status_pendaftaran?.pengumuman === 1
              ? 'hasil kelulusan'
              : item?.status_pendaftaran?.verifikasi === 2
                ? 'pengumuman'
                : item?.status_pendaftaran?.validasi === 1
                  ? 'verifikasi admin'
                  : 'validasi admin'}
        </p>
      </div>

      {/* --- Progressbar --- */}
      <div className="flex flex-col gap-8 rounded-2xl border border-[#eaeaea] bg-white px-48 py-64 phones:hidden">
        <div className="flex items-center justify-center">
          {/* --- Validasi --- */}
          <div className="flex w-1/5 items-center justify-center">
            <hr className={clsx('flex-1 border-2 border-[#ffd800]')} />
            <div
              className={clsx(
                'flex flex-col items-center justify-center gap-4 rounded-full text-white',
                {
                  'h-[5rem] w-[5rem]': item?.status_pendaftaran?.validasi !== 0,
                  'h-[2rem] w-[2rem]': item?.status_pendaftaran?.validasi === 0,
                },
                {
                  'bg-[#ffd800]': item?.status_pendaftaran?.validasi === 0,
                  'bg-green-300': item?.status_pendaftaran?.validasi === 1,
                  'bg-red-300': item?.status_pendaftaran?.validasi === 2,
                },
              )}
            >
              {item?.status_pendaftaran?.validasi === 1 ? (
                <Check size={20} />
              ) : item?.status_pendaftaran?.validasi === 2 ? (
                <X size={20} />
              ) : (
                ''
              )}
            </div>
            <hr
              className={clsx('flex-1 border-2', {
                'border-[#ffd800]': item?.status_pendaftaran?.validasi !== 0,
                'border[#efefef]': item?.status_pendaftaran?.validasi !== 0,
              })}
            />
          </div>
          {/* --- Verifikasi --- */}
          <div className="flex w-1/5 items-center justify-center">
            <hr
              className={clsx('flex-1 border-2', {
                'border-[#ffd800]': item?.status_pendaftaran?.validasi !== 0,
                'border[#efefef]': item?.status_pendaftaran?.validasi !== 0,
              })}
            />
            <div
              className={clsx(
                'flex flex-col items-center justify-center gap-4 rounded-full text-white',
                {
                  'h-[5rem] w-[5rem]':
                    item?.status_pendaftaran?.validasi === 1 &&
                    item?.status_pendaftaran?.verifikasi > 1,
                  'h-[2rem] w-[2rem]': !(
                    item?.status_pendaftaran?.validasi === 1 &&
                    item?.status_pendaftaran?.verifikasi > 1
                  ),
                },
                {
                  'bg-[#ffd800]':
                    !(
                      item?.status_pendaftaran?.validasi === 1 &&
                      item?.status_pendaftaran?.verifikasi === 2
                    ) &&
                    !(
                      item?.status_pendaftaran?.validasi === 1 &&
                      item?.status_pendaftaran?.verifikasi === 3
                    ),
                  'bg-green-300':
                    item?.status_pendaftaran?.validasi === 1 &&
                    item?.status_pendaftaran?.verifikasi === 2,
                  'bg-red-300':
                    item?.status_pendaftaran?.validasi === 1 &&
                    item?.status_pendaftaran?.verifikasi === 3,
                },
              )}
            >
              {item?.status_pendaftaran?.validasi === 1 &&
              item?.status_pendaftaran?.verifikasi === 2 ? (
                <Check size={20} />
              ) : item?.status_pendaftaran?.validasi === 1 &&
                item?.status_pendaftaran?.verifikasi === 3 ? (
                <X size={20} />
              ) : (
                ''
              )}
            </div>
            <hr
              className={clsx('flex-1 border-2', {
                'border-[#ffd800]':
                  item?.status_pendaftaran?.validasi === 1 &&
                  item?.status_pendaftaran?.verifikasi > 1,
                'border[#efefef]': !(
                  item?.status_pendaftaran?.validasi === 1 &&
                  item?.status_pendaftaran?.verifikasi > 1
                ),
              })}
            />
          </div>
          {/* --- Pengumuman --- */}
          <div className="flex w-1/5 items-center justify-center">
            <hr
              className={clsx('flex-1 border-2', {
                'border-[#ffd800]':
                  item?.status_pendaftaran?.validasi === 1 &&
                  item?.status_pendaftaran?.verifikasi > 1,
                'border[#efefef]': !(
                  item?.status_pendaftaran?.validasi === 1 &&
                  item?.status_pendaftaran?.verifikasi > 1
                ),
              })}
            />
            <div
              className={clsx(
                'flex flex-col items-center justify-center gap-4 rounded-full text-white',
                {
                  'h-[5rem] w-[5rem]':
                    item?.status_pendaftaran?.validasi !== 0 &&
                    item?.status_pendaftaran?.verifikasi === 2 &&
                    item?.status_pendaftaran?.pengumuman === 1,
                  'h-[2rem] w-[2rem]': !(
                    item?.status_pendaftaran?.validasi !== 0 &&
                    item?.status_pendaftaran?.verifikasi === 2 &&
                    item?.status_pendaftaran?.pengumuman === 1
                  ),
                },
                {
                  'bg-slate-300 ': !(
                    item?.status_pendaftaran?.validasi !== 0 &&
                    item?.status_pendaftaran?.verifikasi === 2
                  ),
                  'bg-[#ffd800]':
                    item?.status_pendaftaran?.validasi !== 0 &&
                    item?.status_pendaftaran?.verifikasi === 2 &&
                    item?.status_pendaftaran?.pengumuman === 0,
                  'bg-green-300':
                    item?.status_pendaftaran?.validasi !== 0 &&
                    item?.status_pendaftaran?.verifikasi === 2 &&
                    item?.status_pendaftaran?.pengumuman === 1,
                },
              )}
            >
              {item?.status_pendaftaran?.validasi !== 0 &&
              item?.status_pendaftaran?.verifikasi === 2 &&
              item?.status_pendaftaran?.pengumuman === 1 ? (
                <Check size={20} />
              ) : (
                ''
              )}
            </div>
            <hr
              className={clsx('flex-1 border-2', {
                'border-[#ffd800]':
                  item?.status_pendaftaran?.validasi !== 0 &&
                  item?.status_pendaftaran?.verifikasi === 2 &&
                  item?.status_pendaftaran?.pengumuman === 1,
                'border[#efefef]': !(
                  item?.status_pendaftaran?.validasi !== 0 &&
                  item?.status_pendaftaran?.verifikasi === 2 &&
                  item?.status_pendaftaran?.pengumuman === 1
                ),
              })}
            />
          </div>
          {/* --- Lulus --- */}
          <div className="flex w-1/5 items-center justify-center">
            <hr
              className={clsx('flex-1 border-2', {
                'border-[#ffd800]':
                  item?.status_pendaftaran?.validasi !== 0 &&
                  item?.status_pendaftaran?.verifikasi === 2 &&
                  item?.status_pendaftaran?.pengumuman === 1,
                'border[#efefef]': !(
                  item?.status_pendaftaran?.validasi !== 0 &&
                  item?.status_pendaftaran?.verifikasi === 2 &&
                  item?.status_pendaftaran?.pengumuman === 1
                ),
              })}
            />
            <div
              className={clsx(
                'flex flex-col items-center justify-center gap-4 rounded-full text-white',
                {
                  'h-[5rem] w-[5rem]':
                    item?.status_pendaftaran?.validasi !== 0 &&
                    item?.status_pendaftaran?.verifikasi === 2 &&
                    item?.status_pendaftaran?.pengumuman === 1 &&
                    item?.status_pendaftaran?.lulus === 1,
                  'h-[2rem] w-[2rem]': !(
                    item?.status_pendaftaran?.validasi !== 0 &&
                    item?.status_pendaftaran?.verifikasi === 2 &&
                    item?.status_pendaftaran?.pengumuman === 1 &&
                    item?.status_pendaftaran?.lulus === 1
                  ),
                },
                {
                  'bg-slate-300': !(
                    item?.status_pendaftaran?.validasi !== 0 &&
                    item?.status_pendaftaran?.verifikasi === 2 &&
                    item?.status_pendaftaran?.pengumuman === 1 &&
                    item?.status_pendaftaran?.lulus === 1
                  ),
                  'bg-green-300':
                    item?.status_pendaftaran?.validasi !== 0 &&
                    item?.status_pendaftaran?.verifikasi === 2 &&
                    item?.status_pendaftaran?.pengumuman === 1 &&
                    item?.status_pendaftaran?.lulus === 1,
                  'bg-red-300':
                    item?.status_pendaftaran?.validasi !== 0 &&
                    item?.status_pendaftaran?.verifikasi === 2 &&
                    item?.status_pendaftaran?.pengumuman === 1 &&
                    item?.status_pendaftaran?.lulus === 2,
                },
              )}
            >
              {item?.status_pendaftaran?.validasi !== 0 &&
              item?.status_pendaftaran?.verifikasi === 2 &&
              item?.status_pendaftaran?.pengumuman === 1 &&
              item?.status_pendaftaran?.lulus === 1 ? (
                <Check size={20} />
              ) : item?.status_pendaftaran?.validasi !== 0 &&
                item?.status_pendaftaran?.verifikasi === 2 &&
                item?.status_pendaftaran?.pengumuman === 1 &&
                item?.status_pendaftaran?.lulus === 2 ? (
                <X size={20} />
              ) : (
                ''
              )}
            </div>
            <hr
              className={clsx('flex-1 border-2', {
                'border-[#ffd800]':
                  item?.status_pendaftaran?.validasi !== 0 &&
                  item?.status_pendaftaran?.verifikasi === 2 &&
                  item?.status_pendaftaran?.pengumuman === 1 &&
                  item?.status_pendaftaran?.lulus === 1,
                'border[#efefef]': !(
                  item?.status_pendaftaran?.validasi !== 0 &&
                  item?.status_pendaftaran?.verifikasi === 2 &&
                  item?.status_pendaftaran?.pengumuman === 1 &&
                  item?.status_pendaftaran?.lulus === 1
                ),
              })}
            />
          </div>
          {/* --- Daftar Ulang --- */}
          <div className="flex w-1/5 items-center justify-center">
            <hr
              className={clsx('flex-1 border-2', {
                'border-[#ffd800]':
                  item?.status_pendaftaran?.validasi !== 0 &&
                  item?.status_pendaftaran?.verifikasi === 2 &&
                  item?.status_pendaftaran?.pengumuman === 1 &&
                  item?.status_pendaftaran?.lulus === 1,
                'border[#efefef]': !(
                  item?.status_pendaftaran?.validasi !== 0 &&
                  item?.status_pendaftaran?.verifikasi === 2 &&
                  item?.status_pendaftaran?.pengumuman === 1 &&
                  item?.status_pendaftaran?.lulus === 1
                ),
              })}
            />
            <div
              className={clsx(
                'flex flex-col items-center justify-center gap-4 rounded-full text-white',
                {
                  'h-[5rem] w-[5rem]':
                    item?.status_pendaftaran?.validasi !== 0 &&
                    item?.status_pendaftaran?.verifikasi === 2 &&
                    item?.status_pendaftaran?.pengumuman === 1 &&
                    item?.status_pendaftaran?.lulus === 1 &&
                    item?.status_pendaftaran?.registrasi_ulang === 1,
                  'h-[2rem] w-[2rem]': !(
                    item?.status_pendaftaran?.validasi !== 0 &&
                    item?.status_pendaftaran?.verifikasi === 2 &&
                    item?.status_pendaftaran?.pengumuman === 1 &&
                    item?.status_pendaftaran?.lulus === 1 &&
                    item?.status_pendaftaran?.registrasi_ulang === 1
                  ),
                },
                {
                  'bg-slate-300': !(
                    item?.status_pendaftaran?.validasi !== 0 &&
                    item?.status_pendaftaran?.verifikasi === 2 &&
                    item?.status_pendaftaran?.pengumuman === 1 &&
                    item?.status_pendaftaran?.lulus === 1 &&
                    item?.status_pendaftaran?.registrasi_ulang === 1
                  ),
                  'bg-green-300':
                    item?.status_pendaftaran?.validasi !== 0 &&
                    item?.status_pendaftaran?.verifikasi === 2 &&
                    item?.status_pendaftaran?.pengumuman === 1 &&
                    item?.status_pendaftaran?.lulus === 1 &&
                    item?.status_pendaftaran?.registrasi_ulang === 1,
                },
              )}
            >
              {item?.status_pendaftaran?.validasi !== 0 &&
              item?.status_pendaftaran?.verifikasi === 2 &&
              item?.status_pendaftaran?.pengumuman === 1 &&
              item?.status_pendaftaran?.lulus === 1 &&
              item?.status_pendaftaran?.registrasi_ulang === 1 ? (
                <Check size={20} />
              ) : (
                ''
              )}
            </div>
            <hr
              className={clsx('flex-1 border-2', {
                'border-[#ffd800]':
                  item?.status_pendaftaran?.validasi !== 0 &&
                  item?.status_pendaftaran?.verifikasi === 2 &&
                  item?.status_pendaftaran?.pengumuman === 1 &&
                  item?.status_pendaftaran?.lulus === 1,
                'border[#efefef]': !(
                  item?.status_pendaftaran?.validasi !== 0 &&
                  item?.status_pendaftaran?.verifikasi === 2 &&
                  item?.status_pendaftaran?.pengumuman === 1 &&
                  item?.status_pendaftaran?.lulus === 1
                ),
              })}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-1/5">
            <p className="text-nowrap text-center">Validasi</p>
          </div>
          <div className="w-1/5">
            <p className="text-nowrap text-center">Verifikasi</p>
          </div>
          <div className="flex-300 w-1/5">
            <p className="text-nowrap text-center">Pengumuman</p>
          </div>
          <div className="w-1/5">
            <p className="text-nowrap text-center">Lulus</p>
          </div>
          <div className="w-1/5">
            <p className="text-nowrap text-center">Daftar Ulang</p>
          </div>
        </div>
      </div>

      {/* --- Faq --- */}
      <div className="flex gap-32 phones:flex-col">
        <div className="flex w-2/3 flex-col gap-16 phones:w-full">
          <p className="text-[3rem] font-bold">Sering Ditanyakan</p>
          {faq?.map((item, idx) => (
            <div key={idx}>
              <Accordion
                title={item?.pertanyaan}
                content={item?.jawaban}
                idx={idx}
              />
            </div>
          ))}
        </div>
        <div className="flex w-1/3 flex-col items-center gap-32 phones:w-full">
          <p>Punya pertanyaan lain?</p>
          <Link
            to="/main/pertanyaan/tambah"
            className="flex items-center gap-12 rounded-full bg-primary px-48 py-12 text-white hover:bg-primary-background"
          >
            Ajukan Tiket <Ticket />
          </Link>
          <Link
            to={`${item?.tiket ? `/main/pertanyaan/detail?id=${item?.tiket}` : '/main/pertanyaan'}`}
            className="underline hover:text-primary"
          >
            Tiket Saya
          </Link>
        </div>
      </div>
    </div>
  )
}
