export function StatistikHeader({ showJenjang }: { showJenjang: string }) {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <p className="text-[3.6rem]">Statistik Reguler</p>
      <p className="font-nunito">
        Halaman ini berisi statistik PPDB {showJenjang} reg di Kab. Batu Bara
        Periode 2024 / 2025.
      </p>
    </div>
  )
}
