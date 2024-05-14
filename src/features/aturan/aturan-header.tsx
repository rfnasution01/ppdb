import { NoData } from '@/components/atoms/NoData'
import { JudulSkeleton } from '@/components/molecules/skeleton'
import { capitalizeFirstLetterFromLowercase } from '@/libs/helpers/format-text'
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
        <JudulSkeleton />
      ) : getAturan ? (
        <>
          <p className="text-[3.6rem]">
            {capitalizeFirstLetterFromLowercase(getAturan?.judul)}
          </p>
          <p className="font-nunito">{getAturan?.deskripsi}</p>
        </>
      ) : (
        <NoData />
      )}
    </div>
  )
}
