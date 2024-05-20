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
  nomor_peserta: string
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
  ayah: DataOrangTuaType
  ibu: DataOrangTuaType
  wali: DataOrangTuaType
  status: boolean
}

export type DataOrangTuaType = {
  status?: string
  nama: string
  nik: string
  hp: string
  id_pekerjaan: string
  id_pendidikan: string
  pekerjaan: string
  pendidikan: string
}

export type ProfilData = {
  jalur: string
  biodata: BiodataType
  sekolah: SekolahParams
  orangtua: OrangTuaType
  dokumen: DokumenType
  pilihan: PilihanType
  validasi: ValidasiType
  verifikasi: VerifikasiType
}

export type ValidasiType = {
  status: number
  tanggal_daftar: string
  tanggal_validasi: string
}

export type VerifikasiType = {
  status: number
  tanggal_verifikasi: string
  petugas: string
  komentar: string
}

export type PilihanType = {
  pilihan1: {
    id_sekolah: string
    nama_sekolah: string
    skor: number
  }
  pilihan2: {
    id_sekolah: string
    nama_sekolah: string
    skor: number
  }
  status: boolean
}

export type DokumenType = {
  data: DokumenList[]
  status: boolean
}

export type DokumenList = {
  id: string
  nama: string
  keterangan: string
  status: string
  format: string
  pasfoto: number
  dok_siswa?: string
  status_verifikasi: number
  verifikasi_on?: string
  petugas?: string
  komentar?: string
}

export type SekolahParams = {
  nisn?: string
  npsn: string
  nama_sekolah: string
  tahun_lulus: string
  status?: boolean
}

export type PendidikanType = {
  id: string
  nama: string
}

export type OrangTuaParams = {
  status_ayah: string
  nik_ayah: string
  nama_ayah: string
  hp_ayah: string
  pendidikan_ayah: string
  pekerjaan_ayah: string
  status_ibu: string
  nik_ibu: string
  nama_ibu: string
  hp_ibu: string
  pendidikan_ibu: string
  pekerjaan_ibu: string
  nik_wali: string
  nama_wali: string
  hp_wali: string
  pendidikan_wali: string
  pekerjaan_wali: string
}

export type DokumenParams = { id_dokumen: string; berkas: File }

export type PilihanSekolahParams = {
  pilihan1: string
  pilihan2?: string
}

export type ValidasiParams = {
  validasi: boolean
}
