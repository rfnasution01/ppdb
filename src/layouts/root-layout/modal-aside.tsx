import { Dialog, DialogContent } from '@/components/atoms/Dialog'
import { ListAsideNavigation } from '@/libs/dummy/list-aside-navigation'
import { convertToSlug } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import { getJenjangSlice, setStateJenjang } from '@/store/reducer/stateJenjang'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function ModalAside({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { firstPathname } = usePathname()
  const dispatch = useDispatch()

  const stateJenjang = useSelector(getJenjangSlice)?.tingkatan

  const [jenjang, setJenjang] = useState<string>(stateJenjang ?? 'sd')

  const isSD = jenjang?.toLowerCase() === 'sd'

  const beranda = [
    'aturan',
    'jadwal',
    'lokasi',
    'alur',
    'daptar',
    'seleksi',
    'statistik',
    'daya-tampung',
  ]

  const isActivePage = (item: string) => {
    if (
      convertToSlug(item) === firstPathname ||
      (item.toLowerCase() === 'beranda' && beranda.includes(firstPathname))
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
          <div
            className={clsx('flex items-center gap-32 p-32 text-white', {
              'bg-gradient-to-br from-primary-background via-primary to-primary-background ':
                !isSD,
              'bg-gradient-to-br from-danger-tint-4 via-danger-tint-2 to-danger-tint-4 ':
                isSD,
            })}
          >
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
              <div className="flex items-center gap-24">
                {['SD', 'SMP'].map((item, idx) => (
                  <Link
                    to={`/${firstPathname}?jenjang=${item.toLowerCase()}`}
                    onClick={() => {
                      dispatch(
                        setStateJenjang({ tingkatan: item?.toLowerCase() }),
                      )
                      setJenjang(item?.toLowerCase())
                      setIsOpen(false)
                    }}
                    className={clsx('rounded-2xl border p-16 text-[2.4rem]', {
                      'bg-white text-danger-tint-4':
                        jenjang === item.toLowerCase() && isSD,
                      'bg-white text-primary-background':
                        jenjang === item.toLowerCase() && !isSD,
                    })}
                    key={idx}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* --- Navigasi --- */}
          <div className="flex flex-col gap-16 pl-16">
            {ListAsideNavigation.map((item, idx) => (
              <Link
                to={`/${convertToSlug(item?.title)}?jenjang=${isSD ? 'sd' : 'smp'}`}
                onClick={() => {
                  setIsOpen(false)
                }}
                className={clsx(
                  'flex items-center gap-16 border-b p-16',
                  {
                    'text-primary-background':
                      isActivePage(item?.title) && !isSD,
                  },
                  {
                    'text-danger-tint-4': isActivePage(item?.title) && isSD,
                  },
                )}
                key={idx}
              >
                <span>{item?.icon}</span>
                <p className="text-[2.4rem]">{item?.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
