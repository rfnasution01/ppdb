import clsx from 'clsx'

export function DaptarContent({ showJenjang }: { showJenjang: string }) {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <button
        type="button"
        className={clsx('rounded-2xl py-16 text-white', {
          'bg-primary-background hover:bg-primary-700':
            showJenjang.toLowerCase() === 'smp',
          'bg-danger-tint-4 hover:bg-danger-tint-3':
            showJenjang.toLowerCase() === 'sd',
        })}
      >
        Data Pendaftar
      </button>
      <p
        className={clsx('rounded-2xl p-24 ', {
          'bg-primary-50 text-primary-700': showJenjang.toLowerCase() === 'smp',
          'bg-danger-tint-1 text-danger-tint-4':
            showJenjang.toLowerCase() === 'sd',
        })}
      >
        <span className="font-bold">Informasi!</span> Silakan memilih loket
        Sekolah terlebih dahulu
      </p>
    </div>
  )
}