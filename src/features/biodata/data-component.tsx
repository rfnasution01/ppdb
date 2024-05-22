export function DataComponent({
  value,
  label,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-4 ">
      <p className="font-bold">{label}</p>
      <p>{value}</p>
    </div>
  )
}
