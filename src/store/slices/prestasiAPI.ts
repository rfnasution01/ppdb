import { api } from '../api'

export const PrestasiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    createAddPrestasi: builder.mutation<void, { data: FormData }>({
      query: ({ data }) => ({
        url: `prestasi/tambah`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profil', 'prestasi'],
    }),
    createEditPrestasi: builder.mutation<void, { data: FormData }>({
      query: ({ data }) => ({
        url: `prestasi/edit`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profil', 'prestasi'],
    }),
    deletePrestasi: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `prestasi/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['profil', 'prestasi'],
    }),
  }),
})

export const {
  useCreateAddPrestasiMutation,
  useCreateEditPrestasiMutation,
  useDeletePrestasiMutation,
} = PrestasiEndpoints
