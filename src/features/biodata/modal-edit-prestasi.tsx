/* eslint-disable @typescript-eslint/no-explicit-any */

import { Save, X } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { prestasiSchema } from '@/libs/schema/prestasi-schema'
import { useCreateEditPrestasiMutation } from '@/store/slices/prestasiAPI'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/Dialog'
import { Form } from '@/components/atoms/Form'
import { FormLabelComponent2 } from './form-label-component2'
import { ListPrestasiType } from '@/libs/types/pendaftaran-type'
import {
  FormListJuara,
  FormListKelas,
  FormListTingkat,
} from '@/components/molecules/form'
import { FormListPrestasi } from '@/components/molecules/form/formListPrestasi'

export function ModalEditPrestasi({
  isOpen,
  setIsOpen,
  data,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  data: ListPrestasiType
}) {
  const [file, setFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  // --- Form Schema ---
  const form = useForm<zod.infer<typeof prestasiSchema>>({
    resolver: zodResolver(prestasiSchema),
    defaultValues: {},
  })

  const [
    createEditPrestasi,
    {
      isError: isErrorEditPrestasi,
      error: errorEditPrestasi,
      isLoading: isLoadingEditPrestasi,
      isSuccess: isSuccessEditPrestasi,
    },
  ] = useCreateEditPrestasiMutation()

  const handleSubmit = async (values) => {
    const formData = new FormData()
    formData.append('id', data?.id)
    formData.append('tingkat', values?.tingkat)
    formData.append('nama_prestasi', values?.nama_prestasi)
    formData.append('juara', values?.juara)
    formData.append('kelas', values?.kelas)
    formData.append('penyelenggara', values?.penyelenggara)
    formData.append('sertifikat', file)

    try {
      await createEditPrestasi({ data: formData })
    } catch (error) {
      console.log(error)
    }
  }

  // --- Sukses ---
  useEffect(() => {
    if (isSuccessEditPrestasi) {
      toast.success('Edit prestasi berhasil!', {
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
  }, [isSuccessEditPrestasi])

  // --- Error ---
  useEffect(() => {
    if (isErrorEditPrestasi) {
      const errorMsg = errorEditPrestasi as {
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
  }, [isErrorEditPrestasi, errorEditPrestasi])

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    const allowedTypesAll = ['image/jpeg', 'image/png', 'application/pdf']

    const allowedTypes = allowedTypesAll
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (
      selectedFile &&
      allowedTypes.includes(selectedFile.type) &&
      selectedFile.size <= maxSize
    ) {
      setFile(selectedFile)
      setErrorMessage('')
    } else {
      setFile(null)
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorMessage('File harus berupa gambar (JPEG/PNG) atau PDF')
      } else if (selectedFile.size > maxSize) {
        setErrorMessage('Ukuran file tidak boleh lebih dari 5MB')
      }
    }
  }

  useEffect(() => {
    if (data) {
      form.setValue('tingkat', data?.tingkat)
      form.setValue('nama_prestasi', data?.nama_prestasi)
      form.setValue('juara', data?.juara)
      form.setValue('kelas', data?.kelas)
      form.setValue('penyelenggara', data?.penyelenggara)
      form.setValue('sertifikat', data?.sertifikat)
    }
  }, [data])

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
                Form Edit Prestasi
              </p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <hr className="border" />
          <Form {...form}>
            <form
              className="flex w-full flex-col"
              onSubmit={form.handleSubmit(handleSubmit)}
              encType="multipart/form-data"
            >
              <div className="flex flex-col gap-24">
                <div className="flex items-center gap-32 phones:flex-col phones:gap-32">
                  <FormListTingkat
                    name="tingkat"
                    placeholder="Pilih Tingkat"
                    headerLabel="Tingkat"
                    form={form}
                    isDisabled={isLoadingEditPrestasi}
                  />

                  {/* <FormLabelComponent2
                    form={form}
                    label="Nama Prestasi"
                    placeHolder="Masukkan Nama Prestasi"
                    name="nama_prestasi"
                    type="text"
                    isOperator
                    isDisabled={isLoadingEditPrestasi}
                  /> */}
                  <FormListPrestasi
                    name="nama_prestasi"
                    useFormReturn={form}
                    headerLabel="Nama Prestasi"
                    placeholder="Masukkan Nama Prestasi"
                    isDisabled={isLoadingEditPrestasi}
                  />
                </div>
                <div className="flex items-center gap-32 phones:flex-col phones:gap-32">
                  <FormListJuara
                    name="juara"
                    placeholder="Pilih Juara"
                    headerLabel="Juara"
                    form={form}
                    isDisabled={isLoadingEditPrestasi}
                  />

                  <FormListKelas
                    name="kelas"
                    placeholder="Pilih Kelas"
                    headerLabel="Kelas"
                    form={form}
                    isDisabled={isLoadingEditPrestasi}
                  />
                </div>
                <div className="flex items-center gap-32 phones:flex-col phones:items-start phones:gap-32">
                  <FormLabelComponent2
                    form={form}
                    label="Penyelenggara"
                    placeHolder="Masukkan Penyelenggara"
                    name="penyelenggara"
                    type="text"
                    isOperator
                    isDisabled={isLoadingEditPrestasi}
                  />
                  <div className="flex w-1/2 items-center gap-32 text-[2rem] phones:w-full phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]">
                    <p className="w-2/6 text-left phones:w-full phones:text-left">
                      File
                    </p>
                    <div className="w-4/6 phones:w-full">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        disabled={isLoadingEditPrestasi}
                      />
                    </div>
                  </div>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </div>
              <div className="mt-32 flex items-center justify-end gap-16 text-[2rem]">
                <button
                  disabled={isLoadingEditPrestasi}
                  className="flex items-center justify-center gap-12 rounded-2xl bg-green-800 px-24 py-12 text-white hover:bg-green-900"
                  type="submit"
                >
                  Simpan
                  <Save size={16} />
                </button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
