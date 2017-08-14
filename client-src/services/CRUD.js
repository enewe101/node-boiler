import {fetchJson} from './fetchit';

class CRUDService {

  // These functions return promises.  If the request is successful, the
  // promise will resovlve to a JavaScript object based on parsing JSON in the
  // response body.  If any non-2XX status is returned, then an error will be
  // thrown, containing the full response from teh server.
  //
  // Example usage:
  //
  //      const documentService = CRUDService('/api/documents');
  //      documentService.find({})
  //        .then(documents => console.log(documents))
  //        .catch(e => {console.log('whoops'); console.log(e)});
  //

  constructor(endpoint) {
	// Ensure that the endpoint ends with a slash
	if(!endpoint.endsWith('/')) {
		this.endpoint = endpoint + '/';
	} else {
		this.endpoint = endpoint;
	}
  }

  get(obj_id) {
    return fetchJson(this.endpoint + obj_id);
  }

  find(query, options) {
    options = options || {};
    return fetchJson(this.endpoint + 'find', 'post', [query, options])
  }

  create(obj) {
    return fetchJson(this.endpoint, 'post', obj);
  }

  update(obj_id, obj) {
    return fetchJson(this.endpoint + obj_id, 'put', obj);
  }

  del(obj_id) {
    return fetchJson(this.endpoint + obj_id, 'delete');
  }

}
export {CRUDService};
