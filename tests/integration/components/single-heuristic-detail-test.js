import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('single-heuristic-detail', 'Integration | Component | single heuristic detail', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{single-heuristic-detail}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#single-heuristic-detail}}
      template block text
    {{/single-heuristic-detail}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
