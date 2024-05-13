import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/Form'
import { FormLabelInput, Input } from '@/components/molecules/input'
import { Dispatch, SetStateAction, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { ModalAside } from './modal-aside'

export function FormDaptar({
  form,
  showJenjang,
  setIsChecked,
  isChecked,
}: {
  form: UseFormReturn
  showJenjang: string
  setIsChecked: Dispatch<SetStateAction<boolean>>
  isChecked
}) {
  const [isShow, setIsShow] = useState<boolean>(false)

  const handleCheckboxChange = () => {
    setIsShow(true)
  }

  return (
    <div className="flex flex-col gap-32">
      <div className="grid grid-cols-2 grid-rows-3 gap-32 text-[2rem] phones:grid-cols-1">
        {/* --- NISN --- */}
        {showJenjang.toLowerCase() === 'smp' && (
          <FormField
            name="nisn*"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-8">
                <FormLabel>NISN</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Masukkan NISN anda"
                    onInput={(e) => {
                      const inputValue = (e.target as HTMLInputElement).value
                      ;(e.target as HTMLInputElement).value =
                        inputValue.replace(/[^\d]/g, '')
                      field.onChange((e.target as HTMLInputElement).value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* --- Nama --- */}
        <FormLabelInput
          form={form}
          label="Nama Lengkap*"
          placeholder="Masukkan Nama Lengkap anda"
          name="nama_lengkap"
          type="text"
        />

        {/* --- NIK --- */}
        <FormField
          name="nik"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-8">
              <FormLabel>NIK*</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Masukkan NIK anda"
                  onInput={(e) => {
                    const inputValue = (e.target as HTMLInputElement).value
                    ;(e.target as HTMLInputElement).value = inputValue.replace(
                      /[^\d]/g,
                      '',
                    )
                    field.onChange((e.target as HTMLInputElement).value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Konfirmasi Nik --- */}
        <FormField
          name="konfirmasi_nik"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-8">
              <FormLabel>Konfirmasi NIK*</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Masukkan NIK anda"
                  onInput={(e) => {
                    const inputValue = (e.target as HTMLInputElement).value
                    ;(e.target as HTMLInputElement).value = inputValue.replace(
                      /[^\d]/g,
                      '',
                    )
                    field.onChange((e.target as HTMLInputElement).value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabelInput
          form={form}
          label="Tanggal Lahir*"
          placeholder="Masukkan tanggal lahir anda"
          name="tgl_lahir"
          type="date"
        />
        <FormLabelInput
          form={form}
          label="Konfirmasi Tanggal Lahir*"
          placeholder="Masukkan tanggal lahir anda"
          name="konfirmasi_tgl_lahir"
          type="date"
        />
      </div>

      <FormField
        name="isChecked"
        control={form.control}
        render={({ field }) => (
          <FormItem className="flex items-center justify-start gap-8 text-[2rem]">
            <FormControl>
              <Input
                {...field}
                name="isChecked"
                className="h-[2.4rem] w-[2.4rem]"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </FormControl>
            <FormLabel>Konfirmasi data sudah benar*</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <ModalAside
        setIsOpen={setIsShow}
        isOpen={isShow}
        values={form.getValues()}
        setIsChecked={setIsChecked}
        form={form}
      />
    </div>
  )
}
