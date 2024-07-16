/* eslint-disable no-unused-vars */
import { Box, Button, Grid, IconButton, Modal, Tooltip } from "@mui/material";
import React, { useState } from "react";
import ModalHeader from "./ModalHeader";
import MyButton from "../component/MyButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LabelComponent from "../component/LabelComponent";
import DetailsComponent from "../component/DetailsComponent";
import { maskFunction } from "../utils/MaskingUtil";
import { postFormData, postJsonData } from "../network/ApiController";
import Mount from "../component/Mount";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import Spinner from "../commons/Spinner";
import VerifiedIcon from "@mui/icons-material/Verified";

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
  height: "90%",
  // overflowY: "scroll",
};

const AdminDocsViewModal = ({ row, refresh }) => {
  // console.log("row,", row);
  const { aadhaar_image, pan_image, id, is_aadhaar_verified, is_pan_verified } =
    row;
  const [open, setOpen] = React.useState(false);
  const [aadhaarFile, setAadhaarFile] = useState();
  const [panFile, setPanFile] = useState();
  const [vAadhaarLoader, setVAadhaarLoader] = useState(false);
  const [rAadhaarLoader, setRAadhaarLoader] = useState(false);
  const [vPanLoader, setVPanLoader] = useState(false);
  const [rPanLoader, setRPanLoader] = useState(false);

  const onSelectFile = (e, type) => {
    if (!e.target.files) {
      if (type === "aadhaar") {
        setAadhaarFile(undefined);
      } else {
        setPanFile(undefined);
      }
      return;
    } else {
      if (type === "aadhaar") {
        setAadhaarFile(e.target.files[0]);
      } else {
        setPanFile(e.target.files[0]);
      }
    }
  };

  const handleAadhaarPanUpload = () => {
    const formData = new FormData();
    if (aadhaarFile) {
      formData.append("aadhaar_image", aadhaarFile);
    }
    if (panFile) {
      formData.append("pan_image", panFile);
    }
    // postFormData()
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const verifyOrRejectPan = (e, type) => {
    e.preventDefault();
    if (type === "verify") {
      postJsonData(
        `${ApiEndpoints.VERIFY_PAN}?id=${id}`,
        { is_pan_verified: 1 },
        setVPanLoader,
        (res) => {
          okSuccessToast(res.data.message);
          if (refresh) refresh();
        },
        (err) => {
          apiErrorToast(err);
          if (refresh) refresh();
        }
      );
    } else {
      postJsonData(
        `${ApiEndpoints.VERIFY_PAN}?id=${id}`,
        { is_pan_verified: 0 },
        setRPanLoader,
        (res) => {
          okSuccessToast(res.data.message);
          if (refresh) refresh();
        },
        (err) => {
          apiErrorToast(err);
          if (refresh) refresh();
        }
      );
    }
  };
  const verifyOrRejectAadhaar = (e, type) => {
    e.preventDefault();
    if (type === "verify") {
      postJsonData(
        `${ApiEndpoints.VERIFY_AADHAAR}?id=${id}`,
        { is_aadhaar_verified: 1 },
        setVAadhaarLoader,
        (res) => {
          okSuccessToast(res.data.message);
          if (refresh) refresh();
        },
        (err) => {
          apiErrorToast(err);
          if (refresh) refresh();
        }
      );
    } else {
      postJsonData(
        `${ApiEndpoints.VERIFY_AADHAAR}?id=${id}`,
        { is_aadhaar_verified: 0 },
        setRAadhaarLoader,
        (res) => {
          okSuccessToast(res.data.message);
          if (refresh) refresh();
        },
        (err) => {
          apiErrorToast(err);
          if (refresh) refresh();
        }
      );
    }
  };

  return (
    <>
      <Tooltip title="Click to View Documents" placement="bottom">
        <IconButton onClick={handleOpen} className="shadow-effect">
          <VisibilityIcon
            sx={{
              color:
                aadhaar_image === null && pan_image === null
                  ? "#f44336"
                  : (aadhaar_image || pan_image) &&
                    (is_aadhaar_verified === 0 ||
                      is_pan_verified === 0 ||
                      is_aadhaar_verified === 2 ||
                      is_pan_verified === 2)
                  ? "#ffa726"
                  : "#388e3c",
            }}
          />
        </IconButton>
        {/* <MyButton
          //   variant="contained"
          text="View"
          purple
          onClick={handleOpen}
          p={1}
        /> */}
      </Tooltip>
      {/* modal */}
      <Modal open={open}>
        <Box sx={style} className="sm_modal">
          <ModalHeader title="Verify Documents" handleClose={handleClose} />
          <Grid container sx={{ height: "90%", overflowY: "scroll" }}>
            <Grid md={12} sx={{ p: 2, mx: 1 }}>
              <LabelComponent label="User Name" />
              <DetailsComponent
                detail={row.name ? row.name : row.establishment}
              />
            </Grid>

            <Grid md={6} sx={{ p: 2, mx: 1 }}>
              <LabelComponent label="Aadhaar Number" />
              <DetailsComponent detail={maskFunction(row.aadhar)} />
            </Grid>
            <Grid md={5} sx={{ p: 2, mx: 1 }}>
              <LabelComponent label="Pan Number" />
              <DetailsComponent detail={row.pan} />
            </Grid>
            {/* ##### AADHAAR IMAGE ##### */}
            <Grid
              className="card-css"
              item
              md={5.7}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                p: 2,
                mx: 1,
              }}
            >
              {aadhaar_image ? (
                <>
                  <img
                    src={aadhaar_image}
                    alt="aadhaar"
                    style={{ width: "100%", marginBottom: "15px" }}
                  />
                  {is_aadhaar_verified === 0 || is_aadhaar_verified === 2 ? (
                    <div
                      className="d-flex justify-content-center"
                      style={{ width: "100%" }}
                    >
                      <MyButton
                        text="Verify"
                        red
                        p={1}
                        mx={2}
                        onClick={(e) => verifyOrRejectAadhaar(e, "verify")}
                        disabled={vAadhaarLoader}
                        loading={vAadhaarLoader}
                      />{" "}
                      <Button
                        variant="contained"
                        sx={{
                          ml: 3,
                          fontSize: "12px",
                          textTransform: "none",
                          background: "#d32f2f",
                          "&:hover": {
                            backgroundColor: "#d32f2f",
                            color: "#fff",
                          },
                        }}
                        onClick={(e) => verifyOrRejectAadhaar(e, "reject")}
                        disabled={rAadhaarLoader}
                      >
                        <Spinner loading={rAadhaarLoader} size="small" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="d-flex justify-content-between"
                      style={{ width: "100%" }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          width: "100%",
                          color: "green",
                        }}
                      >
                        Verified <VerifiedIcon />
                      </div>
                      <Button
                        variant="contained"
                        sx={{
                          fontSize: "12px",
                          textTransform: "none",
                          background: "#d32f2f",
                          "&:hover": {
                            backgroundColor: "#d32f2f",
                            color: "#fff",
                          },
                        }}
                        onClick={(e) => verifyOrRejectAadhaar(e, "reject")}
                        disabled={rAadhaarLoader}
                      >
                        <Spinner loading={rAadhaarLoader} size="small" />
                        Reject
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <label
                    for="formFile"
                    className="form-label"
                    style={{ textAlign: "left" }}
                  >
                    Default file input example
                  </label>
                  <input
                    type="file"
                    id="aadhaarFile"
                    onChange={(e) => onSelectFile(e, "aadhaar")}
                    className="form-control"
                  />
                </>
              )}
            </Grid>
            {/* #### PAN IMAGE ##### */}
            <Grid
              item
              md={5.7}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                p: 2,
                mx: 1,
              }}
              className="card-css"
            >
              {pan_image ? (
                <>
                  <img
                    src={pan_image}
                    alt="pan"
                    style={{ width: "100%", marginBottom: "15px" }}
                  />
                  {is_pan_verified === 0 || is_pan_verified === 2 ? (
                    <div
                      className="d-flex justify-content-center"
                      style={{ width: "100%" }}
                    >
                      <MyButton
                        text="Verify"
                        red
                        p={1}
                        mx={2}
                        onClick={(e) => verifyOrRejectPan(e, "verify")}
                        loading={vPanLoader}
                        disabled={vPanLoader}
                      />{" "}
                      <Button
                        variant="contained"
                        sx={{
                          ml: 3,
                          fontSize: "12px",
                          textTransform: "none",
                          background: "#d32f2f",
                          "&:hover": {
                            backgroundColor: "#d32f2f",
                            color: "#fff",
                          },
                        }}
                        onClick={(e) => verifyOrRejectPan(e, "reject")}
                        disabled={rPanLoader}
                      >
                        <Spinner loading={rPanLoader} size="small" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="d-flex justify-content-between"
                      style={{ width: "100%" }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          width: "100%",
                          color: "green",
                        }}
                      >
                        Verified <VerifiedIcon />
                      </div>
                      <Button
                        variant="contained"
                        sx={{
                          fontSize: "12px",
                          textTransform: "none",
                          background: "#d32f2f",
                          "&:hover": {
                            backgroundColor: "#d32f2f",
                            color: "#fff",
                          },
                        }}
                        onClick={(e) => verifyOrRejectPan(e, "reject")}
                        disabled={rPanLoader}
                      >
                        <Spinner loading={rPanLoader} size="small" />
                        Reject
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <label
                    for="formFile"
                    className="form-label"
                    style={{ textAlign: "left" }}
                  >
                    Default file input example
                  </label>
                  <input
                    type="file"
                    id="panFile"
                    onChange={(e) => onSelectFile(e, "pan")}
                    className="form-control"
                  />
                </>
              )}
            </Grid>
            <Mount visible={aadhaarFile || panFile}>
              <Grid
                item
                md={12}
                xs={12}
                sx={{ mt: 3, display: "flex", justifyContent: "center" }}
              >
                <MyButton
                  text="Upload"
                  red
                  p={1}
                  mx={2}
                  onClick={(e) => handleAadhaarPanUpload(e)}
                />
              </Grid>
            </Mount>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default AdminDocsViewModal;
