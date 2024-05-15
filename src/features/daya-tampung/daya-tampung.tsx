import { NoData } from '@/components/atoms/NoData'
import { JudulSkeleton } from '@/components/molecules/skeleton'
import { capitalizeFirstLetterFromLowercase } from '@/libs/helpers/format-text'
import { DayaTampungType } from '@/libs/types'

export function DayaTampungHeader({
  getDayaTampung,
  isLoading,
}: {
  getDayaTampung: DayaTampungType
  isLoading: boolean
}) {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      {isLoading ? (
        <JudulSkeleton />
      ) : getDayaTampung ? (
        <>
          <p className="text-[3.6rem]">
            {capitalizeFirstLetterFromLowercase(getDayaTampung?.judul)}
          </p>
          <p className="font-nunito">{getDayaTampung?.deskripsi}</p>
        </>
      ) : (
        <NoData />
      )}
    </div>
  )
}
