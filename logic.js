// Steps to complete:

// 1. Create Firebase link.
// 2. Create initial Clan and Member data in database.
// 3. Collect new data from CoC API - then update the html and if Donations < currentDonations, update the database by moving the current Dataset to the archival Dataset as a new record.
// 4. Create a way to retrieve (CoC data).
// 5. Create a way to move Former Members into another (table?) database object. One that can list reason(s) for departure, and if they are allowed back or banned.

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDBSFiLtenPBPGVfOAQxP4LDtbX0GfOqC8",
  authDomain: "bantracker-8ac4c.firebaseapp.com",
  databaseURL: "https://bantracker-8ac4c.firebaseio.com",
// Tues 12/5 - storageBucket magically created.
  storageBucket: "bantracker-8ac4c.appspot.com"
};

firebase.initializeApp(config);

var cocData = firebase.database();

// 2. Populate Firebase Database with initial data (in this case, I did this using JSON data collected from a test run with the CoC API.)

// 3. Button for adding data from Postman
$("#add-new-data").on("click", function() {

  // Grabs user input
  var items.tag = $("#tag-input").val().trim();
  var items.name = $("name-input").val().trim();
  var items.role = $("role-input").val().trim();
  var items.expLevel = $("expLevel-input").val().trim();
  var items.clanRank = $("clanRank-input").val().trim();
  var items.donations = $("donations-input").val().trim();
  var items.donationsReceived = $("donationsReceived-input").val().trim();

  // Creates local "temporary" object for holding member data
  var newMemberData = {

    tag: newTag,
    name: newName,
    role: newRole,
    expLevel: newExpLevel
    clanRank: newRank
    donations: newDonations
    donationsReceived: newDonationsRecvd

  };

  // Uploads member data to the database
  cocData.ref().push(newRecord);

  // Logs everything to console
  console.log(newRecord.tag);
  console.log(newRecord.name);
  console.log(newRecord.role);
  console.log(newRecord.expLevel);
  console.log(newRecord.clanRank);
  console.log(newRecord.donations);
  console.log(newRecord.donationsReceived);
  // Alert
  alert("Record successfully added");

  // Determine when the next member arrives.
  return false;
});

// 4. Create Firebase event for adding members to the database and a row in the html when a user adds an entry
cocData.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var cTag = childSnapshot.val().tag;
  var cName = childSnapshot.val().name;
  var cRole = childSnapshot.val().role;
  var cExpLevel = childSnapshot.val().expLevel;
  var cClanRank = childSnapshot.val().clanRank;
  var cDonations = childSnapshot.val().donations;
  var cDonationsReceived = childSnapshot.val().donationsReceived;

  // Add each member's data into the table
  $("#member-table > tbody").append("<tr><td>" + cTag + "</td><td>" + cName + "</td><td>"
  + cRole + "</td><td>" + cExpLevel + "</td><td>" + cClanRank + "</td><td>" + cClanRank "</td><td>" + cDonations "</td><td>" + cDonationsReceived "</td></tr>");
});
