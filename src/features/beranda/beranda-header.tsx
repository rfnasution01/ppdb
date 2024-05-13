import { NoData } from '@/components/atoms/NoData'
import { SingleSkeleton } from '@/components/molecules/skeleton'
import { SekilasType } from '@/libs/types'

export function BerandaHeader({
  showJenjang,
  getSekilas,
  isLoading,
  kode,
}: {
  showJenjang: string
  getSekilas: SekilasType
  isLoading: boolean
  kode: string
}) {
  return (
    <div className="flex flex-col gap-24 rounded-2xl border bg-white p-32 shadow-md">
      {isLoading ? (
        <>
          <SingleSkeleton width="w-1/4" />
          <SingleSkeleton height="h-[3rem]" width="w-4/6" />
        </>
      ) : getSekilas ? (
        <>
          <p className="text-[3.6rem]">
            PPDB {showJenjang} {kode ?? 'Reguler'}
          </p>
          <div dangerouslySetInnerHTML={{ __html: getSekilas?.deskripsi }} />
        </>
      ) : (
        <NoData />
      )}
    </div>
  )
}
