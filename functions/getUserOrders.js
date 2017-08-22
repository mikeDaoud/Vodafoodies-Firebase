// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const database = admin.database();

// Returns a list of all the user orders of this user with related data
exports.handler = function(req, res) {
    
  // Getting data from the request
  var userID = req.get("uid");
  var venueOrderID = req.body.venue_order_id

  database.ref().once("value").then(function(snapShot){
    var db = snapShot.val();
    // Getting the Venue Orders
    var venueOrders = []
    if (venueOrderID != undefined) {
      venueOrders = [venueOrderID]
    } else {
      venueOrders = Object.keys(db.users[userID].userOrders);
    }

    // Getting each order's data
    var ordersDetails = []
    for (var i = 0; i < venueOrders.length; i++) {
      var order = {}
      //TODO: Loop on each venue order to get the follwoing data
      // Venue Id, owner data, user order details (item details and count of each size)
      // Veneu Order Data
      var vOrder = db.venueOrders[venueOrders[i]];
      order.venue_order_id = venueOrders[i];
      order.venue_id = vOrder.venue_id
      order.venue_name = db.venues[vOrder.venue_id].venue_name

      // Venue order admin data
      order.venue_order_admin = {}
      order.venue_order_admin.id = vOrder.user_id
      order.venue_order_admin.name = db.users[vOrder.user_id].name
      order.venue_order_admin.phone = db.users[vOrder.user_id].phone
      
      // User ordered items data
      order.items = Object.values(vOrder.userOrders[userID])

      ordersDetails.push(order);
    }

    var resObject = {}
    resObject.status = "Successfull Request"
    resObject.result = ordersDetails
    res.status(200).send(resObject)
  });
  
  };