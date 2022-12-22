/**
 * @file EXPORT_LIST_REGEX
 * @module export-regex/list
 */

/**
 * List `export` statement regex. Ignores matches in comments.
 *
 * @example
 *  import { EXPORT_LIST_REGEX } from '@flex-development/export-regex'
 *  import { dedent } from 'ts-dedent'
 *
 *  const code: string = dedent`
 *    export { defineBuildConfig, type BuildConfig }
 *    export type {
 *      JsonObject,
 *      LiteralUnion,
 *      Nullable
 *    }
 *  `
 *
 *  const print = (matches: IterableIterator<RegExpMatchArray>): void => {
 *    console.debug([...matches].map(match => omit(match, ['input'])))
 *  }
 *
 *  print(code.matchAll(EXPORT_LIST_REGEX))
 *  // [
 *  //   {
 *  //     '0': 'export { defineBuildConfig, type BuildConfig }',
 *  //     '1': undefined,
 *  //     '2': '{ defineBuildConfig, type BuildConfig }',
 *  //     index: 0,
 *  //     groups: [Object: null prototype] {
 *  //       type: undefined,
 *  //       exports: '{ defineBuildConfig, type BuildConfig }'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export type {\n  JsonObject,\n  LiteralUnion,\n  Nullable\n}',
 *  //     '1': 'type',
 *  //     '2': '{\n  JsonObject,\n  LiteralUnion,\n  Nullable\n}',
 *  //     index: 82,
 *  //     groups: [Object: null prototype] {
 *  //       type: 'type',
 *  //       exports: '{\n  JsonObject,\n  LiteralUnion,\n  Nullable\n}'
 *  //     }
 *  //   }
 *  // ]
 *
 * @see https://regex101.com/r/KQEDdZ
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#syntax
 *
 * @const {RegExp} EXPORT_LIST_REGEX
 */
const EXPORT_LIST_REGEX: RegExp =
  /(?<=^|[\n;])export(?:(?:\s+(?<type>type)\s*)|\s*)(?<exports>{[\w\t\n\r "$'*,./{}-]+?})/g

export default EXPORT_LIST_REGEX
