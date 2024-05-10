import { Searching } from '@/components/atoms/Search'
import { ListLokasi } from '@/libs/dummy/list-lokasi'
import { Printer, RefreshCcw } from 'lucide-react'

export function DayaTampungContentHeader() {
  return (
    <div className="flex  items-center justify-between gap-32 rounded-lg bg-background p-24 text-[3rem] phones:flex-col phones:items-start">
      <p>Total {ListLokasi.length} Sekolah</p>
      <div className="flex items-center gap-16">
        <Searching />
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
