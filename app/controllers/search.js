import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['username','queueName','jobType','severity','analysis','finishTimeBegin','finishTimeEnd','type','start','end'],
  username: null,
  queueName: null,
  jobType: null,
  severity: null,
  analysis: null,
  finishTimeBegin: null,
  finishTimeEnd: null,
  type: null,
  start: null,
  end: null,
  isJobTypeChecked: false,
  isSeverityChecked: false,
  isFinishDateChecked: false,
  pages: [],
  applicationType: "Workflow",
  actions: {
    enableJobType: function() {
      console.log("enable job type");
      if(!this.get("isJobTypeChecked")) {
        this.set("jobType",null);
      }
    },
    enableFinishDate: function() {
      console.log("enable date");
      if(!this.get("isFinishDateChecked")) {
        this.set("finishTimeBegin",null);
        this.set("finishTimeEnd",null);
      }
    },
    enableSeverity: function() {
      console.log("enable severity");
      if(!this.get("isSeverityChecked")) {
        this.set("severity",null);
        this.set("analysis",null);
      }
    },
    selectHeuristic: function(heuristic) {
      console.log(heuristic);
      this.set("analysis",heuristic);
    },
    selectSeverity: function(severity) {
      console.log(severity);
      this.set("severity",severity);
    },
    selectJobType: function(jobType) {
      console.log(jobType);
      this.set("jobType",jobType);
    },
      loadPage: function(value) {
        var _this = this;
        this.set("start",20*(value-1));
        this.set("end",20);
        var newsummaries =  this.store.queryRecord('search-result', {
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
        });
        newsummaries.then(function() {
          _this.set("model.summaries",newsummaries);
        });
      },
    search: function () {
      var _this = this;
      this.set("start",0);
      this.set("end",20);
      var newsummaries =  this.store.queryRecord('search-result', {
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
      });
      newsummaries.then(function() {
        _this.set("model.summaries",newsummaries);
      });
    }
  }
});
