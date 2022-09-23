var map = new maptalks.Map('map', {
  center: [-0.113049,51.498568],
  zoom: 14,
  baseLayer: new maptalks.TileLayer('base', {
    urlTemplate: '$(urlTemplate)',
    subdomains: $(subdomains),
    attribution: '$(attribution)'
  })
});

var layer = new maptalks.VectorLayer('vector').addTo(map);
var marker = new maptalks.Marker([-0.113049,51.498568], {
  'symbol' :{
    'markerType' : 'ellipse',
    'markerWidth' : 50,
    'markerHeight' : 50,
    'markerFill' : 'rgb(216,115,149)',
    'markerFillOpacity' : 0.8,
    'markerLineColor' : '#fff',
    'markerLineWidth' : 3
  }
}).addTo(layer);

var targetStyles = {
  'symbol' : {
    'markerWidth' : 200,
    'markerHeight' : 200
  }
};

// animate by maptalks.animation.Animation
var player = maptalks.animation.Animation.animate(
  targetStyles,
  {
    duration : 1000,
    easing : 'out'
  },
  // callback of each frame
  function step(frame) {
    if (frame.state.playState === 'running') {
      marker.updateSymbol(frame.styles.symbol);
    }
  }
);

setTimeout(function () {
  player.play();
}, 600);
