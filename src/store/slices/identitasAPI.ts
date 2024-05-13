import { InstansiData } from '@/libs/types'
import { Res, api } from '../api'

export const IdentitasEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getIdentitas: builder.query<Res<InstansiData>, void>({
      query: () => ({
        url: `identitas`,
      }),
    }),
  }),
})

export const { useGetIdentitasQuery } = IdentitasEndpoints
