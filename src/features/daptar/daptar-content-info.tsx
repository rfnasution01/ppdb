import dayjs from 'dayjs'

export function DaptarContentInfo() {
  return (
    <div className="flex flex-col gap-12 rounded-lg bg-warning-tint-2 p-24 text-[2rem]">
      <div className="flex w-full items-center gap-y-12">
        <p className="flex-1">
          Status Data: <span className="text-orange-700">Sementata</span>
        </p>
        <p className="flex-1">
          Wilayah Seleksi:{' '}
          <span className="text-orange-700">Kab. Batu Bara</span>
        </p>
      </div>
      <div className="flex w-full items-center gap-y-12">
        <p className="flex-1">
          Hasil s/d tanggal:{' '}
          <span className="text-orange-700">
            {dayjs().locale('id').format('DD MMMM YYYY hh:mm A')}
          </span>
        </p>
        <p className="flex-1">
          Tanggal seleksi:{' '}
          <span className="text-orange-700">05 June 2024 - 16 June 2024</span>
        </p>
      </div>
    </div>
  )
}
