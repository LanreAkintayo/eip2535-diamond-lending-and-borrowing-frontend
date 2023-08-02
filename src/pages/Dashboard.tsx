import useWallet from "../hooks/useWallet";

export default function Dashboard() {
  const { signerAddress } = useWallet();

  console.log("Signer address: ", signerAddress);

  return (
    <>
      <div className="text-red-500">This is the dashboard</div>
      <div className="text-red-500">This is the dashboard</div>
      <div className="text-red-500">This is the dashboard</div>
      <div className="text-red-500">This is the dashboard</div>
      <div className="text-red-500">This is the dashboard</div>
   
    </>
  );
}
