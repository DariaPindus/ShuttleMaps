import React, { useState, useEffect } from 'react';
import MapContainer from './map/MapContainer';
import {useAsync} from 'react-use';
import UserNavigation from './navigation/UserNavigation';
import styled from 'styled-components';
import { getRoutes } from './api/RoutesApi';
import { MapRoute } from './map/MapRoute';

const Body = styled.div`
display: flex;
flex-direction: row;
position: relative;
min-height: 100vh;
`;

const SideBar = styled.div`
flex: 1;
order: 2;
margin: 0;
padding: 0;
`;

const Main = styled.div`
    flex: 3;
    order: 1;
    position: relative;
    min-height: 100%;
`;

//TODO: add caching, probably using useMemo
const useRoutes = (selectedRoutes: string) => {
    const {loading, error, value} = useAsync(async () => {
        const routes = await getRoutes(selectedRoutes);
        debugger;
        return routes;
    }, [selectedRoutes]);

    return {loading, error, routes: value};
}

function Home() {
    const [selectedRoutes, setSelectedRoutes] = useState("all");

    const {loading, error, routes} = useRoutes(selectedRoutes);

    return (
        <Body>
            <Main>
                <MapContainer routes={routes || []} />
            </Main>
            <SideBar>
                <UserNavigation onRouteSelectionChanged={setSelectedRoutes}/>
            </SideBar>
        </Body>
    );
}

export default Home;
