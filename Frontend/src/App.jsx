import './App.css'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    <>
    <div className="flex flex-col items-center justify-center h-full">
     <Outlet />
    </div>
    </>
  )
}

export default App
