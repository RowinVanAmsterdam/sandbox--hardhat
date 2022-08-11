import { ethers } from "hardhat";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";
import { expect, assert } from "chai";

describe("SimpleStorage", () => {
    let simpleStorageFactory: SimpleStorage__factory;
    let simpleStorage: SimpleStorage;

    beforeEach(async () => {
        simpleStorageFactory = (await ethers.getContractFactory(
            "SimpleStorage"
        )) as SimpleStorage__factory;
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should deploy and initialize favoriteNumber with number 0", async () => {
        const expectedValue = "0";
        const currentValue = await simpleStorage.retrieve();
        // assert.equal(currentValue.toString(), expectedValue);
        expect(currentValue).to.equal(expectedValue);
    });

    it("Should update favoriteNumber with 42 using store function", async () => {
        const expectedValue = "42";
        const updateFavoriteNumber = await simpleStorage.store(42);
        await updateFavoriteNumber.wait(1);
        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    });
});
