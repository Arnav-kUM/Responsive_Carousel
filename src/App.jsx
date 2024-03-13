import { useState } from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import Carousel from './Components/Carousel'

function App() {
  return (
    <>   
    <div className='h-screen w-screen justify-center flex flex-col'>

        <div className='z-40 fixed w-full top-0'>
          <NavBar/>
        </div>
        <div className=''>
          <Carousel/>
        </div>
    </div>
     
    </>
  )
}

export default App
