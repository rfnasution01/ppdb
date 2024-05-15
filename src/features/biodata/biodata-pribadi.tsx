import { Form } from '@/components/atoms/Form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { informasiPribadiSchema } from '@/libs/schema/biodata-schema'
import { FormBiodata } from './form-informasi-pribadi'
import { FormAlamat } from './form-alamat'
import { Dispatch, SetStateAction } from 'react'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function BiodataPribadi({
  setName,
  setActiveIndex,
}: {
  setName: Dispatch<SetStateAction<string>>
  setActiveIndex: Dispatch<SetStateAction<number>>
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // --- Form Schema ---
  const form = useForm<zod.infer<typeof informasiPribadiSchema>>({
    resolver: zodResolver(informasiPribadiSchema),
    defaultValues: {},
  })

  const handleFormLogin = (values) => {
    console.log(values)
    setActiveIndex(2)
    setName('pendidikan-sebelumnya')
    dispatch(setStateBiodata({ page: 'pendidikan-sebelumnya' }))
    navigate(`/main?page=${'pendidikan-sebelumnya'}`)
  }
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col"
        onSubmit={form.handleSubmit(handleFormLogin)}
      >
        <div className="flex flex-1 flex-col gap-32 pb-32">
          {/* --- Informasi Pribadi --- */}
          <div className="flex flex-col gap-24">
            <p className="font-bold">Informasi Pribadi</p>
            <FormBiodata form={form} />
          </div>
          {/* --- Alamat --- */}
          <div className="flex flex-col gap-24">
            <p className="font-bold">Alamat</p>
            <FormAlamat form={form} />
          </div>
        </div>
        {/* --- button --- */}
        <div className="flex items-center justify-between bg-primary-50 p-32">
          <p className="text-[1.8rem] text-emerald-800">* Wajib Diisi</p>
          <div className="flex items-center gap-16 text-[2rem]">
            <button
              className="rounded-2xl bg-primary-background px-24 py-12 text-white hover:bg-primary-700"
              type="button"
              onClick={() => {
                setActiveIndex(0)
                setName('jalur-pendaftaran')
                dispatch(setStateBiodata({ page: 'jalur-pendaftaran' }))
                navigate(`/main?page=${'jalur-pendaftaran'}`)
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
