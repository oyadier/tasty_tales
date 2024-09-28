import { styled, Box, Typography, Link } from '@mui/material';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '../assets/facebook.svg';
import YoutubeIcon from '../assets/youtube.svg';

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  bottom: '0',
  backgroundColor: '#F5F5F5',
  display: 'flex',
  flexDirection: 'column',
  padding: '4em 1em 2em',
  margin: '0',
}));

const Containerr = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent:'space-between',
}));

const Typographyy = styled(Typography)({
  color: 'rgba(0,0,0,0.5)',
});

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'rgba(0,0,0,0.5)',
  textDecoration: 'none',
  display: 'block',
  '&:hover': {
    color: '#383838',
  },
}));

function Footer() {
  return (
    <StyledBox>
      <Containerr sx={{flexDirection:{md:'row',xs:'column'},px:6 }}>
        <Box sx={{ width: { sm: '100%', md: '31%' }}}>
          <Typographyy variant="body2">
            "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment."
          </Typographyy>
        </Box>
        <Containerr sx={{ width: { sm: '100%', md: '38%' },justifyContent:{sm:'space-around'}, margin:{xs:'1em 0 -2em'} }}>
          <Box>
            <Typography variant="subtitle1">Tastytales</Typography>
            <StyledLink>About Us</StyledLink>
            <StyledLink>Careers</StyledLink>
            <StyledLink>Contact Us</StyledLink>
            <StyledLink>Feedback</StyledLink>
          </Box>
          <Box>
            <Typography variant="subtitle1">Legal</Typography>
            <StyledLink>Terms</StyledLink>
            <StyledLink>Conditions</StyledLink>
            <StyledLink>Cookies</StyledLink>
            <StyledLink>Copyright</StyledLink>
          </Box>
          <Box>
            <Typography variant="subtitle1">Follow</Typography>
            <StyledLink>Facebook</StyledLink>
            <StyledLink>Twitter</StyledLink>
            <StyledLink>Instagram</StyledLink>
            <StyledLink>Youtube</StyledLink>
          </Box>
        </Containerr>
      </Containerr>
      <hr style={{ margin: '4em 3em 2em', color: '#383838' }} />
      <Containerr sx={{px:6}}>
           <Containerr>
                < Typographyy variant='caption'>© 2024 Tastytales-All rights reserved</ Typographyy>
            </Containerr>
            <Containerr sx={{width:{md:'13%',xs:'32%'}}}>
                <StyledLink><img src={FacebookIcon} alt="Facebook Icon" style={{ width: 20, height: 20 }}/></StyledLink>
                <StyledLink><XIcon fontSize='small' color='disabled'/></StyledLink>
                <StyledLink><InstagramIcon fontSize='small' color='disabled'/></StyledLink>
                <StyledLink><img src={YoutubeIcon} alt="Youtube Icon" style={{ width: 27, height: 27,alignSelf:'flex-start',marginTop: '-3px'}}/></StyledLink>
            </Containerr>
        </Containerr>
    </StyledBox>
  );
}

export default Footer;
