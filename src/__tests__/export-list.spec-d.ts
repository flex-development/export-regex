/**
 * @file Type Tests - EXPORT_LIST_REGEX
 * @module export-regex/tests/unit-d/list
 */

import type TEST_SUBJECT from '../export-list'

describe('unit-d:EXPORT_LIST_REGEX', () => {
  it('should be instance of RegExp', () => {
    expectTypeOf<typeof TEST_SUBJECT>().toEqualTypeOf<RegExp>
  })
})
