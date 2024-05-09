import { ReactNode, useState } from 'react'
import { AppBreadcumbs } from './app-breadcrumbs'
import { AppHeaderNavigasi } from './app-header-navigasi'

export default function AppLayout({ children }: { children: ReactNode }) {
  const searchParams = new URLSearchParams(location.search)
  const jenjangParams = searchParams.get('jenjang')

  const [jenjang, setJenjang] = useState<string>(jenjangParams)

  const isSD = jenjang.toLowerCase() === 'sd'
  const isSMP = jenjang.toLowerCase() === 'smp'

  console.log(setJenjang)

  return (
    <div className="flex flex-col">
      {/* --- Header --- */}
      <div className="flex flex-col">
        {/* --- BreadCrumbs --- */}
        <AppBreadcumbs isSD={isSD} isSMP={isSMP} jenjang={jenjang} />
        {/* --- Navigasi --- */}
        <AppHeaderNavigasi isSD={isSD} isSMP={isSMP} />
      </div>
      {/* --- Content --- */}
      <div className="bg-yellow-300">{children}</div>
    </div>
  )
}
