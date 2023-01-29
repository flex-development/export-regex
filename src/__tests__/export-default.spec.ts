/**
 * @file Unit Tests - EXPORT_DEFAULT_REGEX
 * @module export-regex/tests/unit/default
 */

import { omit } from 'radash'
import { dedent } from 'ts-dedent'
import TEST_SUBJECT from '../export-default'

describe('unit:EXPORT_DEFAULT_REGEX', () => {
  beforeEach(() => {
    TEST_SUBJECT.lastIndex = 0
  })

  describe('comments', () => {
    it('should ignore export in multi-line comment', () => {
      // Arrange
      const code = dedent`
        /**
         * @example
         *   export default foo
         */
      `

      // Act + Expect
      expect(TEST_SUBJECT.test(code)).to.be.false
    })

    it('should ignore export in single-line comment', () => {
      expect(TEST_SUBJECT.test('// export default foo')).to.be.false
    })
  })

  describe('exports', () => {
    describe('class', () => {
      it('should match export default abstract class [identifier]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default abstract class Pet {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export default abstract class', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default abstract class {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export default class [identifier]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default class Pet {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export default class', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default class {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('const enum', () => {
      it('should match export default const enum [identifier]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default const enum Color {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('enum', () => {
      it('should match export default enum [identifier]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default enum TokenKind {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('expressions', () => {
      it('should match export default [identifier]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default foo')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export default', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default 1 + 1')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export default async', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default async () => {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('function', () => {
      it('should match export default async function [identifier]', () => {
        // Arrange
        const code = 'export default async function foo() {}'

        // Act
        const result = TEST_SUBJECT.exec(code)

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export default async function', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default async function() {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export default function [identifier]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default function foo() {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export default function', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default function () {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('function*', () => {
      it('should match export default async function* [identifier]', () => {
        // Arrange
        const code = 'export default async function* generator() {}'

        // Act
        const result = TEST_SUBJECT.exec(code)

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export default async function*', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default async function* () {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export default function* [identifier]', () => {
        // Arrange
        const code = 'export default function* generator() {}'

        // Act
        const result = TEST_SUBJECT.exec(code)

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export default function*', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default function* () {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('interface', () => {
      it('should match export default interface [identifier]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default interface IUser {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('namespace', () => {
      it('should match export default namespace [identifier]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default namespace Utils {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('type', () => {
      it('should match export default type [identifier]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export default type Options = {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })
  })
})
