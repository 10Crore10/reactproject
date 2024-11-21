import React from 'react'
import { BrowserRouter, Routes,Router ,Route } from 'react-router-dom';
import HeroSection from './component/pages/HeroSection';
import Header from './component/Header';
import Register from './component/pages/Register';
import Login from './component/pages/Login';
import Footer from './component/Footer';
import Dashborde from './component/pages/Dashborde';
function  App() {
  return (
    <BrowserRouter>
    <Header/>
   
      <Routes> 
    <Route path='/' Component={HeroSection} />
    <Route path='/register' Component={Register} />
    <Route path='/login' Component={Login} />
    <Route path='/dashboard' Component={Dashborde} />

    </Routes>
    
    <Footer/>
    </BrowserRouter>
  )
}

export default App;