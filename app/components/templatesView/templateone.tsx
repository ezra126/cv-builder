import React from 'react';
import Image from 'next/image';



const TemplateOne = () => {
    return (
        <div id="template-one" className='flex flex-row w-full h-full shadow-lg'>
            <div className='flex flex-col w-1/3 bg-amber-800'>

                <div className="flex flex-col text-white gap-2 w-2/3 px-2 mx-auto">
                    <div className="self-center rounded-full pt-10">
                        <Image
                            src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp"
                            width={50}
                            height={50}
                            style={{ borderRadius: '100%' }}
                            alt="profile image"
                            className="h-15 w-15 rounded-full avatar aspect-square"
                        />


                    </div>
                    <div className='text-2xl'>Solome Beyene</div>
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
            <div className='flex flex-col w-2/3 bg-black'>
                fhfhhf
            </div>
        </div>
    )
}

export default TemplateOne;