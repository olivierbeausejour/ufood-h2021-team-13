import * as api from "./ufoodApi";

let visitsListLimit = 21;

// Connected user section

export const createUserVisitRestaurant = async function(
  restaurantId,
  comment,
  rating,
  date
) {
  if (rating === undefined) {
    rating = "5";
  }
  const token = await api.getTokenRedirectIfError();
  const response = await api.handleRequest(
    true,
    `${api.baseUrl}/users/${api.user.id}/restaurants/visits`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        restaurant_id: restaurantId,
        comment: comment,
        rating: rating,
        date: date
      })
    }
  );
  return await response.json();
};

export const getNumberOfTimesVisited = async function(restaurantId) {
  const token = await api.getTokenRedirectIfError();
  const response = await api.handleRequest(
    true,
    `${api.baseUrl}/users/${api.user.id}/restaurants/${restaurantId}/visits`,
    {
      headers: {
        Authorization: token
      }
    }
  );
  return await response.json();
};

export const getVisitedRestaurantLists = async function(userId) {
  const token = await api.getTokenRedirectIfError();
  const response = await api.handleRequest(
    true,
    `${api.baseUrl}/users/${userId}/restaurants/visits?limit=${visitsListLimit}`,
    {
      headers: {
        Authorization: token
      }
    }
  );
  return await response.json();
};
