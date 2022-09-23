var map = new maptalks.Map('map', {
  center: [-0.113049,51.498568],
  zoom: 13,
  attribution: true,
  baseLayer: new maptalks.TileLayer('base', {
    urlTemplate: '$(urlTemplate)',
    subdomains: $(subdomains),
    attribution: '$(attribution)'
  }),
  layers: [
    new maptalks.VectorLayer('v', [new maptalks.Marker([-0.113049,51.498568])])
  ]
});

var mapJSON = map.toJSON();
maptalks.Map.fromJSON('map1', mapJSON);
