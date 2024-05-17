export function DataComponent({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-12 text-[2rem] phones:text-[2.4rem]">
      <p className="font-bold">{label}</p>
      <p className="font-light">{value}</p>
    </div>
  )
}
