import Ember from 'ember';

/**
 * This helper takes the serverity as the parameter value and returns the corresponding bootstrap code
 * @param params The parameters
 * @returns  one of {"danger","severe","warning","success"}
 */
export function getBootstrapSeverityCode(params) {
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

export default Ember.Helper.helper(getBootstrapSeverityCode);
