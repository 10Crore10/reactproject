import React, { useEffect } from 'react'
import Sidebar from '../Sidebar'
import Card from '../Card'
import { useNavigate } from 'react-router-dom';

const Dashborde = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    useEffect(()=>{
        if(!token){
        navigate("/login")
        }
    },[token])
  return (
    <div  className='flex justify-between gap-4 px-4 flex-wrap m-4'>
        <Sidebar/>
        <Card/>
        <Card/>
        
    </div>
  )
}

export default Dashborde