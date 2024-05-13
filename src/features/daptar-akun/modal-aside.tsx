import { Dialog, DialogContent, DialogHeader } from '@/components/atoms/Dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Dispatch, SetStateAction } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { StepBack, StepForward, X } from 'lucide-react'
import { ListData } from './list-data'
import { UseFormReturn } from 'react-hook-form'

export function ModalAside({
  isOpen,
  setIsOpen,
  values,
  setIsChecked,
  form,
}: {
  isOpen: boolean
  form: UseFormReturn
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setIsChecked: Dispatch<SetStateAction<boolean>>
  values: {
    nisn?: undefined | null | string
    nama_lengkap?: string
    nik?: string
    konfirmasi_nik?: string
    tgl_lahir?: string
    konfirmasi_tgl_lahir?: string
  }
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
              <p className="text-[2.4rem]">Daptar Akun</p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <hr className="border-b border-slate-300" />
          <div className="flex flex-col gap-8">
            {values?.nisn && <ListData label="NISN" desc={values?.nisn} />}
            <ListData label="NIK" desc={values?.nik} />
            <ListData label="Nama Lengkap" desc={values?.nama_lengkap} />
            <ListData label="Tanggal Lahir" desc={values?.tgl_lahir} />
          </div>
          <p className="text-[2rem]">
            Saya yakin data yang saya masukkan sudah benar
          </p>
          <div className="flex items-center justify-end gap-16">
            <button
              onClick={() => {
                setIsOpen(false)
                setIsChecked(false)
              }}
              className="flex items-center gap-8 rounded-2xl bg-red-700 px-24 py-16 text-[1.8rem] text-white hover:bg-red-900"
            >
              <StepBack size={14} />
              Kembali
            </button>
            <button
              onClick={() => {
                setIsChecked(true)
                form.setValue('isChecked', true)
                setIsOpen(false)
              }}
              className="flex items-center gap-8 rounded-2xl bg-emerald-700 px-24 py-16 text-[1.8rem] text-white hover:bg-emerald-900"
            >
              Simpan
              <StepForward size={14} />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
