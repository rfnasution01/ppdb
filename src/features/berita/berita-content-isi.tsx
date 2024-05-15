export function BeritaContentIsi() {
  return (
    <div className="flex flex-col gap-24" style={{ lineHeight: '130%' }}>
      <div className="flex flex-col gap-24">
        <p>Assalamu'alaikum Wr. Wb.</p>
        <p>Masyarakat Kabupaten Batu Bara yang berbahagia,</p>
        <p>
          Hari ini adalah hari pertama pelaksanaan PPDB Online Jalur Reguler
          untuk Jenjang SMP, SMA dan SMK..
        </p>
        <p>
          Untuk dapat melaksanakan Pendaftaran dan Seleksi pada jalur ini,
          beberapa langkah yang harus dilakukan adalah sbb :
        </p>
      </div>
      <div className="flex flex-col gap-24">
        {[
          'Memastikan persyaratan untuk mengikuti PPDB Online Kabupaten Batu Bara ini sudah dapat dipenuhi, baik berkasnya maupun non berkas.',
          'Melakukan Pengajuan Pendaftaran melalui Operator Sekolah yang dituju pada waktu yang telah ditentukan.',
          'Operator Sekolah memperoses Pengajuan Pendaftaran Calon Pendaftar',
          'Calon Pendaftar Menerima Surat Tanda Bukti Pendaftaran',
          'Calon Pendaftar Memantau Hasil Seleksi setiap saat di situs PPDB http://deliserdang.siap-ppdb.com atau melalui SMS.',
        ].map((item, idx) => (
          <li key={idx} className="border-l-4 px-32 py-24">
            {item}
          </li>
        ))}
      </div>
      <p>
        Semoga pelaksanaan PPDB Online ini membawa kebaikan bagi kita semua,
        khususnya Anda di Kabupaten Batu Bara. Kami mohon maaf apabila masih ada
        kekurangan dalam penyajian sistem PPDB Online di Kota Pematang Siantar
        ini. Semoga usaha kami dalam mempersembahkan yang terbaik dapat yang
        terbaik pula.
      </p>
      <p className="mt-48">Wasalam</p>
    </div>
  )
}
