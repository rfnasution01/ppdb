import { NoData } from '@/components/atoms/NoData'
import { JudulSkeleton } from '@/components/molecules/skeleton'
import { capitalizeFirstLetterFromLowercase } from '@/libs/helpers/format-text'
import { LokasiType } from '@/libs/types'

export function LokasiHeader({
  getLokasi,
  isLoading,
}: {
  getLokasi: LokasiType
  isLoading: boolean
}) {
  return (
    <div className="flex flex-col gap-24 rounded-2xl border bg-white p-32 shadow-md">
      {isLoading ? (
        <JudulSkeleton />
      ) : getLokasi ? (
        <>
          <p className="text-[3.6rem]">
            {capitalizeFirstLetterFromLowercase(getLokasi?.judul)}
          </p>
          <p className="font-nunito">{getLokasi?.deskripsi}</p>
        </>
      ) : (
        <NoData />
      )}
    </div>
  )
}
