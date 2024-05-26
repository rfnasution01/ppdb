/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from '@/components/atoms/Loading'
import { CircleAlert, CircleCheck, Loader2, Save } from 'lucide-react'
import { Form } from '@/components/atoms/Form'
import { FormLabelComponent } from '../biodata/form-label-component'
import { FormListTanggalLahir } from '@/components/molecules/form'
import { ListBulan } from '@/libs/dummy/list-tanggal'
import { UseFormReturn } from 'react-hook-form'

export function LoginForm({
  handleFormLogin,
  disabled,
  loginIsError,
  loginIsSuccess,
  msg,
  form,
}: {
  handleFormLogin(values: any): Promise<void>
  disabled: boolean
  loginIsError: boolean
  loginIsSuccess: boolean
  msg: string
  form: UseFormReturn
}) {
  const ListTanggal = []

  for (let i = 1; i <= 31; i++) {
    const formattedValue = i < 10 ? `0${i}` : i.toString()
    ListTanggal.push({ value: formattedValue, label: formattedValue })
  }

  const ListTahun = []
  const tahunSekarang = new Date().getFullYear()

  for (let i = tahunSekarang; i >= tahunSekarang - 30; i--) {
    ListTahun.push({ value: i.toString(), label: String(i) })
  }

  return (
    <div className="flex flex-col gap-y-32">
      {disabled && <Loading />}
      {loginIsError && (
        <div className="flex items-center gap-x-12  border-l-8 border-red-500 bg-red-100 px-16 py-8 text-[2rem]">
          <span>
            <CircleAlert />
          </span>
          {msg}
        </div>
      )}
      {loginIsSuccess && (
        <div className="flex items-center gap-x-12  border-l-8 border-emerald-500 bg-emerald-100 px-16 py-8 text-[2rem]">
          <span>
            <CircleCheck />
          </span>
          {msg}
        </div>
      )}
      {/* --- Form --- */}
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-y-32"
          onSubmit={form.handleSubmit(handleFormLogin)}
        >
          <div className="flex flex-col items-center gap-y-24 text-black">
            {/* --- Username --- */}
            <FormLabelComponent
              form={form}
              placeHolder="Masukkan NISN atau No. Peserta"
              name="username"
              type="text"
              label="NIK / NISN*"
            />
            {/* --- Tanggal Lahir --- */}
            <FormListTanggalLahir
              name="tanggal_lahir"
              placeholder="Pilih Tanggal Lahir"
              headerLabel="Tanggal Lahir*"
              form={form}
              data={ListTanggal}
            />

            <FormListTanggalLahir
              name="bulan_lahir"
              placeholder="Pilih Bulan Lahir"
              headerLabel="Bulan Lahir*"
              form={form}
              data={ListBulan}
            />

            <FormListTanggalLahir
              name="tahun_lahir"
              placeholder="Pilih Tahun Lahir"
              headerLabel="Tahun Lahir*"
              form={form}
              data={ListTahun}
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex w-4/6 flex-col justify-center gap-12 phones:w-full">
              <button
                type="submit"
                disabled={disabled}
                className="flex w-full items-center justify-center gap-x-12 rounded-2xl bg-green-700 py-12 text-[2rem] text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:bg-emerald-200 phones:w-full"
              >
                <p className="uppercase">Login</p>
                {disabled ? (
                  <span className="animate-spin duration-300">
                    <Loader2 size={16} />
                  </span>
                ) : (
                  <Save size={16} />
                )}
              </button>
              <p className="text-right text-[1.8rem] text-blue-900 hover:cursor-pointer hover:text-blue-700">
                Lupa Password?
              </p>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
