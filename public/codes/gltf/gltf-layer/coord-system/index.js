const map = new maptalks.Map("map", {
  center: [-74.01252272617671, 40.70709931736744],
  zoom: 16,
  pitch: 80,
  zoomControl: true,
  lights: {
    ambient: {
      resource: {
        url: {
          front: "{res}/hdr/gradient/front.png",
          back: "{res}/hdr/gradient/back.png",
          left: "{res}/hdr/gradient/left.png",
          right: "{res}/hdr/gradient/right.png",
          top: "{res}/hdr/gradient/top.png",
          bottom: "{res}/hdr/gradient/bottom.png"
        }
      },
      exposure: 1,
      hsv: [0, 1, -0.042],
      orientation: 0
    },
    directional: {
      direction: [-0.1, 1, -1],
      color: [1, 1, 1]
    }
  }
});

/**start**/
const symbol = {
  url: "{res}/gltf/teapot/teapot.gltf",
  scaleX: 1.5,
  scaleY: 1.5,
  scaleZ: 1.5,
  rotationZ: 180
};

const gltfLayer = new maptalks.GLTFLayer("gltf", {
  //分为 map 和 gltf 两种, map 为地图坐标系统，会给模型尺寸位置做自适应。gltf 为模型内部坐标系统，按真实大小渲染
  gltfCoordinateSystem: "map"
});

const gltfMarker = new maptalks.GLTFMarker(map.getCenter(), {
  symbol
}).addTo(gltfLayer);

function setCoordinateSystem(value) {
  gltfLayer.setGltfCoordinateSystem(value);
  if (value === "gltf") {
    map.animateTo({
      center: [-74.01252272617671, 40.70709931736744],
      zoom: 20
    });
  } else {
    map.animateTo({
      center: [-74.01252272617671, 40.70709931736744],
      zoom: 16
    });
  }
}
/**end**/

const groupLayer = new maptalks.GroupGLLayer("group", [gltfLayer], {
  sceneConfig: {
    environment: {
      enable: true,
      mode: 1,
      level: 0,
      brightness: 0
    },
    ground: {
      enable: true,
      renderPlugin: {
        type: "lit"
      },
      symbol: {
        polygonFill: [0.54, 0.54, 0.54, 1],
        ssr: true,
        material: {
          baseColorTexture: "{res}/textures/rubber_roughness.png",
          baseColorFactor: [0.3450981, 0.3372549, 0.2117647, 1],
          hsv: [-0.468, 0, -0.128],
          baseColorIntensity: 1.372,
          contrast: 1.372,
          roughnessFactor: 1,
          metallicFactor: 0,
          normalTexture: "{res}/textures/rubber_roughness.png",
          uvScale: [0.09, 0.09],
          normalMapFactor: 0.68,
          emitColorFactor: 1.11,
          noiseTexture: "{res}/textures/noise.png"
        }
      }
    }
  }
}).addTo(map);

const gui = new mt.GUI();

gui
  .add({
    label: "坐标系统选择",
    type: "select",
    value: "map",
    options: ["map", "gltf"]
  })
  .onChange((value) => {
    setCoordinateSystem(value);
  });
