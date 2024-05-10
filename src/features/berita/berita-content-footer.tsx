import { ChevronLeft, ChevronRight } from 'lucide-react'

export function BeritaContentFooter() {
  return (
    <div className="text-[2..4 rem] flex items-center justify-between gap-32 rounded-lg bg-background p-24">
      <p>
        Terdapat <span className="text-orange-700">1</span> Berita
      </p>
      <div className="flex items-center">
        <span className="rounded-2xl border bg-white p-12">
          <ChevronLeft size={16} />
        </span>
        <p className="px-16 py-12">
          <span className="text-orange-700">1</span> dari{' '}
          <span className="text-orange-700">1</span>
        </p>
        <span className="rounded-2xl border bg-white p-12">
          <ChevronRight size={16} />
        </span>
      </div>
    </div>
  )
}
