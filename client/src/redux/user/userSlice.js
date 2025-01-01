import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        singInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        singInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
    },
})

export const {signInStart,singInSuccess,singInFailure} =userSlice.actions;
 export default userSlice.reducer;