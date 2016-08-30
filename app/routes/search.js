import Ember from 'ember';

export default Ember.Route.extend({
  pages: [],
  getSearchParams: function() {
    return {
      'username': this.username,
      'queue-name': this.queueName,
      'job-type':this.jobType,
      'severity': this.severity,
      'analysis': this.analysis,
      'finish-time-begin': this.finishTimeBegin,
      'finish-time-end': this.finishTimeEnd,
      'type': this.type,
      'start': this.start,
      'end': this.end
    };
  },
  model(){
    return Ember.RSVP.hash({
      searchOptions : this.store.queryRecord('search-option',{}),
      summaries: this.store.queryRecord('search-result', {
        'username': this.username,
        'queue-name': this.queueName,
        'job-type':this.jobType,
        'severity': this.severity,
        'analysis': this.analysis,
        'finish-time-begin': this.finishTimeBegin,
        'finish-time-end': this.finishTimeEnd,
        'type': this.type,
        'start': this.start,
        'end': this.end
      })
    });
  },
  beforeModel: function(transition) {
      this.username = transition.queryParams.username;
      this.queueName =  transition.queryParams.queueName;
      this.jobType= transition.queryParams.jobtype;
      this.severity= transition.queryParams.severity;
      this.analysis= transition.queryParams.analysis;
      this.finishTimeBegin = transition.queryParams.finishTimeBegin;
      this.finishTimeEnd = transition.queryParams.finishTimeEnd;
      this.type= transition.queryParams.type;
      this.start= transition.queryParams.start;
      this.end = transition.queryParams.end;
  }
});
