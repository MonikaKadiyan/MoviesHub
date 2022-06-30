import { configureStore } from '@reduxjs/toolkit'
import reducer from './starWarsSlice';

export const store = configureStore({
  reducer: reducer,
})

