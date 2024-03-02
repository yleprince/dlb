const accessToken = 'pk.eyJ1IjoieXJpZWl4IiwiYSI6ImNsc3J6ZW9hMjBqa2YycnMwMmhkaXY0bHQifQ.QtR_jFBuX04GFbnmot7yEg';

const tilesStreet = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=' + accessToken, {
    tileSize: 512,
    zoomOffset: -1
});

const tilesSatellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=' + accessToken, {
    tileSize: 512,
    zoomOffset: -1
});

const tileStyles = {
    "Plan": tilesStreet,
    "Satellite": tilesSatellite
};

const dlbIcon = L.icon({
    iconUrl: 'https://yrieix.com/dlb/assets/dlb-marker.png', //200x67
    iconSize:     [100, 33], // size of the icon
    iconAnchor:   [100, 33], // point of the icon which will correspond to marker's location
    popupAnchor:  [-50, -33] // point from which the popup should open relative to the iconAnchor
});

const dlbIconRight = L.icon({
    iconUrl: 'https://yrieix.com/dlb/assets/dlb-marker-right.png', // 200x73
    iconSize:     [100, 36], // size of the icon
    iconAnchor:   [0, 36], // point of the icon which will correspond to marker's location
    popupAnchor:  [50, -36] // point from which the popup should open relative to the iconAnchor
});

const dlbIconBottom = L.icon({
    iconUrl: 'https://yrieix.com/dlb/assets/dlb-marker-bottom.png', // 206x69
    iconSize:     [103, 34], // size of the icon
    iconAnchor:   [103, 0], // point of the icon which will correspond to marker's location
    popupAnchor:  [-51, 0] // point from which the popup should open relative to the iconAnchor
});

const markersData = [{
    "title": "DLB Siège",
    "name": "DLB Siège",
    "address": "10 Carrefour Charles de Gaulle, 94380 Bonneuil-sur-Marne",
    "lat": 48.76818647898846, 
    "lng": 2.4867692824175784,
    "icon": dlbIconRight
},{
    "title": "Centre de recyclage",
    "name": "DLB Limeil-Brévannes",
    "address": "Voie de Liaison RD 110 La Plage Bleue, 94450 Limeil-Brévannes",
    "lat": 48.75490285682215,
    "lng": 2.4683234422715117,
    "icon": dlbIconBottom
},{
    "title": "Centre de recyclage",
    "name": "DLB Gonesse",
    "address": "Chemin des Postes RN 370 ZAC des Tulipes Nord, 95500 Gonesse",
    "lat": 48.96430275566252,
    "lng": 2.466383974760414,
    "icon": dlbIcon
},{
    "title": "Piketty",
    "name": "Piketty",
    "address": "19 Rue Georges Villette, 77250 Écuelles",
    "lat": 48.35697648493405,
    "lng": 2.8243192642272037,
    "icon": dlbIcon
},{
    "title": "Centre de recyclage",
    "name": "DLB Pont-sur-Yonne",
    "address": "Quai des Veuves, 89140 Pont-sur-Yonne",
    "lat": 48.295307843006256,
    "lng": 3.2030360157613935,
    "icon": dlbIcon
}]

document.addEventListener("DOMContentLoaded", function() {
    const siteSelector = document.getElementById("site-select");

    markersData.forEach((marker, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = marker.name;
        siteSelector.appendChild(option);
    })
});

document.getElementById("site-select").addEventListener("change", function() {
    const index = this.value;
    const marker = markers[index];

    const position = marker.getLatLng();
    marker.openPopup();
    map.flyTo([position.lat, position.lng], 14);
})

const markers = markersData.map(marker => {
        const address = marker.address.split(",").join("<br />")
        const popupContent = `
                    <b>${marker.title}</b><br />
                    ${address}
                `;
        return L.marker([marker.lat, marker.lng], {icon: marker.icon})
            .bindPopup(popupContent);
    });

const markersLayer = L.layerGroup(markers);

const map = L.map('map', {layers: [tilesStreet, markersLayer]})
    .setView([48.680601421694156, 2.745480675466544], 9);

var layerControl = L.control.layers(tileStyles).addTo(map);
