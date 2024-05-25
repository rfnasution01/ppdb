import { configureStore } from '@reduxjs/toolkit'

import { api } from './api'
import stateSearch from './reducer/stateSearch.ts'
import stateJenjang from './reducer/stateJenjang.ts'
import stateJalur from './reducer/stateJalur.ts'
import stateBiodata from './reducer/stateBiodata.ts'
import statePilihSekolah from './reducer/statePilihSekolah.ts'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    stateSearch: stateSearch,
    stateJenjang: stateJenjang,
    stateJalur: stateJalur,
    stateBiodata: stateBiodata,
    statePilihSekolah: statePilihSekolah,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
