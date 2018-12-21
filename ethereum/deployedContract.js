const ABI = [
  {
    constant: false,
    inputs: [
      { name: "objectId", type: "uint256" },
      { name: "owner", type: "address" },
      { name: "status", type: "string" }
    ],
    name: "registerObject",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "objectId", type: "uint256" }],
    name: "getObject",
    outputs: [
      { name: "owner", type: "address" },
      { name: "status", type: "string" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "buyerAdd", type: "address" },
      { name: "objectId", type: "uint256" },
      { name: "newStatus", type: "string" }
    ],
    name: "tradeObject",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "objectId", type: "uint256" }],
    name: "confirmTransaction",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "objects",
    outputs: [
      { name: "owner", type: "address" },
      { name: "buyer", type: "address" },
      { name: "status", type: "string" },
      { name: "sellerCollateral", type: "uint256" },
      { name: "buyerCollateral", type: "uint256" },
      { name: "price", type: "uint256" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "confirmed", type: "bool" }],
    name: "PurchaseListen",
    type: "event"
  }
];
const contractAddress = "0xD828491DaDd690De22b36EAC8CB326B85CB69433";

export { ABI, contractAddress };
