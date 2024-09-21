import * as React from 'react';
import {Container ,Box,styled} from '@mui/material'
import hero from '../assets/hero.png'

const Box1 = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2em auto',
    paddingTop: '3em',
    maxWidth: '800px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '500px', 
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '250px', 
    },
  }));
  
  const Box2 = styled(Box)({
    width: '100%',
    height: 'auto',
  });
  

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