import { GraduationCap } from 'lucide-react'
import { IconComponent } from './IconComponent'
import { useEffect, useState } from 'react'
import { JalurMasukType } from '@/libs/types'
import { useGetJalurMasukQuery } from '@/store/slices/jalurAPI'
import { MultiSkeleton } from '@/components/molecules/skeleton'
import { NoData } from '@/components/atoms/NoData'
import { setStateJenjang } from '@/store/reducer/stateJenjang'
import { useDispatch } from 'react-redux'

export function JalurMasukMapping({ jenjang }: { jenjang: 'sd' | 'smp' }) {
  const [jalurMasuk, setJalurMasuk] = useState<JalurMasukType[]>([])
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

  const dispatch = useDispatch()

  return (
    <div
      className="w-1/3 bg-white phones:w-full"
      style={{
        borderBottomLeftRadius: '1rem',
        borderBottomRightRadius: '1rem',
      }}
    >
      <div className="flex flex-col">
        {/* --- Header --- */}
        <div className={`relative`}>
          <img
            src="/img/bg-smp.png"
            alt="login"
            className="h-[16vh] w-full phones:h-[14vh]"
            style={{
              filter: jenjang === 'sd' ? 'hue-rotate(160deg)' : 'none',
              borderTopLeftRadius: '1rem',
              borderTopRightRadius: '1rem',
            }}
          />
          <div className="absolute top-0 flex h-full w-full p-32">
            <div className="flex h-full w-full flex-col gap-8 text-white">
              {/* --- Navigation -- */}
              <p>PPDB Online Jenjang</p>
              <p className="text-[3.6rem]">
                {jenjang === 'sd'
                  ? 'Sekolah Dasar (SD)'
                  : 'Sekolah Menengah Pertama (SMP)'}
              </p>
            </div>
          </div>
        </div>
        {/* --- Content --- */}
        <div className="flex flex-col gap-16 border-b border-l border-r p-32">
          {isLoading ? (
            <MultiSkeleton />
          ) : jalurMasuk?.length === 0 ? (
            <NoData />
          ) : (
            <>
              {jalurMasuk?.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    dispatch(
                      setStateJenjang({ tingkatan: jenjang.toLowerCase() }),
                    )
                  }}
                >
                  <IconComponent
                    title={item?.nama}
                    icon={<GraduationCap size={16} />}
                    link={`/beranda?jenjang=${jenjang}&kode=${item?.kode.toLowerCase()}`}
                    informasi={item?.informasi}
                    isSD
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
