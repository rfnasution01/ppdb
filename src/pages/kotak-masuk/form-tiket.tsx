/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/atoms/Form'
import { FormLabelInput, Input } from '@/components/molecules/input'
import { TiketType } from '@/libs/types/tiket-type'
import { Loader2, Save } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Bounce, toast } from 'react-toastify'

export function FormTiket({
  form,
  setIsShowTiket,
  setIsShowEditTiket,
  isEdit,
  data,
  handleSubmit,
  handleSubmitEdit,
  isLoadingEdit,
  isLoadingUpload,
  setFile,
}: {
  form: UseFormReturn
  setIsShowTiket: Dispatch<SetStateAction<boolean>>
  setIsShowEditTiket: Dispatch<SetStateAction<boolean>>
  setFile: Dispatch<SetStateAction<File | null>>
  isEdit?: boolean
  data?: TiketType
  handleSubmitEdit: (values: any) => Promise<void>
  handleSubmit: (values: any) => Promise<void>
  isLoadingUpload: boolean
  isLoadingEdit: boolean
}) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    const allowedTypesAll = ['image/jpeg', 'image/png']

    const maxSize = 5 * 1024 * 1024 // 5MB

    if (
      selectedFile &&
      allowedTypesAll.includes(selectedFile.type) &&
      selectedFile.size <= maxSize
    ) {
      setFile(selectedFile)
    } else {
      setFile(null)

      if (!allowedTypesAll.includes(selectedFile?.type || '')) {
        toast.error(
          `Type file tidak valid. Upload file dengan type ${allowedTypesAll}`,
          {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          },
        )
      } else if (selectedFile?.size > maxSize) {
        toast.error(
          `Ukuran file terlalu besar. Upload file dengan ukuran <5 MB`,
          {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          },
        )
      }
    }
  }

  useEffect(() => {
    if (isEdit && data) {
      form.setValue('judul', data?.judul)
      form.setValue('keterangan', data?.keterangan)
    }
  }, [isEdit, data])

  return (
    <Form {...form}>
      <form
        className="scrollbar flex h-full w-full flex-col gap-32 overflow-auto"
        onSubmit={
          isEdit
            ? form.handleSubmit(handleSubmitEdit)
            : form.handleSubmit(handleSubmit)
        }
      >
        <FormLabelInput
          form={form}
          label="Judul"
          placeholder="Masukkan Judul"
          name="judul"
          type="text"
          isDisabled={isLoadingUpload}
        />
        <FormLabelInput
          form={form}
          label="Keterangan"
          placeholder="Masukkan Keterangan"
          name="keterangan"
          type="text"
          isDisabled={isLoadingUpload}
        />

        <FormField
          name="berkas"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex w-full items-center  text-[2rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]">
              <div className="flex w-full flex-col gap-12 phones:w-full">
                <FormControl>
                  <Input
                    type="file"
                    className="bg-white"
                    disabled={isLoadingUpload}
                    onChange={(e) => {
                      field.onChange(e)
                      handleFileChange(e)
                    }}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-12">
          <button
            disabled={isLoadingUpload || isLoadingEdit}
            className="rounded-lg bg-rose-700 px-24 py-12 text-center text-white hover:bg-rose-900"
            type="button"
            onClick={() => {
              if (isEdit) {
                setIsShowEditTiket(false)
              } else {
                setIsShowTiket(false)
              }
            }}
          >
            Tidak
          </button>
          <button
            disabled={isLoadingUpload || isLoadingEdit}
            className="flex items-center gap-12 rounded-lg bg-green-700 px-24 py-12 text-center text-white hover:bg-green-900"
            type="submit"
          >
            Simpan
            {isLoadingUpload || isLoadingEdit ? (
              <span className="animate-spin duration-300">
                <Loader2 size={16} />
              </span>
            ) : (
              <Save size={16} />
            )}
          </button>
        </div>
      </form>
    </Form>
  )
}
