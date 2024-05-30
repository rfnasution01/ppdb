/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/atoms/Form'
import { Input } from '@/components/molecules/input'
import { useCreateFileMutation } from '@/store/slices/tiketAPI'
import { Image, Loader2, Paperclip, Send, Trash } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'

export function FormChat({
  form,
  handleSubmit,
  isLoadingUpload,
  setUrls,
}: {
  form: UseFormReturn
  handleSubmit?: (values: any) => Promise<void>
  isLoadingUpload?: boolean
  setUrls: Dispatch<SetStateAction<string[]>>
}) {
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
        className="scrollbar flex h-full w-full flex-col gap-32 overflow-auto rounded-2xl border bg-white p-24"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex items-center gap-32">
          <FormField
            name="berkas"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex items-center justify-center">
                <FormControl>
                  <div>
                    <Input
                      className="absolute overflow-hidden opacity-0"
                      {...field}
                      id="berkas"
                      type="file"
                      value={''}
                      disabled={isLoadingUpload}
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
                    <div className="flex items-center  justify-center gap-32 phones:flex-col">
                      <label
                        className="flex items-center gap-24 rounded-lg text-primary hover:cursor-pointer phones:w-full"
                        htmlFor="berkas"
                      >
                        <span>
                          <Paperclip size={24} />
                        </span>
                      </label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form?.control}
            name="isi"
            render={({ field }) => (
              <FormItem
                className={`flex flex-1 flex-col gap-y-8 text-[2rem] text-black`}
              >
                <Input
                  {...field}
                  className="bg-white"
                  type="text"
                  placeholder="Masukkan pesan"
                  value={field.value}
                  disabled={isLoadingUpload}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            disabled={isLoadingUpload}
            className="text-primary"
            type="submit"
          >
            {isLoadingUpload ? (
              <span className="animate-spin duration-300">
                <Loader2 size={24} />
              </span>
            ) : (
              <Send size={24} />
            )}
          </button>
        </div>

        {dir &&
          dir.length > 0 &&
          dir?.map((name, idx) => (
            <div
              className="flex items-center gap-16 p-8 hover:cursor-pointer hover:text-primary"
              key={idx}
            >
              <Link
                to={name}
                className="flex flex-1 items-center gap-12"
                target="_blank"
              >
                <Image size={16} />
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
          ))}
      </form>
    </Form>
  )
}
