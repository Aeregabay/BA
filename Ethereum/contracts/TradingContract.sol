pragma solidity ^0.5.1;

contract TradingContract {

    address public buyer;
    address public seller;

    function trade(address buyerAdd, address sellerAdd) payable public {
        buyer = buyerAdd;
        seller = sellerAdd;
    }

    struct object {
        address owner;
        string tag;
    }

    mapping (uint => object) public objects;
}