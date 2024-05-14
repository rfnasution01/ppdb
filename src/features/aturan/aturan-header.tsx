import { NoData } from '@/components/atoms/NoData'
import { SingleSkeleton } from '@/components/molecules/skeleton'
import { AturanType } from '@/libs/types'

export function AturanHeader({
  getAturan,
  isLoading,
}: {
  getAturan: AturanType
  isLoading: boolean
}) {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      {isLoading ? (
        <>
          <SingleSkeleton height="h-[3.2rem]" width="w-2/6" />
          <SingleSkeleton height="h-[2.4rem]" />
        </>
      ) : getAturan ? (
        <>
          <p className="text-[3.6rem]">{getAturan?.judul}</p>
          <p className="font-nunito">{getAturan?.deskripsi}</p>
        </>
      ) : (
        <NoData />
      )}
    </div>
  )
}
