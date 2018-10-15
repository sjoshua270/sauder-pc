// Initialize Firebase
var config = {
    apiKey: "AIzaSyByX-hPtOrg1abnpnp-6PF3rbTX1zy59wI",
    authDomain: "sauder-pc.firebaseapp.com",
    databaseURL: "https://sauder-pc.firebaseio.com",
    projectId: "sauder-pc",
    storageBucket: "sauder-pc.appspot.com",
    messagingSenderId: "208523623170"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

var submit_ticket_button = $('#submit_ticket');
submit_ticket_button.click(addTicket);

var addTicket = function addTicket(){
    var first_name = $('#first_name').val();
    var last_name = $('#last_name').val();

    db.collection("tickets").add({
        userid: "Ada",
        last: "Lovelace",
        born: 1815
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}