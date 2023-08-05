import correct from "@assets/correct.png";
import { useState } from "react";
import BorderLayout from "./BorderLayout";

interface IModalSupply {
  token: any;
  closeModal: any;
  onSupply: any;
  addLAR: any;
  supplyError: any;
  supplyResult: any;
}

export default function ModalSupply({
  token,
  closeModal,
  onSupply,
  addLAR,
  supplyError,
  supplyResult,
}: IModalSupply) {

  const [value, setValue] = useState("");
  const [valueInDollars, setValueInDollars] = useState("0.00");

  return <BorderLayout>This is the modal to supply</BorderLayout>;
}
