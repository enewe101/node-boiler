
function fetchJson(url, method, params, options) {
  options = prepare_options(method, params, options);
  url = prepare_url_params(url, params, options);
  return fetch(url, options).then(throwOrReturnJson)
}

function fetchit(url, method, params, options) {
  options = prepare_options(method, params, options);
  url = prepare_url_params(url, params, options);
  return fetch(url, options);
}

function prepare_options(method, params, options) {
  options = options || {};
  options = apply_default_headers(options);
  options = default_send_cookies(options);
  options.method = method ? method.toLowerCase() : 'get';
  options = prepare_body_params(params, options);
  return options
}

function apply_default_headers(options){
  if(typeof options.headers == 'undefined') {
  	options.headers = HEADERS;
  }
  return options
}

function default_send_cookies(options) {
  if(typeof options.credentials == 'undefined') {
	options.credentials = 'same-origin';
  }
  return options
}

function prepare_body_params(params, options) {
  if(typeof params == 'undefined') {
	return options;
  }
  if(options.method == 'post' || options.method == 'put') {
	options.body = JSON.stringify(params);
  }
  return options
}

function prepare_url_params(url, params, options) {
  // If method is "get", "head", or "delete", encode any params onto  the url.
  if(typeof params == 'undefined') {
	  return url;
  }
  let method = options.method;
  if(method == 'get' || method == 'head' || method == 'delete') {
  	url = url + '?' + encode_query(params);
  }
  return url;
}

const esc = encodeURIComponent;
function encode_query(query) {
  return Object.keys(query).map(k => esc(k) + '=' + esc(query[k])).join('&');
}

const throwOrReturnJson = function(response) {
	if(!response.ok) {
		throw response;
	}
	return response.json();
}

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export {fetchJson};
