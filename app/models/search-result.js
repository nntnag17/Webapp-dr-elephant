import DS from 'ember-data';

export default DS.Model.extend({
  start: DS.attr(),
  end: DS.attr(),
  total: DS.attr(),
  summaries: DS.attr()
});
