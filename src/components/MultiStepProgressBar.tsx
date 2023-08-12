import React, { useState } from "react";

const PageOne = () => {
  return (
    <div className="text-gray-400 w-full flex flex-col items-center py-4">
      <p className="text-3xl">Provide your collateral</p>
      <p className="w-5/12 text-center py-3 leading-relaxed">
        Before gaining access to borrowing on the platform, it's essential to
        provide collateral as part of the process. This collateral serves as a
        security measure and is a prerequisite for obtaining borrowing
        privileges. The extent of your borrowing capacity hinges upon the
        principle of the loan-to-value (LTV) ratio associated with the
        collateral you pledge. You can provide collateral by supplying any of
        the supported tokens.
      </p>
    </div>
  );
};
const PageTwo = () => {
  return (
    <div className="text-gray-400 w-full flex flex-col items-center py-4">
      <p className="text-3xl">Borrow from the pool</p>
      <p className="w-5/12 text-center py-3 leading-relaxed">
        Once you've supplied some supported tokens as collateral, you get the
        chance to borrow from this platform. The amount you can borrow is
        decided by how valuable your collateral is. The bigger your collateral's
        value, the more you can borrow. Think of your collateral like a key.
        It's the key that opens the door to borrowing. The more valuable the
        key, the bigger the door it can open. This means if your collateral is
        worth a lot, you can borrow a lot. Also note that you have to pay a
        certain amount as interest when it is time to pay back your loan.
      </p>
    </div>
  );
};
const PageThree = () => {
  return (
    <div className="text-gray-400 w-full flex flex-col items-center py-4">
      <p className="text-3xl">Return the funds you took out.</p>
      <p className="w-5/12 text-center py-3 leading-relaxed">
        When the time comes for you to return the amount you borrowed as a loan,
        you'll find a conveniently placed "repay" button awaiting your action.
        This button is designed to facilitate the repayment process, making it
        straightforward and user-friendly. By clicking on this button, you
        initiate the process of settling your loan. It's important to note that
        repaying the loan involves more than just the principal amount you
        borrowed. In addition to returning the initial borrowed sum, you'll also
        need to cover the interest that has accrued during the borrowing period.
      </p>
    </div>
  );
};
const PageFour = () => {
  return (
    <div className="text-gray-400 w-full flex flex-col items-center py-4">
      <p className="text-3xl">Withdraw your Collateral</p>
      <p className="w-5/12 text-center py-3 leading-relaxed">
        When the time comes for you to return the amount you borrowed as a loan,
        you'll find a conveniently placed "repay" button awaiting your action.
        This button is designed to facilitate the repayment process, making it
        straightforward and user-friendly. By clicking on this button, you
        initiate the process of settling your loan. It's important to note that
        repaying the loan involves more than just the principal amount you
        borrowed. In addition to returning the initial borrowed sum, you'll also
        need to cover the interest that has accrued during the borrowing period.
      </p>
    </div>
  );
};

const StepProgressBar: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div>
      <div className="relative mt-6 mx-5">
        <div className="flex justify-around">
          <div
            className={`z-10 w-14 h-14 flex items-center justify-center rounded-full cursor-pointer ${
              currentStep == 1
                ? "bg-orange-800 text-white"
                : "bg-gray-400 text-gray-800"
            }`}
            onClick={() => setCurrentStep(1)}
          >
            1
          </div>
          <div
            className={`z-10 w-14 h-14 flex items-center justify-center rounded-full cursor-pointer ${
              currentStep == 2
                ? "bg-orange-800 text-white"
                : "bg-gray-400 text-gray-800"
            }`}
            onClick={() => setCurrentStep(2)}
          >
            2
          </div>
          <div
            className={`z-10 w-14 h-14 flex items-center justify-center rounded-full cursor-pointer ${
              currentStep === 3
                ? "bg-orange-800 text-white"
                : "bg-gray-400 text-gray-800"
            }`}
            onClick={() => setCurrentStep(3)}
          >
            3
          </div>
          <div
            className={`z-10 w-14 h-14 flex items-center justify-center rounded-full cursor-pointer ${
              currentStep === 4
                ? "bg-orange-800 text-white"
                : "bg-gray-400 text-gray-800"
            }`}
            onClick={() => setCurrentStep(4)}
          >
            4
          </div>
        </div>
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-400"></div>
      </div>

      {currentStep == 1 && <PageOne />}
      {currentStep == 2 && <PageTwo />}
      {currentStep == 3 && <PageThree />}
      {currentStep == 4 && <PageFour />}
    </div>
  );
};

export default StepProgressBar;
