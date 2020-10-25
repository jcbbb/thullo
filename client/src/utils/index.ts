export const request = async (endpoint: string, { body, ...customConfig }: any = {}) => {
  const headers = { 'content-type': 'application/json' };

  const config = {
    method: body ? 'POST' : 'GET',
    body: body ? JSON.stringify(body) : undefined,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  return window.fetch(endpoint, config).then(async (response) => {
    if (response.status === 401) {
      // auth.logout();
      window.location.assign(window.location.origin);
      return;
    }
    return response;
  });
};
