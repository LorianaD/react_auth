import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import RegisterForm from './components/RegistersForm'
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';

function App() {

  return (
    <>
    {/* Active le systeme de router */}
      <BrowserRouter>
      {/* Défini le conteneur des routes */}
        <Routes>
          {/* Route pour register */}
          <Route path='/register' element={< RegisterForm />} />
          <Route path='/login' element={< LoginForm />} />
          <Route path='/profile' element={< Profile />} />
          {/* Si aucune route ne correspond -> register */}
          <Route path='*' element={<Navigate to="/login"/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App