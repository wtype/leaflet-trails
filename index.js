const map = L.map('map').setView([43.618, -116.215], 12.5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// create polyline from array of LatLng points
const points = [];
let polyline;

function generateLine() {
  if (polyline) {
    polyline.setLatLngs(points);
  } else {
    polyline = L.polyline(points, {
      color: '#378e70',
      weight: 3.5,
    }).addTo(map);
  }
}

function clearActiveLine() {
  if (polyline) {
    points.splice(0, points.length);
    polyline.setLatLngs(points);
  }
}

map.on('click', e => {
  if (e.originalEvent.target.id === 'clearLine') {
    return;
  }
  const coords = [e.latlng.lat, e.latlng.lng];
  points.push(coords);
  generateLine();
});

document.querySelector('#clearLine').addEventListener('click', clearActiveLine);
