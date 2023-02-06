
var baseLayer = new maptalks.TileLayer('base', {
  urlTemplate: '$(urlTemplate)',
  subdomains: $(subdomains),
  attribution: '$(attribution)'
});
var map = new maptalks.Map('map', {
  center: [114.26012989831725, 30.616193225646924],
  zoom: 6,
  pitch: 0,
  attribution: true,
  zoomControl: true,
  baseLayer: baseLayer
});



var layer = new maptalks.VectorLayer('layer', {}).addTo(map);

function createMarer(c, url, properties) {
  return new maptalks.Marker(c, {
    symbol: {
      markerFile: url,
      markerWidth: 20,
      markerHeight: 20
    },
    properties: properties
  });
}

var rs = maptalks.ResourceManager;
rs.setRootUrl('./../icons/raw/');

//add res to cache,you can add any res to cache
rs.add('cat', '13678919.jfif');
rs.add('dog', '25998927.jfif');

var center = map.getCenter();
var c1 = center.add(1, 0);
//get from cache,If it is not found in the cache, it will directly link the address with the rootUrl
var p1 = createMarer(c1, rs.get('13678959.png'));
p1.addTo(layer);

var c2 = c1.add(1, 0);
//get from cache
var p2 = createMarer(c2, rs.get('cat'));
p2.addTo(layer);


// Use expression($) get value
var c3 = c2.add(1, 0);
var p3 = createMarer(c3, '$dog');
p3.addTo(layer);

//Read dynamically from properties
var c4 = c3.add(1, 0);
var p4 = createMarer(c4, '{icon}', { icon: 'cat' });
p4.addTo(layer);

//Read dynamically from properties
var c5 = c4.add(1, 0);
var p5 = createMarer(c5, '{icon}', { icon: '13678959.png' });
p5.addTo(layer);

//load sprite icons,sprite icons will add to cache
function loadSprite() {
  rs.loadSprite({
    imgUrl: './../icons/raw/sprite.png',
    jsonUrl: './../icons/raw/sprite.json'
  }).then(testSprite).catch(function (err) {
    console.log(err);
  });
}

function testSprite() {

  //get from cache
  var c1 = center.add(1, 1);
  var p1 = createMarer(c1, rs.get('000'));
  p1.addTo(layer);

  //get from cache
  var c2 = c1.add(1, 1);
  var p2 = createMarer(c2, rs.get('004'));
  p2.addTo(layer);

  // Use expression($) get value
  var c3 = c2.add(1, 1);
  var p3 = createMarer(c3, '$016');
  p3.addTo(layer);

  //Read dynamically from properties
  var c4 = c3.add(1, 1);
  var p4 = createMarer(c4, '{icon}', { icon: '116' });
  p4.addTo(layer);

  //Read dynamically from properties
  var c5 = c4.add(1, 1);
  var p5 = createMarer(c5, '{icon}', { icon: '125' });
  p5.addTo(layer);

  //view all res
  console.log(rs.all());
}

loadSprite();



