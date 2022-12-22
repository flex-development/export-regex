/**
 * @file Unit Tests - EXPORT_AGGREGATE_REGEX
 * @module export-regex/tests/aggregate/unit
 */

import { omit } from 'radash'
import { dedent } from 'ts-dedent'
import TEST_SUBJECT from '../export-aggregate'

describe('unit:EXPORT_AGGREGATE_REGEX', () => {
  beforeEach(() => {
    TEST_SUBJECT.lastIndex = 0
  })

  describe('comments', () => {
    it('should ignore export in multi-line comment', () => {
      // Arrange
      const code = dedent`
        /**
         * @example
         *   export * from './utils.mjs'
         */
      `

      // Act + Expect
      expect(TEST_SUBJECT.test(code)).to.be.false
    })

    it('should ignore export in single-line comment', () => {
      expect(TEST_SUBJECT.test('// export { foo } from "./f.mjs"')).to.be.false
    })
  })

  describe('exports', () => {
    it('should match named export(s) in multi-line statement', () => {
      // Arrange
      const code = dedent`
        export {
          addFive,
          addFour,
          addThree,
          addTwo,
          squareFive,
          squareFour,
          squareThree,
          squareTwo
        } from './lib'
      `

      // Act
      const result = TEST_SUBJECT.exec(code)

      // Expect
      expect(result).to.not.be.null
      expect(omit(result!, ['input'])).toMatchSnapshot()
    })

    it('should match named export(s) in single-line statement', () => {
      // Arrange
      const code = 'export { defineBuildConfig, type BuildConfig } from "#src"'

      // Act
      const result = TEST_SUBJECT.exec(code)

      // Expect
      expect(result).to.not.be.null
      expect(omit(result!, ['input'])).toMatchSnapshot()
    })

    it('should match named type export(s) in multi-line statement', () => {
      // Arrange
      const code = dedent`
        export type {
          JsonObject,
          LiteralUnion,
          Nullable
        } from '@flex-development/tutils'
      `

      // Act
      const result = TEST_SUBJECT.exec(code)

      // Expect
      expect(result).to.not.be.null
      expect(omit(result!, ['input'])).toMatchSnapshot()
    })

    it('should match named type export(s) in single-line statement', () => {
      // Arrange
      const code = 'export type { default as Options } from "./options"'

      // Act
      const result = TEST_SUBJECT.exec(code)

      // Expect
      expect(result).to.not.be.null
      expect(omit(result!, ['input'])).toMatchSnapshot()
    })

    it('should match namespace export', () => {
      // Act
      const result = TEST_SUBJECT.exec(`export * from './interfaces'`)

      // Expect
      expect(result).to.not.be.null
      expect(omit(result!, ['input'])).toMatchSnapshot()
    })

    it('should match namespace export with alias', () => {
      // Arrange
      const code = 'export * as constants from "./constants"'

      // Act
      const result = TEST_SUBJECT.exec(code)

      // Expect
      expect(result).to.not.be.null
      expect(omit(result!, ['input'])).toMatchSnapshot()
    })
  })
})
