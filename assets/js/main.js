

function initMap() {
  var laboratoriaLima = {lat: -12.1191427, lng: -77.03349046};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: laboratoriaLima,
  });
  var marker = new google.maps.Marker({
    position: laboratoriaLima,
    map: map
  });
   function buscar() {
     if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(funcionExito,funcionError);
     }
     marker.setMap(null);
   }
   var latitud,longitud,miUbicacion,map;
   var funcionExito=function(posicion){
     latitud=posicion.coords.latitude;
     longitud=posicion.coords.longitude;
    //  map = new google.maps.Map(document.getElementById('map'));

     miUbicacion= new google.maps.Marker({
       position: {lat:latitud, lng:longitud},
       map: map
     });
     map.setZoom(18);
     map.setCenter({lat:latitud, lng:longitud});
   }
   var funcionError=function(error) {
     alert("tenemos un problema para encontar tu ubicacion")
   };
   var boton= document.getElementById("encuentrame");
   boton.addEventListener("click",buscar);
   var tarifa=document.getElementById("tarifa")
   var partida= document.getElementById("partida");
   var destino= document.getElementById("destino");
   new google.maps.places.Autocomplete(partida);
   new google.maps.places.Autocomplete(destino);
   var directionsService=new google.maps.DirectionsService;
   var directionsDisplay=new google.maps.DirectionsRenderer;
   var calculateAndDisplayRoute=function(directionsService, directionsDisplay){
     directionsService.route({
       origin:partida.value,
       destination: destino.value,
       travelMode:"DRIVING",
     },function (response,status){
       if(status==="OK"){
         var distancia=
         Number((response.routes[0].legs[0].distance.text.replace("km","")).replace(",",""))
         tarifa.classList.remove("none");
         var costo=distancia*1.75;
         if (costo<4) {
           tarifa.innerHTML="S/.4";
         }
         tarifa.innerHTML="S/. "+parseInt(costo);

         directionsDisplay.setDirections(response);
         marker.setMap(null);
         miUbicacion.setMap(null);
       }else {
         window.alert("No encontramos tu ruta")
       }
     })
   }
   directionsDisplay.setMap(map);
   var trazarRuta=function(){
     calculateAndDisplayRoute(directionsService, directionsDisplay);
   }
   document.getElementById("ruta").addEventListener("click",trazarRuta);
 }
