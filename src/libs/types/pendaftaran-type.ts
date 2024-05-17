export type PendaftaranParams = {
  jalur: string
}

export type BiodataParams = {
  tempat_lahir: string
  jenis_kelamin: string
  nomor_kk: string
  telepon: string
  id_provinsi: string
  id_kabupaten: string
  id_kecamatan: string
  id_desa: string
  id_dusun: string
  alamat_lengkap: string
}

export type AlamatParams = {
  id_provinsi: string
  id_kabupaten: string
  id_kecamatan: string
  id_desa: string
  id_dusun: string
  alamat_lengkap: string
}

export type ProvinsiType = {
  id: string
  nama: string
  default: boolean
}

export type BiodataType = {
  nama: string
  tempat_lahir: string
  tanggal_lahir: string
  jenis_kelamin: string
  agama: string
  nik: string
  nomor_kk: string
  telepon: string
  id_provinsi: string
  provinsi: string
  id_kabupaten: string
  kabupaten: string
  id_kecamatan: string
  kecamatan: string
  id_desa: string
  desa: string
  id_dusun: string | null
  dusun: string | null
  alamat_lengkap: string
  status: boolean
}

export type OrangTuaType = {
  ayah: null // Assuming array of data for father
  ibu: null // Assuming array of data for mother
}

export type ProfilData = {
  jalur: string
  biodata: BiodataType
  sekolah: SekolahParams // Assuming school data or null if not available
  orangtua: OrangTuaType
  dokumen: null // Assuming array of document data
  pilihan: null // Assuming array of choices
}

export type SekolahParams = {
  nisn?: string
  npsn: string
  nama_sekolah: string
  tahun_lulus: string
}
