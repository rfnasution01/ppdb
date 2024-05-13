import { Dialog, DialogContent } from '@/components/atoms/Dialog'
import { ListUserNavigation } from '@/libs/dummy/list-user-navigation'
import { convertToSlug } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { DoorClosed, DoorOpen } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function ModalAside({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { secondPathname } = usePathname()
  const token = Cookies.get('token')
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('token')
    navigate('/login')
  }

  const isActivePage = (item: string) => {
    if (
      convertToSlug(item) === secondPathname ||
      (item.toLowerCase() === 'beranda' && secondPathname === undefined)
    ) {
      return true
    }
    return false
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        style={{
          width: '80%',
          height: '100%',
        }}
        position="left"
      >
        <div className="flex flex-col gap-16">
          {/* --- Header --- */}
          <div className="from-danger-300 to-danger-200 via-danger-100 flex items-center gap-32 bg-gradient-to-br p-32 text-white">
            {/* --- Logo --- */}
            <div className="rounded-lg bg-white p-16">
              <img
                src="/img/tutwuri.png"
                alt="tut wuri handayani"
                className="w-[7rem]"
              />
            </div>
            {/* --- Sekolah --- */}
            <div className="flex w-full flex-col gap-16">
              <p className="text-[2.8rem] font-bold uppercase">
                kab. deli serdang
              </p>
              <hr className="w-full border border-white" />
              <p className="text-[2.4rem]">John Doe</p>
            </div>
          </div>
          {/* --- Navigasi --- */}
          <div className="flex flex-col gap-16 pl-16">
            {ListUserNavigation.map((item, idx) => (
              <Link
                to={
                  item?.title?.toLowerCase() === 'beranda'
                    ? '/main'
                    : `/main/${convertToSlug(item?.title)}`
                }
                onClick={() => {
                  setIsOpen(false)
                }}
                className={clsx('flex items-center gap-16 border-b p-16', {
                  'text-danger-300': isActivePage(convertToSlug(item?.title)),
                  'text-balance': !isActivePage(convertToSlug(item?.title)),
                })}
                key={idx}
              >
                <span>{item?.icon}</span>
                <p className="text-[2.4rem]">{item?.title}</p>
              </Link>
            ))}
          </div>

          {token ? (
            <div
              onClick={() => handleLogout()}
              className="flex items-center gap-16 border-b pl-16"
            >
              <div className="flex items-center gap-16 p-16">
                <DoorOpen size={16} />
                <p className="text-[2.4rem]">Logout</p>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-16 border-b pl-16"
            >
              <div className="flex items-center gap-16 p-16">
                <DoorClosed size={16} />
                <p className="text-[2.4rem]">Login</p>
              </div>
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
