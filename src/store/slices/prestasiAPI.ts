import { LokasiType, JenjangParams } from '@/libs/types'
import { Res, api } from '../api'
import { AddPrestasiParams } from '@/libs/types/prestasi-type'

export const PrestasiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getPrestasi: builder.query<Res<LokasiType>, JenjangParams>({
      query: ({ jenjang, jalur }) => ({
        url: `prestasi/${jenjang}/${jalur}`,
      }),
    }),
    createAddPrestasi: builder.mutation<void, { data: AddPrestasiParams }>({
      query: ({ data }) => ({
        url: `prestasi/tambah`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profil', 'prestasi'],
    }),
    createEditPrestasi: builder.mutation<void, { data: AddPrestasiParams }>({
      query: ({ data }) => ({
        url: `prestasi/edit`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profil', 'prestasi'],
    }),
    deletePrestasi: builder.mutation<
      void,
      { data: AddPrestasiParams; id: string }
    >({
      query: ({ data, id }) => ({
        url: `prestasi/${id}`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['profil', 'prestasi'],
    }),
  }),
})

export const { useGetPrestasiQuery } = PrestasiEndpoints
