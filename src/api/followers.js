import * as api from "./ufoodApi";

export const followUser = async function(followerId) {
  const token = await api.getTokenRedirectIfError();
  const response = await api.handleRequest(true, `${api.baseUrl}/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      id: followerId
    })
  });
  return await response.json();
};

export const unfollowUser = async function(followerId) {
  const token = await api.getTokenRedirectIfError();
  const response = await api.handleRequest(
    true,
    `${api.baseUrl}/follow/${followerId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    }
  );
  return await response.json();
};
