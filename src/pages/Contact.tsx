import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Footer from "../components/Footer";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/manbeezw";

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 font-sans flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-darkslate mb-4 sm:mb-6 font-sans text-center">
          Contact Us
        </h1>
        <p className="mb-6 sm:mb-8 text-darkslate/80 text-center text-sm sm:text-base px-2 sm:px-0 max-w-lg">
          Have a question, suggestion, or just want to say hi? Fill out the form
          below and we'll get back to you soon!
        </p>
        {submitted ? (
          <div className="bg-mustard/20 border border-mustard text-darkslate rounded-lg p-4 sm:p-6 text-center font-semibold w-full max-w-md mx-auto">
            <p className="text-sm sm:text-base">
              Thank you for reaching out! We'll be in touch soon.
            </p>
          </div>
        ) : (
          <form
            className="space-y-4 sm:space-y-6 bg-white/80 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 border border-darkslate/10 w-full max-w-lg mx-auto flex flex-col items-center"
            action={FORMSPREE_ENDPOINT}
            method="POST"
            target="_blank"
            onSubmit={() => {
              setLoading(true);
              setTimeout(() => setSubmitted(true), 1200);
            }}
          >
            <div className="w-full">
              <label
                htmlFor="name"
                className="block font-semibold mb-1 sm:mb-2 text-darkslate text-sm sm:text-base"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded-lg border-2 border-darkslate/20 px-3 py-2 sm:py-3 focus:outline-none focus:border-mustard bg-vanilla text-darkslate placeholder:text-darkslate/40 shadow text-sm sm:text-base"
                placeholder="Your name"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block font-semibold mb-1 sm:mb-2 text-darkslate text-sm sm:text-base"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-lg border-2 border-darkslate/20 px-3 py-2 sm:py-3 focus:outline-none focus:border-mustard bg-vanilla text-darkslate placeholder:text-darkslate/40 shadow text-sm sm:text-base"
                placeholder="you@email.com"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="message"
                className="block font-semibold mb-1 sm:mb-2 text-darkslate text-sm sm:text-base"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full rounded-lg border-2 border-darkslate/20 px-3 py-2 sm:py-3 focus:outline-none focus:border-mustard bg-vanilla text-darkslate placeholder:text-darkslate/40 shadow text-sm sm:text-base resize-none"
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg shadow hover:scale-105 disabled:opacity-60 mx-auto mt-2 sm:mt-4 w-full sm:w-auto"
              disabled={loading}
            >
              <PaperAirplaneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
