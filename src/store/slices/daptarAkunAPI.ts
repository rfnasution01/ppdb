import { DaptarAkunParams, DaptarAkunType } from '@/libs/types/daptar-akun'
import { Res, api } from '../api'
import { JenjangParams } from '@/libs/types'

export const DaptarAkunEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAkun: builder.query<Res<DaptarAkunType>, JenjangParams>({
      query: ({ jenjang, jalur }) => ({
        url: `daftar/${jenjang}/${jalur}`,
      }),
      providesTags: ['daptar-akun'],
    }),
    createAkun: builder.mutation<
      void,
      { data: DaptarAkunParams; jenjang; jalur }
    >({
      query: ({ data, jenjang, jalur }) => ({
        url: `daftar/${jenjang}/${jalur}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['daptar-akun'],
    }),
  }),
})

export const { useCreateAkunMutation, useGetAkunQuery } = DaptarAkunEndpoints
