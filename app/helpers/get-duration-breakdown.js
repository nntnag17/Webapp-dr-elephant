import Ember from 'ember';

/**
 * Breaks down milliseconds to HH:MM:SS
 * @param params time in milliseconds
 * @returns {*}
 */
export function getDurationBreakdown(params) {
  let [duration] = params;
  var seconds = parseInt((duration / 1000) % 60), minutes = parseInt((duration / (1000 * 60)) % 60), hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  if(duration<1000) {
    return "00:00:00";
  }
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

export default Ember.Helper.helper(getDurationBreakdown);
