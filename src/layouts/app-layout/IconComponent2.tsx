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
    'daftar',
    'seleksi',
    'statistik',
    'daya-tampung',
  ]

  const isActivePage = (item: string) => {
    if (
      convertToSlug(item) === firstPathname ||
      (item.toLowerCase() === 'beranda' && beranda.includes(firstPathname)) ||
      (item.toLowerCase() === 'beranda' && firstPathname === 'daftar-akun')
    ) {
      return true
    }
    return false
  }

  return (
    <Link
      to={link}
      className={clsx('flex items-center gap-12 p-16 ', {
        'rounded-lg bg-primary text-white': isSMP && isActivePage(title),
        'rounded-lg bg-danger-100 text-white': isSD && isActivePage(title),
      })}
    >
      {icon}
      <p>{title}</p>
    </Link>
  )
}
