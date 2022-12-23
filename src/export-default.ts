/**
 * @file EXPORT_DEFAULT_REGEX
 * @module export-regex/default
 */

/**
 * Default `export` statement regex. Ignores matches in comments.
 *
 * Declaration bodies and expressions that are not identifiers are not
 * captured.
 *
 * **Note**: Requires unicode support ([flag `u`][1]).
 *
 * [1]: https://javascript.info/regexp-unicode
 *
 * @see https://regex101.com/r/G7GhEt
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#syntax
 *
 * @example
 *  import { EXPORT_DEFAULT_REGEX } from '@flex-development/export-regex'
 *  import { dedent } from 'ts-dedent'
 *
 *  const code: string = dedent`
 *    export default function () {}
 *    export default async function() {}
 *    export default function* () {}
 *    export default async function* () {}
 *    export default class {}
 *
 *    export default async function functionName() {}
 *    export default function functionName() {}
 *    export default function* generatorName() {}
 *    export default async function* generatorNameAsync() {}
 *    export default class ClassName {}
 *    export default abstract class ClassName {}
 *    export default type Options = {}
 *
 *    export default async () => {}
 *    export default () => {}
 *    export default arg => {}
 *
 *    export default foo
 *    export default foo;export default foo
 *    export default 1 + 1;
 *    export default {};
 *  `
 *
 *  const print = (matches: IterableIterator<RegExpMatchArray>): void => {
 *    console.debug([...matches].map(match => omit(match, ['input'])))
 *  }
 *
 *  print(code.matchAll(EXPORT_DEFAULT_REGEX))
 *  // [
 *  //   {
 *  //     '0': 'export default function',
 *  //     '1': undefined,
 *  //     '2': 'function',
 *  //     '3': undefined,
 *  //     index: 0,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       kind: 'function',
 *  //       exports: undefined
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default async function',
 *  //     '1': 'async',
 *  //     '2': 'function',
 *  //     '3': undefined,
 *  //     index: 30,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: 'async',
 *  //       kind: 'function',
 *  //       exports: undefined
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default function*',
 *  //     '1': undefined,
 *  //     '2': 'function*',
 *  //     '3': undefined,
 *  //     index: 65,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       kind: 'function*',
 *  //       exports: undefined
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default async function*',
 *  //     '1': 'async',
 *  //     '2': 'function*',
 *  //     '3': undefined,
 *  //     index: 96,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: 'async',
 *  //       kind: 'function*',
 *  //       exports: undefined
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default class',
 *  //     '1': undefined,
 *  //     '2': 'class',
 *  //     '3': undefined,
 *  //     index: 133,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       kind: 'class',
 *  //       exports: undefined
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default async function functionName',
 *  //     '1': 'async',
 *  //     '2': 'function',
 *  //     '3': 'functionName',
 *  //     index: 158,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: 'async',
 *  //       kind: 'function',
 *  //       exports: 'functionName'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default function functionName',
 *  //     '1': undefined,
 *  //     '2': 'function',
 *  //     '3': 'functionName',
 *  //     index: 206,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       kind: 'function',
 *  //       exports: 'functionName'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default function* generatorName',
 *  //     '1': undefined,
 *  //     '2': 'function*',
 *  //     '3': 'generatorName',
 *  //     index: 248,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       kind: 'function*',
 *  //       exports: 'generatorName'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default async function* generatorNameAsync',
 *  //     '1': 'async',
 *  //     '2': 'function*',
 *  //     '3': 'generatorNameAsync',
 *  //     index: 292,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: 'async',
 *  //       kind: 'function*',
 *  //       exports: 'generatorNameAsync'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default class ClassName',
 *  //     '1': undefined,
 *  //     '2': 'class',
 *  //     '3': 'ClassName',
 *  //     index: 347,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       kind: 'class',
 *  //       exports: 'ClassName'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default abstract class ClassName',
 *  //     '1': 'abstract',
 *  //     '2': 'class',
 *  //     '3': 'ClassName',
 *  //     index: 381,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: 'abstract',
 *  //       kind: 'class',
 *  //       exports: 'ClassName'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default type Options',
 *  //     '1': undefined,
 *  //     '2': 'type',
 *  //     '3': 'Options',
 *  //     index: 424,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       kind: 'type',
 *  //       exports: 'Options'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default async',
 *  //     '1': 'async',
 *  //     '2': undefined,
 *  //     '3': undefined,
 *  //     index: 458,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: 'async',
 *  //       kind: undefined,
 *  //       exports: undefined
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default',
 *  //     '1': undefined,
 *  //     '2': undefined,
 *  //     '3': undefined,
 *  //     index: 488,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       kind: undefined,
 *  //       exports: undefined
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default',
 *  //     '1': undefined,
 *  //     '2': undefined,
 *  //     '3': undefined,
 *  //     index: 512,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       kind: undefined,
 *  //       exports: undefined
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default foo',
 *  //     '1': undefined,
 *  //     '2': undefined,
 *  //     '3': 'foo',
 *  //     index: 538,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       kind: undefined,
 *  //       exports: 'foo'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default foo',
 *  //     '1': undefined,
 *  //     '2': undefined,
 *  //     '3': 'foo',
 *  //     index: 557,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       kind: undefined,
 *  //       exports: 'foo'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default foo',
 *  //     '1': undefined,
 *  //     '2': undefined,
 *  //     '3': 'foo',
 *  //     index: 576,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       kind: undefined,
 *  //       exports: 'foo'
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default',
 *  //     '1': undefined,
 *  //     '2': undefined,
 *  //     '3': undefined,
 *  //     index: 595,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       kind: undefined,
 *  //       exports: undefined
 *  //     }
 *  //   },
 *  //   {
 *  //     '0': 'export default',
 *  //     '1': undefined,
 *  //     '2': undefined,
 *  //     '3': undefined,
 *  //     index: 617,
 *  //     groups: [Object: null prototype] {
 *  //       modifiers: undefined,
 *  //       kind: undefined,
 *  //       exports: undefined
 *  //     }
 *  //   }
 *  // ]
 *
 * @const {RegExp} EXPORT_DEFAULT_REGEX
 */
const EXPORT_DEFAULT_REGEX: RegExp =
  /(?<=^|[\n;])export\s*default(?:\s*(?<modifiers>(?:abstract(?= *class)|async(?=[\S ]))+))?(?:\s*(?<kind>class|const +enum|enum|function\*?(?=[ (])|interface|namespace|type(?! *\{)))?(?:\s*(?<exports>[$_\p{ID_Start}][$\u200C\u200D\p{ID_Continue}]*)(?=(?:\s*[\n({;])|(?:\s*=\s*\{)|$))?/gu

export default EXPORT_DEFAULT_REGEX
