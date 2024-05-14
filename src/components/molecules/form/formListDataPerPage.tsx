import { ListDataPerPage } from '@/libs/dummy/list-data-per-page'
import Select from 'react-select'
import { customStyles } from '@/libs/dummy/selectProps'
import { Dispatch, SetStateAction } from 'react'

export function FormListDataPerPage({
  setDataPerPage,
}: {
  setDataPerPage: Dispatch<SetStateAction<number>>
}) {
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
      defaultValue={ListDataPerPage[0]}
      className={'text-[2rem]'}
      options={ListDataPerPage}
      onChange={(optionSelected: { value: number; label: number }) => {
        setDataPerPage(optionSelected?.value)
      }}
    />
  )
}
