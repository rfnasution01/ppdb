import { Fragment, useState } from 'react'
import clsx from 'clsx'
import { TimeflowLoading } from './TimeflowLoading'
import { ArrowDown01, BarChart, ChevronDown, MapPin } from 'lucide-react'
import { ModalLokasi } from '@/features/lokasi/modal-lokasi'
import Tooltips from './Tooltip'
import { useNavigate } from 'react-router-dom'

export type Column<T> = {
  header: string
  key?: string | number
  renderCell?: (rowData: T) => React.ReactNode
  width?: string
}

type Props<T, P> = {
  data: T[]
  columns: Column<T>[] | ((props: P) => Column<T>[])
  containerClasses?: string
  maxHeight?: string
  loading?: boolean
  columnProps?: P
  onItemClick?: (rowData: T) => void
  collapseComponent?: React.ReactNode
  checkbox?: boolean
  isStatistik?: boolean
  isLokasi?: boolean
  isDayaTampung?: boolean
  latitude?: number
  longitude?: number
  jenjang?: string
  kode?: string
}

export function Table<T, P>({
  data,
  columns,
  containerClasses = '',
  maxHeight = 'max-h-[60vh]',
  loading,
  columnProps,
  onItemClick,
  collapseComponent,
  checkbox,
  isStatistik,
  isLokasi,
  isDayaTampung,
  jenjang,
  kode,
}: Props<T, P>) {
  const navigate = useNavigate()
  const [rowIsOpen, setRowIsOpen] = useState<number | null>(null)
  const [lokasiIsOpen, setLokasiIsOpen] = useState<number | null>(null)

  const columnArray =
    typeof columns === 'function' ? columns(columnProps as P) : columns
  const [isShowLokasi, setIsShowLokasi] = useState<boolean>(false)

  return (
    <div className={`rounded-2xl ${containerClasses}`}>
      {/* ----- Loading UI ----- */}
      {loading ? (
        <TimeflowLoading width="6.4rem" height="6.4rem" />
      ) : (
        <div
          className={`scrollbar flex flex-col overflow-auto ${maxHeight}`}
          style={{ scrollbarGutter: 'stable' }}
        >
          {/* ----- No Data/Fallback UI ----- */}
          {!data || data.length === 0 ? (
            <p className="text-24 text-typography-disabled">No data.</p>
          ) : (
            <table className="flex-1 border-collapse text-24">
              <thead className="relative z-10 align-top leading-medium">
                <tr className="border-b-[1.6rem] border-transparent">
                  {/* ----- Table Headers ----- */}
                  {columnArray
                    .filter((column) => !column.header.includes('Aksi'))
                    .map((column, colIndex) => (
                      <th
                        className={`sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase ${column.width}`}
                        key={column.key || colIndex.toString()}
                      >
                        {column.header}
                      </th>
                    ))}

                  {/* ----- Statistik ----- */}
                  {isStatistik && (
                    <th className="sticky top-0 w-[10%] border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                      Detail
                    </th>
                  )}

                  {/* ----- Lokasi ----- */}
                  {isLokasi && (
                    <th className="sticky top-0 w-[10%] border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                      Peta
                    </th>
                  )}

                  {/* ----- Daya Tampung ----- */}
                  {isDayaTampung && (
                    <th className="sticky top-0 w-[10%] border-b-2 bg-background p-4 px-24 py-12 text-left uppercase uppercase">
                      Tautan
                    </th>
                  )}

                  {/* ----- Detail Header ----- */}
                  {collapseComponent && (
                    <th className="sticky right-0 top-0 bg-white p-16 text-left">
                      <span className="shadow-[-2.4rem_0_0.4rem_rgb(255,255,255)]">
                        Detail
                      </span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <Fragment key={rowIndex}>
                    <tr
                      className={clsx(
                        'border-b-[1.6rem] border-transparent transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warning-tint-2',
                      )}
                      onClick={onItemClick ? () => onItemClick(row) : undefined}
                    >
                      {/* ----- Table Data ----- */}
                      {columnArray
                        .filter((column) => !column.header.includes('Aksi'))
                        .map((column, colIndex) => (
                          <td
                            className={`px-24 py-12 leading-medium ${column.width}`}
                            key={column.key || colIndex.toString()}
                          >
                            {column.renderCell
                              ? column.renderCell(row)
                              : (row[
                                  column.key as keyof T
                                ] as React.ReactNode) || '-'}
                          </td>
                        ))}

                      {/* ----- Detail ----- */}
                      {isStatistik && (
                        <td className="w-[10%] px-24 py-12 leading-medium">
                          <div className="flex items-center gap-8">
                            <span className="flex items-center justify-center rounded-lg border bg-white px-16 py-12 hover:cursor-pointer hover:bg-stone-300">
                              <ArrowDown01 size={16} />
                            </span>
                            <span className="flex items-center justify-center rounded-lg border bg-white px-16 py-12 hover:cursor-pointer hover:bg-stone-300">
                              <BarChart size={16} />
                            </span>
                          </div>
                        </td>
                      )}

                      {/* ----- Lokasi ----- */}
                      {isLokasi && (
                        <td className="w-[10%] px-24 py-12 leading-medium">
                          <div className="flex items-center gap-8">
                            <span
                              onClick={() => {
                                setLokasiIsOpen(rowIndex)
                                setIsShowLokasi(true)
                              }}
                              className="flex items-center justify-center rounded-lg border bg-white px-16 py-12 hover:cursor-pointer hover:bg-stone-300"
                            >
                              <MapPin size={16} />
                            </span>
                          </div>
                        </td>
                      )}

                      {/* ----- Daya Tampung ----- */}
                      {isDayaTampung && (
                        <td className="w-[10%] px-24 py-12 leading-medium">
                          <div className="flex items-center gap-8">
                            <span
                              onClick={() => {
                                navigate(
                                  `/seleksi?jenjang=${jenjang}&kode=${kode}`,
                                )
                              }}
                              className="flex items-center justify-center rounded-lg border bg-white px-16 py-12 hover:cursor-pointer hover:bg-stone-300"
                            >
                              <Tooltips
                                triggerComponent={<ArrowDown01 size={16} />}
                                tooltipContent={
                                  <p className="text-left text-[2rem]">
                                    Lihat Hasil Seleksi
                                  </p>
                                }
                              />
                            </span>
                            <span
                              onClick={() => {
                                navigate(
                                  `/statistik?jenjang=${jenjang}&kode=${kode}`,
                                )
                              }}
                              className="flex items-center justify-center rounded-lg border bg-white px-16 py-12 hover:cursor-pointer hover:bg-stone-300"
                            >
                              <Tooltips
                                triggerComponent={<BarChart size={16} />}
                                tooltipContent={
                                  <p className="text-left text-[2rem]">
                                    Lihat Statistik Sekolah
                                  </p>
                                }
                              />
                            </span>
                          </div>
                        </td>
                      )}

                      {/* ----- Collapse Trigger ----- */}
                      {collapseComponent && (
                        <td className="sticky right-0 bg-white p-16">
                          <div className="shadow-[-2.4rem_0_0.4rem_rgb(255,255,255)]">
                            <button
                              className="rounded-full p-4 transition-all ease-in hover:bg-neutral-100"
                              onClick={() => {
                                if (rowIsOpen === rowIndex) {
                                  setRowIsOpen(null)
                                } else {
                                  setRowIsOpen(rowIndex)
                                }
                              }}
                            >
                              <ChevronDown
                                width={20}
                                height={20}
                                className={clsx('transition-all ease-in', {
                                  'rotate-180': rowIsOpen === rowIndex,
                                  'rotate-0': rowIsOpen !== rowIndex,
                                })}
                              />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>

                    {/* ----- Collapse Content ----- */}
                    {collapseComponent && (
                      <tr>
                        <td colSpan={columnArray.length + (checkbox ? 2 : 1)}>
                          <div
                            className={clsx(
                              'overflow-hidden border-b bg-neutral-100 bg-opacity-[0.15] px-8 transition-all ease-in',
                              {
                                'max-h-full translate-y-0 py-16 opacity-100':
                                  rowIsOpen === rowIndex,
                                'max-h-0 -translate-y-16 opacity-0':
                                  rowIsOpen !== rowIndex,
                              },
                            )}
                          >
                            {collapseComponent}
                          </div>
                        </td>
                      </tr>
                    )}

                    {rowIndex === lokasiIsOpen && (
                      <ModalLokasi
                        isOpen={isShowLokasi}
                        setIsOpen={setIsShowLokasi}
                        row={row}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
