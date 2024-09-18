import * as React from 'react';
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Hero from './Hero.jsx'
import List from './List.jsx'
import './index.css'

function App(){
    return(
    <>
   <Navbar/> 
    <Hero/>
    {/* <List/> */}
    <Footer/>
    </>
    )
}    

export default App;