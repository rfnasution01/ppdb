import Select from 'react-select'
import { customStyles } from '@/libs/dummy/selectProps'
import { Dispatch, SetStateAction } from 'react'

export function FormListTahun({
  setTahun,
}: {
  setTahun: Dispatch<SetStateAction<number>>
}) {
  const ListTahun = []

  const tahunSekarang = new Date().getFullYear()

  for (let i = tahunSekarang; i >= tahunSekarang - 30; i--) {
    ListTahun.push({ value: i, label: String(i) })
  }

  return (
    <Select
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
          ':hover': {
            cursor: 'pointer',
            backgroundColor: 'rgb(240 244 247 / var(--tw-bg-opacity))',
          },
        }),
      }}
      defaultValue={ListTahun[0]}
      className={'text-[2rem]'}
      options={ListTahun}
      onChange={(optionSelected: { value: number; label: number }) => {
        setTahun(optionSelected?.value)
      }}
    />
  )
}
