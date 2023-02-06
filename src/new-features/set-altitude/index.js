
var baseLayer = new maptalks.TileLayer('base', {
  urlTemplate: '$(urlTemplate)',
  subdomains: $(subdomains),
  attribution: '$(attribution)'
});
var map = new maptalks.Map('map', {
  center: [114.26012989831725, 30.616193225646924],
  zoom: 18,
  pitch: 60,
  attribution: true,
  zoomControl: true,
  baseLayer: baseLayer
});
map.on('click', function (e) {
  console.log(e);
});

var offset = 0.001;
var center = map.getCenter();
var c1 = center.add(-offset, 0);

var c2 = center.add(offset, 0);

var layer = new maptalks.VectorLayer('layer', {
  enableAltitude: true
}).addTo(map);
var point = new maptalks.Marker(c1);
layer.addGeometry(point);

var uiMarker = new maptalks.ui.UIMarker(c2, {
  content: '<div class="text-marker">maptalks</div>',
  dy: -36
});
uiMarker.addTo(map);

function getEle(selector) {
  return document.querySelector(selector);
}

function on(ele, type, hanlder) {
  ele.addEventListener(type, hanlder);
}

on(getEle('#altitude'), 'change', function (e) {
  [point, uiMarker].forEach(function (marker) {
    marker.setAltitude(parseFloat(e.target.value));
  });
});

