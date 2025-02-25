import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import DropDown from "./DropDown";
import { useContext } from "react";
import { Context } from "../context/Context";
import russiaFlagImg from "@i/russia-flag-icon.svg";
import britianFlagImg from "@i/united-kingdom-flag-icon.svg";

export default () => {
  const slideStyle = {
    backgroundColor: "#d4e6ff",
    borderRadius: "8px",
    border: "1px solid #a0c0ff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column" as const,
    padding: "20px",
    position: "relative" as const,
    width: "100%",
    height: "100%",
  };
  
  const { flag, changeLang } = useContext(Context)!;

  return (
    <div style={{ 
      padding: "80px 0", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      width: "100%" 
    }}>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        style={{ 
          width: "440px", 
          height: "600px" 
        }}
      >
        {[0, 1, 2].map((index) => (
          <SwiperSlide key={index} style={slideStyle}>
            <button 
              style={{ 
                position: "absolute", 
                top: "10px", 
                right: "10px", 
                background: "transparent", 
                border: "none", 
                cursor: "pointer", 
                padding: "5px" 
              }} 
              onClick={() => changeLang(flag)}
            >
              <img
                src={flag ? britianFlagImg : russiaFlagImg}
                alt="Flag of the countries language translated"
                style={{ 
                  width: "24px", 
                  height: "24px", 
                  display: "block" 
                }}
              />
            </button>
            <DropDown cardIndex={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};