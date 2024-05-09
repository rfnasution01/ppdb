import { ReactNode, useState } from 'react'
import { AppBreadcumbs } from './app-breadcrumbs'
import { AppHeaderNavigasi } from './app-header-navigasi'
import { ListAsideNavigation } from '@/libs/dummy/list-aside-navigation'
import { IconComponent2 } from './IconComponent2'
import { convertToSlug } from '@/libs/helpers/format-text'

export default function AppLayout({ children }: { children: ReactNode }) {
  const searchParams = new URLSearchParams(location.search)
  const jenjangParams = searchParams.get('jenjang')

  const [jenjang, setJenjang] = useState<string>(jenjangParams ?? 'sd')

  const isSD = jenjang?.toLowerCase() === 'sd'
  const isSMP = jenjang?.toLowerCase() === 'smp'

  console.log(setJenjang)

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
        <div className="flex w-1/6 flex-col gap-64">
          {/* --- Jenjang --- */}
          <div className="flex flex-col gap-32">Tes</div>
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
        {/* --- Content --- */}
        <div className="w-5/6 rounded-lg bg-white p-32">{children}</div>
      </div>
    </div>
  )
}
