import { LoginType, ResponseLoginType } from '@/libs/types'
import { Res, api } from '../api'

export const LoginEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    createLogin: builder.mutation<Res<ResponseLoginType>, { data: LoginType }>({
      query: ({ data }) => ({
        url: `login`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        'daptar-akun',
        'profil',
        'detail-tiket',
        'dashboard',
        'notifikasi',
        'prestasi',
        'tiket',
      ],
    }),
  }),
})

export const { useCreateLoginMutation } = LoginEndpoints
