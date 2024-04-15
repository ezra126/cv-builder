"use client";
import React, { useEffect, useState, useRef, memo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { MdDragIndicator } from "react-icons/md";
import { MdOutlineAutoDelete } from "react-icons/md";
import TextEditor from "./textEditor";

const SkillDraggableComponent = ({
  id,
  //   Job_title,
  draggableId,
  index,
  skill,
  skillLevel,
  updateSkill,
  handleDelete,
  showExperienceLevel,
  itemType,
}) => {
  const Level = [
    {
      Level: "Novice",
      Bgcolor: "bg-rose-400",
    },
    {
      Level: "Junior",
      Bgcolor: "bg-orange-400",
    },
    {
      Level: "Intermediate",
      Bgcolor: "bg-amber-400",
    },
    {
      Level: "Skillfull",
      Bgcolor: "bg-green-400",
    },
    {
      Level: "Expert",
      Bgcolor: "bg-indigo-400",
    },
  ];

  const [level, setLevel] = useState(skillLevel);
  const [skillname, setSkill] = useState(skill);

  const inputRef = useRef();
  const [displayDraggableComponent, setdisplayDraggableComponent] =
    useState(false);

  useEffect(() => {
    //console.log(Job_title + "display changed" + displayDraggableComponent);

    // updateDisplay(id, displayDraggableComponent, itemType);
    console.log("item type will be" + itemType);
  }, [displayDraggableComponent]);

  useEffect(() => {
    setSkill(skill);
    setLevel(skillLevel);
  }, [skill, skillLevel]);

  useEffect(() => {
    if (!showExperienceLevel) {
      updateSkill(id, null, skillname);
    }
  }, [showExperienceLevel]);

  useEffect(() => {
    if (level != null) {
      updateSkill(id, level, skillname);
    }
    //
  }, [level]);

  useEffect(() => {
    updateSkill(id, level, skillname);
  }, [skillname]);

  //   useEffect(() => {
  //     setdisplayDraggableComponent(display);

  //     if (displayDraggableComponent == true) {
  //       inputRef.current.focus();
  //     }
  //   }, [display]);

  return (
    <Draggable key={id} draggableId={draggableId} index={index}>
      {(provided) => {
        return (
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
                handleDelete(id, "skill");
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
                {skillname == "" && level == "" && <p>Unspecified</p>}
                {skillname != "" && level == "" && <p>{skillname}</p>}
                {skillname != "" && level != "" && (
                  <p>
                    {" "}
                    {skillname} - {level}
                  </p>
                )}
                <button
                  onClick={() => {
                    setdisplayDraggableComponent(!displayDraggableComponent);
                  }}
                >
                  {displayDraggableComponent && <MdKeyboardDoubleArrowUp />}
                  {!displayDraggableComponent && <MdKeyboardDoubleArrowDown />}
                </button>
              </div>

              <div className="pt-7 flex justify-stretch w-full gap-10">
                <div className="flex flex-col flex-1 w-1/2  gap-1">
                  <label>Skill</label>
                  <input
                    type="text"
                    ref={inputRef}
                    value={skillname}
                    onChange={(e) => {
                      setSkill(e.currentTarget.value);
                    }}
                    className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                    placeholder="e.g Teacher"
                  ></input>
                </div>

                <div className="flex flex-col flex-1 w-1/2  h-full gap-1">
                  <label>Level - {level == null ? "" : level}</label>

                  <div
                    disabled
                    className={clsx(
                      "group relative flex bg-gray-100 h-full w-full",
                      level == Level[0].Level &&
                        showExperienceLevel &&
                        "transition ease-in-out delay-350 duration:700 bg-rose-100 ",
                      level == Level[1].Level &&
                        showExperienceLevel &&
                        "transition ease-in-out delay-350 duration:700 bg-orange-100 ",
                      level == Level[2].Level &&
                        showExperienceLevel &&
                        "transition ease-in-out delay-350 duration:700 bg-amber-100 ",
                      level == Level[3].Level &&
                        showExperienceLevel &&
                        "transition ease-in-out delay-350 duration:700 bg-green-100 ",
                      level == Level[4].Level &&
                        showExperienceLevel &&
                        "transition ease-in-out delay-350 duration:700 bg-indigo-100 "
                    )}
                  >
                    <div
                      onClick={() => {
                        if (showExperienceLevel) {
                          setLevel(Level[0].Level);
                        }
                      }}
                      className={clsx("w-1/5 border-r-2 ")}
                    ></div>
                    <div
                      onClick={() => {
                        if (showExperienceLevel) {
                          setLevel(Level[1].Level);
                        }
                      }}
                      className={clsx("w-1/5 border-r-2 ")}
                    ></div>
                    <div
                      onClick={() => {
                        if (showExperienceLevel) {
                          setLevel(Level[2].Level);
                        }
                      }}
                      className={clsx("w-1/5 border-r-2")}
                    ></div>
                    <div
                      onClick={() => {
                        if (showExperienceLevel) {
                          setLevel(Level[3].Level);
                        }
                      }}
                      className={clsx("w-1/5 border-r-2")}
                    ></div>
                    <div
                      onClick={() => {
                        if (showExperienceLevel) {
                          setLevel(Level[4].Level);
                        }
                      }}
                      className={clsx("w-1/5 ")}
                    ></div>
                    <div
                      disabled={!showExperienceLevel}
                      className={clsx(
                        "absolute w-1/5 h-full top-0",
                        !showExperienceLevel && "hidden",
                        level == null && "hidden left-0",
                        level == Level[0].Level &&
                          `transition-left ease-in-out delay-350 duration:700 ${Level[0].Bgcolor} left-0`,
                        level == Level[1].Level &&
                          `transition-left ease-in-out delay-350 duration:700 ${Level[1].Bgcolor} left-[20%]`,
                        level == Level[2].Level &&
                          `transition-left ease-in-out delay-350 duration:700 ${Level[2].Bgcolor} left-[40%]`,
                        level == Level[3].Level &&
                          `transition-left ease-in-out delay-350 duration:700 ${Level[3].Bgcolor} left-[60%]`,
                        level == Level[4].Level &&
                          `transition-left ease-in-out delay-350 duration:700 ${Level[4].Bgcolor} left-[80%]`
                      )}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default SkillDraggableComponent;
