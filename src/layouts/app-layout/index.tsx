import { ReactNode, useEffect, useState } from 'react'
import { AppBreadcumbs } from './app-breadcrumbs'
import { AppHeaderNavigasi } from './app-header-navigasi'
import { ListAsideNavigation } from '@/libs/dummy/list-aside-navigation'
import { IconComponent2 } from './IconComponent2'
import { convertToSlug } from '@/libs/helpers/format-text'
import { AppJenjangSelect } from './app-jenjang-select'
import { useSelector } from 'react-redux'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'

export default function AppLayout({ children }: { children: ReactNode }) {
  const searchParams = new URLSearchParams(location.search)
  const jenjangParams = searchParams.get('jenjang')
  const stateJenjang = useSelector(getJenjangSlice)?.tingkatan

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
      <div className="flex gap-64 px-[20rem] py-32 phones:px-32">
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
            </div>
          </div>
        </div>
        {/* --- Content --- */}
        <div className="w-5/6 phones:w-full">{children}</div>
      </div>
    </div>
  )
}
