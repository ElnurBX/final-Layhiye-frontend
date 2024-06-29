import React, { useContext, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import MainContext from "../../../context/context";
import "./Destinations.scss";
import { Link } from "react-router-dom";
// Custom Arrow Components
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "" }}
      onClick={onClick}
    />
  );
}

function Destinations() {
  const { Citys, setCitys } = useContext(MainContext);

  useEffect(() => {
    axios.get("http://localhost:8080/api/Citys").then((res) => {
      setCitys([...res.data]);
    });
  }, [setCitys]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />, 
    prevArrow: <SamplePrevArrow />, 
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container container m-auto mb-5 Destinations">
      <Slider {...settings}>
        {Citys.map((item) => {
          const { _id, mainImg, title, hotels } = item;
          return (
            <div className="slider-item" key={_id}>
              <div className="city-img">
                <img
                  className="w-100"
                  src={`http://localhost:8080/uploads/citys/${mainImg}`}
                  alt={title}
                />
              </div>
              <Link className="text-decoration-none d-block p" to={`/details/city/${_id}`}>{title}</Link>
              <span>{hotels.length} Hotels</span>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Destinations;
