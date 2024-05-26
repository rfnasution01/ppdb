import { Dialog, DialogContent, DialogHeader } from '@/components/atoms/Dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Dispatch, SetStateAction } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export function ModalLogout({
  isOpen,
  setIsOpen,
  handleLogout,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  handleLogout: () => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        position="middle"
      >
        <div className="flex flex-col gap-32 p-32">
          <DialogHeader>
            <DialogTitle>
              <p className="text-[2.8rem]">Logout</p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          {/* <p className="text-center text-[2.8rem]">Menu Pilihan</p> */}
          <div className="flex flex-col gap-24 text-[2.4rem] phones:text-[2.8rem]">
            <p>Apakah anda yakin ingin logout / keluar?</p>
            <div className="flex items-center justify-end gap-32">
              <div
                onClick={() => {
                  setIsOpen(false)
                }}
                className="rounded-xl bg-red-700 px-24 py-12 text-white hover:cursor-pointer hover:bg-red-900"
              >
                Tidak
              </div>
              <div
                onClick={() => {
                  handleLogout()
                  setIsOpen(false)
                }}
                className="rounded-xl bg-green-700 px-24 py-12 text-white hover:cursor-pointer hover:bg-green-900"
              >
                Ya
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
