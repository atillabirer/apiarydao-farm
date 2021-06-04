const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const signers = await hre.ethers.getSigners();

  const honeyCombToken = await hre.ethers.getContractFactory("HoneyCombToken");
  const HoneyCombToken = await honeyCombToken.deploy();
  const wBNBToken = await hre.ethers.getContractFactory("WBNB");
  const WBNBToken = await wBNBToken.deploy();
  const pancakeFactory = await hre.ethers.getContractFactory("PancakeFactory");
  const PancakeFactory = await pancakeFactory.deploy(signers[0].address);
  const apiaryDao = await hre.ethers.getContractFactory("ApiaryDao");
  const ApiaryDao = await apiaryDao.deploy();

  await HoneyCombToken.deployed();
  await WBNBToken.deployed();
  await PancakeFactory.deployed();
  await ApiaryDao.deployed();

  const result = await PancakeFactory.createPair(
    WBNBToken.address,
    HoneyCombToken.address
  );
  //get first pair
  //  const pairAddress = await PancakeFactory.allPairs(0);
  //  const PancakePair = pancakePair.attach(pairAddress);
  //console.log(await PancakePair.token0(), await PancakePair.token1());

  console.log(result);

  console.log("HoneyCombToken deployed to:", HoneyCombToken.address);
  console.log("WBNB deployed to", WBNBToken.address);
  console.log("PancakeFactory deployed to", PancakeFactory.address);

  const syrup = await hre.ethers.getContractFactory("SyrupBar");
  const Syrup = await syrup.deploy(HoneyCombToken.address);
  await Syrup.deployed();
  const masterchef = await hre.ethers.getContractFactory("MasterChef");
  const MasterChef = await masterchef.deploy(
    HoneyCombToken.address,
    Syrup.address,
    signers[0].address,
    1,
    7976775
  );
  await MasterChef.deployed();
  console.log("Syrup:", Syrup.address);
  console.log("Masterchef:", MasterChef.address);
  // We get the contract to deploy
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
