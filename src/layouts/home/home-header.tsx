export function HomeHeader() {
  return (
    <div className="flex flex-col gap-32 text-center">
      <p className="text-[4.8rem] font-medium phones:text-[3.2rem] phones:font-semibold">
        Selamat Datang di DEMO PPDB Dinas Pendidikan Pemuda dan Olahraga Kab.
        Deli Serdang
      </p>
      <p className="block phones:hidden" style={{ lineHeight: '130%' }}>
        Situs DEMO ini dipersiapkan sebagai pengganti pusat informasi dan
        pengolahan seleksi data siswa peserta PPDB Kab. Deli Serdang Periode
        2024 / 2025 secara online real time process untuk pelaksanaan PPDB
        Online. Lihat Peserta PPDB di Kab / Kota lainnya
      </p>
      <p className="hidden phones:block">Situs PPDB Periode 2024-2025</p>
    </div>
  )
}
