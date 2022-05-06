import { latLng } from "leaflet";

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export function getDefaultPosition() {
  return latLng("46.81371070144616", "-71.20739555088204");
}

export default {
  getCurrentPosition,
  getDefaultPosition
};
