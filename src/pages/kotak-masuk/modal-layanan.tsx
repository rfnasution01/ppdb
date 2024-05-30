/* eslint-disable @typescript-eslint/no-explicit-any */

import { X } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/Dialog'

export function ModalLayanan({
  isOpen,
  setIsOpen,
  children,
  title,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children?: ReactNode
  title: string
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        position="middle"
      >
        <div className="flex flex-col gap-16 p-32">
          {/* --- Header --- */}
          <DialogHeader>
            <DialogTitle>
              <p className="text-[2.4rem] font-bold phones:text-[2.8rem]">
                {title}
              </p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <hr className="border" />
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
