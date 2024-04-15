"use client";

import React, { useState } from "react";
import reviews from "../../utils/review";
import { Rating } from "react-simple-star-rating";
import { MdArrowLeft } from "react-icons/md";
import { MdArrowRight } from "react-icons/md";

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [Reviews, setReview] = useState(reviews);

  const itemsToDisplay = Reviews.slice(0, 3);

  const goToNext = () => {
    // const newIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    // setCurrentIndex(newIndex);
    const newArray = [...Reviews];
    const firstElement = newArray.shift();
    newArray.push(firstElement);

    setReview(newArray);
  };

  const goToPrevious = () => {
    const newArray = [...Reviews];
    const lastElement = newArray.pop();
    newArray.unshift(lastElement);

    setReview(newArray);
    // const newArray =[]
    // for (let i = 0; i < Reviews.length; i++) {
    //   const newIndex = (currentIndex + i + 1) % Reviews.length;

    //  // Reviews[i] = Reviews[newIndex];
    // }
    // const newIndex = (currentIndex + 1) % reviews.length;
    //  setCurrentIndex(newIndex);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex  flex-row justify-between w-full px-4 py-5 gap-2 sm:gap-0">
        {itemsToDisplay.map((item, index) => (
          <div id={index} className="sm:w-2/5 " key={index}>
            <div className="flex flex-row ">
              {/* <Rating
                readonly
                initialValue={1}
                iconsCount={1}
                fillColor="#00B67A"
              />
              <Rating
                readonly
                initialValue={1}
                iconsCount={1}
                fillColor="#00B67A"
              />
              <Rating
                readonly
                initialValue={1}
                iconsCount={1}
                fillColor="#00B67A"
              />
              <Rating
                readonly
                initialValue={0.6}
                iconsCount={1}
                fillColor="#00B67A"
              /> */}
            </div>
            <div className="text-sm md:text-xl font-semibold h-14">
              {item.title}
            </div>
            <div className="line-clamp-6 h-38 sm:h-40 text-start pr-2 text-gray-700 ">
              {item.comment}
            </div>
            <div className="pt-2 text-sm text-gray-500">{item.name}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-2 sm:justify-start justify-center">
        <div onClick={goToPrevious} className="rounded bg-slate-300">
          <MdArrowLeft />
        </div>
        <div onClick={goToNext} className="rounded bg-slate-300">
          <MdArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Review;
