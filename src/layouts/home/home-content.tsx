import { CalendarDays, Pencil } from 'lucide-react'
import { IconComponent } from './IconComponent'

export function HomeContent() {
  return (
    <div className="grid grid-cols-12 gap-32">
      {/* --- SD --- */}
      <div
        className="col-span-4 bg-white phones:col-span-12"
        style={{
          borderBottomLeftRadius: '1rem',
          borderBottomRightRadius: '1rem',
        }}
      >
        <div className="flex flex-col">
          {/* --- Header --- */}
          <div className={`relative col-span-6 block`}>
            <img
              src="/img/bg-smp.png"
              alt="login"
              className="h-[16vh] w-full object-cover filter phones:h-[14vh]"
              style={{
                filter: 'hue-rotate(160deg)',
                borderTopLeftRadius: '1rem',
                borderTopRightRadius: '1rem',
              }}
            />
            <div className="absolute top-0 flex h-full w-full p-32">
              <div className="flex h-full w-full flex-col gap-8 text-white">
                {/* --- Navigation -- */}
                <p>PPDB Online Jenjang</p>
                <p className="text-[3.6rem]">Sekolah Dasar (SD)</p>
              </div>
            </div>
          </div>
          {/* --- Content --- */}
          <div className="flex flex-col gap-16 border-b border-l border-r p-32">
            <IconComponent
              title="Lihat Jadwal"
              icon={<CalendarDays size={16} />}
            />
            <IconComponent title="Data Pendaftar" icon={<Pencil size={16} />} />
          </div>
        </div>
      </div>
      {/* --- SMP --- */}
      <div
        className="col-span-4 bg-white phones:col-span-12"
        style={{
          borderBottomLeftRadius: '1rem',
          borderBottomRightRadius: '1rem',
        }}
      >
        <div className="flex flex-col">
          {/* --- Header --- */}
          <div className={`relative col-span-6 block`}>
            <img
              src="/img/bg-smp.png"
              alt="login"
              className="h-[16vh] w-full object-cover filter phones:h-[14vh]"
              style={{
                borderTopLeftRadius: '1rem',
                borderTopRightRadius: '1rem',
              }}
            />
            <div className="absolute top-0 flex h-full w-full p-32">
              <div className="flex h-full w-full flex-col gap-8 text-white">
                {/* --- Navigation -- */}
                <p>PPDB Online Jenjang</p>
                <p className="text-[3.6rem]">Sekolah Menegah Pertama (SMP)</p>
              </div>
            </div>
          </div>
          {/* --- Content --- */}
          <div className="flex flex-col gap-16 border-b border-l border-r p-32">
            <IconComponent
              title="Lihat Jadwal"
              icon={<CalendarDays size={16} />}
            />
            <IconComponent title="Data Pendaftar" icon={<Pencil size={16} />} />
          </div>
        </div>
      </div>
    </div>
  )
}
