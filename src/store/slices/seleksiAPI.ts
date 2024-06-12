import { JenjangParams, StatistikType } from '@/libs/types'
import { Res, api } from '../api'

export const SeleksiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSeleksi: builder.query<Res<StatistikType>, JenjangParams>({
      query: ({ jenjang, jalur, id_sekolah }) => ({
        url: `seleksi/${jenjang}/${jalur}`,
        params: {
          id_sekolah: id_sekolah,
        },
      }),
    }),
  }),
})

export const { useGetSeleksiQuery } = SeleksiEndpoints
