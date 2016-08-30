import { moduleForModel, test } from 'ember-qunit';

moduleForModel('job-summary', 'Unit | Serializer | job summary', {
  // Specify the other units that are required for this test.
  needs: ['serializer:job-summary']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
