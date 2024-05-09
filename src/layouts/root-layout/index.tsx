import { Outlet } from 'react-router-dom'
import { RootHeader } from './root-header'
import { RootFooter } from './root-footer'
import { usePathname } from '@/libs/hooks/usePathname'
import { AppLayout } from '@/routes/loadables'

export default function RootLayout() {
  const { firstPathname } = usePathname()
  const isRoot = firstPathname === ''

  return (
    <main className="scrollbar flex h-screen flex-col overflow-auto text-[2.4rem] text-slate-700 phones:text-[2.8rem]">
      <RootHeader />
      <div className="scrollbar h-full flex-1 overflow-auto">
        <div
          className={`flex flex-col ${isRoot ? 'gap-64' : 'gap-0'} overflow-auto font-helvetica`}
        >
          <img
            src="/img/bg.jpg"
            alt="ppdb"
            className="h-[40vh] w-full object-cover phones:h-[30vh]"
          />
          <div className="scrollbar flex flex-col gap-64 overflow-auto">
            {!isRoot ? (
              <AppLayout>
                <Outlet />
              </AppLayout>
            ) : (
              <Outlet />
            )}
            <RootFooter />
          </div>
        </div>
      </div>
    </main>
  )
}
