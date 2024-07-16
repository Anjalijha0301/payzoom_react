import "../scss/PaymentReceipt.css";
import MyButton from "./MyButton";
import { toInt } from "../utils/TextUtil";
import { datemonthYear, myDateDDMMyy } from "../utils/DateUtils";
import { numIn2Dec } from "../utils/RupeeUtil";
import LogoComponent from "./LogoComponent";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import PrintIcon from "@mui/icons-material/Print";
import { useEffect } from "react";
import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { breakAmt } from "../utils/MTBreakAmtUtil";

let row_data = [];
// let rowMapping = [];
let totalAmount = 0;
let dateToday = new Date();
let date = dateToday.getDate();
let month = dateToday.getMonth() + 1;
let year = dateToday.getFullYear();
let separator = "-";
let invoiceDate = `${year}${separator}${
  month < 10 ? `0${month}` : `${month}`
}${separator}${date}`;

const PaymentReceipt = () => {
  const [rowMapping, setRowMapping] = useState([]);
  row_data = JSON.parse(localStorage.getItem("selectedRow"));
  // console.log("localStorage=> ", row_data);
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const [value, setValue] = useState(1);

  const [firstTime, setFirstTime] = useState(true);
  const [splitAmtArr, setSplitAmtArr] = useState([]);
  // console.log("splitamtarr", splitAmtArr);
  // console.log("first", firstTime);
  //   user = JSON.parse(localStorage.getItem("localUser"));

  const handleChange = (event) => {
    setValue(event.target.value * 1);
  };

  useEffect(() => {
    // 1 is large 2 is small
    if (value === 1) {
      setRowMapping(
        row_data && row_data.length > 0
          ? // eslint-disable-next-line array-callback-return
            row_data.map((payment, index) => {
              //
              if (
                payment.operator === "Super Transfer" ||
                payment.operator === "Vendor Payments"
              ) {
                if (firstTime) totalAmount += toInt(payment?.amount);
                const amt_arr = breakAmt(payment?.amount, 5000);
                const arrData = amt_arr.map((splitItem, index) => {
                  return {
                    amount: splitItem,
                    created_at: payment.created_at,
                    number: payment.number,
                    ben_name: payment.ben_name,
                    operator: payment.operator,
                    ben_acc: payment.ben_acc,
                    ifsc: payment.ifsc,
                    op_id: payment.op_id,
                    status: payment.status,
                  };
                });
                let splitAmt = arrData.reverse();
                // console.log("amt_arr", amt_arr);
                setSplitAmtArr(splitAmt);
              } else {
                if (firstTime) totalAmount += toInt(payment?.amount);

                // console.log(`payment ${index} => ${JSON.stringify(payment, null, 2)}`)
                return (
                  <tr style={{ fontSize: "12px" }}>
                    <td>
                      {payment && payment.created_at
                        ? datemonthYear(payment.created_at)
                        : ""}
                    </td>
                    <td
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {payment && payment.number ? payment.number : " "} <br />
                      {payment && payment.ben_name ? payment.ben_name : " "}
                    </td>
                    <td
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {payment &&
                      payment.operator &&
                      (payment.operator === "Vendor Payments" ||
                        payment.operator === "Express Transfer" ||
                        payment.operator === "Domestic Money Transfer" ||
                        payment.operator === "Domestic Money Transfer 2")
                        ? "Money Transfer"
                        : payment.operator}
                    </td>
                    <td>
                      {payment && payment.ben_acc ? payment.ben_acc : ""}
                      <br />
                      {payment && payment.ifsc ? payment.ifsc : ""}
                    </td>
                    {/* <td>{payment && payment.ifsc ? payment.ifsc : ""}</td> */}
                    <td>{payment && payment.op_id ? payment.op_id : ""}</td>
                    <td>
                      {payment && payment.amount
                        ? `${numIn2Dec(payment.amount)} INR`
                        : ""}
                      <br />

                      {payment.operator === "Nepal Transfer" &&
                      payment &&
                      payment.amount
                        ? `${numIn2Dec(payment.amount * 1.6)} NPR`
                        : ""}
                    </td>
                    <td>{payment && payment.status ? payment.status : ""}</td>
                  </tr>
                );
              }
            })
          : []
      );
    } else {
      setRowMapping(
        row_data && row_data.length > 0
          ? row_data.map((payment, index) => {
              if (firstTime) totalAmount += toInt(payment?.amount);

              // console.log(`payment ${index} => ${JSON.stringify(payment, null, 2)}`)
              return (
                <div className="just-dashed-divider just-padding">
                  <tr style={{ fontSize: "12px" }}>
                    <td>Date</td>
                    <td>
                      {payment && payment.created_at
                        ? datemonthYear(payment.created_at)
                        : ""}
                    </td>
                  </tr>
                  {/*  */}
                  <tr style={{ fontSize: "12px", minHeight: "45px" }}>
                    <td>Customer</td>
                    <td
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {payment && payment.number ? payment.number : " "} <br />
                      {payment && payment.ben_name ? payment.ben_name : " "}
                    </td>
                  </tr>
                  {/*  */}
                  <tr style={{ fontSize: "12px" }}>
                    <td>Operator</td>
                    <td
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {payment &&
                      payment.operator &&
                      (payment.operator === "Vendor Payments" ||
                        payment.operator === "Express Transfer" ||
                        payment.operator === "Domestic Money Transfer" ||
                        payment.operator === "Domestic Money Transfer 2")
                        ? "Money Transfer"
                        : payment.operator}
                    </td>
                  </tr>
                  {/*  */}
                  {/* <tr style={{ fontSize: "12px" }}>
                    <td>Operator</td>
                    <td
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {payment && payment.operator
                        ? payment.operator === "Vendor Payments"
                          ? "Express Transfer"
                          : payment.operator
                        : ""}
                    </td>
                  </tr> */}
                  {/*  */}
                  <tr style={{ fontSize: "12px", minHeight: "45px" }}>
                    <td>Acc Details</td>
                    <td>
                      {payment && payment.ben_acc ? payment.ben_acc : ""}
                      <br />
                      {payment && payment.ifsc ? payment.ifsc : ""}
                    </td>
                  </tr>
                  {/*  */}
                  <tr style={{ fontSize: "12px" }}>
                    <td> Operator ID</td>
                    <td>{payment && payment.op_id ? payment.op_id : ""}</td>
                  </tr>
                  {/*  */}
                  <tr style={{ fontSize: "12px" }}>
                    <td>Amount</td>
                    <td>
                      {payment && payment.amount
                        ? `${numIn2Dec(payment.amount)} INR`
                        : ""}
                      <br />
                      {payment.operator === "Nepal Transfer" &&
                      payment &&
                      payment.amount
                        ? `${numIn2Dec(payment.amount * 1.6)} NPR`
                        : ""}
                    </td>
                  </tr>
                  {/*  */}
                  <tr style={{ fontSize: "12px" }}>
                    <td>Status</td>
                    <td>{payment && payment.status ? payment.status : ""}</td>
                  </tr>
                </div>
              );
            })
          : []
      );
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (value === 1) {
      row_data &&
        row_data.length > 0 &&
        // eslint-disable-next-line array-callback-return
        row_data.map((payment) => {
          // if (payment.operator === "Super Transfer") {
          // console.log("here in oter effet");

          // }
          if (
            payment.operator === "Super Transfer" ||
            payment.operator === "Vendor Payments"
          ) {
            setRowMapping(
              splitAmtArr.map((splitItem) => {
                return (
                  <tr style={{ fontSize: "12px" }}>
                    <td>
                      {splitItem && splitItem.created_at
                        ? datemonthYear(splitItem.created_at)
                        : ""}
                    </td>
                    <td
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {splitItem && splitItem.number ? splitItem.number : " "}{" "}
                      <br />
                      {splitItem && splitItem.ben_name
                        ? splitItem.ben_name
                        : " "}
                    </td>
                    <td
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {splitItem && splitItem.operator
                        ? splitItem.operator === "Vendor Payments"
                          ? "Express Transfer"
                          : splitItem.operator
                        : ""}
                    </td>
                    <td>
                      {splitItem && splitItem.ben_acc ? splitItem.ben_acc : ""}
                      <br />
                      {splitItem && splitItem.ifsc ? splitItem.ifsc : ""}
                    </td>
                    {/* <td>{splitItem && splitItem.ifsc ? splitItem.ifsc : ""}</td> */}
                    <td>
                      {splitItem && splitItem.op_id ? splitItem.op_id : ""}
                    </td>
                    <td>
                      {splitItem && splitItem.amount
                        ? numIn2Dec(splitItem.amount)
                        : ""}
                    </td>
                    <td>
                      {splitItem && splitItem.status ? splitItem.status : ""}
                    </td>
                  </tr>
                );
              })
            );
          }
        });
    } else {
      row_data.length > 0 &&
        // eslint-disable-next-line array-callback-return
        row_data.map((payment) => {
          if (
            payment.operator === "Super Transfer" ||
            payment.operator === "Vendor Payments"
          ) {
            setRowMapping(
              splitAmtArr && splitAmtArr.length > 0
                ? splitAmtArr.map((splitItem) => {
                    // if (firstTime) totalAmount += toInt(payment?.amount);

                    // console.log(`payment ${index} => ${JSON.stringify(payment, null, 2)}`)
                    return (
                      <div className="just-dashed-divider just-padding">
                        <tr style={{ fontSize: "12px" }}>
                          <td>Date</td>
                          <td>
                            {splitItem && splitItem.created_at
                              ? datemonthYear(splitItem.created_at)
                              : ""}
                          </td>
                        </tr>
                        {/*  */}
                        <tr style={{ fontSize: "12px" }}>
                          <td>Customer</td>
                          <td
                            style={{
                              textTransform: "lowercase",
                            }}
                          >
                            {splitItem && splitItem.number
                              ? splitItem.number
                              : " "}{" "}
                            <br />
                            {splitItem && splitItem.ben_name
                              ? splitItem.ben_name
                              : " "}
                          </td>
                        </tr>
                        {/*  */}
                        <tr style={{ fontSize: "12px" }}>
                          <td>Operator</td>
                          <td
                            style={{
                              textTransform: "lowercase",
                            }}
                          >
                            {splitItem && splitItem.operator
                              ? splitItem.operator === "Vendor Payments"
                                ? "Express Transfer"
                                : splitItem.operator
                              : ""}
                          </td>
                        </tr>
                        {/*  */}
                        {/* <tr style={{ fontSize: "12px" }}>
                          <td>Operator</td>
                          <td
                            style={{
                              textTransform: "lowercase",
                            }}
                          >
                            {splitItem && splitItem.operator
                              ? splitItem.operator === "Vendor Payments"
                                ? "Express Transfer"
                                : splitItem.operator
                              : ""}
                          </td>
                        </tr> */}
                        {/*  */}
                        <tr style={{ fontSize: "12px" }}>
                          <td>Acc Details</td>
                          <td>
                            {splitItem && splitItem.ben_acc
                              ? splitItem.ben_acc
                              : ""}
                            <br />
                            {splitItem && splitItem.ifsc ? splitItem.ifsc : ""}
                          </td>
                        </tr>
                        {/*  */}
                        <tr style={{ fontSize: "12px" }}>
                          <td> Operator ID</td>
                          <td>
                            {splitItem && splitItem.op_id
                              ? splitItem.op_id
                              : ""}
                          </td>
                        </tr>
                        {/*  */}
                        <tr style={{ fontSize: "12px" }}>
                          <td>Amount</td>
                          <td>
                            {splitItem && splitItem.amount
                              ? numIn2Dec(splitItem.amount)
                              : ""}
                          </td>
                        </tr>
                        {/*  */}
                        <tr style={{ fontSize: "12px" }}>
                          <td>Status</td>
                          <td>
                            {splitItem && splitItem.status
                              ? splitItem.status
                              : ""}
                          </td>
                        </tr>
                      </div>
                    );
                  })
                : []
            );
          }
        });
    }
  }, [value, splitAmtArr]);

  if (value === 2) {
    return (
      <div className="like-parent-border">
        <div className="d-flex btnPrint">
          <FormControl fullWidth sx={{ textAlign: "left" }}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={(e) => {
                setFirstTime(false);
                handleChange(e);
              }}
              default
              row
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Large Receipt"
                // labelPlacement="top"
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Small Receipt"
                // labelPlacement="top"
              />
            </RadioGroup>
          </FormControl>
          <MyButton
            text="Print"
            icon={<PrintIcon />}
            onClick={() => {
              setTimeout(() => {
                window.print();
              }, 300);
            }}
          />
        </div>
        <div className="parent-border-vertical">
          {/*  */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <div>
              <LogoComponent width="60%" />
              <div className="just-bold just-bigger-font just-top-bottom-margin ">
                RECEIPT
              </div>
              {/* <div className="just-bold">
                {invoiceDate ? myDateDDMMyy(invoiceDate) : "Null"}
              </div> */}
            </div>

            <div className="just-text-right">
              <div className="just-bold just-little-big-font">
                Agent Information
              </div>
              <div className="just-bold just-little-big-font just-top-bottom-margin">
                {user ? user.establishment : "Null"}
              </div>
              <div className="just-bold">{user ? user.username : "Null"}</div>
            </div>
          </div>
          {/*  */}
          <div
            className="d-flex justify-content-center"
            style={{
              marginBottom: "0.2cm",
              marginTop: "0.2cm",
            }}
          >
            <h6>Transaction Summary</h6>
          </div>
          {/*  */}
          <div className="just-divider"></div>
          <table className="" style={{ borderSpacing: 0, width: "100%" }}>
            {rowMapping}
          </table>

          <div className="parent  parent-invoice-total mb-3">
            <span className="invoice-total-text child">TOTAL :</span>
            <span className="invoice-total child diff-fonts">
              ₹ {totalAmount}/-
            </span>
          </div>
          <div className="btnPrint d-flex justify-content-center mx-5 my-1">
            <MyButton
              text="Print"
              icon={<PrintIcon />}
              onClick={() => {
                window.print();
              }}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="like-parent-border btnPrint">
          <FormControl fullWidth sx={{ textAlign: "left" }}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={(e) => {
                setFirstTime(false);
                handleChange(e);
              }}
              default
              row
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Large Receipt"
                // labelPlacement="top"
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Small Receipt"
                // labelPlacement="top"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="parent-border">
          <div className="border">
            <div className="parent parent-invoice-logo-type">
              <div>
                <div className="invoice-logo child">
                  <LogoComponent width="25%" />
                </div>
                <span className="invoice-type child">RECEIPT</span>
                {/* <span className="invoice-date child">
                  {invoiceDate ? myDateDDMMyy(invoiceDate) : "Null"}
                </span> */}
              </div>

              <table
                className="child invoice-table-address"
                style={{ borderSpacing: 0 }}
              >
                <tr className="table-addresses">
                  <th>Agent Information</th>
                </tr>
                <tr className="temp">
                  <td>
                    {user ? user.establishment : "Null"} <br />
                  </td>
                </tr>
                <tr style={{}}>{user ? user.username : "Null"}</tr>
                {/* <tr className="table-addresses" style={{ marginTop: "5cm" }}>
                <th>Receipt Date</th>
              </tr>
              <tr style={{}}>
                {invoiceDate ? myDateDDMMyy(invoiceDate) : "Null"}
              </tr> */}
              </table>
            </div>

            {/* <div className="parent parent-invoice-table-address">
          </div> */}
            <div className="parent parent-invoice-table">
              <div
                className="d-flex justify-content-center"
                style={{
                  marginBottom: "0.2cm",
                }}
              >
                <h6>Transaction Summary</h6>
              </div>
              <table className="invoice-table" style={{ borderSpacing: 0 }}>
                <tr className="table-row-border">
                  <th className="large-column">Date</th>
                  <th className="large-column">Customer</th>
                  <th className="large-column">Operator</th>
                  <th className="large-column">Acc Details</th>
                  <th className="large-column">Operator ID</th>
                  <th className="large-column">Amount</th>
                  <th className="small-column">Status</th>
                </tr>
                {rowMapping}
              </table>
            </div>

            <div className="parent  parent-invoice-total mb-3">
              <span className="invoice-total-text child">TOTAL :</span>
              <span className="invoice-total child diff-fonts">
                ₹ {totalAmount}/-
              </span>
            </div>
            <div className="btnPrint d-flex justify-content-center mx-5 my-1">
              <MyButton
                text="Print"
                icon={<PrintIcon />}
                onClick={() => {
                  window.print();
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default PaymentReceipt;
