"use client";

import React, { useEffect, useRef, useMemo } from "react";

import "quill/dist/quill.snow.css";
// import { ReactQuillProps, UnprivilegedEditor } from "react-quill";
// import { DeltaStatic, Sources } from "quill";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import { useResumeStore } from "../store/resumeStore";

const TextEditorForEducation = ({ handleTextEditor, value }) => {
  const reactQuillRef = React.useRef();
  const resumeEducation = useResumeStore((state) => state.ResumeEducation);
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  //    const updateResumeEducation = useResumeStore((state) => state.updateResumeEducation);

  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    // "image",
    "align",
    "size",
  ];

  const reactQuillMaxLength = 10;

  const checkCharacterCount = (event) => {
    const unprivilegedEditor = reactQuillRef.current.unprivilegedEditor;
    if (unprivilegedEditor.getLength() > 300 && event.key !== "Backspace")
      event.preventDefault();
  };

  const handleOnChange = (value, deltaOp, sources, editor) => {
    const characterCount = editor.getLength() - 1;

    editor.edit;

    console.log(characterCount);

    handleTextEditor(value, characterCount);
    // you can also choose to assign the character count with React useState like so:
    // setCount(characterCount)

    // onChange && onChange(value, deltaOp, sources, editor)
  };
  // const handleProcedureContentChange = (content) => {
  //     console.log("content---->", content);
  //    // handleJobDesc(content);
  //     // setValue("job_description", content);
  //     // alert("heloo");
  // };

  return (
    <div>
      <div>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          onKeyDown={checkCharacterCount}
          ref={reactQuillRef}
          //   placeholder="Proffesional Summary"
          defaultValue={value}
          onChange={handleOnChange}
          className="bg-white h-60 pb-10 rounded"

          //   style={{ height: "220px" }}
        ></ReactQuill>
      </div>
    </div>
  );
};

export default TextEditorForEducation;
