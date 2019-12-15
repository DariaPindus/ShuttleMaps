const axios = require("axios");

const URL="https://maps.googleapis.com/maps/api/geocode/json?address=";
const KEY = "AIzaSyAsyateP3le0QF3kRSv1hOJw9_IEiX0TYw"; 

// const getData = async url => {
//     try {
//       const response = await axios.get(url);
//       const data = response.data;
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
  
async function getPlaceLocation(placeName) {
    const placeUrl = URL + encodeURI(placeName) + "&key=" + KEY;
    const response =  await axios.get(placeUrl);
    const placeJson = response.data.results;
    const location = placeJson[0].geometry.location;
    return location;
}

module.exports = {
    getPlaceLocation
};