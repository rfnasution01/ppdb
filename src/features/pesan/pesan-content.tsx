import clsx from 'clsx'

export function PesanContent({ showJenjang }: { showJenjang: string }) {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <p
        className={clsx('rounded-2xl p-24 ', {
          'bg-primary-50 text-primary-700': showJenjang.toLowerCase() === 'smp',
          'bg-danger-tint-1 text-danger-tint-4':
            showJenjang.toLowerCase() === 'sd',
        })}
      >
        <span className="font-bold">Pemberitahuan!</span> Belum ada pesan.
      </p>
    </div>
  )
}
