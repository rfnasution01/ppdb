import { BeritaContentFooter } from './berita-content-footer'
import { BeritaContentIsi } from './berita-content-isi'
import { BeritaContentTitle } from './berita-content-title'

export function BeritaContent() {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <BeritaContentTitle />
      <BeritaContentIsi />
      <BeritaContentFooter />
    </div>
  )
}
