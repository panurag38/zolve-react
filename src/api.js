import querystring from 'querystring';
export function api(path, params = {}) {
  const modifiedParams = params;
  const fetchURL = `${path}${path.indexOf('?') > -1 ? `&${querystring.stringify(modifiedParams.params)}` : `?${querystring.stringify(modifiedParams.params)}`}`;
  return fetch(fetchURL).then((res) => res.json()).catch((err) => err);
};