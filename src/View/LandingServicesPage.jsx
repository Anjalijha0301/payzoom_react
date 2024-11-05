import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  aadharAtm_img,
  api,
  irctc_img,
  microATM,
  moBBPS,
  mobileR_img,
  mt,
  qrCode_img,
} from "../iconsImports";
import {
  getActiveColor,
  getEnv,
  getSecondaryColor,
} from "../theme/setThemeColor";
import StayCurrentPortraitIcon from "@mui/icons-material/StayCurrentPortrait";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import AodIcon from "@mui/icons-material/Aod";
import TrainIcon from "@mui/icons-material/Train";
import { useNavigate } from "react-router-dom";

const LandingServicesPage = () => {
  const envName = getEnv();
  const navigate = useNavigate();
  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  // }, []);
  return (
    <div
      className={envName === "MoneyOddr" ? "" : "servicePageBg2"}
      sx={{ paddingBottom: "none !important" }}
      id="our-services"
    >
      <Grid xs={12} className="servicePageBg">
        <Box
          component="div"
          className="pageHead"
          sx={{
            textAlign: "center",
            marginTop: "-3px",
          }}
        >
          Our Services
        </Box>
        {envName === "MoneyOddr" ? (
          <>
            <div className="landingPageSubHeading px-5">
              Unlock new possibilities for your business and boost your earnings
              with <span style={{ fontWeight: "900" }}>MoneyOddR</span>. <br />
              It is a single platform and a one stop solution offering multiple
              range of services
              <br /> which you can provide to your customer and maximise your
              earnings.
            </div>
          </>
        ) : (
          <>
            <div className="landingPageSubHeading">
              We have exciting services for you on our application
            </div>
          </>
        )}
      </Grid>
      {/* <Container maxWidth="lg" className="sectionBreake" sx={{ pb: 10 }}> */}
      <Container maxWidth="lg" sx={{ pb: 10, mt: 10 }}>
        <Grid container className="flex-hc-vc mb-5">
          <Grid
            md={2.7}
            className="icon-box"
            sx={{
              textAlign: "left",
              mb: { md: 0, sm: 2, xs: 2 },
              mt: { md: 0, sm: 3, xs: 3 },
            }}
          >
            <span className="icon">
              <StayCurrentPortraitIcon
                sx={{
                  // color: getSecondaryColor(),
                  fontSize: "2.2rem",
                }}
                className="actual-icon"
              />
            </span>
            <Typography className="icon-box-heading">
              Bill Payments & Recharges
            </Typography>
            <Typography className="box-para justify-content">
              Earn more by doing DTH/ Mobile recharges, Utility bill payments,
              for your customers easily and quickly of more than 150 companies.
            </Typography>
          </Grid>
          <Grid
            md={2.7}
            className="icon-box"
            sx={{ textAlign: "left", mb: { md: 0, sm: 2, xs: 2 } }}
          >
            <span className="icon">
              <SatelliteAltIcon
                sx={{
                  // color: getSecondaryColor(),
                  fontSize: "2.2rem",
                }}
                className="actual-icon"
              />
            </span>
            <Typography className="icon-box-heading">DTH Recharge</Typography>
            <Typography className="box-para justify-content">
              With
              <span style={{ marginRight: "3px", marginLeft: "3px" }}>
                {envName === "MoneyOddr" ? "MoneyOddR" : "PayZoom"}
              </span>
              merchant app, choose from a variety of operators like Airtel DTH,
              Dish TV, Videocon D2h.
            </Typography>
          </Grid>
          <Grid
            md={2.7}
            className="icon-box"
            sx={{ textAlign: "left", mb: { md: 0, sm: 2, xs: 2 } }}
          >
            <span className="icon">
              <AodIcon
                sx={{
                  // color: getSecondaryColor(),
                  fontSize: "2.2rem",
                }}
                className="actual-icon"
              />
            </span>
            <Typography className="icon-box-heading">
              Utility Recharge
            </Typography>
            <Typography className="box-para justify-content">
              Gone are the days when anyone used to stand in a long queue,
              waiting for hours just for filling their monthly bills namely
              Electricity, Water, and Gas.
            </Typography>
          </Grid>
          <Grid
            md={2.7}
            className="icon-box"
            sx={{ textAlign: "left", mb: { md: 0, sm: 2, xs: 2 } }}
          >
            <span className="icon">
              <TrainIcon
                sx={{
                  // color: getSecondaryColor(),
                  fontSize: "2.2rem",
                }}
                className="actual-icon"
              />
            </span>
            <Typography className="icon-box-heading">Money Transfer</Typography>
            <Typography className="box-para justify-content">
              We are proud to say that we are Offering Instant and Secure
              Payment Soution to our Customer. Now Our Customers can do Instant
              Money Transfer from our portal
            </Typography>
          </Grid>
        </Grid>
        {/* <Grid container maxWidth="lg" className="bottom2top">
          <Grid
            md={6}
            lg={6}
            sm={12}
            xs={12}
            sx={{ mt: { md: "0", sm: "30px", xs: "30px" } }}
          >
            <span
              className="landingPageHeadings"
              style={{
                textAlign: "left",
                display: "flex",
                justifyContent: "start",
              }}
            >
              Bill Payments & Recharges
            </span>
            <Box
              sx={{
                width: "60px",
                height: "10px",
                backgroundColor: "#4E5555",
              }}
            ></Box>
            <Box
              className="landing-bg_para"
              sx={{
                textAlign: "justify",
              }}
            >
              Earn more by doing DTH/ Mobile recharges, Utility bill payments,
              for your customers easily and quickly of more than 150 companies.
              Now help your customers by making bill payments and recharge at
              the snap of your fingertips with the help of the {getEnv()}{" "}
              Merchant App. {getEnv()} enables any retailer to make any recharge
              and bill payments associated with Electricity, Water, Gas, DTH,
              and Telecomm to name a few. Thereby, {getEnv()} converts any shop
              into a one-stop solution for any of the customer needs associating
              with bill payment and recharge.
            </Box>
          </Grid>
          <Grid
            // className="reveal"
            lg={6}
            md={6}
            sx={{ display: { md: "block", sm: "none", xs: "none" } }}
          >
            <img
              src={mobile}
              alt=" Bill Payments & Recharges"
              width="100%"
            ></img>
          </Grid>
        </Grid> */}

        {/* <Grid container maxWidth="lg" className="sectionBreake reveal2"> */}
        {/* <Grid container maxWidth="lg" className="bottom2top">
          <Grid
            lg={6}
            md={6}
            sx={{ display: { md: "block", sm: "none", xs: "none" } }}
          >
            <img src={dth_img} alt="Mobile recharge" width="80%"></img>
          </Grid>
          <Grid md={6} lg={6} sm={12} xs={12}>
            <span
              className="landingPageHeadings"
              style={{
                textAlign: "left",
                display: "flex",
                justifyContent: "start",
              }}
            >
              DTH Recharge
            </span>
            <Box
              style={{
                width: "60px",
                height: "10px",
                backgroundColor: "#4E5555",
              }}
            ></Box>
            <div className="landing-bg_para" style={{ textAlign: "justify" }}>
              Now, don’t let anything come in between your customer and their
              entertainment. With the {getEnv()} merchant app, choose from a
              variety of operators like Airtel DTH, Dish TV, Videocon D2h, and
              Tata sky to name a few, and select the best package for your
              customer depending on your customer’s needs. So choose {getEnv()}
              for doing DTH recharge anytime and anywhere.
            </div>
          </Grid>
        </Grid> */}
        {/* <Grid container maxWidth="lg" className="bottom2top">
          <Grid md={6} lg={6} sm={12} xs={12}>
            <span
              className="landingPageHeadings"
              style={{
                textAlign: "left",
                display: "flex",
                justifyContent: "start",
              }}
            >
              Utility Recharge
            </span>
            <Box
              style={{
                width: "60px",
                height: "10px",
                backgroundColor: "#4E5555",
              }}
            ></Box>
            <div className="landing-bg_para" style={{ textAlign: "justify" }}>
              Gone are the days when anyone used to stand in a long queue,
              waiting for hours just for filling their monthly bills namely
              Electricity, Water, and Gas. With the {getEnv()} merchant app in
              your mobile, you can ease your customer’s life and save their time
              by giving them the option of filling their monthly bill/ dues
              through your smartphone, {getEnv()} merchant app, and most
              importantly through you !
            </div>
          </Grid>
          <Grid
            lg={6}
            md={6}
            sx={{ display: { md: "block", sm: "none", xs: "none" } }}
          >
            <img src={utility_img} alt="Mobile recharge" width="80%"></img>
          </Grid>
        </Grid> */}
        {/* <Grid container maxWidth="lg" className="bottom2top">
          <Grid
            lg={6}
            md={6}
            sx={{ display: { md: "block", sm: "none", xs: "none" } }}
          >
            <img src={irctc_img} alt="irctc " width="80%"></img>
          </Grid>
          <Grid md={6} lg={6} sm={12} xs={12}>
            <span
              className="landingPageHeadings"
              style={{
                textAlign: "left",
                display: "flex",
                justifyContent: "start",
              }}
            >
              IRCTC Ticket Booking
            </span>
            <Box
              style={{
                width: "60px",
                height: "10px",
                backgroundColor: "#4E5555",
              }}
            ></Box>
            <div className="landing-bg_para" style={{ textAlign: "justify" }}>
              We are proud to say that we are one of the few vendors who are
              authorized from IRCTC to book train tickets. Now you can easily
              book tickets online for any train, class, or destination. With us,
              you don’t need to worry about the status of your booking because
              our service is highly fast, safe, simple and reliable. So before
              you miss on to your favorite berth, download our app today !
            </div>
          </Grid>
        </Grid> */}

        <Grid container maxWidth="lg" className="bottom2top">
          <Grid
            lg={6}
            md={6}
            sx={{ display: { md: "block", sm: "none", xs: "none" } }}
          >
            <img src={irctc_img} alt="irctc img " width="80%"></img>
          </Grid>
          {envName === "MoneyOddr" ? (
            <Grid md={6} lg={6} sm={12} xs={12} sx={{ mt: { md: 5, xs: 0 } }}>
              <span
                className="landingPageHeadings"
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                Travel Services
              </span>
              <Box
                style={{
                  width: "60px",
                  height: "10px",
                  backgroundColor:
                    envName === "MoneyOddr" ? "#01A0E2" : "#0077b6",
                }}
              ></Box>
              <div className="landing-bg_para" style={{ textAlign: "justify" }}>
                MoneyOddR offers you a comprehensive range of travel options,
                including flights, hotels, train, bus and vacation packages all
                in one convenient platform. With our user-friendly interface and
                reliable service partners you can effortlessly search, compare,
                and book the best deals as per your customer preferences.
              </div>
              <Box
                sx={{ display: "flex", justifyContent: "left", mt: 2, mb: 3 }}
              >
                <Button
                  className="primary-button"
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                >
                  Signup now
                </Button>
              </Box>
            </Grid>
          ) : (
            <Grid md={6} lg={6} sm={12} xs={12} sx={{ mt: { md: 5, xs: 0 } }}>
              <span
                className="landingPageHeadings"
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                IRCTC Ticket Booking
              </span>
              <Box
                style={{
                  width: "60px",
                  height: "10px",
                  backgroundColor:
                    envName === "MoneyOddr" ? "#01A0E2" : getActiveColor(),
                }}
              ></Box>
              <div className="landing-bg_para" style={{ textAlign: "justify" }}>
                {getEnv()} proud to say that we are one of the few vendors who
                are authorized from IRCTC to book train tickets. Now you can
                easily book tickets online for any train, class, or destination.
                With us, you don’t need to worry about the status of your
                booking because our service is highly fast, safe, simple and
                reliable. So before you miss on to your favorite berth, download
                our app today !
              </div>
              <Box
                sx={{ display: "flex", justifyContent: "left", mt: 2, mb: 3 }}
              >
                <Button
                  className="primary-button"
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                >
                  Signup now
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>

        <Grid container maxWidth="lg" className="bottom2top">
          <Grid md={6} lg={6} sm={12} xs={12} sx={{ mt: { md: 5, xs: 0 } }}>
            <span
              className="landingPageHeadings"
              style={{
                textAlign: "left",
                display: "flex",
                justifyContent: "start",
                color: getSecondaryColor(),
              }}
            >
              My QR/UPI
            </span>
            <Box
              style={{
                width: "60px",
                height: "10px",
                backgroundColor: getActiveColor(),
              }}
            ></Box>
            <div className="landing-bg_para" style={{ textAlign: "justify" }}>
              <span style={{ marginRight: "10px" }}>PayZoom</span>
              brings you one more attractive option of increasing your options
              of accepting payments in the form of QR codes or UPI. Basically QR
              code is a contactless payment service that enables your customers
              to simply scan a code from their smartphone and complete the
              transaction. The service is highly reliable, safe, and secure and
              the transaction is performed almost instantly.{" "}
            </div>
            <Box sx={{ display: "flex", justifyContent: "left", mt: 2, mb: 3 }}>
              <Button
                className="primary-button"
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Signup now
              </Button>
            </Box>
          </Grid>
          <Grid
            lg={6}
            md={6}
            sx={{ display: { md: "block", sm: "none", xs: "none" } }}
          >
            <img src={qrCode_img} alt="qrCode img " width="80%"></img>
          </Grid>
        </Grid>
        <Grid container maxWidth="lg" className="bottom2top">
          <Grid
            lg={6}
            md={6}
            sx={{ display: { md: "block", sm: "none", xs: "none" } }}
          >
            <img src={mt} alt="irctc" width="80%"></img>
          </Grid>

          <Grid md={6} lg={6} sm={12} xs={12}>
            <span
              className="landingPageHeadings"
              style={{
                textAlign: "left",
                display: "flex",
                justifyContent: "start",
                color: getSecondaryColor(),
              }}
            >
              Money Transfer
            </span>
            <Box
              style={{
                width: "60px",
                height: "10px",
                backgroundColor: getActiveColor(),
              }}
            ></Box>
            <div
              className="landing-bg_para"
              style={{ textAlign: "justify", color: "#fff" }}
            >
              At {getEnv()} we understand your concerns and try to come up with
              solutions for addressing those issues. We realized that sending
              money to your friends and family was still a difficult task for
              many people and for solving that problem, we bring you the
              <span className="mx-1">{getEnv()}</span> money transfer feature.
              This can be used to send money anywhere across India and Nepal. It
              is highly safe, secure, and reliable
            </div>
            <Box sx={{ display: "flex", justifyContent: "left", mt: 2, mb: 3 }}>
              <Button
                className="primary-button"
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Signup now
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container maxWidth="lg" className="bottom2top">
          {envName === "MoneyOddr" ? (
            <Grid md={6} lg={6} sm={12} xs={12}>
              <span
                className="landingPageHeadings"
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                AEPS
              </span>
              <Box
                style={{
                  width: "60px",
                  height: "10px",
                  backgroundColor:
                    envName === "MoneyOddr" ? "#01A0E2" : getActiveColor(),
                }}
              ></Box>
              <div className="landing-bg_para" style={{ textAlign: "justify" }}>
                <span style={{ fontWeight: "900" }}>
                  Aadhaar Enabled Payment System
                </span>
                is one of the major initiatives of Indian banking system by
                which a customer can use the banking services like Cash Deposit
                & Withdrawal, Balance Enquiry and Mini Statement etc. from their
                aadhaar linked bank account by using the biometric
                authentication. This service is majorly used in the area where
                either ATM(s) are Not available/Non Operative or by the people
                who are non active banking user(s). Join MoneyOddR today and
                make a difference in people's lives while growing your business.
              </div>
              <Box
                sx={{ display: "flex", justifyContent: "left", mt: 2, mb: 3 }}
              >
                <Button
                  className="primary-button"
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                >
                  Signup now
                </Button>
              </Box>
            </Grid>
          ) : (
            <Grid md={6} lg={6} sm={12} xs={12}>
              <span
                className="landingPageHeadings"
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "start",
                  color: getSecondaryColor(),
                }}
              >
                Aadhar ATM
              </span>
              <Box
                style={{
                  width: "60px",
                  height: "10px",
                  backgroundColor:
                    envName === "MoneyOddr" ? "#01A0E2" : getActiveColor(),
                }}
              ></Box>
              <div
                className="landing-bg_para"
                style={{ textAlign: "justify", color: "#fff" }}
              >
                Are you fed up with the lengthy lines, computer issues, and lack
                of cash at your local bank branch. But stop worrying since
                {getEnv()} has a feature called Aadhar ATM that will instantly
                transform your everyday store into an ATM outlet. With us, you
                might offer your customers fundamental ATM services like cash
                withdrawal and balance inquiries.
              </div>
              <Box
                sx={{ display: "flex", justifyContent: "left", mt: 2, mb: 3 }}
              >
                <Button
                  className="primary-button"
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                >
                  Signup now
                </Button>
              </Box>
            </Grid>
          )}

          <Grid
            lg={6}
            md={6}
            sx={{ display: { md: "block", sm: "none", xs: "none" } }}
          >
            <img src={aadharAtm_img} alt="irctc" width="80%"></img>
          </Grid>
        </Grid>
        <Grid container maxWidth="lg" className="bottom2top">
          <Grid
            lg={6}
            md={6}
            sx={{ display: { md: "block", sm: "none", xs: "none" } }}
          >
            <img src={mobileR_img} alt="Mobile recharge" width="80%"></img>
          </Grid>
          {envName === "MoneyOddr" ? (
            <Grid md={6} lg={6} sm={12} xs={12}>
              <span
                className="landingPageHeadings"
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                Prepaid Mobile & DTH Recharges
              </span>
              <Box
                style={{
                  width: "60px",
                  height: "10px",
                  backgroundColor:
                    envName === "MoneyOddr" ? "#01A0E2" : getActiveColor(),
                }}
              ></Box>
              <div className="landing-bg_para" style={{ textAlign: "justify" }}>
                MoneyOddR gives you the platform where you can find multiple
                operators and suitable plans for your customers and makes the
                recharge experience better than ever. Also MoneyOddR gives you
                the opportunity to earn a good commission on each recharge.
              </div>
              <Box
                sx={{ display: "flex", justifyContent: "left", mt: 2, mb: 3 }}
              >
                <Button
                  className="primary-button"
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                >
                  Signup now
                </Button>
              </Box>
            </Grid>
          ) : (
            <Grid md={6} lg={6} sm={12} xs={12}>
              <span
                className="landingPageHeadings"
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "start",
                  color: getSecondaryColor(),
                }}
              >
                Mobile Recharge
              </span>
              <Box
                style={{
                  width: "60px",
                  height: "10px",
                  backgroundColor: getActiveColor(),
                }}
              ></Box>
              <div
                className="landing-bg_para"
                style={{ textAlign: "justify", color: "#fff" }}
              >
                Earn more by doing DTH/ Mobile recharges, Utility bill payments,
                for your customers easily and quickly of more than 150
                companies. Now help your customers by making bill payments and
                recharge at the snap of your fingertips with the help of the{" "}
                {getEnv()} Merchant App. {getEnv()} enables any retailer to make
                any recharge and bill payments associated with Electricity,
                Water, Gas, DTH, and Telecomm to name a few. Thereby, {getEnv()}{" "}
                converts any shop into a one-stop solution for any of the
                customer needs associating with bill payment and recharge.
              </div>
              <Box
                sx={{ display: "flex", justifyContent: "left", mt: 2, mb: 3 }}
              >
                <Button
                  className="primary-button"
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                >
                  Signup now
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
        <Grid container maxWidth="lg" className="bottom2top">
          <Grid md={6} lg={6} sm={12} xs={12}>
            <span
              className="landingPageHeadings"
              style={{
                textAlign: "left",
                display: "flex",
                justifyContent: "start",
                color: getSecondaryColor(),
              }}
            >
              API banking
            </span>
            <Box
              style={{
                width: "60px",
                height: "10px",
                backgroundColor: getActiveColor(),
              }}
            ></Box>
            <div
              className="landing-bg_para"
              style={{ textAlign: "justify", color: "#fff" }}
            >
              An intuitive, simple-to-implement, and iterative modern API
              banking stack. has been built with scalability and dependability
              in mind.An great banking tool, API banking simplifies the process
              of doing online banking through your website. Simply integrate the
              system into your backend ERP to begin doing balance inquiries,
              money transfers, and other financial operations on our platform!
            </div>
            <Box sx={{ display: "flex", justifyContent: "left", mt: 2, mb: 3 }}>
              <Button
                className="primary-button"
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Signup now
              </Button>
            </Box>
          </Grid>
          <Grid
            lg={6}
            md={6}
            sx={{ display: { md: "block", sm: "none", xs: "none" } }}
          >
            <img src={api} alt="Mobile recharge" width="80%"></img>
          </Grid>
        </Grid>
        {envName === "MoneyOddr" && (
          <Grid container maxWidth="lg" className="bottom2top">
            <Grid
              lg={6}
              md={6}
              sx={{ display: { md: "block", sm: "none", xs: "none" } }}
            >
              <img src={microATM} alt="Mobile recharge" width="80%" />
            </Grid>
            <Grid md={6} lg={6} sm={12} xs={12}>
              <span
                className="landingPageHeadings"
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                Micro-ATM
              </span>
              <Box
                style={{
                  width: "60px",
                  height: "10px",
                  backgroundColor:
                    envName === "MoneyOddr" ? "#01A0E2" : getActiveColor(),
                }}
              ></Box>
              <div className="landing-bg_para" style={{ textAlign: "justify" }}>
                It is a perfect example of innovation by the fintech industry
                and Indian banking system. This innovative micro device allows
                you to offer cash withdrawal, balance enquiries, mini statements
                and transforming your shop into an ATM. M-ATM is popular in
                remote area(s) where ATM machines are not available. It is also
                used by people who need urgent cash but are not able to find the
                nearby ATM. Become a MoneyOddR’s representative to convert your
                shop into an ATM and increase your income with attractive
                commission.
              </div>
              <Box
                sx={{ display: "flex", justifyContent: "left", mt: 2, mb: 3 }}
              >
                <Button
                  className="primary-button"
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                >
                  Signup now
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
        {envName === "MoneyOddr" && (
          <Grid container maxWidth="lg" className="bottom2top">
            <Grid md={6} lg={6} sm={12} xs={12}>
              <span
                className="landingPageHeadings"
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                BBPS
              </span>
              <Box
                style={{
                  width: "60px",
                  height: "10px",
                  backgroundColor:
                    envName === "MoneyOddr" ? "#01A0E2" : getActiveColor(),
                }}
              ></Box>
              <div className="landing-bg_para" style={{ textAlign: "justify" }}>
                <span style={{ fontWeight: "900" }}>
                  Bharat Bill Payments System
                </span>
                was introduced by RBI to make the bill payments easy and
                accessible across the country. By this integrated and
                interoperable service customers can use the facility of bill
                payment anytime and anywhere irrespective of the geographical
                location. Customers can find the authorised BBPS outlet nearest
                to them and can make payments for their bills. Also there are so
                many modes of payment to make the facility more convenient. By
                becoming an authorised MoneyOddR’s agent you can serve the
                people and can earn good income as well.
              </div>
              <Box
                sx={{ display: "flex", justifyContent: "left", mt: 2, mb: 3 }}
              >
                <Button
                  className="primary-button"
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                >
                  Signup now
                </Button>
              </Box>
            </Grid>
            <Grid
              lg={6}
              md={6}
              sx={{ display: { md: "block", sm: "none", xs: "none" } }}
            >
              <img src={moBBPS} alt="Mobile recharge" width="60%"></img>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default LandingServicesPage;
