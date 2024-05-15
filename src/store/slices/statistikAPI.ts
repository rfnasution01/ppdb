import { JenjangParams, StatistikType } from '@/libs/types'
import { Res, api } from '../api'

export const StatistikEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getStatistik: builder.query<Res<StatistikType>, JenjangParams>({
      query: ({ jenjang, jalur }) => ({
        url: `statistik/${jenjang}/${jalur}`,
      }),
    }),
  }),
})

export const { useGetStatistikQuery } = StatistikEndpoints
