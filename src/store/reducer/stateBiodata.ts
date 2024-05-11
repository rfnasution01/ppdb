import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateBiodataType = {
  page: string | null
}

const initialState: StateBiodataType = {
  page: null,
}

const stateBiodataSlice = createSlice({
  name: 'biodata',
  initialState,
  reducers: {
    setStateBiodata: (state, action: PayloadAction<StateBiodataType>) => {
      const { page } = action.payload
      state.page = page
    },
  },
})

export const { setStateBiodata } = stateBiodataSlice.actions

export const getBiodataSlice = (state: { stateBiodata: StateBiodataType }) =>
  state.stateBiodata

export default stateBiodataSlice.reducer
