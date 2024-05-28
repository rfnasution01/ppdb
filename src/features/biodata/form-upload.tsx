import { useCreateUploadFileMutation } from '@/store/slices/pendaftaranAPI'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Bounce, toast } from 'react-toastify'
import { UploadSchema } from '@/libs/schema/biodata-schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/atoms/Form'
import { Input } from '@/components/molecules/input'
import { Loader2, Upload } from 'lucide-react'

const FileUploadForm = ({
  id_dokumen,
  format,
  status_verifikasi,
  isLoading,
  disabled,
  dok_siswa,
}: {
  id_dokumen: string
  format?: number
  status_verifikasi?: number
  isLoading?: boolean
  disabled: boolean
  dok_siswa: string
}) => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    const allowedTypesAll = ['image/jpeg', 'image/png', 'application/pdf']
    const allowedTypesImage = ['image/jpeg', 'image/png']

    const allowedTypes = format === 1 ? allowedTypesImage : allowedTypesAll
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (
      selectedFile &&
      allowedTypes.includes(selectedFile.type) &&
      selectedFile.size <= maxSize
    ) {
      setFile(selectedFile)
    } else {
      setFile(null)

      if (!allowedTypes.includes(selectedFile?.type || '')) {
        toast.error(
          `Type file tidak valid. Upload file dengan type ${allowedTypes}`,
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

  // --- Create Upload ---
  const [
    createUpload,
    {
      isError: isErrorUpload,
      error: errorUpload,
      isLoading: isLoadingUpload,
      isSuccess: isSuccessUpload,
    },
  ] = useCreateUploadFileMutation()

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData()
      formData.append('id_dokumen', id_dokumen)
      formData.append('berkas', file)

      try {
        await createUpload({ data: formData })
      } catch (error) {
        console.error('Gagal mengunggah file:', error)
      }
    } else {
      toast.error(`Silakan pilih file terlebih dahulu`, {
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
  }

  useEffect(() => {
    if (isSuccessUpload) {
      toast.success('Data berhasil diperbaharui!', {
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
  }, [isSuccessUpload])

  useEffect(() => {
    if (isErrorUpload) {
      const errorMsg = errorUpload as { data?: { message?: string } }

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
  }, [isErrorUpload, errorUpload])

  const form = useForm<zod.infer<typeof UploadSchema>>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {},
  })

  return (
    <div
      className={clsx(
        'flex flex-col justify-between gap-48 rounded-2xl border p-32',
        {
          'bg-green-50': dok_siswa !== null,
          'bg-white': dok_siswa === null,
        },
      )}
    >
      <Form {...form}>
        <form
          className="scrollbar flex h-full w-full flex-col gap-32 overflow-auto"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            name="file"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full items-center  text-[2rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]">
                <div className="flex w-full flex-col gap-12 phones:w-full">
                  <FormControl>
                    <Input
                      type="file"
                      className="bg-white"
                      disabled={
                        isLoadingUpload || status_verifikasi === 1 || isLoading
                      }
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

          <button
            type="submit"
            className="flex items-center justify-center gap-12 text-nowrap rounded-lg bg-primary p-8 text-[2rem] text-white hover:bg-primary-background disabled:cursor-not-allowed"
            disabled={
              isLoadingUpload ||
              status_verifikasi === 1 ||
              isLoading ||
              disabled
            }
          >
            {isLoadingUpload ? (
              <span className="animate-spin duration-300">
                <Loader2 size={16} />
              </span>
            ) : (
              <Upload size={16} />
            )}
            {dok_siswa ? 'Ganti File' : 'Unggah File'}
          </button>
        </form>
      </Form>

      <div className="flex flex-col gap-8">
        {dok_siswa ? (
          <Link
            to={dok_siswa}
            className="text-nowrap rounded-lg bg-primary p-8 text-center text-[2rem] text-white hover:bg-primary-background disabled:cursor-not-allowed"
            target="_blank"
          >
            Lihat Gambar
          </Link>
        ) : (
          'File belum diupload'
        )}
      </div>
    </div>
  )
}

export default FileUploadForm
