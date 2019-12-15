const fs = require('fs');
const routesParser = require('./data/routes_parser')

const ROUTES_FILE = "plain_routes.json";

function getRoutes(selected) {
    return routesParser.getRoutesInfo(selected);
}

module.exports = {
    getRoutes,
  };