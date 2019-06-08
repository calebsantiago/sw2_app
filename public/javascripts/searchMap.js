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
    controlUI.title = 'Cerrar mapa';
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
        document.getElementById('map').disabled = true;
        document.getElementById('map').style.display = 'none';
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
    var infowindow = new google.maps.InfoWindow();
    var myLatlng = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        zoom: 16,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var closeControlDiv = document.createElement('div');
    var closeControl = new CloseControl(closeControlDiv, map);
    closeControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(closeControlDiv);
    var markers = [providers.length];
    for (var i = 0; i < providers.length; i++) {
        markers[i] = new google.maps.Marker({
            position: new google.maps.LatLng(providers[i].latitude, providers[i].longitude),
            map: map,
            draggable: false,
            title: providers[i].title,
            id: providers[i].id,
            firstname: providers[i].firstname,
            lastname: providers[i].lastname,
            description: providers[i].description
        });
        markers[i].addListener('click', function() {
            var contentString = '<div id = "container" class = "p-1 m-0">'+
                                    '<form id = "form" action = /searchservice/requestquotation/'+ this.id +' method = "post" class = "" onsubmit = "return validateQuotation()">'+
                                        '<h4 class = "display-5 text-center p-0 m-1">'+this.title+'</h3>'+
                                        '<p class = "text-center p-0 m-1">'+this.firstname+' '+this.lastname+'</p>'+
                                        '<p class = "text-center p-0 m-1">'+this.description+'</p>'+                        
                                        '<input type = "text" id = "provider" name = "provider" placeholder = "provider" value = '+ this.id +' style = "display:none;" required>'+
                                        '<input type = "text" id = "service" name = "service" placeholder = "service" value = '+ this.title +' style = "display:none;" required>'+
                                        '<div class = "form-group p-0 m-1" style = "display:block;">'+
                                            '<input type = "date" id = "date" name = "date" placeholder = "fecha" class = "form-control form-control-sm" autofocus required>'+
                                            '<small class = "form-text text-muted">* campo obligatorio</small>'+
                                        '</div>'+
                                        '<div class = "form-group p-0 m-1" style = "display:block;">'+
                                            '<textarea id = "description" name = "description" placeholder = "descripción" class = "form-control form-control-sm" required></textarea>'+
                                            '<small class = "form-text text-muted">* campo obligatorio</small>'+
                                        '</div>'+
                                        '<div class = "form-group p-0 m-1" style = "display:block;">'+
                                            '<input type = "url" id = "image" name = "image" placeholder = "link imagen" class = "form-control form-control-sm">'+
                                        '</div>'+
                                        '<div class = "form-group p-0 m-1" style = "display:block;">'+
                                            '<input type = "submit" value = "cotizar servicio" class = "btn btn-primary btn-sm btn-block">'+
                                        '</div>'+
                                    '</form>'+
                                '</div>';
            infowindow.close();
            infowindow.setContent(contentString);
            infowindow.open(map, this);
        });
    }
    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        draggable: false,
        icon: image,
        title: 'Mi dirección'
    });
    infowindow.setContent(marker.title);
    infowindow.open(map, marker);
    marker.addListener('click', function() {
        infowindow.close();
        infowindow.setContent(marker.title);
        infowindow.open(map, marker);
    });
}