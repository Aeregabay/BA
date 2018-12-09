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
      { name: "sellerAdd", type: "address" },
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
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "objects",
    outputs: [
      { name: "owner", type: "address" },
      { name: "status", type: "string" }
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
const contractAddress = "0xEb7704979bAAcC51Fa9386fbd3597530892ba326";

export { ABI, contractAddress };
