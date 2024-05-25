export type DaptarAkunParams = {
  nisn?: string
  nik: string
  nama: string
  tanggal_lahir: string
}

export type DaptarAkunType = {
  judul: string
  deskripsi: string
}

export type PendaftarType = {
  nomor_peserta: string
  nama: string
  asal_sekolah: string
  skor: string
}

export type HeaderType = {
  status_data: string
  tanggal_data: string
  tanggal_seleksi: string
  wilayah: string
}
