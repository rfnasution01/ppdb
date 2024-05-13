import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/Form'
import { ListAgama } from '@/libs/dummy/list-agama'
import { cn } from '@/libs/helpers/utils'
import { UseFormReturn } from 'react-hook-form'
import Select from 'react-select'
import { customStyles } from '@/libs/dummy/selectProps'

interface inputProps {
  name: string
  placeholder: string
  headerLabel: string
  isDisabled?: boolean
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form?: UseFormReturn | any | undefined
}

export function FormListAgama({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  form,
  className,
}: inputProps) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <FormItem
            className={cn('flex flex-col gap-16 text-[2rem]', className)}
          >
            <FormLabel className={'py-4 text-emerald-800'}>
              {headerLabel}
            </FormLabel>
            <FormControl>
              <Select
                {...field}
                styles={{
                  ...customStyles,
                  singleValue: (provided) => ({
                    ...provided,
                    color: 'grey',
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: 'grey',
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    padding: 0,
                    maxHeight: '50vh',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      width: 0,
                      height: 0,
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'transparent',
                      borderRadius: '6px',
                    },
                  }),
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: 'rgb(255 255 255 / var(--tw-bg-opacity))',
                    border: '1px solid rgb(203 213 225 / var(--tw-bg-opacity))',
                    borderRadius: '0.375rem',
                    fontSize: '2rem',
                  }),
                  option: (provided) => ({
                    ...provided,
                    backgroundColor: 'rgb(255 255 255 / var(--tw-bg-opacity))',
                    color: 'rgb(32 34 35 / var(--tw-bg-opacity))',
                    cursor: isDisabled ? 'not-allowed' : 'default',
                    ':hover': {
                      cursor: 'pointer',
                      backgroundColor:
                        'rgb(240 244 247 / var(--tw-bg-opacity))',
                    },
                  }),
                }}
                className={'text-[2rem]'}
                options={ListAgama}
                value={
                  ListAgama.filter((item) => item.value === field.value)[0]
                }
                placeholder={placeholder ?? 'Input here'}
                onChange={(optionSelected: {
                  value: string
                  label: string
                }) => {
                  field.onChange(optionSelected?.value)
                  form.setValue(name, optionSelected?.value)
                }}
                isDisabled={isDisabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
