import { Res, api } from '../api'
import {
  TikeetNotificationType,
  TiketChatParams,
  TiketDetailType,
  TiketParams,
  TiketType,
} from '@/libs/types/tiket-type'

export const TiketEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getTiket: builder.query<Res<TiketType[]>, void>({
      query: () => ({
        url: `layanan`,
      }),
      providesTags: ['tiket'],
    }),
    getTiketDetail: builder.query<Res<TiketDetailType>, { id: string }>({
      query: ({ id }) => ({
        url: `layanan_detail`,
        params: {
          id: id,
        },
      }),
      providesTags: ['detail-tiket'],
    }),
    getTiketNotifikasi: builder.query<TikeetNotificationType, void>({
      query: () => ({
        url: `notifikasi`,
      }),
      providesTags: ['notifikasi'],
    }),
    createTiket: builder.mutation<void, { data: TiketParams }>({
      query: ({ data }) => ({
        url: `layanan`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['tiket'],
    }),
    createTiketChat: builder.mutation<void, { data: TiketParams }>({
      query: ({ data }) => ({
        url: `layanan_chat`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['tiket', 'detail-tiket'],
    }),
    createTiketBaca: builder.mutation<void, { data: TiketChatParams }>({
      query: ({ data }) => ({
        url: `layanan_baca`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['tiket', 'detail-tiket'],
    }),
    editTiket: builder.mutation<void, { data: TiketParams }>({
      query: ({ data }) => ({
        url: `layanan/edit`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['tiket'],
    }),
    createFile: builder.mutation<{ url: string }, FormData>({
      query: (foto) => ({
        url: 'upload',
        method: 'POST',
        body: foto,
        formData: true,
      }),
    }),
    createTutupChat: builder.mutation<
      void,
      {
        data: {
          id: string
        }
      }
    >({
      query: ({ data }) => ({
        url: `layanan_close`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['tiket', 'detail-tiket', 'notifikasi'],
    }),
  }),
})

export const {
  useGetTiketQuery,
  useGetTiketDetailQuery,
  useGetTiketNotifikasiQuery,
  useCreateTiketMutation,
  useCreateFileMutation,
  useCreateTiketChatMutation,
  useCreateTiketBacaMutation,
  useEditTiketMutation,
  useCreateTutupChatMutation,
} = TiketEndpoints
