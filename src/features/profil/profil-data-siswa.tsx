import { ProfilData } from '@/libs/types/pendaftaran-type'
import { ProfilAlamat } from './profil-alamat'
import { ProfilSekolah } from './profil-sekolah'
import Cookies from 'js-cookie'

export function ProfilDataSiswa({
  profil,
  isLoading,
}: {
  profil: ProfilData
  isLoading: boolean
}) {
  const jenjang = Cookies.get('jenjang')
  return (
    <div
      className="scrollbar h-full flex-1 overflow-auto phones:h-full phones:overflow-visible"
      style={{ borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem' }}
    >
      <div
        className="flex h-full flex-col bg-white phones:h-full"
        style={{
          borderTopRightRadius: '1rem',
          borderBottomRightRadius: '1rem',
        }}
      >
        <p className="p-32 font-roboto text-[2.8rem] font-bold uppercase phones:text-[3.2rem]">
          {profil?.biodata?.nama ?? '-'}
        </p>
        <hr className="border" />
        <div className="flex flex-col gap-32 p-32">
          <ProfilAlamat profil={profil} isLoading={isLoading} />
          {jenjang.toLowerCase() === 'smp' && (
            <ProfilSekolah profil={profil} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  )
}
