import correct from "@assets/correct.png";
import { useState } from "react";
import BorderLayout from "./BorderLayout";
import { convertToDollar } from "../utils/helper";

interface IModalBorrow {
  token: any;
  closeModal: any;
  balance: any;
  onBorrow: any;
  borrowingError: any;
  borrowingResult: any;
  addBorrowedToken: any;
}
export default function ModalBorrow({
  token,
  closeModal,
  balance,
  onBorrow,
  borrowingError,
  borrowingResult,
  addBorrowedToken,
}: IModalBorrow) {

  let actualAvailable = "0.00";
  let actualAvailableInDollars = "0";

  const userTotalAmountAvailableForBorrowInDollars =
    token.userTotalAmountAvailableForBorrowInDollars;

  const tokenEquivalent =
    userTotalAmountAvailableForBorrowInDollars /
    parseFloat(token.oneTokenToDollar);

  const tokenAvailableInContract = parseFloat(
    token.availableAmountInContract.amount
  );
  const tokenAvailableInContractInDollars = convertToDollar(
    token,
    tokenAvailableInContract
  );

  // if (tokenAvailableInContract >= tokenEquivalent) {
  //   actualAvailable = tokenEquivalent;
  //   actualAvailableInDollars = convertToDollar(token, actualAvailable);
  // } else {
  //   actualAvailable = tokenAvailableInContract;
  //   actualAvailableInDollars = tokenAvailableInContractInDollars;
  // }

  const [value, setValue] = useState("");
  const [valueInDollars, setValueInDollars] = useState("0");

  return (
    <BorderLayout>
     This is Modal Borrow
    </BorderLayout>
  );
}
