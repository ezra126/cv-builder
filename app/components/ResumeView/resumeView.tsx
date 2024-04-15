"use client";
import React, { useEffect } from 'react'
import TemplateOne from '../templatesView/templateone'
import TemplateTwo from '../templatesView/templatetwo'
import TemplateThree from '../templatesView/templethree'
import TemplateFour from '../templatesView/templefour'
import { useResumeStore } from "@/app/store/resumeStore";


const ResumeView = ({ template }: { template: string }) => {
    // useEffect(() => {
    //     alert(template)
    // })

    const templatee = useResumeStore((state) => state.ResumeTemplate);
    return (
        <div id="resume" className='w-full h-full  bg-white text-black'>

            {/* { template == "template-1" ?
                    <TemplateOne></TemplateOne> : <TemplateThree></TemplateThree>
                     }  */}

            {(() => {
                if (templatee == "template-1") {
                    return (
                        <TemplateOne></TemplateOne>
                    )
                } else if (templatee == "template-2") {
                    return (
                        <TemplateTwo></TemplateTwo>
                    )
                } else if (templatee == "template-3") {
                    return (
                        <TemplateThree></TemplateThree>
                    )
                }
            })()}





        </div>
    )
}

export default ResumeView