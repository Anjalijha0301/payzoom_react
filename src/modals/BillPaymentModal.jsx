import { Box, FormControl, Grid, Modal, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PinInput from "react-pin-input";
import Spinner from "../commons/Spinner";
import ModalHeader from "./ModalHeader";
import DownloadIcon from "@mui/icons-material/Download";
import MyButton from "../component/MyButton";
import ModalFooter from "./ModalFooter";
import AuthContext from "../store/AuthContext";
import { postFormData, postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import useCommonContext from "../store/CommonContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  fontFamily: "Poppins",
  height: "max-content",
  overflowY: "scroll",
  p: 2,
};

const BillPaymentModal = ({
  billDetails,
  setBillDetails,
  fetchBill,
  endpt,
  payRequest,
  setPayRequest,
  operatorId,
  params,
  operatorName,
  amount,
  changeFetchToPay = false,
  amountValue = "",
  parametersData,
}) => {
  const [err, setErr] = useState();
  const [mpin, setMpin] = useState("");
  const authCtx = useContext(AuthContext);
  const location = authCtx.location;
  // const [request, setRequest] = useState(false);
  const [openWhenNoBill, setOpenWhenNoBill] = useState(false);
  const { getRecentData } = useCommonContext();
  // const payWithoutBill = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     operator: operatorName,
  //     amount: amount,
  //     pf: "WEB",
  //     latitude: location.lat,
  //     longitude: location.long,
  //     mpin: mpin,
  //     param1: billDetails && billDetails.billNumber,
  //   };
  //   postJsonData(
  //     ApiEndpoints.RECH_PAY_BILL,
  //     data,
  //     setPayRequest,
  //     (res) => {
  //       okSuccessToast(res);
  //       handleClose();
  //     },
  //     (err) => {
  //       apiErrorToast(err);
  //       handleClose();
  //     }
  //   );
  // };

  const handleOpen = () => {
    if (!changeFetchToPay) {
      if (fetchBill) fetchBill();
    } else {
      setOpenWhenNoBill(true);
    }
  };

  // console.log("reee", billDetails.billNumber);

  const payBill = (e) => {
    e.preventDefault();
    const data = {
      operator: operatorId,
      amount: changeFetchToPay ? amountValue : amount,
      pf: "WEB",
      latitude: location.lat,
      longitude: location.long,
      mpin: mpin,
      param1:
        billDetails && billDetails.billNumber
          ? billDetails.billNumber
          : parametersData && parametersData.param1,
    };
    postJsonData(
      ApiEndpoints.RECH_PAY_BILL,
      data,
      setPayRequest,
      (res) => {
        okSuccessToast(res.data.message);
        getRecentData();
        handleClose();
      },
      (err) => {
        apiErrorToast(err);
        getRecentData();
        handleClose();
      }
    );
  };

  const handleClose = () => {
    setBillDetails(false);
    setOpenWhenNoBill(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      <MyButton
        text={changeFetchToPay ? "Pay Bill" : "Fetch Bill"}
        purple
        // type="bbpsForm"
        icon={!changeFetchToPay && <DownloadIcon />}
        sx={{ fontSize: "12px", px: 1 }}
        onClick={handleOpen}
        disabled={
          !operatorId || (changeFetchToPay && (amountValue ? false : true))
        }
      />

      <Modal
        open={billDetails || openWhenNoBill}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="sm_modal">
          <Spinner loading={payRequest} />
          <ModalHeader
            title={changeFetchToPay ? "Pay Bill" : "Bill Details"}
            handleClose={handleClose}
          />
          <Box
            component="form"
            id="billPayment"
            validate
            autoComplete="off"
            onSubmit={payBill}
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
          >
            {billDetails && (
              <Grid container sx={{ pt: 1 }}>
                <Grid
                  item
                  md={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <table className="mt-table">
                    {billDetails && billDetails.billerName ? (
                      <tr>
                        <td>Name</td>
                        <td>:</td>
                        <td style={{ textAlign: "right" }}>
                          {billDetails && billDetails.billerName}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}

                    {billDetails && billDetails.billAmount ? (
                      <tr>
                        <td>Bill Amount </td>
                        <td>:</td>
                        <td style={{ textAlign: "right" }}>
                          {Number(
                            billDetails && billDetails.billAmount
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}

                    {billDetails && billDetails.dueAmount ? (
                      <tr>
                        <td>Due Amount </td>
                        <td>:</td>
                        <td style={{ textAlign: "right" }}>
                          {Number(billDetails && billDetails.dueAmount).toFixed(
                            2
                          )}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}

                    {billDetails && billDetails.billNumber ? (
                      <tr>
                        <td>Bill Number </td>
                        <td>:</td>
                        <td style={{ textAlign: "right" }}>
                          {billDetails && billDetails.billNumber}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}

                    {billDetails && billDetails.billdate ? (
                      <tr>
                        <td>Bill Date </td>
                        <td>:</td>
                        <td style={{ textAlign: "right" }}>
                          {billDetails && billDetails.billdate}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {billDetails && billDetails.dueDate ? (
                      <tr>
                        <td>Due Date </td>
                        <td>:</td>
                        <td style={{ textAlign: "right" }}>
                          {billDetails && billDetails.dueDate}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {billDetails && billDetails.billperiod ? (
                      <tr>
                        <td>Due Period </td>
                        <td>:</td>
                        <td style={{ textAlign: "right" }}>
                          {billDetails && billDetails.billperiod}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </table>
                </Grid>
              </Grid>
            )}
            <Grid
              item
              md={12}
              xs={12}
              sx={{ display: "flex", justifyContent: "center", mt: 1 }}
            >
              <FormControl>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 1,
                  }}
                >
                  Enter M-PIN
                </Typography>
                <PinInput
                  length={6}
                  focus
                  type="password"
                  onChange={(value, index) => {
                    if (err !== "") {
                      setErr("");
                    }
                    setMpin(value);
                  }}
                  regexCriteria={/^[0-9]*$/}
                />
              </FormControl>
            </Grid>
          </Box>
          <ModalFooter
            form="billPayment"
            request={payRequest}
            btn="Continue"
            disable={mpin.length !== 6}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default BillPaymentModal;
