import { convertToSlug } from '@/libs/helpers/format-text'
import clsx from 'clsx'
import { Link, Outlet } from 'react-router-dom'
import { usePathname } from '@/libs/hooks/usePathname'

export default function Biodata() {
  const { secondPathname, thirdPathname } = usePathname()

  const isActivePage = (item: string) => {
    if (
      (item.toLowerCase() === 'biodata' && thirdPathname !== undefined) ||
      (item.toLowerCase() === 'pendaftaran' &&
        secondPathname === 'profil' &&
        thirdPathname === undefined)
    ) {
      return true
    }
    return false
  }

  return (
    <div className="gap-3 flex h-full flex-col gap-64">
      <div className="flex w-full items-center">
        {['Pendaftaran', 'Biodata'].map((item, idx) => (
          <Link
            to={
              item === 'Pendaftaran' ? '/main/profil' : `/main/profil/biodata`
            }
            className={clsx(
              'border-b px-24 py-16 text-center text-[2rem] hover:cursor-pointer hover:border-danger-300 hover:text-danger-300',
              {
                'border-danger-300 text-danger-300': isActivePage(
                  convertToSlug(item),
                ),
                'text-balance': !isActivePage(convertToSlug(item)),
              },
            )}
            key={idx}
          >
            {item}
          </Link>
        ))}
      </div>
      <div className="scrollbar h-full flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
