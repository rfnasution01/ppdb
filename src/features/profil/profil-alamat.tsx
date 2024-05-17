import { capitalizeFirstLetterFromLowercase } from '@/libs/helpers/format-text'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import { DataComponent } from './data-component'
import { MapPin } from 'lucide-react'
import { MultiSkeleton, SingleSkeleton } from '@/components/molecules/skeleton'

export function ProfilAlamat({
  profil,
  isLoading,
}: {
  profil: ProfilData
  isLoading?: boolean
}) {
  return (
    <div className="flex items-start gap-16">
      <MapPin size={18} />
      <div className="flex w-full flex-col gap-12">
        <p className="font-bold">Alamat</p>
        {isLoading ? (
          <SingleSkeleton width="w-1/6" />
        ) : (
          <p className="text-[2rem] phones:text-[2.4rem]">
            {capitalizeFirstLetterFromLowercase(
              profil?.biodata?.alamat_lengkap,
            ) ?? '-'}
          </p>
        )}

        {isLoading ? (
          <MultiSkeleton />
        ) : (
          <div className="flex gap-16 phones:flex-col">
            {/* --- Provinsi --- */}
            <div className="w-1/5 rounded-2xl border p-12 phones:w-full">
              <DataComponent
                value={
                  capitalizeFirstLetterFromLowercase(
                    profil?.biodata?.provinsi,
                  ) ?? '-'
                }
                label="Provinsi"
              />
            </div>
            {/* --- Kabupaten --- */}
            <div className="w-1/5 rounded-2xl border p-12 phones:w-full">
              <DataComponent
                value={
                  capitalizeFirstLetterFromLowercase(
                    profil?.biodata?.kabupaten,
                  ) ?? '-'
                }
                label="Kabupaten"
              />
            </div>
            {/* --- Kecamatan --- */}
            <div className="w-1/5 rounded-2xl border p-12 phones:w-full">
              <DataComponent
                value={
                  capitalizeFirstLetterFromLowercase(
                    profil?.biodata?.kecamatan,
                  ) ?? '-'
                }
                label="Kecamatan"
              />
            </div>
            {/* --- Desa --- */}
            <div className="w-1/5 rounded-2xl border p-12 phones:w-full">
              <DataComponent
                value={
                  capitalizeFirstLetterFromLowercase(profil?.biodata?.desa) ??
                  '-'
                }
                label="Desa"
              />
            </div>
            {/* --- Dusun --- */}
            <div className="w-1/5 rounded-2xl border p-12 phones:w-full">
              <DataComponent
                value={
                  capitalizeFirstLetterFromLowercase(profil?.biodata?.dusun) ??
                  '-'
                }
                label="Dusun"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
