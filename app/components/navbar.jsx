"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FaChevronDown } from "react-icons/fa";
import { useModalStore } from "@/app/store/ModalStore";
import { useEffect, useState } from "react";
import { getDictionary } from "@/app/libs/dictionary";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/app/store/UserStore";
import { useResumeStore } from "@/app/store/resumeStore";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = ({ user }) => {
  const setLoginModal = useModalStore((state) => state.setLoginModal);
  const setSignUpModal = useModalStore((state) => state.setSignUpModal);
  const { data: session, update } = useSession();
  const [displaySignOut, setDisplaySignout] = useState(false);
  // const { navigation } = await getDictionary(lang);
  const router = useRouter();
  const updateFirstName = useUserStore((state) => state.updateFirstName);
  const updateLastName = useUserStore((state) => state.updateLastName);
  const updateEmail = useUserStore((state) => state.updateEmail);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative bg-white h-16 shadow-md w-full">
      <div className="flex flex-row px-10 items-center h-16 justify-between ">
        <div id="nav-logo" className="w-1/2 ">
          <Image
            src="/logo.png"
            width={150}
            height={100}
            className="object-fit"
            alt="resume logo"
          />
        </div>
        <div className="flex-row gap-7 items-center hidden md:inline-flex ">
          <Link href="/">
            <div className="flex flex-row gap-1 items-center">
              HOME
              {/* <FaChevronDown
                style={{ color: "gray", fontSize: "0.9em" }}
              />{" "} */}
            </div>
          </Link>
          {/* <Link href="/resume-builder">
            <div className="flex flex-row gap-1 items-center">
              Cover Letter{" "}
              <FaChevronDown style={{ color: "gray", fontSize: "0.9em" }} />{" "}
            </div>
          </Link> */}
          {/* <Link href="/">Blog</Link> */}
          <Link href="/faq">FAQ</Link>
          <span className="border-2"></span>

          {user ? (
            <div onClick={() => setDisplaySignout(!displaySignOut)}>
              <Image
                src={session?.user?.image}
                className="rounded-full"
                height="40"
                width="40"
                alt="Picture of the author"
              />
            </div>
          ) : (
            <div className="flex flex-row items-center gap-2">
              <div onClick={setLoginModal} className="cursor-pointer">
                Log in
              </div>
              <div
                onClick={setSignUpModal}
                className="cursor-pointer bg-cyan-300 text-white rounded hover:shadow-md py-2  px-2"
              >
                Sign up
              </div>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <div onClick={() => setShowMenu(!showMenu)}>
            <GiHamburgerMenu />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="absolute top-16 right-0 bg-white shadow-md">
          {!user ? (
            <>
              {" "}
              <div
                onClick={() => {
                  router.push("/");
                }}
                className="flex flex-col px-3 cursor-pointer"
              >
                <div>Home</div>
              </div>
              <div
                onClick={() => {
                  router.push("/faq");
                }}
                className="flex flex-col px-3 cursor-pointer"
              >
                <div>FAQ</div>
              </div>
              {/* <div
                onClick={() => {
                  router.push("/account");
                }}
                className="flex flex-col px-3 cursor-pointer"
              >
                <div>Account</div>
              </div>
              <div
                onClick={() => {
                  signOut();
                  useResumeStore.persist.clearStorage();
                }}
                className="flex flex-col px-3 py-1 cursor-pointer"
              >
                <div>Sign out</div>
              </div> */}
              <div
                onClick={setLoginModal}
                className="flex flex-col px-3 cursor-pointe"
              >
                Log in
              </div>
              <div
                onClick={setSignUpModal}
                className="flex flex-col px-3 cursor-pointe"
              >
                Sign up
              </div>
            </>
          ) : (
            <>
              {" "}
              <div
                onClick={() => {
                  router.push("/");
                }}
                className="flex flex-col px-3 cursor-pointer"
              >
                <div>Home</div>
              </div>
              <div
                onClick={() => {
                  router.push("/faq");
                }}
                className="flex flex-col px-3 cursor-pointer"
              >
                <div>FAQ</div>
              </div>
              <div
                onClick={() => {
                  router.push("/account");
                }}
                className="flex flex-col px-3 cursor-pointer"
              >
                <div>Account</div>
              </div>
              <div
                onClick={() => {
                  signOut();
                  useResumeStore.persist.clearStorage();
                }}
                className="flex flex-col px-3 py-1 cursor-pointer"
              >
                <div>Sign out</div>
              </div>
            </>
          )}
        </div>
      )}

      {user && displaySignOut && (
        <div className="absolute top-16 right-0 bg-white shadow-md">
          <div
            onClick={() => {
              router.push("/account");
            }}
            className="flex flex-col px-3 cursor-pointer"
          >
            <div>Account</div>
          </div>
          <div
            onClick={() => {
              signOut();
              useResumeStore.persist.clearStorage();
            }}
            className="flex flex-col px-3 py-1 cursor-pointer"
          >
            <div>Sign out</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
