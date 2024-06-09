import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { HiDotsHorizontal, HiDownload } from "react-icons/hi";

const VideoActions = ({ liked, likeCount, debouncedToggleLike }) => {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <div className="flex bg-[#2a2a2a] items-center rounded-full h-8 mb-1 sm:mb-0">
        <div
          onClick={debouncedToggleLike}
          className="rounded-l-full flex px-2 h-full items-center border-r-2 border-r-[#404040] cursor-pointer hover:bg-[#404040]"
        >
          {liked ? (
            <AiFillLike className="text-[#fff] text-xl" />
          ) : (
            <AiOutlineLike className="text-[#fff] text-xl" />
          )}
          <p className="text-[#fff] pl-1 pr-2 text-xs font-semibold">
            {likeCount}
          </p>
        </div>
        <div className="rounded-r-full flex pl-3 pr-4 h-full items-center border-r-[#404040] cursor-pointer hover:bg-[#404040]">
          <BiDislike className="text-[20px] font-extralight text-[#fff]" />
        </div>
      </div>
      <div className="flex bg-[#2a2a2a] items-center rounded-full h-8 mb-1 sm:mb-0 cursor-pointer hover:bg-[#404040]">
        <div title="Share" className="flex px-2 items-center cursor-pointer">
          <RiShareForwardLine className="text-xl text-[#fff] font-thin" />
          <p className="text-[#fff] pl-1 pr-2 text-xs font-semibold">Share</p>
        </div>
      </div>
      <div className="flex bg-[#2a2a2a] items-center rounded-full h-8 mb-1 sm:mb-0 cursor-pointer hover:bg-[#404040]">
        <div title="Download" className="flex px-2 items-center cursor-pointer">
          <HiDownload
            title="Download"
            className="text-xl text-[#fff] font-thin"
          />
          <p className="text-[#fff] pl-1 pr-2 text-xs font-semibold">
            Download
          </p>
        </div>
      </div>
      <div className="flex bg-[#2a2a2a] hover:bg-[#404040] cursor-pointer items-center rounded-full justify-center w-8 h-8 text-[#fff]">
        <div title="Options" className="flex items-center cursor-pointer">
          <HiDotsHorizontal className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default VideoActions;
