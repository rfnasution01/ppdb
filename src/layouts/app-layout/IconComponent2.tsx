import { convertToSlug } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

export function IconComponent2({
  link,
  icon,
  title,
  isSD,
  isSMP,
}: {
  link: string
  icon: JSX.Element
  title: string
  isSMP: boolean
  isSD: boolean
}) {
  const { firstPathname } = usePathname()
  const beranda = [
    'aturan',
    'jadwal',
    'lokasi',
    'alur',
    'daptar',
    'seleksi',
    'statistik',
    'daya-tampung',
  ]

  const isActivePage = (item: string) => {
    if (
      convertToSlug(item) === firstPathname ||
      (item.toLowerCase() === 'beranda' && beranda.includes(firstPathname))
    ) {
      return true
    }
    return false
  }

  return (
    <Link
      to={link}
      className={clsx('flex items-center gap-12 p-16', {
        'rounded-lg bg-primary-400': isSMP && isActivePage(title),
        'rounded-lg bg-danger-tint-1': isSD && isActivePage(title),
      })}
    >
      {icon}
      <p
        className={clsx('', {
          'hover:text-primary-300 hover:underline': isSMP,
          'hover:text-danger-tint-3 hover:underline': isSD,
        })}
      >
        {title}
      </p>
    </Link>
  )
}
