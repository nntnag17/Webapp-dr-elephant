import Ember from 'ember';

export function getColorForSeverity(params) {
  let [severity] = params;
  if(severity==null) {
    return "success";
  }
  severity = severity.toLowerCase();
  switch(severity) {
    case "critical":
      return "danger";
    case "severe":
      return "severe";
    case "moderate":
      return "warning";
    case "low":
      return "success";
    case "none":
      return "success";
  }
  return "success";
}

export default Ember.Helper.helper(getColorForSeverity);
