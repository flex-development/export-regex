# export-regex

[![npm](https://img.shields.io/npm/v/@flex-development/export-regex.svg)](https://npmjs.com/package/@flex-development/export-regex)
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

**TODO**: Update documentation.

## API

This package exports the following identifiers:

- [`EXPORT_AGGREGATE_REGEX`](#export_aggregate_regex)
- [`EXPORT_DECLARATION_REGEX`](#export_declaration_regex)
- [`EXPORT_DEFAULT_REGEX`](#export_default_regex)
- [`EXPORT_LIST_REGEX`](#export_list_regex)

There is no default export.

### `EXPORT_AGGREGATE_REGEX`

**TODO**: Update documentation.

### `EXPORT_DECLARATION_REGEX`

**TODO**: Update documentation.

### `EXPORT_DEFAULT_REGEX`

**TODO**: Update documentation.

### `EXPORT_LIST_REGEX`

**TODO**: Update documentation.

## Types

This package is fully typed with [TypeScript][3].

## Related

- [`import-regex`][4] &mdash; `import` statement regex

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export
[2]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[3]: https://www.typescriptlang.org
[4]: https://github.com/flex-development/import-regex
