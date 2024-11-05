import { Grid, IconButton } from "@mui/material";
import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { slider1, slider2 } from "../iconsImports";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = ({ onClick }) => (
  <IconButton
    className="slider-arrow left-arrow"
    onClick={onClick} // Add the onClick handler here
    aria-label="Previous Slide"
    sx={{ backgroundColor: "red" }}
  >
    <ChevronLeftIcon sx={{ fontSize: "30px" }} />
  </IconButton>
);

const NextArrow = ({ onClick }) => (
  <IconButton
    className="slider-arrow right-arrow" // Add "right-arrow" class name
    onClick={onClick}
    aria-label="Next Slide"
  >
    <ChevronRightIcon sx={{ fontSize: "30px" }} />
  </IconButton>
);

const LoginSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Grid container>
      <Grid item md={12} xs={12}>
        <Slider {...settings}>
          <div className="slider-div">
            <div>
              <figure className="SliderCard">
                <img src={slider1} alt="slide1" width="100%" />
              </figure>
            </div>
          </div>
          <div className="slider-div">
            <div>
              <figure className="SliderCard">
                <img src={slider2} alt="slide1" width="100%" />
              </figure>
            </div>
          </div>
        </Slider>
      </Grid>
    </Grid>
  );
};

export default LoginSlider;
