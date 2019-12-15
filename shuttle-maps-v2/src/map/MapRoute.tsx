import React from 'react';
import { Route } from '../types'
import { Polyline, Marker } from 'google-maps-react';

interface Props {
    route: Route,
    color: string
}

export function MapRoute({ route, color }: Props) {

    const pathCoordinates = route.checkpoints.map(point => point.location );

    return (<>
        <Polyline
            path={pathCoordinates}
            strokeColor={color}
            strokeOpacity={0.8}
            strokeWeight={2} />
        {route.checkpoints.map((point) => <Marker
        key={point.title}
            title={point.title}
            position={{ lat: point.location.lat, lng: point.location.lng }}
        />)}
    </>);
}