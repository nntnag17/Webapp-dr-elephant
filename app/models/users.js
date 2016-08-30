import Ember from 'ember';

/**
 * Custom model to store usernames in the local html store.
 */
export default Ember.Object.extend({

  setActiveUser: function(user) {
    localStorage.setItem('active-user',user);
  },
  getActiveUser: function() {
    if(localStorage.getItem("active-user")=="null") {
      return null;
    }
    return localStorage.getItem("active-user");
  },
  getUsernames: function () {

    var usernamesString = localStorage.getItem('dr-elephant-users');
    if(usernamesString == null || usernamesString=="") {
      return Ember.A([]);
    }

    console.log(usernamesString.split(",").toString());

    var usernamesArray = Ember.A([]);
    usernamesArray.pushObjects(usernamesString.split(","));
    return usernamesArray;
  },
  storeUsernames: function () {
    console.log("usernames array" + this.usernames.toString());
    var usernamesString = this.usernames.join(",");
    console.log("usernames string" + usernamesString);
    localStorage.setItem('dr-elephant-users', usernamesString);
  },
  addToUsername: function (user) {
    var userNames = this.getUsernames();
    if(!userNames.contains(user)) {
      userNames.pushObject(user);
    }
    var usernamesString  = userNames.join(",");
    console.log("usernamesString" + usernamesString);
    localStorage.setItem('dr-elephant-users',usernamesString);
  },
  deleteUsername: function(user) {
    var userNames = this.getUsernames();
    if(userNames.contains(user)) {
      userNames.removeObject(user);
    }
    var usernamesString  = "";
    if(userNames.length!=0) {
      usernamesString  = userNames.join(",");
    }
    console.log("usernamesString = " + usernamesString);
    localStorage.setItem('dr-elephant-users',usernamesString);
  },
  clearStorage: function () {
    // pseudo implementation
    localStorage.clear();
  }
});
