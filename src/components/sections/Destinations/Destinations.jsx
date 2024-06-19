import React, { useContext, useEffect } from "react";
import Slider from "react-slick";
import './Destinations.scss';
import axios from "axios";
import MainContext from "../../../context/context";

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
              <p>{title}</p>
              <span>{hotels.length} Hotels</span>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Destinations;
