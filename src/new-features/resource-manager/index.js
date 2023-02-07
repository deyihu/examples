
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
      markerWidth: 25,
      markerHeight: 25
    },
    properties: properties
  });
}

var rs = maptalks.ResourceManager;
rs.setRootUrl('./../icons/raw/');

//add res to cache,you can add any res to cache
rs.add('cat', '13678919.jfif');
rs.add('dog', '25998927.jfif');
//add remote res
rs.add('tile', 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/17/53500/109421');
//add base64 res
rs.add('location', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABRVJREFUaEPVWG2IVFUYft67c8+sBhUrkaZzZ0LduXeFCiOStGCttIJAspT8UUlEVoiGbAkaGUmgWaj0CdEnJEXgD/tYywXF1CLa0tCdXbXWM9taP/pAXHXO7Nw37t01t5ide86du0H3733e52PeOe859xD+5w8l7f+nHBrLfuMcH34TmCcA1MSgs4D/e4qs3wA+Pl2qI0npJhKgcyIuG2/bC0E0F8A9UeYIOAxgB/u0x+0rtUfha72vO0CXYz9MoFUApscxQsA7vo8XvD71Q8z6OGVAdyZ1I5O1FsC8eAz/qDpNwKa8VM+YcsXqQJdjP0SglwHYpoIR+J2uVLeZcBoH6HbE0wysMxExxJ5ypbpEt8YoQCGbmgu2OnTJ4+IIvCsvy7fq1GsH6MnZ17BPBxho1CFOALPBlWp1FI92gIIjdia0YKM8jXy/2JXqw7rH6PCofM1EOSHsNyeluqEVGByNL7ID4SYlxL64cz6BIKtdqTbEDtDjpJf74K11GPkWwCQAV8ThYOCYJ9Wom2RkBwoZ8SkIt5uIE3AchDbLVh3Tj+FUUHvUES0V8HKAlplwBVj2/Vavb3B3tbqaAYpTMG7AEmdMBAlYV2tHHQoSnoVMno2uVE8aB+hxGm/x4X+hq0TAu3mp7o/CH55iX99g0VdRuAvvaZ8rS3OMAxQcsQjAB5pCp+2UNWPqj+ekDt5wR+9ypWoxD5CxHwHRKzqGAOx3pZqticWRjFhgEbbr4An8a16WJ8YIINaAsF5HBODNriw/rocFvsvh0nG++EMTX3alEjEC2EtB9KaOCDO2eUW1RAd7YSrpLWZmSK+osuYBnNRswPpSyxSjxy2qvBYWQCFrPwimN3TwDHzuSTXfOEBvdvykczzYryMSYCyituYTpU06+IIjgg1upg4W4C2uLK80DhAUFBxxEkDVBVSNMDXY4EzrP1usZayQEZ+BoP3hYoFWNMtS1dNA5E7c7aT3MrjqDB7NZMXnWTP6yl9Xe19w7M0ArdD75YdQFujOZln6OFYHujP2o0zh56PRE+zIFcbBUoPaLWDnGiqYBcLdAN1sSHTo0Ak1cxFQiRUguOcp+aITgGcknBiYVrqytGU0usi/ULgOsuk2MG9MzJM+0fE/hZo5a/hAGKsDQVHXZEwgS3SC4Ohr149kxhqvqJ6rxaTVgYDA8OxSv3ugP23Z117ZO/BLIgEOXo6L0ul0OwwnUtwkDF7myfLrUfXaHQi7kLGvY6LgLrMpiri+97zVlWWtUWsUIFwPGfsBInqrPoO1qrkjuBMigHU0jAOEU8kRwURq0xEwxJxkH/NNLnpjBRgO8QmAOwwN1oQzY4lXVNtMOGMHOJpJT60Q7wKQMxEcFctY7xbVU6ZcsQMMLWqxgDW/qmr+6xnbvaK6y9R8gK8rQPhXyoq1YDwbR3y4ptunVGvLiTPBqdf4qTtA2ImseJ8Z9xqrD5005zXLkvbNx781EglwdBourpTFXjCuMglBTKvyxdKLJjVjEmBoKoWfn8HtWUrHEANve1It1cHWwiTSgfMChYy9DESvapiKvHXW4AghiQYYmkz2S0z0WA0DA5bFc5p7y9/rmvzPOnBeqNux9zDopmrCBL4vL8vvJWF+TDoQkHZNTjdTAx+ocuh73pXqiaTMj1mAMERWLCTGR3+bZbS7RWV0Ta8TNPE1MFJ0xEfQ/lKlYfHVP5/t0zFlghnTAGEnco05r/dcr4kpE+yYBzAxEwf7F9V4nkBa8yTJAAAAAElFTkSuQmCC');

function test() {

  var center = map.getCenter();
  var c1 = center.add(0, 0);
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

  var c6 = c5.add(1, 0);
  var p6 = createMarer(c6, '{icon}', { icon: 'tile' });
  p6.addTo(layer);

  // Use expression($) get value
  var c7 = c6.add(1, 0);
  var p7 = createMarer(c7, '$location');
  p7.addTo(layer);
}

//load sprite icons,sprite icons will auto add to cache
function loadSprite() {
  rs.loadSprite({
    imgUrl: './../icons/raw/sprite.png',
    jsonUrl: './../icons/raw/sprite.json'
  }).then(testSprite).catch(function (err) {
    console.log(err);
  });
}

function testSprite(icons) {
  //icons info
  console.log(icons);

  var center = map.getCenter();
  //get from cache
  var c1 = center.add(0, 1);
  var p1 = createMarer(c1, rs.get('000'));
  p1.addTo(layer);

  //get from cache
  var c2 = c1.add(1, 0);
  var p2 = createMarer(c2, rs.get('004'));
  p2.addTo(layer);

  // Use expression($) get value
  var c3 = c2.add(1, 0);
  var p3 = createMarer(c3, '$016');
  p3.addTo(layer);

  //Read dynamically from properties
  var c4 = c3.add(1, 0);
  var p4 = createMarer(c4, '{icon}', { icon: '116' });
  p4.addTo(layer);

  //Read dynamically from properties
  var c5 = c4.add(1, 0);
  var p5 = createMarer(c5, '{icon}', { icon: '125' });
  p5.addTo(layer);

  // Use expression($) get value
  var c6 = c5.add(1, 0);
  var p6 = createMarer(c6, '$142');
  p6.addTo(layer);

  //view all res
  console.log(rs.all());
}
test();
loadSprite();



