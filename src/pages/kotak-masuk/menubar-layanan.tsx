import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/atoms/Menubar'
import clsx from 'clsx'
import {
  Ellipsis,
  KeySquare,
  Pencil,
  ShieldCheck,
  ShieldClose,
  Trash,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function MenubarLayanan({
  isDisabled,
  id,
}: {
  isDisabled?: boolean
  id?: string
}) {
  return (
    <Menubar className="px-4">
      <MenubarMenu>
        <MenubarTrigger
          className="w-full text-center transition-all duration-300"
          variant="nothing"
          layout="icon"
          size="fit"
          disabled={isDisabled}
        >
          <Ellipsis size={16} />
        </MenubarTrigger>
        <MenubarContent className="shadow-grey-light-1 absolute right-0 top-0 w-[30rem] transition-all duration-300">
          <div className="flex flex-col gap-12 rounded-2xl bg-white p-24 text-[2rem] phones:text-[2.4rem]">
            {['Edit'].map((item, idx) => (
              <Link
                to={`/main/pertanyaan/edit?id=${id}`}
                className={clsx(
                  'flex items-center gap-12 text-nowrap border-l-2 border-transparent p-8 hover:cursor-pointer  hover:border-danger-100 hover:bg-danger-tint-1 hover:bg-opacity-30 hover:text-danger-100',
                )}
                key={idx}
              >
                {item === 'Edit' ? (
                  <Pencil size={16} />
                ) : item === 'Ganti Password' ? (
                  <KeySquare size={16} />
                ) : item === 'Aktivasi' ? (
                  <ShieldCheck size={16} />
                ) : item === 'Non Aktif' ? (
                  <ShieldClose size={16} />
                ) : (
                  <Trash size={16} />
                )}

                {item}
              </Link>
            ))}
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
