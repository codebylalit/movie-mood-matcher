import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Footer from "../components/Footer";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/manbeezw";

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-xl mx-auto px-4 py-16 font-sans flex flex-col items-center justify-center">
      <h1 className="text-3xl font-extrabold text-darkslate mb-6 font-sans text-center">
        Contact Us
      </h1>
      <p className="mb-8 text-darkslate/80 text-center">
        Have a question, suggestion, or just want to say hi? Fill out the form
        below and we'll get back to you soon!
      </p>
      {submitted ? (
        <div className="bg-mustard/20 border border-mustard text-darkslate rounded-lg p-6 text-center font-semibold">
          Thank you for reaching out! We'll be in touch soon.
        </div>
      ) : (
        <form
          className="space-y-6 bg-white/80 rounded-xl shadow p-6 border border-darkslate/10 w-full flex flex-col items-center"
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
              className="block font-semibold mb-1 text-darkslate"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full rounded-lg border-2 border-darkslate/20 px-3 py-2 focus:outline-none focus:border-mustard bg-vanilla text-darkslate placeholder:text-darkslate/40 shadow"
              placeholder="Your name"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="block font-semibold mb-1 text-darkslate"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-lg border-2 border-darkslate/20 px-3 py-2 focus:outline-none focus:border-mustard bg-vanilla text-darkslate placeholder:text-darkslate/40 shadow"
              placeholder="you@email.com"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="message"
              className="block font-semibold mb-1 text-darkslate"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full rounded-lg border-2 border-darkslate/20 px-3 py-2 focus:outline-none focus:border-mustard bg-vanilla text-darkslate placeholder:text-darkslate/40 shadow"
              placeholder="How can we help you?"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-2 px-6 py-2 rounded-full font-bold text-lg shadow hover:scale-105 disabled:opacity-60 mx-auto"
            disabled={loading}
          >
            <PaperAirplaneIcon className="w-5 h-5" />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
