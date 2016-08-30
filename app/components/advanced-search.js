import Ember from 'ember';

export default Ember.Component.extend({
  applicationType : "workflow",
  actions : {
    search: function() {
      this.sendAction('search');
    }
  }
});
