module.exports = {
  apiPath: '/api',
  transport: 'websocket', // Could be 'http' or 'websocket',
  appName: 'Weacast',
  logs: {
    level: (process.env.NODE_ENV === 'development' ? 'debug' : 'info')
  },
  login: {
    providers: ['google', 'github', 'cognito']
  },
  map: {
    seeker: 'WindSeeker',
    location: 'Location',
    mixins: [ 'base', 'baseLayers', 'forecastLayers', 'geojsonLayers', 'fileLayers', 'fullscreen', 'measure', 'scalebar', 'legend' ],
    baseLayers: [
      {
        type: 'tileLayer',
        arguments: [
          'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
          {
            maxZoom: 20,
            label: 'Streets',
            attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          }
        ]
      },
      {
        type: 'tileLayer',
        arguments: [
          'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png',
          {
            maxZoom: 20,
            label: 'Satellite',
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
                        'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          }
        ]
      },
      {
        type: 'tileLayer',
        arguments: [
          'http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png',
          {
            maxZoom: 20,
            label: 'Neutral',
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
                         'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
          }
        ]
      }
    ],
    overlayLayers: [
      /*
      {
        type: 'timeDimension.layer.wms',
        name: 'ARPEGE isobaric - 0.5°',
        arguments: [
          'http://mapproxy.kalisio.xyz/service?',
          {
            version: '1.3.0',
            format: 'image/png',
            transparent: true,
            layers: 'MF-ARPEGE_05_WIND_SPEED__ISOBARIC_SURFACE',
            attribution: '<a href="http://www.meteofrance.com">Météo-France</a>'
          }
        ]
      },
      {
        type: 'timeDimension.layer.wms',
        name: 'ARPEGE isobaric - 0.1°',
        arguments: [
          'http://mapproxy.kalisio.xyz/service?',
          {
            version: '1.3.0',
            format: 'image/png',
            transparent: true,
            layers: 'MF-ARPEGE_01_WIND_SPEED__ISOBARIC_SURFACE',
            attribution: '<a href="http://www.meteofrance.com">Météo-France</a>'
          }
        ]
      }*/
    ],
    forecastLayers: [
      {
        type: 'FlowLayer',
        name: 'Wind',
        options: {
          elements: ['u-wind', 'v-wind'],
          units: ['m/s', 'kt', 'km/h'],
          attribution: 'Data from <a href="http://www.meteofrance.com">Météo-France</a>, <a href="http://www.ncep.noaa.gov/">NCEP</a>',
          lineWidth: 3,
          frameRate: 20,
          particleMultiplier: 1 / 900,
          displayOptions: {
            velocityType: 'Wind',
            position: 'bottomright',
            emptyString: 'No wind data',
            angleConvention: 'meteoCW',
            speedUnit: 'm/s'
          }
        }
      },
      {
        type: 'ScalarLayer',
        name: 'Gust (interpolated)',
        options: {
          elements: ['gust'],
          units: ['m/s', 'kt', 'km/h'],
          attribution: 'Data from <a href="http://www.meteofrance.com">Météo-France</a>, <a href="http://www.ncep.noaa.gov/">NCEP</a>',
          visible: false,
          mesh: true
        }
      },
      {
        type: 'ScalarLayer',
        name: 'Gust (raw)',
        options: {
          elements: ['gust'],
          units: ['m/s', 'kt', 'km/h'],
          attribution: 'Data from <a href="http://www.meteofrance.com">Météo-France</a>, <a href="http://www.ncep.noaa.gov/">NCEP</a>',
          visible: false,
          mesh: false
        }
      },
      {
        type: 'HeatLayer',
        name: 'Gust (heat map)',
        options: {
          elements: ['gust'],
          units: ['m/s', 'kt', 'km/h'],
          attribution: 'Data from <a href="http://www.meteofrance.com">Météo-France</a>, <a href="http://www.ncep.noaa.gov/">NCEP</a>',
          visible: false,
          radius: 1.8
        }
      },
      {
        type: 'ScalarLayer',
        name: 'Precipitations',
        options: {
          elements: ['precipitations'],
          units: ['mm'],
          attribution: 'Data from <a href="http://www.meteofrance.com">Météo-France</a>, <a href="http://www.ncep.noaa.gov/">NCEP</a>',
          visible: false,
          mesh: true,
          colorMap: 'BuPu',
          colorClasses: [0, 1, 2, 4, 10, 25, 50, 100, 300]
        }
      }
    ],
    // Default GeoJSON layer style for polygons/lines
    featureStyle: {
      opacity: 1,
      radius: 6,
      color: 'red',
      fillOpacity: 0.5,
      fillColor: 'green',
      popup: {
        excludedProperties: ['wikipedia']
      }
    },
    // Default GeoJSON layer style for points
    pointStyle: {
      type: 'circleMarker',
      options: {
        opacity: 1,
        color: 'red',
        fillOpacity: 0.5,
        fillColor: 'green'
      }
    }
  }
}
