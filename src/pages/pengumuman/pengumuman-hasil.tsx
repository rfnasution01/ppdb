import { Printer } from 'lucide-react'

export function PengumumanHasil() {
  const lulus = 1

  return (
    <div
      className="flex flex-col shadow"
      style={{
        borderBottomLeftRadius: '1rem',
        borderBottomRightRadius: '1rem',
      }}
    >
      <div
        className="bg-[#242a30] p-32 text-white"
        style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
      >
        Pengumuman
      </div>
      {lulus === 1 ? (
        <div className="bg-white p-32">
          <div className="flex w-full items-center justify-center gap-32 rounded-2xl bg-emerald-300 p-32 text-emerald-700">
            <p>
              Selamat Anda{' '}
              <span className=" text-center font-bold uppercase">lulus</span> di
              UPT. SMP Negeri 1 AIR PUTIH
            </p>
            <div className="flex items-center gap-8 text-emerald-950">
              <Printer size={16} />
              Cetak Keterangan Lulus
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-32">
          <div className="flex w-full items-center justify-center gap-32 rounded-2xl bg-rose-300 p-32 text-rose-700">
            <p>
              Maaf anda dinyatakan{' '}
              <span className=" text-center font-bold uppercase">
                tidak lulus
              </span>{' '}
              di UPT. SMP Negeri 1 AIR PUTIH
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
