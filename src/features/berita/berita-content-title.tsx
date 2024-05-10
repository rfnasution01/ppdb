import { CalendarDays } from 'lucide-react'

export function BeritaContentTitle() {
  return (
    <div className="flex flex-col gap-8">
      <p>PPDB Online Kab. Deli Serdang</p>
      <div className="flex items-center gap-12">
        <CalendarDays size={16} />
        <p className="text-[1.8rem]">29 Jun 2015 00:29</p>
      </div>
    </div>
  )
}
