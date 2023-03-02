/**
 * @file EXPORT_DECLARATION_REGEX
 * @module export-regex/declaration
 */

/**
 * Declaration `export` statement regex. Ignores matches in comments.
 *
 * **Note**: Requires unicode support ([flag `u`][1]).
 *
 * [1]: https://javascript.info/regexp-unicode
 *
 * @see https://regex101.com/r/8HpMrA
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#syntax
 *
 * @example
 *  import { EXPORT_DECLARATION_REGEX } from '@flex-development/export-regex'
 *  import { dedent } from 'ts-dedent'
 *
 *  const code: string = dedent`
 *    export const ESM_SYNTAX_REGEX: RegExp = /pattern/gm;
 *    export declare const RESOLVE_EXTENSIONS: string[]
 *    export enum Snack{}
 *    export const enum Snack {}
 *    export interface User {}
 *    export class House {}
 *    export declare abstract class House extends Building {}
 *    export abstract class House {}
 *    export async function run() {}
 *    export async function* run() {}
 *    export function foo() {}
 *    export function* foo() {}
 *    export const $foo = 42
 *    export const $foo= 42
 *    export namespace Foo {}
 *    export type Foo = 'foo'
 *    export let name1, name2; // also var
 *    export const name1 = 1, name2 = 2; // also var, let
 *    export function functionName() {}
 *    export class ClassName {}
 *    export function* generatorFunctionName() {}
 *    export const { name1, name2: bar } = o;
 *    export const [ name1, name2 ] = array;
 *  `
 *
 *  const print = (matches: IterableIterator<RegExpMatchArray>): void => {
 *    console.debug([...matches].map(match => omit(match, ['input'])))
 *  }
 *
 *  print(code.matchAll(EXPORT_DECLARATION_REGEX))
 *  // [
 *  //   {
 *  //     '0': 'export const ESM_SYNTAX_REGEX',
 *  //     '1': undefined,
 *  //     '2': 'const',
 *  //     '3': 'ESM_SYNTAX_REGEX',
 *  //     index: 0,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'const',
 *  //       exports: 'ESM_SYNTAX_REGEX'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export declare const RESOLVE_EXTENSIONS',
 *  //     '1': 'declare',
 *  //     '2': 'const',
 *  //     '3': 'RESOLVE_EXTENSIONS',
 *  //     index: 53,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: 'declare',
 *  //       declaration: 'const',
 *  //       exports: 'RESOLVE_EXTENSIONS'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export enum Snack',
 *  //     '1': undefined,
 *  //     '2': 'enum',
 *  //     '3': 'Snack',
 *  //     index: 103,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'enum',
 *  //       exports: 'Snack'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export const enum Snack',
 *  //     '1': undefined,
 *  //     '2': 'const enum',
 *  //     '3': 'Snack',
 *  //     index: 123,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'const enum',
 *  //       exports: 'Snack'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export interface User',
 *  //     '1': undefined,
 *  //     '2': 'interface',
 *  //     '3': 'User',
 *  //     index: 150,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'interface',
 *  //       exports: 'User'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export class House',
 *  //     '1': undefined,
 *  //     '2': 'class',
 *  //     '3': 'House',
 *  //     index: 175,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'class',
 *  //       exports: 'House'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export declare abstract class House',
 *  //     '1': 'declare abstract',
 *  //     '2': 'class',
 *  //     '3': 'House',
 *  //     index: 197,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: 'declare abstract',
 *  //       declaration: 'class',
 *  //       exports: 'House'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export abstract class House',
 *  //     '1': 'abstract',
 *  //     '2': 'class',
 *  //     '3': 'House',
 *  //     index: 253,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: 'abstract',
 *  //       declaration: 'class',
 *  //       exports: 'House'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export async function run',
 *  //     '1': 'async',
 *  //     '2': 'function',
 *  //     '3': 'run',
 *  //     index: 284,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: 'async',
 *  //       declaration: 'function',
 *  //       exports: 'run'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export async function* run',
 *  //     '1': 'async',
 *  //     '2': 'function*',
 *  //     '3': 'run',
 *  //     index: 315,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: 'async',
 *  //       declaration: 'function*',
 *  //       exports: 'run'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export function foo',
 *  //     '1': undefined,
 *  //     '2': 'function',
 *  //     '3': 'foo',
 *  //     index: 347,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'function',
 *  //       exports: 'foo'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export function* foo',
 *  //     '1': undefined,
 *  //     '2': 'function*',
 *  //     '3': 'foo',
 *  //     index: 372,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'function*',
 *  //       exports: 'foo'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export const $foo',
 *  //     '1': undefined,
 *  //     '2': 'const',
 *  //     '3': '$foo',
 *  //     index: 398,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'const',
 *  //       exports: '$foo'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export const $foo',
 *  //     '1': undefined,
 *  //     '2': 'const',
 *  //     '3': '$foo',
 *  //     index: 421,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'const',
 *  //       exports: '$foo'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export namespace Foo',
 *  //     '1': undefined,
 *  //     '2': 'namespace',
 *  //     '3': 'Foo',
 *  //     index: 443,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'namespace',
 *  //       exports: 'Foo'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export type Foo',
 *  //     '1': undefined,
 *  //     '2': 'type',
 *  //     '3': 'Foo',
 *  //     index: 467,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'type',
 *  //       exports: 'Foo'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export let name1, name2',
 *  //     '1': undefined,
 *  //     '2': 'let',
 *  //     '3': 'name1, name2',
 *  //     index: 491,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'let',
 *  //       exports: 'name1, name2'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export const name1 = 1, name2 = 2',
 *  //     '1': undefined,
 *  //     '2': 'const',
 *  //     '3': 'name1 = 1, name2 = 2',
 *  //     index: 536,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'const',
 *  //       exports: 'name1 = 1, name2 = 2'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export function functionName',
 *  //     '1': undefined,
 *  //     '2': 'function',
 *  //     '3': 'functionName',
 *  //     index: 596,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'function',
 *  //       exports: 'functionName'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export class ClassName',
 *  //     '1': undefined,
 *  //     '2': 'class',
 *  //     '3': 'ClassName',
 *  //     index: 639,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'class',
 *  //       exports: 'ClassName'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export function* generatorFunctionName',
 *  //     '1': undefined,
 *  //     '2': 'function*',
 *  //     '3': 'generatorFunctionName',
 *  //     index: 674,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'function*',
 *  //       exports: 'generatorFunctionName'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export const { name1, name2: bar } = o',
 *  //     '1': undefined,
 *  //     '2': 'const',
 *  //     '3': '{ name1, name2: bar }',
 *  //     index: 727,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'const',
 *  //       exports: '{ name1, name2: bar }'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export const [ name1, name2 ] = array',
 *  //     '1': undefined,
 *  //     '2': 'const',
 *  //     '3': '[ name1, name2 ]',
 *  //     index: 767,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       declaration: 'const',
 *  //       exports: '[ name1, name2 ]'
 *  //     }
 *  //   }
 *  // ]
 *
 * @const {RegExp} EXPORT_DECLARATION_REGEX
 */
const EXPORT_DECLARATION_REGEX: RegExp =
  /(?<=^|[\n;](?:[\t ]*(?:\w+ )?)?)export\s*(?<modifiers>(?:\s*declare|\s*abstract|\s*async)+)?\s*(?<declaration>class|const +enum|const|enum|function\*?|interface|let|namespace|type(?! *\{)|var)\s+(?<exports>(?:[$_\p{ID_Start}][$\u200C\u200D\p{ID_Continue}]*(?=[\s=:;/({])(?!.*?,))|(?:[\w\t\n\r .,:$'"=-]+)|(?:[{[][\w\t\n\r .,:$'"-]+[}\]]))(?:\s*=\s*[$_\p{ID_Start}][$\u200C\u200D\p{ID_Continue}]*)?/gu

export default EXPORT_DECLARATION_REGEX
