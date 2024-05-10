import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/atoms/Menubar'
import { usePathname } from '@/libs/hooks/usePathname'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
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

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger
          className={clsx('h-full rounded-2xl text-white', {
            'bg-primary-background': jenjang === 'smp',
            'bg-danger-tint-4': jenjang === 'sd',
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
                  navigate(`/${firstPathname}?jenjang=${item.toLowerCase()}`)
                  setJenjang(item?.toLowerCase())
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
