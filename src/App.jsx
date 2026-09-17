import { Routes, Route } from "react-router-dom";
import Header from "../pages/Header";
import Home from "../pages/Home";
import Footer from "../pages/Footer";
import About from "../pages/About";
import "./App.css";
import Weddingfilm from "../pages/Weddingfilm";
import Weddings from "../pages/Weddings";
import Birthday from "../pages/Birthday";
import Prewedding from "../pages/Prewedding";
import Portraits from "../pages/Portraits";
import Booking from "../pages/Booking";
import Portfolio from "../pages/Portfolio";
import Contact from "../pages/Contact";

function App() {
  return (
    <div className="container">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/weddingfilm" element={<Weddingfilm/>}/>
        <Route path="/weddings" element={<Weddings/>}/>
        <Route path="/prewedding" element={<Prewedding/>}/>
        <Route path="/birthday" element={<Birthday/>}/>
                <Route path="/booking" element={<Booking/>}/>
        <Route path="/portraits" element={<Portraits/>}/>

        <Route path="/contact" element={<Contact/>}/>
                <Route path="/portfolio" element={<Portfolio/>}/>


      </Routes>
      <Footer/>
    </div>
  );
}

export default App;