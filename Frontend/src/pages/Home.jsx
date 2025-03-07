import React from 'react'
import NavbarMenu from '../Components/Navbar'
import FooterComponent from '../Components/Footer'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <>
    <div className="w-full h-auto">
    <NavbarMenu />
    {Outlet}
    <FooterComponent />
    </div>
    </>
  )
}

export default Home