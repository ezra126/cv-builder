"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios"
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FaBullseye } from "react-icons/fa";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from '@/firebase';


type Inputs = {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  date_of_birth: string
  nationality: string
}

const AccountPage = () => {
  const { data: session, update } = useSession()
  const [first_name, setFirstName] = useState();
  const [id, setId] = useState();
  const [file, setFile] = useState<File | null>(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [editProfile, setEditProfile] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {
    async function fetchSession() {
      // const fetchedUser = await getSession();
      // setFirstName(fetchedUser?.user?.first_name)
      //  setId(fetchedUser?.user?.id);
    }

    fetchSession();
  })

  useEffect(() => {

    if (file) {
      handleFileUpload(file);
    }
  }, [file]);


  const handleFileUpload = (file: File) => {
    const storage = getStorage(app);
    const fileName = file.name;
    const storageRef = ref(storage, `/files/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        alert("error")
        console.log("error" + error)
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //    setFormData({ ...formData, avatar: downloadURL })
          alert("sertua")
          axios.put('/api/uploadImage', { downloadURL, id: session?.user?.id })
            .then(() => {
              update({ image: downloadURL })


              toast.success('Upload sucess!');

              // setTimeout(() => {
              //   setEditProfile(false);
              // }, 200)

            })
            .catch((error) => {
              // console.log(error.code)
              toast.error(error.response.data.message);
            })
        }
        );
      }
    );
  };



  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios.post('/api/updateProfile', { ...data, id: session?.user?.id })
      .then(() => {
        update({ ...data, image: session?.user?.image })


        toast.success('Registered!');

        setTimeout(() => {
          setEditProfile(false);
        }, 200)

      })
      .catch((error) => {
        // console.log(error.code)
        // toast.error(error.response.data.message);
      })
  }


  return (

    <div className="py-20">
      <div className="flex flex-col gap-5 px-10 sm:px-0">
        <div className="sm:w-2/3 w-full    flex flex-col shadow-md sm:mx-auto gap-2 px-5 py-5">
          <div className="flex flex-row justify-between">
            <div className="text-2xl font-bold">My Profile</div>
            {!editProfile && (
              <button
                onClick={() => {
                  setEditProfile(true);
                }}
                className="p-2 bg-cyan-600 shadow-sm hover:shadow-xl text-white rounded-md"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {editProfile ? (
          <div className="sm:w-2/3 w-full flex flex-col shadow-md mx-auto gap-2 px-5 py-5">
            <form className="flex flex-col gap-2 pt-5" onSubmit={handleSubmit(onSubmit)}>
              <Image
                width={60}
                height={60}
                onClick={() => avatarRef?.current?.click()}
                src={session?.user?.image || "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"}
                alt="Picture of the author"
                className="rounded-full "
                style={{ objectFit: "contain" }}
              />

              <input type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                setFile(e.target?.files[0])
                // e.target.files instanceof FileList
                //   ? setFile(e.target.files[0]) : 'handle exception'

              }} accept="image/png,image/jpeg,image/jpg" ref={avatarRef} hidden />

              <div className="flex flex-row gap-5">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    {...register("first_name", { required: true })}
                    type="text"
                    defaultValue={session?.user?.first_name || " "}
                    id="first_name"
                    className="border leading-7 rounded-md focus:outline-none py-1 px-2"
                  />
                  {errors.first_name && <span>This field is required</span>}
                </div>

                <div className="flex flex-col w-1/2">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    defaultValue={session?.user?.last_name || " "}
                    {...register("last_name", { required: true })}
                    type="text"
                    id="last_name"
                    className="border leading-7 rounded-md focus:outline-none py-1 px-2"
                  />
                  {errors.last_name && <span>This field is required</span>}
                </div>

              </div>

              <div className="flex sm:flex-row gap-5">
                <div className="flex flex-col gap-2  w-1/2">
                  <label htmlFor="email">Email</label>
                  <input
                    {...register("email", { required: true })}
                    defaultValue={session?.user?.email || " "}
                    type="email"
                    id="email"
                    className="border leading-7 rounded-md focus:outline-none py-1 px-2"
                  />
                  {errors.email && <span>This field is required</span>}
                </div>

                <div className="flex flex-col gap-2  w-1/2">
                  <label htmlFor="phone_number">Phone Number</label>
                  <input
                    {...register("phone_number", { required: true })}
                    defaultValue={session?.user?.phone_number || " "}
                    type="text"
                    id="phone_number"
                    className="border leading-7 rounded-md focus:outline-none py-1 px-2"
                  />
                </div>
                {errors.phone_number && <span>This field is required</span>}
              </div>


              <div className="flex flex-col gap-2">
                <label htmlFor="date_of_birth">Date Of Birth</label>
                <input
                  {...register("date_of_birth")}
                  defaultValue={session?.user?.date_of_birth || " "}
                  type="text"
                  id="date_of_birth"
                  className="border leading-7 rounded-md focus:outline-none py-1 px-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="nationality">Nationality</label>
                <input
                  {...register("nationality")}
                  defaultValue={session?.user?.nationality || " "}
                  type="text"
                  id="nationality"
                  className="border leading-7 rounded-md focus:outline-none py-1 px-2"
                />
              </div>

              <div className="text-end pt-4 ">
                <button type="submit"
                  onClick={() => {
                    //setEditProfile(false);
                  }}
                  className="px-3 py-2 bg-cyan-600 shadow-sm hover:shadow-xl text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="sm:w-2/3 w-full flex flex-col shadow-md mx-auto gap-2 px-5 py-5">
            <div className=""> First Name: {session?.user?.first_name || " "} </div>
            <div className=""> Last Name:  {session?.user?.last_name || " "} </div>
            <div className=""> Email:  {session?.user?.email || ""} </div>
            <div className=""> Phone Number: {session?.user?.phone_number || " "}</div>
            <div className=""> Date of Birth: jan 3/2000 </div>
            <div className=""> Nationality:  {session?.user?.nationality || " "} </div>
          </div>
        )}

        {/* <div className="w-2/3 flex flex-col shadow-md mx-auto gap-2 px-5 py-5">
      

          <form className="flex flex-col gap-2 pt-5">
            <Image
              width={60}
              height={60}
              src="https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
              alt="Picture of the author"
              className="rounded-full "
              style={{ objectFit: "contain" }}
            />

            <div className="flex flex-row gap-5">
              <div className="flex flex-col w-1/2">
                <label htmlFor="email">First Name</label>
                <input
                  // {...register("email", { required: true })}
                  type="text"
                  id="first_name"
                  className="border leading-7 rounded-md focus:outline-none py-1 px-2"
                />
              </div>

              <div className="flex flex-col w-1/2">
                <label htmlFor="email">Last Name</label>
                <input
                  // {...register("email", { required: true })}
                  type="text"
                  id="first_name"
                  className="border leading-7 rounded-md focus:outline-none py-1 px-2"
                />
              </div>
            </div>

            <div className="flex flex-row gap-5">
              <div className="flex flex-col gap-2  w-1/2">
                <label htmlFor="email">Email</label>
                <input
                  // {...register("email", { required: true })}
                  type="email"
                  id="email"
                  className="border leading-7 rounded-md focus:outline-none py-1 px-2"
                />
              </div>

              <div className="flex flex-col gap-2  w-1/2">
                <label htmlFor="email">Phone Number</label>
                <input
                  // {...register("email", { required: true })}
                  type="text"
                  id="phone_number"
                  className="border leading-7 rounded-md focus:outline-none py-1 px-2"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email">Date Of Birth</label>
              <input
                // {...register("email", { required: true })}
                type="text"
                id="date_of_birth"
                className="border leading-7 rounded-md focus:outline-none py-1 px-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email">Nationality</label>
              <input
                // {...register("email", { required: true })}
                type="text"
                id="nationality"
                className="border leading-7 rounded-md focus:outline-none py-1 px-2"
              />
            </div>

            <div className="text-end pt-4 ">
              <button className="px-3 py-2 bg-cyan-600 shadow-sm hover:shadow-xl text-white rounded-md">
                Save
              </button>
            </div>
          </form>
        </div> */}
      </div>
    </div>

  );
};

export default AccountPage;
