import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/Dialog'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Search, X } from 'lucide-react'
import { LokasiType } from '@/libs/types'
import { useGetLokasiQuery } from '@/store/slices/lokasiAPI'
import { MultiSkeleton } from '@/components/molecules/skeleton'
import { debounce } from 'lodash'
import { Pagination } from '@/components/atoms/Pagination'
import clsx from 'clsx'
import { PilihSekolahType } from '@/pages/daptar'
import { NoData } from '@/components/atoms/NoData'

export function ModalDaptar({
  isOpen,
  setIsOpen,
  jenjang,
  kode,
  pilihSekolah,
  setPilihSekolah,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  jenjang: string
  kode: string
  pilihSekolah: PilihSekolahType
  setPilihSekolah: Dispatch<SetStateAction<PilihSekolahType>>
}) {
  // --- Sekolah ---
  const [sekolah, setSekolah] = useState<LokasiType>()
  const {
    data: getSekolah,
    isLoading: isLoadingSekolah,
    isFetching: isFetchingSekolah,
  } = useGetLokasiQuery({ jenjang: jenjang, jalur: kode })

  const isLoading = isFetchingSekolah || isLoadingSekolah

  useEffect(() => {
    if (getSekolah?.data) {
      setSekolah(getSekolah?.data)
    }
  }, [getSekolah?.data, jenjang, kode])

  const dataPerPage = 9
  const [numberStart, setNumberStart] = useState<number>(0)
  const [search, setSearch] = useState<string>('')

  // --- Filter ---
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNumberStart(0)
    handleSearch(value)
  }

  const handleSearch = debounce((searchValue: string) => {
    setSearch(searchValue)
  }, 300)

  const filterData = (search: string) => {
    return sekolah?.isi.filter((item) => {
      return (
        item.nama_sekolah.toLowerCase().includes(search.toLowerCase()) ||
        item.alamat.toLowerCase().includes(search.toLowerCase()) ||
        item.telepon.toLowerCase().includes(search.toLowerCase())
      )
    })
  }

  const filteredData = filterData(search)

  const maxPage = Math.ceil(filteredData?.length / dataPerPage)
  const pageNow = Math.ceil(numberStart / dataPerPage)

  const handlePilihSekolah = (
    id: string,
    name: string,
    status: string,
    npsn: string,
  ) => {
    setPilihSekolah({ id, name, status, npsn })
    setIsOpen(false)
  }

  const handleClick = () => {
    const inputElement = document.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement
    handleSearch(inputElement.value)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        style={{
          width: '80%',
          height: '80%',
        }}
        position="middle"
      >
        <div className="scrollbar flex h-full flex-col gap-32 overflow-auto">
          {/* --- HEader --- */}
          <DialogHeader className="p-32">
            <DialogTitle>
              <p className="text-center text-[2.8rem]">Pilih Sekolah</p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          {/* --- Search --- */}
          <div className="bg-background px-[20rem] py-32 phones:p-32">
            <div className="flex w-full">
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 p-24 text-[2rem] focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 phones:w-full"
                placeholder="Search"
                onChange={(e) => onSearch(e)}
              />
              <button
                className="bg-success p-16 text-white"
                type="button"
                style={{
                  borderTopRightRadius: '1rem',
                  borderBottomRightRadius: '1rem',
                }}
                onClick={() => handleClick()}
              >
                <Search size={20} />
              </button>
            </div>
          </div>
          {/* --- Data --- */}
          <div className="scrollbar grid h-full flex-1 grid-cols-12 gap-32 overflow-auto p-32">
            {isLoading ? (
              <div className="col-span-4 flex flex-col gap-12 rounded-2xl p-24 shadow-md hover:cursor-pointer hover:shadow-lg phones:col-span-12">
                <MultiSkeleton />
              </div>
            ) : filteredData?.length === 0 ? (
              <div className="col-span-4 phones:col-span-12">
                <NoData />
              </div>
            ) : (
              <>
                {filteredData
                  ?.slice(numberStart, numberStart + dataPerPage)
                  ?.map((item, idx) => (
                    <div
                      onClick={() => {
                        handlePilihSekolah(
                          item?.id,
                          item?.nama_sekolah,
                          item?.status,
                          item?.npsn,
                        )
                      }}
                      className={clsx(
                        'col-span-4 flex items-center gap-24 hover:cursor-pointer hover:text-primary-900 phones:col-span-12',
                        {
                          'text-primary':
                            pilihSekolah?.name === item?.nama_sekolah,
                        },
                      )}
                      key={idx}
                    >
                      <div className="rounded-2xl border border-slate-300 p-12">
                        <img
                          src="/img/tutwuri.png"
                          alt="Tutwuri"
                          className="w-[4.4rem]"
                        />
                      </div>
                      <div className="flex flex-col gap-8">
                        <p className="text-[2rem] font-bold">
                          {item?.nama_sekolah}
                        </p>
                        <p>
                          {item?.status} - {item?.npsn}
                        </p>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
          {/* --- Footer --- */}
          <div className="flex items-center justify-end gap-32 bg-background p-8 text-[2rem]">
            {/* --- Pagination --- */}
            {sekolah?.isi?.length > 0 && (
              <Pagination
                numberStart={numberStart}
                dataPerPage={dataPerPage}
                pageNow={pageNow}
                maxPage={maxPage}
                setNumberStart={setNumberStart}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
