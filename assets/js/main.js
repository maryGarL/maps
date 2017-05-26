function initMap() {
   var laboratoriaLima = {lat: -12.1191427, lng: -77.03349046};
   var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 3,
     center: laboratoriaLima
   });
   var marker = new google.maps.Marker({
     position: laboratoriaLima,
     map: map
   });
 };

function buscar() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(funcionExito,funcionError);
  }
}
var latitud,longitud;
var funcionExito=function(posicion){
  latitud=posicion.coords.latitude;
  longitud=posicion.coords.longitude;
  var map = new google.maps.Map(document.getElementById('map'));
  map.setZoom(18);
  map.setCenter({lat:latitud, lng:longitud});

  var miUbicacion= new google.maps.Marker({
    position: {lat:latitud, lng:longitud},
    map: map
  });
}

  var funcionError=function(error) {
    alert("tenemos un problema para encontar tu ubicacion")
  };


var boton= document.getElementById("encuentrame");
boton.addEventListener("click",buscar);
