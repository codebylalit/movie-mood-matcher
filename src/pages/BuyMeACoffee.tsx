import React, { useEffect } from "react";
import Footer from "../components/Footer";

const BuyMeACoffee: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute("data-name", "BMC-Widget");
    script.setAttribute("data-id", "HeyLalit");
    script.setAttribute("data-description", "Support me on Buy me a coffee!");
    script.setAttribute(
      "data-message",
      "Your support means a latte! I'd really appreciate it if you could Buy Me A Coffee :)"
    );
    script.setAttribute("data-color", "#FFDD00");
    script.setAttribute("data-position", "right");
    script.setAttribute("data-x_margin", "20");
    script.setAttribute("data-y_margin", "20");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.getElementById("bmc-widget-container")?.appendChild(script);
    // Clean up
    return () => {
      document.getElementById("bmc-widget-container")?.removeChild(script);
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
      <div id="bmc-widget-container"></div>
    </div>
  );
};

export default BuyMeACoffee;
