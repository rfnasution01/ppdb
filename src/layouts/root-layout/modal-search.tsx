import { Dialog, DialogContent } from '@/components/atoms/Dialog'
import { Dispatch, ReactNode, SetStateAction } from 'react'

export function ModalSearch({
  isOpen,
  setIsOpen,
  content,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  content?: ReactNode
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        style={{
          width: '100%',
        }}
        position="top"
      >
        {content}
      </DialogContent>
    </Dialog>
  )
}
