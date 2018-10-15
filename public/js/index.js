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


// Hide #thank_you div
$('#thank_you').hide();

// Attach submit button to addTicket function
var submit_ticket_button = $('#submit_ticket');
submit_ticket_button.click(addTicket);

// Checks for phone number formatting
const isNumericInput = (event) => {
    const key = event.keyCode;
    return ((key >= 48 && key <= 57) || // Allow number line
        (key >= 96 && key <= 105) // Allow number pad
    );
};

const isModifierKey = (event) => {
    const key = event.keyCode;
    return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
        (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Allow left, up, right, down
        (
            // Allow Ctrl/Command + A,C,V,X,Z
            (event.ctrlKey === true || event.metaKey === true) &&
            (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
        )
};

const enforceFormat = (event) => {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if (!isNumericInput(event) && !isModifierKey(event)) {
        event.preventDefault();
    }
};

const formatToPhone = (event) => {
    if (isModifierKey(event)) { return; }

    // I am lazy and don't like to type things more than once
    const target = event.target;
    const input = event.target.value.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length > 6) { target.value = `(${zip}) ${middle} - ${last}`; }
    else if (input.length > 3) { target.value = `(${zip}) ${middle}`; }
    else if (input.length > 0) { target.value = `(${zip}`; }
};

// Format phone number nicely
const inputElement = document.getElementById('phone_field');
inputElement.addEventListener('keydown', enforceFormat);
inputElement.addEventListener('keyup', formatToPhone);

// Add a new ticket
function addTicket() {
    var first_name = $('#first_name_field').val();
    var last_name = $('#last_name_field').val();
    var request = $('#request_field').val();

    db.collection("tickets").add({
        first: first_name,
        last: last_name,
        request: request
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            // Hide form and present a "Tank you!" message
            $('#request_form').hide(500);
            $('#thank_you').show();
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}