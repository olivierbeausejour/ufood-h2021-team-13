import * as api from "./ufoodApi";

export const defaultUsersListLimit = 15;

let usersListLimit = defaultUsersListLimit;

export const getUsers = async function(searchedUserName) {
  const token = await api.getTokenRedirectIfError();
  let request = `${api.baseUrl}/users?limit=${usersListLimit}`;
  if (searchedUserName) {
    request += `&q=${searchedUserName}`;
  }
  const response = await api.handleRequest(true, request, {
    method: "GET",
    headers: {
      Authorization: token
    }
  });
  return await response.json();
};

export const incrementUsersListLimit = function() {
  usersListLimit += defaultUsersListLimit;
};

export const decrementUsersListLimit = function() {
  usersListLimit -= defaultUsersListLimit;
};

export const setUsersListLimit = function(limit) {
  usersListLimit = limit;
};

export const getUserById = async function(id) {
  const response = await fetch(`${api.baseUrl}/unsecure/users/${id}`, {
    method: "GET"
  });
  return await response.json();
};

export const getActualUser = async function(loginRequired) {
  if (!api.user) {
    const fetchedUser = JSON.parse(localStorage.getItem("ufood-user"));
    if (fetchedUser) {
      setActualUser(fetchedUser);
    } else {
      if (loginRequired) {
        const tokenInfo = await api.getTokenInfoRedirectIfError();
        setActualUser(tokenInfo);
      } else {
        return undefined;
      }
    }
  }
  return api.user;
};

export const setActualUser = function(user) {
  const { id, name, email } = user;
  api.setBaseUser({
    id,
    name,
    email
  });
  localStorage.setItem("ufood-user", JSON.stringify(api.user));
};
