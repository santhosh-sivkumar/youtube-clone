import React, { useState } from "react";
import ContentComponent from "../components/youtubeStudio/ContentSection/ContentComponent";
import StudioSidebar from "../components/youtubeStudio/StudioSidebar";
import { useSelector } from "react-redux";
import { getUser } from "../slices/userSlice";
import SignInComponent from "../components/helper/SignInComponent";
import { selectSidebarState } from "../slices/sidebarSlice";
import { FiUpload } from "react-icons/fi";
import { MdLiveTv } from "react-icons/md";
import AddVideo from "../components/youtubeStudio/ContentSection/AddVideo";

const YoutubeStudioPage = () => {
  const [activeInStudioSidebar, setActiveInStudioSidebar] = useState("Content");
  const user = useSelector(getUser);
  const [showPopup, setShowPopup] = useState(false);
  const handleStudioSidebarClick = (category) => {
    setActiveInStudioSidebar(category);
  };
  const sidebarState = useSelector(selectSidebarState);

  const handleOnClick = () => {
    if (user) {
      setShowPopup(true);
    } else alert("Please login to create video");
  };
  return (
    <div className="font-semibold bg-[#282828] text-[#aaa] w-full relative flex h-[calc(100vh-3.5rem)] top-[3.5rem]">
      <StudioSidebar
        activeInStudioSidebar={activeInStudioSidebar}
        handleStudioSidebarClick={handleStudioSidebarClick}
      />{" "}
      <div
        className={` h-full pt-4 md:pt-0 lg:pt-4 absolute transition-all duration-700 ease-in-out 
          ${
            sidebarState.isStudioSidebarOpen
              ? "w-full left-0 lg:ml-1/5 lg:md:w-[85%] lg:md:left-[15%] md:ml-0 sm:w-full sm:ml-0"
              : "w-[96.3%] left-[5%]"
          }
         lg:max-1054:left-[1.7%]`}
      >
        {/* TITLE */}
        <div className="flex px-6 h-[7%] items-end my-0 md:mb-4 md:mt-8 lg:my-0 justify-between">
          <span className="text-2xl text-yt-white">
            {activeInStudioSidebar === "Content"
              ? "Channel Content"
              : activeInStudioSidebar}
          </span>
          {activeInStudioSidebar === "Content" && (
            <div className="flex gap-2">
              <div
                onClick={handleOnClick}
                className="bg-[#494949] text-yt-white hover:bg-[#585858] rounded-full p-2 cursor-pointer"
              >
                <FiUpload size={17} />
              </div>
              <div className="bg-[#494949] text-yt-white hover:bg-[#585858] rounded-full p-2 cursor-pointer">
                <MdLiveTv size={17} />
              </div>
              {showPopup && (
                <AddVideo
                  togglePopup={() => setShowPopup(false)}
                  isNew={true}
                />
              )}
            </div>
          )}
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

export default YoutubeStudioPage;
