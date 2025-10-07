
import { Outlet } from 'react-router'
import './App.css'

function App() {


  return (
    <>
      <h1>Header</h1>
      <Outlet></Outlet>
      <h1>Footer</h1>
    </>
  )
}

export default App
