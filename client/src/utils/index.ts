export const request = async (endpoint: string, { body, ...customConfig }: any = {}) => {
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    method: body ? 'POST' : 'GET',
    body: body ? JSON.stringify(body) : undefined,
    ...customConfig,
    credentials: 'include',
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  return window.fetch(endpoint, config).then(async (response) => {
    if (response.status === 401) {
      // auth.logout();
      return;
    }

    return response;
  });
};

export const kebabCaseToCamel = (str: string) => {
  return str.replace(/(-\w)/g, (matches) => matches[1].toUpperCase());
};
