import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// Custom styles for the components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  backgroundColor: "#fff",
  boxShadow: "none",
  width: "100%",
  top: "0",
  zIndex: 1100,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  padding: "0 24px",
  [theme.breakpoints.up("md")]: {
    padding: "0 48px",
  },
}));

const StyledLogo = styled(Link)(({ theme }) => ({
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "#000",
  textDecoration: "none",
  fontSize: "24px", // Adjusted for larger screens
  display: "inline-flex", // Ensure it only takes the width of the content
  alignItems: "center", // Align text to center vertically (optional)
  justifyContent: "center", // Align text to center horizontally (optional)
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px", // Smaller font for mobile screens
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "0 1em",
  color: "#000",
  textTransform: "none",
  fontSize: "18px", // Slightly larger font for clarity
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#f7f7f7",
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  margin: "0 1em",
  color: "#000",
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  textTransform: "none",
  fontSize: "18px", // Slightly larger font for clarity
  fontWeight: 500,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  cursor: "pointer",
}));

const sections = ["Home", "About Us", "Contact Us"];

const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    navigate("/");
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (section) => {
    navigate(section);
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Clear the token from cookies
    removeCookie("token", { path: "/" });
    navigate("/login");
  };

  return (
    <nav>
      <StyledAppBar position="static">
        <StyledToolbar disableGutters>
          {/* Logo */}
          <StyledLogo to="/home">TASTY TALES</StyledLogo>

          {/* Home Section Links (Desktop) */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {sections.map((section) => (
              <StyledLink key={section}>{section}</StyledLink>
            ))}
          </Box>
          {cookies.token ? (
            /* User Avatar Menu */
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open options">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <StyledAvatar alt="Profile Avatar" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                disableScrollLock
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                <MenuItem onClick={() => handleCloseUserMenu("/my-recipes")}>
                  <Typography>{"my recipes"}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography>{"logout"}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            /* Login Button  */
            <Box>
              <StyledLink onClick={() => navigate("/login")}>Login</StyledLink>
            </Box>
          )}

          {/* Mobile Menu (Hamburger) */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ color: "#000", padding: 0 }} // Remove padding
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {sections.map((section) => (
                <MenuItem key={section} onClick={handleCloseNavMenu}>
                  <Typography>{section}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </StyledToolbar>
      </StyledAppBar>
    </nav>
  );
};

export default Navbar;
