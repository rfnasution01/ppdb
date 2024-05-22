import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/Form'
import { cn } from '@/libs/helpers/utils'
import { UseFormReturn } from 'react-hook-form'
import Select from 'react-select'
import { customStyles } from '@/libs/dummy/selectProps'
import { ListTingkat } from '@/libs/dummy/list-tingkat'

interface inputProps {
  name: string
  placeholder: string
  headerLabel: string
  isDisabled?: boolean
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form?: UseFormReturn | any | undefined
}

export function FormListTingkat({
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
            className={cn(
              'flex w-1/2 items-center gap-32 text-[2rem] phones:w-full phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]',
              className,
            )}
          >
            <div className="w-2/6 text-left phones:w-full phones:text-left">
              <FormLabel>{headerLabel}</FormLabel>
            </div>
            <div className="w-4/6 phones:w-full">
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
                      backgroundColor:
                        'rgb(255 255 255 / var(--tw-bg-opacity))',
                      border:
                        '1px solid rgb(203 213 225 / var(--tw-bg-opacity))',
                      borderRadius: '0.375rem',
                      fontSize: '2rem',
                    }),
                    option: (provided) => ({
                      ...provided,
                      backgroundColor:
                        'rgb(255 255 255 / var(--tw-bg-opacity))',
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
                  options={ListTingkat}
                  value={
                    ListTingkat.filter((item) => item.value === field.value)[0]
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
            </div>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
