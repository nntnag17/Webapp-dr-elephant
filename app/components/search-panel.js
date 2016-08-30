import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selected: function (selectionName) {
      if(selectionName == "Advanced") {
        this.get('router').transitionTo("search");
      } else {
        Ember.$('.search-panel span#search_concept').text(selectionName);
      }
    },
    search: function(){
      var type = Ember.$(".search-panel span#search_concept").text();
      var searchText = Ember.$("#primary-search").val();
      console.log(searchText);
      console.log(type);
      if(type=="Workflow") {
        this.get('router').transitionTo('workflow', {queryParams: {workflowid: searchText} });
      } else if (type=="Job") {
        this.get('router').transitionTo('job', {queryParams: {jobid: searchText} });
      } else if (type="Application") {
        this.get('router').transitionTo('app', {queryParams: {applicationid: searchText}});
      }
    }
  }
});
