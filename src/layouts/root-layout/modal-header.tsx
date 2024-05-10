import { Dialog, DialogContent, DialogHeader } from '@/components/atoms/Dialog'
import { ListHeaderNavigation } from '@/libs/dummy/list-header-navigation'
import { convertToSlug } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import { DialogTitle } from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export function ModalHeader({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { firstPathname } = usePathname()
  const searchParams = new URLSearchParams(location.search)
  const jenjangParams = searchParams.get('jenjang') ?? 'sd'
  const isSD = jenjangParams === 'sd'

  const isActivePage = (item) => {
    if (convertToSlug(item) === firstPathname) {
      return true
    }
    return false
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        style={{
          width: '100%',
        }}
        position="top"
      >
        <div className="flex flex-col gap-32 p-32">
          <DialogHeader>
            <DialogTitle>
              <p className="text-center text-[2.8rem]">Menu Pilihan</p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          {/* <p className="text-center text-[2.8rem]">Menu Pilihan</p> */}
          <div className="grid grid-cols-12">
            {ListHeaderNavigation?.map((item, idx) => (
              <Link
                to={`/${convertToSlug(item?.judul)}?jenjang=${isSD ? 'sd' : 'smp'}`}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'col-span-4 flex flex-col items-center gap-24 border p-32',

                  {
                    'text-primary-background':
                      isActivePage(item?.judul) && !isSD,
                  },
                  {
                    'text-danger-tint-4': isActivePage(item?.judul) && isSD,
                  },
                )}
                key={idx}
              >
                <span>{item?.icon}</span>
                <p className="text-center text-[2.4rem]">{item?.judul}</p>
              </Link>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
