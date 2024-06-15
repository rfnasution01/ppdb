import { GelombangType, JenjangParams } from '@/libs/types'
import { Res, api } from '../api'

export const GelombangEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getGelombang: builder.query<Res<GelombangType[]>, JenjangParams>({
      query: ({ jenjang }) => ({
        url: `gelombang/${jenjang}`,
      }),
      providesTags: ['gelombang'],
    }),
  }),
})

export const { useGetGelombangQuery } = GelombangEndpoints
