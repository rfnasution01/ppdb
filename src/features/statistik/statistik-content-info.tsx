import { HeaderType } from '@/libs/types'
import dayjs from 'dayjs'

export function StatistikContentInfo({ header }: { header: HeaderType }) {
  return (
    <div className="flex flex-col gap-12 rounded-lg bg-warning-tint-2 p-24 text-[2rem]">
      <div className="flex w-full items-center gap-y-12 phones:flex-col phones:items-start">
        <p className="flex-1">
          Status Data:{' '}
          <span className="text-orange-700">{header?.status_data}</span>
        </p>
        <p className="flex-1">
          Wilayah Seleksi:{' '}
          <span className="text-orange-700">{header?.wilayah}</span>
        </p>
      </div>
      <div className="flex w-full items-center gap-y-12 phones:flex-col phones:items-start">
        <p className="flex-1">
          Hasil s/d tanggal:{' '}
          <span className="text-orange-700">
            {dayjs(header?.tanggal_data)
              .locale('id')
              .format('DD MMMM YYYY hh:mm A')}
          </span>
        </p>
        <p className="flex-1">
          Tanggal seleksi:{' '}
          <span className="text-orange-700">{header?.tanggal_seleksi}</span>
        </p>
      </div>
    </div>
  )
}
