
var baseLayer = new maptalks.TileLayer('base', {
  urlTemplate: '$(urlTemplate)',
  subdomains: $(subdomains),
  attribution: '$(attribution)'
});
var map = new maptalks.Map('map', {
  center: [104.26012989831725, 30.616193225646924],
  zoom: 6,
  pitch: 0,
  attribution: true,
  zoomControl: true,
  baseLayer: baseLayer
});

var layer = new maptalks.VectorLayer('layer', {}).addTo(map);

var rs = maptalks.ResourceManager;
//set resource root url for get resouce
rs.setRootUrl('./../');
// set remote url for root url , If your project needs it
// 例如你的静态资源托管在云服务
// For example, your static resources are hosted in cloud services
// rs.setRootUrl('https://abc.com/resouces/');

//add res to cache,you can add any res to cache
rs.add('maptalks', 'icons/raw/13678959.png');
rs.add('cat', 'icons/raw/13678919.jfif');
rs.add('dog', 'icons/raw/25998927.jfif');
//add remote res
rs.add('tile', 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/17/53500/109421');
//add base64 res
rs.add('location', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABRVJREFUaEPVWG2IVFUYft67c8+sBhUrkaZzZ0LduXeFCiOStGCttIJAspT8UUlEVoiGbAkaGUmgWaj0CdEnJEXgD/tYywXF1CLa0tCdXbXWM9taP/pAXHXO7Nw37t01t5ide86du0H3733e52PeOe859xD+5w8l7f+nHBrLfuMcH34TmCcA1MSgs4D/e4qs3wA+Pl2qI0npJhKgcyIuG2/bC0E0F8A9UeYIOAxgB/u0x+0rtUfha72vO0CXYz9MoFUApscxQsA7vo8XvD71Q8z6OGVAdyZ1I5O1FsC8eAz/qDpNwKa8VM+YcsXqQJdjP0SglwHYpoIR+J2uVLeZcBoH6HbE0wysMxExxJ5ypbpEt8YoQCGbmgu2OnTJ4+IIvCsvy7fq1GsH6MnZ17BPBxho1CFOALPBlWp1FI92gIIjdia0YKM8jXy/2JXqw7rH6PCofM1EOSHsNyeluqEVGByNL7ID4SYlxL64cz6BIKtdqTbEDtDjpJf74K11GPkWwCQAV8ThYOCYJ9Wom2RkBwoZ8SkIt5uIE3AchDbLVh3Tj+FUUHvUES0V8HKAlplwBVj2/Vavb3B3tbqaAYpTMG7AEmdMBAlYV2tHHQoSnoVMno2uVE8aB+hxGm/x4X+hq0TAu3mp7o/CH55iX99g0VdRuAvvaZ8rS3OMAxQcsQjAB5pCp+2UNWPqj+ekDt5wR+9ypWoxD5CxHwHRKzqGAOx3pZqticWRjFhgEbbr4An8a16WJ8YIINaAsF5HBODNriw/rocFvsvh0nG++EMTX3alEjEC2EtB9KaOCDO2eUW1RAd7YSrpLWZmSK+osuYBnNRswPpSyxSjxy2qvBYWQCFrPwimN3TwDHzuSTXfOEBvdvykczzYryMSYCyituYTpU06+IIjgg1upg4W4C2uLK80DhAUFBxxEkDVBVSNMDXY4EzrP1usZayQEZ+BoP3hYoFWNMtS1dNA5E7c7aT3MrjqDB7NZMXnWTP6yl9Xe19w7M0ArdD75YdQFujOZln6OFYHujP2o0zh56PRE+zIFcbBUoPaLWDnGiqYBcLdAN1sSHTo0Ak1cxFQiRUguOcp+aITgGcknBiYVrqytGU0usi/ULgOsuk2MG9MzJM+0fE/hZo5a/hAGKsDQVHXZEwgS3SC4Ohr149kxhqvqJ6rxaTVgYDA8OxSv3ugP23Z117ZO/BLIgEOXo6L0ul0OwwnUtwkDF7myfLrUfXaHQi7kLGvY6LgLrMpiri+97zVlWWtUWsUIFwPGfsBInqrPoO1qrkjuBMigHU0jAOEU8kRwURq0xEwxJxkH/NNLnpjBRgO8QmAOwwN1oQzY4lXVNtMOGMHOJpJT60Q7wKQMxEcFctY7xbVU6ZcsQMMLWqxgDW/qmr+6xnbvaK6y9R8gK8rQPhXyoq1YDwbR3y4ptunVGvLiTPBqdf4qTtA2ImseJ8Z9xqrD5005zXLkvbNx781EglwdBourpTFXjCuMglBTKvyxdKLJjVjEmBoKoWfn8HtWUrHEANve1It1cHWwiTSgfMChYy9DESvapiKvHXW4AghiQYYmkz2S0z0WA0DA5bFc5p7y9/rmvzPOnBeqNux9zDopmrCBL4vL8vvJWF+TDoQkHZNTjdTAx+ocuh73pXqiaTMj1mAMERWLCTGR3+bZbS7RWV0Ta8TNPE1MFJ0xEfQ/lKlYfHVP5/t0zFlghnTAGEnco05r/dcr4kpE+yYBzAxEwf7F9V4nkBa8yTJAAAAAElFTkSuQmCC');

// The old way,Note that requests for these resources will not go through the ResourceManager
//常规用法
function test() {

  function createMarer(c, url, properties) {
    return new maptalks.Marker(c, {
      symbol: {
        markerFile: url,
        markerWidth: 25,
        markerHeight: 25,
        textName: 'Common usage',
        textHaloFill: '#fff',
        textHaloRadius: 1
      },
      properties: properties || {}
    });
  }


  var center = map.getCenter();
  var c1 = center.add(0, -1);

  var p1 = createMarer(c1, './../icons/raw/13678959.png');
  p1.addTo(layer);

  var c2 = c1.add(1, 0);
  var p2 = createMarer(c2, './../icons/raw/13678919.jfif');
  p2.addTo(layer);

  var c3 = c2.add(1, 0);
  var p3 = createMarer(c3, './../icons/raw/25998927.jfif');
  p3.addTo(layer);


  var c4 = c3.add(1, 0);
  //Read dynamically  value from properties
  var p4 = createMarer(c4, '{iconName}', { iconName: './../icons/raw/13678959.png' });
  p4.addTo(layer);

  var c5 = c4.add(1, 0);
  //Read dynamically  value from properties
  var p5 = createMarer(c5, '{iconName}', { iconName: './../icons/raw/13678919.jfif' });
  p5.addTo(layer);


  var c6 = c5.add(1, 0);
  //Read dynamically  value from properties
  var p6 = createMarer(c6, '{iconName}', { iconName: './../icons/raw/25998927.jfif' });
  p6.addTo(layer);

}

//get from ResourceManager
//利用 $ 直接从 ResourceManager 取值
function test1() {

  function createMarer(c, url, properties) {
    return new maptalks.Marker(c, {
      symbol: {
        markerFile: url,
        markerWidth: 25,
        markerHeight: 25,
        textName: 'usage $ get data',
        textHaloFill: '#fff',
        textHaloRadius: 1
      },
      properties: properties || {}
    });
  }

  var center = map.getCenter();
  var c1 = center.add(0, 0);

  // Use expression($) get value
  //get from cache,If it is not found in the cache, it will directly link the address with the rootUrl
  var p1 = createMarer(c1, '$icons/raw/13678959.png');
  p1.addTo(layer);

  var c2 = c1.add(1, 0);
  // Use expression($) get value
  var p2 = createMarer(c2, '$cat');
  p2.addTo(layer);


  // Use expression($) get value
  var c3 = c2.add(1, 0);
  var p3 = createMarer(c3, '$dog');
  p3.addTo(layer);


  //Read dynamically expression value from properties
  var c4 = c3.add(1, 0);
  var p4 = createMarer(c4, '{iconName}', { iconName: '$maptalks' });
  p4.addTo(layer);

  //Read dynamically expression value from properties
  var c5 = c4.add(1, 0);
  var p5 = createMarer(c5, '{iconName}', { iconName: '$cat' });
  p5.addTo(layer);

  //Read dynamically expression value from properties
  var c6 = c5.add(1, 0);
  var p6 = createMarer(c6, '{iconName}', { iconName: '$tile' });
  p6.addTo(layer);

  //Read dynamically expression value from properties
  var c7 = c6.add(1, 0);
  var p7 = createMarer(c7, '{iconName}', { iconName: '$location' });
  p7.addTo(layer);
}


//get from ResourceManager,data form loadSprite
//测试加载sprite资源,里面用到的icon都是来自sprite
function testSprite(icons) {

  function createMarer(c, url, properties) {
    return new maptalks.Marker(c, {
      symbol: {
        markerFile: url,
        markerWidth: 25,
        markerHeight: 25,
        textName: 'data from loadSprite',
        textHaloFill: '#fff',
        textHaloRadius: 1
      },
      properties: properties || {}
    });
  }


  //icons info from sprite
  console.log(icons);

  var center = map.getCenter();
  // Use expression($) get value
  var c1 = center.add(0, 1);
  var p1 = createMarer(c1, '$VIP');
  p1.addTo(layer);

  // Use expression($) get value
  var c2 = c1.add(1, 0);
  var p2 = createMarer(c2, '$caiyi');
  p2.addTo(layer);

  // Use expression($) get value
  var c3 = c2.add(1, 0);
  var p3 = createMarer(c3, '$chongzhi');
  p3.addTo(layer);

  //Read dynamically expression value from properties
  var c4 = c3.add(1, 0);
  var p4 = createMarer(c4, '{iconName}', { iconName: '$daka' });
  p4.addTo(layer);

  //Read dynamically expression value from properties
  var c5 = c4.add(1, 0);
  var p5 = createMarer(c5, '{iconName}', { iconName: '$dazhaohu' });
  p5.addTo(layer);

  //Read dynamically expression value from properties
  var c6 = c5.add(1, 0);
  var p6 = createMarer(c6, '{iconName}', { iconName: '$dengji' });
  p6.addTo(layer);

  //view all res
  console.log(rs.all());
}
//get from ResourceManager,data form loadSvgs
//测试加载svgs,里面用到的资源都是来自loadSvgs
function testSvgs(data) {

  function createMarer(c, url, properties) {
    return new maptalks.Marker(c, {
      symbol: {
        markerType: 'path',
        markerPath: url,
        'markerPathWidth': 1024,
        'markerPathHeight': 1024,
        'markerWidth': 25,
        'markerHeight': 25,
        textName: 'data from loadSvgs',
        textHaloFill: '#fff',
        textHaloRadius: 1
      },
      properties: properties || {}
    });
  }


  //icons info from svgs
  console.log(data);

  var center = map.getCenter();
  // Use expression($) get value
  var c1 = center.add(0, 2);
  var p1 = createMarer(c1, '$anjian.svg');
  p1.addTo(layer);

  // Use expression($) get value
  var c2 = c1.add(1, 0);
  var p2 = createMarer(c2, '$anquan.svg');
  p2.addTo(layer);

  // Use expression($) get value
  var c3 = c2.add(1, 0);
  var p3 = createMarer(c3, '$huiyuan.svg');
  p3.addTo(layer);

  //Read dynamically expression value from properties
  var c4 = c3.add(1, 0);
  var p4 = createMarer(c4, '{iconName}', { iconName: '$anjian.svg' });
  p4.addTo(layer);

  //Read dynamically expression value from properties
  var c5 = c4.add(1, 0);
  var p5 = createMarer(c5, '{iconName}', { iconName: '$anquan.svg' });
  p5.addTo(layer);

  //Read dynamically expression value from properties
  var c6 = c5.add(1, 0);
  var p6 = createMarer(c6, '{iconName}', { iconName: '$huiyuan.svg' });
  p6.addTo(layer);

}
test();
test1();
//load sprite icons,sprite icons will auto add to cache
// how to create sprite resource: https://deyihu.github.io/sprite-creator/
// If you have a large number of icons in your business, you can make them into sprites, 
// which can greatly reduce network requests and thus have better performance
rs.loadSprite({
  imgUrl: rs.get('sprite/raw/sprite.png'),
  jsonUrl: rs.get('sprite/raw/sprite.json')
}).then(testSprite).catch(function (err) {
  console.log(err);
});

//loadSvgs support load svg files/svg collection json/svg symbol dom list

//1.load files
// load svgs resource,all svg auto add to ResourceManager cache,Note that all svg resources need to be placed in the rooturl directory
// rs.loadSvgs([
//   'svgs/raw/anjian.svg', 'svgs/raw/anquan.svg', 'svgs/raw/huiyuan.svg'
// ]).then(testSvgs).catch(function (err) {
//   console.log(err);
// });

//2.load svg collection json
//If there are a lot of svg icons, you can use https://deyihu.github.io/sprite-creator/svg.html to create svgs collection json
rs.loadSvgs(rs.get('svgs/raw/svg-collection.json')).then(testSvgs).catch(function (err) {
  console.log(err);
});

// 3. load symbol dom list




