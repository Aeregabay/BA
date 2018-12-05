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
  }
];
const contractAddress = "0xbE335e67DE4eF9381e0e2C43505b531fc7C25BA9";

export { ABI, contractAddress };
