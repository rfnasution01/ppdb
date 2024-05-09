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
    if (convertToSlug(item) === firstPathname) {
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
          'hover:text-danger-tint-4': isSD,
        },
        {
          'text-primary-background bg-white': isActivePage(title) && isSMP,
          'text-danger-tint-4 bg-white': isActivePage(title) && isSD,
        },
      )}
    >
      {icon}
      <p
        className={`text-center ${title === 'Daptar' && 'rounded-full bg-yellow-300 px-16 py-8 text-[2rem] text-black'}`}
      >
        {title}
      </p>
    </Link>
  )
}
