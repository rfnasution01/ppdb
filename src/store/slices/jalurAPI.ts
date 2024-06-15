import { JalurMasukType, JenjangParams } from '@/libs/types'
import { Res, api } from '../api'

export const JalurMasukEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getJalurMasuk: builder.query<Res<JalurMasukType[]>, JenjangParams>({
      query: ({ jenjang }) => ({
        url: `jalur_masuk/${jenjang}`,
      }),
      providesTags: ['jalur'],
    }),
  }),
})

export const { useGetJalurMasukQuery } = JalurMasukEndpoints
