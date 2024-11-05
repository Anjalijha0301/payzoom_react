import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  InputAdornment,
  Divider,
  Typography,
} from "@mui/material";
import { get, getAxios, postJsonData } from "../network/ApiController";
import { apiErrorToast, okErrorToast } from "../utils/ToastUtil";
import AuthContext from "../store/AuthContext";
import ApiEndpoints, { BASE_URL } from "../network/ApiEndPoints";
import ForgotPass from "../modals/ForgotPass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { getGeoLocation } from "../utils/GeoLocationUtil";
import Spinner from "../commons/Spinner";
import { useEffect } from "react";
import VerifyOtpLogin from "../modals/VerifyOtpLogin";
import LogoComponent from "../component/LogoComponent";
import { PATTERNS } from "../utils/ValidationUtil";
// import { decryptData, encryptData } from "../utils/Encrypt";
import axios from "axios";
import { iconsGroupImg, LoginPageImage } from "../iconsImports";
import LoginSlider from "../component/LoginSlider";
import { SecondaryButton } from "../theme/Theme";
import { blackColor, whiteColor } from "../theme/setThemeColor";

const LoginPage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginRequest, setLoginRequest] = useState(false);
  const [showPass, setShowPass] = useState(0);
  const [userRequest, setUserRequest] = useState(false);
  const [secureValidate, setSecureValidate] = useState("test");
  const [username, setUsername] = useState("");
  const [isMobv, setIsMobv] = useState(true);

  const locationVal = getGeoLocation(
    (lat, long) => {
      authCtx.setLocation(lat, long);
      return [lat, long];
    },
    (err) => {
      okErrorToast("Location", err);
    }
  );

  // ###########################################################
  // ################## LOGIN FORM SUBMIT ######################
  // ###########################################################
  const handleClick = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      username: form.username.value,
      password: form.password.value,
    };

    axios.get(BASE_URL + ApiEndpoints.COOKIE, { withCredentials: true });
    if (authCtx && !authCtx.location) {
      apiErrorToast("User Denied Geolocation");
    } else {
      postJsonData(
        ApiEndpoints.SIGN_IN,
        data,
        setLoginRequest,
        (res) => {
          if (res && res.data && res.data.data && res.data.data === "MPIN") {
            setUsername(data.username);
            setSecureValidate("MPIN");
          }
          if (res && res.data && res.data.data && res.data.data === "OTP") {
            setUsername(data.username);
            setSecureValidate("OTP");
          } else if (res && res.data && res.data.access_token) {
            const access = res?.data?.access_token;
            authCtx.login(access);
            get(
              ApiEndpoints.GET_ME_USER,
              "",
              setUserRequest,
              (res) => {
                getAxios(access);
                const user = res.data.data;
                const docs = res?.data?.docs;
                if (docs && typeof docs === "object") {
                  authCtx.setDocsInLocal(docs);
                }
                authCtx.saveUser(user);

                if (user?.status === 1) {
                  if (user && user.role === "Admin") {
                    navigate("/admin/dashboard");
                  } else if (user && user.role === "Asm") {
                    navigate("/asm/dashboard");
                  } else if (user && user.role === "Ad") {
                    navigate("/ad/dashboard");
                  } else if (
                    user &&
                    (user.role === "Ret" || user.role === "Dd")
                  ) {
                    if (user?.layout === 1) {
                      navigate("/customer/dashboard", {
                        state: { login: true },
                      });
                    } else if (user?.layout === 2) {
                      navigate("/customer/services", {
                        state: { login: true },
                      });
                    } else {
                      navigate("/customer/dashboard", {
                        state: { login: true },
                      });
                    }
                  } else if (user && user.role === "Acc") {
                    navigate("/account/dashboard");
                  } else if (user && user.role === "Api") {
                    navigate("/api-user/dashboard");
                  } else {
                    navigate("/other/dashboard");
                  }
                } else {
                  navigate("/sign-up", { state: { userStep: user.status } });
                }
              },
              (error) => {
                apiErrorToast(error);
                authCtx.logout();
              }
            );
          }
        },
        (error) => {
          apiErrorToast(error);
        }
      );
    }
  };

  useEffect(() => {
    locationVal();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className="position-relative">
      <Grid container sx={{ height: "100vh" }}>
        <Spinner loading={loginRequest || userRequest} circleBlue />

        {/* the login form */}
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            p: 6,
            display: "flex",
            justifyContent: "center",
          }}
          className="login-background"
        >
          <Box sx={{ width: { md: "90%", sm: "100%", xs: "100%" } }}>
            <Grid
              component="form"
              id="loginForm"
              onSubmit={handleClick}
              container
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid item md={12} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    mt: 4,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "35px",
                      my: 1,
                      color: whiteColor(),
                      fontWeight: "600",
                    }}
                  >
                    Login
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "25px",
                      my: 1,
                      color: whiteColor(),
                      fontWeight: "bold",
                    }}
                  >
                    Welcome to PayZoom
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={12} xs={12} sx={{ mt: 6 }}>
                <FormControl
                  md={12}
                  sx={{ width: "100%", background: "white", color: "#1692ff" }}
                >
                  <TextField
                    label="Mobile Number"
                    id="username"
                    size="small"
                    type="number"
                    required
                    error={!isMobv}
                    helperText={!isMobv ? "Enter valid Mobile" : ""}
                    onChange={(e) => {
                      setIsMobv(PATTERNS.MOBILE.test(e.target.value));
                      if (e.target.value === "") setIsMobv(true);
                    }}
                    // onKeyDown={(e) => {
                    //   if (e.key === "+" || e.key === "-") e.preventDefault();
                    //   if (
                    //     e.target.value.length === 10 &&
                    //     e.key.toLowerCase() !== "tab"
                    //   ) {
                    //     if (e.key.toLowerCase() !== "backspace")
                    //       e.preventDefault();
                    //     if (e.key.toLowerCase() === "backspace") {
                    //     }
                    //   }
                    // }}
                    InputLabelProps={{ style: { color: "#000" } }}
                    // sx={{ background: "rgb(0 0 0 / 80%)" }}
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12} sx={{ mt: 4 }}>
                <FormControl sx={{ width: "100%", background: "white" }}>
                  <TextField
                    label="Password"
                    id="password"
                    size="small"
                    type={showPass === 0 ? "password" : "text"}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {showPass === 0 ? (
                            <FontAwesomeIcon
                              icon={faEyeSlash}
                              onClick={() => {
                                setShowPass(1);
                              }}
                              sx={{ color: "#dcdce2" }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faEye}
                              onClick={() => {
                                setShowPass(0);
                              }}
                              sx={{ color: "#dcdce2" }}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{ style: { color: "#000" } }}
                    // sx={{ background: "rgb(0 0 0 / 80%)" }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid md={12} xs={12} sx={{ mt: 2 }}>
              <FormControl sx={{ width: "100%", textAlign: "end" }}>
                <ForgotPass />
              </FormControl>
            </Grid>
            <Grid
              md={12}
              xs={12}
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <SecondaryButton
                form="loginForm"
                type="submit"
                // className="btn-background"
                sx={{
                  width: "80%",
                  textTransform: "capitalize",
                  color: "#fff",
                }}
              >
                Sign in
              </SecondaryButton>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { md: "row", sm: "row" },
                  justifyContent: "space-between",
                  mt: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ color: whiteColor(), fontWeight: "bold" }}>
                    Don't have an account?{" "}
                  </Typography>
                  <Button
                    // className="otp-hover-purple"
                    variant="text"
                    sx={{
                      fontSize: "14px !important",
                      fontWeight: "bold",
                      ml: 0.3,
                      textTransform: "capitalize",
                      padding: "2px 8px",
                      color: whiteColor(),
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      navigate("/sign-up");
                    }}
                  >
                    Register Here
                  </Button>
                </Box>

                <Divider orientation="vertical" flexItem />
                {/* <Button
              className="otp-hover-purple"
              sx={{
                color: "#0077b6",
                fontSize: "13px !important",
                textTransform: "capitalize",
                padding: "2px 8px",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Back to home
            </Button> */}
              </Box>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                height: "100%",
                maxHeight: { xs: "100px", md: "140px" },
              }}
            >
              <Typography
                onClick={() => window.open("/terms-conditions", "_blank")}
                sx={{
                  color: blackColor(),
                  "&:hover": {
                    cursor: "pointer",
                  },
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Terms and conditons
              </Typography>
              {"  "}{" "}
              <Box
                sx={{
                  fontWeight: "600",
                  mx: { md: "15px", xs: "5px" },
                  color: blackColor(),
                  fontSize: "14px",
                }}
              >
                /
              </Box>
              <Typography
                onClick={() => window.open("/privacy-policy", "_blank")}
                sx={{
                  color: blackColor(),
                  "&:hover": {
                    cursor: "pointer",
                  },
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Privacy Policy
              </Typography>
            </Box>
          </Box>
        </Grid>
        {/* the image */}
        <Grid
          item
          md={8}
          xs={12}
          sx={{
            // backgroundColor: "#ECF2F7",
            display: { md: "flex", sm: "none", xs: "none" },
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              mb: { lg: 6, md: 6, sm: 6, xs: 0 },
            }}
          >
            <LogoComponent width="250rem" />
          </Box>
          <LoginSlider />
          <div style={{ margin: "1rem" }}>
            <img src={LoginPageImage} alt="icons grp" width="80%" />
          </div>
          <div
            style={{
              textAlign: "left",
              color: blackColor(),
              width: "100%",
              padding: "0 2rem",
            }}
          >
            Copyright © PayZoom - All Rights Reserved | Powered By PayZoom
          </div>
        </Grid>

        {/* {(secureValidate === "mpin" || secureValidate === "otp") && ( */}
        <VerifyOtpLogin
          username={username}
          showLaoder={false}
          secureValidate={secureValidate}
          setSecureValidate={setSecureValidate}
          setUserRequest={setUserRequest}
          btn="Login"
        />
        {/* )} */}
      </Grid>
    </Box>
  );
};

export default LoginPage;
