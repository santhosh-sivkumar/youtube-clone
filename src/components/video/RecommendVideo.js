import React from "react";
import { MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const RecommendVideo = ({
  logo,
  thumbnail,
  name,
  channel,
  views,
  uploadTime,
}) => {
  const { pathname } = useLocation();
  const isStudio = pathname === "/YoutubeStudio";
  const { isOpen } = useSelector((state) => state.sidebar);
  const thumbnailClasses = `transition-all ease-in-out duration-700 w-[100%] ${
    isStudio ? "w-[30%] h-[5rem]" : "h-[13rem]"
  } ${isOpen ? "lg:h-[7.5rem]" : ""}

    md:h-[9.5rem] md:w-[30%] lg:w-[50%] lg:h-[6.5rem] rounded-[13px] lg:rounded-[10px] p-1`;
  const logoClasses = `h-[3rem] md:hidden rounded-full p-1 ${
    isStudio ? "hidden" : ""
  }`;
  const containerClasses = `text-yt-white ${
    isStudio ? "flex" : ""
  } md:flex cursor-pointer mb-1`;
  const contentClasses = `p-2 lg:pt-0 flex gap-2 ${isStudio ? "pt-0" : ""}`;

  const getName = () => {
    const maxLength = isStudio ? 45 : 60;
    return name.length <= maxLength ? name : `${name.substr(0, maxLength)}...`;
  };

  return (
    <div className={containerClasses}>
      <img src={thumbnail} alt="Thumbnail" className={thumbnailClasses} />
      <div className={contentClasses}>
        <img src={logo} alt="Logo" className={logoClasses} />
        <div>
          <h2 className="font-medium text-[#fff] md:text-md lg:text-sm mt-0 mb-0 items-center">
            <p className="block md:hidden lg:block">{getName()}</p>
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
              <span className="p-1 md:hidden block"> • </span>
            </h3>
            <h3 className="text-[#909090] font-medium text-xs mt-1 md:mt-0 flex items-center">
              {views} Views
              <span className="p-1 md:hidden block"> • </span>
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
