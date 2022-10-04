export const networkConfig = {
    31337: {
        name: "hardhat",
        ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
        blockConfirmations: 1,
    },
    4: {
        name: "rinkeby",
        ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
        blockConfirmations: 6,
    },
    5: {
        name: "goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
        blockConfirmations: 6,
    },
};

export const developmentChains = ["hardhat", "localhost"];

export const DECIMALS = 8;
export const INITIAL_ANSWER = 200000000000;
