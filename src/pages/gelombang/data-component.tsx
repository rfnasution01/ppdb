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
    <div className="text-[2rem] font-light phones:text-[2.4rem]">
      {label}: <span>{dayjs(value1).locale('id').format('DD MMMM')}</span> s/d{' '}
      <span>{dayjs(value2).locale('id').format('DD MMMM YYYY')}</span>
    </div>
  )
}
