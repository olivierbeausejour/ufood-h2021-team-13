import * as api from "./ufoodApi";

export const defaultRestaurantListLimit = 15;

let restaurantListLimit = defaultRestaurantListLimit;

export const getRestaurantById = async function(id) {
  const response = await api.handleRequest(
    false,
    `${api.baseUrl}/unsecure/restaurants/${id}`
  );
  return await response.json();
};

export const getRestaurants = async function(
  searchedRestaurantName,
  priceRanges,
  genres,
  location
) {
  let request = `${api.baseUrl}/unsecure/restaurants?limit=${restaurantListLimit}&price_range=${priceRanges}`;
  if (searchedRestaurantName.length !== 0) {
    request += `&q=${searchedRestaurantName}`;
  }
  if (genres.length !== 0) {
    request += `&genres=${genres}`;
  }
  if (location) {
    const { lat, lng } = location;
    request += `&lon=${lng}&lat=${lat}`;
  }
  const response = await api.handleRequest(false, request);
  return await response.json();
};

export const incrementRestaurantListLimit = function() {
  restaurantListLimit += defaultRestaurantListLimit;
};

export const setRestaurantListLimit = function(limit) {
  restaurantListLimit = limit;
};

export const getRestaurantListLimit = function() {
  return restaurantListLimit;
};
