import React from "react";
import { Box, Grid, Container, Typography } from "@mui/material";
import {
  facebook,
  insta,
  linkdin,
  Logo,
  payzoomLogoWhiteImg,
  twitter,
} from "../iconsImports";
import { useNavigate } from "react-router-dom";

import {
  firmMoto,
  getFirmAddress,
  getFirmContact,
  getFirmEmail,
} from "../theme/setThemeColor";

// eslint-disable-next-line no-unused-vars
const handleClickScroll = (id) => {
  if (id === "landing-intro") {
    document
      .getElementById("landing-intro")
      .scrollIntoView({ behavior: "smooth" });
  }
  if (id === "about-us") {
    let ele = document.getElementById("about-us");
    window.scrollTo(0, ele.offsetTop, { behavior: "smooth" });
  }
  if (id === "contact-us") {
    document
      .getElementById("contact-us")
      .scrollIntoView({ behavior: "smooth" });
  }
  if (id === "our-services") {
    document
      .getElementById("our-services")
      .scrollIntoView({ behavior: "smooth" });
  }
  if (id === "our-partners") {
    document
      .getElementById("our-partners")
      .scrollIntoView({ behavior: "smooth" });
  }
  if (id === "landing-intro") {
    document
      .getElementById("landing-intro")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }
};

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box component="div" className="footer">
      <Container maxWidth="lg">
        <Grid container xs={12}>
          <Grid lg={5} md={5} sm={12} xs={12}>
            <Box
              component="div"
              sx={{
                width: {
                  lg: "80%",
                  md: "80%",
                  sm: "90%",
                  xs: "90%",
                },
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <img
                  style={{
                    borderRadius: "4px",
                    padding: "2px",
                  }}
                  src={payzoomLogoWhiteImg}
                  alt="logo"
                  width="230px"
                />
              </div>
              <div
                className="address-style"
                style={{ marginTop: "15px", whiteSpace: " pre-line" }}
              >
                {getFirmAddress()}
              </div>
              <div className="address-style" style={{ marginTop: "15px" }}>
                {firmMoto()}
              </div>
              {process.env.REACT_APP_TITLE !== "PayZoom" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                  }}
                >
                  <img
                    src={facebook}
                    alt="facebook"
                    width="40px"
                    height="40px"
                    className="hover-zoom mr-3"
                    style={{ marginRight: "3px" }}
                  />
                  <img
                    src={linkdin}
                    alt="linkdin"
                    width="40px"
                    height="40px"
                    className="hover-zoom mr-3"
                    style={{ marginRight: "3px" }}
                  />
                  <img
                    src={twitter}
                    alt="twitter"
                    width="40px"
                    height="40px"
                    className="hover-zoom mr-3"
                    style={{ marginRight: "3px" }}
                  />
                  <img
                    src={insta}
                    alt="instagram"
                    width="40px"
                    height="40px"
                    className="hover-zoom mr-3"
                    style={{ marginRight: "3px" }}
                  />

                  {/* <span className="icon-bg">
                  <FacebookIcon />
                </span>
                <span className="icon-bg">
                  <LinkedInIcon />
                </span>
                <span className="icon-bg">
                  <InstagramIcon />
                </span>
                <span className="icon-bg">
                  <TwitterIcon />
                </span> */}
                </div>
              )}
            </Box>
          </Grid>
          <Grid container lg={7} md={7}>
            <Grid
              lg={4}
              md={4}
              sm={4}
              xs={12}
              sx={{
                pl: { lg: 4, md: 4, sm: 1, xs: 1 },
                mt: { lg: 0, md: 0, sm: 5, xs: 5 },
              }}
            >
              <div className="footer-head-text">Company</div>
              <div
                className="text-style"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </div>
              <div
                className="text-style"
                onClick={() => {
                  navigate("/about-us");
                }}
              >
                About US
              </div>
              <div
                className="text-style"
                onClick={() => {
                  navigate("/contact-us");
                }}
              >
                Contact Us
              </div>
            </Grid>
            <Grid
              lg={4}
              md={4}
              sm={4}
              xs={12}
              sx={{
                pl: { lg: 4, md: 4, sm: 1, xs: 1 },
                mt: { lg: 0, md: 0, sm: 5, xs: 5 },
              }}
            >
              <div className="footer-head-text">Company</div>
              <div
                className="text-style"
                onClick={() => {
                  window.open("/terms-conditions", "_blank");
                }}
              >
                Terms & Condition
              </div>
              <div
                className="text-style"
                onClick={() => {
                  window.open("/privacy-policy", "_blank");
                }}
              >
                Privacy Policy
              </div>
              <div
                className="text-style"
                onClick={() => {
                  window.open("/refund-policy", "_blank");
                }}
              >
                Refund Policy
              </div>
            </Grid>
            <Grid
              lg={4}
              md={4}
              sm={4}
              xs={12}
              sx={{
                pl: { lg: 4, md: 4, sm: 1, xs: 1 },
                mt: { lg: 0, md: 0, sm: 5, xs: 5 },
              }}
            >
              <div className="footer-head-text">Contact Us</div>
              <div className="text-style">{getFirmContact()}</div>
              <div className="text-style text-lowercase">{getFirmEmail()}</div>
            </Grid>
            <Grid
              md={12}
              sx={{ textAlign: "left", px: { xs: 0, md: 4 }, mt: 1 }}
            >
              <Typography sx={{ color: "#fff", fontSize: "14px", mt: 1 }}>
                <span>
                  Copyright 2021 Design & Developed by Webplat Technologies Pvt
                  Ltd.
                </span>
                {/* <span className="mx-1">© Copyright 2023</span>
                {process.env.REACT_APP_TITLE}
                <span className="mx-1">
                  Solutions Pvt Ltd. All Rights Reserve
                </span> */}
              </Typography>
              <Typography sx={{ color: "#fff", fontSize: "14px", mt: 0.5 }}>
                Disclaimer:  Any dispute arising under these terms and
                conditions shall be subject to the jurisdiction of the courts of
                Delhi.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
