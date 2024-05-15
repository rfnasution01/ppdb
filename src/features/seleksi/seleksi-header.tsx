import clsx from 'clsx'

export function SeleksiHeader({ showJenjang }: { showJenjang: string }) {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <p className="text-[3.6rem]">Hasil Seleksi Reguler</p>
      <div className="flex items-center gap-64 phones:flex-col phones:gap-32">
        <p className="font-nunito">
          Halaman ini berisi hasil seleksi Penerimaan Peserta Didik Baru{' '}
          {showJenjang}
          Reguler di Dinas Pendidikan Pemuda dan Olahraga Kab. Batu Bara Periode
          2024 / 2025.
        </p>
        <button
          type="button"
          className={clsx('rounded-lg px-24 py-12 text-white phones:w-full', {
            'bg-primary hover:bg-primary-700':
              showJenjang.toLowerCase() === 'smp',
            'bg-danger-100 hover:bg-danger-300':
              showJenjang.toLowerCase() === 'sd',
          })}
        >
          <p className="text-nowrap">Pilih Loket Sekolah</p>
        </button>
      </div>
    </div>
  )
}
