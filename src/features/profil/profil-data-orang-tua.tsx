import { ProfilData } from '@/libs/types/pendaftaran-type'
import { User2 } from 'lucide-react'
import { DataComponent } from './data-component'
import { MultiSkeleton } from '@/components/molecules/skeleton'

export function ProfilOrangTua({
  profil,
  isLoading,
}: {
  profil: ProfilData
  isLoading?: boolean
}) {
  return (
    <div className="flex items-start gap-16">
      <User2 size={18} />
      <div className="flex w-full flex-col gap-12">
        <p className="font-bold">Orang Tua</p>
        {isLoading ? (
          <MultiSkeleton />
        ) : (
          <div className="flex gap-32 phones:flex-col">
            {/* --- Ayah --- */}
            <div className="flex flex-1 flex-col gap-12 rounded-lg border p-12">
              <p className="font-bold">Ayah</p>
              <DataComponent
                label="Nama"
                value={profil?.orangtua?.ayah?.nama ?? '-'}
              />
              <DataComponent
                label="NIK"
                value={profil?.orangtua?.ayah?.nik ?? '-'}
              />
              <DataComponent
                label="Status"
                value={profil?.orangtua?.ayah?.status ?? '-'}
              />
              <DataComponent
                label="Hp"
                value={profil?.orangtua?.ayah?.hp ?? '-'}
              />
              <DataComponent
                label="Pekerjaan"
                value={profil?.orangtua?.ayah?.pekerjaan ?? '-'}
              />
              <DataComponent
                label="Pendidikan"
                value={profil?.orangtua?.ayah?.pendidikan ?? '-'}
              />
            </div>
            {/* --- Ibu --- */}
            <div className="flex flex-1 flex-col gap-12 rounded-lg border p-12">
              <p className="font-bold">Ibu</p>
              <DataComponent
                label="Nama"
                value={profil?.orangtua?.ibu?.nama ?? '-'}
              />
              <DataComponent
                label="NIK"
                value={profil?.orangtua?.ibu?.nik ?? '-'}
              />
              <DataComponent
                label="Status"
                value={profil?.orangtua?.ibu?.status ?? '-'}
              />
              <DataComponent
                label="Hp"
                value={profil?.orangtua?.ibu?.hp ?? '-'}
              />
              <DataComponent
                label="Pekerjaan"
                value={profil?.orangtua?.ibu?.pekerjaan ?? '-'}
              />
              <DataComponent
                label="Pendidikan"
                value={profil?.orangtua?.ibu?.pendidikan ?? '-'}
              />
            </div>
            {/* --- Wali --- */}
            <div className="flex flex-1 flex-col gap-12 rounded-lg border p-12">
              <p className="font-bold">Wali</p>
              <DataComponent
                label="Nama"
                value={profil?.orangtua?.wali?.nama ?? '-'}
              />
              <DataComponent
                label="NIK"
                value={profil?.orangtua?.wali?.nik ?? '-'}
              />

              <DataComponent
                label="Hp"
                value={profil?.orangtua?.wali?.hp ?? '-'}
              />
              <DataComponent
                label="Pekerjaan"
                value={profil?.orangtua?.wali?.pekerjaan ?? '-'}
              />
              <DataComponent
                label="Pendidikan"
                value={profil?.orangtua?.wali?.pendidikan ?? '-'}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
