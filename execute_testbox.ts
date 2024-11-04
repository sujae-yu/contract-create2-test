import { ethers } from 'hardhat';

const main = async () : Promise<void> => {
  // Contracts for testing
  const TestBox = await ethers.getContractFactory('TestBox');
  let creationBytecode = await TestBox.getDeployTransaction();
  let initCodehash = ethers.keccak256(creationBytecode.data);

  // Calculating addresses offline
  const computAddr = ethers.getCreate2Address(
    "0x3c8F5b9D1710C08aff579d6DbBe94D71c4428480",  // Need to set to contract address for CREATE2 deployment
    ethers.id("xpla_test1"),  // salt
    initCodehash,  // Bytecode hashes
  );
  console.log('query computed address:', computAddr);

  // Connect to the calculated address (direct connection as the address is the same)
  const contract = await TestBox.attach(computAddr);

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
