import api from "../services/axios";
import { store } from "../app/store";
import { refershAdmin } from "../features/admin/adminRefreshThunk";
import { logout } from "../features/admin/adminSlice";


api.interceptors.request.use((config)=>{
    const token = store.getState().admin.accessToken;
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
},
(error)=>
    Promise.reject(error)
);
api.interceptors.response.use((response)=>response,
async(error)=>{
    const originalRequest = error.config;
    if(originalRequest.url === "/admin/refresh-token" || originalRequest.url === "/admin/logout"){
        store.dispatch(logout())
        return Promise.reject(error);
    }
    if(error.response?.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
    
    try{
        const result = await store.dispatch(refershAdmin());
        if(refershAdmin.fulfilled.match(result)){
            const token = result.payload.accessToken;
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
        }
        store.dispatch(logout());
    }catch{
        store.dispatch(logout());
    }
}
    return Promise.reject(error);
}
)