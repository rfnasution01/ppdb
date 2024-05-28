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
    .string({
      required_error: 'NIK harus di isi',
      invalid_type_error: 'Format NIK tidak valid',
    })
    .refine((value) => value.length === 16, {
      message: 'NIK harus terdiri dari 16 angka',
    }),
  kk: zod
    .string({
      required_error: 'KK harus di isi',
      invalid_type_error: 'Format KK tidak valid',
    })
    .refine((value) => value.length === 16, {
      message: 'KK harus terdiri dari 16 angka',
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
  dusun: zod.string().optional().default(''),
})

export const sekolahSebelumnyaSchema = zod.object({
  nisn: zod
    .string({
      required_error: 'NISN harus di isi',
      invalid_type_error: 'Format NISN tidak valid',
    })
    .refine((value) => value.length === 10, {
      message: 'NISN harus terdiri dari 10 angka',
    })
    .optional(),
  npsn: zod
    .string({
      required_error: 'NPSN harus di isi',
      invalid_type_error: 'Format NPSN tidak valid',
    })
    .refine((value) => value.length === 8, {
      message: 'NPSN harus terdiri dari 8 angka',
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

export const UploadSchema = zod.object({
  file: zod.string().optional(),
})

export const orangTuaSchema = zod.object({
  isHidupAyah: zod
    .boolean({
      required_error: 'Harus di isi',
      invalid_type_error: 'Format tidak valid',
    })
    .optional(),
  nama_ayah: zod.string({
    required_error: 'Nama harus di isi',
    invalid_type_error: 'Format nama tidak valid',
  }),
  nik_ayah: zod
    .string({
      required_error: 'NIK harus di isi',
      invalid_type_error: 'Format NIK tidak valid',
    })
    .refine((value) => value.length === 16, {
      message: 'NIK harus terdiri dari 16 angka',
    }),

  telepon_ayah: zod
    .string({
      required_error: 'Telepon harus di isi',
      invalid_type_error: 'Format telepon tidak valid',
    })
    .refine((value) => value.length > 0, {
      message: 'Telepon harus diisi',
    })
    .optional()
    .nullable(),
  pendidikan_ayah: zod
    .string({
      required_error: 'Pendidikan harus di isi',
      invalid_type_error: 'Format pendidikan tidak valid',
    })
    .optional()
    .nullable(),
  pekerjaan_ayah: zod
    .string({
      required_error: 'Pekerjaan harus di isi',
      invalid_type_error: 'Format pekerjaan tidak valid',
    })
    .optional()
    .nullable(),
  isHidupIbu: zod
    .boolean({
      required_error: 'Harus di isi',
      invalid_type_error: 'Format tidak valid',
    })
    .optional(),
  nama_ibu: zod.string({
    required_error: 'Nama harus di isi',
    invalid_type_error: 'Format nama tidak valid',
  }),
  nik_ibu: zod
    .string({
      required_error: 'NIK harus di isi',
      invalid_type_error: 'Format NIK tidak valid',
    })
    .refine((value) => value.length === 16, {
      message: 'NIK harus terdiri dari 16 angka',
    }),

  telepon_ibu: zod
    .string({
      required_error: 'Telepon harus di isi',
      invalid_type_error: 'Format telepon tidak valid',
    })
    .refine((value) => value.length > 0, {
      message: 'Telepon harus diisi',
    })
    .optional()
    .nullable(),
  pendidikan_ibu: zod
    .string({
      required_error: 'Pendidikan harus di isi',
      invalid_type_error: 'Format pendidikan tidak valid',
    })
    .optional()
    .nullable(),
  pekerjaan_ibu: zod
    .string({
      required_error: 'Pekerjaan harus di isi',
      invalid_type_error: 'Format pekerjaan tidak valid',
    })
    .optional()
    .nullable(),

  nama_wali: zod
    .string({
      required_error: 'Nama harus di isi',
      invalid_type_error: 'Format nama tidak valid',
    })
    .optional()
    .nullable(),
  nik_wali: zod
    .string({
      required_error: 'NIK harus di isi',
      invalid_type_error: 'Format NIK tidak valid',
    })
    .optional()
    .nullable(),

  telepon_wali: zod
    .string({
      required_error: 'Telepon harus di isi',
      invalid_type_error: 'Format telepon tidak valid',
    })
    .optional()
    .nullable(),
  pendidikan_wali: zod
    .string({
      required_error: 'Pendidikan harus di isi',
      invalid_type_error: 'Format pendidikan tidak valid',
    })
    .optional()
    .nullable(),
  pekerjaan_wali: zod
    .string({
      required_error: 'Pekerjaan harus di isi',
      invalid_type_error: 'Format pekerjaan tidak valid',
    })
    .optional()
    .nullable(),
})

export const sekolahSchema = zod.object({
  tujuan_pertama: zod.string({
    required_error: 'Tujuan sekolah harus di isi',
    invalid_type_error: 'Format tujuan sekolah tidak valid',
  }),
  tujuan_kedua: zod
    .string({
      required_error: 'Tujuan sekolah harus di isi',
      invalid_type_error: 'Format tujuan sekolah tidak valid',
    })
    .optional()
    .nullable(),
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
