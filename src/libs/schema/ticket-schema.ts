import zod from 'zod'

export const tiketSchema = zod.object({
  judul: zod.string({
    required_error: 'Judul harus di isi',
    invalid_type_error: 'Format judul tidak valid',
  }),
  keterangan: zod.string({
    required_error: 'Keterangan harus di isi',
    invalid_type_error: 'Format keterangan tidak valid',
  }),
  berkas: zod.string().optional().nullable().nullish(),
})
