
// The Firebase imports and initializing the app
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/*
==============================================================================
==                           Importnig needed files                         ==
============================================================================== 
*/
const deleteUserOrder = require('./deleteUserOrder.js')
const deleteUserOrderItem = require('./deleteUserOrderItem.js')
const getOpenOrders = require('./getOpenOrders.js')
const getOrderItemUsers = require('./getOrderItemUsers.js')
const getOrderSum = require('./getOrderSum.js')
const getUserOrders = require('./getUserOrders.js')
const getVenueOrderUsers = require('./getVenueOrderUsers.js')
const putUserOrder = require('./putUserOrder.js')
const putVenueOrder = require('./putVenueOrder.js')
const venues = require('./venues.js')

/*
==============================================================================
==                        Exporting Methods                                 ==
============================================================================== 
*/
// Getting Venues data
exports.addVenue = functions.https.onRequest(venues.addVenue);
exports.listedVenues = functions.https.onRequest(venues.listedVenues);

// Adding Orders
exports.putVenueOrder = functions.https.onRequest(putVenueOrder.handler);
exports.putUserOrder = functions.https.onRequest(putUserOrder.handler);

// Venue Order
exports.getOpenOrders = functions.https.onRequest(getOpenOrders.handler);
exports.getOrderSum = functions.https.onRequest(getOrderSum.handler);
exports.getOrderItemUsers = functions.https.onRequest(getOrderItemUsers.handler);
exports.getVenueOrderUsers = functions.https.onRequest(getVenueOrderUsers.handler);

// Usere Order
exports.getUserOrders = functions.https.onRequest(getUserOrders.handler);
exports.deleteUserOrderItem = functions.https.onRequest(deleteUserOrderItem.handler);
exports.deleteUserOrder = functions.https.onRequest(deleteUserOrder.handler);
