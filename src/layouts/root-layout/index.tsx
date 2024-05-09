import { Outlet } from 'react-router-dom'
import { RootHeader } from './root-header'
import { RootFooter } from './root-footer'

export default function RootLayout() {
  return (
    <main className="scrollbar flex h-screen flex-col overflow-auto text-[2.4rem] text-slate-700 phones:text-[2.8rem]">
      <RootHeader />
      <div className="scrollbar h-full flex-1 overflow-auto">
        <div className="flex h-full flex-col gap-64 font-helvetica">
          <div className="h-[40vh] w-full phones:h-[30vh]">
            <img
              src="/img/bg.jpg"
              alt="ppdb"
              className="h-full w-full object-cover"
            />
          </div>
          <Outlet />
          <RootFooter />
        </div>
      </div>
    </main>
  )
}
