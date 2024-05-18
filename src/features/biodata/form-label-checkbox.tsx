import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/Form'
import { Input } from '@/components/molecules/input'
import { UseFormReturn } from 'react-hook-form'

export function FormLabelCheckBox({
  name,
  form,
  label,
  placeHolder,
  isDisabled,
  isChecked,
}: {
  name: string
  form: UseFormReturn
  label: string
  placeHolder: string
  isDisabled?: boolean
  isChecked: boolean
}) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex w-full items-center gap-32 text-[2rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]">
          <div className="w-2/6 text-right text-emerald-900 phones:w-full phones:text-left">
            <FormLabel>{label}</FormLabel>
          </div>
          <div className="flex w-2/6 items-center gap-8 phones:w-full">
            <FormControl>
              <Input
                {...field}
                className="h-[2.4rem] w-[2.4rem]"
                placeholder={placeHolder}
                type="checkbox"
                disabled={isDisabled}
                checked={isChecked}
                onChange={(e) => {
                  form.setValue(name, e.target.checked)
                  if (name === 'isHidupAyah') {
                    form.setValue('telepon_ayah', undefined)
                    form.setValue('pendidikan_ayah', undefined)
                    form.setValue('pekerjaan_ayah', undefined)
                  }
                  if (name === 'isHidupIbu') {
                    form.setValue('telepon_ibu', undefined)
                    form.setValue('pendidikan_ibu', undefined)
                    form.setValue('pekerjaan_ibu', undefined)
                  }
                }}
              />
            </FormControl>
            <p>Ya</p>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
