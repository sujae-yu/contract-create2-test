# [Guide] Example Create2 Project Run v0.1

---

# 1. Overview

We provide a guide to help you get your Create2 project up and running.

# **2. Prerequisites**

- Project Create2 file Download.
    - Project Type : Hardhat (TS, SOL)
    - Name : Create2Contracts_v0.1.zip
- You will need 2 Account Addresses.
    - You must have a balance to use as GasFee.

# 3. Running Create2 Contract

## 3.1. Project **dependency I**nstall and Compile

Download the dependency modules used in your project and compile them.

```bash
npm install

npx hardhat compile
```

## 3.2. Initial deployment of the Create2Deployer Contract

### 3.2.1. Create2Deployer

1. `.env` File `PRIVATE_KEY`   Create2Deployer Account Changing
    - Enter the private key of the account that will act as the Create2Deployer.

        ```
        PRIVATE_KEY="**pri Key**"
        ```

2. `Create2Deployer` Setting ****Account

   Set the address you want to use as the Create2Deployer account from the addresses you created earlier.

   Modify the "0x450750236Fce182c0438292210c37783BdF08C0f" part of the code below.

    ```solidity
      const contract = await ethers.deployContract("Create2Deployer", ['0x450750236Fce182c0438292210c37783BdF08C0f']);
    ```

    <aside>
    💡 Insert the account address that corresponds to the PRIVATE_KEY you entered in step 1

    </aside>

3. Deploying the Create2Deployer contract

    ```bash
    npx hardhat run deploy_deployer.ts --network xpla_testnet
    ```

    - When the deployment is complete, the result is output as shown below.

        ```bash
        Deploying Create2Deployer...
        Create2Deployer deployed to: 0x3c8F5b9D1710C08aff579d6DbBe94D71c4428480
        ```

      You've made it this far. In step 3.2.2, we'll go through the process of deploying the TextBox contract.


### 3.2.2. Deploying TestBox Contract

Use the deployer to deploy the TestBox Contract you want to use for testing.

1. `.env` File `PRIVATE_KEY`   Account Changing
    - Replace the contract you want to use with the private key of the wallet you want to deploy.

        ```
        PRIVATE_KEY="**pri Key**"
        ```

2. Changing `deployer` Address
    - Enter the Create2Deployer Address extracted at the end of step 3.2.1.
    - For example, replace the entered value with "0x3c8F5b9D1710C08aff579d6DbBe94D71c4428480".

        ```tsx
          const deployer = Create2Deployer.attach(
            "0x3c8F5b9D1710C08aff579d6DbBe94D71c4428480"
          );
        ```

3. Changing the salt Value
    - Target file : `execute_deployer.ts`
    - Change the value of the salt to use to generate the predicted address.
      Change the value of the `ethers.id` part. In the example below, the value is `"xpla_test1"`.

        ```tsx
          const computAddr = ethers.getCreate2Address(await deployer.getAddress(), ethers.id("xpla_test1"), initCodehash);
          const predictAddr = await deployer.computeAddress(ethers.id("xpla_test1"), initCodehash);
          await deployer.deploy(0, ethers.id("xpla_test1"), creationBytecode.data);
        
        ```

4. Deploying the `TestBox`Contract

```bash
npx hardhat run execute_deployer.ts --network xpla_testnet
```

After a successful deployment, you should see something like this

```bash
query computed address: 0xf67384034bF38105c338c00F061F82672DE95D0b
query predicted address: 0xf67384034bF38105c338c00F061F82672DE95D0b
TestBox store tx: ContractTransactionReceipt {
  provider: HardhatEthersProvider {
    _hardhatProvider: LazyInitializationProviderAdapter {
      _providerFactory: [AsyncFunction (anonymous)],
      _emitter: [EventEmitter],
      _initializingPromise: [Promise],
      provider: [BackwardsCompatibilityProviderAdapter]
    },
    _networkName: 'xpla_testnet',
    _blockListeners: [],
    _transactionHashListeners: Map(0) {},
    _eventListeners: [],
    _isHardhatNetworkCached: false,
    _transactionHashPollingTimeout: undefined
  },
  to: '0xf67384034bF38105c338c00F061F82672DE95D0b',
  from: '0xcf0FE3e52aa7Bfa97361EB81eE6c3BDDE610B225',
  contractAddress: null,
  hash: '0x514de40f964a2b537cee6305b30c0d046f95c1597c2b5d23c964793f150d6e91',
  index: 0,
  blockHash: '0x6bf323085844e4e43b3043f8559fb518034de8dc053b76ca76f51b6919b88b25',
  blockNumber: 9929881,
  logsBloom: '0x40000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000',
  gasUsed: 123927n,
  blobGasUsed: undefined,
  cumulativeGasUsed: 209731n,
  gasPrice: 850000000001n,
  blobGasPrice: undefined,
  type: 2,
  status: 1,
  root: undefined
}
TestBox store value: 56359n

```

### 3.2.3. Test the calculated contract Address TestBox contract association

1. Modify the code below with the calculated and extracted Address and Salt values from CREATE2.
    - The address used in the example is "0x3c8F5b9D1710C08aff579d6DbBe94D71c4428480" and the salt value is "xpla_test1".

        ```bash
          const computAddr = ethers.getCreate2Address(
            "0x3c8F5b9D1710C08aff579d6DbBe94D71c4428480",
            ethers.id("xpla_test1"),  // salt
            initCodehash,
          );
        ```

2. Connect to the TestBox contract and run it.

    ```bash
    npx hardhat run execute_testbox.ts --network xpl_localnet
    ```

    - When finished, you should see something like this

        ```bash
        
        query computed address: 0xf67384034bF38105c338c00F061F82672DE95D0b
        TestBox store tx: ContractTransactionReceipt {
          provider: HardhatEthersProvider {
            _hardhatProvider: LazyInitializationProviderAdapter {
              _providerFactory: [AsyncFunction (anonymous)],
              _emitter: [EventEmitter],
              _initializingPromise: [Promise],
              provider: [BackwardsCompatibilityProviderAdapter]
            },
            _networkName: 'xpl_localnet',
            _blockListeners: [],
            _transactionHashListeners: Map(0) {},
            _eventListeners: [],
            _isHardhatNetworkCached: false,
            _transactionHashPollingTimeout: undefined
          },
          to: '0xf67384034bF38105c338c00F061F82672DE95D0b',
          from: '0xcf0FE3e52aa7Bfa97361EB81eE6c3BDDE610B225',
          contractAddress: null,
          hash: '0x8a2e94941d1c2b32cabb03765bf44b58393c711b44604d6489419f122286171b',
          index: 0,
          blockHash: '0x85f69a15ddaeedcd9605443b58819e90f75eea1dc7f02a66b1a6c1cc80ad134e',
          blockNumber: 280,
          logsBloom: '0x40000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000',
          gasUsed: 106827n,
          blobGasUsed: undefined,
          cumulativeGasUsed: 106827n,
          gasPrice: 0n,
          blobGasPrice: undefined,
          type: 0,
          status: 1,
          root: undefined
        }
        TestBox store value: 64557n
        ```


**Thank you for your efforts. You've followed all the steps.**
If you need to deploy to a different chain, you can modify the settings in this step to do the same.

---