pragma solidity ^0.4.25;

contract TradingContract {

    address adminAddress = 0xa9C3f40905a01240F63AA2b27375b5D43Dcd64E5;
    
    struct Object {
        address owner;
        string status;          //"borrowed", "owned" or "stolen"
    }

    //notifies client that a transaction occurred
    event PurchaseListen(
        bool confirmed
    );

    mapping (uint => Object) public objects;

    function tradeObject(address buyerAdd, address sellerAdd, uint objectId, string newStatus) public payable {
        objects[objectId].owner = buyerAdd;
        objects[objectId].status = newStatus;         //in case item status changes from "owned" to "borrowed"

        sellerAdd.transfer(msg.value/100*99);         //send ether to seller      
        adminAddress.transfer(msg.value/100);         //assign 1% of sales to admin account
        
        emit PurchaseListen(true);                    //notify client that transaction is complete
    }

    function registerObject(uint objectId, address owner, string status) public payable {
        objects[objectId] = Object(owner, status);
    }

    function getObject(uint objectId) public view returns (address owner, string status ) {
        owner = objects[objectId].owner;
        status = objects[objectId].status;
        return (owner, status);
    }

}