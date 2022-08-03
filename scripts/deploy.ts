import { ethers, run, network } from "hardhat";

const main = async () => {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("Deploying contract...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log("Contract deployed at:", simpleStorage.address);

    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
      console.log("Waiting for block txes...")
        await simpleStorage.deployTransaction.wait(6); // Wait 6 blocks before running verify process to avoid transaction conflicts
        await verify(simpleStorage.address, []);
    }

    // Contract functions
    const currentValue = await simpleStorage.retrieve();
    console.log("Current value:", currentValue);

    const transactionResponse = await simpleStorage.store(42);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log("Updated value:", updatedValue);
};

const verify = async (contractAddress: string, args: any[]) => {
    console.log("Verifying contract...");

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!");
        } else {
            console.log(e);
        }
    }
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
