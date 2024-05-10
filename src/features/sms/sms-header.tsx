export function SMSHeader({ showJenjang }: { showJenjang: string }) {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <p className="text-[3.6rem]">Informasi SMS</p>
      <p className="font-nunito">
        Halaman ini berisi petunjuk Penggunaan SMS Untuk Akses Info PPDB{' '}
        {showJenjang} di Kab. Deli Serdang
      </p>
    </div>
  )
}
