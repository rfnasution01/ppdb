import { AlignJustify } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ModalAside } from './modal-aside'
import { MainHeader } from './main-header'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import { useGetProfilQuery } from '@/store/slices/pendaftaranAPI'

export default function MainLayout() {
  const [isShow, setIsShow] = useState<boolean>(false)

  // --- Profil ---
  const [profil, setProfil] = useState<ProfilData>()
  const { data: getProfil } = useGetProfilQuery()

  useEffect(() => {
    if (getProfil?.data) {
      setProfil(getProfil?.data)
    }
  }, [getProfil?.data])

  return (
    <main className="scrollbar grid h-screen grid-cols-12 overflow-auto bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50 text-[2.4rem] text-slate-700 phones:text-[2.8rem]">
      <aside className="scrollbar col-span-2 h-full overflow-auto bg-white p-32 shadow-md phones:col-span-12 phones:hidden">
        <MainHeader profil={profil} />
      </aside>
      <section className="scrollbar col-span-10 h-full overflow-auto phones:col-span-12">
        <div className="flex h-full flex-col gap-32">
          <div className="hidden phones:block">
            {/* --- Header --- */}
            <div className="flex items-center justify-between gap-32 bg-white p-32 shadow-md">
              <Link to="/">
                <img src="/img/logo.png" alt="PPDB" className="h-[5rem]" />
              </Link>
              <span onClick={() => setIsShow(true)}>
                <AlignJustify size={20} />
              </span>
            </div>
          </div>
          <div className="h-full flex-1 p-32">
            <Outlet />
          </div>
        </div>
      </section>
      <ModalAside setIsOpen={setIsShow} isOpen={isShow} profil={profil} />
    </main>
  )
}
