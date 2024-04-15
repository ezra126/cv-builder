"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { useModalStore } from "@/app/store/ModalStore"
import axios from "axios"
import { useRouter } from "next/navigation";
import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { IoMdClose } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-hot-toast";



type Inputs = {
    email: string
    password: string
}

const LoginModal = () => {
    const isModalOpen = useModalStore((state) => state.isLoginModalOpen)
    const setLoginModal = useModalStore((state) => state.setLoginModal)
    const setSignUpModal = useModalStore((state) => state.setSignUpModal);
    const router = useRouter();
    const [showContent, setShowContent] = useState(false);

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

    },);



    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {

            if (callback?.ok) {

                toast.success('Logged in');
                router.refresh();
                setLoginModal()
            }

            if (callback?.error) {
                toast.error("login failed");
                console.log("err log ed")
            }
            // // registerModal.onClose();
            // loginModal.onOpen();
        })
            .catch((error) => {

                //   toast.error(error.response.data.message);
            })
        // .finally(() => {
        //     setIsLoading(false);
        // })

    }


    return (
        <>
            {isModalOpen ?
                <div className='absolute z-50 inset-0 bg-neutral-800/70 overflow-x-hidden 
                     overflow-y-auto  justify-center items-center flex'>
                    <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 h-full  lg:h-auto md:h-auto  ">
                        <div className={` translate  duration-300  h-full
                         ${showContent ? 'translate-y-0' : 'translate-y-full'}
                         ${showContent ? 'opacity-100' : 'opacity-0'} `}>
                            <div className="translate bg-white py-10 px-10 flex flex-col gap-3  h-full
                            " >
                                <div className='flex justify-end' onClick={
                                    () => {
                                        setShowContent(false)
                                        setLoginModal()
                                    }
                                }><IoMdClose /></div>
                                <div className='text-2xl font-semibold self-center'>Sign in to your account</div>
                                <form className='translate flex flex-col w-full gap-3' onSubmit={handleSubmit(onSubmit)}>
                                    <div className='flex flex-col gap-2'>
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
                                            <Link href="/" className='text-cyan-500 text-sm'>Forgopassword?</Link>
                                        </div>
                                    </div>
                                    <button type='submit' className=' bg-cyan-500 text-white py-2 rounded-lg hover:shadow-xl'>Sign in</button>

                                </form>
                                <div className='flex flex-col w-full gap-5'>
                                    <div className='  w-2/3 mx-auto'>
                                        <div className='relative border'>
                                            <span className='absolute bg-white px-2 -top-3 left-[45%] '>or</span>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 w-full '>
                                        <button onClick={() => {

                                        }} className='  text-white py-2 rounded-lg hover:shadow-xl w-full bg-red-500'>
                                            <div className='flex gap-2 items-center justify-center '>
                                                <FaGoogle />
                                                Google
                                            </div>
                                        </button>
                                        <button onClick={() =>
                                            signIn('github')

                                        } className=' bg-cyan-500 text-white py-2 rounded-lg hover:shadow-xl w-full '>
                                            <div className='flex gap-2 items-center justify-center  '>
                                                <FaGithub />
                                                Github
                                            </div>
                                        </button>
                                    </div>
                                    <div className='text-center font-light text-neutral-500'>don't have any account  <span
                                        onClick={() => {
                                            setLoginModal();
                                            setTimeout(() => {
                                                setSignUpModal();
                                            }, 100)

                                        }}
                                        className=" text-neutral-800 cursor-pointer hover:underline "> sign up</span></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                : <></>}
        </>

    )
}

export default LoginModal