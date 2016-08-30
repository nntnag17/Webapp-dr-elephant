import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('aggregated-metrics', 'Integration | Component | aggregated metrics', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{aggregated-metrics}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#aggregated-metrics}}
      template block text
    {{/aggregated-metrics}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
