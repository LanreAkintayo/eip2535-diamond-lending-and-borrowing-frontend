import useWallet from "../hooks/useWallet";

export default function HomePage() {

  const { signerAddress } = useWallet()
  
  console.log("Signer address: ", signerAddress)
  
  return (
    <>
      <div className="text-red-500">This is the home page</div>
    </>
  );
}
