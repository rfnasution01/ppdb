import { Printer, RefreshCcw } from 'lucide-react'

export function StatistikContentHeader() {
  return (
    <div className="flex items-center justify-between gap-32 rounded-lg bg-background p-24 text-[3rem]">
      <p>Statistik PPDB SMP Reguler Periode 2024 / 2025</p>
      <div className="flex items-center gap-16 phones:flex-col">
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
