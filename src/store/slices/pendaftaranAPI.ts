import { Res, api } from '../api'
import {
  AlamatParams,
  BiodataParams,
  PendaftaranParams,
  ProfilData,
  SekolahParams,
} from '@/libs/types/pendaftaran-type'

export const PendaftaranEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSekilas: builder.query<Res<ProfilData>, void>({
      query: () => ({
        url: `profil`,
      }),
      providesTags: ['profil'],
    }),
    createJalur: builder.mutation<void, { data: PendaftaranParams }>({
      query: ({ data }) => ({
        url: `profil/jalur`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profil'],
    }),
    createBiodata: builder.mutation<void, { data: BiodataParams }>({
      query: ({ data }) => ({
        url: `profil/biodata`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profil'],
    }),
    createAlamat: builder.mutation<void, { data: AlamatParams }>({
      query: ({ data }) => ({
        url: `profil/alamat`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profil'],
    }),
    createSekolah: builder.mutation<void, { data: SekolahParams }>({
      query: ({ data }) => ({
        url: `profil/sekolah`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profil'],
    }),
  }),
})

export const {
  useCreateJalurMutation,
  useCreateBiodataMutation,
  useCreateAlamatMutation,
  useCreateSekolahMutation,
} = PendaftaranEndpoints
