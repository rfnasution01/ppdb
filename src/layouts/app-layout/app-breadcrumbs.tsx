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
}: {
  isSMP: boolean
  isSD: boolean
  jenjang: string
}) {
  const { firstPathname } = usePathname()

  return (
    <div
      className={clsx(
        'flex gap-32 px-[20rem] py-24 text-[2rem] text-white phones:px-32',
        {
          'bg-primary-background': isSMP,
          'bg-danger-tint-4': isSD,
        },
      )}
    >
      <div className="w-1/6 phones:hidden"></div>
      <div className="flex w-5/6 items-center gap-8">
        <Link to="/">Kab. Deli Serdang</Link>
        <span>
          <ChevronRight size={16} />
        </span>
        <Link to="/beranda" className="uppercase hover:cursor-pointer">
          {jenjang}
        </Link>
        <span>
          <ChevronRight size={16} />
        </span>
        <Link to="/beranda" className="hover:cursor-pointer">
          Reguler
        </Link>
        <span>
          <ChevronRight size={16} />
        </span>
        <p className="hover:cursor-not-allowed">
          {capitalizeFirstLetterFromLowercase(
            convertSlugToText(firstPathname).toLowerCase(),
          )}
        </p>
      </div>
    </div>
  )
}
