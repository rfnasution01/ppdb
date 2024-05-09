import { RootHeader } from './root-header'

export default function RootLayout() {
  return (
    <div className="scrollbar flex h-screen flex-col overflow-auto text-[2.4rem] phones:text-[2.8rem]">
      <RootHeader />
      <div className="scrollbar flex h-full flex-1 overflow-auto">
        <img src="/img/bg.jpg" alt="ppdb" className="h-[40vh] object-cover" />
      </div>
    </div>
  )
}
