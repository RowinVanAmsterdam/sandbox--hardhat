import { Contract, Signer } from "ethers";
import { ethers, getNamedAccounts, network } from "hardhat";
import { developmentChains } from "../../helper-hardhat-config";
import { assert } from "chai";

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", () => {
          let fundMe: Contract;
          let deployer: string | Signer | undefined;
          const sendValue = ethers.utils.parseEther("1"); // 1 ether

          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer;
              fundMe = await ethers.getContract("FundMe", deployer);
          });

          it("should allow people to fund and withdraw", async () => {
              await fundMe.fund({ value: sendValue });
              await fundMe.withdraw();
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              );
              assert.equal(endingBalance.toString(), "0");
          });
      });
