"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { IoPerson } from "react-icons/io5";
import clsx from "clsx";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import TextEditor from "@/app/components/textEditor";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EmploymentDraggableComponent from "@/app/components/employementDraggableComponent";
import { FiPlus } from "react-icons/fi";
import SkillDraggableComponent from "@/app/components/skillDraggableComponent";
import SocialLinkDraggableComponent from "@/app/components/socialLinkDraggableComponent";
import EducationDraggableComponent from "@/app/components/educationDraggableComponent";
import LanguageDraggableComponent from "@/app/components/languageDraggableComponent";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { useUserStore } from "@/app/store/UserStore";
import { useResumeStore } from "@/app/store/resumeStore";
import axios from "axios";
import fetchResumeHistory from "@/app/libs/fetchResumeHistory";
import isResumeStoreNotEmpty from "@/app/libs/checkIfStoreEmpty";
import { useSession } from "next-auth/react";
import GenericPdfDownloader from "@/app/components/genericPdfDownloader";
//import { BSON, EJSON, ObjectId } from "bson";

import generateObjectId from "@/app/libs/generateObjectId";
import ResumeView from "@/app/components/ResumeView/resumeView";

const ResumeBuilderPage = () => {
  const [title, setTitle] = useState("Untitled");
  const { data: session, update } = useSession();
  const [additionalDetail, showAdditionalDetail] = useState(false);
  const [displayExperienceLevel, setDisplayExperienceLevel] = useState(true);
  const profilePhotoRef = useRef(null);
  const [displayEmployementHistory, setdisplayEmployementHistory] =
    useState(false);
  const updateFirstName = useUserStore((state) => state.updateFirstName);
  const firstName = useUserStore((state) => state.first_name);
  const updateNationality = useUserStore((state) => state.updateNationality);
  const nationality = useUserStore((state) => state.nationality);
  const updatePhone = useUserStore((state) => state.updatePhone);
  const phone = useUserStore((state) => state.phone);
  const updateLastName = useUserStore((state) => state.updateLastName);
  const lastName = useUserStore((state) => state.last_name);
  const updateEmail = useUserStore((state) => state.updateEmail);
  const Email = useUserStore((state) => state.email);

  const resumeEmployement = useResumeStore((state) => state.ResumeEmployement);
  const updateResumeEmployement = useResumeStore(
    (state) => state.updateResumeEmployement
  );
  const resumeEducation = useResumeStore((state) => state.ResumeEducation);
  const updateResumeEducation = useResumeStore(
    (state) => state.updateResumeEducation
  );

  const resumeSkill = useResumeStore((state) => state.ResumeSkills);
  const updateResumeSkill = useResumeStore((state) => state.updateResumeSkills);

  const resumeLink = useResumeStore((state) => state.ResumeLinks);
  const updateResumeLink = useResumeStore((state) => state.updateResumeLinks);

  const resumeLanguage = useResumeStore((state) => state.ResumeLanguages);
  const updateResumeLanguage = useResumeStore(
    (state) => state.updateResumeLanguages
  );

  const resumeTemp = useResumeStore((state) => state.ResumeTemplate);

  const resumeObjective = useResumeStore((state) => state.ResumeObjective);
  const updateResumeObjective = useResumeStore(
    (state) => state.updateResumeObjective
  );

  const skillLists = [
    "Communication kills",
    "Ability to Work in a Team",
    "Microsoft Excel",
    "Customer Service",
    "Microsoft PowerPoint",
    "Ability to Work Under Pressure",
    "Computer Skills",
    "Adobe Photoshop",
    "Adaptability",
  ];

  const [professionalSummary, setProfessionalSummary] = useState({
    content: "",
    charLength: 0,
  });

  useEffect(() => {
    if (isResumeStoreNotEmpty == true) {
      // fetchResumeHistory();
    } else {
      fetchResumeHistory();
    }

    fetchSession();
  }, []);

  async function fetchResumeHistory() {
    const session = await getSession();

    // setTimeout(() => {
    //   alert(session.user.id);
    // }, 3000);

    await axios
      .post("/api/fetchResumeHistory", { id: session?.user?.id })
      .then((res) => {
        console.log(res.data.EducationList);
        updateResumeEducation(res.data.EducationList || []);
        updateResumeEmployement(res.data.EmploymentHistoryList || []);
        updateResumeLanguage(res.data.LanguageList || []);
        updateResumeSkill(res.data.SkillList || []);
        updateResumeObjective(res.data.Objective || []);

        // alert(res.data.objective);
      })
      .catch((error) => {
        alert(error);
      });
  }

  async function fetchSession() {
    const session = await getSession();

    updateFirstName(session.user.first_name);
    updateLastName(session.user.last_name);
    updateEmail(session.user.email);
    updatePhone(session.user.phone_number);
    updateNationality(session.user.nationality);
    // return session;
  }

  const handleUpdateSkills = (id, level, skill) => {
    const skillLists = [...resumeSkill];
    const updatedSkill = skillLists.find((item) => item.id == id);
    updatedSkill.level = level;
    updatedSkill.skill = skill;
    // alert(updatedSkill.skill + level + skillLists[1].level);

    updateResumeSkill(skillLists);

    axios
      .post("/api/updateSkill", {
        id: session?.user?.id,
        skillLists,
      })
      .then(() => {})
      .catch((error) => {});
  };

  const handleTextEditor = (content, charLength) => {
    setProfessionalSummary({
      content: content,
      charLength: charLength,
    });
    updateResumeObjective(content);

    axios
      .post("/api/updateObjective", {
        id: session?.user?.id,
        content,
      })
      .then(() => {})
      .catch((error) => {});
  };

  const handleUpdateEducationBackground = (
    id,
    school,
    degree,
    start_date,
    end_date,
    city,
    description
  ) => {
    const EducationBackgroundList = [...resumeEducation];
    const updatedEducationalBackground = EducationBackgroundList.find(
      (item) => item.id == id
    );
    updatedEducationalBackground.school = school;
    updatedEducationalBackground.degree = degree;
    updatedEducationalBackground.start_date = start_date;
    updatedEducationalBackground.end_date = end_date;
    updatedEducationalBackground.city = city;
    updatedEducationalBackground.description = description;
    updateResumeEducation(EducationBackgroundList);

    axios
      .post("/api/updateEducation", {
        id: session?.user?.id,
        EducationBackgroundList,
      })
      .then(() => {
        //  update({ image: downloadURL });
        // toast.success("Upload sucess!");
        // setTimeout(() => {
        //   setEditProfile(false);
        // }, 200)
      })
      .catch((error) => {
        // console.log(error.code)
        // toast.error(error.response.data.message);
      });
  };

  const handleUpdateEmployementHistory = (
    id,
    job_title,
    company,
    start_date,
    end_date,
    city,
    description
  ) => {
    const EmployementHistoryList = [...resumeEmployement];
    const updatedEmployementHistory = EmployementHistoryList.find(
      (item) => item.id == id
    );
    updatedEmployementHistory.job_title = job_title;
    updatedEmployementHistory.company = company;
    updatedEmployementHistory.start_date = start_date;
    updatedEmployementHistory.end_date = end_date;
    updatedEmployementHistory.city = city;
    updatedEmployementHistory.description = description;

    updateResumeEmployement(EmployementHistoryList);

    axios
      .post("/api/updateEmployement", {
        id: session?.user?.id,
        resumeEmployement,
      })
      .then(() => {
        //  update({ image: downloadURL });
        // toast.success("Upload sucess!");
        // setTimeout(() => {
        //   setEditProfile(false);
        // }, 200)
      })
      .catch((error) => {
        // console.log(error.code)
        // toast.error(error.response.data.message);
      });
  };

  const selectSkill = (skill) => {
    const newSkill = {
      id: generateObjectId(),
      skill: skill,
      level: " ",
    };

    updateResumeSkill([
      ...resumeSkill,
      {
        id: newSkill.id,
        skill: skill,
        level: " ",
      },
    ]);

    axios
      .post("/api/updateSkill/addNewSkill", {
        id: session?.user?.id,
        newSkill: newSkill,
      })
      .then(() => {})
      .catch((error) => {});
  };

  const handleDelete = useCallback((id, itemType) => {
    if (itemType == "language") {
      const LanguageList = [...resumeLanguage];
      const updatedLanguageList = LanguageList.filter((item) => item.id != id);
      updateResumeLanguage(updatedLanguageList);
      axios
        .delete(`/api/updateLanguage/deleteLanguage`, {
          params: {
            id: id,
          },
        })
        .then((res) => {
          console.log("delete id");
        })
        .catch((error) => {});
    }

    if (itemType == "link") {
      const LinkList = [...resumeLink];
      const updatedLinkList = LinkList.filter((item) => item.id != id);
      // updatedLinks(updatedLinkList);
      updateResumeLink(updatedLinkList);

      axios
        .delete(`/api/updateLink/deleteLink`, {
          params: {
            id: id,
          },
        })
        .then((res) => {
          console.log("delete id");
        })
        .catch((error) => {});
    }
    if (itemType == "skill") {
      const skillList = [...resumeSkill];
      const updatedSkillList = skillList.filter((item) => item.id != id);
      // updatedSkills(updatedSkillList);
      updateResumeSkill(updatedSkillList);
      axios
        .delete(`/api/updateSkill/deleteSkill`, {
          params: {
            id: id,
          },
        })
        .then((res) => {
          console.log("delete id");
        })
        .catch((error) => {});
    }

    if (itemType == "education") {
      const educationBackgroundList = [...resumeEducation];
      const updatededucationBackgroundList = educationBackgroundList.filter(
        (item) => item.id != id
      );
      updateResumeEducation(updatededucationBackgroundList);
      axios
        .delete(`/api/updateEducation/deleteEducationalBackground`, {
          params: {
            id: id,
          },
        })
        .then((res) => {
          console.log("delete id");
        })
        .catch((error) => {});
    }

    if (itemType == "employement") {
      const employementHistoryList = [...resumeEmployement];
      const updatedemployementHistoryList = employementHistoryList.filter(
        (item) => item.id != id
      );
      //updateEmployementHistory(updatedemployementHistoryList);
      updateResumeEmployement(updatedemployementHistoryList);
      axios
        .delete(`/api/updateEmployement/deleteEmployementHistory`, {
          params: {
            id: id,
          },
        })
        .then((res) => {
          console.log("delete id");
        })
        .catch((error) => {
          // console.log(error.code)
          // toast.error(error.response.data.message);
        });
    }
  });

  const handleUpdateLinks = (id, label, link) => {
    const SocialLinkList = [...resumeLink];
    const updatedSocialLinkList = SocialLinkList.find((item) => item.id == id);
    updatedSocialLinkList.label = label;
    updatedSocialLinkList.link = link;
    // updatedLinks(SocialLinkList);
    updateResumeLink(SocialLinkList);

    axios
      .post("/api/updateLink", {
        id: session?.user?.id,
        resumeLink,
      })
      .then(() => {})
      .catch((error) => {});
  };

  const handleUpdateLanguages = (id, language, level) => {
    const LanguageList = [...resumeLanguage];
    const updatedLanguageList = LanguageList.find((item) => item.id == id);
    updatedLanguageList.language = language;
    updatedLanguageList.level = level;
    updateResumeLanguage(LanguageList);

    axios
      .post("/api/updateLanguage", {
        id: session?.user?.id,
        resumeLanguage,
      })
      .then(() => {
        //  update({ image: downloadURL });
        // toast.success("Upload sucess!");
        // setTimeout(() => {
        //   setEditProfile(false);
        // }, 200)
      })
      .catch((error) => {
        // console.log(error.code)
        // toast.error(error.response.data.message);
      });
  };

  function handleOnDragEndForEmploymentHistory(result) {
    if (!result.destination) return;

    // const items = Array.from(employmentHistory);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);

    // updateEmployementHistory(items);

    const items = Array.from(resumeEmployement);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateResumeEmployement(items);
  }

  function handleOnDragEndForEducation(result) {
    if (!result.destination) return;

    const items = Array.from(resumeEducation);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateResumeEducation(items);
  }

  function handleOnDragEndForSkill(result) {
    if (!result.destination) return;

    const items = Array.from(resumeSkill);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // updatedSkills(items);
    updateResumeSkill(items);
  }

  function handleOnDragEndForLinks(result) {
    if (!result.destination) return;

    const items = Array.from(resumeLink);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateResumeLink(items);
  }

  function handleOnDragEndForLanguages(result) {
    if (!result.destination) return;

    const items = Array.from(resumeLanguage);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateResumeLanguage(items);
  }

  return (
    <div className="flex flex-col md:flex-row w-screen gap-10 ">
      <div className="md:w-1/2 w-full h-screen overflow-auto py-14 md:px-10 px-2 sm:px-5 no-scrollbar overflow-y-auto">
        <div className="flex flex-col">
          <div className="text-center text-3xl font-semibold w-fit self-center group">
            <input
              type="text"
              className="border-none text-center focus:outline-none focus:cu"
              value={title}
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
            ></input>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-2xl ">Personal Details</div>

          <div className="flex justify-stretch w-full gap-10">
            <div className="flex flex-col flex-1 w-1/2  gap-1">
              <Tooltip id="my-tooltip" style={{ width: "140px" }} />
              <label
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Add a title 
                 that quickly describes your overall experience of the type of role you are applying to "
                data-tooltip-place="top"
                className="flex gap-2 "
              >
                Wanted Job Title <FaRegQuestionCircle />
              </label>
              <input
                type="text"
                className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                placeholder="e.g Teacher"
              ></input>
            </div>

            <div className="flex flex-row justify-start flex-1 items-center gap-3">
              <div
                onClick={() => {
                  profilePhotoRef.current?.click();
                }}
                className="p-5 bg-gray-100 rounded-sm"
              >
                <IoPerson />
              </div>
              <p className="text-sm">Upload Photo</p>

              <input
                ref={profilePhotoRef}
                type="file"
                hidden
                accept="image/*"
              />
            </div>
          </div>

          <div className="flex justify-stretch w-full gap-10">
            <div className="flex flex-col flex-1 justify-stretch w-1/2   gap-1">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                // onChange={(e) => {
                //   updateFirstName(e.target.value);
                // }}
                className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                placeholder="first name"
              ></input>
            </div>

            <div className="flex flex-col flex-1 justify-stretch w-1/2  gap-1">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                // onChange={(e) => {
                //   updateLastName(e.target.value);
                // }}
                className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                placeholder="last name"
              ></input>
            </div>
          </div>

          <div className="flex justify-stretch w-full gap-10">
            <div className="flex flex-col flex-1 justify-stretch w-1/2  gap-1">
              <label>Email</label>
              <input
                type="email"
                value={Email}
                // onChange={(e) => {
                //   updateEmail(e.target.value);
                // }}
                className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                placeholder="abc@gmail.com"
              ></input>
            </div>

            <div className="flex flex-col flex-1 justify-stretch w-1/2  gap-1">
              <label>Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  updatePhone(e.target.value);
                }}
                className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
              ></input>
            </div>
          </div>

          <div className="flex justify-stretch w-full gap-10">
            <div className="flex flex-col flex-1 justify-stretch w-1/2  gap-1">
              <label>Country</label>
              <input
                type="text"
                className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                placeholder="country"
              ></input>
            </div>

            <div className="flex flex-col flex-1 justify-stretch w-1/2  gap-1">
              <label>City</label>
              <input
                type="text"
                className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                placeholder="city"
              ></input>
            </div>
          </div>

          <div
            className={clsx(
              "transition-[max-height]  duration-500 delay-250 ease-in-out overflow-hidden ",
              additionalDetail ? "max-h-48" : "max-h-0"
            )}
          >
            <div className="flex justify-stretch w-full gap-10">
              <div className="flex flex-col flex-1 justify-stretch w-1/2  gap-1">
                <label>Address</label>
                <input
                  type="text"
                  className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                  placeholder="Address"
                ></input>
              </div>

              <div className="flex flex-col flex-1 justify-stretch w-1/2  gap-1">
                <label>Postal Code</label>
                <input
                  type="text"
                  className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                  placeholder=""
                ></input>
              </div>
            </div>

            <div className="pt-5 flex justify-stretch w-full gap-10">
              <div className="flex flex-col flex-1 justify-stretch w-1/2  gap-1">
                <Tooltip id="dateofbirth-tooltip" style={{ width: "140px" }} />
                <label
                  data-tooltip-id="dateofbirth-tooltip"
                  data-tooltip-content=" Add your date of birth only if it is a relevant requirement for your position. In most cases, leave this blank "
                  data-tooltip-place="top"
                  className="flex gap-2"
                >
                  Date Of Birth <FaRegQuestionCircle />
                </label>
                <input
                  type="date"
                  className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                  placeholder=""
                ></input>
              </div>

              <div className="flex flex-col flex-1 justify-stretch w-1/2  gap-1">
                <Tooltip id="nationality-tooltip" style={{ width: "140px" }} />
                <label
                  data-tooltip-id="nationality-tooltip"
                  data-tooltip-content="Include your nationality only if it is relevant to your position. In most cases, leave this blank "
                  data-tooltip-place="top"
                  className="flex gap-2"
                >
                  Nationality <FaRegQuestionCircle />
                </label>
                <input
                  type="text"
                  className="py-3 px-2 bg-gray-100 rounded outline-none focus:border-b-2 focus:border-cyan-500 caret-cyan-600"
                  value={nationality || ""}
                ></input>
              </div>
            </div>
          </div>

          <p
            onClick={() => {
              showAdditionalDetail(!additionalDetail);
            }}
          >
            {" "}
            {!additionalDetail ? (
              <span className="flex items-center gap-2  text-cyan-500">
                Show additional details{" "}
                <MdKeyboardDoubleArrowDown className="text-cyan-500" />
              </span>
            ) : (
              <span className="flex items-center gap-2  text-cyan-500">
                {" "}
                Hide additional details{" "}
                <MdKeyboardDoubleArrowUp className="text-cyan-500" />
              </span>
            )}
          </p>
        </div>

        {/* // professional summary */}
        <div className="flex flex-col pt-10 gap-2">
          <div className="text-2xl">Proffesional Summary</div>
          <div className="text-sm">
            Writ 2-4 short & energetic sentences to interest the reader! Mention
            your role, experience & most importantly - your biggest
            achievements, best qualities and skills.
          </div>
          <TextEditor
            handleTextEditor={handleTextEditor}
            value={resumeObjective}
          />
          <div className="pt-8">
            Recruiter tip: write 50-200 characters to increase interview chances{" "}
            {professionalSummary.charLength}/200
          </div>
        </div>

        {/* Employement History */}
        <div className="flex flex-col pt-10 gap-4">
          <div className="text-2xl">Employement History</div>
          <div className="text-sm">
            how your relavant experience(last 10 years). Use bullet points to
            note your achievements.if possible - use numbers/facts(Achieved X
            measured by Y.by doing Z)
          </div>
          <DragDropContext onDragEnd={handleOnDragEndForEmploymentHistory}>
            <Droppable droppableId="employmentHistory">
              {(provided) => (
                <div
                  className="flex flex-col gap-3"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {resumeEmployement.map(
                    (
                      {
                        id,
                        job_title,
                        company,
                        start_date,
                        end_date,
                        city,
                        description,
                      },
                      index
                    ) =>
                      //index
                      {
                        return (
                          <EmploymentDraggableComponent
                            id={id}
                            JobTitle={job_title}
                            Company={company}
                            City={city}
                            StartDate={start_date}
                            EndDate={end_date}
                            draggableId={id}
                            Description={description}
                            handleDelete={handleDelete}
                            handleUpdateEmployementHistory={
                              handleUpdateEmployementHistory
                            }
                            index={index}
                          />
                        );
                      }
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="flex items-center">
            <FiPlus
              onClick={() => {
                //   let newEmployementHistory = [...employmentHistory];

                // newEmployementHistory.push({
                //   id: (employmentHistory.length + Math.random()).toString(),
                //   job_title: "",
                //   company: "",
                //   city: "",
                //   start_date: "",
                //   end_date: "",
                //   description: "",
                //   // display: true,
                // });
                // updateEmployementHistory(newEmployementHistory);
                //  alert(ObjectId());
                // alert(generateObjectId());
                const newEmployementHistory = {
                  id: generateObjectId(),
                  job_title: "",
                  company: "",
                  city: "",
                  start_date: "",
                  end_date: "",
                  description: "",
                };

                updateResumeEmployement([
                  ...resumeEmployement,
                  {
                    id: newEmployementHistory.id,
                    job_title: newEmployementHistory.job_title,
                    company: newEmployementHistory.company,
                    city: newEmployementHistory.city,
                    start_date: newEmployementHistory.start_date,
                    end_date: newEmployementHistory.end_date,
                    description: newEmployementHistory.description,
                  },
                ]);
                axios
                  .post("/api/updateEmployement/addEmployementHistory", {
                    id: session?.user?.id,
                    newEmployementHistory,
                  })
                  .then((res) => {
                    console.log(
                      "the returned id" + res.data.job_title + res.data.id
                    );
                  })
                  .catch((error) => {
                    // console.log(error.code)
                    // toast.error(error.response.data.message);
                  });
              }}
            />{" "}
            Add one more employement
          </div>

          {/*  education draggable component */}
          <div className="flex flex-col pt-10 gap-4">
            <div className="text-2xl">Education Background</div>
            <div className="text-sm">
              varied education on your resume sumps up hte value that your
              learnings and Background will bring to job
            </div>
            <DragDropContext onDragEnd={handleOnDragEndForEducation}>
              <Droppable droppableId="education">
                {(provided) => (
                  <div
                    className="flex flex-col gap-3"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {resumeEducation.map(
                      (
                        {
                          id,
                          school,
                          degree,
                          city,
                          start_date,
                          end_date,
                          description,
                        },
                        index
                      ) => {
                        return (
                          <EducationDraggableComponent
                            id={id}
                            draggableId={id}
                            index={index}
                            School={school}
                            Degree={degree}
                            City={city}
                            Description={description}
                            StartDate={start_date}
                            EndDate={end_date}
                            handleDelete={handleDelete}
                            handleUpdateEducationBackground={
                              handleUpdateEducationBackground
                            }
                            // updateDisplay={updateDisplay}
                          />
                        );
                      }
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="flex items-center">
              <FiPlus
                onClick={() => {
                  const newEducationBackground = {
                    id: generateObjectId(),
                    school: "",
                    degree: "",
                    city: "",
                    start_date: "",
                    end_date: "",
                    description: "",
                  };
                  updateResumeEducation([
                    ...resumeEducation,
                    {
                      id: newEducationBackground.id,
                      school: "",
                      degree: "",
                      city: "",
                      start_date: "",
                      end_date: "",
                      description: "",
                    },
                  ]);

                  axios
                    .post("/api/updateEducation/addEducationBackground", {
                      id: session?.user?.id,
                      newEducationBackground,
                    })
                    .then((res) => {})
                    .catch((error) => {
                      // console.log(error.code)
                      // toast.error(error.response.data.message);
                    });
                }}
              />{" "}
              Add one more education
            </div>
          </div>

          {/* skill draggable component */}
          <div className="flex flex-col pt-10 gap-4">
            <div className="text-2xl">Skills</div>
            <div className="text-sm">
              Choose 5 important skills that show you fit the position.Make sure
              they match the key skills mentioned in the job listing
              (especiallly when applying via an online system)
            </div>

            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={displayExperienceLevel}
                onChange={(e) => {
                  setDisplayExperienceLevel(e.currentTarget.checked);
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Don't show experience level
              </span>
            </label>

            <div className="flex flex-wrap gap-4 ">
              {skillLists.map((item) => (
                <div
                  onClick={() => {
                    selectSkill(item);
                  }}
                  className="inline-flex items-center gap-1 bg-gray-100 p-2 rounded-md hover:bg-teal-50 hover:text-cyan-600 cursor-pointer"
                >
                  {item} <FiPlus />
                </div>
              ))}
            </div>

            <DragDropContext onDragEnd={handleOnDragEndForSkill}>
              <Droppable droppableId="skill">
                {(provided) => (
                  <div
                    className="flex flex-col gap-3"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {resumeSkill.map(({ id, skill, level }, index) => {
                      return (
                        <SkillDraggableComponent
                          id={id}
                          draggableId={id}
                          index={index}
                          itemType={"Skills"}
                          skill={skill}
                          skillLevel={level}
                          showExperienceLevel={displayExperienceLevel}
                          handleDelete={handleDelete}
                          updateSkill={handleUpdateSkills}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="flex items-center">
              <FiPlus
                onClick={() => {
                  // let newSkill = [...skills];

                  // newSkill.push({
                  //   id: (skills.length + 1).toString(),
                  //   skill: "",
                  //   level: "",
                  //   //  display: true,
                  // });

                  // updatedSkills(newSkill);

                  const newSkill = {
                    id: generateObjectId(),
                    skill: " ",
                    level: " ",
                  };

                  updateResumeSkill([
                    ...resumeSkill,
                    {
                      id: newSkill.id,
                      skill: "",
                      level: "",
                    },
                  ]);

                  axios
                    .post("/api/updateSkill/addNewSkill", {
                      id: session?.user?.id,
                      newSkill,
                    })
                    .then((res) => {})
                    .catch((error) => {
                      // console.log(error.code)
                      // toast.error(error.response.data.message);
                    });
                }}
              />{" "}
              Add one more skill
            </div>
          </div>

          {/* website & social link */}
          <div className="flex flex-col pt-10 gap-4">
            <div className="text-2xl">Websites & Social Links</div>
            <div className="text-sm">
              You can add links to website you want hiring managers to see!
              Perphaps it will be a link to your portfolio.Linkedln profile or
              personal website
            </div>

            {/* <div className="flex flex-wrap gap-4 ">
              {links.map((item) => (
                <div
                  onClick={() => {
                    handleUpdateSkills(item);
                  }}
                  className="inline-flex items-center gap-1 bg-gray-100 p-2 rounded-md hover:bg-teal-50 hover:text-cyan-600 cursor-pointer"
                >
                  {item} <FiPlus />
                </div>
              ))}
            </div> */}

            <DragDropContext onDragEnd={handleOnDragEndForLinks}>
              <Droppable droppableId="link">
                {(provided) => (
                  <div
                    className="flex flex-col gap-3"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {resumeLink.map(({ id, label, link }, index) => {
                      return (
                        <SocialLinkDraggableComponent
                          id={id}
                          draggableId={id}
                          index={index}
                          Label={label}
                          Link={link}
                          handleUpdateLinks={handleUpdateLinks}
                          handleDelete={handleDelete}
                          // display={display}
                          //  updateDisplay={updateDisplay}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="flex items-center">
              <FiPlus
                onClick={() => {
                  const newLink = {
                    id: generateObjectId(),
                    label: " ",
                    link: " ",
                  };

                  updateResumeLink([
                    ...resumeLink,
                    {
                      id: newLink.id,
                      label: "",
                      link: "",
                    },
                  ]);

                  axios
                    .post("/api/updateLink/addNewLink", {
                      id: session?.user?.id,
                      newLink,
                    })
                    .then((res) => {})
                    .catch((error) => {
                      // console.log(error.code)
                      // toast.error(error.response.data.message);
                    });

                  // updateResumeLink([
                  //   ...resumeLink,
                  //   {
                  //     id: (resumeLink.length + Math.random()).toString(),
                  //     label: "",
                  //     link: "",
                  //   },
                  // ]);
                }}
              />{" "}
              Add one more skill
            </div>
          </div>

          <div className="flex flex-col pt-10 gap-4">
            <div className="text-2xl">Languages</div>

            <DragDropContext onDragEnd={handleOnDragEndForLanguages}>
              <Droppable droppableId="languages">
                {(provided) => (
                  <div
                    className="flex flex-col gap-3"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {resumeLanguage.map(({ id, language, level }, index) => {
                      return (
                        <LanguageDraggableComponent
                          id={id}
                          draggableId={id}
                          index={index}
                          Language={language}
                          Level={level}
                          handleUpdateLanguages={handleUpdateLanguages}
                          handleDelete={handleDelete}
                          // display={display}
                          //  updateDisplay={updateDisplay}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="flex items-center">
              <FiPlus
                onClick={() => {
                  // let ListOfLanguages = [...languages];

                  // ListOfLanguages.push({
                  //   id: (languages.length + 1).toString(),
                  //   language: "",
                  //   level: "",
                  //   //  display: true,
                  // });

                  // updateLanguages(ListOfLanguages);

                  const newLanguage = {
                    id: generateObjectId(),
                    language: " ",
                    level: " ",
                  };

                  updateResumeLanguage([
                    ...resumeLanguage,
                    {
                      id: newLanguage.id,
                      language: "",
                      level: "Select Level",
                    },
                  ]);

                  axios
                    .post("/api/updateLanguage/addNewLanguage", {
                      id: session?.user?.id,
                      newLanguage,
                    })
                    .then((res) => {})
                    .catch((error) => {
                      // console.log(error.code)
                      // toast.error(error.response.data.message);
                    });

                  // updateResumeLanguage([
                  //   ...resumeLanguage,
                  //   {
                  //     id: (languages.length + Math.random()).toString(),
                  //     language: "",
                  //     level: "Select Level",
                  //   },
                  // ]);
                }}
              />{" "}
              Add one more language
            </div>
          </div>
          {/* <div className='border-solid border-2 p-2 w-full'>hefnjh </div>
                        <div className='border-solid border-2 p-2 w-full'>hefnjh </div>
                        <div className='border-solid border-2 p-2 w-full'>hefnjh </div> */}
        </div>
      </div>
      <div className="  md:w-1/2 w-full bg-slate-800 h-screen text-white ">
        {/* {resumeEmployement.map((item) => (
          <div key={item.id}>{item.job_title}</div>
        ))}

        {resumeEducation.map((item) => (
          <div key={item.id}>{item.degree}</div>
        ))}
        <div
          dangerouslySetInnerHTML={{
            __html: `${resumeObjective}`,
          }}
        ></div> */}
        <div className="py-10 px-10 flex flex-col gap-3 h-screen">
          <div className="text-end">
            <GenericPdfDownloader
              downloadFileName="CustomPf"
              rootElementId="test"
            ></GenericPdfDownloader>
            {/* <button
              onClick={() => {
                GenericPdfDownloader();
              }}
              className="py-2 px-3 bg-white text-black rounded-md border-double border-4 border-indigo-600 "
            >
              Download
            </button> */}
          </div>
          <div id="test" className="grow bg-white">
            <ResumeView template={resumeTemp} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
