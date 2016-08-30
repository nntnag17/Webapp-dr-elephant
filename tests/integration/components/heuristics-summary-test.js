import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('heuristics-summary', 'Integration | Component | heuristics summary', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{heuristics-summary}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#heuristics-summary}}
      template block text
    {{/heuristics-summary}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
