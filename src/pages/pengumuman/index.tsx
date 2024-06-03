import { PengumumanHasil } from './pengumuman-hasil'
import { PengumumanRegistrasiUlang } from './registrasi-ulang'

export default function Pengumuman() {
  const status = 0
  return (
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex items-center justify-between gap-32">
        <p className="text-[3.2rem] font-bold phones:text-[3.6rem]">
          Pengumuman
        </p>
      </div>
      <PengumumanHasil status={status} />
      {status > 0 && <PengumumanRegistrasiUlang />}
    </div>
  )
}
