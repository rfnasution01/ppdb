import zod from 'zod'

export const prestasiSchema = zod.object({
  tingkat: zod
    .string({
      required_error: 'Nama harus di isi',
      invalid_type_error: 'Format nama tidak valid',
    })
    .optional()
    .nullable(),
  nama_prestasi: zod
    .string({
      required_error: 'Tanggal lahir harus di isi',
      invalid_type_error: 'Format tanggal lahir tidak valid',
    })
    .optional()
    .nullable(),
  juara: zod
    .string({
      required_error: 'Tempat lahir harus di isi',
      invalid_type_error: 'Format tempat lahir tidak valid',
    })
    .optional()
    .nullable(),
  kelas: zod
    .string({
      required_error: 'Agama harus di isi',
      invalid_type_error: 'Format agama tidak valid',
    })
    .optional()
    .nullable(),
  penyelenggara: zod
    .string({
      required_error: 'Jenis Kelamin harus di isi',
      invalid_type_error: 'Format jenis kelamin tidak valid',
    })
    .optional()
    .nullable(),
  sertifikat: zod
    .string({
      required_error: 'NIK harus di isi',
      invalid_type_error: 'Format NIK tidak valid',
    })
    .optional()
    .nullable(),
})
