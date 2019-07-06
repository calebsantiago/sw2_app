var latProvider;
var lonProvider;
var latClient;
var lonClient;
function setCoords(latProvider, lonProvider, latClient, lonClient) {
    this.latProvider = latProvider;
    this.lonProvider = lonProvider;
    this.latClient = latClient;
    this.lonClient = lonClient;
}
function roadMap() {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: latProvider, lng: lonProvider}
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('right-panel'));
    calculateAndDisplayRoute(directionsService, directionsDisplay);
}
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var start = {lat: latProvider, lng: lonProvider};
    var end = {lat: latClient, lng: lonClient};
    directionsService.route({
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } 
        else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}