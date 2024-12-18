import { Box, Container, Grid, IconButton } from "@mui/material";
import React from "react";
import { PrimaryButton, SecondaryButton } from "../theme/Theme";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { lp_illustration } from "../iconsImports";
import { useNavigate } from "react-router-dom";
import { getEnv, secondaryColor } from "../theme/setThemeColor";
import { useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";

const LandingPageIntro = () => {
  const navigate = useNavigate();
  const [env, setEnv] = useState(getEnv());
  return (
    <Box
      className="landing-bg"
      id="landing-intro"
      sx={{
        backgroundSize: { md: "cover", xs: "contain" },
        height: "max-content",
      }}
    >
      <Container maxWidth="xl">
        <Grid container xs={12} sx={{ px: { md: 8, sm: 1 } }}>
          <Grid md={env === "ImpsGuru" || env === "PaisaKart" ? 6 : 12} sm={12}>
            <Box container sx={{ mt: 20 }}>
              <div className="lineUp">
                <div
                  className="landing-bg_main_font"
                  style={{ textAlign: env === "MoneyOddr" ? "center" : "left" }}
                >
                  Welcome To
                </div>
                <div 
                className="landing-bg_biggpay_font">
                  {process.env.REACT_APP_TITLE === "MoneyOddr" ? (
                    <>
                      <span className="header_money_text"> Money</span>
                      <span
                        className="header_oddr_text"
                        style={{
                          color: secondaryColor(),
                          marginLeft: "10px",
                        }}
                      >
                        OddR
                      </span>
                    </>
                  ) : (
                    process.env.REACT_APP_TITLE
                  )}
                </div>
              </div>
              <div className="lineUpDelay">
                {process.env.REACT_APP_TITLE === "MoneyOddr" ? (
                  <div className="mt-4">
                    <main className="landing_intro">
                      <p style={{ fontSize: "23px" }}>
                        An Emerging Digital Payment Platform For
                      </p>
                      <section className="animation mt-3">
                        <div className="animText">
                          <div>INDIVIDUALS</div>
                        </div>
                        <div className="animText">
                          <div>BUSINESSMEN</div>
                        </div>
                        <div className="animText">
                          <div>CORPORATIONS</div>
                        </div>
                      </section>
                    </main>
                  </div>
                ) : (
                  <div className="landing_intro">
                    New Age Payment Solution Platform For Individuals, Business
                    Owners & Corporations.
                  </div>
                )}

                {process.env.REACT_APP_TITLE !== "MoneyOddr" && (
                  <Box
                    component="div"
                    sx={{
                      textAlign: env === "MoneyOddr" ? "center" : "left",
                      mt: 1,
                      mb: 3,
                    }}
                  >
                    <IconButton
                      className="pulse-effect"
                      aria-label="delete"
                      sx={{
                        backgroundColor: "#fff",
                        marginRight: "0.5rem",
                        color: "#415d43",
                      }}
                    >
                      <FacebookRoundedIcon />
                    </IconButton>
                    <IconButton
                      className="pulse-effect"
                      aria-label="delete"
                      sx={{
                        backgroundColor: "#fff",
                        marginRight: "0.5rem",
                        color: "#415d43",
                      }}
                    >
                      <InstagramIcon />
                    </IconButton>
                    <IconButton
                      className="pulse-effect"
                      aria-label="delete"
                      sx={{
                        backgroundColor: "#fff",
                        marginRight: "0.5rem",
                        color: "#415d43",
                      }}
                    >
                      <TwitterIcon />
                    </IconButton>
                  </Box>
                )}
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    flexDirection: {
                      lg: "row",
                      md: "row",
                      sm: "row",
                      xs: "column",
                    },
                    mb: 2,
                    mt: env === "MoneyOddr" ? 7 : 3,
                    alignItems: env === "MoneyOddr" ? "center" : "left",
                    justifyContent: env === "MoneyOddr" ? "center" : "left",
                  }}
                >
                  <PrimaryButton
                    variant="contained"
                    size="large"
                    
                    sx={{
                      mr: { xs: env === "MoneyOddr" ? 0 : 2, md: 2 },
                      mb: { md: 0, xs: 2 },
                    }}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login Here
                    
                  </PrimaryButton>
                  <SecondaryButton
                    variant="contained"
                    size="large"
                    className="button-red"
                    href={
                      env === "MoneyOddr"
                        ? ""
                        : "https://play.google.com/store/apps/details?id=com.cm.paisakart"
                    }
                    target="_blank"
                  >
                    Download App
                  </SecondaryButton>
                </Box>
              </div>
            </Box>
          </Grid>
          {env !== "MoneyOddr" && (
            <Grid
              md={6}
              sm={12}
              sx={{
                display: { xs: "none", sm: "none", md: "block" },
                mt: 20,
              }}
            >
              <img
                src={lp_illustration}
                alt="illustration"
                width="90%"
                height="auto"
                style={{
                  backgroundColor: getEnv() === "PaisaKart" ? "#fff" : "",
                  borderRadius: getEnv() === "PaisaKart" ? "50%" : "",
                }}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPageIntro;
