import {
  capitalizeFirstLetterFromLowercase,
  convertSlugToText,
} from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function AppBreadcumbs({
  isSD,
  isSMP,
  jenjang,
  kode,
}: {
  isSMP: boolean
  isSD: boolean
  jenjang: string
  kode: string
}) {
  const { firstPathname } = usePathname()

  return (
    <div
      className={clsx(
        'flex gap-32 px-[20rem] py-24 text-[2rem] text-white phones:px-32',
        {
          'bg-primary-background': isSMP,
          'bg-danger-300': isSD,
        },
      )}
    >
      <div className="w-1/6 phones:hidden"></div>
      <div className="flex w-5/6 flex-nowrap items-center gap-8">
        <Link to="/" className="phones:text-nowrap">
          Kab. Deli Serdang
        </Link>
        <span>
          <ChevronRight size={16} />
        </span>
        <Link to="/" className="uppercase hover:cursor-pointer">
          {jenjang}
        </Link>
        <span>
          <ChevronRight size={16} />
        </span>
        <Link to="/" className="hover:cursor-pointer">
          {kode ?? 'Reguler'}
        </Link>
        <span>
          <ChevronRight size={16} />
        </span>
        <p className="hover:cursor-not-allowed phones:text-nowrap">
          {capitalizeFirstLetterFromLowercase(
            convertSlugToText(firstPathname).toLowerCase(),
          )}
        </p>
      </div>
    </div>
  )
}
