import Ember from 'ember';

export function getDate(params) {
  let [date] = params;
  return new Date(date);
}

export default Ember.Helper.helper(getDate);
