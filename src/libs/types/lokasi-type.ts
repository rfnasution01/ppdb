export type LokasiType = {
  judul: string
  deskripsi: string
  isi: LokasiIsiType[]
}

export type LokasiIsiType = {
  nama_sekolah: string
  alamat: string
  telepon: string
  latitude: string
  longitude: string
}
