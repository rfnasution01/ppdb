export function ListData({ label, desc }: { label?: string; desc?: string }) {
  return (
    <div className="flex w-full items-center text-[2rem]">
      <p className="w-2/6 phones:w-3/6">{label}</p>
      <p>: {desc}</p>
    </div>
  )
}
