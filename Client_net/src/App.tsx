import { Outlet } from "react-router"
import Footer from "./components/layout/Footer"
import Header from "./components/layout/Header"

function App() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}
export default App
