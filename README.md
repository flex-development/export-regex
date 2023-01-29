# export-regex

[![npm](https://img.shields.io/npm/v/@flex-development/export-regex.svg)](https://npmjs.com/package/@flex-development/export-regex)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/export-regex.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits&logoColor=ffffff)](https://conventionalcommits.org/)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript&logoColor=ffffff)](https://typescriptlang.org/)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat&logo=vitest&logoColor=ffffff)](https://vitest.dev/)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat&logo=yarn&logoColor=ffffff)](https://yarnpkg.com/)

`export` statement regex.

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`EXPORT_AGGREGATE_REGEX`](#export_aggregate_regex)
  - [`EXPORT_DECLARATION_REGEX`](#export_declaration_regex)
  - [`EXPORT_DEFAULT_REGEX`](#export_default_regex)
  - [`EXPORT_LIST_REGEX`](#export_list_regex)
- [Types](#types)
- [Related](#related)
- [Contribute](#contribute)

## What is this?

This package contains regular expressions for matching [`export`][1] statements.

## When should I use this?

Use this package when you need to match `export` statements.

**Note**:

- Statements in docblock (`/** */`), multiline (`/* */`), and single-line (`//`) comments are ignored
- Expressions are ECMAScript-compatible. They have **not** been tested with other flavors (PCRE, PCRE2, etc)

## Install

This package is [ESM only][2].

```sh
yarn add @flex-development/export-regex
```

From Git:

```sh
yarn add @flex-development/export-regex@flex-development/export-regex
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/features/protocols#git'>Git - Protocols | Yarn</a>
    &nbsp;for details on requesting a specific branch, commit, or tag.
  </small>
</blockquote>

## Use

Suppose we have the following module:

```typescript
import * as regexp from '@flex-development/export-regex'
import { omit } from 'radash'
import { dedent } from 'ts-dedent'

const code: [string, string, string, string] = [
  dedent`
    export { defineBuildConfig, type BuildConfig } from "#src"
    export type {
      JsonObject,
      LiteralUnion,
      Nullable
    } from '@flex-development/tutils'
    export * as constants from "./constants"
    export * from './interfaces'
  `,
  dedent`
    export const ESM_SYNTAX_REGEX: RegExp = /pattern/gm;
    export declare const RESOLVE_EXTENSIONS: string[]
    export enum Snack{}
    export interface User {}
    export class House {}
    export declare abstract class House extends Building {}
    export abstract class House {}
    export async function run() {}
    export function* foo() {}
    export namespace Foo {}
    export type Foo = 'foo'
    export function functionName() {}
    export class ClassName {}
    export const { name1, name2: bar } = o;
    export const [ name1, name2 ] = array;
  `,
  dedent`
    export default function () {}
    export default async function() {}
    export default class {}

    export default function functionName() {}
    export default function* generatorName() {}
    export default class ClassName {}
    export default abstract class ClassName {}

    export default async () => {}
    export default () => {}
    export default arg => {}

    export default foo
    export default 1 + 1;
  `,
  dedent`
    export { defineBuildConfig, type BuildConfig }
    export type {
      JsonObject,
      LiteralUnion,
      Nullable
    }
  `
]

const print = (matches: IterableIterator<RegExpMatchArray>): void => {
  console.debug([...matches].map(match => omit(match, ['input'])))
}

print(code[0].matchAll(regexp.EXPORT_AGGREGATE_REGEX))
print(code[1].matchAll(regexp.EXPORT_DECLARATION_REGEX))
print(code[2].matchAll(regexp.EXPORT_DEFAULT_REGEX))
print(code[3].matchAll(regexp.EXPORT_LIST_REGEX))
```

...running that yields:

```zsh
[
  {
    '0': 'export { defineBuildConfig, type BuildConfig } from "#src"',
    '1': undefined,
    '2': '{ defineBuildConfig, type BuildConfig }',
    '3': '#src',
    index: 0,
    groups: [Object: null prototype] {
      type: undefined,
      exports: '{ defineBuildConfig, type BuildConfig }',
      specifier: '#src'
    }
  },
  {
    '0': 'export type {\n' +
      '  JsonObject,\n' +
      '  LiteralUnion,\n' +
      '  Nullable\n' +
      "} from '@flex-development/tutils'",
    '1': 'type',
    '2': '{\n  JsonObject,\n  LiteralUnion,\n  Nullable\n}',
    '3': '@flex-development/tutils',
    index: 59,
    groups: [Object: null prototype] {
      type: 'type',
      exports: '{\n  JsonObject,\n  LiteralUnion,\n  Nullable\n}',
      specifier: '@flex-development/tutils'
    }
  },
  {
    '0': 'export * as constants from "./constants"',
    '1': undefined,
    '2': '* as constants',
    '3': './constants',
    index: 148,
    groups: [Object: null prototype] {
      type: undefined,
      exports: '* as constants',
      specifier: './constants'
    }
  },
  {
    '0': "export * from './interfaces'",
    '1': undefined,
    '2': '*',
    '3': './interfaces',
    index: 189,
    groups: [Object: null prototype] {
      type: undefined,
      exports: '*',
      specifier: './interfaces'
    }
  }
]
[
  {
    '0': 'export const ESM_SYNTAX_REGEX',
    '1': undefined,
    '2': 'const',
    '3': 'ESM_SYNTAX_REGEX',
    index: 0,
    groups: [Object: null prototype] {
      modifiers: undefined,
      declaration: 'const',
      exports: 'ESM_SYNTAX_REGEX'
    }
  },
  {
    '0': 'export declare const RESOLVE_EXTENSIONS',
    '1': 'declare',
    '2': 'const',
    '3': 'RESOLVE_EXTENSIONS',
    index: 53,
    groups: [Object: null prototype] {
      modifiers: 'declare',
      declaration: 'const',
      exports: 'RESOLVE_EXTENSIONS'
    }
  },
  {
    '0': 'export enum Snack',
    '1': undefined,
    '2': 'enum',
    '3': 'Snack',
    index: 103,
    groups: [Object: null prototype] {
      modifiers: undefined,
      declaration: 'enum',
      exports: 'Snack'
    }
  },
  {
    '0': 'export interface User',
    '1': undefined,
    '2': 'interface',
    '3': 'User',
    index: 123,
    groups: [Object: null prototype] {
      modifiers: undefined,
      declaration: 'interface',
      exports: 'User'
    }
  },
  {
    '0': 'export class House',
    '1': undefined,
    '2': 'class',
    '3': 'House',
    index: 148,
    groups: [Object: null prototype] {
      modifiers: undefined,
      declaration: 'class',
      exports: 'House'
    }
  },
  {
    '0': 'export declare abstract class House',
    '1': 'declare abstract',
    '2': 'class',
    '3': 'House',
    index: 170,
    groups: [Object: null prototype] {
      modifiers: 'declare abstract',
      declaration: 'class',
      exports: 'House'
    }
  },
  {
    '0': 'export abstract class House',
    '1': 'abstract',
    '2': 'class',
    '3': 'House',
    index: 226,
    groups: [Object: null prototype] {
      modifiers: 'abstract',
      declaration: 'class',
      exports: 'House'
    }
  },
  {
    '0': 'export async function run',
    '1': 'async',
    '2': 'function',
    '3': 'run',
    index: 257,
    groups: [Object: null prototype] {
      modifiers: 'async',
      declaration: 'function',
      exports: 'run'
    }
  },
  {
    '0': 'export function* foo',
    '1': undefined,
    '2': 'function*',
    '3': 'foo',
    index: 288,
    groups: [Object: null prototype] {
      modifiers: undefined,
      declaration: 'function*',
      exports: 'foo'
    }
  },
  {
    '0': 'export namespace Foo',
    '1': undefined,
    '2': 'namespace',
    '3': 'Foo',
    index: 314,
    groups: [Object: null prototype] {
      modifiers: undefined,
      declaration: 'namespace',
      exports: 'Foo'
    }
  },
  {
    '0': 'export type Foo',
    '1': undefined,
    '2': 'type',
    '3': 'Foo',
    index: 338,
    groups: [Object: null prototype] {
      modifiers: undefined,
      declaration: 'type',
      exports: 'Foo'
    }
  },
  {
    '0': 'export function functionName',
    '1': undefined,
    '2': 'function',
    '3': 'functionName',
    index: 362,
    groups: [Object: null prototype] {
      modifiers: undefined,
      declaration: 'function',
      exports: 'functionName'
    }
  },
  {
    '0': 'export class ClassName',
    '1': undefined,
    '2': 'class',
    '3': 'ClassName',
    index: 396,
    groups: [Object: null prototype] {
      modifiers: undefined,
      declaration: 'class',
      exports: 'ClassName'
    }
  },
  {
    '0': 'export const { name1, name2: bar } = o',
    '1': undefined,
    '2': 'const',
    '3': '{ name1, name2: bar }',
    index: 422,
    groups: [Object: null prototype] {
      modifiers: undefined,
      declaration: 'const',
      exports: '{ name1, name2: bar }'
    }
  },
  {
    '0': 'export const [ name1, name2 ] = array',
    '1': undefined,
    '2': 'const',
    '3': '[ name1, name2 ]',
    index: 462,
    groups: [Object: null prototype] {
      modifiers: undefined,
      declaration: 'const',
      exports: '[ name1, name2 ]'
    }
  }
]
[
  {
    '0': 'export default function',
    '1': undefined,
    '2': 'function',
    '3': undefined,
    index: 0,
    groups: [Object: null prototype] {
      modifiers: undefined,
      kind: 'function',
      exports: undefined
    }
  },
  {
    '0': 'export default async function',
    '1': 'async',
    '2': 'function',
    '3': undefined,
    index: 30,
    groups: [Object: null prototype] {
      modifiers: 'async',
      kind: 'function',
      exports: undefined
    }
  },
  {
    '0': 'export default class',
    '1': undefined,
    '2': 'class',
    '3': undefined,
    index: 65,
    groups: [Object: null prototype] {
      modifiers: undefined,
      kind: 'class',
      exports: undefined
    }
  },
  {
    '0': 'export default function functionName',
    '1': undefined,
    '2': 'function',
    '3': 'functionName',
    index: 90,
    groups: [Object: null prototype] {
      modifiers: undefined,
      kind: 'function',
      exports: 'functionName'
    }
  },
  {
    '0': 'export default function* generatorName',
    '1': undefined,
    '2': 'function*',
    '3': 'generatorName',
    index: 132,
    groups: [Object: null prototype] {
      modifiers: undefined,
      kind: 'function*',
      exports: 'generatorName'
    }
  },
  {
    '0': 'export default class ClassName',
    '1': undefined,
    '2': 'class',
    '3': 'ClassName',
    index: 176,
    groups: [Object: null prototype] {
      modifiers: undefined,
      kind: 'class',
      exports: 'ClassName'
    }
  },
  {
    '0': 'export default abstract class ClassName',
    '1': 'abstract',
    '2': 'class',
    '3': 'ClassName',
    index: 210,
    groups: [Object: null prototype] {
      modifiers: 'abstract',
      kind: 'class',
      exports: 'ClassName'
    }
  },
  {
    '0': 'export default async',
    '1': 'async',
    '2': undefined,
    '3': undefined,
    index: 254,
    groups: [Object: null prototype] {
      modifiers: 'async',
      kind: undefined,
      exports: undefined
    }
  },
  {
    '0': 'export default',
    '1': undefined,
    '2': undefined,
    '3': undefined,
    index: 284,
    groups: [Object: null prototype] {
      modifiers: undefined,
      kind: undefined,
      exports: undefined
    }
  },
  {
    '0': 'export default',
    '1': undefined,
    '2': undefined,
    '3': undefined,
    index: 308,
    groups: [Object: null prototype] {
      modifiers: undefined,
      kind: undefined,
      exports: undefined
    }
  },
  {
    '0': 'export default foo',
    '1': undefined,
    '2': undefined,
    '3': 'foo',
    index: 334,
    groups: [Object: null prototype] {
      modifiers: undefined,
      kind: undefined,
      exports: 'foo'
    }
  },
  {
    '0': 'export default',
    '1': undefined,
    '2': undefined,
    '3': undefined,
    index: 353,
    groups: [Object: null prototype] {
      modifiers: undefined,
      kind: undefined,
      exports: undefined
    }
  }
]
[
  {
    '0': 'export { defineBuildConfig, type BuildConfig }',
    '1': undefined,
    '2': '{ defineBuildConfig, type BuildConfig }',
    index: 0,
    groups: [Object: null prototype] {
      type: undefined,
      exports: '{ defineBuildConfig, type BuildConfig }'
    }
  },
  {
    '0': 'export type {\n  JsonObject,\n  LiteralUnion,\n  Nullable\n}',
    '1': 'type',
    '2': '{\n  JsonObject,\n  LiteralUnion,\n  Nullable\n}',
    index: 47,
    groups: [Object: null prototype] {
      type: 'type',
      exports: '{\n  JsonObject,\n  LiteralUnion,\n  Nullable\n}'
    }
  }
]
```

## API

This package exports the following identifiers:

- [`EXPORT_AGGREGATE_REGEX`](#export_aggregate_regex)
- [`EXPORT_DECLARATION_REGEX`](#export_declaration_regex)
- [`EXPORT_DEFAULT_REGEX`](#export_default_regex)
- [`EXPORT_LIST_REGEX`](#export_list_regex)

There is no default export.

### `EXPORT_AGGREGATE_REGEX`

- **Source**: [`src/export-aggregate.ts`](src/export-aggregate.ts)

Aggregate `export` statement regex. Ignores matches in comments.

### `EXPORT_DECLARATION_REGEX`

- **Source**: [`src/export-declaration.ts`](src/export-declaration.ts)

Declaration `export` statement regex. Ignores matches in comments.

**Requires unicode support ([flag u][3])**.

### `EXPORT_DEFAULT_REGEX`

- **Source**: [`src/export-default.ts`](src/export-default.ts)

Default `export` statement regex. Ignores matches in comments.

Declaration bodies and expressions that are not identifiers are not captured.

**Requires unicode support ([flag u][3])**.

### `EXPORT_LIST_REGEX`

- **Source**: [`src/export-list.ts`](src/export-list.ts)

List `export` statement regex. Ignores matches in comments.

## Types

This package is fully typed with [TypeScript][4].

## Related

- [`import-regex`][5] &mdash; `import` statement regex

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export
[2]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[3]: https://javascript.info/regexp-unicode
[4]: https://www.typescriptlang.org
[5]: https://github.com/flex-development/import-regex
