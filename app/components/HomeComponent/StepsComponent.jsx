"use client";

import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Steps from "@/app/utils/step";
import Image from "next/image";
import clsx from "clsx";

const StepsComponent = () => {
  const [step, setStep] = useState(0);
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    setPercentage(100);
    setTimeout(() => {
      if (step == 2) {
        const newStep = 0;
        setStep(newStep);
      } else {
        const newStep = (step % 3) + 1;
        setStep(newStep);
      }
    }, 5000);
  });

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-row sm:gap-4 gap-2 bg-slate-100 w-full py-3  justify-between ">
          <div
            className={clsx(
              "flex flex-col gap-2 bg-white flex-grow text-start py-5 sm:px-5 px-2 sm:text-xl text-2xl font-semibold",
              step == 0 ? "text-black shadow-2xl" : "text-slate-400"
            )}
          >
            1. Signup
            {step == 0 ? (
              <div>
                <ProgressBar
                  completed={percentage}
                  height="5px"
                  isLabelVisible={false}
                  transitionDuration="5s"
                />
              </div>
            ) : (
              <div>
                <ProgressBar
                  completed={0}
                  height="5px"
                  isLabelVisible={false}
                  transitionDuration="5s"
                />
              </div>
            )}
          </div>
          <div
            className={clsx(
              "flex flex-col gap-2 bg-white flex-grow text-start  py-5 sm:px-5 px-2 sm:text-xl text-2xl font-semibold",
              step == 1 ? "text-black shadow-2xl" : "text-slate-400"
            )}
          >
            2. Create
            {step == 1 ? (
              <div>
                <ProgressBar
                  completed={percentage}
                  height="5px"
                  isLabelVisible={false}
                  transitionDuration="5s"
                />
              </div>
            ) : (
              <div>
                <ProgressBar
                  completed={0}
                  height="5px"
                  isLabelVisible={false}
                  transitionDuration="5s"
                />
              </div>
            )}
          </div>
          <div
            className={clsx(
              "flex flex-col gap-2 bg-white flex-grow text-start  py-5 sm:px-5 px-2 sm:text-xl text-2xl font-semibold",
              step == 2 ? "text-black shadow-2xl" : "text-slate-400"
            )}
          >
            3. Download
            {step == 2 ? (
              <div>
                <ProgressBar
                  completed={percentage}
                  height="5px"
                  isLabelVisible={false}
                  transitionDuration="5s"
                />
              </div>
            ) : (
              <div>
                <ProgressBar
                  completed={0}
                  height="5px"
                  isLabelVisible={false}
                  transitionDuration="5s"
                />
              </div>
            )}
          </div>
        </div>
        <div className="py-11 px-5">
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-3 text-start w-1/2 h-64">
              <div className="sm:text-2xl text-xl font-bold text-cyan-800">
                {Steps[step]?.title}
              </div>
              <div className="line-clamp-6 sm:line-clamp-none ">
                {Steps[step]?.content}
              </div>
            </div>
            <div className="">
              <Image
                src={Steps[step]?.image}
                width={350}
                height={200}
                className="object-fit"
                alt="resume logo"
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsComponent;
