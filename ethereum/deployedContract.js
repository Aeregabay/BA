const ABI = [
  {
    constant: true,
    inputs: [{ name: "objectId", type: "uint256" }],
    name: "getObject",
    outputs: [
      { name: "owner", type: "address" },
      { name: "uid", type: "string" },
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
    constant: true,
    inputs: [{ name: "uid", type: "string" }],
    name: "viewOwnerHistory",
    outputs: [{ name: "owners", type: "address[]" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "uid", type: "string" },
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
    constant: false,
    inputs: [{ name: "objectId", type: "uint256" }],
    name: "recoverItemFunds",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
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
      { name: "uid", type: "string" },
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
    constant: false,
    inputs: [{ name: "objectId", type: "uint256" }],
    name: "releaseSellerCollateral",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "confirmed", type: "bool" }],
    name: "PurchaseListen",
    type: "event"
  }
];
const contractAddress = "0x4a7DC27A8bb884dC768111Ac9cFa47A7f60450BE";

export { ABI, contractAddress };
