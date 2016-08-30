import DS from 'ember-data';

export default DS.Model.extend({
  jobcategory: DS.attr(),
  severities: DS.attr()
});
