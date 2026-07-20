import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../services/axios"


export const loginAmdin = createAsyncThunk("admin/login",
    async({email,password}:{email:string,password:string},thunkAPI)=>{
        try{
            const response = await api.post('/admin/login',{
                email,
                password
            });
            return response.data;
        }
        catch(err:any){
            return thunkAPI.rejectWithValue(err.response?.data?.message||"login failed")
        }
    }
)


