import { useCreateUploadFileMutation } from '@/store/slices/pendaftaranAPI'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

const FileUploadForm = ({
  id_dokumen,
  format,
  status_verifikasi,
  isLoading,
  disabled,
}: {
  id_dokumen: string
  format?: number
  status_verifikasi?: number
  isLoading?: boolean
  disabled: boolean
}) => {
  const [file, setFile] = useState()
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
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
      setErrorMessage('')
    } else {
      console.log('tas')

      setFile(null)
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorMessage('File harus berupa gambar (JPEG/PNG) atau PDF')
      } else if (selectedFile.size > maxSize) {
        setErrorMessage('Ukuran file tidak boleh lebih dari 5MB')
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
      setErrorMessage('Silakan pilih file terlebih dahulu')
    }
  }

  useEffect(() => {
    if (isSuccessUpload) {
      setErrorMessage(`Upload file berhasil disimpan!`)
    }
  }, [isSuccessUpload])

  useEffect(() => {
    if (isErrorUpload) {
      const errorMsg = errorUpload as {
        data?: {
          message?: string
        }
      }

      setErrorMessage(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`)
    }
  }, [isErrorUpload, errorUpload])

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('')
    }, 3000)

    return () => clearTimeout(timer)
  }, [isSuccessUpload, isErrorUpload])

  return (
    <div className="flex items-center justify-between gap-48">
      <input
        type="file"
        onChange={handleFileChange}
        disabled={isLoadingUpload || status_verifikasi === 1 || isLoading}
      />
      <button
        className="text-nowrap rounded-lg bg-primary p-8 text-[2rem] text-white hover:bg-primary-background disabled:cursor-not-allowed"
        disabled={
          isLoadingUpload || status_verifikasi === 1 || isLoading || disabled
        }
        onClick={handleSubmit}
      >
        Unggah File
      </button>
      {errorMessage && (
        <p
          className={clsx('text-[2rem]', {
            'text-danger': isErrorUpload,
            'text-emerald-700': isSuccessUpload,
          })}
        >
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default FileUploadForm
