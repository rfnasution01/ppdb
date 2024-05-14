import { useState } from 'react'
import { ModalSearch } from './modal-search'
import {
  DoorClosed,
  DoorOpen,
  LayoutGrid,
  List,
  Search,
  User2,
} from 'lucide-react'
import { Searching } from '@/components/atoms/Search'
import { ModalAside } from './modal-aside'
import { Link, useNavigate } from 'react-router-dom'
import { ModalHeader } from './modal-header'
import Cookies from 'js-cookie'
import { InstansiData } from '@/libs/types'

export function RootHeader({
  getIdentitas,
  isLoading,
}: {
  getIdentitas: InstansiData
  isLoading?: boolean
}) {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isShowAside, setIsShowAside] = useState<boolean>(false)
  const [isShowHeader, setIsShowHeader] = useState<boolean>(false)

  const token = Cookies.get('token')
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('token')
    navigate('/login')
  }

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
          {isLoading ? (
            <div className="h-[5.5rem] w-[34rem] animate-pulse rounded-full bg-slate-200 font-roboto text-[3rem] duration-100 phones:h-[4rem] phones:w-[25rem]" />
          ) : (
            <div className="flex items-center gap-16">
              <img
                src={getIdentitas?.logo}
                alt="Batu Bara"
                className="h-[5.5rem] w-[5rem] phones:h-[4rem] phones:w-[4rem]"
              />
              <p className="phones:hidden">{getIdentitas?.nama}</p>
            </div>
          )}
        </Link>
      </div>
      <div className="flex items-center gap-24">
        <button
          type="button"
          onClick={() => setIsShow(true)}
          className="flex items-center gap-x-8 rounded-lg bg-secondary px-24 py-12 text-white hover:bg-orange-900 hover:bg-opacity-90"
        >
          <Search size={16} /> <p>Cari</p>{' '}
        </button>

        {token && (
          <div className="h-full phones:hidden">
            <div className="mx-16 h-full w-1 border-l border-slate-100" />
          </div>
        )}

        {token && (
          <Link
            to="/main"
            onClick={() => setIsShow(true)}
            className="flex items-center gap-x-8 rounded-lg bg-emerald-700 px-24 py-12 text-white hover:bg-emerald-900 hover:bg-opacity-90 phones:hidden"
          >
            <User2 size={16} /> <p>Informasi Saya</p>{' '}
          </Link>
        )}

        <div className="phones:hidden">
          {token ? (
            <div
              onClick={() => {
                handleLogout()
              }}
              className="flex items-center gap-x-8 rounded-lg bg-primary-background px-24 py-12 text-white hover:cursor-pointer hover:bg-primary-700 hover:bg-opacity-90"
            >
              <DoorClosed size={16} /> <p>Logout</p>{' '}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-x-8 rounded-lg bg-primary-background px-24 py-12 text-white hover:bg-primary-700 hover:bg-opacity-90"
            >
              <DoorOpen size={16} /> <p>Login</p>{' '}
            </Link>
          )}
        </div>

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
              <Searching />
            </div>
          </div>
        }
      />
      <ModalAside setIsOpen={setIsShowAside} isOpen={isShowAside} />
      <ModalHeader setIsOpen={setIsShowHeader} isOpen={isShowHeader} />
    </header>
  )
}
