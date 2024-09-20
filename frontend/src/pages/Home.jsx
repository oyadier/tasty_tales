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

export default Home;