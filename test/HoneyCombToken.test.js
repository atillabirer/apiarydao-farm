const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HoneyCombToken", function () {
  this.beforeEach(async function() {

  })
  it("Minter roles can mint and others get rejected", async function () {

    const [one,two,three] = await ethers.getSigners();

    const HoneyCombToken = await ethers.getContractFactory("HoneyCombToken");
    const honeycombtoken = await HoneyCombToken.deploy();

    await honeycombtoken.connect(one).addNewMinter(one.address);
    await honeycombtoken.connect(one).addNewMinter(two.address);

    const oneConnect = await honeycombtoken.connect(one)
    expect(await oneConnect["mint(address,uint256)"](one.address,1000))
    .to
    .changeTokenBalance(honeycombtoken,one,1000);
    
    const twoConnect = await honeycombtoken.connect(two);
    expect(await twoConnect["mint(address,uint256)"](two.address,1000))
    .to
    .changeTokenBalance(honeycombtoken,two,1000);
    
    const threeConnect = await honeycombtoken.connect(three);
    expect(await threeConnect["mint(address,uint256)"](three.address,1000))
    .to
    .be
    .revertedWith("You are not a minter.")
    
  });
  
});
