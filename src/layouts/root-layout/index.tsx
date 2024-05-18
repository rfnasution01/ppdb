import { Outlet } from 'react-router-dom'
import { RootHeader } from './root-header'
import { RootFooter } from './root-footer'
import { usePathname } from '@/libs/hooks/usePathname'
import { AppLayout } from '@/routes/loadables'
import { Suspense, useEffect, useState } from 'react'
import { InstansiData } from '@/libs/types'
import { useGetIdentitasQuery } from '@/store/slices/identitasAPI'
import Loading from '@/components/atoms/Loading'
import { LoadingCandles } from '@/components/molecules/buttons'
import { Banner } from './banner'

export default function RootLayout() {
  const { firstPathname } = usePathname()
  const isRoot = firstPathname === ''
  const [identitas, setIdentitas] = useState<InstansiData>()
  const {
    data: getIdentitas,
    isFetching: isFetchingIdentitas,
    isLoading: isLoadingIdentitas,
  } = useGetIdentitasQuery()

  useEffect(() => {
    if (getIdentitas?.data) {
      setIdentitas(getIdentitas?.data)
    }
  }, [getIdentitas?.data])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulasi proses loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 4000) // Contoh: 4 detik

    return () => clearTimeout(timer)
  }, [])

  const isLoading = isFetchingIdentitas || isLoadingIdentitas

  return (
    <main className="scrollbar flex h-screen flex-col overflow-auto text-[2.4rem] text-slate-700 phones:text-[2.8rem]">
      {loading ? (
        <LoadingCandles />
      ) : (
        <>
          <RootHeader getIdentitas={identitas} isLoading={isLoading} />
          <div className="scrollbar h-full flex-1 overflow-auto">
            <div
              className={`flex flex-col ${isRoot ? 'gap-64' : 'gap-0'} overflow-auto font-helvetica`}
            >
              {isLoading ? (
                <div className="flex h-[40vh] w-full items-center justify-center text-[3rem] duration-100 phones:h-[30vh]">
                  <Loading />
                </div>
              ) : (
                <Banner />
              )}

              <div className="scrollbar flex flex-col gap-64 overflow-auto">
                {!isRoot ? (
                  <Suspense fallback={<Loading />}>
                    <AppLayout>
                      <Outlet />
                    </AppLayout>
                  </Suspense>
                ) : (
                  <Suspense fallback={<Loading />}>
                    <Outlet />
                  </Suspense>
                )}
                <RootFooter />
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
