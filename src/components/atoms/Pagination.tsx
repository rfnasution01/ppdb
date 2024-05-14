import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export const Pagination = ({
  numberStart,
  dataPerPage,
  setNumberStart,
  pageNow,
  maxPage,
}: {
  numberStart: number
  dataPerPage: number
  setNumberStart: Dispatch<SetStateAction<number>>
  pageNow: number
  maxPage: number
}) => {
  return (
    <div className="flex items-center gap-24">
      <span
        className={clsx('border p-4', {
          'hover:cursor-pointer': numberStart - dataPerPage >= 0,
          'hover:cursor-not-allowed': numberStart - dataPerPage < 0,
        })}
        onClick={() => {
          if (numberStart - dataPerPage >= 0) {
            setNumberStart(numberStart - dataPerPage)
          }
        }}
      >
        <ChevronLeft />
      </span>
      <p>
        <span className="text-rose-950">{pageNow + 1}</span> / {maxPage}
      </p>
      <span
        className={clsx('border p-4', {
          'hover:cursor-pointer': pageNow < maxPage - 1,
          'hover:cursor-not-allowed': pageNow >= maxPage - 1,
        })}
        onClick={() => {
          if (pageNow < maxPage - 1) {
            setNumberStart(numberStart + dataPerPage)
          }
        }}
      >
        <ChevronRight />
      </span>
    </div>
  )
}
