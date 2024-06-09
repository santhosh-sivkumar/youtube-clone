import React, { useState } from "react";
import { MdOutlineSort } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SignInComponent from "../../components/helper/SignInComponent";
import Comment from "../../components/video/Comment";

const CommentsSection = ({
  user,
  comments,
  addComment,
  comment,
  setComment,
}) => {
  const [showRecommended, setShowRecommended] = useState(false);

  return (
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

        {!user && (
          <SignInComponent prefix={"Please"} postfix={"add comments"}>
            sign in
          </SignInComponent>
        )}

        <div className="mt-4">
          {comments?.map((item, i) => (
            <Comment key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
