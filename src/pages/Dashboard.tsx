import useDefi from "../hooks/useDefi";
import useWallet from "../hooks/useWallet";

export default function Dashboard() {
  const { signerAddress } = useWallet();
  const { userSupplies } = useDefi()
  
  console.log("User supplies: ", userSupplies)

  // console.log("Signer address: ", signerAddress);

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
