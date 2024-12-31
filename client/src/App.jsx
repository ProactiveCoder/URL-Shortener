import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Shortener from './pages/shortener';
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
 

  return (
    <>
    <BrowserRouter>
        <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/shortener" element={<Shortener/>}/>
      </Routes>
        <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
