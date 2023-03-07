
var baseLayer = new maptalks.TileLayer('base', {
  urlTemplate: '$(urlTemplate)',
  subdomains: $(subdomains),
  attribution: '$(attribution)'
});
var map = new maptalks.Map('map', {
  center: [104.26012989831725, 30.616193225646924],
  zoom: 9,
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

//get from ResourceManager,data form loadSvgs
//测试加载svgs,里面用到的资源都是来自loadSvgs
function testSvgs(data) {

  function randomCoordinate() {
    var center = map.getCenter();
    var x = center.x, y = center.y;
    return [x + Math.random(), y + Math.random()];
  }

  //icons info from svgs
  console.log(data);
  var markers = data.map(function (d) {
    var name = d.name;
    return new maptalks.Marker(randomCoordinate(), {
      symbol: {
        markerType: 'path',
        markerPath: '$' + name,//use $ get icon data
        'markerPathWidth': 1024,
        'markerPathHeight': 1024,
        'markerWidth': 30,
        'markerHeight': 30
      }
    });
  });
  layer.addGeometry(markers);

  layer.once('layerload', function () {
    map.fitExtent(layer.getExtent());
  });
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed');
  //load svg symbols,data from iconfont https://www.iconfont.cn/
  rs.loadSvgs(document.body.childNodes[0].childNodes).then(testSvgs).catch(function (err) {
    console.log(err);
  });
});


