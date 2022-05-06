export const baseUrl = "https://ufoodapi.herokuapp.com";
let router;
let redirectProps;
export let user;

export const setBaseUser = function(baseUser) {
  user = baseUser;
};

export const handleRequest = async function(loginRequired, url, params) {
  const response = await fetch(url, params);
  if (response.status === 401 && loginRequired) {
    await redirectToLogin();
  }
  return response;
};

export const redirectToLogin = async function() {
  await router.push({
    name: "login",
    params: { redirectName: router.currentRoute.name, redirectProps }
  });
};

export const setRouter = function(newRouter) {
  router = newRouter;
};

export const getRouter = function() {
  return router;
};

export const addRedirectProp = function(key, value) {
  if (!redirectProps) {
    redirectProps = {};
  }
  redirectProps[key] = value;
};

export const getRedirectProps = function() {
  return redirectProps;
};
