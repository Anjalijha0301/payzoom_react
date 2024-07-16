/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Grid,
  Button,
  FormControl,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { postJsonData } from "../network/ApiController";
import Spinner from "../commons/Spinner";
import { primaryColor, getEnv } from "../theme/setThemeColor";
import { useState } from "react";
import { PATTERNS } from "../utils/ValidationUtil";
import ModalHeader from "../modals/ModalHeader";
import ModalFooter from "../modals/ModalFooter";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VerifyOtpLogin from "../modals/VerifyOtpLogin";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  fontFamily: "Poppins",
  p: 2,
  height: "max-content",
  overflowY: "scroll",
};

const OutletRegistration = ({ refresh, btn, autoOpen = false }) => {
  const currentStep = 3;
  const [open, setOpen] = useState(false);
  const [isConsent, setIsConsent] = useState(false);
  const [isValMob, setIsValMob] = useState(true);
  const [request, setRequest] = useState(false);
  // const [otpCallback, setOtpCallback] = useState(false);
  const [initiateData, setInitiateData] = useState();
  const user = useContext(AuthContext);
  const userLat = user.location.lat && user.location.lat;
  const userLong = user.location.long && user.location.long;

  const [secureValidate, setSecureValidate] = useState("");
  const [tempData, setTempData] = useState();
  const envName = getEnv();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsValMob(true);
    setIsConsent(false);
  };

  const outletRegistration = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      mobile: form.mobile.value,
      pan: form.pan.value,
      aadhaar: form.aadhaar.value,
      email: form.emailId.value,
      bankAccountNo: form.bankAccountNo.value,
      bankIfsc: form.bankIfsc.value,
      latitude: userLat,
      longitude: userLong,
    };
    setTempData(data);
    postJsonData(
      ApiEndpoints.AEPS_INITIATE,
      data,
      setRequest,
      (res) => {
        okSuccessToast(res?.data?.message);
        setInitiateData(res?.data?.data);
        setSecureValidate("OTP");
        // handleClose();
        if (refresh) refresh();
      },
      (error) => {
        apiErrorToast(error);
        // handleClose();
      }
    );
  };

  const validateSignup = () => {
    const data = {
      otpReferenceID: initiateData && initiateData.otpReferenceID,
      hash: initiateData && initiateData.hash,
      // otp: otpCallback,
    };
    postJsonData(
      ApiEndpoints.AEPS_VALIDATE,
      data,
      setRequest,
      (res) => {
        okSuccessToast(res.data.message);
        if (refresh) refresh();
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  useEffect(() => {
    if (autoOpen) setOpen(true);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      {btn ? (
        <span onClick={handleOpen}>{btn}</span>
      ) : (
        <div className="card-css outletRegBox">
          <Grid
            item
            md={12}
            xs={12}
            sx={{
              backgroundColor: "#0077b6",
              p: 2,
              borderRadius: "8px",
              width: { lg: "100%", md: "100%", sm: "100%", sx: "100%" },
              display: "flex",
            }}
          >
            <InfoOutlinedIcon sx={{ color: "#000", mr: 5 }} />

            <Typography sx={{ color: "#000" }}>
              Complete Registration
            </Typography>
          </Grid>

          <Button
            variant="contained"
            sx={{ fontSize: "10px", background: primaryColor(), mt: 6 }}
            onClick={handleOpen}
          >
            Outlet Registration
          </Button>
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="sm_modal">
          <Spinner loading={request} />
          <ModalHeader title="Outlet Registration" handleClose={handleClose} />
          <Box
            component="form"
            id="outletRegistration"
            validate
            autoComplete="off"
            onSubmit={outletRegistration}
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
          >
            <Grid container sx={{ pt: 1 }}>
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Mobile Number"
                    id="mobile"
                    size="small"
                    required
                    helperText={!isValMob ? "Invalid mobile number" : ""}
                    error={!isValMob}
                    onChange={(e) => {
                      setIsValMob(PATTERNS.MOBILE.test(e.target.value));
                      if (e.target.value === "") setIsValMob(true);
                    }}
                    inputProps={{ maxLength: 10, minLength: 10 }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="PAN"
                    id="pan"
                    size="small"
                    required
                    inputProps={{ maxLength: 10 }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Aadhaar"
                    id="aadhaar"
                    size="small"
                    required
                    inputProps={{ maxLength: 12 }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Email ID"
                    id="emailId"
                    size="small"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Bank account number"
                    id="bankAccountNo"
                    size="small"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Bank IFSC"
                    id="bankIfsc"
                    size="small"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <FormControlLabel
                  size="small"
                  control={
                    <Checkbox
                      sx={{
                        color: primaryColor(),
                        "&.Mui-checked": {
                          color: primaryColor(),
                        },
                      }}
                      defaultChecked={isConsent}
                      onClick={() => {
                        setIsConsent(!isConsent);
                      }}
                    />
                  }
                  label={
                    <span style={{ fontSize: "0.7rem" }}>
                      I hereby give my consent and submit voluntarily at my own
                      discretion, my Aadhaar Number or VID for the purpose of
                      establishing my identity on the portal. The Aadhaar
                      submitted herewith shall not be used for any purpose other
                      than mentioned, or as per the requirements of the law.
                    </span>
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <ModalFooter
            form="outletRegistration"
            request={request}
            btn="Continue"
            disable={request || !isConsent}
          />
        </Box>
      </Modal>
      <VerifyOtpLogin
        secureValidate={secureValidate}
        setSecureValidate={setSecureValidate}
        setUserRequest={setRequest}
        currentStep={currentStep}
        btn="Proceed"
        usedInSignUp
        verifStepSuccRes={initiateData}
        data={tempData}
        showLaoder={false}
        handleCloseCallBk={(instruction) => {
          if (instruction === "closemodal") {
            handleClose();
          }
        }}
      />
      {/* <CommonMpinModal
        open={openMpin}
        setOpen={setOpenMpin}
        mPinCallBack={(mPinValue) => {
          setOtpCallback(mPinValue);
        }}
      /> */}
    </Box>
  );
};
export default OutletRegistration;
