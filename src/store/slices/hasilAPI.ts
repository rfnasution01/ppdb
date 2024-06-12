import { Res, api } from '../api'
import { HasilType } from '@/libs/types/seleksi-type'

export const HasilEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getHasil: builder.query<Res<HasilType>, void>({
      query: () => ({
        url: `hasil`,
      }),
    }),
  }),
})

export const { useGetHasilQuery } = HasilEndpoints
