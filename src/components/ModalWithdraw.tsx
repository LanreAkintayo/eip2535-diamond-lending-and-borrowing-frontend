// import Image from "next/image";
import correct from "@assets/correct.png";
import BorderLayout from "./BorderLayout";

interface IModalWithdraw {
  token: any;
  closeModal: any;
  onWithdraw: any;
  withdrawError: any;
  withdrawResult: any;
  addTokenToMetamask: any;
  contract: any;
  web3: any;
}


export default function ModalWithdraw({
  token,
  closeModal,
  onWithdraw,
  withdrawError,
  withdrawResult,
  addTokenToMetamask,
  contract,
  web3,
}: IModalWithdraw) {
  // const { promiseInProgress } = usePromiseTracker();

  // const [value, setValue] = useState("");
  // const [valueInDollars, setValueInDollars] = useState("0");
  // // const max = token?.userTokenLentAmount.amount;

  // let userMaximumAvailableInDollars =
  //   token.userTotalAmountAvailableToWithdrawInDollars;
  
  //   let max;
  // let maxInDollars;
  

  // const balanceInContractInDollars = token.userTokenLentAmount.inDollars - token.totalBorrowedInContract.inDollars;


  // if (userMaximumAvailableInDollars <= balanceInContractInDollars) {
      
  //     max = userMaximumAvailableInDollars / token.oneTokenToDollar;
  //     maxInDollars = convertToDollar(token, max, contract, web3);
  //   } else {
      
  //     max = balanceInContractInDollars / token.oneTokenToDollar;
  //     maxInDollars =  convertToDollar(token, max, contract, web3)
  //   }


  


  // if (parseFloat(maxInDollars) > 0.0001) {
  //   maxInDollars = token.userTotalAmountAvailableToWithdrawInDollars - 0.0001
  // }

  // const maxInDollars = token?.userTokenLentAmount.inDollars;
  // const maxToWithdrawInDollars =
  // token?.userTotalAmountAvailableToWithdrawInDollars;

  return (
    <BorderLayout>
     This is the modal to withdraw
    </BorderLayout>
  );
}
