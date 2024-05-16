import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/Form'
import { cn } from '@/libs/helpers/utils'
import { ProvinsiType } from '@/libs/types/pendaftaran-type'
import { useGetKecamatanQuery } from '@/store/slices/pendaftaranAPI'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import Select, { components } from 'react-select'
import { customStyles } from '@/libs/dummy/selectProps'

type inputProps = {
  placeholder: string
  isDisabled?: boolean
  name: string
  headerLabel: string
  useFormReturn: UseFormReturn
  className?: string
}

export function FormListKecamatan({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  useFormReturn,
  className,
}: inputProps) {
  const [query, setQuery] = useState<string>(null)
  const [listKecamatan, setListKecamatan] = useState<ProvinsiType[]>([])
  const kabupaten = useFormReturn.watch('kabupaten')

  const { data, isSuccess, isLoading, isFetching } = useGetKecamatanQuery(
    {
      id_kabupaten: kabupaten,
    },
    {
      skip: !kabupaten,
    },
  )

  useEffect(() => {
    if (!isFetching) {
      if (data?.meta?.page > 1) {
        setListKecamatan((prevData) => [...prevData, ...(data?.data ?? [])])
      } else {
        setListKecamatan([...(data?.data ?? [])])
      }
    }
  }, [data, kabupaten])

  let kecamatanOption = []
  if (isSuccess) {
    kecamatanOption = listKecamatan.map((item) => {
      return {
        value: item?.id,
        label: item?.nama,
      }
    })
  }

  const search = (newValue: string) => {
    if (newValue != query) {
      setQuery(newValue)
    }
  }

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <div ref={props.innerRef}>
          <div className="text-[12px]">{props.label}</div>
        </div>
      </components.Option>
    )
  }

  return (
    <FormField
      name={name}
      control={useFormReturn.control}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              'flex items-center gap-32 text-[2rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]',
              className,
            )}
          >
            <div className="w-2/6 text-right text-emerald-900 phones:w-full phones:text-left">
              <FormLabel>{headerLabel}</FormLabel>
            </div>
            <div className="w-2/6 phones:w-full">
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
                  options={kecamatanOption}
                  value={
                    kecamatanOption.filter(
                      (item) => item.value === field.value,
                    )[0]
                  }
                  placeholder={placeholder ?? 'Pilih'}
                  onInputChange={search}
                  onChange={(optionSelected) => {
                    field.onChange(optionSelected.value)
                    useFormReturn.setValue('kecamatan', optionSelected.value)
                  }}
                  isDisabled={isDisabled}
                  isLoading={isFetching || isLoading}
                  components={{ Option }}
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
