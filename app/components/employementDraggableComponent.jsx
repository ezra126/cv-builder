"use client";
import React, { useEffect, useState, useRef, memo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { MdDragIndicator } from "react-icons/md";
import { MdOutlineAutoDelete } from "react-icons/md";
import TextEditor from "./textEditor";
import TextEditorForEmployement from "@/app/components/textEditorForEmployement";

const EmploymentDraggableComponent = ({
  id,
  JobTitle,
  Company,
  City,
  StartDate,
  EndDate,
  Description,
  handleUpdateEmployementHistory,
  draggableId,
  index,

  handleDelete,
}) => {
  const inputRef = useRef();
  const [displayDraggableComponent, setdisplayDraggableComponent] =
    useState(false);

  const [jobtitle, setJobTitle] = useState(JobTitle);
  const [company, setCompany] = useState(Company);
  const [city, setCity] = useState(City);
  const [start_date, setStartDate] = useState(StartDate);
  const [end_date, setEndDate] = useState(EndDate);
  const [description, setDescription] = useState(Description);

  const handleTextEditor = (value) => {
    setDescription(value);
  };

  useEffect(() => {}, [displayDraggableComponent]);

  useEffect(() => {
    handleUpdateEmployementHistory(
      id,
      JobTitle,
      Company,
      StartDate,
      EndDate,
      City,
      description
    );
  }, [description]);

  useEffect(() => {
    handleUpdateEmployementHistory(
      id,
      jobtitle,
      Company,
      StartDate,
      EndDate,
      City,
      Description
    );
  }, [jobtitle]);

  useEffect(() => {
    handleUpdateEmployementHistory(
      id,
      JobTitle,
      company,
      StartDate,
      EndDate,
      City,
      Description
    );
  }, [company]);

  useEffect(() => {
    handleUpdateEmployementHistory(
      id,
      JobTitle,
      Company,
      StartDate,
      EndDate,
      city,
      Description
    );
  }, [city]);

  useEffect(() => {
    handleUpdateEmployementHistory(
      id,
      JobTitle,
      Company,
      start_date,
      EndDate,
      City,
      Description
    );
  }, [start_date]);

  useEffect(() => {
    handleUpdateEmployementHistory(
      id,
      JobTitle,
      Company,
      StartDate,
      end_date,
      City,
      Description
    );
  }, [end_date]);

  useEffect(() => {
    setDescription(description);
    setJobTitle(jobtitle);
    setCity(city), setStartDate(start_date);
    setEndDate(end_date);
    setCompany(company);
  }, [JobTitle, Company, Description, StartDate, EndDate, City]);

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
                handleDelete(id, "employement");
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
                {Company != "" && JobTitle != "" && (
                  <p>
                    {JobTitle} at {Company}
                  </p>
                )}
                {JobTitle == "" && Company != "" && <p> {Company}</p>}
                {JobTitle != "" && Company == "" && <p> {JobTitle}</p>}
                {JobTitle == "" && Company == "" && <p> Unspecified</p>}
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
                  <label>Job Title</label>
                  <input
                    type="text"
                    value={JobTitle}
                    onChange={(e) => {
                      setJobTitle(e.target.value);
                    }}
                    ref={inputRef}
                    className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                  ></input>
                </div>

                <div className="flex flex-col flex-1 w-1/2  gap-1">
                  <label>Company</label>
                  <input
                    type="text"
                    value={Company}
                    onChange={(e) => {
                      setCompany(e.target.value);
                    }}
                    className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
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
                      onfocus="(this.type='date')"
                      onChange={(e) => {
                        setStartDate(e.target.value);
                      }}
                      className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600 w-1/2"
                    ></input>

                    <input
                      type="date"
                      placeholder="MM/DD/YYYY"
                      value={EndDate}
                      onfocus="(this.type='date')"
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
                <TextEditorForEmployement
                  handleTextEditor={handleTextEditor}
                  value={Description}
                />
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default EmploymentDraggableComponent;
