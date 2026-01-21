import { useState } from 'react';
import './App.css'
import Home from './Components/Home';
import { Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Register from "./Register.jsx";
import SystemAdmin from "./SystemAdmin.jsx";
import Newstores from './Newstores.jsx';
import Newuser from './Newuser.jsx';
import AddingAdmin from './AddAdmin.jsx';
import UserDetails from './Components/UserDetails.jsx';
import StoreDetails from './Components/StoreDetails.jsx';
import Normaluser from './Components/Normaluser.jsx';
import NUserRegitr from './Components/NUserRegitr.jsx';
import ListofStores from './Components/ListofStores.jsx';
import RegisterAdmin from './Components/RegisterAdmin.jsx'
function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/SysAdmin' element={< SystemAdmin />} />
          <Route path='/Addingstore' element={<Newstores />} />
          <Route path='/AddingUser' element={<Newuser />} />
          <Route path='/AddingAdmin' element={<AddingAdmin />} />
          <Route path='/Userdetails' element={<UserDetails />} />
          <Route path='/Storedetails' element={<StoreDetails />} />
          <Route path='/ListofStores' element={<ListofStores />} />
          <Route path='/Normaluser' element={<Normaluser />} />
          <Route path='/NUserRegitr' element={<NUserRegitr />} />
          <Route path='/Adminregister' element={<RegisterAdmin />} />

        </Routes>
      </div>
    </>
  )
}

export default App
