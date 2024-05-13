import clsx from 'clsx'
import { Link } from 'react-router-dom'

export function DaptarHeader({ showJenjang }: { showJenjang: string }) {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <p className="text-[3.6rem]">Pendaftaran Reguler</p>
      <div className="flex items-center gap-64 phones:flex-col phones:gap-32">
        <p className="font-nunito">
          Berikut informasi mengenai pendaftaran PPDB {showJenjang} Reguler di
          Dinas Pendidikan Pemuda dan Olahraga Kab. Deli Serdang Periode 2024 /
          2025.
        </p>
        <div className="flex w-full flex-col gap-y-16">
          <Link
            to="/daptar-akun"
            className="animate-bounce rounded-lg bg-emerald-700 px-24 py-12 text-white duration-300 hover:bg-emerald-900 phones:w-full"
          >
            <p className="text-nowrap text-center">Daptar Akun</p>
          </Link>
          <button
            type="button"
            className={clsx('rounded-lg px-24 py-12 text-white phones:w-full', {
              'bg-primary-background hover:bg-primary-700':
                showJenjang.toLowerCase() === 'smp',
              'bg-danger-tint-4 hover:bg-danger-tint-3':
                showJenjang.toLowerCase() === 'sd',
            })}
          >
            <p className="text-nowrap">Pilih Loket Sekolah</p>
          </button>
        </div>
      </div>
    </div>
  )
}
