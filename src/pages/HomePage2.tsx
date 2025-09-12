import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Provide Collateral",
    description:
      "Supply supported tokens as collateral to unlock borrowing privileges. The higher your collateral's value, the higher your borrowing capacity.",
    icon: "💎",
  },
  {
    title: "Borrow from the Pool",
    description:
      "Access funds based on your collateral value. Your collateral acts as a key: the more valuable it is, the more you can borrow. Interest applies on repayment.",
    icon: "💰",
  },
  {
    title: "Repay Your Loan",
    description:
      "Easily repay your borrowed funds including interest using the intuitive 'Repay' button. Settle your loan and stay in control of your assets.",
    icon: "🔄",
  },
  {
    title: "Withdraw Collateral",
    description:
      "Once your loans are repaid, retrieve your collateral safely. Your journey is complete and your assets are back in your hands.",
    icon: "🏦",
  },
];

const MultiStepProgressBar = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="w-full flex flex-col items-center py-12 px-4 sm:px-8 relative">
      <div className="absolute inset-0 -z-10">
        <div className="bg-gradient-to-tr from-[#0D1321] via-[#0D1321] to-red-950 w-full h-full"></div>
        <div className="absolute w-full h-full top-0 left-0">
          {/* Optional floating shapes */}
          <div className="absolute w-24 h-24 rounded-full bg-red-800 opacity-20 animate-pulse top-10 left-20"></div>
          <div className="absolute w-16 h-16 rounded-full bg-red-600 opacity-30 animate-bounce top-48 right-16"></div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full max-w-5xl mb-16">
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-1 bg-gray-700 rounded-lg"></div>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-red-800 rounded-lg transition-all duration-700"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>

        <div className="flex justify-between relative z-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className="flex flex-col items-center cursor-pointer transform transition-transform duration-500 hover:scale-110"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-bold shadow-xl text-2xl transition-colors duration-500 ${
                  idx <= currentStep
                    ? "bg-red-800 text-white"
                    : "bg-gray-600 text-gray-300"
                }`}
              >
                {step.icon}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-gray-300 text-center">
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-3xl bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl text-center transition-all duration-700">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 animate__animated animate__fadeInDown">
          {steps[currentStep].title}
        </h2>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed animate__animated animate__fadeIn">
          {steps[currentStep].description}
        </p>
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-all duration-300"
          >
            Prev
          </button>
          <button
            onClick={() =>
              setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
            }
            className="bg-red-800 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-all duration-300 flex items-center space-x-2"
          >
            <span>Next</span>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage2 = () => {
  return (
    <section className="bg-gray-900 w-full min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-screen bg-gray-900 overflow-hidden flex items-center px-8 md:px-16">
        {/* Floating particles */}
        <motion.div
          className="absolute w-72 h-72 rounded-full bg-red-600 opacity-10 top-10 left-20"
          animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-purple-600 opacity-20 bottom-20 right-10"
          animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Glass overlay behind text */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-0"></div>

        {/* Content */}
        <div className="relative z-10 grid md:grid-cols-12 items-center w-full">
          <div className="md:col-span-6 flex flex-col space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl sm:text-6xl font-extrabold text-gray-300 leading-tight"
            >
              Decentralized{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                Lending
              </span>{" "}
              &{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                Borrowing
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-gray-400 text-lg sm:text-xl leading-relaxed"
            >
              Experience peer-to-peer finance on blockchain with no
              intermediaries. Full control, seamless, and secure.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              href="/dashboard"
              className="inline-flex items-center bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-bold w-max shadow-lg transition-all duration-500"
            >
              Go to Dashboard <FaChevronRight className="ml-2" />
            </motion.a>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="md:col-span-6 flex justify-center mt-10 md:mt-0"
          >
            <img
              src="./animation.png"
              className="w-full md:w-10/12 rounded-xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 flex flex-col items-center px-8 md:px-16"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-400 mb-8">
          About the App
        </h2>
        <p className="text-gray-300 text-center max-w-4xl text-base sm:text-lg leading-relaxed bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl animate__animated animate__fadeIn">
          The platform is fully decentralized, enabling users to lend and borrow
          digital assets without intermediaries. Inspired by DeFi strategies but
          fully independent in implementation.
        </p>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-400 text-center mb-12">
          How It Works
        </h2>
        <MultiStepProgressBar />
      </section>

      {/* Footer */}
      <Footer />
      {/* <footer className="bg-gray-900 py-12 text-gray-400 text-center space-y-4">
        <p>&copy; {new Date().getFullYear()} DeFi Hub. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#about" className="hover:text-red-800 transition-colors duration-300">About</a>
          <a href="#how" className="hover:text-red-800 transition-colors duration-300">How It Works</a>
          <a href="/dashboard" className="hover:text-red-800 transition-colors duration-300">Dashboard</a>
        </div>
      </footer> */}
    </section>
  );
};

export default HomePage2;
