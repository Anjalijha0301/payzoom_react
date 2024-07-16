import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  FormControl,
  TextField,
  MenuItem,
  Typography,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import { PATTERNS } from "../utils/ValidationUtil";
// import VerifyOtpLogin from "../modals/VerifyOtpLogin";
import { get } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Registration = ({
  setHideNext,
  role = "",
  setRole,
  handlerInfoCB,
  setusername,
  setshowError,
  showError,
}) => {
  const [isMobv, setIsMobv] = useState(true);
  const [isEmailv, setIsEmailv] = useState(true);
  const [request, setRequest] = useState();
  const [infoHandler, setinfoHandler] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [vaidPass, setValidPass] = useState(true);

  // console.log(showError, infoHandler);

  const handlerNumb = useRef("");

  useEffect(() => {
    setHideNext(!(isMobv && isEmailv));
  }, [isMobv, isEmailv]);

  useEffect(() => {
    if (infoHandler) {
      if (
        (role === "Dd" || role === "Ad") &&
        infoHandler &&
        infoHandler.role === "Asm"
      ) {
        // console.log("dd asm");
        setshowError("Is Asm");
      } else if (role === "Ret" && infoHandler && infoHandler.role === "Ad") {
        // console.log("is Ad");
        setshowError("Is Area Distributer");
      } else if (
        (role === "Dd" || role === "Ad") &&
        infoHandler &&
        infoHandler.role !== "Asm"
      ) {
        setshowError("Not Asm");
      } else if (role === "Ret" && infoHandler && infoHandler.role !== "Ad") {
        // console.log("not distributer");
        setshowError("Not Distributer");
      } else {
        // console.log("else");
        setshowError(false);
      }
    }
  }, [infoHandler]);

  const getHandlerInfo = (number) => {
    // console.log("called");
    get(
      ApiEndpoints.GET_HANDLER_DETAILS,
      // { role: role === "Ad" ? "Asm" : "", username: number },
      `username=${number}`,
      setRequest,
      (res) => {
        setinfoHandler(res.data.data);
        if (handlerInfoCB) handlerInfoCB(res.data.data);
      },
      (err) => {}
    );
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container style={{ marginTop: "10px" }} spacing={2}>
      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
        <FormControl
          md={12}
          sx={{ width: "100%", background: "white", color: "#1692ff" }}
        >
          <TextField
            label="First Name"
            id="fname"
            size="small"
            required
            inputProps={{ style: { textTransform: "uppercase" } }}
          />
        </FormControl>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
        <FormControl
          md={12}
          sx={{ width: "100%", background: "white", color: "#1692ff" }}
        >
          <TextField
            label="Last Name"
            id="lname"
            size="small"
            required
            inputProps={{ style: { textTransform: "uppercase" } }}
          />
        </FormControl>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
        <FormControl
          md={12}
          sx={{ width: "100%", background: "white", color: "#1692ff" }}
        >
          <TextField
            label="Mobile"
            id="mob"
            size="small"
            required
            type="number"
            error={!isMobv}
            helperText={!isMobv ? "Enter valid Mobile" : ""}
            onChange={(e) => {
              setIsMobv(PATTERNS.MOBILE.test(e.target.value));
              if (e.target.value === "") setIsMobv(true);
              if (setusername) setusername(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "+" || e.key === "-") e.preventDefault();
              if (e.target.value.length === 10) {
                if (e.key.toLowerCase() !== "backspace") e.preventDefault();
                if (e.key.toLowerCase() === "backspace") {
                }
              }
            }}
          />
        </FormControl>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
        <FormControl
          md={12}
          sm={12}
          xs={12}
          sx={{ width: "100%", background: "white", color: "#1692ff" }}
        >
          <TextField
            label="Email id"
            id="email"
            size="small"
            required
            error={!isEmailv}
            helperText={!isEmailv ? "Enter valid Email" : ""}
            onChange={(e) => {
              setIsEmailv(PATTERNS.EMAIL.test(e.target.value));
              if (e.target.value === "") setIsEmailv(true);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
        <FormControl
          variant="outlined"
          size="small"
          md={12}
          sm={12}
          xs={12}
          sx={{ width: "100%", background: "white", color: "#1692ff" }}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="pass"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            error={!vaidPass}
            helperText={!vaidPass ? "Enter valid Password" : ""}
            onChange={(e) => {
              setValidPass(PATTERNS.PASSWORD.test(e.target.value));
              if (e.target.value === "") setValidPass(true);
            }}
          />
        </FormControl>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "10px",
            color: "black",
            fontWeight: "bold",

            textAlign: "left",
          }}
        >
          (*Note: Password must be alphanumeric, With One Special Character, min
          8 characters)
        </Typography>
        {/* <FormControl sx={{ width: "100%", background: "white" }}>
          <TextField label="Password" id="pass" size="small" required />
        </FormControl> */}
      </Grid>

      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
        <FormControl
          md={12}
          sx={{ width: "100%", background: "white", color: "#1692ff" }}
        >
          <TextField
            select
            label="Register as"
            id="reg"
            size="small"
            required
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setinfoHandler(null);
              setshowError(false);
              if (handlerNumb.current.value) {
                handlerNumb.current.value = "";
              }
            }}
          >
            <MenuItem value="Ret">
              <div style={{ textAlign: "left" }}>Retailer</div>
            </MenuItem>
            <MenuItem value="Dd">
              <div style={{ textAlign: "left" }}>Direct Dealer</div>
            </MenuItem>
            <MenuItem value="Ad">
              <div style={{ textAlign: "left" }}>Distributor</div>
            </MenuItem>
          </TextField>
        </FormControl>
      </Grid>
      {role !== "" && (
        <>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <FormControl sx={{ width: "100%", background: "white" }}>
              <TextField
                label={
                  role === "Ret"
                    ? "Enter your Distributer(Mobile)"
                    : role === "Dd"
                    ? "Enter your Asm(Mobile)"
                    : role === "Ad"
                    ? "Enter your Asm(Mobile)"
                    : "Enter Your Mobile"
                }
                inputRef={handlerNumb}
                // onChange={(e) => {
                //   if (handlerNumb.current.value.length === 10) {
                //     getHandlerInfo(handlerNumb.current.value);
                //   }
                // }}
                onChange={(e) => {
                  if (handlerNumb.current.value.length === 10) {
                    getHandlerInfo(handlerNumb.current.value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "+" || e.key === "-") e.preventDefault();
                  if (e.target.value.length === 10) {
                    if (e.key.toLowerCase() !== "backspace") e.preventDefault();
                    if (e.key.toLowerCase() === "backspace") {
                    }
                  }
                }}
                id="handler"
                size="small"
                required
              />
            </FormControl>
          </Grid>

          {showError === "Is Asm" && (
            <Typography sx={{ ml: 2, fontSize: "12px" }}>
              {" "}
              Your Asm is {infoHandler && infoHandler.name}
            </Typography>
          )}
          {showError === "Is Area Distributer" && (
            <Typography sx={{ ml: 2, fontSize: "12px" }}>
              {" "}
              Your Ad is {infoHandler && infoHandler.name}
            </Typography>
          )}
          {showError === "Not Asm" && (
            <Typography sx={{ ml: 2, color: "red", fontSize: "12px" }}>
              {infoHandler && infoHandler.name} is {showError}
            </Typography>
          )}
          {showError === "Not Distributer" && (
            <Typography sx={{ ml: 2, color: "red", fontSize: "12px" }}>
              {infoHandler && infoHandler.name} is {showError}
            </Typography>
          )}

          {/* {showError === "not Area Distributer" || showError === "not Asm" ? (
            <Typography sx={{ ml: 2, color: "red", fontSize: "12px" }}>
              {infoHandler && infoHandler.name} is {showError}
            </Typography>
          ) : showError === false && !infoHandler ? (
            ""
          ) : (
            <Typography sx={{ ml: 2, fontSize: "12px" }}>
              {" "}
              Your Asm is {infoHandler && infoHandler.name}
            </Typography>
          )} */}
        </>
      )}
    </Grid>
  );
};

export default Registration;
