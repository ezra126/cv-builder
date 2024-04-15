"use client";

import Link from 'next/link'
import axios from "axios"
import React, { useState, useEffect } from 'react'
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { useModalStore } from "@/app/store/ModalStore"
import { IoMdClose } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

type Inputs = {
    first_name: string
    last_name: string
    email: string
    password: string
}

const SignUpModal = () => {
    const isModalOpen = useModalStore((state) => state.isSignUpModalOpen)
    const setSignUpModal = useModalStore((state) => state.setSignUpModal)
    const setLoginModal = useModalStore((state) => state.setLoginModal)
    const [showContent, setShowContent] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        axios.post('/api/register', data)
            .then(() => {

                toast.success('Registered!');
                setSignUpModal();
                setTimeout(() => {
                    setLoginModal();
                }, 200)
                // registerModal.onClose();
                // loginModal.onOpen();
            })
            .catch((error) => {
                console.log(error.code)
                toast.error(error.response.data.message);
            })
        // .finally(() => {
        //     setIsLoading(false);
        // })

    }



    useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => {
                setShowContent(true)
            }, 300)
        }
        else {

            // setTimeout(() => {

            // }, 300)
        }

    },)
    return (
        <>
            {isModalOpen ?
                <div className='absolute z-50 inset-0 bg-neutral-800/70 overflow-x-hidden
                 overflow-y-auto  justify-center items-center flex'>
                    <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 h-full  lg:h-auto md:h-auto'>
                        <div className={` translate  duration-300  h-full
                         ${showContent ? 'translate-y-0' : 'translate-y-full'}
                         ${showContent ? 'opacity-100' : 'opacity-0'} `}>
                            <div className="bg-white py-10 px-10 flex flex-col gap-3 ">
                                <div className='flex justify-end' onClick={
                                    () => {
                                        setShowContent(false)
                                        setSignUpModal()
                                    }
                                }><IoMdClose /></div>
                                <div className='text-2xl font-semibold self-center'>Sign Up to your account</div>

                                <form className=' flex flex-col w-[100%] gap-3' onSubmit={handleSubmit(onSubmit)}

                                >

                                    <div className='flex gap-2'>
                                        <div className='flex flex-col gap-2 '>
                                            <label htmlFor='first_name'>First Name</label>
                                            <input {...register("first_name", { required: true })} aria-invalid={errors.first_name ? "true" : "false"} type='text' id="first_name" className='border leading-7 focus:outline-none rounded-md py-1 px-2 w-full' />
                                            {errors.first_name?.type === "required" && (
                                                <p role="alert" className='text-red-500'>First name is required</p>
                                            )}
                                        </div>
                                        <div className='flex flex-col gap-2 w-fit'>
                                            <label htmlFor='last_name'>Last Name</label>
                                            <input {...register("last_name", { required: true })} type='text' id="last_name" className='border leading-7 focus:outline-none rounded-md py-1 px-2 w-full' />
                                            {errors.last_name?.type === "required" && (
                                                <p role="alert" className='text-red-500'>Last name is required*</p>
                                            )}
                                        </div>
                                        {/* <div className='flex flex-col gap-2 '>
                                        <label htmlFor='email'>Last Name</label>
                                        <input type='text' id='text' className='border leading-7 rounded-md focus:outline-none py-1 px-2' />
                                    </div> */}
                                    </div>

                                    <div className='flex flex-col gap-3 '>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='email'>Email address</label>
                                            <input {...register("email", { required: true })} type='email' id='email' className='border leading-7 rounded-md focus:outline-none py-1 px-2' />
                                            {errors.email?.type === "required" && (
                                                <p role="alert" className='text-red-500'>Email Address is required*</p>
                                            )}

                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='password'>Password</label>
                                            <input {...register("password", { required: true, minLength: 4 })} type='password' id='Password' className='border leading-7 focus:outline-none rounded-md py-1 px-2' />
                                            {errors.password?.type === "required" && (
                                                <p role="alert" className='text-red-500'>Password is required*</p>
                                            )}
                                            {errors.password?.type === "minLength" && (
                                                <p role="alert" className='text-red-500'>Password minimum length should be four*</p>
                                            )}
                                        </div>


                                    </div>




                                    <div className='flex justify-between '>
                                        <div className='flex gap-2 items-center'>
                                            <input type='checkbox'></input>
                                            <span className='text-sm'>Remember me</span>
                                        </div>
                                        <div>
                                            <Link href="/" className='text-cyan-500 text-sm'>Forgot password?</Link>
                                        </div>
                                    </div>
                                    <button type='submit' className=' bg-cyan-500 text-white py-2 rounded-lg hover:shadow-xl'>Sign up</button>
                                    <div className='flex flex-col w-full gap-5'>
                                        <div className='  w-2/3 mx-auto'>
                                            <div className='relative border'>
                                                <span className='absolute bg-white px-2 -top-3 left-[45%] '>or</span>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                                <div className='flex gap-2 w-full '>
                                    <button className=' bg-red-500 text-white py-2 rounded-lg hover:shadow-xl w-full '>
                                        <div className='flex gap-2 items-center justify-center '>
                                            <FaGoogle />
                                            Google
                                        </div>
                                    </button>
                                    <button onClick={() => signIn('github')} className=' bg-cyan-500 text-white py-2 rounded-lg hover:shadow-xl w-full '>
                                        <div className='flex gap-2 items-center justify-center  '>
                                            <FaGithub />
                                            Github
                                        </div>
                                    </button>
                                </div>
                                <div className='text-center font-light text-neutral-500'>already have any account  <span
                                    onClick={() => {
                                        setSignUpModal();
                                        setTimeout(() => {
                                            setLoginModal();
                                        }, 200)

                                    }}
                                    className=" text-neutral-800 cursor-pointer hover:underline "> sign in</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                : <></>
            }
        </>
    )
}

export default SignUpModal