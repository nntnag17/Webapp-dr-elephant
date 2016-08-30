import Ember from 'ember';

export function eq(params/*, hash*/) {
  let[first,second] = params;
  if(first==second) {
    return true;
  }
  return false;
}

export default Ember.Helper.helper(eq);
