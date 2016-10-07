import { notEmpty } from 'dr-elephant/helpers/not-empty';
import { module, test } from 'qunit';

module('Unit | Helper | not empty');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = notEmpty(["this is not empty"]);
  assert.ok(result);
  result = notEmpty([""]);
  assert.ok(!result);
});
