import React, { useState } from 'react';
import userPic from '../assets/profilePic.svg';
import { useNavigate , Link } from 'react-router-dom';
import returnBackSvg from '../assets/goBack.svg';

function Profile() {
  const navigate = useNavigate();
  return (
    <div className="container px-4 w-full mx-auto bg-white max-h-screen h-full flex flex-col items-center relative pb-10">
      <div className="flex gap-3 items-center absolute top-[0%] left-6">
        {/* return Back svg */}
        <img src={returnBackSvg} className="object-cover" />
        <p onClick={() => navigate(-1)} className="font-bold text-black">
          Page précédente
        </p>
      </div>

      {/* user info */}
      <div className="mt-24 lg:mt-0 max-w-md w-full flex flex-col gap-6 items-center px-4 relative">
        {/* user Pic */}
        <div className="w-[11rem] h-[11rem] rounded-full">
          <img
            src={userPic}
            alt="userProfile_pic"
            className="w-[100%] object-cover"
          />
        </div>

        {/* user name */}
        <div className="text-black self-start w-full">
          <span className="text-lg font-semibold">Nom complet</span>
          <div
            className={`w-full h-[52px] flex items-center rounded-md border border-slate-500 mt-2`}
          >
            <p className="ml-4">merabet mohammed riad</p>
          </div>
        </div>

        {/* user email */}

        {/* user name */}
        <div className="text-black self-start w-full">
          <span className="text-lg font-semibold">Email</span>
          <div
            className={`w-full h-[52px] flex items-center rounded-md border border-slate-500 mt-2`}
          >
            <p className="ml-4">lm_merabit_riyad@esi.dz</p>
          </div>
        </div>

        {/* mot de passe */}
        <div className="text-black self-start w-full">
          <span className="text-lg font-semibold">Mot de passe</span>

          <div
            className={`w-full h-[52px] flex items-center rounded-md border border-slate-500 mt-2`}
          >
            <p className="ml-4">*************</p>
          </div>
        </div>

        <span></span>

        {/* edit Btn */}

        <Link
          to={'/editUserPassword'}
          className="bg-seconadryColor px-5 py-4 rounded-md outline-none text-lg text-black"
        >
          modifier
        </Link>
      </div>
    </div>
  );
}

export default Profile;
