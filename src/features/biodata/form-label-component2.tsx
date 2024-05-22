import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/Form'
import { Input } from '@/components/molecules/input'
import { UseFormReturn } from 'react-hook-form'

export function FormLabelComponent2({
  name,
  form,
  label,
  placeHolder,
  type,
  isNumber,
  isDisabled,
  isOperator,
  isKomentar,
}: {
  name: string
  form: UseFormReturn
  label: string
  placeHolder: string
  type: 'text' | 'date' | 'file' | 'checkbox' | 'email' | 'password'
  isNumber?: boolean
  isDisabled?: boolean
  isOperator?: boolean
  isKomentar?: boolean
}) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem
          className={`flex ${isOperator ? 'w-1/2' : 'w-full'} items-center gap-32 text-[2rem] phones:w-full phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]`}
        >
          <div
            className={`${isOperator ? 'w-2/6' : 'w-1/6'} text-left phones:w-full phones:text-left`}
          >
            <FormLabel>{label}</FormLabel>
          </div>
          <div
            className={`${isOperator ? 'w-4/6' : isKomentar ? 'w-5/6' : 'w-2/6'} phones:w-full`}
          >
            <FormControl>
              <Input
                {...field}
                className={`${type === 'date' ? 'w-1/2' : 'w-full'} phones:w-full`}
                placeholder={placeHolder}
                type={type}
                disabled={isDisabled}
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
