import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transition){
    console.log(transition.queryParams.applicationid);
    this.applicationid = transition.queryParams.applicationid;
  },
  model(){
    this.applications = this.store.queryRecord('application',{applicationid: this.get("applicationid")});
    return this.applications;
  }
});
