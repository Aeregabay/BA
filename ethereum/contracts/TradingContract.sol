pragma solidity ^0.4.25;

contract TradingContract {

    address adminAddress = 0xa9C3f40905a01240F63AA2b27375b5D43Dcd64E5;
    
    struct Object {
        address owner;
        address seller;
        address buyer;
        string status;          //"new", "used", "damaged"
        uint price;
    }

    //notifies client that a transaction occurred
    event PurchaseListen(
        bool confirmed
    );

    mapping (uint => Object) public objects;

    function tradeObject(address buyerAdd, address sellerAdd, uint objectId, string newStatus) public payable {
        objects[objectId].buyer = buyerAdd;
        objects[objectId].seller = sellerAdd;
        objects[objectId].status = newStatus;
        objects[objectId].price = msg.value;

        adminAddress.transfer(msg.value);           //block buyer payment on admin account
        
        emit PurchaseListen(true);                  //notify client that transaction is complete
    }

    function confirmTransaction(uint objectId) public {
        uint price = objects[objectId].price;
        address seller = objects[objectId].seller;
        address buyer = objects[objectId].buyer;

        seller.transfer(price * 3 / 2 - price / 100);           //send seller 99% of the price + his collateral, 1% admin fee
        
        objects[objectId].owner = buyer;                        //assign buyer as new owner        
        objects[objectId].buyer = address(0);                   //delete buyer
        objects[objectId].seller = address(0);                  //and seller address

        emit PurchaseListen(true);                              //notify client that purchase is confirmed
    }

    function registerObject(uint objectId, address owner, string status) public payable {
        objects[objectId] = Object(owner, address(0), address(0), status, uint(0));
        adminAddress.transfer(msg.value);           //send seller collateral to admin account, will be 50% of item price

        emit PurchaseListen(true);
    }

    function getObject(uint objectId) public view returns (address owner, string status ) {
        owner = objects[objectId].owner;
        status = objects[objectId].status;
        return (owner, status);
    }

}