import { ReactNode, useEffect, useState } from 'react'
import { AppBreadcumbs } from './app-breadcrumbs'
import { AppHeaderNavigasi } from './app-header-navigasi'
import { ListAsideNavigation } from '@/libs/dummy/list-aside-navigation'
import { IconComponent2 } from './IconComponent2'
import { convertToSlug } from '@/libs/helpers/format-text'
import { AppJenjangSelect } from './app-jenjang-select'
import { useSelector } from 'react-redux'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { usePathname } from '@/libs/hooks/usePathname'
import { DoorClosed } from 'lucide-react'
import Cookies from 'js-cookie'

export default function AppLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const jenjangParams = searchParams.get('jenjang')
  const stateJenjang = useSelector(getJenjangSlice)?.tingkatan
  const { firstPathname } = usePathname()

  useEffect(() => {
    if (stateJenjang) {
      setJenjang(stateJenjang)
    }
  }, [stateJenjang])

  const [jenjang, setJenjang] = useState<string>(
    jenjangParams ?? stateJenjang ?? 'sd',
  )

  const isSD = jenjang?.toLowerCase() === 'sd'
  const isSMP = jenjang?.toLowerCase() === 'smp'

  const token = Cookies.get('token')

  return (
    <div className="flex flex-col">
      {/* --- Header --- */}
      <div className="flex flex-col">
        {/* --- BreadCrumbs --- */}
        <AppBreadcumbs isSD={isSD} isSMP={isSMP} jenjang={jenjang} />
        {/* --- Navigasi --- */}
        <AppHeaderNavigasi isSD={isSD} isSMP={isSMP} jenjang={jenjang} />
      </div>
      {/* --- Content --- */}
      <div className="flex gap-32 px-[20rem] py-32 phones:px-32">
        {/* --- Aside --- */}
        <div className="relative -top-128 w-1/6 phones:hidden">
          <div className="flex flex-col gap-64">
            {/* --- Jenjang --- */}
            <div className="flex flex-col gap-32">
              <div className="w-5/6 rounded-lg bg-white p-24">
                <img
                  src="/img/smp.png"
                  alt="SMP"
                  className="w-full"
                  style={{ filter: isSD && 'hue-rotate(160deg)' }}
                />
              </div>
              <AppJenjangSelect jenjang={jenjang} setJenjang={setJenjang} />
            </div>
            {/* --- Navigasi --- */}
            <div className="flex flex-col gap-0">
              {ListAsideNavigation.map((item, idx) => (
                <div key={idx}>
                  <IconComponent2
                    icon={item?.icon}
                    title={item?.title}
                    link={`/${convertToSlug(item?.title)}?jenjang=${jenjang}`}
                    isSD={isSD}
                    isSMP={isSMP}
                  />
                </div>
              ))}
              {token ? (
                <div
                  onClick={() => {
                    Cookies.remove('token')
                    navigate('/login')
                  }}
                  className={clsx(
                    'flex items-center gap-12 p-16 hover:cursor-pointer phones:hidden',
                    {
                      'rounded-lg bg-primary-400':
                        isSMP && firstPathname === 'logout',
                      'rounded-lg bg-danger-tint-1':
                        isSD && firstPathname === 'logout',
                    },
                  )}
                >
                  <DoorClosed size={16} />
                  <p
                    className={clsx('', {
                      'hover:text-primary-300 hover:underline': isSMP,
                      'hover:text-danger-tint-3 hover:underline': isSD,
                    })}
                  >
                    Logout
                  </p>
                </div>
              ) : (
                <Link
                  to="/login"
                  className={clsx(
                    'flex items-center gap-12 p-16 phones:hidden',
                    {
                      'rounded-lg bg-primary-400':
                        isSMP && firstPathname === 'biodata',
                      'rounded-lg bg-danger-tint-1':
                        isSD && firstPathname === 'biodata',
                    },
                  )}
                >
                  <DoorClosed size={16} />
                  <p
                    className={clsx('', {
                      'hover:text-primary-300 hover:underline': isSMP,
                      'hover:text-danger-tint-3 hover:underline': isSD,
                    })}
                  >
                    Login
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* --- Content --- */}
        <div className="w-5/6 phones:w-full">{children}</div>
      </div>
    </div>
  )
}
