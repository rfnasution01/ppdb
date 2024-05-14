import { AlurType, JenjangParams } from '@/libs/types'
import { Res, api } from '../api'

export const AlurEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAlur: builder.query<Res<AlurType>, JenjangParams>({
      query: ({ jenjang, jalur }) => ({
        url: `alur/${jenjang}/${jalur}`,
      }),
    }),
  }),
})

export const { useGetAlurQuery } = AlurEndpoints
