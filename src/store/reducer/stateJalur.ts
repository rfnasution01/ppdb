import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateJalurType = {
  kode: string | null
}

const initialState: StateJalurType = {
  kode: null,
}

const stateJalurSlice = createSlice({
  name: 'jalur',
  initialState,
  reducers: {
    setStateJalur: (state, action: PayloadAction<StateJalurType>) => {
      const { kode } = action.payload
      state.kode = kode
    },
  },
})

export const { setStateJalur } = stateJalurSlice.actions

export const getJalurSlice = (state: { stateJalur: StateJalurType }) =>
  state.stateJalur

export default stateJalurSlice.reducer
