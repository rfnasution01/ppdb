export type DayaTampungType = {
  judul: string
  deskripsi: string
  isi: DayaTampungIsi[]
}

export type DayaTampungIsi = {
  alamat: string
  gelombang: string
  id_sekolah: string
  jalur: string
  jumlah: string
  nama_sekolah: string
  npsn: string
}
