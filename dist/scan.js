#!/usr/bin/env bun
// @bun
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// scan.ts
import { parseArgs } from "util";
import { readdir, appendFile, mkdir } from "fs/promises";
import { availableParallelism } from "os";
import { createHmac, createHash } from "crypto";
var {dns } = globalThis.Bun;

// node_modules/zod/v4/classic/external.js
var exports_external = {};
__export(exports_external, {
  xor: () => xor,
  xid: () => xid2,
  void: () => _void2,
  uuidv7: () => uuidv7,
  uuidv6: () => uuidv6,
  uuidv4: () => uuidv4,
  uuid: () => uuid2,
  util: () => exports_util,
  url: () => url,
  uppercase: () => _uppercase,
  unknown: () => unknown,
  union: () => union,
  undefined: () => _undefined3,
  ulid: () => ulid2,
  uint64: () => uint64,
  uint32: () => uint32,
  tuple: () => tuple,
  trim: () => _trim,
  treeifyError: () => treeifyError,
  transform: () => transform,
  toUpperCase: () => _toUpperCase,
  toLowerCase: () => _toLowerCase,
  toJSONSchema: () => toJSONSchema,
  templateLiteral: () => templateLiteral,
  symbol: () => symbol,
  superRefine: () => superRefine,
  success: () => success,
  stringbool: () => stringbool,
  stringFormat: () => stringFormat,
  string: () => string2,
  strictObject: () => strictObject,
  startsWith: () => _startsWith,
  slugify: () => _slugify,
  size: () => _size,
  setErrorMap: () => setErrorMap,
  set: () => set,
  safeParseAsync: () => safeParseAsync2,
  safeParse: () => safeParse2,
  safeEncodeAsync: () => safeEncodeAsync2,
  safeEncode: () => safeEncode2,
  safeDecodeAsync: () => safeDecodeAsync2,
  safeDecode: () => safeDecode2,
  registry: () => registry,
  regexes: () => exports_regexes,
  regex: () => _regex,
  refine: () => refine,
  record: () => record,
  readonly: () => readonly,
  property: () => _property,
  promise: () => promise,
  prettifyError: () => prettifyError,
  preprocess: () => preprocess,
  prefault: () => prefault,
  positive: () => _positive,
  pipe: () => pipe,
  partialRecord: () => partialRecord,
  parseAsync: () => parseAsync2,
  parse: () => parse3,
  overwrite: () => _overwrite,
  optional: () => optional,
  object: () => object,
  number: () => number2,
  nullish: () => nullish2,
  nullable: () => nullable,
  null: () => _null3,
  normalize: () => _normalize,
  nonpositive: () => _nonpositive,
  nonoptional: () => nonoptional,
  nonnegative: () => _nonnegative,
  never: () => never,
  negative: () => _negative,
  nativeEnum: () => nativeEnum,
  nanoid: () => nanoid2,
  nan: () => nan,
  multipleOf: () => _multipleOf,
  minSize: () => _minSize,
  minLength: () => _minLength,
  mime: () => _mime,
  meta: () => meta2,
  maxSize: () => _maxSize,
  maxLength: () => _maxLength,
  map: () => map,
  mac: () => mac2,
  lte: () => _lte,
  lt: () => _lt,
  lowercase: () => _lowercase,
  looseRecord: () => looseRecord,
  looseObject: () => looseObject,
  locales: () => exports_locales,
  literal: () => literal,
  length: () => _length,
  lazy: () => lazy,
  ksuid: () => ksuid2,
  keyof: () => keyof,
  jwt: () => jwt,
  json: () => json,
  iso: () => exports_iso,
  ipv6: () => ipv62,
  ipv4: () => ipv42,
  intersection: () => intersection,
  int64: () => int64,
  int32: () => int32,
  int: () => int,
  instanceof: () => _instanceof,
  includes: () => _includes,
  httpUrl: () => httpUrl,
  hostname: () => hostname2,
  hex: () => hex2,
  hash: () => hash,
  guid: () => guid2,
  gte: () => _gte,
  gt: () => _gt,
  globalRegistry: () => globalRegistry,
  getErrorMap: () => getErrorMap,
  function: () => _function,
  fromJSONSchema: () => fromJSONSchema,
  formatError: () => formatError,
  float64: () => float64,
  float32: () => float32,
  flattenError: () => flattenError,
  file: () => file,
  exactOptional: () => exactOptional,
  enum: () => _enum2,
  endsWith: () => _endsWith,
  encodeAsync: () => encodeAsync2,
  encode: () => encode2,
  emoji: () => emoji2,
  email: () => email2,
  e164: () => e1642,
  discriminatedUnion: () => discriminatedUnion,
  describe: () => describe2,
  decodeAsync: () => decodeAsync2,
  decode: () => decode2,
  date: () => date3,
  custom: () => custom,
  cuid2: () => cuid22,
  cuid: () => cuid3,
  core: () => exports_core2,
  config: () => config,
  coerce: () => exports_coerce,
  codec: () => codec,
  clone: () => clone,
  cidrv6: () => cidrv62,
  cidrv4: () => cidrv42,
  check: () => check,
  catch: () => _catch2,
  boolean: () => boolean2,
  bigint: () => bigint2,
  base64url: () => base64url2,
  base64: () => base642,
  array: () => array,
  any: () => any,
  _function: () => _function,
  _default: () => _default2,
  _ZodString: () => _ZodString,
  ZodXor: () => ZodXor,
  ZodXID: () => ZodXID,
  ZodVoid: () => ZodVoid,
  ZodUnknown: () => ZodUnknown,
  ZodUnion: () => ZodUnion,
  ZodUndefined: () => ZodUndefined,
  ZodUUID: () => ZodUUID,
  ZodURL: () => ZodURL,
  ZodULID: () => ZodULID,
  ZodType: () => ZodType,
  ZodTuple: () => ZodTuple,
  ZodTransform: () => ZodTransform,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodSymbol: () => ZodSymbol,
  ZodSuccess: () => ZodSuccess,
  ZodStringFormat: () => ZodStringFormat,
  ZodString: () => ZodString,
  ZodSet: () => ZodSet,
  ZodRecord: () => ZodRecord,
  ZodRealError: () => ZodRealError,
  ZodReadonly: () => ZodReadonly,
  ZodPromise: () => ZodPromise,
  ZodPrefault: () => ZodPrefault,
  ZodPipe: () => ZodPipe,
  ZodOptional: () => ZodOptional,
  ZodObject: () => ZodObject,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodNumber: () => ZodNumber,
  ZodNullable: () => ZodNullable,
  ZodNull: () => ZodNull,
  ZodNonOptional: () => ZodNonOptional,
  ZodNever: () => ZodNever,
  ZodNanoID: () => ZodNanoID,
  ZodNaN: () => ZodNaN,
  ZodMap: () => ZodMap,
  ZodMAC: () => ZodMAC,
  ZodLiteral: () => ZodLiteral,
  ZodLazy: () => ZodLazy,
  ZodKSUID: () => ZodKSUID,
  ZodJWT: () => ZodJWT,
  ZodIssueCode: () => ZodIssueCode,
  ZodIntersection: () => ZodIntersection,
  ZodISOTime: () => ZodISOTime,
  ZodISODuration: () => ZodISODuration,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODate: () => ZodISODate,
  ZodIPv6: () => ZodIPv6,
  ZodIPv4: () => ZodIPv4,
  ZodGUID: () => ZodGUID,
  ZodFunction: () => ZodFunction,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFile: () => ZodFile,
  ZodExactOptional: () => ZodExactOptional,
  ZodError: () => ZodError,
  ZodEnum: () => ZodEnum,
  ZodEmoji: () => ZodEmoji,
  ZodEmail: () => ZodEmail,
  ZodE164: () => ZodE164,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodDefault: () => ZodDefault,
  ZodDate: () => ZodDate,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodCustom: () => ZodCustom,
  ZodCodec: () => ZodCodec,
  ZodCatch: () => ZodCatch,
  ZodCUID2: () => ZodCUID2,
  ZodCUID: () => ZodCUID,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodBoolean: () => ZodBoolean,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBigInt: () => ZodBigInt,
  ZodBase64URL: () => ZodBase64URL,
  ZodBase64: () => ZodBase64,
  ZodArray: () => ZodArray,
  ZodAny: () => ZodAny,
  TimePrecision: () => TimePrecision,
  NEVER: () => NEVER,
  $output: () => $output,
  $input: () => $input,
  $brand: () => $brand
});

// node_modules/zod/v4/core/index.js
var exports_core2 = {};
__export(exports_core2, {
  version: () => version,
  util: () => exports_util,
  treeifyError: () => treeifyError,
  toJSONSchema: () => toJSONSchema,
  toDotPath: () => toDotPath,
  safeParseAsync: () => safeParseAsync,
  safeParse: () => safeParse,
  safeEncodeAsync: () => safeEncodeAsync,
  safeEncode: () => safeEncode,
  safeDecodeAsync: () => safeDecodeAsync,
  safeDecode: () => safeDecode,
  registry: () => registry,
  regexes: () => exports_regexes,
  process: () => process2,
  prettifyError: () => prettifyError,
  parseAsync: () => parseAsync,
  parse: () => parse,
  meta: () => meta,
  locales: () => exports_locales,
  isValidJWT: () => isValidJWT,
  isValidBase64URL: () => isValidBase64URL,
  isValidBase64: () => isValidBase64,
  initializeContext: () => initializeContext,
  globalRegistry: () => globalRegistry,
  globalConfig: () => globalConfig,
  formatError: () => formatError,
  flattenError: () => flattenError,
  finalize: () => finalize,
  extractDefs: () => extractDefs,
  encodeAsync: () => encodeAsync,
  encode: () => encode,
  describe: () => describe,
  decodeAsync: () => decodeAsync,
  decode: () => decode,
  createToJSONSchemaMethod: () => createToJSONSchemaMethod,
  createStandardJSONSchemaMethod: () => createStandardJSONSchemaMethod,
  config: () => config,
  clone: () => clone,
  _xor: () => _xor,
  _xid: () => _xid,
  _void: () => _void,
  _uuidv7: () => _uuidv7,
  _uuidv6: () => _uuidv6,
  _uuidv4: () => _uuidv4,
  _uuid: () => _uuid,
  _url: () => _url,
  _uppercase: () => _uppercase,
  _unknown: () => _unknown,
  _union: () => _union,
  _undefined: () => _undefined2,
  _ulid: () => _ulid,
  _uint64: () => _uint64,
  _uint32: () => _uint32,
  _tuple: () => _tuple,
  _trim: () => _trim,
  _transform: () => _transform,
  _toUpperCase: () => _toUpperCase,
  _toLowerCase: () => _toLowerCase,
  _templateLiteral: () => _templateLiteral,
  _symbol: () => _symbol,
  _superRefine: () => _superRefine,
  _success: () => _success,
  _stringbool: () => _stringbool,
  _stringFormat: () => _stringFormat,
  _string: () => _string,
  _startsWith: () => _startsWith,
  _slugify: () => _slugify,
  _size: () => _size,
  _set: () => _set,
  _safeParseAsync: () => _safeParseAsync,
  _safeParse: () => _safeParse,
  _safeEncodeAsync: () => _safeEncodeAsync,
  _safeEncode: () => _safeEncode,
  _safeDecodeAsync: () => _safeDecodeAsync,
  _safeDecode: () => _safeDecode,
  _regex: () => _regex,
  _refine: () => _refine,
  _record: () => _record,
  _readonly: () => _readonly,
  _property: () => _property,
  _promise: () => _promise,
  _positive: () => _positive,
  _pipe: () => _pipe,
  _parseAsync: () => _parseAsync,
  _parse: () => _parse,
  _overwrite: () => _overwrite,
  _optional: () => _optional,
  _number: () => _number,
  _nullable: () => _nullable,
  _null: () => _null2,
  _normalize: () => _normalize,
  _nonpositive: () => _nonpositive,
  _nonoptional: () => _nonoptional,
  _nonnegative: () => _nonnegative,
  _never: () => _never,
  _negative: () => _negative,
  _nativeEnum: () => _nativeEnum,
  _nanoid: () => _nanoid,
  _nan: () => _nan,
  _multipleOf: () => _multipleOf,
  _minSize: () => _minSize,
  _minLength: () => _minLength,
  _min: () => _gte,
  _mime: () => _mime,
  _maxSize: () => _maxSize,
  _maxLength: () => _maxLength,
  _max: () => _lte,
  _map: () => _map,
  _mac: () => _mac,
  _lte: () => _lte,
  _lt: () => _lt,
  _lowercase: () => _lowercase,
  _literal: () => _literal,
  _length: () => _length,
  _lazy: () => _lazy,
  _ksuid: () => _ksuid,
  _jwt: () => _jwt,
  _isoTime: () => _isoTime,
  _isoDuration: () => _isoDuration,
  _isoDateTime: () => _isoDateTime,
  _isoDate: () => _isoDate,
  _ipv6: () => _ipv6,
  _ipv4: () => _ipv4,
  _intersection: () => _intersection,
  _int64: () => _int64,
  _int32: () => _int32,
  _int: () => _int,
  _includes: () => _includes,
  _guid: () => _guid,
  _gte: () => _gte,
  _gt: () => _gt,
  _float64: () => _float64,
  _float32: () => _float32,
  _file: () => _file,
  _enum: () => _enum,
  _endsWith: () => _endsWith,
  _encodeAsync: () => _encodeAsync,
  _encode: () => _encode,
  _emoji: () => _emoji2,
  _email: () => _email,
  _e164: () => _e164,
  _discriminatedUnion: () => _discriminatedUnion,
  _default: () => _default,
  _decodeAsync: () => _decodeAsync,
  _decode: () => _decode,
  _date: () => _date,
  _custom: () => _custom,
  _cuid2: () => _cuid2,
  _cuid: () => _cuid,
  _coercedString: () => _coercedString,
  _coercedNumber: () => _coercedNumber,
  _coercedDate: () => _coercedDate,
  _coercedBoolean: () => _coercedBoolean,
  _coercedBigint: () => _coercedBigint,
  _cidrv6: () => _cidrv6,
  _cidrv4: () => _cidrv4,
  _check: () => _check,
  _catch: () => _catch,
  _boolean: () => _boolean,
  _bigint: () => _bigint,
  _base64url: () => _base64url,
  _base64: () => _base64,
  _array: () => _array,
  _any: () => _any,
  TimePrecision: () => TimePrecision,
  NEVER: () => NEVER,
  JSONSchemaGenerator: () => JSONSchemaGenerator,
  JSONSchema: () => exports_json_schema,
  Doc: () => Doc,
  $output: () => $output,
  $input: () => $input,
  $constructor: () => $constructor,
  $brand: () => $brand,
  $ZodXor: () => $ZodXor,
  $ZodXID: () => $ZodXID,
  $ZodVoid: () => $ZodVoid,
  $ZodUnknown: () => $ZodUnknown,
  $ZodUnion: () => $ZodUnion,
  $ZodUndefined: () => $ZodUndefined,
  $ZodUUID: () => $ZodUUID,
  $ZodURL: () => $ZodURL,
  $ZodULID: () => $ZodULID,
  $ZodType: () => $ZodType,
  $ZodTuple: () => $ZodTuple,
  $ZodTransform: () => $ZodTransform,
  $ZodTemplateLiteral: () => $ZodTemplateLiteral,
  $ZodSymbol: () => $ZodSymbol,
  $ZodSuccess: () => $ZodSuccess,
  $ZodStringFormat: () => $ZodStringFormat,
  $ZodString: () => $ZodString,
  $ZodSet: () => $ZodSet,
  $ZodRegistry: () => $ZodRegistry,
  $ZodRecord: () => $ZodRecord,
  $ZodRealError: () => $ZodRealError,
  $ZodReadonly: () => $ZodReadonly,
  $ZodPromise: () => $ZodPromise,
  $ZodPrefault: () => $ZodPrefault,
  $ZodPipe: () => $ZodPipe,
  $ZodOptional: () => $ZodOptional,
  $ZodObjectJIT: () => $ZodObjectJIT,
  $ZodObject: () => $ZodObject,
  $ZodNumberFormat: () => $ZodNumberFormat,
  $ZodNumber: () => $ZodNumber,
  $ZodNullable: () => $ZodNullable,
  $ZodNull: () => $ZodNull,
  $ZodNonOptional: () => $ZodNonOptional,
  $ZodNever: () => $ZodNever,
  $ZodNanoID: () => $ZodNanoID,
  $ZodNaN: () => $ZodNaN,
  $ZodMap: () => $ZodMap,
  $ZodMAC: () => $ZodMAC,
  $ZodLiteral: () => $ZodLiteral,
  $ZodLazy: () => $ZodLazy,
  $ZodKSUID: () => $ZodKSUID,
  $ZodJWT: () => $ZodJWT,
  $ZodIntersection: () => $ZodIntersection,
  $ZodISOTime: () => $ZodISOTime,
  $ZodISODuration: () => $ZodISODuration,
  $ZodISODateTime: () => $ZodISODateTime,
  $ZodISODate: () => $ZodISODate,
  $ZodIPv6: () => $ZodIPv6,
  $ZodIPv4: () => $ZodIPv4,
  $ZodGUID: () => $ZodGUID,
  $ZodFunction: () => $ZodFunction,
  $ZodFile: () => $ZodFile,
  $ZodExactOptional: () => $ZodExactOptional,
  $ZodError: () => $ZodError,
  $ZodEnum: () => $ZodEnum,
  $ZodEncodeError: () => $ZodEncodeError,
  $ZodEmoji: () => $ZodEmoji,
  $ZodEmail: () => $ZodEmail,
  $ZodE164: () => $ZodE164,
  $ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
  $ZodDefault: () => $ZodDefault,
  $ZodDate: () => $ZodDate,
  $ZodCustomStringFormat: () => $ZodCustomStringFormat,
  $ZodCustom: () => $ZodCustom,
  $ZodCodec: () => $ZodCodec,
  $ZodCheckUpperCase: () => $ZodCheckUpperCase,
  $ZodCheckStringFormat: () => $ZodCheckStringFormat,
  $ZodCheckStartsWith: () => $ZodCheckStartsWith,
  $ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
  $ZodCheckRegex: () => $ZodCheckRegex,
  $ZodCheckProperty: () => $ZodCheckProperty,
  $ZodCheckOverwrite: () => $ZodCheckOverwrite,
  $ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
  $ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
  $ZodCheckMinSize: () => $ZodCheckMinSize,
  $ZodCheckMinLength: () => $ZodCheckMinLength,
  $ZodCheckMimeType: () => $ZodCheckMimeType,
  $ZodCheckMaxSize: () => $ZodCheckMaxSize,
  $ZodCheckMaxLength: () => $ZodCheckMaxLength,
  $ZodCheckLowerCase: () => $ZodCheckLowerCase,
  $ZodCheckLessThan: () => $ZodCheckLessThan,
  $ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
  $ZodCheckIncludes: () => $ZodCheckIncludes,
  $ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
  $ZodCheckEndsWith: () => $ZodCheckEndsWith,
  $ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
  $ZodCheck: () => $ZodCheck,
  $ZodCatch: () => $ZodCatch,
  $ZodCUID2: () => $ZodCUID2,
  $ZodCUID: () => $ZodCUID,
  $ZodCIDRv6: () => $ZodCIDRv6,
  $ZodCIDRv4: () => $ZodCIDRv4,
  $ZodBoolean: () => $ZodBoolean,
  $ZodBigIntFormat: () => $ZodBigIntFormat,
  $ZodBigInt: () => $ZodBigInt,
  $ZodBase64URL: () => $ZodBase64URL,
  $ZodBase64: () => $ZodBase64,
  $ZodAsyncError: () => $ZodAsyncError,
  $ZodArray: () => $ZodArray,
  $ZodAny: () => $ZodAny
});

// node_modules/zod/v4/core/core.js
var NEVER = Object.freeze({
  status: "aborted"
});
function $constructor(name, initializer, params) {
  function init(inst, def) {
    if (!inst._zod) {
      Object.defineProperty(inst, "_zod", {
        value: {
          def,
          constr: _,
          traits: new Set
        },
        enumerable: false
      });
    }
    if (inst._zod.traits.has(name)) {
      return;
    }
    inst._zod.traits.add(name);
    initializer(inst, def);
    const proto = _.prototype;
    const keys = Object.keys(proto);
    for (let i = 0;i < keys.length; i++) {
      const k = keys[i];
      if (!(k in inst)) {
        inst[k] = proto[k].bind(inst);
      }
    }
  }
  const Parent = params?.Parent ?? Object;

  class Definition extends Parent {
  }
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    var _a;
    const inst = params?.Parent ? new Definition : this;
    init(inst, def);
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    for (const fn of inst._zod.deferred) {
      fn();
    }
    return inst;
  }
  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent)
        return true;
      return inst?._zod?.traits?.has(name);
    }
  });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
var $brand = Symbol("zod_brand");

class $ZodAsyncError extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
}

class $ZodEncodeError extends Error {
  constructor(name) {
    super(`Encountered unidirectional transform during encode: ${name}`);
    this.name = "ZodEncodeError";
  }
}
var globalConfig = {};
function config(newConfig) {
  if (newConfig)
    Object.assign(globalConfig, newConfig);
  return globalConfig;
}
// node_modules/zod/v4/core/util.js
var exports_util = {};
__export(exports_util, {
  unwrapMessage: () => unwrapMessage,
  uint8ArrayToHex: () => uint8ArrayToHex,
  uint8ArrayToBase64url: () => uint8ArrayToBase64url,
  uint8ArrayToBase64: () => uint8ArrayToBase64,
  stringifyPrimitive: () => stringifyPrimitive,
  slugify: () => slugify,
  shallowClone: () => shallowClone,
  safeExtend: () => safeExtend,
  required: () => required,
  randomString: () => randomString,
  propertyKeyTypes: () => propertyKeyTypes,
  promiseAllObject: () => promiseAllObject,
  primitiveTypes: () => primitiveTypes,
  prefixIssues: () => prefixIssues,
  pick: () => pick,
  partial: () => partial,
  parsedType: () => parsedType,
  optionalKeys: () => optionalKeys,
  omit: () => omit,
  objectClone: () => objectClone,
  numKeys: () => numKeys,
  nullish: () => nullish,
  normalizeParams: () => normalizeParams,
  mergeDefs: () => mergeDefs,
  merge: () => merge,
  jsonStringifyReplacer: () => jsonStringifyReplacer,
  joinValues: () => joinValues,
  issue: () => issue,
  isPlainObject: () => isPlainObject,
  isObject: () => isObject,
  hexToUint8Array: () => hexToUint8Array,
  getSizableOrigin: () => getSizableOrigin,
  getParsedType: () => getParsedType,
  getLengthableOrigin: () => getLengthableOrigin,
  getEnumValues: () => getEnumValues,
  getElementAtPath: () => getElementAtPath,
  floatSafeRemainder: () => floatSafeRemainder,
  finalizeIssue: () => finalizeIssue,
  extend: () => extend,
  escapeRegex: () => escapeRegex,
  esc: () => esc,
  defineLazy: () => defineLazy,
  createTransparentProxy: () => createTransparentProxy,
  cloneDef: () => cloneDef,
  clone: () => clone,
  cleanRegex: () => cleanRegex,
  cleanEnum: () => cleanEnum,
  captureStackTrace: () => captureStackTrace,
  cached: () => cached,
  base64urlToUint8Array: () => base64urlToUint8Array,
  base64ToUint8Array: () => base64ToUint8Array,
  assignProp: () => assignProp,
  assertNotEqual: () => assertNotEqual,
  assertNever: () => assertNever,
  assertIs: () => assertIs,
  assertEqual: () => assertEqual,
  assert: () => assert,
  allowsEval: () => allowsEval,
  aborted: () => aborted,
  NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
  Class: () => Class,
  BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES
});
function assertEqual(val) {
  return val;
}
function assertNotEqual(val) {
  return val;
}
function assertIs(_arg) {}
function assertNever(_x) {
  throw new Error("Unexpected value in exhaustive check");
}
function assert(_) {}
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
  return values;
}
function joinValues(array, separator = "|") {
  return array.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint")
    return value.toString();
  return value;
}
function cached(getter) {
  const set = false;
  return {
    get value() {
      if (!set) {
        const value = getter();
        Object.defineProperty(this, "value", { value });
        return value;
      }
      throw new Error("cached value already set");
    }
  };
}
function nullish(input) {
  return input === null || input === undefined;
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepString = step.toString();
  let stepDecCount = (stepString.split(".")[1] || "").length;
  if (stepDecCount === 0 && /\d?e-\d?/.test(stepString)) {
    const match = stepString.match(/\d?e-(\d?)/);
    if (match?.[1]) {
      stepDecCount = Number.parseInt(match[1]);
    }
  }
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var EVALUATING = Symbol("evaluating");
function defineLazy(object, key, getter) {
  let value = undefined;
  Object.defineProperty(object, key, {
    get() {
      if (value === EVALUATING) {
        return;
      }
      if (value === undefined) {
        value = EVALUATING;
        value = getter();
      }
      return value;
    },
    set(v) {
      Object.defineProperty(object, key, {
        value: v
      });
    },
    configurable: true
  });
}
function objectClone(obj) {
  return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
}
function mergeDefs(...defs) {
  const mergedDescriptors = {};
  for (const def of defs) {
    const descriptors = Object.getOwnPropertyDescriptors(def);
    Object.assign(mergedDescriptors, descriptors);
  }
  return Object.defineProperties({}, mergedDescriptors);
}
function cloneDef(schema) {
  return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path) {
  if (!path)
    return obj;
  return path.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
  const keys = Object.keys(promisesObj);
  const promises = keys.map((key) => promisesObj[key]);
  return Promise.all(promises).then((results) => {
    const resolvedObj = {};
    for (let i = 0;i < keys.length; i++) {
      resolvedObj[keys[i]] = results[i];
    }
    return resolvedObj;
  });
}
function randomString(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let str = "";
  for (let i = 0;i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
function esc(str) {
  return JSON.stringify(str);
}
function slugify(input) {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = cached(() => {
  if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
    return false;
  }
  try {
    const F = Function;
    new F("");
    return true;
  } catch (_) {
    return false;
  }
});
function isPlainObject(o) {
  if (isObject(o) === false)
    return false;
  const ctor = o.constructor;
  if (ctor === undefined)
    return true;
  if (typeof ctor !== "function")
    return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function shallowClone(o) {
  if (isPlainObject(o))
    return { ...o };
  if (Array.isArray(o))
    return [...o];
  return o;
}
function numKeys(data) {
  let keyCount = 0;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      keyCount++;
    }
  }
  return keyCount;
}
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return "undefined";
    case "string":
      return "string";
    case "number":
      return Number.isNaN(data) ? "nan" : "number";
    case "boolean":
      return "boolean";
    case "function":
      return "function";
    case "bigint":
      return "bigint";
    case "symbol":
      return "symbol";
    case "object":
      if (Array.isArray(data)) {
        return "array";
      }
      if (data === null) {
        return "null";
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return "promise";
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return "map";
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return "set";
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return "date";
      }
      if (typeof File !== "undefined" && data instanceof File) {
        return "file";
      }
      return "object";
    default:
      throw new Error(`Unknown data type: ${t}`);
  }
};
var propertyKeyTypes = new Set(["string", "number", "symbol"]);
var primitiveTypes = new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent)
    cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params)
    return {};
  if (typeof params === "string")
    return { error: () => params };
  if (params?.message !== undefined) {
    if (params?.error !== undefined)
      throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string")
    return { ...params, error: () => params.error };
  return params;
}
function createTransparentProxy(getter) {
  let target;
  return new Proxy({}, {
    get(_, prop, receiver) {
      target ?? (target = getter());
      return Reflect.get(target, prop, receiver);
    },
    set(_, prop, value, receiver) {
      target ?? (target = getter());
      return Reflect.set(target, prop, value, receiver);
    },
    has(_, prop) {
      target ?? (target = getter());
      return Reflect.has(target, prop);
    },
    deleteProperty(_, prop) {
      target ?? (target = getter());
      return Reflect.deleteProperty(target, prop);
    },
    ownKeys(_) {
      target ?? (target = getter());
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(_, prop) {
      target ?? (target = getter());
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
    defineProperty(_, prop, descriptor) {
      target ?? (target = getter());
      return Reflect.defineProperty(target, prop, descriptor);
    }
  });
}
function stringifyPrimitive(value) {
  if (typeof value === "bigint")
    return value.toString() + "n";
  if (typeof value === "string")
    return `"${value}"`;
  return `${value}`;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
  });
}
var NUMBER_FORMAT_RANGES = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-340282346638528860000000000000000000000, 340282346638528860000000000000000000000],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
var BIGINT_FORMAT_RANGES = {
  int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
  uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function pick(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = {};
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        newShape[key] = currDef.shape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function omit(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = { ...schema._zod.def.shape };
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        delete newShape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function extend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  const checks = schema._zod.def.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    const existingShape = schema._zod.def.shape;
    for (const key in shape) {
      if (Object.getOwnPropertyDescriptor(existingShape, key) !== undefined) {
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
      }
    }
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function safeExtend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to safeExtend: expected a plain object");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function merge(a, b) {
  const def = mergeDefs(a._zod.def, {
    get shape() {
      const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
    get catchall() {
      return b._zod.def.catchall;
    },
    checks: []
  });
  return clone(a, def);
}
function partial(Class, schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in oldShape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = Class ? new Class({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      } else {
        for (const key in oldShape) {
          shape[key] = Class ? new Class({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    },
    checks: []
  });
  return clone(schema, def);
}
function required(Class, schema, mask) {
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in shape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = new Class({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      } else {
        for (const key in oldShape) {
          shape[key] = new Class({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    }
  });
  return clone(schema, def);
}
function aborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex;i < x.issues.length; i++) {
    if (x.issues[i]?.continue !== true) {
      return true;
    }
  }
  return false;
}
function prefixIssues(path, issues) {
  return issues.map((iss) => {
    var _a;
    (_a = iss).path ?? (_a.path = []);
    iss.path.unshift(path);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config2) {
  const full = { ...iss, path: iss.path ?? [] };
  if (!iss.message) {
    const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input";
    full.message = message;
  }
  delete full.inst;
  delete full.continue;
  if (!ctx?.reportInput) {
    delete full.input;
  }
  return full;
}
function getSizableOrigin(input) {
  if (input instanceof Set)
    return "set";
  if (input instanceof Map)
    return "map";
  if (input instanceof File)
    return "file";
  return "unknown";
}
function getLengthableOrigin(input) {
  if (Array.isArray(input))
    return "array";
  if (typeof input === "string")
    return "string";
  return "unknown";
}
function parsedType(data) {
  const t = typeof data;
  switch (t) {
    case "number": {
      return Number.isNaN(data) ? "nan" : "number";
    }
    case "object": {
      if (data === null) {
        return "null";
      }
      if (Array.isArray(data)) {
        return "array";
      }
      const obj = data;
      if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) {
        return obj.constructor.name;
      }
    }
  }
  return t;
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") {
    return {
      message: iss,
      code: "custom",
      input,
      inst
    };
  }
  return { ...iss };
}
function cleanEnum(obj) {
  return Object.entries(obj).filter(([k, _]) => {
    return Number.isNaN(Number.parseInt(k, 10));
  }).map((el) => el[1]);
}
function base64ToUint8Array(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0;i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
function uint8ArrayToBase64(bytes) {
  let binaryString = "";
  for (let i = 0;i < bytes.length; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return btoa(binaryString);
}
function base64urlToUint8Array(base64url) {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - base64.length % 4) % 4);
  return base64ToUint8Array(base64 + padding);
}
function uint8ArrayToBase64url(bytes) {
  return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hexToUint8Array(hex) {
  const cleanHex = hex.replace(/^0x/, "");
  if (cleanHex.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0;i < cleanHex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
  }
  return bytes;
}
function uint8ArrayToHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

class Class {
  constructor(..._args) {}
}

// node_modules/zod/v4/core/errors.js
var initializer = (inst, def) => {
  inst.name = "$ZodError";
  Object.defineProperty(inst, "_zod", {
    value: inst._zod,
    enumerable: false
  });
  Object.defineProperty(inst, "issues", {
    value: def,
    enumerable: false
  });
  inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
  Object.defineProperty(inst, "toString", {
    value: () => inst.message,
    enumerable: false
  });
};
var $ZodError = $constructor("$ZodError", initializer);
var $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });
function flattenError(error, mapper = (issue2) => issue2.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error.issues) {
    if (sub.path.length > 0) {
      fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
      fieldErrors[sub.path[0]].push(mapper(sub));
    } else {
      formErrors.push(mapper(sub));
    }
  }
  return { formErrors, fieldErrors };
}
function formatError(error, mapper = (issue2) => issue2.message) {
  const fieldErrors = { _errors: [] };
  const processError = (error2) => {
    for (const issue2 of error2.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues });
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues });
      } else if (issue2.path.length === 0) {
        fieldErrors._errors.push(mapper(issue2));
      } else {
        let curr = fieldErrors;
        let i = 0;
        while (i < issue2.path.length) {
          const el = issue2.path[i];
          const terminal = i === issue2.path.length - 1;
          if (!terminal) {
            curr[el] = curr[el] || { _errors: [] };
          } else {
            curr[el] = curr[el] || { _errors: [] };
            curr[el]._errors.push(mapper(issue2));
          }
          curr = curr[el];
          i++;
        }
      }
    }
  };
  processError(error);
  return fieldErrors;
}
function treeifyError(error, mapper = (issue2) => issue2.message) {
  const result = { errors: [] };
  const processError = (error2, path = []) => {
    var _a, _b;
    for (const issue2 of error2.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }, issue2.path));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues }, issue2.path);
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues }, issue2.path);
      } else {
        const fullpath = [...path, ...issue2.path];
        if (fullpath.length === 0) {
          result.errors.push(mapper(issue2));
          continue;
        }
        let curr = result;
        let i = 0;
        while (i < fullpath.length) {
          const el = fullpath[i];
          const terminal = i === fullpath.length - 1;
          if (typeof el === "string") {
            curr.properties ?? (curr.properties = {});
            (_a = curr.properties)[el] ?? (_a[el] = { errors: [] });
            curr = curr.properties[el];
          } else {
            curr.items ?? (curr.items = []);
            (_b = curr.items)[el] ?? (_b[el] = { errors: [] });
            curr = curr.items[el];
          }
          if (terminal) {
            curr.errors.push(mapper(issue2));
          }
          i++;
        }
      }
    }
  };
  processError(error);
  return result;
}
function toDotPath(_path) {
  const segs = [];
  const path = _path.map((seg) => typeof seg === "object" ? seg.key : seg);
  for (const seg of path) {
    if (typeof seg === "number")
      segs.push(`[${seg}]`);
    else if (typeof seg === "symbol")
      segs.push(`[${JSON.stringify(String(seg))}]`);
    else if (/[^\w$]/.test(seg))
      segs.push(`[${JSON.stringify(seg)}]`);
    else {
      if (segs.length)
        segs.push(".");
      segs.push(seg);
    }
  }
  return segs.join("");
}
function prettifyError(error) {
  const lines = [];
  const issues = [...error.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
  for (const issue2 of issues) {
    lines.push(`✖ ${issue2.message}`);
    if (issue2.path?.length)
      lines.push(`  → at ${toDotPath(issue2.path)}`);
  }
  return lines.join(`
`);
}

// node_modules/zod/v4/core/parse.js
var _parse = (_Err) => (schema, value, _ctx, _params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError;
  }
  if (result.issues.length) {
    const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, _params?.callee);
    throw e;
  }
  return result.value;
};
var parse = /* @__PURE__ */ _parse($ZodRealError);
var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  if (result.issues.length) {
    const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, params?.callee);
    throw e;
  }
  return result.value;
};
var parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
var _safeParse = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError;
  }
  return result.issues.length ? {
    success: false,
    error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
var safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length ? {
    success: false,
    error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
var safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
var _encode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _parse(_Err)(schema, value, ctx);
};
var encode = /* @__PURE__ */ _encode($ZodRealError);
var _decode = (_Err) => (schema, value, _ctx) => {
  return _parse(_Err)(schema, value, _ctx);
};
var decode = /* @__PURE__ */ _decode($ZodRealError);
var _encodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _parseAsync(_Err)(schema, value, ctx);
};
var encodeAsync = /* @__PURE__ */ _encodeAsync($ZodRealError);
var _decodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _parseAsync(_Err)(schema, value, _ctx);
};
var decodeAsync = /* @__PURE__ */ _decodeAsync($ZodRealError);
var _safeEncode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _safeParse(_Err)(schema, value, ctx);
};
var safeEncode = /* @__PURE__ */ _safeEncode($ZodRealError);
var _safeDecode = (_Err) => (schema, value, _ctx) => {
  return _safeParse(_Err)(schema, value, _ctx);
};
var safeDecode = /* @__PURE__ */ _safeDecode($ZodRealError);
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _safeParseAsync(_Err)(schema, value, ctx);
};
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync($ZodRealError);
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _safeParseAsync(_Err)(schema, value, _ctx);
};
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync($ZodRealError);
// node_modules/zod/v4/core/regexes.js
var exports_regexes = {};
__export(exports_regexes, {
  xid: () => xid,
  uuid7: () => uuid7,
  uuid6: () => uuid6,
  uuid4: () => uuid4,
  uuid: () => uuid,
  uppercase: () => uppercase,
  unicodeEmail: () => unicodeEmail,
  undefined: () => _undefined,
  ulid: () => ulid,
  time: () => time,
  string: () => string,
  sha512_hex: () => sha512_hex,
  sha512_base64url: () => sha512_base64url,
  sha512_base64: () => sha512_base64,
  sha384_hex: () => sha384_hex,
  sha384_base64url: () => sha384_base64url,
  sha384_base64: () => sha384_base64,
  sha256_hex: () => sha256_hex,
  sha256_base64url: () => sha256_base64url,
  sha256_base64: () => sha256_base64,
  sha1_hex: () => sha1_hex,
  sha1_base64url: () => sha1_base64url,
  sha1_base64: () => sha1_base64,
  rfc5322Email: () => rfc5322Email,
  number: () => number,
  null: () => _null,
  nanoid: () => nanoid,
  md5_hex: () => md5_hex,
  md5_base64url: () => md5_base64url,
  md5_base64: () => md5_base64,
  mac: () => mac,
  lowercase: () => lowercase,
  ksuid: () => ksuid,
  ipv6: () => ipv6,
  ipv4: () => ipv4,
  integer: () => integer,
  idnEmail: () => idnEmail,
  html5Email: () => html5Email,
  hostname: () => hostname,
  hex: () => hex,
  guid: () => guid,
  extendedDuration: () => extendedDuration,
  emoji: () => emoji,
  email: () => email,
  e164: () => e164,
  duration: () => duration,
  domain: () => domain,
  datetime: () => datetime,
  date: () => date,
  cuid2: () => cuid2,
  cuid: () => cuid,
  cidrv6: () => cidrv6,
  cidrv4: () => cidrv4,
  browserEmail: () => browserEmail,
  boolean: () => boolean,
  bigint: () => bigint,
  base64url: () => base64url,
  base64: () => base64
});
var cuid = /^[cC][^\s-]{8,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
var extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
var uuid = (version) => {
  if (!version)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
var uuid4 = /* @__PURE__ */ uuid(4);
var uuid6 = /* @__PURE__ */ uuid(6);
var uuid7 = /* @__PURE__ */ uuid(7);
var email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
var idnEmail = unicodeEmail;
var browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
  return new RegExp(_emoji, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var mac = (delimiter) => {
  const escapedDelim = escapeRegex(delimiter ?? ":");
  return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
};
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^[A-Za-z0-9_-]*$/;
var hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
var domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
var date = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  return regex;
}
function time(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
  const time2 = timeSource({ precision: args.precision });
  const opts = ["Z"];
  if (args.local)
    opts.push("");
  if (args.offset)
    opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
  const timeRegex = `${time2}(?:${opts.join("|")})`;
  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var string = (params) => {
  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
  return new RegExp(`^${regex}$`);
};
var bigint = /^-?\d+n?$/;
var integer = /^-?\d+$/;
var number = /^-?\d+(?:\.\d+)?$/;
var boolean = /^(?:true|false)$/i;
var _null = /^null$/i;
var _undefined = /^undefined$/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;
var hex = /^[0-9a-fA-F]*$/;
function fixedBase64(bodyLength, padding) {
  return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
}
function fixedBase64url(length) {
  return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
}
var md5_hex = /^[0-9a-fA-F]{32}$/;
var md5_base64 = /* @__PURE__ */ fixedBase64(22, "==");
var md5_base64url = /* @__PURE__ */ fixedBase64url(22);
var sha1_hex = /^[0-9a-fA-F]{40}$/;
var sha1_base64 = /* @__PURE__ */ fixedBase64(27, "=");
var sha1_base64url = /* @__PURE__ */ fixedBase64url(27);
var sha256_hex = /^[0-9a-fA-F]{64}$/;
var sha256_base64 = /* @__PURE__ */ fixedBase64(43, "=");
var sha256_base64url = /* @__PURE__ */ fixedBase64url(43);
var sha384_hex = /^[0-9a-fA-F]{96}$/;
var sha384_base64 = /* @__PURE__ */ fixedBase64(64, "");
var sha384_base64url = /* @__PURE__ */ fixedBase64url(64);
var sha512_hex = /^[0-9a-fA-F]{128}$/;
var sha512_base64 = /* @__PURE__ */ fixedBase64(86, "==");
var sha512_base64url = /* @__PURE__ */ fixedBase64url(86);

// node_modules/zod/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a = inst._zod).onattach ?? (_a.onattach = []);
});
var numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date"
};
var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    if (def.value < curr) {
      if (def.inclusive)
        bag.maximum = def.value;
      else
        bag.exclusiveMaximum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    if (def.value > curr) {
      if (def.inclusive)
        bag.minimum = def.value;
      else
        bag.exclusiveMinimum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    var _a;
    (_a = inst2._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
  });
  inst._zod.check = (payload) => {
    if (typeof payload.value !== typeof def.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
    if (isMultiple)
      return;
    payload.issues.push({
      origin: typeof payload.value,
      code: "not_multiple_of",
      divisor: def.value,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  def.format = def.format || "float64";
  const isInt = def.format?.includes("int");
  const origin = isInt ? "int" : "number";
  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
    if (isInt)
      bag.pattern = integer;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (isInt) {
      if (!Number.isInteger(input)) {
        payload.issues.push({
          expected: origin,
          format: def.format,
          code: "invalid_type",
          continue: false,
          input,
          inst
        });
        return;
      }
      if (!Number.isSafeInteger(input)) {
        if (input > 0) {
          payload.issues.push({
            input,
            code: "too_big",
            maximum: Number.MAX_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        } else {
          payload.issues.push({
            input,
            code: "too_small",
            minimum: Number.MIN_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        }
        return;
      }
    }
    if (input < minimum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  const [minimum, maximum] = BIGINT_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (input < minimum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== undefined;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size <= def.maximum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== undefined;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size >= def.minimum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== undefined;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.size;
    bag.maximum = def.size;
    bag.size = def.size;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size === def.size)
      return;
    const tooBig = size > def.size;
    payload.issues.push({
      origin: getSizableOrigin(input),
      ...tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== undefined;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length <= def.maximum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== undefined;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length >= def.minimum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== undefined;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.length;
    bag.maximum = def.length;
    bag.length = def.length;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length === def.length)
      return;
    const origin = getLengthableOrigin(input);
    const tooBig = length > def.length;
    payload.issues.push({
      origin,
      ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
  var _a, _b;
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    if (def.pattern) {
      bag.patterns ?? (bag.patterns = new Set);
      bag.patterns.add(def.pattern);
    }
  });
  if (def.pattern)
    (_a = inst._zod).check ?? (_a.check = (payload) => {
      def.pattern.lastIndex = 0;
      if (def.pattern.test(payload.value))
        return;
      payload.issues.push({
        origin: "string",
        code: "invalid_format",
        format: def.format,
        input: payload.value,
        ...def.pattern ? { pattern: def.pattern.toString() } : {},
        inst,
        continue: !def.abort
      });
    });
  else
    (_b = inst._zod).check ?? (_b.check = () => {});
});
var $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    def.pattern.lastIndex = 0;
    if (def.pattern.test(payload.value))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: payload.value,
      pattern: def.pattern.toString(),
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
  def.pattern ?? (def.pattern = lowercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
  def.pattern ?? (def.pattern = uppercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
  $ZodCheck.init(inst, def);
  const escapedRegex = escapeRegex(def.includes);
  const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
  def.pattern = pattern;
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = new Set);
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.includes(def.includes, def.position))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: def.includes,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = new Set);
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.startsWith(def.prefix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: def.prefix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = new Set);
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.endsWith(def.suffix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: def.suffix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function handleCheckPropertyResult(result, payload, property) {
  if (result.issues.length) {
    payload.issues.push(...prefixIssues(property, result.issues));
  }
}
var $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    const result = def.schema._zod.run({
      value: payload.value[def.property],
      issues: []
    }, {});
    if (result instanceof Promise) {
      return result.then((result2) => handleCheckPropertyResult(result2, payload, def.property));
    }
    handleCheckPropertyResult(result, payload, def.property);
    return;
  };
});
var $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def) => {
  $ZodCheck.init(inst, def);
  const mimeSet = new Set(def.mime);
  inst._zod.onattach.push((inst2) => {
    inst2._zod.bag.mime = def.mime;
  });
  inst._zod.check = (payload) => {
    if (mimeSet.has(payload.value.type))
      return;
    payload.issues.push({
      code: "invalid_value",
      values: def.mime,
      input: payload.value.type,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    payload.value = def.tx(payload.value);
  };
});

// node_modules/zod/v4/core/doc.js
class Doc {
  constructor(args = []) {
    this.content = [];
    this.indent = 0;
    if (this)
      this.args = args;
  }
  indented(fn) {
    this.indent += 1;
    fn(this);
    this.indent -= 1;
  }
  write(arg) {
    if (typeof arg === "function") {
      arg(this, { execution: "sync" });
      arg(this, { execution: "async" });
      return;
    }
    const content = arg;
    const lines = content.split(`
`).filter((x) => x);
    const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
    const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
    for (const line of dedented) {
      this.content.push(line);
    }
  }
  compile() {
    const F = Function;
    const args = this?.args;
    const content = this?.content ?? [``];
    const lines = [...content.map((x) => `  ${x}`)];
    return new F(...args, lines.join(`
`));
  }
}

// node_modules/zod/v4/core/versions.js
var version = {
  major: 4,
  minor: 3,
  patch: 6
};

// node_modules/zod/v4/core/schemas.js
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
  var _a;
  inst ?? (inst = {});
  inst._zod.def = def;
  inst._zod.bag = inst._zod.bag || {};
  inst._zod.version = version;
  const checks = [...inst._zod.def.checks ?? []];
  if (inst._zod.traits.has("$ZodCheck")) {
    checks.unshift(inst);
  }
  for (const ch of checks) {
    for (const fn of ch._zod.onattach) {
      fn(inst);
    }
  }
  if (checks.length === 0) {
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  } else {
    const runChecks = (payload, checks2, ctx) => {
      let isAborted = aborted(payload);
      let asyncResult;
      for (const ch of checks2) {
        if (ch._zod.def.when) {
          const shouldRun = ch._zod.def.when(payload);
          if (!shouldRun)
            continue;
        } else if (isAborted) {
          continue;
        }
        const currLen = payload.issues.length;
        const _ = ch._zod.check(payload);
        if (_ instanceof Promise && ctx?.async === false) {
          throw new $ZodAsyncError;
        }
        if (asyncResult || _ instanceof Promise) {
          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
            await _;
            const nextLen = payload.issues.length;
            if (nextLen === currLen)
              return;
            if (!isAborted)
              isAborted = aborted(payload, currLen);
          });
        } else {
          const nextLen = payload.issues.length;
          if (nextLen === currLen)
            continue;
          if (!isAborted)
            isAborted = aborted(payload, currLen);
        }
      }
      if (asyncResult) {
        return asyncResult.then(() => {
          return payload;
        });
      }
      return payload;
    };
    const handleCanaryResult = (canary, payload, ctx) => {
      if (aborted(canary)) {
        canary.aborted = true;
        return canary;
      }
      const checkResult = runChecks(payload, checks, ctx);
      if (checkResult instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError;
        return checkResult.then((checkResult2) => inst._zod.parse(checkResult2, ctx));
      }
      return inst._zod.parse(checkResult, ctx);
    };
    inst._zod.run = (payload, ctx) => {
      if (ctx.skipChecks) {
        return inst._zod.parse(payload, ctx);
      }
      if (ctx.direction === "backward") {
        const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
        if (canary instanceof Promise) {
          return canary.then((canary2) => {
            return handleCanaryResult(canary2, payload, ctx);
          });
        }
        return handleCanaryResult(canary, payload, ctx);
      }
      const result = inst._zod.parse(payload, ctx);
      if (result instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError;
        return result.then((result2) => runChecks(result2, checks, ctx));
      }
      return runChecks(result, checks, ctx);
    };
  }
  defineLazy(inst, "~standard", () => ({
    validate: (value) => {
      try {
        const r = safeParse(inst, value);
        return r.success ? { value: r.data } : { issues: r.error?.issues };
      } catch (_) {
        return safeParseAsync(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
});
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string(inst._zod.bag);
  inst._zod.parse = (payload, _) => {
    if (def.coerce)
      try {
        payload.value = String(payload.value);
      } catch (_2) {}
    if (typeof payload.value === "string")
      return payload;
    payload.issues.push({
      expected: "string",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  $ZodString.init(inst, def);
});
var $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
  def.pattern ?? (def.pattern = guid);
  $ZodStringFormat.init(inst, def);
});
var $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
  if (def.version) {
    const versionMap = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    };
    const v = versionMap[def.version];
    if (v === undefined)
      throw new Error(`Invalid UUID version: "${def.version}"`);
    def.pattern ?? (def.pattern = uuid(v));
  } else
    def.pattern ?? (def.pattern = uuid());
  $ZodStringFormat.init(inst, def);
});
var $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
  def.pattern ?? (def.pattern = email);
  $ZodStringFormat.init(inst, def);
});
var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    try {
      const trimmed = payload.value.trim();
      const url = new URL(trimmed);
      if (def.hostname) {
        def.hostname.lastIndex = 0;
        if (!def.hostname.test(url.hostname)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid hostname",
            pattern: def.hostname.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (def.protocol) {
        def.protocol.lastIndex = 0;
        if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid protocol",
            pattern: def.protocol.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (def.normalize) {
        payload.value = url.href;
      } else {
        payload.value = trimmed;
      }
      return;
    } catch (_) {
      payload.issues.push({
        code: "invalid_format",
        format: "url",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
  def.pattern ?? (def.pattern = emoji());
  $ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
  def.pattern ?? (def.pattern = nanoid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
  def.pattern ?? (def.pattern = cuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
  def.pattern ?? (def.pattern = cuid2);
  $ZodStringFormat.init(inst, def);
});
var $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
  def.pattern ?? (def.pattern = ulid);
  $ZodStringFormat.init(inst, def);
});
var $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
  def.pattern ?? (def.pattern = xid);
  $ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
  def.pattern ?? (def.pattern = ksuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
  def.pattern ?? (def.pattern = datetime(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
  def.pattern ?? (def.pattern = date);
  $ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
  def.pattern ?? (def.pattern = time(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
  def.pattern ?? (def.pattern = duration);
  $ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
  def.pattern ?? (def.pattern = ipv4);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `ipv4`;
});
var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
  def.pattern ?? (def.pattern = ipv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `ipv6`;
  inst._zod.check = (payload) => {
    try {
      new URL(`http://[${payload.value}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodMAC = /* @__PURE__ */ $constructor("$ZodMAC", (inst, def) => {
  def.pattern ?? (def.pattern = mac(def.delimiter));
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `mac`;
});
var $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv4);
  $ZodStringFormat.init(inst, def);
});
var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    const parts = payload.value.split("/");
    try {
      if (parts.length !== 2)
        throw new Error;
      const [address, prefix] = parts;
      if (!prefix)
        throw new Error;
      const prefixNum = Number(prefix);
      if (`${prefixNum}` !== prefix)
        throw new Error;
      if (prefixNum < 0 || prefixNum > 128)
        throw new Error;
      new URL(`http://[${address}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
function isValidBase64(data) {
  if (data === "")
    return true;
  if (data.length % 4 !== 0)
    return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
  def.pattern ?? (def.pattern = base64);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64";
  inst._zod.check = (payload) => {
    if (isValidBase64(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function isValidBase64URL(data) {
  if (!base64url.test(data))
    return false;
  const base642 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  const padded = base642.padEnd(Math.ceil(base642.length / 4) * 4, "=");
  return isValidBase64(padded);
}
var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
  def.pattern ?? (def.pattern = base64url);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64url";
  inst._zod.check = (payload) => {
    if (isValidBase64URL(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
  def.pattern ?? (def.pattern = e164);
  $ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3)
      return false;
    const [header] = tokensParts;
    if (!header)
      return false;
    const parsedHeader = JSON.parse(atob(header));
    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
      return false;
    if (!parsedHeader.alg)
      return false;
    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
      return false;
    return true;
  } catch {
    return false;
  }
}
var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidJWT(payload.value, def.alg))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (def.fn(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: def.format,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = inst._zod.bag.pattern ?? number;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Number(payload.value);
      } catch (_) {}
    const input = payload.value;
    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
      return payload;
    }
    const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : undefined : undefined;
    payload.issues.push({
      expected: "number",
      code: "invalid_type",
      input,
      inst,
      ...received ? { received } : {}
    });
    return payload;
  };
});
var $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
  $ZodCheckNumberFormat.init(inst, def);
  $ZodNumber.init(inst, def);
});
var $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = boolean;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Boolean(payload.value);
      } catch (_) {}
    const input = payload.value;
    if (typeof input === "boolean")
      return payload;
    payload.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = bigint;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = BigInt(payload.value);
      } catch (_) {}
    if (typeof payload.value === "bigint")
      return payload;
    payload.issues.push({
      expected: "bigint",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigIntFormat", (inst, def) => {
  $ZodCheckBigIntFormat.init(inst, def);
  $ZodBigInt.init(inst, def);
});
var $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "symbol")
      return payload;
    payload.issues.push({
      expected: "symbol",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _undefined;
  inst._zod.values = new Set([undefined]);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "undefined",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _null;
  inst._zod.values = new Set([null]);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input === null)
      return payload;
    payload.issues.push({
      expected: "null",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.issues.push({
      expected: "never",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "void",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce) {
      try {
        payload.value = new Date(payload.value);
      } catch (_err) {}
    }
    const input = payload.value;
    const isDate = input instanceof Date;
    const isValidDate = isDate && !Number.isNaN(input.getTime());
    if (isValidDate)
      return payload;
    payload.issues.push({
      expected: "date",
      code: "invalid_type",
      input,
      ...isDate ? { received: "Invalid Date" } : {},
      inst
    });
    return payload;
  };
});
function handleArrayResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        expected: "array",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = Array(input.length);
    const proms = [];
    for (let i = 0;i < input.length; i++) {
      const item = input[i];
      const result = def.element._zod.run({
        value: item,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
      } else {
        handleArrayResult(result, payload, i);
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
function handlePropertyResult(result, final, key, input, isOptionalOut) {
  if (result.issues.length) {
    if (isOptionalOut && !(key in input)) {
      return;
    }
    final.issues.push(...prefixIssues(key, result.issues));
  }
  if (result.value === undefined) {
    if (key in input) {
      final.value[key] = undefined;
    }
  } else {
    final.value[key] = result.value;
  }
}
function normalizeDef(def) {
  const keys = Object.keys(def.shape);
  for (const k of keys) {
    if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
      throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
    }
  }
  const okeys = optionalKeys(def.shape);
  return {
    ...def,
    keys,
    keySet: new Set(keys),
    numKeys: keys.length,
    optionalKeys: new Set(okeys)
  };
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
  const unrecognized = [];
  const keySet = def.keySet;
  const _catchall = def.catchall._zod;
  const t = _catchall.def.type;
  const isOptionalOut = _catchall.optout === "optional";
  for (const key in input) {
    if (keySet.has(key))
      continue;
    if (t === "never") {
      unrecognized.push(key);
      continue;
    }
    const r = _catchall.run({ value: input[key], issues: [] }, ctx);
    if (r instanceof Promise) {
      proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalOut)));
    } else {
      handlePropertyResult(r, payload, key, input, isOptionalOut);
    }
  }
  if (unrecognized.length) {
    payload.issues.push({
      code: "unrecognized_keys",
      keys: unrecognized,
      input,
      inst
    });
  }
  if (!proms.length)
    return payload;
  return Promise.all(proms).then(() => {
    return payload;
  });
}
var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
  $ZodType.init(inst, def);
  const desc = Object.getOwnPropertyDescriptor(def, "shape");
  if (!desc?.get) {
    const sh = def.shape;
    Object.defineProperty(def, "shape", {
      get: () => {
        const newSh = { ...sh };
        Object.defineProperty(def, "shape", {
          value: newSh
        });
        return newSh;
      }
    });
  }
  const _normalized = cached(() => normalizeDef(def));
  defineLazy(inst._zod, "propValues", () => {
    const shape = def.shape;
    const propValues = {};
    for (const key in shape) {
      const field = shape[key]._zod;
      if (field.values) {
        propValues[key] ?? (propValues[key] = new Set);
        for (const v of field.values)
          propValues[key].add(v);
      }
    }
    return propValues;
  });
  const isObject2 = isObject;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = {};
    const proms = [];
    const shape = value.shape;
    for (const key of value.keys) {
      const el = shape[key];
      const isOptionalOut = el._zod.optout === "optional";
      const r = el._zod.run({ value: input[key], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalOut)));
      } else {
        handlePropertyResult(r, payload, key, input, isOptionalOut);
      }
    }
    if (!catchall) {
      return proms.length ? Promise.all(proms).then(() => payload) : payload;
    }
    return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
  };
});
var $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
  $ZodObject.init(inst, def);
  const superParse = inst._zod.parse;
  const _normalized = cached(() => normalizeDef(def));
  const generateFastpass = (shape) => {
    const doc = new Doc(["shape", "payload", "ctx"]);
    const normalized = _normalized.value;
    const parseStr = (key) => {
      const k = esc(key);
      return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
    };
    doc.write(`const input = payload.value;`);
    const ids = Object.create(null);
    let counter = 0;
    for (const key of normalized.keys) {
      ids[key] = `key_${counter++}`;
    }
    doc.write(`const newResult = {};`);
    for (const key of normalized.keys) {
      const id = ids[key];
      const k = esc(key);
      const schema = shape[key];
      const isOptionalOut = schema?._zod?.optout === "optional";
      doc.write(`const ${id} = ${parseStr(key)};`);
      if (isOptionalOut) {
        doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
      } else {
        doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
      }
    }
    doc.write(`payload.value = newResult;`);
    doc.write(`return payload;`);
    const fn = doc.compile();
    return (payload, ctx) => fn(shape, payload, ctx);
  };
  let fastpass;
  const isObject2 = isObject;
  const jit = !globalConfig.jitless;
  const allowsEval2 = allowsEval;
  const fastEnabled = jit && allowsEval2.value;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
      if (!fastpass)
        fastpass = generateFastpass(def.shape);
      payload = fastpass(payload, ctx);
      if (!catchall)
        return payload;
      return handleCatchall([], input, payload, ctx, value, inst);
    }
    return superParse(payload, ctx);
  };
});
function handleUnionResults(results, final, inst, ctx) {
  for (const result of results) {
    if (result.issues.length === 0) {
      final.value = result.value;
      return final;
    }
  }
  const nonaborted = results.filter((r) => !aborted(r));
  if (nonaborted.length === 1) {
    final.value = nonaborted[0].value;
    return nonaborted[0];
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  });
  return final;
}
var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : undefined);
  defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : undefined);
  defineLazy(inst._zod, "values", () => {
    if (def.options.every((o) => o._zod.values)) {
      return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
    }
    return;
  });
  defineLazy(inst._zod, "pattern", () => {
    if (def.options.every((o) => o._zod.pattern)) {
      const patterns = def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
    return;
  });
  const single = def.options.length === 1;
  const first = def.options[0]._zod.run;
  inst._zod.parse = (payload, ctx) => {
    if (single) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        if (result.issues.length === 0)
          return result;
        results.push(result);
      }
    }
    if (!async)
      return handleUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleUnionResults(results2, payload, inst, ctx);
    });
  };
});
function handleExclusiveUnionResults(results, final, inst, ctx) {
  const successes = results.filter((r) => r.issues.length === 0);
  if (successes.length === 1) {
    final.value = successes[0].value;
    return final;
  }
  if (successes.length === 0) {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
    });
  } else {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: [],
      inclusive: false
    });
  }
  return final;
}
var $ZodXor = /* @__PURE__ */ $constructor("$ZodXor", (inst, def) => {
  $ZodUnion.init(inst, def);
  def.inclusive = false;
  const single = def.options.length === 1;
  const first = def.options[0]._zod.run;
  inst._zod.parse = (payload, ctx) => {
    if (single) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        results.push(result);
      }
    }
    if (!async)
      return handleExclusiveUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleExclusiveUnionResults(results2, payload, inst, ctx);
    });
  };
});
var $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
  def.inclusive = false;
  $ZodUnion.init(inst, def);
  const _super = inst._zod.parse;
  defineLazy(inst._zod, "propValues", () => {
    const propValues = {};
    for (const option of def.options) {
      const pv = option._zod.propValues;
      if (!pv || Object.keys(pv).length === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
      for (const [k, v] of Object.entries(pv)) {
        if (!propValues[k])
          propValues[k] = new Set;
        for (const val of v) {
          propValues[k].add(val);
        }
      }
    }
    return propValues;
  });
  const disc = cached(() => {
    const opts = def.options;
    const map = new Map;
    for (const o of opts) {
      const values = o._zod.propValues?.[def.discriminator];
      if (!values || values.size === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
      for (const v of values) {
        if (map.has(v)) {
          throw new Error(`Duplicate discriminator value "${String(v)}"`);
        }
        map.set(v, o);
      }
    }
    return map;
  });
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isObject(input)) {
      payload.issues.push({
        code: "invalid_type",
        expected: "object",
        input,
        inst
      });
      return payload;
    }
    const opt = disc.value.get(input?.[def.discriminator]);
    if (opt) {
      return opt._zod.run(payload, ctx);
    }
    if (def.unionFallback) {
      return _super(payload, ctx);
    }
    payload.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: def.discriminator,
      input,
      path: [def.discriminator],
      inst
    });
    return payload;
  };
});
var $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    const left = def.left._zod.run({ value: input, issues: [] }, ctx);
    const right = def.right._zod.run({ value: input, issues: [] }, ctx);
    const async = left instanceof Promise || right instanceof Promise;
    if (async) {
      return Promise.all([left, right]).then(([left2, right2]) => {
        return handleIntersectionResults(payload, left2, right2);
      });
    }
    return handleIntersectionResults(payload, left, right);
  };
});
function mergeValues(a, b) {
  if (a === b) {
    return { valid: true, data: a };
  }
  if (a instanceof Date && b instanceof Date && +a === +b) {
    return { valid: true, data: a };
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const bKeys = Object.keys(b);
    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
        };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { valid: false, mergeErrorPath: [] };
    }
    const newArray = [];
    for (let index = 0;index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
        };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  }
  return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
  const unrecKeys = new Map;
  let unrecIssue;
  for (const iss of left.issues) {
    if (iss.code === "unrecognized_keys") {
      unrecIssue ?? (unrecIssue = iss);
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).l = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  for (const iss of right.issues) {
    if (iss.code === "unrecognized_keys") {
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).r = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
  if (bothKeys.length && unrecIssue) {
    result.issues.push({ ...unrecIssue, keys: bothKeys });
  }
  if (aborted(result))
    return result;
  const merged = mergeValues(left.value, right.value);
  if (!merged.valid) {
    throw new Error(`Unmergable intersection. Error path: ` + `${JSON.stringify(merged.mergeErrorPath)}`);
  }
  result.value = merged.data;
  return result;
}
var $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def) => {
  $ZodType.init(inst, def);
  const items = def.items;
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        input,
        inst,
        expected: "tuple",
        code: "invalid_type"
      });
      return payload;
    }
    payload.value = [];
    const proms = [];
    const reversedIndex = [...items].reverse().findIndex((item) => item._zod.optin !== "optional");
    const optStart = reversedIndex === -1 ? 0 : items.length - reversedIndex;
    if (!def.rest) {
      const tooBig = input.length > items.length;
      const tooSmall = input.length < optStart - 1;
      if (tooBig || tooSmall) {
        payload.issues.push({
          ...tooBig ? { code: "too_big", maximum: items.length, inclusive: true } : { code: "too_small", minimum: items.length },
          input,
          inst,
          origin: "array"
        });
        return payload;
      }
    }
    let i = -1;
    for (const item of items) {
      i++;
      if (i >= input.length) {
        if (i >= optStart)
          continue;
      }
      const result = item._zod.run({
        value: input[i],
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleTupleResult(result2, payload, i)));
      } else {
        handleTupleResult(result, payload, i);
      }
    }
    if (def.rest) {
      const rest = input.slice(items.length);
      for (const el of rest) {
        i++;
        const result = def.rest._zod.run({
          value: el,
          issues: []
        }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result2) => handleTupleResult(result2, payload, i)));
        } else {
          handleTupleResult(result, payload, i);
        }
      }
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleTupleResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isPlainObject(input)) {
      payload.issues.push({
        expected: "record",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    const values = def.keyType._zod.values;
    if (values) {
      payload.value = {};
      const recordKeys = new Set;
      for (const key of values) {
        if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
          recordKeys.add(typeof key === "number" ? key.toString() : key);
          const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then((result2) => {
              if (result2.issues.length) {
                payload.issues.push(...prefixIssues(key, result2.issues));
              }
              payload.value[key] = result2.value;
            }));
          } else {
            if (result.issues.length) {
              payload.issues.push(...prefixIssues(key, result.issues));
            }
            payload.value[key] = result.value;
          }
        }
      }
      let unrecognized;
      for (const key in input) {
        if (!recordKeys.has(key)) {
          unrecognized = unrecognized ?? [];
          unrecognized.push(key);
        }
      }
      if (unrecognized && unrecognized.length > 0) {
        payload.issues.push({
          code: "unrecognized_keys",
          input,
          inst,
          keys: unrecognized
        });
      }
    } else {
      payload.value = {};
      for (const key of Reflect.ownKeys(input)) {
        if (key === "__proto__")
          continue;
        let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
        if (keyResult instanceof Promise) {
          throw new Error("Async schemas not supported in object keys currently");
        }
        const checkNumericKey = typeof key === "string" && number.test(key) && keyResult.issues.length;
        if (checkNumericKey) {
          const retryResult = def.keyType._zod.run({ value: Number(key), issues: [] }, ctx);
          if (retryResult instanceof Promise) {
            throw new Error("Async schemas not supported in object keys currently");
          }
          if (retryResult.issues.length === 0) {
            keyResult = retryResult;
          }
        }
        if (keyResult.issues.length) {
          if (def.mode === "loose") {
            payload.value[key] = input[key];
          } else {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
              input: key,
              path: [key],
              inst
            });
          }
          continue;
        }
        const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result2) => {
            if (result2.issues.length) {
              payload.issues.push(...prefixIssues(key, result2.issues));
            }
            payload.value[keyResult.value] = result2.value;
          }));
        } else {
          if (result.issues.length) {
            payload.issues.push(...prefixIssues(key, result.issues));
          }
          payload.value[keyResult.value] = result.value;
        }
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
var $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Map)) {
      payload.issues.push({
        expected: "map",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    payload.value = new Map;
    for (const [key, value] of input) {
      const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
      const valueResult = def.valueType._zod.run({ value, issues: [] }, ctx);
      if (keyResult instanceof Promise || valueResult instanceof Promise) {
        proms.push(Promise.all([keyResult, valueResult]).then(([keyResult2, valueResult2]) => {
          handleMapResult(keyResult2, valueResult2, payload, key, input, inst, ctx);
        }));
      } else {
        handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
      }
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
  if (keyResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, keyResult.issues));
    } else {
      final.issues.push({
        code: "invalid_key",
        origin: "map",
        input,
        inst,
        issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  if (valueResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, valueResult.issues));
    } else {
      final.issues.push({
        origin: "map",
        code: "invalid_element",
        input,
        inst,
        key,
        issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  final.value.set(keyResult.value, valueResult.value);
}
var $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Set)) {
      payload.issues.push({
        input,
        inst,
        expected: "set",
        code: "invalid_type"
      });
      return payload;
    }
    const proms = [];
    payload.value = new Set;
    for (const item of input) {
      const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleSetResult(result2, payload)));
      } else
        handleSetResult(result, payload);
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleSetResult(result, final) {
  if (result.issues.length) {
    final.issues.push(...result.issues);
  }
  final.value.add(result.value);
}
var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
  $ZodType.init(inst, def);
  const values = getEnumValues(def.entries);
  const valuesSet = new Set(values);
  inst._zod.values = valuesSet;
  inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (valuesSet.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  if (def.values.length === 0) {
    throw new Error("Cannot create literal schema with no valid values");
  }
  const values = new Set(def.values);
  inst._zod.values = values;
  inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values: def.values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input instanceof File)
      return payload;
    payload.issues.push({
      expected: "file",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    const _out = def.transform(payload.value, payload);
    if (ctx.async) {
      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    if (_out instanceof Promise) {
      throw new $ZodAsyncError;
    }
    payload.value = _out;
    return payload;
  };
});
function handleOptionalResult(result, input) {
  if (result.issues.length && input === undefined) {
    return { issues: [], value: undefined };
  }
  return result;
}
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? new Set([...def.innerType._zod.values, undefined]) : undefined;
  });
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    if (def.innerType._zod.optin === "optional") {
      const result = def.innerType._zod.run(payload, ctx);
      if (result instanceof Promise)
        return result.then((r) => handleOptionalResult(r, payload.value));
      return handleOptionalResult(result, payload.value);
    }
    if (payload.value === undefined) {
      return payload;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
  inst._zod.parse = (payload, ctx) => {
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : undefined;
  });
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === null)
      return payload;
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === undefined) {
      payload.value = def.defaultValue;
      return payload;
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleDefaultResult(result2, def));
    }
    return handleDefaultResult(result, def);
  };
});
function handleDefaultResult(payload, def) {
  if (payload.value === undefined) {
    payload.value = def.defaultValue;
  }
  return payload;
}
var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === undefined) {
      payload.value = def.defaultValue;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => {
    const v = def.innerType._zod.values;
    return v ? new Set([...v].filter((x) => x !== undefined)) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleNonOptionalResult(result2, inst));
    }
    return handleNonOptionalResult(result, inst);
  };
});
function handleNonOptionalResult(payload, inst) {
  if (!payload.issues.length && payload.value === undefined) {
    payload.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: payload.value,
      inst
    });
  }
  return payload;
}
var $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError("ZodSuccess");
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => {
        payload.value = result2.issues.length === 0;
        return payload;
      });
    }
    payload.value = result.issues.length === 0;
    return payload;
  };
});
var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => {
        payload.value = result2.value;
        if (result2.issues.length) {
          payload.value = def.catchValue({
            ...payload,
            error: {
              issues: result2.issues.map((iss) => finalizeIssue(iss, ctx, config()))
            },
            input: payload.value
          });
          payload.issues = [];
        }
        return payload;
      });
    }
    payload.value = result.value;
    if (result.issues.length) {
      payload.value = def.catchValue({
        ...payload,
        error: {
          issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
        },
        input: payload.value
      });
      payload.issues = [];
    }
    return payload;
  };
});
var $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "nan",
        code: "invalid_type"
      });
      return payload;
    }
    return payload;
  };
});
var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right2) => handlePipeResult(right2, def.in, ctx));
      }
      return handlePipeResult(right, def.in, ctx);
    }
    const left = def.in._zod.run(payload, ctx);
    if (left instanceof Promise) {
      return left.then((left2) => handlePipeResult(left2, def.out, ctx));
    }
    return handlePipeResult(left, def.out, ctx);
  };
});
function handlePipeResult(left, next, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return next._zod.run({ value: left.value, issues: left.issues }, ctx);
}
var $ZodCodec = /* @__PURE__ */ $constructor("$ZodCodec", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    const direction = ctx.direction || "forward";
    if (direction === "forward") {
      const left = def.in._zod.run(payload, ctx);
      if (left instanceof Promise) {
        return left.then((left2) => handleCodecAResult(left2, def, ctx));
      }
      return handleCodecAResult(left, def, ctx);
    } else {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right2) => handleCodecAResult(right2, def, ctx));
      }
      return handleCodecAResult(right, def, ctx);
    }
  };
});
function handleCodecAResult(result, def, ctx) {
  if (result.issues.length) {
    result.aborted = true;
    return result;
  }
  const direction = ctx.direction || "forward";
  if (direction === "forward") {
    const transformed = def.transform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
    }
    return handleCodecTxResult(result, transformed, def.out, ctx);
  } else {
    const transformed = def.reverseTransform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
    }
    return handleCodecTxResult(result, transformed, def.in, ctx);
  }
}
function handleCodecTxResult(left, value, nextSchema, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return nextSchema._zod.run({ value, issues: left.issues }, ctx);
}
var $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
  defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then(handleReadonlyResult);
    }
    return handleReadonlyResult(result);
  };
});
function handleReadonlyResult(payload) {
  payload.value = Object.freeze(payload.value);
  return payload;
}
var $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  const regexParts = [];
  for (const part of def.parts) {
    if (typeof part === "object" && part !== null) {
      if (!part._zod.pattern) {
        throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
      }
      const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
      if (!source)
        throw new Error(`Invalid template literal part: ${part._zod.traits}`);
      const start = source.startsWith("^") ? 1 : 0;
      const end = source.endsWith("$") ? source.length - 1 : source.length;
      regexParts.push(source.slice(start, end));
    } else if (part === null || primitiveTypes.has(typeof part)) {
      regexParts.push(escapeRegex(`${part}`));
    } else {
      throw new Error(`Invalid template literal part: ${part}`);
    }
  }
  inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "string") {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "string",
        code: "invalid_type"
      });
      return payload;
    }
    inst._zod.pattern.lastIndex = 0;
    if (!inst._zod.pattern.test(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        code: "invalid_format",
        format: def.format ?? "template_literal",
        pattern: inst._zod.pattern.source
      });
      return payload;
    }
    return payload;
  };
});
var $ZodFunction = /* @__PURE__ */ $constructor("$ZodFunction", (inst, def) => {
  $ZodType.init(inst, def);
  inst._def = def;
  inst._zod.def = def;
  inst.implement = (func) => {
    if (typeof func !== "function") {
      throw new Error("implement() must be called with a function");
    }
    return function(...args) {
      const parsedArgs = inst._def.input ? parse(inst._def.input, args) : args;
      const result = Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return parse(inst._def.output, result);
      }
      return result;
    };
  };
  inst.implementAsync = (func) => {
    if (typeof func !== "function") {
      throw new Error("implementAsync() must be called with a function");
    }
    return async function(...args) {
      const parsedArgs = inst._def.input ? await parseAsync(inst._def.input, args) : args;
      const result = await Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return await parseAsync(inst._def.output, result);
      }
      return result;
    };
  };
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "function") {
      payload.issues.push({
        code: "invalid_type",
        expected: "function",
        input: payload.value,
        inst
      });
      return payload;
    }
    const hasPromiseOutput = inst._def.output && inst._def.output._zod.def.type === "promise";
    if (hasPromiseOutput) {
      payload.value = inst.implementAsync(payload.value);
    } else {
      payload.value = inst.implement(payload.value);
    }
    return payload;
  };
  inst.input = (...args) => {
    const F = inst.constructor;
    if (Array.isArray(args[0])) {
      return new F({
        type: "function",
        input: new $ZodTuple({
          type: "tuple",
          items: args[0],
          rest: args[1]
        }),
        output: inst._def.output
      });
    }
    return new F({
      type: "function",
      input: args[0],
      output: inst._def.output
    });
  };
  inst.output = (output) => {
    const F = inst.constructor;
    return new F({
      type: "function",
      input: inst._def.input,
      output
    });
  };
  return inst;
});
var $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
  };
});
var $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "innerType", () => def.getter());
  defineLazy(inst._zod, "pattern", () => inst._zod.innerType?._zod?.pattern);
  defineLazy(inst._zod, "propValues", () => inst._zod.innerType?._zod?.propValues);
  defineLazy(inst._zod, "optin", () => inst._zod.innerType?._zod?.optin ?? undefined);
  defineLazy(inst._zod, "optout", () => inst._zod.innerType?._zod?.optout ?? undefined);
  inst._zod.parse = (payload, ctx) => {
    const inner = inst._zod.innerType;
    return inner._zod.run(payload, ctx);
  };
});
var $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
  $ZodCheck.init(inst, def);
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _) => {
    return payload;
  };
  inst._zod.check = (payload) => {
    const input = payload.value;
    const r = def.fn(input);
    if (r instanceof Promise) {
      return r.then((r2) => handleRefineResult(r2, payload, input, inst));
    }
    handleRefineResult(r, payload, input, inst);
    return;
  };
});
function handleRefineResult(result, payload, input, inst) {
  if (!result) {
    const _iss = {
      code: "custom",
      input,
      inst,
      path: [...inst._zod.def.path ?? []],
      continue: !inst._zod.def.abort
    };
    if (inst._zod.def.params)
      _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}
// node_modules/zod/v4/locales/index.js
var exports_locales = {};
__export(exports_locales, {
  zhTW: () => zh_TW_default,
  zhCN: () => zh_CN_default,
  yo: () => yo_default,
  vi: () => vi_default,
  uz: () => uz_default,
  ur: () => ur_default,
  uk: () => uk_default,
  ua: () => ua_default,
  tr: () => tr_default,
  th: () => th_default,
  ta: () => ta_default,
  sv: () => sv_default,
  sl: () => sl_default,
  ru: () => ru_default,
  pt: () => pt_default,
  ps: () => ps_default,
  pl: () => pl_default,
  ota: () => ota_default,
  no: () => no_default,
  nl: () => nl_default,
  ms: () => ms_default,
  mk: () => mk_default,
  lt: () => lt_default,
  ko: () => ko_default,
  km: () => km_default,
  kh: () => kh_default,
  ka: () => ka_default,
  ja: () => ja_default,
  it: () => it_default,
  is: () => is_default,
  id: () => id_default,
  hy: () => hy_default,
  hu: () => hu_default,
  he: () => he_default,
  frCA: () => fr_CA_default,
  fr: () => fr_default,
  fi: () => fi_default,
  fa: () => fa_default,
  es: () => es_default,
  eo: () => eo_default,
  en: () => en_default,
  de: () => de_default,
  da: () => da_default,
  cs: () => cs_default,
  ca: () => ca_default,
  bg: () => bg_default,
  be: () => be_default,
  az: () => az_default,
  ar: () => ar_default
});

// node_modules/zod/v4/locales/ar.js
var error = () => {
  const Sizable = {
    string: { unit: "حرف", verb: "أن يحوي" },
    file: { unit: "بايت", verb: "أن يحوي" },
    array: { unit: "عنصر", verb: "أن يحوي" },
    set: { unit: "عنصر", verb: "أن يحوي" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "مدخل",
    email: "بريد إلكتروني",
    url: "رابط",
    emoji: "إيموجي",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "تاريخ ووقت بمعيار ISO",
    date: "تاريخ بمعيار ISO",
    time: "وقت بمعيار ISO",
    duration: "مدة بمعيار ISO",
    ipv4: "عنوان IPv4",
    ipv6: "عنوان IPv6",
    cidrv4: "مدى عناوين بصيغة IPv4",
    cidrv6: "مدى عناوين بصيغة IPv6",
    base64: "نَص بترميز base64-encoded",
    base64url: "نَص بترميز base64url-encoded",
    json_string: "نَص على هيئة JSON",
    e164: "رقم هاتف بمعيار E.164",
    jwt: "JWT",
    template_literal: "مدخل"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `مدخلات غير مقبولة: يفترض إدخال instanceof ${issue2.expected}، ولكن تم إدخال ${received}`;
        }
        return `مدخلات غير مقبولة: يفترض إدخال ${expected}، ولكن تم إدخال ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `مدخلات غير مقبولة: يفترض إدخال ${stringifyPrimitive(issue2.values[0])}`;
        return `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return ` أكبر من اللازم: يفترض أن تكون ${issue2.origin ?? "القيمة"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "عنصر"}`;
        return `أكبر من اللازم: يفترض أن تكون ${issue2.origin ?? "القيمة"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `أصغر من اللازم: يفترض لـ ${issue2.origin} أن يكون ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `أصغر من اللازم: يفترض لـ ${issue2.origin} أن يكون ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `نَص غير مقبول: يجب أن يبدأ بـ "${issue2.prefix}"`;
        if (_issue.format === "ends_with")
          return `نَص غير مقبول: يجب أن ينتهي بـ "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `نَص غير مقبول: يجب أن يتضمَّن "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `نَص غير مقبول: يجب أن يطابق النمط ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} غير مقبول`;
      }
      case "not_multiple_of":
        return `رقم غير مقبول: يجب أن يكون من مضاعفات ${issue2.divisor}`;
      case "unrecognized_keys":
        return `معرف${issue2.keys.length > 1 ? "ات" : ""} غريب${issue2.keys.length > 1 ? "ة" : ""}: ${joinValues(issue2.keys, "، ")}`;
      case "invalid_key":
        return `معرف غير مقبول في ${issue2.origin}`;
      case "invalid_union":
        return "مدخل غير مقبول";
      case "invalid_element":
        return `مدخل غير مقبول في ${issue2.origin}`;
      default:
        return "مدخل غير مقبول";
    }
  };
};
function ar_default() {
  return {
    localeError: error()
  };
}
// node_modules/zod/v4/locales/az.js
var error2 = () => {
  const Sizable = {
    string: { unit: "simvol", verb: "olmalıdır" },
    file: { unit: "bayt", verb: "olmalıdır" },
    array: { unit: "element", verb: "olmalıdır" },
    set: { unit: "element", verb: "olmalıdır" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Yanlış dəyər: gözlənilən instanceof ${issue2.expected}, daxil olan ${received}`;
        }
        return `Yanlış dəyər: gözlənilən ${expected}, daxil olan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Yanlış dəyər: gözlənilən ${stringifyPrimitive(issue2.values[0])}`;
        return `Yanlış seçim: aşağıdakılardan biri olmalıdır: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çox böyük: gözlənilən ${issue2.origin ?? "dəyər"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        return `Çox böyük: gözlənilən ${issue2.origin ?? "dəyər"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çox kiçik: gözlənilən ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `Çox kiçik: gözlənilən ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Yanlış mətn: "${_issue.prefix}" ilə başlamalıdır`;
        if (_issue.format === "ends_with")
          return `Yanlış mətn: "${_issue.suffix}" ilə bitməlidir`;
        if (_issue.format === "includes")
          return `Yanlış mətn: "${_issue.includes}" daxil olmalıdır`;
        if (_issue.format === "regex")
          return `Yanlış mətn: ${_issue.pattern} şablonuna uyğun olmalıdır`;
        return `Yanlış ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Yanlış ədəd: ${issue2.divisor} ilə bölünə bilən olmalıdır`;
      case "unrecognized_keys":
        return `Tanınmayan açar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} daxilində yanlış açar`;
      case "invalid_union":
        return "Yanlış dəyər";
      case "invalid_element":
        return `${issue2.origin} daxilində yanlış dəyər`;
      default:
        return `Yanlış dəyər`;
    }
  };
};
function az_default() {
  return {
    localeError: error2()
  };
}
// node_modules/zod/v4/locales/be.js
function getBelarusianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error3 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "сімвал",
        few: "сімвалы",
        many: "сімвалаў"
      },
      verb: "мець"
    },
    array: {
      unit: {
        one: "элемент",
        few: "элементы",
        many: "элементаў"
      },
      verb: "мець"
    },
    set: {
      unit: {
        one: "элемент",
        few: "элементы",
        many: "элементаў"
      },
      verb: "мець"
    },
    file: {
      unit: {
        one: "байт",
        few: "байты",
        many: "байтаў"
      },
      verb: "мець"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "увод",
    email: "email адрас",
    url: "URL",
    emoji: "эмодзі",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO дата і час",
    date: "ISO дата",
    time: "ISO час",
    duration: "ISO працягласць",
    ipv4: "IPv4 адрас",
    ipv6: "IPv6 адрас",
    cidrv4: "IPv4 дыяпазон",
    cidrv6: "IPv6 дыяпазон",
    base64: "радок у фармаце base64",
    base64url: "радок у фармаце base64url",
    json_string: "JSON радок",
    e164: "нумар E.164",
    jwt: "JWT",
    template_literal: "увод"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "лік",
    array: "масіў"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Няправільны ўвод: чакаўся instanceof ${issue2.expected}, атрымана ${received}`;
        }
        return `Няправільны ўвод: чакаўся ${expected}, атрымана ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Няправільны ўвод: чакалася ${stringifyPrimitive(issue2.values[0])}`;
        return `Няправільны варыянт: чакаўся адзін з ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Занадта вялікі: чакалася, што ${issue2.origin ?? "значэнне"} павінна ${sizing.verb} ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `Занадта вялікі: чакалася, што ${issue2.origin ?? "значэнне"} павінна быць ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Занадта малы: чакалася, што ${issue2.origin} павінна ${sizing.verb} ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `Занадта малы: чакалася, што ${issue2.origin} павінна быць ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Няправільны радок: павінен пачынацца з "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Няправільны радок: павінен заканчвацца на "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Няправільны радок: павінен змяшчаць "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Няправільны радок: павінен адпавядаць шаблону ${_issue.pattern}`;
        return `Няправільны ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Няправільны лік: павінен быць кратным ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Нераспазнаны ${issue2.keys.length > 1 ? "ключы" : "ключ"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Няправільны ключ у ${issue2.origin}`;
      case "invalid_union":
        return "Няправільны ўвод";
      case "invalid_element":
        return `Няправільнае значэнне ў ${issue2.origin}`;
      default:
        return `Няправільны ўвод`;
    }
  };
};
function be_default() {
  return {
    localeError: error3()
  };
}
// node_modules/zod/v4/locales/bg.js
var error4 = () => {
  const Sizable = {
    string: { unit: "символа", verb: "да съдържа" },
    file: { unit: "байта", verb: "да съдържа" },
    array: { unit: "елемента", verb: "да съдържа" },
    set: { unit: "елемента", verb: "да съдържа" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "вход",
    email: "имейл адрес",
    url: "URL",
    emoji: "емоджи",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO време",
    date: "ISO дата",
    time: "ISO време",
    duration: "ISO продължителност",
    ipv4: "IPv4 адрес",
    ipv6: "IPv6 адрес",
    cidrv4: "IPv4 диапазон",
    cidrv6: "IPv6 диапазон",
    base64: "base64-кодиран низ",
    base64url: "base64url-кодиран низ",
    json_string: "JSON низ",
    e164: "E.164 номер",
    jwt: "JWT",
    template_literal: "вход"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "число",
    array: "масив"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Невалиден вход: очакван instanceof ${issue2.expected}, получен ${received}`;
        }
        return `Невалиден вход: очакван ${expected}, получен ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Невалиден вход: очакван ${stringifyPrimitive(issue2.values[0])}`;
        return `Невалидна опция: очаквано едно от ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Твърде голямо: очаква се ${issue2.origin ?? "стойност"} да съдържа ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елемента"}`;
        return `Твърде голямо: очаква се ${issue2.origin ?? "стойност"} да бъде ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Твърде малко: очаква се ${issue2.origin} да съдържа ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Твърде малко: очаква се ${issue2.origin} да бъде ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Невалиден низ: трябва да започва с "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Невалиден низ: трябва да завършва с "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Невалиден низ: трябва да включва "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Невалиден низ: трябва да съвпада с ${_issue.pattern}`;
        let invalid_adj = "Невалиден";
        if (_issue.format === "emoji")
          invalid_adj = "Невалидно";
        if (_issue.format === "datetime")
          invalid_adj = "Невалидно";
        if (_issue.format === "date")
          invalid_adj = "Невалидна";
        if (_issue.format === "time")
          invalid_adj = "Невалидно";
        if (_issue.format === "duration")
          invalid_adj = "Невалидна";
        return `${invalid_adj} ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Невалидно число: трябва да бъде кратно на ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Неразпознат${issue2.keys.length > 1 ? "и" : ""} ключ${issue2.keys.length > 1 ? "ове" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Невалиден ключ в ${issue2.origin}`;
      case "invalid_union":
        return "Невалиден вход";
      case "invalid_element":
        return `Невалидна стойност в ${issue2.origin}`;
      default:
        return `Невалиден вход`;
    }
  };
};
function bg_default() {
  return {
    localeError: error4()
  };
}
// node_modules/zod/v4/locales/ca.js
var error5 = () => {
  const Sizable = {
    string: { unit: "caràcters", verb: "contenir" },
    file: { unit: "bytes", verb: "contenir" },
    array: { unit: "elements", verb: "contenir" },
    set: { unit: "elements", verb: "contenir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "adreça electrònica",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "durada ISO",
    ipv4: "adreça IPv4",
    ipv6: "adreça IPv6",
    cidrv4: "rang IPv4",
    cidrv6: "rang IPv6",
    base64: "cadena codificada en base64",
    base64url: "cadena codificada en base64url",
    json_string: "cadena JSON",
    e164: "número E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Tipus invàlid: s'esperava instanceof ${issue2.expected}, s'ha rebut ${received}`;
        }
        return `Tipus invàlid: s'esperava ${expected}, s'ha rebut ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Valor invàlid: s'esperava ${stringifyPrimitive(issue2.values[0])}`;
        return `Opció invàlida: s'esperava una de ${joinValues(issue2.values, " o ")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "com a màxim" : "menys de";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} contingués ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} fos ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "com a mínim" : "més de";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Massa petit: s'esperava que ${issue2.origin} contingués ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Massa petit: s'esperava que ${issue2.origin} fos ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Format invàlid: ha de començar amb "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Format invàlid: ha d'acabar amb "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Format invàlid: ha d'incloure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Format invàlid: ha de coincidir amb el patró ${_issue.pattern}`;
        return `Format invàlid per a ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Número invàlid: ha de ser múltiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clau${issue2.keys.length > 1 ? "s" : ""} no reconeguda${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clau invàlida a ${issue2.origin}`;
      case "invalid_union":
        return "Entrada invàlida";
      case "invalid_element":
        return `Element invàlid a ${issue2.origin}`;
      default:
        return `Entrada invàlida`;
    }
  };
};
function ca_default() {
  return {
    localeError: error5()
  };
}
// node_modules/zod/v4/locales/cs.js
var error6 = () => {
  const Sizable = {
    string: { unit: "znaků", verb: "mít" },
    file: { unit: "bajtů", verb: "mít" },
    array: { unit: "prvků", verb: "mít" },
    set: { unit: "prvků", verb: "mít" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regulární výraz",
    email: "e-mailová adresa",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "datum a čas ve formátu ISO",
    date: "datum ve formátu ISO",
    time: "čas ve formátu ISO",
    duration: "doba trvání ISO",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    cidrv4: "rozsah IPv4",
    cidrv6: "rozsah IPv6",
    base64: "řetězec zakódovaný ve formátu base64",
    base64url: "řetězec zakódovaný ve formátu base64url",
    json_string: "řetězec ve formátu JSON",
    e164: "číslo E.164",
    jwt: "JWT",
    template_literal: "vstup"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "číslo",
    string: "řetězec",
    function: "funkce",
    array: "pole"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neplatný vstup: očekáváno instanceof ${issue2.expected}, obdrženo ${received}`;
        }
        return `Neplatný vstup: očekáváno ${expected}, obdrženo ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neplatný vstup: očekáváno ${stringifyPrimitive(issue2.values[0])}`;
        return `Neplatná možnost: očekávána jedna z hodnot ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je příliš velká: ${issue2.origin ?? "hodnota"} musí mít ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "prvků"}`;
        }
        return `Hodnota je příliš velká: ${issue2.origin ?? "hodnota"} musí být ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je příliš malá: ${issue2.origin ?? "hodnota"} musí mít ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "prvků"}`;
        }
        return `Hodnota je příliš malá: ${issue2.origin ?? "hodnota"} musí být ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Neplatný řetězec: musí začínat na "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Neplatný řetězec: musí končit na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neplatný řetězec: musí obsahovat "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neplatný řetězec: musí odpovídat vzoru ${_issue.pattern}`;
        return `Neplatný formát ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neplatné číslo: musí být násobkem ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neznámé klíče: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neplatný klíč v ${issue2.origin}`;
      case "invalid_union":
        return "Neplatný vstup";
      case "invalid_element":
        return `Neplatná hodnota v ${issue2.origin}`;
      default:
        return `Neplatný vstup`;
    }
  };
};
function cs_default() {
  return {
    localeError: error6()
  };
}
// node_modules/zod/v4/locales/da.js
var error7 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "havde" },
    file: { unit: "bytes", verb: "havde" },
    array: { unit: "elementer", verb: "indeholdt" },
    set: { unit: "elementer", verb: "indeholdt" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-mailadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkeslæt",
    date: "ISO-dato",
    time: "ISO-klokkeslæt",
    duration: "ISO-varighed",
    ipv4: "IPv4-område",
    ipv6: "IPv6-område",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodet streng",
    base64url: "base64url-kodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "streng",
    number: "tal",
    boolean: "boolean",
    array: "liste",
    object: "objekt",
    set: "sæt",
    file: "fil"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ugyldigt input: forventede instanceof ${issue2.expected}, fik ${received}`;
        }
        return `Ugyldigt input: forventede ${expected}, fik ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig værdi: forventede ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldigt valg: forventede en af følgende ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lille: forventede ${origin} havde ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: skal matche mønsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldigt tal: skal være deleligt med ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukendte nøgler" : "Ukendt nøgle"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig nøgle i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldigt input: matcher ingen af de tilladte typer";
      case "invalid_element":
        return `Ugyldig værdi i ${issue2.origin}`;
      default:
        return `Ugyldigt input`;
    }
  };
};
function da_default() {
  return {
    localeError: error7()
  };
}
// node_modules/zod/v4/locales/de.js
var error8 = () => {
  const Sizable = {
    string: { unit: "Zeichen", verb: "zu haben" },
    file: { unit: "Bytes", verb: "zu haben" },
    array: { unit: "Elemente", verb: "zu haben" },
    set: { unit: "Elemente", verb: "zu haben" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "Eingabe",
    email: "E-Mail-Adresse",
    url: "URL",
    emoji: "Emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-Datum und -Uhrzeit",
    date: "ISO-Datum",
    time: "ISO-Uhrzeit",
    duration: "ISO-Dauer",
    ipv4: "IPv4-Adresse",
    ipv6: "IPv6-Adresse",
    cidrv4: "IPv4-Bereich",
    cidrv6: "IPv6-Bereich",
    base64: "Base64-codierter String",
    base64url: "Base64-URL-codierter String",
    json_string: "JSON-String",
    e164: "E.164-Nummer",
    jwt: "JWT",
    template_literal: "Eingabe"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "Zahl",
    array: "Array"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ungültige Eingabe: erwartet instanceof ${issue2.expected}, erhalten ${received}`;
        }
        return `Ungültige Eingabe: erwartet ${expected}, erhalten ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ungültige Eingabe: erwartet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ungültige Option: erwartet eine von ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Zu groß: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
        return `Zu groß: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ist`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} hat`;
        }
        return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ist`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ungültiger String: muss mit "${_issue.prefix}" beginnen`;
        if (_issue.format === "ends_with")
          return `Ungültiger String: muss mit "${_issue.suffix}" enden`;
        if (_issue.format === "includes")
          return `Ungültiger String: muss "${_issue.includes}" enthalten`;
        if (_issue.format === "regex")
          return `Ungültiger String: muss dem Muster ${_issue.pattern} entsprechen`;
        return `Ungültig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ungültige Zahl: muss ein Vielfaches von ${issue2.divisor} sein`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ungültiger Schlüssel in ${issue2.origin}`;
      case "invalid_union":
        return "Ungültige Eingabe";
      case "invalid_element":
        return `Ungültiger Wert in ${issue2.origin}`;
      default:
        return `Ungültige Eingabe`;
    }
  };
};
function de_default() {
  return {
    localeError: error8()
  };
}
// node_modules/zod/v4/locales/en.js
var error9 = () => {
  const Sizable = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" },
    map: { unit: "entries", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `Invalid input: expected ${expected}, received ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `Invalid option: expected one of ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Too big: expected ${issue2.origin ?? "value"} to have ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Too big: expected ${issue2.origin ?? "value"} to be ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Too small: expected ${issue2.origin} to have ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Too small: expected ${issue2.origin} to be ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Invalid string: must start with "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Invalid string: must end with "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Invalid string: must include "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Invalid string: must match pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${issue2.origin}`;
      case "invalid_union":
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${issue2.origin}`;
      default:
        return `Invalid input`;
    }
  };
};
function en_default() {
  return {
    localeError: error9()
  };
}
// node_modules/zod/v4/locales/eo.js
var error10 = () => {
  const Sizable = {
    string: { unit: "karaktrojn", verb: "havi" },
    file: { unit: "bajtojn", verb: "havi" },
    array: { unit: "elementojn", verb: "havi" },
    set: { unit: "elementojn", verb: "havi" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "enigo",
    email: "retadreso",
    url: "URL",
    emoji: "emoĝio",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datotempo",
    date: "ISO-dato",
    time: "ISO-tempo",
    duration: "ISO-daŭro",
    ipv4: "IPv4-adreso",
    ipv6: "IPv6-adreso",
    cidrv4: "IPv4-rango",
    cidrv6: "IPv6-rango",
    base64: "64-ume kodita karaktraro",
    base64url: "URL-64-ume kodita karaktraro",
    json_string: "JSON-karaktraro",
    e164: "E.164-nombro",
    jwt: "JWT",
    template_literal: "enigo"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombro",
    array: "tabelo",
    null: "senvalora"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Nevalida enigo: atendiĝis instanceof ${issue2.expected}, riceviĝis ${received}`;
        }
        return `Nevalida enigo: atendiĝis ${expected}, riceviĝis ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nevalida enigo: atendiĝis ${stringifyPrimitive(issue2.values[0])}`;
        return `Nevalida opcio: atendiĝis unu el ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Tro granda: atendiĝis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
        return `Tro granda: atendiĝis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Tro malgranda: atendiĝis ke ${issue2.origin} havu ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Tro malgranda: atendiĝis ke ${issue2.origin} estu ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nevalida karaktraro: devas komenciĝi per "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nevalida karaktraro: devas finiĝi per "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
        return `Nevalida ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nevalida nombro: devas esti oblo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nekonata${issue2.keys.length > 1 ? "j" : ""} ŝlosilo${issue2.keys.length > 1 ? "j" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nevalida ŝlosilo en ${issue2.origin}`;
      case "invalid_union":
        return "Nevalida enigo";
      case "invalid_element":
        return `Nevalida valoro en ${issue2.origin}`;
      default:
        return `Nevalida enigo`;
    }
  };
};
function eo_default() {
  return {
    localeError: error10()
  };
}
// node_modules/zod/v4/locales/es.js
var error11 = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "tener" },
    file: { unit: "bytes", verb: "tener" },
    array: { unit: "elementos", verb: "tener" },
    set: { unit: "elementos", verb: "tener" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "dirección de correo electrónico",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "fecha y hora ISO",
    date: "fecha ISO",
    time: "hora ISO",
    duration: "duración ISO",
    ipv4: "dirección IPv4",
    ipv6: "dirección IPv6",
    cidrv4: "rango IPv4",
    cidrv6: "rango IPv6",
    base64: "cadena codificada en base64",
    base64url: "URL codificada en base64",
    json_string: "cadena JSON",
    e164: "número E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "texto",
    number: "número",
    boolean: "booleano",
    array: "arreglo",
    object: "objeto",
    set: "conjunto",
    file: "archivo",
    date: "fecha",
    bigint: "número grande",
    symbol: "símbolo",
    undefined: "indefinido",
    null: "nulo",
    function: "función",
    map: "mapa",
    record: "registro",
    tuple: "tupla",
    enum: "enumeración",
    union: "unión",
    literal: "literal",
    promise: "promesa",
    void: "vacío",
    never: "nunca",
    unknown: "desconocido",
    any: "cualquiera"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entrada inválida: se esperaba instanceof ${issue2.expected}, recibido ${received}`;
        }
        return `Entrada inválida: se esperaba ${expected}, recibido ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inválida: se esperaba ${stringifyPrimitive(issue2.values[0])}`;
        return `Opción inválida: se esperaba una de ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `Demasiado pequeño: se esperaba que ${origin} tuviera ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Demasiado pequeño: se esperaba que ${origin} fuera ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Cadena inválida: debe comenzar con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Cadena inválida: debe terminar en "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cadena inválida: debe incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cadena inválida: debe coincidir con el patrón ${_issue.pattern}`;
        return `Inválido ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Número inválido: debe ser múltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Llave${issue2.keys.length > 1 ? "s" : ""} desconocida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Llave inválida en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      case "invalid_union":
        return "Entrada inválida";
      case "invalid_element":
        return `Valor inválido en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      default:
        return `Entrada inválida`;
    }
  };
};
function es_default() {
  return {
    localeError: error11()
  };
}
// node_modules/zod/v4/locales/fa.js
var error12 = () => {
  const Sizable = {
    string: { unit: "کاراکتر", verb: "داشته باشد" },
    file: { unit: "بایت", verb: "داشته باشد" },
    array: { unit: "آیتم", verb: "داشته باشد" },
    set: { unit: "آیتم", verb: "داشته باشد" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ورودی",
    email: "آدرس ایمیل",
    url: "URL",
    emoji: "ایموجی",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "تاریخ و زمان ایزو",
    date: "تاریخ ایزو",
    time: "زمان ایزو",
    duration: "مدت زمان ایزو",
    ipv4: "IPv4 آدرس",
    ipv6: "IPv6 آدرس",
    cidrv4: "IPv4 دامنه",
    cidrv6: "IPv6 دامنه",
    base64: "base64-encoded رشته",
    base64url: "base64url-encoded رشته",
    json_string: "JSON رشته",
    e164: "E.164 عدد",
    jwt: "JWT",
    template_literal: "ورودی"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "عدد",
    array: "آرایه"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `ورودی نامعتبر: می‌بایست instanceof ${issue2.expected} می‌بود، ${received} دریافت شد`;
        }
        return `ورودی نامعتبر: می‌بایست ${expected} می‌بود، ${received} دریافت شد`;
      }
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `ورودی نامعتبر: می‌بایست ${stringifyPrimitive(issue2.values[0])} می‌بود`;
        }
        return `گزینه نامعتبر: می‌بایست یکی از ${joinValues(issue2.values, "|")} می‌بود`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `خیلی بزرگ: ${issue2.origin ?? "مقدار"} باید ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عنصر"} باشد`;
        }
        return `خیلی بزرگ: ${issue2.origin ?? "مقدار"} باید ${adj}${issue2.maximum.toString()} باشد`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `خیلی کوچک: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} ${sizing.unit} باشد`;
        }
        return `خیلی کوچک: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} باشد`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `رشته نامعتبر: باید با "${_issue.prefix}" شروع شود`;
        }
        if (_issue.format === "ends_with") {
          return `رشته نامعتبر: باید با "${_issue.suffix}" تمام شود`;
        }
        if (_issue.format === "includes") {
          return `رشته نامعتبر: باید شامل "${_issue.includes}" باشد`;
        }
        if (_issue.format === "regex") {
          return `رشته نامعتبر: باید با الگوی ${_issue.pattern} مطابقت داشته باشد`;
        }
        return `${FormatDictionary[_issue.format] ?? issue2.format} نامعتبر`;
      }
      case "not_multiple_of":
        return `عدد نامعتبر: باید مضرب ${issue2.divisor} باشد`;
      case "unrecognized_keys":
        return `کلید${issue2.keys.length > 1 ? "های" : ""} ناشناس: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `کلید ناشناس در ${issue2.origin}`;
      case "invalid_union":
        return `ورودی نامعتبر`;
      case "invalid_element":
        return `مقدار نامعتبر در ${issue2.origin}`;
      default:
        return `ورودی نامعتبر`;
    }
  };
};
function fa_default() {
  return {
    localeError: error12()
  };
}
// node_modules/zod/v4/locales/fi.js
var error13 = () => {
  const Sizable = {
    string: { unit: "merkkiä", subject: "merkkijonon" },
    file: { unit: "tavua", subject: "tiedoston" },
    array: { unit: "alkiota", subject: "listan" },
    set: { unit: "alkiota", subject: "joukon" },
    number: { unit: "", subject: "luvun" },
    bigint: { unit: "", subject: "suuren kokonaisluvun" },
    int: { unit: "", subject: "kokonaisluvun" },
    date: { unit: "", subject: "päivämäärän" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "säännöllinen lauseke",
    email: "sähköpostiosoite",
    url: "URL-osoite",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-aikaleima",
    date: "ISO-päivämäärä",
    time: "ISO-aika",
    duration: "ISO-kesto",
    ipv4: "IPv4-osoite",
    ipv6: "IPv6-osoite",
    cidrv4: "IPv4-alue",
    cidrv6: "IPv6-alue",
    base64: "base64-koodattu merkkijono",
    base64url: "base64url-koodattu merkkijono",
    json_string: "JSON-merkkijono",
    e164: "E.164-luku",
    jwt: "JWT",
    template_literal: "templaattimerkkijono"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Virheellinen tyyppi: odotettiin instanceof ${issue2.expected}, oli ${received}`;
        }
        return `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Virheellinen syöte: täytyy olla ${stringifyPrimitive(issue2.values[0])}`;
        return `Virheellinen valinta: täytyy olla yksi seuraavista: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian suuri: ${sizing.subject} täytyy olla ${adj}${issue2.maximum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian suuri: arvon täytyy olla ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian pieni: ${sizing.subject} täytyy olla ${adj}${issue2.minimum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian pieni: arvon täytyy olla ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Virheellinen syöte: täytyy alkaa "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Virheellinen syöte: täytyy loppua "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Virheellinen syöte: täytyy sisältää "${_issue.includes}"`;
        if (_issue.format === "regex") {
          return `Virheellinen syöte: täytyy vastata säännöllistä lauseketta ${_issue.pattern}`;
        }
        return `Virheellinen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Virheellinen luku: täytyy olla luvun ${issue2.divisor} monikerta`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Virheellinen avain tietueessa";
      case "invalid_union":
        return "Virheellinen unioni";
      case "invalid_element":
        return "Virheellinen arvo joukossa";
      default:
        return `Virheellinen syöte`;
    }
  };
};
function fi_default() {
  return {
    localeError: error13()
  };
}
// node_modules/zod/v4/locales/fr.js
var error14 = () => {
  const Sizable = {
    string: { unit: "caractères", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "éléments", verb: "avoir" },
    set: { unit: "éléments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrée",
    email: "adresse e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date et heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "durée ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "chaîne encodée en base64",
    base64url: "chaîne encodée en base64url",
    json_string: "chaîne JSON",
    e164: "numéro E.164",
    jwt: "JWT",
    template_literal: "entrée"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombre",
    array: "tableau"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entrée invalide : instanceof ${issue2.expected} attendu, ${received} reçu`;
        }
        return `Entrée invalide : ${expected} attendu, ${received} reçu`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrée invalide : ${stringifyPrimitive(issue2.values[0])} attendu`;
        return `Option invalide : une valeur parmi ${joinValues(issue2.values, "|")} attendue`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : ${issue2.origin ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "élément(s)"}`;
        return `Trop grand : ${issue2.origin ?? "valeur"} doit être ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Trop petit : ${issue2.origin} doit ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Trop petit : ${issue2.origin} doit être ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chaîne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chaîne invalide : doit correspondre au modèle ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit être un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clé${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clé invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entrée invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entrée invalide`;
    }
  };
};
function fr_default() {
  return {
    localeError: error14()
  };
}
// node_modules/zod/v4/locales/fr-CA.js
var error15 = () => {
  const Sizable = {
    string: { unit: "caractères", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "éléments", verb: "avoir" },
    set: { unit: "éléments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrée",
    email: "adresse courriel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date-heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "durée ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "chaîne encodée en base64",
    base64url: "chaîne encodée en base64url",
    json_string: "chaîne JSON",
    e164: "numéro E.164",
    jwt: "JWT",
    template_literal: "entrée"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entrée invalide : attendu instanceof ${issue2.expected}, reçu ${received}`;
        }
        return `Entrée invalide : attendu ${expected}, reçu ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrée invalide : attendu ${stringifyPrimitive(issue2.values[0])}`;
        return `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "≤" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} ait ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} soit ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "≥" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Trop petit : attendu que ${issue2.origin} ait ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Trop petit : attendu que ${issue2.origin} soit ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chaîne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chaîne invalide : doit correspondre au motif ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit être un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clé${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clé invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entrée invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entrée invalide`;
    }
  };
};
function fr_CA_default() {
  return {
    localeError: error15()
  };
}
// node_modules/zod/v4/locales/he.js
var error16 = () => {
  const TypeNames = {
    string: { label: "מחרוזת", gender: "f" },
    number: { label: "מספר", gender: "m" },
    boolean: { label: "ערך בוליאני", gender: "m" },
    bigint: { label: "BigInt", gender: "m" },
    date: { label: "תאריך", gender: "m" },
    array: { label: "מערך", gender: "m" },
    object: { label: "אובייקט", gender: "m" },
    null: { label: "ערך ריק (null)", gender: "m" },
    undefined: { label: "ערך לא מוגדר (undefined)", gender: "m" },
    symbol: { label: "סימבול (Symbol)", gender: "m" },
    function: { label: "פונקציה", gender: "f" },
    map: { label: "מפה (Map)", gender: "f" },
    set: { label: "קבוצה (Set)", gender: "f" },
    file: { label: "קובץ", gender: "m" },
    promise: { label: "Promise", gender: "m" },
    NaN: { label: "NaN", gender: "m" },
    unknown: { label: "ערך לא ידוע", gender: "m" },
    value: { label: "ערך", gender: "m" }
  };
  const Sizable = {
    string: { unit: "תווים", shortLabel: "קצר", longLabel: "ארוך" },
    file: { unit: "בייטים", shortLabel: "קטן", longLabel: "גדול" },
    array: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
    set: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
    number: { unit: "", shortLabel: "קטן", longLabel: "גדול" }
  };
  const typeEntry = (t) => t ? TypeNames[t] : undefined;
  const typeLabel = (t) => {
    const e = typeEntry(t);
    if (e)
      return e.label;
    return t ?? TypeNames.unknown.label;
  };
  const withDefinite = (t) => `ה${typeLabel(t)}`;
  const verbFor = (t) => {
    const e = typeEntry(t);
    const gender = e?.gender ?? "m";
    return gender === "f" ? "צריכה להיות" : "צריך להיות";
  };
  const getSizing = (origin) => {
    if (!origin)
      return null;
    return Sizable[origin] ?? null;
  };
  const FormatDictionary = {
    regex: { label: "קלט", gender: "m" },
    email: { label: "כתובת אימייל", gender: "f" },
    url: { label: "כתובת רשת", gender: "f" },
    emoji: { label: "אימוג'י", gender: "m" },
    uuid: { label: "UUID", gender: "m" },
    nanoid: { label: "nanoid", gender: "m" },
    guid: { label: "GUID", gender: "m" },
    cuid: { label: "cuid", gender: "m" },
    cuid2: { label: "cuid2", gender: "m" },
    ulid: { label: "ULID", gender: "m" },
    xid: { label: "XID", gender: "m" },
    ksuid: { label: "KSUID", gender: "m" },
    datetime: { label: "תאריך וזמן ISO", gender: "m" },
    date: { label: "תאריך ISO", gender: "m" },
    time: { label: "זמן ISO", gender: "m" },
    duration: { label: "משך זמן ISO", gender: "m" },
    ipv4: { label: "כתובת IPv4", gender: "f" },
    ipv6: { label: "כתובת IPv6", gender: "f" },
    cidrv4: { label: "טווח IPv4", gender: "m" },
    cidrv6: { label: "טווח IPv6", gender: "m" },
    base64: { label: "מחרוזת בבסיס 64", gender: "f" },
    base64url: { label: "מחרוזת בבסיס 64 לכתובות רשת", gender: "f" },
    json_string: { label: "מחרוזת JSON", gender: "f" },
    e164: { label: "מספר E.164", gender: "m" },
    jwt: { label: "JWT", gender: "m" },
    ends_with: { label: "קלט", gender: "m" },
    includes: { label: "קלט", gender: "m" },
    lowercase: { label: "קלט", gender: "m" },
    starts_with: { label: "קלט", gender: "m" },
    uppercase: { label: "קלט", gender: "m" }
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expectedKey = issue2.expected;
        const expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey);
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `קלט לא תקין: צריך להיות instanceof ${issue2.expected}, התקבל ${received}`;
        }
        return `קלט לא תקין: צריך להיות ${expected}, התקבל ${received}`;
      }
      case "invalid_value": {
        if (issue2.values.length === 1) {
          return `ערך לא תקין: הערך חייב להיות ${stringifyPrimitive(issue2.values[0])}`;
        }
        const stringified = issue2.values.map((v) => stringifyPrimitive(v));
        if (issue2.values.length === 2) {
          return `ערך לא תקין: האפשרויות המתאימות הן ${stringified[0]} או ${stringified[1]}`;
        }
        const lastValue = stringified[stringified.length - 1];
        const restValues = stringified.slice(0, -1).join(", ");
        return `ערך לא תקין: האפשרויות המתאימות הן ${restValues} או ${lastValue}`;
      }
      case "too_big": {
        const sizing = getSizing(issue2.origin);
        const subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string") {
          return `${sizing?.longLabel ?? "ארוך"} מדי: ${subject} צריכה להכיל ${issue2.maximum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "או פחות" : "לכל היותר"}`.trim();
        }
        if (issue2.origin === "number") {
          const comparison = issue2.inclusive ? `קטן או שווה ל-${issue2.maximum}` : `קטן מ-${issue2.maximum}`;
          return `גדול מדי: ${subject} צריך להיות ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          const verb = issue2.origin === "set" ? "צריכה" : "צריך";
          const comparison = issue2.inclusive ? `${issue2.maximum} ${sizing?.unit ?? ""} או פחות` : `פחות מ-${issue2.maximum} ${sizing?.unit ?? ""}`;
          return `גדול מדי: ${subject} ${verb} להכיל ${comparison}`.trim();
        }
        const adj = issue2.inclusive ? "<=" : "<";
        const be = verbFor(issue2.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.longLabel} מדי: ${subject} ${be} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.longLabel ?? "גדול"} מדי: ${subject} ${be} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const sizing = getSizing(issue2.origin);
        const subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string") {
          return `${sizing?.shortLabel ?? "קצר"} מדי: ${subject} צריכה להכיל ${issue2.minimum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "או יותר" : "לפחות"}`.trim();
        }
        if (issue2.origin === "number") {
          const comparison = issue2.inclusive ? `גדול או שווה ל-${issue2.minimum}` : `גדול מ-${issue2.minimum}`;
          return `קטן מדי: ${subject} צריך להיות ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          const verb = issue2.origin === "set" ? "צריכה" : "צריך";
          if (issue2.minimum === 1 && issue2.inclusive) {
            const singularPhrase = issue2.origin === "set" ? "לפחות פריט אחד" : "לפחות פריט אחד";
            return `קטן מדי: ${subject} ${verb} להכיל ${singularPhrase}`;
          }
          const comparison = issue2.inclusive ? `${issue2.minimum} ${sizing?.unit ?? ""} או יותר` : `יותר מ-${issue2.minimum} ${sizing?.unit ?? ""}`;
          return `קטן מדי: ${subject} ${verb} להכיל ${comparison}`.trim();
        }
        const adj = issue2.inclusive ? ">=" : ">";
        const be = verbFor(issue2.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.shortLabel} מדי: ${subject} ${be} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.shortLabel ?? "קטן"} מדי: ${subject} ${be} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `המחרוזת חייבת להתחיל ב "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `המחרוזת חייבת להסתיים ב "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `המחרוזת חייבת לכלול "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `המחרוזת חייבת להתאים לתבנית ${_issue.pattern}`;
        const nounEntry = FormatDictionary[_issue.format];
        const noun = nounEntry?.label ?? _issue.format;
        const gender = nounEntry?.gender ?? "m";
        const adjective = gender === "f" ? "תקינה" : "תקין";
        return `${noun} לא ${adjective}`;
      }
      case "not_multiple_of":
        return `מספר לא תקין: חייב להיות מכפלה של ${issue2.divisor}`;
      case "unrecognized_keys":
        return `מפתח${issue2.keys.length > 1 ? "ות" : ""} לא מזוה${issue2.keys.length > 1 ? "ים" : "ה"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key": {
        return `שדה לא תקין באובייקט`;
      }
      case "invalid_union":
        return "קלט לא תקין";
      case "invalid_element": {
        const place = withDefinite(issue2.origin ?? "array");
        return `ערך לא תקין ב${place}`;
      }
      default:
        return `קלט לא תקין`;
    }
  };
};
function he_default() {
  return {
    localeError: error16()
  };
}
// node_modules/zod/v4/locales/hu.js
var error17 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "legyen" },
    file: { unit: "byte", verb: "legyen" },
    array: { unit: "elem", verb: "legyen" },
    set: { unit: "elem", verb: "legyen" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "bemenet",
    email: "email cím",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO időbélyeg",
    date: "ISO dátum",
    time: "ISO idő",
    duration: "ISO időintervallum",
    ipv4: "IPv4 cím",
    ipv6: "IPv6 cím",
    cidrv4: "IPv4 tartomány",
    cidrv6: "IPv6 tartomány",
    base64: "base64-kódolt string",
    base64url: "base64url-kódolt string",
    json_string: "JSON string",
    e164: "E.164 szám",
    jwt: "JWT",
    template_literal: "bemenet"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "szám",
    array: "tömb"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Érvénytelen bemenet: a várt érték instanceof ${issue2.expected}, a kapott érték ${received}`;
        }
        return `Érvénytelen bemenet: a várt érték ${expected}, a kapott érték ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Érvénytelen bemenet: a várt érték ${stringifyPrimitive(issue2.values[0])}`;
        return `Érvénytelen opció: valamelyik érték várt ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Túl nagy: ${issue2.origin ?? "érték"} mérete túl nagy ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elem"}`;
        return `Túl nagy: a bemeneti érték ${issue2.origin ?? "érték"} túl nagy: ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Túl kicsi: a bemeneti érték ${issue2.origin} mérete túl kicsi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Túl kicsi: a bemeneti érték ${issue2.origin} túl kicsi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Érvénytelen string: "${_issue.prefix}" értékkel kell kezdődnie`;
        if (_issue.format === "ends_with")
          return `Érvénytelen string: "${_issue.suffix}" értékkel kell végződnie`;
        if (_issue.format === "includes")
          return `Érvénytelen string: "${_issue.includes}" értéket kell tartalmaznia`;
        if (_issue.format === "regex")
          return `Érvénytelen string: ${_issue.pattern} mintának kell megfelelnie`;
        return `Érvénytelen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Érvénytelen szám: ${issue2.divisor} többszörösének kell lennie`;
      case "unrecognized_keys":
        return `Ismeretlen kulcs${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Érvénytelen kulcs ${issue2.origin}`;
      case "invalid_union":
        return "Érvénytelen bemenet";
      case "invalid_element":
        return `Érvénytelen érték: ${issue2.origin}`;
      default:
        return `Érvénytelen bemenet`;
    }
  };
};
function hu_default() {
  return {
    localeError: error17()
  };
}
// node_modules/zod/v4/locales/hy.js
function getArmenianPlural(count, one, many) {
  return Math.abs(count) === 1 ? one : many;
}
function withDefiniteArticle(word) {
  if (!word)
    return "";
  const vowels = ["ա", "ե", "ը", "ի", "ո", "ու", "օ"];
  const lastChar = word[word.length - 1];
  return word + (vowels.includes(lastChar) ? "ն" : "ը");
}
var error18 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "նշան",
        many: "նշաններ"
      },
      verb: "ունենալ"
    },
    file: {
      unit: {
        one: "բայթ",
        many: "բայթեր"
      },
      verb: "ունենալ"
    },
    array: {
      unit: {
        one: "տարր",
        many: "տարրեր"
      },
      verb: "ունենալ"
    },
    set: {
      unit: {
        one: "տարր",
        many: "տարրեր"
      },
      verb: "ունենալ"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "մուտք",
    email: "էլ. հասցե",
    url: "URL",
    emoji: "էմոջի",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO ամսաթիվ և ժամ",
    date: "ISO ամսաթիվ",
    time: "ISO ժամ",
    duration: "ISO տևողություն",
    ipv4: "IPv4 հասցե",
    ipv6: "IPv6 հասցե",
    cidrv4: "IPv4 միջակայք",
    cidrv6: "IPv6 միջակայք",
    base64: "base64 ձևաչափով տող",
    base64url: "base64url ձևաչափով տող",
    json_string: "JSON տող",
    e164: "E.164 համար",
    jwt: "JWT",
    template_literal: "մուտք"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "թիվ",
    array: "զանգված"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Սխալ մուտքագրում․ սպասվում էր instanceof ${issue2.expected}, ստացվել է ${received}`;
        }
        return `Սխալ մուտքագրում․ սպասվում էր ${expected}, ստացվել է ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Սխալ մուտքագրում․ սպասվում էր ${stringifyPrimitive(issue2.values[1])}`;
        return `Սխալ տարբերակ․ սպասվում էր հետևյալներից մեկը՝ ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getArmenianPlural(maxValue, sizing.unit.one, sizing.unit.many);
          return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin ?? "արժեք")} կունենա ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin ?? "արժեք")} լինի ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getArmenianPlural(minValue, sizing.unit.one, sizing.unit.many);
          return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin)} կունենա ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin)} լինի ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Սխալ տող․ պետք է սկսվի "${_issue.prefix}"-ով`;
        if (_issue.format === "ends_with")
          return `Սխալ տող․ պետք է ավարտվի "${_issue.suffix}"-ով`;
        if (_issue.format === "includes")
          return `Սխալ տող․ պետք է պարունակի "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Սխալ տող․ պետք է համապատասխանի ${_issue.pattern} ձևաչափին`;
        return `Սխալ ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Սխալ թիվ․ պետք է բազմապատիկ լինի ${issue2.divisor}-ի`;
      case "unrecognized_keys":
        return `Չճանաչված բանալի${issue2.keys.length > 1 ? "ներ" : ""}. ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Սխալ բանալի ${withDefiniteArticle(issue2.origin)}-ում`;
      case "invalid_union":
        return "Սխալ մուտքագրում";
      case "invalid_element":
        return `Սխալ արժեք ${withDefiniteArticle(issue2.origin)}-ում`;
      default:
        return `Սխալ մուտքագրում`;
    }
  };
};
function hy_default() {
  return {
    localeError: error18()
  };
}
// node_modules/zod/v4/locales/id.js
var error19 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "memiliki" },
    file: { unit: "byte", verb: "memiliki" },
    array: { unit: "item", verb: "memiliki" },
    set: { unit: "item", verb: "memiliki" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tanggal dan waktu format ISO",
    date: "tanggal format ISO",
    time: "jam format ISO",
    duration: "durasi format ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    cidrv4: "rentang alamat IPv4",
    cidrv6: "rentang alamat IPv6",
    base64: "string dengan enkode base64",
    base64url: "string dengan enkode base64url",
    json_string: "string JSON",
    e164: "angka E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input tidak valid: diharapkan instanceof ${issue2.expected}, diterima ${received}`;
        }
        return `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak valid: diharapkan ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} memiliki ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} menjadi ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: diharapkan ${issue2.origin} memiliki ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: diharapkan ${issue2.origin} menjadi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak valid: harus menyertakan "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak valid`;
      }
      case "not_multiple_of":
        return `Angka tidak valid: harus kelipatan dari ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak valid di ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak valid";
      case "invalid_element":
        return `Nilai tidak valid di ${issue2.origin}`;
      default:
        return `Input tidak valid`;
    }
  };
};
function id_default() {
  return {
    localeError: error19()
  };
}
// node_modules/zod/v4/locales/is.js
var error20 = () => {
  const Sizable = {
    string: { unit: "stafi", verb: "að hafa" },
    file: { unit: "bæti", verb: "að hafa" },
    array: { unit: "hluti", verb: "að hafa" },
    set: { unit: "hluti", verb: "að hafa" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "gildi",
    email: "netfang",
    url: "vefslóð",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dagsetning og tími",
    date: "ISO dagsetning",
    time: "ISO tími",
    duration: "ISO tímalengd",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded strengur",
    base64url: "base64url-encoded strengur",
    json_string: "JSON strengur",
    e164: "E.164 tölugildi",
    jwt: "JWT",
    template_literal: "gildi"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "númer",
    array: "fylki"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera instanceof ${issue2.expected}`;
        }
        return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera ${expected}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Rangt gildi: gert ráð fyrir ${stringifyPrimitive(issue2.values[0])}`;
        return `Ógilt val: má vera eitt af eftirfarandi ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Of stórt: gert er ráð fyrir að ${issue2.origin ?? "gildi"} hafi ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "hluti"}`;
        return `Of stórt: gert er ráð fyrir að ${issue2.origin ?? "gildi"} sé ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Of lítið: gert er ráð fyrir að ${issue2.origin} hafi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Of lítið: gert er ráð fyrir að ${issue2.origin} sé ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ógildur strengur: verður að byrja á "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Ógildur strengur: verður að enda á "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ógildur strengur: verður að innihalda "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ógildur strengur: verður að fylgja mynstri ${_issue.pattern}`;
        return `Rangt ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Röng tala: verður að vera margfeldi af ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Óþekkt ${issue2.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Rangur lykill í ${issue2.origin}`;
      case "invalid_union":
        return "Rangt gildi";
      case "invalid_element":
        return `Rangt gildi í ${issue2.origin}`;
      default:
        return `Rangt gildi`;
    }
  };
};
function is_default() {
  return {
    localeError: error20()
  };
}
// node_modules/zod/v4/locales/it.js
var error21 = () => {
  const Sizable = {
    string: { unit: "caratteri", verb: "avere" },
    file: { unit: "byte", verb: "avere" },
    array: { unit: "elementi", verb: "avere" },
    set: { unit: "elementi", verb: "avere" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "indirizzo email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e ora ISO",
    date: "data ISO",
    time: "ora ISO",
    duration: "durata ISO",
    ipv4: "indirizzo IPv4",
    ipv6: "indirizzo IPv6",
    cidrv4: "intervallo IPv4",
    cidrv6: "intervallo IPv6",
    base64: "stringa codificata in base64",
    base64url: "URL codificata in base64",
    json_string: "stringa JSON",
    e164: "numero E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numero",
    array: "vettore"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input non valido: atteso instanceof ${issue2.expected}, ricevuto ${received}`;
        }
        return `Input non valido: atteso ${expected}, ricevuto ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input non valido: atteso ${stringifyPrimitive(issue2.values[0])}`;
        return `Opzione non valida: atteso uno tra ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Troppo grande: ${issue2.origin ?? "valore"} deve avere ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementi"}`;
        return `Troppo grande: ${issue2.origin ?? "valore"} deve essere ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Troppo piccolo: ${issue2.origin} deve avere ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Troppo piccolo: ${issue2.origin} deve essere ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Stringa non valida: deve includere "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Numero non valido: deve essere un multiplo di ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chiav${issue2.keys.length > 1 ? "i" : "e"} non riconosciut${issue2.keys.length > 1 ? "e" : "a"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chiave non valida in ${issue2.origin}`;
      case "invalid_union":
        return "Input non valido";
      case "invalid_element":
        return `Valore non valido in ${issue2.origin}`;
      default:
        return `Input non valido`;
    }
  };
};
function it_default() {
  return {
    localeError: error21()
  };
}
// node_modules/zod/v4/locales/ja.js
var error22 = () => {
  const Sizable = {
    string: { unit: "文字", verb: "である" },
    file: { unit: "バイト", verb: "である" },
    array: { unit: "要素", verb: "である" },
    set: { unit: "要素", verb: "である" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "入力値",
    email: "メールアドレス",
    url: "URL",
    emoji: "絵文字",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO日時",
    date: "ISO日付",
    time: "ISO時刻",
    duration: "ISO期間",
    ipv4: "IPv4アドレス",
    ipv6: "IPv6アドレス",
    cidrv4: "IPv4範囲",
    cidrv6: "IPv6範囲",
    base64: "base64エンコード文字列",
    base64url: "base64urlエンコード文字列",
    json_string: "JSON文字列",
    e164: "E.164番号",
    jwt: "JWT",
    template_literal: "入力値"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "数値",
    array: "配列"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `無効な入力: instanceof ${issue2.expected}が期待されましたが、${received}が入力されました`;
        }
        return `無効な入力: ${expected}が期待されましたが、${received}が入力されました`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `無効な入力: ${stringifyPrimitive(issue2.values[0])}が期待されました`;
        return `無効な選択: ${joinValues(issue2.values, "、")}のいずれかである必要があります`;
      case "too_big": {
        const adj = issue2.inclusive ? "以下である" : "より小さい";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `大きすぎる値: ${issue2.origin ?? "値"}は${issue2.maximum.toString()}${sizing.unit ?? "要素"}${adj}必要があります`;
        return `大きすぎる値: ${issue2.origin ?? "値"}は${issue2.maximum.toString()}${adj}必要があります`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "以上である" : "より大きい";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `小さすぎる値: ${issue2.origin}は${issue2.minimum.toString()}${sizing.unit}${adj}必要があります`;
        return `小さすぎる値: ${issue2.origin}は${issue2.minimum.toString()}${adj}必要があります`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `無効な文字列: "${_issue.prefix}"で始まる必要があります`;
        if (_issue.format === "ends_with")
          return `無効な文字列: "${_issue.suffix}"で終わる必要があります`;
        if (_issue.format === "includes")
          return `無効な文字列: "${_issue.includes}"を含む必要があります`;
        if (_issue.format === "regex")
          return `無効な文字列: パターン${_issue.pattern}に一致する必要があります`;
        return `無効な${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `無効な数値: ${issue2.divisor}の倍数である必要があります`;
      case "unrecognized_keys":
        return `認識されていないキー${issue2.keys.length > 1 ? "群" : ""}: ${joinValues(issue2.keys, "、")}`;
      case "invalid_key":
        return `${issue2.origin}内の無効なキー`;
      case "invalid_union":
        return "無効な入力";
      case "invalid_element":
        return `${issue2.origin}内の無効な値`;
      default:
        return `無効な入力`;
    }
  };
};
function ja_default() {
  return {
    localeError: error22()
  };
}
// node_modules/zod/v4/locales/ka.js
var error23 = () => {
  const Sizable = {
    string: { unit: "სიმბოლო", verb: "უნდა შეიცავდეს" },
    file: { unit: "ბაიტი", verb: "უნდა შეიცავდეს" },
    array: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" },
    set: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "შეყვანა",
    email: "ელ-ფოსტის მისამართი",
    url: "URL",
    emoji: "ემოჯი",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "თარიღი-დრო",
    date: "თარიღი",
    time: "დრო",
    duration: "ხანგრძლივობა",
    ipv4: "IPv4 მისამართი",
    ipv6: "IPv6 მისამართი",
    cidrv4: "IPv4 დიაპაზონი",
    cidrv6: "IPv6 დიაპაზონი",
    base64: "base64-კოდირებული სტრინგი",
    base64url: "base64url-კოდირებული სტრინგი",
    json_string: "JSON სტრინგი",
    e164: "E.164 ნომერი",
    jwt: "JWT",
    template_literal: "შეყვანა"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "რიცხვი",
    string: "სტრინგი",
    boolean: "ბულეანი",
    function: "ფუნქცია",
    array: "მასივი"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `არასწორი შეყვანა: მოსალოდნელი instanceof ${issue2.expected}, მიღებული ${received}`;
        }
        return `არასწორი შეყვანა: მოსალოდნელი ${expected}, მიღებული ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `არასწორი შეყვანა: მოსალოდნელი ${stringifyPrimitive(issue2.values[0])}`;
        return `არასწორი ვარიანტი: მოსალოდნელია ერთ-ერთი ${joinValues(issue2.values, "|")}-დან`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `ზედმეტად დიდი: მოსალოდნელი ${issue2.origin ?? "მნიშვნელობა"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        return `ზედმეტად დიდი: მოსალოდნელი ${issue2.origin ?? "მნიშვნელობა"} იყოს ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `ზედმეტად პატარა: მოსალოდნელი ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `ზედმეტად პატარა: მოსალოდნელი ${issue2.origin} იყოს ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `არასწორი სტრინგი: უნდა იწყებოდეს "${_issue.prefix}"-ით`;
        }
        if (_issue.format === "ends_with")
          return `არასწორი სტრინგი: უნდა მთავრდებოდეს "${_issue.suffix}"-ით`;
        if (_issue.format === "includes")
          return `არასწორი სტრინგი: უნდა შეიცავდეს "${_issue.includes}"-ს`;
        if (_issue.format === "regex")
          return `არასწორი სტრინგი: უნდა შეესაბამებოდეს შაბლონს ${_issue.pattern}`;
        return `არასწორი ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `არასწორი რიცხვი: უნდა იყოს ${issue2.divisor}-ის ჯერადი`;
      case "unrecognized_keys":
        return `უცნობი გასაღებ${issue2.keys.length > 1 ? "ები" : "ი"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `არასწორი გასაღები ${issue2.origin}-ში`;
      case "invalid_union":
        return "არასწორი შეყვანა";
      case "invalid_element":
        return `არასწორი მნიშვნელობა ${issue2.origin}-ში`;
      default:
        return `არასწორი შეყვანა`;
    }
  };
};
function ka_default() {
  return {
    localeError: error23()
  };
}
// node_modules/zod/v4/locales/km.js
var error24 = () => {
  const Sizable = {
    string: { unit: "តួអក្សរ", verb: "គួរមាន" },
    file: { unit: "បៃ", verb: "គួរមាន" },
    array: { unit: "ធាតុ", verb: "គួរមាន" },
    set: { unit: "ធាតុ", verb: "គួរមាន" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ទិន្នន័យបញ្ចូល",
    email: "អាសយដ្ឋានអ៊ីមែល",
    url: "URL",
    emoji: "សញ្ញាអារម្មណ៍",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "កាលបរិច្ឆេទ និងម៉ោង ISO",
    date: "កាលបរិច្ឆេទ ISO",
    time: "ម៉ោង ISO",
    duration: "រយៈពេល ISO",
    ipv4: "អាសយដ្ឋាន IPv4",
    ipv6: "អាសយដ្ឋាន IPv6",
    cidrv4: "ដែនអាសយដ្ឋាន IPv4",
    cidrv6: "ដែនអាសយដ្ឋាន IPv6",
    base64: "ខ្សែអក្សរអ៊ិកូដ base64",
    base64url: "ខ្សែអក្សរអ៊ិកូដ base64url",
    json_string: "ខ្សែអក្សរ JSON",
    e164: "លេខ E.164",
    jwt: "JWT",
    template_literal: "ទិន្នន័យបញ្ចូល"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "លេខ",
    array: "អារេ (Array)",
    null: "គ្មានតម្លៃ (null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ instanceof ${issue2.expected} ប៉ុន្តែទទួលបាន ${received}`;
        }
        return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${expected} ប៉ុន្តែទទួលបាន ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${stringifyPrimitive(issue2.values[0])}`;
        return `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `ធំពេក៖ ត្រូវការ ${issue2.origin ?? "តម្លៃ"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "ធាតុ"}`;
        return `ធំពេក៖ ត្រូវការ ${issue2.origin ?? "តម្លៃ"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `តូចពេក៖ ត្រូវការ ${issue2.origin} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `តូចពេក៖ ត្រូវការ ${issue2.origin} ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${_issue.pattern}`;
        return `មិនត្រឹមត្រូវ៖ ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${issue2.divisor}`;
      case "unrecognized_keys":
        return `រកឃើញសោមិនស្គាល់៖ ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `សោមិនត្រឹមត្រូវនៅក្នុង ${issue2.origin}`;
      case "invalid_union":
        return `ទិន្នន័យមិនត្រឹមត្រូវ`;
      case "invalid_element":
        return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${issue2.origin}`;
      default:
        return `ទិន្នន័យមិនត្រឹមត្រូវ`;
    }
  };
};
function km_default() {
  return {
    localeError: error24()
  };
}

// node_modules/zod/v4/locales/kh.js
function kh_default() {
  return km_default();
}
// node_modules/zod/v4/locales/ko.js
var error25 = () => {
  const Sizable = {
    string: { unit: "문자", verb: "to have" },
    file: { unit: "바이트", verb: "to have" },
    array: { unit: "개", verb: "to have" },
    set: { unit: "개", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "입력",
    email: "이메일 주소",
    url: "URL",
    emoji: "이모지",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO 날짜시간",
    date: "ISO 날짜",
    time: "ISO 시간",
    duration: "ISO 기간",
    ipv4: "IPv4 주소",
    ipv6: "IPv6 주소",
    cidrv4: "IPv4 범위",
    cidrv6: "IPv6 범위",
    base64: "base64 인코딩 문자열",
    base64url: "base64url 인코딩 문자열",
    json_string: "JSON 문자열",
    e164: "E.164 번호",
    jwt: "JWT",
    template_literal: "입력"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `잘못된 입력: 예상 타입은 instanceof ${issue2.expected}, 받은 타입은 ${received}입니다`;
        }
        return `잘못된 입력: 예상 타입은 ${expected}, 받은 타입은 ${received}입니다`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `잘못된 입력: 값은 ${stringifyPrimitive(issue2.values[0])} 이어야 합니다`;
        return `잘못된 옵션: ${joinValues(issue2.values, "또는 ")} 중 하나여야 합니다`;
      case "too_big": {
        const adj = issue2.inclusive ? "이하" : "미만";
        const suffix = adj === "미만" ? "이어야 합니다" : "여야 합니다";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "요소";
        if (sizing)
          return `${issue2.origin ?? "값"}이 너무 큽니다: ${issue2.maximum.toString()}${unit} ${adj}${suffix}`;
        return `${issue2.origin ?? "값"}이 너무 큽니다: ${issue2.maximum.toString()} ${adj}${suffix}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "이상" : "초과";
        const suffix = adj === "이상" ? "이어야 합니다" : "여야 합니다";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "요소";
        if (sizing) {
          return `${issue2.origin ?? "값"}이 너무 작습니다: ${issue2.minimum.toString()}${unit} ${adj}${suffix}`;
        }
        return `${issue2.origin ?? "값"}이 너무 작습니다: ${issue2.minimum.toString()} ${adj}${suffix}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `잘못된 문자열: "${_issue.prefix}"(으)로 시작해야 합니다`;
        }
        if (_issue.format === "ends_with")
          return `잘못된 문자열: "${_issue.suffix}"(으)로 끝나야 합니다`;
        if (_issue.format === "includes")
          return `잘못된 문자열: "${_issue.includes}"을(를) 포함해야 합니다`;
        if (_issue.format === "regex")
          return `잘못된 문자열: 정규식 ${_issue.pattern} 패턴과 일치해야 합니다`;
        return `잘못된 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `잘못된 숫자: ${issue2.divisor}의 배수여야 합니다`;
      case "unrecognized_keys":
        return `인식할 수 없는 키: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `잘못된 키: ${issue2.origin}`;
      case "invalid_union":
        return `잘못된 입력`;
      case "invalid_element":
        return `잘못된 값: ${issue2.origin}`;
      default:
        return `잘못된 입력`;
    }
  };
};
function ko_default() {
  return {
    localeError: error25()
  };
}
// node_modules/zod/v4/locales/lt.js
var capitalizeFirstCharacter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
function getUnitTypeFromNumber(number2) {
  const abs = Math.abs(number2);
  const last = abs % 10;
  const last2 = abs % 100;
  if (last2 >= 11 && last2 <= 19 || last === 0)
    return "many";
  if (last === 1)
    return "one";
  return "few";
}
var error26 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "simbolis",
        few: "simboliai",
        many: "simbolių"
      },
      verb: {
        smaller: {
          inclusive: "turi būti ne ilgesnė kaip",
          notInclusive: "turi būti trumpesnė kaip"
        },
        bigger: {
          inclusive: "turi būti ne trumpesnė kaip",
          notInclusive: "turi būti ilgesnė kaip"
        }
      }
    },
    file: {
      unit: {
        one: "baitas",
        few: "baitai",
        many: "baitų"
      },
      verb: {
        smaller: {
          inclusive: "turi būti ne didesnis kaip",
          notInclusive: "turi būti mažesnis kaip"
        },
        bigger: {
          inclusive: "turi būti ne mažesnis kaip",
          notInclusive: "turi būti didesnis kaip"
        }
      }
    },
    array: {
      unit: {
        one: "elementą",
        few: "elementus",
        many: "elementų"
      },
      verb: {
        smaller: {
          inclusive: "turi turėti ne daugiau kaip",
          notInclusive: "turi turėti mažiau kaip"
        },
        bigger: {
          inclusive: "turi turėti ne mažiau kaip",
          notInclusive: "turi turėti daugiau kaip"
        }
      }
    },
    set: {
      unit: {
        one: "elementą",
        few: "elementus",
        many: "elementų"
      },
      verb: {
        smaller: {
          inclusive: "turi turėti ne daugiau kaip",
          notInclusive: "turi turėti mažiau kaip"
        },
        bigger: {
          inclusive: "turi turėti ne mažiau kaip",
          notInclusive: "turi turėti daugiau kaip"
        }
      }
    }
  };
  function getSizing(origin, unitType, inclusive, targetShouldBe) {
    const result = Sizable[origin] ?? null;
    if (result === null)
      return result;
    return {
      unit: result.unit[unitType],
      verb: result.verb[targetShouldBe][inclusive ? "inclusive" : "notInclusive"]
    };
  }
  const FormatDictionary = {
    regex: "įvestis",
    email: "el. pašto adresas",
    url: "URL",
    emoji: "jaustukas",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO data ir laikas",
    date: "ISO data",
    time: "ISO laikas",
    duration: "ISO trukmė",
    ipv4: "IPv4 adresas",
    ipv6: "IPv6 adresas",
    cidrv4: "IPv4 tinklo prefiksas (CIDR)",
    cidrv6: "IPv6 tinklo prefiksas (CIDR)",
    base64: "base64 užkoduota eilutė",
    base64url: "base64url užkoduota eilutė",
    json_string: "JSON eilutė",
    e164: "E.164 numeris",
    jwt: "JWT",
    template_literal: "įvestis"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "skaičius",
    bigint: "sveikasis skaičius",
    string: "eilutė",
    boolean: "loginė reikšmė",
    undefined: "neapibrėžta reikšmė",
    function: "funkcija",
    symbol: "simbolis",
    array: "masyvas",
    object: "objektas",
    null: "nulinė reikšmė"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Gautas tipas ${received}, o tikėtasi - instanceof ${issue2.expected}`;
        }
        return `Gautas tipas ${received}, o tikėtasi - ${expected}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Privalo būti ${stringifyPrimitive(issue2.values[0])}`;
        return `Privalo būti vienas iš ${joinValues(issue2.values, "|")} pasirinkimų`;
      case "too_big": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.maximum)), issue2.inclusive ?? false, "smaller");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} ${sizing.verb} ${issue2.maximum.toString()} ${sizing.unit ?? "elementų"}`;
        const adj = issue2.inclusive ? "ne didesnis kaip" : "mažesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} turi būti ${adj} ${issue2.maximum.toString()} ${sizing?.unit}`;
      }
      case "too_small": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.minimum)), issue2.inclusive ?? false, "bigger");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} ${sizing.verb} ${issue2.minimum.toString()} ${sizing.unit ?? "elementų"}`;
        const adj = issue2.inclusive ? "ne mažesnis kaip" : "didesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} turi būti ${adj} ${issue2.minimum.toString()} ${sizing?.unit}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Eilutė privalo prasidėti "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Eilutė privalo pasibaigti "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Eilutė privalo įtraukti "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Eilutė privalo atitikti ${_issue.pattern}`;
        return `Neteisingas ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Skaičius privalo būti ${issue2.divisor} kartotinis.`;
      case "unrecognized_keys":
        return `Neatpažint${issue2.keys.length > 1 ? "i" : "as"} rakt${issue2.keys.length > 1 ? "ai" : "as"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Rastas klaidingas raktas";
      case "invalid_union":
        return "Klaidinga įvestis";
      case "invalid_element": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} turi klaidingą įvestį`;
      }
      default:
        return "Klaidinga įvestis";
    }
  };
};
function lt_default() {
  return {
    localeError: error26()
  };
}
// node_modules/zod/v4/locales/mk.js
var error27 = () => {
  const Sizable = {
    string: { unit: "знаци", verb: "да имаат" },
    file: { unit: "бајти", verb: "да имаат" },
    array: { unit: "ставки", verb: "да имаат" },
    set: { unit: "ставки", verb: "да имаат" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "внес",
    email: "адреса на е-пошта",
    url: "URL",
    emoji: "емоџи",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO датум и време",
    date: "ISO датум",
    time: "ISO време",
    duration: "ISO времетраење",
    ipv4: "IPv4 адреса",
    ipv6: "IPv6 адреса",
    cidrv4: "IPv4 опсег",
    cidrv6: "IPv6 опсег",
    base64: "base64-енкодирана низа",
    base64url: "base64url-енкодирана низа",
    json_string: "JSON низа",
    e164: "E.164 број",
    jwt: "JWT",
    template_literal: "внес"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "број",
    array: "низа"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Грешен внес: се очекува instanceof ${issue2.expected}, примено ${received}`;
        }
        return `Грешен внес: се очекува ${expected}, примено ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `Грешана опција: се очекува една ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Премногу голем: се очекува ${issue2.origin ?? "вредноста"} да има ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елементи"}`;
        return `Премногу голем: се очекува ${issue2.origin ?? "вредноста"} да биде ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Премногу мал: се очекува ${issue2.origin} да има ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Премногу мал: се очекува ${issue2.origin} да биде ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Неважечка низа: мора да започнува со "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Неважечка низа: мора да завршува со "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Неважечка низа: мора да вклучува "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Неважечка низа: мора да одгоара на патернот ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Грешен број: мора да биде делив со ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Непрепознаени клучеви" : "Непрепознаен клуч"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Грешен клуч во ${issue2.origin}`;
      case "invalid_union":
        return "Грешен внес";
      case "invalid_element":
        return `Грешна вредност во ${issue2.origin}`;
      default:
        return `Грешен внес`;
    }
  };
};
function mk_default() {
  return {
    localeError: error27()
  };
}
// node_modules/zod/v4/locales/ms.js
var error28 = () => {
  const Sizable = {
    string: { unit: "aksara", verb: "mempunyai" },
    file: { unit: "bait", verb: "mempunyai" },
    array: { unit: "elemen", verb: "mempunyai" },
    set: { unit: "elemen", verb: "mempunyai" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat e-mel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tarikh masa ISO",
    date: "tarikh ISO",
    time: "masa ISO",
    duration: "tempoh ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    cidrv4: "julat IPv4",
    cidrv6: "julat IPv6",
    base64: "string dikodkan base64",
    base64url: "string dikodkan base64url",
    json_string: "string JSON",
    e164: "nombor E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombor"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input tidak sah: dijangka instanceof ${issue2.expected}, diterima ${received}`;
        }
        return `Input tidak sah: dijangka ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak sah: dijangka ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak sah: dijangka salah satu daripada ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} adalah ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: dijangka ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: dijangka ${issue2.origin} adalah ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak sah`;
      }
      case "not_multiple_of":
        return `Nombor tidak sah: perlu gandaan ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak sah dalam ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak sah";
      case "invalid_element":
        return `Nilai tidak sah dalam ${issue2.origin}`;
      default:
        return `Input tidak sah`;
    }
  };
};
function ms_default() {
  return {
    localeError: error28()
  };
}
// node_modules/zod/v4/locales/nl.js
var error29 = () => {
  const Sizable = {
    string: { unit: "tekens", verb: "heeft" },
    file: { unit: "bytes", verb: "heeft" },
    array: { unit: "elementen", verb: "heeft" },
    set: { unit: "elementen", verb: "heeft" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "invoer",
    email: "emailadres",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum en tijd",
    date: "ISO datum",
    time: "ISO tijd",
    duration: "ISO duur",
    ipv4: "IPv4-adres",
    ipv6: "IPv6-adres",
    cidrv4: "IPv4-bereik",
    cidrv6: "IPv6-bereik",
    base64: "base64-gecodeerde tekst",
    base64url: "base64 URL-gecodeerde tekst",
    json_string: "JSON string",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "invoer"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "getal"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ongeldige invoer: verwacht instanceof ${issue2.expected}, ontving ${received}`;
        }
        return `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ongeldige invoer: verwacht ${stringifyPrimitive(issue2.values[0])}`;
        return `Ongeldige optie: verwacht één van ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const longName = issue2.origin === "date" ? "laat" : issue2.origin === "string" ? "lang" : "groot";
        if (sizing)
          return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}`;
        return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} is`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const shortName = issue2.origin === "date" ? "vroeg" : issue2.origin === "string" ? "kort" : "klein";
        if (sizing) {
          return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} is`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
        }
        if (_issue.format === "ends_with")
          return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
        if (_issue.format === "includes")
          return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
        if (_issue.format === "regex")
          return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
        return `Ongeldig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ongeldig getal: moet een veelvoud van ${issue2.divisor} zijn`;
      case "unrecognized_keys":
        return `Onbekende key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ongeldige key in ${issue2.origin}`;
      case "invalid_union":
        return "Ongeldige invoer";
      case "invalid_element":
        return `Ongeldige waarde in ${issue2.origin}`;
      default:
        return `Ongeldige invoer`;
    }
  };
};
function nl_default() {
  return {
    localeError: error29()
  };
}
// node_modules/zod/v4/locales/no.js
var error30 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "å ha" },
    file: { unit: "bytes", verb: "å ha" },
    array: { unit: "elementer", verb: "å inneholde" },
    set: { unit: "elementer", verb: "å inneholde" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-postadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkeslett",
    date: "ISO-dato",
    time: "ISO-klokkeslett",
    duration: "ISO-varighet",
    ipv4: "IPv4-område",
    ipv6: "IPv6-område",
    cidrv4: "IPv4-spekter",
    cidrv6: "IPv6-spekter",
    base64: "base64-enkodet streng",
    base64url: "base64url-enkodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "tall",
    array: "liste"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ugyldig input: forventet instanceof ${issue2.expected}, fikk ${received}`;
        }
        return `Ugyldig input: forventet ${expected}, fikk ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig verdi: forventet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldig valg: forventet en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `For stor(t): forventet ${issue2.origin ?? "value"} til å ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor(t): forventet ${issue2.origin ?? "value"} til å ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `For lite(n): forventet ${issue2.origin} til å ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lite(n): forventet ${issue2.origin} til å ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: må starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: må ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: må inneholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: må matche mønsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tall: må være et multiplum av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukjente nøkler" : "Ukjent nøkkel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig nøkkel i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${issue2.origin}`;
      default:
        return `Ugyldig input`;
    }
  };
};
function no_default() {
  return {
    localeError: error30()
  };
}
// node_modules/zod/v4/locales/ota.js
var error31 = () => {
  const Sizable = {
    string: { unit: "harf", verb: "olmalıdır" },
    file: { unit: "bayt", verb: "olmalıdır" },
    array: { unit: "unsur", verb: "olmalıdır" },
    set: { unit: "unsur", verb: "olmalıdır" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "giren",
    email: "epostagâh",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO hengâmı",
    date: "ISO tarihi",
    time: "ISO zamanı",
    duration: "ISO müddeti",
    ipv4: "IPv4 nişânı",
    ipv6: "IPv6 nişânı",
    cidrv4: "IPv4 menzili",
    cidrv6: "IPv6 menzili",
    base64: "base64-şifreli metin",
    base64url: "base64url-şifreli metin",
    json_string: "JSON metin",
    e164: "E.164 sayısı",
    jwt: "JWT",
    template_literal: "giren"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numara",
    array: "saf",
    null: "gayb"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Fâsit giren: umulan instanceof ${issue2.expected}, alınan ${received}`;
        }
        return `Fâsit giren: umulan ${expected}, alınan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Fâsit giren: umulan ${stringifyPrimitive(issue2.values[0])}`;
        return `Fâsit tercih: mûteberler ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Fazla büyük: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmalıydı.`;
        return `Fazla büyük: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} olmalıydı.`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Fazla küçük: ${issue2.origin}, ${adj}${issue2.minimum.toString()} ${sizing.unit} sahip olmalıydı.`;
        }
        return `Fazla küçük: ${issue2.origin}, ${adj}${issue2.minimum.toString()} olmalıydı.`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Fâsit metin: "${_issue.prefix}" ile başlamalı.`;
        if (_issue.format === "ends_with")
          return `Fâsit metin: "${_issue.suffix}" ile bitmeli.`;
        if (_issue.format === "includes")
          return `Fâsit metin: "${_issue.includes}" ihtivâ etmeli.`;
        if (_issue.format === "regex")
          return `Fâsit metin: ${_issue.pattern} nakşına uymalı.`;
        return `Fâsit ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Fâsit sayı: ${issue2.divisor} katı olmalıydı.`;
      case "unrecognized_keys":
        return `Tanınmayan anahtar ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} için tanınmayan anahtar var.`;
      case "invalid_union":
        return "Giren tanınamadı.";
      case "invalid_element":
        return `${issue2.origin} için tanınmayan kıymet var.`;
      default:
        return `Kıymet tanınamadı.`;
    }
  };
};
function ota_default() {
  return {
    localeError: error31()
  };
}
// node_modules/zod/v4/locales/ps.js
var error32 = () => {
  const Sizable = {
    string: { unit: "توکي", verb: "ولري" },
    file: { unit: "بایټس", verb: "ولري" },
    array: { unit: "توکي", verb: "ولري" },
    set: { unit: "توکي", verb: "ولري" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ورودي",
    email: "بریښنالیک",
    url: "یو آر ال",
    emoji: "ایموجي",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "نیټه او وخت",
    date: "نېټه",
    time: "وخت",
    duration: "موده",
    ipv4: "د IPv4 پته",
    ipv6: "د IPv6 پته",
    cidrv4: "د IPv4 ساحه",
    cidrv6: "د IPv6 ساحه",
    base64: "base64-encoded متن",
    base64url: "base64url-encoded متن",
    json_string: "JSON متن",
    e164: "د E.164 شمېره",
    jwt: "JWT",
    template_literal: "ورودي"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "عدد",
    array: "ارې"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `ناسم ورودي: باید instanceof ${issue2.expected} وای, مګر ${received} ترلاسه شو`;
        }
        return `ناسم ورودي: باید ${expected} وای, مګر ${received} ترلاسه شو`;
      }
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `ناسم ورودي: باید ${stringifyPrimitive(issue2.values[0])} وای`;
        }
        return `ناسم انتخاب: باید یو له ${joinValues(issue2.values, "|")} څخه وای`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `ډیر لوی: ${issue2.origin ?? "ارزښت"} باید ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عنصرونه"} ولري`;
        }
        return `ډیر لوی: ${issue2.origin ?? "ارزښت"} باید ${adj}${issue2.maximum.toString()} وي`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `ډیر کوچنی: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} ${sizing.unit} ولري`;
        }
        return `ډیر کوچنی: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} وي`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `ناسم متن: باید د "${_issue.prefix}" سره پیل شي`;
        }
        if (_issue.format === "ends_with") {
          return `ناسم متن: باید د "${_issue.suffix}" سره پای ته ورسيږي`;
        }
        if (_issue.format === "includes") {
          return `ناسم متن: باید "${_issue.includes}" ولري`;
        }
        if (_issue.format === "regex") {
          return `ناسم متن: باید د ${_issue.pattern} سره مطابقت ولري`;
        }
        return `${FormatDictionary[_issue.format] ?? issue2.format} ناسم دی`;
      }
      case "not_multiple_of":
        return `ناسم عدد: باید د ${issue2.divisor} مضرب وي`;
      case "unrecognized_keys":
        return `ناسم ${issue2.keys.length > 1 ? "کلیډونه" : "کلیډ"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `ناسم کلیډ په ${issue2.origin} کې`;
      case "invalid_union":
        return `ناسمه ورودي`;
      case "invalid_element":
        return `ناسم عنصر په ${issue2.origin} کې`;
      default:
        return `ناسمه ورودي`;
    }
  };
};
function ps_default() {
  return {
    localeError: error32()
  };
}
// node_modules/zod/v4/locales/pl.js
var error33 = () => {
  const Sizable = {
    string: { unit: "znaków", verb: "mieć" },
    file: { unit: "bajtów", verb: "mieć" },
    array: { unit: "elementów", verb: "mieć" },
    set: { unit: "elementów", verb: "mieć" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "wyrażenie",
    email: "adres email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i godzina w formacie ISO",
    date: "data w formacie ISO",
    time: "godzina w formacie ISO",
    duration: "czas trwania ISO",
    ipv4: "adres IPv4",
    ipv6: "adres IPv6",
    cidrv4: "zakres IPv4",
    cidrv6: "zakres IPv6",
    base64: "ciąg znaków zakodowany w formacie base64",
    base64url: "ciąg znaków zakodowany w formacie base64url",
    json_string: "ciąg znaków w formacie JSON",
    e164: "liczba E.164",
    jwt: "JWT",
    template_literal: "wejście"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "liczba",
    array: "tablica"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Nieprawidłowe dane wejściowe: oczekiwano instanceof ${issue2.expected}, otrzymano ${received}`;
        }
        return `Nieprawidłowe dane wejściowe: oczekiwano ${expected}, otrzymano ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nieprawidłowe dane wejściowe: oczekiwano ${stringifyPrimitive(issue2.values[0])}`;
        return `Nieprawidłowa opcja: oczekiwano jednej z wartości ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za duża wartość: oczekiwano, że ${issue2.origin ?? "wartość"} będzie mieć ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementów"}`;
        }
        return `Zbyt duż(y/a/e): oczekiwano, że ${issue2.origin ?? "wartość"} będzie wynosić ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za mała wartość: oczekiwano, że ${issue2.origin ?? "wartość"} będzie mieć ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "elementów"}`;
        }
        return `Zbyt mał(y/a/e): oczekiwano, że ${issue2.origin ?? "wartość"} będzie wynosić ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nieprawidłowy ciąg znaków: musi zaczynać się od "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nieprawidłowy ciąg znaków: musi kończyć się na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nieprawidłowy ciąg znaków: musi zawierać "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nieprawidłowy ciąg znaków: musi odpowiadać wzorcowi ${_issue.pattern}`;
        return `Nieprawidłow(y/a/e) ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nieprawidłowa liczba: musi być wielokrotnością ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nierozpoznane klucze${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nieprawidłowy klucz w ${issue2.origin}`;
      case "invalid_union":
        return "Nieprawidłowe dane wejściowe";
      case "invalid_element":
        return `Nieprawidłowa wartość w ${issue2.origin}`;
      default:
        return `Nieprawidłowe dane wejściowe`;
    }
  };
};
function pl_default() {
  return {
    localeError: error33()
  };
}
// node_modules/zod/v4/locales/pt.js
var error34 = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "ter" },
    file: { unit: "bytes", verb: "ter" },
    array: { unit: "itens", verb: "ter" },
    set: { unit: "itens", verb: "ter" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "padrão",
    email: "endereço de e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "duração ISO",
    ipv4: "endereço IPv4",
    ipv6: "endereço IPv6",
    cidrv4: "faixa de IPv4",
    cidrv6: "faixa de IPv6",
    base64: "texto codificado em base64",
    base64url: "URL codificada em base64",
    json_string: "texto JSON",
    e164: "número E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "número",
    null: "nulo"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Tipo inválido: esperado instanceof ${issue2.expected}, recebido ${received}`;
        }
        return `Tipo inválido: esperado ${expected}, recebido ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inválida: esperado ${stringifyPrimitive(issue2.values[0])}`;
        return `Opção inválida: esperada uma das ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Muito grande: esperado que ${issue2.origin ?? "valor"} tivesse ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Muito grande: esperado que ${issue2.origin ?? "valor"} fosse ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Muito pequeno: esperado que ${issue2.origin} tivesse ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Muito pequeno: esperado que ${issue2.origin} fosse ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Texto inválido: deve começar com "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Texto inválido: deve terminar com "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Texto inválido: deve incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Texto inválido: deve corresponder ao padrão ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} inválido`;
      }
      case "not_multiple_of":
        return `Número inválido: deve ser múltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chave${issue2.keys.length > 1 ? "s" : ""} desconhecida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chave inválida em ${issue2.origin}`;
      case "invalid_union":
        return "Entrada inválida";
      case "invalid_element":
        return `Valor inválido em ${issue2.origin}`;
      default:
        return `Campo inválido`;
    }
  };
};
function pt_default() {
  return {
    localeError: error34()
  };
}
// node_modules/zod/v4/locales/ru.js
function getRussianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error35 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "символ",
        few: "символа",
        many: "символов"
      },
      verb: "иметь"
    },
    file: {
      unit: {
        one: "байт",
        few: "байта",
        many: "байт"
      },
      verb: "иметь"
    },
    array: {
      unit: {
        one: "элемент",
        few: "элемента",
        many: "элементов"
      },
      verb: "иметь"
    },
    set: {
      unit: {
        one: "элемент",
        few: "элемента",
        many: "элементов"
      },
      verb: "иметь"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ввод",
    email: "email адрес",
    url: "URL",
    emoji: "эмодзи",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO дата и время",
    date: "ISO дата",
    time: "ISO время",
    duration: "ISO длительность",
    ipv4: "IPv4 адрес",
    ipv6: "IPv6 адрес",
    cidrv4: "IPv4 диапазон",
    cidrv6: "IPv6 диапазон",
    base64: "строка в формате base64",
    base64url: "строка в формате base64url",
    json_string: "JSON строка",
    e164: "номер E.164",
    jwt: "JWT",
    template_literal: "ввод"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "число",
    array: "массив"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Неверный ввод: ожидалось instanceof ${issue2.expected}, получено ${received}`;
        }
        return `Неверный ввод: ожидалось ${expected}, получено ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Неверный ввод: ожидалось ${stringifyPrimitive(issue2.values[0])}`;
        return `Неверный вариант: ожидалось одно из ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getRussianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Слишком большое значение: ожидалось, что ${issue2.origin ?? "значение"} будет иметь ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `Слишком большое значение: ожидалось, что ${issue2.origin ?? "значение"} будет ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getRussianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Слишком маленькое значение: ожидалось, что ${issue2.origin} будет иметь ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `Слишком маленькое значение: ожидалось, что ${issue2.origin} будет ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Неверная строка: должна начинаться с "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Неверная строка: должна заканчиваться на "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Неверная строка: должна содержать "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Неверная строка: должна соответствовать шаблону ${_issue.pattern}`;
        return `Неверный ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Неверное число: должно быть кратным ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Нераспознанн${issue2.keys.length > 1 ? "ые" : "ый"} ключ${issue2.keys.length > 1 ? "и" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Неверный ключ в ${issue2.origin}`;
      case "invalid_union":
        return "Неверные входные данные";
      case "invalid_element":
        return `Неверное значение в ${issue2.origin}`;
      default:
        return `Неверные входные данные`;
    }
  };
};
function ru_default() {
  return {
    localeError: error35()
  };
}
// node_modules/zod/v4/locales/sl.js
var error36 = () => {
  const Sizable = {
    string: { unit: "znakov", verb: "imeti" },
    file: { unit: "bajtov", verb: "imeti" },
    array: { unit: "elementov", verb: "imeti" },
    set: { unit: "elementov", verb: "imeti" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "vnos",
    email: "e-poštni naslov",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum in čas",
    date: "ISO datum",
    time: "ISO čas",
    duration: "ISO trajanje",
    ipv4: "IPv4 naslov",
    ipv6: "IPv6 naslov",
    cidrv4: "obseg IPv4",
    cidrv6: "obseg IPv6",
    base64: "base64 kodiran niz",
    base64url: "base64url kodiran niz",
    json_string: "JSON niz",
    e164: "E.164 številka",
    jwt: "JWT",
    template_literal: "vnos"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "število",
    array: "tabela"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neveljaven vnos: pričakovano instanceof ${issue2.expected}, prejeto ${received}`;
        }
        return `Neveljaven vnos: pričakovano ${expected}, prejeto ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neveljaven vnos: pričakovano ${stringifyPrimitive(issue2.values[0])}`;
        return `Neveljavna možnost: pričakovano eno izmed ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Preveliko: pričakovano, da bo ${issue2.origin ?? "vrednost"} imelo ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementov"}`;
        return `Preveliko: pričakovano, da bo ${issue2.origin ?? "vrednost"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Premajhno: pričakovano, da bo ${issue2.origin} imelo ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Premajhno: pričakovano, da bo ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Neveljaven niz: mora se začeti z "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Neveljaven niz: mora se končati z "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
        return `Neveljaven ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neveljavno število: mora biti večkratnik ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznan${issue2.keys.length > 1 ? "i ključi" : " ključ"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neveljaven ključ v ${issue2.origin}`;
      case "invalid_union":
        return "Neveljaven vnos";
      case "invalid_element":
        return `Neveljavna vrednost v ${issue2.origin}`;
      default:
        return "Neveljaven vnos";
    }
  };
};
function sl_default() {
  return {
    localeError: error36()
  };
}
// node_modules/zod/v4/locales/sv.js
var error37 = () => {
  const Sizable = {
    string: { unit: "tecken", verb: "att ha" },
    file: { unit: "bytes", verb: "att ha" },
    array: { unit: "objekt", verb: "att innehålla" },
    set: { unit: "objekt", verb: "att innehålla" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "reguljärt uttryck",
    email: "e-postadress",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datum och tid",
    date: "ISO-datum",
    time: "ISO-tid",
    duration: "ISO-varaktighet",
    ipv4: "IPv4-intervall",
    ipv6: "IPv6-intervall",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodad sträng",
    base64url: "base64url-kodad sträng",
    json_string: "JSON-sträng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "mall-literal"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "antal",
    array: "lista"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ogiltig inmatning: förväntat instanceof ${issue2.expected}, fick ${received}`;
        }
        return `Ogiltig inmatning: förväntat ${expected}, fick ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ogiltig inmatning: förväntat ${stringifyPrimitive(issue2.values[0])}`;
        return `Ogiltigt val: förväntade en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `För stor(t): förväntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        }
        return `För stor(t): förväntat ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `För lite(t): förväntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `För lite(t): förväntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ogiltig sträng: måste börja med "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Ogiltig sträng: måste sluta med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ogiltig sträng: måste innehålla "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ogiltig sträng: måste matcha mönstret "${_issue.pattern}"`;
        return `Ogiltig(t) ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ogiltigt tal: måste vara en multipel av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Okända nycklar" : "Okänd nyckel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ogiltig nyckel i ${issue2.origin ?? "värdet"}`;
      case "invalid_union":
        return "Ogiltig input";
      case "invalid_element":
        return `Ogiltigt värde i ${issue2.origin ?? "värdet"}`;
      default:
        return `Ogiltig input`;
    }
  };
};
function sv_default() {
  return {
    localeError: error37()
  };
}
// node_modules/zod/v4/locales/ta.js
var error38 = () => {
  const Sizable = {
    string: { unit: "எழுத்துக்கள்", verb: "கொண்டிருக்க வேண்டும்" },
    file: { unit: "பைட்டுகள்", verb: "கொண்டிருக்க வேண்டும்" },
    array: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
    set: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "உள்ளீடு",
    email: "மின்னஞ்சல் முகவரி",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO தேதி நேரம்",
    date: "ISO தேதி",
    time: "ISO நேரம்",
    duration: "ISO கால அளவு",
    ipv4: "IPv4 முகவரி",
    ipv6: "IPv6 முகவரி",
    cidrv4: "IPv4 வரம்பு",
    cidrv6: "IPv6 வரம்பு",
    base64: "base64-encoded சரம்",
    base64url: "base64url-encoded சரம்",
    json_string: "JSON சரம்",
    e164: "E.164 எண்",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "எண்",
    array: "அணி",
    null: "வெறுமை"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது instanceof ${issue2.expected}, பெறப்பட்டது ${received}`;
        }
        return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${expected}, பெறப்பட்டது ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${stringifyPrimitive(issue2.values[0])}`;
        return `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${joinValues(issue2.values, "|")} இல் ஒன்று`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue2.origin ?? "மதிப்பு"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "உறுப்புகள்"} ஆக இருக்க வேண்டும்`;
        }
        return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue2.origin ?? "மதிப்பு"} ${adj}${issue2.maximum.toString()} ஆக இருக்க வேண்டும்`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ஆக இருக்க வேண்டும்`;
        }
        return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue2.origin} ${adj}${issue2.minimum.toString()} ஆக இருக்க வேண்டும்`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `தவறான சரம்: "${_issue.prefix}" இல் தொடங்க வேண்டும்`;
        if (_issue.format === "ends_with")
          return `தவறான சரம்: "${_issue.suffix}" இல் முடிவடைய வேண்டும்`;
        if (_issue.format === "includes")
          return `தவறான சரம்: "${_issue.includes}" ஐ உள்ளடக்க வேண்டும்`;
        if (_issue.format === "regex")
          return `தவறான சரம்: ${_issue.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`;
        return `தவறான ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `தவறான எண்: ${issue2.divisor} இன் பலமாக இருக்க வேண்டும்`;
      case "unrecognized_keys":
        return `அடையாளம் தெரியாத விசை${issue2.keys.length > 1 ? "கள்" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} இல் தவறான விசை`;
      case "invalid_union":
        return "தவறான உள்ளீடு";
      case "invalid_element":
        return `${issue2.origin} இல் தவறான மதிப்பு`;
      default:
        return `தவறான உள்ளீடு`;
    }
  };
};
function ta_default() {
  return {
    localeError: error38()
  };
}
// node_modules/zod/v4/locales/th.js
var error39 = () => {
  const Sizable = {
    string: { unit: "ตัวอักษร", verb: "ควรมี" },
    file: { unit: "ไบต์", verb: "ควรมี" },
    array: { unit: "รายการ", verb: "ควรมี" },
    set: { unit: "รายการ", verb: "ควรมี" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ข้อมูลที่ป้อน",
    email: "ที่อยู่อีเมล",
    url: "URL",
    emoji: "อิโมจิ",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "วันที่เวลาแบบ ISO",
    date: "วันที่แบบ ISO",
    time: "เวลาแบบ ISO",
    duration: "ช่วงเวลาแบบ ISO",
    ipv4: "ที่อยู่ IPv4",
    ipv6: "ที่อยู่ IPv6",
    cidrv4: "ช่วง IP แบบ IPv4",
    cidrv6: "ช่วง IP แบบ IPv6",
    base64: "ข้อความแบบ Base64",
    base64url: "ข้อความแบบ Base64 สำหรับ URL",
    json_string: "ข้อความแบบ JSON",
    e164: "เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",
    jwt: "โทเคน JWT",
    template_literal: "ข้อมูลที่ป้อน"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "ตัวเลข",
    array: "อาร์เรย์ (Array)",
    null: "ไม่มีค่า (null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น instanceof ${issue2.expected} แต่ได้รับ ${received}`;
        }
        return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${expected} แต่ได้รับ ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `ค่าไม่ถูกต้อง: ควรเป็น ${stringifyPrimitive(issue2.values[0])}`;
        return `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "ไม่เกิน" : "น้อยกว่า";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `เกินกำหนด: ${issue2.origin ?? "ค่า"} ควรมี${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "รายการ"}`;
        return `เกินกำหนด: ${issue2.origin ?? "ค่า"} ควรมี${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "อย่างน้อย" : "มากกว่า";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `น้อยกว่ากำหนด: ${issue2.origin} ควรมี${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `น้อยกว่ากำหนด: ${issue2.origin} ควรมี${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${_issue.includes}" อยู่ในข้อความ`;
        if (_issue.format === "regex")
          return `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${_issue.pattern}`;
        return `รูปแบบไม่ถูกต้อง: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${issue2.divisor} ได้ลงตัว`;
      case "unrecognized_keys":
        return `พบคีย์ที่ไม่รู้จัก: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `คีย์ไม่ถูกต้องใน ${issue2.origin}`;
      case "invalid_union":
        return "ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";
      case "invalid_element":
        return `ข้อมูลไม่ถูกต้องใน ${issue2.origin}`;
      default:
        return `ข้อมูลไม่ถูกต้อง`;
    }
  };
};
function th_default() {
  return {
    localeError: error39()
  };
}
// node_modules/zod/v4/locales/tr.js
var error40 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "olmalı" },
    file: { unit: "bayt", verb: "olmalı" },
    array: { unit: "öğe", verb: "olmalı" },
    set: { unit: "öğe", verb: "olmalı" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "girdi",
    email: "e-posta adresi",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO tarih ve saat",
    date: "ISO tarih",
    time: "ISO saat",
    duration: "ISO süre",
    ipv4: "IPv4 adresi",
    ipv6: "IPv6 adresi",
    cidrv4: "IPv4 aralığı",
    cidrv6: "IPv6 aralığı",
    base64: "base64 ile şifrelenmiş metin",
    base64url: "base64url ile şifrelenmiş metin",
    json_string: "JSON dizesi",
    e164: "E.164 sayısı",
    jwt: "JWT",
    template_literal: "Şablon dizesi"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Geçersiz değer: beklenen instanceof ${issue2.expected}, alınan ${received}`;
        }
        return `Geçersiz değer: beklenen ${expected}, alınan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Geçersiz değer: beklenen ${stringifyPrimitive(issue2.values[0])}`;
        return `Geçersiz seçenek: aşağıdakilerden biri olmalı: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çok büyük: beklenen ${issue2.origin ?? "değer"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "öğe"}`;
        return `Çok büyük: beklenen ${issue2.origin ?? "değer"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çok küçük: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `Çok küçük: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Geçersiz metin: "${_issue.prefix}" ile başlamalı`;
        if (_issue.format === "ends_with")
          return `Geçersiz metin: "${_issue.suffix}" ile bitmeli`;
        if (_issue.format === "includes")
          return `Geçersiz metin: "${_issue.includes}" içermeli`;
        if (_issue.format === "regex")
          return `Geçersiz metin: ${_issue.pattern} desenine uymalı`;
        return `Geçersiz ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Geçersiz sayı: ${issue2.divisor} ile tam bölünebilmeli`;
      case "unrecognized_keys":
        return `Tanınmayan anahtar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} içinde geçersiz anahtar`;
      case "invalid_union":
        return "Geçersiz değer";
      case "invalid_element":
        return `${issue2.origin} içinde geçersiz değer`;
      default:
        return `Geçersiz değer`;
    }
  };
};
function tr_default() {
  return {
    localeError: error40()
  };
}
// node_modules/zod/v4/locales/uk.js
var error41 = () => {
  const Sizable = {
    string: { unit: "символів", verb: "матиме" },
    file: { unit: "байтів", verb: "матиме" },
    array: { unit: "елементів", verb: "матиме" },
    set: { unit: "елементів", verb: "матиме" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "вхідні дані",
    email: "адреса електронної пошти",
    url: "URL",
    emoji: "емодзі",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "дата та час ISO",
    date: "дата ISO",
    time: "час ISO",
    duration: "тривалість ISO",
    ipv4: "адреса IPv4",
    ipv6: "адреса IPv6",
    cidrv4: "діапазон IPv4",
    cidrv6: "діапазон IPv6",
    base64: "рядок у кодуванні base64",
    base64url: "рядок у кодуванні base64url",
    json_string: "рядок JSON",
    e164: "номер E.164",
    jwt: "JWT",
    template_literal: "вхідні дані"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "число",
    array: "масив"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Неправильні вхідні дані: очікується instanceof ${issue2.expected}, отримано ${received}`;
        }
        return `Неправильні вхідні дані: очікується ${expected}, отримано ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Неправильні вхідні дані: очікується ${stringifyPrimitive(issue2.values[0])}`;
        return `Неправильна опція: очікується одне з ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Занадто велике: очікується, що ${issue2.origin ?? "значення"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елементів"}`;
        return `Занадто велике: очікується, що ${issue2.origin ?? "значення"} буде ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Занадто мале: очікується, що ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Занадто мале: очікується, що ${issue2.origin} буде ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Неправильний рядок: повинен починатися з "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Неправильний рядок: повинен закінчуватися на "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Неправильний рядок: повинен містити "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Неправильний рядок: повинен відповідати шаблону ${_issue.pattern}`;
        return `Неправильний ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Неправильне число: повинно бути кратним ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Нерозпізнаний ключ${issue2.keys.length > 1 ? "і" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Неправильний ключ у ${issue2.origin}`;
      case "invalid_union":
        return "Неправильні вхідні дані";
      case "invalid_element":
        return `Неправильне значення у ${issue2.origin}`;
      default:
        return `Неправильні вхідні дані`;
    }
  };
};
function uk_default() {
  return {
    localeError: error41()
  };
}

// node_modules/zod/v4/locales/ua.js
function ua_default() {
  return uk_default();
}
// node_modules/zod/v4/locales/ur.js
var error42 = () => {
  const Sizable = {
    string: { unit: "حروف", verb: "ہونا" },
    file: { unit: "بائٹس", verb: "ہونا" },
    array: { unit: "آئٹمز", verb: "ہونا" },
    set: { unit: "آئٹمز", verb: "ہونا" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ان پٹ",
    email: "ای میل ایڈریس",
    url: "یو آر ایل",
    emoji: "ایموجی",
    uuid: "یو یو آئی ڈی",
    uuidv4: "یو یو آئی ڈی وی 4",
    uuidv6: "یو یو آئی ڈی وی 6",
    nanoid: "نینو آئی ڈی",
    guid: "جی یو آئی ڈی",
    cuid: "سی یو آئی ڈی",
    cuid2: "سی یو آئی ڈی 2",
    ulid: "یو ایل آئی ڈی",
    xid: "ایکس آئی ڈی",
    ksuid: "کے ایس یو آئی ڈی",
    datetime: "آئی ایس او ڈیٹ ٹائم",
    date: "آئی ایس او تاریخ",
    time: "آئی ایس او وقت",
    duration: "آئی ایس او مدت",
    ipv4: "آئی پی وی 4 ایڈریس",
    ipv6: "آئی پی وی 6 ایڈریس",
    cidrv4: "آئی پی وی 4 رینج",
    cidrv6: "آئی پی وی 6 رینج",
    base64: "بیس 64 ان کوڈڈ سٹرنگ",
    base64url: "بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",
    json_string: "جے ایس او این سٹرنگ",
    e164: "ای 164 نمبر",
    jwt: "جے ڈبلیو ٹی",
    template_literal: "ان پٹ"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "نمبر",
    array: "آرے",
    null: "نل"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `غلط ان پٹ: instanceof ${issue2.expected} متوقع تھا، ${received} موصول ہوا`;
        }
        return `غلط ان پٹ: ${expected} متوقع تھا، ${received} موصول ہوا`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `غلط ان پٹ: ${stringifyPrimitive(issue2.values[0])} متوقع تھا`;
        return `غلط آپشن: ${joinValues(issue2.values, "|")} میں سے ایک متوقع تھا`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `بہت بڑا: ${issue2.origin ?? "ویلیو"} کے ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عناصر"} ہونے متوقع تھے`;
        return `بہت بڑا: ${issue2.origin ?? "ویلیو"} کا ${adj}${issue2.maximum.toString()} ہونا متوقع تھا`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `بہت چھوٹا: ${issue2.origin} کے ${adj}${issue2.minimum.toString()} ${sizing.unit} ہونے متوقع تھے`;
        }
        return `بہت چھوٹا: ${issue2.origin} کا ${adj}${issue2.minimum.toString()} ہونا متوقع تھا`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `غلط سٹرنگ: "${_issue.prefix}" سے شروع ہونا چاہیے`;
        }
        if (_issue.format === "ends_with")
          return `غلط سٹرنگ: "${_issue.suffix}" پر ختم ہونا چاہیے`;
        if (_issue.format === "includes")
          return `غلط سٹرنگ: "${_issue.includes}" شامل ہونا چاہیے`;
        if (_issue.format === "regex")
          return `غلط سٹرنگ: پیٹرن ${_issue.pattern} سے میچ ہونا چاہیے`;
        return `غلط ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `غلط نمبر: ${issue2.divisor} کا مضاعف ہونا چاہیے`;
      case "unrecognized_keys":
        return `غیر تسلیم شدہ کی${issue2.keys.length > 1 ? "ز" : ""}: ${joinValues(issue2.keys, "، ")}`;
      case "invalid_key":
        return `${issue2.origin} میں غلط کی`;
      case "invalid_union":
        return "غلط ان پٹ";
      case "invalid_element":
        return `${issue2.origin} میں غلط ویلیو`;
      default:
        return `غلط ان پٹ`;
    }
  };
};
function ur_default() {
  return {
    localeError: error42()
  };
}
// node_modules/zod/v4/locales/uz.js
var error43 = () => {
  const Sizable = {
    string: { unit: "belgi", verb: "bo‘lishi kerak" },
    file: { unit: "bayt", verb: "bo‘lishi kerak" },
    array: { unit: "element", verb: "bo‘lishi kerak" },
    set: { unit: "element", verb: "bo‘lishi kerak" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "kirish",
    email: "elektron pochta manzili",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO sana va vaqti",
    date: "ISO sana",
    time: "ISO vaqt",
    duration: "ISO davomiylik",
    ipv4: "IPv4 manzil",
    ipv6: "IPv6 manzil",
    mac: "MAC manzil",
    cidrv4: "IPv4 diapazon",
    cidrv6: "IPv6 diapazon",
    base64: "base64 kodlangan satr",
    base64url: "base64url kodlangan satr",
    json_string: "JSON satr",
    e164: "E.164 raqam",
    jwt: "JWT",
    template_literal: "kirish"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "raqam",
    array: "massiv"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Noto‘g‘ri kirish: kutilgan instanceof ${issue2.expected}, qabul qilingan ${received}`;
        }
        return `Noto‘g‘ri kirish: kutilgan ${expected}, qabul qilingan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Noto‘g‘ri kirish: kutilgan ${stringifyPrimitive(issue2.values[0])}`;
        return `Noto‘g‘ri variant: quyidagilardan biri kutilgan ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Noto‘g‘ri satr: "${_issue.prefix}" bilan boshlanishi kerak`;
        if (_issue.format === "ends_with")
          return `Noto‘g‘ri satr: "${_issue.suffix}" bilan tugashi kerak`;
        if (_issue.format === "includes")
          return `Noto‘g‘ri satr: "${_issue.includes}" ni o‘z ichiga olishi kerak`;
        if (_issue.format === "regex")
          return `Noto‘g‘ri satr: ${_issue.pattern} shabloniga mos kelishi kerak`;
        return `Noto‘g‘ri ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Noto‘g‘ri raqam: ${issue2.divisor} ning karralisi bo‘lishi kerak`;
      case "unrecognized_keys":
        return `Noma’lum kalit${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} dagi kalit noto‘g‘ri`;
      case "invalid_union":
        return "Noto‘g‘ri kirish";
      case "invalid_element":
        return `${issue2.origin} da noto‘g‘ri qiymat`;
      default:
        return `Noto‘g‘ri kirish`;
    }
  };
};
function uz_default() {
  return {
    localeError: error43()
  };
}
// node_modules/zod/v4/locales/vi.js
var error44 = () => {
  const Sizable = {
    string: { unit: "ký tự", verb: "có" },
    file: { unit: "byte", verb: "có" },
    array: { unit: "phần tử", verb: "có" },
    set: { unit: "phần tử", verb: "có" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "đầu vào",
    email: "địa chỉ email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ngày giờ ISO",
    date: "ngày ISO",
    time: "giờ ISO",
    duration: "khoảng thời gian ISO",
    ipv4: "địa chỉ IPv4",
    ipv6: "địa chỉ IPv6",
    cidrv4: "dải IPv4",
    cidrv6: "dải IPv6",
    base64: "chuỗi mã hóa base64",
    base64url: "chuỗi mã hóa base64url",
    json_string: "chuỗi JSON",
    e164: "số E.164",
    jwt: "JWT",
    template_literal: "đầu vào"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "số",
    array: "mảng"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Đầu vào không hợp lệ: mong đợi instanceof ${issue2.expected}, nhận được ${received}`;
        }
        return `Đầu vào không hợp lệ: mong đợi ${expected}, nhận được ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Đầu vào không hợp lệ: mong đợi ${stringifyPrimitive(issue2.values[0])}`;
        return `Tùy chọn không hợp lệ: mong đợi một trong các giá trị ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Quá lớn: mong đợi ${issue2.origin ?? "giá trị"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "phần tử"}`;
        return `Quá lớn: mong đợi ${issue2.origin ?? "giá trị"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Quá nhỏ: mong đợi ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Quá nhỏ: mong đợi ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Chuỗi không hợp lệ: phải bắt đầu bằng "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Chuỗi không hợp lệ: phải kết thúc bằng "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chuỗi không hợp lệ: phải bao gồm "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chuỗi không hợp lệ: phải khớp với mẫu ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} không hợp lệ`;
      }
      case "not_multiple_of":
        return `Số không hợp lệ: phải là bội số của ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Khóa không được nhận dạng: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Khóa không hợp lệ trong ${issue2.origin}`;
      case "invalid_union":
        return "Đầu vào không hợp lệ";
      case "invalid_element":
        return `Giá trị không hợp lệ trong ${issue2.origin}`;
      default:
        return `Đầu vào không hợp lệ`;
    }
  };
};
function vi_default() {
  return {
    localeError: error44()
  };
}
// node_modules/zod/v4/locales/zh-CN.js
var error45 = () => {
  const Sizable = {
    string: { unit: "字符", verb: "包含" },
    file: { unit: "字节", verb: "包含" },
    array: { unit: "项", verb: "包含" },
    set: { unit: "项", verb: "包含" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "输入",
    email: "电子邮件",
    url: "URL",
    emoji: "表情符号",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO日期时间",
    date: "ISO日期",
    time: "ISO时间",
    duration: "ISO时长",
    ipv4: "IPv4地址",
    ipv6: "IPv6地址",
    cidrv4: "IPv4网段",
    cidrv6: "IPv6网段",
    base64: "base64编码字符串",
    base64url: "base64url编码字符串",
    json_string: "JSON字符串",
    e164: "E.164号码",
    jwt: "JWT",
    template_literal: "输入"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "数字",
    array: "数组",
    null: "空值(null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `无效输入：期望 instanceof ${issue2.expected}，实际接收 ${received}`;
        }
        return `无效输入：期望 ${expected}，实际接收 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `无效输入：期望 ${stringifyPrimitive(issue2.values[0])}`;
        return `无效选项：期望以下之一 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `数值过大：期望 ${issue2.origin ?? "值"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "个元素"}`;
        return `数值过大：期望 ${issue2.origin ?? "值"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `数值过小：期望 ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `数值过小：期望 ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `无效字符串：必须以 "${_issue.prefix}" 开头`;
        if (_issue.format === "ends_with")
          return `无效字符串：必须以 "${_issue.suffix}" 结尾`;
        if (_issue.format === "includes")
          return `无效字符串：必须包含 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `无效字符串：必须满足正则表达式 ${_issue.pattern}`;
        return `无效${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `无效数字：必须是 ${issue2.divisor} 的倍数`;
      case "unrecognized_keys":
        return `出现未知的键(key): ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} 中的键(key)无效`;
      case "invalid_union":
        return "无效输入";
      case "invalid_element":
        return `${issue2.origin} 中包含无效值(value)`;
      default:
        return `无效输入`;
    }
  };
};
function zh_CN_default() {
  return {
    localeError: error45()
  };
}
// node_modules/zod/v4/locales/zh-TW.js
var error46 = () => {
  const Sizable = {
    string: { unit: "字元", verb: "擁有" },
    file: { unit: "位元組", verb: "擁有" },
    array: { unit: "項目", verb: "擁有" },
    set: { unit: "項目", verb: "擁有" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "輸入",
    email: "郵件地址",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO 日期時間",
    date: "ISO 日期",
    time: "ISO 時間",
    duration: "ISO 期間",
    ipv4: "IPv4 位址",
    ipv6: "IPv6 位址",
    cidrv4: "IPv4 範圍",
    cidrv6: "IPv6 範圍",
    base64: "base64 編碼字串",
    base64url: "base64url 編碼字串",
    json_string: "JSON 字串",
    e164: "E.164 數值",
    jwt: "JWT",
    template_literal: "輸入"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `無效的輸入值：預期為 instanceof ${issue2.expected}，但收到 ${received}`;
        }
        return `無效的輸入值：預期為 ${expected}，但收到 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `無效的輸入值：預期為 ${stringifyPrimitive(issue2.values[0])}`;
        return `無效的選項：預期為以下其中之一 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `數值過大：預期 ${issue2.origin ?? "值"} 應為 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "個元素"}`;
        return `數值過大：預期 ${issue2.origin ?? "值"} 應為 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `數值過小：預期 ${issue2.origin} 應為 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `數值過小：預期 ${issue2.origin} 應為 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `無效的字串：必須以 "${_issue.prefix}" 開頭`;
        }
        if (_issue.format === "ends_with")
          return `無效的字串：必須以 "${_issue.suffix}" 結尾`;
        if (_issue.format === "includes")
          return `無效的字串：必須包含 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `無效的字串：必須符合格式 ${_issue.pattern}`;
        return `無效的 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `無效的數字：必須為 ${issue2.divisor} 的倍數`;
      case "unrecognized_keys":
        return `無法識別的鍵值${issue2.keys.length > 1 ? "們" : ""}：${joinValues(issue2.keys, "、")}`;
      case "invalid_key":
        return `${issue2.origin} 中有無效的鍵值`;
      case "invalid_union":
        return "無效的輸入值";
      case "invalid_element":
        return `${issue2.origin} 中有無效的值`;
      default:
        return `無效的輸入值`;
    }
  };
};
function zh_TW_default() {
  return {
    localeError: error46()
  };
}
// node_modules/zod/v4/locales/yo.js
var error47 = () => {
  const Sizable = {
    string: { unit: "àmi", verb: "ní" },
    file: { unit: "bytes", verb: "ní" },
    array: { unit: "nkan", verb: "ní" },
    set: { unit: "nkan", verb: "ní" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ẹ̀rọ ìbáwọlé",
    email: "àdírẹ́sì ìmẹ́lì",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "àkókò ISO",
    date: "ọjọ́ ISO",
    time: "àkókò ISO",
    duration: "àkókò tó pé ISO",
    ipv4: "àdírẹ́sì IPv4",
    ipv6: "àdírẹ́sì IPv6",
    cidrv4: "àgbègbè IPv4",
    cidrv6: "àgbègbè IPv6",
    base64: "ọ̀rọ̀ tí a kọ́ ní base64",
    base64url: "ọ̀rọ̀ base64url",
    json_string: "ọ̀rọ̀ JSON",
    e164: "nọ́mbà E.164",
    jwt: "JWT",
    template_literal: "ẹ̀rọ ìbáwọlé"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nọ́mbà",
    array: "akopọ"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ìbáwọlé aṣìṣe: a ní láti fi instanceof ${issue2.expected}, àmọ̀ a rí ${received}`;
        }
        return `Ìbáwọlé aṣìṣe: a ní láti fi ${expected}, àmọ̀ a rí ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ìbáwọlé aṣìṣe: a ní láti fi ${stringifyPrimitive(issue2.values[0])}`;
        return `Àṣàyàn aṣìṣe: yan ọ̀kan lára ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Tó pọ̀ jù: a ní láti jẹ́ pé ${issue2.origin ?? "iye"} ${sizing.verb} ${adj}${issue2.maximum} ${sizing.unit}`;
        return `Tó pọ̀ jù: a ní láti jẹ́ ${adj}${issue2.maximum}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Kéré ju: a ní láti jẹ́ pé ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum} ${sizing.unit}`;
        return `Kéré ju: a ní láti jẹ́ ${adj}${issue2.minimum}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀lú "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ parí pẹ̀lú "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ ní "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bá àpẹẹrẹ mu ${_issue.pattern}`;
        return `Aṣìṣe: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nọ́mbà aṣìṣe: gbọ́dọ̀ jẹ́ èyà pípín ti ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Bọtìnì àìmọ̀: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Bọtìnì aṣìṣe nínú ${issue2.origin}`;
      case "invalid_union":
        return "Ìbáwọlé aṣìṣe";
      case "invalid_element":
        return `Iye aṣìṣe nínú ${issue2.origin}`;
      default:
        return "Ìbáwọlé aṣìṣe";
    }
  };
};
function yo_default() {
  return {
    localeError: error47()
  };
}
// node_modules/zod/v4/core/registries.js
var _a;
var $output = Symbol("ZodOutput");
var $input = Symbol("ZodInput");

class $ZodRegistry {
  constructor() {
    this._map = new WeakMap;
    this._idmap = new Map;
  }
  add(schema, ..._meta) {
    const meta = _meta[0];
    this._map.set(schema, meta);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.set(meta.id, schema);
    }
    return this;
  }
  clear() {
    this._map = new WeakMap;
    this._idmap = new Map;
    return this;
  }
  remove(schema) {
    const meta = this._map.get(schema);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.delete(meta.id);
    }
    this._map.delete(schema);
    return this;
  }
  get(schema) {
    const p = schema._zod.parent;
    if (p) {
      const pm = { ...this.get(p) ?? {} };
      delete pm.id;
      const f = { ...pm, ...this._map.get(schema) };
      return Object.keys(f).length ? f : undefined;
    }
    return this._map.get(schema);
  }
  has(schema) {
    return this._map.has(schema);
  }
}
function registry() {
  return new $ZodRegistry;
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;
// node_modules/zod/v4/core/api.js
function _string(Class2, params) {
  return new Class2({
    type: "string",
    ...normalizeParams(params)
  });
}
function _coercedString(Class2, params) {
  return new Class2({
    type: "string",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _email(Class2, params) {
  return new Class2({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _guid(Class2, params) {
  return new Class2({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuidv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params)
  });
}
function _uuidv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params)
  });
}
function _uuidv7(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params)
  });
}
function _url(Class2, params) {
  return new Class2({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _emoji2(Class2, params) {
  return new Class2({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _nanoid(Class2, params) {
  return new Class2({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid2(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ulid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _xid(Class2, params) {
  return new Class2({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ksuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _mac(Class2, params) {
  return new Class2({
    type: "string",
    format: "mac",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64url(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _e164(Class2, params) {
  return new Class2({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _jwt(Class2, params) {
  return new Class2({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
var TimePrecision = {
  Any: null,
  Minute: -1,
  Second: 0,
  Millisecond: 3,
  Microsecond: 6
};
function _isoDateTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDate(Class2, params) {
  return new Class2({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _isoTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDuration(Class2, params) {
  return new Class2({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _number(Class2, params) {
  return new Class2({
    type: "number",
    checks: [],
    ...normalizeParams(params)
  });
}
function _coercedNumber(Class2, params) {
  return new Class2({
    type: "number",
    coerce: true,
    checks: [],
    ...normalizeParams(params)
  });
}
function _int(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params)
  });
}
function _float32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float32",
    ...normalizeParams(params)
  });
}
function _float64(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float64",
    ...normalizeParams(params)
  });
}
function _int32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "int32",
    ...normalizeParams(params)
  });
}
function _uint32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "uint32",
    ...normalizeParams(params)
  });
}
function _boolean(Class2, params) {
  return new Class2({
    type: "boolean",
    ...normalizeParams(params)
  });
}
function _coercedBoolean(Class2, params) {
  return new Class2({
    type: "boolean",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _bigint(Class2, params) {
  return new Class2({
    type: "bigint",
    ...normalizeParams(params)
  });
}
function _coercedBigint(Class2, params) {
  return new Class2({
    type: "bigint",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _int64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "int64",
    ...normalizeParams(params)
  });
}
function _uint64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "uint64",
    ...normalizeParams(params)
  });
}
function _symbol(Class2, params) {
  return new Class2({
    type: "symbol",
    ...normalizeParams(params)
  });
}
function _undefined2(Class2, params) {
  return new Class2({
    type: "undefined",
    ...normalizeParams(params)
  });
}
function _null2(Class2, params) {
  return new Class2({
    type: "null",
    ...normalizeParams(params)
  });
}
function _any(Class2) {
  return new Class2({
    type: "any"
  });
}
function _unknown(Class2) {
  return new Class2({
    type: "unknown"
  });
}
function _never(Class2, params) {
  return new Class2({
    type: "never",
    ...normalizeParams(params)
  });
}
function _void(Class2, params) {
  return new Class2({
    type: "void",
    ...normalizeParams(params)
  });
}
function _date(Class2, params) {
  return new Class2({
    type: "date",
    ...normalizeParams(params)
  });
}
function _coercedDate(Class2, params) {
  return new Class2({
    type: "date",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _nan(Class2, params) {
  return new Class2({
    type: "nan",
    ...normalizeParams(params)
  });
}
function _lt(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _lte(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _gt(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _gte(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _positive(params) {
  return _gt(0, params);
}
function _negative(params) {
  return _lt(0, params);
}
function _nonpositive(params) {
  return _lte(0, params);
}
function _nonnegative(params) {
  return _gte(0, params);
}
function _multipleOf(value, params) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params),
    value
  });
}
function _maxSize(maximum, params) {
  return new $ZodCheckMaxSize({
    check: "max_size",
    ...normalizeParams(params),
    maximum
  });
}
function _minSize(minimum, params) {
  return new $ZodCheckMinSize({
    check: "min_size",
    ...normalizeParams(params),
    minimum
  });
}
function _size(size, params) {
  return new $ZodCheckSizeEquals({
    check: "size_equals",
    ...normalizeParams(params),
    size
  });
}
function _maxLength(maximum, params) {
  const ch = new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params),
    maximum
  });
  return ch;
}
function _minLength(minimum, params) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params),
    minimum
  });
}
function _length(length, params) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params),
    length
  });
}
function _regex(pattern, params) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params),
    pattern
  });
}
function _lowercase(params) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params)
  });
}
function _uppercase(params) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params)
  });
}
function _includes(includes, params) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params),
    includes
  });
}
function _startsWith(prefix, params) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params),
    prefix
  });
}
function _endsWith(suffix, params) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params),
    suffix
  });
}
function _property(property, schema, params) {
  return new $ZodCheckProperty({
    check: "property",
    property,
    schema,
    ...normalizeParams(params)
  });
}
function _mime(types, params) {
  return new $ZodCheckMimeType({
    check: "mime_type",
    mime: types,
    ...normalizeParams(params)
  });
}
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx
  });
}
function _normalize(form) {
  return _overwrite((input) => input.normalize(form));
}
function _trim() {
  return _overwrite((input) => input.trim());
}
function _toLowerCase() {
  return _overwrite((input) => input.toLowerCase());
}
function _toUpperCase() {
  return _overwrite((input) => input.toUpperCase());
}
function _slugify() {
  return _overwrite((input) => slugify(input));
}
function _array(Class2, element, params) {
  return new Class2({
    type: "array",
    element,
    ...normalizeParams(params)
  });
}
function _union(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
function _xor(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    inclusive: false,
    ...normalizeParams(params)
  });
}
function _discriminatedUnion(Class2, discriminator, options, params) {
  return new Class2({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
function _intersection(Class2, left, right) {
  return new Class2({
    type: "intersection",
    left,
    right
  });
}
function _tuple(Class2, items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new Class2({
    type: "tuple",
    items,
    rest,
    ...normalizeParams(params)
  });
}
function _record(Class2, keyType, valueType, params) {
  return new Class2({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
function _map(Class2, keyType, valueType, params) {
  return new Class2({
    type: "map",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
function _set(Class2, valueType, params) {
  return new Class2({
    type: "set",
    valueType,
    ...normalizeParams(params)
  });
}
function _enum(Class2, values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
function _nativeEnum(Class2, entries, params) {
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
function _literal(Class2, value, params) {
  return new Class2({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
function _file(Class2, params) {
  return new Class2({
    type: "file",
    ...normalizeParams(params)
  });
}
function _transform(Class2, fn) {
  return new Class2({
    type: "transform",
    transform: fn
  });
}
function _optional(Class2, innerType) {
  return new Class2({
    type: "optional",
    innerType
  });
}
function _nullable(Class2, innerType) {
  return new Class2({
    type: "nullable",
    innerType
  });
}
function _default(Class2, innerType, defaultValue) {
  return new Class2({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
function _nonoptional(Class2, innerType, params) {
  return new Class2({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
function _success(Class2, innerType) {
  return new Class2({
    type: "success",
    innerType
  });
}
function _catch(Class2, innerType, catchValue) {
  return new Class2({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
function _pipe(Class2, in_, out) {
  return new Class2({
    type: "pipe",
    in: in_,
    out
  });
}
function _readonly(Class2, innerType) {
  return new Class2({
    type: "readonly",
    innerType
  });
}
function _templateLiteral(Class2, parts, params) {
  return new Class2({
    type: "template_literal",
    parts,
    ...normalizeParams(params)
  });
}
function _lazy(Class2, getter) {
  return new Class2({
    type: "lazy",
    getter
  });
}
function _promise(Class2, innerType) {
  return new Class2({
    type: "promise",
    innerType
  });
}
function _custom(Class2, fn, _params) {
  const norm = normalizeParams(_params);
  norm.abort ?? (norm.abort = true);
  const schema = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...norm
  });
  return schema;
}
function _refine(Class2, fn, _params) {
  const schema = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
  return schema;
}
function _superRefine(fn) {
  const ch = _check((payload) => {
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, ch._zod.def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  });
  return ch;
}
function _check(fn, params) {
  const ch = new $ZodCheck({
    check: "custom",
    ...normalizeParams(params)
  });
  ch._zod.check = fn;
  return ch;
}
function describe(description) {
  const ch = new $ZodCheck({ check: "describe" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, description });
    }
  ];
  ch._zod.check = () => {};
  return ch;
}
function meta(metadata) {
  const ch = new $ZodCheck({ check: "meta" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, ...metadata });
    }
  ];
  ch._zod.check = () => {};
  return ch;
}
function _stringbool(Classes, _params) {
  const params = normalizeParams(_params);
  let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
  let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  if (params.case !== "sensitive") {
    truthyArray = truthyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
    falsyArray = falsyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
  }
  const truthySet = new Set(truthyArray);
  const falsySet = new Set(falsyArray);
  const _Codec = Classes.Codec ?? $ZodCodec;
  const _Boolean = Classes.Boolean ?? $ZodBoolean;
  const _String = Classes.String ?? $ZodString;
  const stringSchema = new _String({ type: "string", error: params.error });
  const booleanSchema = new _Boolean({ type: "boolean", error: params.error });
  const codec = new _Codec({
    type: "pipe",
    in: stringSchema,
    out: booleanSchema,
    transform: (input, payload) => {
      let data = input;
      if (params.case !== "sensitive")
        data = data.toLowerCase();
      if (truthySet.has(data)) {
        return true;
      } else if (falsySet.has(data)) {
        return false;
      } else {
        payload.issues.push({
          code: "invalid_value",
          expected: "stringbool",
          values: [...truthySet, ...falsySet],
          input: payload.value,
          inst: codec,
          continue: false
        });
        return {};
      }
    },
    reverseTransform: (input, _payload) => {
      if (input === true) {
        return truthyArray[0] || "true";
      } else {
        return falsyArray[0] || "false";
      }
    },
    error: params.error
  });
  return codec;
}
function _stringFormat(Class2, format, fnOrRegex, _params = {}) {
  const params = normalizeParams(_params);
  const def = {
    ...normalizeParams(_params),
    check: "string_format",
    type: "string",
    format,
    fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
    ...params
  };
  if (fnOrRegex instanceof RegExp) {
    def.pattern = fnOrRegex;
  }
  const inst = new Class2(def);
  return inst;
}
// node_modules/zod/v4/core/to-json-schema.js
function initializeContext(params) {
  let target = params?.target ?? "draft-2020-12";
  if (target === "draft-4")
    target = "draft-04";
  if (target === "draft-7")
    target = "draft-07";
  return {
    processors: params.processors ?? {},
    metadataRegistry: params?.metadata ?? globalRegistry,
    target,
    unrepresentable: params?.unrepresentable ?? "throw",
    override: params?.override ?? (() => {}),
    io: params?.io ?? "output",
    counter: 0,
    seen: new Map,
    cycles: params?.cycles ?? "ref",
    reused: params?.reused ?? "inline",
    external: params?.external ?? undefined
  };
}
function process2(schema, ctx, _params = { path: [], schemaPath: [] }) {
  var _a2;
  const def = schema._zod.def;
  const seen = ctx.seen.get(schema);
  if (seen) {
    seen.count++;
    const isCycle = _params.schemaPath.includes(schema);
    if (isCycle) {
      seen.cycle = _params.path;
    }
    return seen.schema;
  }
  const result = { schema: {}, count: 1, cycle: undefined, path: _params.path };
  ctx.seen.set(schema, result);
  const overrideSchema = schema._zod.toJSONSchema?.();
  if (overrideSchema) {
    result.schema = overrideSchema;
  } else {
    const params = {
      ..._params,
      schemaPath: [..._params.schemaPath, schema],
      path: _params.path
    };
    if (schema._zod.processJSONSchema) {
      schema._zod.processJSONSchema(ctx, result.schema, params);
    } else {
      const _json = result.schema;
      const processor = ctx.processors[def.type];
      if (!processor) {
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
      }
      processor(schema, ctx, _json, params);
    }
    const parent = schema._zod.parent;
    if (parent) {
      if (!result.ref)
        result.ref = parent;
      process2(parent, ctx, params);
      ctx.seen.get(parent).isParent = true;
    }
  }
  const meta2 = ctx.metadataRegistry.get(schema);
  if (meta2)
    Object.assign(result.schema, meta2);
  if (ctx.io === "input" && isTransforming(schema)) {
    delete result.schema.examples;
    delete result.schema.default;
  }
  if (ctx.io === "input" && result.schema._prefault)
    (_a2 = result.schema).default ?? (_a2.default = result.schema._prefault);
  delete result.schema._prefault;
  const _result = ctx.seen.get(schema);
  return _result.schema;
}
function extractDefs(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const idToSchema = new Map;
  for (const entry of ctx.seen.entries()) {
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      const existing = idToSchema.get(id);
      if (existing && existing !== entry[0]) {
        throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      }
      idToSchema.set(id, entry[0]);
    }
  }
  const makeURI = (entry) => {
    const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
    if (ctx.external) {
      const externalId = ctx.external.registry.get(entry[0])?.id;
      const uriGenerator = ctx.external.uri ?? ((id2) => id2);
      if (externalId) {
        return { ref: uriGenerator(externalId) };
      }
      const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
      entry[1].defId = id;
      return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
    }
    if (entry[1] === root) {
      return { ref: "#" };
    }
    const uriPrefix = `#`;
    const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
    const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
    return { defId, ref: defUriPrefix + defId };
  };
  const extractToDef = (entry) => {
    if (entry[1].schema.$ref) {
      return;
    }
    const seen = entry[1];
    const { ref, defId } = makeURI(entry);
    seen.def = { ...seen.schema };
    if (defId)
      seen.defId = defId;
    const schema2 = seen.schema;
    for (const key in schema2) {
      delete schema2[key];
    }
    schema2.$ref = ref;
  };
  if (ctx.cycles === "throw") {
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (seen.cycle) {
        throw new Error("Cycle detected: " + `#/${seen.cycle?.join("/")}/<root>` + '\n\nSet the `cycles` parameter to `"ref"` to resolve cyclical schemas with defs.');
      }
    }
  }
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (schema === entry[0]) {
      extractToDef(entry);
      continue;
    }
    if (ctx.external) {
      const ext = ctx.external.registry.get(entry[0])?.id;
      if (schema !== entry[0] && ext) {
        extractToDef(entry);
        continue;
      }
    }
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      extractToDef(entry);
      continue;
    }
    if (seen.cycle) {
      extractToDef(entry);
      continue;
    }
    if (seen.count > 1) {
      if (ctx.reused === "ref") {
        extractToDef(entry);
        continue;
      }
    }
  }
}
function finalize(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const flattenRef = (zodSchema) => {
    const seen = ctx.seen.get(zodSchema);
    if (seen.ref === null)
      return;
    const schema2 = seen.def ?? seen.schema;
    const _cached = { ...schema2 };
    const ref = seen.ref;
    seen.ref = null;
    if (ref) {
      flattenRef(ref);
      const refSeen = ctx.seen.get(ref);
      const refSchema = refSeen.schema;
      if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
        schema2.allOf = schema2.allOf ?? [];
        schema2.allOf.push(refSchema);
      } else {
        Object.assign(schema2, refSchema);
      }
      Object.assign(schema2, _cached);
      const isParentRef = zodSchema._zod.parent === ref;
      if (isParentRef) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (!(key in _cached)) {
            delete schema2[key];
          }
        }
      }
      if (refSchema.$ref && refSeen.def) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (key in refSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(refSeen.def[key])) {
            delete schema2[key];
          }
        }
      }
    }
    const parent = zodSchema._zod.parent;
    if (parent && parent !== ref) {
      flattenRef(parent);
      const parentSeen = ctx.seen.get(parent);
      if (parentSeen?.schema.$ref) {
        schema2.$ref = parentSeen.schema.$ref;
        if (parentSeen.def) {
          for (const key in schema2) {
            if (key === "$ref" || key === "allOf")
              continue;
            if (key in parentSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(parentSeen.def[key])) {
              delete schema2[key];
            }
          }
        }
      }
    }
    ctx.override({
      zodSchema,
      jsonSchema: schema2,
      path: seen.path ?? []
    });
  };
  for (const entry of [...ctx.seen.entries()].reverse()) {
    flattenRef(entry[0]);
  }
  const result = {};
  if (ctx.target === "draft-2020-12") {
    result.$schema = "https://json-schema.org/draft/2020-12/schema";
  } else if (ctx.target === "draft-07") {
    result.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (ctx.target === "draft-04") {
    result.$schema = "http://json-schema.org/draft-04/schema#";
  } else if (ctx.target === "openapi-3.0") {} else {}
  if (ctx.external?.uri) {
    const id = ctx.external.registry.get(schema)?.id;
    if (!id)
      throw new Error("Schema is missing an `id` property");
    result.$id = ctx.external.uri(id);
  }
  Object.assign(result, root.def ?? root.schema);
  const defs = ctx.external?.defs ?? {};
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (seen.def && seen.defId) {
      defs[seen.defId] = seen.def;
    }
  }
  if (ctx.external) {} else {
    if (Object.keys(defs).length > 0) {
      if (ctx.target === "draft-2020-12") {
        result.$defs = defs;
      } else {
        result.definitions = defs;
      }
    }
  }
  try {
    const finalized = JSON.parse(JSON.stringify(result));
    Object.defineProperty(finalized, "~standard", {
      value: {
        ...schema["~standard"],
        jsonSchema: {
          input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
          output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
        }
      },
      enumerable: false,
      writable: false
    });
    return finalized;
  } catch (_err) {
    throw new Error("Error converting schema to JSON.");
  }
}
function isTransforming(_schema, _ctx) {
  const ctx = _ctx ?? { seen: new Set };
  if (ctx.seen.has(_schema))
    return false;
  ctx.seen.add(_schema);
  const def = _schema._zod.def;
  if (def.type === "transform")
    return true;
  if (def.type === "array")
    return isTransforming(def.element, ctx);
  if (def.type === "set")
    return isTransforming(def.valueType, ctx);
  if (def.type === "lazy")
    return isTransforming(def.getter(), ctx);
  if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") {
    return isTransforming(def.innerType, ctx);
  }
  if (def.type === "intersection") {
    return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
  }
  if (def.type === "record" || def.type === "map") {
    return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
  }
  if (def.type === "pipe") {
    return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
  }
  if (def.type === "object") {
    for (const key in def.shape) {
      if (isTransforming(def.shape[key], ctx))
        return true;
    }
    return false;
  }
  if (def.type === "union") {
    for (const option of def.options) {
      if (isTransforming(option, ctx))
        return true;
    }
    return false;
  }
  if (def.type === "tuple") {
    for (const item of def.items) {
      if (isTransforming(item, ctx))
        return true;
    }
    if (def.rest && isTransforming(def.rest, ctx))
      return true;
    return false;
  }
  return false;
}
var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
  const ctx = initializeContext({ ...params, processors });
  process2(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
  const { libraryOptions, target } = params ?? {};
  const ctx = initializeContext({ ...libraryOptions ?? {}, target, io, processors });
  process2(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
// node_modules/zod/v4/core/json-schema-processors.js
var formatMap = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
};
var stringProcessor = (schema, ctx, _json, _params) => {
  const json = _json;
  json.type = "string";
  const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
  if (typeof minimum === "number")
    json.minLength = minimum;
  if (typeof maximum === "number")
    json.maxLength = maximum;
  if (format) {
    json.format = formatMap[format] ?? format;
    if (json.format === "")
      delete json.format;
    if (format === "time") {
      delete json.format;
    }
  }
  if (contentEncoding)
    json.contentEncoding = contentEncoding;
  if (patterns && patterns.size > 0) {
    const regexes = [...patterns];
    if (regexes.length === 1)
      json.pattern = regexes[0].source;
    else if (regexes.length > 1) {
      json.allOf = [
        ...regexes.map((regex) => ({
          ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
          pattern: regex.source
        }))
      ];
    }
  }
};
var numberProcessor = (schema, ctx, _json, _params) => {
  const json = _json;
  const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
  if (typeof format === "string" && format.includes("int"))
    json.type = "integer";
  else
    json.type = "number";
  if (typeof exclusiveMinimum === "number") {
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json.minimum = exclusiveMinimum;
      json.exclusiveMinimum = true;
    } else {
      json.exclusiveMinimum = exclusiveMinimum;
    }
  }
  if (typeof minimum === "number") {
    json.minimum = minimum;
    if (typeof exclusiveMinimum === "number" && ctx.target !== "draft-04") {
      if (exclusiveMinimum >= minimum)
        delete json.minimum;
      else
        delete json.exclusiveMinimum;
    }
  }
  if (typeof exclusiveMaximum === "number") {
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json.maximum = exclusiveMaximum;
      json.exclusiveMaximum = true;
    } else {
      json.exclusiveMaximum = exclusiveMaximum;
    }
  }
  if (typeof maximum === "number") {
    json.maximum = maximum;
    if (typeof exclusiveMaximum === "number" && ctx.target !== "draft-04") {
      if (exclusiveMaximum <= maximum)
        delete json.maximum;
      else
        delete json.exclusiveMaximum;
    }
  }
  if (typeof multipleOf === "number")
    json.multipleOf = multipleOf;
};
var booleanProcessor = (_schema, _ctx, json, _params) => {
  json.type = "boolean";
};
var bigintProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("BigInt cannot be represented in JSON Schema");
  }
};
var symbolProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Symbols cannot be represented in JSON Schema");
  }
};
var nullProcessor = (_schema, ctx, json, _params) => {
  if (ctx.target === "openapi-3.0") {
    json.type = "string";
    json.nullable = true;
    json.enum = [null];
  } else {
    json.type = "null";
  }
};
var undefinedProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Undefined cannot be represented in JSON Schema");
  }
};
var voidProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Void cannot be represented in JSON Schema");
  }
};
var neverProcessor = (_schema, _ctx, json, _params) => {
  json.not = {};
};
var anyProcessor = (_schema, _ctx, _json, _params) => {};
var unknownProcessor = (_schema, _ctx, _json, _params) => {};
var dateProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Date cannot be represented in JSON Schema");
  }
};
var enumProcessor = (schema, _ctx, json, _params) => {
  const def = schema._zod.def;
  const values = getEnumValues(def.entries);
  if (values.every((v) => typeof v === "number"))
    json.type = "number";
  if (values.every((v) => typeof v === "string"))
    json.type = "string";
  json.enum = values;
};
var literalProcessor = (schema, ctx, json, _params) => {
  const def = schema._zod.def;
  const vals = [];
  for (const val of def.values) {
    if (val === undefined) {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
      } else {}
    } else if (typeof val === "bigint") {
      if (ctx.unrepresentable === "throw") {
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      } else {
        vals.push(Number(val));
      }
    } else {
      vals.push(val);
    }
  }
  if (vals.length === 0) {} else if (vals.length === 1) {
    const val = vals[0];
    json.type = val === null ? "null" : typeof val;
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json.enum = [val];
    } else {
      json.const = val;
    }
  } else {
    if (vals.every((v) => typeof v === "number"))
      json.type = "number";
    if (vals.every((v) => typeof v === "string"))
      json.type = "string";
    if (vals.every((v) => typeof v === "boolean"))
      json.type = "boolean";
    if (vals.every((v) => v === null))
      json.type = "null";
    json.enum = vals;
  }
};
var nanProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("NaN cannot be represented in JSON Schema");
  }
};
var templateLiteralProcessor = (schema, _ctx, json, _params) => {
  const _json = json;
  const pattern = schema._zod.pattern;
  if (!pattern)
    throw new Error("Pattern not found in template literal");
  _json.type = "string";
  _json.pattern = pattern.source;
};
var fileProcessor = (schema, _ctx, json, _params) => {
  const _json = json;
  const file = {
    type: "string",
    format: "binary",
    contentEncoding: "binary"
  };
  const { minimum, maximum, mime } = schema._zod.bag;
  if (minimum !== undefined)
    file.minLength = minimum;
  if (maximum !== undefined)
    file.maxLength = maximum;
  if (mime) {
    if (mime.length === 1) {
      file.contentMediaType = mime[0];
      Object.assign(_json, file);
    } else {
      Object.assign(_json, file);
      _json.anyOf = mime.map((m) => ({ contentMediaType: m }));
    }
  } else {
    Object.assign(_json, file);
  }
};
var successProcessor = (_schema, _ctx, json, _params) => {
  json.type = "boolean";
};
var customProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Custom types cannot be represented in JSON Schema");
  }
};
var functionProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Function types cannot be represented in JSON Schema");
  }
};
var transformProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Transforms cannot be represented in JSON Schema");
  }
};
var mapProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Map cannot be represented in JSON Schema");
  }
};
var setProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Set cannot be represented in JSON Schema");
  }
};
var arrayProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number")
    json.minItems = minimum;
  if (typeof maximum === "number")
    json.maxItems = maximum;
  json.type = "array";
  json.items = process2(def.element, ctx, { ...params, path: [...params.path, "items"] });
};
var objectProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "object";
  json.properties = {};
  const shape = def.shape;
  for (const key in shape) {
    json.properties[key] = process2(shape[key], ctx, {
      ...params,
      path: [...params.path, "properties", key]
    });
  }
  const allKeys = new Set(Object.keys(shape));
  const requiredKeys = new Set([...allKeys].filter((key) => {
    const v = def.shape[key]._zod;
    if (ctx.io === "input") {
      return v.optin === undefined;
    } else {
      return v.optout === undefined;
    }
  }));
  if (requiredKeys.size > 0) {
    json.required = Array.from(requiredKeys);
  }
  if (def.catchall?._zod.def.type === "never") {
    json.additionalProperties = false;
  } else if (!def.catchall) {
    if (ctx.io === "output")
      json.additionalProperties = false;
  } else if (def.catchall) {
    json.additionalProperties = process2(def.catchall, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
};
var unionProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const isExclusive = def.inclusive === false;
  const options = def.options.map((x, i) => process2(x, ctx, {
    ...params,
    path: [...params.path, isExclusive ? "oneOf" : "anyOf", i]
  }));
  if (isExclusive) {
    json.oneOf = options;
  } else {
    json.anyOf = options;
  }
};
var intersectionProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const a = process2(def.left, ctx, {
    ...params,
    path: [...params.path, "allOf", 0]
  });
  const b = process2(def.right, ctx, {
    ...params,
    path: [...params.path, "allOf", 1]
  });
  const isSimpleIntersection = (val) => ("allOf" in val) && Object.keys(val).length === 1;
  const allOf = [
    ...isSimpleIntersection(a) ? a.allOf : [a],
    ...isSimpleIntersection(b) ? b.allOf : [b]
  ];
  json.allOf = allOf;
};
var tupleProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "array";
  const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
  const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
  const prefixItems = def.items.map((x, i) => process2(x, ctx, {
    ...params,
    path: [...params.path, prefixPath, i]
  }));
  const rest = def.rest ? process2(def.rest, ctx, {
    ...params,
    path: [...params.path, restPath, ...ctx.target === "openapi-3.0" ? [def.items.length] : []]
  }) : null;
  if (ctx.target === "draft-2020-12") {
    json.prefixItems = prefixItems;
    if (rest) {
      json.items = rest;
    }
  } else if (ctx.target === "openapi-3.0") {
    json.items = {
      anyOf: prefixItems
    };
    if (rest) {
      json.items.anyOf.push(rest);
    }
    json.minItems = prefixItems.length;
    if (!rest) {
      json.maxItems = prefixItems.length;
    }
  } else {
    json.items = prefixItems;
    if (rest) {
      json.additionalItems = rest;
    }
  }
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number")
    json.minItems = minimum;
  if (typeof maximum === "number")
    json.maxItems = maximum;
};
var recordProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "object";
  const keyType = def.keyType;
  const keyBag = keyType._zod.bag;
  const patterns = keyBag?.patterns;
  if (def.mode === "loose" && patterns && patterns.size > 0) {
    const valueSchema = process2(def.valueType, ctx, {
      ...params,
      path: [...params.path, "patternProperties", "*"]
    });
    json.patternProperties = {};
    for (const pattern of patterns) {
      json.patternProperties[pattern.source] = valueSchema;
    }
  } else {
    if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
      json.propertyNames = process2(def.keyType, ctx, {
        ...params,
        path: [...params.path, "propertyNames"]
      });
    }
    json.additionalProperties = process2(def.valueType, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
  const keyValues = keyType._zod.values;
  if (keyValues) {
    const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
    if (validKeyValues.length > 0) {
      json.required = validKeyValues;
    }
  }
};
var nullableProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const inner = process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  if (ctx.target === "openapi-3.0") {
    seen.ref = def.innerType;
    json.nullable = true;
  } else {
    json.anyOf = [inner, { type: "null" }];
  }
};
var nonoptionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var defaultProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json.default = JSON.parse(JSON.stringify(def.defaultValue));
};
var prefaultProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  if (ctx.io === "input")
    json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
var catchProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  let catchValue;
  try {
    catchValue = def.catchValue(undefined);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  json.default = catchValue;
};
var pipeProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  const innerType = ctx.io === "input" ? def.in._zod.def.type === "transform" ? def.out : def.in : def.out;
  process2(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var readonlyProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json.readOnly = true;
};
var promiseProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var optionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var lazyProcessor = (schema, ctx, _json, params) => {
  const innerType = schema._zod.innerType;
  process2(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var allProcessors = {
  string: stringProcessor,
  number: numberProcessor,
  boolean: booleanProcessor,
  bigint: bigintProcessor,
  symbol: symbolProcessor,
  null: nullProcessor,
  undefined: undefinedProcessor,
  void: voidProcessor,
  never: neverProcessor,
  any: anyProcessor,
  unknown: unknownProcessor,
  date: dateProcessor,
  enum: enumProcessor,
  literal: literalProcessor,
  nan: nanProcessor,
  template_literal: templateLiteralProcessor,
  file: fileProcessor,
  success: successProcessor,
  custom: customProcessor,
  function: functionProcessor,
  transform: transformProcessor,
  map: mapProcessor,
  set: setProcessor,
  array: arrayProcessor,
  object: objectProcessor,
  union: unionProcessor,
  intersection: intersectionProcessor,
  tuple: tupleProcessor,
  record: recordProcessor,
  nullable: nullableProcessor,
  nonoptional: nonoptionalProcessor,
  default: defaultProcessor,
  prefault: prefaultProcessor,
  catch: catchProcessor,
  pipe: pipeProcessor,
  readonly: readonlyProcessor,
  promise: promiseProcessor,
  optional: optionalProcessor,
  lazy: lazyProcessor
};
function toJSONSchema(input, params) {
  if ("_idmap" in input) {
    const registry2 = input;
    const ctx2 = initializeContext({ ...params, processors: allProcessors });
    const defs = {};
    for (const entry of registry2._idmap.entries()) {
      const [_, schema] = entry;
      process2(schema, ctx2);
    }
    const schemas = {};
    const external = {
      registry: registry2,
      uri: params?.uri,
      defs
    };
    ctx2.external = external;
    for (const entry of registry2._idmap.entries()) {
      const [key, schema] = entry;
      extractDefs(ctx2, schema);
      schemas[key] = finalize(ctx2, schema);
    }
    if (Object.keys(defs).length > 0) {
      const defsSegment = ctx2.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs
      };
    }
    return { schemas };
  }
  const ctx = initializeContext({ ...params, processors: allProcessors });
  process2(input, ctx);
  extractDefs(ctx, input);
  return finalize(ctx, input);
}
// node_modules/zod/v4/core/json-schema-generator.js
class JSONSchemaGenerator {
  get metadataRegistry() {
    return this.ctx.metadataRegistry;
  }
  get target() {
    return this.ctx.target;
  }
  get unrepresentable() {
    return this.ctx.unrepresentable;
  }
  get override() {
    return this.ctx.override;
  }
  get io() {
    return this.ctx.io;
  }
  get counter() {
    return this.ctx.counter;
  }
  set counter(value) {
    this.ctx.counter = value;
  }
  get seen() {
    return this.ctx.seen;
  }
  constructor(params) {
    let normalizedTarget = params?.target ?? "draft-2020-12";
    if (normalizedTarget === "draft-4")
      normalizedTarget = "draft-04";
    if (normalizedTarget === "draft-7")
      normalizedTarget = "draft-07";
    this.ctx = initializeContext({
      processors: allProcessors,
      target: normalizedTarget,
      ...params?.metadata && { metadata: params.metadata },
      ...params?.unrepresentable && { unrepresentable: params.unrepresentable },
      ...params?.override && { override: params.override },
      ...params?.io && { io: params.io }
    });
  }
  process(schema, _params = { path: [], schemaPath: [] }) {
    return process2(schema, this.ctx, _params);
  }
  emit(schema, _params) {
    if (_params) {
      if (_params.cycles)
        this.ctx.cycles = _params.cycles;
      if (_params.reused)
        this.ctx.reused = _params.reused;
      if (_params.external)
        this.ctx.external = _params.external;
    }
    extractDefs(this.ctx, schema);
    const result = finalize(this.ctx, schema);
    const { "~standard": _, ...plainResult } = result;
    return plainResult;
  }
}
// node_modules/zod/v4/core/json-schema.js
var exports_json_schema = {};
// node_modules/zod/v4/classic/schemas.js
var exports_schemas2 = {};
__export(exports_schemas2, {
  xor: () => xor,
  xid: () => xid2,
  void: () => _void2,
  uuidv7: () => uuidv7,
  uuidv6: () => uuidv6,
  uuidv4: () => uuidv4,
  uuid: () => uuid2,
  url: () => url,
  unknown: () => unknown,
  union: () => union,
  undefined: () => _undefined3,
  ulid: () => ulid2,
  uint64: () => uint64,
  uint32: () => uint32,
  tuple: () => tuple,
  transform: () => transform,
  templateLiteral: () => templateLiteral,
  symbol: () => symbol,
  superRefine: () => superRefine,
  success: () => success,
  stringbool: () => stringbool,
  stringFormat: () => stringFormat,
  string: () => string2,
  strictObject: () => strictObject,
  set: () => set,
  refine: () => refine,
  record: () => record,
  readonly: () => readonly,
  promise: () => promise,
  preprocess: () => preprocess,
  prefault: () => prefault,
  pipe: () => pipe,
  partialRecord: () => partialRecord,
  optional: () => optional,
  object: () => object,
  number: () => number2,
  nullish: () => nullish2,
  nullable: () => nullable,
  null: () => _null3,
  nonoptional: () => nonoptional,
  never: () => never,
  nativeEnum: () => nativeEnum,
  nanoid: () => nanoid2,
  nan: () => nan,
  meta: () => meta2,
  map: () => map,
  mac: () => mac2,
  looseRecord: () => looseRecord,
  looseObject: () => looseObject,
  literal: () => literal,
  lazy: () => lazy,
  ksuid: () => ksuid2,
  keyof: () => keyof,
  jwt: () => jwt,
  json: () => json,
  ipv6: () => ipv62,
  ipv4: () => ipv42,
  intersection: () => intersection,
  int64: () => int64,
  int32: () => int32,
  int: () => int,
  instanceof: () => _instanceof,
  httpUrl: () => httpUrl,
  hostname: () => hostname2,
  hex: () => hex2,
  hash: () => hash,
  guid: () => guid2,
  function: () => _function,
  float64: () => float64,
  float32: () => float32,
  file: () => file,
  exactOptional: () => exactOptional,
  enum: () => _enum2,
  emoji: () => emoji2,
  email: () => email2,
  e164: () => e1642,
  discriminatedUnion: () => discriminatedUnion,
  describe: () => describe2,
  date: () => date3,
  custom: () => custom,
  cuid2: () => cuid22,
  cuid: () => cuid3,
  codec: () => codec,
  cidrv6: () => cidrv62,
  cidrv4: () => cidrv42,
  check: () => check,
  catch: () => _catch2,
  boolean: () => boolean2,
  bigint: () => bigint2,
  base64url: () => base64url2,
  base64: () => base642,
  array: () => array,
  any: () => any,
  _function: () => _function,
  _default: () => _default2,
  _ZodString: () => _ZodString,
  ZodXor: () => ZodXor,
  ZodXID: () => ZodXID,
  ZodVoid: () => ZodVoid,
  ZodUnknown: () => ZodUnknown,
  ZodUnion: () => ZodUnion,
  ZodUndefined: () => ZodUndefined,
  ZodUUID: () => ZodUUID,
  ZodURL: () => ZodURL,
  ZodULID: () => ZodULID,
  ZodType: () => ZodType,
  ZodTuple: () => ZodTuple,
  ZodTransform: () => ZodTransform,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodSymbol: () => ZodSymbol,
  ZodSuccess: () => ZodSuccess,
  ZodStringFormat: () => ZodStringFormat,
  ZodString: () => ZodString,
  ZodSet: () => ZodSet,
  ZodRecord: () => ZodRecord,
  ZodReadonly: () => ZodReadonly,
  ZodPromise: () => ZodPromise,
  ZodPrefault: () => ZodPrefault,
  ZodPipe: () => ZodPipe,
  ZodOptional: () => ZodOptional,
  ZodObject: () => ZodObject,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodNumber: () => ZodNumber,
  ZodNullable: () => ZodNullable,
  ZodNull: () => ZodNull,
  ZodNonOptional: () => ZodNonOptional,
  ZodNever: () => ZodNever,
  ZodNanoID: () => ZodNanoID,
  ZodNaN: () => ZodNaN,
  ZodMap: () => ZodMap,
  ZodMAC: () => ZodMAC,
  ZodLiteral: () => ZodLiteral,
  ZodLazy: () => ZodLazy,
  ZodKSUID: () => ZodKSUID,
  ZodJWT: () => ZodJWT,
  ZodIntersection: () => ZodIntersection,
  ZodIPv6: () => ZodIPv6,
  ZodIPv4: () => ZodIPv4,
  ZodGUID: () => ZodGUID,
  ZodFunction: () => ZodFunction,
  ZodFile: () => ZodFile,
  ZodExactOptional: () => ZodExactOptional,
  ZodEnum: () => ZodEnum,
  ZodEmoji: () => ZodEmoji,
  ZodEmail: () => ZodEmail,
  ZodE164: () => ZodE164,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodDefault: () => ZodDefault,
  ZodDate: () => ZodDate,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodCustom: () => ZodCustom,
  ZodCodec: () => ZodCodec,
  ZodCatch: () => ZodCatch,
  ZodCUID2: () => ZodCUID2,
  ZodCUID: () => ZodCUID,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodBoolean: () => ZodBoolean,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBigInt: () => ZodBigInt,
  ZodBase64URL: () => ZodBase64URL,
  ZodBase64: () => ZodBase64,
  ZodArray: () => ZodArray,
  ZodAny: () => ZodAny
});

// node_modules/zod/v4/classic/checks.js
var exports_checks2 = {};
__export(exports_checks2, {
  uppercase: () => _uppercase,
  trim: () => _trim,
  toUpperCase: () => _toUpperCase,
  toLowerCase: () => _toLowerCase,
  startsWith: () => _startsWith,
  slugify: () => _slugify,
  size: () => _size,
  regex: () => _regex,
  property: () => _property,
  positive: () => _positive,
  overwrite: () => _overwrite,
  normalize: () => _normalize,
  nonpositive: () => _nonpositive,
  nonnegative: () => _nonnegative,
  negative: () => _negative,
  multipleOf: () => _multipleOf,
  minSize: () => _minSize,
  minLength: () => _minLength,
  mime: () => _mime,
  maxSize: () => _maxSize,
  maxLength: () => _maxLength,
  lte: () => _lte,
  lt: () => _lt,
  lowercase: () => _lowercase,
  length: () => _length,
  includes: () => _includes,
  gte: () => _gte,
  gt: () => _gt,
  endsWith: () => _endsWith
});

// node_modules/zod/v4/classic/iso.js
var exports_iso = {};
__export(exports_iso, {
  time: () => time2,
  duration: () => duration2,
  datetime: () => datetime2,
  date: () => date2,
  ZodISOTime: () => ZodISOTime,
  ZodISODuration: () => ZodISODuration,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODate: () => ZodISODate
});
var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
  $ZodISODateTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function datetime2(params) {
  return _isoDateTime(ZodISODateTime, params);
}
var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
  $ZodISODate.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function date2(params) {
  return _isoDate(ZodISODate, params);
}
var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
  $ZodISOTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function time2(params) {
  return _isoTime(ZodISOTime, params);
}
var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
  $ZodISODuration.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function duration2(params) {
  return _isoDuration(ZodISODuration, params);
}

// node_modules/zod/v4/classic/errors.js
var initializer2 = (inst, issues) => {
  $ZodError.init(inst, issues);
  inst.name = "ZodError";
  Object.defineProperties(inst, {
    format: {
      value: (mapper) => formatError(inst, mapper)
    },
    flatten: {
      value: (mapper) => flattenError(inst, mapper)
    },
    addIssue: {
      value: (issue2) => {
        inst.issues.push(issue2);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      }
    },
    addIssues: {
      value: (issues2) => {
        inst.issues.push(...issues2);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      }
    },
    isEmpty: {
      get() {
        return inst.issues.length === 0;
      }
    }
  });
};
var ZodError = $constructor("ZodError", initializer2);
var ZodRealError = $constructor("ZodError", initializer2, {
  Parent: Error
});

// node_modules/zod/v4/classic/parse.js
var parse3 = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode2 = /* @__PURE__ */ _encode(ZodRealError);
var decode2 = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync2 = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync2 = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode2 = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode2 = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync2 = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync2 = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

// node_modules/zod/v4/classic/schemas.js
var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
  $ZodType.init(inst, def);
  Object.assign(inst["~standard"], {
    jsonSchema: {
      input: createStandardJSONSchemaMethod(inst, "input"),
      output: createStandardJSONSchemaMethod(inst, "output")
    }
  });
  inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
  inst.def = def;
  inst.type = def.type;
  Object.defineProperty(inst, "_def", { value: def });
  inst.check = (...checks2) => {
    return inst.clone(exports_util.mergeDefs(def, {
      checks: [
        ...def.checks ?? [],
        ...checks2.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
      ]
    }), {
      parent: true
    });
  };
  inst.with = inst.check;
  inst.clone = (def2, params) => clone(inst, def2, params);
  inst.brand = () => inst;
  inst.register = (reg, meta2) => {
    reg.add(inst, meta2);
    return inst;
  };
  inst.parse = (data, params) => parse3(inst, data, params, { callee: inst.parse });
  inst.safeParse = (data, params) => safeParse2(inst, data, params);
  inst.parseAsync = async (data, params) => parseAsync2(inst, data, params, { callee: inst.parseAsync });
  inst.safeParseAsync = async (data, params) => safeParseAsync2(inst, data, params);
  inst.spa = inst.safeParseAsync;
  inst.encode = (data, params) => encode2(inst, data, params);
  inst.decode = (data, params) => decode2(inst, data, params);
  inst.encodeAsync = async (data, params) => encodeAsync2(inst, data, params);
  inst.decodeAsync = async (data, params) => decodeAsync2(inst, data, params);
  inst.safeEncode = (data, params) => safeEncode2(inst, data, params);
  inst.safeDecode = (data, params) => safeDecode2(inst, data, params);
  inst.safeEncodeAsync = async (data, params) => safeEncodeAsync2(inst, data, params);
  inst.safeDecodeAsync = async (data, params) => safeDecodeAsync2(inst, data, params);
  inst.refine = (check, params) => inst.check(refine(check, params));
  inst.superRefine = (refinement) => inst.check(superRefine(refinement));
  inst.overwrite = (fn) => inst.check(_overwrite(fn));
  inst.optional = () => optional(inst);
  inst.exactOptional = () => exactOptional(inst);
  inst.nullable = () => nullable(inst);
  inst.nullish = () => optional(nullable(inst));
  inst.nonoptional = (params) => nonoptional(inst, params);
  inst.array = () => array(inst);
  inst.or = (arg) => union([inst, arg]);
  inst.and = (arg) => intersection(inst, arg);
  inst.transform = (tx) => pipe(inst, transform(tx));
  inst.default = (def2) => _default2(inst, def2);
  inst.prefault = (def2) => prefault(inst, def2);
  inst.catch = (params) => _catch2(inst, params);
  inst.pipe = (target) => pipe(inst, target);
  inst.readonly = () => readonly(inst);
  inst.describe = (description) => {
    const cl = inst.clone();
    globalRegistry.add(cl, { description });
    return cl;
  };
  Object.defineProperty(inst, "description", {
    get() {
      return globalRegistry.get(inst)?.description;
    },
    configurable: true
  });
  inst.meta = (...args) => {
    if (args.length === 0) {
      return globalRegistry.get(inst);
    }
    const cl = inst.clone();
    globalRegistry.add(cl, args[0]);
    return cl;
  };
  inst.isOptional = () => inst.safeParse(undefined).success;
  inst.isNullable = () => inst.safeParse(null).success;
  inst.apply = (fn) => fn(inst);
  return inst;
});
var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
  const bag = inst._zod.bag;
  inst.format = bag.format ?? null;
  inst.minLength = bag.minimum ?? null;
  inst.maxLength = bag.maximum ?? null;
  inst.regex = (...args) => inst.check(_regex(...args));
  inst.includes = (...args) => inst.check(_includes(...args));
  inst.startsWith = (...args) => inst.check(_startsWith(...args));
  inst.endsWith = (...args) => inst.check(_endsWith(...args));
  inst.min = (...args) => inst.check(_minLength(...args));
  inst.max = (...args) => inst.check(_maxLength(...args));
  inst.length = (...args) => inst.check(_length(...args));
  inst.nonempty = (...args) => inst.check(_minLength(1, ...args));
  inst.lowercase = (params) => inst.check(_lowercase(params));
  inst.uppercase = (params) => inst.check(_uppercase(params));
  inst.trim = () => inst.check(_trim());
  inst.normalize = (...args) => inst.check(_normalize(...args));
  inst.toLowerCase = () => inst.check(_toLowerCase());
  inst.toUpperCase = () => inst.check(_toUpperCase());
  inst.slugify = () => inst.check(_slugify());
});
var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  _ZodString.init(inst, def);
  inst.email = (params) => inst.check(_email(ZodEmail, params));
  inst.url = (params) => inst.check(_url(ZodURL, params));
  inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
  inst.emoji = (params) => inst.check(_emoji2(ZodEmoji, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
  inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
  inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
  inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
  inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
  inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
  inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
  inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
  inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
  inst.xid = (params) => inst.check(_xid(ZodXID, params));
  inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
  inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
  inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
  inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
  inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
  inst.e164 = (params) => inst.check(_e164(ZodE164, params));
  inst.datetime = (params) => inst.check(datetime2(params));
  inst.date = (params) => inst.check(date2(params));
  inst.time = (params) => inst.check(time2(params));
  inst.duration = (params) => inst.check(duration2(params));
});
function string2(params) {
  return _string(ZodString, params);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  _ZodString.init(inst, def);
});
var ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
  $ZodEmail.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function email2(params) {
  return _email(ZodEmail, params);
}
var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
  $ZodGUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function guid2(params) {
  return _guid(ZodGUID, params);
}
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function uuid2(params) {
  return _uuid(ZodUUID, params);
}
function uuidv4(params) {
  return _uuidv4(ZodUUID, params);
}
function uuidv6(params) {
  return _uuidv6(ZodUUID, params);
}
function uuidv7(params) {
  return _uuidv7(ZodUUID, params);
}
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function url(params) {
  return _url(ZodURL, params);
}
function httpUrl(params) {
  return _url(ZodURL, {
    protocol: /^https?$/,
    hostname: exports_regexes.domain,
    ...exports_util.normalizeParams(params)
  });
}
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function emoji2(params) {
  return _emoji2(ZodEmoji, params);
}
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function nanoid2(params) {
  return _nanoid(ZodNanoID, params);
}
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid3(params) {
  return _cuid(ZodCUID, params);
}
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid22(params) {
  return _cuid2(ZodCUID2, params);
}
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ulid2(params) {
  return _ulid(ZodULID, params);
}
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function xid2(params) {
  return _xid(ZodXID, params);
}
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ksuid2(params) {
  return _ksuid(ZodKSUID, params);
}
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv42(params) {
  return _ipv4(ZodIPv4, params);
}
var ZodMAC = /* @__PURE__ */ $constructor("ZodMAC", (inst, def) => {
  $ZodMAC.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function mac2(params) {
  return _mac(ZodMAC, params);
}
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv62(params) {
  return _ipv6(ZodIPv6, params);
}
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv42(params) {
  return _cidrv4(ZodCIDRv4, params);
}
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv62(params) {
  return _cidrv6(ZodCIDRv6, params);
}
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base642(params) {
  return _base64(ZodBase64, params);
}
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base64url2(params) {
  return _base64url(ZodBase64URL, params);
}
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function e1642(params) {
  return _e164(ZodE164, params);
}
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function jwt(params) {
  return _jwt(ZodJWT, params);
}
var ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def) => {
  $ZodCustomStringFormat.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
  return _stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hostname", exports_regexes.hostname, _params);
}
function hex2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hex", exports_regexes.hex, _params);
}
function hash(alg, params) {
  const enc = params?.enc ?? "hex";
  const format = `${alg}_${enc}`;
  const regex = exports_regexes[format];
  if (!regex)
    throw new Error(`Unrecognized hash format: ${format}`);
  return _stringFormat(ZodCustomStringFormat, format, regex, params);
}
var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.int = (params) => inst.check(int(params));
  inst.safe = (params) => inst.check(int(params));
  inst.positive = (params) => inst.check(_gt(0, params));
  inst.nonnegative = (params) => inst.check(_gte(0, params));
  inst.negative = (params) => inst.check(_lt(0, params));
  inst.nonpositive = (params) => inst.check(_lte(0, params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  inst.step = (value, params) => inst.check(_multipleOf(value, params));
  inst.finite = () => inst;
  const bag = inst._zod.bag;
  inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
  inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
  inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
  inst.isFinite = true;
  inst.format = bag.format ?? null;
});
function number2(params) {
  return _number(ZodNumber, params);
}
var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodNumber.init(inst, def);
});
function int(params) {
  return _int(ZodNumberFormat, params);
}
function float32(params) {
  return _float32(ZodNumberFormat, params);
}
function float64(params) {
  return _float64(ZodNumberFormat, params);
}
function int32(params) {
  return _int32(ZodNumberFormat, params);
}
function uint32(params) {
  return _uint32(ZodNumberFormat, params);
}
var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
});
function boolean2(params) {
  return _boolean(ZodBoolean, params);
}
var ZodBigInt = /* @__PURE__ */ $constructor("ZodBigInt", (inst, def) => {
  $ZodBigInt.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => bigintProcessor(inst, ctx, json, params);
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.positive = (params) => inst.check(_gt(BigInt(0), params));
  inst.negative = (params) => inst.check(_lt(BigInt(0), params));
  inst.nonpositive = (params) => inst.check(_lte(BigInt(0), params));
  inst.nonnegative = (params) => inst.check(_gte(BigInt(0), params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  const bag = inst._zod.bag;
  inst.minValue = bag.minimum ?? null;
  inst.maxValue = bag.maximum ?? null;
  inst.format = bag.format ?? null;
});
function bigint2(params) {
  return _bigint(ZodBigInt, params);
}
var ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def) => {
  $ZodBigIntFormat.init(inst, def);
  ZodBigInt.init(inst, def);
});
function int64(params) {
  return _int64(ZodBigIntFormat, params);
}
function uint64(params) {
  return _uint64(ZodBigIntFormat, params);
}
var ZodSymbol = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def) => {
  $ZodSymbol.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => symbolProcessor(inst, ctx, json, params);
});
function symbol(params) {
  return _symbol(ZodSymbol, params);
}
var ZodUndefined = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def) => {
  $ZodUndefined.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => undefinedProcessor(inst, ctx, json, params);
});
function _undefined3(params) {
  return _undefined2(ZodUndefined, params);
}
var ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
  $ZodNull.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nullProcessor(inst, ctx, json, params);
});
function _null3(params) {
  return _null2(ZodNull, params);
}
var ZodAny = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
  $ZodAny.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => anyProcessor(inst, ctx, json, params);
});
function any() {
  return _any(ZodAny);
}
var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => unknownProcessor(inst, ctx, json, params);
});
function unknown() {
  return _unknown(ZodUnknown);
}
var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
  $ZodNever.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
  return _never(ZodNever, params);
}
var ZodVoid = /* @__PURE__ */ $constructor("ZodVoid", (inst, def) => {
  $ZodVoid.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => voidProcessor(inst, ctx, json, params);
});
function _void2(params) {
  return _void(ZodVoid, params);
}
var ZodDate = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
  $ZodDate.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => dateProcessor(inst, ctx, json, params);
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  const c = inst._zod.bag;
  inst.minDate = c.minimum ? new Date(c.minimum) : null;
  inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});
function date3(params) {
  return _date(ZodDate, params);
}
var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
  $ZodArray.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
  inst.element = def.element;
  inst.min = (minLength, params) => inst.check(_minLength(minLength, params));
  inst.nonempty = (params) => inst.check(_minLength(1, params));
  inst.max = (maxLength, params) => inst.check(_maxLength(maxLength, params));
  inst.length = (len, params) => inst.check(_length(len, params));
  inst.unwrap = () => inst.element;
});
function array(element, params) {
  return _array(ZodArray, element, params);
}
function keyof(schema) {
  const shape = schema._zod.def.shape;
  return _enum2(Object.keys(shape));
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
  $ZodObjectJIT.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
  exports_util.defineLazy(inst, "shape", () => {
    return def.shape;
  });
  inst.keyof = () => _enum2(Object.keys(inst._zod.def.shape));
  inst.catchall = (catchall) => inst.clone({ ...inst._zod.def, catchall });
  inst.passthrough = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.loose = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.strict = () => inst.clone({ ...inst._zod.def, catchall: never() });
  inst.strip = () => inst.clone({ ...inst._zod.def, catchall: undefined });
  inst.extend = (incoming) => {
    return exports_util.extend(inst, incoming);
  };
  inst.safeExtend = (incoming) => {
    return exports_util.safeExtend(inst, incoming);
  };
  inst.merge = (other) => exports_util.merge(inst, other);
  inst.pick = (mask) => exports_util.pick(inst, mask);
  inst.omit = (mask) => exports_util.omit(inst, mask);
  inst.partial = (...args) => exports_util.partial(ZodOptional, inst, args[0]);
  inst.required = (...args) => exports_util.required(ZodNonOptional, inst, args[0]);
});
function object(shape, params) {
  const def = {
    type: "object",
    shape: shape ?? {},
    ...exports_util.normalizeParams(params)
  };
  return new ZodObject(def);
}
function strictObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: never(),
    ...exports_util.normalizeParams(params)
  });
}
function looseObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: unknown(),
    ...exports_util.normalizeParams(params)
  });
}
var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
  inst.options = def.options;
});
function union(options, params) {
  return new ZodUnion({
    type: "union",
    options,
    ...exports_util.normalizeParams(params)
  });
}
var ZodXor = /* @__PURE__ */ $constructor("ZodXor", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodXor.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
  inst.options = def.options;
});
function xor(options, params) {
  return new ZodXor({
    type: "union",
    options,
    inclusive: false,
    ...exports_util.normalizeParams(params)
  });
}
var ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
  return new ZodDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...exports_util.normalizeParams(params)
  });
}
var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
  $ZodIntersection.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
  return new ZodIntersection({
    type: "intersection",
    left,
    right
  });
}
var ZodTuple = /* @__PURE__ */ $constructor("ZodTuple", (inst, def) => {
  $ZodTuple.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => tupleProcessor(inst, ctx, json, params);
  inst.rest = (rest) => inst.clone({
    ...inst._zod.def,
    rest
  });
});
function tuple(items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new ZodTuple({
    type: "tuple",
    items,
    rest,
    ...exports_util.normalizeParams(params)
  });
}
var ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
  $ZodRecord.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    ...exports_util.normalizeParams(params)
  });
}
function partialRecord(keyType, valueType, params) {
  const k = clone(keyType);
  k._zod.values = undefined;
  return new ZodRecord({
    type: "record",
    keyType: k,
    valueType,
    ...exports_util.normalizeParams(params)
  });
}
function looseRecord(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    mode: "loose",
    ...exports_util.normalizeParams(params)
  });
}
var ZodMap = /* @__PURE__ */ $constructor("ZodMap", (inst, def) => {
  $ZodMap.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => mapProcessor(inst, ctx, json, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
  inst.min = (...args) => inst.check(_minSize(...args));
  inst.nonempty = (params) => inst.check(_minSize(1, params));
  inst.max = (...args) => inst.check(_maxSize(...args));
  inst.size = (...args) => inst.check(_size(...args));
});
function map(keyType, valueType, params) {
  return new ZodMap({
    type: "map",
    keyType,
    valueType,
    ...exports_util.normalizeParams(params)
  });
}
var ZodSet = /* @__PURE__ */ $constructor("ZodSet", (inst, def) => {
  $ZodSet.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => setProcessor(inst, ctx, json, params);
  inst.min = (...args) => inst.check(_minSize(...args));
  inst.nonempty = (params) => inst.check(_minSize(1, params));
  inst.max = (...args) => inst.check(_maxSize(...args));
  inst.size = (...args) => inst.check(_size(...args));
});
function set(valueType, params) {
  return new ZodSet({
    type: "set",
    valueType,
    ...exports_util.normalizeParams(params)
  });
}
var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
  inst.enum = def.entries;
  inst.options = Object.values(def.entries);
  const keys = new Set(Object.keys(def.entries));
  inst.extract = (values, params) => {
    const newEntries = {};
    for (const value of values) {
      if (keys.has(value)) {
        newEntries[value] = def.entries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...exports_util.normalizeParams(params),
      entries: newEntries
    });
  };
  inst.exclude = (values, params) => {
    const newEntries = { ...def.entries };
    for (const value of values) {
      if (keys.has(value)) {
        delete newEntries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...exports_util.normalizeParams(params),
      entries: newEntries
    });
  };
});
function _enum2(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodEnum({
    type: "enum",
    entries,
    ...exports_util.normalizeParams(params)
  });
}
function nativeEnum(entries, params) {
  return new ZodEnum({
    type: "enum",
    entries,
    ...exports_util.normalizeParams(params)
  });
}
var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
  inst.values = new Set(def.values);
  Object.defineProperty(inst, "value", {
    get() {
      if (def.values.length > 1) {
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      }
      return def.values[0];
    }
  });
});
function literal(value, params) {
  return new ZodLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...exports_util.normalizeParams(params)
  });
}
var ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def) => {
  $ZodFile.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => fileProcessor(inst, ctx, json, params);
  inst.min = (size, params) => inst.check(_minSize(size, params));
  inst.max = (size, params) => inst.check(_maxSize(size, params));
  inst.mime = (types, params) => inst.check(_mime(Array.isArray(types) ? types : [types], params));
});
function file(params) {
  return _file(ZodFile, params);
}
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
  $ZodTransform.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
  inst._zod.parse = (payload, _ctx) => {
    if (_ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(exports_util.issue(issue2, payload.value, def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = inst);
        payload.issues.push(exports_util.issue(_issue));
      }
    };
    const output = def.transform(payload.value, payload);
    if (output instanceof Promise) {
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    payload.value = output;
    return payload;
  };
});
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn
  });
}
var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
  return new ZodOptional({
    type: "optional",
    innerType
  });
}
var ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
  $ZodExactOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
  return new ZodExactOptional({
    type: "optional",
    innerType
  });
}
var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
  $ZodNullable.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
  return new ZodNullable({
    type: "nullable",
    innerType
  });
}
function nullish2(innerType) {
  return optional(nullable(innerType));
}
var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeDefault = inst.unwrap;
});
function _default2(innerType, defaultValue) {
  return new ZodDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : exports_util.shallowClone(defaultValue);
    }
  });
}
var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
  $ZodPrefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : exports_util.shallowClone(defaultValue);
    }
  });
}
var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
  $ZodNonOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...exports_util.normalizeParams(params)
  });
}
var ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def) => {
  $ZodSuccess.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => successProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
  return new ZodSuccess({
    type: "success",
    innerType
  });
}
var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeCatch = inst.unwrap;
});
function _catch2(innerType, catchValue) {
  return new ZodCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
var ZodNaN = /* @__PURE__ */ $constructor("ZodNaN", (inst, def) => {
  $ZodNaN.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nanProcessor(inst, ctx, json, params);
});
function nan(params) {
  return _nan(ZodNaN, params);
}
var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
  inst.in = def.in;
  inst.out = def.out;
});
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out
  });
}
var ZodCodec = /* @__PURE__ */ $constructor("ZodCodec", (inst, def) => {
  ZodPipe.init(inst, def);
  $ZodCodec.init(inst, def);
});
function codec(in_, out, params) {
  return new ZodCodec({
    type: "pipe",
    in: in_,
    out,
    transform: params.decode,
    reverseTransform: params.encode
  });
}
var ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
  $ZodReadonly.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
  return new ZodReadonly({
    type: "readonly",
    innerType
  });
}
var ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def) => {
  $ZodTemplateLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => templateLiteralProcessor(inst, ctx, json, params);
});
function templateLiteral(parts, params) {
  return new ZodTemplateLiteral({
    type: "template_literal",
    parts,
    ...exports_util.normalizeParams(params)
  });
}
var ZodLazy = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
  $ZodLazy.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => lazyProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
  return new ZodLazy({
    type: "lazy",
    getter
  });
}
var ZodPromise = /* @__PURE__ */ $constructor("ZodPromise", (inst, def) => {
  $ZodPromise.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => promiseProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
  return new ZodPromise({
    type: "promise",
    innerType
  });
}
var ZodFunction = /* @__PURE__ */ $constructor("ZodFunction", (inst, def) => {
  $ZodFunction.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => functionProcessor(inst, ctx, json, params);
});
function _function(params) {
  return new ZodFunction({
    type: "function",
    input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array(unknown()),
    output: params?.output ?? unknown()
  });
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function check(fn) {
  const ch = new $ZodCheck({
    check: "custom"
  });
  ch._zod.check = fn;
  return ch;
}
function custom(fn, _params) {
  return _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn) {
  return _superRefine(fn);
}
var describe2 = describe;
var meta2 = meta;
function _instanceof(cls, params = {}) {
  const inst = new ZodCustom({
    type: "custom",
    check: "custom",
    fn: (data) => data instanceof cls,
    abort: true,
    ...exports_util.normalizeParams(params)
  });
  inst._zod.bag.Class = cls;
  inst._zod.check = (payload) => {
    if (!(payload.value instanceof cls)) {
      payload.issues.push({
        code: "invalid_type",
        expected: cls.name,
        input: payload.value,
        inst,
        path: [...inst._zod.def.path ?? []]
      });
    }
  };
  return inst;
}
var stringbool = (...args) => _stringbool({
  Codec: ZodCodec,
  Boolean: ZodBoolean,
  String: ZodString
}, ...args);
function json(params) {
  const jsonSchema = lazy(() => {
    return union([string2(params), number2(), boolean2(), _null3(), array(jsonSchema), record(string2(), jsonSchema)]);
  });
  return jsonSchema;
}
function preprocess(fn, schema) {
  return pipe(transform(fn), schema);
}
// node_modules/zod/v4/classic/compat.js
var ZodIssueCode = {
  invalid_type: "invalid_type",
  too_big: "too_big",
  too_small: "too_small",
  invalid_format: "invalid_format",
  not_multiple_of: "not_multiple_of",
  unrecognized_keys: "unrecognized_keys",
  invalid_union: "invalid_union",
  invalid_key: "invalid_key",
  invalid_element: "invalid_element",
  invalid_value: "invalid_value",
  custom: "custom"
};
function setErrorMap(map2) {
  config({
    customError: map2
  });
}
function getErrorMap() {
  return config().customError;
}
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
// node_modules/zod/v4/classic/from-json-schema.js
var z = {
  ...exports_schemas2,
  ...exports_checks2,
  iso: exports_iso
};
var RECOGNIZED_KEYS = new Set([
  "$schema",
  "$ref",
  "$defs",
  "definitions",
  "$id",
  "id",
  "$comment",
  "$anchor",
  "$vocabulary",
  "$dynamicRef",
  "$dynamicAnchor",
  "type",
  "enum",
  "const",
  "anyOf",
  "oneOf",
  "allOf",
  "not",
  "properties",
  "required",
  "additionalProperties",
  "patternProperties",
  "propertyNames",
  "minProperties",
  "maxProperties",
  "items",
  "prefixItems",
  "additionalItems",
  "minItems",
  "maxItems",
  "uniqueItems",
  "contains",
  "minContains",
  "maxContains",
  "minLength",
  "maxLength",
  "pattern",
  "format",
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "multipleOf",
  "description",
  "default",
  "contentEncoding",
  "contentMediaType",
  "contentSchema",
  "unevaluatedItems",
  "unevaluatedProperties",
  "if",
  "then",
  "else",
  "dependentSchemas",
  "dependentRequired",
  "nullable",
  "readOnly"
]);
function detectVersion(schema, defaultTarget) {
  const $schema = schema.$schema;
  if ($schema === "https://json-schema.org/draft/2020-12/schema") {
    return "draft-2020-12";
  }
  if ($schema === "http://json-schema.org/draft-07/schema#") {
    return "draft-7";
  }
  if ($schema === "http://json-schema.org/draft-04/schema#") {
    return "draft-4";
  }
  return defaultTarget ?? "draft-2020-12";
}
function resolveRef(ref, ctx) {
  if (!ref.startsWith("#")) {
    throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
  }
  const path = ref.slice(1).split("/").filter(Boolean);
  if (path.length === 0) {
    return ctx.rootSchema;
  }
  const defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
  if (path[0] === defsKey) {
    const key = path[1];
    if (!key || !ctx.defs[key]) {
      throw new Error(`Reference not found: ${ref}`);
    }
    return ctx.defs[key];
  }
  throw new Error(`Reference not found: ${ref}`);
}
function convertBaseSchema(schema, ctx) {
  if (schema.not !== undefined) {
    if (typeof schema.not === "object" && Object.keys(schema.not).length === 0) {
      return z.never();
    }
    throw new Error("not is not supported in Zod (except { not: {} } for never)");
  }
  if (schema.unevaluatedItems !== undefined) {
    throw new Error("unevaluatedItems is not supported");
  }
  if (schema.unevaluatedProperties !== undefined) {
    throw new Error("unevaluatedProperties is not supported");
  }
  if (schema.if !== undefined || schema.then !== undefined || schema.else !== undefined) {
    throw new Error("Conditional schemas (if/then/else) are not supported");
  }
  if (schema.dependentSchemas !== undefined || schema.dependentRequired !== undefined) {
    throw new Error("dependentSchemas and dependentRequired are not supported");
  }
  if (schema.$ref) {
    const refPath = schema.$ref;
    if (ctx.refs.has(refPath)) {
      return ctx.refs.get(refPath);
    }
    if (ctx.processing.has(refPath)) {
      return z.lazy(() => {
        if (!ctx.refs.has(refPath)) {
          throw new Error(`Circular reference not resolved: ${refPath}`);
        }
        return ctx.refs.get(refPath);
      });
    }
    ctx.processing.add(refPath);
    const resolved = resolveRef(refPath, ctx);
    const zodSchema2 = convertSchema(resolved, ctx);
    ctx.refs.set(refPath, zodSchema2);
    ctx.processing.delete(refPath);
    return zodSchema2;
  }
  if (schema.enum !== undefined) {
    const enumValues = schema.enum;
    if (ctx.version === "openapi-3.0" && schema.nullable === true && enumValues.length === 1 && enumValues[0] === null) {
      return z.null();
    }
    if (enumValues.length === 0) {
      return z.never();
    }
    if (enumValues.length === 1) {
      return z.literal(enumValues[0]);
    }
    if (enumValues.every((v) => typeof v === "string")) {
      return z.enum(enumValues);
    }
    const literalSchemas = enumValues.map((v) => z.literal(v));
    if (literalSchemas.length < 2) {
      return literalSchemas[0];
    }
    return z.union([literalSchemas[0], literalSchemas[1], ...literalSchemas.slice(2)]);
  }
  if (schema.const !== undefined) {
    return z.literal(schema.const);
  }
  const type = schema.type;
  if (Array.isArray(type)) {
    const typeSchemas = type.map((t) => {
      const typeSchema = { ...schema, type: t };
      return convertBaseSchema(typeSchema, ctx);
    });
    if (typeSchemas.length === 0) {
      return z.never();
    }
    if (typeSchemas.length === 1) {
      return typeSchemas[0];
    }
    return z.union(typeSchemas);
  }
  if (!type) {
    return z.any();
  }
  let zodSchema;
  switch (type) {
    case "string": {
      let stringSchema = z.string();
      if (schema.format) {
        const format = schema.format;
        if (format === "email") {
          stringSchema = stringSchema.check(z.email());
        } else if (format === "uri" || format === "uri-reference") {
          stringSchema = stringSchema.check(z.url());
        } else if (format === "uuid" || format === "guid") {
          stringSchema = stringSchema.check(z.uuid());
        } else if (format === "date-time") {
          stringSchema = stringSchema.check(z.iso.datetime());
        } else if (format === "date") {
          stringSchema = stringSchema.check(z.iso.date());
        } else if (format === "time") {
          stringSchema = stringSchema.check(z.iso.time());
        } else if (format === "duration") {
          stringSchema = stringSchema.check(z.iso.duration());
        } else if (format === "ipv4") {
          stringSchema = stringSchema.check(z.ipv4());
        } else if (format === "ipv6") {
          stringSchema = stringSchema.check(z.ipv6());
        } else if (format === "mac") {
          stringSchema = stringSchema.check(z.mac());
        } else if (format === "cidr") {
          stringSchema = stringSchema.check(z.cidrv4());
        } else if (format === "cidr-v6") {
          stringSchema = stringSchema.check(z.cidrv6());
        } else if (format === "base64") {
          stringSchema = stringSchema.check(z.base64());
        } else if (format === "base64url") {
          stringSchema = stringSchema.check(z.base64url());
        } else if (format === "e164") {
          stringSchema = stringSchema.check(z.e164());
        } else if (format === "jwt") {
          stringSchema = stringSchema.check(z.jwt());
        } else if (format === "emoji") {
          stringSchema = stringSchema.check(z.emoji());
        } else if (format === "nanoid") {
          stringSchema = stringSchema.check(z.nanoid());
        } else if (format === "cuid") {
          stringSchema = stringSchema.check(z.cuid());
        } else if (format === "cuid2") {
          stringSchema = stringSchema.check(z.cuid2());
        } else if (format === "ulid") {
          stringSchema = stringSchema.check(z.ulid());
        } else if (format === "xid") {
          stringSchema = stringSchema.check(z.xid());
        } else if (format === "ksuid") {
          stringSchema = stringSchema.check(z.ksuid());
        }
      }
      if (typeof schema.minLength === "number") {
        stringSchema = stringSchema.min(schema.minLength);
      }
      if (typeof schema.maxLength === "number") {
        stringSchema = stringSchema.max(schema.maxLength);
      }
      if (schema.pattern) {
        stringSchema = stringSchema.regex(new RegExp(schema.pattern));
      }
      zodSchema = stringSchema;
      break;
    }
    case "number":
    case "integer": {
      let numberSchema = type === "integer" ? z.number().int() : z.number();
      if (typeof schema.minimum === "number") {
        numberSchema = numberSchema.min(schema.minimum);
      }
      if (typeof schema.maximum === "number") {
        numberSchema = numberSchema.max(schema.maximum);
      }
      if (typeof schema.exclusiveMinimum === "number") {
        numberSchema = numberSchema.gt(schema.exclusiveMinimum);
      } else if (schema.exclusiveMinimum === true && typeof schema.minimum === "number") {
        numberSchema = numberSchema.gt(schema.minimum);
      }
      if (typeof schema.exclusiveMaximum === "number") {
        numberSchema = numberSchema.lt(schema.exclusiveMaximum);
      } else if (schema.exclusiveMaximum === true && typeof schema.maximum === "number") {
        numberSchema = numberSchema.lt(schema.maximum);
      }
      if (typeof schema.multipleOf === "number") {
        numberSchema = numberSchema.multipleOf(schema.multipleOf);
      }
      zodSchema = numberSchema;
      break;
    }
    case "boolean": {
      zodSchema = z.boolean();
      break;
    }
    case "null": {
      zodSchema = z.null();
      break;
    }
    case "object": {
      const shape = {};
      const properties = schema.properties || {};
      const requiredSet = new Set(schema.required || []);
      for (const [key, propSchema] of Object.entries(properties)) {
        const propZodSchema = convertSchema(propSchema, ctx);
        shape[key] = requiredSet.has(key) ? propZodSchema : propZodSchema.optional();
      }
      if (schema.propertyNames) {
        const keySchema = convertSchema(schema.propertyNames, ctx);
        const valueSchema = schema.additionalProperties && typeof schema.additionalProperties === "object" ? convertSchema(schema.additionalProperties, ctx) : z.any();
        if (Object.keys(shape).length === 0) {
          zodSchema = z.record(keySchema, valueSchema);
          break;
        }
        const objectSchema2 = z.object(shape).passthrough();
        const recordSchema = z.looseRecord(keySchema, valueSchema);
        zodSchema = z.intersection(objectSchema2, recordSchema);
        break;
      }
      if (schema.patternProperties) {
        const patternProps = schema.patternProperties;
        const patternKeys = Object.keys(patternProps);
        const looseRecords = [];
        for (const pattern of patternKeys) {
          const patternValue = convertSchema(patternProps[pattern], ctx);
          const keySchema = z.string().regex(new RegExp(pattern));
          looseRecords.push(z.looseRecord(keySchema, patternValue));
        }
        const schemasToIntersect = [];
        if (Object.keys(shape).length > 0) {
          schemasToIntersect.push(z.object(shape).passthrough());
        }
        schemasToIntersect.push(...looseRecords);
        if (schemasToIntersect.length === 0) {
          zodSchema = z.object({}).passthrough();
        } else if (schemasToIntersect.length === 1) {
          zodSchema = schemasToIntersect[0];
        } else {
          let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
          for (let i = 2;i < schemasToIntersect.length; i++) {
            result = z.intersection(result, schemasToIntersect[i]);
          }
          zodSchema = result;
        }
        break;
      }
      const objectSchema = z.object(shape);
      if (schema.additionalProperties === false) {
        zodSchema = objectSchema.strict();
      } else if (typeof schema.additionalProperties === "object") {
        zodSchema = objectSchema.catchall(convertSchema(schema.additionalProperties, ctx));
      } else {
        zodSchema = objectSchema.passthrough();
      }
      break;
    }
    case "array": {
      const prefixItems = schema.prefixItems;
      const items = schema.items;
      if (prefixItems && Array.isArray(prefixItems)) {
        const tupleItems = prefixItems.map((item) => convertSchema(item, ctx));
        const rest = items && typeof items === "object" && !Array.isArray(items) ? convertSchema(items, ctx) : undefined;
        if (rest) {
          zodSchema = z.tuple(tupleItems).rest(rest);
        } else {
          zodSchema = z.tuple(tupleItems);
        }
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (Array.isArray(items)) {
        const tupleItems = items.map((item) => convertSchema(item, ctx));
        const rest = schema.additionalItems && typeof schema.additionalItems === "object" ? convertSchema(schema.additionalItems, ctx) : undefined;
        if (rest) {
          zodSchema = z.tuple(tupleItems).rest(rest);
        } else {
          zodSchema = z.tuple(tupleItems);
        }
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (items !== undefined) {
        const element = convertSchema(items, ctx);
        let arraySchema = z.array(element);
        if (typeof schema.minItems === "number") {
          arraySchema = arraySchema.min(schema.minItems);
        }
        if (typeof schema.maxItems === "number") {
          arraySchema = arraySchema.max(schema.maxItems);
        }
        zodSchema = arraySchema;
      } else {
        zodSchema = z.array(z.any());
      }
      break;
    }
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
  if (schema.description) {
    zodSchema = zodSchema.describe(schema.description);
  }
  if (schema.default !== undefined) {
    zodSchema = zodSchema.default(schema.default);
  }
  return zodSchema;
}
function convertSchema(schema, ctx) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  let baseSchema = convertBaseSchema(schema, ctx);
  const hasExplicitType = schema.type || schema.enum !== undefined || schema.const !== undefined;
  if (schema.anyOf && Array.isArray(schema.anyOf)) {
    const options = schema.anyOf.map((s) => convertSchema(s, ctx));
    const anyOfUnion = z.union(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
  }
  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    const options = schema.oneOf.map((s) => convertSchema(s, ctx));
    const oneOfUnion = z.xor(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
  }
  if (schema.allOf && Array.isArray(schema.allOf)) {
    if (schema.allOf.length === 0) {
      baseSchema = hasExplicitType ? baseSchema : z.any();
    } else {
      let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx);
      const startIdx = hasExplicitType ? 0 : 1;
      for (let i = startIdx;i < schema.allOf.length; i++) {
        result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
      }
      baseSchema = result;
    }
  }
  if (schema.nullable === true && ctx.version === "openapi-3.0") {
    baseSchema = z.nullable(baseSchema);
  }
  if (schema.readOnly === true) {
    baseSchema = z.readonly(baseSchema);
  }
  const extraMeta = {};
  const coreMetadataKeys = ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"];
  for (const key of coreMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  const contentMetadataKeys = ["contentEncoding", "contentMediaType", "contentSchema"];
  for (const key of contentMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  for (const key of Object.keys(schema)) {
    if (!RECOGNIZED_KEYS.has(key)) {
      extraMeta[key] = schema[key];
    }
  }
  if (Object.keys(extraMeta).length > 0) {
    ctx.registry.add(baseSchema, extraMeta);
  }
  return baseSchema;
}
function fromJSONSchema(schema, params) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  const version2 = detectVersion(schema, params?.defaultTarget);
  const defs = schema.$defs || schema.definitions || {};
  const ctx = {
    version: version2,
    defs,
    refs: new Map,
    processing: new Set,
    rootSchema: schema,
    registry: params?.registry ?? globalRegistry
  };
  return convertSchema(schema, ctx);
}
// node_modules/zod/v4/classic/coerce.js
var exports_coerce = {};
__export(exports_coerce, {
  string: () => string3,
  number: () => number3,
  date: () => date4,
  boolean: () => boolean3,
  bigint: () => bigint3
});
function string3(params) {
  return _coercedString(ZodString, params);
}
function number3(params) {
  return _coercedNumber(ZodNumber, params);
}
function boolean3(params) {
  return _coercedBoolean(ZodBoolean, params);
}
function bigint3(params) {
  return _coercedBigint(ZodBigInt, params);
}
function date4(params) {
  return _coercedDate(ZodDate, params);
}

// node_modules/zod/v4/classic/external.js
config(en_default());
// src/scan-columns.ts
var BUN_SCANNER_COLUMNS = {
  PROJECT_SCAN: [
    { key: "idx", header: "#", width: 4, default: 0 },
    { key: "status", header: "Status", width: 8, default: "-" },
    { key: "folder", header: "Project", width: 28, default: "unknown" },
    { key: "name", header: "Package Name", width: 34, default: "unknown" },
    { key: "version", header: "Version", width: 12, default: "0.0.0" },
    { key: "configVersion", header: "Ver", width: 4, default: 0 },
    { key: "bunVersion", header: "Bun", width: 10, default: ">=1.3.8" },
    { key: "lockfile", header: "Lock", width: 10, default: "bun.lock" },
    { key: "registry", header: "Registry", width: 24, default: "npm" },
    { key: "token", header: "Token", width: 10, default: "-" },
    { key: "workspaces", header: "Workspaces", width: 20, default: "-" },
    { key: "hasTests", header: "Tests", width: 6, default: "-" },
    { key: "workspace", header: "WS", width: 4, default: "no" },
    { key: "linker", header: "Linker", width: 20, default: "hoisted" },
    { key: "trustedDeps", header: "Trusted", width: 10, default: "-" },
    { key: "nativeDeps", header: "Native", width: 10, default: "-" },
    { key: "scripts", header: "Scripts", width: 20, default: "-" },
    { key: "envVars", header: "Env Vars", width: 20, default: "-" }
  ],
  DELTA_FOOTER: [
    { key: "snapshotDate", header: "Snapshot", width: 12, default: "" },
    { key: "projectsDelta", header: "Projects Δ", width: 10, default: "0" },
    { key: "trustedDelta", header: "Trusted Δ", width: 10, default: "0" },
    { key: "nativeDelta", header: "Native Δ", width: 10, default: "0" },
    { key: "linkerChanges", header: "Linker Δ", width: 10, default: "0" },
    { key: "driftStatus", header: "Drift", width: 10, default: "none" }
  ],
  AUDIT_LOG: [
    { key: "timestamp", header: "Timestamp", width: 24, default: () => new Date().toISOString() },
    { key: "scanDuration", header: "Duration(ms)", width: 12, default: 0 },
    { key: "projectsScanned", header: "Projects", width: 8, default: 0 },
    { key: "projectsChanged", header: "Changed", width: 8, default: 0 },
    { key: "snapshotHash", header: "Hash", width: 16, default: "" },
    { key: "driftDetected", header: "Drift", width: 8, default: false },
    { key: "user", header: "User", width: 16, default: () => Bun.env.USER || "unknown" },
    { key: "cwd", header: "CWD", width: 40, default: () => import.meta.dir }
  ],
  ADVISORY_MATCHES: [
    { key: "advisory", header: "Advisory", width: 40, default: "" },
    { key: "date", header: "Date", width: 12, default: "" },
    { key: "link", header: "Link", width: 32, default: "" },
    { key: "packages", header: "Packages", width: 28, default: "" },
    { key: "projects", header: "Projects", width: 28, default: "" }
  ],
  LIFECYCLE_HOOKS: [
    { key: "hook", header: "Hook", width: 16, default: "" },
    { key: "total", header: "Total", width: 6, default: 0 },
    { key: "trust", header: "Trust", width: 6, default: 0 },
    { key: "block", header: "Block", width: 6, default: 0 },
    { key: "secure", header: "Secure", width: 6, default: "" },
    { key: "saved", header: "Saved", width: 8, default: "" },
    { key: "risk", header: "Risk", width: 6, default: "" },
    { key: "status", header: "Status", width: 12, default: "" },
    { key: "native", header: "Native", width: 6, default: "" },
    { key: "covPct", header: "Cov%", width: 6, default: "" },
    { key: "owner", header: "Owner", width: 16, default: "" },
    { key: "action", header: "Action", width: 48, default: "" }
  ],
  BUNFIG_COVERAGE: [
    { key: "setting", header: "Setting", width: 18, default: "" },
    { key: "count", header: "Count", width: 10, default: "" },
    { key: "description", header: "Description", width: 40, default: "" }
  ],
  INFRA_READINESS: [
    { key: "field", header: "Field", width: 16, default: "" },
    { key: "count", header: "Count", width: 8, default: "" },
    { key: "pct", header: "%", width: 6, default: "" },
    { key: "status", header: "Status", width: 10, default: "" },
    { key: "description", header: "Description", width: 40, default: "" }
  ],
  RSS_ENHANCED: [
    { key: "id", header: "ID", width: 4, default: 0 },
    { key: "version", header: "Version", width: 34, default: "" },
    { key: "date", header: "Date", width: 12, default: "" },
    { key: "link", header: "Link", width: 32, default: "" },
    { key: "category", header: "Category", width: 10, default: "release" },
    { key: "rScore", header: "R-Score", width: 8, default: 1 },
    { key: "confidence", header: "C", width: 4, default: 1 },
    { key: "engagement", header: "E", width: 5, default: 0 },
    { key: "subscribers", header: "S", width: 8, default: 0 },
    { key: "vulnerabilities", header: "V", width: 4, default: 0 },
    { key: "status", header: "Status", width: 8, default: "stable" },
    { key: "defaultAction", header: "Default", width: 14, default: "" },
    { key: "command", header: "Command", width: 22, default: "" },
    { key: "carbon", header: "Carbon", width: 8, default: "0µg" },
    { key: "risk", header: "Risk", width: 6, default: "LOW" },
    { key: "optimal", header: "Optimal", width: 8, default: "" },
    { key: "delta", header: "Delta", width: 32, default: "" },
    { key: "guid", header: "GUID", width: 10, default: "" },
    { key: "pubDate", header: "Pub", width: 32, default: "" },
    { key: "type", header: "Type", width: 6, default: "RSS" },
    { key: "feed", header: "Feed", width: 18, default: "" },
    { key: "isArchived", header: "Archived", width: 10, default: false }
  ]
};

// cli/renderers/status-glyphs.ts
var BUN_STATUS_GLYPHS = {
  critical: { glyph: "\uD83D\uDD34", code: "U+1F534", ascii: "!!", hsl: [0, 100, 50] },
  failed: { glyph: "✗", code: "U+2717", ascii: "FAIL", hsl: [0, 80, 45] },
  error: { glyph: "✖", code: "U+2716", ascii: "ERR", hsl: [0, 80, 45] },
  warning: { glyph: "⚠", code: "U+26A0", ascii: "WARN", hsl: [35, 100, 50] },
  success: { glyph: "✓", code: "U+2713", ascii: "OK", hsl: [120, 100, 40] },
  stable: { glyph: "\uD83D\uDFE2", code: "U+1F7E2", ascii: "OK", hsl: [140, 70, 45] },
  pending: { glyph: "○", code: "U+25CB", ascii: "...", hsl: [200, 50, 50] },
  neutral: { glyph: "−", code: "U+2212", ascii: "-", hsl: [0, 0, 50] },
  unknown: { glyph: "?", code: "U+003F", ascii: "?", hsl: [0, 0, 50] },
  skip: { glyph: "⊘", code: "U+2298", ascii: "skip", hsl: [0, 0, 50] },
  info: { glyph: "•", code: "U+2022", ascii: "INFO", hsl: [200, 100, 50] },
  audit: { glyph: "◐", code: "U+25D0", ascii: "audit", hsl: [280, 60, 50] },
  fix: { glyph: "◉", code: "U+25C9", ascii: "fix", hsl: [30, 80, 50] },
  done: { glyph: "✔", code: "U+2714", ascii: "done", hsl: [120, 80, 45] }
};
var DEFAULT_PROJECT = "com.tier1380.scanner";
var BUN_PROJECT_PRESETS = {
  [DEFAULT_PROJECT]: {
    namespace: DEFAULT_PROJECT,
    statusHueOffset: 15,
    saturationMod: 0.9,
    lightnessMod: 1,
    useUnicode: true,
    glyphWidth: 2
  },
  "com.tier1380.mcp": {
    namespace: "com.tier1380.mcp",
    statusHueOffset: 200,
    saturationMod: 0.9,
    lightnessMod: 1,
    useUnicode: true,
    glyphWidth: 2
  },
  "legacy.cli": {
    namespace: "legacy.cli",
    statusHueOffset: 0,
    saturationMod: 0,
    lightnessMod: 1,
    useUnicode: false,
    glyphWidth: 1
  }
};
function getProjectConfig(namespace) {
  if (namespace && BUN_PROJECT_PRESETS[namespace])
    return BUN_PROJECT_PRESETS[namespace];
  return BUN_PROJECT_PRESETS[DEFAULT_PROJECT];
}
function applyHsl(base, cfg) {
  const h = (base[0] + cfg.statusHueOffset) % 360;
  const s = Math.min(100, Math.max(0, base[1] * cfg.saturationMod));
  const l = Math.min(100, Math.max(0, base[2] * cfg.lightnessMod));
  return [h, s, l];
}
function hslToCss([h, s, l]) {
  return `hsl(${h}, ${s}%, ${l}%)`;
}
function formatStatusCell(status, projectId, width) {
  const cfg = getProjectConfig(projectId);
  const entry = BUN_STATUS_GLYPHS[status];
  const glyph = cfg.useUnicode ? entry.glyph : entry.ascii;
  const hsl = applyHsl(entry.hsl, cfg);
  const color = Bun.color(hslToCss(hsl), "ansi");
  let cell = `${color}${glyph}\x1B[0m`;
  if (width !== undefined) {
    const w = Bun.stringWidth(glyph);
    if (w < width)
      cell += " ".repeat(width - w);
  }
  return cell;
}

// scan.ts
function handlePipeError(err) {
  if (err.code === "EPIPE" || err.code === "ERR_STREAM_DESTROYED") {
    process.exit(0);
  }
  throw err;
}
process.stdout.on("error", handlePipeError);
process.stderr.on("error", handlePipeError);
if (typeof Bun === "undefined") {
  console.error("This CLI is Bun-only. Please run with: bun scan.ts");
  process.exit(1);
}
var { values: flags, positionals } = parseArgs({
  allowPositionals: true,
  args: Bun.argv.slice(2),
  options: {
    help: { type: "boolean", short: "h", default: false },
    detail: { type: "boolean", default: false },
    inspect: { type: "string" },
    sort: { type: "string" },
    filter: { type: "string" },
    json: { type: "boolean", default: false },
    "with-bunfig": { type: "boolean", default: false },
    workspaces: { type: "boolean", default: false },
    "without-pkg": { type: "boolean", default: false },
    audit: { type: "boolean", default: false },
    fix: { type: "boolean", default: false },
    "dry-run": { type: "boolean", default: false },
    why: { type: "string" },
    outdated: { type: "boolean", default: false },
    update: { type: "boolean", default: false },
    "fix-engine": { type: "boolean", default: false },
    info: { type: "string" },
    "fix-registry": { type: "string" },
    "pm-view": { type: "string" },
    path: { type: "boolean", default: false },
    "fix-scopes": { type: "string" },
    "fix-npmrc": { type: "string" },
    "fix-trusted": { type: "boolean", default: false },
    "fix-env-docs": { type: "boolean", default: false },
    "fix-dns": { type: "boolean", default: false },
    "no-ipc": { type: "boolean", default: false },
    patch: { type: "boolean", default: false },
    minor: { type: "boolean", default: false },
    verify: { type: "boolean", default: false },
    top: { type: "boolean", default: false },
    depth: { type: "string" },
    production: { type: "boolean", short: "p", default: false },
    omit: { type: "string" },
    global: { type: "boolean", short: "g", default: false },
    catalog: { type: "boolean", short: "r", default: false },
    wf: { type: "string", multiple: true },
    snapshot: { type: "boolean", default: false },
    compare: { type: "boolean", default: false },
    "audit-compare": { type: "string" },
    "no-auto-snapshot": { type: "boolean", default: false },
    tz: { type: "string" },
    "fix-dns-ttl": { type: "boolean", default: false },
    "store-token": { type: "string" },
    "delete-token": { type: "string" },
    "list-tokens": { type: "boolean", default: false },
    "check-tokens": { type: "boolean", default: false },
    rss: { type: "boolean", default: false },
    "advisory-feed": { type: "string" },
    profile: { type: "boolean", default: false },
    "debug-tokens": { type: "boolean", default: false },
    "write-baseline": { type: "boolean", default: false }
  },
  strict: true
});
var _tzExplicit = !!(flags.tz || process.env.TZ);
if (flags.tz) {
  process.env.TZ = flags.tz;
} else if (!process.env.TZ) {
  process.env.TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
}
var _tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
var _useColor = (() => {
  if (Bun.env.FORCE_COLOR)
    return true;
  if (Bun.env.NO_COLOR !== undefined)
    return false;
  return process.stdout.isTTY ?? false;
})();
var _wrap = (code) => _useColor ? (s) => `\x1B[${code}m${s}\x1B[0m` : (s) => s;
var c = {
  bold: _wrap("1"),
  cyan: _wrap("36"),
  green: _wrap("32"),
  yellow: _wrap("33"),
  dim: _wrap("2"),
  magenta: _wrap("35"),
  red: _wrap("31")
};
var _profileEnabled = !!flags.profile || Bun.env.BUN_SCAN_PROFILE === "1" || Bun.env.BUN_SCAN_PROFILE === "true";
var _profileTotals = new Map;
var _profileCounts = new Map;
var _profileProjectTotals = new Map;
var _profileProjectCounts = new Map;
var _profileStartNs = null;
var _profileStartMem = null;
var _profileSummary = null;
var PROFILE_BASELINE_PATH = `${import.meta.dir}/profile-baseline.json`;
var PROFILE_BASELINE_KEY = "profile-baseline.json";
function recordProfile(label, ms) {
  _profileTotals.set(label, (_profileTotals.get(label) ?? 0) + ms);
  _profileCounts.set(label, (_profileCounts.get(label) ?? 0) + 1);
}
function recordProjectProfile(label, ms) {
  _profileProjectTotals.set(label, (_profileProjectTotals.get(label) ?? 0) + ms);
  _profileProjectCounts.set(label, (_profileProjectCounts.get(label) ?? 0) + 1);
}
async function time3(label, fn) {
  if (!_profileEnabled)
    return fn();
  const start = Bun.nanoseconds();
  const result = await fn();
  const ms = (Bun.nanoseconds() - start) / 1e6;
  recordProfile(label, ms);
  return result;
}
function timeSync(label, fn) {
  if (!_profileEnabled)
    return fn();
  const start = Bun.nanoseconds();
  const result = fn();
  const ms = (Bun.nanoseconds() - start) / 1e6;
  recordProfile(label, ms);
  return result;
}
function printProfileSummary() {
  if (!_profileEnabled || _profileTotals.size === 0)
    return;
  console.log();
  console.log(c.bold("  Profiling (ms)"));
  console.log();
  const rows = [..._profileTotals.entries()].map(([label, total]) => {
    const count = _profileCounts.get(label) ?? 1;
    return {
      Label: label,
      Total: total.toFixed(1),
      Count: count,
      Avg: (total / count).toFixed(1)
    };
  }).sort((a, b) => Number(b.Total) - Number(a.Total));
  console.log(Bun.inspect.table(rows, ["Label", "Total", "Count", "Avg"], { colors: _useColor }));
}
function printProjectProfileSummary() {
  if (!_profileEnabled || _profileProjectTotals.size === 0)
    return;
  console.log();
  console.log(c.bold("  Project Profiling (ms)"));
  console.log();
  const rows = [..._profileProjectTotals.entries()].map(([label, total]) => {
    const count = _profileProjectCounts.get(label) ?? 1;
    return {
      Label: label,
      Total: total.toFixed(1),
      Count: count,
      Avg: (total / count).toFixed(1)
    };
  }).sort((a, b) => Number(b.Total) - Number(a.Total));
  console.log(Bun.inspect.table(rows, ["Label", "Total", "Count", "Avg"], { colors: _useColor }));
}
function pctDiff(current, baseline) {
  if (baseline === 0)
    return current === 0 ? 0 : 100;
  return Math.abs((current - baseline) / baseline) * 100;
}
async function readProfileBaseline() {
  try {
    const cfg = getR2Config();
    let raw = null;
    if (cfg) {
      const key = getProfileBaselineKey();
      const res = await r2Fetch("GET", key);
      if (res.status === 404)
        return null;
      if (!res.ok)
        throw new Error(`R2 read failed: ${res.status} ${res.statusText}`);
      raw = await res.text();
    } else {
      const file2 = Bun.file(PROFILE_BASELINE_PATH);
      if (!await file2.exists())
        return null;
      raw = await file2.text();
    }
    const parsed = JSON.parse(raw);
    if (typeof parsed?.projectsScanned === "number" && typeof parsed?.scanMs === "number" && typeof parsed?.memoryDeltaBytes === "number") {
      return parsed;
    }
  } catch {}
  return null;
}
async function writeProfileBaseline() {
  if (!_profileEnabled || !_profileSummary || !flags["write-baseline"])
    return;
  try {
    const payload = JSON.stringify({
      projectsScanned: _profileSummary.projectsScanned,
      scanMs: _profileSummary.scanMs,
      memoryDeltaBytes: _profileSummary.memoryDeltaBytes
    }, null, 2) + `
`;
    const cfg = getR2Config();
    if (cfg) {
      const key = getProfileBaselineKey();
      const res = await r2Fetch("PUT", key, payload, "application/json");
      if (!res.ok)
        throw new Error(`R2 write failed: ${res.status} ${res.statusText}`);
      console.log();
      console.log(c.green(`  Wrote profile baseline to R2: ${key}`));
      return;
    }
    const file2 = Bun.file(PROFILE_BASELINE_PATH);
    await Bun.write(file2, payload);
    console.log();
    console.log(c.green(`  Wrote profile baseline: ${PROFILE_BASELINE_PATH}`));
  } catch (err) {
    console.log();
    console.error(c.red(`  Failed to write profile baseline: ${err instanceof Error ? err.message : String(err)}`));
  }
}
function printProfileSummaryTable() {
  if (!_profileEnabled || !_profileSummary)
    return;
  console.log();
  console.log(c.bold("  Profile Summary"));
  console.log();
  const rows = [
    { Field: "Projects", Value: _profileSummary.projectsScanned },
    { Field: "Elapsed", Value: `${_profileSummary.scanMs.toFixed(1)} ms` },
    {
      Field: "Memory \u0394",
      Value: `${_profileSummary.memoryDeltaBytes >= 0 ? "+" : ""}${(_profileSummary.memoryDeltaBytes / 1024).toFixed(1)} KiB`
    }
  ];
  console.log(Bun.inspect.table(rows, ["Field", "Value"], { colors: _useColor }));
}
async function checkProfileRegression() {
  if (!_profileEnabled || !_profileSummary)
    return;
  const baseline = await readProfileBaseline();
  if (!baseline) {
    console.log();
    console.log(c.dim(`  Profile baseline not found: ${PROFILE_BASELINE_PATH}`));
    return;
  }
  const driftProjects = pctDiff(_profileSummary.projectsScanned, baseline.projectsScanned);
  const driftMs = pctDiff(_profileSummary.scanMs, baseline.scanMs);
  const driftMem = pctDiff(_profileSummary.memoryDeltaBytes, baseline.memoryDeltaBytes);
  const hasRegression = driftProjects > 10 || driftMs > 10 || driftMem > 10;
  console.log();
  console.log(c.bold(`  Profile Regression (${hasRegression ? c.red("REGRESSION") : c.green("OK")})`));
  console.log();
  const rows = [
    { Metric: "projectsScanned", Baseline: baseline.projectsScanned, Current: _profileSummary.projectsScanned, Drift: `${driftProjects.toFixed(1)}%` },
    { Metric: "scanMs", Baseline: baseline.scanMs, Current: _profileSummary.scanMs.toFixed(1), Drift: `${driftMs.toFixed(1)}%` },
    { Metric: "memoryDeltaBytes", Baseline: baseline.memoryDeltaBytes, Current: _profileSummary.memoryDeltaBytes, Drift: `${driftMem.toFixed(1)}%` }
  ];
  console.log(Bun.inspect.table(rows, ["Metric", "Baseline", "Current", "Drift"], { colors: _useColor }));
  if (hasRegression && typeof Bun.openInEditor === "function") {
    Bun.openInEditor(import.meta.path, { line: 1 });
  }
}
if (_profileEnabled) {
  process.on("beforeExit", () => {
    printProfileSummary();
    printProjectProfileSummary();
    printProfileSummaryTable();
    (async () => {
      await writeProfileBaseline();
      await checkProfileRegression();
    })();
  });
}
var pad2 = (n) => String(n).padStart(2, "0");
var fmtDate = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
var fmtStamp = (d = new Date) => `${fmtDate(d)} ${_tz}${_tzExplicit ? ` (TZ=${process.env.TZ})` : ""}`;
function extractBunError(stderr, fallback) {
  for (const line of stderr.trim().split(`
`)) {
    const clean = stripAnsi(line).trim();
    if (!clean)
      continue;
    if (clean.startsWith('".env'))
      continue;
    if (clean.startsWith("bun add"))
      continue;
    if (clean.startsWith("bun update"))
      continue;
    if (clean.startsWith("bun install"))
      continue;
    return clean;
  }
  return fallback;
}
var ThreatFeedItemSchema = exports_external.object({
  package: exports_external.string(),
  version: exports_external.string(),
  url: exports_external.string().nullable(),
  description: exports_external.string().nullable(),
  categories: exports_external.array(exports_external.enum(["backdoor", "botnet", "malware", "protestware", "adware"]))
});
var ThreatFeedSchema = exports_external.array(ThreatFeedItemSchema);
function validateThreatFeed(data) {
  return ThreatFeedSchema.parse(data);
}
var PackageJsonSchema = exports_external.object({
  name: exports_external.string().optional(),
  version: exports_external.string().optional(),
  description: exports_external.string().optional(),
  author: exports_external.union([exports_external.string(), exports_external.object({ name: exports_external.string() })]).optional(),
  license: exports_external.string().optional(),
  dependencies: exports_external.record(exports_external.string(), exports_external.string()).optional(),
  devDependencies: exports_external.record(exports_external.string(), exports_external.string()).optional(),
  peerDependencies: exports_external.record(exports_external.string(), exports_external.string()).optional(),
  peerDependenciesMeta: exports_external.record(exports_external.string(), exports_external.object({ optional: exports_external.boolean().optional() })).optional(),
  engines: exports_external.object({ bun: exports_external.string().optional() }).optional(),
  workspaces: exports_external.union([exports_external.array(exports_external.string()), exports_external.object({ packages: exports_external.array(exports_external.string()) })]).optional(),
  scripts: exports_external.record(exports_external.string(), exports_external.string()).optional(),
  bin: exports_external.union([exports_external.string(), exports_external.record(exports_external.string(), exports_external.string())]).optional(),
  trustedDependencies: exports_external.array(exports_external.string()).optional(),
  overrides: exports_external.record(exports_external.string(), exports_external.any()).optional(),
  resolutions: exports_external.record(exports_external.string(), exports_external.any()).optional(),
  repository: exports_external.union([exports_external.string(), exports_external.object({ url: exports_external.string() })]).optional(),
  publishConfig: exports_external.object({ registry: exports_external.string().optional() }).optional()
}).passthrough();
var NpmPersonSchema = exports_external.union([
  exports_external.string(),
  exports_external.object({ name: exports_external.string().optional(), email: exports_external.string().optional(), url: exports_external.string().optional() })
]);
var NpmDistSchema = exports_external.object({
  shasum: exports_external.string().optional(),
  tarball: exports_external.string().optional(),
  fileCount: exports_external.number().optional(),
  integrity: exports_external.string().optional(),
  unpackedSize: exports_external.number().optional(),
  signatures: exports_external.array(exports_external.object({ sig: exports_external.string(), keyid: exports_external.string() })).optional(),
  attestations: exports_external.object({
    url: exports_external.string(),
    provenance: exports_external.object({ predicateType: exports_external.string() }).optional()
  }).optional()
});
var BunInfoResponseSchema = exports_external.object({
  name: exports_external.string().optional(),
  version: exports_external.string().optional(),
  description: exports_external.string().optional(),
  keywords: exports_external.array(exports_external.string()).optional(),
  license: exports_external.string().optional(),
  homepage: exports_external.string().optional(),
  bugs: exports_external.union([exports_external.string(), exports_external.object({ url: exports_external.string().optional() })]).optional(),
  author: NpmPersonSchema.optional(),
  contributors: exports_external.array(NpmPersonSchema).optional(),
  maintainers: exports_external.array(NpmPersonSchema).optional(),
  repository: exports_external.union([
    exports_external.string(),
    exports_external.object({ type: exports_external.string().optional(), url: exports_external.string(), directory: exports_external.string().optional() })
  ]).optional(),
  dependencies: exports_external.record(exports_external.string(), exports_external.string()).optional(),
  devDependencies: exports_external.record(exports_external.string(), exports_external.string()).optional(),
  peerDependencies: exports_external.record(exports_external.string(), exports_external.string()).optional(),
  optionalDependencies: exports_external.record(exports_external.string(), exports_external.string()).optional(),
  dist: NpmDistSchema.optional(),
  "dist-tags": exports_external.record(exports_external.string(), exports_external.string()).optional(),
  versions: exports_external.array(exports_external.string()).optional(),
  time: exports_external.record(exports_external.string(), exports_external.string()).optional(),
  main: exports_external.string().optional(),
  module: exports_external.string().optional(),
  types: exports_external.string().optional(),
  type: exports_external.string().optional(),
  exports: exports_external.any().optional(),
  bin: exports_external.union([exports_external.string(), exports_external.record(exports_external.string(), exports_external.string())]).optional(),
  engines: exports_external.record(exports_external.string(), exports_external.string()).optional(),
  scripts: exports_external.record(exports_external.string(), exports_external.string()).optional(),
  funding: exports_external.any().optional(),
  sideEffects: exports_external.boolean().optional(),
  directories: exports_external.record(exports_external.string(), exports_external.string()).optional(),
  _id: exports_external.string().optional(),
  _npmUser: NpmPersonSchema.optional(),
  _npmVersion: exports_external.string().optional(),
  _nodeVersion: exports_external.string().optional(),
  _hasShrinkwrap: exports_external.boolean().optional(),
  _npmOperationalInternal: exports_external.object({ host: exports_external.string().optional(), tmp: exports_external.string().optional() }).passthrough().optional(),
  gitHead: exports_external.string().optional()
}).passthrough();
function isFeatureFlagActive(val) {
  return val === "1" || val === "true";
}
function classifyEnvFlag(val, offLabel) {
  if (!val)
    return { label: offLabel, state: "inactive" };
  if (val === "1" || val === "true")
    return { label: "OFF", state: "active" };
  return { label: `set (${val})`, state: "ambiguous" };
}
function effectiveLinker(opts) {
  if (opts.linker !== "-")
    return { strategy: opts.linker, source: "bunfig" };
  if (opts.configVersion === 1) {
    return opts.workspace ? { strategy: "isolated", source: "configVersion=1 + workspace" } : { strategy: "hoisted", source: "configVersion=1" };
  }
  if (opts.configVersion === 0)
    return { strategy: "hoisted", source: "configVersion=0 (compat)" };
  return { strategy: "hoisted", source: "default" };
}
function normalizeGitUrl(raw) {
  let url2 = raw.trim();
  url2 = url2.replace(/^git\+/, "");
  url2 = url2.replace(/^git@github\.com[^:]*:/, "https://github.com/");
  url2 = url2.replace(/^https?:\/\/[^@]+@github\.com/, "https://github.com");
  url2 = url2.replace(/\.git$/, "");
  return url2 || "-";
}
function parseRepoMeta(url2) {
  try {
    const u = new URL(url2);
    const parts = u.pathname.split("/").filter(Boolean);
    return { host: u.host, owner: parts[0] ?? "-" };
  } catch {
    return { host: "-", owner: "-" };
  }
}
function slugifyTokenPart(raw) {
  const slug = raw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return slug || "default";
}
function projectTokenOrg(p) {
  if (p.name.startsWith("@")) {
    const scope = p.name.split("/")[0]?.slice(1) ?? "";
    if (scope)
      return slugifyTokenPart(scope);
  }
  if (p.repoOwner && p.repoOwner !== "-")
    return slugifyTokenPart(p.repoOwner);
  return "default";
}
function projectTokenProject(p) {
  let raw = p.name;
  if (raw.startsWith("@"))
    raw = raw.split("/")[1] ?? p.folder;
  if (!raw || raw === "-")
    raw = p.folder;
  return slugifyTokenPart(raw);
}
function projectTokenName(p, suffix) {
  const base = projectTokenProject(p);
  if (!suffix)
    return base;
  return `${base}-${slugifyTokenPart(suffix)}`;
}
function projectTokenService(p) {
  const org = projectTokenOrg(p);
  const project = projectTokenProject(p);
  return `com.vercel.cli.${org}.${project}`;
}
function statusFromToken(status) {
  switch (status) {
    case "keychain":
      return "success";
    case "missing":
      return "warning";
    case "denied":
    case "error":
      return "critical";
    case "unsupported":
      return "info";
    default:
      return "unknown";
  }
}
function getR2Config() {
  const accountId = Bun.env.R2_ACCOUNT_ID ?? "";
  const accessKeyId = Bun.env.R2_ACCESS_KEY_ID ?? "";
  const secretAccessKey = Bun.env.R2_SECRET_ACCESS_KEY ?? "";
  const bucketName = Bun.env.R2_BUCKET_NAME ?? "";
  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName)
    return null;
  return { accountId, accessKeyId, secretAccessKey, bucketName };
}
function getProfileBaselineKey() {
  return Bun.env.R2_PROFILE_BASELINE_KEY ?? PROFILE_BASELINE_KEY;
}
function toAmzDate(d = new Date) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  const ss = String(d.getUTCSeconds()).padStart(2, "0");
  return { amz: `${y}${m}${day}T${hh}${mm}${ss}Z`, date: `${y}${m}${day}` };
}
function hashSha256Hex(data) {
  return createHash("sha256").update(data).digest("hex");
}
function hmacSha256(key, data) {
  return createHmac("sha256", key).update(data).digest();
}
function encodeR2Key(key) {
  return key.split("/").map((part) => encodeURIComponent(part)).join("/");
}
async function r2Fetch(method, key, body, contentType = "application/json") {
  const cfg = getR2Config();
  if (!cfg)
    throw new Error("Missing R2 configuration");
  const host = `${cfg.accountId}.r2.cloudflarestorage.com`;
  const canonicalUri = `/${cfg.bucketName}/${encodeR2Key(key)}`;
  const { amz, date: date5 } = toAmzDate();
  const payload = body ?? "";
  const payloadHash = hashSha256Hex(payload);
  const canonicalHeaders = `host:${host}
x-amz-content-sha256:${payloadHash}
x-amz-date:${amz}
`;
  const signedHeaders = "host;x-amz-content-sha256;x-amz-date";
  const canonicalRequest = `${method}
${canonicalUri}

${canonicalHeaders}
${signedHeaders}
${payloadHash}`;
  const scope = `${date5}/auto/s3/aws4_request`;
  const stringToSign = `AWS4-HMAC-SHA256
${amz}
${scope}
${hashSha256Hex(canonicalRequest)}`;
  const kDate = hmacSha256(`AWS4${cfg.secretAccessKey}`, date5);
  const kRegion = hmacSha256(kDate, "auto");
  const kService = hmacSha256(kRegion, "s3");
  const kSigning = hmacSha256(kService, "aws4_request");
  const signature = hmacSha256(kSigning, stringToSign).toString("hex");
  const authorization = `AWS4-HMAC-SHA256 Credential=${cfg.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  const url2 = `https://${host}/${cfg.bucketName}/${encodeR2Key(key)}`;
  const headers = {
    Authorization: authorization,
    "x-amz-date": amz,
    "x-amz-content-sha256": payloadHash
  };
  if (method === "PUT")
    headers["Content-Type"] = contentType;
  return fetch(url2, {
    method,
    headers,
    body: method === "PUT" ? payload : undefined
  });
}
function platformHelp(platform) {
  if (platform === "win32") {
    return {
      cmd: "mise.exe exec -- bun",
      hint: "If using mise, call 'mise.exe' directly to ensure arguments like '--' are passed correctly to the runtime."
    };
  }
  return { cmd: "bun", hint: null };
}
function shouldWarnMise(platform, miseShell) {
  return platform === "win32" && !miseShell;
}
function parseEnvVar(contents, key) {
  let val = "-";
  for (const text of contents) {
    const m = text.match(new RegExp(`^${key}\\s*=\\s*["']?([^\\s"'#]+)`, "m"));
    if (m)
      val = m[1];
  }
  return val;
}
function parseTzFromEnv(contents) {
  return parseEnvVar(contents, "TZ");
}
function semverBumpType(a, b) {
  const ma = a.match(/^(\d+)\.(\d+)\.(\d+)/);
  const mb = b.match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!ma || !mb)
    return null;
  if (ma[1] !== mb[1])
    return "major";
  if (ma[2] !== mb[2])
    return "minor";
  if (ma[3] !== mb[3])
    return "patch";
  return null;
}
function isVulnerable(version2, range) {
  return Bun.semver.satisfies(version2, range);
}
function semverCompare(a, b) {
  return Bun.semver.order(a, b);
}
function getGitCommitHash(cwd) {
  try {
    const { stdout, success: success2 } = Bun.spawnSync(["git", "rev-parse", "HEAD"], {
      cwd: cwd ?? import.meta.dir,
      stdout: "pipe",
      stderr: "ignore"
    });
    return success2 ? stdout.toString().trim() : "";
  } catch {
    return "";
  }
}
function getGitCommitHashShort(cwd) {
  const full = getGitCommitHash(cwd);
  return full ? full.slice(0, 9) : "";
}
var stripAnsi = Bun.stripANSI;
function parseBunOutdated(output) {
  const pkgs = [];
  for (const line of output.split(`
`)) {
    const clean = stripAnsi(line);
    if (!clean.startsWith("\u2502"))
      continue;
    const cols = clean.split("\u2502").map((c2) => c2.trim()).filter(Boolean);
    if (cols.length >= 4 && cols[0] !== "Package") {
      const nameMatch = cols[0].match(/^(.+?)\s*\((\w+)\)\s*$/);
      const name = nameMatch ? nameMatch[1] : cols[0];
      const depType = nameMatch ? nameMatch[2] : "prod";
      const workspace = cols.length >= 5 ? cols[4] : undefined;
      pkgs.push({ name, depType, current: cols[1], update: cols[2], latest: cols[3], workspace });
    }
  }
  return pkgs;
}
var ProjectInfoSchema = exports_external.object({
  folder: exports_external.string(),
  name: exports_external.string(),
  version: exports_external.string(),
  deps: exports_external.number(),
  devDeps: exports_external.number(),
  totalDeps: exports_external.number(),
  engine: exports_external.string(),
  lock: exports_external.enum(["bun.lock", "bun.lockb", "none"]),
  bunfig: exports_external.boolean(),
  workspace: exports_external.boolean(),
  keyDeps: exports_external.array(exports_external.string()),
  author: exports_external.string(),
  license: exports_external.string(),
  description: exports_external.string(),
  scriptsCount: exports_external.number(),
  bin: exports_external.array(exports_external.string()),
  registry: exports_external.string(),
  authReady: exports_external.boolean(),
  hasNpmrc: exports_external.boolean(),
  hasBinDir: exports_external.boolean(),
  scopes: exports_external.array(exports_external.string()),
  resilient: exports_external.boolean(),
  hasPkg: exports_external.boolean(),
  frozenLockfile: exports_external.boolean(),
  dryRun: exports_external.boolean(),
  production: exports_external.boolean(),
  exact: exports_external.boolean(),
  installOptional: exports_external.boolean(),
  installDev: exports_external.boolean(),
  installAuto: exports_external.enum(["auto", "force", "disable", "fallback", "-"]),
  linker: exports_external.enum(["hoisted", "isolated", "-"]),
  configVersion: exports_external.number(),
  backend: exports_external.string(),
  minimumReleaseAge: exports_external.number(),
  minimumReleaseAgeExcludes: exports_external.array(exports_external.string()),
  saveTextLockfile: exports_external.boolean(),
  cacheDisabled: exports_external.boolean(),
  cacheDir: exports_external.string(),
  cacheDisableManifest: exports_external.boolean(),
  globalDir: exports_external.string(),
  globalBinDir: exports_external.string(),
  hasCa: exports_external.boolean(),
  lockfileSave: exports_external.boolean(),
  lockfilePrint: exports_external.string(),
  installSecurityScanner: exports_external.string(),
  linkWorkspacePackages: exports_external.boolean(),
  noVerify: exports_external.boolean(),
  verbose: exports_external.boolean(),
  silent: exports_external.boolean(),
  concurrentScripts: exports_external.number(),
  networkConcurrency: exports_external.number(),
  targetCpu: exports_external.string(),
  targetOs: exports_external.string(),
  overrides: exports_external.record(exports_external.string(), exports_external.string()),
  resolutions: exports_external.record(exports_external.string(), exports_external.string()),
  trustedDeps: exports_external.array(exports_external.string()),
  repo: exports_external.string(),
  repoSource: exports_external.string(),
  repoOwner: exports_external.string(),
  repoHost: exports_external.string(),
  envFiles: exports_external.array(exports_external.string()),
  projectTz: exports_external.string(),
  projectDnsTtl: exports_external.string(),
  bunfigEnvRefs: exports_external.array(exports_external.string()),
  peerDeps: exports_external.array(exports_external.string()),
  peerDepsMeta: exports_external.array(exports_external.string()),
  installPeer: exports_external.boolean(),
  runShell: exports_external.string(),
  runBun: exports_external.boolean(),
  runSilent: exports_external.boolean(),
  debugEditor: exports_external.string(),
  hasTests: exports_external.boolean(),
  nativeDeps: exports_external.array(exports_external.string()),
  workspacesList: exports_external.array(exports_external.string()),
  lockHash: exports_external.string()
});
var VALID_AUTO = new Set(["auto", "force", "disable", "fallback"]);
var VALID_CPU = new Set(["arm64", "x64", "ia32", "ppc64", "s390x"]);
var VALID_OS = new Set(["linux", "darwin", "win32", "freebsd", "openbsd", "sunos", "aix"]);
var NOTABLE = new Set([
  "elysia",
  "hono",
  "express",
  "fastify",
  "koa",
  "react",
  "next",
  "vue",
  "svelte",
  "solid-js",
  "astro",
  "typescript",
  "zod",
  "drizzle-orm",
  "prisma",
  "@prisma/client",
  "tailwindcss",
  "vite",
  "webpack",
  "eslint",
  "prettier",
  "bun-types",
  "@anthropic-ai/sdk",
  "openai",
  "discord.js",
  "@modelcontextprotocol/sdk"
]);
function flattenOverrides(obj, prefix = "") {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}>${key}` : key;
    if (typeof value === "string") {
      result[fullKey] = value;
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenOverrides(value, fullKey));
    } else {
      result[fullKey] = String(value);
    }
  }
  return result;
}
var SUSPICIOUS_OVERRIDE_PREFIXES = ["npm:", "git:", "git+", "github:", "file:", "http:", "https:", "link:"];
function classifyOverrideValue(value) {
  const v = value.trim().toLowerCase();
  for (const prefix of SUSPICIOUS_OVERRIDE_PREFIXES) {
    if (v.startsWith(prefix)) {
      if (prefix === "npm:")
        return "redirect";
      if (prefix === "git:" || prefix === "git+" || prefix === "github:")
        return "git-source";
      if (prefix === "file:" || prefix === "link:")
        return "local-path";
      if (prefix === "http:" || prefix === "https:")
        return "url";
    }
  }
  return null;
}
var NATIVE_PATTERN = /napi|prebuild|node-gyp|node-pre-gyp|ffi-napi|binding\.gyp|cmake-js|cargo-cp-artifact/i;
var _nativeCache = new Map;
function isNativeMatch(s) {
  let r = _nativeCache.get(s);
  if (r === undefined) {
    r = NATIVE_PATTERN.test(s);
    _nativeCache.set(s, r);
  }
  return r;
}
var BUN_DEFAULT_TRUSTED = new Set([
  "@airbnb/node-memwatch",
  "@apollo/protobufjs",
  "@apollo/rover",
  "@appsignal/nodejs",
  "@arkweid/lefthook",
  "@aws-amplify/cli",
  "@bahmutov/add-typescript-to-cypress",
  "@bazel/concatjs",
  "@bazel/cypress",
  "@bazel/esbuild",
  "@bazel/hide-bazel-files",
  "@bazel/jasmine",
  "@bazel/protractor",
  "@bazel/rollup",
  "@bazel/terser",
  "@bazel/typescript",
  "@bufbuild/buf",
  "@cdktf/node-pty-prebuilt-multiarch",
  "@ckeditor/ckeditor5-vue",
  "@cloudflare/wrangler",
  "@contrast/fn-inspect",
  "@cubejs-backend/cubestore",
  "@cubejs-backend/native",
  "@cypress/snapshot",
  "@danmarshall/deckgl-typings",
  "@datadog/mobile-react-native",
  "@discordjs/opus",
  "@eversdk/lib-node",
  "@evilmartians/lefthook",
  "@ffmpeg-installer/darwin-arm64",
  "@ffmpeg-installer/darwin-x64",
  "@ffmpeg-installer/linux-arm",
  "@ffmpeg-installer/linux-arm64",
  "@ffmpeg-installer/linux-ia32",
  "@ffmpeg-installer/linux-x64",
  "@ffprobe-installer/darwin-arm64",
  "@ffprobe-installer/darwin-x64",
  "@ffprobe-installer/linux-arm",
  "@ffprobe-installer/linux-arm64",
  "@ffprobe-installer/linux-ia32",
  "@ffprobe-installer/linux-x64",
  "@fingerprintjs/fingerprintjs-pro-react",
  "@ghaiklor/x509",
  "@go-task/cli",
  "@injectivelabs/sdk-ts",
  "@instana/autoprofile",
  "@intlify/vue-i18n-bridge",
  "@intlify/vue-router-bridge",
  "@matteodisabatino/gc_info",
  "@memlab/cli",
  "@microsoft.azure/autorest-core",
  "@microsoft/teamsfx-cli",
  "@microsoft/ts-command-line",
  "@napi-rs/pinyin",
  "@nativescript/core",
  "@netlify/esbuild",
  "@newrelic/native-metrics",
  "@notarize/qlc-cli",
  "@nx-dotnet/core",
  "@opensearch-project/oui",
  "@pact-foundation/pact-node",
  "@paloaltonetworks/postman-code-generators",
  "@pdftron/pdfnet-node",
  "@percy/core",
  "@pnpm/exe",
  "@prisma/client",
  "@prisma/engines",
  "@progress/kendo-licensing",
  "@pulumi/aws-native",
  "@pulumi/awsx",
  "@pulumi/command",
  "@pulumi/kubernetes",
  "@railway/cli",
  "@replayio/cypress",
  "@replayio/playwright",
  "@roots/bud-framework",
  "@sap/hana-client",
  "@sap/hana-performance-tools",
  "@sap/hana-theme-vscode",
  "@scarf/scarf",
  "@sematext/gc-stats",
  "@sentry/capacitor",
  "@sentry/profiling-node",
  "@serialport/bindings",
  "@serialport/bindings-cpp",
  "@shopify/ngrok",
  "@shopify/plugin-cloudflare",
  "@sitespeed.io/chromedriver",
  "@sitespeed.io/edgedriver",
  "@softvisio/core",
  "@splunk/otel",
  "@strapi/strapi",
  "@sveltejs/kit",
  "@syncfusion/ej2-angular-base",
  "@taquito/taquito",
  "@temporalio/core-bridge",
  "@tensorflow/tfjs-node",
  "@trufflesuite/bigint-buffer",
  "@typescript-tools/rust-implementation",
  "@vaadin/vaadin-usage-statistics",
  "@vscode/ripgrep",
  "@vscode/sqlite3",
  "abstract-socket",
  "admin-lte",
  "appdynamics",
  "appium-chromedriver",
  "appium-windows-driver",
  "applicationinsights-native-metrics",
  "argon2",
  "autorest",
  "aws-crt",
  "azure-functions-core-tools",
  "azure-streamanalytics-cicd",
  "backport",
  "bcrypt",
  "better-sqlite3",
  "bigint-buffer",
  "blake-hash",
  "bs-platform",
  "bufferutil",
  "bun",
  "canvacord",
  "canvas",
  "cbor-extract",
  "chromedriver",
  "chromium",
  "classic-level",
  "cld",
  "cldr-data",
  "clevertap-react-native",
  "clientjs",
  "cmark-gfm",
  "compresion",
  "contentlayer",
  "contextify",
  "cordova.plugins.diagnostic",
  "couchbase",
  "cpu-features",
  "cwebp-bin",
  "cy2",
  "cypress",
  "dd-trace",
  "deasync",
  "detox",
  "detox-recorder",
  "diskusage",
  "dotnet-2.0.0",
  "dprint",
  "drivelist",
  "dtrace-provider",
  "duckdb",
  "dugite",
  "eccrypto",
  "egg-bin",
  "egg-ci",
  "electron",
  "electron-chromedriver",
  "electron-prebuilt",
  "electron-winstaller",
  "elm",
  "elm-format",
  "esbuild",
  "esoftplay",
  "event-loop-stats",
  "exifreader",
  "farmhash",
  "fast-folder-size",
  "faunadb",
  "ffi",
  "ffi-napi",
  "ffmpeg-static",
  "fibers",
  "fmerge",
  "free-email-domains",
  "fs-xattr",
  "full-icu",
  "gatsby",
  "gc-stats",
  "gcstats.js",
  "geckodriver",
  "gentype",
  "ghooks",
  "gif2webp-bin",
  "gifsicle",
  "git-commit-msg-linter",
  "git-validate",
  "git-win",
  "gl",
  "go-ios",
  "grpc",
  "grpc-tools",
  "handbrake-js",
  "hasura-cli",
  "heapdump",
  "hiredis",
  "hnswlib-node",
  "hugo-bin",
  "hummus",
  "ibm_db",
  "iconv",
  "iedriver",
  "iltorb",
  "incremental-json-parser",
  "install-peers",
  "interruptor",
  "iobroker.js-controller",
  "iso-constants",
  "isolated-vm",
  "java",
  "jest-preview",
  "jpeg-recompress-bin",
  "jpegtran-bin",
  "keccak",
  "kerberos",
  "keytar",
  "lefthook",
  "leveldown",
  "libpg-query",
  "libpq",
  "libxmljs",
  "libxmljs2",
  "lightningcss-cli",
  "lint",
  "lmdb",
  "lmdb-store",
  "local-cypress",
  "lz4",
  "lzma-native",
  "lzo",
  "macos-alias",
  "mbt",
  "memlab",
  "microtime",
  "minidump",
  "mmmagic",
  "modern-syslog",
  "mongodb-client-encryption",
  "mongodb-crypt-library-dummy",
  "mongodb-crypt-library-version",
  "mongodb-memory-server",
  "mozjpeg",
  "ms-chromium-edge-driver",
  "msgpackr-extract",
  "msnodesqlv8",
  "msw",
  "muhammara",
  "netlify-cli",
  "ngrok",
  "ngx-popperjs",
  "nice-napi",
  "node",
  "node-expat",
  "node-hid",
  "node-jq",
  "node-libcurl",
  "node-mac-contacts",
  "node-pty",
  "node-rdkafka",
  "node-sass",
  "node-webcrypto-ossl",
  "node-zopfli",
  "node-zopfli-es",
  "nodegit",
  "nodejieba",
  "nodent-runtime",
  "nx",
  "odiff-bin",
  "oniguruma",
  "opencode-ai",
  "optipng-bin",
  "oracledb",
  "os-dns-native",
  "parse-server",
  "phantomjs",
  "phantomjs-prebuilt",
  "pkcs11js",
  "playwright-chromium",
  "playwright-firefox",
  "playwright-webkit",
  "pngout-bin",
  "pngquant-bin",
  "posix",
  "pprof",
  "pre-commit",
  "pre-push",
  "prisma",
  "protoc",
  "protoc-gen-grpc-web",
  "puppeteer",
  "purescript",
  "re2",
  "react-jsx-parser",
  "react-native-stylex",
  "react-particles",
  "react-tsparticles",
  "react-vertical-timeline-component",
  "realm",
  "redis-memory-server",
  "ref",
  "ref-napi",
  "registry-js",
  "robotjs",
  "sauce-connect-launcher",
  "saucectl",
  "secp256k1",
  "segfault-handler",
  "shared-git-hooks",
  "sharp",
  "simple-git-hooks",
  "sleep",
  "slice2js",
  "snyk",
  "sockopt",
  "sodium-native",
  "sonar-scanner",
  "spago",
  "spectron",
  "spellchecker",
  "sq-native",
  "sqlite3",
  "sse4_crc32",
  "ssh2",
  "storage-engine",
  "subrequests",
  "subrequests-express",
  "subrequests-json-merger",
  "supabase",
  "svf-lib",
  "swagger-ui",
  "swiftlint",
  "taiko",
  "tldjs",
  "tree-sitter",
  "tree-sitter-cli",
  "tree-sitter-json",
  "tree-sitter-kotlin",
  "tree-sitter-typescript",
  "tree-sitter-yaml",
  "truffle",
  "tsparticles-engine",
  "ttag-cli",
  "ttf2woff2",
  "typemoq",
  "unix-dgram",
  "ursa-optional",
  "usb",
  "utf-8-validate",
  "v8-profiler-next",
  "vue-demi",
  "vue-echarts",
  "vue-inbrowser-compiler-demi",
  "wd",
  "wdeasync",
  "weak-napi",
  "webdev-toolkit",
  "windows-build-tools",
  "wix-style-react",
  "wordpos",
  "workerd",
  "wrtc",
  "xxhash",
  "yo",
  "yorkie",
  "zeromq",
  "zlib-sync",
  "zopflipng-bin"
]);
var PROJECTS_ROOT = Bun.env.BUN_PLATFORM_HOME ?? "/Users/nolarose/Projects";
var projectDir = (p) => `${PROJECTS_ROOT}/${p.folder}`;
var BUN_KEYCHAIN_SERVICE = "dev.bun.scanner";
var BUN_KEYCHAIN_SERVICE_LEGACY = "bun-scanner";
var BUN_KEYCHAIN_TOKEN_NAMES = ["FW_REGISTRY_TOKEN", "REGISTRY_TOKEN"];
function isValidTokenName(name) {
  return BUN_KEYCHAIN_TOKEN_NAMES.includes(name);
}
function validateTokenValue(value) {
  if (value.length === 0)
    return { valid: false, reason: "token value is empty" };
  if (value.trim().length === 0)
    return { valid: false, reason: "token value is only whitespace" };
  if (value.length < 8)
    return { valid: false, reason: `token value is too short (${value.length} chars, minimum 8)` };
  if (new Set(value).size === 1)
    return { valid: false, reason: "token value is a single repeated character" };
  return { valid: true };
}
var _PLACEHOLDER_TOKENS = new Set([
  "test1234",
  "password",
  "changeme",
  "12345678",
  "abcdefgh",
  "xxxxxxxx",
  "tokenhere",
  "secretkey",
  "changeit",
  "testtoken"
]);
function tokenValueWarnings(value) {
  const warnings = [];
  if (_PLACEHOLDER_TOKENS.has(value.toLowerCase())) {
    warnings.push(`"${value}" looks like a placeholder \u2014 make sure this is a real token`);
  }
  return warnings;
}
var _keychainLoadedTokens = new Set;
var _tokenMetrics = new Map;
function getMetrics(name) {
  let m = _tokenMetrics.get(name);
  if (!m) {
    m = { accessed: 0, failed: 0, lastAccessed: null, lastFailed: null, lastFailCode: null, storedAt: null };
    _tokenMetrics.set(name, m);
  }
  return m;
}
function recordAccess(name) {
  const m = getMetrics(name);
  m.accessed++;
  m.lastAccessed = Date.now();
}
function timeSince(date5) {
  const sec = Math.floor((Date.now() - date5.getTime()) / 1000);
  if (sec < 60)
    return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60)
    return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24)
    return `${hr}h ago`;
  const days = Math.floor(hr / 24);
  return `${days}d ago`;
}
function recordFailure(name, code) {
  const m = getMetrics(name);
  m.failed++;
  m.lastFailed = Date.now();
  m.lastFailCode = code;
}
function keychainUnavailableErr() {
  const v = typeof Bun !== "undefined" ? Bun.version : "unknown";
  return {
    ok: false,
    code: "NO_API",
    reason: `Bun.secrets API not available (Bun ${v}; requires a build with keychain support)`
  };
}
function classifyKeychainError(err) {
  const msg = err instanceof Error ? err.message : String(err);
  const lower = msg.toLowerCase();
  if (lower.includes("denied") || lower.includes("authorization") || lower.includes("permission") || lower.includes("not allowed"))
    return { ok: false, code: "ACCESS_DENIED", reason: `Keychain access denied: ${msg}` };
  if (lower.includes("not found") || lower.includes("no such") || lower.includes("could not be found"))
    return { ok: false, code: "NOT_FOUND", reason: `Keychain item not found: ${msg}` };
  return { ok: false, code: "OS_ERROR", reason: `Keychain OS error: ${msg}` };
}
var _hasBunSecrets = !!(globalThis.secrets?.get || Bun.secrets);
var _isDarwin = process.platform === "darwin";
function _tryHexDecode(hex3) {
  if (hex3.length < 2 || hex3.length % 2 !== 0 || !/^[0-9a-f]+$/.test(hex3))
    return null;
  try {
    const bytes = new Uint8Array(hex3.length / 2);
    for (let i = 0;i < hex3.length; i += 2) {
      bytes[i / 2] = parseInt(hex3.slice(i, i + 2), 16);
    }
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}
async function _securityCliGet(service, name) {
  if (!_isDarwin)
    return null;
  try {
    const proc = Bun.spawn(["security", "find-generic-password", "-s", service, "-a", name, "-w"], {
      stdout: "pipe",
      stderr: "pipe"
    });
    const exitCode = await proc.exited;
    if (exitCode !== 0)
      return null;
    const output = await new Response(proc.stdout).text();
    const trimmed = output.trim();
    if (trimmed.length === 0)
      return null;
    return _tryHexDecode(trimmed) ?? trimmed;
  } catch {
    return null;
  }
}
async function _securityCliSet(service, name, value) {
  if (!_isDarwin)
    return false;
  try {
    const proc = Bun.spawn(["security", "add-generic-password", "-U", "-s", service, "-a", name, "-w", value], {
      stdout: "pipe",
      stderr: "pipe"
    });
    return await proc.exited === 0;
  } catch {
    return false;
  }
}
async function _securityCliDelete(service, name) {
  if (!_isDarwin)
    return false;
  try {
    const proc = Bun.spawn(["security", "delete-generic-password", "-s", service, "-a", name], {
      stdout: "pipe",
      stderr: "pipe"
    });
    return await proc.exited === 0;
  } catch {
    return false;
  }
}
async function keychainGet(name, service = BUN_KEYCHAIN_SERVICE) {
  const cliValue = await _securityCliGet(service, name);
  if (cliValue !== null) {
    recordAccess(name);
    return { ok: true, value: cliValue };
  }
  let result;
  if (_hasBunSecrets) {
    try {
      const bunSecrets = Bun.secrets;
      const value = bunSecrets ? await bunSecrets.get({ service, name }) ?? null : await globalThis.secrets.get(service, name) ?? null;
      result = { ok: true, value };
    } catch (err) {
      result = classifyKeychainError(err);
    }
  } else {
    result = keychainUnavailableErr();
  }
  if (result.ok && result.value)
    recordAccess(name);
  else if (!result.ok)
    recordFailure(name, result.code);
  return result;
}
async function keychainSet(name, value) {
  if (await _securityCliSet(BUN_KEYCHAIN_SERVICE, name, value)) {
    return { ok: true, value: undefined };
  }
  let result;
  if (_hasBunSecrets) {
    try {
      const bunSecrets = Bun.secrets;
      if (bunSecrets)
        await bunSecrets.set({ service: BUN_KEYCHAIN_SERVICE, name }, value);
      else
        await globalThis.secrets.set(BUN_KEYCHAIN_SERVICE, name, value);
      result = { ok: true, value: undefined };
    } catch (err) {
      result = classifyKeychainError(err);
    }
  } else {
    result = keychainUnavailableErr();
  }
  if (!result.ok)
    recordFailure(name, result.code);
  return result;
}
async function keychainDelete(name) {
  const cliDeleted = await _securityCliDelete(BUN_KEYCHAIN_SERVICE, name);
  if (cliDeleted) {
    return { ok: true, value: true };
  }
  let result;
  if (_hasBunSecrets) {
    try {
      const bunSecrets = Bun.secrets;
      if (bunSecrets) {
        result = { ok: true, value: await bunSecrets.delete({ service: BUN_KEYCHAIN_SERVICE, name }) };
      } else {
        result = { ok: true, value: await globalThis.secrets.delete(BUN_KEYCHAIN_SERVICE, name) };
      }
    } catch (err) {
      result = classifyKeychainError(err);
    }
  } else {
    result = keychainUnavailableErr();
  }
  if (!result.ok)
    recordFailure(name, result.code);
  return result;
}
function tokenSource(name) {
  if (_keychainLoadedTokens.has(name))
    return "keychain";
  if (Bun.env[name])
    return "env";
  return "not set";
}
async function migrateKeychainService() {
  const deleteWithService = async (name, service) => {
    if (!_hasBunSecrets)
      return;
    const bunSecrets = Bun.secrets;
    try {
      if (bunSecrets)
        await bunSecrets.delete({ service, name });
      else
        await globalThis.secrets.delete(service, name);
    } catch {}
  };
  for (const name of BUN_KEYCHAIN_TOKEN_NAMES) {
    const legacy = await keychainGet(name, BUN_KEYCHAIN_SERVICE_LEGACY);
    if (!legacy.ok || !legacy.value)
      continue;
    const current = await keychainGet(name, BUN_KEYCHAIN_SERVICE);
    if (current.ok && current.value) {
      await deleteWithService(name, BUN_KEYCHAIN_SERVICE_LEGACY);
      continue;
    }
    const stored = await keychainSet(name, legacy.value);
    if (stored.ok) {
      await deleteWithService(name, BUN_KEYCHAIN_SERVICE_LEGACY);
    }
  }
}
async function autoLoadKeychainTokens() {
  await migrateKeychainService();
  for (const name of BUN_KEYCHAIN_TOKEN_NAMES) {
    if (Bun.env[name])
      continue;
    const result = await keychainGet(name);
    if (result.ok && result.value) {
      const check2 = validateTokenValue(result.value);
      if (!check2.valid) {
        console.error(`${c.yellow("\u26A0")} Skipping keychain token ${c.cyan(name)}: ${check2.reason}`);
        await logTokenEvent({ event: "load_skip", tokenName: name, result: "invalid", detail: check2.reason });
        continue;
      }
      process.env[name] = result.value;
      _keychainLoadedTokens.add(name);
      await logTokenEvent({ event: "load", tokenName: name, result: "ok" });
    }
  }
}
async function readTokenFromStdin() {
  if (process.stdin.isTTY) {
    process.stderr.write("Enter token value: ");
    const reader = process.stdin.getReader();
    const chunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done || !value)
        break;
      chunks.push(value);
      if (new TextDecoder().decode(value).includes(`
`))
        break;
    }
    reader.releaseLock();
    return new TextDecoder().decode(Buffer.concat(chunks)).replace(/\n$/, "").replace(/\r$/, "");
  }
  const text = await Bun.stdin.text();
  return text.replace(/\n$/, "").replace(/\r$/, "");
}
async function discoverRegistryUrl() {
  if (Bun.env.BUN_CONFIG_REGISTRY)
    return Bun.env.BUN_CONFIG_REGISTRY.replace(/\/$/, "");
  try {
    const entries = await readdir(PROJECTS_ROOT, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isDirectory() || e.name.startsWith(".") || e.name === "scanner")
        continue;
      const bunfigFile = Bun.file(`${PROJECTS_ROOT}/${e.name}/bunfig.toml`);
      if (await bunfigFile.exists()) {
        const text = await bunfigFile.text();
        const match = text.match(/registry\s*=\s*"([^"]+)"/);
        if (match)
          return match[1].replace(/\/$/, "");
      }
    }
  } catch {}
  return "https://registry.npmjs.org";
}
async function checkTokenHealth() {
  const registryUrl = await discoverRegistryUrl();
  console.log(`
${c.bold("  Token Health Check")}`);
  console.log(`  ${c.dim(`registry: ${registryUrl}`)}
`);
  for (const name of BUN_KEYCHAIN_TOKEN_NAMES) {
    const kcResult = await keychainGet(name);
    const envVal = Bun.env[name];
    const value = kcResult.ok && kcResult.value ? kcResult.value : envVal;
    if (!value) {
      console.log(`    ${c.cyan(name.padEnd(24))} ${c.yellow("MISS")}  not set in keychain or env`);
      continue;
    }
    const check2 = validateTokenValue(value);
    if (!check2.valid) {
      console.log(`    ${c.cyan(name.padEnd(24))} ${c.red("BAD ")}  ${check2.reason}`);
      await logTokenEvent({ event: "check_fail", tokenName: name, result: "bad_format", detail: check2.reason });
      continue;
    }
    try {
      const controller = new AbortController;
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(`${registryUrl}/-/whoami`, {
        headers: { Authorization: `Bearer ${value}` },
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (res.ok) {
        let username = "";
        try {
          const body = await res.json();
          if (body.username)
            username = `  (${body.username})`;
        } catch {}
        console.log(`    ${c.cyan(name.padEnd(24))} ${c.green("AUTH")}  registry returned 200${username}`);
      } else if (res.status === 401 || res.status === 403) {
        console.log(`    ${c.cyan(name.padEnd(24))} ${c.red("DENY")}  registry returned ${res.status} (token rejected)`);
        await logTokenEvent({
          event: "check_fail",
          tokenName: name,
          result: "denied",
          detail: `HTTP ${res.status}`
        });
      } else {
        console.log(`    ${c.cyan(name.padEnd(24))} ${c.yellow("WARN")}  unexpected HTTP ${res.status}`);
        await logTokenEvent({
          event: "check_fail",
          tokenName: name,
          result: "unexpected",
          detail: `HTTP ${res.status}`
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const label = msg.includes("abort") ? "timeout" : "network error";
      console.log(`    ${c.cyan(name.padEnd(24))} ${c.red("NET ")}  ${label}: ${msg}`);
      await logTokenEvent({ event: "check_fail", tokenName: name, result: "network", detail: msg });
    }
  }
  console.log();
}
var XrefEntrySchema = exports_external.object({
  folder: exports_external.string(),
  bunDefault: exports_external.array(exports_external.string()),
  explicit: exports_external.array(exports_external.string()),
  blocked: exports_external.array(exports_external.string()),
  lockHash: exports_external.string().optional()
});
var XrefSnapshotSchema = exports_external.object({
  timestamp: exports_external.string(),
  date: exports_external.string(),
  tz: exports_external.string(),
  tzOverride: exports_external.boolean(),
  projects: exports_external.array(XrefEntrySchema),
  totalBunDefault: exports_external.number(),
  totalProjects: exports_external.number()
});
var SNAPSHOT_DIR = `${import.meta.dir}/.audit`;
var SNAPSHOT_PATH = `${SNAPSHOT_DIR}/xref-snapshot.json`;
var TOKEN_AUDIT_PATH = `${SNAPSHOT_DIR}/token-events.jsonl`;
var BUN_TOKEN_AUDIT_RSS_PATH = `${SNAPSHOT_DIR}/token-events.rss.xml`;
var BUN_SCAN_RESULTS_RSS_PATH = `${SNAPSHOT_DIR}/scan-results.rss.xml`;
var BUN_ADVISORY_MATCHES_PATH = `${SNAPSHOT_DIR}/advisory-matches.jsonl`;
var _snapshotDirReady = false;
async function ensureSnapshotDir() {
  if (_snapshotDirReady)
    return;
  await mkdir(SNAPSHOT_DIR, { recursive: true });
  _snapshotDirReady = true;
}
async function logTokenEvent(evt) {
  try {
    await ensureSnapshotDir();
    const entry = {
      timestamp: new Date().toISOString(),
      event: evt.event,
      tokenName: evt.tokenName,
      user: Bun.env.USER ?? Bun.env.LOGNAME ?? "unknown",
      result: evt.result,
      ...evt.detail ? { detail: evt.detail } : {}
    };
    await appendFile(TOKEN_AUDIT_PATH, JSON.stringify(entry) + `
`);
  } catch {}
}
function escapeXml(text) {
  return Bun.escapeHTML(text);
}
function decodeXmlEntities(text) {
  return text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&apos;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
}
function generateRssXml(channel) {
  const items = [...channel.items].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  const itemsXml = items.map((it) => `    <item>
      <title>${escapeXml(it.title)}</title>${it.link ? `
      <link>${escapeXml(it.link)}</link>` : ""}
      <guid${!it.guid && it.link ? "" : ` isPermaLink="false"`}>${escapeXml(it.guid ?? it.link ?? it.title)}</guid>
      <description>${escapeXml(it.description)}</description>
      <pubDate>${escapeXml(it.pubDate)}</pubDate>
    </item>`).join(`
`);
  const buildDate = new Date().toUTCString();
  const lang = channel.language ?? "en-us";
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channel.title)}</title>
    <link>${escapeXml(channel.link)}</link>
    <description>${escapeXml(channel.description)}</description>
    <language>${escapeXml(lang)}</language>
    <atom:link href="${escapeXml(channel.link)}" rel="self" type="application/rss+xml"/>
    <generator>Bun-Scanner</generator>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>${channel.ttl != null ? `
    <ttl>${channel.ttl}</ttl>` : ""}
${itemsXml}
  </channel>
</rss>
`;
}
function parseRssFeed(xmlText) {
  const results = [];
  const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xmlText)) !== null) {
    const block = match[1];
    const title = decodeXmlEntities(block.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
    const link = decodeXmlEntities(block.match(/<link[^>]*>([\s\S]*?)<\/link>/i)?.[1] ?? "");
    const description = decodeXmlEntities(block.match(/<description[^>]*>([\s\S]*?)<\/description>/i)?.[1] ?? block.match(/<content[^>]*>([\s\S]*?)<\/content>/i)?.[1] ?? "");
    const pubDate = decodeXmlEntities(block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i)?.[1] ?? "");
    results.push({ title, link, description, pubDate });
  }
  if (results.length > 0)
    return results;
  const entryRegex = /<entry[\s>]([\s\S]*?)<\/entry>/gi;
  while ((match = entryRegex.exec(xmlText)) !== null) {
    const block = match[1];
    const title = decodeXmlEntities(block.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
    const linkMatch = block.match(/<link[^>]*href=["']([^"']*)["'][^>]*\/?>/i);
    const link = decodeXmlEntities(linkMatch?.[1] ?? block.match(/<link[^>]*>([\s\S]*?)<\/link>/i)?.[1] ?? "");
    const description = decodeXmlEntities(block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i)?.[1] ?? block.match(/<content[^>]*>([\s\S]*?)<\/content>/i)?.[1] ?? "");
    const pubDate = decodeXmlEntities(block.match(/<published[^>]*>([\s\S]*?)<\/published>/i)?.[1] ?? block.match(/<updated[^>]*>([\s\S]*?)<\/updated>/i)?.[1] ?? "");
    results.push({ title, link, description, pubDate });
  }
  return results;
}
async function publishTokenEventsRss() {
  try {
    const file2 = Bun.file(TOKEN_AUDIT_PATH);
    if (!await file2.exists())
      return;
    const text = await file2.text();
    const lines = text.trim().split(`
`).filter(Boolean);
    const events = lines.map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    }).filter(Boolean).slice(-100).reverse();
    if (events.length === 0)
      return;
    const items = events.map((e) => ({
      title: `Token ${e.event}: ${e.tokenName}`,
      description: `Result: ${e.result}${e.detail ? ` \u2014 ${e.detail}` : ""}`,
      pubDate: e.timestamp ? new Date(e.timestamp).toUTCString() : new Date().toUTCString(),
      guid: `${e.timestamp}-${e.event}-${e.tokenName}`
    }));
    const xml = generateRssXml({
      title: "Token Audit Events",
      description: "Token lifecycle events from Bun-Scanner",
      link: `file://${BUN_TOKEN_AUDIT_RSS_PATH}`,
      items
    });
    await ensureSnapshotDir();
    await Bun.write(BUN_TOKEN_AUDIT_RSS_PATH, xml);
    console.log(`  RSS  ${BUN_TOKEN_AUDIT_RSS_PATH} (${items.length} events)`);
  } catch (err) {
    console.error("  Warning: failed to generate token events RSS:", err instanceof Error ? err.message : String(err));
  }
}
async function consumeAdvisoryFeed(feedUrl, projects) {
  try {
    const ctrl = new AbortController;
    const timer = setTimeout(() => ctrl.abort(), 1e4);
    const res = await fetch(feedUrl, {
      signal: ctrl.signal,
      headers: { "User-Agent": "Bun-Scanner/1.0" }
    });
    clearTimeout(timer);
    if (!res.ok) {
      console.error(`  Warning: advisory feed returned HTTP ${res.status}`);
      return;
    }
    const xmlText = await res.text();
    const advisories = parseRssFeed(xmlText);
    if (advisories.length === 0) {
      console.log("  Advisory feed: no entries found.");
      return;
    }
    const pkgNames = new Set;
    for (const p of projects) {
      for (const dep of p.keyDeps)
        pkgNames.add(dep);
    }
    const matches = [];
    for (const adv of advisories) {
      const text = `${adv.title} ${adv.description}`;
      const matched = [];
      for (const pkg of pkgNames) {
        const re = new RegExp(`\\b${pkg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
        if (re.test(text))
          matched.push(pkg);
      }
      if (matched.length > 0) {
        const folders = projects.filter((p) => p.keyDeps.some((d) => matched.includes(d))).map((p) => p.folder);
        matches.push({ advisory: adv.title, date: adv.pubDate, link: adv.link, packages: matched, folders });
      }
    }
    if (matches.length === 0) {
      console.log(`  Advisory feed: ${advisories.length} entries, no matches to local packages.`);
      return;
    }
    sectionHeader(`Advisory Matches (${matches.length})`);
    const advisoryRows = matches.map((m) => ({
      Advisory: m.advisory,
      Date: m.date || "-",
      Link: m.link || "-",
      Packages: m.packages.join(", "),
      Projects: m.folders.join(", ")
    }));
    renderMatrix(advisoryRows, BUN_SCANNER_COLUMNS.ADVISORY_MATCHES);
    await ensureSnapshotDir();
    const lines = matches.map((m) => JSON.stringify({ ...m, fetchedAt: new Date().toISOString() })).join(`
`) + `
`;
    await appendFile(BUN_ADVISORY_MATCHES_PATH, lines);
    console.log(`  Appended ${matches.length} match(es) to ${BUN_ADVISORY_MATCHES_PATH}`);
  } catch (err) {
    const msg = err instanceof Error ? err.name === "AbortError" ? "request timed out" : err.message : String(err);
    console.error(`  Warning: advisory feed failed: ${msg}`);
  }
}
async function publishScanResultsRss(projects) {
  try {
    const notable = projects.filter((p) => {
      if (!p.authReady)
        return true;
      if (p.engine === "unknown")
        return true;
      if (p.lock === "none")
        return true;
      if (Object.keys(p.overrides).length > 0 || Object.keys(p.resolutions).length > 0)
        return true;
      if (!p.resilient)
        return true;
      if (p.cacheDisabled)
        return true;
      if (p.noVerify)
        return true;
      return false;
    });
    if (notable.length === 0)
      return;
    const now = new Date().toUTCString();
    const ts = Date.now();
    const items = notable.map((p, i) => {
      const findings = [];
      if (!p.authReady)
        findings.push("auth not ready");
      if (p.engine === "unknown")
        findings.push("unknown engine");
      if (p.lock === "none")
        findings.push("no lockfile");
      if (Object.keys(p.overrides).length > 0)
        findings.push(`${Object.keys(p.overrides).length} override(s)`);
      if (Object.keys(p.resolutions).length > 0)
        findings.push(`${Object.keys(p.resolutions).length} resolution(s)`);
      if (!p.resilient)
        findings.push("not resilient");
      if (p.cacheDisabled)
        findings.push("cache disabled");
      if (p.noVerify)
        findings.push("verification disabled");
      return {
        title: `${p.name}@${p.version} \u2014 ${findings.length} finding(s)`,
        description: `Folder: ${p.folder}
Findings: ${findings.join(", ")}`,
        pubDate: now,
        guid: `${p.folder}-${ts}-${i}`
      };
    });
    const xml = generateRssXml({
      title: "Scan Results",
      description: "Notable findings from Bun-Scanner",
      link: `file://${BUN_SCAN_RESULTS_RSS_PATH}`,
      items
    });
    await ensureSnapshotDir();
    await Bun.write(BUN_SCAN_RESULTS_RSS_PATH, xml);
    console.log(`  RSS  ${BUN_SCAN_RESULTS_RSS_PATH} (${items.length} project(s))`);
  } catch (err) {
    console.error("  Warning: failed to generate scan results RSS:", err instanceof Error ? err.message : String(err));
  }
}
async function saveXrefSnapshot(data, totalProjects) {
  await ensureSnapshotDir();
  const now = new Date;
  const snapshot = {
    timestamp: now.toISOString(),
    date: fmtDate(now),
    tz: _tz,
    tzOverride: _tzExplicit,
    projects: data,
    totalBunDefault: data.reduce((s, x) => s + x.bunDefault.length, 0),
    totalProjects
  };
  await Bun.write(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2) + `
`);
}
async function loadXrefSnapshot(path) {
  const file2 = Bun.file(path ?? SNAPSHOT_PATH);
  if (!await file2.exists())
    return null;
  try {
    const raw = JSON.parse(await file2.text());
    return XrefSnapshotSchema.parse(raw);
  } catch {
    return null;
  }
}
var LIFECYCLE_HOOKS = [
  "preinstall",
  "postinstall",
  "preuninstall",
  "prepare",
  "preprepare",
  "postprepare",
  "prepublishOnly"
];
async function scanXrefData(projects, prev) {
  const prevMap = prev ? new Map(prev.projects.map((x) => [x.folder, x])) : null;
  let skipped = 0;
  const scanOne = async (p) => {
    if (prevMap && p.lockHash !== "-") {
      const cached2 = prevMap.get(p.folder);
      if (cached2?.lockHash && cached2.lockHash === p.lockHash) {
        skipped++;
        return cached2;
      }
    }
    const nmDir = `${projectDir(p)}/node_modules`;
    let entries;
    try {
      entries = await readdir(nmDir);
    } catch {
      return null;
    }
    const trusted = new Set(p.trustedDeps);
    const xref = { folder: p.folder, bunDefault: [], explicit: [], blocked: [], lockHash: p.lockHash };
    const seen = new Set;
    const classify = (pkgName, scripts) => {
      let hasAnyHook = false;
      for (const h of LIFECYCLE_HOOKS) {
        if (scripts[h]) {
          hasAnyHook = true;
          break;
        }
      }
      if (hasAnyHook && !seen.has(pkgName)) {
        seen.add(pkgName);
        if (BUN_DEFAULT_TRUSTED.has(pkgName))
          xref.bunDefault.push(pkgName);
        else if (trusted.has(pkgName))
          xref.explicit.push(pkgName);
        else
          xref.blocked.push(pkgName);
      }
    };
    const reads = [];
    for (const entry of entries) {
      if (entry.startsWith("@")) {
        let scoped;
        try {
          scoped = await readdir(`${nmDir}/${entry}`);
        } catch {
          continue;
        }
        for (const sub of scoped)
          reads.push([`${entry}/${sub}`, `${nmDir}/${entry}/${sub}/package.json`]);
      } else {
        reads.push([entry, `${nmDir}/${entry}/package.json`]);
      }
    }
    await Promise.all(reads.map(async ([name, path]) => {
      try {
        const pkg = JSON.parse(await Bun.file(path).text());
        if (pkg.scripts)
          classify(name, pkg.scripts);
      } catch {}
    }));
    return xref.bunDefault.length + xref.explicit.length + xref.blocked.length > 0 ? xref : null;
  };
  const results = await Promise.all(projects.filter((p) => p.hasPkg).map(scanOne));
  return { entries: results.filter((x) => x !== null), skipped };
}
var DEFAULTS = {
  author: "mike.hunt@factory.wager.com",
  license: "MIT"
};
var AUDIT_FIELDS = ["author", "license", "description", "version", "engine"];
async function scanProject(dir) {
  const folder = dir.split("/").pop() ?? "";
  const profTag = `project:${folder}`;
  let profStart = 0;
  const profMark = (label) => {
    if (!_profileEnabled)
      return;
    const now = Bun.nanoseconds();
    if (profStart > 0) {
      const ms = (now - profStart) / 1e6;
      recordProjectProfile(`${profTag}:${label}`, ms);
    }
    profStart = now;
  };
  if (_profileEnabled)
    profStart = Bun.nanoseconds();
  const base = {
    folder,
    name: folder,
    version: "-",
    deps: 0,
    devDeps: 0,
    totalDeps: 0,
    engine: "-",
    lock: "none",
    bunfig: false,
    workspace: false,
    keyDeps: [],
    author: "-",
    license: "-",
    description: "-",
    scriptsCount: 0,
    bin: [],
    registry: "-",
    authReady: false,
    hasNpmrc: false,
    hasBinDir: false,
    scopes: [],
    resilient: false,
    hasPkg: false,
    frozenLockfile: false,
    dryRun: false,
    production: false,
    exact: false,
    installOptional: true,
    installDev: true,
    installAuto: "-",
    linker: "-",
    configVersion: -1,
    backend: "-",
    minimumReleaseAge: 0,
    minimumReleaseAgeExcludes: [],
    saveTextLockfile: false,
    cacheDisabled: false,
    cacheDir: "-",
    cacheDisableManifest: false,
    globalDir: "-",
    globalBinDir: "-",
    hasCa: false,
    lockfileSave: true,
    lockfilePrint: "-",
    installSecurityScanner: "-",
    linkWorkspacePackages: false,
    noVerify: false,
    verbose: false,
    silent: false,
    concurrentScripts: 0,
    networkConcurrency: 0,
    targetCpu: "-",
    targetOs: "-",
    overrides: {},
    resolutions: {},
    trustedDeps: [],
    repo: "-",
    repoSource: "-",
    repoOwner: "-",
    repoHost: "-",
    envFiles: [],
    projectTz: "UTC",
    projectDnsTtl: "-",
    bunfigEnvRefs: [],
    peerDeps: [],
    peerDepsMeta: [],
    installPeer: true,
    runShell: "-",
    runBun: false,
    runSilent: false,
    debugEditor: "-",
    hasTests: false,
    nativeDeps: [],
    workspacesList: [],
    lockHash: "-"
  };
  let pkg = null;
  const pkgFile = Bun.file(`${dir}/package.json`);
  const pkgExists = await pkgFile.exists();
  if (pkgExists) {
    try {
      const parsed = PackageJsonSchema.safeParse(await pkgFile.json());
      if (parsed.success) {
        pkg = parsed.data;
        base.hasPkg = true;
        base.name = pkg.name ?? folder;
        base.version = pkg.version ?? "-";
        const depsObj = pkg.dependencies ?? {};
        const devObj = pkg.devDependencies ?? {};
        base.deps = Object.keys(depsObj).length;
        base.devDeps = Object.keys(devObj).length;
        base.totalDeps = base.deps + base.devDeps;
        base.engine = pkg.engines?.bun ?? "-";
        base.workspace = Array.isArray(pkg.workspaces) || typeof pkg.workspaces === "object" && pkg.workspaces !== null;
        base.author = typeof pkg.author === "string" ? pkg.author : pkg.author?.name ?? "-";
        base.license = pkg.license ?? "-";
        base.description = pkg.description ?? "-";
        base.scriptsCount = pkg.scripts ? Object.keys(pkg.scripts).length : 0;
        base.hasTests = !!pkg.scripts?.test;
        if (Array.isArray(pkg.workspaces)) {
          base.workspacesList = pkg.workspaces;
        } else if (pkg.workspaces && typeof pkg.workspaces === "object" && Array.isArray(pkg.workspaces.packages)) {
          base.workspacesList = pkg.workspaces.packages;
        }
        if (typeof pkg.bin === "string") {
          base.bin = [base.name.split("/").pop() ?? base.name];
        } else if (pkg.bin && typeof pkg.bin === "object") {
          base.bin = Object.keys(pkg.bin);
        }
        const allDeps = { ...depsObj, ...devObj };
        base.keyDeps = Object.keys(allDeps).filter((d) => NOTABLE.has(d));
        if (Array.isArray(pkg.trustedDependencies)) {
          base.trustedDeps = pkg.trustedDependencies;
          base.nativeDeps = base.trustedDeps.filter((name) => NATIVE_PATTERN.test(name));
        }
        const rawOverrides = pkg.overrides ?? pkg.pnpm?.overrides;
        if (rawOverrides && typeof rawOverrides === "object") {
          base.overrides = flattenOverrides(rawOverrides);
        }
        if (pkg.resolutions && typeof pkg.resolutions === "object") {
          base.resolutions = flattenOverrides(pkg.resolutions);
        }
        if (pkg.peerDependencies && typeof pkg.peerDependencies === "object") {
          base.peerDeps = Object.keys(pkg.peerDependencies);
        }
        if (pkg.peerDependenciesMeta && typeof pkg.peerDependenciesMeta === "object") {
          base.peerDepsMeta = Object.entries(pkg.peerDependenciesMeta).filter(([, v]) => v?.optional === true).map(([k]) => k);
        }
        const rawRepo = typeof pkg.repository === "string" ? pkg.repository : pkg.repository?.url;
        if (rawRepo) {
          base.repo = normalizeGitUrl(rawRepo);
          base.repoSource = "pkg";
          const meta3 = parseRepoMeta(base.repo);
          base.repoHost = meta3.host;
          base.repoOwner = meta3.owner;
        }
      }
    } catch {}
  }
  profMark("pkg");
  if (base.repo === "-") {
    try {
      const result = Bun.spawnSync(["git", "remote", "get-url", "origin"], {
        cwd: dir,
        stdout: "pipe",
        stderr: "ignore"
      });
      if (result.success) {
        const remote = result.stdout.toString().trim();
        if (remote) {
          base.repo = normalizeGitUrl(remote);
          base.repoSource = "git";
          const meta3 = parseRepoMeta(base.repo);
          base.repoHost = meta3.host;
          base.repoOwner = meta3.owner;
        }
      }
    } catch {}
  }
  profMark("git");
  const envCandidates = [".env", ".env.local", ".env.development", ".env.production", ".env.test"];
  const envResults = await Promise.all(envCandidates.map(async (f) => Bun.file(`${dir}/${f}`).text().catch(() => null)));
  base.envFiles = envCandidates.filter((_, i) => envResults[i] !== null);
  const envContents = envResults.filter((c2) => c2 !== null);
  if (envContents.length > 0) {
    const envTz = parseTzFromEnv(envContents);
    if (envTz !== "-")
      base.projectTz = envTz;
    const envDns = parseEnvVar(envContents, "BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS");
    if (envDns !== "-")
      base.projectDnsTtl = envDns;
  }
  profMark("env");
  const [hasLock, hasLockb] = await Promise.all([
    Bun.file(`${dir}/bun.lock`).exists(),
    Bun.file(`${dir}/bun.lockb`).exists()
  ]);
  if (hasLock) {
    base.lock = "bun.lock";
    try {
      const lockContent = await Bun.file(`${dir}/bun.lock`).text();
      base.lockHash = Bun.hash.wyhash(lockContent).toString(16);
      const lockHead = lockContent.slice(0, 200);
      const cvMatch = lockHead.match(/"configVersion"\s*:\s*(\d+)/);
      if (cvMatch)
        base.configVersion = parseInt(cvMatch[1], 10);
    } catch {}
  } else if (hasLockb) {
    base.lock = "bun.lockb";
    try {
      const lockBytes = await Bun.file(`${dir}/bun.lockb`).arrayBuffer();
      base.lockHash = Bun.hash.wyhash(new Uint8Array(lockBytes)).toString(16);
    } catch {}
  }
  profMark("lock");
  const bunfigFile = Bun.file(`${dir}/bunfig.toml`);
  base.bunfig = await bunfigFile.exists();
  if (base.bunfig) {
    try {
      const toml = await bunfigFile.text();
      const match = toml.match(/^\s*registry\s*=\s*"([^"]+)"/m);
      if (match)
        base.registry = match[1].replace(/^https?:\/\//, "");
      const scopeMatches = toml.matchAll(/^\s*"(@[^"]+)"\s*=/gm);
      const inScopes = toml.includes("[install.scopes]");
      if (inScopes) {
        for (const m of scopeMatches) {
          base.scopes.push(m[1]);
        }
      }
      const boolOpt = (key) => {
        const m = toml.match(new RegExp(`^\\s*${key}\\s*=\\s*(true|false)`, "m"));
        return m?.[1] === "true";
      };
      base.frozenLockfile = boolOpt("frozenLockfile");
      base.dryRun = boolOpt("dryRun");
      base.production = boolOpt("production");
      base.exact = boolOpt("exact");
      base.saveTextLockfile = boolOpt("saveTextLockfile");
      base.linkWorkspacePackages = boolOpt("linkWorkspacePackages");
      const optionalVal = toml.match(/^\s*optional\s*=\s*(true|false)/m);
      if (optionalVal)
        base.installOptional = optionalVal[1] === "true";
      const devVal = toml.match(/^\s*dev\s*=\s*(true|false)/m);
      if (devVal)
        base.installDev = devVal[1] === "true";
      const peerVal = toml.match(/^\s*peer\s*=\s*(true|false)/m);
      if (peerVal)
        base.installPeer = peerVal[1] === "true";
      const strOpt = (key) => {
        const m = toml.match(new RegExp(`^\\s*${key}\\s*=\\s*"([^"]+)"`, "m"));
        return m?.[1];
      };
      const autoVal = strOpt("auto");
      if (autoVal)
        base.installAuto = autoVal;
      const linkerVal = strOpt("linker");
      if (linkerVal)
        base.linker = linkerVal;
      const backendVal = strOpt("backend");
      if (backendVal)
        base.backend = backendVal;
      const cpuVal = strOpt("cpu");
      if (cpuVal)
        base.targetCpu = cpuVal;
      const osVal = strOpt("os");
      if (osVal)
        base.targetOs = osVal;
      base.noVerify = boolOpt("noVerify");
      base.verbose = boolOpt("verbose");
      base.silent = boolOpt("silent");
      const numOpt = (key) => {
        const m = toml.match(new RegExp(`^\\s*${key}\\s*=\\s*(\\d+)`, "m"));
        return m ? parseInt(m[1], 10) : 0;
      };
      base.minimumReleaseAge = numOpt("minimumReleaseAge");
      const excludesMatch = toml.match(/^\s*minimumReleaseAgeExcludes\s*=\s*\[([^\]]*)\]/m);
      if (excludesMatch) {
        base.minimumReleaseAgeExcludes = [...excludesMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
      }
      base.concurrentScripts = numOpt("concurrentScripts");
      base.networkConcurrency = numOpt("networkConcurrency");
      const cacheDirMatch = toml.match(/^\s*(?:cache\.)?dir\s*=\s*"([^"]+)"/m);
      if (cacheDirMatch && toml.includes("[install.cache]"))
        base.cacheDir = cacheDirMatch[1];
      const flatCacheDir = toml.match(/^\s*cache\.dir\s*=\s*"([^"]+)"/m);
      if (flatCacheDir)
        base.cacheDir = flatCacheDir[1];
      base.cacheDisabled = toml.includes("cache.disable = true") || toml.includes("[install.cache]") && boolOpt("disable");
      base.cacheDisableManifest = toml.includes("disableManifest = true");
      const globalDirVal = strOpt("globalDir");
      if (globalDirVal)
        base.globalDir = globalDirVal;
      const globalBinDirVal = strOpt("globalBinDir");
      if (globalBinDirVal)
        base.globalBinDir = globalBinDirVal;
      base.hasCa = /^\s*ca\s*=\s*/m.test(toml) || /^\s*cafile\s*=\s*/m.test(toml);
      const scannerMatch = toml.match(/^\s*(?:install\.)?(?:security[.\-])?scanner\s*=\s*"([^"]+)"/m);
      if (scannerMatch)
        base.installSecurityScanner = scannerMatch[1];
      const envRefs = new Set;
      for (const m of toml.matchAll(/\$\{?([A-Z_][A-Z0-9_]*)\??\}?/g)) {
        envRefs.add(m[1]);
      }
      base.bunfigEnvRefs = [...envRefs].sort();
      const section = (name) => {
        const re = new RegExp(`^\\[${name.replace(/\./g, "\\.")}\\]\\s*\\n([\\s\\S]*?)(?=^\\[|$)`, "m");
        return re.exec(toml)?.[1] ?? null;
      };
      const lockfileBlock = section("install.lockfile");
      if (lockfileBlock) {
        if (/^\s*save\s*=\s*false/m.test(lockfileBlock))
          base.lockfileSave = false;
        const printMatch = lockfileBlock.match(/^\s*print\s*=\s*"([^"]+)"/m);
        if (printMatch)
          base.lockfilePrint = printMatch[1];
      }
      const runBlock = section("run");
      if (runBlock) {
        const shellMatch = runBlock.match(/^\s*shell\s*=\s*"([^"]+)"/m);
        if (shellMatch)
          base.runShell = shellMatch[1];
        if (/^\s*bun\s*=\s*true/m.test(runBlock))
          base.runBun = true;
        if (/^\s*silent\s*=\s*true/m.test(runBlock))
          base.runSilent = true;
      }
      const debugBlock = section("debug");
      if (debugBlock) {
        const editorMatch = debugBlock.match(/^\s*editor\s*=\s*"([^"]+)"/m);
        if (editorMatch)
          base.debugEditor = editorMatch[1];
      }
    } catch {}
  }
  profMark("bunfig");
  if (base.registry === "-" && pkg) {
    const reg = pkg.publishConfig?.registry;
    if (reg)
      base.registry = reg.replace(/^https?:\/\//, "");
  }
  const npmrcFile = Bun.file(`${dir}/.npmrc`);
  if (await npmrcFile.exists()) {
    base.hasNpmrc = true;
    try {
      const content = await npmrcFile.text();
      const isEnvLinked = content.includes("${FW_REGISTRY_TOKEN?}");
      base.resilient = isEnvLinked;
      if (isEnvLinked) {
        base.authReady = !!Bun.env.FW_REGISTRY_TOKEN;
      } else {
        base.authReady = content.includes("_authToken");
      }
    } catch {}
  }
  profMark("npmrc");
  const binEntries = await readdir(`${dir}/bin`).catch(() => null);
  base.hasBinDir = binEntries !== null && binEntries.length > 0;
  profMark("bin");
  return base;
}
var IPCToWorkerSchema = exports_external.discriminatedUnion("type", [
  exports_external.object({ type: exports_external.literal("scan"), id: exports_external.number(), dir: exports_external.string() }),
  exports_external.object({ type: exports_external.literal("shutdown") })
]);
var IPCFromWorkerSchema = exports_external.discriminatedUnion("type", [
  exports_external.object({ type: exports_external.literal("ready") }),
  exports_external.object({ type: exports_external.literal("result"), id: exports_external.number(), data: ProjectInfoSchema }),
  exports_external.object({ type: exports_external.literal("error"), id: exports_external.number(), error: exports_external.string() })
]);
async function scanProjectsViaIPC(dirs) {
  const cpuCount = availableParallelism();
  const poolSize = Math.min(cpuCount, dirs.length, 8);
  const workerPath = Bun.fileURLToPath(new URL("./scan-worker.ts", import.meta.url));
  const results = new Map;
  let nextIdx = 0;
  return new Promise((resolve, reject) => {
    const workers = [];
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        cleanup();
        reject(new Error("IPC worker pool timed out after 30s"));
      }
    }, 30000);
    function cleanup() {
      clearTimeout(timer);
      process.removeListener("SIGINT", sigHandler);
      for (const w of workers) {
        try {
          w.kill();
        } catch {}
      }
    }
    function finish() {
      if (settled)
        return;
      settled = true;
      cleanup();
      resolve(dirs.map((_, i) => results.get(i)));
    }
    function dispatch(worker) {
      if (nextIdx < dirs.length) {
        const id = nextIdx++;
        worker.send({ type: "scan", id, dir: dirs[id] });
      } else {
        worker.send({ type: "shutdown" });
      }
    }
    function handleMessage(worker, msg) {
      if (settled)
        return;
      if (msg.type === "ready") {
        dispatch(worker);
      } else if (msg.type === "result") {
        const validated = ProjectInfoSchema.parse(msg.data);
        results.set(msg.id, validated);
        if (results.size === dirs.length)
          finish();
        else
          dispatch(worker);
      } else if (msg.type === "error") {
        const failedId = msg.id;
        scanProject(dirs[failedId]).then((data) => {
          results.set(failedId, data);
          if (results.size === dirs.length)
            finish();
          else
            dispatch(worker);
        }).catch(() => {
          if (!settled) {
            settled = true;
            cleanup();
            reject(new Error(`Failed to scan ${dirs[failedId]}`));
          }
        });
      }
    }
    for (let i = 0;i < poolSize; i++) {
      const worker = Bun.spawn(["bun", workerPath], {
        stdio: ["ignore", "ignore", "ignore"],
        ipc(message) {
          try {
            handleMessage(worker, IPCFromWorkerSchema.parse(message));
          } catch {
            if (!settled) {
              settled = true;
              cleanup();
              reject(new Error("IPC worker sent invalid message"));
            }
          }
        }
      });
      workers.push(worker);
    }
    const sigHandler = () => {
      if (!settled) {
        settled = true;
        cleanup();
      }
      process.exit(130);
    };
    process.on("SIGINT", sigHandler);
  });
}
var BOOL_FIELDS = new Set([
  "bunfig",
  "workspace",
  "authReady",
  "hasNpmrc",
  "hasBinDir",
  "hasPkg",
  "scoped",
  "resilient",
  "frozenLockfile",
  "production",
  "exact",
  "saveTextLockfile",
  "cacheDisabled",
  "linkWorkspacePackages"
]);
var _globCache = new Map;
function matchFilter(p, pattern) {
  const cleaned = pattern.replace(/^\\!/, "!");
  const negated = cleaned.startsWith("!");
  const field = negated ? cleaned.slice(1) : cleaned;
  if (BOOL_FIELDS.has(field)) {
    const val = field === "scoped" ? p.scopes.length > 0 : !!p[field];
    return negated ? !val : val;
  }
  let glob = _globCache.get(pattern);
  if (!glob) {
    glob = new Bun.Glob(pattern);
    _globCache.set(pattern, glob);
  }
  return glob.match(p.folder) || glob.match(p.name);
}
function inspectProject(p) {
  const line = (label, value) => console.log(`  ${c.cyan(label.padEnd(16))} ${value}`);
  console.log();
  console.log(c.bold(c.magenta(`  \u256D\u2500 ${p.name} \u2500\u256E`)));
  console.log();
  line("Folder", p.folder);
  line("Name", p.name);
  line("Version", p.version);
  line("Description", p.description);
  line("Author", p.author);
  line("License", p.license);
  console.log();
  line("Dependencies", p.deps);
  line("DevDeps", p.devDeps);
  line("Total Deps", p.totalDeps);
  line("Scripts", p.scriptsCount);
  console.log();
  line("Engine (bun)", p.engine);
  line("Lock File", p.lock);
  line("Bunfig", p.bunfig ? c.green("yes") : c.dim("no"));
  line("Workspace", p.workspace ? c.green("yes") : c.dim("no"));
  const envReg = Bun.env.BUN_CONFIG_REGISTRY;
  if (envReg) {
    const envDisplay = envReg.replace(/^https?:\/\//, "");
    line("Registry", `${envDisplay} ${c.dim("(BUN_CONFIG_REGISTRY override)")}`);
    if (p.registry !== "-" && p.registry !== envDisplay)
      line("", c.dim(`bunfig/pkg: ${p.registry} (shadowed)`));
  } else {
    line("Registry", p.registry !== "-" ? p.registry : c.dim("default"));
  }
  line("Scopes", p.scopes.length ? c.green(p.scopes.join(", ")) : c.dim("none"));
  line(".npmrc", p.hasNpmrc ? c.green("yes") : c.dim("no"));
  line("Auth Ready", p.authReady ? c.green("YES") : c.dim("no"));
  line("Resilient", p.resilient ? c.green("YES") : c.dim("no"));
  for (const tkn of BUN_KEYCHAIN_TOKEN_NAMES) {
    const src = tokenSource(tkn);
    const colored = src === "env" ? c.green(src) : src === "keychain" ? c.cyan(src) : c.yellow(src);
    line(`  ${tkn}`, colored);
  }
  line("bin/", p.hasBinDir ? c.green("yes") : c.dim("no"));
  line("Has pkg.json", p.hasPkg ? c.green("yes") : c.red("no"));
  line("TZ", p.projectTz === "UTC" ? c.dim("UTC (default)") : c.cyan(p.projectTz));
  line("DNS TTL", p.projectDnsTtl !== "-" ? c.cyan(`${p.projectDnsTtl}s`) : c.yellow("not set (--fix \u2192 5s)"));
  console.log();
  line("Bin", p.bin.length ? p.bin.join(", ") : c.dim("none"));
  line("Key Deps", p.keyDeps.length ? p.keyDeps.join(", ") : c.dim("none"));
  line("Peer Deps", p.peerDeps.length ? p.peerDeps.join(", ") : c.dim("none"));
  if (p.peerDepsMeta.length) {
    line("  Optional", p.peerDepsMeta.join(", "));
  }
  if (p.bunfig) {
    console.log();
    console.log(`  ${c.bold(c.cyan("bunfig [install]"))}`);
    console.log();
    line("Auto", p.installAuto !== "-" ? !VALID_AUTO.has(p.installAuto) ? c.red(`${p.installAuto} (invalid)`) : p.installAuto === "disable" ? c.yellow(p.installAuto) : p.installAuto === "force" ? c.cyan(p.installAuto) : p.installAuto : c.dim("auto (default)"));
    line("Frozen Lock", p.frozenLockfile ? c.green("yes") : c.dim("no"));
    line("Dry Run", p.dryRun ? c.yellow("yes") : c.dim("no"));
    line("Production", p.production ? c.yellow("yes") : c.dim("no"));
    line("Exact", p.exact ? c.green("yes") : c.dim("no"));
    const eff = effectiveLinker(p);
    line("Linker", p.linker !== "-" ? p.linker : c.dim("not set"));
    line("configVersion", p.configVersion >= 0 ? String(p.configVersion) : c.dim(p.lock === "bun.lockb" ? "binary" : "none"));
    line("Effective", `${eff.strategy === "isolated" ? c.cyan(eff.strategy) : eff.strategy} ${c.dim(`(${eff.source})`)}`);
    const defaultBackend = process.platform === "darwin" ? "clonefile" : "hardlink";
    line("Backend", p.backend !== "-" ? p.backend : c.dim(`default (${defaultBackend})`));
    line("Release Age", p.minimumReleaseAge > 0 ? `${p.minimumReleaseAge}s (${(p.minimumReleaseAge / 86400).toFixed(1)}d)` : c.dim("none"));
    if (p.minimumReleaseAgeExcludes.length) {
      line("  Excludes", p.minimumReleaseAgeExcludes.join(", "));
    }
    line("Text Lock", p.saveTextLockfile ? c.green("yes") : c.dim("no"));
    line("Optional", p.installOptional ? c.green("yes (default)") : c.yellow("disabled"));
    line("Dev", p.installDev ? c.green("yes (default)") : c.yellow("disabled"));
    line("Peer", p.installPeer ? c.green("yes (default)") : c.yellow("disabled"));
    line("Link WS Pkgs", p.linkWorkspacePackages ? c.green("yes") : c.dim("no"));
    line("Cache", p.cacheDisabled ? c.yellow("disabled") : p.cacheDir !== "-" ? p.cacheDir : c.dim("default"));
    if (p.cacheDisableManifest)
      line("  Manifest", c.yellow("disabled (always resolve latest)"));
    if (p.globalDir !== "-")
      line("Global Dir", p.globalDir);
    if (p.globalBinDir !== "-")
      line("Global Bin", p.globalBinDir);
    if (p.hasCa)
      line("CA/TLS", c.green("configured"));
    if (!p.lockfileSave)
      line("Lockfile", c.yellow("save disabled"));
    if (p.lockfilePrint !== "-")
      line("Lock Print", p.lockfilePrint);
    line("No Verify", p.noVerify ? c.red("yes") : c.dim("no"));
    line("Logging", p.verbose ? c.yellow("verbose (lifecycle scripts visible)") : p.silent ? c.dim("silent") : c.dim("default"));
    const cpuCount = availableParallelism();
    const defaultScriptConc = cpuCount > 0 ? cpuCount * 2 : "cpu\xD72";
    line("Scripts Conc.", p.concurrentScripts > 0 ? String(p.concurrentScripts) : c.dim(`default (${defaultScriptConc})`));
    line("Network Conc.", p.networkConcurrency > 0 ? String(p.networkConcurrency) : c.dim("default (48)"));
    const hasCross = p.targetCpu !== "-" || p.targetOs !== "-";
    if (hasCross) {
      const cpuDisplay = p.targetCpu !== "-" ? VALID_CPU.has(p.targetCpu) ? p.targetCpu : c.red(`${p.targetCpu} (invalid)`) : process.arch;
      const osDisplay = p.targetOs !== "-" ? VALID_OS.has(p.targetOs) ? p.targetOs : c.red(`${p.targetOs} (invalid)`) : process.platform;
      line("Target", `${cpuDisplay}/${osDisplay} ${c.yellow("(cross-platform)")}`);
    } else {
      line("Target", c.dim(`${process.arch}/${process.platform} (native)`));
    }
    line("Security", p.installSecurityScanner !== "-" ? p.installSecurityScanner : c.dim("none"));
    line("Lifecycle", p.trustedDeps.length === 0 ? c.green("BLOCKED (default-secure)") : c.yellow(`${p.trustedDeps.length} trusted`));
    if (p.trustedDeps.length > 0)
      line("Trusted Deps", p.trustedDeps.join(", "));
    const hasRun = p.runShell !== "-" || p.runBun || p.runSilent;
    if (hasRun) {
      console.log();
      console.log(c.bold("  bunfig [run]"));
      console.log();
      if (p.runShell !== "-")
        line("Shell", p.runShell);
      if (p.runBun)
        line("Bun Alias", c.green("yes (node \u2192 bun)"));
      if (p.runSilent)
        line("Silent", c.dim("yes"));
    }
    if (p.debugEditor !== "-") {
      console.log();
      console.log(c.bold("  bunfig [debug]"));
      console.log();
      line("Editor", p.debugEditor);
    }
  }
  const overrideKeys = Object.keys(p.overrides);
  const resolutionKeys = Object.keys(p.resolutions);
  const hasOverrides = overrideKeys.length > 0 || resolutionKeys.length > 0;
  if (hasOverrides) {
    console.log();
    console.log(`  ${c.bold(c.cyan("Dependency Overrides"))}`);
    console.log();
    const printEntries = (label, entries) => {
      const keys = Object.keys(entries);
      line(label, `${c.yellow(String(keys.length))} mapping(s)`);
      for (const [k, v] of Object.entries(entries)) {
        const risk = classifyOverrideValue(v);
        const flag = risk ? ` ${c.red(`[${risk}]`)}` : "";
        console.log(`      ${c.dim("\u2022")} ${k} ${c.dim("\u2192")} ${v}${flag}`);
      }
    };
    if (overrideKeys.length > 0)
      printEntries("overrides", p.overrides);
    if (resolutionKeys.length > 0)
      printEntries("resolutions", p.resolutions);
  }
  console.log();
}
function renderTable(projects, detail, tokenStatusByFolder) {
  const columnDefs = BUN_SCANNER_COLUMNS.PROJECT_SCAN;
  const columnValueMap = {
    idx: (_p, i) => i,
    status: (p) => {
      const tokenStatus = tokenStatusByFolder?.get(p.folder) ?? "missing";
      const svc = projectTokenService(p);
      return formatStatusCell(statusFromToken(tokenStatus), svc);
    },
    folder: (p) => p.folder,
    name: (p) => p.name,
    version: (p) => p.version,
    configVersion: (p) => p.configVersion,
    bunVersion: (p) => p.engine,
    lockfile: (p) => p.lock,
    registry: (p) => p.registry !== "-" ? p.registry : "-",
    token: (p) => tokenStatusByFolder?.get(p.folder) ?? "-",
    workspaces: (p) => p.workspacesList.length ? p.workspacesList.join(", ") : "-",
    hasTests: (p) => p.hasTests ? "yes" : "-",
    workspace: (p) => p.workspace ? "yes" : "-",
    linker: (p) => {
      const eff = effectiveLinker(p);
      return eff.source === "bunfig" ? eff.strategy : `${eff.strategy} (default)`;
    },
    trustedDeps: (p) => p.trustedDeps.length ? p.trustedDeps.join(", ") : "-",
    nativeDeps: (p) => p.nativeDeps.length ? p.nativeDeps.join(", ") : "-",
    scripts: (p) => p.scriptsCount || "-",
    envVars: (p) => p.bunfigEnvRefs.length ? p.bunfigEnvRefs.join(", ") : "-"
  };
  const rows = projects.map((p, idx) => {
    const row = {};
    for (const col of columnDefs) {
      const fn = columnValueMap[col.key];
      row[col.header] = fn ? fn(p, idx) : "-";
    }
    if (detail) {
      row["Author"] = p.author;
      row["License"] = p.license;
      row["Description"] = p.description.length > 40 ? p.description.slice(0, 37) + "..." : p.description;
    }
    return row;
  });
  const headers = columnDefs.map((col) => col.header);
  if (detail)
    headers.push("Author", "License", "Description");
  console.log(Bun.inspect.table(rows, headers, { colors: _useColor }));
}
function renderMatrix(rows, columns) {
  console.log(Bun.inspect.table(rows, columns.map((c2) => c2.header), { colors: _useColor }));
}
function sectionHeader(title) {
  console.log();
  console.log(`  ${c.bold(c.cyan(title))}${c.dim("  " + fmtStamp())}`);
}
var VALID_SORT_KEYS = new Set(["name", "totalDeps", "deps", "version", "lock"]);
function sortProjects(projects, key) {
  const sorted = [...projects];
  switch (key) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "totalDeps":
    case "deps":
      return sorted.sort((a, b) => b.totalDeps - a.totalDeps);
    case "version":
      return sorted.sort((a, b) => {
        if (a.version === "-")
          return 1;
        if (b.version === "-")
          return -1;
        return semverCompare(a.version, b.version);
      });
    case "lock":
      return sorted.sort((a, b) => a.lock.localeCompare(b.lock));
    default: {
      const _exhaustive = key;
      console.error(c.yellow(`Unknown sort key: ${_exhaustive}. Using default order.`));
      return sorted;
    }
  }
}
function getMissing(p) {
  if (!p.hasPkg)
    return [];
  const missing = [];
  if (p.author === "-")
    missing.push("author");
  if (p.license === "-")
    missing.push("license");
  if (p.description === "-")
    missing.push("description");
  if (p.version === "-")
    missing.push("version");
  if (p.engine === "-")
    missing.push("engine");
  return missing;
}
async function renderAudit(projects) {
  const withPkg = projects.filter((p) => p.hasPkg);
  const withoutPkg = projects.filter((p) => !p.hasPkg);
  if (withPkg.length === 0) {
    sectionHeader("Metadata Audit");
    console.log();
    console.log(c.yellow("  No projects with package.json found."));
    if (withoutPkg.length > 0) {
      console.log();
      console.log(c.dim(`  ${withoutPkg.length} directories without package.json: ${withoutPkg.map((p) => p.folder).join(", ")}`));
    }
    console.log();
    return;
  }
  const totals = {};
  for (const f of AUDIT_FIELDS)
    totals[f] = 0;
  const issues = [];
  for (const p of withPkg) {
    const missing = getMissing(p);
    for (const f of missing)
      totals[f]++;
    if (missing.length > 0) {
      issues.push({
        name: p.name,
        folder: p.folder,
        missing: missing.map((f) => c.red(f)).join(", ")
      });
    }
  }
  sectionHeader("Metadata Audit");
  console.log();
  sectionHeader(`Field Coverage (${withPkg.length} projects)`);
  console.log();
  for (const f of AUDIT_FIELDS) {
    const present = withPkg.length - totals[f];
    const pct = (present / withPkg.length * 100).toFixed(0);
    const bar = present === withPkg.length ? c.green("OK") : c.yellow(`${totals[f]} missing`);
    console.log(`    ${c.cyan(f.padEnd(14))} ${String(present).padStart(2)}/${withPkg.length}  (${pct}%)  ${bar}`);
  }
  const BUN_ENV_VARS = [
    { key: "BUN_PLATFORM_HOME", desc: "scan root" },
    { key: "BUN_CONFIG_REGISTRY", desc: "overrides all bunfig.toml [install] registry" },
    { key: "BUN_CONFIG_TOKEN", desc: "auth token (currently unused by Bun)" },
    { key: "BUN_CONFIG_FROZEN_LOCKFILE", desc: "refuse lockfile updates on mismatch" },
    { key: "BUN_CONFIG_SAVE_TEXT_LOCKFILE", desc: "text-based bun.lock (v1.2+)" },
    { key: "BUN_CONFIG_SKIP_SAVE_LOCKFILE", desc: "lockfile saving", offLabel: "ON" },
    { key: "BUN_CONFIG_SKIP_LOAD_LOCKFILE", desc: "lockfile loading", offLabel: "ON" },
    { key: "BUN_CONFIG_SKIP_INSTALL_PACKAGES", desc: "package installs", offLabel: "ON" },
    { key: "BUN_CONFIG_YARN_LOCKFILE", desc: "yarn.lock compat" },
    { key: "BUN_CONFIG_LINK_NATIVE_BINS", desc: "platform-specific bin linking" },
    { key: "BUN_CONFIG_DRY_RUN", desc: "simulate install (no changes)" },
    { key: "BUN_CONFIG_DISABLE_CACHE", desc: "disable global cache reads" },
    { key: "BUN_CONFIG_MINIMUM_RELEASE_AGE", desc: "min package version age (seconds)" },
    { key: "BUN_INSTALL_CACHE_DIR", desc: "custom cache directory" },
    { key: "BUN_INSTALL_GLOBAL_DIR", desc: "global packages directory" },
    { key: "BUN_INSTALL_BIN", desc: "global binaries directory" },
    { key: "BUN_FEATURE_FLAG_DISABLE_IGNORE_SCRIPTS", desc: "lifecycle scripts blocked", offLabel: "BLOCKED" },
    { key: "BUN_FEATURE_FLAG_DISABLE_NATIVE_DEPENDENCY_LINKER", desc: "native bin linking", offLabel: "ON" },
    { key: "TZ", desc: "runtime timezone (bun test forces UTC)", recommend: "UTC" },
    { key: "NODE_TLS_REJECT_UNAUTHORIZED", desc: "SSL cert validation (0 = INSECURE)" },
    { key: "BUN_CONFIG_MAX_HTTP_REQUESTS", desc: "max concurrent HTTP requests (default 256)" },
    { key: "BUN_CONFIG_VERBOSE_FETCH", desc: "log fetch requests (curl | true | false)", recommend: "curl" },
    { key: "BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS", desc: "DNS cache TTL in seconds (default 30)", recommend: "5" },
    {
      key: "BUN_CONFIG_NETWORK_CONCURRENCY",
      desc: "parallel HTTP requests during install (default 48)",
      recommend: "256"
    },
    {
      key: "BUN_CONFIG_CONCURRENT_SCRIPTS",
      desc: "parallel lifecycle script execution (default cpu\xD72)",
      recommend: "16"
    },
    { key: "BUN_OPTIONS", desc: "prepend CLI args to every bun invocation" },
    {
      key: "BUN_RUNTIME_TRANSPILER_CACHE_PATH",
      desc: 'transpiler cache dir ("" or "0" = disabled)',
      recommend: "${BUN_PLATFORM_HOME}/.bun-cache"
    },
    { key: "TMPDIR", desc: "temp directory for bundler intermediates" },
    { key: "NO_COLOR", desc: "ANSI color output", offLabel: "ON" },
    { key: "FORCE_COLOR", desc: "force ANSI color (overrides NO_COLOR)" },
    { key: "BUN_CONFIG_NO_CLEAR_TERMINAL_ON_RELOAD", desc: "keep console on --watch reload" },
    { key: "DO_NOT_TRACK", desc: "disable crash reports & telemetry", recommend: "1" }
  ];
  sectionHeader("Global Overrides");
  console.log();
  const PAD = 42;
  for (const { key, desc, offLabel, recommend } of BUN_ENV_VARS) {
    const val = Bun.env[key];
    if (offLabel) {
      const flag = classifyEnvFlag(val, offLabel);
      const display = flag.state === "inactive" ? c.green(flag.label) : flag.state === "active" ? c.yellow(flag.label) : c.dim(flag.label);
      console.log(`    ${c.cyan(key.padEnd(PAD))} ${display}  ${c.dim(desc)}`);
    } else if (val) {
      const valColor = key === "NODE_TLS_REJECT_UNAUTHORIZED" && val === "0" ? c.red : c.green;
      console.log(`    ${c.cyan(key.padEnd(PAD))} ${valColor(val)}  ${c.dim(desc)}`);
    } else if (recommend) {
      console.log(`    ${c.cyan(key.padEnd(PAD))} ${c.yellow("not set")}  ${c.dim(desc)}  ${c.yellow(`-> recommend ${key}=${recommend}`)}`);
    } else {
      console.log(`    ${c.cyan(key.padEnd(PAD))} ${c.dim("not set")}  ${c.dim(desc)}`);
    }
  }
  sectionHeader("DNS Cache");
  console.log();
  const dnsStats = dns.getCacheStats();
  const dnsRows = [
    { Stat: "cacheHitsCompleted", Value: dnsStats.cacheHitsCompleted, Description: "resolved from cache" },
    { Stat: "cacheHitsInflight", Value: dnsStats.cacheHitsInflight, Description: "deduplicated in-flight" },
    { Stat: "cacheMisses", Value: dnsStats.cacheMisses, Description: "fresh lookups" },
    { Stat: "size", Value: dnsStats.size, Description: "entries cached now" },
    { Stat: "errors", Value: dnsStats.errors, Description: "failed lookups" },
    { Stat: "totalCount", Value: dnsStats.totalCount, Description: "total requests" }
  ];
  console.log(Bun.inspect.table(dnsRows, { colors: _useColor }));
  const hitRate = dnsStats.totalCount > 0 ? ((dnsStats.cacheHitsCompleted + dnsStats.cacheHitsInflight) / dnsStats.totalCount * 100).toFixed(0) : null;
  if (dnsStats.errors > 0) {
    console.log(`    ${c.red("\u26A0")} ${c.red(`${dnsStats.errors} DNS error(s)`)} \u2014 check connectivity or registry URLs`);
  }
  if (hitRate !== null && Number(hitRate) < 50 && dnsStats.totalCount >= 5) {
    console.log(`    ${c.yellow("\u2192")} hit rate ${c.yellow(hitRate + "%")} \u2014 use ${c.cyan("dns.prefetch(host, port)")} for known hosts`);
  }
  console.log(`    ${c.dim("Tip: use dns.prefetch(host, 443) for known registry domains at startup.")}`);
  console.log(`    ${c.dim("Run --fix-dns to auto-generate dns-prefetch.ts across all projects.")}`);
  console.log(`    ${c.dim("Monitor: bun install --verbose shows DNS prefetch activity in real time.")}`);
  const prefetchChecks = await Promise.all(withPkg.map(async (p) => Bun.file(`${projectDir(p)}/dns-prefetch.ts`).exists()));
  const prefetchCount = prefetchChecks.filter(Boolean).length;
  const prefetchPct = (prefetchCount / withPkg.length * 100).toFixed(0);
  const prefetchBar = prefetchCount === withPkg.length ? c.green("OK") : prefetchCount === 0 ? c.yellow(`0/${withPkg.length}`) : c.yellow(`${prefetchCount}/${withPkg.length}`);
  console.log(`    ${c.cyan("dns-prefetch".padEnd(14))} ${String(prefetchCount).padStart(2)}/${withPkg.length}  (${prefetchPct}%)  ${prefetchBar}  ${c.dim("dns-prefetch.ts present (run --fix-dns)")}`);
  sectionHeader("Infrastructure Readiness");
  const withNpmrc = withPkg.filter((p) => p.hasNpmrc).length;
  const withAuth = withPkg.filter((p) => p.authReady).length;
  const withScopes = withPkg.filter((p) => p.scopes.length > 0).length;
  const withResilient = withPkg.filter((p) => p.resilient).length;
  const withBinDir = withPkg.filter((p) => p.hasBinDir).length;
  const infra = [
    { label: ".npmrc", count: withNpmrc, desc: "connected to registry" },
    { label: "auth token", count: withAuth, desc: "publish-ready" },
    { label: "resilient", count: withResilient, desc: "\\${VAR?} graceful undefined" },
    { label: "scoped", count: withScopes, desc: "[install.scopes] configured" },
    { label: "bin/", count: withBinDir, desc: "custom tools" }
  ];
  const defaultSecure = withPkg.filter((p) => p.trustedDeps.length === 0).length;
  const withTrusted = withPkg.length - defaultSecure;
  const arrayStats = {
    trustedDeps: withPkg.reduce((sum, p) => sum + p.trustedDeps.length, 0),
    nativeDeps: withPkg.reduce((sum, p) => sum + p.nativeDeps.length, 0),
    scopes: withPkg.reduce((sum, p) => sum + p.scopes.length, 0)
  };
  const infraRows = infra.map(({ label, count, desc }) => {
    const pct = (count / withPkg.length * 100).toFixed(0);
    const status = count === withPkg.length ? "OK" : count === 0 ? `${count}/${withPkg.length}` : `${count}/${withPkg.length}`;
    return { Field: label, Count: `${count}/${withPkg.length}`, "%": `${pct}%`, Status: status, Description: desc };
  });
  infraRows.push({ Field: "trustedDeps", Count: String(arrayStats.trustedDeps), "%": "", Status: "", Description: "total across all projects" }, { Field: "nativeDeps", Count: String(arrayStats.nativeDeps), "%": "", Status: "", Description: "detected" }, { Field: "scopes", Count: String(arrayStats.scopes), "%": "", Status: "", Description: "total scope registrations" });
  renderMatrix(infraRows, BUN_SCANNER_COLUMNS.INFRA_READINESS);
  sectionHeader("Token Sources");
  const tokenRows = BUN_KEYCHAIN_TOKEN_NAMES.map((tkn) => {
    const src = tokenSource(tkn);
    const hint = src === "not set" ? `(--store-token ${tkn})` : "";
    return { Token: tkn, Source: src, Hint: hint };
  });
  console.log(Bun.inspect.table(tokenRows, ["Token", "Source", "Hint"], { colors: _useColor }));
  const withOverrides = withPkg.filter((p) => Object.keys(p.overrides).length > 0);
  const withResolutions = withPkg.filter((p) => Object.keys(p.resolutions).length > 0);
  const totalOverrideCount = withOverrides.reduce((n, p) => n + Object.keys(p.overrides).length, 0);
  const totalResolutionCount = withResolutions.reduce((n, p) => n + Object.keys(p.resolutions).length, 0);
  if (withOverrides.length > 0 || withResolutions.length > 0) {
    sectionHeader("Dependency Overrides");
    console.log();
    if (withOverrides.length > 0) {
      console.log(`    ${c.cyan("overrides".padEnd(14))} ${c.yellow(String(withOverrides.length))} project(s), ${totalOverrideCount} pinned metadependencies`);
      for (const p of withOverrides) {
        const mappings = Object.entries(p.overrides).map(([k, v]) => `${k} -> ${v}`).join(", ");
        console.log(`      ${c.dim("\u2022")} ${p.folder.padEnd(28)} ${c.dim(mappings)}`);
      }
    }
    if (withResolutions.length > 0) {
      console.log(`    ${c.cyan("resolutions".padEnd(14))} ${c.yellow(String(withResolutions.length))} project(s), ${totalResolutionCount} pinned metadependencies`);
      for (const p of withResolutions) {
        const mappings = Object.entries(p.resolutions).map(([k, v]) => `${k} -> ${v}`).join(", ");
        console.log(`      ${c.dim("\u2022")} ${p.folder.padEnd(28)} ${c.dim(mappings)}`);
      }
    }
    const suspicious = [];
    for (const p of [...withOverrides, ...withResolutions]) {
      const allEntries = { ...p.overrides, ...p.resolutions };
      for (const [k, v] of Object.entries(allEntries)) {
        const risk = classifyOverrideValue(v);
        if (risk)
          suspicious.push({ folder: p.folder, pkg: k, value: v, risk });
      }
    }
    if (suspicious.length > 0) {
      console.log();
      console.log(`    ${c.red("Suspicious overrides:")} ${c.yellow(String(suspicious.length))} detected`);
      for (const s of suspicious) {
        console.log(`      ${c.red("!")} ${s.folder.padEnd(28)} ${s.pkg} -> ${s.value} ${c.red(`[${s.risk}]`)}`);
      }
    }
  }
  const withPeers = withPkg.filter((p) => p.peerDeps.length > 0);
  const withOptionalPeers = withPkg.filter((p) => p.peerDepsMeta.length > 0);
  const totalPeerCount = withPeers.reduce((n, p) => n + p.peerDeps.length, 0);
  const totalOptionalCount = withOptionalPeers.reduce((n, p) => n + p.peerDepsMeta.length, 0);
  if (withPeers.length > 0) {
    sectionHeader("Peer Dependencies");
    console.log();
    console.log(`    ${c.cyan("declared".padEnd(14))} ${c.green(String(withPeers.length))} project(s), ${totalPeerCount} peer(s) total`);
    for (const p of withPeers) {
      const optionals = new Set(p.peerDepsMeta);
      const labels = p.peerDeps.map((d) => optionals.has(d) ? `${d} ${c.dim("(optional)")}` : d);
      console.log(`      ${c.dim("\u2022")} ${p.folder.padEnd(28)} ${c.dim(labels.join(", "))}`);
    }
    if (totalOptionalCount > 0) {
      console.log(`    ${c.cyan("optional".padEnd(14))} ${totalOptionalCount} peer(s) marked optional via peerDependenciesMeta`);
    }
  }
  {
    const tzGroups = new Map;
    for (const p of withPkg) {
      const list = tzGroups.get(p.projectTz) ?? [];
      list.push(p.folder);
      tzGroups.set(p.projectTz, list);
    }
    sectionHeader("Project Timezones (.env TZ)");
    console.log();
    for (const [tz, folders] of [...tzGroups.entries()].sort((a, b) => b[1].length - a[1].length)) {
      const label = tz === "UTC" ? `${tz} (default)` : tz;
      console.log(`    ${c.cyan(label.padEnd(24))} ${folders.length} project(s)`);
    }
  }
  {
    const withDnsTtl = withPkg.filter((p) => p.projectDnsTtl !== "-");
    const withoutDnsTtl = withPkg.length - withDnsTtl.length;
    const ttlGroups = new Map;
    for (const p of withDnsTtl) {
      const list = ttlGroups.get(p.projectDnsTtl) ?? [];
      list.push(p.folder);
      ttlGroups.set(p.projectDnsTtl, list);
    }
    sectionHeader("DNS Cache TTL");
    console.log();
    for (const [ttl, folders] of [...ttlGroups.entries()].sort((a, b) => Number(a) - Number(b))) {
      console.log(`    ${c.cyan(`${ttl}s`.padEnd(24))} ${folders.length} project(s)  ${c.dim(folders.join(", "))}`);
    }
    if (withoutDnsTtl > 0) {
      console.log(`    ${c.yellow("not set".padEnd(24))} ${withoutDnsTtl} project(s)  ${c.dim("--fix \u2192 5s")}`);
    }
  }
  sectionHeader("Lifecycle Security");
  const envOverride = isFeatureFlagActive(Bun.env.BUN_FEATURE_FLAG_DISABLE_IGNORE_SCRIPTS);
  const hookTotals = {};
  for (const h of LIFECYCLE_HOOKS)
    hookTotals[h] = { found: 0, trusted: 0, blocked: 0, nativeDetected: 0, nativeTrusted: 0 };
  const xrefData = [];
  for (const p of withPkg) {
    const nmDir = `${projectDir(p)}/node_modules`;
    let entries = [];
    try {
      entries = await readdir(nmDir);
    } catch {
      continue;
    }
    const trusted = new Set(p.trustedDeps);
    const xref = { folder: p.folder, bunDefault: [], explicit: [], blocked: [], lockHash: p.lockHash };
    const xrefSeen = new Set;
    const classifyPkg = (pkgName, scripts) => {
      const scriptValues = Object.values(scripts).join(" ");
      const isNative = isNativeMatch(pkgName) || isNativeMatch(scriptValues);
      let hasAnyHook = false;
      for (const h of LIFECYCLE_HOOKS) {
        if (scripts[h]) {
          hasAnyHook = true;
          hookTotals[h].found++;
          if (trusted.has(pkgName))
            hookTotals[h].trusted++;
          else
            hookTotals[h].blocked++;
          if (isNative) {
            hookTotals[h].nativeDetected++;
            if (trusted.has(pkgName))
              hookTotals[h].nativeTrusted++;
          }
        }
      }
      if (hasAnyHook && !xrefSeen.has(pkgName)) {
        xrefSeen.add(pkgName);
        if (BUN_DEFAULT_TRUSTED.has(pkgName))
          xref.bunDefault.push(pkgName);
        else if (trusted.has(pkgName))
          xref.explicit.push(pkgName);
        else
          xref.blocked.push(pkgName);
      }
    };
    const reads = [];
    for (const entry of entries) {
      if (entry.startsWith("@")) {
        let scoped = [];
        try {
          scoped = await readdir(`${nmDir}/${entry}`);
        } catch {
          continue;
        }
        for (const sub of scoped)
          reads.push([`${entry}/${sub}`, `${nmDir}/${entry}/${sub}/package.json`]);
      } else {
        reads.push([entry, `${nmDir}/${entry}/package.json`]);
      }
    }
    await Promise.all(reads.map(async ([name, path]) => {
      try {
        const pkg = await Bun.file(path).json();
        classifyPkg(name, pkg.scripts ?? {});
      } catch {}
    }));
    xrefData.push(xref);
  }
  const HOOK_AVG_MS = {
    preinstall: 500,
    postinstall: 2500,
    preuninstall: 300,
    prepare: 1000,
    preprepare: 300,
    postprepare: 300,
    prepublishOnly: 500
  };
  const HOOK_META = {
    preinstall: {
      owner: (t) => t.found === 0 ? "System Default" : t.found <= 3 ? "clawdbot" : `Power ${withTrusted}`,
      action: (t) => t.found === 0 ? "No action" : `Keep trusted; add engine verify: "preinstall": "bun --version" (${t.nativeDetected} native)`
    },
    postinstall: {
      owner: (t) => t.found === 0 ? "System Default" : `Power ${withTrusted}`,
      action: (t) => {
        if (t.found === 0)
          return "No action";
        if (t.blocked > 0)
          return `Scan with --fix-trusted; block in CI. ${t.nativeDetected} native (${t.nativeTrusted} trusted, ${t.nativeDetected - t.nativeTrusted} uncovered)`;
        return "Verified \u2014 audit with bun pm ls --all periodically";
      }
    },
    preuninstall: {
      owner: () => "System Default",
      action: (t) => t.found === 0 ? 'No action; add "preuninstall": "rm -rf temp/" if temp dirs present' : "Review cleanup scripts"
    },
    prepare: {
      owner: (t) => t.found === 0 ? "System Default" : `Power ${withTrusted}`,
      action: (t) => t.found === 0 ? "No action" : t.blocked > 0 ? `${t.blocked} blocked \u2014 review for build steps` : "Verified"
    },
    preprepare: {
      owner: () => "System Default",
      action: (t) => t.found === 0 ? "No action" : "Review pre-prepare hooks"
    },
    postprepare: {
      owner: () => "System Default",
      action: (t) => t.found === 0 ? "No action" : "Review post-prepare hooks"
    },
    prepublishOnly: {
      owner: () => "R2 Auditor",
      action: (t) => t.found === 0 ? 'Implement audit gate: "prepublishOnly": "bun scan.ts --audit"' : t.blocked > 0 ? `${t.blocked} consumer-side hooks blocked (expected)` : "Verified"
    }
  };
  const hookRows = [];
  if (envOverride) {
    hookRows.push({
      Hook: "default",
      Total: "-",
      Trust: "-",
      Block: "-",
      Secure: "-",
      Saved: "-",
      Risk: "High",
      Status: "OPEN",
      Native: "-",
      "Cov%": "-",
      Owner: "OVERRIDE",
      Action: "WARNING: DISABLE_IGNORE_SCRIPTS is set \u2014 all lifecycle scripts run globally"
    });
  } else {
    hookRows.push({
      Hook: "default",
      Total: "-",
      Trust: "-",
      Block: "-",
      Secure: "100%",
      Saved: "-",
      Risk: "Min",
      Status: "Blocked",
      Native: "-",
      "Cov%": "-",
      Owner: "Bun Runtime",
      Action: "Default-secure: all lifecycle scripts blocked unless in trustedDependencies"
    });
  }
  let totalTimeSaved = 0;
  for (const h of LIFECYCLE_HOOKS) {
    const { found, trusted, blocked, nativeDetected, nativeTrusted } = hookTotals[h];
    const pctSecure = found === 0 ? "100%" : trusted === found ? "100%" : `${(trusted / found * 100).toFixed(0)}%`;
    const savedMs = blocked * HOOK_AVG_MS[h];
    totalTimeSaved += savedMs;
    const savedStr = savedMs === 0 ? "-" : savedMs >= 60000 ? `${(savedMs / 60000).toFixed(1)}m` : `${(savedMs / 1000).toFixed(1)}s`;
    const riskRaw = found === 0 ? "Min" : blocked > 0 && trusted > 0 ? "Med" : blocked === 0 && trusted > 0 ? "Low" : blocked === found ? "Low" : "Min";
    const statusRaw = found === 0 && h === "prepublishOnly" ? "Ready" : found === 0 ? "Inactive" : blocked > 0 ? "Restricted" : trusted === found ? "Verified" : "Inactive";
    const nativeCovRaw = nativeDetected === 0 ? "-" : nativeTrusted === nativeDetected ? "100%" : `${(nativeTrusted / nativeDetected * 100).toFixed(0)}%`;
    const meta3 = HOOK_META[h];
    hookRows.push({
      Hook: h,
      Total: found,
      Trust: trusted,
      Block: blocked,
      Secure: pctSecure,
      Saved: savedStr,
      Risk: riskRaw,
      Status: statusRaw,
      Native: nativeDetected === 0 ? "-" : nativeDetected,
      "Cov%": nativeCovRaw,
      Owner: meta3.owner(hookTotals[h]),
      Action: meta3.action(hookTotals[h])
    });
  }
  const totalSavedStr = totalTimeSaved >= 60000 ? `${(totalTimeSaved / 60000).toFixed(1)}m` : `${(totalTimeSaved / 1000).toFixed(1)}s`;
  const allFound = LIFECYCLE_HOOKS.reduce((s, h) => s + hookTotals[h].found, 0);
  const allBlocked = LIFECYCLE_HOOKS.reduce((s, h) => s + hookTotals[h].blocked, 0);
  const allTrusted = LIFECYCLE_HOOKS.reduce((s, h) => s + hookTotals[h].trusted, 0);
  const allNative = LIFECYCLE_HOOKS.reduce((s, h) => s + hookTotals[h].nativeDetected, 0);
  const allNativeTrusted = LIFECYCLE_HOOKS.reduce((s, h) => s + hookTotals[h].nativeTrusted, 0);
  const totalPct = allFound === 0 ? "100%" : `${(allTrusted / allFound * 100).toFixed(0)}%`;
  const totalNativeCov = allNative === 0 ? "-" : `${(allNativeTrusted / allNative * 100).toFixed(0)}%`;
  hookRows.push({
    Hook: "total",
    Total: allFound,
    Trust: allTrusted,
    Block: allBlocked,
    Secure: totalPct,
    Saved: totalSavedStr,
    Risk: "",
    Status: "",
    Native: allNative,
    "Cov%": totalNativeCov,
    Owner: "100% managed",
    Action: ""
  });
  renderMatrix(hookRows, BUN_SCANNER_COLUMNS.LIFECYCLE_HOOKS);
  console.log();
  console.log(`    ${c.cyan("locked down".padEnd(14))} ${String(defaultSecure).padStart(2)}/${withPkg.length}  ${defaultSecure === withPkg.length ? c.green("OK") : c.green(`${defaultSecure}`)}  ${c.dim("no trustedDependencies \u2014 all scripts blocked")}`);
  if (withTrusted > 0) {
    console.log(`    ${c.cyan("explicit trust".padEnd(14))} ${String(withTrusted).padStart(2)}/${withPkg.length}  ${c.yellow(`${withTrusted}`)}  ${c.dim("trustedDependencies declared \u2014 scripts allowed for listed packages")}`);
    const trustedProjects = withPkg.filter((p) => p.trustedDeps.length > 0);
    for (const p of trustedProjects) {
      console.log(`      ${c.dim("\u2022")} ${p.folder.padEnd(28)} ${c.dim(p.trustedDeps.join(", "))}`);
    }
  }
  const xrefWithScripts = xrefData.filter((x) => x.bunDefault.length + x.explicit.length + x.blocked.length > 0);
  if (xrefWithScripts.length > 0) {
    const totalBunDefault = xrefWithScripts.reduce((s, x) => s + x.bunDefault.length, 0);
    const prevSnapshot = await loadXrefSnapshot(flags["audit-compare"] ?? undefined);
    const prevMap = new Map;
    if (prevSnapshot) {
      for (const p of prevSnapshot.projects)
        prevMap.set(p.folder, p);
    }
    const hasDelta = prevSnapshot !== null;
    const formatDelta = (cur, prev) => {
      if (prev === undefined)
        return c.cyan("new".padStart(5));
      const diff = cur - prev;
      if (diff > 0)
        return c.green(`+${diff}`.padStart(5));
      if (diff < 0)
        return c.red(`${diff}`.padStart(5));
      return c.dim("=".padStart(5));
    };
    console.log();
    console.log(c.bold(`  Bun default trust cross-reference (${BUN_DEFAULT_TRUSTED.size} known packages):`));
    console.log();
    const deltaHeader = hasDelta ? `  ${"\u0394 Def".padStart(5)}  ${"\u0394 Exp".padStart(5)}  ${"\u0394 Blk".padStart(5)}` : "";
    console.log(`    ${"Project".padEnd(30)} ${"Default".padStart(7)}  ${"Explicit".padStart(8)}  ${"Blocked".padStart(7)}${deltaHeader}  Packages`);
    for (const x of xrefWithScripts) {
      const parts = [];
      if (x.bunDefault.length > 0)
        parts.push(x.bunDefault.join(", "));
      if (x.explicit.length > 0)
        parts.push(x.explicit.join(", "));
      if (x.blocked.length > 0)
        parts.push(c.yellow(x.blocked.join(", ")));
      const defColor = x.bunDefault.length > 0 ? c.dim : (s) => s;
      const expColor = x.explicit.length > 0 ? c.cyan : (s) => s;
      let deltaCols = "";
      if (hasDelta) {
        const prev = prevMap.get(x.folder);
        deltaCols = `  ${formatDelta(x.bunDefault.length, prev?.bunDefault.length)}  ${formatDelta(x.explicit.length, prev?.explicit.length)}  ${formatDelta(x.blocked.length, prev?.blocked.length)}`;
      }
      console.log(`    ${x.folder.padEnd(30)} ${defColor(String(x.bunDefault.length).padStart(7))}  ${expColor(String(x.explicit.length).padStart(8))}  ${(x.blocked.length > 0 ? c.yellow : (s) => s)(String(x.blocked.length).padStart(7))}${deltaCols}   ${parts.join(c.dim(" | "))}`);
    }
    console.log();
    console.log(`  Summary: ${c.bold(String(totalBunDefault))} packages auto-trusted by Bun defaults across ${xrefData.length} projects`);
    if (prevSnapshot) {
      const currentFolders = new Set(xrefWithScripts.map((x) => x.folder));
      const prevFolders = new Set(prevSnapshot.projects.map((p) => p.folder));
      const newProjects = xrefWithScripts.filter((x) => !prevFolders.has(x.folder));
      const removedProjects = prevSnapshot.projects.filter((p) => !currentFolders.has(p.folder));
      const changedProjects = [];
      const unchangedCount = { value: 0 };
      for (const x of xrefWithScripts) {
        const prev = prevMap.get(x.folder);
        if (!prev)
          continue;
        const diffs = [];
        const dDef = x.bunDefault.length - prev.bunDefault.length;
        const dExp = x.explicit.length - prev.explicit.length;
        const dBlk = x.blocked.length - prev.blocked.length;
        if (dDef !== 0)
          diffs.push(`default ${dDef > 0 ? "+" : ""}${dDef}`);
        if (dExp !== 0)
          diffs.push(`explicit ${dExp > 0 ? "+" : ""}${dExp}`);
        if (dBlk !== 0)
          diffs.push(`blocked ${dBlk > 0 ? "+" : ""}${dBlk}`);
        if (diffs.length > 0)
          changedProjects.push(`${x.folder} (${diffs.join(", ")})`);
        else
          unchangedCount.value++;
      }
      console.log();
      console.log(c.bold(`  Cross-reference delta (vs ${prevSnapshot.date ?? prevSnapshot.timestamp}${prevSnapshot.tz ? ` ${prevSnapshot.tz}` : ""}):`));
      console.log(`    ${"New projects:".padEnd(18)} ${c.cyan(String(newProjects.length))}${newProjects.length > 0 ? "   " + newProjects.map((x) => x.folder).join(", ") : ""}`);
      console.log(`    ${"Removed:".padEnd(18)} ${removedProjects.length > 0 ? c.red(String(removedProjects.length)) : c.dim(String(removedProjects.length))}${removedProjects.length > 0 ? "   " + removedProjects.map((p) => p.folder).join(", ") : ""}`);
      console.log(`    ${"Changed:".padEnd(18)} ${changedProjects.length > 0 ? c.yellow(String(changedProjects.length)) : c.dim(String(changedProjects.length))}${changedProjects.length > 0 ? "   " + changedProjects.join(", ") : ""}`);
      console.log(`    ${"Unchanged:".padEnd(18)} ${c.dim(String(unchangedCount.value))}`);
    }
    if (!flags.compare && !flags["no-auto-snapshot"]) {
      await saveXrefSnapshot(xrefWithScripts, withPkg.length);
    }
    if (flags.snapshot) {
      console.log();
      console.log(`  Snapshot saved to .audit/xref-snapshot.json (${xrefWithScripts.length} projects)`);
      return;
    }
  }
  const home = Bun.env.HOME ?? Bun.env.USERPROFILE ?? "";
  const xdg = Bun.env.XDG_CONFIG_HOME;
  const globalBunfigPath = xdg ? `${xdg}/.bunfig.toml` : `${home}/.bunfig.toml`;
  const globalBunfigFile = Bun.file(globalBunfigPath);
  const hasGlobalBunfig = await globalBunfigFile.exists();
  sectionHeader("Global bunfig");
  console.log();
  if (hasGlobalBunfig) {
    try {
      const gToml = await globalBunfigFile.text();
      console.log(`    ${c.cyan("path".padEnd(20))} ${c.green(globalBunfigPath)}`);
      const gReg = gToml.match(/^\s*registry\s*=\s*"([^"]+)"/m);
      if (gReg)
        console.log(`    ${c.cyan("registry".padEnd(20))} ${gReg[1]}`);
      const gLinker = gToml.match(/^\s*linker\s*=\s*"([^"]+)"/m);
      if (gLinker)
        console.log(`    ${c.cyan("linker".padEnd(20))} ${gLinker[1]}`);
      const gFrozen = gToml.match(/^\s*frozenLockfile\s*=\s*(true|false)/m);
      if (gFrozen)
        console.log(`    ${c.cyan("frozenLockfile".padEnd(20))} ${gFrozen[1]}`);
      const gAge = gToml.match(/^\s*minimumReleaseAge\s*=\s*(\d+)/m);
      if (gAge)
        console.log(`    ${c.cyan("minimumReleaseAge".padEnd(20))} ${gAge[1]}s (${(parseInt(gAge[1]) / 86400).toFixed(1)}d)`);
      const gCache = gToml.match(/^\s*cache\.dir\s*=\s*"([^"]+)"/m) ?? gToml.match(/\[install\.cache\][\s\S]*?dir\s*=\s*"([^"]+)"/m);
      if (gCache)
        console.log(`    ${c.cyan("cache.dir".padEnd(20))} ${gCache[1]}`);
      console.log(`    ${c.dim("(shallow-merged under local bunfig.toml)")}`);
    } catch {
      console.log(`    ${c.yellow(globalBunfigPath)} ${c.red("(unreadable)")}`);
    }
  } else {
    console.log(`    ${c.dim("~/.bunfig.toml not found")}`);
  }
  const withBunfig = withPkg.filter((p) => p.bunfig);
  sectionHeader(`bunfig Coverage (${withBunfig.length} projects)`);
  const installStats = [
    {
      label: "auto",
      count: withBunfig.filter((p) => p.installAuto !== "-").length,
      desc: "install.auto (auto|force|disable|fallback)"
    },
    {
      label: "frozenLockfile",
      count: withBunfig.filter((p) => p.frozenLockfile).length,
      desc: "CI-safe lockfile enforcement"
    },
    { label: "dryRun", count: withBunfig.filter((p) => p.dryRun).length, desc: "install.dryRun (no actual install)" },
    { label: "production", count: withBunfig.filter((p) => p.production).length, desc: "skip devDependencies" },
    { label: "exact", count: withBunfig.filter((p) => p.exact).length, desc: "pin exact versions (no ^/~)" },
    { label: "linker", count: withBunfig.filter((p) => p.linker !== "-").length, desc: "explicit linker strategy" },
    { label: "backend", count: withBunfig.filter((p) => p.backend !== "-").length, desc: "explicit fs backend" },
    {
      label: "minimumReleaseAge",
      count: withBunfig.filter((p) => p.minimumReleaseAge > 0).length,
      desc: "supply-chain age gate (seconds)"
    },
    {
      label: "  Excludes",
      count: withBunfig.filter((p) => p.minimumReleaseAgeExcludes.length > 0).length,
      desc: "minimumReleaseAgeExcludes"
    },
    { label: "saveTextLock", count: withBunfig.filter((p) => p.saveTextLockfile).length, desc: "text-based bun.lock" },
    { label: "linkWsPkgs", count: withBunfig.filter((p) => p.linkWorkspacePackages).length, desc: "workspace linking" },
    { label: "cacheDisabled", count: withBunfig.filter((p) => p.cacheDisabled).length, desc: "global cache bypassed" },
    { label: "cacheDir", count: withBunfig.filter((p) => p.cacheDir !== "-").length, desc: "custom cache path" },
    {
      label: "  disableManifest",
      count: withBunfig.filter((p) => p.cacheDisableManifest).length,
      desc: "always resolve latest from registry"
    },
    {
      label: "globalDir",
      count: withBunfig.filter((p) => p.globalDir !== "-").length,
      desc: "custom global install dir"
    },
    {
      label: "globalBinDir",
      count: withBunfig.filter((p) => p.globalBinDir !== "-").length,
      desc: "custom global bin dir"
    },
    { label: "ca/cafile", count: withBunfig.filter((p) => p.hasCa).length, desc: "CA certificate configured" },
    {
      label: "lockfile.save",
      count: withBunfig.filter((p) => !p.lockfileSave).length,
      desc: "lockfile generation disabled"
    },
    {
      label: "lockfile.print",
      count: withBunfig.filter((p) => p.lockfilePrint !== "-").length,
      desc: "non-Bun lockfile output (yarn)"
    },
    { label: "noVerify", count: withBunfig.filter((p) => p.noVerify).length, desc: "skip integrity verification" },
    {
      label: "verbose",
      count: withBunfig.filter((p) => p.verbose).length,
      desc: "debug logging (lifecycle scripts visible)"
    },
    { label: "silent", count: withBunfig.filter((p) => p.silent).length, desc: "no logging" },
    {
      label: "concurrentScripts",
      count: withBunfig.filter((p) => p.concurrentScripts > 0).length,
      desc: "custom lifecycle concurrency (default cpu\xD72)"
    },
    {
      label: "networkConc.",
      count: withBunfig.filter((p) => p.networkConcurrency > 0).length,
      desc: "custom network concurrency (default 48)"
    },
    {
      label: "targetCpu",
      count: withBunfig.filter((p) => p.targetCpu !== "-").length,
      desc: "cross-platform cpu override"
    },
    {
      label: "targetOs",
      count: withBunfig.filter((p) => p.targetOs !== "-").length,
      desc: "cross-platform os override"
    },
    {
      label: "security.scanner",
      count: withBunfig.filter((p) => p.installSecurityScanner !== "-").length,
      desc: "install.security.scanner"
    },
    {
      label: "trustedDeps",
      count: withBunfig.filter((p) => p.trustedDeps.length > 0).length,
      desc: "lifecycle scripts allowed"
    },
    {
      label: "optional",
      count: withBunfig.filter((p) => !p.installOptional).length,
      desc: "optional deps disabled (default: on)"
    },
    { label: "dev", count: withBunfig.filter((p) => !p.installDev).length, desc: "dev deps disabled (default: on)" },
    {
      label: "peer",
      count: withBunfig.filter((p) => !p.installPeer).length,
      desc: "peer auto-install disabled (default: on)"
    }
  ];
  const withRunShell = withBunfig.filter((p) => p.runShell !== "-");
  const withRunBun = withBunfig.filter((p) => p.runBun);
  const withRunSilent = withBunfig.filter((p) => p.runSilent);
  const hasAnyRun = withRunShell.length > 0 || withRunBun.length > 0 || withRunSilent.length > 0;
  if (hasAnyRun) {
    installStats.push({ label: "[run] shell", count: withRunShell.length, desc: 'run.shell ("system" | "bun")' }, { label: "[run] bun", count: withRunBun.length, desc: "run.bun (node \u2192 bun alias)" }, { label: "[run] silent", count: withRunSilent.length, desc: "run.silent (suppress command output)" });
  }
  const bunfigRows = installStats.map((s) => ({
    Setting: s.label,
    Count: `${s.count}/${withBunfig.length}`,
    Description: s.desc
  }));
  renderMatrix(bunfigRows, BUN_SCANNER_COLUMNS.BUNFIG_COVERAGE);
  const withDebugEditor = withBunfig.filter((p) => p.debugEditor !== "-");
  if (withDebugEditor.length > 0) {
    sectionHeader("bunfig [debug] Coverage");
    console.log();
    const display = c.green(`${withDebugEditor.length}/${withBunfig.length}`);
    console.log(`    ${c.cyan("editor".padEnd(18))} ${display}  ${c.dim("debug.editor (Bun.openInEditor)")}`);
  }
  const crossProjects = withBunfig.filter((p) => p.targetCpu !== "-" || p.targetOs !== "-");
  if (crossProjects.length > 0) {
    console.log();
    console.log(c.bold(`  Cross-platform targets (${crossProjects.length} project(s)):`));
    console.log(`    ${c.dim(`cpu: ${[...VALID_CPU].join(", ")}`)}`);
    console.log(`    ${c.dim(`os:  ${[...VALID_OS].join(", ")}`)}`);
    console.log();
    for (const p of crossProjects) {
      const cpuOk = p.targetCpu === "-" || VALID_CPU.has(p.targetCpu);
      const osOk = p.targetOs === "-" || VALID_OS.has(p.targetOs);
      const cpuStr = p.targetCpu !== "-" ? cpuOk ? p.targetCpu : c.red(p.targetCpu) : c.dim("native");
      const osStr = p.targetOs !== "-" ? osOk ? p.targetOs : c.red(p.targetOs) : c.dim("native");
      const status = cpuOk && osOk ? c.green("OK") : c.red("INVALID");
      console.log(`    ${p.folder.padEnd(28)} ${cpuStr}/${osStr}  ${status}`);
    }
  }
  const withLock = withPkg.filter((p) => p.lock !== "none");
  if (withLock.length > 0) {
    console.log();
    console.log(c.bold(`  Linker strategy (${withLock.length} projects with lockfile):`));
    console.log();
    console.log(`    ${c.dim("configVersion")}  ${c.dim("Workspaces?")}  ${c.dim("Default Linker")}`);
    console.log(`    ${c.cyan("0")}              ${c.dim("any")}          hoisted ${c.dim("(backward compat)")}`);
    console.log(`    ${c.cyan("1")}              no           hoisted`);
    console.log(`    ${c.cyan("1")}              yes          ${c.cyan("isolated")}`);
    console.log();
    const cv0 = withLock.filter((p) => p.configVersion === 0).length;
    const cv1 = withLock.filter((p) => p.configVersion === 1).length;
    const cvUnknown = withLock.filter((p) => p.configVersion === -1).length;
    console.log(`    ${c.cyan("configVersion".padEnd(18))} ${c.dim("v0=")}${cv0}  ${c.dim("v1=")}${cv1}${cvUnknown > 0 ? `  ${c.dim("unknown=")}${cvUnknown}` : ""}`);
    const hoisted = withLock.filter((p) => effectiveLinker(p).strategy === "hoisted").length;
    const isolated = withLock.filter((p) => effectiveLinker(p).strategy === "isolated").length;
    console.log(`    ${c.cyan("effective".padEnd(18))} hoisted=${hoisted}  ${isolated > 0 ? c.cyan(`isolated=${isolated}`) : `isolated=${isolated}`}`);
    const explicit = withLock.filter((p) => p.linker !== "-").length;
    if (explicit > 0) {
      console.log(`    ${c.cyan("explicit bunfig".padEnd(18))} ${explicit} project(s) override configVersion default`);
    }
  }
  if (withoutPkg.length > 0) {
    console.log();
    console.log(c.dim(`  ${withoutPkg.length} directories without package.json: ${withoutPkg.map((p) => p.folder).join(", ")}`));
  }
  if (issues.length > 0) {
    console.log();
    console.log(c.bold("  Projects with missing fields:"));
    console.log();
    for (const row of issues) {
      console.log(`    ${c.yellow(row.folder.padEnd(30))} ${row.missing}`);
    }
  } else {
    console.log();
    console.log(c.green("  All projects have complete metadata!"));
  }
  console.log();
  const fixableMeta = withPkg.filter((p) => p.author === "-" || p.license === "-").length;
  const fixableInit = withoutPkg.length;
  const totalFixable = fixableMeta + fixableInit;
  if (totalFixable > 0) {
    const parts = [];
    if (fixableMeta > 0)
      parts.push(`patch ${fixableMeta} package.json(s)`);
    if (fixableInit > 0)
      parts.push(`init ${fixableInit} missing package.json(s) + bun install`);
    console.log(c.dim(`  Tip: run with --fix to ${parts.join(" & ")}`));
    console.log(c.dim(`       run with --fix --dry-run to preview changes first`));
    console.log();
  }
}
async function fixProjects(projects, dryRun) {
  const patchable = projects.filter((p) => p.hasPkg && (p.author === "-" || p.license === "-"));
  const initable = projects.filter((p) => !p.hasPkg);
  if (patchable.length === 0 && initable.length === 0) {
    console.log(c.green(`
  Nothing to fix \u2014 all projects have package.json with author + license.
`));
    return;
  }
  console.log();
  console.log(c.bold(c.cyan(`  ${dryRun ? "Dry Run" : "Fixing"}`)));
  console.log(c.dim(`  Defaults: author="${DEFAULTS.author}", license="${DEFAULTS.license}"`));
  if (patchable.length > 0) {
    console.log();
    console.log(c.bold(`  Patching ${patchable.length} existing package.json(s):`));
    console.log();
    let patched = 0;
    for (const p of patchable) {
      const pkgPath = `${projectDir(p)}/package.json`;
      try {
        const pkg = await Bun.file(pkgPath).json();
        const changes = [];
        if (!pkg.author) {
          pkg.author = DEFAULTS.author;
          changes.push("author");
        }
        if (!pkg.license) {
          pkg.license = DEFAULTS.license;
          changes.push("license");
        }
        if (changes.length === 0)
          continue;
        const label = changes.map((f) => c.green(`+${f}`)).join(" ");
        if (dryRun) {
          console.log(`    ${c.yellow("DRY")} ${p.folder.padEnd(30)} ${label}`);
        } else {
          await Bun.write(pkgPath, JSON.stringify(pkg, null, 2) + `
`);
          console.log(`    ${c.green("FIX")} ${p.folder.padEnd(30)} ${label}`);
          patched++;
        }
      } catch {
        console.log(`    ${c.red("ERR")} ${p.folder.padEnd(30)} could not read/write package.json`);
      }
    }
    if (!dryRun)
      console.log(c.dim(`
  Patched ${patched} file(s).`));
  }
  if (initable.length > 0) {
    console.log();
    console.log(c.bold(`  Initializing ${initable.length} project(s) without package.json:`));
    console.log();
    let inited = 0;
    for (const p of initable) {
      const dir = projectDir(p);
      const pkgPath = `${dir}/package.json`;
      const pkg = {
        name: p.folder,
        version: "0.1.0",
        author: DEFAULTS.author,
        license: DEFAULTS.license,
        description: ""
      };
      if (dryRun) {
        console.log(`    ${c.yellow("DRY")} ${p.folder.padEnd(30)} ${c.green("+package.json")} ${c.cyan("+bun install")}`);
        continue;
      }
      try {
        await Bun.write(pkgPath, JSON.stringify(pkg, null, 2) + `
`);
        console.log(`    ${c.green("NEW")} ${p.folder.padEnd(30)} ${c.green("+package.json")}`);
        const proc = Bun.spawn(["bun", "install"], { cwd: dir, stdout: "pipe", stderr: "pipe" });
        const exitCode = await proc.exited;
        if (exitCode === 0) {
          console.log(`    ${c.cyan("  \u21B3")} ${p.folder.padEnd(30)} ${c.cyan("bun install \u2713")}`);
        } else {
          const stderr = await proc.stderr.text();
          console.log(`    ${c.yellow("  \u21B3")} ${p.folder.padEnd(30)} bun install exited ${exitCode}: ${stderr.trim().split(`
`)[0]}`);
        }
        inited++;
      } catch (err) {
        console.log(`    ${c.red("ERR")} ${p.folder.padEnd(30)} ${err}`);
      }
    }
    if (!dryRun)
      console.log(c.dim(`
  Initialized ${inited} project(s).`));
  }
  console.log();
  if (dryRun) {
    console.log(c.dim(`  Run without --dry-run to apply changes.`));
    console.log();
  }
}
async function fixEngine(projects, dryRun) {
  const bunVersion = Bun.version;
  const target = `>=${bunVersion}`;
  const withPkg = projects.filter((p) => p.hasPkg);
  const needsFix = withPkg.filter((p) => p.engine !== target);
  if (needsFix.length === 0) {
    console.log(c.green(`
  All ${withPkg.length} projects already have engines.bun = "${target}".
`));
    return;
  }
  console.log();
  console.log(c.bold(c.cyan(`  ${dryRun ? "Dry Run" : "Unifying"} engines.bun \u2192 "${target}"`)));
  console.log(c.dim(`  ${needsFix.length}/${withPkg.length} projects need updating`));
  console.log();
  let updated = 0;
  for (const p of needsFix) {
    const pkgPath = `${projectDir(p)}/package.json`;
    try {
      const pkg = await Bun.file(pkgPath).json();
      const old = pkg.engines?.bun ?? "(none)";
      if (!pkg.engines)
        pkg.engines = {};
      pkg.engines.bun = target;
      const label = old === "(none)" ? c.green(`+engines.bun = "${target}"`) : `${c.dim(old)} \u2192 ${c.green(target)}`;
      if (dryRun) {
        console.log(`    ${c.yellow("DRY")} ${p.folder.padEnd(30)} ${label}`);
      } else {
        await Bun.write(pkgPath, JSON.stringify(pkg, null, 2) + `
`);
        console.log(`    ${c.green("FIX")} ${p.folder.padEnd(30)} ${label}`);
        updated++;
      }
    } catch {
      console.log(`    ${c.red("ERR")} ${p.folder.padEnd(30)} could not read/write package.json`);
    }
  }
  console.log();
  if (dryRun) {
    console.log(c.dim(`  Run without --dry-run to apply.`));
  } else {
    console.log(c.green(`  Updated ${updated} package.json file(s) to engines.bun = "${target}".`));
  }
  console.log();
}
async function fixDns(projects, dryRun) {
  const withPkg = projects.filter((p) => p.hasPkg);
  console.log();
  console.log(c.bold(c.cyan(`  ${dryRun ? "Dry Run:" : "Generating"} DNS prefetch snippets`)));
  console.log();
  const templatePath = `${PROJECTS_ROOT}/scanner/.env.template`;
  const templateFile = Bun.file(templatePath);
  const templateContent = await templateFile.exists() ? await templateFile.text() : "";
  if (!templateContent.includes("BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS")) {
    const dnsBlock = [
      "",
      "# DNS cache TTL \u2014 AWS recommends 5s for dynamic environments (Bun default: 30)",
      "# BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS=5"
    ].join(`
`);
    if (dryRun) {
      console.log(`  .env.template:`);
      console.log(`    ${c.yellow("DRY")}  BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS=5`);
    } else {
      await Bun.write(templatePath, templateContent.trimEnd() + `
` + dnsBlock + `
`);
      console.log(`  .env.template:`);
      console.log(`    ${c.green("FIX")}  BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS=5`);
    }
  } else {
    console.log(`  .env.template:`);
    console.log(c.dim(`    SKIP already contains BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS`));
  }
  console.log();
  let totalDomains = new Set;
  let generated = 0;
  let skipped = 0;
  for (const p of withPkg) {
    const dir = projectDir(p);
    const domains = new Set;
    const bunfigFile = Bun.file(`${dir}/bunfig.toml`);
    if (await bunfigFile.exists()) {
      try {
        const toml = await bunfigFile.text();
        const regMatch = toml.match(/registry\s*=\s*"([^"]+)"/);
        if (regMatch) {
          try {
            domains.add(new URL(regMatch[1]).hostname);
          } catch {}
        }
        for (const m of toml.matchAll(/url\s*=\s*"([^"]+)"/g)) {
          try {
            domains.add(new URL(m[1]).hostname);
          } catch {}
        }
      } catch {}
    }
    const npmrcFile = Bun.file(`${dir}/.npmrc`);
    if (await npmrcFile.exists()) {
      try {
        const npmrc = await npmrcFile.text();
        for (const m of npmrc.matchAll(/^registry\s*=\s*(.+)$/gm)) {
          try {
            domains.add(new URL(m[1].trim()).hostname);
          } catch {}
        }
        for (const m of npmrc.matchAll(/^@[^:\s]+:registry\s*=\s*(.+)$/gm)) {
          try {
            domains.add(new URL(m[1].trim()).hostname);
          } catch {}
        }
      } catch {}
    }
    const pkgFile = Bun.file(`${dir}/package.json`);
    if (await pkgFile.exists()) {
      try {
        const pkg = await pkgFile.json();
        const pubReg = pkg.publishConfig?.registry;
        if (pubReg) {
          try {
            domains.add(new URL(pubReg).hostname);
          } catch {}
        }
      } catch {}
    }
    domains.add("registry.npmjs.org");
    for (const d of domains)
      totalDomains.add(d);
    const sorted = [...domains].sort();
    const lines = [
      `// dns-prefetch.ts \u2014 auto-generated by scan.ts --fix-dns`,
      `// These domains are explicitly prefetched at runtime by Bun for lower latency`,
      `// Re-run: bun run ../scanner/scan.ts --fix-dns`,
      ``,
      `import { dns } from "bun";`,
      ``,
      ...sorted.map((d) => `dns.prefetch("${d}", 443);`),
      ``
    ].join(`
`);
    const prefetchPath = `${dir}/dns-prefetch.ts`;
    const prefetchFile = Bun.file(prefetchPath);
    const existing = await prefetchFile.exists() ? await prefetchFile.text() : null;
    if (existing === lines) {
      console.log(`    ${c.dim("SKIP")} ${p.folder.padEnd(32)} dns-prefetch.ts already up-to-date`);
      skipped++;
      continue;
    }
    const domainList = sorted.join(", ");
    if (dryRun) {
      console.log(`    ${c.yellow("DRY")}  ${p.folder.padEnd(32)} ${domainList}`);
    } else {
      await Bun.write(prefetchPath, lines);
      console.log(`    ${c.green("FIX")}  ${p.folder.padEnd(32)} ${domainList}`);
      generated++;
    }
  }
  console.log();
  if (dryRun) {
    console.log(c.dim(`  ${totalDomains.size} domain(s) detected across ${withPkg.length} projects.`));
    console.log(c.dim(`  Run without --dry-run to apply.`));
  } else {
    console.log(c.green(`  Generated ${generated} dns-prefetch.ts file(s). ${skipped} already up-to-date.`));
  }
  console.log();
}
async function fixScopes(projects, registryUrl, scopeNames, dryRun) {
  const url2 = (registryUrl.startsWith("http") ? registryUrl : `https://${registryUrl}`).replace(/\/+$/, "") + "/";
  const withPkg = projects.filter((p) => p.hasPkg);
  console.log();
  console.log(c.bold(c.cyan(`  ${dryRun ? "Dry Run" : "Configuring"} scoped registries \u2192 ${url2}`)));
  console.log(c.dim(`  Scopes: ${scopeNames.join(", ")}`));
  console.log(c.dim(`  ${withPkg.length} projects | token via $FW_REGISTRY_TOKEN`));
  console.log();
  const scopeLines = scopeNames.map((s) => `"${s}" = { token = "$FW_REGISTRY_TOKEN", url = "${url2}" }`).join(`
`);
  const scopeBlock = `[install.scopes]
${scopeLines}`;
  let updated = 0;
  let created = 0;
  for (const p of withPkg) {
    const dir = projectDir(p);
    const bunfigPath = `${dir}/bunfig.toml`;
    const bunfigFile = Bun.file(bunfigPath);
    const exists = await bunfigFile.exists();
    const changes = [];
    if (exists) {
      try {
        let toml = await bunfigFile.text();
        const hasScopes = toml.includes("[install.scopes]");
        if (hasScopes) {
          const missing = scopeNames.filter((s) => !toml.includes(`"${s}"`));
          if (missing.length === 0)
            continue;
          const insertLines = missing.map((s) => `"${s}" = { token = "$FW_REGISTRY_TOKEN", url = "${url2}" }`).join(`
`);
          toml = toml.replace(/(\[install\.scopes\]\s*\n)/, `$1${insertLines}
`);
          changes.push(`+scopes: ${c.green(missing.join(", "))}`);
        } else {
          toml = toml.trimEnd() + `

` + scopeBlock + `
`;
          changes.push(`+${c.green("[install.scopes]")}: ${scopeNames.join(", ")}`);
        }
        if (!dryRun) {
          await Bun.write(bunfigPath, toml);
          updated++;
        }
      } catch {
        changes.push(c.red("read/write error"));
      }
    } else {
      changes.push(`${c.green("+bunfig.toml")} with ${scopeNames.join(", ")}`);
      if (!dryRun) {
        await Bun.write(bunfigPath, scopeBlock + `
`);
        created++;
      }
    }
    if (changes.length > 0) {
      const tag = dryRun ? c.yellow("DRY") : c.green("FIX");
      console.log(`    ${tag} ${p.folder.padEnd(30)} ${changes.join("  ")}`);
    }
  }
  console.log();
  if (dryRun) {
    console.log(c.dim("  Run without --dry-run to apply."));
  } else {
    console.log(c.green(`  Updated ${updated} bunfig.toml(s), created ${created} new.`));
    console.log(c.dim(`  Set $FW_REGISTRY_TOKEN env var for auth.`));
  }
  console.log();
}
async function fixNpmrc(projects, registryUrl, scopeNames, dryRun) {
  const url2 = (registryUrl.startsWith("http") ? registryUrl : `https://${registryUrl}`).replace(/\/+$/, "") + "/";
  const display = url2.replace(/^https?:\/\//, "");
  const withPkg = projects.filter((p) => p.hasPkg);
  const scopeLines = scopeNames.map((s) => `${s}:registry=${url2}`).join(`
`);
  const template = [
    scopeLines,
    "",
    "always-auth=true",
    "",
    `//${display}:_authToken=\${FW_REGISTRY_TOKEN?}`,
    ""
  ].join(`
`);
  console.log();
  console.log(c.bold(c.cyan(`  ${dryRun ? "Dry Run" : "Rewriting"} .npmrc \u2192 v1.3.5+ scoped template`)));
  console.log(c.dim(`  Registry: ${url2}`));
  console.log(c.dim(`  Scopes: ${scopeNames.join(", ")}`));
  console.log(c.dim(`  Token: \${FW_REGISTRY_TOKEN?} (graceful undefined)`));
  console.log(c.dim(`  ${withPkg.length} projects`));
  console.log();
  let updated = 0;
  let created = 0;
  for (const p of withPkg) {
    const dir = projectDir(p);
    const npmrcPath = `${dir}/.npmrc`;
    const npmrcFile = Bun.file(npmrcPath);
    const exists = await npmrcFile.exists();
    let action;
    if (exists) {
      const current = await npmrcFile.text();
      if (current.includes("${FW_REGISTRY_TOKEN?}") && current.includes("always-auth")) {
        continue;
      }
      action = `${c.yellow("rewrite")} \u2192 scoped + \${FW_REGISTRY_TOKEN?}`;
      if (!dryRun) {
        await Bun.write(npmrcPath, template);
        updated++;
      }
    } else {
      action = `${c.green("+new")} scoped + \${FW_REGISTRY_TOKEN?}`;
      if (!dryRun) {
        await Bun.write(npmrcPath, template);
        created++;
      }
    }
    const tag = dryRun ? c.yellow("DRY") : c.green("FIX");
    console.log(`    ${tag} ${p.folder.padEnd(30)} ${action}`);
  }
  console.log();
  if (dryRun) {
    console.log(c.dim("  Run without --dry-run to apply."));
  } else {
    console.log(c.green(`  Rewrote ${updated}, created ${created} .npmrc file(s).`));
    console.log(c.dim(`  Set $FW_REGISTRY_TOKEN env var for auth.`));
  }
  console.log();
}
async function fixRegistry(projects, registryUrl, dryRun) {
  const url2 = (registryUrl.startsWith("http") ? registryUrl : `https://${registryUrl}`).replace(/\/+$/, "");
  const display = url2.replace(/^https?:\/\//, "");
  const withPkg = projects.filter((p) => p.hasPkg);
  console.log();
  console.log(c.bold(c.cyan(`  ${dryRun ? "Dry Run" : "Unifying"} registry \u2192 ${url2}`)));
  console.log(c.dim(`  ${withPkg.length} projects with package.json`));
  console.log(c.dim(`  Targets: bunfig.toml [install] + [publish], package.json publishConfig, .npmrc auth`));
  console.log();
  let updatedPkg = 0;
  let updatedBunfig = 0;
  let updatedNpmrc = 0;
  for (const p of withPkg) {
    const dir = projectDir(p);
    const changes = [];
    const pkgPath = `${dir}/package.json`;
    try {
      const pkg = await Bun.file(pkgPath).json();
      const oldReg = pkg.publishConfig?.registry;
      if (oldReg !== url2) {
        if (!pkg.publishConfig)
          pkg.publishConfig = {};
        pkg.publishConfig.registry = url2;
        const label = oldReg ? `${c.dim(oldReg.replace(/^https?:\/\//, ""))} \u2192 ${c.green(display)}` : c.green(`+publishConfig.registry`);
        changes.push(`pkg: ${label}`);
        if (!dryRun) {
          await Bun.write(pkgPath, JSON.stringify(pkg, null, 2) + `
`);
          updatedPkg++;
        }
      }
    } catch {
      changes.push(`pkg: ${c.red("read/write error")}`);
    }
    const bunfigPath = `${dir}/bunfig.toml`;
    const bunfigFile = Bun.file(bunfigPath);
    if (await bunfigFile.exists()) {
      try {
        let toml = await bunfigFile.text();
        let bunfigChanged = false;
        const installRegMatch = toml.match(/^(\s*registry\s*=\s*)"([^"]+)"/m);
        if (installRegMatch && installRegMatch[2] !== url2) {
          toml = toml.replace(/^(\s*registry\s*=\s*)"[^"]+"/m, `$1"${url2}"`);
          changes.push(`bunfig[install]: ${c.dim(installRegMatch[2].replace(/^https?:\/\//, ""))} \u2192 ${c.green(display)}`);
          bunfigChanged = true;
        } else if (!installRegMatch) {
          if (toml.includes("[install]")) {
            toml = toml.replace(/(\[install\]\s*\n)/, `$1registry = "${url2}"
`);
          } else {
            toml += `
[install]
registry = "${url2}"
`;
          }
          changes.push(`bunfig[install]: ${c.green("+registry")}`);
          bunfigChanged = true;
        }
        const publishSection = toml.match(/^\[publish\]\s*\n([\s\S]*?)(?=^\[|$)/m);
        const publishRegMatch = publishSection?.[1]?.match(/registry\s*=\s*"([^"]+)"/);
        if (publishSection && publishRegMatch && publishRegMatch[1] !== url2) {
          toml = toml.replace(/(\[publish\]\s*\n[\s\S]*?)registry\s*=\s*"[^"]+"/m, `$1registry = "${url2}"`);
          changes.push(`bunfig[publish]: ${c.dim(publishRegMatch[1].replace(/^https?:\/\//, ""))} \u2192 ${c.green(display)}`);
          bunfigChanged = true;
        } else if (!publishSection) {
          toml += `
[publish]
registry = "${url2}"
`;
          changes.push(`bunfig[publish]: ${c.green("+section")}`);
          bunfigChanged = true;
        } else if (publishSection && !publishRegMatch) {
          toml = toml.replace(/(\[publish\]\s*\n)/, `$1registry = "${url2}"
`);
          changes.push(`bunfig[publish]: ${c.green("+registry")}`);
          bunfigChanged = true;
        }
        if (bunfigChanged && !dryRun) {
          await Bun.write(bunfigPath, toml);
          updatedBunfig++;
        }
      } catch {
        changes.push(`bunfig: ${c.red("read/write error")}`);
      }
    }
    const npmrcPath = `${dir}/.npmrc`;
    const npmrcFile = Bun.file(npmrcPath);
    const authLine = `//${display}/:_authToken=\${REGISTRY_TOKEN}`;
    const npmrcExists = await npmrcFile.exists();
    if (npmrcExists) {
      try {
        const content = await npmrcFile.text();
        if (!content.includes(`//${display}/`)) {
          const updated = content.trimEnd() + `
` + authLine + `
`;
          changes.push(`.npmrc: ${c.green("+auth")}`);
          if (!dryRun) {
            await Bun.write(npmrcPath, updated);
            updatedNpmrc++;
          }
        }
      } catch {
        changes.push(`.npmrc: ${c.red("read/write error")}`);
      }
    } else {
      changes.push(`.npmrc: ${c.green("+new")}`);
      if (!dryRun) {
        await Bun.write(npmrcPath, authLine + `
`);
        updatedNpmrc++;
      }
    }
    if (changes.length > 0) {
      const tag = dryRun ? c.yellow("DRY") : c.green("FIX");
      console.log(`    ${tag} ${p.folder.padEnd(30)} ${changes.join("  ")}`);
    }
  }
  console.log();
  if (dryRun) {
    console.log(c.dim(`  Run without --dry-run to apply.`));
    console.log(c.dim(`  Set $REGISTRY_TOKEN env var for auth before publishing.`));
  } else {
    console.log(c.green(`  Updated ${updatedPkg} package.json(s), ${updatedBunfig} bunfig.toml(s), ${updatedNpmrc} .npmrc(s) \u2192 ${url2}`));
    console.log(c.dim(`  Set $REGISTRY_TOKEN env var, then: bun publish --dry-run (to verify)`));
  }
  console.log();
}
async function fixTrusted(projects, dryRun) {
  const withPkg = projects.filter((p) => p.hasPkg);
  console.log();
  console.log(c.bold(c.cyan(`  ${dryRun ? "Dry Run" : "Fixing"} trustedDependencies`)));
  console.log(c.dim(`  Scanning node_modules for native deps with lifecycle scripts`));
  console.log(c.dim(`  Heuristic: ${NATIVE_PATTERN.source}`));
  console.log();
  let totalUpdated = 0;
  let totalDetected = 0;
  for (const p of withPkg) {
    const dir = projectDir(p);
    const nmDir = `${dir}/node_modules`;
    let entries = [];
    try {
      entries = await readdir(nmDir);
    } catch {
      continue;
    }
    const existing = new Set(p.trustedDeps);
    const detected = [];
    const reads = [];
    for (const entry of entries) {
      if (entry.startsWith("@")) {
        let scoped = [];
        try {
          scoped = await readdir(`${nmDir}/${entry}`);
        } catch {
          continue;
        }
        for (const sub of scoped)
          reads.push([`${entry}/${sub}`, `${nmDir}/${entry}/${sub}/package.json`]);
      } else {
        reads.push([entry, `${nmDir}/${entry}/package.json`]);
      }
    }
    await Promise.all(reads.map(async ([pkgName, pkgJsonPath]) => {
      try {
        const pkg = await Bun.file(pkgJsonPath).json();
        const scripts = pkg.scripts ?? {};
        const hasLifecycle = LIFECYCLE_HOOKS.some((h) => !!scripts[h]);
        if (!hasLifecycle)
          return;
        const scriptValues = Object.values(scripts).join(" ");
        if (isNativeMatch(pkgName) || isNativeMatch(scriptValues)) {
          if (!existing.has(pkgName)) {
            detected.push(pkgName);
          }
        }
      } catch {}
    }));
    if (detected.length === 0)
      continue;
    totalDetected += detected.length;
    const merged = [...new Set([...p.trustedDeps, ...detected])].sort();
    if (dryRun) {
      console.log(`    ${c.yellow("DRY")} ${p.folder.padEnd(30)} +${detected.length} native: ${c.dim(detected.join(", "))}`);
    } else {
      const pkgPath = `${dir}/package.json`;
      try {
        const pkg = await Bun.file(pkgPath).json();
        pkg.trustedDependencies = merged;
        await Bun.write(pkgPath, JSON.stringify(pkg, null, 2) + `
`);
        console.log(`    ${c.green("FIX")} ${p.folder.padEnd(30)} +${detected.length} native: ${c.dim(detected.join(", "))}`);
        totalUpdated++;
      } catch {
        console.log(`    ${c.red("ERR")} ${p.folder.padEnd(30)} could not write package.json`);
      }
    }
  }
  console.log();
  if (totalDetected === 0) {
    console.log(c.green(`  No new native deps detected across ${withPkg.length} projects.`));
    console.log(c.dim(`  Existing trustedDependencies are up to date.`));
  } else if (dryRun) {
    console.log(c.dim(`  ${totalDetected} native dep(s) detected. Run without --dry-run to apply.`));
  } else {
    console.log(c.green(`  Updated ${totalUpdated} package.json(s) with ${totalDetected} native dep(s).`));
  }
  console.log();
}
async function whyAcrossProjects(projects, pkg, opts) {
  const withLock = projects.filter((p) => p.lock !== "none");
  const flagParts = [];
  if (opts.top)
    flagParts.push("--top");
  if (opts.depth)
    flagParts.push(`--depth ${opts.depth}`);
  const flagStr = flagParts.length > 0 ? ` ${flagParts.join(" ")}` : "";
  console.log();
  console.log(c.bold(c.cyan(`  bun why ${pkg}${flagStr}`)) + c.dim(` \u2014 scanning ${withLock.length} projects with lock files`));
  console.log();
  const hits = [];
  const whyResults = await Promise.all(withLock.map(async (p) => {
    const dir = projectDir(p);
    const args = ["bun", "why", pkg];
    if (opts.top)
      args.push("--top");
    if (opts.depth)
      args.push("--depth", opts.depth);
    const proc = Bun.spawn(args, { cwd: dir, stdout: "pipe", stderr: "pipe" });
    const exitCode = await proc.exited;
    const stdout = await proc.stdout.text();
    const trimmed = stdout.trim();
    if (exitCode !== 0 || trimmed.length === 0)
      return null;
    const lines = trimmed.split(`
`);
    const clean = lines.map(stripAnsi);
    const versions2 = [
      ...new Set(clean.filter((l) => /@\S+/.test(l) && !l.includes("(requires")).map((l) => l.match(/@(\S+)/)?.[1]).filter(Boolean))
    ];
    const isDirect = clean.some((l) => l.includes(p.name) && l.includes("(requires"));
    const hasOptionalPeer = clean.some((l) => /optional peer\s/.test(l));
    const hasDev = clean.some((l) => /(?:\u251C\u2500|\u2514\u2500)\s+dev\s/.test(l));
    const hasPeer = clean.some((l) => /(?:\u251C\u2500|\u2514\u2500)\s+peer\s/.test(l));
    const depType = isDirect ? hasDev ? "dev" : "direct" : hasOptionalPeer ? "optional" : hasPeer ? "peer" : hasDev ? "dev" : "transitive";
    const reqLine = clean.find((l) => l.includes("(requires"));
    let directBy = "-";
    if (reqLine) {
      const m = reqLine.match(/(?:\u251C\u2500|\u2514\u2500)\s+(?:(?:dev|peer|optional peer)\s+)?(.+?)(?:@|\s*\()/);
      if (m)
        directBy = m[1].trim();
    }
    return { folder: p.folder, versions: versions2, depType, directBy, lines };
  }));
  for (const r of whyResults) {
    if (!r)
      continue;
    hits.push({ folder: r.folder, versions: r.versions, depType: r.depType, directBy: r.directBy });
    console.log(c.bold(c.green(`  \u250C\u2500 ${r.folder}`)));
    for (const line of r.lines) {
      console.log(c.dim("  \u2502 ") + line);
    }
    console.log(c.dim("  \u2514\u2500"));
    console.log();
  }
  if (hits.length === 0) {
    console.log(c.yellow(`  "${pkg}" not found in any project.`));
    console.log();
    return;
  }
  console.log(c.bold("  Summary"));
  console.log();
  console.log(`    ${c.cyan("Project".padEnd(32))} ${"Version".padEnd(16)} ${"Type".padEnd(12)} Required By`);
  for (const h of hits) {
    const typeColor = h.depType === "direct" ? c.green : h.depType === "dev" ? c.magenta : h.depType === "peer" ? c.yellow : h.depType === "optional" ? c.cyan : c.dim;
    const verStr = h.versions.length <= 2 ? h.versions.join(", ") : `${h.versions[0]} +${h.versions.length - 1}`;
    console.log(`    ${h.folder.padEnd(32)} ${verStr.padEnd(16)} ${typeColor(h.depType.padEnd(12))} ${c.dim(h.directBy)}`);
  }
  console.log();
  const allVersions = [...new Set(hits.flatMap((h) => h.versions))].sort();
  if (allVersions.length > 1) {
    console.log(c.dim(`  ${allVersions.length} versions in use: ${allVersions.join(", ")}`));
  }
  console.log(c.dim(`  Found in ${hits.length} project(s).`));
  console.log();
}
async function outdatedAcrossProjects(projects, opts) {
  const candidates = opts.catalog || opts.wf?.length ? projects.filter((p) => p.workspace && p.lock !== "none") : projects.filter((p) => p.lock !== "none");
  const parts = [];
  if (opts.catalog)
    parts.push("-r");
  if (opts.wf?.length)
    parts.push(opts.wf.map((w) => `--filter '${w}'`).join(" "));
  if (opts.filter?.length)
    parts.push(opts.filter.join(" "));
  if (opts.production)
    parts.push("--production");
  if (opts.omit)
    parts.push(`--omit ${opts.omit}`);
  if (opts.global)
    parts.push("--global");
  const flagStr = parts.length > 0 ? ` ${parts.join(" ")}` : "";
  console.log();
  console.log(c.bold(c.cyan("  bun outdated")) + (flagStr ? c.yellow(flagStr) : "") + c.dim(` \u2014 checking ${candidates.length} project(s)`));
  console.log();
  const hits = [];
  let projectsWithOutdated = 0;
  const outdatedResults = await Promise.all(candidates.map(async (p) => {
    const dir = projectDir(p);
    const wfList = opts.wf?.length ? opts.wf : [undefined];
    let pkgs = [];
    for (const wf of wfList) {
      const args = ["bun", "outdated", ...opts.filter ?? []];
      if (opts.catalog)
        args.push("-r");
      if (wf)
        args.push("--filter", wf);
      if (opts.global)
        args.push("--global");
      const proc = Bun.spawn(args, { cwd: dir, stdout: "pipe", stderr: "pipe" });
      await proc.exited;
      const stdout = await proc.stdout.text();
      if (stdout.trim().length > 0)
        pkgs.push(...parseBunOutdated(stdout));
    }
    const seen = new Set;
    pkgs = pkgs.filter((pkg) => {
      const key = `${pkg.name}@${pkg.current}:${pkg.workspace ?? ""}`;
      if (seen.has(key))
        return false;
      seen.add(key);
      return true;
    });
    if (opts.production)
      pkgs = pkgs.filter((pkg) => pkg.depType === "prod");
    if (opts.omit) {
      const omitTypes = opts.omit.split(",").map((s) => s.trim());
      pkgs = pkgs.filter((pkg) => !omitTypes.includes(pkg.depType));
    }
    return { folder: p.folder, pkgs };
  }));
  for (const { folder, pkgs } of outdatedResults) {
    if (pkgs.length > 0) {
      projectsWithOutdated++;
      console.log(c.bold(c.yellow(`  \u250C\u2500 ${folder}`)));
      const maxName = Math.max(...pkgs.map((pkg) => pkg.name.length + (pkg.depType !== "prod" ? pkg.depType.length + 3 : 0)));
      const maxCur = Math.max(7, ...pkgs.map((pkg) => pkg.current.length));
      const maxUpd = Math.max(6, ...pkgs.map((pkg) => pkg.update.length));
      const maxLat = Math.max(6, ...pkgs.map((pkg) => pkg.latest.length));
      for (const pkg of pkgs) {
        const label = pkg.depType !== "prod" ? `${pkg.name} ${c.dim(`(${pkg.depType})`)}` : pkg.name;
        const padName = pkg.depType !== "prod" ? pkg.name.length + pkg.depType.length + 3 : pkg.name.length;
        const wsCol = pkg.workspace ? `  ${c.cyan(pkg.workspace)}` : "";
        console.log(c.dim("  \u2502 ") + `  ${label}${"".padEnd(maxName - padName)}  ${c.dim(pkg.current.padEnd(maxCur))}  ${pkg.update.padEnd(maxUpd)}  ${pkg.current === pkg.latest ? c.green(pkg.latest) : c.yellow(pkg.latest)}${wsCol}`);
      }
      console.log(c.dim("  \u2514\u2500"));
      console.log();
      hits.push({ folder, pkgs });
    }
  }
  if (projectsWithOutdated === 0) {
    console.log(c.green(opts.filter?.length ? `  No outdated packages matching ${opts.filter.join(" ")}.` : "  All projects are up to date!"));
  } else {
    console.log(c.dim(`  ${projectsWithOutdated}/${candidates.length} project(s) have outdated dependencies.`));
  }
  if (hits.length > 0) {
    const byPkg = new Map;
    for (const h of hits) {
      for (const pkg of h.pkgs) {
        let entry = byPkg.get(pkg.name);
        if (!entry) {
          entry = {
            projects: [],
            depType: pkg.depType,
            currents: new Set,
            latest: pkg.latest,
            workspaces: new Set
          };
          byPkg.set(pkg.name, entry);
        }
        entry.projects.push(h.folder);
        entry.currents.add(pkg.current);
        if (semverCompare(pkg.latest, entry.latest) > 0)
          entry.latest = pkg.latest;
        if (pkg.workspace)
          entry.workspaces.add(pkg.workspace);
      }
    }
    console.log();
    console.log(c.bold("  Summary"));
    console.log();
    const hasWs = [...byPkg.values()].some((v) => v.workspaces.size > 0);
    const hdr = `    ${c.cyan("Package".padEnd(32))} ${"Type".padEnd(6)} ${"Current".padEnd(20)} ${"Latest".padEnd(12)} ${hasWs ? "Workspace".padEnd(20) : ""}Projects`;
    const sep = `    ${"\u2500".repeat(32)} ${"\u2500".repeat(6)} ${"\u2500".repeat(20)} ${"\u2500".repeat(12)} ${hasWs ? "\u2500".repeat(20) + " " : ""}${"\u2500".repeat(8)}`;
    console.log(hdr);
    console.log(sep);
    const sorted = [...byPkg.entries()].sort((a, b) => b[1].projects.length - a[1].projects.length);
    for (const [name, info] of sorted) {
      const currents = [...info.currents].sort();
      const curStr = currents.length <= 2 ? currents.join(", ") : `${currents[0]} +${currents.length - 1}`;
      const allSame = currents.length === 1 && currents[0] === info.latest;
      const latestStr = allSame ? c.green(info.latest) : c.yellow(info.latest);
      const typeColor = info.depType === "dev" ? c.magenta : info.depType === "peer" ? c.yellow : c.green;
      const wsStr = hasWs ? c.cyan([...info.workspaces].join(", ").padEnd(20)) + " " : "";
      console.log(`    ${name.padEnd(32)} ${typeColor(info.depType.padEnd(6))} ${c.dim(curStr.padEnd(20))} ${latestStr.padEnd(12)} ${wsStr}${c.dim(String(info.projects.length))}`);
    }
    console.log();
    const totalPkgs = byPkg.size;
    const totalHits = hits.reduce((s, h) => s + h.pkgs.length, 0);
    console.log(c.dim(`  ${totalPkgs} unique package(s), ${totalHits} total instance(s) across ${hits.length} project(s).`));
  }
  console.log();
}
async function updateAcrossProjects(projects, opts) {
  const { dryRun, patch, minor } = opts;
  const semverFilter = patch ? "patch" : minor ? "minor" : null;
  const withLock = projects.filter((p) => p.lock !== "none");
  const label = ["bun update", semverFilter ? `--${semverFilter}` : "", dryRun ? "--dry-run" : ""].filter(Boolean).join(" ");
  console.log();
  console.log(c.bold(c.cyan(`  ${label}`)) + c.dim(` \u2014 ${withLock.length} projects`));
  if (semverFilter) {
    const desc = semverFilter === "patch" ? "same major.minor, patch bump only" : "same major, minor + patch bumps";
    console.log(c.dim(`  Filter: ${desc}`));
  }
  console.log();
  const plans = [];
  let skipped = 0;
  const discoveryResults = await Promise.all(withLock.map(async (p) => {
    const dir = projectDir(p);
    const checkProc = Bun.spawn(["bun", "outdated"], { cwd: dir, stdout: "pipe", stderr: "pipe" });
    await checkProc.exited;
    const checkOut = await checkProc.stdout.text();
    if (checkOut.trim().length === 0)
      return null;
    let pkgs = parseBunOutdated(checkOut);
    if (semverFilter && pkgs.length > 0) {
      pkgs = pkgs.filter((pkg) => {
        const bump = semverBumpType(pkg.current, pkg.latest);
        if (!bump)
          return false;
        return semverFilter === "patch" ? bump === "patch" : bump !== "major";
      });
    }
    if (pkgs.length === 0)
      return null;
    return { project: p, pkgs, names: pkgs.map((pkg) => pkg.name) };
  }));
  for (const r of discoveryResults) {
    if (r)
      plans.push(r);
    else
      skipped++;
  }
  let totalPkgs = 0;
  for (const { project: p, pkgs, names } of plans) {
    const isAdd = p.exact && semverFilter;
    const trusted = new Set(p.trustedDeps);
    const extras = [];
    if (isAdd)
      extras.push("bun add -E");
    if (isAdd && p.registry !== "-")
      extras.push("registry");
    if (isAdd && trusted.size > 0)
      extras.push("trust");
    const method = extras.length > 0 ? c.dim(` (${extras.join(", ")})`) : "";
    const tag = dryRun ? c.yellow("DRY") : c.yellow("...");
    if (semverFilter) {
      console.log(`    ${tag} ${p.folder.padEnd(30)} ${c.dim(`${names.length} ${semverFilter}:`)}${method}`);
      for (const pkg of pkgs) {
        const typeLabel = pkg.depType !== "prod" ? c.dim(` (${pkg.depType})`) : "";
        const trustLabel = trusted.has(pkg.name) ? c.dim(" [trusted]") : "";
        console.log(`         ${"".padEnd(30)} ${pkg.name}${typeLabel} ${c.dim(pkg.current)} \u2192 ${c.green(pkg.latest)}${trustLabel}`);
      }
    } else {
      console.log(`    ${tag} ${p.folder.padEnd(30)} ${c.dim(`${pkgs.length} outdated package(s)`)}${method}`);
    }
    totalPkgs += pkgs.length;
  }
  console.log();
  if (plans.length === 0) {
    console.log(c.dim(`  All ${skipped} project(s) ${semverFilter ? `have no ${semverFilter} updates` : "are already up to date"}.`));
    console.log();
    return;
  }
  if (dryRun) {
    console.log(c.dim(`  ${plans.length} project(s) would be updated (${totalPkgs} package(s)), ${skipped} ${semverFilter ? `have no ${semverFilter} updates` : "already up to date"}.`));
    console.log(c.dim(`  Run without --dry-run to apply updates.`));
    console.log();
    return;
  }
  process.stdout.write(c.yellow(`  Apply ${totalPkgs} update(s) across ${plans.length} project(s)? (y/n): `));
  let confirmed = false;
  for await (const line of console) {
    if (line.trim().toLowerCase() === "y") {
      confirmed = true;
      break;
    }
    console.log(c.dim(`
  Cancelled.`));
    console.log();
    return;
  }
  if (!confirmed) {
    console.log(c.dim(`
  No input received \u2014 cancelled.`));
    console.log();
    return;
  }
  console.log();
  let updated = 0;
  let interrupted = false;
  let summaryPrinted = false;
  const completedFolders = [];
  const onSignal = () => {
    if (interrupted) {
      console.log(c.red(`
  Force quit.`));
      process.exit(1);
    }
    interrupted = true;
    console.log(c.yellow(`
  Finishing current project\u2026 (ctrl+c again to force quit)`));
  };
  process.on("SIGINT", onSignal);
  process.on("SIGTERM", onSignal);
  const onExit = (code) => {
    if (summaryPrinted)
      return;
    console.log();
    console.log(c.yellow(`  Exit (code ${code}) \u2014 ${completedFolders.length}/${plans.length} project(s) updated before exit.`));
    if (completedFolders.length > 0) {
      for (const f of completedFolders)
        console.log(`    ${c.green("OK")}  ${f}`);
    }
  };
  process.on("exit", onExit);
  for (const { project: p, pkgs, names } of plans) {
    if (interrupted)
      break;
    const dir = projectDir(p);
    const useAdd = p.exact && semverFilter;
    if (useAdd) {
      const DEP_FLAG = {
        prod: undefined,
        dev: "--dev",
        optional: "--optional",
        peer: "--peer"
      };
      const trusted = new Set(p.trustedDeps);
      const registryUrl = p.registry !== "-" ? p.registry.startsWith("http") ? p.registry : `https://${p.registry}` : null;
      const groups = new Map;
      for (const pkg of pkgs) {
        const key = pkg.depType;
        if (!groups.has(key))
          groups.set(key, []);
        groups.get(key).push(pkg);
      }
      let ok = true;
      for (const [depType, group] of groups) {
        if (interrupted) {
          ok = false;
          break;
        }
        const specs = group.map((pkg) => `${pkg.name}@${pkg.latest}`);
        const needsTrust = group.some((pkg) => trusted.has(pkg.name));
        const args = ["bun", "add", "--exact", ...specs];
        const flag = DEP_FLAG[depType];
        if (flag)
          args.splice(3, 0, flag);
        if (registryUrl)
          args.push("--registry", registryUrl);
        if (needsTrust)
          args.push("--trust");
        const proc = Bun.spawn(args, { cwd: dir, stdout: "inherit", stderr: "pipe" });
        const exitCode = await proc.exited;
        if (exitCode !== 0) {
          const errText = await proc.stderr.text();
          const errLine = extractBunError(errText, `exit code ${exitCode}`);
          console.log(`    ${c.red("ERR")} ${p.folder.padEnd(30)} ${errLine}`);
          ok = false;
          break;
        }
      }
      if (ok) {
        const extras = [];
        if (registryUrl)
          extras.push("registry");
        if (trusted.size > 0)
          extras.push("trust");
        const via = extras.length > 0 ? ` [${extras.join(", ")}]` : "";
        console.log(`    ${c.green("UPD")} ${p.folder.padEnd(30)} ${c.dim(`${pkgs.length} ${semverFilter} update(s) via bun add -E${via}`)}`);
        for (const pkg of pkgs) {
          const typeLabel = pkg.depType !== "prod" ? c.dim(` (${pkg.depType})`) : "";
          const trustLabel = trusted.has(pkg.name) ? c.dim(" [trusted]") : "";
          console.log(`         ${"".padEnd(30)} ${pkg.name}${typeLabel} ${c.dim(pkg.current)} \u2192 ${c.green(pkg.latest)}${trustLabel}`);
        }
        updated++;
        completedFolders.push(p.folder);
      }
    } else {
      const args = semverFilter ? ["bun", "update", ...names] : ["bun", "update"];
      const proc = Bun.spawn(args, { cwd: dir, stdout: "inherit", stderr: "pipe" });
      const exitCode = await proc.exited;
      if (exitCode === 0) {
        const detail = semverFilter ? `${names.length} ${semverFilter} update(s)` : "done";
        console.log(`    ${c.green("UPD")} ${p.folder.padEnd(30)} ${c.dim(detail)}`);
        if (semverFilter) {
          for (const pkg of pkgs) {
            console.log(`         ${"".padEnd(30)} ${pkg.name} ${c.dim(pkg.current)} \u2192 ${c.green(pkg.latest)}`);
          }
        }
        updated++;
        completedFolders.push(p.folder);
      } else {
        const errText = await proc.stderr.text();
        const errLine = extractBunError(errText, `exit code ${exitCode}`);
        console.log(`    ${c.red("ERR")} ${p.folder.padEnd(30)} ${errLine}`);
      }
    }
  }
  process.off("SIGINT", onSignal);
  process.off("SIGTERM", onSignal);
  process.off("exit", onExit);
  summaryPrinted = true;
  console.log();
  if (interrupted) {
    const remaining = plans.length - updated;
    console.log(c.yellow(`  Interrupted \u2014 ${updated} project(s) updated, ${remaining} skipped.`));
    if (completedFolders.length > 0) {
      for (const f of completedFolders)
        console.log(`    ${c.green("OK")}  ${f}`);
    }
  } else {
    console.log(c.green(`  Updated ${updated} project(s), ${skipped} ${semverFilter ? `have no ${semverFilter} updates` : "already up to date"}.`));
  }
  console.log();
}
async function verifyLockfiles(projects) {
  const withLock = projects.filter((p) => p.lock !== "none");
  console.log();
  console.log(c.bold(c.cyan("  bun install --frozen-lockfile")) + c.dim(` \u2014 verifying ${withLock.length} project(s)`));
  console.log();
  let passed = 0;
  let failed = 0;
  const failures = [];
  const verifyResults = await Promise.all(withLock.map(async (p) => {
    const dir = projectDir(p);
    const proc = Bun.spawn(["bun", "install", "--frozen-lockfile"], { cwd: dir, stdout: "pipe", stderr: "pipe" });
    const exitCode = await proc.exited;
    const stderr = exitCode !== 0 ? await proc.stderr.text() : "";
    return { folder: p.folder, exitCode, stderr };
  }));
  for (const { folder, exitCode, stderr } of verifyResults) {
    if (exitCode === 0) {
      console.log(`    ${c.green("PASS")} ${folder}`);
      passed++;
    } else {
      const errLine = extractBunError(stderr, `exit code ${exitCode}`);
      console.log(`    ${c.red("FAIL")} ${folder.padEnd(30)} ${c.dim(errLine)}`);
      failures.push({ folder, error: errLine });
      failed++;
    }
  }
  console.log();
  if (failed === 0) {
    console.log(c.green(`  All ${passed} project(s) passed lockfile verification.`));
  } else {
    console.log(c.yellow(`  ${passed} passed, ${c.red(`${failed} failed`)} lockfile verification.`));
    console.log();
    console.log(c.bold("  Failed projects:"));
    for (const f of failures) {
      console.log(`    ${c.red("\u2022")} ${f.folder.padEnd(30)} ${c.dim(f.error)}`);
    }
    console.log();
    console.log(c.dim("  Run `bun install` in failed projects to regenerate lockfiles."));
  }
  console.log();
}
async function infoPackage(pkg, projects, jsonOut, property) {
  const firstWithPkg = projects.find((p) => p.hasPkg);
  const cwd = firstWithPkg ? projectDir(firstWithPkg) : PROJECTS_ROOT;
  if (property) {
    const args = ["bun", "info", pkg, property];
    if (jsonOut)
      args.push("--json");
    const proc2 = Bun.spawn(args, { cwd, stdout: "pipe", stderr: "pipe" });
    const exitCode2 = await proc2.exited;
    const stdout2 = await proc2.stdout.text();
    const stderr2 = await proc2.stderr.text();
    if (exitCode2 !== 0) {
      console.error(c.red(`  bun info ${pkg} ${property}: ${stderr2.trim()}`));
      process.exit(1);
    }
    console.log(stdout2.trimEnd());
    return;
  }
  const proc = Bun.spawn(["bun", "info", pkg, "--json"], { cwd, stdout: "pipe", stderr: "pipe" });
  const exitCode = await proc.exited;
  const stdout = await proc.stdout.text();
  const stderr = await proc.stderr.text();
  if (exitCode !== 0) {
    console.error(c.red(`  bun info ${pkg} failed: ${stderr.trim().split(`
`)[0]}`));
    process.exit(1);
  }
  let meta3;
  try {
    meta3 = BunInfoResponseSchema.parse(JSON.parse(stdout));
  } catch {
    console.log(stdout);
    return;
  }
  if (jsonOut) {
    console.log(JSON.stringify(meta3, null, 2));
    return;
  }
  const line = (label, value) => {
    if (value !== undefined && value !== "")
      console.log(`  ${c.cyan(label.padEnd(18))} ${value}`);
  };
  console.log();
  console.log(c.bold(c.magenta(`  \u256D\u2500 ${meta3.name ?? pkg} \u2500\u256E`)));
  console.log();
  line("Name", meta3.name);
  line("Version", meta3.version ?? meta3["dist-tags"]?.latest);
  line("Description", meta3.description);
  line("License", meta3.license);
  line("Homepage", meta3.homepage);
  const author = typeof meta3.author === "string" ? meta3.author : meta3.author?.name ? `${meta3.author.name}${meta3.author.email ? ` <${meta3.author.email}>` : ""}` : undefined;
  line("Author", author);
  const repo = typeof meta3.repository === "string" ? meta3.repository : meta3.repository?.url;
  line("Repository", repo);
  const deps = meta3.dependencies ? Object.keys(meta3.dependencies) : [];
  const devDeps = meta3.devDependencies ? Object.keys(meta3.devDependencies) : [];
  if (deps.length > 0 || devDeps.length > 0) {
    console.log();
    line("Dependencies", deps.length || 0);
    line("DevDependencies", devDeps.length || 0);
    if (deps.length > 0 && deps.length <= 15) {
      console.log();
      for (const d of deps) {
        console.log(`    ${c.dim("\u2022")} ${d} ${c.dim(meta3.dependencies[d])}`);
      }
    } else if (deps.length > 15) {
      console.log();
      for (const d of deps.slice(0, 12)) {
        console.log(`    ${c.dim("\u2022")} ${d} ${c.dim(meta3.dependencies[d])}`);
      }
      console.log(c.dim(`    ... and ${deps.length - 12} more`));
    }
  }
  const tags = meta3["dist-tags"];
  if (tags && Object.keys(tags).length > 0) {
    console.log();
    console.log(`  ${c.cyan("Dist Tags".padEnd(18))}`);
    for (const [tag, ver] of Object.entries(tags)) {
      console.log(`    ${c.dim("\u2022")} ${tag.padEnd(12)} ${ver}`);
    }
  }
  const maintainers = meta3.maintainers;
  if (Array.isArray(maintainers) && maintainers.length > 0) {
    console.log();
    console.log(`  ${c.cyan("Maintainers".padEnd(18))}`);
    for (const m of maintainers.slice(0, 8)) {
      const name = typeof m === "string" ? m : m.name ?? m.email ?? JSON.stringify(m);
      console.log(`    ${c.dim("\u2022")} ${name}`);
    }
    if (maintainers.length > 8)
      console.log(c.dim(`    ... and ${maintainers.length - 8} more`));
  }
  const bareName = pkg.replace(/@[^/]+$/, "").replace(/^(@[^/]+\/[^@]+)@.*$/, "$1");
  const localUsers = (await Promise.all(projects.filter((p) => p.hasPkg).map(async (p) => {
    try {
      const pkgJson = await Bun.file(`${projectDir(p)}/package.json`).json();
      const allDeps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
      if (allDeps[bareName])
        return `${p.folder} ${c.dim(allDeps[bareName])}`;
    } catch {}
    return null;
  }))).filter((x) => x !== null);
  if (localUsers.length > 0) {
    console.log();
    console.log(`  ${c.cyan("Used Locally".padEnd(18))} ${c.dim(`in ${localUsers.length} project(s)`)}`);
    for (const u of localUsers) {
      console.log(`    ${c.green("\u2022")} ${u}`);
    }
  }
  console.log();
}
async function main() {
  if (shouldWarnMise(process.platform, Bun.env.MISE_SHELL)) {
    console.log(c.dim("  Hint: On Windows, use 'mise.exe' for stable argument parsing."));
    console.log();
  }
  if (flags.help) {
    const ph = platformHelp(process.platform);
    console.log(`
${c.bold(c.cyan("  bun scan.ts"))} \u2014 multi-project scanner for $BUN_PLATFORM_HOME

${c.dim("  Usage:")}
    ${ph.cmd} scan.ts [flags]
${ph.hint ? `
${c.dim("  Tip for PowerShell users:")}
    ${ph.hint}
` : ""}
${c.bold("  Modes:")}
    ${c.cyan("(default)")}                          Table of all projects
    ${c.cyan("--detail")}                           Extended table (author, license, description)
    ${c.cyan("--inspect")} <name>                   Deep view of a single project
    ${c.cyan("--json")}                             JSON output
    ${c.cyan("--audit")}                            Metadata + infra + lifecycle security report
    ${c.cyan("--fix")} [--dry-run]                  Patch missing author/license, init missing pkg
    ${c.cyan("--fix-engine")} [--dry-run]           Unify engines.bun across all projects
    ${c.cyan("--fix-registry")} <url> [--dry-run]   Unify registry (bunfig + pkg + .npmrc)
    ${c.cyan("--fix-scopes")} <url> @s.. [--dry-run] Inject [install.scopes] into bunfig.toml
    ${c.cyan("--fix-npmrc")} <url> @s.. [--dry-run] Rewrite .npmrc with scoped template
    ${c.cyan("--fix-trusted")} [--dry-run]          Auto-detect native deps \u2192 trustedDependencies
    ${c.cyan("--fix-env-docs")}                     Inject audit recommendations into .env.template
    ${c.cyan("--fix-dns")} [--dry-run]              Set DNS TTL + generate prefetch snippets
    ${c.cyan("--why")} <pkg> [--top] [--depth N]    bun why across all projects
    ${c.cyan("--outdated")} [-r] [--wf] [-p]        bun outdated across all projects
    ${c.cyan("--update")} [--dry-run]               bun update across all projects
    ${c.cyan("--update --patch")} [--dry-run]       Update patch-level bumps only
    ${c.cyan("--update --minor")} [--dry-run]       Update minor + patch bumps only
    ${c.cyan("--verify")}                           bun install --frozen-lockfile across all projects
    ${c.cyan("--info")} <pkg> [--json]              Registry metadata + local cross-reference
    ${c.cyan("--path")}                             Emit export PATH for projects with bin/
    ${c.cyan("--store-token")} <name>               Store a token in OS keychain (reads from stdin)
    ${c.cyan("--delete-token")} <name>              Remove a token from OS keychain
    ${c.cyan("--list-tokens")}                      Show stored token names and sources
    ${c.cyan("--check-tokens")}                     Verify stored tokens authenticate with registry
    ${c.cyan("--rss")}                              Generate RSS feeds (.audit/*.rss.xml)
    ${c.cyan("--advisory-feed")} <url>              Fetch & cross-ref security advisory RSS/Atom feed

${c.bold("  Filters:")}
    ${c.cyan("--filter")} <glob|bool>               Filter by name, folder, or boolean field
    ${c.cyan("--with-bunfig")}                      Only projects with bunfig.toml
    ${c.cyan("--workspaces")}                       Only workspace roots
    ${c.cyan("--without-pkg")}                      Only dirs missing package.json
    ${c.cyan("--sort")} <key>                       Sort by name, deps, version, lock

${c.bold("  Dependency scope:")}
    ${c.cyan("-p, --production")}                   Exclude devDependencies
    ${c.cyan("-g, --global")}                       Check global packages
    ${c.cyan("-r, --catalog")}                      Catalog dependencies (workspace roots)
    ${c.cyan("--wf")} <workspace>                   Filter by workspace name (repeatable)
    ${c.cyan("--omit")} <type>                      Skip dev, optional, or peer

${c.bold("  Update behavior (exact-pinned projects):")}
    ${c.cyan("--exact")}                            Passed to bun add -E automatically
    ${c.cyan("--dev/--optional/--peer")}             Auto-grouped by dep type
    ${c.cyan("--registry")}                         Passed from project bunfig.toml
    ${c.cyan("--trust")}                            Passed when pkg is in trustedDependencies

${c.bold("  Other:")}
    ${c.cyan("--dry-run")}                          Preview changes without applying
    ${c.cyan("--depth")} <N>                        Depth for --why
    ${c.cyan("--top")}                              Top-level only for --why
    ${c.cyan("--no-ipc")}                           Disable parallel IPC scanning (use Promise.all)
    ${c.cyan("--profile")}                          Emit timing summary (or set BUN_SCAN_PROFILE=1)
    ${c.cyan("--debug-tokens")}                     Print per-project token service/name pairs
    ${c.cyan("--write-baseline")}                   Write profile baseline (R2 if configured)
    ${c.cyan("-h, --help")}                         Show this help
`);
    return;
  }
  if (flags["store-token"]) {
    const name = flags["store-token"];
    if (!isValidTokenName(name)) {
      console.error(`${c.red("error:")} unknown token name ${c.cyan(name)}`);
      console.error(`  ${c.dim("allowed:")} ${BUN_KEYCHAIN_TOKEN_NAMES.join(", ")}`);
      process.exit(1);
    }
    let value;
    if (positionals[0]) {
      console.error(`${c.yellow("\u26A0")} Token passed as argument \u2014 visible in ps/history. Prefer: echo $TOKEN | bun run scan.ts --store-token ${name}`);
      value = positionals[0];
    } else {
      value = await readTokenFromStdin();
    }
    const check2 = validateTokenValue(value);
    if (!check2.valid) {
      console.error(`${c.red("error:")} ${check2.reason}`);
      await logTokenEvent({ event: "store_fail", tokenName: name, result: "invalid", detail: check2.reason });
      process.exit(1);
    }
    for (const w of tokenValueWarnings(value)) {
      console.error(`${c.yellow("\u26A0")} ${w}`);
    }
    const result = await keychainSet(name, value);
    if (result.ok) {
      console.log(`${c.green("\u2713")} Stored ${c.cyan(name)} in OS keychain (service: ${BUN_KEYCHAIN_SERVICE})`);
      await logTokenEvent({ event: "store", tokenName: name, result: "ok" });
    } else {
      const hints = {
        NO_API: "upgrade Bun to a version with keychain support, or export the token as an env var instead",
        ACCESS_DENIED: "unlock your keychain or grant terminal access in System Settings \u2192 Privacy \u2192 Security",
        NOT_FOUND: "unexpected; the item should have been created",
        OS_ERROR: "check Console.app for keychain errors, or try: security add-generic-password -a $USER -s dev.bun.scanner -w"
      };
      console.error(`${c.red("error:")} failed to store ${c.cyan(name)}: ${result.reason}`);
      console.error(`  ${c.dim("hint:")} ${hints[result.code]}`);
      await logTokenEvent({ event: "store_fail", tokenName: name, result: result.code, detail: result.reason });
      process.exit(1);
    }
    return;
  }
  if (flags["delete-token"]) {
    const name = flags["delete-token"];
    if (!isValidTokenName(name)) {
      console.error(`${c.red("error:")} unknown token name ${c.cyan(name)}`);
      console.error(`  ${c.dim("allowed:")} ${BUN_KEYCHAIN_TOKEN_NAMES.join(", ")}`);
      process.exit(1);
    }
    const result = await keychainDelete(name);
    if (!result.ok) {
      const hints = {
        NO_API: "upgrade Bun to a version with keychain support",
        ACCESS_DENIED: "unlock your keychain or grant terminal access in System Settings \u2192 Privacy \u2192 Security",
        NOT_FOUND: "token was already absent from the keychain",
        OS_ERROR: "check Console.app for keychain errors"
      };
      console.error(`${c.red("error:")} failed to delete ${c.cyan(name)}: ${result.reason}`);
      console.error(`  ${c.dim("hint:")} ${hints[result.code]}`);
      await logTokenEvent({ event: "delete_fail", tokenName: name, result: result.code, detail: result.reason });
      process.exit(1);
    } else if (result.value) {
      console.log(`${c.green("\u2713")} Removed ${c.cyan(name)} from OS keychain`);
      await logTokenEvent({ event: "delete", tokenName: name, result: "ok" });
    } else {
      console.log(`${c.yellow("\u26A0")} ${c.cyan(name)} not found in OS keychain (nothing to remove)`);
    }
    return;
  }
  if (flags["list-tokens"]) {
    const t02 = Bun.nanoseconds();
    const detail = flags.detail;
    const backend = _hasBunSecrets ? "Bun.secrets" : process.platform === "darwin" ? "security CLI" : "unavailable";
    let keychainNote = "";
    const tokenData = [];
    for (const name of BUN_KEYCHAIN_TOKEN_NAMES) {
      const t1 = Bun.nanoseconds();
      const inEnv = !!Bun.env[name];
      const kcResult = await keychainGet(name);
      const inKeychain = kcResult.ok && !!kcResult.value;
      const lookupMs = (Bun.nanoseconds() - t1) / 1e6;
      if (!kcResult.ok && !keychainNote)
        keychainNote = kcResult.reason;
      let source;
      if (inEnv && inKeychain)
        source = "env + keychain";
      else if (inEnv)
        source = "env";
      else if (inKeychain)
        source = "keychain";
      else
        source = "not set";
      const storedAt = null;
      tokenData.push({ name, source, inEnv, inKeychain, lookupMs, storedAt, m: getMetrics(name) });
    }
    const totalMs = (Bun.nanoseconds() - t02) / 1e6;
    const found = tokenData.filter((t) => t.inEnv || t.inKeychain).length;
    const totalAccess = tokenData.reduce((s, t) => s + t.m.accessed, 0);
    const totalFailed = tokenData.reduce((s, t) => s + t.m.failed, 0);
    if (!detail) {
      console.log(`
${c.bold("  Token sources:")}
`);
      for (const t of tokenData) {
        const colored = t.source === "env + keychain" ? c.green(t.source) : t.source === "env" ? c.green(t.source) : t.source === "keychain" ? c.cyan(t.source) : c.yellow(t.source);
        console.log(`    ${c.cyan(t.name.padEnd(24))} ${colored}  ${c.dim(`${t.lookupMs.toFixed(1)}ms`)}`);
      }
      console.log();
      console.log(`  ${c.dim(`${found}/${tokenData.length} resolved  ${totalMs.toFixed(1)}ms  backend: ${backend}  service: ${BUN_KEYCHAIN_SERVICE}`)}`);
      console.log();
      console.log(`${c.bold("  Lifecycle:")}
`);
      for (const t of tokenData) {
        const age = t.storedAt ? c.dim(timeSince(new Date(t.storedAt))) : c.dim("-");
        const accessed = t.m.accessed > 0 ? c.green(String(t.m.accessed)) : c.dim("0");
        const failed = t.m.failed > 0 ? c.red(String(t.m.failed)) : c.dim("0");
        const lastFail = t.m.lastFailCode ? c.red(t.m.lastFailCode) : c.dim("-");
        console.log(`    ${c.cyan(t.name.padEnd(24))} accessed: ${accessed}  failed: ${failed}  last-err: ${lastFail}  stored: ${t.storedAt ? c.dim(t.storedAt) : c.dim("-")}  age: ${age}`);
      }
    } else {
      const ROTATION_DAYS = 90;
      console.log(`
  ${c.bold(c.cyan("Token Health & Security Assessment"))}`);
      console.log(`  ${c.dim(`${found}/${tokenData.length} resolved  ${totalMs.toFixed(1)}ms  backend: ${backend}  service: ${BUN_KEYCHAIN_SERVICE}`)}
`);
      const rows = tokenData.map((t) => {
        const active = t.inEnv || t.inKeychain;
        const age = t.storedAt ? timeSince(new Date(t.storedAt)) : "-";
        const storedDate = t.storedAt ? new Date(t.storedAt) : null;
        const ageDays = storedDate ? Math.floor((Date.now() - storedDate.getTime()) / 86400000) : 0;
        const rotationDue = ageDays >= ROTATION_DAYS;
        const security = !active ? "MISSING" : t.m.failed > 0 ? "DEGRADED" : rotationDue ? "ROTATE" : "VERIFIED";
        const leakRisk = !active ? "N/A" : t.source === "env" ? "MEDIUM" : t.source === "env + keychain" ? "MEDIUM" : "LOW";
        return {
          "Token Name": t.name,
          Type: "Registry",
          Backend: active ? t.source.includes("keychain") ? "Keychain" : "Env" : "-",
          Latency: `${t.lookupMs.toFixed(1)}ms`,
          Status: active ? "ACTIVE" : "NOT SET",
          Accessed: t.m.accessed,
          Failed: t.m.failed,
          "Last Error": t.m.lastFailCode ?? "-",
          Age: age,
          Security: security,
          Rotation: rotationDue ? `${ageDays}d (overdue)` : `${ROTATION_DAYS - ageDays}d left`,
          "Leak Risk": leakRisk
        };
      });
      console.log(Bun.inspect.table(rows));
      console.log(`  ${c.dim(`Rendered in ${((Bun.nanoseconds() - t02) / 1e6).toFixed(1)}ms`)}`);
    }
    if (keychainNote) {
      console.log(`
  ${c.yellow("note:")} ${keychainNote}`);
      console.log(`  ${c.dim("Tokens can still be provided via env vars: export FW_REGISTRY_TOKEN=<value>")}`);
    }
    console.log();
    return;
  }
  if (flags["check-tokens"]) {
    await checkTokenHealth();
    return;
  }
  await autoLoadKeychainTokens();
  if (_profileEnabled) {
    _profileStartNs = Bun.nanoseconds();
    _profileStartMem = process.memoryUsage();
  }
  const t0 = Bun.nanoseconds();
  const dirs = await time3("fs:discover-projects", async () => {
    const entries = await readdir(PROJECTS_ROOT, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory() && !e.name.startsWith(".") && e.name !== "scanner").map((e) => `${PROJECTS_ROOT}/${e.name}`);
  });
  let projects = [];
  await time3("scan:projects", async () => {
    if (flags["no-ipc"]) {
      projects = await Promise.all(dirs.map(scanProject));
    } else {
      try {
        projects = await scanProjectsViaIPC(dirs);
      } catch {
        projects = await Promise.all(dirs.map(scanProject));
      }
    }
  });
  timeSync("filter:projects", () => {
    if (flags["with-bunfig"]) {
      projects = projects.filter((p) => p.bunfig);
    }
    if (flags.workspaces) {
      projects = projects.filter((p) => p.workspace);
    }
    if (flags["without-pkg"]) {
      projects = projects.filter((p) => !p.hasPkg);
    }
    if (flags.filter) {
      projects = projects.filter((p) => matchFilter(p, flags.filter));
    }
  });
  timeSync("sort:projects", () => {
    if (flags.sort) {
      const sortKey = flags.sort;
      if (!VALID_SORT_KEYS.has(sortKey)) {
        console.error(c.yellow(`Unknown sort key: ${sortKey}. Using default order.`));
      } else {
        projects = sortProjects(projects, sortKey);
      }
    } else {
      projects.sort((a, b) => a.folder.localeCompare(b.folder));
    }
  });
  const dryRun = !!flags["dry-run"];
  if (flags.path) {
    const binDirs = projects.filter((p) => p.hasBinDir).map((p) => `${projectDir(p)}/bin`);
    if (binDirs.length === 0) {
      console.error("No projects with bin/ directories found.");
      return;
    }
    const registries2 = projects.map((p) => p.registry).filter((r) => r !== "-");
    const uniqueRegistries = [...new Set(registries2)];
    const commonRegistry = uniqueRegistries.length === 1 ? uniqueRegistries[0] : null;
    console.log(`export BUN_PLATFORM_HOME="${PROJECTS_ROOT}"`);
    if (commonRegistry) {
      const fullUrl = commonRegistry.startsWith("http") ? commonRegistry : `https://${commonRegistry}`;
      console.log(`export BUN_CONFIG_REGISTRY="${fullUrl}"`);
    }
    const pathPrefix = binDirs.join(":");
    console.log(`export PATH="${pathPrefix}:$PATH"`);
    process.stderr.write(`# BUN_PLATFORM_HOME=${PROJECTS_ROOT}
`);
    if (commonRegistry) {
      process.stderr.write(`# BUN_CONFIG_REGISTRY=https://${commonRegistry} (global override)
`);
    }
    process.stderr.write(`# ${binDirs.length} project bin/ dirs prepended to PATH:
`);
    for (const dir of binDirs) {
      process.stderr.write(`#   ${dir}
`);
    }
    return;
  }
  if (flags.snapshot && !flags.audit) {
    const prevSnap = await time3("xref:load-snapshot", async () => loadXrefSnapshot());
    const { entries: xrefResult, skipped } = await time3("xref:scan", async () => scanXrefData(projects, prevSnap));
    const withPkg = projects.filter((p) => p.hasPkg);
    await time3("xref:save-snapshot", async () => saveXrefSnapshot(xrefResult, withPkg.length));
    console.log(`  Snapshot saved to .audit/xref-snapshot.json (${xrefResult.length} projects${skipped > 0 ? `, ${skipped} unchanged` : ""})`);
    return;
  }
  if (flags.compare && !flags.audit) {
    const snapshotPath = flags["audit-compare"] ?? undefined;
    const prevSnapshot2 = await time3("xref:load-snapshot", async () => loadXrefSnapshot(snapshotPath));
    if (!prevSnapshot2) {
      const label = snapshotPath ?? ".audit/xref-snapshot.json";
      console.log(`  No snapshot found at ${label} \u2014 run --audit or --snapshot first.`);
      process.exit(1);
    }
    const { entries: cmpXrefData } = await time3("xref:scan", async () => scanXrefData(projects, prevSnapshot2));
    const prevMap = new Map;
    for (const p of prevSnapshot2.projects)
      prevMap.set(p.folder, p);
    const currentFolders = new Set(cmpXrefData.map((x) => x.folder));
    const prevFolders = new Set(prevSnapshot2.projects.map((p) => p.folder));
    const newProjects = cmpXrefData.filter((x) => !prevFolders.has(x.folder));
    const removedProjects = prevSnapshot2.projects.filter((p) => !currentFolders.has(p.folder));
    const changedProjects = [];
    let unchangedCount = 0;
    for (const x of cmpXrefData) {
      const prev = prevMap.get(x.folder);
      if (!prev)
        continue;
      const diffs = [];
      const dDef = x.bunDefault.length - prev.bunDefault.length;
      const dExp = x.explicit.length - prev.explicit.length;
      const dBlk = x.blocked.length - prev.blocked.length;
      if (dDef !== 0)
        diffs.push(`default ${dDef > 0 ? "+" : ""}${dDef}`);
      if (dExp !== 0)
        diffs.push(`explicit ${dExp > 0 ? "+" : ""}${dExp}`);
      if (dBlk !== 0)
        diffs.push(`blocked ${dBlk > 0 ? "+" : ""}${dBlk}`);
      if (diffs.length > 0)
        changedProjects.push(`${x.folder} (${diffs.join(", ")})`);
      else
        unchangedCount++;
    }
    console.log();
    console.log(c.bold(`  Cross-reference delta (vs ${prevSnapshot2.date ?? prevSnapshot2.timestamp}${prevSnapshot2.tz ? ` ${prevSnapshot2.tz}` : ""}):`));
    console.log(`    ${"New projects:".padEnd(18)} ${c.cyan(String(newProjects.length))}${newProjects.length > 0 ? "   " + newProjects.map((x) => x.folder).join(", ") : ""}`);
    console.log(`    ${"Removed:".padEnd(18)} ${removedProjects.length > 0 ? c.red(String(removedProjects.length)) : c.dim(String(removedProjects.length))}${removedProjects.length > 0 ? "   " + removedProjects.map((p) => p.folder).join(", ") : ""}`);
    console.log(`    ${"Changed:".padEnd(18)} ${changedProjects.length > 0 ? c.yellow(String(changedProjects.length)) : c.dim(String(changedProjects.length))}${changedProjects.length > 0 ? "   " + changedProjects.join(", ") : ""}`);
    console.log(`    ${"Unchanged:".padEnd(18)} ${c.dim(String(unchangedCount))}`);
    console.log();
    const hasDrift = newProjects.length > 0 || removedProjects.length > 0 || changedProjects.length > 0;
    if (hasDrift)
      process.exit(1);
    return;
  }
  if (flags.audit) {
    await time3("mode:audit", async () => renderAudit(projects));
    if (flags.rss) {
      await time3("rss:token-events", async () => publishTokenEventsRss());
      await time3("rss:scan-results", async () => publishScanResultsRss(projects));
    }
    if (flags["advisory-feed"]) {
      await time3("advisory:consume", async () => consumeAdvisoryFeed(flags["advisory-feed"], projects));
    }
    return;
  }
  if (flags.fix) {
    await time3("mode:fix", async () => fixProjects(projects, dryRun));
    return;
  }
  if (flags["fix-engine"]) {
    await time3("mode:fix-engine", async () => fixEngine(projects, dryRun));
    return;
  }
  if (flags["fix-trusted"]) {
    await time3("mode:fix-trusted", async () => fixTrusted(projects, dryRun));
    return;
  }
  if (flags["fix-env-docs"]) {
    const templatePath = `${PROJECTS_ROOT}/scanner/.env.template`;
    const file2 = Bun.file(templatePath);
    let content = await file2.exists() ? await file2.text() : "";
    let changed = false;
    if (content.includes("# BUN_RUNTIME_TRANSPILER_CACHE_PATH=")) {
      content = content.replace(/# BUN_RUNTIME_TRANSPILER_CACHE_PATH=.*/, "BUN_RUNTIME_TRANSPILER_CACHE_PATH=${BUN_PLATFORM_HOME}/.bun-cache");
      changed = true;
      if (dryRun) {
        console.log(`  ${c.yellow("DRY")}  BUN_RUNTIME_TRANSPILER_CACHE_PATH=\${BUN_PLATFORM_HOME}/.bun-cache (promoted from comment)`);
      } else {
        console.log(`  ${c.green("FIX")}  BUN_RUNTIME_TRANSPILER_CACHE_PATH=\${BUN_PLATFORM_HOME}/.bun-cache (promoted from comment)`);
      }
    } else if (!content.includes("BUN_RUNTIME_TRANSPILER_CACHE_PATH")) {
      content += `
BUN_RUNTIME_TRANSPILER_CACHE_PATH=\${BUN_PLATFORM_HOME}/.bun-cache
`;
      changed = true;
      if (dryRun) {
        console.log(`  ${c.yellow("DRY")}  BUN_RUNTIME_TRANSPILER_CACHE_PATH=\${BUN_PLATFORM_HOME}/.bun-cache`);
      } else {
        console.log(`  ${c.green("FIX")}  BUN_RUNTIME_TRANSPILER_CACHE_PATH=\${BUN_PLATFORM_HOME}/.bun-cache`);
      }
    } else {
      console.log(c.dim("  SKIP  BUN_RUNTIME_TRANSPILER_CACHE_PATH already set"));
    }
    for (const [key, val, desc] of [
      ["BUN_CONFIG_NETWORK_CONCURRENCY", "256", "parallel HTTP requests during install"],
      ["BUN_CONFIG_CONCURRENT_SCRIPTS", "16", "parallel lifecycle script execution"]
    ]) {
      if (!content.includes(key)) {
        content += `
${key}=${val}
`;
        changed = true;
        if (dryRun) {
          console.log(`  ${c.yellow("DRY")}  ${key}=${val}  (${desc})`);
        } else {
          console.log(`  ${c.green("FIX")}  ${key}=${val}  (${desc})`);
        }
      } else {
        console.log(c.dim(`  SKIP  ${key} already present`));
      }
    }
    if (!content.includes("BUN_CONFIG_VERBOSE_FETCH")) {
      content += `
# Debug network requests \u2014 prints fetch/http as curl commands
# BUN_CONFIG_VERBOSE_FETCH=curl
`;
      changed = true;
    }
    if (!content.includes("DO_NOT_TRACK")) {
      content += `
# Disable telemetry & crash reports (privacy best practice)
# DO_NOT_TRACK=1
`;
      changed = true;
    }
    if (changed && !dryRun) {
      await Bun.write(templatePath, content);
      console.log(c.green("  Updated .env.template with runtime recommendations"));
    } else if (changed && dryRun) {
      console.log(c.dim("  Run without --dry-run to apply."));
    } else {
      console.log(c.dim("  .env.template already contains all runtime recommendations \u2014 no changes"));
    }
    return;
  }
  if (flags["fix-dns"]) {
    await fixDns(projects, dryRun);
    return;
  }
  if (flags["fix-dns-ttl"]) {
    const ttlVal = "5";
    const envKey = "BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS";
    const missing = projects.filter((p) => p.hasPkg && p.projectDnsTtl === "-");
    if (missing.length === 0) {
      console.log(c.green("  All projects already have DNS TTL configured."));
      return;
    }
    console.log(c.bold(`  Setting ${envKey}=${ttlVal} in ${missing.length} project .env files:`));
    console.log();
    for (const p of missing) {
      const envPath = `${projectDir(p)}/.env`;
      if (dryRun) {
        console.log(`    ${c.dim("dry-run")} ${p.folder}/.env  +${envKey}=${ttlVal}`);
        continue;
      }
      const file2 = Bun.file(envPath);
      let content = await file2.exists() ? await file2.text() : "";
      if (!content.endsWith(`
`) && content.length > 0)
        content += `
`;
      content += `${envKey}=${ttlVal}
`;
      await Bun.write(envPath, content);
      console.log(`    ${c.green("\u2713")} ${p.folder}/.env`);
    }
    if (!dryRun)
      console.log(c.green(`
  Done \u2014 ${missing.length} projects updated.`));
    return;
  }
  if (flags["fix-registry"]) {
    await fixRegistry(projects, flags["fix-registry"], dryRun);
    return;
  }
  if (flags["fix-scopes"]) {
    const scopeNames = positionals.filter((a) => a.startsWith("@"));
    if (scopeNames.length === 0) {
      console.log(c.red(`
  Usage: --fix-scopes <registry-url> @scope1 @scope2 ...
`));
      return;
    }
    await fixScopes(projects, flags["fix-scopes"], scopeNames, dryRun);
    return;
  }
  if (flags["fix-npmrc"]) {
    const scopeNames = positionals.filter((a) => a.startsWith("@"));
    if (scopeNames.length === 0) {
      console.log(c.red(`
  Usage: --fix-npmrc <registry-url> @scope1 @scope2 ...
`));
      return;
    }
    await fixNpmrc(projects, flags["fix-npmrc"], scopeNames, dryRun);
    return;
  }
  if (flags.why) {
    await whyAcrossProjects(projects, flags.why, { top: !!flags.top, depth: flags.depth });
    return;
  }
  if (flags.outdated) {
    await outdatedAcrossProjects(projects, {
      filter: positionals.length > 0 ? positionals : undefined,
      production: !!flags.production,
      omit: flags.omit,
      global: !!flags.global,
      catalog: !!flags.catalog,
      wf: flags.wf
    });
    return;
  }
  if (flags.update) {
    await updateAcrossProjects(projects, {
      dryRun,
      patch: !!flags.patch,
      minor: !!flags.minor
    });
    return;
  }
  if (flags.verify) {
    await verifyLockfiles(projects);
    return;
  }
  const infoTarget = flags.info ?? flags["pm-view"];
  if (infoTarget) {
    await infoPackage(infoTarget, projects, !!flags.json, positionals[0]);
    return;
  }
  if (flags.inspect) {
    const target = projects.find((p) => p.folder === flags.inspect || p.name === flags.inspect);
    if (!target) {
      console.error(c.red(`Project "${flags.inspect}" not found.`));
      process.exit(1);
    }
    inspectProject(target);
    return;
  }
  if (flags.json) {
    console.log(JSON.stringify(projects, null, 2));
    return;
  }
  if (projects.length === 0) {
    console.log(c.yellow("No projects matched the given filters."));
    return;
  }
  const tokenStatusByFolder = await time3("tokens:project", async () => {
    const pairs = await Promise.all(projects.map(async (p) => {
      const service = projectTokenService(p);
      const tokenName = projectTokenName(p);
      const res = await keychainGet(tokenName, service);
      let status = "missing";
      if (res.ok) {
        status = res.value ? "keychain" : "missing";
      } else {
        status = res.code === "NO_API" ? "unsupported" : res.code === "ACCESS_DENIED" ? "denied" : "error";
      }
      return [p.folder, status];
    }));
    return new Map(pairs);
  });
  if (flags["debug-tokens"]) {
    console.log();
    console.log(c.bold("  Token Debug (service/name)"));
    console.log();
    for (const p of projects) {
      const service = projectTokenService(p);
      const tokenName = projectTokenName(p);
      console.log(`    ${c.cyan(p.folder.padEnd(28))} ${service} / ${tokenName}`);
    }
  }
  const elapsed = ((Bun.nanoseconds() - t0) / 1e6).toFixed(1);
  if (_profileEnabled && _profileStartNs !== null && _profileStartMem) {
    const endMem = process.memoryUsage();
    _profileSummary = {
      projectsScanned: projects.length,
      scanMs: Number(elapsed),
      memoryDeltaBytes: endMem.rss - _profileStartMem.rss
    };
  }
  console.log();
  const now = new Date;
  const scanTime = fmtStamp(now);
  const _commitHash = getGitCommitHash();
  console.log(c.bold(c.cyan(`  Project Scanner \u2014 ${projects.length} projects scanned in ${elapsed}ms (bun ${Bun.version} ${Bun.revision.slice(0, 9)}${_commitHash ? ` ${_commitHash.slice(0, 9)}` : ""})`)));
  console.log(c.dim(`  ${scanTime}`));
  console.log();
  renderTable(projects, !!flags.detail, tokenStatusByFolder);
  const prevSnapshot = await loadXrefSnapshot(flags["audit-compare"] ?? undefined);
  if (prevSnapshot) {
    const { entries: currentXref } = await scanXrefData(projects, prevSnapshot);
    const prevMap = new Map;
    for (const p of prevSnapshot.projects)
      prevMap.set(p.folder, p);
    const currentFolders = new Set(currentXref.map((x) => x.folder));
    const prevFolders = new Set(prevSnapshot.projects.map((p) => p.folder));
    const newCount = currentXref.filter((x) => !prevFolders.has(x.folder)).length;
    const removedCount = prevSnapshot.projects.filter((p) => !currentFolders.has(p.folder)).length;
    let changedCount = 0;
    let trustedDelta = 0;
    let nativeDelta = 0;
    for (const x of currentXref) {
      const prev = prevMap.get(x.folder);
      if (!prev)
        continue;
      if (x.bunDefault.length !== prev.bunDefault.length || x.explicit.length !== prev.explicit.length || x.blocked.length !== prev.blocked.length)
        changedCount++;
      trustedDelta += x.explicit.length - prev.explicit.length;
      nativeDelta += x.bunDefault.length - prev.bunDefault.length;
    }
    const hasDrift = newCount > 0 || removedCount > 0 || changedCount > 0;
    const footer = {
      Snapshot: prevSnapshot.timestamp.slice(0, 10),
      "Projects \u0394": `+${newCount}/-${removedCount}`,
      "Trusted \u0394": trustedDelta >= 0 ? `+${trustedDelta}` : String(trustedDelta),
      "Native \u0394": nativeDelta >= 0 ? `+${nativeDelta}` : String(nativeDelta),
      "Linker \u0394": "0",
      Drift: hasDrift ? "DETECTED" : "none"
    };
    console.log(Bun.inspect.table([footer], { colors: _useColor }));
    if (!flags["no-auto-snapshot"]) {
      await saveXrefSnapshot(currentXref, projects.filter((p) => p.hasPkg).length);
    }
    const auditLogPath = `${SNAPSHOT_DIR}/audit.jsonl`;
    const logNow = new Date;
    const entry = {
      timestamp: logNow.toISOString(),
      date: fmtDate(logNow),
      tz: _tz,
      tzOverride: _tzExplicit,
      scanDuration: elapsed,
      projectsScanned: projects.length,
      projectsChanged: changedCount,
      snapshotHash: _commitHash,
      driftDetected: hasDrift,
      user: Bun.env.USER ?? "unknown",
      cwd: import.meta.dir
    };
    await ensureSnapshotDir();
    await appendFile(auditLogPath, JSON.stringify(entry) + `
`);
  }
  if (flags.rss) {
    console.log();
    await publishTokenEventsRss();
    await publishScanResultsRss(projects);
  }
  if (flags["advisory-feed"]) {
    await consumeAdvisoryFeed(flags["advisory-feed"], projects);
  }
}
if (import.meta.main) {
  main().catch((err) => {
    console.error(c.red("Fatal:"), err);
    process.exit(1);
  });
}
export {
  validateTokenValue,
  validateThreatFeed,
  tokenValueWarnings,
  tokenSource,
  timeSince,
  shouldWarnMise,
  semverCompare,
  semverBumpType,
  scanProject,
  platformHelp,
  parseTzFromEnv,
  parseRssFeed,
  parseEnvVar,
  keychainSet,
  keychainGet,
  keychainDelete,
  isVulnerable,
  isValidTokenName,
  isFeatureFlagActive,
  getGitCommitHashShort,
  getGitCommitHash,
  generateRssXml,
  escapeXml,
  effectiveLinker,
  decodeXmlEntities,
  classifyKeychainError,
  classifyEnvFlag,
  XrefSnapshotSchema,
  XrefEntrySchema,
  ThreatFeedSchema,
  ThreatFeedItemSchema,
  ProjectInfoSchema,
  PackageJsonSchema,
  NpmPersonSchema,
  NpmDistSchema,
  BunInfoResponseSchema,
  BUN_TOKEN_AUDIT_RSS_PATH,
  BUN_SCAN_RESULTS_RSS_PATH,
  BUN_KEYCHAIN_TOKEN_NAMES,
  BUN_KEYCHAIN_SERVICE_LEGACY,
  BUN_KEYCHAIN_SERVICE,
  BUN_ADVISORY_MATCHES_PATH
};
