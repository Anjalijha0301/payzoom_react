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
import ApiEndpoints from "../network/ApiEndPoints";
import ForgotPass from "../modals/ForgotPass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { getGeoLocation } from "../utils/GeoLocationUtil";
import Spinner from "../commons/Spinner";
import { useEffect } from "react";
import VerifyOtpLogin from "../modals/VerifyOtpLogin";
import LogoComponent from "../component/LogoComponent";
import { PATTERNS } from "../utils/ValidationUtil";

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
  const handleClick = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      username: form.username.value,
      password: form.password.value,
    };

    // const encryptformData = encryptData(data);
    // console.log("encryptformData", encryptformData);
    // setTimeout(() => {
    //   console.log("decrypt", decryptData(encryptformData));
    // }, 2000);
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
                  } else if (user && user.role === "Zsm") {
                    navigate("/zsm/dashboard");
                  } else if (user && user.role === "Ad") {
                    navigate("/ad/dashboard");
                  } else if (user && user.role === "Md") {
                    navigate("/md/dashboard");
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
    <Grid container className="login-page position-relative" sx={{ p: 2 }}>
      <Spinner loading={loginRequest || userRequest} circleBlue />
      <Grid
        className="card-css"
        sx={{ background: "#fff", p: 6, width: { lg: "40%" } }}
      >
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
            <FormControl md={12} sx={{ width: "100%" }}>
              <Box
                sx={{
                  ml: { lg: 1, md: 1, sm: 1, xs: 0 },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <LogoComponent width="250rem" />
              </Box>
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12} sx={{ mt: 4 }}>
            <FormControl
              md={12}
              sx={{ width: "100%", background: "white", color: "#1692ff" }}
            >
              <TextField
                label="Phone Number"
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
                onKeyDown={(e) => {
                  if (e.key === "+" || e.key === "-") e.preventDefault();
                }}
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
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEye}
                          onClick={() => {
                            setShowPass(0);
                          }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
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
          <Button
            form="loginForm"
            type="submit"
            className="btn-background"
            sx={{ width: "80%", textTransform: "capitalize" }}
          >
            Sign in
          </Button>

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
              <Typography>Don't have an account? </Typography>
              <Button
                className="otp-hover-purple"
                sx={{
                  color: "#fff",
                  fontSize: "13px !important",
                  ml: 0.3,
                  textTransform: "capitalize",
                  padding: "2px 8px",
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
  );
};

export default LoginPage;
