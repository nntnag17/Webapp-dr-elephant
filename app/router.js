import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('dashboard', function () {
    this.route('workflow');
    this.route('job');
    this.route('app');
  });
  this.route('help');
  this.route('workflow');
  this.route('job');
  this.route('app');
  this.route('search');
  this.route('job-history', function () {
    this.route('heuristics');
    this.route('time');
  });
  this.route('flow-history');
});

export default Router;
