"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { MdDragIndicator } from "react-icons/md";
import { MdOutlineAutoDelete } from "react-icons/md";
import TextEditorForEducation from "@/app/components/textEditorForEducation";

const EducationDraggableComponent = ({
  id,
  School,
  Degree,
  City,
  StartDate,
  EndDate,
  Description,
  draggableId,
  handleUpdateEducationBackground,
  index,
  handleDelete,
}) => {
  const inputRef = useRef();
  const [displayDraggableComponent, setdisplayDraggableComponent] =
    useState(false);

  const [school, setSchool] = useState(School);
  const [degree, setDegree] = useState(Degree);
  const [city, setCity] = useState(City);
  const [start_date, setStartDate] = useState(StartDate);
  const [end_date, setEndDate] = useState(EndDate);
  const [description, setDescription] = useState(Description);

  const handleTextEditor = (value) => {
    setDescription(value);
  };

  useEffect(() => {
    setDescription(description);
    setSchool(school);
    setCity(city), setStartDate(start_date);
    setEndDate(end_date);
    setDegree(degree);
  }, [School, Degree, Description, StartDate, EndDate, City]);

  useEffect(() => {
    handleUpdateEducationBackground(
      id,
      school,
      Degree,
      StartDate,
      EndDate,
      City,
      Description
    );
  }, [school]);

  useEffect(() => {
    handleUpdateEducationBackground(
      id,
      School,
      Degree,
      StartDate,
      EndDate,
      City,
      description
    );
  }, [description]);

  useEffect(() => {
    handleUpdateEducationBackground(
      id,
      School,
      Degree,
      start_date,
      EndDate,
      City,
      Description
    );
  }, [start_date]);

  useEffect(() => {
    handleUpdateEducationBackground(
      id,
      School,
      Degree,
      StartDate,
      end_date,
      City,
      Description
    );
  }, [end_date]);

  useEffect(() => {
    handleUpdateEducationBackground(
      id,
      School,
      degree,
      StartDate,
      EndDate,
      City,
      Description
    );
  }, [degree]);

  useEffect(() => {
    handleUpdateEducationBackground(
      id,
      School,
      Degree,
      StartDate,
      EndDate,
      city,
      Description
    );
  }, [city]);

  useEffect(() => {
    // console.log("item type will be" + itemType);
  }, [displayDraggableComponent]);

  //   useEffect(() => {
  //     setdisplayDraggableComponent(display);

  //     if (displayDraggableComponent == true) {
  //       inputRef.current.focus();
  //     }
  //   }, [display]);

  return (
    <>
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
                  handleDelete(id, "education");
                }}
                className="absolute -right-7 items-center justify-center"
              >
                <MdOutlineAutoDelete className="text-2xl text-slate-300" />
              </div>

              <div
                className={clsx(
                  " group-hover: transition-height  duration-500 delay-250 ease-in-out overflow-hidden flex  flex-col px-3  pt-2 w-full border-solid border-2 ",
                  displayDraggableComponent ? "h-[610px] " : "h-12",
                  !displayDraggableComponent ? "h-12" : "h-[610px] "
                )}
              >
                <div className="flex justify-between">
                  {Degree != "" && School != "" && (
                    <p>
                      {Degree} at {School}
                    </p>
                  )}
                  {Degree == "" && School != "" && <p> {School}</p>}
                  {Degree != "" && School == "" && <p> {Degree}</p>}
                  {Degree == "" && School == "" && <p> Unspecified</p>}
                  <button
                    onClick={() => {
                      setdisplayDraggableComponent(!displayDraggableComponent);
                    }}
                  >
                    {displayDraggableComponent && <MdKeyboardDoubleArrowUp />}
                    {!displayDraggableComponent && (
                      <MdKeyboardDoubleArrowDown />
                    )}
                  </button>
                </div>

                <div className="pt-7 flex justify-stretch w-full gap-10">
                  <div className="flex flex-col flex-1 w-1/2  gap-1">
                    <label>School</label>
                    <input
                      type="text"
                      ref={inputRef}
                      value={School}
                      onChange={(e) => {
                        setSchool(e.target.value);
                      }}
                      className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                    ></input>
                  </div>

                  <div className="flex flex-col flex-1 w-1/2  gap-1">
                    <label>Degree</label>
                    <input
                      type="text"
                      value={Degree}
                      onChange={(e) => {
                        setDegree(e.target.value);
                      }}
                      className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                      placeholder=""
                    ></input>
                  </div>
                </div>

                <div className="pt-7 flex justify-stretch w-full gap-10">
                  <div className="flex flex-col flex-1 w-1/2  gap-1">
                    <label>Start & End Date</label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        placeholder="MM/DD/YYYY"
                        value={StartDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                        }}
                        onfocus="(this.type='date')"
                        className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600 w-1/2"
                      ></input>

                      <input
                        type="date"
                        placeholder="MM/DD/YYYY"
                        onfocus="(this.type='date')"
                        value={EndDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                        }}
                        className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600 w-1/2"
                      ></input>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 w-1/2  gap-1">
                    <label>City</label>
                    <input
                      type="text"
                      value={City}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                    ></input>
                  </div>
                </div>

                <div className="py-5">
                  <TextEditorForEducation
                    handleTextEditor={handleTextEditor}
                    value={Description}
                  />
                </div>
              </div>
            </div>
          );
        }}
      </Draggable>
    </>
  );
};

export default EducationDraggableComponent;
