const path = require("path");
const fs = require("fs");
const solc = require("solc");

const tradingPath = path.resolve(__dirname, "contracts", "TradingContract.sol");
const source = fs.readFileSync(tradingPath, "utf8");
console.log(solc.compile(source, 1).contracts[":TradingContract"]);

module.exports = solc.compile(source, 1).contracts[":TradingContract"];
