pragma solidity ^0.5.0;

contract TradingContract {
    
    struct Object {
        address owner;
        string tag;
    }

    mapping (uint => Object) public objects;

    function tradeObject(address buyerAdd, address payable sellerAdd, uint objectId, string memory newTag) public payable {
        objects[objectId].owner = buyerAdd;
        objects[objectId].tag = newTag;

        sellerAdd.transfer(msg.value);
    }

    function registerObject(uint objectId, address owner, string memory tag) public {
        objects[objectId] = Object(owner, tag);
    }

    function getObject(uint objectId) public view returns (address, string memory) {
        return (objects[objectId].owner, objects[objectId].tag);
    }

}