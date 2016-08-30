import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addTab: function(user) {
      //var user = prompt("Enter new user to enter","blah");
      this.users.addToUsername(user);
      this.users.setActiveUser(user);
      this.set('model.usernames',this.users.getUsernames());
      Ember.run.scheduleOnce('afterRender', this, function() {
        Ember.$("#"+user).trigger("click");
      });
    },
    deleteTab: function(tabname) {
      this.users.deleteUsername(tabname);
      this.set('model.usernames',this.users.getUsernames());
      console.log(this.users.getActiveUser() + " " + tabname);
      if(this.users.getActiveUser()==tabname) {
        Ember.run.scheduleOnce('afterRender', this, function () {
          Ember.$("#all a").trigger("click");
        });
      }
    }
  }
});
