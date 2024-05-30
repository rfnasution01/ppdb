import { getInitials } from '@/libs/helpers/format-text'
import { DashboardType } from '@/libs/types/dashboard-type'
import { Link } from 'react-router-dom'

export function Profil({ item }: { item: DashboardType }) {
  return (
    <div className="flex gap-32 border-b border-border pb-32">
      <div className="h-[20rem] w-[20rem]">
        {item?.biodata?.pasfoto ? (
          <img
            src={item?.biodata?.pasfoto}
            alt="photo"
            className="h-full w-full rounded-full"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-rose-300 text-[10rem] text-rose-700">
            {getInitials(item?.biodata?.nama)}
          </div>
        )}
      </div>
      <div className="flex w-full flex-col gap-16">
        <p className="text-[4rem] font-bold">{item?.biodata?.nama}</p>
        <p className="text-[2.8rem] text-slate-500">
          NIK: {item?.biodata?.nik}
        </p>
        <div className="flex">
          <p className="rounded-full bg-blue-300 px-24 py-12 text-[2rem] text-blue-800">
            Jalur {item?.biodata?.jalur}
          </p>
        </div>
        <div className="flex justify-end hover:text-primary">
          <Link to="/main/profil/biodata" className="">
            Lihat biodata lengkap
          </Link>
        </div>
      </div>
    </div>
  )
}
