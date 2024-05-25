import { JenjangParams, StatistikType } from '@/libs/types'
import { Res, api } from '../api'

export const StatistikEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getStatistik: builder.query<Res<StatistikType>, JenjangParams>({
      query: ({ jenjang, jalur, id_sekolah }) => ({
        url: `statistik/${jenjang}/${jalur}`,
        params: {
          id_sekolah: id_sekolah,
        },
      }),
    }),
  }),
})

export const { useGetStatistikQuery } = StatistikEndpoints
