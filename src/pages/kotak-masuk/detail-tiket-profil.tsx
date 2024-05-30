import { getInitials } from '@/libs/helpers/format-text'
import { ProfilData } from '@/libs/types/pendaftaran-type'

export function DetailTiketProfil({
  pasPhoto,
  profil,
}: {
  pasPhoto: string
  profil: ProfilData
}) {
  return (
    <div className="flex">
      <div>
        {pasPhoto ? (
          <img
            src={pasPhoto}
            alt="Profil"
            className="h-[7rem] w-[7rem] rounded-full phones:h-[8rem] phones:w-[8rem]"
          />
        ) : (
          <div className="flex h-[7rem] w-[7rem] items-center justify-center rounded-full bg-rose-300 text-[4rem] text-rose-700 phones:p-24 phones:text-[2.4rem]">
            {getInitials(profil?.biodata?.nama)}
          </div>
        )}
      </div>
    </div>
  )
}
