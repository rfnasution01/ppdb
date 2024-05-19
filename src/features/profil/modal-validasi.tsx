import { Dialog, DialogContent } from '@/components/atoms/Dialog'
import { useCreateValidasiMutation } from '@/store/slices/pendaftaranAPI'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function ModalValidasi({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [isCheck, setIsCheck] = useState<boolean>(false)

  // --- Create Validasi ---
  const [
    createValidasi,
    {
      isError: isErrorValidasi,
      error: errorValidasi,
      isLoading: isLoadingValidasi,
      isSuccess: isSuccessValidasi,
    },
  ] = useCreateValidasiMutation()

  // --- Handle Submit ---
  const handleSubmit = () => {
    const body = {
      validasi: true,
    }

    try {
      createValidasi({ data: body })
    } catch (error) {
      console.log(error)
    }
  }

  // --- Sukses ---
  useEffect(() => {
    if (isSuccessValidasi) {
      toast.success(`Validasi data berhasil dikirim.!`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setTimeout(() => {
        setIsOpen(false)
      }, 3000)
    }
  }, [isSuccessValidasi])

  // --- Error ---
  useEffect(() => {
    if (isErrorValidasi) {
      const errorMsg = errorValidasi as {
        data?: {
          message?: string
        }
      }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'top-center',
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
  }, [isErrorValidasi, errorValidasi])

  const isLoading = isLoadingValidasi || !isCheck

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        position="middle"
      >
        <div className="flex flex-col">
          {/* --- Header --- */}
          <div className="bg-background p-32 text-[2.4rem] phones:text-[2.8rem]">
            Validasi Data
          </div>
          {/* --- Content --- */}
          <div className="flex flex-col gap-12 p-32">
            <p className="text-[2rem] phones:text-[2.4rem]">
              Apakah anda yakin data sudah benar? Setelah melakukan validasi,
              data <span className="font-bold">tidak</span> akan bisa diubah
            </p>
            <div
              className="flex items-center gap-12 hover:cursor-pointer"
              onClick={() => {
                setIsCheck(!isCheck)
              }}
            >
              <div
                className={clsx('h-[2rem] w-[2rem] border', {
                  'bg-slate-300': !isCheck,
                  'bg-emerald-700': isCheck,
                })}
              />
              <p>Setuju data sudah benar</p>
            </div>
            <div className="flex items-center justify-end gap-32 p-32 phones:w-full phones:flex-col phones:items-start phones:gap-12 phones:p-0">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-primary px-24 py-12 text-white hover:bg-primary-background phones:w-full"
              >
                Kembali
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => {
                  handleSubmit()
                }}
                className="rounded-lg bg-emerald-700 px-24 py-12 text-white hover:bg-emerald-900 disabled:cursor-not-allowed phones:w-full"
              >
                Validasi
              </button>
            </div>
          </div>
          <ToastContainer />
        </div>
      </DialogContent>
    </Dialog>
  )
}
