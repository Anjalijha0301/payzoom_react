import {
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box } from "@mui/system";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import { contact_us, moSupport } from "../iconsImports";
import { PATTERNS } from "../utils/ValidationUtil";
import {
  getActiveColor,
  getEnv,
  getFirmAddress,
  getFirmContact,
  getFirmEmail,
  getTertiaryColor,
} from "../theme/setThemeColor";

const LandingContactUsPage = () => {
  const [isEmailv, setIsEmailv] = useState(true);
  const [isMobv, setIsMobv] = useState(true);
  const [name, setName] = useState("");

  const isLetters = (str) => /^[A-Za-z]*$/.test(str);

  const onInputChange = (e) => {
    const { value } = e.target;
    if (isLetters(value)) {
      setName(value);
    }
  };

  const envValue = getEnv();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    let data;

    data = {
      first_name: form.c_fname.value,
      mobile: form.c_mobile.value,
      email: form.c_email.value,
      city: form.c_city.value,
      company: form.c_company.value,
      message: form.c_message.value,
    };
    console.log(data);
  };
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div id="contact-us">
      <div className={envValue !== "MoneyOddr" && "builSecurity_bg "}>
        {envValue !== "MoneyOddr" && (
          <Grid xs={12} className="servicePageBg">
            <Box
              component="div"
              className="pageHead"
              sx={{ textAlign: "center" }}
            >
              Get in Touch
            </Box>
            <div className="landingPageSubHeading">
              We can ensure realiability, low cost fores and most important,
              with safty and comfort in mind
            </div>
          </Grid>
        )}
        <Grid>
          <Container maxWidth="lg">
            {envValue !== "MoneyOddr" && (
              <Grid container sx={{ mt: { lg: 18, md: 18, sm: 18, xs: 30 } }}>
                <Grid
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{ px: 5, mt: { lg: 0, md: 0, sm: 3, xs: 3 } }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
                    }}
                  >
                    <LocationOnIcon
                      sx={{
                        color: getActiveColor(),
                        fontSize: "2rem",
                        mt: 2,
                      }}
                    />
                    <div
                      className="landing-bg_para"
                      style={{ textAlign: "center", fontWeight: 500 }}
                    >
                      OUR MAIN OFFICE
                    </div>
                    <Box
                      component="div"
                      className="landing-bg_para "
                      sx={{
                        textAlign: "center",
                        color: "#fff",
                        px: { xs: 4, md: 4 },
                        py: { xs: 0, sm: 2, lg: 2 },
                        backgroundColor: getActiveColor(),
                        height: "150px",
                      }}
                    >
                      {getFirmAddress()}
                    </Box>
                  </Card>
                </Grid>
                <Grid
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{ px: 5, mt: { lg: 0, md: 0, sm: 3, xs: 3 } }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
                    }}
                  >
                    <PhoneAndroidIcon
                      sx={{
                        color: getActiveColor(),
                        fontSize: "2rem",
                        mt: 2,
                      }}
                    />
                    <div
                      className="landing-bg_para"
                      style={{ textAlign: "center", fontWeight: 500 }}
                    >
                      PHONE NUMBER
                    </div>
                    <Box
                      component="div"
                      className="landing-bg_para "
                      sx={{
                        textAlign: "center",
                        color: "#fff",
                        p: 5,
                        backgroundColor: getActiveColor(),
                        height: "150px",
                        minHeight: "150px",
                      }}
                    >
                      {getFirmContact()}
                    </Box>
                  </Card>
                </Grid>{" "}
                <Grid
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{ px: 5, mt: { lg: 0, md: 0, sm: 3, xs: 3 } }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
                    }}
                  >
                    <EmailIcon
                      sx={{
                        color: getActiveColor(),
                        fontSize: "2rem",
                        mt: 2,
                      }}
                    />
                    <div
                      className="landing-bg_para"
                      style={{ textAlign: "center", fontWeight: 500 }}
                    >
                      EMAIL
                    </div>
                    <Box
                      component="div"
                      className="landing-bg_para text-lowercase"
                      sx={{
                        textAlign: "center",
                        color: "#fff",
                        p: 5,
                        backgroundColor: getActiveColor(),
                        height: "150px",
                      }}
                    >
                      {getFirmEmail()}
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            )}

            {/* contact form */}

            <Grid container xs={12} className="sectionBreake">
              <Grid lg={7} md={12} sm={12} xs={12}>
                <Card
                  sx={{
                    p: 5,
                    mb: 10,
                    boxShadow:
                      "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
                  }}
                  className="shapedBg line-bg-card"
                >
                  <Box className="landingPageHeadings">Contact Us !</Box>
                  <Box
                    component="form"
                    id="contact"
                    sx={{ width: "100%" }}
                    onSubmit={handleSubmit}
                    validate
                  >
                    <Grid container>
                      <Grid lg={6} md={6} sm={12} xs={12} sx={{ pr: 1 }}>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            id="c_fname"
                            label="Full Name"
                            variant="standard"
                            type="text"
                            value={name}
                            onChange={onInputChange}
                            required
                            // onKeyDown={(e) => {
                            //   console.log(PATTERNS.NAME.test(e.target.value));
                            //   if (e.key.toLowerCase() !== "backspace") {
                            //     if (e.target.value.length > 2) {
                            //       if (!PATTERNS.NAME.test(e.target.value)) {
                            //         e.preventDefault();
                            //       }
                            //     }
                            //   }
                            // }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid lg={6} md={6} sm={12} xs={12} sx={{ pl: 1 }}>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            id="c_mobile"
                            label="Mobile Number"
                            variant="standard"
                            error={!isMobv}
                            required
                            helperText={!isMobv ? "Enter a valid mobile" : ""}
                            onChange={(e) => {
                              setIsMobv(PATTERNS.MOBILE.test(e.target.value));
                              if (e.target.value === "") setIsMobv(true);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "+" || e.key === "-") {
                                e.preventDefault();
                              }
                              if (e.target.value.length === 10) {
                                if (e.key.toLowerCase() !== "backspace")
                                  e.preventDefault();
                                if (e.key.toLowerCase() === "backspace") {
                                }
                              }
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid lg={6} md={6} sm={12} xs={12} sx={{ mt: 2, pr: 1 }}>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            id="c_email"
                            label="Email Id"
                            variant="standard"
                            error={!isEmailv}
                            required
                            helperText={!isEmailv ? "Enter a valid email" : ""}
                            onChange={(e) => {
                              setIsEmailv(PATTERNS.EMAIL.test(e.target.value));
                              if (e.target.value === "") setIsEmailv(true);
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid lg={6} md={6} sm={12} xs={12} sx={{ mt: 2, pl: 1 }}>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            id="c_city"
                            label="City"
                            variant="standard"
                            required
                          />
                        </FormControl>
                      </Grid>
                      <Grid lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            id="c_company"
                            label="Company/Organization"
                            variant="standard"
                            required
                          />
                        </FormControl>
                      </Grid>
                      <Grid lg={12} md={12} sm={12} xs={12} sx={{ mt: 5 }}>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            multiline
                            id="c_message"
                            aria-label="minimum height"
                            rows={3}
                            label="Your Message"
                            style={{ width: "100%" }}
                            required
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      form="contact"
                      variant="contained"
                      sx={{ width: "100%", mt: 3 }}
                      className="primary-button"
                    >
                      Submit
                    </Button>
                  </Box>
                </Card>
              </Grid>
              {envValue !== "MoneyOddr" && (
                <Grid
                  lg={5}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{ pt: 15, display: { md: "block", xs: "none" } }}
                >
                  <img src={contact_us} alt="Contact us" width="100%" />
                </Grid>
              )}
            </Grid>
          </Container>
        </Grid>
      </div>
    </div>
  );
};

export default LandingContactUsPage;
