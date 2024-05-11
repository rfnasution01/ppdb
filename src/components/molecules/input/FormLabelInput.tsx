/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/Form'
import { Input } from '.'
import { ReactNode } from 'react'

export function FormLabelInput({
  form,
  label,
  placeholder = '',
  name,
  prefix,
  suffix,
  type,
  handlerClick,
  className,
  isDisabled,
}: {
  form: UseFormReturn | undefined | any
  label?: string | ReactNode
  placeholder?: string
  name: string
  prefix?: JSX.Element
  suffix?: JSX.Element
  type?: 'text' | 'number' | 'password' | 'date' | 'file'
  handlerClick?: () => void
  className?: string
  isDisabled?: boolean
}) {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex w-full items-center gap-32 text-[2rem] phones:flex-col phones:text-[2.4rem] ${className}`}
        >
          <FormLabel className="w-4/12 text-nowrap text-right text-emerald-800 phones:w-full">
            {label}
          </FormLabel>
          <div className={`${type === 'date' ? 'w-2/12' : 'w-4/12'}`}>
            <Input
              {...field}
              className="w-full bg-white hover:cursor-pointer"
              type={type}
              placeholder={placeholder}
              value={field.value}
              prefix={prefix}
              suffix={suffix}
              handlerClick={handlerClick}
              disabled={isDisabled}
            />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
