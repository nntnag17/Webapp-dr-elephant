import Ember from 'ember';

export function urlEncode(params/*, hash*/) {
  let [uri] = params;
  return encodeURIComponent(uri);
}

export default Ember.Helper.helper(urlEncode);
