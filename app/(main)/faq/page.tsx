import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import FaqComponent from "@/app/components/faqComponent"

const FAQ = () => {
    return (
        <div className='md:pt-20 py-14 w-full'>
            <div className='md:w-1/2 sm:w-2/3 w-3/4 mx-auto flex flex-col'>
                <h1 className='md:w-1/2 w-2/3 mx-auto md:text-3xl sm:text-2xl text-2xl font-bold text-center'>Frequently Asked Questions</h1>
                <div className='pt-5 flex flex-col divide-y gap-3'>
                    <FaqComponent title="How can I customize my resume ? " detail="Our resume templates are designed to adapt your content and look great across allof our designs" />
                    <FaqComponent title="Can I download my resume to PDF ? " detail="Once your resume is ready there is button where your can download on PDF format" />
                    <FaqComponent title="How can I choose Template ? " detail="you can choose template on resume template page.create resume button will redirect you to resume template page " />
                    <FaqComponent title="is it free to use this platform ? " detail="yes is it free for now" />

                </div>
            </div>
        </div>
    )
}

export default FAQ