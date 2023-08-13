# defi-lending-and-borrowing

A full stack, fully-onchain DEFI app that enables users to supply tokens to the platform and are rewarded with some customly made ERC20 token (LAR) based on the amount of token they supply and also allows users to borrow tokens from it.

The motivation behind this platform's creation stemmed from [AAVE](https://aave.com/), a real-life lending and borrowing platform and it is important to note that none of AAVE's code was incorporated into the app.

It is deployed on the Polygon Mumbai testnet.

# Features

1. The paltform currently supports 5 test tokens; DAI, LINK, WMATIC, USDC and JEUR 😎. Faucets can be obtained [here](https://app.aave.com/faucet/)

2. Prior to gaining borrowing privileges on the platform, users are required to provide collateral. Upon depositing collateral, you receive LAR tokens, the quantity of which is determined by the USD value of the tokens you contributed. The LAR token will be burnt when you withdraw the collateral you provided.

3. Keep note that the collateral must be greater in value than the token you want to borrow from the platform. Also, the collateral is influenced greatly by the LTV (Loan To Value) ratio of that particular token you put down as collateral.

4. For all tokens accessible for borrowing, the platform maintains a stable APY rate that remains constant. This guarantees that the interest due at the end of the day does not fluctuate.

5. Upon the user's readiness to repay the debt, both the borrowed tokens and the accrued interest are deducted from the user. The interest is calculated in accordance with the constant stable APY rate

6. After settling the debt, users are granted the ability to retrieve the tokens they initially placed as collateral from the pool.

7. When a user initiates a withdrawal from the pool, the platform employs the burning process to eliminate a portion of the LAR tokens awarded to the user. The quantity of LAR tokens collected from the user matches the value of the tokens they intend to withdraw

# Technologies

1. **Diamond Standard**: This is a pattern of writing smart contracts which enables you to partition your smart contract functionalities into distinct segments known as **facets**. This approach enhances adaptability and guarantees the capability to integrate numerous functionalities within your smart contract without being constrained by the typical smart contract size limit (usually around 24kb).

2. **Open Zeppelin**: The contract utilizes OpenZeppelin's IERC20 interface to instantiate a token, and additionally incorporates OpenZeppelin's Ownable contract to establish contract security measures.

3. **Chainlink**: The contract employs Chainlink's AggregatorV3Interface to retrieve up-to-date real-time price feeds.

4. **Hardhat**: The project's smart contract framework of choice is Hardhat. Hardhat offers a high degree of flexibility that facilitates the streamlined creation of tests, deployment scripts, and various other functionalities.

5. **React JS**: React JS serves as the front-end framework in use, ensuring versatile user interaction capabilities.

6. **Tailwind CSS**: Tailwind CSS framework employed is known for providing an exceptionally adaptable approach to project design. Moreover, it excels in managing responsiveness, ensuring an effective display across various devices

7. **Wagmi && Viems**: Wagmi is a collection of React Hooks that made it very easy to integrate different types of wallets into the project . Wagmi and Viem work hand in hand

8. **ethers.js**
9. **WalletConnectV2 and many more**
10. **Vercel**

# Programming/Scripting Languages

1. Solidity
2. Typescrpit

# Developer

Let's Connect! 👋 👋

Akintayo Lanre -

1. Reach out to me on my email --> akintayolanre2019@gmail.com
2. Follow me on [LinkedIn](https://www.linkedin.com/in/lanre-akintayo-b6462b238/)
3. Follow me on [Twitter](https://twitter.com/larry_codes?t=jJbdbfqX_BmTP_WFa5dosQ&s=08)
