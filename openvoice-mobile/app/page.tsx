"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  return (
    <>
    <div className="flex justify-center items-center h-[65vh] text-center text-[26.5px]">
    <p className="texto-estilizado font-normal">Do not <b className="text-red-600">lost</b> the opportunity <br /> 
    to <b className="text-green-600">share your opinion</b> now.</p>
    </div>

    <div id="options" className="">
    <div className="flex items-center justify-center mb-[4%] button-padding">
    <button id="google-auth" className="auth-buttons"><h3>Continue with Google</h3></button>
    </div>

    <div className="justify-center items-center flex">
    <hr className="w-full ml-[12px] mr-[12px]"/>
    </div>

    <div className="flex items-center justify-center mb-[4%] mt-[4%] button-padding">
    <button id="cred-auth" className="auth-buttons" onClick={() => {router.push("/auth/step-one")}} ><h3>Create an account</h3></button>
    </div>
    </div>

    <div className="mb-[5px] relative bottom-[2rem]">
    <h6 id="terms" className="text-left pl-4 font-normal">By signing up, you agree to our <b className="mx-[2px] cursor-pointer hover:underline">Terms</b> and <b className="ml-[2px] cursor-pointer hover:underline">Privacy Policy</b>.</h6>
    <h6 id="terms" className="text-left pl-4 font-normal">Already have an account? <b className="mx-[2px] cursor-pointer hover:underline" onClick={() => {router.push("/auth/login")}}>Log in</b></h6>
    </div>

    </>
  );
}
