/**
 * @file Type Tests - EXPORT_DEFAULT_REGEX
 * @module export-regex/tests/unit-d/default
 */

import type TEST_SUBJECT from '../export-default'

describe('unit-d:EXPORT_DEFAULT_REGEX', () => {
  it('should be instance of RegExp', () => {
    expectTypeOf<typeof TEST_SUBJECT>().toEqualTypeOf<RegExp>
  })
})
