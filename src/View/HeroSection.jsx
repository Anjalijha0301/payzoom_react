import { Box, Button, Grid } from "@mui/material";
import React from "react";
import heroSectionImage from "../assets/landing-page-assets/hero_imge_illustration_payzoom.png";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      className="hero-section hero-section-footer"
      sx={{ px: { md: 0, sm: 2, xs: 2 } }}
    >
      <Grid
        item
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: {
            md: "flex-end",
            sm: "flex-start",
            xs: "flex-start",
          },
        }}
      >
        <Box
          className="hero-section-text"
          sx={{ width: { md: "80%", xs: "90%" } }}
        >
          <h1>
            Make your Online <span style={{ color: "#CB0101" }}>Payment</span>{" "}
            Safer & <span className="underlined-text">Comfortable</span>
          </h1>
          <p>
            New Age Payment Solution Platform For Individuals, Business Owners &
            Corporations.
          </p>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/login");
              }}
              sx={{
                px: 5.5,
                py: 1.5,
                mr: 1,
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "1.1rem",
              }}
              className="transparent-button"
            >
              {" "}
              Login Here
            </Button>
            <Button
              variant="text"
              sx={{
                textTransform: "none",
                color: "#fff",
                ml: 2,
                fontSize: "1.1rem",
              }}
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.payzoom.cm",
                  "_blank"
                )
              }
              startIcon={
                <Icon
                  icon="ion:logo-google-playstore"
                  style={{ fontSize: "30px" }}
                />
              }
            >
              {" "}
              Download App
            </Button>
          </div>
        </Box>
      </Grid>
      <Grid
        item
        md={6}
        sx={{ display: { md: "block", sm: "none", xs: "none" } }}
      >
        <img
          src={heroSectionImage}
          alt="hero-section"
          loading="lazy"
          width="90%"
          height="auto"
        />
      </Grid>
    </Grid>
  );
};

export default HeroSection;
