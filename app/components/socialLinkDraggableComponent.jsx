"use client";
import React, { useEffect, useState, useRef, memo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { MdDragIndicator } from "react-icons/md";
import { MdOutlineAutoDelete } from "react-icons/md";
import TextEditor from "./textEditor";

const SocialLinkDraggableComponent = ({
  id,
  //   Job_title,
  draggableId,
  index,
  handleUpdateLinks,
  Label,
  Link,
  handleDelete,
}) => {
  const inputRef = useRef();
  const [displayDraggableComponent, setdisplayDraggableComponent] =
    useState(false);

  const [label, setLabel] = useState(Label);
  const [link, setLink] = useState(Link);

  useEffect(() => {
    handleUpdateLinks(id, label, Link);
  }, [label]);

  useEffect(() => {
    setLabel(Label), setLink(Link);
  }, [Label, Link]);

  useEffect(() => {
    handleUpdateLinks(id, Label, link);
  }, [link]);

  useEffect(() => {
    // console.log("item type will be" + itemType);
  }, [displayDraggableComponent]);

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
                handleDelete(id, "link");
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
                {label == "" && <p>(Not Specified)</p>}
                {label != "" && <p>{label}</p>}
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
                  <label>Label</label>
                  <input
                    type="text"
                    value={Label}
                    onChange={(e) => {
                      setLabel(e.target.value);
                    }}
                    className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                  ></input>
                </div>

                <div className="flex flex-col flex-1 w-1/2  gap-1">
                  <label>Link</label>
                  <input
                    type="text"
                    value={Link}
                    onChange={(e) => {
                      setLink(e.target.value);
                    }}
                    className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                    placeholder=""
                  ></input>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default SocialLinkDraggableComponent;
