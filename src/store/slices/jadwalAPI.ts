import { JadwalType, JenjangParams } from '@/libs/types'
import { Res, api } from '../api'

export const JadwalEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getJadwal: builder.query<Res<JadwalType>, JenjangParams>({
      query: ({ jenjang, jalur }) => ({
        url: `jadwal/${jenjang}/${jalur}`,
      }),
      providesTags: ['jadwal'],
    }),
  }),
})

export const { useGetJadwalQuery } = JadwalEndpoints
