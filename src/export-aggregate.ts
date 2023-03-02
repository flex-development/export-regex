/**
 * @file EXPORT_AGGREGATE_REGEX
 * @module export-regex/aggregate
 */

/**
 * Aggregate `export` statement regex. Ignores matches in comments.
 *
 * @see https://regex101.com/r/JtvRUt
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#re-exporting_aggregating
 *
 * @example
 *  import { EXPORT_AGGREGATE_REGEX } from '@flex-development/export-regex'
 *  import { dedent } from 'ts-dedent'
 *
 *  const code: string = dedent`
 *    export { defineBuildConfig, type BuildConfig } from "#src"
 *    export type {
 *      JsonObject,
 *      LiteralUnion,
 *      Nullable
 *    } from '@flex-development/tutils'
 *    export * as constants from "./constants"
 *    export * from './interfaces'
 *  `
 *
 *  const print = (matches: IterableIterator<RegExpMatchArray>): void => {
 *    console.debug([...matches].map(match => omit(match, ['input'])))
 *  }
 *
 *  print(code.matchAll(EXPORT_AGGREGATE_REGEX))
 *  // [
 *  //   {
 *  //     '0': 'export { defineBuildConfig, type BuildConfig } from "#src"',
 *  //     '1': undefined,
 *  //     '2': '{ defineBuildConfig, type BuildConfig }',
 *  //     '3': '#src',
 *  //     index: 0,
 *  //     groups: [Object: null prototype] {
 *  //       type: undefined,
 *  //       exports: '{ defineBuildConfig, type BuildConfig }',
 *  //       specifier: '#src'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export * as constants from "./constants"',
 *  //     '1': undefined,
 *  //     '2': '* as constants',
 *  //     '3': './constants',
 *  //     index: 149,
 *  //     groups: [Object: null prototype] {
 *  //       type: undefined,
 *  //       exports: '* as constants',
 *  //       specifier: './constants'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': "export * from './interfaces'",
 *  //     '1': undefined,
 *  //     '2': '*',
 *  //     '3': './interfaces',
 *  //     index: 190,
 *  //     groups: [Object: null prototype] {
 *  //       type: undefined,
 *  //       exports: '*',
 *  //       specifier: './interfaces'
 *  //     }
 *  //   }
 *  // ]
 *
 * @const {RegExp} EXPORT_AGGREGATE_REGEX
 */
const EXPORT_AGGREGATE_REGEX: RegExp =
  /(?<=^|[\n;](?:[\t ]*(?:\w+ )?)?)export(?:(?:\s+(?<type>type)\s*)|\s*)(?<exports>(?:\*(?:\s+as\s+\S+)?)|\S+|(?:{[\w\t\n\r "$'*,./{}-]+?}))\s*from\s*["']\s*(?<specifier>(?:(?<='\s*)[^']*[^\s'](?=\s*'))|(?:(?<="\s*)[^"]*[^\s"](?=\s*")))\s*["']/g

export default EXPORT_AGGREGATE_REGEX
