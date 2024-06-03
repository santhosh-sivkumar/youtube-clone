import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../slices/userSlice";
import dfLogo from "../assets/default-account-logo.png";
import { ChannelCategoryItems, SideBarItems } from "../static/Data";
import VideoTable from "../components/VideoTable";

const Channel = () => {
  const user = useSelector(getUser);
  const [activeInSidebar, setActiveInSidebar] = useState("Dashboard");
  const [activeInTopbar, setActiveInTopbar] = useState("Videos");
  const { status, allVideos, error } = useSelector((state) => state.videos);
  const handleSidebarClick = (category) => {
    setActiveInSidebar(category);
  };
  const handleTopbarClick = (category) => {
    setActiveInTopbar(category);
  };
  let userUploadedVideos = [];
  if (user) {
    userUploadedVideos = allVideos.filter(
      (video) => video.uploadedBy === user?.email
    );
  }
  return (
    <div className=" font-youtube font-semibold bg-[#282828] text-[#aaa]  w-full flex h-[calc(100%-53px)] pt-[4rem]">
      <div className="w-[18%] border-r-[1px] border-[#3e3e3e] flex-row items-center">
        <div className="h-2/8 pt-[1.5rem] pb-[0.1rem] flex gap-4 flex-col items-center justify-center">
          <img
            src={user ? user.photoURL : dfLogo}
            alt={user?.displayName}
            className="mt-0 object-contain rounded-full cursor-pointer w-28 h-28"
          />
          <div className="flex gap-1 flex-col justify-center items-center">
            <span className=" text-sm text-yt-white">Your channel</span>
            <span className="text-yt-gray text-xs">
              {user ? user.displayName : "User"}
            </span>
          </div>
        </div>
        <div className="h-6/8 yt-scrollbar scrollbar-hide text-[#aaa] p-3 overflow-scroll ">
          <div className="mb-4">
            {SideBarItems.channel.map((item, index) => (
              <div
                key={index}
                className={`flex justify-start px-3 py-[0.4rem] items-center cursor-pointer hover:bg-[#1f1f1f] ${
                  item.name === activeInSidebar
                    ? `bg-[#1f1f1f] border-l-[2px] border-[#ff4e45] text-[#ff4e45]`
                    : ``
                }`}
                onClick={() => handleSidebarClick(item.name)}
              >
                <span className="mr-5">{item.icon}</span>
                <p className="p-2 text-sm">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[82%]">
        <div className="h-[5rem] px-8 pt-8 pb-5 flex items-center ">
          <span className="text-[1.5rem] text-yt-white">Channel content</span>
        </div>
        <div className="h-[3rem] flex flex-row px-6 pt-0 overflow-x-scroll  relative scrollbar-hide border-b-[1px] border-[#3e3e3e]">
          {ChannelCategoryItems.map((item, i) => (
            <p
              className={`text-sm flex justify-start p-3  items-center cursor-pointer ${
                item === activeInTopbar
                  ? ` border-b-[3px] border-[#3ea6ff]  text-[#3ea6ff]`
                  : ``
              }`}
              onClick={() => handleTopbarClick(item)}
              key={i}
            >
              {item}
            </p>
          ))}
        </div>
        <div className="h-[80%]">
          {activeInTopbar === "Videos" ? (
            <VideoTable
              status={status}
              videos={userUploadedVideos}
              error={error}
              errorMsg={"Please sign to see your videos"}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-yt-white">
              Coming Soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Channel;
