import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate } from "react-router-dom";
import { getActiveColor } from "../theme/setThemeColor";
import servicesIllus from "../assets/landing-page-assets/services-illus.png";

const LandingPageWeOffer = () => {
  const navigate = useNavigate();
  const weOffer = [
    {
      icon: (
        <MobileFriendlyIcon
          onClick={() => {
            navigate("/our-services");
          }}
        />
      ),
      head: "BILL PAYMENT AND RECHARGE",
      para: "Get you prepaid mobile/tv/ott recharged instantly with earning opportunities on every transaction. Do best recharge with updated plans & offers. ",
      color: "#7396B4",
    },
    {
      icon: <AccountBalanceIcon />,
      head: "BANKING",
      para: "We offer new account opening(axis bank), Indo-Nepal remittances, account deposit, withdrawal, balance enquiry, bulk transfer, payout solution. Mini atm within a single app.",
      color: "#E5EBF0",
    },
    {
      icon: <VolunteerActivismIcon />,
      head: "INSURANCE",
      para: "Get the best quote for your insurance requirements for life , health & vehicle insurance. Merchants can earn competitive commision on each policy booking.",
      color: "#7396B4",
    },
    {
      icon: <ReceiptIcon />,
      head: "UTILITY",
      para: "Instant update all your utility bill payments including electricity, water & gas bill, credit card bills, emi installments, wallet top-ups.",
      color: "#E5EBF0",
    },
  ];
  return (
    // <Box className="sectionBreake whoWeAre_bg">
    <Box className="whoWeAre_bg" sx={{ backgroundColor: "#E1EBEE" }}>
      <Container maxWidth="lg" sx={{ mt: 7 }}>
        <Grid container xs={12}>
          <Grid
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              component="div"
              sx={{ margin: "0 auto", px: { lg: 4, md: 3, sm: 0, xs: 0 } }}
            >
              <div
                className="landingPageHeadings "
                style={{ display: "flex", justifyContent: "left" }}
              >
                What We Offer
              </div>
              <div
                className="landingPageSubHeading"
                style={{
                  display: "flex",
                  textAlign: "left",
                }}
              >
                A consumer-friendly solution for mobile recharge, money
                transfer, and bill paying
              </div>
              <div
                className="landingPagePara"
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginTop: "15px",
                  textAlign: "justify",
                }}
              >
                Open a savings account, buy stocks and mutual funds, pay your
                bills, recharge, reserve flights and movie tickets, and much
                more.With us anyone can be paid anywhere. Pay securely and
                without a card in-person or online with the Paytm Wallet or
                directly from your bank account. You can also send and receive
                money from anyone.
              </div>
            </Box>
            <img
              src={servicesIllus}
              alt="services"
              loading="lazy"
              width="100%"
              height="auto"
            />
          </Grid>
          <Grid
            md={6}
            sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#fff",
                py: 6,
                width: { md: "80%", sm: "100%", xs: "100%" },
              }}
            >
              {weOffer &&
                weOffer.map((item) => {
                  return (
                    <Grid item md={12} lg={12}>
                      <Card
                        sx={{
                          backgroundColor: item.color,

                          mx: 3,
                          // my: 2,
                          // py: 3,
                          // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                          "&:hover": {
                            boxShadow:
                              "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                            // borderRadius: "20px",
                          },
                        }}
                      >
                        <CardContent
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            color: item.color === "#7396B4" ? "#fff" : "#000",
                          }}
                        >
                          <div style={{ textAlign: "left", width: "50%" }}>
                            <Typography
                              sx={{
                                mb: 1.5,
                                fontWeight: "bold",
                                color: "#1b4279",
                              }}
                            >
                              {item.head}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "#555c6", fontSize: "13px" }}
                            >
                              {item.para}
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              sx={{
                                fontSize: 14,
                                backgroundColor: getActiveColor(),
                                width: "70px",
                                height: "70px",
                                padding: "20px",
                                borderRadius: "50%",
                                margin: "0 auto",
                                mb: 2,
                              }}
                              gutterBottom
                            >
                              <span style={{ color: "#fff" }}>{item.icon}</span>
                            </Typography>
                            <Button
                              onClick={() => {
                                navigate("/our-services");
                              }}
                              size="small"
                              sx={{
                                fontWeight: "bold",
                                color: getActiveColor(),
                              }}
                            >
                              Learn More
                            </Button>
                          </div>
                        </CardContent>
                      </Card>{" "}
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPageWeOffer;
