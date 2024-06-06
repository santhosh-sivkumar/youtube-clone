import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, setVideos } from "../../slices/videoSlice";
import { SideBarItems } from "../../static/Data";
import RenderSidebarItems from "./RenderSidebarItems";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { allVideos } = useSelector((state) => state.videos);
  const [active, setActive] = useState("Home");
  const { isOpen } = useSelector((state) => state.sidebar);

  const handleFilter = useCallback(
    (category) => {
      if (category !== "Home") {
        category = category === "Movies" ? "Movie" : category;
        dispatch(filterByCategory(category));
      } else {
        dispatch(setVideos(allVideos));
      }
    },
    [dispatch, allVideos]
  );

  const handleItemClick = (category) => {
    setActive(category);
    handleFilter(category);
  };

  return (
    <div
      className={`sidebar absolute pt-3 p-2
      yt-scrollbar top-14 bg-yt-black text-yt-white transition-all duration-0 ease-in-out 
          ${isOpen ? "w-1/5 md:w-[15%] sm:w-2/5  z-10" : "w-[3.7%] pl-2"}
          bg-gray-800 text-white h-full  max-1054:hidden`}
    >
      <div className="mb-4">
        <RenderSidebarItems
          items={SideBarItems.Top}
          active={active}
          onItemClick={handleItemClick}
          activeColor="yt-light-black" // Example active color
          backgroundColor="yt-black"
        />
      </div>
      <hr className="text-yt-light-black my-2" />
      <div className="mb-4">
        <RenderSidebarItems
          items={SideBarItems.Middle}
          active={active}
          onItemClick={handleItemClick}
          activeColor="yt-light-black" // Example active color
          backgroundColor="yt-black"
        />
      </div>
      <hr className="text-yt-light-black my-2" />
      <h2 className={`pt-1 px-3 ${!isOpen && "hidden"}`}>Explore</h2>
      <div className="mb-4">
        <RenderSidebarItems
          items={SideBarItems.Explore}
          active={active}
          onItemClick={handleItemClick}
          activeColor="yt-light-black" // Example active color
          backgroundColor="yt-black"
        />
      </div>
      <hr className="text-yt-light-black my-2" />
    </div>
  );
};

export default Sidebar;
