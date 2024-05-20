export function NoData({ title }: { title?: string }) {
  return (
    <div className="flex flex-col gap-y-16 border-l-4 p-24">
      <p className="font-mono">{title ?? 'Tidak ada data ditemukan.'}</p>
      <p className="text-[2.2rem] text-orange-500">-- Admin PPDB</p>
    </div>
  )
}
