import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Auth:false,
  loading:true,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.value = action.payload;
    },
    saveDetails: (state, action) => {
      state.details = action.payload;
    },
    saveError: (state, action) => {
      state.errors = action.payload;
    },
    saveLoading:(state, action) =>{
      state.loading = action.payload
    },
    setAuth:(state, action) =>{
      state.Auth = action.payload
    }
  },
});


// Action creators are generated for each case reducer function
export const { saveUser, saveDetails, saveError, saveLoading, setAuth } = authSlice.actions;

export default authSlice.reducer;