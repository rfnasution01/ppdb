import zod from 'zod'

export const daptarAkunSchema = zod
  .object({
    nik: zod
      .string({
        required_error: 'NIK harus di isi',
        invalid_type_error: 'Format NIK tidak valid',
      })
      .refine((value) => value.length === 16, {
        message: 'NIK harus terdiri dari 16 angka',
      }),
    konfirmasi_nik: zod
      .string({
        required_error: 'NIK harus di isi',
        invalid_type_error: 'Format NIK tidak valid',
      })
      .refine((value) => value.length === 16, {
        message: 'NIK harus terdiri dari 16 angka',
      }),
    nisn: zod
      .string({
        required_error: 'NISN harus di isi',
        invalid_type_error: 'Format NISN tidak valid',
      })
      .refine((value) => value.length === 10, {
        message: 'NISN harus terdiri dari 10 angka',
      })
      .optional(),
    nama_lengkap: zod.string({
      required_error: 'Nama harus di isi',
      invalid_type_error: 'Format nama tidak valid',
    }),
    tgl_lahir: zod.string({
      required_error: 'Tanggal lahit harus di isi',
      invalid_type_error: 'Format tanggal lahir tidak valid',
    }),
    konfirmasi_tgl_lahir: zod.string({
      required_error: 'Tanggal lahit harus di isi',
      invalid_type_error: 'Format tanggal lahir tidak valid',
    }),
    isChecked: zod
      .boolean({
        required_error: 'Harus dicentang',
        invalid_type_error: 'Harus berupa boolean',
      })
      .refine((value) => value === true, {
        message: 'Harus dicentang',
      }),
  })
  .refine((values) => values.nik === values.konfirmasi_nik, {
    message: 'Konfirmasi NIK harus sama dengan NIK',
    path: ['konfirmasi_nik'],
  })
  .refine((values) => values.tgl_lahir === values.konfirmasi_tgl_lahir, {
    message: 'Konfirmasi tanggal lahir harus sama dengan tanggal lahir',
    path: ['konfirmasi_tgl_lahir'],
  })
