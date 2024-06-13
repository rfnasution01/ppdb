export type SeleksiType = {
  nomor_peserta: string
  nama: string
  nisn: string
  asal_sekolah: string
  skor_lulus: string
}

export type HasilType = {
  status: 0
  sekolah: null
  batas_registrasi_ulang: null
}

export type LulusType = {
  instansi: string
  nomor: string
  nama: string
  tempat_lahir: string
  tanggal_lahir: string
  nomor_pendaftaran: string
  nama_sekolah: string
  alamat_sekolah: string
  nisn: string
  batas_registrasi_ulang: string
  nama_kadis: string
  nip_kadis: string
  nama_kepsek: string
  nip_kepsek: string
  tanggal: string
  logo: string
  tempat: string
}
