import React from 'react'

import { FaFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='w-screen py-16 bg-cyan-950 text-white'>
            {/* <div className='w-full'> */}
            <div className='flex md:flex-row flex-col md:w-2/3 w-1/2 mx-auto gap-5'>
                <div className='flex flex-col gap-4'>
                    <p className='text-xl font-semibold w-2/3'>Connect with us on social media</p>
                    <div className='flex flex-row gap-3'>
                        <div ><FaFacebook size={25} /></div>
                        <div><FaYoutube size={25} /></div>
                        <div><FaLinkedin size={25} /></div>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='bg-transparent opacity-50'>JOB SEEKERS</div>
                    <div className=''>Create a Resume</div>
                    <div className=''>Resume Templates</div>
                    <div className=''>Resume Examples</div>
                </div>

                <div className='flex flex-col gap-1'>
                    <div className='bg-transparent opacity-50'>CAREER RESOURCES</div>
                    <div className=''>Resume Help</div>
                    <div className=''>Job Interview</div>
                    <div className=''>Blog</div>
                </div>

                <div className='flex flex-col gap-1'>
                    <div className='bg-transparent opacity-50'>SUPPORT</div>
                    <div className=''>FAQ</div>
                    <div className=''>Contact US</div>
                    <div className=''>Terms of Service</div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default Footer