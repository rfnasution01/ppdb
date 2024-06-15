import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateGelombangType = {
  kode: string | null
}

const initialState: StateGelombangType = {
  kode: null,
}

const stateGelombangSlice = createSlice({
  name: 'gelombang',
  initialState,
  reducers: {
    setStateGelombang: (state, action: PayloadAction<StateGelombangType>) => {
      const { kode } = action.payload
      state.kode = kode
    },
  },
})

export const { setStateGelombang } = stateGelombangSlice.actions

export const getGelombangSlice = (state: {
  stateGelombang: StateGelombangType
}) => state.stateGelombang

export default stateGelombangSlice.reducer
