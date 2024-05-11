import { ListAsideNavigationLogin } from '@/libs/dummy/list-aside-navigation-login'
import { convertToSlug } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { AlignJustify } from 'lucide-react'
import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ModalAside } from './modal-aside'

export default function UserLayout() {
  const { secondPathname } = usePathname()
  const [isShow, setIsShow] = useState<boolean>(false)
  const token = Cookies.get('token')
  const navigate = useNavigate()

  const isActivePage = (item: string) => {
    if (
      convertToSlug(item) === secondPathname ||
      (item.toLowerCase() === 'biodata' && secondPathname === undefined)
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
    <main className="scrollbar flex h-screen flex-col overflow-auto bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50 text-[2.4rem] text-slate-700 phones:text-[2.8rem]">
      <header className="flex items-center justify-between gap-32 bg-white px-[20rem] py-32 phones:px-32 phones:py-16">
        <div className="flex items-center gap-80">
          <Link to="/">
            <img src="/img/logo.png" alt="PPDB" className="h-[5rem]" />
          </Link>
          {/* --- Navigasi --- */}
          <div className="flex items-center gap-32 phones:hidden">
            {ListAsideNavigationLogin.map((item, idx) => (
              <Link
                to={
                  convertToSlug(item?.title) === 'biodate'
                    ? '/main'
                    : `/main/${convertToSlug(item?.title)}`
                }
                className={clsx('hover:text-primary-background', {
                  'text-primary-background': isActivePage(
                    convertToSlug(item?.title),
                  ),
                })}
                key={idx}
              >
                {item?.title}
              </Link>
            ))}
          </div>
        </div>

        <span
          className="hidden phones:block"
          onClick={() => {
            setIsShow(true)
          }}
        >
          <AlignJustify size={16} />
        </span>

        {token ? (
          <div
            onClick={() => handleLogout()}
            className="flex items-center gap-16 rounded-2xl border-b bg-primary-900 px-24 py-12 text-white hover:cursor-pointer hover:bg-primary-700 phones:hidden"
          >
            <p className="text-[2.4rem]">Logout</p>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-16 rounded-2xl border-b bg-primary-900 px-24 py-12 text-white hover:cursor-pointer hover:bg-primary-700 phones:hidden"
          >
            <p className="text-[2.4rem]">Login</p>
          </Link>
        )}
      </header>
      <section className="scrollbar h-full overflow-auto">
        <Outlet />
      </section>
      <ModalAside setIsOpen={setIsShow} isOpen={isShow} />
    </main>
  )
}
