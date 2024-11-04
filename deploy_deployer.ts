import { ethers } from 'hardhat';

const main = async () : Promise<void> => {
  // Deploying contracts for CREATE2 deployments
  console.log('Deploying Create2Deployer...');
  const contract = await ethers.deployContract("Create2Deployer", ['0x450750236Fce182c0438292210c37783BdF08C0f']);
  await contract.waitForDeployment();
  console.log('Create2Deployer deployed to:', await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
