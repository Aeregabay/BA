const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "ENTER YOUR MNEMONIC HERE", //mnemonic
  "https://YOUR_INFURA_KEY_HERE" //infura api key
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("deploying from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: 5000000, gasPrice: "5000000000", from: accounts[0] });

  console.log(interface);
  console.log("Successfully deployed to", result.options.address);
};

deploy();
