import { useState } from 'react'
import { ModalSearch } from './modal-search'
import { Search } from 'lucide-react'
import { Searching } from '@/components/atoms/Search'

export function RootHeader() {
  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <header className="flex justify-between bg-white px-[20rem] py-16 shadow-md phones:px-32">
      <img src="/img/logo.png" alt="logo" className="h-[5.5rem] w-[34rem]" />
      <button
        type="button"
        onClick={() => setIsShow(true)}
        className="flex items-center gap-x-8 rounded-lg bg-secondary px-24 py-12 text-white hover:bg-opacity-90"
      >
        <Search size={16} /> <p>Cari</p>{' '}
      </button>
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
    </header>
  )
}
