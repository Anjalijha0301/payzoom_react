import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoComponent from "./LogoComponent";
// import { Logo } from "../iconsImports";
// import { getEnv } from "../theme/setThemeColor";
import useCommonContext from "../store/CommonContext";
// import whiteLogo from "../assets/payzoom/logo_white.png";

import whiteLogo from "../assets/payzoom/payzoom_white_logo.png";

//change color on scroll
const theme2 = {
  // background: "rgba(255, 255, 255, 0)",
  background: "#1b4279",
  boxShadow: "none !Important",
  backdropFilter: "blur(0px)",
  color: "#000",
};
const theme = {
  background: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  color: "#000",
};
function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    style: trigger ? theme : theme2,
    elevation: trigger ? 4 : 0,
  });
}
ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
//menu items
const pagesLg = [
  { navItems: "About us", to: "/about-us", id: "about-us", sName: "aboutSec" },
  {
    navItems: "Our services",
    to: "/our-services",
    id: "our-services",
    sName: "servicesSec",
  },
  {
    navItems: "Our partners",
    to: "/our-partners",
    id: "our-partners",
    sName: "partnerSec",
  },
  {
    navItems: "Contact us",
    to: "/contact-us",
    id: "contact-us",
    sName: "contactSec",
  },
];
const pagesSm = [
  { navItems: "About us", to: "/about-us", sName: "aboutSec" },
  { navItems: "Our services", to: "/our-services", sName: "servicesSec" },
  { navItems: "Our partners", to: "/our-partners", sName: "partnerSec" },
  { navItems: "Contact us", to: "/contact-us", sName: "contactSec" },
  { navItems: "Login/Sign up", to: "/login", sName: "" },
];

export default function Navbar(props) {
  const { section } = useCommonContext();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        {/* <AppBar> */}
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                transition: "transform .2s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
                whiteLogo,
              }}
            >
              <LogoComponent src={whiteLogo} />
              {/* <img src={Logo} width="150px" alt="logo" /> */}
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                justifyContent: "left",
                textDecoration: "none",
                transition: "transform .2s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <LogoComponent />
            </Typography>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "right",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/* {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))} */}
                {pagesSm.map((item) => {
                  return (
                    <MenuItem className="navitems">
                      <Link
                        to={item.to}
                        onClick={() => {
                          handleCloseNavMenu();
                        }}
                        className="navLinks-sm"
                      >
                        {item.navItems}
                      </Link>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "end",
              }}
            >
              {pagesLg.map((item) => {
                return (
                  <MenuItem
                    className={`${item.sName === section ? "" : ""}`}
                    onClick={(id) => {
                      navigate(item.to);
                    }}
                  >
                    <Link className="navLinks">{item.navItems}</Link>
                  </MenuItem>
                );
              })}
              <Button
                // className="primary-button"
                className="transparent-button"
                sx={{ textTransform: "none" }}
                onClick={() => {
                  navigate("/login");
                }}
                variant="contained"
              >
                Login / Sign up
              </Button>
            </Box>
          </Toolbar>
        </Container>
        {/* </AppBar> */}
      </ElevationScroll>
      {/* <Toolbar /> */}
    </React.Fragment>
  );
}
