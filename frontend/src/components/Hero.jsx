import * as React from 'react';
import {Container ,Box,styled} from '@mui/material'
import hero from './assets/hero.png'

const Box1=styled(Box)({
     display:'flex',
     justifyContent:'center',
     alignItems:'center',
     height:'auto',
     maxWidth: '900px', 
     width: 'auto',
     margin:'2em auto',
     padding:'0'
})

const Box2 = styled(Box)(({ theme }) => ({
    width: '100%', 
    height: 'auto', 
    maxWidth: '90%', 
    [theme.breakpoints.up('sm')]: {
        maxWidth: '80%', 
    },
    [theme.breakpoints.up('md')]: {
        maxWidth: '90%', 
    },
}));

function Hero(){
    return(
        <>
        <Box1 >
            <Box2 component='img' src={hero}></Box2>
        </Box1>
        </>
    )
}

export default Hero;