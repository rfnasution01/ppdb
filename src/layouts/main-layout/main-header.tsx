import { ListUserNavigation } from '@/libs/dummy/list-user-navigation'
import { convertToSlug } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export function MainHeader() {
  const { secondPathname } = usePathname()
  const navigate = useNavigate()

  const isActivePage = (item: string) => {
    if (
      convertToSlug(item) === secondPathname ||
      (item.toLowerCase() === 'beranda' && secondPathname === undefined) ||
      (secondPathname === 'biodata' && item === 'beranda')
    ) {
      return true
    }
    return false
  }

  const handleLogout = () => {
    Cookies.remove('token')
    navigate('/login')
  }

  return (
    <div className="flex h-full flex-col gap-64">
      {/* --- Logo --- */}
      <Link to="/">
        <img src="/img/logo.png" />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        {/* --- Navigasi --- */}
        <div className="flex flex-col gap-12">
          {ListUserNavigation.map((item, idx) => (
            <Link
              to={
                item?.title === 'Beranda'
                  ? '/main'
                  : `/main/${convertToSlug(item?.title)}`
              }
              key={idx}
              className={clsx(
                'flex items-center gap-16 border-l-2 px-24 py-8 hover:cursor-pointer hover:border-danger-300 hover:bg-danger-tint-1 hover:bg-opacity-20 hover:text-danger-300',
                {
                  'border-danger-300 bg-danger-tint-1 bg-opacity-20 text-danger-300':
                    isActivePage(convertToSlug(item?.title)),
                  'text-balance border-transparent': !isActivePage(
                    convertToSlug(item?.title),
                  ),
                },
              )}
            >
              {item?.icon}
              <p>{item?.title}</p>
            </Link>
          ))}
        </div>
        <div
          onClick={() => {
            handleLogout()
          }}
          className="flex items-center gap-16 border-l-2 border-transparent px-24 py-8 hover:cursor-pointer hover:border-danger-300 hover:bg-danger-tint-1 hover:bg-opacity-20 hover:text-danger-300"
        >
          <Trash2 size={16} />
          <p>Keluar</p>
        </div>
      </div>
    </div>
  )
}
