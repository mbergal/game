"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all4) => {
    for (var name in all4)
      __defProp(target, name, { get: all4[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/lodash/lodash.js
  var require_lodash = __commonJS({
    "node_modules/lodash/lodash.js"(exports, module) {
      (function() {
        var undefined;
        var VERSION = "4.17.21";
        var LARGE_ARRAY_SIZE = 200;
        var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
        var HASH_UNDEFINED = "__lodash_hash_undefined__";
        var MAX_MEMOIZE_SIZE = 500;
        var PLACEHOLDER = "__lodash_placeholder__";
        var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
        var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
        var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
        var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
        var HOT_COUNT = 800, HOT_SPAN = 16;
        var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
        var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
        var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
        var wrapFlags = [
          ["ary", WRAP_ARY_FLAG],
          ["bind", WRAP_BIND_FLAG],
          ["bindKey", WRAP_BIND_KEY_FLAG],
          ["curry", WRAP_CURRY_FLAG],
          ["curryRight", WRAP_CURRY_RIGHT_FLAG],
          ["flip", WRAP_FLIP_FLAG],
          ["partial", WRAP_PARTIAL_FLAG],
          ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
          ["rearg", WRAP_REARG_FLAG]
        ];
        var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
        var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
        var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
        var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
        var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
        var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
        var reTrimStart = /^\s+/;
        var reWhitespace = /\s/;
        var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
        var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
        var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
        var reEscapeChar = /\\(\\)?/g;
        var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
        var reFlags = /\w*$/;
        var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
        var reIsBinary = /^0b[01]+$/i;
        var reIsHostCtor = /^\[object .+?Constructor\]$/;
        var reIsOctal = /^0o[0-7]+$/i;
        var reIsUint = /^(?:0|[1-9]\d*)$/;
        var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
        var reNoMatch = /($^)/;
        var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
        var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
        var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
        var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
        var reApos = RegExp(rsApos, "g");
        var reComboMark = RegExp(rsCombo, "g");
        var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
        var reUnicodeWord = RegExp([
          rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
          rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
          rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
          rsUpper + "+" + rsOptContrUpper,
          rsOrdUpper,
          rsOrdLower,
          rsDigits,
          rsEmoji
        ].join("|"), "g");
        var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
        var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
        var contextProps = [
          "Array",
          "Buffer",
          "DataView",
          "Date",
          "Error",
          "Float32Array",
          "Float64Array",
          "Function",
          "Int8Array",
          "Int16Array",
          "Int32Array",
          "Map",
          "Math",
          "Object",
          "Promise",
          "RegExp",
          "Set",
          "String",
          "Symbol",
          "TypeError",
          "Uint8Array",
          "Uint8ClampedArray",
          "Uint16Array",
          "Uint32Array",
          "WeakMap",
          "_",
          "clearTimeout",
          "isFinite",
          "parseInt",
          "setTimeout"
        ];
        var templateCounter = -1;
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
        var cloneableTags = {};
        cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
        cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
        var deburredLetters = {
          // Latin-1 Supplement block.
          "\xC0": "A",
          "\xC1": "A",
          "\xC2": "A",
          "\xC3": "A",
          "\xC4": "A",
          "\xC5": "A",
          "\xE0": "a",
          "\xE1": "a",
          "\xE2": "a",
          "\xE3": "a",
          "\xE4": "a",
          "\xE5": "a",
          "\xC7": "C",
          "\xE7": "c",
          "\xD0": "D",
          "\xF0": "d",
          "\xC8": "E",
          "\xC9": "E",
          "\xCA": "E",
          "\xCB": "E",
          "\xE8": "e",
          "\xE9": "e",
          "\xEA": "e",
          "\xEB": "e",
          "\xCC": "I",
          "\xCD": "I",
          "\xCE": "I",
          "\xCF": "I",
          "\xEC": "i",
          "\xED": "i",
          "\xEE": "i",
          "\xEF": "i",
          "\xD1": "N",
          "\xF1": "n",
          "\xD2": "O",
          "\xD3": "O",
          "\xD4": "O",
          "\xD5": "O",
          "\xD6": "O",
          "\xD8": "O",
          "\xF2": "o",
          "\xF3": "o",
          "\xF4": "o",
          "\xF5": "o",
          "\xF6": "o",
          "\xF8": "o",
          "\xD9": "U",
          "\xDA": "U",
          "\xDB": "U",
          "\xDC": "U",
          "\xF9": "u",
          "\xFA": "u",
          "\xFB": "u",
          "\xFC": "u",
          "\xDD": "Y",
          "\xFD": "y",
          "\xFF": "y",
          "\xC6": "Ae",
          "\xE6": "ae",
          "\xDE": "Th",
          "\xFE": "th",
          "\xDF": "ss",
          // Latin Extended-A block.
          "\u0100": "A",
          "\u0102": "A",
          "\u0104": "A",
          "\u0101": "a",
          "\u0103": "a",
          "\u0105": "a",
          "\u0106": "C",
          "\u0108": "C",
          "\u010A": "C",
          "\u010C": "C",
          "\u0107": "c",
          "\u0109": "c",
          "\u010B": "c",
          "\u010D": "c",
          "\u010E": "D",
          "\u0110": "D",
          "\u010F": "d",
          "\u0111": "d",
          "\u0112": "E",
          "\u0114": "E",
          "\u0116": "E",
          "\u0118": "E",
          "\u011A": "E",
          "\u0113": "e",
          "\u0115": "e",
          "\u0117": "e",
          "\u0119": "e",
          "\u011B": "e",
          "\u011C": "G",
          "\u011E": "G",
          "\u0120": "G",
          "\u0122": "G",
          "\u011D": "g",
          "\u011F": "g",
          "\u0121": "g",
          "\u0123": "g",
          "\u0124": "H",
          "\u0126": "H",
          "\u0125": "h",
          "\u0127": "h",
          "\u0128": "I",
          "\u012A": "I",
          "\u012C": "I",
          "\u012E": "I",
          "\u0130": "I",
          "\u0129": "i",
          "\u012B": "i",
          "\u012D": "i",
          "\u012F": "i",
          "\u0131": "i",
          "\u0134": "J",
          "\u0135": "j",
          "\u0136": "K",
          "\u0137": "k",
          "\u0138": "k",
          "\u0139": "L",
          "\u013B": "L",
          "\u013D": "L",
          "\u013F": "L",
          "\u0141": "L",
          "\u013A": "l",
          "\u013C": "l",
          "\u013E": "l",
          "\u0140": "l",
          "\u0142": "l",
          "\u0143": "N",
          "\u0145": "N",
          "\u0147": "N",
          "\u014A": "N",
          "\u0144": "n",
          "\u0146": "n",
          "\u0148": "n",
          "\u014B": "n",
          "\u014C": "O",
          "\u014E": "O",
          "\u0150": "O",
          "\u014D": "o",
          "\u014F": "o",
          "\u0151": "o",
          "\u0154": "R",
          "\u0156": "R",
          "\u0158": "R",
          "\u0155": "r",
          "\u0157": "r",
          "\u0159": "r",
          "\u015A": "S",
          "\u015C": "S",
          "\u015E": "S",
          "\u0160": "S",
          "\u015B": "s",
          "\u015D": "s",
          "\u015F": "s",
          "\u0161": "s",
          "\u0162": "T",
          "\u0164": "T",
          "\u0166": "T",
          "\u0163": "t",
          "\u0165": "t",
          "\u0167": "t",
          "\u0168": "U",
          "\u016A": "U",
          "\u016C": "U",
          "\u016E": "U",
          "\u0170": "U",
          "\u0172": "U",
          "\u0169": "u",
          "\u016B": "u",
          "\u016D": "u",
          "\u016F": "u",
          "\u0171": "u",
          "\u0173": "u",
          "\u0174": "W",
          "\u0175": "w",
          "\u0176": "Y",
          "\u0177": "y",
          "\u0178": "Y",
          "\u0179": "Z",
          "\u017B": "Z",
          "\u017D": "Z",
          "\u017A": "z",
          "\u017C": "z",
          "\u017E": "z",
          "\u0132": "IJ",
          "\u0133": "ij",
          "\u0152": "Oe",
          "\u0153": "oe",
          "\u0149": "'n",
          "\u017F": "s"
        };
        var htmlEscapes = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };
        var htmlUnescapes = {
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&#39;": "'"
        };
        var stringEscapes = {
          "\\": "\\",
          "'": "'",
          "\n": "n",
          "\r": "r",
          "\u2028": "u2028",
          "\u2029": "u2029"
        };
        var freeParseFloat = parseFloat, freeParseInt = parseInt;
        var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
        var freeSelf = typeof self == "object" && self && self.Object === Object && self;
        var root = freeGlobal || freeSelf || Function("return this")();
        var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
        var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
        var moduleExports = freeModule && freeModule.exports === freeExports;
        var freeProcess = moduleExports && freeGlobal.process;
        var nodeUtil = function() {
          try {
            var types = freeModule && freeModule.require && freeModule.require("util").types;
            if (types) {
              return types;
            }
            return freeProcess && freeProcess.binding && freeProcess.binding("util");
          } catch (e2) {
          }
        }();
        var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
        function apply(func, thisArg, args) {
          switch (args.length) {
            case 0:
              return func.call(thisArg);
            case 1:
              return func.call(thisArg, args[0]);
            case 2:
              return func.call(thisArg, args[0], args[1]);
            case 3:
              return func.call(thisArg, args[0], args[1], args[2]);
          }
          return func.apply(thisArg, args);
        }
        __name(apply, "apply");
        function arrayAggregator(array, setter, iteratee, accumulator) {
          var index = -1, length2 = array == null ? 0 : array.length;
          while (++index < length2) {
            var value = array[index];
            setter(accumulator, value, iteratee(value), array);
          }
          return accumulator;
        }
        __name(arrayAggregator, "arrayAggregator");
        function arrayEach(array, iteratee) {
          var index = -1, length2 = array == null ? 0 : array.length;
          while (++index < length2) {
            if (iteratee(array[index], index, array) === false) {
              break;
            }
          }
          return array;
        }
        __name(arrayEach, "arrayEach");
        function arrayEachRight(array, iteratee) {
          var length2 = array == null ? 0 : array.length;
          while (length2--) {
            if (iteratee(array[length2], length2, array) === false) {
              break;
            }
          }
          return array;
        }
        __name(arrayEachRight, "arrayEachRight");
        function arrayEvery(array, predicate) {
          var index = -1, length2 = array == null ? 0 : array.length;
          while (++index < length2) {
            if (!predicate(array[index], index, array)) {
              return false;
            }
          }
          return true;
        }
        __name(arrayEvery, "arrayEvery");
        function arrayFilter(array, predicate) {
          var index = -1, length2 = array == null ? 0 : array.length, resIndex = 0, result = [];
          while (++index < length2) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result[resIndex++] = value;
            }
          }
          return result;
        }
        __name(arrayFilter, "arrayFilter");
        function arrayIncludes(array, value) {
          var length2 = array == null ? 0 : array.length;
          return !!length2 && baseIndexOf(array, value, 0) > -1;
        }
        __name(arrayIncludes, "arrayIncludes");
        function arrayIncludesWith(array, value, comparator) {
          var index = -1, length2 = array == null ? 0 : array.length;
          while (++index < length2) {
            if (comparator(value, array[index])) {
              return true;
            }
          }
          return false;
        }
        __name(arrayIncludesWith, "arrayIncludesWith");
        function arrayMap(array, iteratee) {
          var index = -1, length2 = array == null ? 0 : array.length, result = Array(length2);
          while (++index < length2) {
            result[index] = iteratee(array[index], index, array);
          }
          return result;
        }
        __name(arrayMap, "arrayMap");
        function arrayPush(array, values) {
          var index = -1, length2 = values.length, offset2 = array.length;
          while (++index < length2) {
            array[offset2 + index] = values[index];
          }
          return array;
        }
        __name(arrayPush, "arrayPush");
        function arrayReduce(array, iteratee, accumulator, initAccum) {
          var index = -1, length2 = array == null ? 0 : array.length;
          if (initAccum && length2) {
            accumulator = array[++index];
          }
          while (++index < length2) {
            accumulator = iteratee(accumulator, array[index], index, array);
          }
          return accumulator;
        }
        __name(arrayReduce, "arrayReduce");
        function arrayReduceRight(array, iteratee, accumulator, initAccum) {
          var length2 = array == null ? 0 : array.length;
          if (initAccum && length2) {
            accumulator = array[--length2];
          }
          while (length2--) {
            accumulator = iteratee(accumulator, array[length2], length2, array);
          }
          return accumulator;
        }
        __name(arrayReduceRight, "arrayReduceRight");
        function arraySome(array, predicate) {
          var index = -1, length2 = array == null ? 0 : array.length;
          while (++index < length2) {
            if (predicate(array[index], index, array)) {
              return true;
            }
          }
          return false;
        }
        __name(arraySome, "arraySome");
        var asciiSize = baseProperty("length");
        function asciiToArray(string) {
          return string.split("");
        }
        __name(asciiToArray, "asciiToArray");
        function asciiWords(string) {
          return string.match(reAsciiWord) || [];
        }
        __name(asciiWords, "asciiWords");
        function baseFindKey(collection, predicate, eachFunc) {
          var result;
          eachFunc(collection, function(value, key, collection2) {
            if (predicate(value, key, collection2)) {
              result = key;
              return false;
            }
          });
          return result;
        }
        __name(baseFindKey, "baseFindKey");
        function baseFindIndex(array, predicate, fromIndex, fromRight) {
          var length2 = array.length, index = fromIndex + (fromRight ? 1 : -1);
          while (fromRight ? index-- : ++index < length2) {
            if (predicate(array[index], index, array)) {
              return index;
            }
          }
          return -1;
        }
        __name(baseFindIndex, "baseFindIndex");
        function baseIndexOf(array, value, fromIndex) {
          return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
        }
        __name(baseIndexOf, "baseIndexOf");
        function baseIndexOfWith(array, value, fromIndex, comparator) {
          var index = fromIndex - 1, length2 = array.length;
          while (++index < length2) {
            if (comparator(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        __name(baseIndexOfWith, "baseIndexOfWith");
        function baseIsNaN(value) {
          return value !== value;
        }
        __name(baseIsNaN, "baseIsNaN");
        function baseMean(array, iteratee) {
          var length2 = array == null ? 0 : array.length;
          return length2 ? baseSum(array, iteratee) / length2 : NAN;
        }
        __name(baseMean, "baseMean");
        function baseProperty(key) {
          return function(object) {
            return object == null ? undefined : object[key];
          };
        }
        __name(baseProperty, "baseProperty");
        function basePropertyOf(object) {
          return function(key) {
            return object == null ? undefined : object[key];
          };
        }
        __name(basePropertyOf, "basePropertyOf");
        function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
          eachFunc(collection, function(value, index, collection2) {
            accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
          });
          return accumulator;
        }
        __name(baseReduce, "baseReduce");
        function baseSortBy(array, comparer) {
          var length2 = array.length;
          array.sort(comparer);
          while (length2--) {
            array[length2] = array[length2].value;
          }
          return array;
        }
        __name(baseSortBy, "baseSortBy");
        function baseSum(array, iteratee) {
          var result, index = -1, length2 = array.length;
          while (++index < length2) {
            var current = iteratee(array[index]);
            if (current !== undefined) {
              result = result === undefined ? current : result + current;
            }
          }
          return result;
        }
        __name(baseSum, "baseSum");
        function baseTimes(n2, iteratee) {
          var index = -1, result = Array(n2);
          while (++index < n2) {
            result[index] = iteratee(index);
          }
          return result;
        }
        __name(baseTimes, "baseTimes");
        function baseToPairs(object, props) {
          return arrayMap(props, function(key) {
            return [key, object[key]];
          });
        }
        __name(baseToPairs, "baseToPairs");
        function baseTrim(string) {
          return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
        }
        __name(baseTrim, "baseTrim");
        function baseUnary(func) {
          return function(value) {
            return func(value);
          };
        }
        __name(baseUnary, "baseUnary");
        function baseValues(object, props) {
          return arrayMap(props, function(key) {
            return object[key];
          });
        }
        __name(baseValues, "baseValues");
        function cacheHas(cache, key) {
          return cache.has(key);
        }
        __name(cacheHas, "cacheHas");
        function charsStartIndex(strSymbols, chrSymbols) {
          var index = -1, length2 = strSymbols.length;
          while (++index < length2 && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        __name(charsStartIndex, "charsStartIndex");
        function charsEndIndex(strSymbols, chrSymbols) {
          var index = strSymbols.length;
          while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        __name(charsEndIndex, "charsEndIndex");
        function countHolders(array, placeholder) {
          var length2 = array.length, result = 0;
          while (length2--) {
            if (array[length2] === placeholder) {
              ++result;
            }
          }
          return result;
        }
        __name(countHolders, "countHolders");
        var deburrLetter = basePropertyOf(deburredLetters);
        var escapeHtmlChar = basePropertyOf(htmlEscapes);
        function escapeStringChar(chr) {
          return "\\" + stringEscapes[chr];
        }
        __name(escapeStringChar, "escapeStringChar");
        function getValue(object, key) {
          return object == null ? undefined : object[key];
        }
        __name(getValue, "getValue");
        function hasUnicode(string) {
          return reHasUnicode.test(string);
        }
        __name(hasUnicode, "hasUnicode");
        function hasUnicodeWord(string) {
          return reHasUnicodeWord.test(string);
        }
        __name(hasUnicodeWord, "hasUnicodeWord");
        function iteratorToArray(iterator) {
          var data, result = [];
          while (!(data = iterator.next()).done) {
            result.push(data.value);
          }
          return result;
        }
        __name(iteratorToArray, "iteratorToArray");
        function mapToArray(map2) {
          var index = -1, result = Array(map2.size);
          map2.forEach(function(value, key) {
            result[++index] = [key, value];
          });
          return result;
        }
        __name(mapToArray, "mapToArray");
        function overArg(func, transform) {
          return function(arg) {
            return func(transform(arg));
          };
        }
        __name(overArg, "overArg");
        function replaceHolders(array, placeholder) {
          var index = -1, length2 = array.length, resIndex = 0, result = [];
          while (++index < length2) {
            var value = array[index];
            if (value === placeholder || value === PLACEHOLDER) {
              array[index] = PLACEHOLDER;
              result[resIndex++] = index;
            }
          }
          return result;
        }
        __name(replaceHolders, "replaceHolders");
        function setToArray(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = value;
          });
          return result;
        }
        __name(setToArray, "setToArray");
        function setToPairs(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = [value, value];
          });
          return result;
        }
        __name(setToPairs, "setToPairs");
        function strictIndexOf(array, value, fromIndex) {
          var index = fromIndex - 1, length2 = array.length;
          while (++index < length2) {
            if (array[index] === value) {
              return index;
            }
          }
          return -1;
        }
        __name(strictIndexOf, "strictIndexOf");
        function strictLastIndexOf(array, value, fromIndex) {
          var index = fromIndex + 1;
          while (index--) {
            if (array[index] === value) {
              return index;
            }
          }
          return index;
        }
        __name(strictLastIndexOf, "strictLastIndexOf");
        function stringSize(string) {
          return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
        }
        __name(stringSize, "stringSize");
        function stringToArray(string) {
          return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
        }
        __name(stringToArray, "stringToArray");
        function trimmedEndIndex(string) {
          var index = string.length;
          while (index-- && reWhitespace.test(string.charAt(index))) {
          }
          return index;
        }
        __name(trimmedEndIndex, "trimmedEndIndex");
        var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
        function unicodeSize(string) {
          var result = reUnicode.lastIndex = 0;
          while (reUnicode.test(string)) {
            ++result;
          }
          return result;
        }
        __name(unicodeSize, "unicodeSize");
        function unicodeToArray(string) {
          return string.match(reUnicode) || [];
        }
        __name(unicodeToArray, "unicodeToArray");
        function unicodeWords(string) {
          return string.match(reUnicodeWord) || [];
        }
        __name(unicodeWords, "unicodeWords");
        var runInContext = /* @__PURE__ */ __name(function runInContext2(context) {
          context = context == null ? root : _15.defaults(root.Object(), context, _15.pick(root, contextProps));
          var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String = context.String, TypeError2 = context.TypeError;
          var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
          var coreJsData = context["__core-js_shared__"];
          var funcToString = funcProto.toString;
          var hasOwnProperty = objectProto.hasOwnProperty;
          var idCounter = 0;
          var maskSrcKey = function() {
            var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
            return uid ? "Symbol(src)_1." + uid : "";
          }();
          var nativeObjectToString = objectProto.toString;
          var objectCtorString = funcToString.call(Object2);
          var oldDash = root._;
          var reIsNative = RegExp2(
            "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
          );
          var Buffer2 = moduleExports ? context.Buffer : undefined, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined, symIterator = Symbol2 ? Symbol2.iterator : undefined, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined;
          var defineProperty = function() {
            try {
              var func = getNative(Object2, "defineProperty");
              func({}, "", {});
              return func;
            } catch (e2) {
            }
          }();
          var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
          var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
          var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
          var metaMap = WeakMap && new WeakMap();
          var realNames = {};
          var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap);
          var symbolProto = Symbol2 ? Symbol2.prototype : undefined, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined, symbolToString = symbolProto ? symbolProto.toString : undefined;
          function lodash(value) {
            if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
              if (value instanceof LodashWrapper) {
                return value;
              }
              if (hasOwnProperty.call(value, "__wrapped__")) {
                return wrapperClone(value);
              }
            }
            return new LodashWrapper(value);
          }
          __name(lodash, "lodash");
          var baseCreate = /* @__PURE__ */ function() {
            function object() {
            }
            __name(object, "object");
            return function(proto) {
              if (!isObject(proto)) {
                return {};
              }
              if (objectCreate) {
                return objectCreate(proto);
              }
              object.prototype = proto;
              var result2 = new object();
              object.prototype = undefined;
              return result2;
            };
          }();
          function baseLodash() {
          }
          __name(baseLodash, "baseLodash");
          function LodashWrapper(value, chainAll) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__chain__ = !!chainAll;
            this.__index__ = 0;
            this.__values__ = undefined;
          }
          __name(LodashWrapper, "LodashWrapper");
          lodash.templateSettings = {
            /**
             * Used to detect `data` property values to be HTML-escaped.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            "escape": reEscape,
            /**
             * Used to detect code to be evaluated.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            "evaluate": reEvaluate,
            /**
             * Used to detect `data` property values to inject.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            "interpolate": reInterpolate,
            /**
             * Used to reference the data object in the template text.
             *
             * @memberOf _.templateSettings
             * @type {string}
             */
            "variable": "",
            /**
             * Used to import variables into the compiled template.
             *
             * @memberOf _.templateSettings
             * @type {Object}
             */
            "imports": {
              /**
               * A reference to the `lodash` function.
               *
               * @memberOf _.templateSettings.imports
               * @type {Function}
               */
              "_": lodash
            }
          };
          lodash.prototype = baseLodash.prototype;
          lodash.prototype.constructor = lodash;
          LodashWrapper.prototype = baseCreate(baseLodash.prototype);
          LodashWrapper.prototype.constructor = LodashWrapper;
          function LazyWrapper(value) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__dir__ = 1;
            this.__filtered__ = false;
            this.__iteratees__ = [];
            this.__takeCount__ = MAX_ARRAY_LENGTH;
            this.__views__ = [];
          }
          __name(LazyWrapper, "LazyWrapper");
          function lazyClone() {
            var result2 = new LazyWrapper(this.__wrapped__);
            result2.__actions__ = copyArray(this.__actions__);
            result2.__dir__ = this.__dir__;
            result2.__filtered__ = this.__filtered__;
            result2.__iteratees__ = copyArray(this.__iteratees__);
            result2.__takeCount__ = this.__takeCount__;
            result2.__views__ = copyArray(this.__views__);
            return result2;
          }
          __name(lazyClone, "lazyClone");
          function lazyReverse() {
            if (this.__filtered__) {
              var result2 = new LazyWrapper(this);
              result2.__dir__ = -1;
              result2.__filtered__ = true;
            } else {
              result2 = this.clone();
              result2.__dir__ *= -1;
            }
            return result2;
          }
          __name(lazyReverse, "lazyReverse");
          function lazyValue() {
            var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length2 = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length2, this.__takeCount__);
            if (!isArr || !isRight && arrLength == length2 && takeCount == length2) {
              return baseWrapperValue(array, this.__actions__);
            }
            var result2 = [];
            outer:
              while (length2-- && resIndex < takeCount) {
                index += dir;
                var iterIndex = -1, value = array[index];
                while (++iterIndex < iterLength) {
                  var data = iteratees[iterIndex], iteratee2 = data.iteratee, type8 = data.type, computed = iteratee2(value);
                  if (type8 == LAZY_MAP_FLAG) {
                    value = computed;
                  } else if (!computed) {
                    if (type8 == LAZY_FILTER_FLAG) {
                      continue outer;
                    } else {
                      break outer;
                    }
                  }
                }
                result2[resIndex++] = value;
              }
            return result2;
          }
          __name(lazyValue, "lazyValue");
          LazyWrapper.prototype = baseCreate(baseLodash.prototype);
          LazyWrapper.prototype.constructor = LazyWrapper;
          function Hash(entries) {
            var index = -1, length2 = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length2) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          __name(Hash, "Hash");
          function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
            this.size = 0;
          }
          __name(hashClear, "hashClear");
          function hashDelete(key) {
            var result2 = this.has(key) && delete this.__data__[key];
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          __name(hashDelete, "hashDelete");
          function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
              var result2 = data[key];
              return result2 === HASH_UNDEFINED ? undefined : result2;
            }
            return hasOwnProperty.call(data, key) ? data[key] : undefined;
          }
          __name(hashGet, "hashGet");
          function hashHas(key) {
            var data = this.__data__;
            return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
          }
          __name(hashHas, "hashHas");
          function hashSet(key, value) {
            var data = this.__data__;
            this.size += this.has(key) ? 0 : 1;
            data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
            return this;
          }
          __name(hashSet, "hashSet");
          Hash.prototype.clear = hashClear;
          Hash.prototype["delete"] = hashDelete;
          Hash.prototype.get = hashGet;
          Hash.prototype.has = hashHas;
          Hash.prototype.set = hashSet;
          function ListCache(entries) {
            var index = -1, length2 = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length2) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          __name(ListCache, "ListCache");
          function listCacheClear() {
            this.__data__ = [];
            this.size = 0;
          }
          __name(listCacheClear, "listCacheClear");
          function listCacheDelete(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              return false;
            }
            var lastIndex = data.length - 1;
            if (index == lastIndex) {
              data.pop();
            } else {
              splice.call(data, index, 1);
            }
            --this.size;
            return true;
          }
          __name(listCacheDelete, "listCacheDelete");
          function listCacheGet(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            return index < 0 ? undefined : data[index][1];
          }
          __name(listCacheGet, "listCacheGet");
          function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1;
          }
          __name(listCacheHas, "listCacheHas");
          function listCacheSet(key, value) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              ++this.size;
              data.push([key, value]);
            } else {
              data[index][1] = value;
            }
            return this;
          }
          __name(listCacheSet, "listCacheSet");
          ListCache.prototype.clear = listCacheClear;
          ListCache.prototype["delete"] = listCacheDelete;
          ListCache.prototype.get = listCacheGet;
          ListCache.prototype.has = listCacheHas;
          ListCache.prototype.set = listCacheSet;
          function MapCache(entries) {
            var index = -1, length2 = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length2) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          __name(MapCache, "MapCache");
          function mapCacheClear() {
            this.size = 0;
            this.__data__ = {
              "hash": new Hash(),
              "map": new (Map2 || ListCache)(),
              "string": new Hash()
            };
          }
          __name(mapCacheClear, "mapCacheClear");
          function mapCacheDelete(key) {
            var result2 = getMapData(this, key)["delete"](key);
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          __name(mapCacheDelete, "mapCacheDelete");
          function mapCacheGet(key) {
            return getMapData(this, key).get(key);
          }
          __name(mapCacheGet, "mapCacheGet");
          function mapCacheHas(key) {
            return getMapData(this, key).has(key);
          }
          __name(mapCacheHas, "mapCacheHas");
          function mapCacheSet(key, value) {
            var data = getMapData(this, key), size3 = data.size;
            data.set(key, value);
            this.size += data.size == size3 ? 0 : 1;
            return this;
          }
          __name(mapCacheSet, "mapCacheSet");
          MapCache.prototype.clear = mapCacheClear;
          MapCache.prototype["delete"] = mapCacheDelete;
          MapCache.prototype.get = mapCacheGet;
          MapCache.prototype.has = mapCacheHas;
          MapCache.prototype.set = mapCacheSet;
          function SetCache(values2) {
            var index = -1, length2 = values2 == null ? 0 : values2.length;
            this.__data__ = new MapCache();
            while (++index < length2) {
              this.add(values2[index]);
            }
          }
          __name(SetCache, "SetCache");
          function setCacheAdd(value) {
            this.__data__.set(value, HASH_UNDEFINED);
            return this;
          }
          __name(setCacheAdd, "setCacheAdd");
          function setCacheHas(value) {
            return this.__data__.has(value);
          }
          __name(setCacheHas, "setCacheHas");
          SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
          SetCache.prototype.has = setCacheHas;
          function Stack(entries) {
            var data = this.__data__ = new ListCache(entries);
            this.size = data.size;
          }
          __name(Stack, "Stack");
          function stackClear() {
            this.__data__ = new ListCache();
            this.size = 0;
          }
          __name(stackClear, "stackClear");
          function stackDelete(key) {
            var data = this.__data__, result2 = data["delete"](key);
            this.size = data.size;
            return result2;
          }
          __name(stackDelete, "stackDelete");
          function stackGet(key) {
            return this.__data__.get(key);
          }
          __name(stackGet, "stackGet");
          function stackHas(key) {
            return this.__data__.has(key);
          }
          __name(stackHas, "stackHas");
          function stackSet(key, value) {
            var data = this.__data__;
            if (data instanceof ListCache) {
              var pairs = data.__data__;
              if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
                pairs.push([key, value]);
                this.size = ++data.size;
                return this;
              }
              data = this.__data__ = new MapCache(pairs);
            }
            data.set(key, value);
            this.size = data.size;
            return this;
          }
          __name(stackSet, "stackSet");
          Stack.prototype.clear = stackClear;
          Stack.prototype["delete"] = stackDelete;
          Stack.prototype.get = stackGet;
          Stack.prototype.has = stackHas;
          Stack.prototype.set = stackSet;
          function arrayLikeKeys(value, inherited) {
            var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String) : [], length2 = result2.length;
            for (var key in value) {
              if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
              (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
              isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
              isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
              isIndex(key, length2)))) {
                result2.push(key);
              }
            }
            return result2;
          }
          __name(arrayLikeKeys, "arrayLikeKeys");
          function arraySample(array) {
            var length2 = array.length;
            return length2 ? array[baseRandom(0, length2 - 1)] : undefined;
          }
          __name(arraySample, "arraySample");
          function arraySampleSize(array, n2) {
            return shuffleSelf(copyArray(array), baseClamp(n2, 0, array.length));
          }
          __name(arraySampleSize, "arraySampleSize");
          function arrayShuffle(array) {
            return shuffleSelf(copyArray(array));
          }
          __name(arrayShuffle, "arrayShuffle");
          function assignMergeValue(object, key, value) {
            if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          __name(assignMergeValue, "assignMergeValue");
          function assignValue(object, key, value) {
            var objValue = object[key];
            if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          __name(assignValue, "assignValue");
          function assocIndexOf(array, key) {
            var length2 = array.length;
            while (length2--) {
              if (eq(array[length2][0], key)) {
                return length2;
              }
            }
            return -1;
          }
          __name(assocIndexOf, "assocIndexOf");
          function baseAggregator(collection, setter, iteratee2, accumulator) {
            baseEach(collection, function(value, key, collection2) {
              setter(accumulator, value, iteratee2(value), collection2);
            });
            return accumulator;
          }
          __name(baseAggregator, "baseAggregator");
          function baseAssign(object, source) {
            return object && copyObject(source, keys(source), object);
          }
          __name(baseAssign, "baseAssign");
          function baseAssignIn(object, source) {
            return object && copyObject(source, keysIn(source), object);
          }
          __name(baseAssignIn, "baseAssignIn");
          function baseAssignValue(object, key, value) {
            if (key == "__proto__" && defineProperty) {
              defineProperty(object, key, {
                "configurable": true,
                "enumerable": true,
                "value": value,
                "writable": true
              });
            } else {
              object[key] = value;
            }
          }
          __name(baseAssignValue, "baseAssignValue");
          function baseAt(object, paths) {
            var index = -1, length2 = paths.length, result2 = Array2(length2), skip = object == null;
            while (++index < length2) {
              result2[index] = skip ? undefined : get(object, paths[index]);
            }
            return result2;
          }
          __name(baseAt, "baseAt");
          function baseClamp(number, lower, upper) {
            if (number === number) {
              if (upper !== undefined) {
                number = number <= upper ? number : upper;
              }
              if (lower !== undefined) {
                number = number >= lower ? number : lower;
              }
            }
            return number;
          }
          __name(baseClamp, "baseClamp");
          function baseClone(value, bitmask, customizer, key, object, stack) {
            var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
            if (customizer) {
              result2 = object ? customizer(value, key, object, stack) : customizer(value);
            }
            if (result2 !== undefined) {
              return result2;
            }
            if (!isObject(value)) {
              return value;
            }
            var isArr = isArray(value);
            if (isArr) {
              result2 = initCloneArray(value);
              if (!isDeep) {
                return copyArray(value, result2);
              }
            } else {
              var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
              if (isBuffer(value)) {
                return cloneBuffer(value, isDeep);
              }
              if (tag == objectTag || tag == argsTag || isFunc && !object) {
                result2 = isFlat || isFunc ? {} : initCloneObject(value);
                if (!isDeep) {
                  return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
                }
              } else {
                if (!cloneableTags[tag]) {
                  return object ? value : {};
                }
                result2 = initCloneByTag(value, tag, isDeep);
              }
            }
            stack || (stack = new Stack());
            var stacked = stack.get(value);
            if (stacked) {
              return stacked;
            }
            stack.set(value, result2);
            if (isSet(value)) {
              value.forEach(function(subValue) {
                result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
              });
            } else if (isMap(value)) {
              value.forEach(function(subValue, key2) {
                result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
              });
            }
            var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
            var props = isArr ? undefined : keysFunc(value);
            arrayEach(props || value, function(subValue, key2) {
              if (props) {
                key2 = subValue;
                subValue = value[key2];
              }
              assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
            return result2;
          }
          __name(baseClone, "baseClone");
          function baseConforms(source) {
            var props = keys(source);
            return function(object) {
              return baseConformsTo(object, source, props);
            };
          }
          __name(baseConforms, "baseConforms");
          function baseConformsTo(object, source, props) {
            var length2 = props.length;
            if (object == null) {
              return !length2;
            }
            object = Object2(object);
            while (length2--) {
              var key = props[length2], predicate = source[key], value = object[key];
              if (value === undefined && !(key in object) || !predicate(value)) {
                return false;
              }
            }
            return true;
          }
          __name(baseConformsTo, "baseConformsTo");
          function baseDelay(func, wait, args) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return setTimeout(function() {
              func.apply(undefined, args);
            }, wait);
          }
          __name(baseDelay, "baseDelay");
          function baseDifference(array, values2, iteratee2, comparator) {
            var index = -1, includes2 = arrayIncludes, isCommon = true, length2 = array.length, result2 = [], valuesLength = values2.length;
            if (!length2) {
              return result2;
            }
            if (iteratee2) {
              values2 = arrayMap(values2, baseUnary(iteratee2));
            }
            if (comparator) {
              includes2 = arrayIncludesWith;
              isCommon = false;
            } else if (values2.length >= LARGE_ARRAY_SIZE) {
              includes2 = cacheHas;
              isCommon = false;
              values2 = new SetCache(values2);
            }
            outer:
              while (++index < length2) {
                var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var valuesIndex = valuesLength;
                  while (valuesIndex--) {
                    if (values2[valuesIndex] === computed) {
                      continue outer;
                    }
                  }
                  result2.push(value);
                } else if (!includes2(values2, computed, comparator)) {
                  result2.push(value);
                }
              }
            return result2;
          }
          __name(baseDifference, "baseDifference");
          var baseEach = createBaseEach(baseForOwn);
          var baseEachRight = createBaseEach(baseForOwnRight, true);
          function baseEvery(collection, predicate) {
            var result2 = true;
            baseEach(collection, function(value, index, collection2) {
              result2 = !!predicate(value, index, collection2);
              return result2;
            });
            return result2;
          }
          __name(baseEvery, "baseEvery");
          function baseExtremum(array, iteratee2, comparator) {
            var index = -1, length2 = array.length;
            while (++index < length2) {
              var value = array[index], current = iteratee2(value);
              if (current != null && (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))) {
                var computed = current, result2 = value;
              }
            }
            return result2;
          }
          __name(baseExtremum, "baseExtremum");
          function baseFill(array, value, start, end) {
            var length2 = array.length;
            start = toInteger(start);
            if (start < 0) {
              start = -start > length2 ? 0 : length2 + start;
            }
            end = end === undefined || end > length2 ? length2 : toInteger(end);
            if (end < 0) {
              end += length2;
            }
            end = start > end ? 0 : toLength(end);
            while (start < end) {
              array[start++] = value;
            }
            return array;
          }
          __name(baseFill, "baseFill");
          function baseFilter(collection, predicate) {
            var result2 = [];
            baseEach(collection, function(value, index, collection2) {
              if (predicate(value, index, collection2)) {
                result2.push(value);
              }
            });
            return result2;
          }
          __name(baseFilter, "baseFilter");
          function baseFlatten(array, depth, predicate, isStrict, result2) {
            var index = -1, length2 = array.length;
            predicate || (predicate = isFlattenable);
            result2 || (result2 = []);
            while (++index < length2) {
              var value = array[index];
              if (depth > 0 && predicate(value)) {
                if (depth > 1) {
                  baseFlatten(value, depth - 1, predicate, isStrict, result2);
                } else {
                  arrayPush(result2, value);
                }
              } else if (!isStrict) {
                result2[result2.length] = value;
              }
            }
            return result2;
          }
          __name(baseFlatten, "baseFlatten");
          var baseFor = createBaseFor();
          var baseForRight = createBaseFor(true);
          function baseForOwn(object, iteratee2) {
            return object && baseFor(object, iteratee2, keys);
          }
          __name(baseForOwn, "baseForOwn");
          function baseForOwnRight(object, iteratee2) {
            return object && baseForRight(object, iteratee2, keys);
          }
          __name(baseForOwnRight, "baseForOwnRight");
          function baseFunctions(object, props) {
            return arrayFilter(props, function(key) {
              return isFunction(object[key]);
            });
          }
          __name(baseFunctions, "baseFunctions");
          function baseGet(object, path) {
            path = castPath(path, object);
            var index = 0, length2 = path.length;
            while (object != null && index < length2) {
              object = object[toKey(path[index++])];
            }
            return index && index == length2 ? object : undefined;
          }
          __name(baseGet, "baseGet");
          function baseGetAllKeys(object, keysFunc, symbolsFunc) {
            var result2 = keysFunc(object);
            return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
          }
          __name(baseGetAllKeys, "baseGetAllKeys");
          function baseGetTag(value) {
            if (value == null) {
              return value === undefined ? undefinedTag : nullTag;
            }
            return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
          }
          __name(baseGetTag, "baseGetTag");
          function baseGt(value, other) {
            return value > other;
          }
          __name(baseGt, "baseGt");
          function baseHas(object, key) {
            return object != null && hasOwnProperty.call(object, key);
          }
          __name(baseHas, "baseHas");
          function baseHasIn(object, key) {
            return object != null && key in Object2(object);
          }
          __name(baseHasIn, "baseHasIn");
          function baseInRange(number, start, end) {
            return number >= nativeMin(start, end) && number < nativeMax(start, end);
          }
          __name(baseInRange, "baseInRange");
          function baseIntersection(arrays, iteratee2, comparator) {
            var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length2 = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
            while (othIndex--) {
              var array = arrays[othIndex];
              if (othIndex && iteratee2) {
                array = arrayMap(array, baseUnary(iteratee2));
              }
              maxLength = nativeMin(array.length, maxLength);
              caches[othIndex] = !comparator && (iteratee2 || length2 >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined;
            }
            array = arrays[0];
            var index = -1, seen = caches[0];
            outer:
              while (++index < length2 && result2.length < maxLength) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                  othIndex = othLength;
                  while (--othIndex) {
                    var cache = caches[othIndex];
                    if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                      continue outer;
                    }
                  }
                  if (seen) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          __name(baseIntersection, "baseIntersection");
          function baseInverter(object, setter, iteratee2, accumulator) {
            baseForOwn(object, function(value, key, object2) {
              setter(accumulator, iteratee2(value), key, object2);
            });
            return accumulator;
          }
          __name(baseInverter, "baseInverter");
          function baseInvoke(object, path, args) {
            path = castPath(path, object);
            object = parent(object, path);
            var func = object == null ? object : object[toKey(last(path))];
            return func == null ? undefined : apply(func, object, args);
          }
          __name(baseInvoke, "baseInvoke");
          function baseIsArguments(value) {
            return isObjectLike(value) && baseGetTag(value) == argsTag;
          }
          __name(baseIsArguments, "baseIsArguments");
          function baseIsArrayBuffer(value) {
            return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
          }
          __name(baseIsArrayBuffer, "baseIsArrayBuffer");
          function baseIsDate(value) {
            return isObjectLike(value) && baseGetTag(value) == dateTag;
          }
          __name(baseIsDate, "baseIsDate");
          function baseIsEqual(value, other, bitmask, customizer, stack) {
            if (value === other) {
              return true;
            }
            if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
              return value !== value && other !== other;
            }
            return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
          }
          __name(baseIsEqual, "baseIsEqual");
          function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
            var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
            objTag = objTag == argsTag ? objectTag : objTag;
            othTag = othTag == argsTag ? objectTag : othTag;
            var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
            if (isSameTag && isBuffer(object)) {
              if (!isBuffer(other)) {
                return false;
              }
              objIsArr = true;
              objIsObj = false;
            }
            if (isSameTag && !objIsObj) {
              stack || (stack = new Stack());
              return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
            }
            if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
              var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
              if (objIsWrapped || othIsWrapped) {
                var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
                stack || (stack = new Stack());
                return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
              }
            }
            if (!isSameTag) {
              return false;
            }
            stack || (stack = new Stack());
            return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
          }
          __name(baseIsEqualDeep, "baseIsEqualDeep");
          function baseIsMap(value) {
            return isObjectLike(value) && getTag(value) == mapTag;
          }
          __name(baseIsMap, "baseIsMap");
          function baseIsMatch(object, source, matchData, customizer) {
            var index = matchData.length, length2 = index, noCustomizer = !customizer;
            if (object == null) {
              return !length2;
            }
            object = Object2(object);
            while (index--) {
              var data = matchData[index];
              if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
                return false;
              }
            }
            while (++index < length2) {
              data = matchData[index];
              var key = data[0], objValue = object[key], srcValue = data[1];
              if (noCustomizer && data[2]) {
                if (objValue === undefined && !(key in object)) {
                  return false;
                }
              } else {
                var stack = new Stack();
                if (customizer) {
                  var result2 = customizer(objValue, srcValue, key, object, source, stack);
                }
                if (!(result2 === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                  return false;
                }
              }
            }
            return true;
          }
          __name(baseIsMatch, "baseIsMatch");
          function baseIsNative(value) {
            if (!isObject(value) || isMasked(value)) {
              return false;
            }
            var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
            return pattern.test(toSource(value));
          }
          __name(baseIsNative, "baseIsNative");
          function baseIsRegExp(value) {
            return isObjectLike(value) && baseGetTag(value) == regexpTag;
          }
          __name(baseIsRegExp, "baseIsRegExp");
          function baseIsSet(value) {
            return isObjectLike(value) && getTag(value) == setTag;
          }
          __name(baseIsSet, "baseIsSet");
          function baseIsTypedArray(value) {
            return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
          }
          __name(baseIsTypedArray, "baseIsTypedArray");
          function baseIteratee(value) {
            if (typeof value == "function") {
              return value;
            }
            if (value == null) {
              return identity;
            }
            if (typeof value == "object") {
              return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
            }
            return property(value);
          }
          __name(baseIteratee, "baseIteratee");
          function baseKeys(object) {
            if (!isPrototype(object)) {
              return nativeKeys(object);
            }
            var result2 = [];
            for (var key in Object2(object)) {
              if (hasOwnProperty.call(object, key) && key != "constructor") {
                result2.push(key);
              }
            }
            return result2;
          }
          __name(baseKeys, "baseKeys");
          function baseKeysIn(object) {
            if (!isObject(object)) {
              return nativeKeysIn(object);
            }
            var isProto = isPrototype(object), result2 = [];
            for (var key in object) {
              if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
                result2.push(key);
              }
            }
            return result2;
          }
          __name(baseKeysIn, "baseKeysIn");
          function baseLt(value, other) {
            return value < other;
          }
          __name(baseLt, "baseLt");
          function baseMap(collection, iteratee2) {
            var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value, key, collection2) {
              result2[++index] = iteratee2(value, key, collection2);
            });
            return result2;
          }
          __name(baseMap, "baseMap");
          function baseMatches(source) {
            var matchData = getMatchData(source);
            if (matchData.length == 1 && matchData[0][2]) {
              return matchesStrictComparable(matchData[0][0], matchData[0][1]);
            }
            return function(object) {
              return object === source || baseIsMatch(object, source, matchData);
            };
          }
          __name(baseMatches, "baseMatches");
          function baseMatchesProperty(path, srcValue) {
            if (isKey(path) && isStrictComparable(srcValue)) {
              return matchesStrictComparable(toKey(path), srcValue);
            }
            return function(object) {
              var objValue = get(object, path);
              return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
            };
          }
          __name(baseMatchesProperty, "baseMatchesProperty");
          function baseMerge(object, source, srcIndex, customizer, stack) {
            if (object === source) {
              return;
            }
            baseFor(source, function(srcValue, key) {
              stack || (stack = new Stack());
              if (isObject(srcValue)) {
                baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
              } else {
                var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined;
                if (newValue === undefined) {
                  newValue = srcValue;
                }
                assignMergeValue(object, key, newValue);
              }
            }, keysIn);
          }
          __name(baseMerge, "baseMerge");
          function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
            var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
            if (stacked) {
              assignMergeValue(object, key, stacked);
              return;
            }
            var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined;
            var isCommon = newValue === undefined;
            if (isCommon) {
              var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
              newValue = srcValue;
              if (isArr || isBuff || isTyped) {
                if (isArray(objValue)) {
                  newValue = objValue;
                } else if (isArrayLikeObject(objValue)) {
                  newValue = copyArray(objValue);
                } else if (isBuff) {
                  isCommon = false;
                  newValue = cloneBuffer(srcValue, true);
                } else if (isTyped) {
                  isCommon = false;
                  newValue = cloneTypedArray(srcValue, true);
                } else {
                  newValue = [];
                }
              } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                newValue = objValue;
                if (isArguments(objValue)) {
                  newValue = toPlainObject(objValue);
                } else if (!isObject(objValue) || isFunction(objValue)) {
                  newValue = initCloneObject(srcValue);
                }
              } else {
                isCommon = false;
              }
            }
            if (isCommon) {
              stack.set(srcValue, newValue);
              mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
              stack["delete"](srcValue);
            }
            assignMergeValue(object, key, newValue);
          }
          __name(baseMergeDeep, "baseMergeDeep");
          function baseNth(array, n2) {
            var length2 = array.length;
            if (!length2) {
              return;
            }
            n2 += n2 < 0 ? length2 : 0;
            return isIndex(n2, length2) ? array[n2] : undefined;
          }
          __name(baseNth, "baseNth");
          function baseOrderBy(collection, iteratees, orders) {
            if (iteratees.length) {
              iteratees = arrayMap(iteratees, function(iteratee2) {
                if (isArray(iteratee2)) {
                  return function(value) {
                    return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                  };
                }
                return iteratee2;
              });
            } else {
              iteratees = [identity];
            }
            var index = -1;
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            var result2 = baseMap(collection, function(value, key, collection2) {
              var criteria = arrayMap(iteratees, function(iteratee2) {
                return iteratee2(value);
              });
              return { "criteria": criteria, "index": ++index, "value": value };
            });
            return baseSortBy(result2, function(object, other) {
              return compareMultiple(object, other, orders);
            });
          }
          __name(baseOrderBy, "baseOrderBy");
          function basePick(object, paths) {
            return basePickBy(object, paths, function(value, path) {
              return hasIn(object, path);
            });
          }
          __name(basePick, "basePick");
          function basePickBy(object, paths, predicate) {
            var index = -1, length2 = paths.length, result2 = {};
            while (++index < length2) {
              var path = paths[index], value = baseGet(object, path);
              if (predicate(value, path)) {
                baseSet(result2, castPath(path, object), value);
              }
            }
            return result2;
          }
          __name(basePickBy, "basePickBy");
          function basePropertyDeep(path) {
            return function(object) {
              return baseGet(object, path);
            };
          }
          __name(basePropertyDeep, "basePropertyDeep");
          function basePullAll(array, values2, iteratee2, comparator) {
            var indexOf3 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length2 = values2.length, seen = array;
            if (array === values2) {
              values2 = copyArray(values2);
            }
            if (iteratee2) {
              seen = arrayMap(array, baseUnary(iteratee2));
            }
            while (++index < length2) {
              var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
              while ((fromIndex = indexOf3(seen, computed, fromIndex, comparator)) > -1) {
                if (seen !== array) {
                  splice.call(seen, fromIndex, 1);
                }
                splice.call(array, fromIndex, 1);
              }
            }
            return array;
          }
          __name(basePullAll, "basePullAll");
          function basePullAt(array, indexes) {
            var length2 = array ? indexes.length : 0, lastIndex = length2 - 1;
            while (length2--) {
              var index = indexes[length2];
              if (length2 == lastIndex || index !== previous) {
                var previous = index;
                if (isIndex(index)) {
                  splice.call(array, index, 1);
                } else {
                  baseUnset(array, index);
                }
              }
            }
            return array;
          }
          __name(basePullAt, "basePullAt");
          function baseRandom(lower, upper) {
            return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
          }
          __name(baseRandom, "baseRandom");
          function baseRange(start, end, step, fromRight) {
            var index = -1, length2 = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length2);
            while (length2--) {
              result2[fromRight ? length2 : ++index] = start;
              start += step;
            }
            return result2;
          }
          __name(baseRange, "baseRange");
          function baseRepeat(string, n2) {
            var result2 = "";
            if (!string || n2 < 1 || n2 > MAX_SAFE_INTEGER) {
              return result2;
            }
            do {
              if (n2 % 2) {
                result2 += string;
              }
              n2 = nativeFloor(n2 / 2);
              if (n2) {
                string += string;
              }
            } while (n2);
            return result2;
          }
          __name(baseRepeat, "baseRepeat");
          function baseRest(func, start) {
            return setToString(overRest(func, start, identity), func + "");
          }
          __name(baseRest, "baseRest");
          function baseSample(collection) {
            return arraySample(values(collection));
          }
          __name(baseSample, "baseSample");
          function baseSampleSize(collection, n2) {
            var array = values(collection);
            return shuffleSelf(array, baseClamp(n2, 0, array.length));
          }
          __name(baseSampleSize, "baseSampleSize");
          function baseSet(object, path, value, customizer) {
            if (!isObject(object)) {
              return object;
            }
            path = castPath(path, object);
            var index = -1, length2 = path.length, lastIndex = length2 - 1, nested = object;
            while (nested != null && ++index < length2) {
              var key = toKey(path[index]), newValue = value;
              if (key === "__proto__" || key === "constructor" || key === "prototype") {
                return object;
              }
              if (index != lastIndex) {
                var objValue = nested[key];
                newValue = customizer ? customizer(objValue, key, nested) : undefined;
                if (newValue === undefined) {
                  newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
                }
              }
              assignValue(nested, key, newValue);
              nested = nested[key];
            }
            return object;
          }
          __name(baseSet, "baseSet");
          var baseSetData = !metaMap ? identity : function(func, data) {
            metaMap.set(func, data);
            return func;
          };
          var baseSetToString = !defineProperty ? identity : function(func, string) {
            return defineProperty(func, "toString", {
              "configurable": true,
              "enumerable": false,
              "value": constant(string),
              "writable": true
            });
          };
          function baseShuffle(collection) {
            return shuffleSelf(values(collection));
          }
          __name(baseShuffle, "baseShuffle");
          function baseSlice(array, start, end) {
            var index = -1, length2 = array.length;
            if (start < 0) {
              start = -start > length2 ? 0 : length2 + start;
            }
            end = end > length2 ? length2 : end;
            if (end < 0) {
              end += length2;
            }
            length2 = start > end ? 0 : end - start >>> 0;
            start >>>= 0;
            var result2 = Array2(length2);
            while (++index < length2) {
              result2[index] = array[index + start];
            }
            return result2;
          }
          __name(baseSlice, "baseSlice");
          function baseSome(collection, predicate) {
            var result2;
            baseEach(collection, function(value, index, collection2) {
              result2 = predicate(value, index, collection2);
              return !result2;
            });
            return !!result2;
          }
          __name(baseSome, "baseSome");
          function baseSortedIndex(array, value, retHighest) {
            var low = 0, high = array == null ? low : array.length;
            if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
              while (low < high) {
                var mid = low + high >>> 1, computed = array[mid];
                if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                  low = mid + 1;
                } else {
                  high = mid;
                }
              }
              return high;
            }
            return baseSortedIndexBy(array, value, identity, retHighest);
          }
          __name(baseSortedIndex, "baseSortedIndex");
          function baseSortedIndexBy(array, value, iteratee2, retHighest) {
            var low = 0, high = array == null ? 0 : array.length;
            if (high === 0) {
              return 0;
            }
            value = iteratee2(value);
            var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined;
            while (low < high) {
              var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
              if (valIsNaN) {
                var setLow = retHighest || othIsReflexive;
              } else if (valIsUndefined) {
                setLow = othIsReflexive && (retHighest || othIsDefined);
              } else if (valIsNull) {
                setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
              } else if (valIsSymbol) {
                setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
              } else if (othIsNull || othIsSymbol) {
                setLow = false;
              } else {
                setLow = retHighest ? computed <= value : computed < value;
              }
              if (setLow) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return nativeMin(high, MAX_ARRAY_INDEX);
          }
          __name(baseSortedIndexBy, "baseSortedIndexBy");
          function baseSortedUniq(array, iteratee2) {
            var index = -1, length2 = array.length, resIndex = 0, result2 = [];
            while (++index < length2) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              if (!index || !eq(computed, seen)) {
                var seen = computed;
                result2[resIndex++] = value === 0 ? 0 : value;
              }
            }
            return result2;
          }
          __name(baseSortedUniq, "baseSortedUniq");
          function baseToNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            return +value;
          }
          __name(baseToNumber, "baseToNumber");
          function baseToString(value) {
            if (typeof value == "string") {
              return value;
            }
            if (isArray(value)) {
              return arrayMap(value, baseToString) + "";
            }
            if (isSymbol(value)) {
              return symbolToString ? symbolToString.call(value) : "";
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          __name(baseToString, "baseToString");
          function baseUniq(array, iteratee2, comparator) {
            var index = -1, includes2 = arrayIncludes, length2 = array.length, isCommon = true, result2 = [], seen = result2;
            if (comparator) {
              isCommon = false;
              includes2 = arrayIncludesWith;
            } else if (length2 >= LARGE_ARRAY_SIZE) {
              var set2 = iteratee2 ? null : createSet(array);
              if (set2) {
                return setToArray(set2);
              }
              isCommon = false;
              includes2 = cacheHas;
              seen = new SetCache();
            } else {
              seen = iteratee2 ? [] : result2;
            }
            outer:
              while (++index < length2) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var seenIndex = seen.length;
                  while (seenIndex--) {
                    if (seen[seenIndex] === computed) {
                      continue outer;
                    }
                  }
                  if (iteratee2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                } else if (!includes2(seen, computed, comparator)) {
                  if (seen !== result2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          __name(baseUniq, "baseUniq");
          function baseUnset(object, path) {
            path = castPath(path, object);
            object = parent(object, path);
            return object == null || delete object[toKey(last(path))];
          }
          __name(baseUnset, "baseUnset");
          function baseUpdate(object, path, updater, customizer) {
            return baseSet(object, path, updater(baseGet(object, path)), customizer);
          }
          __name(baseUpdate, "baseUpdate");
          function baseWhile(array, predicate, isDrop, fromRight) {
            var length2 = array.length, index = fromRight ? length2 : -1;
            while ((fromRight ? index-- : ++index < length2) && predicate(array[index], index, array)) {
            }
            return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length2) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length2 : index);
          }
          __name(baseWhile, "baseWhile");
          function baseWrapperValue(value, actions) {
            var result2 = value;
            if (result2 instanceof LazyWrapper) {
              result2 = result2.value();
            }
            return arrayReduce(actions, function(result3, action) {
              return action.func.apply(action.thisArg, arrayPush([result3], action.args));
            }, result2);
          }
          __name(baseWrapperValue, "baseWrapperValue");
          function baseXor(arrays, iteratee2, comparator) {
            var length2 = arrays.length;
            if (length2 < 2) {
              return length2 ? baseUniq(arrays[0]) : [];
            }
            var index = -1, result2 = Array2(length2);
            while (++index < length2) {
              var array = arrays[index], othIndex = -1;
              while (++othIndex < length2) {
                if (othIndex != index) {
                  result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
                }
              }
            }
            return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
          }
          __name(baseXor, "baseXor");
          function baseZipObject(props, values2, assignFunc) {
            var index = -1, length2 = props.length, valsLength = values2.length, result2 = {};
            while (++index < length2) {
              var value = index < valsLength ? values2[index] : undefined;
              assignFunc(result2, props[index], value);
            }
            return result2;
          }
          __name(baseZipObject, "baseZipObject");
          function castArrayLikeObject(value) {
            return isArrayLikeObject(value) ? value : [];
          }
          __name(castArrayLikeObject, "castArrayLikeObject");
          function castFunction(value) {
            return typeof value == "function" ? value : identity;
          }
          __name(castFunction, "castFunction");
          function castPath(value, object) {
            if (isArray(value)) {
              return value;
            }
            return isKey(value, object) ? [value] : stringToPath(toString2(value));
          }
          __name(castPath, "castPath");
          var castRest = baseRest;
          function castSlice(array, start, end) {
            var length2 = array.length;
            end = end === undefined ? length2 : end;
            return !start && end >= length2 ? array : baseSlice(array, start, end);
          }
          __name(castSlice, "castSlice");
          var clearTimeout = ctxClearTimeout || function(id) {
            return root.clearTimeout(id);
          };
          function cloneBuffer(buffer, isDeep) {
            if (isDeep) {
              return buffer.slice();
            }
            var length2 = buffer.length, result2 = allocUnsafe ? allocUnsafe(length2) : new buffer.constructor(length2);
            buffer.copy(result2);
            return result2;
          }
          __name(cloneBuffer, "cloneBuffer");
          function cloneArrayBuffer(arrayBuffer) {
            var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
            new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
            return result2;
          }
          __name(cloneArrayBuffer, "cloneArrayBuffer");
          function cloneDataView(dataView, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
            return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
          }
          __name(cloneDataView, "cloneDataView");
          function cloneRegExp(regexp) {
            var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
            result2.lastIndex = regexp.lastIndex;
            return result2;
          }
          __name(cloneRegExp, "cloneRegExp");
          function cloneSymbol(symbol) {
            return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
          }
          __name(cloneSymbol, "cloneSymbol");
          function cloneTypedArray(typedArray, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
            return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
          }
          __name(cloneTypedArray, "cloneTypedArray");
          function compareAscending(value, other) {
            if (value !== other) {
              var valIsDefined = value !== undefined, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
              var othIsDefined = other !== undefined, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
              if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
                return 1;
              }
              if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
                return -1;
              }
            }
            return 0;
          }
          __name(compareAscending, "compareAscending");
          function compareMultiple(object, other, orders) {
            var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length2 = objCriteria.length, ordersLength = orders.length;
            while (++index < length2) {
              var result2 = compareAscending(objCriteria[index], othCriteria[index]);
              if (result2) {
                if (index >= ordersLength) {
                  return result2;
                }
                var order = orders[index];
                return result2 * (order == "desc" ? -1 : 1);
              }
            }
            return object.index - other.index;
          }
          __name(compareMultiple, "compareMultiple");
          function composeArgs(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
            while (++leftIndex < leftLength) {
              result2[leftIndex] = partials[leftIndex];
            }
            while (++argsIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[holders[argsIndex]] = args[argsIndex];
              }
            }
            while (rangeLength--) {
              result2[leftIndex++] = args[argsIndex++];
            }
            return result2;
          }
          __name(composeArgs, "composeArgs");
          function composeArgsRight(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
            while (++argsIndex < rangeLength) {
              result2[argsIndex] = args[argsIndex];
            }
            var offset2 = argsIndex;
            while (++rightIndex < rightLength) {
              result2[offset2 + rightIndex] = partials[rightIndex];
            }
            while (++holdersIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[offset2 + holders[holdersIndex]] = args[argsIndex++];
              }
            }
            return result2;
          }
          __name(composeArgsRight, "composeArgsRight");
          function copyArray(source, array) {
            var index = -1, length2 = source.length;
            array || (array = Array2(length2));
            while (++index < length2) {
              array[index] = source[index];
            }
            return array;
          }
          __name(copyArray, "copyArray");
          function copyObject(source, props, object, customizer) {
            var isNew = !object;
            object || (object = {});
            var index = -1, length2 = props.length;
            while (++index < length2) {
              var key = props[index];
              var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
              if (newValue === undefined) {
                newValue = source[key];
              }
              if (isNew) {
                baseAssignValue(object, key, newValue);
              } else {
                assignValue(object, key, newValue);
              }
            }
            return object;
          }
          __name(copyObject, "copyObject");
          function copySymbols(source, object) {
            return copyObject(source, getSymbols(source), object);
          }
          __name(copySymbols, "copySymbols");
          function copySymbolsIn(source, object) {
            return copyObject(source, getSymbolsIn(source), object);
          }
          __name(copySymbolsIn, "copySymbolsIn");
          function createAggregator(setter, initializer) {
            return function(collection, iteratee2) {
              var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
              return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
            };
          }
          __name(createAggregator, "createAggregator");
          function createAssigner(assigner) {
            return baseRest(function(object, sources) {
              var index = -1, length2 = sources.length, customizer = length2 > 1 ? sources[length2 - 1] : undefined, guard = length2 > 2 ? sources[2] : undefined;
              customizer = assigner.length > 3 && typeof customizer == "function" ? (length2--, customizer) : undefined;
              if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                customizer = length2 < 3 ? undefined : customizer;
                length2 = 1;
              }
              object = Object2(object);
              while (++index < length2) {
                var source = sources[index];
                if (source) {
                  assigner(object, source, index, customizer);
                }
              }
              return object;
            });
          }
          __name(createAssigner, "createAssigner");
          function createBaseEach(eachFunc, fromRight) {
            return function(collection, iteratee2) {
              if (collection == null) {
                return collection;
              }
              if (!isArrayLike(collection)) {
                return eachFunc(collection, iteratee2);
              }
              var length2 = collection.length, index = fromRight ? length2 : -1, iterable = Object2(collection);
              while (fromRight ? index-- : ++index < length2) {
                if (iteratee2(iterable[index], index, iterable) === false) {
                  break;
                }
              }
              return collection;
            };
          }
          __name(createBaseEach, "createBaseEach");
          function createBaseFor(fromRight) {
            return function(object, iteratee2, keysFunc) {
              var index = -1, iterable = Object2(object), props = keysFunc(object), length2 = props.length;
              while (length2--) {
                var key = props[fromRight ? length2 : ++index];
                if (iteratee2(iterable[key], key, iterable) === false) {
                  break;
                }
              }
              return object;
            };
          }
          __name(createBaseFor, "createBaseFor");
          function createBind(func, bitmask, thisArg) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return fn.apply(isBind ? thisArg : this, arguments);
            }
            __name(wrapper, "wrapper");
            return wrapper;
          }
          __name(createBind, "createBind");
          function createCaseFirst(methodName) {
            return function(string) {
              string = toString2(string);
              var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;
              var chr = strSymbols ? strSymbols[0] : string.charAt(0);
              var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
              return chr[methodName]() + trailing;
            };
          }
          __name(createCaseFirst, "createCaseFirst");
          function createCompounder(callback) {
            return function(string) {
              return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
            };
          }
          __name(createCompounder, "createCompounder");
          function createCtor(Ctor) {
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return new Ctor();
                case 1:
                  return new Ctor(args[0]);
                case 2:
                  return new Ctor(args[0], args[1]);
                case 3:
                  return new Ctor(args[0], args[1], args[2]);
                case 4:
                  return new Ctor(args[0], args[1], args[2], args[3]);
                case 5:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                case 6:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                case 7:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
              }
              var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
              return isObject(result2) ? result2 : thisBinding;
            };
          }
          __name(createCtor, "createCtor");
          function createCurry(func, bitmask, arity) {
            var Ctor = createCtor(func);
            function wrapper() {
              var length2 = arguments.length, args = Array2(length2), index = length2, placeholder = getHolder(wrapper);
              while (index--) {
                args[index] = arguments[index];
              }
              var holders = length2 < 3 && args[0] !== placeholder && args[length2 - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
              length2 -= holders.length;
              if (length2 < arity) {
                return createRecurry(
                  func,
                  bitmask,
                  createHybrid,
                  wrapper.placeholder,
                  undefined,
                  args,
                  holders,
                  undefined,
                  undefined,
                  arity - length2
                );
              }
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return apply(fn, this, args);
            }
            __name(wrapper, "wrapper");
            return wrapper;
          }
          __name(createCurry, "createCurry");
          function createFind(findIndexFunc) {
            return function(collection, predicate, fromIndex) {
              var iterable = Object2(collection);
              if (!isArrayLike(collection)) {
                var iteratee2 = getIteratee(predicate, 3);
                collection = keys(collection);
                predicate = /* @__PURE__ */ __name(function(key) {
                  return iteratee2(iterable[key], key, iterable);
                }, "predicate");
              }
              var index = findIndexFunc(collection, predicate, fromIndex);
              return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined;
            };
          }
          __name(createFind, "createFind");
          function createFlow(fromRight) {
            return flatRest(function(funcs) {
              var length2 = funcs.length, index = length2, prereq = LodashWrapper.prototype.thru;
              if (fromRight) {
                funcs.reverse();
              }
              while (index--) {
                var func = funcs[index];
                if (typeof func != "function") {
                  throw new TypeError2(FUNC_ERROR_TEXT);
                }
                if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                  var wrapper = new LodashWrapper([], true);
                }
              }
              index = wrapper ? index : length2;
              while (++index < length2) {
                func = funcs[index];
                var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined;
                if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                  wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
                } else {
                  wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
                }
              }
              return function() {
                var args = arguments, value = args[0];
                if (wrapper && args.length == 1 && isArray(value)) {
                  return wrapper.plant(value).value();
                }
                var index2 = 0, result2 = length2 ? funcs[index2].apply(this, args) : value;
                while (++index2 < length2) {
                  result2 = funcs[index2].call(this, result2);
                }
                return result2;
              };
            });
          }
          __name(createFlow, "createFlow");
          function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
            var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined : createCtor(func);
            function wrapper() {
              var length2 = arguments.length, args = Array2(length2), index = length2;
              while (index--) {
                args[index] = arguments[index];
              }
              if (isCurried) {
                var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
              }
              if (partials) {
                args = composeArgs(args, partials, holders, isCurried);
              }
              if (partialsRight) {
                args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
              }
              length2 -= holdersCount;
              if (isCurried && length2 < arity) {
                var newHolders = replaceHolders(args, placeholder);
                return createRecurry(
                  func,
                  bitmask,
                  createHybrid,
                  wrapper.placeholder,
                  thisArg,
                  args,
                  newHolders,
                  argPos,
                  ary2,
                  arity - length2
                );
              }
              var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
              length2 = args.length;
              if (argPos) {
                args = reorder(args, argPos);
              } else if (isFlip && length2 > 1) {
                args.reverse();
              }
              if (isAry && ary2 < length2) {
                args.length = ary2;
              }
              if (this && this !== root && this instanceof wrapper) {
                fn = Ctor || createCtor(fn);
              }
              return fn.apply(thisBinding, args);
            }
            __name(wrapper, "wrapper");
            return wrapper;
          }
          __name(createHybrid, "createHybrid");
          function createInverter(setter, toIteratee) {
            return function(object, iteratee2) {
              return baseInverter(object, setter, toIteratee(iteratee2), {});
            };
          }
          __name(createInverter, "createInverter");
          function createMathOperation(operator, defaultValue) {
            return function(value, other) {
              var result2;
              if (value === undefined && other === undefined) {
                return defaultValue;
              }
              if (value !== undefined) {
                result2 = value;
              }
              if (other !== undefined) {
                if (result2 === undefined) {
                  return other;
                }
                if (typeof value == "string" || typeof other == "string") {
                  value = baseToString(value);
                  other = baseToString(other);
                } else {
                  value = baseToNumber(value);
                  other = baseToNumber(other);
                }
                result2 = operator(value, other);
              }
              return result2;
            };
          }
          __name(createMathOperation, "createMathOperation");
          function createOver(arrayFunc) {
            return flatRest(function(iteratees) {
              iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
              return baseRest(function(args) {
                var thisArg = this;
                return arrayFunc(iteratees, function(iteratee2) {
                  return apply(iteratee2, thisArg, args);
                });
              });
            });
          }
          __name(createOver, "createOver");
          function createPadding(length2, chars) {
            chars = chars === undefined ? " " : baseToString(chars);
            var charsLength = chars.length;
            if (charsLength < 2) {
              return charsLength ? baseRepeat(chars, length2) : chars;
            }
            var result2 = baseRepeat(chars, nativeCeil(length2 / stringSize(chars)));
            return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length2).join("") : result2.slice(0, length2);
          }
          __name(createPadding, "createPadding");
          function createPartial(func, bitmask, thisArg, partials) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              while (++leftIndex < leftLength) {
                args[leftIndex] = partials[leftIndex];
              }
              while (argsLength--) {
                args[leftIndex++] = arguments[++argsIndex];
              }
              return apply(fn, isBind ? thisArg : this, args);
            }
            __name(wrapper, "wrapper");
            return wrapper;
          }
          __name(createPartial, "createPartial");
          function createRange(fromRight) {
            return function(start, end, step) {
              if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
                end = step = undefined;
              }
              start = toFinite(start);
              if (end === undefined) {
                end = start;
                start = 0;
              } else {
                end = toFinite(end);
              }
              step = step === undefined ? start < end ? 1 : -1 : toFinite(step);
              return baseRange(start, end, step, fromRight);
            };
          }
          __name(createRange, "createRange");
          function createRelationalOperation(operator) {
            return function(value, other) {
              if (!(typeof value == "string" && typeof other == "string")) {
                value = toNumber(value);
                other = toNumber(other);
              }
              return operator(value, other);
            };
          }
          __name(createRelationalOperation, "createRelationalOperation");
          function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
            var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined, newHoldersRight = isCurry ? undefined : holders, newPartials = isCurry ? partials : undefined, newPartialsRight = isCurry ? undefined : partials;
            bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
            bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
            if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
              bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
            }
            var newData = [
              func,
              bitmask,
              thisArg,
              newPartials,
              newHolders,
              newPartialsRight,
              newHoldersRight,
              argPos,
              ary2,
              arity
            ];
            var result2 = wrapFunc.apply(undefined, newData);
            if (isLaziable(func)) {
              setData(result2, newData);
            }
            result2.placeholder = placeholder;
            return setWrapToString(result2, func, bitmask);
          }
          __name(createRecurry, "createRecurry");
          function createRound(methodName) {
            var func = Math2[methodName];
            return function(number, precision) {
              number = toNumber(number);
              precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
              if (precision && nativeIsFinite(number)) {
                var pair = (toString2(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
                pair = (toString2(value) + "e").split("e");
                return +(pair[0] + "e" + (+pair[1] - precision));
              }
              return func(number);
            };
          }
          __name(createRound, "createRound");
          var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
            return new Set2(values2);
          };
          function createToPairs(keysFunc) {
            return function(object) {
              var tag = getTag(object);
              if (tag == mapTag) {
                return mapToArray(object);
              }
              if (tag == setTag) {
                return setToPairs(object);
              }
              return baseToPairs(object, keysFunc(object));
            };
          }
          __name(createToPairs, "createToPairs");
          function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
            var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
            if (!isBindKey && typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var length2 = partials ? partials.length : 0;
            if (!length2) {
              bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
              partials = holders = undefined;
            }
            ary2 = ary2 === undefined ? ary2 : nativeMax(toInteger(ary2), 0);
            arity = arity === undefined ? arity : toInteger(arity);
            length2 -= holders ? holders.length : 0;
            if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
              var partialsRight = partials, holdersRight = holders;
              partials = holders = undefined;
            }
            var data = isBindKey ? undefined : getData(func);
            var newData = [
              func,
              bitmask,
              thisArg,
              partials,
              holders,
              partialsRight,
              holdersRight,
              argPos,
              ary2,
              arity
            ];
            if (data) {
              mergeData(newData, data);
            }
            func = newData[0];
            bitmask = newData[1];
            thisArg = newData[2];
            partials = newData[3];
            holders = newData[4];
            arity = newData[9] = newData[9] === undefined ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length2, 0);
            if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
              bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
            }
            if (!bitmask || bitmask == WRAP_BIND_FLAG) {
              var result2 = createBind(func, bitmask, thisArg);
            } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
              result2 = createCurry(func, bitmask, arity);
            } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
              result2 = createPartial(func, bitmask, thisArg, partials);
            } else {
              result2 = createHybrid.apply(undefined, newData);
            }
            var setter = data ? baseSetData : setData;
            return setWrapToString(setter(result2, newData), func, bitmask);
          }
          __name(createWrap, "createWrap");
          function customDefaultsAssignIn(objValue, srcValue, key, object) {
            if (objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              return srcValue;
            }
            return objValue;
          }
          __name(customDefaultsAssignIn, "customDefaultsAssignIn");
          function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
            if (isObject(objValue) && isObject(srcValue)) {
              stack.set(srcValue, objValue);
              baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
              stack["delete"](srcValue);
            }
            return objValue;
          }
          __name(customDefaultsMerge, "customDefaultsMerge");
          function customOmitClone(value) {
            return isPlainObject(value) ? undefined : value;
          }
          __name(customOmitClone, "customOmitClone");
          function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
            if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
              return false;
            }
            var arrStacked = stack.get(array);
            var othStacked = stack.get(other);
            if (arrStacked && othStacked) {
              return arrStacked == other && othStacked == array;
            }
            var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;
            stack.set(array, other);
            stack.set(other, array);
            while (++index < arrLength) {
              var arrValue = array[index], othValue = other[index];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
              }
              if (compared !== undefined) {
                if (compared) {
                  continue;
                }
                result2 = false;
                break;
              }
              if (seen) {
                if (!arraySome(other, function(othValue2, othIndex) {
                  if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                    return seen.push(othIndex);
                  }
                })) {
                  result2 = false;
                  break;
                }
              } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                result2 = false;
                break;
              }
            }
            stack["delete"](array);
            stack["delete"](other);
            return result2;
          }
          __name(equalArrays, "equalArrays");
          function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
            switch (tag) {
              case dataViewTag:
                if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                  return false;
                }
                object = object.buffer;
                other = other.buffer;
              case arrayBufferTag:
                if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                  return false;
                }
                return true;
              case boolTag:
              case dateTag:
              case numberTag:
                return eq(+object, +other);
              case errorTag:
                return object.name == other.name && object.message == other.message;
              case regexpTag:
              case stringTag:
                return object == other + "";
              case mapTag:
                var convert = mapToArray;
              case setTag:
                var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                convert || (convert = setToArray);
                if (object.size != other.size && !isPartial) {
                  return false;
                }
                var stacked = stack.get(object);
                if (stacked) {
                  return stacked == other;
                }
                bitmask |= COMPARE_UNORDERED_FLAG;
                stack.set(object, other);
                var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                stack["delete"](object);
                return result2;
              case symbolTag:
                if (symbolValueOf) {
                  return symbolValueOf.call(object) == symbolValueOf.call(other);
                }
            }
            return false;
          }
          __name(equalByTag, "equalByTag");
          function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
            if (objLength != othLength && !isPartial) {
              return false;
            }
            var index = objLength;
            while (index--) {
              var key = objProps[index];
              if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
                return false;
              }
            }
            var objStacked = stack.get(object);
            var othStacked = stack.get(other);
            if (objStacked && othStacked) {
              return objStacked == other && othStacked == object;
            }
            var result2 = true;
            stack.set(object, other);
            stack.set(other, object);
            var skipCtor = isPartial;
            while (++index < objLength) {
              key = objProps[index];
              var objValue = object[key], othValue = other[key];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
              }
              if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
                result2 = false;
                break;
              }
              skipCtor || (skipCtor = key == "constructor");
            }
            if (result2 && !skipCtor) {
              var objCtor = object.constructor, othCtor = other.constructor;
              if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
                result2 = false;
              }
            }
            stack["delete"](object);
            stack["delete"](other);
            return result2;
          }
          __name(equalObjects, "equalObjects");
          function flatRest(func) {
            return setToString(overRest(func, undefined, flatten), func + "");
          }
          __name(flatRest, "flatRest");
          function getAllKeys(object) {
            return baseGetAllKeys(object, keys, getSymbols);
          }
          __name(getAllKeys, "getAllKeys");
          function getAllKeysIn(object) {
            return baseGetAllKeys(object, keysIn, getSymbolsIn);
          }
          __name(getAllKeysIn, "getAllKeysIn");
          var getData = !metaMap ? noop : function(func) {
            return metaMap.get(func);
          };
          function getFuncName(func) {
            var result2 = func.name + "", array = realNames[result2], length2 = hasOwnProperty.call(realNames, result2) ? array.length : 0;
            while (length2--) {
              var data = array[length2], otherFunc = data.func;
              if (otherFunc == null || otherFunc == func) {
                return data.name;
              }
            }
            return result2;
          }
          __name(getFuncName, "getFuncName");
          function getHolder(func) {
            var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
            return object.placeholder;
          }
          __name(getHolder, "getHolder");
          function getIteratee() {
            var result2 = lodash.iteratee || iteratee;
            result2 = result2 === iteratee ? baseIteratee : result2;
            return arguments.length ? result2(arguments[0], arguments[1]) : result2;
          }
          __name(getIteratee, "getIteratee");
          function getMapData(map3, key) {
            var data = map3.__data__;
            return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
          }
          __name(getMapData, "getMapData");
          function getMatchData(object) {
            var result2 = keys(object), length2 = result2.length;
            while (length2--) {
              var key = result2[length2], value = object[key];
              result2[length2] = [key, value, isStrictComparable(value)];
            }
            return result2;
          }
          __name(getMatchData, "getMatchData");
          function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : undefined;
          }
          __name(getNative, "getNative");
          function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
            try {
              value[symToStringTag] = undefined;
              var unmasked = true;
            } catch (e2) {
            }
            var result2 = nativeObjectToString.call(value);
            if (unmasked) {
              if (isOwn) {
                value[symToStringTag] = tag;
              } else {
                delete value[symToStringTag];
              }
            }
            return result2;
          }
          __name(getRawTag, "getRawTag");
          var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
            if (object == null) {
              return [];
            }
            object = Object2(object);
            return arrayFilter(nativeGetSymbols(object), function(symbol) {
              return propertyIsEnumerable.call(object, symbol);
            });
          };
          var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
            var result2 = [];
            while (object) {
              arrayPush(result2, getSymbols(object));
              object = getPrototype(object);
            }
            return result2;
          };
          var getTag = baseGetTag;
          if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
            getTag = /* @__PURE__ */ __name(function(value) {
              var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined, ctorString = Ctor ? toSource(Ctor) : "";
              if (ctorString) {
                switch (ctorString) {
                  case dataViewCtorString:
                    return dataViewTag;
                  case mapCtorString:
                    return mapTag;
                  case promiseCtorString:
                    return promiseTag;
                  case setCtorString:
                    return setTag;
                  case weakMapCtorString:
                    return weakMapTag;
                }
              }
              return result2;
            }, "getTag");
          }
          function getView(start, end, transforms) {
            var index = -1, length2 = transforms.length;
            while (++index < length2) {
              var data = transforms[index], size3 = data.size;
              switch (data.type) {
                case "drop":
                  start += size3;
                  break;
                case "dropRight":
                  end -= size3;
                  break;
                case "take":
                  end = nativeMin(end, start + size3);
                  break;
                case "takeRight":
                  start = nativeMax(start, end - size3);
                  break;
              }
            }
            return { "start": start, "end": end };
          }
          __name(getView, "getView");
          function getWrapDetails(source) {
            var match = source.match(reWrapDetails);
            return match ? match[1].split(reSplitDetails) : [];
          }
          __name(getWrapDetails, "getWrapDetails");
          function hasPath(object, path, hasFunc) {
            path = castPath(path, object);
            var index = -1, length2 = path.length, result2 = false;
            while (++index < length2) {
              var key = toKey(path[index]);
              if (!(result2 = object != null && hasFunc(object, key))) {
                break;
              }
              object = object[key];
            }
            if (result2 || ++index != length2) {
              return result2;
            }
            length2 = object == null ? 0 : object.length;
            return !!length2 && isLength(length2) && isIndex(key, length2) && (isArray(object) || isArguments(object));
          }
          __name(hasPath, "hasPath");
          function initCloneArray(array) {
            var length2 = array.length, result2 = new array.constructor(length2);
            if (length2 && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
              result2.index = array.index;
              result2.input = array.input;
            }
            return result2;
          }
          __name(initCloneArray, "initCloneArray");
          function initCloneObject(object) {
            return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
          }
          __name(initCloneObject, "initCloneObject");
          function initCloneByTag(object, tag, isDeep) {
            var Ctor = object.constructor;
            switch (tag) {
              case arrayBufferTag:
                return cloneArrayBuffer(object);
              case boolTag:
              case dateTag:
                return new Ctor(+object);
              case dataViewTag:
                return cloneDataView(object, isDeep);
              case float32Tag:
              case float64Tag:
              case int8Tag:
              case int16Tag:
              case int32Tag:
              case uint8Tag:
              case uint8ClampedTag:
              case uint16Tag:
              case uint32Tag:
                return cloneTypedArray(object, isDeep);
              case mapTag:
                return new Ctor();
              case numberTag:
              case stringTag:
                return new Ctor(object);
              case regexpTag:
                return cloneRegExp(object);
              case setTag:
                return new Ctor();
              case symbolTag:
                return cloneSymbol(object);
            }
          }
          __name(initCloneByTag, "initCloneByTag");
          function insertWrapDetails(source, details) {
            var length2 = details.length;
            if (!length2) {
              return source;
            }
            var lastIndex = length2 - 1;
            details[lastIndex] = (length2 > 1 ? "& " : "") + details[lastIndex];
            details = details.join(length2 > 2 ? ", " : " ");
            return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
          }
          __name(insertWrapDetails, "insertWrapDetails");
          function isFlattenable(value) {
            return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
          }
          __name(isFlattenable, "isFlattenable");
          function isIndex(value, length2) {
            var type8 = typeof value;
            length2 = length2 == null ? MAX_SAFE_INTEGER : length2;
            return !!length2 && (type8 == "number" || type8 != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length2);
          }
          __name(isIndex, "isIndex");
          function isIterateeCall(value, index, object) {
            if (!isObject(object)) {
              return false;
            }
            var type8 = typeof index;
            if (type8 == "number" ? isArrayLike(object) && isIndex(index, object.length) : type8 == "string" && index in object) {
              return eq(object[index], value);
            }
            return false;
          }
          __name(isIterateeCall, "isIterateeCall");
          function isKey(value, object) {
            if (isArray(value)) {
              return false;
            }
            var type8 = typeof value;
            if (type8 == "number" || type8 == "symbol" || type8 == "boolean" || value == null || isSymbol(value)) {
              return true;
            }
            return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
          }
          __name(isKey, "isKey");
          function isKeyable(value) {
            var type8 = typeof value;
            return type8 == "string" || type8 == "number" || type8 == "symbol" || type8 == "boolean" ? value !== "__proto__" : value === null;
          }
          __name(isKeyable, "isKeyable");
          function isLaziable(func) {
            var funcName = getFuncName(func), other = lodash[funcName];
            if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
              return false;
            }
            if (func === other) {
              return true;
            }
            var data = getData(other);
            return !!data && func === data[0];
          }
          __name(isLaziable, "isLaziable");
          function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func;
          }
          __name(isMasked, "isMasked");
          var isMaskable = coreJsData ? isFunction : stubFalse;
          function isPrototype(value) {
            var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
            return value === proto;
          }
          __name(isPrototype, "isPrototype");
          function isStrictComparable(value) {
            return value === value && !isObject(value);
          }
          __name(isStrictComparable, "isStrictComparable");
          function matchesStrictComparable(key, srcValue) {
            return function(object) {
              if (object == null) {
                return false;
              }
              return object[key] === srcValue && (srcValue !== undefined || key in Object2(object));
            };
          }
          __name(matchesStrictComparable, "matchesStrictComparable");
          function memoizeCapped(func) {
            var result2 = memoize(func, function(key) {
              if (cache.size === MAX_MEMOIZE_SIZE) {
                cache.clear();
              }
              return key;
            });
            var cache = result2.cache;
            return result2;
          }
          __name(memoizeCapped, "memoizeCapped");
          function mergeData(data, source) {
            var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
            var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
            if (!(isCommon || isCombo)) {
              return data;
            }
            if (srcBitmask & WRAP_BIND_FLAG) {
              data[2] = source[2];
              newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
            }
            var value = source[3];
            if (value) {
              var partials = data[3];
              data[3] = partials ? composeArgs(partials, value, source[4]) : value;
              data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
            }
            value = source[5];
            if (value) {
              partials = data[5];
              data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
              data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
            }
            value = source[7];
            if (value) {
              data[7] = value;
            }
            if (srcBitmask & WRAP_ARY_FLAG) {
              data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
            }
            if (data[9] == null) {
              data[9] = source[9];
            }
            data[0] = source[0];
            data[1] = newBitmask;
            return data;
          }
          __name(mergeData, "mergeData");
          function nativeKeysIn(object) {
            var result2 = [];
            if (object != null) {
              for (var key in Object2(object)) {
                result2.push(key);
              }
            }
            return result2;
          }
          __name(nativeKeysIn, "nativeKeysIn");
          function objectToString(value) {
            return nativeObjectToString.call(value);
          }
          __name(objectToString, "objectToString");
          function overRest(func, start, transform2) {
            start = nativeMax(start === undefined ? func.length - 1 : start, 0);
            return function() {
              var args = arguments, index = -1, length2 = nativeMax(args.length - start, 0), array = Array2(length2);
              while (++index < length2) {
                array[index] = args[start + index];
              }
              index = -1;
              var otherArgs = Array2(start + 1);
              while (++index < start) {
                otherArgs[index] = args[index];
              }
              otherArgs[start] = transform2(array);
              return apply(func, this, otherArgs);
            };
          }
          __name(overRest, "overRest");
          function parent(object, path) {
            return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
          }
          __name(parent, "parent");
          function reorder(array, indexes) {
            var arrLength = array.length, length2 = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
            while (length2--) {
              var index = indexes[length2];
              array[length2] = isIndex(index, arrLength) ? oldArray[index] : undefined;
            }
            return array;
          }
          __name(reorder, "reorder");
          function safeGet(object, key) {
            if (key === "constructor" && typeof object[key] === "function") {
              return;
            }
            if (key == "__proto__") {
              return;
            }
            return object[key];
          }
          __name(safeGet, "safeGet");
          var setData = shortOut(baseSetData);
          var setTimeout = ctxSetTimeout || function(func, wait) {
            return root.setTimeout(func, wait);
          };
          var setToString = shortOut(baseSetToString);
          function setWrapToString(wrapper, reference, bitmask) {
            var source = reference + "";
            return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
          }
          __name(setWrapToString, "setWrapToString");
          function shortOut(func) {
            var count = 0, lastCalled = 0;
            return function() {
              var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
              lastCalled = stamp;
              if (remaining > 0) {
                if (++count >= HOT_COUNT) {
                  return arguments[0];
                }
              } else {
                count = 0;
              }
              return func.apply(undefined, arguments);
            };
          }
          __name(shortOut, "shortOut");
          function shuffleSelf(array, size3) {
            var index = -1, length2 = array.length, lastIndex = length2 - 1;
            size3 = size3 === undefined ? length2 : size3;
            while (++index < size3) {
              var rand = baseRandom(index, lastIndex), value = array[rand];
              array[rand] = array[index];
              array[index] = value;
            }
            array.length = size3;
            return array;
          }
          __name(shuffleSelf, "shuffleSelf");
          var stringToPath = memoizeCapped(function(string) {
            var result2 = [];
            if (string.charCodeAt(0) === 46) {
              result2.push("");
            }
            string.replace(rePropName, function(match, number, quote, subString) {
              result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
            });
            return result2;
          });
          function toKey(value) {
            if (typeof value == "string" || isSymbol(value)) {
              return value;
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          __name(toKey, "toKey");
          function toSource(func) {
            if (func != null) {
              try {
                return funcToString.call(func);
              } catch (e2) {
              }
              try {
                return func + "";
              } catch (e2) {
              }
            }
            return "";
          }
          __name(toSource, "toSource");
          function updateWrapDetails(details, bitmask) {
            arrayEach(wrapFlags, function(pair) {
              var value = "_." + pair[0];
              if (bitmask & pair[1] && !arrayIncludes(details, value)) {
                details.push(value);
              }
            });
            return details.sort();
          }
          __name(updateWrapDetails, "updateWrapDetails");
          function wrapperClone(wrapper) {
            if (wrapper instanceof LazyWrapper) {
              return wrapper.clone();
            }
            var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
            result2.__actions__ = copyArray(wrapper.__actions__);
            result2.__index__ = wrapper.__index__;
            result2.__values__ = wrapper.__values__;
            return result2;
          }
          __name(wrapperClone, "wrapperClone");
          function chunk2(array, size3, guard) {
            if (guard ? isIterateeCall(array, size3, guard) : size3 === undefined) {
              size3 = 1;
            } else {
              size3 = nativeMax(toInteger(size3), 0);
            }
            var length2 = array == null ? 0 : array.length;
            if (!length2 || size3 < 1) {
              return [];
            }
            var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length2 / size3));
            while (index < length2) {
              result2[resIndex++] = baseSlice(array, index, index += size3);
            }
            return result2;
          }
          __name(chunk2, "chunk");
          function compact2(array) {
            var index = -1, length2 = array == null ? 0 : array.length, resIndex = 0, result2 = [];
            while (++index < length2) {
              var value = array[index];
              if (value) {
                result2[resIndex++] = value;
              }
            }
            return result2;
          }
          __name(compact2, "compact");
          function concat() {
            var length2 = arguments.length;
            if (!length2) {
              return [];
            }
            var args = Array2(length2 - 1), array = arguments[0], index = length2;
            while (index--) {
              args[index - 1] = arguments[index];
            }
            return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
          }
          __name(concat, "concat");
          var difference = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
          });
          var differenceBy = baseRest(function(array, values2) {
            var iteratee2 = last(values2);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
          });
          var differenceWith = baseRest(function(array, values2) {
            var comparator = last(values2);
            if (isArrayLikeObject(comparator)) {
              comparator = undefined;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined, comparator) : [];
          });
          function drop(array, n2, guard) {
            var length2 = array == null ? 0 : array.length;
            if (!length2) {
              return [];
            }
            n2 = guard || n2 === undefined ? 1 : toInteger(n2);
            return baseSlice(array, n2 < 0 ? 0 : n2, length2);
          }
          __name(drop, "drop");
          function dropRight(array, n2, guard) {
            var length2 = array == null ? 0 : array.length;
            if (!length2) {
              return [];
            }
            n2 = guard || n2 === undefined ? 1 : toInteger(n2);
            n2 = length2 - n2;
            return baseSlice(array, 0, n2 < 0 ? 0 : n2);
          }
          __name(dropRight, "dropRight");
          function dropRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
          }
          __name(dropRightWhile, "dropRightWhile");
          function dropWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
          }
          __name(dropWhile, "dropWhile");
          function fill(array, value, start, end) {
            var length2 = array == null ? 0 : array.length;
            if (!length2) {
              return [];
            }
            if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
              start = 0;
              end = length2;
            }
            return baseFill(array, value, start, end);
          }
          __name(fill, "fill");
          function findIndex(array, predicate, fromIndex) {
            var length2 = array == null ? 0 : array.length;
            if (!length2) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length2 + index, 0);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index);
          }
          __name(findIndex, "findIndex");
          function findLastIndex(array, predicate, fromIndex) {
            var length2 = array == null ? 0 : array.length;
            if (!length2) {
              return -1;
            }
            var index = length2 - 1;
            if (fromIndex !== undefined) {
              index = toInteger(fromIndex);
              index = fromIndex < 0 ? nativeMax(length2 + index, 0) : nativeMin(index, length2 - 1);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index, true);
          }
          __name(findLastIndex, "findLastIndex");
          function flatten(array) {
            var length2 = array == null ? 0 : array.length;
            return length2 ? baseFlatten(array, 1) : [];
          }
          __name(flatten, "flatten");
          function flattenDeep(array) {
            var length2 = array == null ? 0 : array.length;
            return length2 ? baseFlatten(array, INFINITY) : [];
          }
          __name(flattenDeep, "flattenDeep");
          function flattenDepth(array, depth) {
            var length2 = array == null ? 0 : array.length;
            if (!length2) {
              return [];
            }
            depth = depth === undefined ? 1 : toInteger(depth);
            return baseFlatten(array, depth);
          }
          __name(flattenDepth, "flattenDepth");
          function fromPairs(pairs) {
            var index = -1, length2 = pairs == null ? 0 : pairs.length, result2 = {};
            while (++index < length2) {
              var pair = pairs[index];
              result2[pair[0]] = pair[1];
            }
            return result2;
          }
          __name(fromPairs, "fromPairs");
          function head(array) {
            return array && array.length ? array[0] : undefined;
          }
          __name(head, "head");
          function indexOf2(array, value, fromIndex) {
            var length2 = array == null ? 0 : array.length;
            if (!length2) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length2 + index, 0);
            }
            return baseIndexOf(array, value, index);
          }
          __name(indexOf2, "indexOf");
          function initial(array) {
            var length2 = array == null ? 0 : array.length;
            return length2 ? baseSlice(array, 0, -1) : [];
          }
          __name(initial, "initial");
          var intersection = baseRest(function(arrays) {
            var mapped = arrayMap(arrays, castArrayLikeObject);
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
          });
          var intersectionBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            if (iteratee2 === last(mapped)) {
              iteratee2 = undefined;
            } else {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
          });
          var intersectionWith = baseRest(function(arrays) {
            var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            comparator = typeof comparator == "function" ? comparator : undefined;
            if (comparator) {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined, comparator) : [];
          });
          function join(array, separator) {
            return array == null ? "" : nativeJoin.call(array, separator);
          }
          __name(join, "join");
          function last(array) {
            var length2 = array == null ? 0 : array.length;
            return length2 ? array[length2 - 1] : undefined;
          }
          __name(last, "last");
          function lastIndexOf(array, value, fromIndex) {
            var length2 = array == null ? 0 : array.length;
            if (!length2) {
              return -1;
            }
            var index = length2;
            if (fromIndex !== undefined) {
              index = toInteger(fromIndex);
              index = index < 0 ? nativeMax(length2 + index, 0) : nativeMin(index, length2 - 1);
            }
            return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
          }
          __name(lastIndexOf, "lastIndexOf");
          function nth(array, n2) {
            return array && array.length ? baseNth(array, toInteger(n2)) : undefined;
          }
          __name(nth, "nth");
          var pull2 = baseRest(pullAll);
          function pullAll(array, values2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
          }
          __name(pullAll, "pullAll");
          function pullAllBy(array, values2, iteratee2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
          }
          __name(pullAllBy, "pullAllBy");
          function pullAllWith(array, values2, comparator) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined, comparator) : array;
          }
          __name(pullAllWith, "pullAllWith");
          var pullAt = flatRest(function(array, indexes) {
            var length2 = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
            basePullAt(array, arrayMap(indexes, function(index) {
              return isIndex(index, length2) ? +index : index;
            }).sort(compareAscending));
            return result2;
          });
          function remove(array, predicate) {
            var result2 = [];
            if (!(array && array.length)) {
              return result2;
            }
            var index = -1, indexes = [], length2 = array.length;
            predicate = getIteratee(predicate, 3);
            while (++index < length2) {
              var value = array[index];
              if (predicate(value, index, array)) {
                result2.push(value);
                indexes.push(index);
              }
            }
            basePullAt(array, indexes);
            return result2;
          }
          __name(remove, "remove");
          function reverse2(array) {
            return array == null ? array : nativeReverse.call(array);
          }
          __name(reverse2, "reverse");
          function slice(array, start, end) {
            var length2 = array == null ? 0 : array.length;
            if (!length2) {
              return [];
            }
            if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
              start = 0;
              end = length2;
            } else {
              start = start == null ? 0 : toInteger(start);
              end = end === undefined ? length2 : toInteger(end);
            }
            return baseSlice(array, start, end);
          }
          __name(slice, "slice");
          function sortedIndex(array, value) {
            return baseSortedIndex(array, value);
          }
          __name(sortedIndex, "sortedIndex");
          function sortedIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
          }
          __name(sortedIndexBy, "sortedIndexBy");
          function sortedIndexOf(array, value) {
            var length2 = array == null ? 0 : array.length;
            if (length2) {
              var index = baseSortedIndex(array, value);
              if (index < length2 && eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          __name(sortedIndexOf, "sortedIndexOf");
          function sortedLastIndex(array, value) {
            return baseSortedIndex(array, value, true);
          }
          __name(sortedLastIndex, "sortedLastIndex");
          function sortedLastIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
          }
          __name(sortedLastIndexBy, "sortedLastIndexBy");
          function sortedLastIndexOf(array, value) {
            var length2 = array == null ? 0 : array.length;
            if (length2) {
              var index = baseSortedIndex(array, value, true) - 1;
              if (eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          __name(sortedLastIndexOf, "sortedLastIndexOf");
          function sortedUniq(array) {
            return array && array.length ? baseSortedUniq(array) : [];
          }
          __name(sortedUniq, "sortedUniq");
          function sortedUniqBy(array, iteratee2) {
            return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          __name(sortedUniqBy, "sortedUniqBy");
          function tail(array) {
            var length2 = array == null ? 0 : array.length;
            return length2 ? baseSlice(array, 1, length2) : [];
          }
          __name(tail, "tail");
          function take(array, n2, guard) {
            if (!(array && array.length)) {
              return [];
            }
            n2 = guard || n2 === undefined ? 1 : toInteger(n2);
            return baseSlice(array, 0, n2 < 0 ? 0 : n2);
          }
          __name(take, "take");
          function takeRight(array, n2, guard) {
            var length2 = array == null ? 0 : array.length;
            if (!length2) {
              return [];
            }
            n2 = guard || n2 === undefined ? 1 : toInteger(n2);
            n2 = length2 - n2;
            return baseSlice(array, n2 < 0 ? 0 : n2, length2);
          }
          __name(takeRight, "takeRight");
          function takeRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
          }
          __name(takeRightWhile, "takeRightWhile");
          function takeWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
          }
          __name(takeWhile, "takeWhile");
          var union = baseRest(function(arrays) {
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
          });
          var unionBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined;
            }
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
          });
          var unionWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined;
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
          });
          function uniq(array) {
            return array && array.length ? baseUniq(array) : [];
          }
          __name(uniq, "uniq");
          function uniqBy(array, iteratee2) {
            return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          __name(uniqBy, "uniqBy");
          function uniqWith(array, comparator) {
            comparator = typeof comparator == "function" ? comparator : undefined;
            return array && array.length ? baseUniq(array, undefined, comparator) : [];
          }
          __name(uniqWith, "uniqWith");
          function unzip(array) {
            if (!(array && array.length)) {
              return [];
            }
            var length2 = 0;
            array = arrayFilter(array, function(group) {
              if (isArrayLikeObject(group)) {
                length2 = nativeMax(group.length, length2);
                return true;
              }
            });
            return baseTimes(length2, function(index) {
              return arrayMap(array, baseProperty(index));
            });
          }
          __name(unzip, "unzip");
          function unzipWith(array, iteratee2) {
            if (!(array && array.length)) {
              return [];
            }
            var result2 = unzip(array);
            if (iteratee2 == null) {
              return result2;
            }
            return arrayMap(result2, function(group) {
              return apply(iteratee2, undefined, group);
            });
          }
          __name(unzipWith, "unzipWith");
          var without = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
          });
          var xor = baseRest(function(arrays) {
            return baseXor(arrayFilter(arrays, isArrayLikeObject));
          });
          var xorBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined;
            }
            return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
          });
          var xorWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined;
            return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
          });
          var zip = baseRest(unzip);
          function zipObject(props, values2) {
            return baseZipObject(props || [], values2 || [], assignValue);
          }
          __name(zipObject, "zipObject");
          function zipObjectDeep(props, values2) {
            return baseZipObject(props || [], values2 || [], baseSet);
          }
          __name(zipObjectDeep, "zipObjectDeep");
          var zipWith = baseRest(function(arrays) {
            var length2 = arrays.length, iteratee2 = length2 > 1 ? arrays[length2 - 1] : undefined;
            iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined;
            return unzipWith(arrays, iteratee2);
          });
          function chain2(value) {
            var result2 = lodash(value);
            result2.__chain__ = true;
            return result2;
          }
          __name(chain2, "chain");
          function tap(value, interceptor) {
            interceptor(value);
            return value;
          }
          __name(tap, "tap");
          function thru(value, interceptor) {
            return interceptor(value);
          }
          __name(thru, "thru");
          var wrapperAt = flatRest(function(paths) {
            var length2 = paths.length, start = length2 ? paths[0] : 0, value = this.__wrapped__, interceptor = /* @__PURE__ */ __name(function(object) {
              return baseAt(object, paths);
            }, "interceptor");
            if (length2 > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
              return this.thru(interceptor);
            }
            value = value.slice(start, +start + (length2 ? 1 : 0));
            value.__actions__.push({
              "func": thru,
              "args": [interceptor],
              "thisArg": undefined
            });
            return new LodashWrapper(value, this.__chain__).thru(function(array) {
              if (length2 && !array.length) {
                array.push(undefined);
              }
              return array;
            });
          });
          function wrapperChain() {
            return chain2(this);
          }
          __name(wrapperChain, "wrapperChain");
          function wrapperCommit() {
            return new LodashWrapper(this.value(), this.__chain__);
          }
          __name(wrapperCommit, "wrapperCommit");
          function wrapperNext() {
            if (this.__values__ === undefined) {
              this.__values__ = toArray(this.value());
            }
            var done = this.__index__ >= this.__values__.length, value = done ? undefined : this.__values__[this.__index__++];
            return { "done": done, "value": value };
          }
          __name(wrapperNext, "wrapperNext");
          function wrapperToIterator() {
            return this;
          }
          __name(wrapperToIterator, "wrapperToIterator");
          function wrapperPlant(value) {
            var result2, parent2 = this;
            while (parent2 instanceof baseLodash) {
              var clone2 = wrapperClone(parent2);
              clone2.__index__ = 0;
              clone2.__values__ = undefined;
              if (result2) {
                previous.__wrapped__ = clone2;
              } else {
                result2 = clone2;
              }
              var previous = clone2;
              parent2 = parent2.__wrapped__;
            }
            previous.__wrapped__ = value;
            return result2;
          }
          __name(wrapperPlant, "wrapperPlant");
          function wrapperReverse() {
            var value = this.__wrapped__;
            if (value instanceof LazyWrapper) {
              var wrapped = value;
              if (this.__actions__.length) {
                wrapped = new LazyWrapper(this);
              }
              wrapped = wrapped.reverse();
              wrapped.__actions__.push({
                "func": thru,
                "args": [reverse2],
                "thisArg": undefined
              });
              return new LodashWrapper(wrapped, this.__chain__);
            }
            return this.thru(reverse2);
          }
          __name(wrapperReverse, "wrapperReverse");
          function wrapperValue() {
            return baseWrapperValue(this.__wrapped__, this.__actions__);
          }
          __name(wrapperValue, "wrapperValue");
          var countBy = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              ++result2[key];
            } else {
              baseAssignValue(result2, key, 1);
            }
          });
          function every2(collection, predicate, guard) {
            var func = isArray(collection) ? arrayEvery : baseEvery;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          __name(every2, "every");
          function filter2(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, getIteratee(predicate, 3));
          }
          __name(filter2, "filter");
          var find = createFind(findIndex);
          var findLast = createFind(findLastIndex);
          function flatMap(collection, iteratee2) {
            return baseFlatten(map2(collection, iteratee2), 1);
          }
          __name(flatMap, "flatMap");
          function flatMapDeep(collection, iteratee2) {
            return baseFlatten(map2(collection, iteratee2), INFINITY);
          }
          __name(flatMapDeep, "flatMapDeep");
          function flatMapDepth(collection, iteratee2, depth) {
            depth = depth === undefined ? 1 : toInteger(depth);
            return baseFlatten(map2(collection, iteratee2), depth);
          }
          __name(flatMapDepth, "flatMapDepth");
          function forEach(collection, iteratee2) {
            var func = isArray(collection) ? arrayEach : baseEach;
            return func(collection, getIteratee(iteratee2, 3));
          }
          __name(forEach, "forEach");
          function forEachRight(collection, iteratee2) {
            var func = isArray(collection) ? arrayEachRight : baseEachRight;
            return func(collection, getIteratee(iteratee2, 3));
          }
          __name(forEachRight, "forEachRight");
          var groupBy = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              result2[key].push(value);
            } else {
              baseAssignValue(result2, key, [value]);
            }
          });
          function includes(collection, value, fromIndex, guard) {
            collection = isArrayLike(collection) ? collection : values(collection);
            fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
            var length2 = collection.length;
            if (fromIndex < 0) {
              fromIndex = nativeMax(length2 + fromIndex, 0);
            }
            return isString(collection) ? fromIndex <= length2 && collection.indexOf(value, fromIndex) > -1 : !!length2 && baseIndexOf(collection, value, fromIndex) > -1;
          }
          __name(includes, "includes");
          var invokeMap = baseRest(function(collection, path, args) {
            var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value) {
              result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
            });
            return result2;
          });
          var keyBy = createAggregator(function(result2, value, key) {
            baseAssignValue(result2, key, value);
          });
          function map2(collection, iteratee2) {
            var func = isArray(collection) ? arrayMap : baseMap;
            return func(collection, getIteratee(iteratee2, 3));
          }
          __name(map2, "map");
          function orderBy(collection, iteratees, orders, guard) {
            if (collection == null) {
              return [];
            }
            if (!isArray(iteratees)) {
              iteratees = iteratees == null ? [] : [iteratees];
            }
            orders = guard ? undefined : orders;
            if (!isArray(orders)) {
              orders = orders == null ? [] : [orders];
            }
            return baseOrderBy(collection, iteratees, orders);
          }
          __name(orderBy, "orderBy");
          var partition = createAggregator(function(result2, value, key) {
            result2[key ? 0 : 1].push(value);
          }, function() {
            return [[], []];
          });
          function reduce(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
          }
          __name(reduce, "reduce");
          function reduceRight(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
          }
          __name(reduceRight, "reduceRight");
          function reject(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, negate(getIteratee(predicate, 3)));
          }
          __name(reject, "reject");
          function sample(collection) {
            var func = isArray(collection) ? arraySample : baseSample;
            return func(collection);
          }
          __name(sample, "sample");
          function sampleSize2(collection, n2, guard) {
            if (guard ? isIterateeCall(collection, n2, guard) : n2 === undefined) {
              n2 = 1;
            } else {
              n2 = toInteger(n2);
            }
            var func = isArray(collection) ? arraySampleSize : baseSampleSize;
            return func(collection, n2);
          }
          __name(sampleSize2, "sampleSize");
          function shuffle(collection) {
            var func = isArray(collection) ? arrayShuffle : baseShuffle;
            return func(collection);
          }
          __name(shuffle, "shuffle");
          function size2(collection) {
            if (collection == null) {
              return 0;
            }
            if (isArrayLike(collection)) {
              return isString(collection) ? stringSize(collection) : collection.length;
            }
            var tag = getTag(collection);
            if (tag == mapTag || tag == setTag) {
              return collection.size;
            }
            return baseKeys(collection).length;
          }
          __name(size2, "size");
          function some2(collection, predicate, guard) {
            var func = isArray(collection) ? arraySome : baseSome;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          __name(some2, "some");
          var sortBy = baseRest(function(collection, iteratees) {
            if (collection == null) {
              return [];
            }
            var length2 = iteratees.length;
            if (length2 > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
              iteratees = [];
            } else if (length2 > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
              iteratees = [iteratees[0]];
            }
            return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
          });
          var now = ctxNow || function() {
            return root.Date.now();
          };
          function after(n2, func) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n2 = toInteger(n2);
            return function() {
              if (--n2 < 1) {
                return func.apply(this, arguments);
              }
            };
          }
          __name(after, "after");
          function ary(func, n2, guard) {
            n2 = guard ? undefined : n2;
            n2 = func && n2 == null ? func.length : n2;
            return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n2);
          }
          __name(ary, "ary");
          function before(n2, func) {
            var result2;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n2 = toInteger(n2);
            return function() {
              if (--n2 > 0) {
                result2 = func.apply(this, arguments);
              }
              if (n2 <= 1) {
                func = undefined;
              }
              return result2;
            };
          }
          __name(before, "before");
          var bind = baseRest(function(func, thisArg, partials) {
            var bitmask = WRAP_BIND_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bind));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(func, bitmask, thisArg, partials, holders);
          });
          var bindKey = baseRest(function(object, key, partials) {
            var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bindKey));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(key, bitmask, object, partials, holders);
          });
          function curry(func, arity, guard) {
            arity = guard ? undefined : arity;
            var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
            result2.placeholder = curry.placeholder;
            return result2;
          }
          __name(curry, "curry");
          function curryRight(func, arity, guard) {
            arity = guard ? undefined : arity;
            var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
            result2.placeholder = curryRight.placeholder;
            return result2;
          }
          __name(curryRight, "curryRight");
          function debounce(func, wait, options) {
            var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            wait = toNumber(wait) || 0;
            if (isObject(options)) {
              leading = !!options.leading;
              maxing = "maxWait" in options;
              maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            function invokeFunc(time) {
              var args = lastArgs, thisArg = lastThis;
              lastArgs = lastThis = undefined;
              lastInvokeTime = time;
              result2 = func.apply(thisArg, args);
              return result2;
            }
            __name(invokeFunc, "invokeFunc");
            function leadingEdge(time) {
              lastInvokeTime = time;
              timerId = setTimeout(timerExpired, wait);
              return leading ? invokeFunc(time) : result2;
            }
            __name(leadingEdge, "leadingEdge");
            function remainingWait(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
              return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
            }
            __name(remainingWait, "remainingWait");
            function shouldInvoke(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
              return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
            }
            __name(shouldInvoke, "shouldInvoke");
            function timerExpired() {
              var time = now();
              if (shouldInvoke(time)) {
                return trailingEdge(time);
              }
              timerId = setTimeout(timerExpired, remainingWait(time));
            }
            __name(timerExpired, "timerExpired");
            function trailingEdge(time) {
              timerId = undefined;
              if (trailing && lastArgs) {
                return invokeFunc(time);
              }
              lastArgs = lastThis = undefined;
              return result2;
            }
            __name(trailingEdge, "trailingEdge");
            function cancel() {
              if (timerId !== undefined) {
                clearTimeout(timerId);
              }
              lastInvokeTime = 0;
              lastArgs = lastCallTime = lastThis = timerId = undefined;
            }
            __name(cancel, "cancel");
            function flush() {
              return timerId === undefined ? result2 : trailingEdge(now());
            }
            __name(flush, "flush");
            function debounced() {
              var time = now(), isInvoking = shouldInvoke(time);
              lastArgs = arguments;
              lastThis = this;
              lastCallTime = time;
              if (isInvoking) {
                if (timerId === undefined) {
                  return leadingEdge(lastCallTime);
                }
                if (maxing) {
                  clearTimeout(timerId);
                  timerId = setTimeout(timerExpired, wait);
                  return invokeFunc(lastCallTime);
                }
              }
              if (timerId === undefined) {
                timerId = setTimeout(timerExpired, wait);
              }
              return result2;
            }
            __name(debounced, "debounced");
            debounced.cancel = cancel;
            debounced.flush = flush;
            return debounced;
          }
          __name(debounce, "debounce");
          var defer = baseRest(function(func, args) {
            return baseDelay(func, 1, args);
          });
          var delay = baseRest(function(func, wait, args) {
            return baseDelay(func, toNumber(wait) || 0, args);
          });
          function flip(func) {
            return createWrap(func, WRAP_FLIP_FLAG);
          }
          __name(flip, "flip");
          function memoize(func, resolver) {
            if (typeof func != "function" || resolver != null && typeof resolver != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var memoized = /* @__PURE__ */ __name(function() {
              var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
              if (cache.has(key)) {
                return cache.get(key);
              }
              var result2 = func.apply(this, args);
              memoized.cache = cache.set(key, result2) || cache;
              return result2;
            }, "memoized");
            memoized.cache = new (memoize.Cache || MapCache)();
            return memoized;
          }
          __name(memoize, "memoize");
          memoize.Cache = MapCache;
          function negate(predicate) {
            if (typeof predicate != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return !predicate.call(this);
                case 1:
                  return !predicate.call(this, args[0]);
                case 2:
                  return !predicate.call(this, args[0], args[1]);
                case 3:
                  return !predicate.call(this, args[0], args[1], args[2]);
              }
              return !predicate.apply(this, args);
            };
          }
          __name(negate, "negate");
          function once(func) {
            return before(2, func);
          }
          __name(once, "once");
          var overArgs = castRest(function(func, transforms) {
            transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
            var funcsLength = transforms.length;
            return baseRest(function(args) {
              var index = -1, length2 = nativeMin(args.length, funcsLength);
              while (++index < length2) {
                args[index] = transforms[index].call(this, args[index]);
              }
              return apply(func, this, args);
            });
          });
          var partial = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partial));
            return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
          });
          var partialRight = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partialRight));
            return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
          });
          var rearg = flatRest(function(func, indexes) {
            return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
          });
          function rest(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start === undefined ? start : toInteger(start);
            return baseRest(func, start);
          }
          __name(rest, "rest");
          function spread(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start == null ? 0 : nativeMax(toInteger(start), 0);
            return baseRest(function(args) {
              var array = args[start], otherArgs = castSlice(args, 0, start);
              if (array) {
                arrayPush(otherArgs, array);
              }
              return apply(func, this, otherArgs);
            });
          }
          __name(spread, "spread");
          function throttle(func, wait, options) {
            var leading = true, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            if (isObject(options)) {
              leading = "leading" in options ? !!options.leading : leading;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            return debounce(func, wait, {
              "leading": leading,
              "maxWait": wait,
              "trailing": trailing
            });
          }
          __name(throttle, "throttle");
          function unary(func) {
            return ary(func, 1);
          }
          __name(unary, "unary");
          function wrap(value, wrapper) {
            return partial(castFunction(wrapper), value);
          }
          __name(wrap, "wrap");
          function castArray() {
            if (!arguments.length) {
              return [];
            }
            var value = arguments[0];
            return isArray(value) ? value : [value];
          }
          __name(castArray, "castArray");
          function clone(value) {
            return baseClone(value, CLONE_SYMBOLS_FLAG);
          }
          __name(clone, "clone");
          function cloneWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
          }
          __name(cloneWith, "cloneWith");
          function cloneDeep(value) {
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
          }
          __name(cloneDeep, "cloneDeep");
          function cloneDeepWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
          }
          __name(cloneDeepWith, "cloneDeepWith");
          function conformsTo(object, source) {
            return source == null || baseConformsTo(object, source, keys(source));
          }
          __name(conformsTo, "conformsTo");
          function eq(value, other) {
            return value === other || value !== value && other !== other;
          }
          __name(eq, "eq");
          var gt = createRelationalOperation(baseGt);
          var gte = createRelationalOperation(function(value, other) {
            return value >= other;
          });
          var isArguments = baseIsArguments(/* @__PURE__ */ function() {
            return arguments;
          }()) ? baseIsArguments : function(value) {
            return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
          };
          var isArray = Array2.isArray;
          var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
          function isArrayLike(value) {
            return value != null && isLength(value.length) && !isFunction(value);
          }
          __name(isArrayLike, "isArrayLike");
          function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
          }
          __name(isArrayLikeObject, "isArrayLikeObject");
          function isBoolean(value) {
            return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
          }
          __name(isBoolean, "isBoolean");
          var isBuffer = nativeIsBuffer || stubFalse;
          var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
          function isElement(value) {
            return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
          }
          __name(isElement, "isElement");
          function isEmpty(value) {
            if (value == null) {
              return true;
            }
            if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
              return !value.length;
            }
            var tag = getTag(value);
            if (tag == mapTag || tag == setTag) {
              return !value.size;
            }
            if (isPrototype(value)) {
              return !baseKeys(value).length;
            }
            for (var key in value) {
              if (hasOwnProperty.call(value, key)) {
                return false;
              }
            }
            return true;
          }
          __name(isEmpty, "isEmpty");
          function isEqual(value, other) {
            return baseIsEqual(value, other);
          }
          __name(isEqual, "isEqual");
          function isEqualWith(value, other, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            var result2 = customizer ? customizer(value, other) : undefined;
            return result2 === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result2;
          }
          __name(isEqualWith, "isEqualWith");
          function isError(value) {
            if (!isObjectLike(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
          }
          __name(isError, "isError");
          function isFinite(value) {
            return typeof value == "number" && nativeIsFinite(value);
          }
          __name(isFinite, "isFinite");
          function isFunction(value) {
            if (!isObject(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
          }
          __name(isFunction, "isFunction");
          function isInteger(value) {
            return typeof value == "number" && value == toInteger(value);
          }
          __name(isInteger, "isInteger");
          function isLength(value) {
            return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
          }
          __name(isLength, "isLength");
          function isObject(value) {
            var type8 = typeof value;
            return value != null && (type8 == "object" || type8 == "function");
          }
          __name(isObject, "isObject");
          function isObjectLike(value) {
            return value != null && typeof value == "object";
          }
          __name(isObjectLike, "isObjectLike");
          var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
          function isMatch(object, source) {
            return object === source || baseIsMatch(object, source, getMatchData(source));
          }
          __name(isMatch, "isMatch");
          function isMatchWith(object, source, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            return baseIsMatch(object, source, getMatchData(source), customizer);
          }
          __name(isMatchWith, "isMatchWith");
          function isNaN(value) {
            return isNumber(value) && value != +value;
          }
          __name(isNaN, "isNaN");
          function isNative(value) {
            if (isMaskable(value)) {
              throw new Error2(CORE_ERROR_TEXT);
            }
            return baseIsNative(value);
          }
          __name(isNative, "isNative");
          function isNull(value) {
            return value === null;
          }
          __name(isNull, "isNull");
          function isNil(value) {
            return value == null;
          }
          __name(isNil, "isNil");
          function isNumber(value) {
            return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
          }
          __name(isNumber, "isNumber");
          function isPlainObject(value) {
            if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
              return false;
            }
            var proto = getPrototype(value);
            if (proto === null) {
              return true;
            }
            var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
            return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
          }
          __name(isPlainObject, "isPlainObject");
          var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
          function isSafeInteger(value) {
            return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
          }
          __name(isSafeInteger, "isSafeInteger");
          var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
          function isString(value) {
            return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
          }
          __name(isString, "isString");
          function isSymbol(value) {
            return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
          }
          __name(isSymbol, "isSymbol");
          var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
          function isUndefined(value) {
            return value === undefined;
          }
          __name(isUndefined, "isUndefined");
          function isWeakMap(value) {
            return isObjectLike(value) && getTag(value) == weakMapTag;
          }
          __name(isWeakMap, "isWeakMap");
          function isWeakSet(value) {
            return isObjectLike(value) && baseGetTag(value) == weakSetTag;
          }
          __name(isWeakSet, "isWeakSet");
          var lt = createRelationalOperation(baseLt);
          var lte = createRelationalOperation(function(value, other) {
            return value <= other;
          });
          function toArray(value) {
            if (!value) {
              return [];
            }
            if (isArrayLike(value)) {
              return isString(value) ? stringToArray(value) : copyArray(value);
            }
            if (symIterator && value[symIterator]) {
              return iteratorToArray(value[symIterator]());
            }
            var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
            return func(value);
          }
          __name(toArray, "toArray");
          function toFinite(value) {
            if (!value) {
              return value === 0 ? value : 0;
            }
            value = toNumber(value);
            if (value === INFINITY || value === -INFINITY) {
              var sign = value < 0 ? -1 : 1;
              return sign * MAX_INTEGER;
            }
            return value === value ? value : 0;
          }
          __name(toFinite, "toFinite");
          function toInteger(value) {
            var result2 = toFinite(value), remainder = result2 % 1;
            return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
          }
          __name(toInteger, "toInteger");
          function toLength(value) {
            return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
          }
          __name(toLength, "toLength");
          function toNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            if (isObject(value)) {
              var other = typeof value.valueOf == "function" ? value.valueOf() : value;
              value = isObject(other) ? other + "" : other;
            }
            if (typeof value != "string") {
              return value === 0 ? value : +value;
            }
            value = baseTrim(value);
            var isBinary = reIsBinary.test(value);
            return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
          }
          __name(toNumber, "toNumber");
          function toPlainObject(value) {
            return copyObject(value, keysIn(value));
          }
          __name(toPlainObject, "toPlainObject");
          function toSafeInteger(value) {
            return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
          }
          __name(toSafeInteger, "toSafeInteger");
          function toString2(value) {
            return value == null ? "" : baseToString(value);
          }
          __name(toString2, "toString");
          var assign = createAssigner(function(object, source) {
            if (isPrototype(source) || isArrayLike(source)) {
              copyObject(source, keys(source), object);
              return;
            }
            for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                assignValue(object, key, source[key]);
              }
            }
          });
          var assignIn = createAssigner(function(object, source) {
            copyObject(source, keysIn(source), object);
          });
          var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keysIn(source), object, customizer);
          });
          var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keys(source), object, customizer);
          });
          var at = flatRest(baseAt);
          function create(prototype, properties) {
            var result2 = baseCreate(prototype);
            return properties == null ? result2 : baseAssign(result2, properties);
          }
          __name(create, "create");
          var defaults = baseRest(function(object, sources) {
            object = Object2(object);
            var index = -1;
            var length2 = sources.length;
            var guard = length2 > 2 ? sources[2] : undefined;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              length2 = 1;
            }
            while (++index < length2) {
              var source = sources[index];
              var props = keysIn(source);
              var propsIndex = -1;
              var propsLength = props.length;
              while (++propsIndex < propsLength) {
                var key = props[propsIndex];
                var value = object[key];
                if (value === undefined || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                  object[key] = source[key];
                }
              }
            }
            return object;
          });
          var defaultsDeep = baseRest(function(args) {
            args.push(undefined, customDefaultsMerge);
            return apply(mergeWith, undefined, args);
          });
          function findKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
          }
          __name(findKey, "findKey");
          function findLastKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
          }
          __name(findLastKey, "findLastKey");
          function forIn(object, iteratee2) {
            return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
          }
          __name(forIn, "forIn");
          function forInRight(object, iteratee2) {
            return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
          }
          __name(forInRight, "forInRight");
          function forOwn(object, iteratee2) {
            return object && baseForOwn(object, getIteratee(iteratee2, 3));
          }
          __name(forOwn, "forOwn");
          function forOwnRight(object, iteratee2) {
            return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
          }
          __name(forOwnRight, "forOwnRight");
          function functions(object) {
            return object == null ? [] : baseFunctions(object, keys(object));
          }
          __name(functions, "functions");
          function functionsIn(object) {
            return object == null ? [] : baseFunctions(object, keysIn(object));
          }
          __name(functionsIn, "functionsIn");
          function get(object, path, defaultValue) {
            var result2 = object == null ? undefined : baseGet(object, path);
            return result2 === undefined ? defaultValue : result2;
          }
          __name(get, "get");
          function has(object, path) {
            return object != null && hasPath(object, path, baseHas);
          }
          __name(has, "has");
          function hasIn(object, path) {
            return object != null && hasPath(object, path, baseHasIn);
          }
          __name(hasIn, "hasIn");
          var invert = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            result2[value] = key;
          }, constant(identity));
          var invertBy = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            if (hasOwnProperty.call(result2, value)) {
              result2[value].push(key);
            } else {
              result2[value] = [key];
            }
          }, getIteratee);
          var invoke = baseRest(baseInvoke);
          function keys(object) {
            return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
          }
          __name(keys, "keys");
          function keysIn(object) {
            return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
          }
          __name(keysIn, "keysIn");
          function mapKeys(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(result2, iteratee2(value, key, object2), value);
            });
            return result2;
          }
          __name(mapKeys, "mapKeys");
          function mapValues(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(result2, key, iteratee2(value, key, object2));
            });
            return result2;
          }
          __name(mapValues, "mapValues");
          var merge = createAssigner(function(object, source, srcIndex) {
            baseMerge(object, source, srcIndex);
          });
          var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
            baseMerge(object, source, srcIndex, customizer);
          });
          var omit = flatRest(function(object, paths) {
            var result2 = {};
            if (object == null) {
              return result2;
            }
            var isDeep = false;
            paths = arrayMap(paths, function(path) {
              path = castPath(path, object);
              isDeep || (isDeep = path.length > 1);
              return path;
            });
            copyObject(object, getAllKeysIn(object), result2);
            if (isDeep) {
              result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
            }
            var length2 = paths.length;
            while (length2--) {
              baseUnset(result2, paths[length2]);
            }
            return result2;
          });
          function omitBy(object, predicate) {
            return pickBy(object, negate(getIteratee(predicate)));
          }
          __name(omitBy, "omitBy");
          var pick = flatRest(function(object, paths) {
            return object == null ? {} : basePick(object, paths);
          });
          function pickBy(object, predicate) {
            if (object == null) {
              return {};
            }
            var props = arrayMap(getAllKeysIn(object), function(prop) {
              return [prop];
            });
            predicate = getIteratee(predicate);
            return basePickBy(object, props, function(value, path) {
              return predicate(value, path[0]);
            });
          }
          __name(pickBy, "pickBy");
          function result(object, path, defaultValue) {
            path = castPath(path, object);
            var index = -1, length2 = path.length;
            if (!length2) {
              length2 = 1;
              object = undefined;
            }
            while (++index < length2) {
              var value = object == null ? undefined : object[toKey(path[index])];
              if (value === undefined) {
                index = length2;
                value = defaultValue;
              }
              object = isFunction(value) ? value.call(object) : value;
            }
            return object;
          }
          __name(result, "result");
          function set(object, path, value) {
            return object == null ? object : baseSet(object, path, value);
          }
          __name(set, "set");
          function setWith(object, path, value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            return object == null ? object : baseSet(object, path, value, customizer);
          }
          __name(setWith, "setWith");
          var toPairs = createToPairs(keys);
          var toPairsIn = createToPairs(keysIn);
          function transform(object, iteratee2, accumulator) {
            var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
            iteratee2 = getIteratee(iteratee2, 4);
            if (accumulator == null) {
              var Ctor = object && object.constructor;
              if (isArrLike) {
                accumulator = isArr ? new Ctor() : [];
              } else if (isObject(object)) {
                accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
              } else {
                accumulator = {};
              }
            }
            (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
              return iteratee2(accumulator, value, index, object2);
            });
            return accumulator;
          }
          __name(transform, "transform");
          function unset(object, path) {
            return object == null ? true : baseUnset(object, path);
          }
          __name(unset, "unset");
          function update(object, path, updater) {
            return object == null ? object : baseUpdate(object, path, castFunction(updater));
          }
          __name(update, "update");
          function updateWith(object, path, updater, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined;
            return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
          }
          __name(updateWith, "updateWith");
          function values(object) {
            return object == null ? [] : baseValues(object, keys(object));
          }
          __name(values, "values");
          function valuesIn(object) {
            return object == null ? [] : baseValues(object, keysIn(object));
          }
          __name(valuesIn, "valuesIn");
          function clamp(number, lower, upper) {
            if (upper === undefined) {
              upper = lower;
              lower = undefined;
            }
            if (upper !== undefined) {
              upper = toNumber(upper);
              upper = upper === upper ? upper : 0;
            }
            if (lower !== undefined) {
              lower = toNumber(lower);
              lower = lower === lower ? lower : 0;
            }
            return baseClamp(toNumber(number), lower, upper);
          }
          __name(clamp, "clamp");
          function inRange(number, start, end) {
            start = toFinite(start);
            if (end === undefined) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            number = toNumber(number);
            return baseInRange(number, start, end);
          }
          __name(inRange, "inRange");
          function random(lower, upper, floating) {
            if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
              upper = floating = undefined;
            }
            if (floating === undefined) {
              if (typeof upper == "boolean") {
                floating = upper;
                upper = undefined;
              } else if (typeof lower == "boolean") {
                floating = lower;
                lower = undefined;
              }
            }
            if (lower === undefined && upper === undefined) {
              lower = 0;
              upper = 1;
            } else {
              lower = toFinite(lower);
              if (upper === undefined) {
                upper = lower;
                lower = 0;
              } else {
                upper = toFinite(upper);
              }
            }
            if (lower > upper) {
              var temp = lower;
              lower = upper;
              upper = temp;
            }
            if (floating || lower % 1 || upper % 1) {
              var rand = nativeRandom();
              return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
            }
            return baseRandom(lower, upper);
          }
          __name(random, "random");
          var camelCase = createCompounder(function(result2, word, index) {
            word = word.toLowerCase();
            return result2 + (index ? capitalize(word) : word);
          });
          function capitalize(string) {
            return upperFirst(toString2(string).toLowerCase());
          }
          __name(capitalize, "capitalize");
          function deburr(string) {
            string = toString2(string);
            return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
          }
          __name(deburr, "deburr");
          function endsWith(string, target, position) {
            string = toString2(string);
            target = baseToString(target);
            var length2 = string.length;
            position = position === undefined ? length2 : baseClamp(toInteger(position), 0, length2);
            var end = position;
            position -= target.length;
            return position >= 0 && string.slice(position, end) == target;
          }
          __name(endsWith, "endsWith");
          function escape(string) {
            string = toString2(string);
            return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
          }
          __name(escape, "escape");
          function escapeRegExp(string) {
            string = toString2(string);
            return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
          }
          __name(escapeRegExp, "escapeRegExp");
          var kebabCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "-" : "") + word.toLowerCase();
          });
          var lowerCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toLowerCase();
          });
          var lowerFirst = createCaseFirst("toLowerCase");
          function pad(string, length2, chars) {
            string = toString2(string);
            length2 = toInteger(length2);
            var strLength = length2 ? stringSize(string) : 0;
            if (!length2 || strLength >= length2) {
              return string;
            }
            var mid = (length2 - strLength) / 2;
            return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
          }
          __name(pad, "pad");
          function padEnd(string, length2, chars) {
            string = toString2(string);
            length2 = toInteger(length2);
            var strLength = length2 ? stringSize(string) : 0;
            return length2 && strLength < length2 ? string + createPadding(length2 - strLength, chars) : string;
          }
          __name(padEnd, "padEnd");
          function padStart(string, length2, chars) {
            string = toString2(string);
            length2 = toInteger(length2);
            var strLength = length2 ? stringSize(string) : 0;
            return length2 && strLength < length2 ? createPadding(length2 - strLength, chars) + string : string;
          }
          __name(padStart, "padStart");
          function parseInt2(string, radix, guard) {
            if (guard || radix == null) {
              radix = 0;
            } else if (radix) {
              radix = +radix;
            }
            return nativeParseInt(toString2(string).replace(reTrimStart, ""), radix || 0);
          }
          __name(parseInt2, "parseInt");
          function repeat(string, n2, guard) {
            if (guard ? isIterateeCall(string, n2, guard) : n2 === undefined) {
              n2 = 1;
            } else {
              n2 = toInteger(n2);
            }
            return baseRepeat(toString2(string), n2);
          }
          __name(repeat, "repeat");
          function replace() {
            var args = arguments, string = toString2(args[0]);
            return args.length < 3 ? string : string.replace(args[1], args[2]);
          }
          __name(replace, "replace");
          var snakeCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "_" : "") + word.toLowerCase();
          });
          function split(string, separator, limit) {
            if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
              separator = limit = undefined;
            }
            limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
            if (!limit) {
              return [];
            }
            string = toString2(string);
            if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
              separator = baseToString(separator);
              if (!separator && hasUnicode(string)) {
                return castSlice(stringToArray(string), 0, limit);
              }
            }
            return string.split(separator, limit);
          }
          __name(split, "split");
          var startCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + upperFirst(word);
          });
          function startsWith(string, target, position) {
            string = toString2(string);
            position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
            target = baseToString(target);
            return string.slice(position, position + target.length) == target;
          }
          __name(startsWith, "startsWith");
          function template(string, options, guard) {
            var settings = lodash.templateSettings;
            if (guard && isIterateeCall(string, options, guard)) {
              options = undefined;
            }
            string = toString2(string);
            options = assignInWith({}, options, settings, customDefaultsAssignIn);
            var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
            var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
            var reDelimiters = RegExp2(
              (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
              "g"
            );
            var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
            string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset2) {
              interpolateValue || (interpolateValue = esTemplateValue);
              source += string.slice(index, offset2).replace(reUnescapedString, escapeStringChar);
              if (escapeValue) {
                isEscaping = true;
                source += "' +\n__e(" + escapeValue + ") +\n'";
              }
              if (evaluateValue) {
                isEvaluating = true;
                source += "';\n" + evaluateValue + ";\n__p += '";
              }
              if (interpolateValue) {
                source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
              }
              index = offset2 + match.length;
              return match;
            });
            source += "';\n";
            var variable = hasOwnProperty.call(options, "variable") && options.variable;
            if (!variable) {
              source = "with (obj) {\n" + source + "\n}\n";
            } else if (reForbiddenIdentifierChars.test(variable)) {
              throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
            }
            source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
            source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
            var result2 = attempt(function() {
              return Function2(importsKeys, sourceURL + "return " + source).apply(undefined, importsValues);
            });
            result2.source = source;
            if (isError(result2)) {
              throw result2;
            }
            return result2;
          }
          __name(template, "template");
          function toLower(value) {
            return toString2(value).toLowerCase();
          }
          __name(toLower, "toLower");
          function toUpper(value) {
            return toString2(value).toUpperCase();
          }
          __name(toUpper, "toUpper");
          function trim(string, chars, guard) {
            string = toString2(string);
            if (string && (guard || chars === undefined)) {
              return baseTrim(string);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
            return castSlice(strSymbols, start, end).join("");
          }
          __name(trim, "trim");
          function trimEnd(string, chars, guard) {
            string = toString2(string);
            if (string && (guard || chars === undefined)) {
              return string.slice(0, trimmedEndIndex(string) + 1);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
            return castSlice(strSymbols, 0, end).join("");
          }
          __name(trimEnd, "trimEnd");
          function trimStart(string, chars, guard) {
            string = toString2(string);
            if (string && (guard || chars === undefined)) {
              return string.replace(reTrimStart, "");
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
            return castSlice(strSymbols, start).join("");
          }
          __name(trimStart, "trimStart");
          function truncate(string, options) {
            var length2 = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
            if (isObject(options)) {
              var separator = "separator" in options ? options.separator : separator;
              length2 = "length" in options ? toInteger(options.length) : length2;
              omission = "omission" in options ? baseToString(options.omission) : omission;
            }
            string = toString2(string);
            var strLength = string.length;
            if (hasUnicode(string)) {
              var strSymbols = stringToArray(string);
              strLength = strSymbols.length;
            }
            if (length2 >= strLength) {
              return string;
            }
            var end = length2 - stringSize(omission);
            if (end < 1) {
              return omission;
            }
            var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
            if (separator === undefined) {
              return result2 + omission;
            }
            if (strSymbols) {
              end += result2.length - end;
            }
            if (isRegExp(separator)) {
              if (string.slice(end).search(separator)) {
                var match, substring = result2;
                if (!separator.global) {
                  separator = RegExp2(separator.source, toString2(reFlags.exec(separator)) + "g");
                }
                separator.lastIndex = 0;
                while (match = separator.exec(substring)) {
                  var newEnd = match.index;
                }
                result2 = result2.slice(0, newEnd === undefined ? end : newEnd);
              }
            } else if (string.indexOf(baseToString(separator), end) != end) {
              var index = result2.lastIndexOf(separator);
              if (index > -1) {
                result2 = result2.slice(0, index);
              }
            }
            return result2 + omission;
          }
          __name(truncate, "truncate");
          function unescape(string) {
            string = toString2(string);
            return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
          }
          __name(unescape, "unescape");
          var upperCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toUpperCase();
          });
          var upperFirst = createCaseFirst("toUpperCase");
          function words(string, pattern, guard) {
            string = toString2(string);
            pattern = guard ? undefined : pattern;
            if (pattern === undefined) {
              return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
            }
            return string.match(pattern) || [];
          }
          __name(words, "words");
          var attempt = baseRest(function(func, args) {
            try {
              return apply(func, undefined, args);
            } catch (e2) {
              return isError(e2) ? e2 : new Error2(e2);
            }
          });
          var bindAll = flatRest(function(object, methodNames) {
            arrayEach(methodNames, function(key) {
              key = toKey(key);
              baseAssignValue(object, key, bind(object[key], object));
            });
            return object;
          });
          function cond(pairs) {
            var length2 = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
            pairs = !length2 ? [] : arrayMap(pairs, function(pair) {
              if (typeof pair[1] != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              return [toIteratee(pair[0]), pair[1]];
            });
            return baseRest(function(args) {
              var index = -1;
              while (++index < length2) {
                var pair = pairs[index];
                if (apply(pair[0], this, args)) {
                  return apply(pair[1], this, args);
                }
              }
            });
          }
          __name(cond, "cond");
          function conforms(source) {
            return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
          }
          __name(conforms, "conforms");
          function constant(value) {
            return function() {
              return value;
            };
          }
          __name(constant, "constant");
          function defaultTo(value, defaultValue) {
            return value == null || value !== value ? defaultValue : value;
          }
          __name(defaultTo, "defaultTo");
          var flow = createFlow();
          var flowRight = createFlow(true);
          function identity(value) {
            return value;
          }
          __name(identity, "identity");
          function iteratee(func) {
            return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
          }
          __name(iteratee, "iteratee");
          function matches(source) {
            return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
          }
          __name(matches, "matches");
          function matchesProperty(path, srcValue) {
            return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
          }
          __name(matchesProperty, "matchesProperty");
          var method = baseRest(function(path, args) {
            return function(object) {
              return baseInvoke(object, path, args);
            };
          });
          var methodOf = baseRest(function(object, args) {
            return function(path) {
              return baseInvoke(object, path, args);
            };
          });
          function mixin(object, source, options) {
            var props = keys(source), methodNames = baseFunctions(source, props);
            if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
              options = source;
              source = object;
              object = this;
              methodNames = baseFunctions(source, keys(source));
            }
            var chain3 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
            arrayEach(methodNames, function(methodName) {
              var func = source[methodName];
              object[methodName] = func;
              if (isFunc) {
                object.prototype[methodName] = function() {
                  var chainAll = this.__chain__;
                  if (chain3 || chainAll) {
                    var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                    actions.push({ "func": func, "args": arguments, "thisArg": object });
                    result2.__chain__ = chainAll;
                    return result2;
                  }
                  return func.apply(object, arrayPush([this.value()], arguments));
                };
              }
            });
            return object;
          }
          __name(mixin, "mixin");
          function noConflict() {
            if (root._ === this) {
              root._ = oldDash;
            }
            return this;
          }
          __name(noConflict, "noConflict");
          function noop() {
          }
          __name(noop, "noop");
          function nthArg(n2) {
            n2 = toInteger(n2);
            return baseRest(function(args) {
              return baseNth(args, n2);
            });
          }
          __name(nthArg, "nthArg");
          var over = createOver(arrayMap);
          var overEvery = createOver(arrayEvery);
          var overSome = createOver(arraySome);
          function property(path) {
            return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
          }
          __name(property, "property");
          function propertyOf(object) {
            return function(path) {
              return object == null ? undefined : baseGet(object, path);
            };
          }
          __name(propertyOf, "propertyOf");
          var range3 = createRange();
          var rangeRight = createRange(true);
          function stubArray() {
            return [];
          }
          __name(stubArray, "stubArray");
          function stubFalse() {
            return false;
          }
          __name(stubFalse, "stubFalse");
          function stubObject() {
            return {};
          }
          __name(stubObject, "stubObject");
          function stubString() {
            return "";
          }
          __name(stubString, "stubString");
          function stubTrue() {
            return true;
          }
          __name(stubTrue, "stubTrue");
          function times(n2, iteratee2) {
            n2 = toInteger(n2);
            if (n2 < 1 || n2 > MAX_SAFE_INTEGER) {
              return [];
            }
            var index = MAX_ARRAY_LENGTH, length2 = nativeMin(n2, MAX_ARRAY_LENGTH);
            iteratee2 = getIteratee(iteratee2);
            n2 -= MAX_ARRAY_LENGTH;
            var result2 = baseTimes(length2, iteratee2);
            while (++index < n2) {
              iteratee2(index);
            }
            return result2;
          }
          __name(times, "times");
          function toPath(value) {
            if (isArray(value)) {
              return arrayMap(value, toKey);
            }
            return isSymbol(value) ? [value] : copyArray(stringToPath(toString2(value)));
          }
          __name(toPath, "toPath");
          function uniqueId(prefix) {
            var id = ++idCounter;
            return toString2(prefix) + id;
          }
          __name(uniqueId, "uniqueId");
          var add = createMathOperation(function(augend, addend) {
            return augend + addend;
          }, 0);
          var ceil = createRound("ceil");
          var divide = createMathOperation(function(dividend, divisor) {
            return dividend / divisor;
          }, 1);
          var floor = createRound("floor");
          function max(array) {
            return array && array.length ? baseExtremum(array, identity, baseGt) : undefined;
          }
          __name(max, "max");
          function maxBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined;
          }
          __name(maxBy, "maxBy");
          function mean(array) {
            return baseMean(array, identity);
          }
          __name(mean, "mean");
          function meanBy(array, iteratee2) {
            return baseMean(array, getIteratee(iteratee2, 2));
          }
          __name(meanBy, "meanBy");
          function min(array) {
            return array && array.length ? baseExtremum(array, identity, baseLt) : undefined;
          }
          __name(min, "min");
          function minBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined;
          }
          __name(minBy, "minBy");
          var multiply = createMathOperation(function(multiplier, multiplicand) {
            return multiplier * multiplicand;
          }, 1);
          var round = createRound("round");
          var subtract = createMathOperation(function(minuend, subtrahend) {
            return minuend - subtrahend;
          }, 0);
          function sum2(array) {
            return array && array.length ? baseSum(array, identity) : 0;
          }
          __name(sum2, "sum");
          function sumBy(array, iteratee2) {
            return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
          }
          __name(sumBy, "sumBy");
          lodash.after = after;
          lodash.ary = ary;
          lodash.assign = assign;
          lodash.assignIn = assignIn;
          lodash.assignInWith = assignInWith;
          lodash.assignWith = assignWith;
          lodash.at = at;
          lodash.before = before;
          lodash.bind = bind;
          lodash.bindAll = bindAll;
          lodash.bindKey = bindKey;
          lodash.castArray = castArray;
          lodash.chain = chain2;
          lodash.chunk = chunk2;
          lodash.compact = compact2;
          lodash.concat = concat;
          lodash.cond = cond;
          lodash.conforms = conforms;
          lodash.constant = constant;
          lodash.countBy = countBy;
          lodash.create = create;
          lodash.curry = curry;
          lodash.curryRight = curryRight;
          lodash.debounce = debounce;
          lodash.defaults = defaults;
          lodash.defaultsDeep = defaultsDeep;
          lodash.defer = defer;
          lodash.delay = delay;
          lodash.difference = difference;
          lodash.differenceBy = differenceBy;
          lodash.differenceWith = differenceWith;
          lodash.drop = drop;
          lodash.dropRight = dropRight;
          lodash.dropRightWhile = dropRightWhile;
          lodash.dropWhile = dropWhile;
          lodash.fill = fill;
          lodash.filter = filter2;
          lodash.flatMap = flatMap;
          lodash.flatMapDeep = flatMapDeep;
          lodash.flatMapDepth = flatMapDepth;
          lodash.flatten = flatten;
          lodash.flattenDeep = flattenDeep;
          lodash.flattenDepth = flattenDepth;
          lodash.flip = flip;
          lodash.flow = flow;
          lodash.flowRight = flowRight;
          lodash.fromPairs = fromPairs;
          lodash.functions = functions;
          lodash.functionsIn = functionsIn;
          lodash.groupBy = groupBy;
          lodash.initial = initial;
          lodash.intersection = intersection;
          lodash.intersectionBy = intersectionBy;
          lodash.intersectionWith = intersectionWith;
          lodash.invert = invert;
          lodash.invertBy = invertBy;
          lodash.invokeMap = invokeMap;
          lodash.iteratee = iteratee;
          lodash.keyBy = keyBy;
          lodash.keys = keys;
          lodash.keysIn = keysIn;
          lodash.map = map2;
          lodash.mapKeys = mapKeys;
          lodash.mapValues = mapValues;
          lodash.matches = matches;
          lodash.matchesProperty = matchesProperty;
          lodash.memoize = memoize;
          lodash.merge = merge;
          lodash.mergeWith = mergeWith;
          lodash.method = method;
          lodash.methodOf = methodOf;
          lodash.mixin = mixin;
          lodash.negate = negate;
          lodash.nthArg = nthArg;
          lodash.omit = omit;
          lodash.omitBy = omitBy;
          lodash.once = once;
          lodash.orderBy = orderBy;
          lodash.over = over;
          lodash.overArgs = overArgs;
          lodash.overEvery = overEvery;
          lodash.overSome = overSome;
          lodash.partial = partial;
          lodash.partialRight = partialRight;
          lodash.partition = partition;
          lodash.pick = pick;
          lodash.pickBy = pickBy;
          lodash.property = property;
          lodash.propertyOf = propertyOf;
          lodash.pull = pull2;
          lodash.pullAll = pullAll;
          lodash.pullAllBy = pullAllBy;
          lodash.pullAllWith = pullAllWith;
          lodash.pullAt = pullAt;
          lodash.range = range3;
          lodash.rangeRight = rangeRight;
          lodash.rearg = rearg;
          lodash.reject = reject;
          lodash.remove = remove;
          lodash.rest = rest;
          lodash.reverse = reverse2;
          lodash.sampleSize = sampleSize2;
          lodash.set = set;
          lodash.setWith = setWith;
          lodash.shuffle = shuffle;
          lodash.slice = slice;
          lodash.sortBy = sortBy;
          lodash.sortedUniq = sortedUniq;
          lodash.sortedUniqBy = sortedUniqBy;
          lodash.split = split;
          lodash.spread = spread;
          lodash.tail = tail;
          lodash.take = take;
          lodash.takeRight = takeRight;
          lodash.takeRightWhile = takeRightWhile;
          lodash.takeWhile = takeWhile;
          lodash.tap = tap;
          lodash.throttle = throttle;
          lodash.thru = thru;
          lodash.toArray = toArray;
          lodash.toPairs = toPairs;
          lodash.toPairsIn = toPairsIn;
          lodash.toPath = toPath;
          lodash.toPlainObject = toPlainObject;
          lodash.transform = transform;
          lodash.unary = unary;
          lodash.union = union;
          lodash.unionBy = unionBy;
          lodash.unionWith = unionWith;
          lodash.uniq = uniq;
          lodash.uniqBy = uniqBy;
          lodash.uniqWith = uniqWith;
          lodash.unset = unset;
          lodash.unzip = unzip;
          lodash.unzipWith = unzipWith;
          lodash.update = update;
          lodash.updateWith = updateWith;
          lodash.values = values;
          lodash.valuesIn = valuesIn;
          lodash.without = without;
          lodash.words = words;
          lodash.wrap = wrap;
          lodash.xor = xor;
          lodash.xorBy = xorBy;
          lodash.xorWith = xorWith;
          lodash.zip = zip;
          lodash.zipObject = zipObject;
          lodash.zipObjectDeep = zipObjectDeep;
          lodash.zipWith = zipWith;
          lodash.entries = toPairs;
          lodash.entriesIn = toPairsIn;
          lodash.extend = assignIn;
          lodash.extendWith = assignInWith;
          mixin(lodash, lodash);
          lodash.add = add;
          lodash.attempt = attempt;
          lodash.camelCase = camelCase;
          lodash.capitalize = capitalize;
          lodash.ceil = ceil;
          lodash.clamp = clamp;
          lodash.clone = clone;
          lodash.cloneDeep = cloneDeep;
          lodash.cloneDeepWith = cloneDeepWith;
          lodash.cloneWith = cloneWith;
          lodash.conformsTo = conformsTo;
          lodash.deburr = deburr;
          lodash.defaultTo = defaultTo;
          lodash.divide = divide;
          lodash.endsWith = endsWith;
          lodash.eq = eq;
          lodash.escape = escape;
          lodash.escapeRegExp = escapeRegExp;
          lodash.every = every2;
          lodash.find = find;
          lodash.findIndex = findIndex;
          lodash.findKey = findKey;
          lodash.findLast = findLast;
          lodash.findLastIndex = findLastIndex;
          lodash.findLastKey = findLastKey;
          lodash.floor = floor;
          lodash.forEach = forEach;
          lodash.forEachRight = forEachRight;
          lodash.forIn = forIn;
          lodash.forInRight = forInRight;
          lodash.forOwn = forOwn;
          lodash.forOwnRight = forOwnRight;
          lodash.get = get;
          lodash.gt = gt;
          lodash.gte = gte;
          lodash.has = has;
          lodash.hasIn = hasIn;
          lodash.head = head;
          lodash.identity = identity;
          lodash.includes = includes;
          lodash.indexOf = indexOf2;
          lodash.inRange = inRange;
          lodash.invoke = invoke;
          lodash.isArguments = isArguments;
          lodash.isArray = isArray;
          lodash.isArrayBuffer = isArrayBuffer;
          lodash.isArrayLike = isArrayLike;
          lodash.isArrayLikeObject = isArrayLikeObject;
          lodash.isBoolean = isBoolean;
          lodash.isBuffer = isBuffer;
          lodash.isDate = isDate;
          lodash.isElement = isElement;
          lodash.isEmpty = isEmpty;
          lodash.isEqual = isEqual;
          lodash.isEqualWith = isEqualWith;
          lodash.isError = isError;
          lodash.isFinite = isFinite;
          lodash.isFunction = isFunction;
          lodash.isInteger = isInteger;
          lodash.isLength = isLength;
          lodash.isMap = isMap;
          lodash.isMatch = isMatch;
          lodash.isMatchWith = isMatchWith;
          lodash.isNaN = isNaN;
          lodash.isNative = isNative;
          lodash.isNil = isNil;
          lodash.isNull = isNull;
          lodash.isNumber = isNumber;
          lodash.isObject = isObject;
          lodash.isObjectLike = isObjectLike;
          lodash.isPlainObject = isPlainObject;
          lodash.isRegExp = isRegExp;
          lodash.isSafeInteger = isSafeInteger;
          lodash.isSet = isSet;
          lodash.isString = isString;
          lodash.isSymbol = isSymbol;
          lodash.isTypedArray = isTypedArray;
          lodash.isUndefined = isUndefined;
          lodash.isWeakMap = isWeakMap;
          lodash.isWeakSet = isWeakSet;
          lodash.join = join;
          lodash.kebabCase = kebabCase;
          lodash.last = last;
          lodash.lastIndexOf = lastIndexOf;
          lodash.lowerCase = lowerCase;
          lodash.lowerFirst = lowerFirst;
          lodash.lt = lt;
          lodash.lte = lte;
          lodash.max = max;
          lodash.maxBy = maxBy;
          lodash.mean = mean;
          lodash.meanBy = meanBy;
          lodash.min = min;
          lodash.minBy = minBy;
          lodash.stubArray = stubArray;
          lodash.stubFalse = stubFalse;
          lodash.stubObject = stubObject;
          lodash.stubString = stubString;
          lodash.stubTrue = stubTrue;
          lodash.multiply = multiply;
          lodash.nth = nth;
          lodash.noConflict = noConflict;
          lodash.noop = noop;
          lodash.now = now;
          lodash.pad = pad;
          lodash.padEnd = padEnd;
          lodash.padStart = padStart;
          lodash.parseInt = parseInt2;
          lodash.random = random;
          lodash.reduce = reduce;
          lodash.reduceRight = reduceRight;
          lodash.repeat = repeat;
          lodash.replace = replace;
          lodash.result = result;
          lodash.round = round;
          lodash.runInContext = runInContext2;
          lodash.sample = sample;
          lodash.size = size2;
          lodash.snakeCase = snakeCase;
          lodash.some = some2;
          lodash.sortedIndex = sortedIndex;
          lodash.sortedIndexBy = sortedIndexBy;
          lodash.sortedIndexOf = sortedIndexOf;
          lodash.sortedLastIndex = sortedLastIndex;
          lodash.sortedLastIndexBy = sortedLastIndexBy;
          lodash.sortedLastIndexOf = sortedLastIndexOf;
          lodash.startCase = startCase;
          lodash.startsWith = startsWith;
          lodash.subtract = subtract;
          lodash.sum = sum2;
          lodash.sumBy = sumBy;
          lodash.template = template;
          lodash.times = times;
          lodash.toFinite = toFinite;
          lodash.toInteger = toInteger;
          lodash.toLength = toLength;
          lodash.toLower = toLower;
          lodash.toNumber = toNumber;
          lodash.toSafeInteger = toSafeInteger;
          lodash.toString = toString2;
          lodash.toUpper = toUpper;
          lodash.trim = trim;
          lodash.trimEnd = trimEnd;
          lodash.trimStart = trimStart;
          lodash.truncate = truncate;
          lodash.unescape = unescape;
          lodash.uniqueId = uniqueId;
          lodash.upperCase = upperCase;
          lodash.upperFirst = upperFirst;
          lodash.each = forEach;
          lodash.eachRight = forEachRight;
          lodash.first = head;
          mixin(lodash, function() {
            var source = {};
            baseForOwn(lodash, function(func, methodName) {
              if (!hasOwnProperty.call(lodash.prototype, methodName)) {
                source[methodName] = func;
              }
            });
            return source;
          }(), { "chain": false });
          lodash.VERSION = VERSION;
          arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
            lodash[methodName].placeholder = lodash;
          });
          arrayEach(["drop", "take"], function(methodName, index) {
            LazyWrapper.prototype[methodName] = function(n2) {
              n2 = n2 === undefined ? 1 : nativeMax(toInteger(n2), 0);
              var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
              if (result2.__filtered__) {
                result2.__takeCount__ = nativeMin(n2, result2.__takeCount__);
              } else {
                result2.__views__.push({
                  "size": nativeMin(n2, MAX_ARRAY_LENGTH),
                  "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
                });
              }
              return result2;
            };
            LazyWrapper.prototype[methodName + "Right"] = function(n2) {
              return this.reverse()[methodName](n2).reverse();
            };
          });
          arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
            var type8 = index + 1, isFilter = type8 == LAZY_FILTER_FLAG || type8 == LAZY_WHILE_FLAG;
            LazyWrapper.prototype[methodName] = function(iteratee2) {
              var result2 = this.clone();
              result2.__iteratees__.push({
                "iteratee": getIteratee(iteratee2, 3),
                "type": type8
              });
              result2.__filtered__ = result2.__filtered__ || isFilter;
              return result2;
            };
          });
          arrayEach(["head", "last"], function(methodName, index) {
            var takeName = "take" + (index ? "Right" : "");
            LazyWrapper.prototype[methodName] = function() {
              return this[takeName](1).value()[0];
            };
          });
          arrayEach(["initial", "tail"], function(methodName, index) {
            var dropName = "drop" + (index ? "" : "Right");
            LazyWrapper.prototype[methodName] = function() {
              return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
            };
          });
          LazyWrapper.prototype.compact = function() {
            return this.filter(identity);
          };
          LazyWrapper.prototype.find = function(predicate) {
            return this.filter(predicate).head();
          };
          LazyWrapper.prototype.findLast = function(predicate) {
            return this.reverse().find(predicate);
          };
          LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
            if (typeof path == "function") {
              return new LazyWrapper(this);
            }
            return this.map(function(value) {
              return baseInvoke(value, path, args);
            });
          });
          LazyWrapper.prototype.reject = function(predicate) {
            return this.filter(negate(getIteratee(predicate)));
          };
          LazyWrapper.prototype.slice = function(start, end) {
            start = toInteger(start);
            var result2 = this;
            if (result2.__filtered__ && (start > 0 || end < 0)) {
              return new LazyWrapper(result2);
            }
            if (start < 0) {
              result2 = result2.takeRight(-start);
            } else if (start) {
              result2 = result2.drop(start);
            }
            if (end !== undefined) {
              end = toInteger(end);
              result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
            }
            return result2;
          };
          LazyWrapper.prototype.takeRightWhile = function(predicate) {
            return this.reverse().takeWhile(predicate).reverse();
          };
          LazyWrapper.prototype.toArray = function() {
            return this.take(MAX_ARRAY_LENGTH);
          };
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
            if (!lodashFunc) {
              return;
            }
            lodash.prototype[methodName] = function() {
              var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
              var interceptor = /* @__PURE__ */ __name(function(value2) {
                var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
                return isTaker && chainAll ? result3[0] : result3;
              }, "interceptor");
              if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
                isLazy = useLazy = false;
              }
              var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
              if (!retUnwrapped && useLazy) {
                value = onlyLazy ? value : new LazyWrapper(this);
                var result2 = func.apply(value, args);
                result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined });
                return new LodashWrapper(result2, chainAll);
              }
              if (isUnwrapped && onlyLazy) {
                return func.apply(this, args);
              }
              result2 = this.thru(interceptor);
              return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
            };
          });
          arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
            var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
            lodash.prototype[methodName] = function() {
              var args = arguments;
              if (retUnwrapped && !this.__chain__) {
                var value = this.value();
                return func.apply(isArray(value) ? value : [], args);
              }
              return this[chainName](function(value2) {
                return func.apply(isArray(value2) ? value2 : [], args);
              });
            };
          });
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var lodashFunc = lodash[methodName];
            if (lodashFunc) {
              var key = lodashFunc.name + "";
              if (!hasOwnProperty.call(realNames, key)) {
                realNames[key] = [];
              }
              realNames[key].push({ "name": methodName, "func": lodashFunc });
            }
          });
          realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
            "name": "wrapper",
            "func": undefined
          }];
          LazyWrapper.prototype.clone = lazyClone;
          LazyWrapper.prototype.reverse = lazyReverse;
          LazyWrapper.prototype.value = lazyValue;
          lodash.prototype.at = wrapperAt;
          lodash.prototype.chain = wrapperChain;
          lodash.prototype.commit = wrapperCommit;
          lodash.prototype.next = wrapperNext;
          lodash.prototype.plant = wrapperPlant;
          lodash.prototype.reverse = wrapperReverse;
          lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
          lodash.prototype.first = lodash.prototype.head;
          if (symIterator) {
            lodash.prototype[symIterator] = wrapperToIterator;
          }
          return lodash;
        }, "runInContext");
        var _15 = runInContext();
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
          root._ = _15;
          define(function() {
            return _15;
          });
        } else if (freeModule) {
          (freeModule.exports = _15)._ = _15;
          freeExports._ = _15;
        } else {
          root._ = _15;
        }
      }).call(exports);
    }
  });

  // objects/boss/index.ts
  var boss_exports = {};
  __export(boss_exports, {
    Footprint: () => footprint_exports2,
    make: () => make13,
    possibleMoves: () => possibleMoves,
    tick: () => tick8
  });

  // game/collapse.ts
  var collapse_exports = {};
  __export(collapse_exports, {
    make: () => make3,
    plan: () => plan,
    tick: () => tick2
  });

  // utils/random.ts
  var random_exports = {};
  __export(random_exports, {
    choice: () => choice,
    int: () => int,
    ints: () => ints,
    select: () => select,
    setRng: () => setRng
  });
  var _ = __toESM(require_lodash());

  // utils/assert.ts
  var _AssertionError = class _AssertionError extends Error {
    constructor(message2) {
      super(message2);
    }
  };
  __name(_AssertionError, "AssertionError");
  var AssertionError = _AssertionError;
  function assert(condition, msg) {
    if (!condition) {
      throw new AssertionError(msg ?? "");
    }
  }
  __name(assert, "assert");
  function assertUnreachable(_15) {
    throw new AssertionError("Didn't expect to get here");
  }
  __name(assertUnreachable, "assertUnreachable");

  // utils/random.ts
  var rng = Math.random;
  function setRng(g) {
    rng = g;
  }
  __name(setRng, "setRng");
  function int(min, max) {
    return Math.floor(rng() * (max - min)) + min;
  }
  __name(int, "int");
  function ints(min, max, num_of_ints) {
    return _.range(num_of_ints).map((_15) => int(min, max));
  }
  __name(ints, "ints");
  function choice(choices, weights = null) {
    assert(weights == null || choices.length == weights?.length);
    if (choices.length == 3) {
    }
    weights = weights ?? _.range(choices.length).map((_15) => 1);
    let total = _.sum(weights);
    const threshold = Math.random() * total;
    total = 0;
    for (let i = 0; i < choices.length - 1; ++i) {
      total += weights[i];
      if (total >= threshold) {
        return choices[i];
      }
    }
    return choices[choices.length - 1];
  }
  __name(choice, "choice");
  function select(choices, num) {
    return _.sampleSize(choices, num);
  }
  __name(select, "select");

  // game/config.ts
  var config = {
    maze: {
      numberOfDoorsPerRoom: [
        [3, 0, 1],
        [6, 2, 3],
        [12, 2, 4],
        [100, 2, 5]
      ]
    },
    tickInterval: 100,
    boss: {
      TACTS_FOR_JUMP: 3,
      TACTS_FOR_SINGLE_MOVE: 4 * 3,
      footprint: {
        zIndex: 2,
        visible: false
      }
    },
    developer: {
      moves: {
        weights: {
          reverseDirection: 1,
          forwardDirection: 10,
          footprints: [1e3, 400, 20],
          freeSpace: 1e4
        },
        ticksPerMove: 2
      },
      footprint: {
        zIndex: 2,
        visible: false
      },
      pathlights: {
        zIndex: 2,
        visible: true
      },
      prReview: {
        days: 1
      }
    },
    totalDays: 14 * 3,
    // totalDays: 2,
    dayTicks: 80,
    story: {
      small: { neededCommits: 2, impact: 1 },
      medium: { neededCommits: 5, impact: 2 },
      large: { neededCommits: 8, impact: 4 }
    },
    sprint: {
      startDay: 0,
      days: 10
    },
    collapse: {
      days: 5
    },
    messages: { showNextMessageAfter: 500 },
    performanceReview: {
      interval: 28
    },
    itemGenerator: {
      start: 0,
      interval: 40,
      maxItems: 20,
      frequencies: {
        door: 2,
        commit: 10,
        coffee: 1,
        prReview: 2
      }
    },
    items: {
      coffee: {
        zIndex: 2,
        speedUpDays: 1,
        visible: true
      },
      door: {
        zIndex: 2
      },
      prReview: {
        zIndex: 2,
        visible: true
      }
    }
  };
  var config_default = config;

  // game/plan.ts
  var plan_exports = {};
  __export(plan_exports, {
    addEvent: () => addEvent,
    append: () => append,
    daily: () => daily,
    dump: () => dump,
    generatePlan: () => generatePlan,
    getEvents: () => getEvents,
    length: () => length,
    make: () => make2,
    offset: () => offset
  });

  // utils/bfs.ts
  var bfs_exports = {};
  __export(bfs_exports, {
    bfs: () => bfs
  });

  // geometry/vector.ts
  var vector_exports = {};
  __export(vector_exports, {
    e: () => e,
    equals: () => equals,
    n: () => n,
    repr: () => repr,
    s: () => s,
    w: () => w,
    zero: () => zero
  });
  function n(v) {
    return { x: v.x, y: v.y - 1 };
  }
  __name(n, "n");
  function s(v) {
    return { x: v.x, y: v.y + 1 };
  }
  __name(s, "s");
  function w(v) {
    return { x: v.x - 1, y: v.y };
  }
  __name(w, "w");
  function e(v) {
    return { x: v.x + 1, y: v.y };
  }
  __name(e, "e");
  function equals(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y;
  }
  __name(equals, "equals");
  var zero = { x: 0, y: 0 };
  function repr(v) {
    return v ? `(${v.x}, ${v.y})` : "null";
  }
  __name(repr, "repr");

  // geometry/direction.ts
  var direction_exports = {};
  __export(direction_exports, {
    all: () => all,
    reverse: () => reverse,
    toRose: () => toRose
  });
  function reverse(direction) {
    switch (direction) {
      case "down":
        return "up";
      case "up":
        return "down";
      case "left":
        return "right";
      case "right":
        return "left";
    }
  }
  __name(reverse, "reverse");
  function toRose(directions) {
    const rose = {};
    for (const direction of directions) {
      rose[direction] = true;
    }
    return rose;
  }
  __name(toRose, "toRose");
  var all = ["left", "right", "down", "up"];

  // geometry/index.ts
  function moveTo(vector, direction) {
    if (direction == null) {
      return vector;
    } else {
      switch (direction) {
        case "down":
          return { ...vector, x: vector.x, y: vector.y + 1 };
        case "up":
          return { ...vector, x: vector.x, y: vector.y - 1 };
        case "left":
          return { ...vector, x: vector.x - 1, y: vector.y };
        case "right":
          return { ...vector, x: vector.x + 1, y: vector.y };
      }
    }
  }
  __name(moveTo, "moveTo");
  function directionTo(vector, target) {
    if (equals(vector, target))
      return null;
    else if (equals(n(vector), target))
      return "up";
    else if (equals(s(vector), target))
      return "down";
    else if (equals(w(vector), target))
      return "left";
    else if (equals(e(vector), target))
      return "right";
    else {
      return null;
    }
  }
  __name(directionTo, "directionTo");
  function line(start, direction, size2) {
    const line_vector = [];
    for (let i = 0; i < size2; ++i) {
      line_vector.push({
        x: start.x + i * direction.x,
        y: start.y + i * direction.y
      });
    }
    return line_vector;
  }
  __name(line, "line");
  function hline(start, size2) {
    return line(start, { x: 1, y: 0 }, size2);
  }
  __name(hline, "hline");
  function vline(start, size2) {
    return line(start, { x: 0, y: 1 }, size2);
  }
  __name(vline, "vline");

  // utils/bfs.ts
  function bfs(possibleMoves3, start, target) {
    if (vector_exports.equals(start, target)) {
      return [];
    }
    const queue = [start];
    const discovered = /* @__PURE__ */ new Set([vector_exports.repr(start)]);
    const edges = /* @__PURE__ */ new Map();
    edges.set(vector_exports.repr(start), 0);
    const predecessors = /* @__PURE__ */ new Map();
    predecessors.set(vector_exports.repr(start), null);
    const buildPath = /* @__PURE__ */ __name((goal, root, predecessors2) => {
      const stack = [goal];
      let u = predecessors2.get(vector_exports.repr(goal));
      while (u != root) {
        stack.push(u);
        u = predecessors2.get(vector_exports.repr(u));
      }
      stack.push(root);
      let path = stack.reverse();
      return path;
    }, "buildPath");
    while (queue.length) {
      let v = queue.shift();
      if (v.x === target.x && v.y === target.y) {
        return buildPath(target, start, predecessors);
      }
      for (const d of possibleMoves3(v)) {
        {
          const nextPos = moveTo(v, d);
          if (!discovered.has(vector_exports.repr(nextPos))) {
            discovered.add(vector_exports.repr(nextPos));
            queue.push(nextPos);
            edges.set(vector_exports.repr(nextPos), edges.get(vector_exports.repr(v)) + 1);
            predecessors.set(vector_exports.repr(nextPos), v);
          }
        }
      }
    }
    return null;
  }
  __name(bfs, "bfs");

  // utils/format.ts
  var format_exports = {};
  __export(format_exports, {
    currency: () => currency
  });
  function currency(sum2) {
    return new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0
    }).format(sum2);
  }
  __name(currency, "currency");

  // utils/logging.ts
  var logging_exports = {};
  __export(logging_exports, {
    make: () => make,
    setIsEnabled: () => setIsEnabled,
    setTime: () => setTime
  });
  function setIsEnabled(f) {
    isEnabled = f;
  }
  __name(setIsEnabled, "setIsEnabled");
  function setTime(time) {
    tick = time;
  }
  __name(setTime, "setTime");
  function make(name) {
    return (message2) => {
      if (isEnabled(name)) {
        console.log(tick.toString().padStart(4, "0") + " " + message2);
      }
    };
  }
  __name(make, "make");
  var isEnabled = /* @__PURE__ */ __name((_15) => true, "isEnabled");
  var tick = 0;

  // game/plan.ts
  var import_lodash = __toESM(require_lodash());
  var logger = logging_exports.make("plan");
  function make2() {
    return /* @__PURE__ */ new Map();
  }
  __name(make2, "make");
  function addEvent(plan3, time, event) {
    if (!plan3.has(time)) {
      plan3.set(time, []);
    }
    plan3.get(time).push(event);
  }
  __name(addEvent, "addEvent");
  function getEvents(plan3, time) {
    return plan3.get(time) ?? [];
  }
  __name(getEvents, "getEvents");
  function length(plan3) {
    return import_lodash.default.max([...plan3.keys()]) ?? 0;
  }
  __name(length, "length");
  function offset(plan3, offset2) {
    const newPlan = make2();
    for (const [time, events] of plan3.entries()) {
      for (const event of events)
        addEvent(newPlan, time + offset2, event);
    }
    return newPlan;
  }
  __name(offset, "offset");
  function append(plan3, other) {
    for (const time of other.keys()) {
      for (const event of other.get(time)) {
        addEvent(plan3, time, event);
      }
    }
    return plan3;
  }
  __name(append, "append");
  function generatePlan(startDay) {
    let plan3 = make2();
    let startTick = startDay * config_default.dayTicks;
    let sprints = import_lodash.default.range(Math.floor((config_default.totalDays - startDay) / 14));
    for (const sprint of sprints) {
      const r = sprint_exports.generatePlan(
        sprint === import_lodash.default.last(sprints) ? { type: "last" } : { type: "normal" },
        startTick
      );
      append(plan3, r[0]);
      startTick = r[1];
    }
    startTick = startDay * config_default.dayTicks;
    for (const i in import_lodash.default.range(Math.floor((config_default.totalDays - startDay) / 14))) {
      const pplan = performance_review_exports.generatePlan(startTick);
      append(plan3, pplan);
      startTick += config_default.dayTicks * 14;
    }
    const collapsePlan = collapse_exports.plan();
    append(plan3, plan_exports.offset(collapsePlan, startTick - plan_exports.length(collapsePlan)));
    append(plan3, plan_exports.offset(developer_exports.plan(), 1 * config_default.dayTicks));
    return plan3;
  }
  __name(generatePlan, "generatePlan");
  function daily(plan3) {
    const result = [...plan3.entries()].map(
      ([time, events]) => [Math.floor(time / config_default.dayTicks), events]
    );
    return result.reduce((acc, [day, events]) => {
      acc.set(day, [...acc.get(day) ?? [], ...events]);
      return acc;
    }, /* @__PURE__ */ new Map());
  }
  __name(daily, "daily");
  function dump(plan3) {
    const lines = [];
    lines.push("Plan:");
    for (const [time, events] of import_lodash.default.sortBy([...plan3.entries()], (x) => x[0])) {
      lines.push(`time: ${time}, day: ${time / config_default.dayTicks}`);
      for (const event of events) {
        lines.push(`  ${event.type}`);
      }
    }
    logger(lines.join("\n"));
    return lines.join("\n");
  }
  __name(dump, "dump");

  // game/collapse.ts
  function make3() {
    return {};
  }
  __name(make3, "make");
  function plan() {
    const plan3 = make2();
    addEvent(plan3, 0, { type: "collapseStart" });
    addEvent(plan3, config_default.dayTicks * config_default.collapse.days, { type: "null" });
    return plan3;
  }
  __name(plan, "plan");
  function tick2(game) {
    const events = game.plan.get(game.time.ticks);
    if (events && events.some((event) => event.type === "collapseStart")) {
      game.collapse = make3();
    }
    if (game.collapse) {
      const walls = game.map.objects.filter((obj) => obj.type === "wall").filter(
        (obj) => obj.position != null && obj.position.y !== 0 && obj.position.y !== game.map.height - 1 && obj.position.x !== 0 && obj.position.x !== game.map.width - 1
      );
      const ticksLeft = config_default.totalDays * config_default.dayTicks - game.time.ticks;
      const removeTicks = Math.floor(walls.length / ticksLeft) / 2;
      const removeWalls = select(walls, removeTicks);
      game.map.remove(removeWalls);
    }
    return [];
  }
  __name(tick2, "tick");

  // game/effect.ts
  var effect_exports = {};
  __export(effect_exports, {
    addImpact: () => addImpact,
    itemGenerated: () => itemGenerated,
    showMessage: () => showMessage
  });
  function addImpact(impact) {
    return {
      type: "addImpact",
      impact
    };
  }
  __name(addImpact, "addImpact");
  function itemGenerated(item) {
    return {
      type: "itemGenerated",
      item
    };
  }
  __name(itemGenerated, "itemGenerated");
  function showMessage(text, ttl) {
    return { type: "showMessage", message: { text, ttl } };
  }
  __name(showMessage, "showMessage");

  // game/effects.ts
  var effects_exports = {};
  __export(effects_exports, {
    append: () => append2
  });
  var import_lodash2 = __toESM(require_lodash());
  function append2(effects, other) {
    if (!import_lodash2.default.isArray(other)) {
      other = [other];
    }
    for (const effect of other) {
      effects.push(effect);
    }
  }
  __name(append2, "append");

  // game/game.ts
  var game_exports = {};
  __export(game_exports, {
    load: () => load,
    make: () => make6,
    message: () => message,
    save: () => save,
    tick: () => tick4,
    toJson: () => toJson
  });

  // traits/footprint.ts
  var footprint_exports = {};
  __export(footprint_exports, {
    make: () => make4
  });
  function make4(footprint4) {
    return {
      tick(obj, map2) {
        if (footprint4.tick(obj) > footprint4.lifetime(obj)) {
          map2.remove([obj]);
        } else {
          footprint4.setTick(obj, footprint4.tick(obj) + 1);
        }
        return [];
      },
      leaveFootprint(position, map2, make26) {
        const existingFootprint = map2.objAt(position, "developer.footprint");
        if (existingFootprint) {
          map2.remove(existingFootprint);
        }
        const footprint5 = make26(position);
        map2.add([footprint5]);
        return footprint5;
      }
    };
  }
  __name(make4, "make");

  // traits/speedUp.ts
  var speedUp_exports = {};
  __export(speedUp_exports, {
    speedUp: () => speedUp,
    tick: () => tick3
  });
  function speedUp(speedUp4, t) {
    const days = speedUp4.speedUpDays(t);
    speedUp4.setSpeedUp(t, speedUp4.speedUp(t) + days * config_default.dayTicks);
  }
  __name(speedUp, "speedUp");
  function tick3(speedUp4, t, ticksPassed) {
    speedUp4.setSpeedUp(t, Math.max(speedUp4.speedUp(t) - ticksPassed, 0));
  }
  __name(tick3, "tick");

  // traits/picking.ts
  var picking_exports = {};
  __export(picking_exports, {
    make: () => make5
  });
  var logger2 = make("picking");
  function make5(trait) {
    return {
      pick(t, item, map2, effects) {
        if (trait.canPickItem(t, item)) {
          logger2(`Can pick item  ${JSON.stringify(t)}`);
          trait.pickItem(t, item, map2, effects);
          effects_exports.append(
            effects,
            effect_exports.showMessage(`Picked ${item_exports.description(item)}`, 3e3)
          );
        }
      }
    };
  }
  __name(make5, "make");

  // game/renderer.ts
  var renderer_exports = {};
  __export(renderer_exports, {
    render: () => render,
    renderMap: () => renderMap,
    renderMapRect: () => renderMapRect,
    showMessage: () => showMessage2
  });
  function render(game) {
    const map2 = game.map;
    let buffer = [showMessage2(game)];
    buffer = buffer.concat(renderMap(map2, game.time.ticks));
    buffer.push(
      showTime(game) + showLevel(game) + showFlags(game) + "|Money: " + format_exports.currency(game.score.money).padStart(6, " ") + "|Impact: " + game.score.impact.toString().padStart(3, " ") + showTask(game) + // showItems(game.score.generatedItems) +
      "|" + showStockPrice(game)
    );
    return buffer.map((x) => x);
  }
  __name(render, "render");
  function renderMapRect(map2, tick12, rect) {
    const rendered = renderMap(map2, tick12);
    const subRect = [];
    for (let y = rect.position.y; y < rect.position.y + rect.size.y; y++) {
      subRect.push(rendered[y].substring(rect.position.x, rect.position.x + rect.size.x));
    }
    return subRect;
  }
  __name(renderMapRect, "renderMapRect");
  function renderMap(map2, tick12) {
    const buffer = [];
    for (let y = 0; y < map2.height; y++) {
      const row = [];
      for (let x = 0; x < map2.width; x++) {
        const objs = map2.cells[y][x];
        row.push(getRepresentation(map2, objs, tick12));
      }
      buffer.push(row.join(""));
    }
    return buffer;
  }
  __name(renderMap, "renderMap");
  function showMessage2(game) {
    if (game.messages.length > 0) {
      if (game.messageStartTime == null) {
        game.messageStartTime = Date.now();
      }
      if (Date.now() - game.messageStartTime.valueOf() > game.messages[0].ttl) {
        game.messageStartTime = null;
        game.messages.shift();
      } else if (Date.now().valueOf() - game.messageStartTime.valueOf() > config_default.messages.showNextMessageAfter && game.messages.length > 1) {
        game.messageStartTime = null;
        game.messages.shift();
      }
      return game.messages.length > 0 ? game.messages[0].text : "";
    } else {
      return "";
    }
  }
  __name(showMessage2, "showMessage");
  function shortDay(day) {
    switch (day) {
      case "Monday":
        return "Mon";
      case "Tuesday":
        return "Tue";
      case "Wednesday":
        return "Wed";
      case "Thursday":
        return "Thu";
      case "Friday":
        return "Fri";
      case "Saturday":
        return "Sat";
      case "Sunday":
        return "Sun";
      default:
        return assertUnreachable(day);
    }
  }
  __name(shortDay, "shortDay");
  function showTime(game) {
    return "Day:" + (game.time.day + 1).toString() + "/" + shortDay(game.time.dayOfWeek) + " " + (game.sprint ? game.sprint.daysLeft : " ");
  }
  __name(showTime, "showTime");
  function showLevel(game) {
    return "|Pos:" + game.player.level.name;
  }
  __name(showLevel, "showLevel");
  function showFlags(game) {
    return "| " + (game.player.speedUp ? "\u26A1" : " ");
  }
  __name(showFlags, "showFlags");
  function showTask(game) {
    const task = game.player.task;
    if (task != null) {
      switch (task.type) {
        case "story":
          return `|Story ${task.appliedCommits}/${task.neededCommits}`;
      }
    }
    return "";
  }
  __name(showTask, "showTask");
  function showStockPrice(game) {
    return `\u{1F5E0}: $${game.score.stockPrice.toFixed(2)} \u25BC`;
  }
  __name(showStockPrice, "showStockPrice");
  function isVisible(obj) {
    switch (obj.type) {
      case "boss":
      case "wall":
      case "player":
      case "coffee":
      case "story":
      case "commit":
      case "door":
      case "developer":
        return true;
      case "pr_review":
        return config_default.items.prReview.visible;
      case "boss.footprint":
        return config_default.boss.footprint.visible;
      case "developer.footprint":
        return config_default.developer.footprint.visible;
      case "developer.pathlights":
        return config_default.developer.pathlights.visible;
      default:
        assertUnreachable(obj);
    }
    return true;
  }
  __name(isVisible, "isVisible");
  function blink(a, b, tick12) {
    return tick12 % 10 < 5 ? a : b;
  }
  __name(blink, "blink");
  function getRepresentation(map2, objs, tick12) {
    let obj = objs.find(isVisible);
    if (obj) {
      switch (obj.type) {
        case "wall":
          return getWallRepresentation(map2, obj.position);
        case "boss":
          return "+";
        case "boss.footprint":
          return "\u25A0";
        case "developer.footprint":
          return "\u25C6";
        case "developer.pathlights":
          return "\xB7";
        case "player":
          if (obj.hrTaskTact) {
            return blink("*", "@", tick12);
          } else {
            if (obj.item != null) {
              const item = obj.item;
              switch (item.type) {
                case "door":
                  return blink("]", "*", tick12);
                case "commit":
                  return blink(";", "*", tick12);
                case "coffee":
                  return blink("c", "*", tick12);
                case "story":
                  return "";
                case "pr_review":
                  return blink("r", "*", tick12);
                default:
                  return assertUnreachable(item);
              }
            }
            return "*";
          }
        case "door":
          return obj.open ? obj.placed ? "]" : "[" : ".";
        case "commit":
          return obj.open ? ";" : ".";
        case "coffee":
          return obj.open ? "c" : ".";
        case "developer":
          return "D";
        case "pr_review":
          return "r";
        case "story":
          switch (obj.size) {
            case "small":
              return "s";
            case "medium":
              return "m";
            case "large":
              return "l";
          }
        default:
          assertUnreachable(obj);
      }
    } else {
      return " ";
    }
  }
  __name(getRepresentation, "getRepresentation");
  function getWallRepresentation(map2, pos) {
    if (pos.x == 0 && pos.y == 0) {
      return "\u2554";
    } else if (pos.x == 0 && pos.y == map2.height - 1) {
      return "\u255A";
    } else if (pos.x == map2.width - 1 && pos.y == 0) {
      return "\u2557";
    } else if (pos.x == map2.width - 1 && pos.y == map2.height - 1) {
      return "\u255D";
    } else if (pos.x == map2.width - 1 && pos.y != 0 && pos.y != map2.height - 1 && map2.someObjectsAt(vector_exports.w(pos), "wall")) {
      return "\u2562";
    } else if (pos.x == 0 && pos.y != 0 && pos.y != map2.height - 1 && map2.someObjectsAt(vector_exports.e(pos), "wall")) {
      return "\u255F";
    } else if (pos.x == 0 || pos.x == map2.width - 1) {
      return "\u2551";
    } else if (pos.y == 0 || pos.y == map2.height - 1) {
      return "\u2550";
    } else if (map2.someObjectsAt(vector_exports.n(pos), "wall") && map2.someObjectsAt(vector_exports.s(pos), "wall") && map2.someObjectsAt(vector_exports.w(pos), "wall")) {
      return "\u2524";
    } else if (map2.someObjectsAt(vector_exports.n(pos), "wall") && map2.someObjectsAt(vector_exports.s(pos), "wall")) {
      return "\u2502";
    } else if (map2.someObjectsAt(vector_exports.s(pos), "wall")) {
      return "\u252C";
    } else if (map2.someObjectsAt(vector_exports.n(pos), "wall")) {
      return "\u2534";
    } else {
      return "\u2500";
    }
  }
  __name(getWallRepresentation, "getWallRepresentation");

  // game/game.ts
  var logger3 = make("game");
  function make6(size2, plan3) {
    return {
      map: new map_exports.GameMap(size2.x, size2.y, []),
      commands: [],
      itemGenerator: item_generator_exports.make(),
      sprint: sprint_exports.make(),
      score: score_exports.make(),
      messages: [],
      messageTact: 0,
      time: {
        ticks: 0,
        day: 0,
        dayOfWeek: "Sunday"
      },
      plan: plan3,
      messageStartTime: null,
      collapse: null
    };
  }
  __name(make6, "make");
  function toJson(game) {
    return {
      map: game.map.toJson(),
      score: game.score,
      itemGenerator: game.itemGenerator,
      commands: game.commands,
      messages: game.messages,
      messageTact: game.messageTact,
      time: game.time,
      sprint: game.sprint,
      plan: game.plan,
      messageStartTime: game.messageStartTime,
      collapse: game.collapse
    };
  }
  __name(toJson, "toJson");
  function handleEffects(game, effects) {
    for (const effect of effects) {
      switch (effect.type) {
        case "null":
          break;
        case "addImpact":
          game.score.impact += effect.impact;
          break;
        case "showMessage":
          message(game, effect.message);
          break;
        case "itemGenerated":
          game.score.generatedItems.push(effect.item);
          break;
        default:
          assertUnreachable(effect);
      }
    }
  }
  __name(handleEffects, "handleEffects");
  function message(game, m) {
    if (m.text instanceof Array) {
      for (const text of m.text) {
        logger3("message: " + text);
        game.messages.push({ text, ttl: m.ttl });
      }
    } else {
      game.messages.push({ text: m.text, ttl: m.ttl });
    }
  }
  __name(message, "message");
  function tick4(game) {
    const fullTick = /* @__PURE__ */ __name((timePassed) => {
      setTime(game.time.ticks);
      game.score.stockPrice = 100 - 100 / config_default.totalDays * (game.time.ticks / config_default.dayTicks);
      game.score.money += game.player.level.rate;
      game.time = game_time_exports.make(game.time.ticks);
      handleEffects(game, collapse_exports.tick(game));
      handleEffects(game, item_generator_exports.tick(game.itemGenerator, game));
      if (game.sprint) {
        handleEffects(game, sprint_exports.tick(game.sprint, { ...game, player: game.player }));
      }
      handleEffects(game, performance_review_exports.tick(game));
      for (const obj of game.map.objects) {
        objTick(obj, game, game.commands, 1);
      }
      game.commands = [];
      render(game);
      game.time.ticks += timePassed;
    }, "fullTick");
    const halfTick = /* @__PURE__ */ __name((timePassed) => {
      setTime(game.time.ticks);
      if (game.player.speedUp) {
        objTick(game.player, game, game.commands, 0.5);
      }
      if (game.developer.speedUp) {
        objTick(game.developer, game, game.commands, 0.5);
      }
      render(game);
      game.time.ticks += timePassed;
    }, "halfTick");
    if (!game.player.speedUp && !game.developer.speedUp) {
      fullTick(1);
    } else {
      halfTick(0.5);
      fullTick(0.5);
    }
    if (game.score.stockPrice <= 0) {
      return {
        type: "endGame",
        message: "The company was liquidated!",
        money: game.score.money,
        level: game.player.level.name
      };
    }
    return { type: "null" };
  }
  __name(tick4, "tick");
  function objTick(obj, game, commands, ticksPassed) {
    const bossFootprint = footprint_exports.make(boss_exports.Footprint.footprint);
    const developerFootprint = footprint_exports.make(developer_exports.Footprint.footprint);
    switch (obj.type) {
      case "boss":
        boss_exports.tick(obj, game.map);
        break;
      case "boss.footprint":
        handleEffects(game, bossFootprint.tick(obj, game.map));
        break;
      case "developer.footprint":
        handleEffects(game, developerFootprint.tick(obj, game.map));
        break;
      case "player":
        handleEffects(game, player_exports.tick(obj, game, commands, ticksPassed));
        break;
      case "pr_review":
        handleEffects(game, pr_review_exports.tick(obj, game.map));
        break;
      case "door":
      case "story":
      case "commit":
      case "coffee":
      case "wall":
      case "developer.pathlights":
        break;
      case "developer":
        handleEffects(game, developer_exports.tick(obj, game));
        break;
      default:
        assertUnreachable(obj);
    }
  }
  __name(objTick, "objTick");
  function save(game, storage) {
    storage.save(JSON.stringify(toJson(game), replacer));
    logger3("Game saved!");
  }
  __name(save, "save");
  function replacer(key, value) {
    if (value instanceof Map) {
      return {
        dataType: "Map",
        value: Array.from(value.entries())
        // or with spread: value: [...value]
      };
    } else {
      return value;
    }
  }
  __name(replacer, "replacer");
  function reviver(key, value) {
    if (typeof value === "object" && value !== null) {
      if (value.dataType === "Map") {
        return new Map(value.value);
      }
    }
    return value;
  }
  __name(reviver, "reviver");
  function load(storage) {
    const objectsStorage = storage.load();
    if (objectsStorage != null) {
      const {
        commands,
        itemGenerator,
        score,
        sprint,
        messages,
        messageTact,
        map: map2,
        time,
        plan: plan3,
        messageStartTime,
        collapse
      } = JSON.parse(objectsStorage, reviver);
      const map_ = map_exports.GameMap.fromJson(map2);
      const player = map_.objects.find(
        (x) => x.type === "player"
      );
      const developer = map_.objects.find(developer_exports.isDeveloper);
      return {
        time,
        score,
        itemGenerator,
        sprint,
        messages,
        messageTact,
        commands,
        map: map_,
        player,
        developer,
        plan: plan3,
        messageStartTime,
        collapse
      };
    } else {
      logger3("There is no saved game.");
      return null;
    }
  }
  __name(load, "load");

  // game/game_time.ts
  var game_time_exports = {};
  __export(game_time_exports, {
    make: () => make7
  });

  // game/day_of_week.ts
  var all2 = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  // game/game_time.ts
  function make7(ticks) {
    const day = Math.floor(ticks / config_default.dayTicks);
    const dayOfWeek = all2[day % 7];
    return {
      ticks,
      day,
      dayOfWeek
    };
  }
  __name(make7, "make");

  // game/item_generator.ts
  var item_generator_exports = {};
  __export(item_generator_exports, {
    make: () => make8,
    tick: () => tick5
  });
  function make8() {
    return { state: { type: "waiting", tact: 0 } };
  }
  __name(make8, "make");
  function tick5(itemGenerator, game) {
    const effects = [];
    switch (itemGenerator.state.type) {
      case "waiting":
        if (itemGenerator.state.tact > config_default.itemGenerator.start)
          itemGenerator.state = { type: "generating", tact: 0 };
        else {
          itemGenerator.state.tact += 1;
        }
      case "generating":
        if (itemGenerator.state.tact > config_default.itemGenerator.interval && game.map.objects.filter(item_exports.isItem).length < config_default.itemGenerator.maxItems) {
          itemGenerator.state.tact = 0;
          const itemType = choice(
            ["door", "commit", "coffee", "pr_review"],
            [
              config_default.itemGenerator.frequencies.door,
              config_default.itemGenerator.frequencies.commit,
              config_default.itemGenerator.frequencies.coffee,
              config_default.itemGenerator.frequencies.prReview
            ]
          );
          let item;
          switch (itemType) {
            case "door":
              item = door_exports.make(game.map.getRandomEmptyLocation());
              game.map.add([item]);
              break;
            case "commit":
              item = commit_exports.make(game.map.getRandomEmptyLocation());
              game.map.add([item]);
              break;
            case "coffee":
              item = coffee_exports.make(game.map.getRandomEmptyLocation());
              game.map.add([item]);
              break;
            case "pr_review":
              item = pr_review_exports.make(game.map.getRandomEmptyLocation());
              game.map.add([item]);
              break;
            default:
              assertUnreachable(itemType);
          }
          effects_exports.append(effects, effect_exports.itemGenerated(item));
        } else {
          itemGenerator.state.tact += 1;
        }
    }
    return effects;
  }
  __name(tick5, "tick");

  // game/levels.ts
  var levels_exports = {};
  __export(levels_exports, {
    all: () => all3,
    level: () => level
  });
  var import_lodash3 = __toESM(require_lodash());
  var all3 = [
    {
      name: "Engineer I",
      rate: 5,
      impact: 2,
      oneTimeBonus: 1e3
    },
    {
      name: "Engineer II",
      rate: 30,
      impact: 3,
      oneTimeBonus: 1e3
    },
    {
      name: "Engineer III",
      rate: 40,
      impact: 4,
      oneTimeBonus: 1e3
    },
    {
      name: "Senior Engineer I",
      rate: 50,
      impact: 5,
      oneTimeBonus: 5e3
    },
    {
      name: "Senior Engineer II",
      rate: 60,
      impact: 6,
      oneTimeBonus: 5e3
    },
    {
      name: "Engineering Lead",
      rate: 70,
      impact: 7,
      oneTimeBonus: 7e3
    },
    {
      name: "Staff Engineer I",
      rate: 80,
      impact: 8,
      oneTimeBonus: 7e3
    },
    {
      name: "Staff Engineer II",
      rate: 90,
      impact: 9,
      oneTimeBonus: 7e3
    },
    {
      name: "Principal Engineer",
      rate: 100,
      impact: 10,
      oneTimeBonus: 1e4
    }
  ];
  function level(impact) {
    let total = 0;
    for (const level2 of all3) {
      total += level2.impact;
      if (total >= impact) {
        return level2;
      }
    }
    return import_lodash3.default.last(all3);
  }
  __name(level, "level");

  // game/map.ts
  var map_exports = {};
  __export(map_exports, {
    GameMap: () => GameMap2,
    Predicates: () => Predicates,
    directionTo: () => directionTo3
  });
  var _5 = __toESM(require_lodash());

  // utils/generators.ts
  function check(t, f, maxAttempts = 10) {
    let attempt = 0;
    while (attempt < maxAttempts) {
      attempt++;
      const tt = t();
      if (f(tt))
        return tt;
    }
    return null;
  }
  __name(check, "check");
  function ensure(t, f, maxAttempts = 10) {
    const tt = check(t, f, maxAttempts);
    assert(tt != null);
    return tt;
  }
  __name(ensure, "ensure");

  // game/map.ts
  var _GameMap = class _GameMap {
    constructor(width, height, objs) {
      this.width = width;
      this.height = height;
      const a = _5.range(1, 21);
      this.cells = _5.chunk(
        _5.range(width * height).map((x) => []),
        width
      );
      this.objects = [];
      this.add(objs);
    }
    /**
         * Add objects to the map
         * * If the object has a position, it will be added to the map cells
         * * If the object doesn't have a position, it will be added to the list of objects
         *
         * @param objs - Object or list of objects to add to the map
    1     */
    add(objs) {
      const objs_ = objs instanceof Array ? objs : [objs];
      this.objects = this.objects.concat(objs_);
      for (const obj of objs_) {
        if (obj.position != null) {
          const objs2 = this.cells[obj.position.y][obj.position.x];
          if (objs2 == null) {
            debugger;
          }
          objs2.push(obj);
          this.cells[obj.position.y][obj.position.x] = _5.chain(objs2).push(obj).orderBy((x) => x.zIndex, "desc").value();
        }
      }
    }
    /**
     * Remove objects from the map
     * * If the object has a position, it will be removed from the map cells
     */
    remove(objs) {
      const objs_ = objs instanceof Array ? objs : [objs];
      this.objects = this.objects.filter((x) => _5.indexOf(objs_, x) == -1);
      for (const obj of objs_) {
        if (obj.position) {
          this.cells[obj.position.y][obj.position.x] = _5.pull(
            this.cells[obj.position.y][obj.position.x],
            obj
          );
        }
        obj.position = null;
      }
    }
    move(obj, pos) {
      this.remove([obj]);
      obj.position = pos;
      this.add([obj]);
    }
    getRandomLocation(f) {
      const location = check(
        () => [int(0, this.width), int(0, this.height)],
        ([x2, y2]) => f(this, { x: x2, y: y2 })
      );
      assert(location != null);
      const [x, y] = location;
      return { x, y };
    }
    getRandomEmptyLocation() {
      return this.getRandomLocation(Predicates.empty);
    }
    at(v) {
      return v.x >= 0 && v.y >= 0 && v.x < this.width && v.y < this.height ? this.cells[v.y][v.x] : [];
    }
    objAt(v, type8) {
      const objs = this.at(v);
      const objOfType = objs.find((x) => x.type == type8) ?? null;
      return objOfType;
    }
    someObjectsAt(v, include) {
      if (v.x < 0 || v.x >= this.width || v.y < 0 || v.y >= this.height)
        return false;
      const objs = this.cells[v.y][v.x];
      return objs.length > 0 ? _5.some(objs, (x) => include instanceof Function ? include(x) : include == x.type) : include instanceof Function ? include(null) : false;
    }
    everyObjectAt(v, include) {
      if (v.x < 0 || v.x >= this.width || v.y < 0 || v.y >= this.height)
        return false;
      const objs = this.cells[v.y][v.x];
      return objs.length > 0 ? _5.every(objs, (x) => include instanceof Function ? include(x) : include == x.type) : include instanceof Function ? include(null) : false;
    }
    // possibleDirections(
    //     position: Vector.t,
    //     check: GameObject.Type | ((obj: GameObject.t | null) => boolean),
    // ): Direction.t[] {
    //     const p: Direction.t[] = []
    //     for (const d of Direction.all) {
    //         const newPos = moveTo(position, d)
    //         if (this.everyObjectAt(newPos, check)) p.push(d)
    //     }
    //     return p
    // }
    possibleDirections(position, canMoveOn3) {
      const p = [];
      for (const d of direction_exports.all) {
        const newPos = moveTo(position, d);
        if (canMoveOn3(newPos, this))
          p.push(d);
      }
      return p;
    }
    toString() {
      let s2 = "\n";
      for (const y of _5.range(this.height)) {
        for (const x of _5.range(this.width))
          s2 += repr2(this.cells[y][x]);
        s2 += "\n";
      }
      return s2;
    }
    toJson() {
      return {
        height: this.height,
        width: this.width,
        objects: this.objects
      };
    }
    static fromJson(json) {
      const { width, height, objects } = json;
      return new _GameMap(width, height, objects);
    }
  };
  __name(_GameMap, "GameMap");
  var GameMap2 = _GameMap;
  function directionTo3(position, map2, objType) {
    const dd = _5.compact(
      direction_exports.all.filter((x) => map2.someObjectsAt(moveTo(position, x), objType))
    );
    return dd.length ? dd[0] : null;
  }
  __name(directionTo3, "directionTo");
  var Predicates;
  ((Predicates2) => {
    function empty(map2, position) {
      return map2.at(position).length == 0;
    }
    Predicates2.empty = empty;
    __name(empty, "empty");
    function has(objType) {
      return (position, map2) => map2.someObjectsAt(position, objType);
    }
    Predicates2.has = has;
    __name(has, "has");
    function doesNotHave(objType) {
      return (position, map2) => !map2.everyObjectAt(position, objType);
    }
    Predicates2.doesNotHave = doesNotHave;
    __name(doesNotHave, "doesNotHave");
    function insideWall(position, map2) {
      if (position != null && position.y > 1 && position.y < map2.height - 1 && position.x < map2.width)
        return map2.at(position).some((obj) => obj != null && obj.type == "wall");
      else {
        return false;
      }
    }
    Predicates2.insideWall = insideWall;
    __name(insideWall, "insideWall");
  })(Predicates || (Predicates = {}));
  function repr2(objs) {
    if (objs.length > 0) {
      switch (objs[0].type) {
        case "wall":
          return "~";
        default:
          return ".";
      }
    } else {
      return " ";
    }
  }
  __name(repr2, "repr");

  // game/messages.ts
  var messages_exports = {};
  __export(messages_exports, {
    itemDropped: () => itemDropped,
    startedStory: () => startedStory
  });

  // objects/story_size.ts
  function toString(size2) {
    switch (size2) {
      case "small":
        return "small";
      case "medium":
        return "medium";
      case "large":
        return "large";
    }
  }
  __name(toString, "toString");

  // game/messages.ts
  var startedStory = /* @__PURE__ */ __name((story) => ({
    text: `You started on ${toString(story.size)} ${story.name}`,
    ttl: 100
  }), "startedStory");
  var itemDropped = /* @__PURE__ */ __name((item) => ({
    text: `You droppped on ${item.type}`,
    ttl: 5
  }), "itemDropped");

  // game/performance_review.ts
  var performance_review_exports = {};
  __export(performance_review_exports, {
    generatePlan: () => generatePlan2,
    make: () => make9,
    tick: () => tick6
  });
  var logger4 = make("performance_review");
  function make9() {
    return {};
  }
  __name(make9, "make");
  function generatePlan2(startTick) {
    const plan3 = make2();
    return plan3;
  }
  __name(generatePlan2, "generatePlan");
  function tick6(game) {
    const effects = [];
    const currentLevel = game.player.level;
    game.player.level = levels_exports.level(game.score.impact);
    if (game.player.level > currentLevel) {
      effects_exports.append(
        effects,
        effect_exports.showMessage(
          `You've been promoted to ${game.player.level.name} with ${game.player.level.oneTimeBonus} bonus !!!`,
          3e3
        )
      );
    }
    return effects;
  }
  __name(tick6, "tick");

  // game/score.ts
  var score_exports = {};
  __export(score_exports, {
    make: () => make10
  });
  function make10() {
    return {
      money: 0,
      impact: 0,
      stockPrice: 0,
      generatedItems: []
    };
  }
  __name(make10, "make");

  // game/sprint.ts
  var sprint_exports = {};
  __export(sprint_exports, {
    generatePlan: () => generatePlan3,
    make: () => make11,
    tick: () => tick7
  });
  var import_lodash4 = __toESM(require_lodash());
  function make11() {
    return {
      day: 0,
      daysLeft: 0
    };
  }
  __name(make11, "make");
  var storySizes = [
    "small",
    "small",
    "small",
    "medium",
    "medium",
    "large"
  ];
  function generatePlan3(sprintType, startTick_) {
    const DAY = config_default.dayTicks;
    const plan3 = make2();
    let currentTick = startTick_;
    const addEvent2 = /* @__PURE__ */ __name((event) => {
      addEvent(plan3, currentTick, event);
    }, "addEvent");
    const addSprintStart = /* @__PURE__ */ __name(() => addEvent2({ type: "sprintStart" }), "addSprintStart");
    const addGroomBacklogStart = /* @__PURE__ */ __name(() => addEvent2({ type: "groomBacklogStart" }), "addGroomBacklogStart");
    const addWorkWeekStarted = /* @__PURE__ */ __name(() => addEvent2({ type: "workWeekStarted", ...make7(currentTick) }), "addWorkWeekStarted");
    const addWorkWeekEnded = /* @__PURE__ */ __name(() => addEvent2({ type: "workWeekEnded", ...make7(currentTick) }), "addWorkWeekEnded");
    const addWeekendStart = /* @__PURE__ */ __name(() => addEvent2({ type: "weekendStart" }), "addWeekendStart");
    const addWeekendEnd = /* @__PURE__ */ __name(() => addEvent2({ type: "weekendEnd" }), "addWeekendEnd");
    const addWeekendStarted = /* @__PURE__ */ __name(() => addEvent2({ type: "workWeekStarted", ...make7(currentTick) }), "addWeekendStarted");
    const addSprintDayStart = /* @__PURE__ */ __name((sprintDay2) => addEvent2({
      type: "sprintDayStart",
      sprintDay: sprintDay2,
      sprintDaysLeft: config_default.sprint.days - sprintDay2,
      ...make7(currentTick)
    }), "addSprintDayStart");
    const addBacklogIssue = /* @__PURE__ */ __name((size2) => addEvent2({ type: "createBacklogIssue", size: size2 }), "addBacklogIssue");
    const addFirstSprintDay = /* @__PURE__ */ __name(() => {
      addSprintDayStart(sprintDay);
      const groomingStart = currentTick;
      const times = storySizes.map(
        (x, i) => [x, Math.round(DAY / storySizes.length * i)]
      );
      for (const t of times) {
        currentTick = groomingStart + t[1];
        addBacklogIssue(t[0]);
      }
      currentTick = startTick_ + DAY - 1;
      addEvent2({ type: "groomBacklogEnd" });
      addEvent2({
        type: "sprintDayEnd",
        sprintDay,
        sprintDaysLeft: config_default.sprint.days - sprintDay,
        ...make7(currentTick)
      });
      currentTick += 1;
    }, "addFirstSprintDay");
    const addSprintDay = /* @__PURE__ */ __name((sprintDay2) => {
      addEvent2({
        type: "sprintDayStart",
        sprintDay: sprintDay2,
        sprintDaysLeft: config_default.sprint.days - sprintDay2,
        ...make7(currentTick)
      });
      currentTick += DAY - 1;
      addEvent2({
        type: "sprintDayEnd",
        sprintDay: sprintDay2,
        sprintDaysLeft: config_default.sprint.days - sprintDay2,
        ...make7(currentTick)
      });
      currentTick += 1;
    }, "addSprintDay");
    addSprintStart();
    addWorkWeekStarted();
    addGroomBacklogStart();
    let sprintDay = 1;
    addFirstSprintDay();
    for (const _day of import_lodash4.default.range(4)) {
      sprintDay += 1;
      addSprintDay(sprintDay);
    }
    addWorkWeekEnded();
    addWeekendStart();
    currentTick += 2 * DAY + 1;
    addWeekendEnd();
    addWeekendStarted();
    for (const _i of import_lodash4.default.range(4)) {
      sprintDay += 1;
      addSprintDay(sprintDay);
    }
    switch (sprintType.type) {
      case "normal":
        addEvent2({ type: "sprintEnd" });
        addEvent2({ type: "workWeekEnded", ...make7(currentTick) });
        addEvent2({ type: "weekendStart" });
        currentTick += 2 * DAY + 1;
        addEvent2({ type: "weekendEnd" });
        break;
      case "last":
        currentTick += 2 * DAY + 1;
        addEvent2({ type: "sprintEnd" });
        break;
    }
    return [plan3, currentTick];
  }
  __name(generatePlan3, "generatePlan");
  function distance(pos1, pos2) {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
  }
  __name(distance, "distance");
  function notCloseToOtherStories(objects, pos, minDistance) {
    const stories = objects_exports.filter(objects, "story");
    for (const story of stories) {
      const d_ = distance(pos, story.position);
      if (d_ < minDistance) {
        return false;
      }
    }
    return true;
  }
  __name(notCloseToOtherStories, "notCloseToOtherStories");
  function notOnHorizontalWallRow(pos) {
    return pos.y % 2 == 1;
  }
  __name(notOnHorizontalWallRow, "notOnHorizontalWallRow");
  function tick7(sprint, game) {
    const effects = [];
    const events = game.plan.get(game.time.ticks);
    if (events) {
      for (const event of events) {
        switch (event.type) {
          case "createBacklogIssue":
            const storyPosition = ensure(
              () => game.map.getRandomEmptyLocation(),
              (x) => notCloseToOtherStories(game.map.objects, x, 10) && notOnHorizontalWallRow(x)
            );
            const story = story_exports.make(storyPosition, event.size);
            game.map.add(story);
            append2(
              effects,
              showMessage(`Moved "${story.name}" to To Do`, 500)
            );
            break;
          case "groomBacklogEnd":
          case "collapseStart":
            break;
          case "groomBacklogStart":
            append2(effects, showMessage("Grooming backlog ...", 2e3));
            break;
          case "sprintDayEnd":
            break;
          case "sprintDayStart":
            sprint.day = event.sprintDay;
            sprint.daysLeft = event.sprintDaysLeft;
            append2(
              effects,
              showMessage(
                `Sprint day ${event.sprintDay} ${event.dayOfWeek}`,
                3e3
              )
            );
            break;
          case "sprintEnd":
            append2(effects, showMessage("Sprint ended", 3e3));
            const stories = objects_exports.filter(game.map.objects, "story");
            game.map.remove(stories);
            if (game.player.task != null) {
              append2(
                effects,
                showMessage(`Abandoned ${game.player.task}`, 2e3)
              );
              game.player.task = null;
            }
            break;
          case "sprintStart":
            break;
          case "workWeekStarted":
          case "workWeekEnded":
            break;
          case "weekendStart":
            append2(effects, showMessage("Weekend, finally!!!", 3e3));
            break;
          case "weekendEnd":
            append2(effects, showMessage("End of Weekend :(", 3e3));
            break;
          case "gameEnded":
          case "gameStarted":
            break;
          case "dayStarted":
            break;
          case "null":
          case "developerStarted":
          case "performanceReview":
            break;
          default:
            assertUnreachable(event);
        }
      }
    }
    return effects;
  }
  __name(tick7, "tick");

  // objects/boss/index.ts
  var import_lodash5 = __toESM(require_lodash());

  // objects/boss/footprint.ts
  var footprint_exports2 = {};
  __export(footprint_exports2, {
    footprint: () => footprint,
    make: () => make12
  });
  var LIFETIME = 1e3;
  function make12(position) {
    return {
      type: "boss.footprint",
      position,
      zIndex: config_default.boss.footprint.zIndex,
      tick: 0
    };
  }
  __name(make12, "make");
  var footprint = {
    tick: (t) => t.tick,
    setTick: (t, tick12) => {
      t.tick = tick12;
    },
    lifetime: () => LIFETIME
  };

  // objects/boss/index.ts
  var BOSS_WEIGHTS = {
    turn: {
      visited: 0.2,
      notVisited: 1
    },
    straight: {
      visited: 0.2,
      notVisited: 3
    },
    back: 1,
    jump: 5
  };
  BOSS_WEIGHTS = {
    turn: {
      visited: 1e-6,
      notVisited: 1
    },
    straight: {
      visited: 1e-7,
      notVisited: 3
    },
    back: 1e-7,
    jump: 5
  };
  function make13(position) {
    return {
      position,
      type: "boss",
      zIndex: 10,
      state: { type: "stopped", previous_direction: null }
    };
  }
  __name(make13, "make");
  function possibleMoves(pos, currentDirection, map2) {
    const result = {};
    const possible = map2.possibleDirections(pos, map_exports.Predicates.insideWall);
    const turns = import_lodash5.default.difference(possible, [
      currentDirection,
      direction_exports.reverse(currentDirection)
    ]);
    if (turns.length > 0) {
      result.turn = { directions: turns };
    }
    if (import_lodash5.default.includes(possible, currentDirection)) {
      result.straight = { direction: currentDirection };
    }
    if (!import_lodash5.default.includes(possible, currentDirection) && !map2.someObjectsAt(moveTo(pos, currentDirection), "wall")) {
      result.jump = { directions: [currentDirection] };
    }
    if (import_lodash5.default.includes(possible, direction_exports.reverse(currentDirection))) {
      result.back = {};
    }
    return result;
  }
  __name(possibleMoves, "possibleMoves");
  function move(obj, newPos, newDirection, map2) {
    obj.state = { type: "moving", direction: newDirection, tact: 0 };
    map2.add([make12(obj.position)]);
    map2.move(obj, newPos);
  }
  __name(move, "move");
  function pipPlayer(obj, player) {
    player.hrTaskTact = 0;
  }
  __name(pipPlayer, "pipPlayer");
  function tick8(boss, map2) {
    switch (boss.state.type) {
      case "instructing":
        break;
      case "moving":
        const directionToPlayer = map_exports.directionTo(boss.position, map2, "player");
        if (directionToPlayer) {
          const player = map2.objAt(moveTo(boss.position, directionToPlayer), "player");
          if (player)
            pipPlayer(boss, player);
        }
        boss.state.tact += 1;
        if (boss.state.tact < config_default.boss.TACTS_FOR_SINGLE_MOVE) {
          return;
        }
        const moves = possibleMoves(boss.position, boss.state.direction, map2);
        if (moves.turn || moves.straight) {
          const move_types = [
            moves.turn ? "turn" : null,
            moves.straight ? "straight" : null
          ];
          const move_weights = [
            moves.turn ? BOSS_WEIGHTS.turn.notVisited : null,
            moves.straight ? map2.someObjectsAt(
              moveTo(boss.position, boss.state.direction),
              "boss.footprint"
            ) ? BOSS_WEIGHTS.straight.visited : BOSS_WEIGHTS.straight.notVisited : null
          ];
          if (moves.turn) {
            console.log(JSON.stringify({ move_types, move_weights }));
          }
          const move_choice = choice(
            import_lodash5.default.compact(move_types),
            import_lodash5.default.compact(move_weights)
          );
          switch (move_choice) {
            case "turn":
              const weights = moves.turn.directions.map(
                (x) => map2.someObjectsAt(moveTo(boss.position, x), "boss.footprint") ? BOSS_WEIGHTS.turn.visited : BOSS_WEIGHTS.turn.notVisited
              );
              const chosen = choice(moves.turn.directions, weights);
              boss.state.direction = chosen;
            case "straight":
              const new_pos = moveTo(boss.position, boss.state.direction);
              move(boss, new_pos, boss.state.direction, map2);
          }
          return;
        }
        if (moves.back || moves.jump) {
          const move_choice = choice(
            import_lodash5.default.compact([moves.back ? "back" : null, moves.jump ? "jump" : null]),
            import_lodash5.default.compact([
              moves.back ? BOSS_WEIGHTS.back : null,
              moves.jump ? BOSS_WEIGHTS.jump : null
            ])
          );
          switch (move_choice) {
            case "back":
              boss.state.direction = direction_exports.reverse(boss.state.direction);
              break;
            case "jump":
              boss.state = { type: "jumping", direction: boss.state.direction, tact: 0 };
              break;
          }
        }
        break;
      case "jumping":
        boss.state = {
          type: "jumping",
          direction: boss.state.direction,
          tact: boss.state.tact + 1
        };
        if (boss.state.tact > config_default.boss.TACTS_FOR_JUMP) {
          move(
            boss,
            moveTo(moveTo(boss.position, boss.state.direction), boss.state.direction),
            boss.state.direction,
            map2
          );
        }
        break;
      case "stopped": {
        const direction = choose_direction(boss.position, null, map2);
        if (direction != null)
          boss.state = { type: "moving", direction, tact: 0 };
        break;
      }
    }
  }
  __name(tick8, "tick");
  function choose_direction(pos, least_preferred, map2) {
    const forks = map2.possibleDirections(pos, map_exports.Predicates.insideWall);
    const b = forks.filter((x) => x[0] != least_preferred);
    if (b.length != 0) {
      const direction = choice(b);
      return direction;
    } else {
      return least_preferred;
    }
  }
  __name(choose_direction, "choose_direction");

  // objects/coffee.ts
  var coffee_exports = {};
  __export(coffee_exports, {
    isCoffee: () => isCoffee,
    make: () => make14,
    type: () => type
  });
  var type = "coffee";
  function make14(position) {
    return {
      type,
      position,
      zIndex: config_default.items.coffee.zIndex,
      open: false
    };
  }
  __name(make14, "make");
  function isCoffee(obj) {
    return obj.type === type;
  }
  __name(isCoffee, "isCoffee");

  // objects/commit.ts
  var commit_exports = {};
  __export(commit_exports, {
    isCommit: () => isCommit,
    make: () => make15
  });
  function make15(position) {
    return {
      type: "commit",
      position,
      zIndex: 1,
      open: false,
      hash: generateId(8)
    };
  }
  __name(make15, "make");
  function isCommit(obj) {
    return obj.type === "commit";
  }
  __name(isCommit, "isCommit");
  function byteToHex(byte) {
    return ("0" + byte.toString(16)).slice(-2);
  }
  __name(byteToHex, "byteToHex");
  function generateId(len = 40) {
    var arr = new Uint8Array(len / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, byteToHex).join("");
  }
  __name(generateId, "generateId");

  // objects/developer/index.ts
  var developer_exports = {};
  __export(developer_exports, {
    Footprint: () => footprint_exports3,
    Pathlight: () => pathlight_exports,
    canMoveOn: () => canMoveOn,
    defend: () => defend,
    isDeveloper: () => isDeveloper,
    logger: () => logger5,
    make: () => make19,
    plan: () => plan2,
    possibleMoves: () => possibleMoves2,
    speedUp: () => speedUp2,
    targeting: () => targeting,
    tick: () => tick9,
    type: () => type4
  });

  // objects/pickDirection.ts
  var import_lodash6 = __toESM(require_lodash());
  function make16(targeting2) {
    return {
      pickDirection(t, map2, pathway) {
        let target = targeting2.target(t);
        const targets = targeting2.findTargets(t, map2);
        if (target == null || target.position == null || !targets.includes(target)) {
          const targetPaths = findTargetPaths(
            targets,
            targeting2.position(t),
            map2,
            targeting2.canMoveOn
          );
          const path = import_lodash6.default.minBy(targetPaths, (x) => x.path ? x.path.length : Infinity);
          targeting2.setTarget(t, path?.target ?? null);
        }
        target = targeting2.target(t);
        if (target == null || target.position == null) {
          return null;
        }
        const pathToTarget = findPath(
          map2,
          targeting2.position(t),
          target.position,
          targeting2.canMoveOn
        );
        map2.remove(map2.objects.filter(pathway.isPathlight));
        if (pathToTarget != null) {
          if (pathToTarget) {
            map2.add(pathToTarget.map((x) => pathway.make(x)));
            return pathToTarget.length > 0 ? directionTo(targeting2.position(t), pathToTarget[1]) : null;
          } else {
            return null;
          }
        } else {
          targeting2.setTarget(t, null);
          return null;
        }
      }
    };
  }
  __name(make16, "make");
  function isPresent(input) {
    return input != null;
  }
  __name(isPresent, "isPresent");
  var findTargetPaths = /* @__PURE__ */ __name((targets, startPosition, map2, canMoveOn3) => {
    return targets.map((x) => ({
      target: x,
      path: findPath(map2, x.position, startPosition, canMoveOn3)
    })).map((x) => x.path != null ? { target: x.target, path: x.path } : null).filter(isPresent);
  }, "findTargetPaths");
  function findPath(map2, from, to, canMoveOn3) {
    return bfs_exports.bfs((v) => map2.possibleDirections(v, canMoveOn3), from, to);
  }
  __name(findPath, "findPath");

  // objects/developer/footprint.ts
  var footprint_exports3 = {};
  __export(footprint_exports3, {
    footprint: () => footprint2,
    make: () => make17,
    type: () => type2
  });
  var LIFETIME2 = 1e3;
  var type2 = "developer.footprint";
  function make17(position) {
    return {
      type: "developer.footprint",
      position,
      zIndex: 1,
      tick: 0
    };
  }
  __name(make17, "make");
  var footprint2 = {
    tick: (t) => t.tick,
    setTick: (t, tick12) => {
      t.tick = tick12;
    },
    lifetime: () => LIFETIME2
  };

  // objects/developer/pathlight.ts
  var pathlight_exports = {};
  __export(pathlight_exports, {
    isPathlight: () => isPathlight,
    make: () => make18,
    type: () => type3
  });
  console.log("objects/developer/pathlight.ts");
  var type3 = "developer.pathlights";
  function make18(position) {
    return {
      type: "developer.pathlights",
      position,
      zIndex: 1
    };
  }
  __name(make18, "make");
  function isPathlight(obj) {
    return obj.type === type3;
  }
  __name(isPathlight, "isPathlight");

  // objects/developer/index.ts
  var import_lodash7 = __toESM(require_lodash());
  var logger5 = make("fellow_developer");
  var type4 = "developer";
  function isDeveloper(obj) {
    return obj.type === type4;
  }
  __name(isDeveloper, "isDeveloper");
  function plan2() {
    const plan3 = plan_exports.make();
    plan_exports.addEvent(plan3, 0, { type: "developerStarted" });
    return plan3;
  }
  __name(plan2, "plan");
  var targeting = {
    position: (developer) => developer.position,
    target: (developer) => developer.target,
    setTarget: (developer, target) => {
      developer.target = target;
    },
    canMoveOn,
    findTargets: (developer, map2) => {
      const developerPosition = developer.position;
      assert(developerPosition != null);
      return import_lodash7.default.chain(map2.objects).filter((x) => item_exports.isItem(x) && canPick(developer, x)).filter((x) => x.position != null).map(
        (x) => [
          x,
          bfs_exports.bfs(
            (v) => map2.possibleDirections(v, canMoveOn),
            developerPosition,
            x.position
          )
        ]
      ).tap((x) => {
        if (x.length == 0) {
          debugger;
        }
        return x;
      }).sortBy((x) => x[1] ? x[1].length : Infinity).map((x) => x[0]).value();
    }
  };
  var footprint3 = footprint_exports.make(footprint2);
  var speedUp2 = {
    speedUpDays: (t) => config_default.items.coffee.speedUpDays,
    setSpeedUp: (t, ticks) => {
      t.speedUp = ticks;
    },
    speedUp: (t) => t.speedUp
  };
  function make19() {
    return {
      type: type4,
      position: null,
      tact: 0,
      direction: null,
      zIndex: 2,
      speedUp: 0,
      target: null,
      reviewingPr: 0,
      started: false
    };
  }
  __name(make19, "make");
  function processEvents(developer, events, game, effects) {
    for (const event of events) {
      switch (event.type) {
        case "developerStarted":
          developer.started = true;
          game.map.move(developer, game.map.getRandomEmptyLocation());
          effects_exports.append(
            effects,
            effect_exports.showMessage('Developer ("D"): So excited to work!', 5e3)
          );
          break;
        case "workWeekStarted":
          if (developer.started) {
            game.map.move(developer, game.map.getRandomEmptyLocation());
          }
          break;
        case "workWeekEnded":
          if (developer.started) {
            game.map.move(developer, null);
            effects_exports.append(
              effects,
              effect_exports.showMessage("Developer: have a nice weekend!", 5e3)
            );
          }
          break;
      }
    }
  }
  __name(processEvents, "processEvents");
  var pickDirectionDeveloper = make16(targeting);
  function tick9(developer, game) {
    const effects = [];
    developer.tact += 1;
    if (developer.reviewingPr) {
      developer.reviewingPr--;
      if (developer.reviewingPr == 0) {
        effects_exports.append(
          effects,
          effect_exports.showMessage("Developer: Addressed you comments and merged!", 5e3)
        );
      }
    }
    const events = plan_exports.getEvents(game.plan, game.time.ticks);
    processEvents(developer, events, game, effects);
    speedUp_exports.tick(speedUp2, developer, 1);
    if (developer.tact % config_default.developer.moves.ticksPerMove != 0) {
      return effects;
    }
    if (developer.reviewingPr) {
    } else if (developer.position != null) {
      const moveChoice = pickDirectionDeveloper.pickDirection(developer, game.map, pathlight_exports);
      if (moveChoice != null) {
        developer.direction = moveChoice;
        move2(developer, moveTo(developer.position, moveChoice), moveChoice, game.map);
      }
    }
    return effects;
  }
  __name(tick9, "tick");
  function possibleMoves2(pos, map2) {
    const possible = map2.possibleDirections(
      pos,
      (position, map3) => map3.at(position).every((obj) => !obj || !["wall", "door", "player"].includes(obj.type))
    );
    return possible;
  }
  __name(possibleMoves2, "possibleMoves");
  function canMoveOn(position, map2) {
    return map2.at(position).every((obj) => !obj || !["wall", "door"].includes(obj.type));
  }
  __name(canMoveOn, "canMoveOn");
  function canPick(obj, item) {
    switch (item.type) {
      case "coffee":
      case "commit":
      case "story":
      case "pr_review":
        return true;
      case "door":
        return false;
      default:
        assertUnreachable(item);
    }
  }
  __name(canPick, "canPick");
  function pickupItem(obj, item, map2) {
    if (item === obj.target) {
      obj.target = null;
    }
    map2.remove(item);
    switch (item.type) {
      case "coffee":
        speedUp_exports.speedUp(speedUp2, obj);
        break;
      case "commit":
      case "door":
      case "story":
      case "pr_review":
        break;
      default:
        assertUnreachable(item);
    }
  }
  __name(pickupItem, "pickupItem");
  function move2(obj, newPos, newDirection, map2) {
    obj.direction = newDirection;
    const item = import_lodash7.default.first(map2.at(newPos).filter(item_exports.isItem));
    if (item != null) {
      if (canPick(obj, item)) {
        pickupItem(obj, item, map2);
      }
    }
    if (obj.position != null) {
      footprint3.leaveFootprint(obj.position, map2, make17);
    }
    map2.move(obj, newPos);
  }
  __name(move2, "move");
  function defend(obj, item, effects) {
    switch (item.type) {
      case "coffee":
      case "door":
      case "commit":
      case "story":
        break;
      case "pr_review":
        obj.reviewingPr = config_default.developer.prReview.days * config_default.dayTicks;
        effects_exports.append(
          effects,
          effect_exports.showMessage(
            "Developer is stunned by you feedback and is working on addressing it !",
            5e3
          )
        );
        break;
      default:
        assertUnreachable(item);
    }
  }
  __name(defend, "defend");

  // objects/door.ts
  var door_exports = {};
  __export(door_exports, {
    isDoor: () => isDoor,
    make: () => make20
  });
  var type5 = "door";
  function isDoor(obj) {
    return obj.type === type5;
  }
  __name(isDoor, "isDoor");
  function make20(position) {
    return {
      type: type5,
      position,
      zIndex: config_default.items.door.zIndex,
      open: false,
      placed: false
    };
  }
  __name(make20, "make");

  // objects/item.ts
  var item_exports = {};
  __export(item_exports, {
    description: () => description,
    isItem: () => isItem
  });
  console.log("geometry/item.ts");
  function isItem(obj) {
    switch (obj.type) {
      case "door":
      case "commit":
      case "story":
      case "coffee":
      case "pr_review":
        return true;
      case "wall":
      case "boss":
      case "boss.footprint":
      case "developer.footprint":
      case "developer.pathlights":
      case "player":
      case "developer":
        return false;
      default:
        assertUnreachable(obj);
    }
  }
  __name(isItem, "isItem");
  function description(item) {
    switch (item.type) {
      case "door":
        return "door";
      case "commit":
        return `commit ${item.hash}`;
      case "coffee":
        return `cup of coffee`;
      case "story":
        return `story "${item.name}"`;
      case "pr_review":
        return `Pull Request review`;
    }
  }
  __name(description, "description");

  // objects/objects.ts
  var objects_exports = {};
  __export(objects_exports, {
    filter: () => filter
  });
  var import_lodash8 = __toESM(require_lodash());
  console.log("objects/objects.ts");
  function filter(objs, type8) {
    return import_lodash8.default.filter(objs, (x) => x.type == type8);
  }
  __name(filter, "filter");

  // objects/player.ts
  var player_exports = {};
  __export(player_exports, {
    make: () => make22,
    tick: () => tick10,
    type: () => type6
  });
  var import_lodash9 = __toESM(require_lodash());

  // objects/tasks/story.ts
  var story_exports2 = {};
  __export(story_exports2, {
    addCommit: () => addCommit,
    make: () => make21
  });
  function make21(story) {
    return {
      type: "story",
      story,
      impact: config_default.story[story.size].impact,
      neededCommits: config_default.story[story.size].neededCommits,
      appliedCommits: 0
    };
  }
  __name(make21, "make");
  function addCommit(player, task, commit, effects) {
    task.appliedCommits += 1;
    if (task.appliedCommits == task.neededCommits) {
      effects_exports.append(effects, effect_exports.addImpact(task.impact));
      effects_exports.append(effects, effect_exports.showMessage(`Finished ${task.story.name}`, 3e3));
      player.task = null;
    }
    return effects;
  }
  __name(addCommit, "addCommit");

  // objects/player.ts
  var logger6 = make("player");
  var type6 = "player";
  var speedUp3 = {
    speedUpDays: (_15) => config_default.items.coffee.speedUpDays,
    setSpeedUp: (t, ticks) => {
      t.speedUp = ticks;
    },
    speedUp: (t) => t.speedUp
  };
  var picking = {
    canPickItem: (t, item) => canPickItem(t, item),
    dropItem: (t, map2, effects) => dropItem(t, map2),
    pickItem: (t, item, map2, effects) => pickItem(t, item, map2, effects)
  };
  function make22(position) {
    return {
      type: type6,
      zIndex: 1e3,
      direction: null,
      position,
      tact: 0,
      commands: [],
      hrTaskTact: null,
      item: null,
      task: null,
      speedUp: 0,
      level: levels_exports.all[0]
    };
  }
  __name(make22, "make");
  function canMoveOn2(objs) {
    if (objs.length > 0) {
      const canMoveOnObj = /* @__PURE__ */ __name((obj) => {
        switch (obj.type) {
          case "boss.footprint":
          case "coffee":
          case "commit":
          case "developer.footprint":
          case "developer.pathlights":
          case "pr_review":
          case "developer":
          case "door":
          case "story":
            return true;
          case "player":
          case "wall":
          case "boss":
            return false;
          default:
            assertUnreachable(obj);
        }
      }, "canMoveOnObj");
      const result = import_lodash9.default.every(objs, canMoveOnObj);
      return result;
    } else {
      return true;
    }
  }
  __name(canMoveOn2, "canMoveOn");
  function canTakeTask(_task, player) {
    return player.task == null;
  }
  __name(canTakeTask, "canTakeTask");
  function takeTask(player, task, game) {
    player.task = task;
    switch (task.type) {
      case "story":
        game_exports.message(game, messages_exports.startedStory(task.story));
        break;
      case "null":
        break;
      default:
        assertUnreachable(task);
    }
  }
  __name(takeTask, "takeTask");
  function canPickItem(player, item) {
    switch (item.type) {
      case "door":
        if (item.placed) {
          return false;
        }
        break;
      case "coffee":
      case "commit":
      case "story":
      case "pr_review":
        break;
      default:
        assertUnreachable(item);
    }
    return player.hrTaskTact == null;
  }
  __name(canPickItem, "canPickItem");
  function useItem(player, item, map2, effects) {
    logger6(`Using item ${item.type}`);
    switch (item.type) {
      case "commit":
        return useCommit(player, item, effects);
      case "coffee":
        effects_exports.append(effects, effect_exports.showMessage("Drinking coffee", 3e3));
        speedUp_exports.speedUp(speedUp3, player);
        player.item = null;
        return true;
      case "door":
        effects_exports.append(effects, effect_exports.showMessage("Placing door", 3e3));
        item.position = player.position;
        map2.add(item);
        item.placed = true;
        player.item = null;
        return true;
      case "pr_review":
        if (player.direction != null) {
          debugger;
          player.item = null;
          item.position = player.position;
          map2.add(item);
          pr_review_exports.publishTo(item, direction_exports.reverse(player.direction));
        }
      case "story":
        break;
      default:
        assertUnreachable(item);
    }
    return false;
  }
  __name(useItem, "useItem");
  function useCommit(player, item, effects) {
    if (player.task) {
      const task = player.task;
      switch (task.type) {
        case "story":
          story_exports2.addCommit(player, task, item, effects);
          player.item = null;
          effects_exports.append(
            effects,
            effect_exports.showMessage(
              `Added commit ${item.hash} to PR "${task.story.name}" `,
              3e3
            )
          );
          break;
        case "null":
          break;
      }
      return true;
    } else {
      effects_exports.append(effects, effect_exports.showMessage("No task to apply commit to", 3e3));
      return false;
    }
  }
  __name(useCommit, "useCommit");
  function pickItem(player, newItem, map2, effects) {
    map2.remove(newItem);
    switch (newItem.type) {
      case "door":
        newItem.open = true;
        dropCarriedItem(player, map2, effects);
        player.item = newItem;
        effects_exports.append(
          effects,
          effect_exports.showMessage(`Picked ${item_exports.description(newItem)}`, 3e3)
        );
        return true;
      case "coffee":
        dropCarriedItem(player, map2, effects);
        player.item = newItem;
        effects.push(effect_exports.showMessage(`Picked ${item_exports.description(newItem)}`, 3e3));
        return true;
      case "commit":
        dropCarriedItem(player, map2, effects);
        player.item = newItem;
        effects.push(effect_exports.showMessage(`Picked ${item_exports.description(newItem)}`, 3e3));
        return true;
      case "story":
        player.task = story_exports2.make(newItem);
        effects.push(effect_exports.showMessage(`Picked ${item_exports.description(newItem)}`, 3e3));
        return false;
      case "pr_review":
        player.item = newItem;
        return true;
      default:
        assertUnreachable(newItem);
    }
  }
  __name(pickItem, "pickItem");
  function dropCarriedItem(player, map2, effects) {
    const carriedItem = player.item;
    if (carriedItem != null) {
      dropItem(player, map2);
      effects_exports.append(
        effects,
        effect_exports.showMessage(`Dropped ${item_exports.description(carriedItem)}`, 3e3)
      );
    }
  }
  __name(dropCarriedItem, "dropCarriedItem");
  function tickHrTask(player, ticksPassed) {
    if (player.hrTaskTact != null) {
      player.hrTaskTact += ticksPassed;
      if (player.hrTaskTact > 200) {
        player.hrTaskTact = null;
      }
    }
  }
  __name(tickHrTask, "tickHrTask");
  function tickFlags(player, ticksPassed) {
    speedUp_exports.tick(speedUp3, player, ticksPassed);
  }
  __name(tickFlags, "tickFlags");
  function handleDrop(player, map2) {
    if (player.item != null) {
      dropItem(player, map2);
    }
  }
  __name(handleDrop, "handleDrop");
  function dropItem(player, map2) {
    const droppingItem = player.item;
    droppingItem.open = true;
    droppingItem.position = player.position;
    map2.add(droppingItem);
    player.item = null;
  }
  __name(dropItem, "dropItem");
  function processCommands(player, commands, map2, effects) {
    const removeAllMoves = /* @__PURE__ */ __name(() => {
      player.commands = player.commands.filter((x) => x.command.type != "move");
    }, "removeAllMoves");
    player.commands = [...player.commands, ...commands.map((x) => ({ command: x, tact: 0 }))];
    if (player.commands.length > 0) {
      logger6(`processCommands: ${JSON.stringify(player.commands)}`);
    }
    if (player.commands.length > 0 && player.commands.some((x) => x.command.type != "move")) {
      logger6(JSON.stringify(player.commands));
    }
    let delayedCommands = [];
    while (player.commands.length > 0) {
      logger6(JSON.stringify(player.commands));
      const command = player.commands[0].command;
      logger6(`processing: ${JSON.stringify(command)}`);
      switch (command.type) {
        case "move":
          const newPosition = moveTo(player.position, command.direction);
          const obsjAtNewPosition = map2.at(newPosition);
          if (canMoveOn2(obsjAtNewPosition)) {
            player.direction = command.direction;
            player.commands.shift();
            delayedCommands = [];
          } else {
            const delayedCommand = player.commands.shift();
            logger6(`delaying ${JSON.stringify(delayedCommand)}`);
            delayedCommands.push(delayedCommand);
          }
          break;
        case "stop":
          removeAllMoves();
          player.direction = null;
          break;
        case "drop":
          handleDrop(player, map2);
          player.commands.shift();
          removeAllMoves();
          break;
        case "use":
          if (player.item != null) {
            useItem(player, player.item, map2, effects);
          }
          player.commands.shift();
          removeAllMoves();
          break;
        default:
          assertUnreachable(command);
      }
    }
    player.commands = delayedCommands;
    for (const c of player.commands) {
      c.tact += 1;
    }
    player.commands = player.commands.filter((x) => x.tact < 10);
  }
  __name(processCommands, "processCommands");
  function tick10(player, game, commands, ticksPassed) {
    const effects = [];
    let pickedSomething = false;
    let carriedSomething = player.item != null;
    tickHrTask(player, ticksPassed);
    tickFlags(player, ticksPassed);
    processCommands(player, commands, game.map, effects);
    if (player.direction) {
      const newPosition = moveTo(player.position, player.direction);
      const objsAtNewPosition = game.map.at(newPosition);
      if (canMoveOn2(objsAtNewPosition)) {
        if (objsAtNewPosition.length > 0) {
          const obj = objsAtNewPosition[0];
          switch (obj.type) {
            case "door":
            case "coffee":
              if (canPickItem(player, obj)) {
                logger6(`Can pick item  ${JSON.stringify(player)}`);
                effects_exports.append(effects, effect_exports.showMessage(`Picked a ${obj.type}`, 40));
                pickedSomething = pickedSomething || pickItem(player, obj, game.map, effects);
              }
              break;
            case "commit":
              if (canPickItem(player, obj)) {
                logger6(`Can pick item  ${JSON.stringify(player)}`);
                effects_exports.append(
                  effects,
                  effect_exports.showMessage(`Picked a commit ${obj.hash}`, 40)
                );
                pickedSomething = pickedSomething || pickItem(player, obj, game.map, effects);
              }
              break;
            case "story": {
              const task = story_exports2.make(obj);
              if (canTakeTask(task, player)) {
                takeTask(player, task, game);
                game.map.remove(obj);
              }
              break;
            }
            case "pr_review":
              const pickingPlayer = picking_exports.make(picking);
              pickingPlayer.pick(player, obj, game.map, effects);
              break;
            case "player":
            case "wall":
            case "boss":
            case "developer.footprint":
            case "developer.pathlights":
            case "boss.footprint":
            case "developer":
              break;
            default:
              assertUnreachable(obj);
          }
        }
        game.map.move(player, newPosition);
        if (game.map.objAt(moveTo(newPosition, player.direction), "commit") && carriedSomething) {
          player.direction = null;
        }
      }
    }
    return effects;
  }
  __name(tick10, "tick");

  // objects/pr_review.ts
  var pr_review_exports = {};
  __export(pr_review_exports, {
    make: () => make23,
    publishTo: () => publishTo,
    tick: () => tick11
  });
  function make23(position) {
    return {
      type: "pr_review",
      position,
      zIndex: 2,
      open: false,
      publishDirection: null
    };
  }
  __name(make23, "make");
  function publishTo(prReview, direction) {
    prReview.publishDirection = direction;
  }
  __name(publishTo, "publishTo");
  function tick11(prReview, map2) {
    const effects = [];
    if (prReview.publishDirection !== null && prReview.position !== null) {
      const tryPosition = moveTo(prReview.position, prReview.publishDirection);
      const objs = map2.at(prReview.position);
      const newObjs = map2.at(tryPosition);
      for (const obj of newObjs) {
        switch (obj.type) {
          case "player":
          case "boss":
          case "wall":
          case "door":
            debugger;
            map2.remove(prReview);
            return [];
          case "story":
          case "pr_review":
          case "commit":
          case "developer.footprint":
          case "developer.pathlights":
          case "coffee":
          case "boss.footprint":
            break;
          case "developer":
            developer_exports.defend(obj, prReview, effects);
            map2.remove(prReview);
            return effects;
          default:
            assertUnreachable(obj);
        }
      }
      map2.move(prReview, tryPosition);
    }
    return effects;
  }
  __name(tick11, "tick");

  // objects/story.ts
  var story_exports = {};
  __export(story_exports, {
    isStory: () => isStory,
    make: () => make24,
    type: () => type7
  });
  var type7 = "story";
  function isStory(obj) {
    return obj.type === type7;
  }
  __name(isStory, "isStory");
  function make24(position, size2) {
    return {
      type: type7,
      position,
      size: size2,
      zIndex: 1,
      impact: 1,
      open: false,
      name: choice(storyNames[size2])
    };
  }
  __name(make24, "make");
  var storyNames = {
    medium: [
      "Implement Dark Mode for Night Owls",
      "Refactor 'Frankencode' Module",
      "Add Emoji Support for Error Messages",
      "Address Complaints About Clashing Color Scheme",
      "Clarify the Meaning of 'Technical Debt'",
      "Reduce Loading Time for Image-heavy Pages",
      "Streamline Checkout Process for Mobile Users",
      "Update Third-party Libraries to Latest Versions",
      "Resolve Issue with Form Submission Error Handling",
      "Integrate Social Media Sharing Buttons"
    ],
    small: [
      "Option to Change Font Size",
      "Fix Typo in Terms of Service Link",
      "Update README with Installation Instructions",
      "Add Loading Spinner for AJAX Requests",
      "Remove Deprecated Function Calls",
      "Increase Character Limit for Comments",
      "Adjust Button Placement for Accessibility",
      "Minify CSS and JavaScript Files",
      "Implement CSRF Protection on Forms",
      "Resolve Issue with Broken Image Links"
    ],
    large: [
      "Revamp User Interface for Modern Look and Feel",
      "Rewrite Monolithic Codebase into Microservices",
      "Implement Machine Learning Algorithm for Recommendations",
      "Redesign Navigation Structure for Improved Usability",
      "Create Comprehensive Developer Guide",
      "Conduct Full Accessibility Audit and Remediation",
      "Implement Caching Strategy for Scalability",
      "Migrate to OAuth2 for Enhanced Authentication",
      "Transition to Cloud-based Hosting Environment",
      "Integrate Multi-language Support Across Platform"
    ]
  };

  // ui/text_window.ts
  var text_window_exports = {};
  __export(text_window_exports, {
    TextWindow: () => TextWindow,
    centerText: () => centerText
  });

  // ui/windows.ts
  var windows_exports = {};
  __export(windows_exports, {
    Window: () => Window,
    center: () => center,
    focused: () => focused,
    hide: () => hide,
    move: () => move3,
    show: () => show,
    updateScreen: () => updateScreen,
    windows: () => windows
  });
  var import_lodash10 = __toESM(require_lodash());

  // ui/screens.ts
  function render2(chars) {
    const contentBlock = document.getElementById("content");
    const newInnerHTML = chars.map((x) => x.join("")).join("\n");
    if (contentBlock.innerHTML != newInnerHTML) {
      contentBlock.innerHTML = newInnerHTML;
    }
  }
  __name(render2, "render");
  var size = { x: 80, y: 27 };

  // ui/composition.ts
  function make25(size2) {
    const composition = [];
    for (let y = 0; y < size2.y; y++) {
      composition[y] = [];
      for (let x = 0; x < size2.x; x++) {
        composition[y][x] = " ";
      }
    }
    return composition;
  }
  __name(make25, "make");
  function compose(composition, position, window2) {
    for (let y = 0; y < window2.length; y++) {
      for (let x = 0; x < window2[y].length; x++) {
        const t_y = position.y + y;
        const t_x = position.x + x;
        if (t_y < 0 || t_y >= size.y || t_x < 0 || t_x >= size.x) {
          continue;
        }
        composition[position.y + y][position.x + x] = window2[y][x];
      }
    }
    return composition;
  }
  __name(compose, "compose");
  function render3(windows2) {
    let composition = make25(size);
    for (const window2 of windows2) {
      composition = compose(
        composition,
        window2.position,
        window2.render().map((x) => x.split(""))
      );
    }
    render2(composition);
  }
  __name(render3, "render");

  // ui/windows.ts
  var _Window = class _Window {
    constructor() {
      this.keydown = null;
      this.position = vector_exports.zero;
      this.size = vector_exports.zero;
    }
    hide() {
    }
    show() {
    }
    render() {
      return [];
    }
    clearInterval(id) {
      window.clearInterval(id);
    }
    setInterval(handler, timeout) {
      return window.setInterval(() => {
        if (isFocused(this)) {
          handler();
        }
      }, timeout);
    }
  };
  __name(_Window, "Window");
  var Window = _Window;
  function isFocused(window2) {
    return import_lodash10.default.last(windows) === window2;
  }
  __name(isFocused, "isFocused");
  var windows = [];
  function focused() {
    return import_lodash10.default.last(windows) ?? null;
  }
  __name(focused, "focused");
  function updateScreen() {
    render3(windows);
  }
  __name(updateScreen, "updateScreen");
  function show(window2) {
    windows.push(window2);
    window2.show();
    updateScreen();
    return window2;
  }
  __name(show, "show");
  function hide(window2) {
    window2.hide();
    windows.splice(windows.indexOf(window2), 1);
    updateScreen();
  }
  __name(hide, "hide");
  function move3(position, window2) {
    window2.position = position;
    updateScreen();
    return window2;
  }
  __name(move3, "move");
  function center(window2) {
    move3(
      {
        x: Math.floor((size.x - window2.size.x) / 2),
        y: Math.floor((size.y - window2.size.y) / 2)
      },
      window2
    );
    return window2;
  }
  __name(center, "center");

  // ui/text_window.ts
  var _TextWindow = class _TextWindow extends Window {
    constructor(text) {
      super();
      this.keydown = null;
      this.position = { x: 0, y: 0 };
      const splitText = formatText(text);
      const width = splitText[0].length;
      const topLine = "\u250F\u2501" + "\u2501".repeat(width) + "\u2501\u2513";
      const bottomLine = "\u2517\u2501" + "\u2501".repeat(width) + "\u2501\u251B";
      this.contents = [topLine].concat(splitText.map((x) => "\u2503 " + x + " \u2503")).concat([bottomLine]);
      this.size = { x: this.contents[0].length, y: this.contents.length };
    }
    render() {
      return this.contents;
    }
    onKeyPress(callback) {
      this.keydown = callback;
      return this;
    }
  };
  __name(_TextWindow, "TextWindow");
  var TextWindow = _TextWindow;
  function formatText(text) {
    const lines = text.split("\n");
    const maxLength = Math.max(...lines.map((x) => x.length));
    return lines.map((x) => x.padEnd(maxLength, " "));
  }
  __name(formatText, "formatText");
  function centerText(text, maxLength = null) {
    const lines = text.split("\n");
    maxLength = maxLength ?? Math.max(...lines.map((x) => x.length)) ?? 0;
    return lines.map((x) => {
      const padding = " ".repeat(Math.floor((maxLength - x.length) / 2));
      return padding + x + padding;
    }).join("\n");
  }
  __name(centerText, "centerText");

  // ui/game_window.ts
  var game_window_exports = {};
  __export(game_window_exports, {
    GameWindow: () => GameWindow,
    load: () => load2,
    save: () => save2
  });

  // ui/help.ts
  var _Window2 = class _Window2 extends text_window_exports.TextWindow {
    constructor() {
      super(
        [
          "        HELP.",
          "",
          "Move - arrows",
          "Drop item - space",
          "Use item - enter",
          "Stop - end"
        ].join("\n")
      );
      this.onKeyPress((window2, event) => {
        windows_exports.hide(window2);
      });
    }
  };
  __name(_Window2, "Window");
  var Window2 = _Window2;

  // ui/end_game.ts
  var _Window3 = class _Window3 extends text_window_exports.TextWindow {
    constructor(title, money, description2) {
      super(
        text_window_exports.centerText(
          [
            `${title}`,
            "",
            `You are out of your job :(. Hopefully ${format_exports.currency(money)} will`,
            "last till you find the new one.",
            "",
            `This is not going to be easy for a ${description2}`
          ].join("\n")
        )
      );
    }
  };
  __name(_Window3, "Window");
  var Window3 = _Window3;

  // ui/game_window.ts
  var logger7 = make("game_window");
  var _GameWindow = class _GameWindow extends windows_exports.Window {
    constructor(game, storage) {
      super();
      this.game = game;
      this.storage = storage;
      this.keydown = (window2, event) => {
        this.processKey(event);
      };
      this.interval = this.setInterval(() => {
        const effect = game_exports.tick(this.game);
        switch (effect.type) {
          case "endGame":
            this.clearInterval(this.interval);
            endGame(effect);
            break;
          case "null":
            break;
        }
        windows_exports.updateScreen();
      }, config_default.tickInterval);
    }
    render() {
      return renderer_exports.render(this.game);
    }
    processKey(event) {
      logger7(`keydown: ${event.key}`);
      switch (event.key) {
        case "+":
          config_default.tickInterval -= 5;
          this.clearInterval(this.interval);
          this.interval = this.setInterval(() => game_exports.tick(this.game), config_default.tickInterval);
          game_exports.message(this.game, {
            text: `Speed increased to ${config_default.tickInterval}`,
            ttl: 2
          });
          break;
        case "-":
          config_default.tickInterval += 5;
          this.clearInterval(this.interval);
          this.interval = this.setInterval(() => game_exports.tick(this.game), config_default.tickInterval);
          game_exports.message(this.game, { text: "Speed decreased", ttl: 2 });
          break;
        case "?":
        case "h":
          help();
          break;
        case "s":
          save2(this.game, this.storage);
          this.game.messages.push({ text: "Game saved!", ttl: 2e3 });
          break;
        case "l": {
          const now = this.game.time.ticks;
          const loaded = load2(this.storage);
          if (loaded != null) {
            this.game = loaded;
            this.game.messages.push({ text: "Game loaded!", ttl: 2e3 });
          }
          break;
        }
        default: {
          const command = getCommand(event.key);
          if (command != null) {
            logger7(`command: ${command.type}`);
            this.game.commands.push(command);
          }
          break;
        }
      }
    }
  };
  __name(_GameWindow, "GameWindow");
  var GameWindow = _GameWindow;
  function help() {
    windows_exports.show(windows_exports.center(new Window2()));
  }
  __name(help, "help");
  function endGame(effect) {
    windows_exports.show(windows_exports.center(new Window3(effect.message, effect.money, effect.level)));
  }
  __name(endGame, "endGame");
  function getCommand(key) {
    switch (key) {
      case "ArrowUp":
        return { type: "move", direction: "up" };
      case "ArrowDown":
        return { type: "move", direction: "down" };
      case "ArrowLeft":
        return { type: "move", direction: "left" };
      case "ArrowRight":
        return { type: "move", direction: "right" };
      case "Enter":
        return { type: "use" };
      case "End":
      case "Delete":
        return { type: "stop" };
      case " ":
        return { type: "drop" };
    }
  }
  __name(getCommand, "getCommand");
  function save2(game, storage) {
    game_exports.save(game, storage);
    game.messages.push({ text: "Game saved!", ttl: 2e3 });
  }
  __name(save2, "save");
  function load2(storage) {
    return game_exports.load(storage);
  }
  __name(load2, "load");

  // ui/intro.ts
  var intro_exports = {};
  __export(intro_exports, {
    Window: () => Window4
  });
  var _Window4 = class _Window4 extends text_window_exports.TextWindow {
    constructor() {
      super(
        text_window_exports.centerText(
          [
            "REQUIEM FOR A PROGRAMMER.",
            "                                   ",
            "You ('*') are in Agile hell.",
            "Earn enough money and get out (if you can)!",
            "",
            "Keys",
            "----",
            "Move - arrows",
            "Drop item - space",
            "Use item - enter",
            "Stop - end",
            "",
            "Items",
            "-----",
            "l/m/s - large/medium/small story (needed commits)",
            "; - commit",
            "r - PR review",
            "] - door",
            ""
          ].join("\n")
        )
      );
      this.onKeyPress((window2, event) => {
        windows_exports.hide(window2);
      });
    }
  };
  __name(_Window4, "Window");
  var Window4 = _Window4;

  // main.ts
  var import_lodash12 = __toESM(require_lodash());

  // generator.ts
  var import_lodash11 = __toESM(require_lodash());

  // room.ts
  function doors(room, direction) {
    switch (direction) {
      case "up":
        return room.doors.filter((x) => x.y < room.position.y);
      case "down":
        return room.doors.filter((x) => x.y > room.position.y);
    }
  }
  __name(doors, "doors");
  function upperDoors(room) {
    return room.doors.filter((x) => x.y < room.position.y).length;
  }
  __name(upperDoors, "upperDoors");
  function lowerDoors(room) {
    return room.doors.filter((x) => x.y > room.position.y).length;
  }
  __name(lowerDoors, "lowerDoors");

  // generator.ts
  var logger8 = logging_exports.make("generator");
  function maze(size2, game) {
    const outer_walls = hline({ x: 0, y: 0 }, size2.x).concat(vline({ x: 0, y: 0 }, size2.y)).concat(vline({ x: size2.x - 1, y: 0 }, size2.y)).map(
      (point) => ({
        position: point,
        type: "wall",
        zIndex: 0
      })
    );
    game.map.add(outer_walls);
    const inner_walls = import_lodash11.default.range(0, size2.y, 2).map((y) => hline({ x: 0, y }, size2.x)).flatMap((x) => x).map(
      (point) => ({
        type: "wall",
        position: point,
        zIndex: 0
      })
    );
    game.map.add(inner_walls);
    const room_walls = roomWalls({
      height: size2.y,
      width: size2.x,
      wallsPerRow: { min: 3, max: 7 }
    }).map(
      (point) => ({
        type: "wall",
        position: point,
        zIndex: 0
      })
    );
    game.map.add(room_walls);
    generateRoomDoors(game.map);
  }
  __name(maze, "maze");
  function roomWalls(args) {
    const room_walls = import_lodash11.default.flatMap(
      import_lodash11.default.range(3, args.height - 2, 2).map(
        (y) => import_lodash11.default.flatMap(
          ensure(
            () => random_exports.ints(
              0,
              args.width,
              random_exports.int(args.wallsPerRow.min, args.wallsPerRow.max)
            ),
            (x) => properlyDistanced(3, x.concat([0, args.width])),
            20
          ).map((x) => vline({ x, y }, 1))
        )
      )
    );
    return room_walls;
  }
  __name(roomWalls, "roomWalls");
  function generateRoomDoors(map2) {
    const roomRows = import_lodash11.default.range(3, map2.height - 3, 2);
    for (let row of roomRows) {
      const rooms = getRowRooms(map2, row);
      makeRoomDoors(map2, rooms, "up");
      let doors2 = rooms.map((x) => x.doors).flatMap((x) => x);
      for (const door of doors2) {
        const objs = map2.at(door);
        map2.remove(objs);
      }
      makeRoomDoors(map2, rooms, "down");
      doors2 = rooms.map((x) => x.doors).flatMap((x) => x);
      for (const door of doors2) {
        const objs = map2.at(door);
        map2.remove(objs);
      }
    }
  }
  __name(generateRoomDoors, "generateRoomDoors");
  function noWalls(map2, xs, y, direction) {
    for (const x of xs) {
      if (map2.someObjectsAt({ x, y: y - 1 }, "wall") || map2.someObjectsAt({ x, y: y + 1 }, "wall")) {
        return false;
      }
    }
    return true;
  }
  __name(noWalls, "noWalls");
  window.dev = { renderRoom };
  function renderRoom(room, map2) {
    const renderedRoom = renderer_exports.renderMapRect(map2, 0, {
      position: { x: room.position.x, y: room.position.y - 2 },
      size: { x: room.length + 2, y: 5 }
    });
    return console.log(renderedRoom.join("\n"));
  }
  __name(renderRoom, "renderRoom");
  function areDoorsProperlySpaced(map2, room, wallPositions, direction) {
    return properlyDistanced(
      doorSpacing(room.length),
      doors(room, direction).map((existingWallPosition) => existingWallPosition.x).concat(wallPositions)
    ) && noWalls(map2, wallPositions, moveTo(room.position, direction).y, direction);
  }
  __name(areDoorsProperlySpaced, "areDoorsProperlySpaced");
  function makeRoomDoors(map2, rooms, direction) {
    const placeDoorsInRoom = /* @__PURE__ */ __name((room, numOfDoors) => {
      const wallPositions = check(
        () => random_exports.ints(room.position.x, room.position.x + room.length, numOfDoors),
        (wallPositions2) => areDoorsProperlySpaced(map2, room, wallPositions2, direction)
      );
      if (wallPositions != null) {
        room.doors = room.doors.concat(
          wallPositions.map((x) => ({
            x,
            y: room.position.y - (direction === "up" ? 1 : -1)
          }))
        );
      } else {
        const renderedRoom = renderer_exports.renderMapRect(map2, 0, {
          position: { x: room.position.x, y: room.position.y - 2 },
          size: { x: room.length + 2, y: 5 }
        });
        console.log(
          `Failed to add ${numOfDoors} ${direction} door(s) in room ${JSON.stringify(room)}`
        );
        console.log(renderedRoom.join("\n"));
        debugger;
      }
      return wallPositions;
    }, "placeDoorsInRoom");
    for (const room of rooms) {
      const numOfExistingDoors = direction == "up" ? upperDoors(room) : lowerDoors(room);
      let numOfDoors = Math.floor(desiredNumOfDoors(room) / 2 - numOfExistingDoors);
      while (numOfDoors >= 0) {
        const success = placeDoorsInRoom(room, numOfDoors);
        if (success)
          break;
        numOfDoors--;
      }
    }
    return rooms;
  }
  __name(makeRoomDoors, "makeRoomDoors");
  function getRowRooms(map2, row) {
    const rooms = [];
    let currentRoom = {
      position: { x: 0, y: 0 },
      length: 0,
      doors: []
    };
    for (let x = 0; x < map2.width; x++) {
      const c = { x, y: row };
      if (map2.at(vector_exports.n(c)).length == 0) {
        currentRoom.doors.push(vector_exports.n(c));
      }
      if (map2.at(vector_exports.s(c)).length == 0) {
        currentRoom.doors.push(vector_exports.s(c));
      }
      if (map2.at({ x, y: row }).length > 0) {
        if (currentRoom.length > 0)
          rooms.push(currentRoom);
        currentRoom = {
          position: { x, y: row },
          length: 1,
          doors: []
        };
      } else {
        currentRoom.length += 1;
      }
    }
    return rooms;
  }
  __name(getRowRooms, "getRowRooms");
  function doorSpacing(roomLength) {
    return roomLength < 5 ? 2 : roomLength < 10 ? 3 : roomLength < 15 ? 4 : roomLength < 25 ? 5 : 5;
  }
  __name(doorSpacing, "doorSpacing");
  function desiredNumOfDoors(room) {
    const min_max = import_lodash11.default.find(config_default.maze.numberOfDoorsPerRoom, (x) => x[0] > room.length);
    return random_exports.int(min_max[1], min_max[2]);
  }
  __name(desiredNumOfDoors, "desiredNumOfDoors");
  function properlyDistanced(minimalSpacing, walls) {
    const notEmpty = /* @__PURE__ */ __name((value) => value[0] !== null && value[1] != null, "notEmpty");
    const sorted_walls = import_lodash11.default.sortBy(walls);
    const distances = import_lodash11.default.chain(import_lodash11.default.zip(sorted_walls, sorted_walls.slice(1))).initial().value().filter(notEmpty);
    const result = import_lodash11.default.every(
      distances.map((x) => x[1] - x[0]),
      (x) => x >= minimalSpacing
    );
    if (result === false) {
      logger8("properlyDistanced " + JSON.stringify({ minimalSpacing, walls, distances, result }));
    }
    return result;
  }
  __name(properlyDistanced, "properlyDistanced");

  // main.ts
  var MAZE_SIZE = { y: 25, x: 80 };
  var logger9 = make("main");
  logger9("Starting the game");
  setIsEnabled(
    (name) => import_lodash12.default.includes(
      ["main", "player", "game", "fellow_developer", "game_window", "plan", "generator"],
      name
    )
  );
  function main() {
    const plan3 = plan_exports.generatePlan(0);
    plan_exports.dump(plan3);
    const game = game_exports.make(MAZE_SIZE, plan3);
    maze(MAZE_SIZE, game);
    const boss = boss_exports.make(
      game.map.getRandomLocation((map2, position) => {
        const objs = map2.at(position);
        return objs.length > 0 && objs.every(
          (obj) => obj.type === "wall" && obj.position.y > 1 && obj.position.y < game.map.height - 1
        );
      })
    );
    game.map.add([boss]);
    game.player = player_exports.make(game.map.getRandomEmptyLocation());
    game.map.add([game.player]);
    game.developer = developer_exports.make();
    game.map.add([game.developer]);
    window.addEventListener("keydown", (event) => {
      logger9(`keydown ${event.key}`);
      const focused2 = windows_exports.focused();
      if (focused2 && focused2.keydown) {
        focused2.keydown(focused2, event);
      }
    });
    windows_exports.show(new game_window_exports.GameWindow(game, localStorage));
    windows_exports.show(windows_exports.center(new intro_exports.Window()));
  }
  __name(main, "main");
  var localStorage = {
    save(json) {
      window.localStorage.setItem("map", json);
    },
    load() {
      const objectsStorage = window.localStorage.getItem("map");
      return objectsStorage;
    }
  };
  main();
})();
/*! Bundled license information:

lodash/lodash.js:
  (**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
//# sourceMappingURL=out.js.map
