import React, { useState, useRef } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, ProvidedProps, GoogleAPI, Polyline, MarkerProps } from 'google-maps-react';
import { ReactContainer, Route, Point } from '../types';
import { GOOGLE_API_KEY } from '../constants';

const KYIV_DEFAULT_LOCATION = {
  lat: 50.4343,
  lng: 30.527
};

interface Props {
  google: GoogleAPI,
  routes: Route[]
}

const colors = ["#eb4034","#f062d8", "#f5dc22", "#1fa32a", "#20b0ae", "#eba234", "#2a74b5", "#5241bf","#5c3a33", "#af68de"];

function MapContainer({ google, routes }: Props) {
  const mapRef = useRef(null);
  const [activeMarker, setActiveMarker] = useState<google.maps.Marker | null>(null);
  const [activePlace, setActivePlace] = useState<MarkerProps>({});

  const pathCoordinates = (checkpoints: Point[]) => checkpoints.map(point => point.location);
  const markerPoints = routes.map(route => route.checkpoints).flat();

  const onMarkerClick = (props?: MarkerProps, marker?: google.maps.Marker) => {
    if (marker && props ) {
      setActiveMarker(marker);
      setActivePlace(props);
    }
  }

  const onInfoWindowClose = () => { 
    setActiveMarker(null);
  }

  return (
    <>
      <Map
        ref={mapRef}
        google={google}
        initialCenter={KYIV_DEFAULT_LOCATION}
        zoom={14}
      >
        {routes.map((route, index) =>
          <Polyline
            key={route.name}
            path={pathCoordinates(route.checkpoints)}
            strokeColor={colors[index]}
            strokeOpacity={0.8}
            strokeWeight={2} />
        )}
        {markerPoints.map(marker =>
          <Marker
            key={marker.title}
            title={marker.title}
            position={marker.location}
            onClick={onMarkerClick}
          />)}

        {
          activeMarker && <InfoWindow
            marker={activeMarker!}
            visible={activeMarker !== null}
            closeWindow={onInfoWindowClose}>
            <h4>{activePlace.title}</h4>
          </InfoWindow>
        }
      </Map>
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: (GOOGLE_API_KEY)
})(MapContainer)