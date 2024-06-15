import { DaptarGelombang2 } from '@/libs/types'
import { Res, api } from '../api'

export const DaptarGelombangEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    createDaptarGelombang: builder.mutation<Res<DaptarGelombang2>, void>({
      query: () => ({
        url: `daftar`,
        method: 'POST',
      }),
      invalidatesTags: [
        'daptar-akun',
        'profil',
        'detail-tiket',
        'dashboard',
        'notifikasi',
        'prestasi',
        'tiket',
        'alur',
        'aturan',
        'daya-tampung',
        'gelombang',
        'hasil',
        'identitas',
        'jadwal',
        'jalur',
        'lokasi',
        'sekilas',
        'seleksi',
        'slider',
        'statistik',
      ],
    }),
  }),
})

export const { useCreateDaptarGelombangMutation } = DaptarGelombangEndpoints
