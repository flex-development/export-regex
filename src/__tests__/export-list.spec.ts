/**
 * @file Unit Tests - EXPORT_LIST_REGEX
 * @module export-regex/tests/unit/list
 */

import { omit } from '@flex-development/tutils'
import { dedent } from 'ts-dedent'
import TEST_SUBJECT from '../export-list'

describe('unit:EXPORT_LIST_REGEX', () => {
  beforeEach(() => {
    TEST_SUBJECT.lastIndex = 0
  })

  it('should ignore match in aggregate export statement', () => {
    // Arrange
    const code = dedent`
      export { default } from './make'
      export {
        DEFAULTS,
        plugin as default,
        type Options
      } from './plugin'
      export type { Config, Result } from './interfaces'
      export type { default as Options } from './options'
    `

    // Act + Expect
    expect(TEST_SUBJECT.test(code)).to.be.false
  })

  it('should ignore match in multi-line comment', () => {
    // Arrange
    const code = dedent`
      /**
       * @example
       *   export { name1, name2, name3 }
       */
    `

    // Act + Expect
    expect(TEST_SUBJECT.test(code)).to.be.false
  })

  it('should ignore match in single-line comment', () => {
    expect(TEST_SUBJECT.test('// export { foo, bar }')).to.be.false
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
        }
      `

      // Act
      const result = TEST_SUBJECT.exec(code)

      // Expect
      expect(result).to.not.be.null
      expect(result).toMatchSnapshot()
    })

    it('should match named export(s) in single-line statement', () => {
      // Arrange
      const code = 'export { defineBuildConfig, type BuildConfig }'

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
        }
      `

      // Act
      const result = TEST_SUBJECT.exec(code)

      // Expect
      expect(result).to.not.be.null
      expect(result).toMatchSnapshot()
    })

    it('should match named type export(s) in single-line statement', () => {
      // Act
      const result = TEST_SUBJECT.exec('export type { default as Options }')

      // Expect
      expect(result).to.not.be.null
      expect(result).toMatchSnapshot()
    })

    it('should match nested export statement(s) in declaration file', () => {
      // Arrange
      const code = dedent`
        declare module 'module-name' {
          export {
            DEFAULTS,
            plugin as default,
            type Options
          }
          export { defineBuildConfig, type BuildConfig } from "#src"
          export type {
            JsonObject,
            LiteralUnion,
            Nullable
          } from '@flex-development/tutils'
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
          export * as constants from "./constants"
          export type { default as Options }
          export type { default as Options } from "./options"
          export * from './utils'
          export interface User {}
          export abstract class House {}
          export const { name1, name2: bar } = o;
          export const [ name1, name2 ] = array;
          export default async function foo() {}
          export default foo
          export default 1 + 1;
          export type { Config, Result }
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
