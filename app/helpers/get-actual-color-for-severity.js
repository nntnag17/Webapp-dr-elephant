import Ember from 'ember';

export function getActualColorForSeverity(params/*, hash*/) {
  let [severity] = params;
  severity = severity.toLowerCase();
  switch(severity) {
    case "critical":
      return "#D9534F";
    case "severe":
      return "#E4804E";
    case "moderate":
      return "#F0AD4E";
    case "low":
      return "#5CB85C";
    case "none":
      return "#5CB85C";
  }
  return "blue";
}

export default Ember.Helper.helper(getActualColorForSeverity);
