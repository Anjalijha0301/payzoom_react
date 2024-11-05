import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import LandingPageWhoWeAre from "./LandingPageWhoWeAre";
import LandingPageWeOffer from "./LandingPageWeOffer";
import LandingPageBuildSecurity from "./LandingPageBuildSecurity";
import LandingPageAppDnld from "./LandingPageAppDnld";
import HeroSection from "./HeroSection";
// import ServiceCrausal from "./ServiceCrausal";
// import LandingPageIntro from "./LandingPageIntro";


const LandingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{process.env.REACT_APP_TITLE}</title>
        <meta name="description" content="PayZoom" />
        <meta name="keywords" content="payzoom" />
      </Helmet>
      <div className="app-content">
        {/* <ServiceCrausal /> */}
        {/* <LandingPageIntro /> */}
        <HeroSection />
        <LandingPageWhoWeAre />
        <LandingPageWeOffer />

        <LandingPageBuildSecurity />
        <LandingPageAppDnld />
        {/* <LandingPageTestimonials /> */}
      </div>
    </div>
  );
};

export default LandingPage;
