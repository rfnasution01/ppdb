import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/Form'
import { Input } from '@/components/molecules/input'
import { UseFormReturn } from 'react-hook-form'

export function FormLabelComponent({
  name,
  form,
  label,
  placeHolder,
  type,
  isNumber,
}: {
  name: string
  form: UseFormReturn
  label: string
  placeHolder: string
  type: 'text' | 'date' | 'file'
  isNumber?: boolean
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
          <div className="w-2/6 phones:w-full">
            <FormControl>
              <Input
                {...field}
                className={`${type === 'date' ? 'w-1/2' : 'w-full'} phones:w-full`}
                placeholder={placeHolder}
                type={type}
                onInput={(e) => {
                  if (isNumber && type === 'text') {
                    const inputValue = (e.target as HTMLInputElement).value
                    ;(e.target as HTMLInputElement).value = inputValue.replace(
                      /[^\d]/g,
                      '',
                    )
                    field.onChange((e.target as HTMLInputElement).value)
                  }
                }}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
