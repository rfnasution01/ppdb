/* eslint-disable @typescript-eslint/no-explicit-any */

import { Save, X } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/Dialog'
import { ListPrestasiType } from '@/libs/types/pendaftaran-type'
import { useDeletePrestasiMutation } from '@/store/slices/prestasiAPI'

export function ModalDeletePrestasi({
  isOpen,
  setIsOpen,
  data,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  data: ListPrestasiType
}) {
  const [
    createDeletePrestasi,
    {
      isError: isErrorDeletePrestasi,
      error: errorDeletePrestasi,
      isLoading: isLoadingDeletePrestasi,
      isSuccess: isSuccessDeletePrestasi,
    },
  ] = useDeletePrestasiMutation()

  const handleSubmit = async () => {
    try {
      await createDeletePrestasi({ id: data?.id })
    } catch (error) {
      console.log(error)
    }
  }

  // --- Sukses ---
  useEffect(() => {
    if (isSuccessDeletePrestasi) {
      toast.success('Delete prestasi berhasil!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setIsOpen(false)
    }
  }, [isSuccessDeletePrestasi])

  // --- Error ---
  useEffect(() => {
    if (isErrorDeletePrestasi) {
      const errorMsg = errorDeletePrestasi as {
        data?: {
          message?: string
        }
      }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorDeletePrestasi, errorDeletePrestasi])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        position="middle"
        style={{
          width: '70%',
        }}
      >
        <div className="flex flex-col gap-16 p-32">
          {/* --- Header --- */}
          <DialogHeader>
            <DialogTitle>
              <p className="text-[2.4rem] font-bold phones:text-[2.8rem]">
                Form Delete Prestasi
              </p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <hr className="border" />
          <p className="text-[2.4rem] phones:text-[2.8rem]">
            Apakah yakin ingin menghapus data?
          </p>
          <div className="mt-32 flex items-center justify-end gap-16 text-[2rem]">
            <button
              disabled={isLoadingDeletePrestasi}
              onClick={() => handleSubmit()}
              className="flex items-center justify-center gap-12 rounded-2xl bg-green-800 px-24 py-12 text-white hover:bg-green-900"
              type="submit"
            >
              Ya
              <Save size={16} />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
