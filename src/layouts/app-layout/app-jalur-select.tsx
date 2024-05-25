import Loading from '@/components/atoms/Loading'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/atoms/Menubar'
import { usePathname } from '@/libs/hooks/usePathname'
import { JalurMasukType } from '@/libs/types'
import { setStateJalur } from '@/store/reducer/stateJalur'
import { setStatePilihSekolah } from '@/store/reducer/statePilihSekolah'
import { useGetJalurMasukQuery } from '@/store/slices/jalurAPI'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function AppJalurSelect({
  jenjang,
  setKode,
  kode,
}: {
  jenjang: string
  setKode: Dispatch<SetStateAction<string>>
  kode: string
}) {
  const { firstPathname } = usePathname()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // --- Jalur ---

  const [jalurMasuk, setJalurMasuk] = useState<JalurMasukType[]>()
  const {
    data: getJalurMasuk,
    isLoading: isLoadingJalurMasuk,
    isFetching: isFetchingJalurmasuk,
  } = useGetJalurMasukQuery({ jenjang: jenjang })
  const isLoading = isFetchingJalurmasuk || isLoadingJalurMasuk

  useEffect(() => {
    if (getJalurMasuk?.data) {
      setJalurMasuk(getJalurMasuk?.data)
    }
  }, [getJalurMasuk?.data])

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger
          className={clsx('h-full rounded-2xl text-white', {
            'bg-primary': jenjang?.toLowerCase() === 'smp',
            'bg-danger-100': jenjang?.toLowerCase() === 'sd',
          })}
          variant="outlined"
        >
          <p
            className="border-r border-slate-100 p-24 text-[5rem] font-bold uppercase"
            style={{
              borderTopLeftRadius: '1rem',
              borderBottomLeftRadius: '1rem',
            }}
          >
            {kode}
          </p>
          <ChevronDown />
        </MenubarTrigger>
        <MenubarContent className="min-w-[30rem] bg-white py-16 shadow-md">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {jalurMasuk?.map((item, index) => (
                <MenubarItem
                  key={index}
                  onClick={() => {
                    if (item?.kode.toLowerCase() !== kode.toLowerCase()) {
                      dispatch(
                        setStateJalur({ kode: item?.kode?.toLowerCase() }),
                      )
                      setKode(item?.kode?.toLowerCase())
                      navigate(
                        `/${firstPathname}?jenjang=${jenjang.toLowerCase()}&kode=${item?.kode?.toLowerCase()}`,
                      )
                      dispatch(
                        setStatePilihSekolah({
                          id: null,
                          name: null,
                          status: null,
                          npsn: null,
                        }),
                      )
                    }
                  }}
                  className={clsx(
                    'px-24 py-8 text-[2.6rem] hover:bg-slate-200',
                    {
                      'hover:cursor-pointer':
                        item?.kode?.toLowerCase() !== kode.toLowerCase(),
                      'hover:cursor-not-allowed':
                        item?.kode?.toLowerCase() === kode.toLowerCase(),
                    },
                  )}
                >
                  {item?.nama}
                </MenubarItem>
              ))}
            </>
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
