/**
* @constructor
*/
function CloseControl(controlDiv, map) {
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Cerrar el mapa';
    controlDiv.appendChild(controlUI);
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '25px';
    controlText.style.lineHeight = '25px';
    controlText.style.paddingBottom = '3px';
    controlText.style.paddingLeft = '3px';
    controlText.style.paddingRight = '3px';
    controlText.innerHTML = 'x';
    controlUI.appendChild(controlText);
    controlUI.addEventListener('click', function() {
        document.getElementById("map").disabled = true;
        document.getElementById("map").style.display = "none";
    });
}

var latitude;
var longitude;
var providers = [];

function setCoords(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
}

class Provider {
    constructor(id, firstname, lastname, title, description, latitude, longitude) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.title = title;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

function addProvider(id, firstname, lastname, title, description, latitude, longitude) {
    var provider = new Provider(id, firstname, lastname, title, description, latitude, longitude);
    this.providers.push(provider);
}

function searchMap() {
    var myLatlng = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        zoom: 16,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var closeControlDiv = document.createElement('div');
    var closeControl = new CloseControl(closeControlDiv, map);
    closeControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(closeControlDiv);
    var markers = [providers.length];
    var infowindows = [providers.length];
    for (var i = 0; i < providers.length; i++) {
        markers[i] = new google.maps.Marker({
            position: new google.maps.LatLng(providers[i].latitude, providers[i].longitude),
            map: map,
            draggable: false,
            title: providers[i].title
        });
        infowindows[i] = new google.maps.InfoWindow({
            content: markers[i].title
        });
        infowindows[i].open(map, markers[i]);
    }
    /*for (var i = 0; i < providers.length; i++) {
        markers[i].addListener('click', function() {
            var contentString = '<form action = /searchservice/requestquotation/'+ providers[i].id +' method = "post" class = "">'+
                                '<h3>'+providers[i].title+'</h3>'+
                                '<p>'+providers[i].firstname+' '+providers[i].lastname+'</p>'+
                                '<p>'+providers[i].description+'</p>'+                        
                                '<input type = "text" id = "provider" name = "provider" placeholder = "provider" value = '+ providers[i].id +' style = "display:none;" required>'+
                                '<input type = "text" id = "service" name = "service" placeholder = "service" value = '+ providers[i].title +' style = "display:none;" required>'+
                                '<input type = "date" id = "date" name = "date" placeholder = "fecha" autofocus required>'+
                                '</p>'+
                                '<textarea id = "description" name = "description" placeholder = "descripción" required></textarea>'+
                                '</p>'+
                                '<input type = "url" id = "image" name = "image" placeholder = "link imagen">'+
                                '</p>'+
                                '<input type = "submit" value = "cotizar servicio">'+
                            '</form>';
            infowindows[i].setContent(contentString);
            infowindows[i].open(map, markers[i]);
        });
    }*/
    markers[2].addListener('click', function() {
        var contentString = '<form action = /searchservice/requestquotation/'+ providers[2].id +' method = "post" class = "">'+
                            '<h3>'+providers[2].title+'</h3>'+
                            '<p>'+providers[2].firstname+' '+providers[2].lastname+'</p>'+
                            '<p>'+providers[2].description+'</p>'+                        
                            '<input type = "text" id = "provider" name = "provider" placeholder = "provider" value = '+ providers[2].id +' style = "display:none;" required>'+
                            '<input type = "text" id = "service" name = "service" placeholder = "service" value = '+ providers[2].title +' style = "display:none;" required>'+
                            '<input type = "date" id = "date" name = "date" placeholder = "fecha" autofocus required>'+
                            '</p>'+
                            '<textarea id = "description" name = "description" placeholder = "descripción" required></textarea>'+
                            '</p>'+
                            '<input type = "url" id = "image" name = "image" placeholder = "link imagen">'+
                            '</p>'+
                            '<input type = "submit" value = "cotizar servicio">'+
                        '</form>';
        infowindows[2].setContent(contentString);
        infowindows[2].open(map, markers[2]);
    });
    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        draggable: false,
        icon: image,
        title: "Mi dirección"
    });
    var infowindow = new google.maps.InfoWindow({
        content: marker.title
    });
    infowindow.open(map, marker);
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

/*function searchMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            var myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            var geocoder = new google.maps.Geocoder();
            var infowindow = new google.maps.InfoWindow();
            var mapOptions = {
                zoom: 16,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
            var closeControlDiv = document.createElement('div');
            var closeControl = new CloseControl(closeControlDiv, map);
            closeControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(closeControlDiv);
            var marker = new google.maps.Marker({
                map: map,
                position: myLatlng,
                draggable: true 
            }); 
            geocoder.geocode({"latLng": myLatlng }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        $("#latitude,#longitude").show();
                        $("#address").val(results[0].formatted_address);
                        $("#latitude").val(marker.getPosition().lat());
                        $("#longitude").val(marker.getPosition().lng());
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, marker);
                    }
                }
            });
            google.maps.event.addListener(marker, "dragend", function() {
                geocoder.geocode({"latLng": marker.getPosition()}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            $("#address").val(results[0].formatted_address);
                            $("#latitude").val(marker.getPosition().lat());
                            $("#longitude").val(marker.getPosition().lng());
                            infowindow.setContent(results[0].formatted_address);
                            infowindow.open(map, marker);
                        }
                    }
                });
            });
        });
    }
}*/