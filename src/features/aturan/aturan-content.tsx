import { useState } from 'react'

export function AturanContent() {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [id, setId] = useState<number>(0)

  return (
    <div className="flex flex-col gap-12 rounded-lg border bg-white p-32 shadow-md">
      {[
        'Ketentuan Umum',
        'Persyaratan Peserta',
        'Tata Cara Pelaksanaan',
        'Jadwal Pelaksanaan',
        'Tempat Pelaksanaan',
        'Pemilihan Sekolah Tujuan',
        'Dasar dan Cara Seleksi',
        'Pengumuman dan Daptar Ulang',
      ].map((item, idx) => (
        <div className="" key={idx}>
          <p
            onClick={() => {
              setIsShow(true)
              setId(idx)
            }}
            className="rounded-lg border bg-background px-32 py-16 hover:cursor-pointer hover:bg-slate-200"
          >
            {idx + 1}. {item}
          </p>
          {isShow && idx === id && (
            <p className="border-b border-l border-r px-32 py-16 text-[2rem] duration-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi
              velit aperiam, quasi, laboriosam itaque quod deserunt tempore
              incidunt, atque aliquid dolor voluptatem laborum impedit ipsum et
              voluptates provident placeat facere.
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
