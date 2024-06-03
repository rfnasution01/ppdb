export function DataComponent({
  label,
  value,
}: {
  label?: string
  value?: string
}) {
  return (
    <div className="flex w-full items-center text-[2rem] font-light phones:text-[2.4rem]">
      <p className="w-1/5 phones:w-1/2">{label}</p>
      <p className="w-4/5 phones:w-1/2">: {value}</p>
    </div>
  )
}
