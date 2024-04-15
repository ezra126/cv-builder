"use client"

import React from 'react';
import { motion, useScroll } from "framer-motion";
import { LazyMotion, domAnimation, m } from "framer-motion"
import Image from "next/image";
import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter();
    return (
        <div className="bg-gray-100 h-90vh shadow-sm ">
            <LazyMotion features={domAnimation}>
                <m.div
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center pt-20 w-3/4 md:w-2/3 mx-auto gap-2">
                    <div className=' tracking-wide font-semibold'>ONLINE RESUME BUILDER</div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Only 2% of resumes make it past the first round.
                        Be in the top 2%</div>
                    <div className="text-md text-center px-10">Use professional field-tested resume templates that follow the exact ‘resume rules’ employers look for.
                        Easy to use and done within minutes - try now for free!</div>
                    <div onClick={() => {
                        router.push('/resume-templates')
                    }} className="mt-5 p-2 md:p-5 bg-cyan-600 hover:bg-cyan-500 hover:shadow-xl text-white rounded hover:cursor-pointer">
                        Create My Resume
                    </div>
                </m.div>
            </LazyMotion>

            <motion.div
                className="h-72 w-3/4 md:w-1/2 mx-auto mt-20  shadow "
                initial={{ y: 96, opacity: 0 }}
                animate={{
                    y: 0, opacity: 1
                }}
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                }}

            >
                <div className="flex flex-row h-full rounded-full " >
                    <div className="w-1/3 bg-emerald-700 pt-6">
                        <div className="flex flex-col text-white gap-2 w-2/3 px-2 mx-auto overflow-hidden">
                            <div className="self-center rounded-full">
                                <Image
                                    src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp"
                                    width={60}
                                    height={60}
                                    style={{ borderRadius: '100%' }}
                                    alt="profile image"
                                    className="h-15 w-15 rounded-full"
                                />


                            </div>
                            <div className='text-sm md:text-xl'>Solome Beyene</div>
                            <div className="border-t-2 w-4 border-white  self-center"></div>
                            <div className=" text-[9px] text-center self-center">CUSTOMER SERVICE REPRESENTATIVE</div>
                            <div className="flex flex-col items-start ">
                                <div>Details</div>
                                <div className="flex flex-col text-[9px]">
                                    <div>Addis Ababa, Ethiopia</div>
                                    <div>sele@gmail.com</div>
                                    <div>+251911000000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line-clamp-5 w-2/3 bg-white sm:pt-9 pt-3 px-5">
                        <div className="font-semibold">Profile</div>
                        <p className="line-clamp-2 md:line-clamp-none text-sm h-full overflow-hidden">
                            Diligent and even-tempered retail professional with 5 years of experience providing excellent customer service to technology enthusiasts. Highly responsive to customers needs and always looking to find a solution to customer inquiries. A team player who goes the extra mile to ensure customers are satisfied.
                        </p>
                    </div>

                </div>
            </motion.div>
        </div>
    )
}

export default Hero