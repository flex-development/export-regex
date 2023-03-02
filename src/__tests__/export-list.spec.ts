/**
 * @file Unit Tests - EXPORT_LIST_REGEX
 * @module export-regex/tests/unit/list
 */

import { dedent } from 'ts-dedent'
import TEST_SUBJECT from '../export-list'

describe('unit:EXPORT_LIST_REGEX', () => {
  beforeEach(() => {
    TEST_SUBJECT.lastIndex = 0
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
  })
})
