import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db, timestamp } from "../firebase";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { HiDotsHorizontal, HiDownload } from "react-icons/hi";
import { MdOutlineSort, MdVerified } from "react-icons/md";
import { BiDislike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import Comment from "../components/video/Comment";
import { CategoryItems } from "../static/Data";
import RecommendVideo from "../components/video/RecommendVideo";
import SignInComponent from "../components/helper/SignInComponent";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// Simple debounce function
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [data, setData] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");
  const [showRecommended, setShowRecommended] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    if (id) {
      const q = query(doc(db, "videos", id));
      onSnapshot(q, (snapShot) => {
        setData(snapShot.data());
      });

      const commentsQuery = query(collection(db, "videos", id, "comments"));
      onSnapshot(commentsQuery, (snapShot) => {
        setComments(
          snapShot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });

      if (user) {
        const userLikeDoc = doc(db, "videos", id, "likes", user.uid);
        onSnapshot(userLikeDoc, (doc) => {
          setLiked(doc.exists());
        });
      }
      const likeCountRef = doc(db, "videos", id);
      onSnapshot(likeCountRef, (doc) => {
        if (doc.exists()) {
          setLikeCount(doc.data().likeCount || 0);
        }
      });
    }
  }, [id, user]);

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

  useEffect(() => {
    const q = query(collection(db, "videos"));
    onSnapshot(q, (snapShot) => {
      setVideos(
        snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  const addComment = (e) => {
    e.preventDefault();
    let commentData = {
      image: user.photoURL,
      name: user.displayName,
      comment,
      uploaded: timestamp,
    };
    if (id) {
      setComment("");
      addDoc(collection(db, "videos", id, "comments"), commentData);
    }
  };

  const toggleLike = async () => {
    if (!user) {
      return alert("Sign in to make your opinion count.");
    } // Optionally, prompt login
    const userLikeDoc = doc(db, "videos", id, "likes", user.uid);
    const videoDoc = doc(db, "videos", id);

    if (liked) {
      deleteDoc(userLikeDoc);
      setLiked(false);
      setLikeCount((prev) => prev - 1);
      setDoc(videoDoc, { likeCount: likeCount - 1 }, { merge: true });
    } else {
      setDoc(userLikeDoc, { liked: true });
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      setDoc(videoDoc, { likeCount: likeCount + 1 }, { merge: true });
    }
  };
  const debouncedToggleLike = debounce(toggleLike, 1000);

  return (
    <div className="py-20 px-6 bg-[#000] flex flex-col lg:flex-row h-full">
      <div className="lg:flex-1 lg:pr-4">
        <div className="flex justify-center">
          <iframe
            src={`https://www.youtube.com/embed/${data?.link}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:w-[850px] lg:h-[530px] rounded-2xl"
          ></iframe>
        </div>
        <h2 className="text-[#fff] font-semibold mt-3 mb-2 text-xl">
          {data?.name}
        </h2>
        <div className="flex max-791:flex-col flex-row max-791:gap-5 max-791:items-start  items-center justify-evenly">
          {/* channel name and subscribe button */}
          <div className="flex items-center  lg:mb-0 w-full">
            <img
              src={data?.logo}
              alt={data?.channel}
              className="rounded-full w-10 h-10"
            />
            <div className="px-3">
              <h3 className="text-[#fff] font-medium text-base flex items-center">
                {data?.channel && data?.channel.length <= 25
                  ? data?.channel
                  : `${data?.channel && data?.channel.substr(0, 20)}...`}
                <span className="p-1 text-[#909090]">
                  <MdVerified />
                </span>
              </h3>
              <p className="text-xs text-[#909090]">
                {data?.subscribers} subscribers
              </p>
            </div>
            <button
              title="Subscribe"
              className="bg-[#fff] px-3 py-2 rounded-full text-sm font-semibold ml-3"
            >
              Subscribe
            </button>
          </div>
          {/* Like share download and options icon */}
          <div className="flex  items-center gap-1 w-full">
            <div className="flex bg-[#2a2a2a] items-center rounded-full h-10">
              <div
                onClick={debouncedToggleLike}
                className="rounded-l-full flex px-3 h-full items-center border-r-2 border-r-[#404040] cursor-pointer hover:bg-[#404040]"
              >
                {liked ? (
                  <AiFillLike className="text-[#fff] text-2xl" />
                ) : (
                  <AiOutlineLike className="text-[#fff] text-2xl" />
                )}
                <p className="text-[#fff] pl-2 pr-3 text-sm font-semibold">
                  {likeCount}
                </p>
              </div>
              <div className="rounded-r-full flex pl-4 pr-5 h-full items-center border-r-[#404040] cursor-pointer hover:bg-[#404040]">
                <BiDislike className="text-[22px] font-extralight text-[#fff]" />
              </div>
            </div>
            <div className="flex bg-[#2a2a2a] items-center rounded-full h-10 cursor-pointer hover:bg-[#404040]">
              <div
                title="Share"
                className="flex px-3 items-center cursor-pointer"
              >
                <RiShareForwardLine className="text-2xl text-[#fff] font-thin" />
                <p className="text-[#fff] pl-2 pr-3 text-sm font-semibold">
                  Share
                </p>
              </div>
            </div>
            <div className="flex bg-[#2a2a2a] items-center rounded-full h-10 cursor-pointer hover:bg-[#404040]">
              <div
                title="Download"
                className="flex px-3 items-center cursor-pointer"
              >
                <HiDownload
                  title="Download"
                  className="text-2xl text-[#fff] font-thin"
                />
                <p className="text-[#fff] pl-2 pr-3 text-sm font-semibold">
                  Download
                </p>
              </div>
            </div>

            <div className="flex bg-[#2a2a2a] hover:bg-[#404040] cursor-pointer items-center rounded-full justify-center w-10 h-10 text-[#fff]">
              <div
                title="Options"
                className="flex px-3 items-center cursor-pointer"
              >
                <HiDotsHorizontal />
              </div>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="max-w-4xl bg-[#2a2a2a] mt-4 rounded-[0.3rem] text-sm p-3 text-[#fff]">
          <div className="flex">
            <p className="font-medium pr-3">
              {data?.views}
              <span className="pl-1 text-xs">Views</span>
            </p>
            <p className="font-medium pr-3">{data?.uploadTime}</p>
          </div>
          <span className="text-center font-medium">{data?.description}</span>
        </div>
        {/* Comments */}
        <div className="text-[#fff] mt-5">
          <div
            className="bg-[#2a2a2a] flex justify-between items-center text-[#fff] p-2 rounded-[0.3rem] lg:hidden cursor-pointer mb-3"
            onClick={() => setShowRecommended(!showRecommended)}
          >
            {showRecommended ? "Close comments" : "View Comments"}
            {!showRecommended ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>

          <div
            className={`${
              showRecommended ? "block" : "hidden"
            } bg-[#2a2a2a] p-5 rounded-[0.3rem] lg:block`}
          >
            <div className={`flex justify-between items-center`}>
              <h1>{comments?.length} Comments</h1>
              <div
                title="Sort by"
                className="flex items-center mx-10 cursor-pointer"
              >
                <MdOutlineSort size={25} className="mx-3" />
                <h5>Sort by</h5>
              </div>
            </div>

            {user && (
              <form
                onSubmit={addComment}
                className="flex w-full lg:w-[800px] pt-4 items-start"
              >
                <img
                  src={user?.photoURL}
                  alt="profile"
                  className="rounded-full mr-3 h-10 w-10"
                />
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  type="text"
                  placeholder="Add a comment..."
                  className="bg-[transparent] border-b border-b-[#404040] outline-none text-sm p-1 w-full"
                />
              </form>
            )}

            {!user ? (
              <SignInComponent prefix={"Please"} postfix={"add comments"}>
                sign in
              </SignInComponent>
            ) : null}
            <div className="mt-4">
              {comments?.map((item, i) => (
                <Comment key={i} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex-[0.4] lg:px-3 max-791:mt-[-1.5rem] lg:overflow-y-hidden mt-5 lg:mt-0">
        <div className="max-791:hidden flex flex-row lg:flex-col lg:overflow-x-hidden relative">
          <div
            className={`lg:flex flex flex-row gap-1 relative scrollbar-hide`}
          >
            {CategoryItems?.map((item, i) => (
              <h2
                className="text-[#fff] font-normal text-sm py-2 px-4 break-keep whitespace-nowrap bg-[#3a3a3a] mr-3 lg:mr-0 cursor-pointer rounded-lg hover:bg-[#505050]"
                key={i}
              >
                {item}
              </h2>
            ))}
          </div>
        </div>
        <div className={`lg:block pt-8`}>
          {videos?.map((video, i) => {
            return video.id !== id ? (
              <Link key={i} to={`/video/${video.id}`}>
                <RecommendVideo {...video} />
              </Link>
            ) : (
              ""
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Video;
