import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, ProvidedProps, GoogleAPI, Polyline } from 'google-maps-react';
import { ReactContainer, Route, Point } from '../types';
import { MapRoute } from './MapRoute';
import { GOOGLE_API_KEY } from '../constants';

const KYIV_DEFAULT_LOCATION = {
  lat: 50.4343,
  lng: 30.527
};

interface Props {
  google: GoogleAPI,
  routes: Route[]
}

interface MarkerProps {
  title: string, 
  lng: number, 
  lat: number
}

function MapContainer({ google, routes }: Props) {

  const pathCoordinates = (checkpoints: Point[]) => checkpoints.map(point => point.location);
  const markerPoints = routes.map(route => route.checkpoints).flat();

  return (
    <>
      <Map
        google={google}
        initialCenter={KYIV_DEFAULT_LOCATION}
        zoom={14}
      >
        {routes.map((route) =>
          <Polyline
            key={route.name}
            path={pathCoordinates(route.checkpoints)}
            strokeColor={"red"}
            strokeOpacity={0.8}
            strokeWeight={2} />
        )}
        {markerPoints.map(marker =>  
          <Marker 
            key={marker.title}
            title={marker.title}
            position={marker.location}/>)}
      </Map>
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: (GOOGLE_API_KEY)
})(MapContainer)