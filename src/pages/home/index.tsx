import { HomeContent, HomeHeader } from '@/layouts/home'

export default function Home() {
  return (
    <div className="flex h-full flex-col gap-64 px-[20rem] phones:px-32">
      <HomeHeader />
      <HomeContent />
    </div>
  )
}
