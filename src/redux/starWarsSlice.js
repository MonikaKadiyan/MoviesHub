// const initialState = { character: null, movies: null };
// const countReducer = function (state = initialState, action) {
//   switch (action.type) {
//     case "SET_CHARACTERS":
//       return { ...state, character: action.results };
//     case "SET_CHARACTER_MOVIES":
//       return { ...state, movies: action.movies };
//     default:
//       return state;
//   }
// };


import { createSlice } from '@reduxjs/toolkit'

const initialState = { character: null, movies: null };


export const starWarsSlice = createSlice({
  name: 'starwars',
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.character = action.payload.results
    },
    setCharacterMovies: (state, action) => {
      state.movies = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setCharacters, setCharacterMovies } = starWarsSlice.actions

export default starWarsSlice.reducer
