import { DayaTampungType, JenjangParams } from '@/libs/types'
import { Res, api } from '../api'

export const DayaTampungEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDayaTampung: builder.query<Res<DayaTampungType>, JenjangParams>({
      query: ({ jenjang, jalur }) => ({
        url: `daya_tampung/${jenjang}/${jalur}`,
      }),
    }),
  }),
})

export const { useGetDayaTampungQuery } = DayaTampungEndpoints
