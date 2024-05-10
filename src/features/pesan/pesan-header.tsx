import { Pencil } from 'lucide-react'

export function PesanHeader({ showJenjang }: { showJenjang: string }) {
  return (
    <div className="flex flex-col gap-24  rounded-lg border bg-white p-32 shadow-md">
      <p className="text-[3.6rem]">Pesan Anda mengenai PPDB {showJenjang}</p>
      <div className="flex items-center gap-64 phones:flex-col phones:gap-32">
        <ol className="ml-24 list-disc font-nunito">
          {[
            `Menu Pesan Anda ini adalah media interaksi online antara pengguna dengan penyelenggara/pengelola layanan PPDB ${showJenjang}} di Kab. Deli Serdang.`,
            `Kirimkan pesan-pesan Anda baik berupa saran, kritik ataupun pertanyaan seputar PPDB ${showJenjang} di Kab. Deli Serdang.`,
          ].map((item, idx) => (
            <li className="" key={idx}>
              {item}
            </li>
          ))}
        </ol>
        <button
          type="button"
          className="flex items-center justify-center gap-12 rounded-lg bg-primary-background px-24 py-12 text-white hover:bg-primary-700 phones:w-full"
        >
          <Pencil size={16} />
          <p className="text-nowrap">Buat Pesan</p>
        </button>
      </div>
    </div>
  )
}
