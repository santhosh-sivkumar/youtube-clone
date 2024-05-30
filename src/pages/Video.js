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
import Comment from "../components/Comment";
import { CategoryItems } from "../static/Data";
import RecommendVideo from "../components/RecommendVideo";
import { signInWithPopup } from "firebase/auth";
import { provider } from "../firebase";

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

  const addComment = async (e) => {
    e.preventDefault();
    let commentData = {
      image: user.photoURL,
      name: user.displayName,
      comment,
      uploaded: timestamp,
    };
    if (id) {
      setComment("");
      await addDoc(collection(db, "videos", id, "comments"), commentData);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await signInWithPopup(auth, provider);
    dispatch(setUser(response.user));
  };
  const toggleLike = async () => {
    if (!user) {
      return alert("Sign in to make your opinion count.");
    } // Optionally, prompt login
    const userLikeDoc = doc(db, "videos", id, "likes", user.uid);
    const videoDoc = doc(db, "videos", id);

    if (liked) {
      await deleteDoc(userLikeDoc);
      setLiked(false);
      setLikeCount((prev) => prev - 1);
      await setDoc(videoDoc, { likeCount: likeCount - 1 }, { merge: true });
    } else {
      await setDoc(userLikeDoc, { liked: true });
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      await setDoc(videoDoc, { likeCount: likeCount + 1 }, { merge: true });
    }
  };
  const debouncedToggleLike = debounce(toggleLike, 1000);

  return (
    <div className="py-20 pr-9 pl-6 bg-yt-black flex flex-row h-full">
      <div className="left flex-1 pr-4 pl-[0.2rem]">
        <div className="flex justify-center">
          <iframe
            src={`https://www.youtube.com/embed/${data?.link}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-[850px] h-[530px] flex-1 rounded-2xl"
          ></iframe>
        </div>
        <h2 className="text-yt-white font-semibold mt-3 mb-2 text-xl">
          {data?.name}
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={data?.logo}
              alt={data?.channel}
              className="rounded-full w-10 h-10"
            />
            <div className="px-3">
              <h3 className="text-yt-white font-medium text-base flex items-center">
                {data?.channel && data?.channel.length <= 25
                  ? data?.channel
                  : `${data?.channel && data?.channel.substr(0, 20)}...`}
                <span className="p-1 text-yt-gray">
                  <MdVerified />
                </span>
              </h3>
              <p className="text-xs text-yt-gray">
                {data?.subscribers} subscribers
              </p>
            </div>
            <button className="bg-yt-white px-3 py-2 rounded-full text-sm font-semibold ml-3">
              Subscribe
            </button>
          </div>
          <div className="flex pl-28">
            <div className="flex bg-yt-light-black items-center rounded-full h-10 mx-1 ">
              <div
                onClick={debouncedToggleLike} // Use the debouncedToggleLike function
                className="rounded-l-full flex px-3 h-full items-center border-r-2 border-r-yt-light-1 cursor-pointer hover:bg-yt-light-1"
              >
                {liked ? (
                  <AiFillLike className="text-yt-white text-2xl" />
                ) : (
                  <AiOutlineLike className="text-yt-white text-2xl" />
                )}
                <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                  {likeCount}
                </p>
              </div>
              <div className="rounded-r-full flex pl-4 pr-5 h-full items-center border-r-yt-light-1 cursor-pointer hover:bg-yt-light-1">
                <BiDislike className="text-[22px] font-extralight text-yt-white" />
              </div>
            </div>
            <div className="flex bg-yt-light-black items-center rounded-full h-10 mx-1 cursor-pointer hover:bg-yt-light-1">
              <div className="flex px-3 items-center cursor-pointer">
                <RiShareForwardLine className="text-2xl text-yt-white font-thin" />
                <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                  Share
                </p>
              </div>
            </div>
            <div className="flex bg-yt-light-black items-center rounded-full h-10 mx-1 cursor-pointer hover:bg-yt-light-1">
              <div className="flex px-3 items-center cursor-pointer">
                <HiDownload className="text-2xl text-yt-white font-thin" />
                <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                  Download
                </p>
              </div>
            </div>

            <div className="flex bg-yt-light-black hover:bg-yt-light-1 cursor-pointer items-center rounded-full justify-center w-10 h-10 text-yt-white">
              <HiDotsHorizontal />
            </div>
          </div>
        </div>
        <div className="max-w-4xl bg-yt-light-black mt-4 rounded-2xl text-sm p-3 text-yt-white">
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
        <div className="text-yt-white mt-5">
          <div className="flex items-center">
            <h1>{comments?.length} Comments</h1>
            <div className="flex items-center mx-10">
              <MdOutlineSort size={30} className="mx-3" />
              <h5>Sort by</h5>
            </div>
          </div>

          {user && (
            <form
              onSubmit={addComment}
              className="flex w-[800px] pt-4 items-start"
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
                className="bg-[transparent] border-b border-b-yt-light-black outline-none text-sm p-1 w-full"
              />
            </form>
          )}

          <div className="mt-4">
            {comments?.map((item, i) => (
              <Comment key={i} {...item} />
            ))}
          </div>
          {!user ? (
            <div className="text-center p-12">
              Please{" "}
              <button
                className="text-yt-blue hover:underline"
                onClick={(e) => handleLogin(e)}
              >
                Sign In
              </button>{" "}
              to add your comment
            </div>
          ) : null}
        </div>
      </div>

      <div className="right px-3 overflow-y-hidden flex-[0.4]">
        <div>
          <div className="flex flex-row px-3 overflow-x-scroll relative scrollbar-hide">
            {CategoryItems?.map((item, i) => (
              <h2
                className="text-yt-white font-normal text-sm py-2 px-4 break-keep whitespace-nowrap bg-yt-light mr-3 cursor-pointer rounded-lg hover:bg-yt-light-1"
                key={i}
              >
                {item}
              </h2>
            ))}
          </div>
        </div>
        <div className="pt-8">
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
