import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('heuristic-details-list', 'Integration | Component | heuristic details list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{heuristic-details-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#heuristic-details-list}}
      template block text
    {{/heuristic-details-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
