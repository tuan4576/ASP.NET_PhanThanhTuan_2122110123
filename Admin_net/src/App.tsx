import { Outlet } from "react-router"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

function App() {

  return (
    <>
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar/>
      <div className="overflow-visible flex flex-col flex-1 ml-64 ">
        <Header/>
        <Outlet/>
      </div>
    </div>
    </>
  )
}

export default App