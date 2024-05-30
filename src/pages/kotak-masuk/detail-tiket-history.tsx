import { ProfilData } from '@/libs/types/pendaftaran-type'
import { TiketDetailType } from '@/libs/types/tiket-type'
import { DetailTiketProfil } from './detail-tiket-profil'
import TimeSinceUploaded from '@/libs/helpers/format-time'
import { Download } from 'lucide-react'
import { Link } from 'react-router-dom'

export function DetailHistory({
  detail,
  profil,
}: {
  detail: TiketDetailType
  profil: ProfilData
}) {
  return (
    <div className="flex flex-col gap-32">
      {detail?.chat?.map((item, idx) => (
        <div
          className={`flex w-3/5 gap-32 phones:w-full ${item?.jenis_chat === 'SISWA' ? 'flex-row' : 'flex-row-reverse'}`}
          key={idx}
        >
          <DetailTiketProfil pasPhoto={item?.photo} profil={profil} />
          <div className="flex flex-1 flex-col gap-8 rounded-2xl bg-white p-24">
            <p className="text-rose-700">
              {item?.jenis_chat === 'SISWA' ? 'Anda' : item?.user}
            </p>
            <p className="font-sf-pro">{item?.isi}</p>
            {detail?.ticket?.lampiran?.length > 0 && (
              <div className="grid grid-cols-12 gap-32">
                {item?.lampiran?.map((list, index) => (
                  <div className="col-span-4 phones:col-span-12" key={index}>
                    <Link
                      to={list?.dokumen}
                      target="_blank"
                      className="flex gap-24 rounded-2xl border border-[#73C2FF] bg-[#f5faff] p-12 shadow hover:cursor-pointer hover:shadow-md"
                    >
                      <img
                        src={list?.dokumen}
                        alt={list?.id}
                        className="h-[6rem] w-[5rem]"
                      />
                      <div className="flex-1 text-[2rem]">
                        image-{idx + 1}.jpg
                      </div>
                      <div className="flex items-center justify-center text-primary">
                        <Download size={24} />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end text-[2rem] italic">
              <TimeSinceUploaded uploadTime={item?.tanggal} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
