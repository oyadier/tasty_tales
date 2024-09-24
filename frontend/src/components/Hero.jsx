import * as React from 'react';
import {Typography ,Box,styled} from '@mui/material'
import hero from '../assets/chorizo-mozarella-gnocchi-bake-cropped.jpg'

const Box1 = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: '2em auto',
    padding: '6em 0 2em',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      // width:'60%' ,
      flexDirection:'column'
    },
  }));
  
  const Img = styled(Box)({
    width: '27%',
    height: 'auto',
  });
  

function Hero(){
    return(
        <>
        <Box1>
            <Box sx={{width:'55%'}}>
              <Typography variant='h4' fontWeight={700}>Every dish tells a story, and every bite is a chapter worth savoring. In the kitchen, we don't just cook</Typography>
              <Typography variant='h5'fontWeight={700} color='#ff6347' pt={1}>—we craft tasty tales that linger on the palate and in the heart.</Typography>
            </Box>
            <Img component='img' src={hero} />
        </Box1>
        </>
    )
}

export default Hero;