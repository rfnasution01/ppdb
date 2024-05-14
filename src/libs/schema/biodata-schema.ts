import zod from 'zod'

export const informasiPribadiSchema = zod.object({
  nama_lengkap: zod.string({
    required_error: 'Nama harus di isi',
    invalid_type_error: 'Format nama tidak valid',
  }),
  tgl_lahir: zod.string({
    required_error: 'Tanggal lahir harus di isi',
    invalid_type_error: 'Format tanggal lahir tidak valid',
  }),
  tempat_lahir: zod.string({
    required_error: 'Tempat lahir harus di isi',
    invalid_type_error: 'Format tempat lahir tidak valid',
  }),
  agama: zod.string({
    required_error: 'Agama harus di isi',
    invalid_type_error: 'Format agama tidak valid',
  }),
  jenis_kelamin: zod.string({
    required_error: 'Jenis Kelamin harus di isi',
    invalid_type_error: 'Format jenis kelamin tidak valid',
  }),
  nik: zod
    .string()
    .refine((value) => value.length === 16 && /^\d+$/.test(value), {
      message:
        'NIK harus terdiri dari 16 karakter dan hanya boleh berisi angka',
      path: ['nik'],
    }),
  kk: zod
    .string()
    .refine((value) => value.length === 16 && /^\d+$/.test(value), {
      message: 'KK harus terdiri dari 16 karakter dan hanya boleh berisi angka',
      path: ['kk'],
    }),
  no_hp: zod.string({
    required_error: 'No. Hp harus di isi',
    invalid_type_error: 'Format no. hp tidak valid',
  }),
  provinsi: zod.string({
    required_error: 'Provinsi harus di isi',
    invalid_type_error: 'Format provinsi tidak valid',
  }),
  kabupaten: zod.string({
    required_error: 'Kabupaten harus di isi',
    invalid_type_error: 'Format kabupaten tidak valid',
  }),
  kecamatan: zod.string({
    required_error: 'Kecamatan harus di isi',
    invalid_type_error: 'Format kecamatan tidak valid',
  }),
  desa: zod.string({
    required_error: 'Desa harus di isi',
    invalid_type_error: 'Format desa tidak valid',
  }),
  alamat: zod.string({
    required_error: 'Alamat harus di isi',
    invalid_type_error: 'Format alamat tidak valid',
  }),
  dusun: zod.string().optional(),
})

export const sekolahSebelumnyaSchema = zod.object({
  nisn: zod.string({
    required_error: 'NISN harus di isi',
    invalid_type_error: 'Format nisn tidak valid',
  }),
  npsn: zod.string({
    required_error: 'NPSN harus di isi',
    invalid_type_error: 'Format npsn tidak valid',
  }),
  nama_sekolah: zod.string({
    required_error: 'Nama Sekolah harus di isi',
    invalid_type_error: 'Format nama sekolah tidak valid',
  }),
  tahun_lulus: zod.string({
    required_error: 'Tahun lulus harus di isi',
    invalid_type_error: 'Format tahun lulus tidak valid',
  }),
})

export const orangTuaSchema = zod.object({
  isHidupAyah: zod.boolean({
    required_error: 'Harus di isi',
    invalid_type_error: 'Format tidak valid',
  }),
  nama_ayah: zod.string({
    required_error: 'Nama harus di isi',
    invalid_type_error: 'Format nama tidak valid',
  }),
  nik_ayah: zod
    .string()
    .refine((value) => value.length === 16, {
      message: 'NIK harus terdiri dari 16 karakter',
      path: ['nik'],
    })
    .refine((value) => /^\d+$/.test(value), {
      message: 'NIK hanya boleh berisi angka',
      path: ['nik'],
    }),

  telepon_ayah: zod.string({
    required_error: 'Telepon harus di isi',
    invalid_type_error: 'Format telepon tidak valid',
  }),
  pendidikan_ayah: zod.string({
    required_error: 'Pendidikan harus di isi',
    invalid_type_error: 'Format pendidikan tidak valid',
  }),
  pekerjaan_ayah: zod.string({
    required_error: 'Pekerjaan harus di isi',
    invalid_type_error: 'Format pekerjaan tidak valid',
  }),
  nama_ibu: zod.string({
    required_error: 'Nama harus di isi',
    invalid_type_error: 'Format nama tidak valid',
  }),
  nik_ibu: zod
    .string()
    .refine((value) => value.length === 16, {
      message: 'NIK harus terdiri dari 16 karakter',
      path: ['nik'],
    })
    .refine((value) => /^\d+$/.test(value), {
      message: 'NIK hanya boleh berisi angka',
      path: ['nik'],
    }),

  telepon_ibu: zod.string({
    required_error: 'Telepon harus di isi',
    invalid_type_error: 'Format telepon tidak valid',
  }),
  pendidikan_ibu: zod.string({
    required_error: 'Pendidikan harus di isi',
    invalid_type_error: 'Format pendidikan tidak valid',
  }),
  pekerjaan_ibu: zod.string({
    required_error: 'Pekerjaan harus di isi',
    invalid_type_error: 'Format pekerjaan tidak valid',
  }),
})

export const sekolahSchema = zod.object({
  tujuan_pertama: zod.string({
    required_error: 'Tujuan sekolah harus di isi',
    invalid_type_error: 'Format tujuan sekolah tidak valid',
  }),
  tujuan_kedua: zod.string({
    required_error: 'Tujuan sekolah harus di isi',
    invalid_type_error: 'Format tujuan sekolah tidak valid',
  }),
})

export const dokumenSchema = zod.object({
  pas_foto: zod.string().refine((value) => value.length > 0, {
    message: 'Gambar harus diunggah',
    path: ['image'],
  }),
  kk: zod.string().refine((value) => value.length > 0, {
    message: 'Gambar harus diunggah',
    path: ['image'],
  }),
  dokumen: zod.string().refine((value) => value.length > 0, {
    message: 'Gambar harus diunggah',
    path: ['image'],
  }),
})