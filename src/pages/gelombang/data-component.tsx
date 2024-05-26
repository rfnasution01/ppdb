import dayjs from 'dayjs'

export function DataComponent({
  label,
  value1,
  value2,
}: {
  label?: string
  value1: string
  value2?: string
}) {
  return (
    <div className="flex w-full items-center text-[2rem] font-light phones:text-[2.4rem]">
      <p className="w-1/3 phones:w-1/2">{label}</p>
      <p className="w-2/3 phones:w-1/2">
        : <span>{dayjs(value1).locale('id').format('DD MMMM')}</span> s/d{' '}
        <span>{dayjs(value2).locale('id').format('DD MMMM YYYY')}</span>
      </p>
    </div>
  )
}
