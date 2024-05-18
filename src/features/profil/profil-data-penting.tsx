import { ProfilData } from '@/libs/types/pendaftaran-type'
import { DataComponent } from './data-component'
import dayjs from 'dayjs'
import { capitalizeFirstLetterFromLowercase } from '@/libs/helpers/format-text'
import { MultiSkeleton, SingleSkeleton } from '@/components/molecules/skeleton'

export function ProfilDataPenting({
  profil,
  isLoading,
}: {
  profil: ProfilData
  isLoading: boolean
}) {
  const pasPhoto = profil?.dokumen?.data?.find(
    (item) => item?.nama === 'Pas Photo',
  )?.dok_siswa

  return (
    <div
      className="scrollbar h-full overflow-auto phones:h-full phones:overflow-visible"
      style={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
    >
      <div
        className="flex flex-col gap-48 bg-danger-tint-1 bg-opacity-20 p-32 phones:h-full"
        style={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
      >
        {isLoading ? (
          <>
            <SingleSkeleton height="h-[28rem] w-[28rem]" />
            <MultiSkeleton />
          </>
        ) : (
          <>
            {/* --- Image --- */}
            <div className="flex items-center justify-center">
              <img
                src={pasPhoto ?? '/img/smp.png'}
                alt="PPDB"
                className="h-[28rem] w-[28rem] rounded-full shadow-md"
              />
            </div>
            {/* --- Data Penting --- */}
            <div className="flex flex-col gap-16">
              <DataComponent label="NIK" value={profil?.biodata?.nik ?? '-'} />
              <hr className="border" />
              <DataComponent
                label="Tanggal Lahir"
                value={
                  dayjs(profil?.biodata?.tanggal_lahir)
                    .locale('id')
                    .format('DD MMMM YYYY') ?? '-'
                }
              />
              <hr className="border" />
              <DataComponent
                label="Tempat Lahir"
                value={
                  capitalizeFirstLetterFromLowercase(
                    profil?.biodata?.tempat_lahir,
                  ) ?? '-'
                }
              />
              <hr className="border" />
              <DataComponent
                label="Jenis Kelamin"
                value={
                  profil?.biodata?.jenis_kelamin.toUpperCase() === 'L'
                    ? 'Laki-laki'
                    : profil?.biodata?.jenis_kelamin.toUpperCase() === 'P'
                      ? 'Perempuan'
                      : '-'
                }
              />
              <hr className="border" />
              <DataComponent
                label="Agama"
                value={profil?.biodata?.agama ?? '-'}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
