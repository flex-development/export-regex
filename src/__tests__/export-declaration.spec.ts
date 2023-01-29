/**
 * @file Unit Tests - EXPORT_DECLARATION_REGEX
 * @module export-regex/tests/unit/declaration
 */

import { omit } from 'radash'
import { dedent } from 'ts-dedent'
import TEST_SUBJECT from '../export-declaration'

describe('unit:EXPORT_DECLARATION_REGEX', () => {
  beforeEach(() => {
    TEST_SUBJECT.lastIndex = 0
  })

  describe('comments', () => {
    it('should ignore export in multi-line comment', () => {
      // Arrange
      const code = dedent`
        /**
         * @example
         *   export const five = 5
         */
      `

      // Act + Expect
      expect(TEST_SUBJECT.test(code)).to.be.false
    })

    it('should ignore export in single-line comment', () => {
      expect(TEST_SUBJECT.test('// export function foo() {}')).to.be.false
    })
  })

  describe('exports', () => {
    describe('class', () => {
      it('should match export abstract class [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export abstract class Pet {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export class [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export class Pet {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export declare abstract class [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export declare abstract class Pet {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('const enum', () => {
      it('should match export const enum [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export const enum Color {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export declare const enum [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export declare const enum Color {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('const', () => {
      it('should match export const [exports]', () => {
        // Arrange
        const code = dedent`
          ;export const IGNORE_PATTERNS: string[] = [];
          export const { name1, name2: bar } = o;
          export const [ name1, name2 ] = array;
        `

        // Act
        const result = [...code.matchAll(TEST_SUBJECT)]

        // Expect
        expect(result).to.not.be.empty
        expect(result.map(res => omit(res, ['input']))).toMatchSnapshot()
      })

      it('should match export declare const [exports]', () => {
        // Arrange
        const code = ';export declare const IGNORE_PATTERNS: string[] = [];'

        // Act
        const result = TEST_SUBJECT.exec(code)

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('enum', () => {
      it('should match export declare enum [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export declare enum TokenKind {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export enum [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export enum TokenKind {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('function', () => {
      it('should match export async function [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export async function foo() {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export declare async function [exports]', () => {
        // Arrange
        const code = 'export async declare function foo() {}'

        // Act
        const result = TEST_SUBJECT.exec(code)

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export declare function [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export declare function foo() {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export function [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export function foo() {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('function*', () => {
      it('should match export async function* [exports]', () => {
        // Arrange
        const code = 'export async function* generator() {}'

        // Act
        const result = TEST_SUBJECT.exec(code)

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export declare async function* [exports]', () => {
        // Arrange
        const code = 'export async declare function* generator() {}'

        // Act
        const result = TEST_SUBJECT.exec(code)

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export declare function* [exports]', () => {
        // Arrange
        const code = 'export declare function* generator() {}'

        // Act
        const result = TEST_SUBJECT.exec(code)

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export function* [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export function* generator() {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('interface', () => {
      it('should match export declare interface [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export declare interface IUser {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export interface [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export interface IUser {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('let', () => {
      it('should match export declare let [exports]', () => {
        // Arrange
        const code = 'export declare let name1, name2/*, … */;'

        // Act
        const result = TEST_SUBJECT.exec(code)

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export let [exports]', () => {
        // Arrange
        const code = 'export let name1, name2/*, … */'

        // Act
        const result = TEST_SUBJECT.exec(code)

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('namespace', () => {
      it('should match export declare namespace [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export declare namespace Utils {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export namespace [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export namespace Utils {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('type', () => {
      it('should match export declare type [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export declare type Options = {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export type [exports]', () => {
        // Act
        const result = TEST_SUBJECT.exec('export type Options = {}')

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })

    describe('var', () => {
      it('should match export declare var [exports]', () => {
        // Arrange
        const code = 'export declare var name1, name2/*, … */;'

        // Act
        const result = TEST_SUBJECT.exec(code)

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })

      it('should match export var [exports]', () => {
        // Arrange
        const code = 'export var name1, name2/*, … */'

        // Act
        const result = TEST_SUBJECT.exec(code)

        // Expect
        expect(result).to.not.be.null
        expect(omit(result!, ['input'])).toMatchSnapshot()
      })
    })
  })
})
