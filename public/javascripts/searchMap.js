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
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '16px';
    controlText.style.paddingLeft = '0px';
    controlText.style.paddingRight = '0px';
    controlText.innerHTML = 'X';
    controlUI.appendChild(controlText);
    controlUI.addEventListener('click', function() {
        document.getElementById("map").disabled = true;
        document.getElementById("map").style.display = "none";
    });
}

function searchMap() {
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
}