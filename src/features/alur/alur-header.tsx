import { NoData } from '@/components/atoms/NoData'
import { JudulSkeleton } from '@/components/molecules/skeleton'
import { capitalizeFirstLetterFromLowercase } from '@/libs/helpers/format-text'
import { AlurType } from '@/libs/types'

export function AlurHeader({
  getAlur,
  isLoading,
}: {
  getAlur: AlurType
  isLoading: boolean
}) {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      {isLoading ? (
        <JudulSkeleton />
      ) : getAlur ? (
        <>
          <p className="text-[3.6rem]">
            {capitalizeFirstLetterFromLowercase(getAlur?.judul)}
          </p>
          <p className="font-nunito">{getAlur?.deskripsi}</p>
        </>
      ) : (
        <NoData />
      )}
    </div>
  )
}
