import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// Mapbox
import mapboxgl from 'mapbox-gl';
import './mapbox.sass';

import * as actions from '../redux/actions/actions';

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

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
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
