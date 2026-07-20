import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";




export const logoutAdmin = createAsyncThunk("admin/logout",async(_,thunkAPI)=>{
    try{
      const response = await api.post('/admin/logout');
      return response.data
    }
    catch(error:any){
        return thunkAPI.rejectWithValue(error.response?.data?.message||"Logout failed")
    }
})