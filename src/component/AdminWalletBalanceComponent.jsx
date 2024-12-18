import { Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { get, postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import AuthContext from "../store/AuthContext";
import { apiErrorToast } from "../utils/ToastUtil";
import DashboardDataComponent1 from "./DashboardDataComponent1";
import { Balance } from "@mui/icons-material";

const AdminWalletBalanceComponent = ({
  graphDuration,
  isPaisaKart = false,
}) => {
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const [prequest, setPRequest] = useState(false);
  const [trequest, setTRequest] = useState(false);

  const [walletBalReq, setWalletBalReq] = useState(false);
  const [bankBalReq, setBankBalReq] = useState(false);
  const [apiBalReq, setApiBalReq] = useState(false);
  const [w1, setW1] = useState("");
  const [w2, setW2] = useState("");
  const [walletData, setWalletData] = useState([
    { name: "Primary", balance: "0", color: "#00BF78" },
    { name: "Tertiary", balance: "0", color: "#9f86c0" },
    { name: "Wallet Balance", balance: "0", color: "#DC5F5F" },
    { name: "Bank Balance", balance: "0", color: "#F08D17" },
    { name: "API Balances", balance: "0", color: "#FFB6C6" },
  ]);

  const [walletDataAsm, setWalletDataAsm] = useState([
    { name: "Primary", balance: "0", color: "#00BF78" },
    { name: "Tertiary", balance: "0", color: "#9f86c0" },
  ]);
  const [apiBalancesData, setApiBalancesData] = useState([]);
  // console.log("apiBalancesData", apiBalancesData);
  // console.log("wallet data", w¿);
  const getBankBalance = () => {
    get(
      ApiEndpoints.ADMIN_DASHBOARD_GET_BANK_BALANCE,
      ``,
      setBankBalReq,
      (res) => {
        const data = res.data.data;
        const newData = [...walletData];

        newData.forEach((item) => {
          if (item.name === "Bank Balance") {
            item.balance = data;
          }
        });
        setWalletData(newData);
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };
  const getAPIBalance = () => {
    get(
      ApiEndpoints.ADMIN_DASHBOARD_GET_API_BALANCE,
      ``,
      setApiBalReq,
      (res) => {
        const data = res?.data?.data;
         
        setWalletData((prevData)=>
          prevData?.map((item)=>
            item.name==="API Balances"?{...item,"balance":data}:item));
      

        // const newData = [...walletData];
        // let amount = 0;
        // const bankBalDorpData = Object.keys(data).map((item) => {
        //   return { bankName: item, bankBalance: data[item] };
        // });
        // setApiBalancesData(bankBalDorpData);
        // Object.values(data).forEach((item) => {
        //   amount = amount + item * 1;
        // });

        // newData.forEach((item) => {
        //   if (item.name === "API Balances") {
        //     item.balance = amount;
        //   }
        // });
        // setWalletData(newData);
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };
  console.log("wallet1 in adminb", walletData);
  // console.log("wallet2 in adminb", w2);

  const getWalletBalance = () => {
    get(
      ApiEndpoints.ADMIN_DASHBOARD_GET_WALLET_BALANCE,
      ``,
      setWalletBalReq,
      (res) => {
        const data =
          parseInt(res.data.data.w1) / 100 + parseInt(res.data.data.w2) / 100;

        setW1(parseInt(res.data.data.w1) / 100);
        setW2(parseInt(res.data.data.w2) / 100);
        const newData = [...walletData];
        newData.forEach((item) => {
          if (item.name === "Wallet Balance") {
            item.balance = data;
          }
        });
        setWalletData(newData);
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };
  const getPrimaryBalance = () => {
    postJsonData(
      ApiEndpoints.ADMIN_DASHBOARD_GET_PRIMARY_BALANCE,
      {
        type: graphDuration,
      },
      setPRequest,
      (res) => {
        const data = res.data.data;

        const newData =
          user && (user.role === "Asm" || user.role === "Zsm")
            ? [...walletDataAsm]
            : [...walletData];
        newData.forEach((item) => {
          if (item.name === "Primary") {
            item.balance = data;
          }
        });
        if (user && (user.role === "Asm" || user.role === "Zsm")) {
          setWalletDataAsm(newData);
        } else {
          setWalletData(newData);
        }
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };
  const getTertiaryBalance = () => {
    postJsonData(
      ApiEndpoints.ADMIN_DASHBOARD_GET_TERTIARY_BALANCE,
      {
        type: graphDuration,
      },
      setTRequest,
      (res) => {
        const data = res.data.data;
        const profit = res.data.profit;
        const newData =
          user && (user.role === "Asm" || user.role === "Zsm")
            ? [...walletDataAsm]
            : [...walletData];
        newData.forEach((item) => {
          if (item.name === "Tertiary") {
            item.balance = data;
            item.profit = profit;
          }
        });
        if (user && (user.role === "Asm" || user.role === "Zsm")) {
          setWalletDataAsm(newData);
        } else {
          setWalletData(newData);
        }
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };
  useEffect(() => {
    getPrimaryBalance();
    getTertiaryBalance();
  }, [graphDuration]);

  useEffect(() => {
    if (user && (user.role === "Asm" || user.role === "Zsm")) {
      getPrimaryBalance();
      getTertiaryBalance();
    } else {
      getWalletBalance();
      getBankBalance();
      getPrimaryBalance();
      getTertiaryBalance();
      getAPIBalance();
    }
  }, []);

  return (
    <Grid
      container
      xs={12}
      md={12}
      lg={10}
      sx={{
        display: "flex",
        justifyContent: { md: "left", lg: "right", xs: "left" },
        alignItems: "start",
        mt: { md: 1, lg: 0, xs: 1 },
        mr: { md: 1, lg: 0, xs: 1 },
      }}
    >
      {user && (user.role === "Asm" || user.role === "Zsm")
        ? walletDataAsm &&
          walletDataAsm?.map((item, index) => {
            return (
              <Grid
                key={index}
                item
                xs={6}
                sm={3}
                md={3}
                sx={{
                  mb: { sm: 2, md: 2, xs: 2 },
                }}
              >
                <DashboardDataComponent1
                  key={index}
                  users={item}
                  data="wallet"
                  index={index}
                  len={
                    user && (user.role === "Asm" || user.role === "Zsm")
                      ? walletDataAsm.length
                      : walletData.length
                  }
                  w1={w1}
                  w2={w2}
                  getWalletBal={getWalletBalance}
                  getBankBal={getBankBalance}
                  getPrimaryBalance={getPrimaryBalance}
                  getTertiaryBalance={getTertiaryBalance}
                  PrimaryRequest={prequest}
                  TertiaryRequest={trequest}
                  walletReq={walletBalReq}
                  bankBalReq={bankBalReq}
                />
              </Grid>
            );
          })
        : walletData &&
          walletData?.map((item, index) => {
            return (
              <Grid
                key={index}
                item
                xs={6}
                sm={3}
                md={2.2}
                sx={{
                  mb: { sm: 2, md: 2, xs: 2 },
                }}
              >
                <DashboardDataComponent1
                  users={item}
                  data="wallet"
                  index={index}
                  len={walletData.length}
                  w1={w1 && w1}
                  w2={w2 && w2}
                  getWalletBal={getWalletBalance}
                  getBankBal={getBankBalance}
                  getAPIBal={getAPIBalance}
                  apiBalancesData={apiBalancesData}
                  getPrimaryBalance={getPrimaryBalance}
                  getTertiaryBalance={getTertiaryBalance}
                  PrimaryRequest={prequest}
                  TertiaryRequest={trequest}
                  walletReq={walletBalReq}
                  bankBalReq={bankBalReq}
                  apiBalReq={apiBalReq}
                />
              </Grid>
            );
          })}
    </Grid>
  );
};

export default AdminWalletBalanceComponent;