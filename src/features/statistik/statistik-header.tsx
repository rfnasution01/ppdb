import { NoData } from '@/components/atoms/NoData'
import { JudulSkeleton } from '@/components/molecules/skeleton'
import { capitalizeFirstLetterFromLowercase } from '@/libs/helpers/format-text'
import { StatistikType } from '@/libs/types'

export function StatistikHeader({
  showJenjang,
  getStatistik,
  isLoading,
}: {
  showJenjang: string
  getStatistik: StatistikType
  isLoading: boolean
}) {
  console.log({ showJenjang })

  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      {isLoading ? (
        <JudulSkeleton />
      ) : getStatistik ? (
        <>
          <p className="text-[3.6rem]">
            {capitalizeFirstLetterFromLowercase(getStatistik?.judul)}
          </p>
          <p className="font-nunito">{getStatistik?.deskripsi}</p>
        </>
      ) : (
        <NoData />
      )}
    </div>
  )
}
