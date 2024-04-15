import React from 'react';
import Image from 'next/image';
import { useUserStore } from "@/app/store/UserStore";
import { useResumeStore } from "@/app/store/resumeStore";
import { useSession } from "next-auth/react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";
import { CiLink } from "react-icons/ci";

type Key = string | number;

const TemplateTwo = () => {
    const firstName = useUserStore((state) => state.first_name);
    const nationality = useUserStore((state) => state.nationality);

    // const address = useUserStore((state)=> state.)

    const phone = useUserStore((state) => state.phone);

    const lastName = useUserStore((state) => state.last_name);

    const Email = useUserStore((state) => state.email);

    const resumeEmployement = useResumeStore((state) => state.ResumeEmployement);

    const resumeEducation = useResumeStore((state) => state.ResumeEducation);

    const resumeSkill = useResumeStore((state) => state.ResumeSkills);


    const resumeLink = useResumeStore((state) => state.ResumeLinks);


    const resumeLanguage = useResumeStore((state) => state.ResumeLanguages);


    const resumeObjective = useResumeStore((state) => state.ResumeObjective);

    const { data: session, update } = useSession();


    return (
        <div id="template-two" className='flex flex-col  w-full h-full p-5 gap-2'>
            <div className='flex flex-row w-full '>
                <div className='flex flex-col w-2/3'>
                    <div className='text-4xl font-bold'>{firstName} {lastName}</div>
                    <div>{resumeEmployement[0]?.job_title || ""}</div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-row items-center gap-1'>< FaPhoneAlt></FaPhoneAlt>{phone}</div>
                    <div className='flex flex-row items-center gap-1'><MdEmail></MdEmail>{Email}</div>
                    <div className='flex flex-row items-center gap-1'><FaLocationDot />Addis Ababa</div>
                    <div className='items-center'></div>
                </div>
            </div>
            <div className='flex flex-row divide-x w-full h-full'>
                <div className='w-1/3 h-full flex flex-col px-2'>
                    <div className='flex flex-col '>
                        <div className='pt-2 font-semibold '>EDUCATION</div>
                        <div>
                            {
                                resumeEducation.map((eduHis) => (
                                    <div className='flex flex-col pb-5' key={eduHis.id as Key}>
                                        <p className='text-sm'>{eduHis.start_date} upto {eduHis.start_date}</p>
                                        <p className='text-sm  flex flex-row'>Degree - {eduHis.degree}</p>
                                        <p className='text-sm  flex flex-row'>College - {eduHis.school}</p>
                                        {/* <p className='text-sm'>{eduHis.}</p>
                                        <p>{empHis.city}</p> */}
                                    </div>
                                ))
                            }
                        </div>

                        <div className=" text-[9px] text-center self-center h-5"></div>

                        <div className="flex flex-col items-start ">
                            <div className='font-semibold'>SKILLS</div>

                            <div className="flex flex-col text-[9px] pt-1 gap-1 ">
                                {
                                    resumeSkill.map((skill) => (
                                        <div key={skill.id as Key} className='flex flex-row gap-1 items-center'><div><GoDotFill /></div> <div>{skill.skill}</div></div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className=" text-[9px] text-center self-center h-5"></div>

                        <div className='flex flex-col '>
                            <div className='pt-2 font-semibold'>LANGUAGE</div>
                            <div>
                                {
                                    resumeLanguage.map((language) => (
                                        <div className='flex flex-col ' key={language.id as Key}>

                                            <p className='text-sm '>{language.language} {language.level}</p>


                                        </div>
                                    ))
                                }
                            </div>
                        </div>


                    </div>
                </div>
                <div className='w-2/3 h-full flex flex-col px-2'>
                    <div className='pt-2 flex flex-col '>
                        <div className='font-semibold'>CAREER OBJECTIVE</div>
                        <div className='text-sm pt-2' dangerouslySetInnerHTML={{
                            __html: `${resumeObjective}`,
                        }}></div>
                    </div>

                    <div className=" text-[9px] text-center self-center h-5"></div>

                    <div className='flex flex-col '>
                        <div className='pt-2'>WORK EXPERICENCE</div>
                        <div>
                            {
                                resumeEmployement.map((empHis) => (
                                    <div className='flex flex-col pb-5' key={empHis.id as Key}>
                                        <p className='text-sm'>{empHis.start_date} upto {empHis.start_date}</p>
                                        <p className='text-sm font-semibold'>{empHis.job_title}</p>
                                        <p className='text-sm'>{empHis.company}</p>
                                        <p>{empHis.city}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className=" text-[9px] text-center self-center h-5"></div>

                    <div className='flex flex-col '>
                        <div className='pt-2'>SOCIAL LINK</div>
                        <div>
                            {
                                resumeLink.map((link) => (
                                    <div className='flex flex-col pb-5' key={link.id as Key}>

                                        <p className='text-sm '>{link.label}</p>
                                        <p className='text-sm'>{link.link}</p>

                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TemplateTwo;