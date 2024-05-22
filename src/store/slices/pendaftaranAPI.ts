import { Res, api } from '../api'
import {
  AlamatParams,
  BiodataParams,
  OrangTuaParams,
  PendaftaranParams,
  PendidikanType,
  PilihanSekolahParams,
  ProfilData,
  ProvinsiType,
  SekolahParams,
  ValidasiParams,
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
        url: `referensi/dusun`,
        params: {
          id_desa: id_desa,
        },
      }),
    }),
    getPendidikan: builder.query<Res<PendidikanType[]>, void>({
      query: () => ({
        url: `referensi/pendidikan`,
      }),
    }),
    getPekerjaan: builder.query<Res<PendidikanType[]>, void>({
      query: () => ({
        url: `referensi/pekerjaan`,
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
    createOrangTua: builder.mutation<void, { data: OrangTuaParams }>({
      query: ({ data }) => ({
        url: `profil/orangtua`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profil'],
    }),
    createUploadFile: builder.mutation<void, { data: FormData }>({
      query: ({ data }) => ({
        url: `dokumen`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profil'],
    }),
    createPilihanSekolah: builder.mutation<
      void,
      { data: PilihanSekolahParams }
    >({
      query: ({ data }) => ({
        url: `profil/pilihan`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profil'],
    }),
    createValidasi: builder.mutation<void, { data: ValidasiParams }>({
      query: ({ data }) => ({
        url: `profil/validasi`,
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
  useCreateOrangTuaMutation,
  useCreateUploadFileMutation,
  useCreatePilihanSekolahMutation,
  useCreateValidasiMutation,
  useGetProvinsiQuery,
  useGetKabupatenQuery,
  useGetKecamatanQuery,
  useGetDesaQuery,
  useGetDusunQuery,
  useGetProfilQuery,
  useGetPekerjaanQuery,
  useGetPendidikanQuery,
} = PendaftaranEndpoints
