export function BerandaHeader({ showJenjang }: { showJenjang: string }) {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <p className="text-[3.6rem]">PPDB {showJenjang} Reguler</p>
      <p className="font-nunito">
        Berikut adalah sekilas informasi mengenai PPDB {showJenjang} Reguler di
        Kab. Deli Serdang Periode 2024 / 2025.
      </p>
    </div>
  )
}
