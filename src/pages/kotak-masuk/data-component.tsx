export function DataComponent({
  label,
  value,
  isItalic,
}: {
  label: string
  value: string
  isItalic?: boolean
}) {
  return (
    <div
      className={`flex w-full items-center gap-24 text-[2rem] phones:text-[2.4rem] ${isItalic && 'italic'}`}
    >
      <p className="w-4/12">{label}</p>
      <p className="w-8/12">: {value}</p>
    </div>
  )
}
