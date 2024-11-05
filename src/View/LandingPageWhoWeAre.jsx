import { Box, Container, Grid } from "@mui/material";
import React from "react";
// import { who_we_are } from "../iconsImports";
import who_we_are from "../assets/landing-page-assets/who-we-are.png";
import { getActiveColor } from "../theme/setThemeColor";

const LandingPageWhoWeAre = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#E1EBEE",
        py: 12,
        px: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          marginTop: 1,
          width: "95%",
          backgroundColor: "#fff",
          mx: 0,
          borderRadius: "6px",
        }}
      >
        {/* <Grid container className="sectionBreake"> */}
        <Grid
          container
          className=""
          sx={{
            py: 6,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Grid lg={5} md={6} sm={12} xs={12} className="double-quots-mark-sm">
            <div
              className="landingPageHeadings animate__bounce"
              style={{ textAlign: "left", color: getActiveColor() }}
            >
              Who We are
              <Box
                style={{
                  width: "60px",
                  height: "10px",
                  backgroundColor: "#4E5555",
                }}
              ></Box>
            </div>
            <div className="landing-bg_para ">
              <Box
                component="div"
                className="shapedBg"
                sx={{
                  textAlign: "justify",
                }}
              >
                We provide payment solutions for banking (new bank account
                opening, cash deposits, cash withdrawals, emi deposits, credit
                card bill payments, and indo-nepal remittances), communication
                (prepaid & postpaid), entertainment (dth, ott), travel (bus,
                train, and flight), insurance (general insurance, health, life,
                term), and utilities for individuals, businesses, and
                corporations (electric, water, fastag, gas). We work with banks,
                financial institutions, and other service providers as
                associates. We use one platform to deliver all of our services.
              </Box>
            </div>{" "}
          </Grid>
          <Grid lg={5} md={6} sm={12} xs={12}>
            <img src={who_we_are} alt="who we are" width="100%"></img>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPageWhoWeAre;
