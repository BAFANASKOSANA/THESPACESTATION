const url = "https://api.wheretheiss.at/v1/satellites/25544";

var map = L.map('map').setView([51.505, -0.09], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 2,
    attribution: '© OpenStreetMap'
}).addTo(map);

var myIcon = L.icon({
    iconUrl: 'assets/img/issicon.png',
    iconSize: [140],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [140],
    shadowAnchor: [22, 94]
});

const marker = L.marker([51.497, -0.09], {icon: myIcon}).addTo(map)
    // .bindPopup('The International Space Station')
    // .openPopup()

const getData = async () => {
  try {
    response = await fetch(url);
    data = await response.json();
    const {latitude, longitude} = data;
    var latlng = L.latLng(latitude, longitude)
    marker.setLatLng(latlng)
    map.setView([latitude,longitude])

  } catch (e) {
    console.log(e)
  }
}

setInterval(()=>{
  getData();
},1000)
