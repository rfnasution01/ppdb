import { Printer, RefreshCcw } from 'lucide-react'

export function DayaTampungContentHeader({
  onSearch,
  total,
}: {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  total: number
}) {
  return (
    <div className="flex  items-center justify-between gap-32 rounded-lg bg-background p-24 text-[3rem] phones:flex-col phones:items-start">
      <p>Total {total} Sekolah</p>
      <div className="flex items-center gap-16">
        <input
          type="text"
          className="h-1/2 w-full rounded-lg border border-gray-300 p-16 text-[2rem] focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 phones:w-full"
          placeholder="Search"
          onChange={(e) => onSearch(e)}
        />
        <span className="flex items-center justify-center rounded-lg border bg-white px-16 py-12 hover:cursor-pointer hover:bg-stone-300">
          <RefreshCcw size={16} />
        </span>
        <span className="flex items-center justify-center rounded-lg border bg-white px-16 py-12 hover:cursor-pointer hover:bg-stone-300">
          <Printer size={16} />
        </span>
      </div>
    </div>
  )
}
