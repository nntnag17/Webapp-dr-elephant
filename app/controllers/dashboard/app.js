import Ember from 'ember';
import users from 'dr-elephant/models/users';
import Dashboard from 'dr-elephant/controllers/dashboard';

export default Dashboard.extend({
  users: new users(),
  loading: false,
  usernames: function() {
    return this.users.getUsernames();
  },
  actions: {

    /** changes tab to the clicked user **/
    changeTab: function (tabname) {
      this.set("loading",true);
      this.users.setActiveUser(tabname);
      var _this = this;
      _this.store.unloadAll();
      var newworkflows = this.store.query('application-summary', {username: tabname});
      newworkflows.then(function () {
        _this.set("model.applications", newworkflows);
        _this.set("loading",false);
      });
    }
  }
});
