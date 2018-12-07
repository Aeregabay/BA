pragma solidity ^0.4.25;

contract TradingContract {
    
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

        sellerAdd.transfer(msg.value);                //send ether to seller

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