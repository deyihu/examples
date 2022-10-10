const map = new maptalks.Map('map', {
  center: [-0.11304900000004636, 51.498568000000006],
  zoom: 14,
  pitch: 61.199999999999896,
  bearing: 178.79999999999995,
  baseLayer: new maptalks.TileLayer('base', {
    urlTemplate: '$(urlTemplate)',
    subdomains: $(subdomains),
    attribution: '$(attribution)',
  }),
  lights: {
    ambient: {
      resource: {
        url: '{res}/hdr/env.hdr',
      },
      color: [1, 1, 1],
      exposure: 1,
    },
    directional: {
      color: [1, 1, 1],
      lightColorIntensity: 5000,
      direction: [1, -0.4, -1],
    },
  },
});

const gui = new dat.GUI({
  width: 250,
});
const Config = function () {
  this.animation = true;
  this.loop = true;
  this.animationList = 'Survey';
};
const options = new Config();
const url = '{res}/gltf/Fox/Fox.gltf';
const symbol = {
  url,
  shadow: true,
  animation: options.animation,
  animationName: options.animationList, //first animation default
  loop: options.loop,
  scale: [2, 2, 2],
  rotation: [0, 0, 180],
};

const gltfLayer = new maptalks.GLTFLayer('gltf');
const position = map.getCenter();
const gltfMarker = new maptalks.GLTFMarker(position, {
  symbol,
}).addTo(gltfLayer);

const groupGLLayer = new maptalks.GroupGLLayer('gl', [gltfLayer]).addTo(map);

// animation control
const animationController = gui.add(options, 'animation');
animationController.onChange(function (value) {
  gltfMarker.setAnimation(value);
});
const loopController = gui.add(options, 'loop');
loopController.onChange(function (value) {
  gltfMarker.setAnimationLoop(value);
});
const animationListControl = gui
  .add(options, 'animationList', ['Survey', 'Walk', 'Run'])
  .name('animation list');
animationListControl.onChange(function (value) {
  gltfMarker.setCurrentAnimation(value);
});