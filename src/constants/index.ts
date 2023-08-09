import diamondAbi from "./diamondAbi.json";
import erc20Abi from "./erc20Abi.json";
import getterAbi from "./getterAbi.json";
import erc20PermitAbi from "./erc20PermitAbi.json";

export const DEPLOYER = "0xec2B1547294a4dd62C0aE651aEb01493f8e4cD74";

const diamondAddress = "0x6AB4C520F98ad65958BF2D331D25A9Ee183c78FE";
const larAddress = "0x7F1EdD6F935cE75FD20EeAa96A79D4B8de3dd91F";
const getterAddress = "0x55E5d5056d552040F3C9d471584e1000708a7bc1";

export const IMAGES = {
  DAI: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSllrF9PNBf88kIx9USP5g73XDYjkMyRBaDig&usqp=CAU",
  WETH: "https://staging.aave.com/icons/tokens/weth.svg",
  LINK: "https://staging.aave.com/icons/tokens/link.svg",
  FAU: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5qUPi3Ar2dQZ2m9K5opr_h9QaQz4_G5HVYA&usqp=CAU",
  LAR: "https://staging.aave.com/icons/tokens/matic.svg",
  WMATIC: "https://staging.aave.com/icons/tokens/wmatic.svg",
  MATIC: "https://staging.aave.com/icons/tokens/matic.svg ",
};

export const dai = "0xF14f9596430931E177469715c591513308244e8F"; // 18
export const link = "0x4e2f1E0dC4EAD962d3c3014e582d974b3cedF743"; // 18
export const wMatic = "0xf237dE5664D3c2D2545684E76fef02A3A58A364c"; // 18
export const usdc = "0xe9DcE89B076BA6107Bb64EF30678efec11939234"; // 6
export const jeur = "0x6bF2BC4BD4277737bd50cF377851eCF81B62e320"; //18

export const addressToImage: { [key: string]: string } = {
  [dai]: "https://staging.aave.com/icons/tokens/dai.svg",
  [wMatic]: "https://staging.aave.com/icons/tokens/wmatic.svg",
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

export const supportedChainId = 80001;

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
