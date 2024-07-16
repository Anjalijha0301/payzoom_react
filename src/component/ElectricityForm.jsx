/* eslint-disable array-callback-return */
import { Box, FormControl, Grid, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { useState } from "react";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import EnterMpinModal from "../modals/EnterMpinModal";
import SuccessRechargeModal from "../modals/SuccessRechargeModal";
import Spinner from "../commons/Spinner";
import AuthContext from "../store/AuthContext";
import BillPaymentModal from "../modals/BillPaymentModal";
import OperatorSearch from "./OperatorSearch";
import { useRef } from "react";

const ElectricityForm = ({ title, subType }) => {
  const authCtx = useContext(AuthContext);
  const location = authCtx.location;
  const [fetchRequest, setFetchRequest] = useState(false);
  const [billPayRequest, setBillPayRequest] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [operatorId, setOperatorId] = useState("");
  const [opName, setOpName] = useState("");
  const [successRecharge, setSuccessRechage] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [params, setParams] = useState([]);
  const [changeFetchToPay, setChangeFetchToPay] = useState(false);
  const [billDetails, setBillDetails] = useState();
  const [paramsValue, setparamsValue] = useState();
  const [data, setData] = useState("");
  const [visibleAmount, setVisibleAmount] = useState(false);
  const [amountValue, setAmountValue] = useState("");
  const operatorRef = useRef();

  const handleSubmit = (event) => {
    // event.preventDefault();
    // console.log("form", form);

    const data = {
      // param1: form.param1.value,
      // param2: form.param2.value,
      // param3: form.param3.value,
      // operator: form.operator.value,
      // amount: form.amount.value,
      // type: "DTH",
      // pf: "WEB",
      // latitude: userLat && userLat,
      // longitude: userLong && userLong,
    };
    params.map((item, index) => {
      if (item || item !== "") {
        // eslint-disable-next-line no-unused-vars
        let propertyName = item;
        data["param" + (index + 1)] = document.getElementById(
          "param" + (index + 1)
        )?.value;
        return data;
      }
    });
    setData(data);
    // setModalVisible(true);
  };

  const fetchBill = () => {
    // console.log("passed", passedParams);
    const data = {
      latitude: location.lat,
      longitude: location.long,
      operator: operatorId,
    };
    // eslint-disable-next-line array-callback-return
    params.map((item, index) => {
      if (item && item !== "") {
        // eslint-disable-next-line no-unused-vars
        let propertyName = item;
        data["param" + (index + 1)] = document.getElementById(
          "param" + (index + 1)
        ).value;
        return data;
      }
    });
    const filledAllFields = Object.keys(data);
    // console.log("data", data);
    // console.log("filledAllFields", filledAllFields);

    if (!filledAllFields.includes("param1")) {
      apiErrorToast("All Fields are required");
    } else if (filledAllFields.includes("param1") && data["param1"] === "") {
      apiErrorToast("All Fields are required");
    } else if (filledAllFields.includes("param2") && data["param2"] === "") {
      apiErrorToast("All Fields are required");
    } else if (filledAllFields.includes("param3") && data["param3"] === "") {
      apiErrorToast("All Fields are required");
    } else {
      postJsonData(
        ApiEndpoints.RECH_FETCH_BILL,
        data,
        setFetchRequest,
        (res) => {
          setBillDetails(res.data.data);
          okSuccessToast(
            res.data.message.param1
              ? res.data.message.param1[0]
              : res.data.message
          );

          if (!res.data.message.param1) {
            if (
              res.data.message.toLowerCase() ===
              "Bill Fetch Service Is Down Please Enter The Amount Manually".toLowerCase()
            ) {
              setVisibleAmount(true);
              setChangeFetchToPay(true);
              handleSubmit();
            }
          }
        },
        (err) => {
          apiErrorToast(err);
        }
      );
    }
  };

  return (
    <div className="position-relative" id="whole">
      <Spinner loading={fetchRequest} circleBlue />
      <Box sx={{ p: 3 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
            {/* Electricity Bill Payment */}
            {title}
          </Typography>
        </div>
        <Box
          component="form"
          id="electricity"
          validate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { m: 2 },
            objectFit: "contain",
            overflowY: "scroll",
          }}
        >
          <Grid sx={{ pt: 1 }} disabled>
            <Grid item md={12} xs={12}>
              <OperatorSearch
                obj={(op) => {
                  setParams([]);
                  if (op) {
                    if (op.param1 !== "") {
                      setParams((arr) => [...arr, op.param1]);
                    }
                    if (op.param2 !== "") {
                      setParams((arr) => [...arr, op.param2]);
                    }
                    if (op.param3 !== "") {
                      setParams((arr) => [...arr, op.param3]);
                    }
                    setOperatorId(op.code);
                    setOpName(op.name);
                  }
                }}
                endpt={`${ApiEndpoints.GET_OPERATOR}?sub_type=${subType}`}
                label="Search Operator"
                inputRef={operatorRef}
              />
              {/* <FormControl sx={{ width: "100%" }}>
                <TextField
                  label="Operator"
                  id="operator"
                  size="small"
                  required
                  onFocus={handleClickMenu}
                  value={opName && opName}
                  select
                  disabled={fetchRequest && fetchRequest ? true : false}
                  InputProps={{
                    startAdornment:
                      opImg && opImg ? (
                        <img
                          src={opImg}
                          width="24px"
                          height="auto"
                          alt="img"
                          style={{ marginRight: "12px" }}
                        />
                      ) : (
                        ""
                      ),
                  }}
                >
                  {operatorVal &&
                    operatorVal.map((option, index) => (
                      <MenuItem
                        key={index}
                        value={option.name}
                        onClick={(e) => {
                          //setTheArray([...theArray, newElement]);
                          setParams([]);
                          if (option.param1 !== "") {
                            setParams((arr) => [...arr, option.param1]);
                          }
                          if (option.param2 !== "") {
                            setParams((arr) => [...arr, option.param2]);
                          }
                          if (option.param3 !== "") {
                            setParams((arr) => [...arr, option.param3]);
                          }
                          setOperatorId(option.code);
                          setOpName(option.name);
                          setOpImg(option.img);
                          setAnchorEl(null);
                        }}
                      >
                        <div style={{ textAlign: "left" }}>{option.name}</div>
                      </MenuItem>
                    ))}
                </TextField>
              </FormControl> */}
            </Grid>

            {params && params.length > 0 && (
              <div style={{ width: "100%" }}>
                {params.map((item, i) => {
                  return (
                    <div>
                      {item && item !== "" && (
                        <Grid item md={12} xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label={item}
                              id={"param" + (i + 1).toString()}
                              size="small"
                              onChange={(e) => {
                                setparamsValue({
                                  ...paramsValue,
                                  [e.currentTarget.id]: e.currentTarget?.value,
                                });
                              }}
                              required
                            />
                          </FormControl>
                        </Grid>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {visibleAmount && (
              <Grid md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Amount"
                    id="amount"
                    size="small"
                    value={amountValue}
                    onChange={(e) => {
                      setAmountValue(e.target.value);
                    }}
                    required
                  />
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Box>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <BillPaymentModal
            changeFetchToPay={changeFetchToPay}
            amountValue={amountValue}
            fetchBill={fetchBill}
            billDetails={billDetails}
            setBillDetails={setBillDetails}
            payRequest={billPayRequest}
            setPayRequest={setBillPayRequest}
            params={paramsValue}
            operatorId={operatorId}
            operatorName={opName}
            amount={billDetails && billDetails.dueAmount}
            parametersData={data}
          />
        </div>

        {/* this is not being used */}
        {modalVisible && (
          <EnterMpinModal
            data={data}
            setModalVisible={setModalVisible}
            setSuccessRechage={setSuccessRechage}
            apiEnd={ApiEndpoints.PREPAID_RECHARGE}
            view="recharge"
            setShowSuccess={setShowSuccess}
          />
        )}
        {showSuccess && (
          <SuccessRechargeModal
            successRecharge={successRecharge}
            setShowSuccess={setShowSuccess}
          />
        )}
      </Box>
    </div>
  );
};

export default ElectricityForm;
