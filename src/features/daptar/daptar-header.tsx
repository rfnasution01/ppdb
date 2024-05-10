export function DaptarHeader({ showJenjang }: { showJenjang: string }) {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <p className="text-[3.6rem]">Pendaftaran Reguler</p>
      <div className="flex items-center gap-64 phones:flex-col phones:gap-32">
        <p className="font-nunito">
          Berikut informasi mengenai pendaftaran PPDB {showJenjang} Reguler di
          Dinas Pendidikan Pemuda dan Olahraga Kab. Deli Serdang Periode 2024 /
          2025.
        </p>
        <button
          type="button"
          className="rounded-lg bg-primary-background px-24 py-12 text-white hover:bg-primary-700 phones:w-full"
        >
          <p className="text-nowrap">Pilih Loket Sekolah</p>
        </button>
      </div>
    </div>
  )
}
