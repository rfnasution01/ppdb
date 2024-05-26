import { MultiSkeleton } from '@/components/molecules/skeleton'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import { School } from 'lucide-react'

export function ProfilPilihan({
  profil,
  isLoading,
  jenjang,
}: {
  profil: ProfilData
  isLoading?: boolean
  jenjang?: string
}) {
  return (
    <div className="flex items-start gap-16">
      <School size={18} />
      <div className="flex w-full flex-col gap-12">
        <p className="font-bold">Pilihan</p>
        {isLoading ? (
          <MultiSkeleton />
        ) : (
          <div className="flex gap-24 text-[2rem] phones:flex-col phones:text-[2.4rem]">
            <div className="flex flex-1 flex-col gap-12">
              <p className="font-bold">Pilihan 1</p>
              <div className="flex flex-col gap-12 rounded-lg border p-12">
                <p>{profil?.pilihan?.pilihan1?.nama_sekolah ?? '-'}</p>
                <p className="font-bold text-primary">
                  Skor: {profil?.pilihan?.pilihan1?.skor ?? '-'}
                </p>
              </div>
            </div>
            {jenjang.toLowerCase() === 'smp' && (
              <div className="flex flex-1 flex-col gap-12">
                <p className="font-bold">Pilihan 2</p>
                <div className="flex flex-col gap-12 rounded-lg border p-12">
                  <p>{profil?.pilihan?.pilihan2?.nama_sekolah ?? '-'}</p>
                  <p className="font-bold text-primary">
                    Skor: {profil?.pilihan?.pilihan2.skor ?? '-'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
