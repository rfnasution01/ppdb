import { ProfilData } from '@/libs/types/pendaftaran-type'
import { TiketDetailType } from '@/libs/types/tiket-type'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { Download } from 'lucide-react'
import { Link } from 'react-router-dom'

export function DetailTiketData({
  profil,
  detail,
}: {
  profil: ProfilData
  detail: TiketDetailType
}) {
  return (
    <div className="flex w-full flex-col gap-32">
      <div className="flex flex-col items-start justify-start gap-12">
        <p className="text-[3rem]">{profil?.biodata?.nama ?? '-'}</p>
        <p className="text-[2rem]">
          {dayjs(detail?.ticket?.tanggal)
            .locale('id')
            .format('DD MMMM YYYY HH:mm')}
        </p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: detail?.ticket?.keterangan }} />
      <div className="flex flex-col gap-12">
        <p>{detail?.ticket?.lampiran?.length} Attachments</p>
        {detail?.ticket?.lampiran?.length > 0 && (
          <div className="grid grid-cols-12 gap-32">
            {detail?.ticket?.lampiran?.map((item, idx) => (
              <div className="col-span-3 phones:col-span-12" key={idx}>
                <Link
                  to={item?.dokumen}
                  target="_blank"
                  className="flex gap-24 rounded-2xl border border-[#73C2FF] bg-[#f5faff] p-12 shadow hover:cursor-pointer hover:shadow-md"
                >
                  <img
                    src={item?.dokumen}
                    alt={item?.id}
                    className="h-[6rem] w-[5rem]"
                  />
                  <div className="flex-1">image-{idx + 1}.jpg</div>
                  <div className="flex items-center justify-center text-primary">
                    <Download size={24} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
