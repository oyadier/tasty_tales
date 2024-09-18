import { styled, Container, Box, Typography, Link } from '@mui/material';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from './assets/facebook.svg';
import YoutubeIcon from './assets/youtube.svg';

const StyledBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    bottom: '0',
    backgroundColor: '#F5F5F5',
    padding: '4em 1em 2em',
}));

const FooterGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '2em',
    [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr', // Three columns on larger screens
    },
}));

const Typographyy = styled(Typography)(({ theme }) => ({
    color: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    marginBottom: '1em',
}));

const StyledLink = styled(Link)(({ theme }) => ({
    color: 'rgba(0, 0, 0, 0.5)',
    textDecoration: 'none',
    display: 'block',
    textAlign: 'center',
    '&:hover': {
        color: '#383838',
    },
}));

const SocialLinksContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: '1em',
    marginTop: '2em',
}));

function Footer() {
    return (
        <StyledBox>
            <Container>
                <FooterGrid>
                    <Box>
                        <Typographyy variant='body2'>
                            "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment."
                        </Typographyy>
                    </Box>
                    <Box>
                        <Typography variant='subtitle1' align='center'>Tastytales</Typography>
                        <StyledLink>About Us</StyledLink>
                        <StyledLink>Careers</StyledLink>
                        <StyledLink>Contact Us</StyledLink>
                        <StyledLink>Feedback</StyledLink>
                    </Box>
                    <Box>
                        <Typography variant='subtitle1' align='center'>Legal</Typography>
                        <StyledLink>Terms</StyledLink>
                        <StyledLink>Conditions</StyledLink>
                        <StyledLink>Cookies</StyledLink>
                        <StyledLink>Copyright</StyledLink>
                    </Box>
                    <Box>
                        <Typography variant='subtitle1' align='center'>Follow</Typography>
                        <StyledLink>Facebook</StyledLink>
                        <StyledLink>Twitter</StyledLink>
                        <StyledLink>Instagram</StyledLink>
                        <StyledLink>YouTube</StyledLink>
                    </Box>
                </FooterGrid>
                <hr style={{ margin: '4em 0', color: '#383838' }} />
                <Typographyy variant='caption' align='center'>
                    © 2024 Tastytales - All rights reserved
                </Typographyy>
                <SocialLinksContainer>
                    <StyledLink>
                        <img src={FacebookIcon} alt="Facebook Icon" style={{ width: 20, height: 20 }} />
                    </StyledLink>
                    <StyledLink>
                        <XIcon fontSize='small' color='disabled' />
                    </StyledLink>
                    <StyledLink>
                        <InstagramIcon fontSize='small' color='disabled' />
                    </StyledLink>
                    <StyledLink>
                        <img src={YoutubeIcon} alt="YouTube Icon" style={{ width: 27, height: 27 }} />
                    </StyledLink>
                </SocialLinksContainer>
            </Container>
        </StyledBox>
    );
}

export default Footer;
