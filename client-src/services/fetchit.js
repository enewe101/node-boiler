
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

function fetchJson(url, method, params) {
	method = method.toLowerCase() || 'get';

	// Handle methods that might incorporate data into the url
	if(method == 'get' || method == 'head' || method == 'delete') {
      if(params) {
        url = url + '?' + encode_query(options.query);
	  }
      return fetch(url, {'method':method, 'headers':HEADERS})
		  .then(throwOrReturnJson)

    // Handle methods that send data in the body
	} else if(method == 'post' || method == 'put') {
	  return fetch(url, {
		'method':method, 'headers':HEADERS, 'body':JSON.stringify(params)
	  })
	    .then(throwOrReturnJson)
	}
}

function fetchit(url, options) {
  let query = null;
  options = options || {};
  if(options.query) {
    url = url + '?' + encode_query(options.query);
    delete options.query;
  }
  return fetch(url, options);
}

export {fetchJson};
