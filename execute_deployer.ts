import { ethers } from 'hardhat';

const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

const main = async () : Promise<void> => {
  // Connecting contracts for CREATE2 deployments
  const Create2Deployer = await ethers.getContractFactory('Create2Deployer');
  const deployer = Create2Deployer.attach(
    "0x3c8F5b9D1710C08aff579d6DbBe94D71c4428480" // Need to replace with the address extracted by the ‘npx hardhat run deploy_deployer.ts’ command
  );

  // Contracts for testing
  const TestBox = await ethers.getContractFactory('TestBox');
  let creationBytecode = await TestBox.getDeployTransaction();
  let initCodehash = ethers.keccak256(creationBytecode.data);

  // Precomputing addresses offline
  const computAddr = ethers.getCreate2Address(await deployer.getAddress(), ethers.id("xpla_test1"), initCodehash);
  console.log('query computed address:', computAddr);

  // Address prediction with contracts for deployment
  const predictAddr = await deployer.computeAddress(ethers.id("xpla_test1"), initCodehash);
  console.log('query predicted address:', predictAddr);

  // Deploying contracts for testing via contracts for deployment
  await deployer.deploy(0, ethers.id("xpla_test1"), creationBytecode.data);
  await sleep(5000);  // Wait for internal deployment to finish

  // Connect to the predicted address (the address is the same, so connect directly)
  const contract = TestBox.attach(predictAddr);

  // Executing a function in a contract for testing
  const tx = await contract.store( Math.floor(Math.random() * 65536) );
  console.log('TestBox store tx:', await tx.wait());

  const query = await contract.retrieve();
  console.log('TestBox store value:', query);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
