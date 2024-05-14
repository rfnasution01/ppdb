import { NoData } from '@/components/atoms/NoData'
import { JudulSkeleton } from '@/components/molecules/skeleton'
import { capitalizeFirstLetterFromLowercase } from '@/libs/helpers/format-text'
import { JadwalType } from '@/libs/types'

export function JadwalHeader({
  getJadwal,
  isLoading,
}: {
  getJadwal: JadwalType
  isLoading: boolean
}) {
  return (
    <div className="flex flex-col gap-24 rounded-2xl border bg-white p-32 shadow-md">
      {isLoading ? (
        <JudulSkeleton />
      ) : getJadwal ? (
        <>
          <p className="text-[3.6rem]">
            {capitalizeFirstLetterFromLowercase(getJadwal?.judul)}
          </p>
          <p className="font-nunito">{getJadwal?.deskripsi}</p>
        </>
      ) : (
        <NoData />
      )}
    </div>
  )
}
