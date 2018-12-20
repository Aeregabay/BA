pragma solidity ^0.4.25; 

contract TradingContract {

    address adminAddress = 0xa9C3f40905a01240F63AA2b27375b5D43Dcd64E5;
    
    struct Object {
        address owner;
        address buyer;
        string status;          //"new", "used", "damaged"
        uint sellerCollateral;
        uint buyerCollateral;
    }

    //notifies client that a transaction occurred
    event PurchaseListen(
        bool confirmed
    );

    mapping (uint => Object) public objects;
    
    //allocates buyerCollateral to contract and tracks amount in the Object to send it to seller later
    function tradeObject(address buyerAdd, uint objectId, string newStatus) public payable {
        objects[objectId].buyer = buyerAdd;
        objects[objectId].status = newStatus;
        objects[objectId].buyerCollateral = msg.value;

        emit PurchaseListen(true);                              //notify client that transaction is complete
    }

    function confirmTransaction(uint objectId) public {
        address owner = objects[objectId].owner;
        address buyer = objects[objectId].buyer;
        uint amount = objects[objectId].sellerCollateral + objects[objectId].buyerCollateral;
        uint adminFee = (objects[objectId].sellerCollateral + objects[objectId].buyerCollateral) / 100;

        owner.transfer(amount - adminFee);                      //send seller his collateral + the selling price - adminFee
        adminAddress.transfer(adminFee);                        //send admin the adminFee
        
        objects[objectId].owner = buyer;                        //assign buyer as new owner        
        objects[objectId].buyer = address(0);                   //delete buyer
        objects[objectId].sellerCollateral = uint(0);           //and both collaterals
        objects[objectId].buyerCollateral = uint(0);

        emit PurchaseListen(true);                              //notify client that purchase is confirmed
    }
    //allocates the msg.value to the contract and tracks the amount, to later send it back to seller (collateral)
    function registerObject(uint objectId, address owner, string status) public payable {
        objects[objectId] = Object(owner, address(0), status, msg.value, uint(0));

        emit PurchaseListen(true);
    }

    function getObject(uint objectId) public view returns (address owner, string status ) {
        owner = objects[objectId].owner;
        status = objects[objectId].status;
        return (owner, status);
    }

}