import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateJenjangType = {
  tingkatan: string | null
}

const initialState: StateJenjangType = {
  tingkatan: null,
}

const stateJenjangSlice = createSlice({
  name: 'jenjang',
  initialState,
  reducers: {
    setStateJenjang: (state, action: PayloadAction<StateJenjangType>) => {
      const { tingkatan } = action.payload
      state.tingkatan = tingkatan
    },
  },
})

export const { setStateJenjang } = stateJenjangSlice.actions

export const getJenjangSlice = (state: { stateJenjang: StateJenjangType }) =>
  state.stateJenjang

export default stateJenjangSlice.reducer
