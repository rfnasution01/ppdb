import { JenjangParams, SekilasType } from '@/libs/types'
import { Res, api } from '../api'

export const SekilasEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSekilas: builder.query<Res<SekilasType>, JenjangParams>({
      query: ({ jenjang, jalur }) => ({
        url: `sekilas/${jenjang}/${jalur}`,
      }),
      providesTags: ['sekilas'],
    }),
  }),
})

export const { useGetSekilasQuery } = SekilasEndpoints
