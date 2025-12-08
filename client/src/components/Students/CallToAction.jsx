import React from "react";
import PropTypes from "prop-types";
import { assets } from "../../assets/assets";

const CallToAction = (props) => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">Learn anything, anytime, anywhere</h1>

      <p className="text-gray-500 sm:text-sm">
        Incididunt sint fugiat pariatur cupidatat consectetur cillum anim id
        veniam id <br/>veniam aliqua aliqua proident excepteur commodo.
      </p>

      <div className="flex items-center font-medium gap-6 mt-4">
        <button className="px-10 py-3 rounded round-md text-white bg-blue-600">Get Started</button>

        <button className="flex items-center gap-2">
          Learn More
          <img src={assets.arrow_icon} alt="arrow_icon" />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;

