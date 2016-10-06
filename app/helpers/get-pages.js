import Ember from 'ember';

export function getPages(params/*, hash*/) {
  let[total] = params;
  var totalRecords = 100;
  var numberOfPages = parseInt(totalRecords/25);
  var pages = [];
  for(var i=0;i<numberOfPages;i++) {
    var singleObject = {};
    singleObject['number'] = (i + 1);
    pages.push(singleObject);
  }
  return pages;
}

export default Ember.Helper.helper(getPages);
