"use client";

import React, { useEffect, useRef, useState } from "react";
import Hero from "@/app/components/HomeComponent/Hero";
import ResumeView from "../components/ResumeView/resumeView";
import { Swiper, SwiperSlide, } from 'swiper/react';
import { register } from 'swiper/element/bundle';
import { SwiperContainer } from "swiper/element/bundle";
import Review from "@/app/components/HomeComponent/Review"
import StepsComponent from "@/app/components/HomeComponent/StepsComponent"
import { useSwiper } from 'swiper/react';
import { useResumeStore } from "@/app/store/resumeStore";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { Rating } from 'react-simple-star-rating'
import Image from "next/image";
import Footer from "@/app/components/HomeComponent/Footer"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { useRouter } from 'next/navigation'
import { EffectCoverflow, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';



export default function Home() {
  const swiper = useSwiper()
  const swiperRef = useRef(swiper);
  const router = useRouter();

  // const navigationPrevRef = React.useRef(null)
  // const navigationNextRef = React.useRef(null)
  return (
    <>
      <main className=" bg-white">
        <Hero />
        <div id="middle" className="pb-20">
          <div className="pt-10 md:pt-20 md:w-1/2 w-2/3 mx-auto font-bold text-2xl md:text-4xl text-center">Reviewed by the community. Trusted by professionals</div>
          <div className="flex flex-col md:flex-row w-full md:w-2/3 mx-auto px-5 md:px-0 gap-5">
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="text-2xl font-semibold">4.5 out of 5</p>
              <div className="flex flex-row">
                <Rating readonly initialValue={1} iconsCount={1} fillColor="#00B67A" />
                <Rating readonly initialValue={1} iconsCount={1} fillColor="#00B67A" />
                <Rating readonly initialValue={1} iconsCount={1} fillColor="#00B67A" />
                <Rating readonly initialValue={1} iconsCount={1} fillColor="#00B67A" />
                <Rating readonly initialValue={0.6} iconsCount={1} fillColor="#00B67A" />
              </div>
              <div className="pt-5">
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center">
                      <Rating readonly initialValue={1} iconsCount={1} fillColor="#00B67A" />
                      <p className="text-2xl">Trustpilot</p>
                    </div>
                    <div className="text-sm">based on 49,742 reviews</div>
                  </div>

                </div>



              </div>

            </div>

            <div className="w-full">
              <Review />
            </div>
          </div>
        </div>


        <div className="flex flex-col mx-auto w-full py-20 gap-20 bg-gray-100">
          <div className="sm:w-2/3  w-full md:px-5 sm:px-0 px-10 text-center self-center">
            <div className="flex flex-col items-center gap-5">
              <div className="">
                <Image
                  src="/resume.png"
                  width={150}
                  height={100}
                  className="object-fit"
                  alt="resume logo"
                /> </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold  text-center sm:px-0">Create perfect resumes for the modern job market</div>
              <div className="sm:text-xl text-sm font-thin text-black">Creating a resume has never been this easy! In three simple steps, create the perfect document to impress hiring managers and employers. Minimum time, maximum professional quality.</div>
              <div onClick={() => {
                router.push('/resume-templates')
              }} className="mt-5 sm:p-5 p-2 bg-cyan-600 hover:bg-cyan-500 hover:shadow-xl text-white rounded hover:cursor-pointer">
                Create My Resume
              </div>
            </div>

            <div className="bg-white mt-10">
              <StepsComponent />
            </div>
          </div>

          {/* <div className="relative">
          <div>
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper
              }}
              loop={true}
              keyboard={true}
              modules={[EffectCoverflow, Navigation, Pagination, Scrollbar, A11y]}
              effect={'coverflow'}
              spaceBetween={5}
              slidesPerView={3}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}

              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              style={{ height: 500 }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
            >
              <SwiperSlide className="cursor-pointer " onClick={() => { alert('slide 1') }}>
                <TemplateOne />
              </SwiperSlide>
              <SwiperSlide>
                <TemplateTwo />
              </SwiperSlide>
              <SwiperSlide>
                <TemplateThree />
              </SwiperSlide>
              <SwiperSlide>
                <TemplateFour />
              </SwiperSlide>

            </Swiper>
            <div className="absolute top-[50%] z-10 text-center flex w-full justify-center place-items-center gap-96 ">
              <button className="p-5 bg-cyan-500 text-white rounded-full shadow-lg" onClick={() => swiperRef.current.slidePrev()}><FaChevronLeft /></button>
              <button className="p-5 bg-cyan-500 text-white rounded-full shadow-lg" onClick={() => swiperRef.current.slideNext()}><FaChevronRight /></button>

            </div>

            <div>
              {/* <button ref={navigationNextRef}>Next</button>
            <button ref={navigationPrevRef}>Prev</button> 
            </div>
          </div>
        </div> */}
        </div>






      </main>
      {/* // <footer>
      //   <Footer />
      // </footer> */}
    </>
  )
}
