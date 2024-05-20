export function DataComponent2({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="items-centertext-[2rem] flex phones:text-[2.4rem]">
      <p className="w-2/6">{label}</p>
      <p className="w-4/6">: {value}</p>
    </div>
  )
}
