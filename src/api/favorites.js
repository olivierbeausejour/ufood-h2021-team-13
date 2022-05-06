import * as api from "./ufoodApi";

export const getFavoriteRestaurantLists = async function() {
  const token = await api.getTokenRedirectIfError();
  const response = await api.handleRequest(
    true,
    `${api.baseUrl}/users/${api.user.id}/favorites`,
    {
      headers: {
        Authorization: token
      }
    }
  );
  return await response.json();
};

export const createFavoriteRestaurantList = async function(listName) {
  const token = await api.getTokenRedirectIfError();
  const response = await api.handleRequest(true, `${api.baseUrl}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      name: listName,
      owner: api.user.email
    })
  });
  return await response.json();
};

export const renameFavoriteRestaurantList = async function(listId, listName) {
  const token = await api.getTokenRedirectIfError();
  const response = await api.handleRequest(
    true,
    `${api.baseUrl}/favorites/${listId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        name: listName,
        owner: api.user.email
      })
    }
  );
  return await response.json();
};

export const deleteFavoriteRestaurantList = async function(listId) {
  const token = await api.getTokenRedirectIfError();
  const response = await api.handleRequest(
    true,
    `${api.baseUrl}/favorites/${listId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    }
  );
  return await response.json();
};

export const addRestaurantToFavoriteList = async function(
  listId,
  restaurantId
) {
  const token = await api.getTokenRedirectIfError();
  const response = await api.handleRequest(
    true,
    `${api.baseUrl}/favorites/${listId}/restaurants`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        id: restaurantId,
        owner: api.user.email
      })
    }
  );
  return await response.json();
};

export const deleteRestaurantFromFavoriteList = async function(
  listId,
  restaurantId
) {
  const token = await api.getTokenRedirectIfError();
  const response = await fetch(
    true,
    `${api.baseUrl}/favorites/${listId}/restaurants/${restaurantId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    }
  );
  return await response.json();
};
