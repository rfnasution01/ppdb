import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { daptarAkunSchema } from '@/libs/schema/daptar-akun-schema'
import { Form } from '@/components/atoms/Form'
import { FormDaptar } from './form-daptar'
import { useEffect, useState } from 'react'

export function FormDaptarAkun({ showJenjang }: { showJenjang: string }) {
  const [first, setFirst] = useState(true)
  const [isChecked, setIsChecked] = useState<boolean>(false)

  useEffect(() => {
    if (first) {
      setFirst(false)
    }
  }, [first])

  const form = useForm<zod.infer<typeof daptarAkunSchema>>({
    resolver: zodResolver(daptarAkunSchema),
    defaultValues: {},
  })

  const handleFormLogin = (values) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        className="scrollbar flex h-full w-full flex-col overflow-auto"
        onSubmit={form.handleSubmit(handleFormLogin)}
      >
        <div className="scrollbar flex h-full flex-1 flex-col gap-32 overflow-auto pb-32">
          {/* --- Informasi Pribadi --- */}
          <FormDaptar
            form={form}
            showJenjang={showJenjang}
            setIsChecked={setIsChecked}
            isChecked={isChecked}
          />
        </div>
        {/* --- button --- */}
        <div className="flex items-center justify-between bg-primary-50 p-32">
          <p className="text-[1.8rem] text-emerald-800">* Wajib Diisi</p>
          <div className="flex items-center gap-16 text-[2rem]">
            <button
              className="rounded-2xl bg-emerald-700 px-24 py-12 text-white hover:bg-emerald-900"
              type="submit"
            >
              Simpan
            </button>
          </div>
        </div>
      </form>
    </Form>
  )
}
