import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  FormControl,
  Typography,
  Divider,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Verification from "../component/Verification";
import Business from "../component/Business";
import Personal from "../component/Personal";
import Registration from "../component/Registration";
import ProgressBar from "../component/ProgressBar";
import LogoComponent from "../component/LogoComponent";
import { postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import {
  apiErrorToast,
  okErrorToast,
  okSuccessToast,
} from "../utils/ToastUtil";
import VerifyOtpLogin from "../modals/VerifyOtpLogin";
import AuthContext from "../store/AuthContext";
import Spinner from "../commons/Spinner";
import { getGeoLocation } from "../utils/GeoLocationUtil";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location", location && location.state.userStep);
  const [currentStep, setCurrentStep] = useState(0);
  const [hideNext, setHideNext] = useState(false);
  const [role, setRole] = useState("");
  //
  const [state, setState] = useState();
  const [district, setDistrict] = useState();
  const [gender, setGender] = useState();

  //
  const [bstate, setBstate] = useState();
  const [bdistrict, setBdistrict] = useState();
  const [request, setRequest] = useState(false);
  const [secureValidate, setSecureValidate] = useState("");
  const [handlerInfo, setHandlerInfo] = useState();
  const [username, setusername] = useState();
  const [verifStepSuccRes, setverifStepSuccRes] = useState();

  const [showError, setshowError] = useState(false);
  const authCtx = useContext(AuthContext);
  // const userLat = authCtx.location && authCtx.location.lat;
  // const userLong = authCtx.location && authCtx.location.long;
  const [tempData, setTempData] = useState();
  //
  const locationVal = getGeoLocation(
    (lat, long) => {
      authCtx.setLocation(lat, long);
      return [lat, long];
    },
    (err) => {
      okErrorToast("Location", err);
    }
  );

  useEffect(() => {
    locationVal();
    return () => {};
  }, []);

  useEffect(() => {
    const userStep = location && location.state && location.state.userStep;
    if (location.state) {
      if (userStep === 4) {
        setCurrentStep(1);
      } else if (userStep === 3) {
        setCurrentStep(2);
      }
      //  else if (userStep === 2) {
      //   setCurrentStep(3);
      // }
    }
  }, []);

  // console.log(role);

  // role === "ret"
  // ? "Enter your Distributer(Mobile)"
  // : role === "Dd"
  // ? "Enter your Asm(Mobile)"
  // : role === "Ad"
  // ? "Enter your Asm(Mobile)"
  // : "Enter Your Mobile"
  const handleClick = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    let data;

    if (currentStep === 0) {
      data = {
        name: `${form.fname.value} ${form.lname.value}`.toUpperCase(),
        username: form.mob.value,
        email: form.email.value,
        password: form.pass.value,
        role,
      };

      if (role === "Ad" || role === "Dd") {
        data.asm = handlerInfo && handlerInfo.id;
      } else {
        data.ad_id = handlerInfo && handlerInfo.id;
      }
    } else if (currentStep === 1) {
      data = {
        address: form.addr.value.toUpperCase(),
        state,
        district,
        pincode: form.pincode.value,
        pan: form.pan.value.toUpperCase(),
        gender,
      };
    } else if (currentStep === 2) {
      data = {
        business_address: form.baddress.value.toUpperCase(),
        business_district: bdistrict,
        business_name: form.bname.value.toUpperCase(),
        business_pincode: form.bpincode.value,
        business_state: bstate,
      };
      setTempData(data);
    }

    // else if (currentStep === 3) {
    //   data = {
    //     mobile: form.a_mob.value,
    //     pan: form.a_pan.value,
    //     aadhaar: form.aadhaar.value,
    //     email: form.email.value,
    //     latitude: userLat && userLat,
    //     longitude: userLong && userLong,
    //   };
    //   setTempData(data);
    // }
    // if (currentStep !== 3) {
    postJsonData(
      currentStep === 0
        ? ApiEndpoints.USER_REG
        : currentStep === 1
        ? ApiEndpoints.USER_PERSONALINFO
        : currentStep === 2
        ? ApiEndpoints.USER_BUSINESSINFO
        : // : currentStep === 3
          // ? ApiEndpoints.SIGN_UP_LAST
          "",
      data,
      setRequest,
      (res) => {
        // okSuccessToast("");
        if (currentStep === 0) {
          // console.log("first step data", res.data.message);
          const access = res?.data?.data?.api_token;
          authCtx.login(access);
          setSecureValidate("OTP");
          okSuccessToast(res.data.message);
        }
        if (currentStep === 1) {
          setCurrentStep(currentStep + 1);
        }
        if (currentStep === 2) {
          const data = res.data;
          okSuccessToast(data.message);
          navigate("/login");
          // setCurrentStep(currentStep + 1);
        }
        // if (currentStep === 3) {
        //   const data = res.data.data;
        //   setverifStepSuccRes(data);
        //   setSecureValidate("OTP");
        // }
      },
      (err) => {
        apiErrorToast(err);
        // if (currentStep === 3) {
        //   setSecureValidate("OTP");
        // }
      }
    );
    // }
  };

  return (
    <Grid
      container
      className="login-page position-relative"
      sx={{ p: { md: 2, lg: 2, sm: 1, xs: 1 } }}
    >
      {/* <Grid container className="login-page position-relative" sx={{ p: 2 }}> */}
      {/* <Spinner loading={loginRequest || userRequest} circleBlue /> */}
      <Grid
        className="login-form card-css"
        sx={{
          background: "#fff",
          p: { md: 3, lg: 3, sm: 2, xs: 2 },
          px: { md: 6, lg: 6, sm: 2, xs: 2 },
        }}
        lg={5}
        md={5.5}
        sm={7}
        xs={12}
      >
        <Grid item md={12} xs={12}>
          <Box sx={{ ml: { lg: 1, md: 1, sm: 1, xs: 0 } }}>
            <LogoComponent width="250rem" />
          </Box>
          <Typography
            sx={{
              width: "100%",
              my: 1,
              color: "#5e548e",
              fontWeight: "600",
              fontSize: "20px",
              mt: 1,
            }}
          >
            Create new account here
          </Typography>
        </Grid>
        <Grid item md={12} xs={12} sx={{ mt: 2 }}>
          <ProgressBar currentStep={currentStep} />
        </Grid>
        <Box component="form" id="loginForm" validate onSubmit={handleClick}>
          <Grid
            item
            md={12}
            xs={12}
            sx={{ height: "max-content", overflowY: "scroll" }}
          >
            {currentStep === 0 ? (
              <Registration
                setHideNext={setHideNext}
                setRole={setRole}
                role={role}
                handlerInfoCB={(val) => {
                  setHandlerInfo(val);
                }}
                setusername={setusername}
                setshowError={setshowError}
                showError={showError}
              />
            ) : currentStep === 1 ? (
              <Personal
                setHideNext={setHideNext}
                setState={setState}
                state={state}
                setDistrict={setDistrict}
                district={district}
                setGender={setGender}
                gender={gender}
              />
            ) : currentStep === 2 ? (
              <Business
                setHideNext={setHideNext}
                bstate={bstate}
                bdistrict={bdistrict}
                setBdistrict={setBdistrict}
                setBstate={setBstate}
              />
            ) : (
              // : currentStep === 3 ? (
              //   <Verification setHideNext={setHideNext} />
              // )
              ""
            )}
          </Grid>
          <Grid md={12} xs={12} sx={{ mt: 3 }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                // className={`${currentStep < 2 ? "" : "button-purple"}`}
                className="button-purple-no-imp"
                onClick={() => {
                  if (currentStep > 0) {
                    setCurrentStep(currentStep - 1);
                  }
                }}
                disabled={currentStep < 2}
                sx={{
                  backgroundColor: currentStep < 2 && "",
                  color: currentStep < 2 && "#000",
                }}
              >
                <ArrowBackIosIcon sx={{ fontSize: "15px" }} />
                Prev
              </Button>

              <Button
                form="loginForm"
                type="submit"
                className="button-red"
                sx={{ width: "max-content" }}
                disabled={
                  hideNext ||
                  showError === "Not Distributer" ||
                  showError === "Not Asm" ||
                  request
                }
              >
                {/* {currentStep === 3 ? "Sign Up" : "Next"} */}
                {currentStep === 2 ? "Sign Up" : "Next"}
                <Spinner loading={request} size="small" />
              </Button>
            </Box>
          </Grid>
        </Box>
        {/* already have an account section */}
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
              flexDirection: { md: "row", sm: "row", xs: "column" },
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: "600", opactiy: "0.6" }}
            >
              Already have an account?{" "}
            </Typography>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              className="otp-hover-purple"
              sx={{
                color: "#fff",
                fontSize: "11px !important",
                ml: 0.3,
                textTransform: "capitalize",
                padding: "2px 6px",
              }}
            >
              Login here
            </Button>
          </Box>

          <Divider orientation="vertical" flexItem />
          <Button
            className="otp-hover-purple"
            sx={{
              color: "#fff",
              fontSize: "11px !important",
              ml: 0.3,
              textTransform: "capitalize",
              padding: "2px 6px",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Back to home
          </Button>
        </Box>
        <VerifyOtpLogin
          secureValidate={secureValidate}
          setSecureValidate={setSecureValidate}
          setUserRequest={setRequest}
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          btn="Proceed"
          usedInSignUp
          username={username}
          verifStepSuccRes={verifStepSuccRes}
          data={tempData}
          showLaoder={false}
        />
      </Grid>
    </Grid>
  );
};

export default SignUp;
