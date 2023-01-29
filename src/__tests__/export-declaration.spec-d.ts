/**
 * @file Type Tests - EXPORT_DECLARATION_REGEX
 * @module export-regex/tests/unit-d/declaration
 */

import type TEST_SUBJECT from '../export-declaration'

describe('unit-d:EXPORT_DECLARATION_REGEX', () => {
  it('should be instance of RegExp', () => {
    expectTypeOf<typeof TEST_SUBJECT>().toEqualTypeOf<RegExp>
  })
})
