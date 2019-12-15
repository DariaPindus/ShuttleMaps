const files = require('../api/file_api');
const path = require("path");
const ggapi = require('../api/google_geo_api');

const EXTENDED_ROUTES_INFO_FILE = "routes_extended.json";
const BASIC_ROUTES_INFO_FILE = "uber_routes.json";

let routes = [];

function getRoutesInfo(selected) {
    console.log("getRoutesInfo selected " + selected);
    const selectedRoutes = selected === "all" ? routes : routes[selected];
    console.log("selected ", selectedRoutes);
    return selectedRoutes;
}

function isParsingNeeded() {
    //TODO : compare BASIC_ROUTES_INFO_FILE hashes
    return false;
}

async function createExtendedRoutesInfoFile() {
    let routes = files.readJSONfile(path.resolve(__dirname,BASIC_ROUTES_INFO_FILE));
    const extendedRoutes = await Promise.all(routes.map(async (route) => {
        const extendedCheckpoints = await Promise.all(
            route.checkpoints.map(async (point) => await parseCheckpoint(point)));
        return {
            code : route.code, 
            title: route.title,
            checkpoints: extendedCheckpoints
        }
    }));
    console.log("extended routes ", extendedRoutes);
    files.writeJSONFile(path.resolve(__dirname,EXTENDED_ROUTES_INFO_FILE), extendedRoutes);
}

async function parseCheckpoint(pointName) {
    const pointLocation = await ggapi.getPlaceLocation(pointName); 
    return {location : pointLocation, title: pointName};
}

async function initializeRoutesInfo() {
    if (isParsingNeeded()) 
        await createExtendedRoutesInfoFile();
    routes = files.readJSONfile(EXTENDED_ROUTES_INFO_FILE);
}

module.exports = {
    getRoutesInfo, 
    initializeRoutesInfo
}