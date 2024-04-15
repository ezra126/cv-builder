"use client";
import React, { useEffect, useState, useRef, memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { MdDragIndicator } from "react-icons/md";
import { MdOutlineAutoDelete } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

const LanguageDraggableComponent = ({
  id,
  draggableId,
  index,
  handleUpdateLanguages,
  Language,
  Level,
  handleDelete,
}) => {
  const inputRef = useRef();
  const [displayLevel, setDispayLevel] = useState(false);
  const LanguageLevel = [
    "Native speaker",
    "Highly proficient",
    "Very good command",
    "working knowledge",
    "C2",
    "C1",
    "B2",
    "B1",
    "A2",
    "A1",
  ];
  const [displayDraggableComponent, setdisplayDraggableComponent] =
    useState(false);

  const [language, setLanguage] = useState(Language);
  const [level, setLevel] = useState(Level);

  useEffect(() => {
    handleUpdateLanguages(id, language, Level);
  }, [language]);

  useEffect(() => {
    handleUpdateLanguages(id, Language, level);
  }, [level]);

  useEffect(() => {
    setLanguage(language);
    setLevel(level);
  }, [Level, Language]);

  return (
    <Draggable key={id} draggableId={draggableId} index={index}>
      {(provided) => {
        <div
          className="relative flex items-center gap-2 group"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            {...provided.dragHandleProps}
            className="absolute -left-6 items-center justify-center"
          >
            <MdDragIndicator className="text-2xl text-slate-300" />
          </div>

          <div
            onClick={() => {
              handleDelete(id, "language");
            }}
            className="absolute -right-7 items-center justify-center"
          >
            <MdOutlineAutoDelete className="text-2xl text-slate-300" />
          </div>

          <div
            className={clsx(
              " group-hover: transition-height  duration-500 delay-250 ease-in-out overflow-hidden flex  flex-col px-3  pt-2 w-full border-solid border-2 ",
              displayDraggableComponent ? "h-40 " : "h-12",
              !displayDraggableComponent ? "h-12" : "h-40 "
            )}
          >
            <div className="flex justify-between">
              {Language == "" && <p>(Not Specified)</p>}
              {Language != "" && <p>{Language}</p>}
              <button
                onClick={() => {
                  setdisplayDraggableComponent(!displayDraggableComponent);
                }}
              >
                {displayDraggableComponent && <MdKeyboardDoubleArrowUp />}
                {!displayDraggableComponent && <MdKeyboardDoubleArrowDown />}
              </button>
            </div>

            <div className=" pt-7 flex justify-stretch w-full gap-10">
              <div className="flex flex-col flex-1 w-1/2  gap-1">
                <label>Language</label>
                <input
                  type="text"
                  value={Language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                  }}
                  className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                ></input>
              </div>

              <div className="flex flex-col flex-1 w-1/2  gap-1">
                <label>Level</label>
                <div
                  onClick={() => {
                    setDispayLevel(!displayLevel);
                  }}
                  className=" flex justify-between items-center py-3 px-2 bg-gray-100 rounded outline-none click:border-b-2 click:border-cyan-500 caret-cyan-600 h-full "
                >
                  <div>{Level == "" ? "Select Level" : Level}</div>

                  {displayLevel && (
                    <div className="absolute py-2 px-1  top-[87%] bg-gray-100 w-56 h-32 overflow-y-scroll overflow-x-hidden flex flex-col  ">
                      {LanguageLevel.map((item) => (
                        <p
                          className="hover:bg-cyan-200 px-2 py-1"
                          key={item.id}
                          // key={item}
                          onClick={() => {
                            setLevel(item);
                          }}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  )}

                  {displayLevel ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {/* <input
                    type="text"
                    value={Level}
                    onChange={(e) => {
                      setLevel(e.target.value);
                    }}
                    className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                    placeholder=""
                  ></input> */}
              </div>
            </div>
          </div>
        </div>;
      }}
    </Draggable>
  );
};

export default memo(LanguageDraggableComponent);
