import { Res, api } from '../api'
import {
  AlamatParams,
  BiodataParams,
  PendaftaranParams,
  ProfilData,
  ProvinsiType,
  SekolahParams,
} from '@/libs/types/pendaftaran-type'

export const PendaftaranEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfil: builder.query<Res<ProfilData>, void>({
      query: () => ({
        url: `profil`,
      }),
      providesTags: ['profil'],
    }),
    getProvinsi: builder.query<Res<ProvinsiType[]>, void>({
      query: () => ({
        url: `referensi/provinsi`,
      }),
    }),
    getKabupaten: builder.query<Res<ProvinsiType[]>, { id_provinsi: string }>({
      query: ({ id_provinsi }) => ({
        url: `referensi/kabupaten`,
        params: {
          id_provinsi: id_provinsi,
        },
      }),
    }),
    getKecamatan: builder.query<Res<ProvinsiType[]>, { id_kabupaten: string }>({
      query: ({ id_kabupaten }) => ({
        url: `referensi/kecamatan`,
        params: {
          id_kabupaten: id_kabupaten,
        },
      }),
    }),
    getDesa: builder.query<Res<ProvinsiType[]>, { id_kecamatan: string }>({
      query: ({ id_kecamatan }) => ({
        url: `referensi/desa`,
        params: {
          id_kecamatan: id_kecamatan,
        },
      }),
    }),
    getDusun: builder.query<Res<ProvinsiType[]>, { id_desa: string }>({
      query: ({ id_desa }) => ({
        url: `referensi/desa`,
        params: {
          id_desa: id_desa,
        },
      }),
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
  useGetProvinsiQuery,
  useGetKabupatenQuery,
  useGetKecamatanQuery,
  useGetDesaQuery,
  useGetDusunQuery,
  useGetProfilQuery,
} = PendaftaranEndpoints
