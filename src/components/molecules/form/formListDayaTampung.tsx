import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/Form'
import { cn } from '@/libs/helpers/utils'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import Select, { components } from 'react-select'
import { customStyles } from '@/libs/dummy/selectProps'
import { useGetDayaTampungQuery } from '@/store/slices/dayaTampungAPI'
import { DayaTampungIsi } from '@/libs/types'
import Cookies from 'js-cookie'

type inputProps = {
  placeholder: string
  isDisabled?: boolean
  name: string
  headerLabel: string
  useFormReturn: UseFormReturn
  className?: string
}

export function FormListDayaTampung({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  useFormReturn,
  className,
}: inputProps) {
  const jenjang = Cookies.get('jenjang')
  const jalur = Cookies.get('jalur')
  const [query, setQuery] = useState<string>(null)
  const [listDayaTampung, setListDayaTampung] = useState<DayaTampungIsi[]>([])
  const { data, isSuccess, isLoading, isFetching } = useGetDayaTampungQuery({
    jenjang: jenjang,
    jalur: jalur,
  })

  useEffect(() => {
    if (!isFetching) {
      if (data?.meta?.page > 1) {
        setListDayaTampung((prevData) => [
          ...prevData,
          ...(data?.data?.isi ?? []),
        ])
      } else {
        setListDayaTampung([...(data?.data?.isi ?? [])])
      }
    }
  }, [data])

  let DayaTampungOption = []
  if (isSuccess) {
    DayaTampungOption = listDayaTampung.map((item) => {
      return {
        value: item?.id_sekolah,
        label: item?.nama_sekolah,
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
              'flex flex-col gap-12 text-[2rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]',
              className,
            )}
          >
            <div className="left w-full text-emerald-900 phones:w-full phones:text-left">
              <FormLabel>{headerLabel}</FormLabel>
            </div>
            <div className="w-full phones:w-full">
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
                  options={DayaTampungOption}
                  value={
                    DayaTampungOption.filter(
                      (item) => item.value === field.value,
                    )[0]
                  }
                  placeholder={placeholder ?? 'Pilih'}
                  onInputChange={search}
                  onChange={(optionSelected) => {
                    field.onChange(optionSelected.value)
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
