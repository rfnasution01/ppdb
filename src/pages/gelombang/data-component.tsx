import clsx from 'clsx'
import dayjs from 'dayjs'

export function DataComponent({
  label,
  value1,
  value2,
  title,
}: {
  label?: string
  value1: string
  value2?: string
  title?: string
}) {
  return (
    <div
      className={clsx(
        'flex w-full items-center px-16 py-12 text-[2rem] font-light phones:text-[2.4rem]',
        {
          'bg-[#A6C9EC]': title === 'daftar',
          'bg-[#FBE2D5]': title === 'daftar-ulang' || title === 'verifikasi',
        },
      )}
    >
      <p className="w-1/3 phones:w-1/2">{label}</p>
      <p className="w-2/3 phones:w-1/2">
        : <span>{dayjs(value1).locale('id').format('DD MMMM')}</span> s/d{' '}
        <span>{dayjs(value2).locale('id').format('DD MMMM YYYY')}</span>
      </p>
    </div>
  )
}
