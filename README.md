# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).





What's left for me to do.
switch on and off collateral.

Add some tooltip to explain what some features do.

Clean the code up
Write a README.md
Write an article.




import { FaChevronRight } from "react-icons/fa";
import YourBorrows from "../components/YourBorrows";
import useWallet from "../hooks/useWallet";
import MultiStepProgressBar from "../components/MultiStepProgressBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { signerAddress } = useWallet();

  console.log("Signer address: ", signerAddress);

  return (
    <>
      <section className="relative h-screen">
        {/* Background Picture */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url("./background2.jpg")',
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black to-black opacity-70"></div>

        {/* Text (Above Gradient) */}
        <div className="w-full px-4 flex flex-col items-center justify-center md:grid md:grid-cols-12  absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <div className="flex flex-col md:mt-0 space-y-4 items-start px-4 ssm:px-8 justify-center md:col-span-6">
            <div className="text-gray-300 text-xl ss:text-2xl ssm:text-4xl xl:text-5xl  font-medium">
              <p>Decentralized</p>
              <p>
                <span className="text-orange-700">Lending</span> And{" "}
                <span className="text-orange-700">Borrowing</span>
              </p>
            </div>
            <p className="text-gray-300 text-sm ssm:text-lg lg:text-xl leading-relaxed">
              The core purpose of this project is to showcase my adept
              undestanding of lending and borrowing strategies in the context of
              blockchain technology.
            </p>

            <Link
              to="/dashboard"
              className="flex items-center space-x-2 ssm:space-x-4 border border-orange-800 border-2 rounded-full hover:border-orange-900 py-3 px-4 ssm:px-8 text-sm ssm:text-base text-white "
            >
              <p>Go to Dashboard</p>
              <FaChevronRight className="text-white w-5 h-5 bg-orange-800 rounded-full p-1" />
            </Link>
          </div>
          <div className="md:col-span-6 hidden md:block">
            <img
              src="./animation.svg"
              width={10}
              height={10}
              className="object-contain w-10/12"
            />
          </div>
        </div>
      </section>
      <section className="bg-black h-full w-full flex flex-col  text-white py-8  items-center justify-center">
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
      <section className="bg-black h-full w-full text-white py-8  items-center justify-center">
        <h1 className="text-center text-4xl sm:text-5xl text-gray-400">
          How It Works
        </h1>
        <MultiStepProgressBar />
      </section>
      <Footer />
    </>
  );
}










      