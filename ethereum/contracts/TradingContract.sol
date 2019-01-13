pragma solidity ^0.4.25; 

contract TradingContract {

    address adminAddress = 0xa9C3f40905a01240F63AA2b27375b5D43Dcd64E5;
    
    struct Object {
        address owner;
        string uid;
        address buyer;
        string status;          //"new", "used", "damaged"
        uint sellerCollateral;
        uint buyerCollateral;
        uint price;
    }

    //notifies client that a transaction occurred
    event PurchaseListen(
        bool confirmed
    );

    mapping (uint => Object) public objects;

    mapping (string => address[]) ownerHistory;
    
    //allocates buyerCollateral to contract and tracks amount in the Object to send it to seller later
    function tradeObject(address buyerAdd, uint objectId, string newStatus) public payable {
        objects[objectId].buyer = buyerAdd;
        objects[objectId].status = newStatus;
        objects[objectId].buyerCollateral = msg.value / 3;
        objects[objectId].price = msg.value / 3 * 2;

        emit PurchaseListen(true);                              //notify client that transaction is complete
    }

    function confirmTransaction(uint objectId) public {
        require(msg.sender == objects[objectId].buyer, "You need to be the registered buyer to confirm this transaction");
        
        //assign the owners from arguments to variables
        address owner = objects[objectId].owner;
        address buyer = objects[objectId].buyer;
        objects[objectId].owner = buyer; 
        objects[objectId].buyer = address(0);
        
        //assign the correct amounts to variables to prevent Checks-Effects-Interaction violation (double spending)
        //immediately set values in mapping = 0
        uint adminFee = objects[objectId].price / 100;
        uint sellerAmount = objects[objectId].price + objects[objectId].sellerCollateral - adminFee;
        objects[objectId].sellerCollateral = uint(0); 
        objects[objectId].price = uint(0);
        uint buyerCollateral = objects[objectId].buyerCollateral;
        objects[objectId].buyerCollateral = uint(0);

        //emit Event before transaction to prevent multiple calls. If transfer fails it will cause a revert and no event is emitted
        emit PurchaseListen(true);
        
        //push new owner's address to item history (owner is already newly allocated)
        ownerHistory[objects[objectId].uid].push(objects[objectId].owner);

        //send funds
        owner.transfer(sellerAmount);         
        buyer.transfer(buyerCollateral);      
        adminAddress.transfer(adminFee);
    }
    
    //allocates the msg.value to the contract and tracks the amount, to later send it back to seller (collateral)
    function registerObject(string uid, uint objectId, address owner, string status) public payable {
        objects[objectId] = Object(owner, uid, address(0), status, msg.value, uint(0), uint(0));

        ownerHistory[uid].push(owner);

        emit PurchaseListen(true);
    }

    function getObject(uint objectId) public view returns (address owner, string uid, address buyer, string status, 
    uint sellerCollateral, uint buyerCollateral, uint price ) {
        owner = objects[objectId].owner;
        uid = objects[objectId].uid;
        buyer = objects[objectId].buyer;
        status = objects[objectId].status;
        sellerCollateral = objects[objectId].sellerCollateral;
        buyerCollateral = objects[objectId].buyerCollateral;
        price = objects[objectId].price;
        return (owner, uid, buyer, status, sellerCollateral, buyerCollateral, price);
    }

    function releaseSellerCollateral(uint objectId) public {
        objects[objectId].owner.transfer(objects[objectId].sellerCollateral);
    }

    //in case any funds get lost on an item, admin can recover them
    function recoverItemFunds(uint objectId) public {
        require(msg.sender == adminAddress, "You need to be an admin to do this");
        adminAddress.transfer(objects[objectId].sellerCollateral + objects[objectId].buyerCollateral);
    }

    //return owner history of an object
    function viewOwnerHistory (string uid) public view returns(address[] owners){
        return ownerHistory[uid];
    }
}