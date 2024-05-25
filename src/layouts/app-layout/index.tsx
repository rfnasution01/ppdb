import { ReactNode, Suspense, useEffect, useState } from 'react'
import { AppBreadcumbs } from './app-breadcrumbs'
import { AppHeaderNavigasi } from './app-header-navigasi'
import { ListAsideNavigation } from '@/libs/dummy/list-aside-navigation'
import { IconComponent2 } from './IconComponent2'
import { convertToSlug } from '@/libs/helpers/format-text'
import { AppJenjangSelect } from './app-jenjang-select'
import { useSelector } from 'react-redux'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import Loading from '@/components/atoms/Loading'
import { JalurMasukType } from '@/libs/types'
import { useGetJalurMasukQuery } from '@/store/slices/jalurAPI'
import { AppJalurSelect } from './app-jalur-select'
import { getJalurSlice } from '@/store/reducer/stateJalur'
export default function AppLayout({ children }: { children: ReactNode }) {
  const searchParams = new URLSearchParams(location.search)
  const jenjangParams = searchParams.get('jenjang')
  const kodeParams = searchParams.get('kode') ?? 'zn'
  const stateJenjang = useSelector(getJenjangSlice)?.tingkatan
  const stateKode = useSelector(getJalurSlice)?.kode

  useEffect(() => {
    if (stateJenjang) {
      setJenjang(stateJenjang)
    }
  }, [stateJenjang])

  useEffect(() => {
    if (stateKode) {
      setKode(stateKode)
    }
  }, [stateKode])

  const [jenjang, setJenjang] = useState<string>(
    jenjangParams ?? stateJenjang ?? 'sd',
  )

  const [kode, setKode] = useState<string>(kodeParams ?? stateKode ?? 'zn')

  const isSD = jenjang?.toLowerCase() === 'sd'
  const isSMP = jenjang?.toLowerCase() === 'smp'

  // --- Jalur Masuk ---
  const [jalurMasuk, setJalurMasuk] = useState<JalurMasukType[]>([])
  const { data: getJalurMasuk } = useGetJalurMasukQuery({ jenjang: jenjang })

  useEffect(() => {
    if (getJalurMasuk?.data) {
      setJalurMasuk(getJalurMasuk?.data)
    }
  }, [getJalurMasuk?.data])

  const kodeSekarang = jalurMasuk.find(
    (item) => item?.kode.toLowerCase() === kode,
  )?.nama

  return (
    <div className="flex flex-col">
      {/* --- Header --- */}
      <div className="flex flex-col">
        {/* --- BreadCrumbs --- */}
        <AppBreadcumbs
          isSD={isSD}
          isSMP={isSMP}
          jenjang={jenjang}
          kode={kodeSekarang}
        />
        {/* --- Navigasi --- */}
        <AppHeaderNavigasi
          isSD={isSD}
          isSMP={isSMP}
          jenjang={jenjang}
          kode={kode}
        />
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
              <AppJenjangSelect
                jenjang={jenjang}
                setJenjang={setJenjang}
                kode={kode}
              />
              <AppJalurSelect jenjang={jenjang} setKode={setKode} kode={kode} />
            </div>
            {/* --- Navigasi --- */}
            <div className="flex flex-col gap-0">
              {ListAsideNavigation.map((item, idx) => (
                <div key={idx}>
                  <IconComponent2
                    icon={item?.icon}
                    title={item?.title}
                    link={`/${convertToSlug(item?.title)}?jenjang=${jenjang}&kode=${kode}`}
                    isSD={isSD}
                    isSMP={isSMP}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* --- Content --- */}
        <div className="w-5/6 phones:w-full">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </div>
  )
}
