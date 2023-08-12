import { FaChevronRight } from "react-icons/fa";
import YourBorrows from "../components/YourBorrows";
import useWallet from "../hooks/useWallet";

export default function HomePage() {
  const { signerAddress } = useWallet();

  console.log("Signer address: ", signerAddress);

  return (
    <>
      <div className="relative h-screen w-screen">
        {/* Background Picture */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url("./background2.jpg")',
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black to-black opacity-30"></div>

        {/* Text (Above Gradient) */}
        <div className="w-full py-4 px-4 flex flex-col items-center justify-center md:grid md:grid-cols-12  absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <div className="flex flex-col mt-12 md:mt-0 space-y-4 items-start px-4 ssm:px-8 justify-center md:col-span-6">
            <div className="text-gray-300 text-xl ss:text-2xl ssm:text-4xl xl:text-5xl  font-medium">
              <p>Decentralized</p>
              <p>
                <span className="text-orange-700">Lending</span> And{" "}
                <span className="text-orange-700">Borrowing</span>
              </p>
            </div>
            <p className="text-gray-300 text-sm ssm:text-lg lg:text-xl leading-relaxed">
              The aim of this project is to showcase how well I understand the
              lending and borrowing techniques in the blockchain ecosystem
            </p>

            <button className="flex items-center space-x-2 ssm:space-x-4 border border-orange-800 border-2  py-3 px-4 ssm:px-8 text-sm ssm:text-base text-white ">
              <p>Go to Dashboard</p>
              <FaChevronRight className="text-white w-5 h-5 bg-orange-800 rounded-full p-1" />
            </button>
          </div>
          <div className="md:col-span-6 hidden md:block">
            <img
              src="./animation.svg"
              width={10}
              height={10}
              className="object-cover w-10/12"
            />
          </div>
        </div>
      </div>
      <div className="bg-black h-full w-full text-white py-2">
          <p>This is another section</p>
      </div>
    </>
  );
}
