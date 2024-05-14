export type JadwalType = {
  judul: string
  deskripsi: string
  isi: JadwalIsiType[]
}

export type JadwalIsiType = {
  kegiatan: string
  lokasi: string
  tanggal: string
  waktu: string
  urutan: string
}
