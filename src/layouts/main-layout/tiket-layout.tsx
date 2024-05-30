import { Outlet } from 'react-router-dom'

export default function TiketLayout() {
  return (
    <main className="flex h-full w-full">
      <Outlet />
    </main>
  )
}
