import React from "react";
import { logo } from "../assets";
const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="w-full justify-between items-center flex mb-10 pt-3">
        <img src={logo} alt="logo" className="w-28" />
        <button
          type="button"
          onClick={() => {
            window.open("https://github.com/SalmanNawaz921");
          }}
          className="black_btn"
        >
          Github
        </button>
      </nav>
      <h1 className="head_text">
        Text to Speech with <br className="max-md:hidden" />
        <span className="orange_gradient"> OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Generate audio from text using the latest GPT-4 model from OpenAI with a
        simple interface.
      </h2>
    </header>
  );
};

export default Hero;
