import { Res, api } from '../api'
import { HasilType, LulusType } from '@/libs/types/seleksi-type'

export const HasilEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getHasil: builder.query<Res<HasilType>, void>({
      query: () => ({
        url: `hasil`,
      }),
      providesTags: ['hasil'],
    }),
    getLulus: builder.query<Res<LulusType>, void>({
      query: () => ({
        url: `lulus`,
      }),
      providesTags: ['hasil'],
    }),
  }),
})

export const { useGetHasilQuery, useGetLulusQuery } = HasilEndpoints
