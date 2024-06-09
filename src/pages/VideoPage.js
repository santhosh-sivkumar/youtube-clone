import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
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
import { getUser, setUser } from "../slices/userSlice";
import VideoPlayer from "../components/video/VideoPlayer";
import VideoDetails from "../components/video/VideoDetails";
import VideoActions from "../components/video/VideoActions";
import CommentsSection from "../components/video/CommentsSection";
import RecommendedVideos from "../components/video/RecommendedVideos";
import HorizontalBar from "../components/video/HorizontalFilterBar";
import { CategoryItems } from "../static/Data";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [data, setData] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const { isOpen } = useSelector((state) => state.sidebar);

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
  }, [dispatch]);

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
    }
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
  const debouncedToggleLike = debounce(toggleLike, 100);

  return (
    <div
      className={`z-60 py-20 px-6 flex flex-col lg:flex-row bg-yt-black top-14 left-0 pt-4 absolute transition-all duration-700 ease-in-out ${
        isOpen
          ? "w-full left-0 lg:ml-1/5 lg:md:w-[85%] lg:md:left-[15%] md:ml-0 sm:w-full sm:ml-0"
          : location.pathname.includes("video")
          ? "w-full"
          : "w-[96.3%] left-[3.7%]"
      } lg:max-1054:left-[1.7%]`}
    >
      <div className="lg:flex-1 lg:pr-4 lg:pl-4">
        <VideoPlayer link={data?.link} isOpen={isOpen} />
        <VideoDetails data={data} />
        <VideoActions
          liked={liked}
          likeCount={likeCount}
          debouncedToggleLike={debouncedToggleLike}
        />
        <CommentsSection
          user={user}
          comments={comments}
          addComment={addComment}
          comment={comment}
          setComment={setComment}
        />
      </div>
      <div className="lg:flex-[0.47] lg:px-3 max-791:mt-[-1.5rem] lg:overflow-y-hidden mt-5 lg:mt-0">
        <div className="max-791:hidden flex flex-row lg:flex-col lg:overflow-x-hidden relative">
          <HorizontalBar CategoryItems={CategoryItems} />
        </div>
        <RecommendedVideos videos={videos} id={id} />
      </div>
    </div>
  );
};

export default VideoPage;
