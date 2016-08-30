import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deleteTab: function (tabname) {
      this.sendAction('deleteTab', tabname);
    }
  }
});
