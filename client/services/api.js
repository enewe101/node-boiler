import {CRUDService} from './CRUD';
import {fetchJson} from './fetchit';

let documentService = new CRUDService('/api/documents');

let userService = new CRUDService('/api/users');
userService.login = function(email, password) {
  return fetchJson(
	'/auth/local/login', 'post', {email:email, password:password
  });
}
userService.signup = function(email, password) {
  return fetchJson(
	'/auth/local/signup', 'post', {email:email, password:password});
}

export {documentService, userService};
