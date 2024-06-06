import React from "react";
import { BiArrowBack, BiEdit } from "react-icons/bi";

const VideoDetails = ({ video, onClose, handleEditClick }) => {
  const videoDetails = [
    { label: "Category", value: video.category },
    { label: "IFrame Link", value: video.link },
    { label: "Upload Time", value: video.uploadTime },
    { label: "Duration", value: video.duration },
    { label: "Views", value: video.views },
    { label: "Channel", value: video.channel },
    { label: "Subscribers", value: video.subscribers },
  ];

  return (
    <div className="p-4">
      <div className="flex flex-row justify-between">
        <button
          title="Close"
          onClick={onClose}
          className="flex items-center text-yt-blue hover:text-yt-blue transition-colors duration-300"
        >
          <BiArrowBack className="mr-2" size={25} /> Back
        </button>
        <button
          title="Edit"
          onClick={() => handleEditClick(video)}
          className="flex items-center text-yt-blue hover:text-yt-blue transition-colors duration-300"
        >
          <BiEdit className="mr-2" size={25} /> Edit
        </button>
      </div>
      <div className="scrollbar-hide text-yt-white">
        <h2 className="flex flex-row mb-4 justify-center border-b-[1px] border-[#3e3e3e] pb-4 text-yt-white text-xl ">
          Video Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <div className="flex flex-col items-center">
            <img
              src={video.thumbnail}
              alt=""
              className="w-auto object-contain rounded-lg shadow-md mb-4"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-normal text-yt-blue ">Title</p>
            <p className="text-xs mb-2 font-normal">{video.name}</p>
            <p className="text-sm font-normal text-yt-blue mb-1">Description</p>
            <p className="text-xs mb-2 font-normal">{video.description}</p>
            <div className="grid grid-cols-2 gap-4 items-center">
              {videoDetails.map((detail, index) => (
                <React.Fragment key={index}>
                  <p className="text-sm font-normal text-yt-blue">
                    {detail.label}
                  </p>
                  <p className="text-xs font-normal">{detail.value}</p>
                </React.Fragment>
              ))}
              <p className="text-sm font-normal mb-2 text-yt-blue">
                Channel Logo
              </p>
              <img
                src={video.logo}
                alt=""
                className="h-8 w-8 object-cover rounded-full shadow-md mb-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
