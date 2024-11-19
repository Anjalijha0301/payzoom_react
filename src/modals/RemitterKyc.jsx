import {
  Box,
  Modal,
  Typography,
  Button,
  Grid,
  TextField,
  FormControl,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import AnimateIcon from "../component/AnimateIcon";
import AnimDeviceReady from "../assets/animate-icons/device_ready.json";
import AnimDeviceScanning from "../assets/animate-icons/fingerprint_scan.json";
import AnimDeviceSuccess from "../assets/animate-icons/fingerprint_success.json";
import AnimDeviceFail from "../assets/animate-icons/fingerprint_fail.json";
import AnimDeviceConnect from "../assets/animate-icons/device_connect.json";
import useCommonContext from "../store/CommonContext";
import AuthContext from "../store/AuthContext";
import {
  CaptureFingerPrint,
  CaptureFingerPrintDmt1,
  CaptureFingerPrintDmt2,
  GetMFS100InfoLoad,
} from "../utils/MantraCapture";
import MachineButtonGroup from "../component/aeps/MachineButtonGroup";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { RDDeviceStatus } from "../utils/constants";
import { getColor } from "./aeps/AEPS2FAModal";
import RdDeviceSearch from "../component/RdDeviceSearch";
import ModalHeader from "./ModalHeader";
import Spinner from "../commons/Spinner";

const RemitterKyc = ({
  open,
  onClose,
  remRefKey,
  rem_mobile,
  dmtValue,
  setVerifyotp,
  setDmr2RemRes,
}) => {
  const [scanData, setScanData] = useState(null);
  const [scanAnim, setScanAnim] = useState("NOTREADY");
  const authCtx = useContext(AuthContext);
  const userLat = authCtx.location.lat;
  const userLong = authCtx.location.long;
  const [request, setRequest] = useState(false);
  const [aadhaar, setAadhaar] = useState("");

  console.log("authCtx", authCtx);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    boxShadow: 24,
    fontFamily: "Poppins",
    height: "max-content",
    overflowY: "scroll",
    p: 2,
  };

  const {
    aepsType,
    rdDevice,
    rdDeviceList,
    machineRequest,
    setRdDevice,
    setRdDeviceList,
    setMachineRequest,
  } = useCommonContext();
  const handleOpen = () => {
    if (!rdDevice) getRdDeviceInfo();
    // setOpen(true);
  };
  const handleClose = () => {
    onClose();
    // setOpen(false);
    setScanData(null);
  };

  function getRdDeviceInfo() {
    setMachineRequest(true);
    // console.log("machine func call . . .");
    setTimeout(() => {
      // console.log("inside machine func timeout . . .");
      GetMFS100InfoLoad(
        setMachineRequest,
        (dataArray) => {
          setScanData();
          // setScanAnim(RDDeviceStatus.NOT_READY);
          for (let i = 0; i < dataArray.length; i++) {
            // console.log("data array=>", dataArray[i].status);
            const data = dataArray[i];
            if (data && data.status === RDDeviceStatus.READY) {
              setScanAnim(data ? data.status : RDDeviceStatus.SCAN_FAILED);
              setRdDevice(data);
            } else if (data && data.status === RDDeviceStatus.NOT_READY) {
              setScanAnim(data ? data.status : RDDeviceStatus.SCAN_FAILED);
              setRdDevice(data);
            }
          }
          if (dataArray) setRdDeviceList(dataArray);
          // console.log("success status=>", machineRequest);
        },
        (err) => {
          setScanAnim(RDDeviceStatus.NOT_READY);
          setRdDevice();
          setRdDeviceList();
          setMachineRequest(false);
          setScanData();
          // setScanAnim(err ? err.status : RDDeviceStatus.SCAN_FAILED);
          // console.log("failed status=>", machineRequest);
        }
      );
    }, 500);
    // setMachineRequest(false);
  }

  function resolveScanImage(status) {
    switch (status) {
      case RDDeviceStatus.NOT_READY:
        return <AnimateIcon src={AnimDeviceConnect} />;
      case RDDeviceStatus.READY:
        return <AnimateIcon src={AnimDeviceReady} />;
      case RDDeviceStatus.SCANNING:
        return <AnimateIcon src={AnimDeviceScanning} />;
      case RDDeviceStatus.SCAN_SUCCESS:
        return <AnimateIcon src={AnimDeviceSuccess} />;
      case RDDeviceStatus.SCAN_FAILED:
        return <AnimateIcon src={AnimDeviceFail} />;
      default:
        return <AnimateIcon src={AnimDeviceConnect} />;
    }
  }

  // ------------------------------------------
  // api call for logging in to bank side for the day

  // ------------------------------------------

  const outletAuthApiCall = () => {
    const apiEnd =
      dmtValue == "dmt1"
        ? ApiEndpoints.REMITTER_KYC
        : ApiEndpoints.REMITTER_KYC_dmt2;

    if (scanData) {
      const dmt1Data = {
        referenceKey: remRefKey?.referenceKey,
        number: rem_mobile,
        ci: scanData.cI,
        dc: scanData.dC,
        dpId: scanData.dpId,
        mc: scanData?.mC,
        mi: scanData?.mI,
        pidData: scanData?.pidData,
        rdsId: scanData?.rdsId,
        rdsVer: scanData?.rdsVer,
        sessionKey: scanData?.sessionKey,
        srno: scanData?.srno,
        hmac: scanData?.hMac,
        // latitude:"28.6668",
        // longitude:"77.2167",
        latitude: userLat.toFixed(4),
        longitude: userLong.toFixed(4),
        pf: "WEB",
      };
      const dmt2Data = {
        referenceKey: remRefKey?.referenceKey,
        number: rem_mobile,
        aadhaar_number: aadhaar && aadhaar,
        pidData: scanData?.doc2,
        latitude: userLat.toFixed(4),
        longitude: userLong.toFixed(4),
        pf: "WEB",
      };
      const apiData = dmtValue == "dmt1" ? dmt1Data : dmt2Data;

      postJsonData(
        apiEnd,
        apiData,
        setRequest,
        (res) => {
          console.log("rem kyc res----", res);
          if (dmtValue == "dmt2") {
            setDmr2RemRes(res?.data?.data);
            setVerifyotp(true);
          }
          okSuccessToast(res.data.message);

          onClose();
          setScanData(null);
        },
        (error) => {
          console.log("rem kyc error", error);

          apiErrorToast(error);
        }
      );
      console.log("scan data======>", scanData);
    }
  };

  useEffect(() => {
    if (scanData) outletAuthApiCall();
  }, [scanData]);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="sm_modal">
        <Spinner loading={request} />

        <ModalHeader title="Add Remitter" handleClose={onClose} />

        <Box
          component="form"
          id="outlet_login"
          validate
          autoComplete="off"
          className="text-center"
          // onSubmit={}
          sx={{
            "& .MuiTextField-root": { m: 2 },
            objectFit: "contain",
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container className="position-relative">
            {dmtValue == "dmt2" && (
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Aadhaar Number"
                    id="aadhaarNo"
                    size="small"
                    type="number"
                    helperText={
                      <div style={{ color: "#2979ff" }}>
                        Kindly check for your Aadhaar Number
                      </div>
                    }
                    required
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value)}
                  />
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12} lg={12}>
              <Box sx={{ display: "flex", pl: 1, pt: 1 }}>
                <div
                  style={{
                    width: "50%",
                    minWidth: "30%",
                    height: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {/* red dot code */}
                  {rdDevice && (
                    <div
                      style={{
                        background: getColor(rdDevice ? rdDevice.status : ""),
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                      }}
                    ></div>
                  )}
                  {/* Rd service */}
                  <span style={{ marginBottom: "12px" }}>
                    {resolveScanImage(scanAnim)}
                  </span>
                  {/* #################################### */}
                  {/* MACHINE BUTTON GROUP --------------- */}
                  {/* #################################### */}

                  {dmtValue == "dmt2" ? (
                    <MachineButtonGroup
                      onScan={() => {
                        setScanAnim(RDDeviceStatus.SCANNING);
                        CaptureFingerPrintDmt2(
                          rdDevice && rdDevice.rdport,
                          (msg, data) => {
                            console.log("data in remkyc=> ", data);

                            setScanAnim(RDDeviceStatus.SCAN_SUCCESS);
                            setScanData(data);
                          },
                          (err) => {
                            apiErrorToast("Error", JSON.stringify(err));
                            setScanAnim(RDDeviceStatus.SCAN_FAILED);
                          }
                        );
                      }}
                      onRdDeviceInfo={() => {
                        if (getRdDeviceInfo) getRdDeviceInfo();
                      }}
                    />
                  ) : (
                    <MachineButtonGroup
                      onScan={() => {
                        setScanAnim(RDDeviceStatus.SCANNING);
                        CaptureFingerPrintDmt1(
                          rdDevice && rdDevice.rdport,
                          (msg, data) => {
                            setScanAnim(RDDeviceStatus.SCAN_SUCCESS);
                            setScanData(data);
                          },
                          (err) => {
                            apiErrorToast("Error", JSON.stringify(err));
                            setScanAnim(RDDeviceStatus.SCAN_FAILED);
                          }
                        );
                      }}
                      onRdDeviceInfo={() => {
                        if (getRdDeviceInfo) getRdDeviceInfo();
                      }}
                    />
                  )}
                </div>
                <Grid container>
                  <Grid item md={12} xs={12}>
                    {
                      <RdDeviceSearch
                        list={rdDeviceList}
                        cb={(item) => {
                          if (item) setRdDevice(item);
                        }}
                        defaultValue={
                          rdDeviceList?.length > 0 && rdDeviceList[0]?.info
                        }
                      />
                    }

                    {!machineRequest && rdDeviceList === undefined && (
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "red",
                          textAlign: "left",
                        }}
                      >
                        You do not have any RD Service installed in your system
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label=""
                        id="d_status"
                        size="small"
                        placeholder="Device Status"
                        value={
                          rdDevice ? rdDevice.status : RDDeviceStatus.NOT_READY
                        }
                        disabled
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label=""
                        id="scan_quality"
                        size="small"
                        placeholder="Scan Quality"
                        defaultValue={""}
                        value={scanData && scanData.score}
                        disabled
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
              {/* </Box> */}
              <Typography sx={{ mt: 2 }}>
                <span style={{ fontWeight: "bold", color: "#DC5F5F" }}>
                  Note:
                </span>
                connect scanner for scanning the impression(when scanner is
                connected dot in the corner will be green.)
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default RemitterKyc;
