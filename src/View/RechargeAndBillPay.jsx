import { Tab, Box } from "@mui/material";
import React, { useContext } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MobileRechargeForm from "../component/MobileRechargeForm";
import ElectricityForm from "../component/ElectricityForm";
import CreditcardForm from "../component/CreditcardForm";
import { CircularButton } from "../component/BBPSButtonComponent";
import { getRecAndBillImg, getRecAndBillInvertImg } from "../utils/BbpsIcons";
import { styled } from "@mui/material/styles";
import AuthContext from "../store/AuthContext";
import OutletRegistration from "../component/OutletRegistration";

const StyledTabs = styled((props) => (
  <TabList
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#0077b6",
  },
});

const RechargeAndBillPay = () => {
  const [value, setValue] = React.useState("1");
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box className="card-css" sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <StyledTabs
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              className="cm-hover"
              icon={
                <CircularButton
                  UnderlineRequired={false}
                  onClick={() => {}}
                  txt="Mobile"
                  img={getRecAndBillImg("Mobile Postpaid")}
                  img2={getRecAndBillInvertImg("Mobile Postpaid")}
                  isActive={Number(value) === 1}
                />
              }
              value="1"
            />
            <Tab
              className="cm-hover"
              icon={
                <CircularButton
                  UnderlineRequired={false}
                  onClick={() => {}}
                  txt="DTH"
                  img={getRecAndBillImg("Cable TV")}
                  img2={getRecAndBillInvertImg("Cable TV")}
                  isActive={Number(value) === 2}
                />
              }
              value="2"
            />
            <Tab
              className="cm-hover"
              icon={
                <CircularButton
                  UnderlineRequired={false}
                  onClick={() => {}}
                  txt="Electricity"
                  img={getRecAndBillImg("Electricity")}
                  img2={getRecAndBillInvertImg("Electricity")}
                  isActive={Number(value) === 3}
                />
              }
              value="3"
            />
            <Tab
              className="cm-hover"
              icon={
                <CircularButton
                  UnderlineRequired={false}
                  onClick={() => {}}
                  txt="Credit Card"
                  img={getRecAndBillImg("Credit Card")}
                  img2={getRecAndBillInvertImg("Credit Card")}
                  isActive={Number(value) === 4}
                />
              }
              value="4"
            />
            <Tab
              className="cm-hover"
              icon={
                <CircularButton
                  UnderlineRequired={false}
                  onClick={() => {}}
                  txt="BroadBand"
                  img={getRecAndBillImg("Broadband")}
                  img2={getRecAndBillInvertImg("Broadband")}
                  isActive={Number(value) === 5}
                />
              }
              value="5"
            />
            <Tab
              className="cm-hover"
              icon={
                <CircularButton
                  UnderlineRequired={false}
                  onClick={() => {}}
                  txt="Gas"
                  img={getRecAndBillImg("Gas Cylinder")}
                  img2={getRecAndBillInvertImg("Gas Cylinder")}
                  isActive={Number(value) === 6}
                />
              }
              value="6"
            />
            <Tab
              className="cm-hover"
              icon={
                <CircularButton
                  UnderlineRequired={false}
                  onClick={() => {}}
                  txt="Water"
                  img={getRecAndBillImg("Water")}
                  img2={getRecAndBillInvertImg("Water")}
                  isActive={Number(value) === 7}
                />
              }
              value="7"
            />
            <Tab
              className="cm-hover"
              icon={
                <CircularButton
                  UnderlineRequired={false}
                  onClick={() => {}}
                  txt="Insurance"
                  img={getRecAndBillImg("Insurance")}
                  img2={getRecAndBillInvertImg("Insurance")}
                  isActive={Number(value) === 8}
                />
              }
              value="8"
            />
            <Tab
              className="cm-hover"
              icon={
                <CircularButton
                  UnderlineRequired={false}
                  onClick={() => {}}
                  txt="Landline"
                  img={getRecAndBillImg("Landline")}
                  img2={getRecAndBillInvertImg("Landline")}
                  isActive={Number(value) === 7}
                />
              }
              value="9"
            />
          </StyledTabs>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "70vh",
            alignItems: "center",
          }}
        >
          <TabPanel
            value="1"
            sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
          >
            <MobileRechargeForm view="mobile" />
          </TabPanel>
          <TabPanel
            value="2"
            sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
          >
            <MobileRechargeForm view="dth" />
          </TabPanel>
          <TabPanel
            value="3"
            sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
          >
            <ElectricityForm
              title="Electricity Bill Payment"
              subType="ELECTRICITY"
            />
          </TabPanel>
          <TabPanel
            value="4"
            sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
          >
            {user && !user.instId ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <OutletRegistration autoOpen />
              </Box>
            ) : (
              <CreditcardForm />
            )}
          </TabPanel>
          {/*  */}
          <TabPanel
            value="5"
            sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
          >
            {/* <BroadBandForm /> */}
            <ElectricityForm
              title="Broadband Bill Payment"
              subType="BROADBAND"
            />
          </TabPanel>
          {/*  */}
          <TabPanel
            value="6"
            sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
          >
            {/* <GasForm /> */}
            <ElectricityForm title="Gas Bill Payment" subType="GAS" />
          </TabPanel>
          <TabPanel
            value="7"
            sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
          >
            {/* <WaterForm /> */}
            <ElectricityForm title="Water Bill Payment" subType="WATER" />
          </TabPanel>
          <TabPanel
            value="8"
            sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
          >
            {/* <LicPremiumForm /> */}
            <ElectricityForm title="Insurance" subType="INSURANCE" />
          </TabPanel>
          <TabPanel
            value="9"
            sx={{ width: { md: "60%", sm: "100%", xs: "100%" } }}
          >
            <ElectricityForm title="Landline Bill Payment" subType="LANDLINE" />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};

export default RechargeAndBillPay;
