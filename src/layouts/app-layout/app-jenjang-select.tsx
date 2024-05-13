import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/atoms/Menubar'
import { usePathname } from '@/libs/hooks/usePathname'
import { setStateJenjang } from '@/store/reducer/stateJenjang'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function AppJenjangSelect({
  jenjang,
  setJenjang,
}: {
  jenjang: string
  setJenjang: Dispatch<SetStateAction<string>>
}) {
  const { firstPathname } = usePathname()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger
          className={clsx('h-full rounded-2xl text-white', {
            'bg-primary': jenjang === 'smp',
            'bg-danger-100': jenjang === 'sd',
          })}
          variant="outlined"
        >
          <p
            className="border-r border-slate-100 p-24 text-[5rem] font-bold uppercase"
            style={{
              borderTopLeftRadius: '1rem',
              borderBottomLeftRadius: '1rem',
            }}
          >
            {jenjang}
          </p>
          <ChevronDown />
        </MenubarTrigger>
        <MenubarContent className="min-w-[30rem] bg-white py-16 shadow-md">
          {['SD', 'SMP'].map((item, index) => (
            <MenubarItem
              key={index}
              onClick={() => {
                if (item.toLowerCase() !== jenjang.toLowerCase()) {
                  dispatch(setStateJenjang({ tingkatan: item?.toLowerCase() }))
                  setJenjang(item?.toLowerCase())
                  navigate(`/${firstPathname}?jenjang=${item.toLowerCase()}`)
                }
              }}
              className={clsx('px-24 py-8 text-[2.6rem] hover:bg-slate-200', {
                'hover:cursor-pointer':
                  item?.toLowerCase() !== jenjang.toLowerCase(),
                'hover:cursor-not-allowed':
                  item?.toLowerCase() === jenjang.toLowerCase(),
              })}
            >
              {item}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
