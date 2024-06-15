import { AturanType, JenjangParams } from '@/libs/types'
import { Res, api } from '../api'

export const AturanEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAturan: builder.query<Res<AturanType>, JenjangParams>({
      query: ({ jenjang, jalur }) => ({
        url: `aturan/${jenjang}/${jalur}`,
      }),
      providesTags: ['aturan'],
    }),
  }),
})

export const { useGetAturanQuery } = AturanEndpoints
