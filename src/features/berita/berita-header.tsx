export function BeritaHeader({ showJenjang }: { showJenjang: string }) {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <p className="text-[3.6rem]">Info dan Berita PPDB {showJenjang}</p>
      <p className="font-nunito">
        Halaman ini berisi semua berita dan pengumuman terbaru seputar PPDB SMA
        di Kab. Batu Bara. Sebaiknya Anda selalu berkunjung ke halaman ini untuk
        mendapatkan informasi terbaru dari kami.
      </p>
    </div>
  )
}
