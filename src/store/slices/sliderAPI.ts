import { SliderType } from '@/libs/types'
import { Res, api } from '../api'

export const SliderEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSlider: builder.query<Res<SliderType[]>, void>({
      query: () => ({
        url: `slider`,
      }),
      providesTags: ['slider'],
    }),
  }),
})

export const { useGetSliderQuery } = SliderEndpoints
