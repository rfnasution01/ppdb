export function NunHeader({ showJenjang }: { showJenjang: string }) {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <p className="text-[3.6rem]">Sebaran Nilai Ujian Nasional (NUN)</p>
      <p className="font-nunito">
        Info sebaran NUN PPDB {showJenjang} di Kab. Batu Bara tahun 2024.
      </p>
    </div>
  )
}
