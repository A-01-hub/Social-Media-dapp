const { ethers, run, network } = require("hardhat");
async function main() {
  const app = await ethers.getContractFactory("appcontract");
  console.log("Deploying contract...");
  const apps = await app.deploy();
  await apps.deployed();
  console.log(`Deployed contract to: ${apps.address}`);
}
const runmain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
runmain();
