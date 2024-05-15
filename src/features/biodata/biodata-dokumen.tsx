import { Form } from '@/components/atoms/Form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { dokumenSchema } from '@/libs/schema/biodata-schema'
import { FormDokumen } from './form-dokumen'
import { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setStateBiodata } from '@/store/reducer/stateBiodata'

export function BiodataDokumen({
  setName,
  setActiveIndex,
}: {
  setName: Dispatch<SetStateAction<string>>
  setActiveIndex: Dispatch<SetStateAction<number>>
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // --- Form Schema ---
  const form = useForm<zod.infer<typeof dokumenSchema>>({
    resolver: zodResolver(dokumenSchema),
    defaultValues: {},
  })

  const handleFormLogin = (values) => {
    console.log(values)
    setActiveIndex(5)
    setName('pilih-sekolah')
    dispatch(setStateBiodata({ page: 'pilih-sekolah' }))
    navigate(`/main?page=${'pilih-sekolah'}`)
  }
  return (
    <Form {...form}>
      <form
        className="scrollbar flex h-full w-full flex-col overflow-auto"
        onSubmit={form.handleSubmit(handleFormLogin)}
      >
        <div className="scrollbar flex h-full flex-1 flex-col gap-32 overflow-auto pb-32">
          {/* --- Informasi Pribadi --- */}
          <FormDokumen form={form} />
        </div>
        {/* --- button --- */}
        <div className="flex items-center justify-between bg-primary-50 p-32">
          <p className="text-[1.8rem] text-emerald-800">* Wajib Diisi</p>
          <div className="flex items-center gap-16 text-[2rem]">
            <button
              className="rounded-2xl bg-primary-background px-24 py-12 text-white hover:bg-primary-700"
              type="button"
              onClick={() => {
                setActiveIndex(4)
                setName('orang-tua')
                dispatch(setStateBiodata({ page: 'orang-tua' }))
                navigate(`/main?page=${'orang-tua'}`)
              }}
            >
              Kembali
            </button>
            <button
              className="rounded-2xl bg-emerald-700 px-24 py-12 text-white hover:bg-emerald-900"
              type="submit"
            >
              Lanjut
            </button>
          </div>
        </div>
      </form>
    </Form>
  )
}
