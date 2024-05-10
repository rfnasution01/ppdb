import { useState } from 'react'
import { ModalSearch } from './modal-search'
import { LayoutGrid, List, Search } from 'lucide-react'
import { Searching } from '@/components/atoms/Search'
import { ModalAside } from './modal-aside'
import { Link } from 'react-router-dom'
import { ModalHeader } from './modal-header'

export function RootHeader() {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isShowAside, setIsShowAside] = useState<boolean>(false)
  const [isShowHeader, setIsShowHeader] = useState<boolean>(false)

  return (
    <header className="flex justify-between gap-24 bg-white px-[20rem] py-16 shadow-md phones:px-32">
      <div className="flex items-center gap-24">
        <span
          className="hidden phones:block"
          onClick={() => {
            setIsShowAside(true)
          }}
        >
          <List />
        </span>
        <Link to="/">
          <img
            src="/img/logo.png"
            alt="logo"
            className="h-[5.5rem] w-[34rem] phones:h-[4rem] phones:w-[25rem]"
          />
        </Link>
      </div>
      <div className="flex items-center gap-24">
        <button
          type="button"
          onClick={() => setIsShow(true)}
          className="flex items-center gap-x-8 rounded-lg bg-secondary px-24 py-12 text-white hover:bg-opacity-90"
        >
          <Search size={16} /> <p>Cari</p>{' '}
        </button>
        <span
          className="hidden phones:block"
          onClick={() => setIsShowHeader(true)}
        >
          <LayoutGrid />
        </span>
      </div>

      <ModalSearch
        isOpen={isShow}
        setIsOpen={setIsShow}
        content={
          <div className="flex items-center gap-64 px-[20rem] py-32 phones:flex-col phones:gap-32 phones:px-32">
            <p
              className="block flex-1 font-helvetica text-[2.4rem] font-extralight tracking-0.75 text-slate-800 phones:hidden"
              style={{ lineHeight: '130%' }}
            >
              Anda dapat melakukan pencarian peserta secara langsung dengan
              menuliskan No. Pendaftaran / No. Peserta atau bisa memilih
              langsung melalui histori pencarian yang sudah anda lakukan
              sebelumnya.
            </p>
            <p
              className="hidden flex-1 font-helvetica text-[2.4rem] font-extralight tracking-0.75 text-slate-800 phones:block"
              style={{ lineHeight: '130%' }}
            >
              Anda dapat melakukan pencarian peserta secara langsung dengan
              menuliskan No. Pendaftaran / No. Peserta
            </p>
            <div className="flex-1 phones:w-full">
              <Searching width="100%" />
            </div>
          </div>
        }
      />
      <ModalAside setIsOpen={setIsShowAside} isOpen={isShowAside} />
      <ModalHeader setIsOpen={setIsShowHeader} isOpen={isShowHeader} />
    </header>
  )
}
