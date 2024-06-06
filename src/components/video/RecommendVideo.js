import React from "react";
import { MdVerified } from "react-icons/md";
import { useLocation } from "react-router-dom";

const RecommendVideo = ({
  logo,
  thumbnail,
  name,
  channel,
  views,
  uploadTime,
}) => {
  const location = useLocation();
  return (
    <div
      className={`text-yt-white ${
        location.pathname === "/YoutubeStudio" ? "flex" : ""
      } md:flex cursor-pointer mb-1`}
    >
      <img
        src={thumbnail}
        alt=""
        className={`
        w-[100%] 
        ${
          location.pathname === "/YoutubeStudio"
            ? "w-[30%] h-[5rem] "
            : "h-[13rem]"
        }
         md:h-[9.5rem] md:w-[30%] lg:w-[50%] lg:h-[6.5rem] rounded-[13px] lg:rounded-[10px] p-1`}
      />
      <div
        className={`p-2  lg:pt-0 flex gap-2
      ${location.pathname === "/YoutubeStudio" ? "pt-0" : ""}`}
      >
        <img
          src={logo}
          alt=""
          className={`h-[3rem] md:hidden rounded-full p-1
          ${location.pathname === "/YoutubeStudio" ? "hidden" : ""}
          `}
        />
        <div>
          <h2 className="font-medium text-[#fff] md:text-md lg:text-sm mt-0 mb-0 items-center">
            <p className="block md:hidden lg:block">
              {name.length <= 50
                ? name
                : `${name.substr(
                    0,
                    `${location.pathname === "/YoutubeStudio" ? 45 : 60}`
                  )}...`}
            </p>
            <p className="hidden md:block lg:hidden">
              {name.length <= 50 ? name : `${name.substr(0, 80)}...`}
            </p>
          </h2>
          <div className="flex md:block items-center">
            <h3 className="text-[#909090] font-medium text-xs md:text-sm mt-1 md:mt-0 flex items-center">
              {channel}
              <span className="p-1 hidden md:block">
                <MdVerified />
              </span>
              <span className="p-1 md:hidden block">{` • `}</span>
            </h3>
            <h3 className="text-[#909090] font-medium text-xs mt-1 md:mt-0 flex items-center">
              {views} Views
              <span className="p-1 md:hidden block">{` • `}</span>
            </h3>
            <h3 className="text-[#909090] font-medium text-xs mt-1 md:mt-0 flex items-center">
              {uploadTime}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendVideo;
