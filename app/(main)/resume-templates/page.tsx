"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useResumeStore } from "@/app/store/resumeStore";
import { useRouter } from 'next/navigation'

const ResumeTemplate = () => {
    const [showGrid, setShowGrid] = useState(false);
    const router = useRouter()
    const resumeTemplate = useResumeStore((state) => state.ResumeTemplate);
    const updateResumeTemplate = useResumeStore(
        (state) => state.updateResumeTemplate
    );

    useEffect(() => {

        setShowGrid(true)

    }, [])

    return (
        <div className='w-screen'>
            <div className='flex flex-col  justify-center items-center'>
                <div className='flex flex-col md:w-1/2 w-2/3 md:pt-20 pt-14 text-center items-center gap-4'>
                    <h1 className='font-bold md:text-5xl text-3xl '>Job-winning resume templates</h1>
                    <p className='pb-15'>Each resume template is expertly designed and follows the exact “resume rules” hiring managers look for. Stand out and get hired faster with field-tested resume templates.</p>
                    {/* <div className="mt-5 p-5 bg-cyan-600 hover:bg-cyan-500 hover:shadow-xl text-white rounded w-fit">
                        Create My Resume
                    </div> */}
                </div>
            </div>

            <div className={clsx('transition ease-in-out delay-300 duration-500 pt-24 opacity-0 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 justify-items-center w-4/5 mx-auto', showGrid && ("opacity-100 -translate-y-12"))}>

                <div className='relative p-6 bg-slate-200 group'>
                    <Image className="group-hover:shadow-2xl" src="/templates/simple-template-2.png" alt="dk" width={280}
                        height={400}></Image>
                    <button
                        onClick={() => {
                            updateResumeTemplate("template-2")
                            router.push('/resume-builder')
                        }}
                        className={clsx(`transition ease-in-out delay-150 absolute bg-cyan-600 p-2 scale-0 group-hover:scale-100 group-hover:-translate-y-10 hover:shadow-2xl text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `)}>
                        Use This Template
                    </button>
                </div>


                <div className='relative p-6 bg-slate-200 group'>
                    <Image className="group-hover:shadow-2xl" src="/templates/simple-template-3.png" alt="dk" width={280}
                        height={400}></Image>
                    <button
                        onClick={() => {
                            updateResumeTemplate("template-3")
                            router.push('/resume-builder')
                        }}
                        className={clsx(`transition ease-in-out delay-150 absolute bg-cyan-600 p-2 scale-0 group-hover:scale-100 group-hover:-translate-y-10 hover:shadow-2xl text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `)}>
                        Use This Template
                    </button>
                </div>

                <div className='relative p-6 bg-slate-200 group '
                // onMouseEnter={() => {
                //     setbtn(true)
                // }} onMouseLeave={() => setbtn(false)}
                >
                    <Image className="group-hover:shadow-2xl" src="/templates/simple-template-1.jpg" alt="dk" width={280}
                        height={400}></Image>

                    <button
                        onClick={() => {
                            updateResumeTemplate("template-1")
                            router.push('/resume-builder')
                        }}
                        className={clsx(`transition ease-in-out delay-150 absolute bg-cyan-600 p-2 scale-0 group-hover:scale-100 group-hover:-translate-y-10 hover:shadow-2xl text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `)}>
                        Use This Template
                    </button>


                </div>

                <div className='relative p-6 bg-slate-200 group'>
                    <Image className="group-hover:shadow-2xl" src="/templates/simple-template-2.png" alt="dk" width={280}
                        height={400}></Image>
                    <button className={clsx(`transition ease-in-out delay-150 absolute bg-cyan-600 p-2 scale-0 group-hover:scale-100 group-hover:-translate-y-10 hover:shadow-2xl text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `)}>
                        Use This Template
                    </button>
                </div>
                <div className='relative p-6 bg-slate-200 group'>
                    <Image className="group-hover:shadow-2xl" src="/templates/simple-template-1.jpg" alt="dk" width={280}
                        height={400}></Image>
                    <button className={clsx(`transition ease-in-out delay-150 absolute bg-cyan-600 p-2 scale-0 group-hover:scale-100 group-hover:-translate-y-10 hover:shadow-2xl text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `)}>
                        Use This Template
                    </button>
                </div>


                <div className='relative p-6 bg-slate-200 group'>
                    <Image className="group-hover:shadow-2xl" src="/templates/simple-template-3.png" alt="dk" width={280}
                        height={400}></Image>
                    <button className={clsx(`transition ease-in-out delay-150 absolute bg-cyan-600 p-2 scale-0 group-hover:scale-100 group-hover:-translate-y-10 hover:shadow-2xl text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `)}>
                        Use This Template
                    </button>
                </div>


            </div>

        </div>
    )
}

export default ResumeTemplate;