import Ember from 'ember';
import Users from 'dr-elephant/models/users';

export default Ember.Route.extend({
  beforeModel(){
    var users = new Users();
    this.usernames = users.getUsernames();
    this.set('usernames',users.getUsernames());
  },
  model(){
    return Ember.RSVP.hash({
      usernames: new Users().getUsernames(),
      applications: {}
    });
  },
  afterModel() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      if(new Users().getActiveUser()==null) {
        Ember.$("#all a").trigger("click");
      } else {
        Ember.$("#" + new Users().getActiveUser()).trigger("click");
      }
    });
  }
});
