import React, { useState } from "react";
import ContentComponent from "../components/youtubeStudio/ContentComponent";
import StudioSidebar from "../components/youtubeStudio/StudioSidebar";
import { useSelector } from "react-redux";
import { getUser } from "../slices/userSlice";
import SignInComponent from "../components/helper/SignInComponent";
import { selectSidebarState } from "../slices/sidebarSlice";

const YoutubeStudio = () => {
  const [activeInStudioSidebar, setActiveInStudioSidebar] = useState("Content");
  const user = useSelector(getUser);
  const handleStudioSidebarClick = (category) => {
    setActiveInStudioSidebar(category);
  };
  const sidebarState = useSelector(selectSidebarState);

  return (
    <div className="font-semibold bg-[#282828] text-[#aaa] w-full relative flex h-[calc(100vh-3.5rem)] top-[3.5rem]">
      <StudioSidebar
        activeInStudioSidebar={activeInStudioSidebar}
        handleStudioSidebarClick={handleStudioSidebarClick}
      />{" "}
      <div
        className={`absolute transition-all duration-500 ease-linear 
          ${
            sidebarState.isStudioSidebarOpen
              ? "w-full left-0 lg:ml-1/5 lg:md:w-[85%] lg:md:left-[15%] md:ml-0 sm:w-full sm:ml-0"
              : "w-[96.3%] left-[5%]"
          }
         h-full lg:max-1054:left-[1.7%]`}
      >
        {/* TITLE */}
        <div className="flex pl-6 h-[7%] items-end my-0 md:mb-4 md:mt-8 lg:my-0">
          <span className="text-2xl text-yt-white">
            {activeInStudioSidebar === "Content"
              ? "Channel Content"
              : activeInStudioSidebar}
          </span>
        </div>
        {/* BODY */}
        {activeInStudioSidebar === "Content" ? (
          <ContentComponent />
        ) : (
          <div className="flex items-center justify-center mt-[-80px] h-full ">
            {user ? (
              "Coming Soon..."
            ) : (
              <SignInComponent
                prefix={"Please"}
                postfix={`view ${activeInStudioSidebar}`}
              >
                sign in
              </SignInComponent>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default YoutubeStudio;
