'use strict';
var Firebase = require('firebase');
var database = new Firebase('https://pocspike.firebaseio.com/');
var ref = database.child('test');

ref.set(null);

database.once("value", function(snapshot) {
  console.log('The database contains: ', snapshot.val());
  process.exit();
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
  process.exit();
});
