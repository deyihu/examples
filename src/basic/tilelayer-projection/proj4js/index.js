// EPSG:3857's proj definition
var proj3857 =
  '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs';
var proj4 = proj4('WGS84', proj3857);

// define a custom projection object
var projection = {
  code: 'proj4-merc', // code of the projection

  project: function (c) {
    // from wgs84 to EPSG3857
    var pc = proj4.forward(c.toArray());
    return new maptalks.Coordinate(pc);
  },

  unproject: function (pc) {
    // from EPSG3857 to wgs84
    var c = proj4.inverse(pc.toArray());
    return new maptalks.Coordinate(c);
  },

  // tell projection how to measure
  // for cartesian coordinates change this to:
  // measure: 'identity'
  measure: 'EPSG:4326',
};

var map = new maptalks.Map('map', {
  center: [-0.113049, 51.498568],
  zoom: 13,
  // spatial reference definition
  spatialReference: {
    projection: projection, // geo projection, defined by proj4js
    resolutions: [
      // map's zoom levels and resolutions
      156543.03392804097, 78271.51696402048, 9135.75848201024,
      19567.87924100512, 9783.93962050256, 4891.96981025128, 2445.98490512564,
      1222.99245256282, 611.49622628141, 305.748113140705, 152.8740565703525,
      76.43702828517625, 38.21851414258813, 19.109257071294063,
      9.554628535647032, 4.777314267823516, 2.388657133911758,
      1.194328566955879, 0.5971642834779395, 0.29858214173896974,
    ],
    fullExtent: {
      // map's full extent
      top: 6378137 * Math.PI,
      left: -6378137 * Math.PI,
      bottom: -6378137 * Math.PI,
      right: 6378137 * Math.PI,
    },
  },
  baseLayer: new maptalks.TileLayer('base', {
    urlTemplate: '$(urlTemplate)',
    subdomains: $(subdomains),
    attribution: '$(attribution)',
  }),
});
