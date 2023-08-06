import diamondAbi from "./diamondAbi.json";
import erc20Abi from "./erc20Abi.json";
import getterAbi from "./getterAbi.json";

export const DEPLOYER = "0xec2B1547294a4dd62C0aE651aEb01493f8e4cD74";

const diamondAddress = "0x9c4FAB0B2ee9204dA5968f7F9CD0a8178a89716F";
const larAddress = "0x4E7932E2eAC5C473ae6460298AEd32C3F344cBAE";
const getterAddress = "0xEEd3a4E4b30104365BEfFFbe3dC6BA4695AE51e1";

export const IMAGES = {
  DAI: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSllrF9PNBf88kIx9USP5g73XDYjkMyRBaDig&usqp=CAU",
  WETH: "https://staging.aave.com/icons/tokens/weth.svg",
  LINK: "https://staging.aave.com/icons/tokens/link.svg",
  FAU: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5qUPi3Ar2dQZ2m9K5opr_h9QaQz4_G5HVYA&usqp=CAU",
  LAR: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqZs8PLHRLaGd4QfIvOYmCg30svx5dHp0y6A&usqp=CAU",
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
  [larAddress]:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqZs8PLHRLaGd4QfIvOYmCg30svx5dHp0y6A&usqp=CAU",
};

export {
  diamondAddress,
  larAddress,
  getterAddress,
  diamondAbi,
  erc20Abi,
  getterAbi,
};

export const supportedChainId = 80001;
