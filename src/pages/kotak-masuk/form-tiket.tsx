/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/Form'
import { FormLabelInput, Input } from '@/components/molecules/input'
import Tiptap from '@/components/molecules/tiptap'
import { TiketType } from '@/libs/types/tiket-type'
import { useCreateFileMutation } from '@/store/slices/tiketAPI'
import { Image, Loader2, Save, Trash, Upload } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'

export function FormTiket({
  form,
  isEdit,
  data,
  handleSubmit,
  handleSubmitEdit,
  isLoadingEdit,
  isLoadingUpload,
  setUrls,
}: {
  form: UseFormReturn
  isEdit?: boolean
  data?: TiketType
  handleSubmitEdit?: (values: any) => Promise<void>
  handleSubmit?: (values: any) => Promise<void>
  isLoadingUpload?: boolean
  isLoadingEdit?: boolean
  setUrls: Dispatch<SetStateAction<string[]>>
}) {
  const navigate = useNavigate()

  const [uploadFileMutation] = useCreateFileMutation()

  const handleUploadFoto = async (file: File) => {
    const formatData = new FormData()
    formatData.append('berkas', file)

    try {
      const res = await uploadFileMutation(formatData)
      setDir([...dir, res?.data?.url])
    } catch (e) {
      console.error(e)
      toast.error(`Data gagal disimpan`, {
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

  const [dir, setDir] = useState(form.watch('berkas') ?? [])

  useEffect(() => {
    if (dir && dir.length > 0) {
      setUrls(dir)
    }
  }, [dir])

  useEffect(() => {
    if (isEdit) {
      form.setValue('judul', data?.judul)
      form.setValue('keterangan', data?.keterangan)
      form.setValue('berkas', data?.lampiran)
      setDir(data?.lampiran?.map((item) => item?.dokumen))
    }
  }, [data])

  useEffect(() => {
    if (dir) {
      form.setValue('berkas', dir)
    }
  }, [dir])

  const handleRemoveItem = (indexToRemove) => {
    setDir((prevMultiImg) => {
      return prevMultiImg.filter((_, index) => index !== indexToRemove)
    })
  }

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
          isDisabled={isLoadingUpload || isLoadingEdit}
        />

        <FormField
          control={form?.control}
          name="keterangan"
          render={({ field }) => (
            <FormItem
              className={`flex flex-col gap-y-8 text-[2rem] text-black`}
            >
              <FormLabel>Keterangan</FormLabel>
              <FormControl>
                <Tiptap
                  content={field.value}
                  placeholder="Masukkan Keterangan"
                  update={field.onChange}
                  toolbarClassName="gap-4 p-4"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="berkas"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormControl>
                <div>
                  <Input
                    className="absolute -z-[1] h-[0.1px] w-[0.1px] overflow-hidden opacity-0"
                    {...field}
                    id="berkas"
                    type="file"
                    value={''}
                    disabled={isLoadingEdit || isLoadingUpload}
                    placeholder="Lampiran"
                    onChange={(e) => {
                      if (e.target.files[0].size > 5 * 1000000) {
                        return toast.error(
                          `File terlalu besar. Maksimal 5 MB`,
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
                      } else {
                        if (e.target.files[0] != null) {
                          handleUploadFoto(e.target.files[0])
                        }
                      }
                    }}
                  />
                  <div className="flex gap-32 phones:flex-col">
                    <label
                      className="flex w-1/2 flex-col items-center gap-24 rounded-lg border-2 border-dashed border-primary p-48 text-primary hover:cursor-pointer phones:w-full"
                      htmlFor="berkas"
                    >
                      <span>
                        <Upload size={32} />
                      </span>
                      Unggah File
                    </label>

                    <div className="flex w-1/2 flex-col whitespace-nowrap phones:w-full">
                      {dir && dir.length > 0 ? (
                        dir?.map((name, idx) => (
                          <div
                            className="flex items-center justify-between gap-16 p-8 hover:cursor-pointer hover:text-primary"
                            key={idx}
                          >
                            <Link
                              to={name}
                              className="flex flex-1 items-center gap-12"
                              target="_blank"
                            >
                              <Image size={16} />{' '}
                              <p className="limited-text">{name}</p>
                            </Link>
                            <Trash
                              size={15}
                              className="hover:cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRemoveItem(idx)
                              }}
                            />
                          </div>
                        ))
                      ) : (
                        <div>Belum ada file di upload</div>
                      )}
                    </div>
                  </div>
                </div>
              </FormControl>
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
              navigate('/main/pertanyaan')
            }}
          >
            Kembali
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
