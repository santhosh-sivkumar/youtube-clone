import React, { useState, useEffect } from "react";
import { HiOutlineBars3, HiMagnifyingGlass } from "react-icons/hi2";
import { FaRegBell } from "react-icons/fa";
import { BiVideoPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from "../assets/YouTube-Logo.png";
import studioLogo from "../assets/yt_studio_logo_white.svg";

import { MdMic } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, getUser, logout } from "../slices/userSlice";
import {
  setSearchQuery,
  filterVideosByName,
  setVideos,
  fetchVideos,
} from "../slices/videoSlice";
import { useLocation, useNavigate } from "react-router-dom";
import NewVideoFormModal from "./NewVideoFormModal";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const user = useSelector(getUser);
  const { searchQuery, filteredVideos } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    if (location.pathname === "/Channel") {
      setShowPopup(true);
    } else {
      navigate("/Channel");
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await signInWithPopup(auth, provider);
    dispatch(setUser(response.user));
  };
  const handleLogout = async () => {
    dispatch(logout());
    await signOut(auth);
  };
  const handleSearch = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query)); // Dispatch action to set search query in Redux state

    // Dispatch action to filter videos only when search query is not empty
    if (query.trim() !== "") {
      dispatch(filterVideosByName());
    } else if (searchQuery.trim() !== "") {
      // Reset filtered videos to all videos only when search query changes from non-empty to empty
      dispatch(setVideos(filteredVideos));
    }
  };
  return (
    <div
      className={`navbar ${
        location.pathname !== "/Channel" ? "bg-yt-black" : "bg-[#282828]"
      } pt-[20px] pr-[24px] pb-[12px] h-14 flex items-center pl-[16px] justify-between fixed w-full z-10`}
    >
      {/* left section */}
      <div className="flex justify-start items-center w-1/4">
        <div className="text-yt-white p-2 w-10 text-2xl text-center hover:bg-yt-light-black rounded-full cursor-pointer">
          <HiOutlineBars3 />
        </div>
        <div className="pl-[0.5rem] w-32">
          <Link to="/">
            <img
              src={location.pathname === "/Channel" ? studioLogo : logo}
              alt=""
              className="object-contain w-[87.8%]"
            />
          </Link>
        </div>
      </div>{" "}
      {/* middle section */}
      {location.pathname !== "/Channel" ? (
        <div className="h-10 flex flex-row items-center w-2/4">
          <div className="w-full bg-yt-black flex border border-yt-light-black items-center rounded-3xl h-10">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-yt-black h-6 ml-6 text-yt-white text-start focus:outline-none "
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className=" w-16 h-10 bg-yt-light-black px-2 py-0.5 rounded-r-3xl border-1-2 border-yt-light-black">
              <HiMagnifyingGlass
                size={22}
                className="text-yt-white inline-block text-center font-thin"
              />
            </button>
          </div>
          <div className=" text-yt-white bg-yt-light w-10 h-10 items-center flex justify-center rounded-full ml-4 hover:bg-yt-light-black cursor-pointer">
            <MdMic className="text-center" size={23} />
          </div>
        </div>
      ) : (
        <div className="h-10 flex flex-row items-center w-2/4">
          <div className="w-full flex text-[#576772] border border-[#606060] items-center rounded-[5px] h-10">
            <input
              type="text"
              placeholder="Search across your channel"
              className="w-full font-bold bg-[#282828] h-6 ml-6 text-yt-white text-start focus:outline-none "
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      )}
      {/* right section */}
      <div className="flex items-center justify-end w-1/5">
        <div className="flex flex-row items-center">
          {location.pathname === "/Channel" ? (
            <button
              className="flex flex-row text-yt-white justify-center py-[0.4rem] px-[0.75rem] items-center gap-2 font-medium text-sm border border-yt-border rounded-[0.2rem] hover:bg-yt-light-blue"
              onClick={handleClick}
            >
              <BiVideoPlus
                className="text-[#ff4e45] cursor-pointer"
                size={25}
              />
              CREATE
            </button>
          ) : (
            <div className="mr-2 p-2 w-10 hover:bg-yt-light-black rounded-full cursor-pointer">
              <Link to={`/Channel`}>
                <BiVideoPlus
                  to="/VideoForm"
                  size={25}
                  className="text-yt-white text-center"
                />
              </Link>
            </div>
          )}
          {/* Popup Window */}
          {showPopup && (
            <NewVideoFormModal togglePopup={togglePopup} isNew={true} />
          )}{" "}
          {/* Bell icon */}
          {location.pathname !== "/Channel" ? (
            <div className="mr-2 p-2 w-9 hover:bg-yt-light-black rounded-full cursor-pointer">
              <FaRegBell size={20} className="text-yt-white text-center" />
            </div>
          ) : (
            ""
          )}
          {/* Profile IMG */}
          <div className="mx-3 items-center cursor-pointer text-yt-blue">
            {user ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                onClick={handleLogout}
                className="object-contain rounded-full cursor-pointer w-8 h-8"
              />
            ) : (
              <button
                className="flex flex-row justify-center bg-yt-black py-[0.4rem] px-[0.75rem] items-center gap-2 font-medium text-sm border border-yt-border rounded-3xl hover:bg-yt-light-blue"
                onClick={(e) => handleLogin(e)}
              >
                <VscAccount size={20} />
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
