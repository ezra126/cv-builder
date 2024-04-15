"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import clsx from "clsx";

const FaqComponent = ({ title, detail }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div
      className={clsx(
        "flex flex-col pt-3 text-lg font-sans gap-2 transition-all duration-1000 ease",
        showDetail ? "max-h-40" : "max-h-10",
        !showDetail ? "max-h-10" : "max-h-40"
      )}
    >
      <div
        className={clsx(
          "flex flex-row justify-between items-center hover:text-cyan-500 "
        )}
      >
        <div>{title}</div>
        {showDetail ? (
          <div
            onClick={() => {
              setShowDetail(!showDetail);
            }}
          >
            <IoIosArrowUp />
          </div>
        ) : (
          <div
            onClick={() => {
              setShowDetail(!showDetail);
            }}
          >
            <IoIosArrowDown />
          </div>
        )}
      </div>

      <div
        className={
          clsx("text-sm", !showDetail && "hidden")
          // "transition-height duration-1000 ease",

          // showDetail && " max-h-100 "
        }
      >
        {detail}
      </div>

      {/* <div>{detail}</div> */}
    </div>
  );
};

export default FaqComponent;
