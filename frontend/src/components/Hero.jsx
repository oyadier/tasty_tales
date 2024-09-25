import * as React from 'react';
import {Typography ,Box,styled,useMediaQuery} from '@mui/material'
import hero from '../assets/chorizo-mozarella-gnocchi-bake-cropped.jpg'

const Box1 = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap:'2em',
    padding: '78px 0 2em',
    width: '100%',
    
    overflow:'hidden',
    [theme.breakpoints.down(1000)]: {
      flexDirection:'column',
      justifyContent:'center'
    },
  }));
  
  

function Hero(){
  const isSmallScreen = useMediaQuery("(max-width:1000px)");
  
    return(
        <>
        <Box1>
            <Box sx={{display:'flex',justifyContent:isSmallScreen ?'center':'space-evenly',flexGrow:'1',flexDirection:'column',gap:'3em',height:'70%',pl:'24px'}}>
              <Typography variant='h4' fontWeight={700} maxWidth='95%'>Every dish tells a story, and every bite is a chapter worth savoring. In the kitchen, we don't just cook</Typography>
              <Typography variant='h5'fontWeight={700} maxWidth='90%' color='#ff6347'>—we craft tasty tales that linger on the palate and in the heart.</Typography>
            </Box>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexGrow:'1',px:'24px'}}>
            <Box component='img' src={hero} alt='hero' style={{ width:isSmallScreen ?'100%' : 'auto',borderRadius:'100%'}}/>
            </Box>
        </Box1>
        </>
    )
}

export default Hero;