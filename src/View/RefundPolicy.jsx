import { Box, Container } from "@mui/material";
import React from "react";

const RefundPolicy = () => {
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <div className="landing-bg_biggpay_font">Refund &amp; Policy</div>
        <Box
          style={{
            width: "60px",
            height: "10px",
            backgroundColor: "#dc5f5f",
          }}
        ></Box>
        <div>
          <div>
            <div>
              <p className="landing-bg_para">
                Once a User chooses to avail any service plan/offer announced by{" "}
                <strong> PaisaKart</strong> and agrees to buy that
                plan/offer by due payment for that plan/offer to{" "}
                <strong> PaisaKart</strong>, such payment by User shall
                not be refunded by <strong> PaisaKart</strong> under
                any circumstances whatsoever. Please note that such act of
                buying
                <strong> PaisaKart</strong> plan is irreversible
                process under the applicable law.
              </p>

              <p className="landing-bg_para">
                Post receipt of payment from the User for the above-mentioned
                plan, <strong> PaisaKart</strong> shall create User ID
                in its system ONLY post successful KYC verification of such
                User. If the User is unable to get successful KYC done,{" "}
                <strong> PaisaKart</strong> shall not be able to create
                User ID of such User. Thus, in order to avail
                <strong> PaisaKart</strong> services on its portal,
                User has to mandatorily get his successful KYC verification
                done.
              </p>
              <p className="landing-bg_para">
                Post User Id creation, while availing various services on
                <strong> PaisaKart</strong> portal, a transactions
                which have failed for any reason directly attributable to{" "}
                <strong> PaisaKart</strong> and
                <strong> PaisaKart</strong> has received corresponding
                confirmation from the payment gateway, will be automatically
                refunded to User’s bank account within 3-21 working days from
                the date of transaction and a confirmation mail will be sent to
                User’s email id registered with{" "}
                <strong> PaisaKart</strong>. Please note that only the
                actual transaction amount will be refunded excluding payment
                gateway charges and all applicable taxes. However, for cases
                where User has received a successful completion confirmation but
                not received services, User is required to submit a complaint by
                sending an e-mail to customer care Email ID given on this
                website. <strong> PaisaKart</strong> shall enquire the
                matter after receiving the complaint from the User and based on
                the enquiry
                <strong> PaisaKart</strong> may refund the payment. In
                all cases,
                <strong> PaisaKart</strong> liability will be
                restricted to providing User a valid refund to the extent of
                corresponding payment received by{" "}
                <strong> PaisaKart</strong> with respect to a
                particular transaction. <strong> PaisaKart</strong>{" "}
                shall not be responsible for any other claim or consequential
                liability arising out of failed services on our system.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RefundPolicy;
