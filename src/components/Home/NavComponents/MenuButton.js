// MenuButton.js

import React from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useDispatch } from "react-redux";

import {
  toggleSidebar,
  toggleStudioSidebar,
} from "../../../slices/sidebarSlice";
const MenuButton = ({ handleToggleSidebar, location }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        if (location.pathname !== "/YoutubeStudio") dispatch(toggleSidebar());
        else dispatch(toggleStudioSidebar());
      }}
      className={`hidden lg:block ${
        location.pathname !== "/YoutubeStudio"
          ? "hover:bg-yt-light-black"
          : "hover:bg-[#1f1f1f]"
      } text-yt-white p-2 w-10 text-2xl text-center rounded-full cursor-pointer`}
    >
      <HiOutlineBars3 title="Menu" />
    </div>
  );
};

export default MenuButton;
