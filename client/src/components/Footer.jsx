import React from "react";
import docLibLogo from "../assets/WhiteLogo.svg";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="pb-16 flex  flex-col justify-center items-center xl:justify-between bg-primaryColor xl:flex-row mt-32">
      <div className="flex-initial">
        <div className="max-w-[260px] ">
          <img src={docLibLogo} alt="" />
        </div>
        <div className="md:mt-10 text-4xl ml-16 lg:ml-20 flex flex-row text-white  gap-5">
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className="flex justify-end flex-initial ml-32 mt-16  xl:mt-32  md:ml-0 mr-32">
        <div className="flex flex-col mr-16">
          <span className="FooterWord" >Articles</span>
          <span className="FooterWord">Help</span>
          <span className="FooterWord">Share</span>
          <span className="FooterWord">Carrers</span>
          <span className="FooterWord">Testimonials</span>
          <span className="FooterWord">Work</span>
        </div>
        <div className="flex flex-col mr-16">
          <span className="FooterWord">Delivery</span>
          <span className="FooterWord"> Contact & Support</span>
          <span className="FooterWord">For investors</span>
          <span className="FooterWord">For media</span>
        </div>
        <div  className="flex flex-col">
          <span className="FooterWord">Terms & Conditions</span>
          <span className="FooterWord">Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;