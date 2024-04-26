import diamondAbi from "./diamondAbi.json";
import erc20Abi from "./erc20Abi.json";
import getterAbi from "./getterAbi.json";
import erc20PermitAbi from "./erc20PermitAbi.json";

export const DEPLOYER = "0xec2B1547294a4dd62C0aE651aEb01493f8e4cD74";

const diamondAddress = "0x18B7fa65fC28a3Be154120702f45B6f8D712Cf8c";
const larAddress = "0xA893930f4a47ea709525924C445f83444a852e9b";
const getterAddress = "0xFA80Da1CABb54aF57F36F7AFde1aD5D7dF8E1091";

export const IMAGES = {
  DAI: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSllrF9PNBf88kIx9USP5g73XDYjkMyRBaDig&usqp=CAU",
  WETH: "https://staging.aave.com/icons/tokens/weth.svg",
  LINK: "https://staging.aave.com/icons/tokens/link.svg",
  FAU: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5qUPi3Ar2dQZ2m9K5opr_h9QaQz4_G5HVYA&usqp=CAU",
  LAR: "https://staging.aave.com/icons/tokens/wbtc.svg",
  WMATIC: "https://staging.aave.com/icons/tokens/wmatic.svg",
  MATIC: "https://staging.aave.com/icons/tokens/matic.svg ",
};

export const dai = "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357"; // 18
export const link = "0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5"; // 18
export const wMatic = "0xf237dE5664D3c2D2545684E76fef02A3A58A364c"; // 18
export const weth = "0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c"; // 18
export const usdc = "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8"; // 6
export const jeur = "0x6d906e526a4e2Ca02097BA9d0caA3c382F52278E"; //18

export const addressToImage: { [key: string]: string } = {
  [dai]: "https://staging.aave.com/icons/tokens/dai.svg",
  [wMatic]: "https://staging.aave.com/icons/tokens/wmatic.svg",
  [weth]: "https://staging.aave.com/icons/tokens/weth.svg",
  [link]: "https://staging.aave.com/icons/tokens/link.svg",
  [usdc]: "https://staging.aave.com/icons/tokens/usdc.svg",
  [jeur]: "https://staging.aave.com/icons/tokens/jeur.svg",
  [larAddress]: "https://staging.aave.com/icons/tokens/matic.svg",
};

// set the Permit type parameters
export const types = {
  Permit: [
    {
      name: "owner",
      type: "address",
    },
    {
      name: "spender",
      type: "address",
    },
    {
      name: "value",
      type: "uint256",
    },
    {
      name: "nonce",
      type: "uint256",
    },
    {
      name: "deadline",
      type: "uint256",
    },
  ],
};

export {
  diamondAddress,
  larAddress,
  getterAddress,
  diamondAbi,
  erc20Abi,
  getterAbi,
  erc20PermitAbi,
};

export const supportedChainId = 11155111;

// const types = {
//   Person: [
//     { name: "name", type: "string" },
//     { name: "wallet", type: "address" },
//   ],
//   Mail: [
//     { name: "from", type: "Person" },
//     { name: "to", type: "Person" },
//     { name: "contents", type: "string" },
//   ],
// } as const;

// const types2 = {
//   Mail: [
//     { name: "owner", type: "string" },
//     { name: "spender", type: "string" },
//     { name: "value", type: "string" },
//     { name: "nonce", type: "string" },
//     {name: "deadline", type: "number"}
//   ]
// }





// const message = {
//   from: {
//     name: "Cow",
//     wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
//   },
//   to: {
//     name: "Bob",
//     wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
//   },
//   contents: "Hello, Bob!",
// } as const;

// // const message2 = {
// //   owner: signerAddress,
// //   spender: diamondAddress,
// //   value: ethers.parseUnits("5", 18), // Amount to approve
// //   nonce: nonce.toHexString(),
// //   deadline,
// // };
