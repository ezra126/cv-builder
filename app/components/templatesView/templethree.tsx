"use client";

import React from 'react';
import Image from 'next/image';
import { useUserStore } from "@/app/store/UserStore";
import { useResumeStore } from "@/app/store/resumeStore";
import { useSession } from "next-auth/react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GoDotFill } from "react-icons/go";


type Key = string | number;

const TemplateThree = () => {


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
        <div id="template-one" className='relative w-full h-full '>
            {/* <div className='absolute h-[25%] w-[100%] flex flex-row -z-1  '>
                <div className='bg-amber-500 w-[10%]'>j</div>
                <div className='bg-amber-500 opacity-10 w-[90%] '>h</div>
            </div> */}
            <div className='flex flex-row w-full h-full z-1 p-5 gap-2'>

                <div className='flex flex-col w-2/5 '>

                    <div className="flex flex-col text-black gap-2 px-2 mx-auto">
                        <div className="self-center pt-5 ">

                            {
                                (session?.user?.image == undefined) ?
                                    <div> </div> :
                                    <Image
                                        // src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp"
                                        src={`${session?.user?.image}`}
                                        width={170}
                                        height={400}
                                        // style={{ borderRadius: '100%' }}
                                        alt="profile image"
                                    // className="h-15 w-15 rounded-full avatar aspect-square"
                                    />
                            }



                        </div>
                        <div className='flex flex-col'>
                            <div className='text-2xl font-semibold'>{firstName} </div>
                            <div className='text-2xl font-semibold'>{lastName}</div>
                            <div className="text-sm">{resumeEmployement[0]?.job_title}</div>
                        </div>

                        <div className=" text-[9px] text-center self-center h-5"></div>

                        <div className="flex flex-col items-start divide-y">
                            <div className='text-sm font-semibold'>CONTACTS</div>

                            <div className="flex flex-col text-[9px] pt-1 gap-1">

                                <div className='flex flex-row gap-2'><MdEmail /> <div> {Email}</div></div>
                                <div className='flex flex-row gap-2'><FaPhoneAlt /> <div> {phone}</div></div>
                                <div className='flex flex-row gap-2'>Addis Ababa, Ethiopia</div>
                            </div>
                        </div>

                        <div className=" text-[9px] text-center self-center h-5"></div>
                        <div className="flex flex-col items-start divide-y">
                            <div className='text-sm font-semibold'>SKILLS</div>

                            <div className="flex flex-col text-[9px] pt-1 gap-1 ">
                                {
                                    resumeSkill.map((skill) => (
                                        <div key={skill.id as Key} className='flex flex-row gap-1 items-center'><div><GoDotFill /></div> <div>{skill?.skill}</div></div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                </div>
                <div className='flex flex-col w-2/3 bg-white pt-3'>



                    <div className='flex flex-col divide-y'>
                        <div>PROFILE</div>
                        <div className='text-sm pt-2' dangerouslySetInnerHTML={{
                            __html: `${resumeObjective}`,
                        }}></div>
                    </div>


                    <div className=" text-[9px] text-center self-center h-5"></div>

                    <div className='flex flex-col divide-y'>
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

                    <div className='flex flex-col divide-y'>
                        <div className='pt-2'>EDUCATION</div>
                        <div>
                            {
                                resumeEducation.map((eduHis) => (
                                    <div className='flex flex-col pb-5' key={eduHis.id as Key}>
                                        <p className='text-sm'>{eduHis.start_date} upto {eduHis.start_date}</p>
                                        <p className='text-sm font-semibold'>{eduHis.degree} at {eduHis.school}</p>
                                        {/* <p className='text-sm'>{eduHis.}</p>
                                        <p>{empHis.city}</p> */}
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

export default TemplateThree;