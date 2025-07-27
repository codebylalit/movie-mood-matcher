import React from "react";
import Footer from "../components/Footer";

const BuyMeACoffee: React.FC = () => {
  return (
    <div className="relative max-w-xl mx-auto py-14 sm:py-12 md:py-12 lg:py-20 px-4 sm:px-6 md:px-8 flex flex-col items-center">
      {/* Arrow PNG image */}
      {/* Coffee Widget Doodles - positioned around the bottom right corner where the widget appears */}
      <div className="fixed bottom-8 sm:bottom-8 md:bottom-12 lg:bottom-20 right-2 sm:right-4 md:right-6 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 pointer-events-none z-10">
        {/* Hand-drawn doodle 1 */}
        {/* <div className="absolute top-2 -left-4 w-10 h-10">
          <svg
            viewBox="0 0 246 345"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="w-28 h-28 text-mustard opacity-80"
          >
            <path
              d="M231.654 338.871C226.62 328.369 215.525 326.434 199.105 326.459M231.654 338.871C225.998 327.972 228.442 313.96 239.986 304.673M231.654 338.871C230.13 339.104 224.107 318.996 210.59 297.968M199.326 279.195L187.311 259.67M176.046 242.774L165.908 227.004M155.62 210.859L143.605 192.461M133.535 178.327L121.895 160.68M112.283 146.111L100.268 129.214M89.0786 113.445L78.1898 97.2995M68.4273 83.4069L56.0365 67.6368M44.4719 53.3697C41.9687 49.615 35.9861 41.0541 32.0812 36.8487M22.3189 24.457L5.79785 6.05859"
              stroke="currentColor"
              strokeWidth="11.3869"
              strokeMiterlimit="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="currentColor"
            ></path>
          </svg>
        </div>{" "}
        <div className="absolute top-1  -left-16 w-10 h-10">
          <svg
            viewBox="0 0 246 345"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="w-28 h-28 text-mustard opacity-80"
          >
            <path
              d="M231.654 338.871C226.62 328.369 215.525 326.434 199.105 326.459M231.654 338.871C225.998 327.972 228.442 313.96 239.986 304.673M231.654 338.871C230.13 339.104 224.107 318.996 210.59 297.968M199.326 279.195L187.311 259.67M176.046 242.774L165.908 227.004M155.62 210.859L143.605 192.461M133.535 178.327L121.895 160.68M112.283 146.111L100.268 129.214M89.0786 113.445L78.1898 97.2995M68.4273 83.4069L56.0365 67.6368M44.4719 53.3697C41.9687 49.615 35.9861 41.0541 32.0812 36.8487M22.3189 24.457L5.79785 6.05859"
              stroke="currentColor"
              strokeWidth="11.3869"
              strokeMiterlimit="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="currentColor"
            ></path>
          </svg>
        </div> */}
        {/* <div className="absolute top-2 right-10 right-28 w-48 h-48 rotate-[120deg] transform translate-x-6 -translate-y-4">
          <img
            src="3 arrow.svg"
            alt="Decorative arrow"
            className="w-48 h-48 opacity-80"
          />
        </div>{" "} */}
        <div className="absolute -top-24 sm:-top-10 right-20 sm:right-16 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rotate-[90deg] transform translate-x-2 sm:translate-x-4 md:translate-x-6 -translate-y-2 sm:-translate-y-4">
          <img
            src="arrows1.svg"
            alt="Decorative arrow"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 opacity-80 text-mustard"
          />
        </div>{" "}
        {/* <div className="absolute top-2 right-10 right-28 w-48 h-48 rotate-[120deg] transform translate-x-6 -translate-y-4">
          <img
            src="arrow2.svg"
            alt="Decorative arrow"
            className="w-48 h-48 opacity-80"
          />
        </div> */}
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-darkslate mb-4 relative text-center">
        Love Shortify? ☕
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-darkslate/80 mb-2 text-center px-4">
        If Shortify has made your life a little easier, why not show some love?
        💛 Buy us a coffee and help fuel more awesome features and updates!
      </p>
      <div className="relative flex justify-center items-center">
        <img
          src="Tea.svg"
          alt="Decorative tea cup"
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 opacity-80 text-mustard"
        />
      </div>
      {/* <div className="absolute top-64 right-4 right-28 w-48 h-48">
        <img
          src="smiley.svg"
          alt="Decorative arrow"
          className="w-48 h-48 opacity-80 text-mustard "
        />
      </div>{" "} */}
    </div>
  );
};

export default BuyMeACoffee;
