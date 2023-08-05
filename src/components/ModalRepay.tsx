import correct from "@assets/correct.png";
import { useState } from "react";
import BorderLayout from "./BorderLayout";
import { convertToDollar } from "../utils/helper";

interface IModalRepay {
  token: any;
  closeModal: any;
  onRepay: any;
  repayError: any;
  repayResult: any;
  web3: any;
}

export default function ModalRepay({
  token,
  closeModal,
  onRepay,
  repayError,
  repayResult,
  web3,
}: IModalRepay) {

  const [value, setValue] = useState("");
  const [valueInDollars, setValueInDollars] = useState("0");

  const actualMax =
    Number(token.walletBalance.amount) -
    Number(token.walletBalance.amount) * Number(token.borrowAPYRate);
  const tokenOwedWithInterest =
    Number(token.userTokenBorrowedAmount.amount) +
    Number(token.userTokenBorrowedAmount.amount) * Number(token.borrowAPYRate);

  let max;

  if (Number(token.walletBalance.amount) > tokenOwedWithInterest) {
    max = Number(token.userTokenBorrowedAmount.amount);
  } else {
    max = actualMax;
  }

  const maxInDollars = convertToDollar(token, max);

  const tokenAmountBorrowed = token.userTokenBorrowedAmount.amount;
  const tokenAmountBorrowedInDollars = convertToDollar(
    token,
    tokenAmountBorrowed
  );

  return <BorderLayout>This is the Modal to repay</BorderLayout>;
}
