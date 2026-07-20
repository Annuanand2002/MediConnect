import { useEffect } from 'react';
import './App.css'
import { useAppDispatch } from './hooks/reduckHook'
import AdminRoute from './routes/admin.route'
import { refershAdmin } from './features/admin/adminRefreshThunk';


function App() {
  const dispatch = useAppDispatch();
  useEffect(()=>{
     dispatch(refershAdmin())
  },[dispatch])
  return <AdminRoute />
}

export default App
