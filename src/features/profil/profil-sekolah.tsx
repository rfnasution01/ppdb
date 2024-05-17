import { MultiSkeleton } from '@/components/molecules/skeleton'
import { capitalizeFirstLetterFromLowercase } from '@/libs/helpers/format-text'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import { School } from 'lucide-react'

export function ProfilSekolah({
  profil,
  isLoading,
}: {
  profil: ProfilData
  isLoading?: boolean
}) {
  return (
    <div className="flex items-start gap-16">
      <School size={18} />
      <div className="flex w-full flex-col gap-12">
        <p className="font-bold">Sekolah</p>
        {isLoading ? (
          <MultiSkeleton />
        ) : (
          <div className="flex w-1/3 flex-col gap-12 border p-12 phones:w-full">
            <p className="text-[2rem] font-bold phones:text-[2.4rem]">
              {capitalizeFirstLetterFromLowercase(
                profil?.sekolah?.nama_sekolah,
              ) ?? '-'}
            </p>
            <p className="text-[2rem] phones:text-[2.4rem]">
              {profil?.sekolah?.npsn ?? '-'}
            </p>
            <p className="text-[2rem] phones:text-[2.4rem]">
              {profil?.sekolah?.tahun_lulus ?? '-'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
