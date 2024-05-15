import { convertToSlug } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

export function IconComponent({
  link,
  icon,
  title,
  isSD,
  isSMP,
}: {
  link: string
  icon: JSX.Element
  title: string
  isSD: boolean
  isSMP: boolean
}) {
  const { firstPathname } = usePathname()

  const isActivePage = (item) => {
    if (
      convertToSlug(item) === firstPathname ||
      (convertToSlug(item) === 'daftar' && firstPathname === 'daftar-akun')
    ) {
      return true
    }
    return false
  }

  return (
    <Link
      to={link}
      className={clsx(
        'flex flex-col items-center gap-16 p-32 hover:bg-white',
        {
          'hover:text-primary-background': isSMP,
          'hover:text-danger-100': isSD,
        },
        {
          'bg-white text-primary-background': isActivePage(title) && isSMP,
          'bg-white text-danger-100': isActivePage(title) && isSD,
        },
      )}
    >
      {icon}
      <p
        className={`text-center ${title === 'Daftar' && 'rounded-full bg-yellow-300 px-16 py-8 text-[2rem] text-black'}`}
      >
        {title}
      </p>
    </Link>
  )
}
