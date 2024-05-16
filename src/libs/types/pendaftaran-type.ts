export type PendaftaranParams = {
  jalur: string
}

export type BiodataParams = {
  tempat_lahir: string
  jenis_kelamin: string
  nomor_kk: string
  telepon: string
}

export type AlamatParams = {
  id_provinsi: string
  id_kabupaten: string
  id_kecamatan: string
  id_desa: string
  id_dusun: string
  alamat_lengkap: string
}

export type SekolahParams = {
  npsn: string
  nama_sekolah: string
  tahun_lulus: string
}

export type ProfilData = {
  jalur: string
  biodata: Biodata
  alamat: Alamat
  sekolah: null | string
  orangtua: Orangtua
}

export type Biodata = {
  nama: string
  tempat_lahir: string | null
  tanggal_lahir: string
  jenis_kelamin: string | null
  nik: string
  nomor_kk: string | null
  telepon: string | null
}

export type Alamat = {
  id_provinsi: string | null
  provinsi: string | null
  id_kabupaten: string | null
  kabupaten: string | null
  id_desa: string | null
  desa: string | null
  id_dusun: string | null
  dusun: string | null
  alamat_lengkap: string | null
}

export type Orangtua = {
  ayah: null
  ibu: null
}
