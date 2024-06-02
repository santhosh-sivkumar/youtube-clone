import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, setVideos } from "../slices/videoSlice";
import { SideBarItems } from "../static/Data";

const SidebarItem = ({ item, active, onClick }) => (
  <div
    className={`h-10 flex justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-light-black my-1 ${
      item.name === active ? "bg-yt-light-black" : "bg-yt-black"
    }`}
    onClick={onClick}
  >
    <span className="mr-5">{item.icon}</span>
    <p className="p-2 text-sm font-medium">{item.name}</p>
  </div>
);

const Sidebar = () => {
  const dispatch = useDispatch();
  const { allVideos } = useSelector((state) => state.videos);
  const [active, setActive] = useState("Home");

  const handleFilter = useCallback(
    (category) => {
      if (category !== "Home") {
        category = category === "Movies" ? "Movie" : category;
        dispatch(filterByCategory(category));
      } else {
        console.log(allVideos, "from sidebar");
        dispatch(setVideos(allVideos));
      }
    },
    [dispatch, allVideos]
  );

  const renderSidebarItems = (items) => {
    return items.map((item, index) => (
      <SidebarItem
        key={index}
        item={item}
        active={active}
        onClick={() => {
          setActive(item.name);
          handleFilter(item.name);
        }}
      />
    ));
  };

  return (
    <div className="sidebar yt-scrollbar scrollbar-hide w-60 bg-yt-black h-[calc(100vh-53px)] fixed top-14 left-0 text-yt-white p-3 overflow-scroll max-1054:hidden">
      <div className="mb-4">{renderSidebarItems(SideBarItems.Top)}</div>
      <hr className="text-yt-light-black my-2" />
      <div className="mb-4">{renderSidebarItems(SideBarItems.Middle)}</div>
      <hr className="text-yt-light-black my-2" />
      <h2 className="pt-1 px-3">Explore</h2>
      <div className="mb-4">{renderSidebarItems(SideBarItems.Explore)}</div>
      <hr className="text-yt-light-black my-2" />
    </div>
  );
};

export default Sidebar;
