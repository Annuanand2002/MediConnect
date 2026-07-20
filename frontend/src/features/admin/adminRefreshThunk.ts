import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";



export const refershAdmin = createAsyncThunk("admin/refresh",
    async (_,thunkAPI)=>{
        try{
            const response = await api.post("/admin/refresh-token");
            return response.data;
        }
        catch(error:any){
            return thunkAPI.rejectWithValue(error.response?.data?.message||"Refresh failed")
        }
    }
)