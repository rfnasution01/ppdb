import { Res, api } from '../api'
import { DashboardType } from '@/libs/types/dashboard-type'

export const DashboardEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<Res<DashboardType>, void>({
      query: () => ({
        url: `dashboard`,
      }),
      providesTags: ['dashboard'],
    }),
  }),
})

export const { useGetDashboardQuery } = DashboardEndpoints
