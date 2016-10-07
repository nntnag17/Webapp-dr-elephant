import Ember from 'ember';

export default Ember.Component.extend({
  newuser: null,
  actions: {

    /** Sets the tab to the name of the user **/
    setTab: function(tabname) {
      this.sendAction('setTab', tabname);
    },

    /** Adds the tab **/
    addTab: function() {
      this.sendAction('addTab', this.newuser);
      Ember.$("#user-input").attr("type","hidden");
      Ember.$("#user-input").attr("placeholder","Add user");
      Ember.$("#user-input").attr("value","");
    },

    /** deletes the tab **/
    deleteTab: function(tabname) {
      this.sendAction('deleteTab', tabname);
    },

    /** brings focus to the input box **/
    showInput: function() {
      console.log("clicked");
      Ember.$("#user-input").attr("type","text");
      Ember.$("#user-input").focus();
    }
  }
});
