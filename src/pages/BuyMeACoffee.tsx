import React, { useEffect } from "react";
import Footer from "../components/Footer";

const BuyMeACoffee: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute("data-name", "BMC-Widget");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.onload = () => {
      // Optionally, you can do something after the script loads
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto py-16 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-darkslate mb-4">
        Buy Me a Coffee ☕
      </h1>
      <p className="text-lg text-darkslate/80 mb-8 text-center">
        If you enjoy using{" "}
        <span className="font-semibold text-mustard">Shortify</span> and want to
        support our work, consider buying us a coffee! Your support helps us
        keep improving and building new features.
      </p>
      <div
        className="bmc-widget"
        data-name="BMC-Widget"
        data-cfasync="false"
        data-id="lalitnamdev" // <-- Replace with your Buy Me a Coffee username
        data-description="Support me on Buy me a coffee!"
        data-message="Thank you for your support!"
        data-color="#FFDD00"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
      ></div>
    </div>
  );
};

export default BuyMeACoffee;
