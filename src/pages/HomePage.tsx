import { FaChevronRight } from "react-icons/fa";
import YourBorrows from "../components/YourBorrows";
import useWallet from "../hooks/useWallet";
import MultiStepProgressBar from "../components/MultiStepProgressBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "animate.css";

export default function HomePage() {
  const { signerAddress } = useWallet();

  console.log("Signer address: ", signerAddress);

  return (
    <>
      <section className="bg-gray-900">
        {/* <Header className="bg-gradient-to-r from-black via-black via-black to-black"/> */}
        <section className="w-full flex-1 md:h-screen">
          <div className="bg-gradient-to-tr from-[#0D1321] via-[#0D1321] to-red-950 pt-24 md:pt-16 w-full h-full px-4 flex flex-col items-center justify-center md:grid md:grid-cols-12 text-white">
            <div className="flex flex-col md:mt-0 items-start px-4 ssm:px-8 justify-center md:col-span-6 space-y-4">
              <div className="animate__animated animate__backInDown  text-gray-300 text-xl ss:text-2xl ssm:text-4xl xl:text-5xl font-medium ">
                <p>Decentralized</p>
                <p>
                  <span className="text-red-800">Lending</span> And{" "}
                  <span className="text-red-800">Borrowing</span>
                </p>
              </div>
              <p className="text-gray-300 text-sm ssm:text-lg lg:text-xl leading-relaxed">
                The core purpose of this project is to showcase my adept
                undestanding of lending and borrowing strategies in the context
                of blockchain technology.
                {/* A system that enables individuals to lend or borrow digital
                assets without intermediaries offering greater accessibility,
                efficiency, and security. */}
              </p>

              <Link
                to="/dashboard"
                className="flex items-center space-x-2 ssm:space-x-4 bg-red-800 rounded-full hover:border-orange-900 py-3 px-4 ssm:px-8 text-sm ssm:text-base text-white "
              >
                <p>Go to Dashboard</p>
                <FaChevronRight className="text-orange-800 w-5 h-5 bg-white rounded-full p-1" />
              </Link>
            </div>
            <div className="md:col-span-6 ">
              <img
                src="./animation.png"
                className="object-cover w-full w-12/12 md:w-10/12"
              />
            </div>
          </div>
        </section>
      </section>
      <section className="bg-gray-900 h-full w-full flex flex-col  text-white py-8  items-center justify-center">
        <h1 className="text-center text-4xl sm:text-5xl text-gray-400 pb-5">
          About the App
        </h1>
        <p className="w-9/12 sm:w-8/12 text-gray-400 text-sm sm:text-base text-center leading-relaxed">
          The application serves as a decentralized platform for lending and
          borrowing, creating an avenue where users can engage in lending
          activities while also facilitating the borrowing process. A
          distinctive feature of this platform is its decentralized nature,
          meaning that it operates without a central authority or intermediary.
          Instead, it relies on a network of participants who collectively
          contribute to its functioning.
          <p className="py-4">
            This project development process extensively delved into the DEFI
            platform, AAVE, as a critical source of insights and guidance.
            Notably, it's crucial to emphasize that the project code is entirely
            independent and doesn't encompass any code originating from AAVE.
          </p>
        </p>
      </section>
      <section className="bg-gray-900 h-full w-full text-white py-8  items-center justify-center">
        <h1 className="text-center text-4xl sm:text-5xl text-gray-400">
          How It Works
        </h1>
        <MultiStepProgressBar />
      </section>
      <Footer />
    </>
  );
}
