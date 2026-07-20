import { createSlice } from "@reduxjs/toolkit";
import { loginAmdin } from "./adminThunk";
import { refershAdmin } from "./adminRefreshThunk";
import { logoutAdmin } from "./adminLogoutThunk";

interface AdminState {
    admin : any | null;
    accessToken : string;
    isAuthenticated : boolean;
    loading : boolean;
    checkingAuth :boolean;
    error : string;
}

const initialState : AdminState = {
    admin : null,
    accessToken : "",
    isAuthenticated : false,
    loading : false,
    checkingAuth : true,
    error : ""
}

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers : {
    logout : (state)=>{
        state.admin = null;
        state.accessToken = "";
        state.isAuthenticated = false;
        state.checkingAuth = false;
        state.loading = false
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(loginAmdin.pending,(state)=>{
        state.loading = true;
        state.error = "";
    })
    .addCase(loginAmdin.fulfilled,(state,action)=>{
        state.loading = false;
        state.admin = action.payload.admin;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
    })
    .addCase(loginAmdin.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload as string;
    })
    builder
    .addCase(refershAdmin.pending,(state)=>{
        state.loading = true;
        state.error = ""
        state.checkingAuth = true;
    })
    .addCase(refershAdmin.fulfilled,(state,action)=>{
        state.loading = false
        state.checkingAuth = false;
        state.admin = action.payload.admin;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
    })
    .addCase(refershAdmin.rejected,(state)=>{
        state.loading = false;
        state.checkingAuth = false;   
        state.isAuthenticated = false
    })
    .addCase(logoutAdmin.pending,(state)=>{
        state.loading = true;
        state.error = ""
    })
    .addCase(logoutAdmin.fulfilled,(state)=>{
        state.loading = false;
        state.admin = null;
        state.accessToken = "";
        state.isAuthenticated = false
        state.checkingAuth = false;
    })
    .addCase(logoutAdmin.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload as string
    })
  }
})




export const { logout } = adminSlice.actions;
export default adminSlice.reducer;