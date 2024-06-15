import { LokasiType, JenjangParams } from '@/libs/types'
import { Res, api } from '../api'

export const LokasiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getLokasi: builder.query<Res<LokasiType>, JenjangParams>({
      query: ({ jenjang, jalur }) => ({
        url: `lokasi/${jenjang}/${jalur}`,
      }),
      providesTags: ['lokasi'],
    }),
  }),
})

export const { useGetLokasiQuery } = LokasiEndpoints
