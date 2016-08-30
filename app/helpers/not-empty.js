import Ember from 'ember';

export function notEmpty(params/*, hash*/) {
  let [id] = params;
  if(id=="") {
    return false;
  }
  return true;
}

export default Ember.Helper.helper(notEmpty);
