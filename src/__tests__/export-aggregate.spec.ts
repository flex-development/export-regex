/**
 * @file Unit Tests - EXPORT_AGGREGATE_REGEX
 * @module export-regex/tests/unit/aggregate
 */

import { omit } from 'radash'
import { dedent } from 'ts-dedent'
import TEST_SUBJECT from '../export-aggregate'

describe('unit:EXPORT_AGGREGATE_REGEX', () => {
  beforeEach(() => {
    TEST_SUBJECT.lastIndex = 0
  })

  it('should ignore match in multi-line comment', () => {
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

  it('should ignore match in single-line comment', () => {
    expect(TEST_SUBJECT.test('// export { foo } from "./f.mjs"')).to.be.false
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
      expect(result).toMatchSnapshot()
    })

    it('should match named export(s) in single-line statement', () => {
      // Arrange
      const code = 'export { defineBuildConfig, type BuildConfig } from "#src"'

      // Act
      const result = TEST_SUBJECT.exec(code)

      // Expect
      expect(result).to.not.be.null
      expect(result).toMatchSnapshot()
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
      expect(result).toMatchSnapshot()
    })

    it('should match named type export(s) in single-line statement', () => {
      // Arrange
      const code = 'export type { default as Options } from "./options"'

      // Act
      const result = TEST_SUBJECT.exec(code)

      // Expect
      expect(result).to.not.be.null
      expect(result).toMatchSnapshot()
    })

    it('should match namespace export', () => {
      // Act
      const result = TEST_SUBJECT.exec(`export * from './interfaces'`)

      // Expect
      expect(result).to.not.be.null
      expect(result).toMatchSnapshot()
    })

    it('should match namespace export with alias', () => {
      // Arrange
      const code = 'export * as constants from "./constants"'

      // Act
      const result = TEST_SUBJECT.exec(code)

      // Expect
      expect(result).to.not.be.null
      expect(result).toMatchSnapshot()
    })

    it('should match nested export statement(s) in declaration file', () => {
      // Arrange
      const code = dedent`
        declare module 'module-name' {
          export { default } from './make'
          export {
            DEFAULTS,
            plugin as default,
            type Options
          } from './plugin'
          export type { Config, Result } from './interfaces'
          export type { default as Options } from './options'
          export type Foo from '#foo'
        }
      `

      // Act
      const result = [...code.matchAll(TEST_SUBJECT)]

      // Expect
      expect(result).to.not.be.empty
      expect(result.map(res => omit(res, ['index', 'input']))).toMatchSnapshot()
    })
  })
})
