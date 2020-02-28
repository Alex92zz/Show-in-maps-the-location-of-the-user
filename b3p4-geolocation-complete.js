// Execute in strict mode to prevent some common mistakes
"use strict";

// Make Google Maps image URL for a given location
function makeGoogleUrl(latitude, longitude) {
    var point = latitude + "," + longitude;
    return (
        "https://maps.googleapis.com/maps/api/staticmap?markers=color:blue%7Clabel:X%7C" +
        point +
        "&zoom=13&size=600x300"
    );

    // For information on this service see:
    // https://developers.google.com/maps/documentation/maps-static/dev-guide#Markers
}

// Make Yandex Maps image URL for a given location
function makeYandexUrl(latitude, longitude) {
    // Yandex uses longitude,latitude, not latitude,longitude!
    var point = longitude + "," + latitude;
    return (
        "https://static-maps.yandex.ru/1.x/?l=map&lang=en_US&ll=" +
        point +
        "&z=10&size=600,300&pt=" +
        point +
        ",pm2rdl1"
    );

    // For information on this service see:
    // https://tech.yandex.com/maps/doc/staticapi/1.x/dg/concepts/input_params-docpage/
}

function viewLocation() {
    // Create variables referring to DOM elements we want to use in this function
    var mapElement = document.getElementById("map");

    // Check that geolocation is available in JavaScript
    if (!navigator.geolocation) {
        mapElement.innerHTML =
            "<p>Geolocation is not supported by your browser!</p>";
        return;
    }

    // Create a success callback which will receive a Position object
    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Show result as co-ordinates
        mapElement.innerHTML =
            "<p>Latitude is " +
            latitude +
            "° <br>Longitude is " +
            longitude +
            "°</p>";

        var img = new Image();

        // Show result as a Google Maps map in an <img> element
        // This now requires an API key and billing account so we will use Yandex instead
        // img.src = makeGoogleUrl(latitude, longitude);

        // Show result as a Yandex Maps map in an <img> element
        img.src = makeYandexUrl(latitude, longitude);

        // Add the image to the page
        mapElement.appendChild(img);
    }

    // Create an error callback for when location is unavailable or permission denied
    function error(ex) {
        mapElement.innerHTML = "<p>Unable to retrieve location!</p>";
    }

    // Call the geolocation API passing our callbacks...
    navigator.geolocation.getCurrentPosition(success, error);

    // ...and display a message to show things are happening
    // This replaces any current contents, including the last image
    mapElement.innerHTML = "<p>Locating...</p>";
}

// Function to connect event listeners
function initialize() {
    // Connect function to handle View Location button click
    var locationButton = document.getElementById("js-location");
    locationButton.addEventListener("click", viewLocation);
}

// Connect event listeners when the page loads
window.addEventListener("load", initialize);
