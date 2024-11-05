import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { disti, joinus, joinus2, ret } from "../iconsImports";
import { useNavigate } from "react-router-dom";
import { getEnv } from "../theme/setThemeColor";
import CheckIcon from "@mui/icons-material/Check";
const becomeRetData = [
  {
    title: "Attractive Commision",
    body: "Firstly, it provides a lucrative source of income through attractive commissions on various financial services and transactions. ",
  },
  {
    title: "Customer Expansion",
    body: " By offering digital banking services including mobile banking and bill payments, you can attract more customers to your store to increase the footfall and potential cross-selling opportunities. ",
  },
  {
    title: "Multiple Services",
    body: "The convenience factor is undeniable, as you can provide seamless banking services such as account openings, money transfers, and balance inquiries through user-friendly digital platforms.    ",
  },
  {
    title: "Business Branding",
    body: "By joining as a retailer with us will increase your brand image and credibility which will give you a competitive edge over the traditional retailers by positioning you as a modern and innovative business.",
  },
];
const LandingPartnersPage = () => {
  const envValue = getEnv();
  const navigate = useNavigate();
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  console.log("envValue", envValue);
  return (
    <>
      <div id="our-partners">
        <Container maxWidth="lg">
          <Grid
            container
            xs={12}
            className={envValue === "MoneyOddr" ? "" : "sectionBreake"}
          >
            <Grid lg={6} md={6} className="shapedBg">
              <div className="landing-bg_main_font">
                Join
                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                  {getEnv() === "MoneyOddr" ? "MoneyOddR" : "PayZoom"}
                </span>
                Network & Expand your Distributor Business & Earn Extra Income
              </div>
              <Box className="d-flex justify-content-center">
                <Button
                  className="button-purple"
                  sx={{
                    width: "200px",
                    p: 1,
                    mt: 5,
                    display: "block",
                    fontSize: "18px",
                  }}
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                >
                  Join Now
                </Button>
              </Box>

              {/* <Box
                component="div"
                sx={{
                  width: "100px",
                  height: "12px",
                  backgroundColor: "#4E5555",
                }}
              ></Box> */}
            </Grid>

            <Grid
              lg={6}
              md={6}
              sx={{ display: "flex", textalign: "center" }}
              className="top2Bottom"
            >
              <img src={joinus} alt="Join us" width="100%"></img>
            </Grid>
          </Grid>
        </Container>

        <div className="body_Wave_bg sectionBreake">
          <Container maxWidth="lg" sx={{ py: 5 }}>
            <Grid container xs={12} className="sectionBreake">
              <Grid
                item
                lg={4}
                md={4}
                sm={12}
                xs={12}
                className="sectionBreake"
              >
                <div
                  className="landingPageHeadings "
                  style={{
                    textAlign: "left",
                  }}
                >
                  Why become a
                  <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                    PayZoom
                  </span>
                  Retailer ?
                </div>
                <Box
                  component="div"
                  sx={{
                    width: "100px",
                    height: "12px",
                    backgroundColor: "#4E5555",
                  }}
                ></Box>
                <div
                  className="landing-bg_para"
                  style={{ textAlign: "justify" }}
                >
                  {getEnv()} has always been Vocal for the Local shopkeepers.
                  Through {getEnv()}, more than 4,00,000 retailers have served
                  around 3crore unique customers in 2,300+ cities. {getEnv()}
                  has increased retailers monthly earning as well as customer's
                  footfall.
                </div>
              </Grid>
              <Grid
                item
                lg={4}
                md={4}
                sm={12}
                xs={12}
                className="sectionBreake top2Bottom"
                sx={{ pl: { lg: 3, md: 3, sm: 3, xs: 3 } }}
              >
                <Card
                  className="cards "
                  sx={{
                    width: "80%",
                    height: "auto",
                    ml: 3,
                    px: 2,
                    display: "flex",
                    alignItems: "center",
                    color: "#fff",
                  }}
                >
                  <strong>
                    Become Aatmanirbhar Dukaandar and earn Rs.16,000 extra every
                    month
                  </strong>
                </Card>
                <Card
                  className="cards login-background"
                  sx={{
                    width: "80%",
                    height: "auto",

                    ml: 3,
                    px: 1,
                    display: "flex",
                    alignItems: "center",
                    mt: 3,
                    backgroundColor: "#fff",
                    color: "#000",
                    boxShadow:
                    "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
                  }}
                >
                  <Box component="div" sx={{ color: "#fff", fontWeight: 600 }}>
                    No charges to use {getEnv()} Service
                  </Box>
                </Card>
                <Card
                  className="cards login-background"
                  sx={{
                    width: "80%",
                    height: "auto",
                    ml: 3,
                    mt: 3,
                    px: 1,
                    display: "flex",
                    alignItems: "center",
                    color: "#000",
                  }}
                >
                  <Box component="div" sx={{ color: "#fff", fontWeight: 600 }}>
                    Earn token on every transaction, which helps in boosting
                    their earnings
                  </Box>
                </Card>
              </Grid>
              <Grid
                className="top2Bottom"
                lg={4}
                md={4}
                sm={12}
                xs={12}
                sx={{ pl: { lg: 0, md: 0, sm: 3, xs: 3 } }}
              >
                <Card
                  className="cards login-background"
                  sx={{
                    width: "80%",
                    height: "auto",
                    ml: 3,
                    mt: 3,
                    display: "flex",
                    alignItems: "center",
                    px: 1,
                    backgroundColor: "#fff",
                    color: "#000",
                    boxShadow:
                      "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
                  }}
                >
                  <Box component="div" sx={{ color: "#fff", fontWeight: 600 }}>
                    Our Platform is Easy, Fast & Secure to use
                  </Box>
                </Card>
                <Card
                  className="cards login-background"
                  sx={{
                    width: "80%",
                    height: "auto",
                    ml: 3,
                    mt: 3,
                    px: 1,
                    display: "flex",
                    alignItems: "center",
                    color: "#000",
                  }}
                >
                  <Box component="div" sx={{ color: "#fff", fontWeight: 600 }}>
                    Earn token on every transaction, which helps in boosting
                    their earnings
                  </Box>
                </Card>

                <Card
                  className="cards login-background"
                  sx={{
                    width: "80%",
                    height: "auto",
                    ml: 3,
                    px: 1,
                    display: "flex",
                    alignItems: "center",
                    mt: 3,
                    backgroundColor: "#fff",
                    color: "#000",
                    boxShadow:
                      "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
                  }}
                >
                  <Box component="div" sx={{ color: "#fff", fontWeight: 600 }}>
                    All services in One App Loan facility available for
                    retailers
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>

        <div
          style={{
            backgroundColor: "#CDC9FF",
          }}
        >
          <Container maxWidth="lg" sx={{ pb: 10 }}>
            <Grid container xs={12}>
              <Grid
                md={7}
                lg={7}
                sm={12}
                xs={12}
                className="sectionBreake"
                sx={{ pt: 3, px: 3 }}
              >
                <div
                  className="landingPageHeadings"
                  style={{ textAlign: "left" }}
                >
                  Why become a {getEnv()} Distributor ?
                </div>
                <Box
                  component="div"
                  sx={{
                    width: "100px",
                    height: "12px",
                    backgroundColor: "#4E5555",
                  }}
                ></Box>
                {envValue === "MoneyOddr" ? (
                  <Box
                    className="landing-bg_para"
                    sx={{
                      textAlign: "justify",
                      width: {
                        lg: "100%",
                        md: "100%",
                        sm: "100%",
                        xs: "100%",
                      },
                    }}
                  >
                    <Box
                      className="landing-bg_para"
                      sx={{
                        textAlign: "justify",
                        width: {
                          lg: "100%",
                          md: "100%",
                          sm: "100%",
                          xs: "100%",
                        },
                      }}
                    >
                      Join us as a Distributor and transform your retailer
                      network into a powerhouse of success. MoneyOddR is your
                      gateway to the future of digital banking, offering
                      unparalleled opportunities for growth and financial
                      empowerment. Say goodbye to costly investments, physical
                      stores, and staffing concerns. With our platform, your
                      retailers can provide essential financial services like
                      money transfer, recharges, bill payment and AEPS services
                      to customers, and both you and your retailers can earn
                      attractive commissions. We provide comprehensive training
                      and support, ensuring your retailers make the most of our
                      cutting-edge technology. Embrace the digital revolution,
                      revolutionise your business, and start your journey of
                      increased earnings while empowering others. Join us today
                      and unlock a world of possibilities.
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "left",
                        mt: 2,
                        mb: 3,
                      }}
                    >
                      <Button
                        className="button-purple"
                        onClick={() => {
                          navigate("/sign-up");
                        }}
                      >
                        Join us Now
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    className="landing-bg_para"
                    sx={{
                      textAlign: "justify",
                      width: {
                        lg: "80%",
                        md: "80%",
                        sm: "100%",
                        xs: "100%",
                      },
                    }}
                  >
                    We at {getEnv()} intend to improve our distributors earning
                    potential by enabling them to grow their business and make
                    the best out of their retail network with
                    {getEnv()}
                    services Not only the {getEnv()} Distributor, but any
                    distributor can download the distributor1 app. It will help
                    you make your daily business easy and effective. Our
                    Distributors not only have easy access to manage their KHATA
                    but also all the retailers under them. They can check the
                    retailer’s performances and identify the high and low
                    performers.
                    {getEnv()} Distributors have easy & convenient access to buy
                    and sell all the service kits at the tap of a button and
                    also transfer the balance to their retailers
                  </Box>
                )}
              </Grid>
              <Grid md={5} lg={5} sm={12} xs={12} className="sectionBreake">
                <img src={joinus2} alt="become distributor" width="90%"></img>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
};

export default LandingPartnersPage;
