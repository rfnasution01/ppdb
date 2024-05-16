import zod from 'zod'

export const loginSchema = zod.object({
  username: zod.string({
    required_error: 'NISN harus di isi',
    invalid_type_error: 'Format NISN tidak valid',
  }),
  tanggal_lahir: zod.string({
    required_error: 'Tanggal lahir harus di isi',
    invalid_type_error: 'Format tanggal lahir tidak valid',
  }),
  bulan_lahir: zod.string({
    required_error: 'Bulan lahir harus di isi',
    invalid_type_error: 'Format bulan lahir tidak valid',
  }),
  tahun_lahir: zod.string({
    required_error: 'Tahun lahir harus di isi',
    invalid_type_error: 'Format tahun lahir tidak valid',
  }),
})
