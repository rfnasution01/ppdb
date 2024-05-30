import { Res, api } from '../api'
import { TiketType } from '@/libs/types/tiket-type'

export const TiketEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getTiket: builder.query<Res<TiketType[]>, void>({
      query: () => ({
        url: `layanan`,
      }),
      providesTags: ['tiket'],
    }),
    createTiket: builder.mutation<void, { data: FormData }>({
      query: ({ data }) => ({
        url: `layanan`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['tiket'],
    }),
    editTiket: builder.mutation<void, { data: FormData }>({
      query: ({ data }) => ({
        url: `layanan/edit`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['tiket'],
    }),
  }),
})

export const {
  useGetTiketQuery,
  useCreateTiketMutation,
  useEditTiketMutation,
} = TiketEndpoints
