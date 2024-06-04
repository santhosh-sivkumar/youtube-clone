import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CategoryList = ({ CategoryItems }) => {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const checkScrollPosition = () => {
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
  };

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  useEffect(() => {
    const currentRef = containerRef.current;
    currentRef.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition(); // Initial check

    return () => {
      currentRef.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="relative w-full">
      {/* Left Scroll Button */}
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center p-2 bg-[#42424238] bg-opacity-50 text-[#fff] hover:bg-opacity-75"
        >
          <FaChevronLeft size={18} />
        </button>
      )}

      {/* Right Scroll Button */}
      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center p-2 bg-[#42424238] bg-opacity-50 text-[#fff] hover:bg-opacity-75"
        >
          <FaChevronRight size={18} />
        </button>
      )}

      <div
        className="lg:flex flex flex-row gap-1 overflow-x-auto scrollbar-hide relative w-full"
        ref={containerRef}
      >
        {CategoryItems?.map((item, i) => (
          <button
            className={`text-[#fff] font-normal text-sm py-2 px-4 break-keep whitespace-nowrap rounded-lg mr-3 lg:mr-0 cursor-pointer ${
              selectedCategory === item
                ? "bg-[#6d6d6d]"
                : "bg-[#8888884c] hover:bg-[#6d6d6d]"
            }`}
            key={i}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Conditional Left Shadow */}
      {showLeftArrow && (
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#000] to-transparent pointer-events-none"></div>
      )}

      {/* Conditional Right Shadow */}
      {showRightArrow && (
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#000] to-transparent pointer-events-none"></div>
      )}
    </div>
  );
};

export default CategoryList;
