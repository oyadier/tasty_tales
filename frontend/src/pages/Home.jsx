<<<<<<< HEAD
import * as React from 'react';
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Hero from '../components/Hero.jsx'
import List from '../components/List.jsx' 
import '../index.css'

function Home(){
    return(
    <>
   <Navbar/> 
    <Hero/>
    <List/>
    <Footer/>
    </>
    )
}    
=======
import * as React from "react";

import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";
import List from "../components/List.jsx";
import "../index.css";

function Home() {
  return (
    <>
      <Hero />
      <List />
      <Footer />
    </>
  );
}
>>>>>>> 430360ccde710b4e14e2332cef4b1096d92bd116

export default Home;