import YourBorrows from "../components/YourBorrows";
import useWallet from "../hooks/useWallet";

export default function HomePage() {

  const { signerAddress } = useWallet()
  
  console.log("Signer address: ", signerAddress)
  
  return (
    <>
      <YourBorrows />
    </>
  );
}
