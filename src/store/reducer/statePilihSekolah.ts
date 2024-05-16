import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StatePilihSekolahType = {
  id: string | null
  name: string | null
  status: string | null
  npsn: string | null
}

const initialState: StatePilihSekolahType = {
  id: null,
  name: null,
  status: null,
  npsn: null,
}

const statePilihSekolahSlice = createSlice({
  name: 'pilihSekolah',
  initialState,
  reducers: {
    setStatePilihSekolah: (
      state,
      action: PayloadAction<StatePilihSekolahType>,
    ) => {
      const { id, name, npsn, status } = action.payload
      state.id = id
      state.name = name
      state.npsn = npsn
      state.status = status
    },
  },
})

export const { setStatePilihSekolah } = statePilihSekolahSlice.actions

export const getPilihSekolahSlice = (state: {
  statePilihSekolah: StatePilihSekolahType
}) => state.statePilihSekolah

export default statePilihSekolahSlice.reducer
