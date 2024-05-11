import { convertSlugToText } from '@/libs/helpers/format-text'
import { Link } from 'react-router-dom'

export default function Biodata() {
  return (
    <div className="flex flex-col gap-32">
      <div className="scrollbar flex items-center gap-12 overflow-auto">
        {[
          'Jalur Pendaftaran',
          'Informasi Pribadi',
          'Pendidikan Sebelumnya',
          'Orang Tua',
          'Kelengkapan Dokumen',
          'Pilih Sekolah',
        ].map((item, idx) => (
          <Link
            to={`/biodata/${convertSlugToText(item)}`}
            className="pointer relative flex cursor-pointer items-center bg-white p-32 text-black hover:bg-primary-50"
            key={idx}
          >
            <p className="text-nowrap">{item}</p>
            <div className="pointer::after"></div>
          </Link>
        ))}
      </div>
    </div>
  )
}
