/**
 * @file Type Tests - EXPORT_AGGREGATE_REGEX
 * @module export-regex/tests/unit-d/aggregate
 */

import type TEST_SUBJECT from '../export-aggregate'

describe('unit-d:EXPORT_AGGREGATE_REGEX', () => {
  it('should be instance of RegExp', () => {
    expectTypeOf<typeof TEST_SUBJECT>().toEqualTypeOf<RegExp>
  })
})
