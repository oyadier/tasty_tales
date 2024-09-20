import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem ,styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';


const StyledAppBar = styled(AppBar)({
  position: 'fixed',
  backgroundColor:'white',
  height:'5em',
  boxShadow:'none',
  maxWidth:'800px',
  width:'100%',
  margin:'0 auto',
  right:'auto'
});

const StyledToolbar = styled(Toolbar)({
  display:'flex',
  justifyContent:'center',
  alignItems:'center',  
});

const StyledTypography = styled(Typography)({
  marginRight: '16px',
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'black',
  textDecoration: 'none',
  display: 'none',
  '@media (min-width: 800px)': {
    display: 'flex',
    justifyContent:'space-evenly',
  },
});

const StyledMenu = styled(Menu)({
  display: 'none',
  '@media (max-width: 899px)': {
    display: 'block',
  },
});

const StyledButton = styled(Button)({
  margin: '16px 2em',
  color: 'black',
  display: 'block',
  fontSize:'18px',
  '&:hover': {
  backgroundColor: '#fcfcfc'
  }
})

const StyledSearchIcon=styled(SearchIcon)({
  fontSize:35,
  color:'black',
  paddingRight:'0.8em',
  display: 'none',
  '@media (min-width: 900px)': {
    display: 'block',
  },
})

const StyledAvatar = styled(Avatar)({
});

const pages = ['Recipe Page', 'AboutUs'];
const settings = ['Profile', 'Logout'];


const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    
      <Box sx={{ display: 'flex', justifyContent: 'center'  }}>
      <StyledAppBar>
      <Container maxWidth="900px" sx={{ margin: '0 auto' }}>
        <StyledToolbar disableGutters>
          <StyledTypography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
          >
            LOGO
          </StyledTypography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <StyledMenu 
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </StyledMenu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mx: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },justifyContent: 'center',mx:{xs:'0',md:'4'},ml:'-10px'}}>
            {pages.map((page) => (
              <StyledButton
                key={page}
                onClick={handleCloseNavMenu}
              >
                {page}
              </StyledButton>
            ))}
          </Box>
          {/* <Box>
          <StyledSearchIcon/>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <StyledAvatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          <Box>
            <StyledButton>Login</StyledButton>
          </Box>
        </StyledToolbar>
        </Container>
        </StyledAppBar>
      </Box>
  );
};

export default Navbar;

