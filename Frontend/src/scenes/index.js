import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// Mapbox
import mapboxgl from 'mapbox-gl';
import './mapbox.sass';

import * as actions from '../redux/actions/actions';
import geoJSONGenerator from './geojsonGenerator';
// import heatmapSource from './data/heatmapSource';
// import heatmapSampleData from './data/heatmapSampleData';

const mapStateToProps = state => ({
  longitude: state.mapbox.longitude,
  latitude: state.mapbox.latitude,
  zoom: state.mapbox.zoom
});

const mapDispatchToProps = dispatch => ({
  // Functions that dispatch action creators
  storeCoordinates: coordinates =>
    dispatch(actions.storeCoordinates(coordinates))
});

// Mapbox
mapboxgl.accessToken =
  'pk.eyJ1Ijoiam9zaHVhaG93YXJkIiwiYSI6ImNrNXloNXNiMTJnc2IzbW9uMmE3ajB5eDUifQ.nvs5M3t7fL-pOYPlpvMJpA';

const Scenes = ({ longitude, latitude, zoom, storeCoordinates }) => {
  // Mapbox 'container' must be a String or HTMLElement
  let mapContainer;

  const mapbox = (heatmapData, iconCoordinates) => {
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom
    });

    map.on('move', () => {
      const coordinatesObject = {};

      coordinatesObject.longitude = map.getCenter().lng.toFixed(4);
      coordinatesObject.latitude = map.getCenter().lat.toFixed(4);
      coordinatesObject.zoom = map.getZoom().toFixed(2);

      storeCoordinates(coordinatesObject);
    });

    map.on('load', () => {
      // const heatmapData = geoJSONGenerator(heatmapSource);

      map.loadImage(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Home-icon.svg/500px-Home-icon.svg.png',
        (error, image) => {
          if (error) throw error;

          map.addImage('locationIcon', image);

          map.addSource('locationIconPoint', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: iconCoordinates
                  }
                }
              ]
            }
          });

          map.addLayer({
            id: 'locationIcon',
            type: 'symbol',
            source: 'locationIconPoint',
            layout: {
              'icon-image': 'locationIcon',
              'icon-size': 0.1
            }
          });
        }
      );

      map.addSource('complaints', {
        type: 'geojson',
        data: heatmapData
        // data: heatmapSampleData
        // data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
      });

      map.addLayer(
        {
          id: 'complaints-heat',
          type: 'heatmap',
          source: 'complaints',
          maxzoom: 15,
          paint: {
            // increase weight as diameter breast height increases
            'heatmap-weight': {
              property: 'dbh',
              type: 'exponential',
              stops: [
                [1, 0],
                [62, 1]
              ]
            },
            // increase intensity as zoom level increases
            'heatmap-intensity': {
              stops: [
                [11, 1],
                [15, 3]
              ]
            },
            // assign color values be applied to points depending on their density
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(236,222,239,0)',
              0.2,
              'rgb(208,209,230)',
              0.4,
              'rgb(166,189,219)',
              0.6,
              'rgb(103,169,207)',
              0.8,
              'rgb(28,144,153)'
            ],
            // increase radius as zoom increases
            'heatmap-radius': {
              stops: [
                [1, 1],
                [15, 15]
              ]
            },
            // decrease opacity to transition into the circle layer
            'heatmap-opacity': {
              default: 1,
              stops: [
                [14, 1],
                [15, 0]
              ]
            }
          }
        },
        'waterway-label'
      );

      map.addLayer(
        {
          id: 'complaints-circle',
          type: 'circle',
          source: 'complaints',
          minzoom: 14,
          paint: {
            // increase the radius of the circle as the zoom level and dbh value increases
            'circle-radius': {
              property: 'dbh',
              type: 'exponential',
              stops: [
                [{ zoom: 15, value: 1 }, 5],
                [{ zoom: 15, value: 62 }, 10],
                [{ zoom: 22, value: 1 }, 20],
                [{ zoom: 22, value: 62 }, 50]
              ]
            },
            'circle-color': {
              property: 'dbh',
              type: 'exponential',
              stops: [
                [0, 'rgba(236,222,239,0)'],
                [10, 'rgb(236,222,239)'],
                [20, 'rgb(208,209,230)'],
                [30, 'rgb(166,189,219)'],
                [40, 'rgb(103,169,207)'],
                [50, 'rgb(28,144,153)'],
                [60, 'rgb(1,108,89)']
              ]
            },
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': {
              stops: [
                [14, 0],
                [15, 1]
              ]
            }
          }
        },
        'waterway-label'
      );
    });
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window
      .fetch('https://data.cityofnewyork.us/resource/erm2-nwe9.json')
      .then(res =>
        res.json().then(data => {
          // Can alternatively import and use 'heatmapSource' instead of using fetch response data
          const heatmapData = geoJSONGenerator(data);
          const iconCoordinates = [-73.986, 40.758];

          mapbox(heatmapData, iconCoordinates);
        })
      );
  }, []);

  return (
    <div>
      <div className="sidebarStyle">
        Longitude:
        {` ${longitude} `}
        {' | '}
        Latitude:
        {` ${latitude} `}
        {' | '}
        Zoom:
        {` ${zoom} `}
      </div>
      <div
        ref={el => {
          mapContainer = el;
        }}
        className="mapContainer"
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Scenes);
