import * as api from "./ufoodApi";

const cookies = require("js-cookie");
const AUTH_TOKEN_COOKIE = "auth-token";

export const signup = async function(name, email, password) {
  const response = await api.handleRequest(false, `${api.baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      name,
      email,
      password
    })
  });
  return await response.json();
};

export const login = async function(
  email,
  password,
  successCallback,
  unauthorizedCallback,
  errorCallback
) {
  const response = await api.handleRequest(false, `${api.baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      email,
      password
    })
  });
  if (response.ok) {
    const json = await response.json();
    cookies.set("auth-token", json.token, { expires: 7 });
    api.setActualUser(json);
    successCallback();
  } else if (response.status === 401) {
    unauthorizedCallback();
  } else {
    errorCallback();
  }
};

export const logout = async function() {
  const token = await getTokenRedirectIfError();
  await api.handleRequest(true, `${api.baseUrl}/logout`, {
    method: "POST",
    headers: {
      Authorization: token
    }
  });
  cookies.remove(AUTH_TOKEN_COOKIE);
  await api.redirectToLogin();
};

export const getToken = async function() {
  const token = cookies.get(AUTH_TOKEN_COOKIE);
  if (!token) {
    return undefined;
  }

  return token;
};

export const getTokenRedirectIfError = async function() {
  const token = await getToken();
  if (!token) {
    await api.redirectToLogin();
  }

  return token;
};

export const getTokenInfo = async function() {
  try {
    const token = await getToken();
    if (!token) {
      return undefined;
    }

    const response = await api.handleRequest(
      false,
      `${api.baseUrl}/tokenInfo`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    if (!response.ok) {
      return undefined;
    }

    return await response.json();
  } catch (error) {
    return undefined;
  }
};

export const getTokenInfoRedirectIfError = async function() {
  try {
    const token = await getTokenRedirectIfError();
    if (!token) {
      return undefined;
    }

    const response = await api.handleRequest(true, `${api.baseUrl}/tokenInfo`, {
      headers: {
        Authorization: token
      }
    });

    if (!response.ok) {
      return undefined;
    }

    return await response.json();
  } catch (error) {
    return undefined;
  }
};

export const isLoggedIn = async function() {
  return (await getTokenInfo()) !== undefined;
};
