import React from "react";

const VideoPlayer = ({ link, isOpen }) => {
  return (
    <div className="flex justify-center">
      <iframe
        src={`https://www.youtube.com/embed/${link}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`transition-all duration-700 ease-in-out w-full h-[13rem] sm:h-[300px] md:h-[400px] lg:w-[100%] lg:h-[510px] rounded-[0.7rem] ${
          isOpen ? "lg:h-[430px]" : ""
        }`}
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
