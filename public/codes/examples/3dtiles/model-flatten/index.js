const map = new maptalks.Map("map", {
  center: [108.95965, 34.2189],
  zoom: 18,
  bearing: 0,
  pitch: 45,
  lights: {
    directional: { direction: [-1, -1, -1], color: [1, 1, 1] },
    ambient: {
      resource: {
        url: {
          front: "{res}/hdr/923/front.jpg",
          back: "{res}/hdr/923/back.jpg",
          left: "{res}/hdr/923/left.jpg",
          right: "{res}/hdr/923/right.jpg",
          top: "{res}/hdr/923/top.jpg",
          bottom: "{res}/hdr/923/bottom.jpg",
        },
      },
      exposure: 1.426,
      hsv: [0, 0, 0],
      orientation: 302.553,
    }
  }
});

const layer = new maptalks.Geo3DTilesLayer("3dtiles", {
  services: [
    {
      url: "http://resource.dvgis.cn/data/3dtiles/dayanta/tileset.json",
      ambientLight: [1, 1, 1],
      maximumScreenSpaceError: 1.0,
      pointOpacity: 0.5,
      pointSize: 3,
      heightOffset: -400
    }
  ]
});

const groupGLLayer = new maptalks.GroupGLLayer("gl", [layer], {
  sceneConfig: {
    environment: {
      enable: true,
      mode: 1,
      level: 0,
      brightness: 0.915,
    },
    postProcess: {
      enable: true
    },
    ground: {
      enable: true,
      renderPlugin: {
        type: "lit",
      },
      symbol: {
        polygonOpacity: 1,
        material: {
          baseColorFactor: [0.48235, 0.48235, 0.48235, 1],
          hsv: [0, 0, -0.532],
          roughnessFactor: 0.22,
          metallicFactor: 0.58,
        }
      }
    }
  }
}).addTo(map);
/**start**/
const masks = [];
function updateFlattenRegion(mask) {
  masks.push(mask);
  layer.setMask(masks);
}

const vlayer = new maptalks.VectorLayer("vector", {
  enableAltitude: true,
}).addTo(map);

let altitudes = [],
  coordinates = [],
  first = true;
const drawTool = new maptalks.DrawTool({
    mode: "LineString",
    enableAltitude: true,
    symbol: {
      lineColor: "#f00",
    },
  })
  .addTo(map)
  .disable();

drawTool.on("mousemove", (e) => {
  const coordinate = getPickedCoordinate(e.coordinate);
  if (!coordinate) {
    return;
  }
  if (first) {
    coordinates.push([coordinate.x, coordinate.y]);
    altitudes.push(coordinate.z);
  } else {
    coordinates[coordinates.length - 1] = [coordinate.x, coordinate.y];
    altitudes[altitudes.length - 1] = coordinate.z;
  }
  e.geometry.setProperties({
    altitude: altitudes,
  });
  e.geometry.setCoordinates(coordinates);
  first = false;
});

drawTool.on("drawvertex", (e) => {
  const coordinate = getPickedCoordinate(e.coordinate);
  if (!coordinate) {
    return;
  }
  if (first) {
    coordinates.push([coordinate.x, coordinate.y]);
    altitudes.push(coordinate.z);
    first = false;
  } else {
    coordinates[coordinates.length - 1] = [coordinate.x, coordinate.y];
    altitudes[altitudes.length - 1] = coordinate.z;
    first = true;
  }
  e.geometry.setProperties({
    altitude: altitudes,
  });
  e.geometry.setCoordinates(coordinates);
});

drawTool.on("drawstart", (e) => {
  const coordinate = getPickedCoordinate(e.coordinate);
  if (!coordinate) {
    return;
  }
  coordinates.push([coordinate.x, coordinate.y]);
  altitudes.push(coordinate.z);
  e.geometry.setProperties({
    altitude: altitudes,
  });
  e.geometry.setCoordinates(coordinates);
  first = true;
});

drawTool.on("drawend", function(param) {
  coordinates.push(coordinates[0]);
  altitudes.push(altitudes[0]);
  new maptalks.LineString(coordinates, {
    symbol: {
      lineColor: "#f00",
    },
    properties: {
      altitude: altitudes,
    },
  }).addTo(vlayer);
  const mask = new maptalks.FlatInsideMask(coordinates);
  updateFlattenRegion(mask);
  coordinates = [];
  altitudes = [];
});

function getPickedCoordinate(coordinate) {
  const identifyData = groupGLLayer.identify(coordinate)[0];
  const pickedPoint = identifyData && identifyData.point;
  if (pickedPoint) {
    const altitude = map.pointAtResToAltitude(pickedPoint[2], map.getGLRes());
    const coordinate = map.pointAtResToCoordinate(new maptalks.Point(pickedPoint[0], pickedPoint[1]), map.getGLRes());
    return new maptalks.Coordinate(coordinate.x, coordinate.y, altitude);
  } else {
    return coordinate;
  }
}
/**end**/
const gui = new mt.GUI();
gui
  .add({
    type: "button",
    label: "绘制范围",
    role: "draw",
  })
  .onClick(() => {
    drawTool.enable();
});

gui
  .add({
    type: "button",
    label: "重置",
    role: "clear",
  })
  .onClick(() => {
    vlayer.clear();
    layer.removeMask();
  });