import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('application-list', 'Integration | Component | application list', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{application-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#application-list}}
      template block text
    {{/application-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
