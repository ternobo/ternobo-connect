(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~ContactTabProfile"],{

/***/ "./node_modules/libphonenumber-js/es6/AsYouType.js":
/*!*********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/AsYouType.js ***!
  \*********************************************************/
/*! exports provided: DIGIT_PLACEHOLDER, default, stripNonPairedParens, cutAndStripNonPairedParens, closeNonPairedParens, countOccurences, repeat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIGIT_PLACEHOLDER", function() { return DIGIT_PLACEHOLDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AsYouType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripNonPairedParens", function() { return stripNonPairedParens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cutAndStripNonPairedParens", function() { return cutAndStripNonPairedParens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeNonPairedParens", function() { return closeNonPairedParens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "countOccurences", function() { return countOccurences; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "repeat", function() { return repeat; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _PhoneNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhoneNumber */ "./node_modules/libphonenumber-js/es6/PhoneNumber.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./node_modules/libphonenumber-js/es6/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./node_modules/libphonenumber-js/es6/util.js");
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parse_ */ "./node_modules/libphonenumber-js/es6/parse_.js");
/* harmony import */ var _format___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./format_ */ "./node_modules/libphonenumber-js/es6/format_.js");
/* harmony import */ var _IDD__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./IDD */ "./node_modules/libphonenumber-js/es6/IDD.js");
/* harmony import */ var _checkNumberLength__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./checkNumberLength */ "./node_modules/libphonenumber-js/es6/checkNumberLength.js");
/* harmony import */ var _parseDigits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./parseDigits */ "./node_modules/libphonenumber-js/es6/parseDigits.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// This is an enhanced port of Google Android `libphonenumber`'s
// `asyoutypeformatter.js` of December 31th, 2018.
//
// https://github.com/googlei18n/libphonenumber/blob/8d21a365061de2ba0675c878a710a7b24f74d2ae/javascript/i18n/phonenumbers/asyoutypeformatter.js
//
// Simplified: does not differentiate between "local-only" numbers
// and "internationally dialable" numbers.
// For example, doesn't include changes like this:
// https://github.com/googlei18n/libphonenumber/commit/865da605da12b01053c4f053310bac7c5fbb7935








 // Used in phone number format template creation.
// Could be any digit, I guess.

var DUMMY_DIGIT = '9'; // I don't know why is it exactly `15`

var LONGEST_NATIONAL_PHONE_NUMBER_LENGTH = 15; // Create a phone number consisting only of the digit 9 that matches the
// `number_pattern` by applying the pattern to the "longest phone number" string.

var LONGEST_DUMMY_PHONE_NUMBER = repeat(DUMMY_DIGIT, LONGEST_NATIONAL_PHONE_NUMBER_LENGTH); // The digits that have not been entered yet will be represented by a \u2008,
// the punctuation space.

var DIGIT_PLACEHOLDER = 'x'; // '\u2008' (punctuation space)

var DIGIT_PLACEHOLDER_MATCHER = new RegExp(DIGIT_PLACEHOLDER); // A set of characters that, if found in a national prefix formatting rules, are an indicator to
// us that we should separate the national prefix from the number when formatting.

var NATIONAL_PREFIX_SEPARATORS_PATTERN = /[- ]/; // Deprecated: Google has removed some formatting pattern related code from their repo.
// https://github.com/googlei18n/libphonenumber/commit/a395b4fef3caf57c4bc5f082e1152a4d2bd0ba4c
// "We no longer have numbers in formatting matching patterns, only \d."
// Because this library supports generating custom metadata
// some users may still be using old metadata so the relevant
// code seems to stay until some next major version update.

var SUPPORT_LEGACY_FORMATTING_PATTERNS = true; // A pattern that is used to match character classes in regular expressions.
// An example of a character class is "[1-4]".

var CREATE_CHARACTER_CLASS_PATTERN = SUPPORT_LEGACY_FORMATTING_PATTERNS && function () {
  return /\[([^\[\]])*\]/g;
}; // Any digit in a regular expression that actually denotes a digit. For
// example, in the regular expression "80[0-2]\d{6,10}", the first 2 digits
// (8 and 0) are standalone digits, but the rest are not.
// Two look-aheads are needed because the number following \\d could be a
// two-digit number, since the phone number can be as long as 15 digits.


var CREATE_STANDALONE_DIGIT_PATTERN = SUPPORT_LEGACY_FORMATTING_PATTERNS && function () {
  return /\d(?=[^,}][^,}])/g;
}; // A pattern that is used to determine if a `format` is eligible
// to be used by the "as you type formatter".
// A `format` is eligible when it contains groups of a dollar sign
// followed by a single digit, separated by valid phone number punctuation.
// This prevents invalid punctuation (such as the star sign in Israeli star numbers)
// getting into the output of "as you type" formatter.
// Also, this prevents it from using formats that add additional digits to the output.
// For example, `AR` (Argentina) has this `format`:
// {
//    "pattern": "(\\d)(\\d{2})(\\d{4})(\\d{4})",
//    "leading_digits_patterns": ["91"],
//    "national_prefix_formatting_rule": "0$1",
//    "format": "$2 15-$3-$4",
//    "international_format": "$1 $2 $3-$4"
// },
// where `format` has `15` digits being added to the output.
// As You Type formatter can't add any digits to the output:
// the output must contain only those digits input by the user.


var ELIGIBLE_FORMAT_PATTERN = new RegExp('^' + '[' + _constants__WEBPACK_IMPORTED_MODULE_2__["VALID_PUNCTUATION"] + ']*' + '(\\$\\d[' + _constants__WEBPACK_IMPORTED_MODULE_2__["VALID_PUNCTUATION"] + ']*)+' + '$'); // This is the minimum length of the leading digits of a phone number
// to guarantee the first "leading digits pattern" for a phone number format
// to be preemptive.

var MIN_LEADING_DIGITS_LENGTH = 3;
var VALID_FORMATTED_PHONE_NUMBER_PART = '[' + _constants__WEBPACK_IMPORTED_MODULE_2__["VALID_PUNCTUATION"] + _constants__WEBPACK_IMPORTED_MODULE_2__["VALID_DIGITS"] + ']+';
var VALID_FORMATTED_PHONE_NUMBER_PART_PATTERN = new RegExp('^' + VALID_FORMATTED_PHONE_NUMBER_PART + '$', 'i');
var VALID_PHONE_NUMBER = '(?:' + '[' + _constants__WEBPACK_IMPORTED_MODULE_2__["PLUS_CHARS"] + ']' + '[' + _constants__WEBPACK_IMPORTED_MODULE_2__["VALID_PUNCTUATION"] + _constants__WEBPACK_IMPORTED_MODULE_2__["VALID_DIGITS"] + ']*' + '|' + '[' + _constants__WEBPACK_IMPORTED_MODULE_2__["VALID_PUNCTUATION"] + _constants__WEBPACK_IMPORTED_MODULE_2__["VALID_DIGITS"] + ']+' + ')';
var AFTER_PHONE_NUMBER_DIGITS_END_PATTERN = new RegExp('[^' + _constants__WEBPACK_IMPORTED_MODULE_2__["VALID_PUNCTUATION"] + _constants__WEBPACK_IMPORTED_MODULE_2__["VALID_DIGITS"] + ']+' + '.*' + '$');
var USE_NON_GEOGRAPHIC_COUNTRY_CODE = false; // Tests whether `national_prefix_for_parsing` could match
// different national prefixes.
// Not a digit, not a square bracket.

var COMPLEX_NATIONAL_PREFIX = /[^\d\[\]]/;

var AsYouType =
/*#__PURE__*/
function () {
  // Not setting `options` to a constructor argument
  // not to break backwards compatibility
  // for older versions of the library.

  /**
   * @param {(string|object)?} [optionsOrDefaultCountry] - The default country used for parsing non-international phone numbers. Can also be an `options` object.
   * @param {Object} metadata
   */
  function AsYouType(optionsOrDefaultCountry, metadata) {
    _classCallCheck(this, AsYouType);

    _defineProperty(this, "options", {});

    this.metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](metadata); // Set `defaultCountry` and `defaultCallingCode` options.

    var defaultCountry;
    var defaultCallingCode; // Turns out `null` also has type "object". Weird.

    if (optionsOrDefaultCountry) {
      if (_typeof(optionsOrDefaultCountry) === 'object') {
        defaultCountry = optionsOrDefaultCountry.defaultCountry;
        defaultCallingCode = optionsOrDefaultCountry.defaultCallingCode;
      } else {
        defaultCountry = optionsOrDefaultCountry;
      }
    }

    if (defaultCountry && this.metadata.hasCountry(defaultCountry)) {
      this.defaultCountry = defaultCountry;
    }

    if (defaultCallingCode) {
      /* istanbul ignore if */
      if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
        if (this.metadata.isNonGeographicCallingCode(defaultCallingCode)) {
          this.defaultCountry = '001';
        }
      }

      this.defaultCallingCode = defaultCallingCode;
    } // Reset.


    this.reset();
  }

  _createClass(AsYouType, [{
    key: "reset",
    value: function reset() {
      this.formattedOutput = '';
      this.international = false;
      this.IDDPrefix = undefined;
      this.countryCallingCode = undefined;
      this.digits = '';
      this.resetExtractedNationalSignificantNumber();
      this.setCountry(this.defaultCountry, this.defaultCallingCode);
      return this;
    }
  }, {
    key: "resetExtractedNationalSignificantNumber",
    value: function resetExtractedNationalSignificantNumber() {
      this.nationalSignificantNumber = this.getNationalPartOfDigits();
      this.nationalSignificantNumberMatchesInput = true;
      this.nationalPrefix = undefined;
      this.hasInputNationalPrefix = false;
      this.carrierCode = undefined;
      this.complexPrefixBeforeNationalSignificantNumber = undefined;
      this.hasExtractedNationalSignificantNumber = undefined;
    }
  }, {
    key: "resetFormat",
    value: function resetFormat() {
      this.chosenFormat = undefined;
      this.template = undefined;
      this.nationalNumberTemplate = undefined;
      this.populatedNationalNumberTemplate = undefined;
      this.populatedNationalNumberTemplatePosition = -1;
    }
    /**
     * Returns `true` if the phone number is being input in international format.
     * In other words, returns `true` if and only if the parsed phone number starts with a `"+"`.
     * @return {boolean}
     */

  }, {
    key: "isInternational",
    value: function isInternational() {
      return this.international;
    }
    /**
     * Returns the "country calling code" part of the phone number.
     * Returns `undefined` if the number is not being input in international format.
     * Returns "country calling code" for "non-geographic" phone numbering plans too.
     * @return {string} [countryCallingCode]
     */

  }, {
    key: "getCountryCallingCode",
    value: function getCountryCallingCode() {
      return this.countryCallingCode;
    }
    /**
     * Returns a two-letter country code of the phone number.
     * Returns `undefined` for "non-geographic" phone numbering plans.
     * Returns `undefined` if no phone number has been input yet.
     * @return {string} [country]
     */

  }, {
    key: "getCountry",
    value: function getCountry() {
      // If no digits have been input yet,
      // then `this.country` is the `defaultCountry`.
      // Won't return the `defaultCountry` in such case.
      if (!this.digits) {
        return;
      }

      var countryCode = this.country;
      /* istanbul ignore if */

      if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
        if (this.country === '001') {
          countryCode = undefined;
        }
      }

      return countryCode;
    }
  }, {
    key: "setCountry",
    value: function setCountry(country, callingCode) {
      this.country = country;
      this.setCountryCallingCode(callingCode);
    }
  }, {
    key: "setCountryCallingCode",
    value: function setCountryCallingCode(countryCallingCode) {
      this.countryCallingCode = countryCallingCode;
      this.metadata.selectNumberingPlan(this.country, countryCallingCode);
      this.resetFormat();
      this.initializePhoneNumberFormatsForCountry();

      if (this.metadata.hasSelectedNumberingPlan()) {
        var nationalPrefixForParsing = this.metadata.numberingPlan._nationalPrefixForParsing();

        this.maybeCouldExtractAnotherNationalSignificantNumber = nationalPrefixForParsing && COMPLEX_NATIONAL_PREFIX.test(nationalPrefixForParsing);
        return true;
      }
    }
    /**
     * Inputs "next" phone number characters.
     * @param  {string} text
     * @return {string} Formatted phone number characters that have been input so far.
     */

  }, {
    key: "input",
    value: function input(text) {
      var _this$extractFormatte = this.extractFormattedDigitsAndPlus(text),
          _this$extractFormatte2 = _slicedToArray(_this$extractFormatte, 2),
          formattedDigits = _this$extractFormatte2[0],
          hasPlus = _this$extractFormatte2[1]; // Special case: just a leading `+` entered.


      if (!this.digits && hasPlus) {
        this.formattedOutput = '+';
        this.startInternationalNumber();
      } // If the extracted phone number part
      // can possibly be a part of some valid phone number
      // then parse phone number characters from a formatted phone number.


      if (VALID_FORMATTED_PHONE_NUMBER_PART_PATTERN.test(formattedDigits)) {
        var formattedNationalNumber = this.inputDigits(Object(_parseDigits__WEBPACK_IMPORTED_MODULE_8__["default"])(formattedDigits));
        this.formattedOutput = formattedNationalNumber ? this.getFullNumber(formattedNationalNumber) : this.getNonFormattedNumber();
      }

      return this.formattedOutput;
    }
    /**
     * Extracts formatted phone number digits from text (if there're any).
     * @param  {string} text
     * @return {string}
     */

  }, {
    key: "extractFormattedDigitsAndPlus",
    value: function extractFormattedDigitsAndPlus(text) {
      // Extract a formatted phone number part from text.
      var extractedNumber = extractFormattedPhoneNumber(text) || ''; // Trim a `+`.

      if (extractedNumber[0] === '+') {
        return [extractedNumber.slice('+'.length), true];
      }

      return [extractedNumber];
    }
  }, {
    key: "startInternationalNumber",
    value: function startInternationalNumber() {
      // Prepend the `+` to parsed input.
      this.international = true; // If a default country was set then reset it
      // because an explicitly international phone
      // number is being entered.

      this.setCountry();
    }
    /**
     * Inputs "next" phone number digits.
     * @param  {string} digits
     * @return {string} [formattedNumber] Formatted national phone number (if it can be formatted at this stage). Returning `undefined` means "don't format the national phone number at this stage".
     */

  }, {
    key: "inputDigits",
    value: function inputDigits(nextDigits) {
      var hasReceivedThreeLeadingDigits = this.digits.length < 3 && this.digits.length + nextDigits.length >= 3; // Append phone number digits.

      this.digits += nextDigits; // Attempt to extract IDD prefix:
      // Some users input their phone number in international format,
      // but in an "out-of-country" dialing format instead of using the leading `+`.
      // https://github.com/catamphetamine/libphonenumber-js/issues/185
      // Detect such numbers as soon as there're at least 3 digits.
      // Google's library attempts to extract IDD prefix at 3 digits,
      // so this library just copies that behavior.
      // I guess that's because the most commot IDD prefixes are
      // `00` (Europe) and `011` (US).
      // There exist really long IDD prefixes too:
      // for example, in Australia the default IDD prefix is `0011`,
      // and it could even be as long as `14880011`.
      // An IDD prefix is extracted here, and then every time when
      // there's a new digit and the number couldn't be formatted.

      if (hasReceivedThreeLeadingDigits) {
        this.extractIDDPrefix();
      }

      if (this.isWaitingForCountryCallingCode()) {
        if (!this.extractCountryCallingCode()) {
          return;
        }
      } else {
        this.nationalSignificantNumber += nextDigits;
      }

      if (!this.hasExtractedNationalSignificantNumber) {
        // If a phone number is being input in international format,
        // then it's not valid for it to have a national prefix.
        // Still, some people incorrectly input such numbers with a national prefix.
        // In such cases, only attempt to strip a national prefix if the number becomes too long.
        // (but that is done later, not here)
        if (!this.isInternational()) {
          this.extractNationalSignificantNumber();
        }
      } // Match the available formats by the currently available leading digits.


      if (this.nationalSignificantNumber) {
        this.narrowDownPossibleFormats();
      }

      this.determineTheCountryIfNeeded();
      return this.format(nextDigits);
    }
  }, {
    key: "determineTheCountryIfNeeded",
    value: function determineTheCountryIfNeeded() {
      // Suppose a user enters a phone number in international format,
      // and there're several countries corresponding to that country calling code,
      // and a country has been derived from the number, and then
      // a user enters one more digit and the number is no longer
      // valid for the derived country, so the country should be re-derived
      // on every new digit in those cases.
      //
      // If the phone number is being input in national format,
      // then it could be a case when `defaultCountry` wasn't specified
      // when creating `AsYouType` instance, and just `defaultCallingCode` was specified,
      // and that "calling code" could correspond to a "non-geographic entity",
      // or there could be several countries corresponding to that country calling code.
      // In those cases, `this.country` is `undefined` and should be derived
      // from the number. Again, if country calling code is ambiguous, then
      // `this.country` should be re-derived with each new digit.
      //
      if (!this.country || this.isCountryCallingCodeAmbiguous()) {
        this.determineTheCountry();
      }
    }
  }, {
    key: "format",
    value: function format(nextDigits) {
      if (!this.metadata.hasSelectedNumberingPlan()) {
        return;
      } // See if the phone number digits can be formatted as a complete phone number.
      // If not, use the results from `formatNationalNumberWithNextDigits()`,
      // which formats based on the chosen formatting pattern.
      //
      // Attempting to format complete phone number first is how it's done
      // in Google's `libphonenumber`, so this library just follows it.
      // Google's `libphonenumber` code doesn't explain in detail why does it
      // attempt to format digits as a complete phone number
      // instead of just going with a previoulsy (or newly) chosen `format`:
      //
      // "Checks to see if there is an exact pattern match for these digits.
      //  If so, we should use this instead of any other formatting template
      //  whose leadingDigitsPattern also matches the input."
      //
      // I could come up with my own example though where such
      // "attempt to format complete phone number" would solve an edge case:
      //
      // In some countries, the same digit could be a national prefix
      // or a leading digit of a valid phone number.
      // For example, in Russia, national prefix is `8`,
      // and also `800 555 35 35` is a valid number
      // in which `8` is not a national prefix, but the first digit
      // of a national (significant) number.
      // Suppose, a user starts inputting the `800 555 35 35` number,
      // and while it inputs it up to `800555353`, "as you type" formatter
      // extracts the national prefix `8` from the number, and then tries
      // to format national number `00555353` which is not a valid phone number
      // in Russia and doesn't match any of the available `format`s.
      // Then, as soon as the user inputs `5`, the number becomes `8005553535`,
      // which is a valid number in Russia provided no one strips the leading `8`
      // from it, mistaking it for a national prefix (which is also `8`).
      // And so, as soon as the user input `5`, AsYouType formatter attempts
      // to format "complete" phone number, finds out that it shouldn't strip
      // the national prefix, and doesn't strip it, resulting in a formatted
      // phone number: `800 555-35-35`.
      //


      return this.attemptToFormatCompletePhoneNumber() || // Or, format the digits as a partial (incomplete) phone number
      // using the previously chosen formatting pattern (or a new one).
      this.formatNationalNumberWithNextDigits(nextDigits);
    } // Formats the next phone number digits.

  }, {
    key: "formatNationalNumberWithNextDigits",
    value: function formatNationalNumberWithNextDigits(nextDigits) {
      var previouslyChosenFormat = this.chosenFormat; // Choose a format from the list of matching ones.

      var newlyChosenFormat = this.chooseFormat();

      if (newlyChosenFormat) {
        if (newlyChosenFormat === previouslyChosenFormat) {
          // If it can format the next (current) digits
          // using the previously chosen phone number format
          // then return the updated formatted number.
          return this.formatNextNationalNumberDigits(nextDigits);
        } else {
          // If a more appropriate phone number format
          // has been chosen for these "leading digits",
          // then re-format the national phone number part
          // using the newly selected format.
          return this.formatNextNationalNumberDigits(this.getNationalPartOfDigits());
        }
      } else {
        // See if another national (significant) number could be re-extracted.
        if (this.reExtractNationalSignificantNumber()) {
          // If it could, then re-try formatting the new national (significant) number.
          return this.format(this.getNationalPartOfDigits());
        }
      }
    }
  }, {
    key: "reExtractNationalSignificantNumber",
    value: function reExtractNationalSignificantNumber() {
      // Attempt to extract a national prefix.
      //
      // Some people incorrectly input national prefix
      // in an international phone number.
      // For example, some people write British phone numbers as `+44(0)...`.
      //
      // Also, in some rare cases, it is valid for a national prefix
      // to be a part of an international phone number.
      // For example, mobile phone numbers in Mexico are supposed to be
      // dialled internationally using a `1` national prefix,
      // so the national prefix will be part of an international number.
      //
      // Quote from:
      // https://www.mexperience.com/dialing-cell-phones-in-mexico/
      //
      // "Dialing a Mexican cell phone from abroad
      // When you are calling a cell phone number in Mexico from outside Mexico,
      // it’s necessary to dial an additional “1” after Mexico’s country code
      // (which is “52”) and before the area code.
      // You also ignore the 045, and simply dial the area code and the
      // cell phone’s number.
      //
      // If you don’t add the “1”, you’ll receive a recorded announcement
      // asking you to redial using it.
      //
      // For example, if you are calling from the USA to a cell phone
      // in Mexico City, you would dial +52 – 1 – 55 – 1234 5678.
      // (Note that this is different to calling a land line in Mexico City
      // from abroad, where the number dialed would be +52 – 55 – 1234 5678)".
      //
      // Google's demo output:
      // https://libphonenumber.appspot.com/phonenumberparser?number=%2b5215512345678&country=MX
      //
      if (this.extractAnotherNationalSignificantNumber()) {
        return true;
      } // If no format matches the phone number, then it could be
      // "a really long IDD" (quote from a comment in Google's library).
      // An IDD prefix is first extracted when the user has entered at least 3 digits,
      // and then here — every time when there's a new digit and the number
      // couldn't be formatted.
      // For example, in Australia the default IDD prefix is `0011`,
      // and it could even be as long as `14880011`.
      //
      // Could also check `!hasReceivedThreeLeadingDigits` here
      // to filter out the case when this check duplicates the one
      // already performed when there're 3 leading digits,
      // but it's not a big deal, and in most cases there
      // will be a suitable `format` when there're 3 leading digits.
      //


      if (this.extractIDDPrefix()) {
        return true;
      }
    }
    /**
     * Is only required to be called if there was another (non-empty)
     * national (significant) number before the new one.
     */

  }, {
    key: "onNationalSignificantNumberChanged",
    value: function onNationalSignificantNumberChanged() {
      this.determineTheCountryIfNeeded(); // Reset all previous formatting data.
      // (and leading digits matching state)

      this.initializePhoneNumberFormatsForCountry();
      this.resetFormat();

      if (this.nationalSignificantNumber) {
        // Match the available formats by the currently available leading digits.
        this.narrowDownPossibleFormats();
      }
    }
  }, {
    key: "extractIDDPrefix",
    value: function extractIDDPrefix() {
      // An IDD prefix can't be present in a number written with a `+`.
      // Also, don't re-extract an IDD prefix if has already been extracted.
      if (this.isInternational() || this.IDDPrefix) {
        return;
      } // Some users input their phone number in "out-of-country"
      // dialing format instead of using the leading `+`.
      // https://github.com/catamphetamine/libphonenumber-js/issues/185
      // Detect such numbers.


      var numberWithoutIDD = Object(_IDD__WEBPACK_IMPORTED_MODULE_6__["stripIDDPrefix"])(this.digits, this.defaultCountry, this.defaultCallingCode, this.metadata.metadata);

      if (numberWithoutIDD && numberWithoutIDD !== this.digits) {
        // If an IDD prefix was stripped then convert the IDD-prefixed number
        // to international number for subsequent parsing.
        this.IDDPrefix = this.digits.slice(0, this.digits.length - numberWithoutIDD.length);
        this.startInternationalNumber();

        if (this.nationalSignificantNumber) {
          this.resetExtractedNationalSignificantNumber();
          this.onNationalSignificantNumberChanged();
        }

        return true;
      }
    }
  }, {
    key: "chooseFormat",
    value: function chooseFormat() {
      // When there are multiple available formats, the formatter uses the first
      // format where a formatting template could be created.
      for (var _iterator = this.matchingFormats, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i2 >= _iterator.length) break;
          _ref = _iterator[_i2++];
        } else {
          _i2 = _iterator.next();
          if (_i2.done) break;
          _ref = _i2.value;
        }

        var format = _ref;

        // If this format is currently being used
        // and is still possible, then stick to it.
        if (this.chosenFormat === format) {
          break;
        }

        if (!this.createFormattingTemplate(format)) {
          continue;
        }

        this.chosenFormat = format;
        break;
      }

      if (!this.chosenFormat) {
        // No format matches the national phone number entered.
        this.resetFormat();
      }

      return this.chosenFormat;
    }
  }, {
    key: "initializePhoneNumberFormatsForCountry",
    value: function initializePhoneNumberFormatsForCountry() {
      if (this.metadata.hasSelectedNumberingPlan()) {
        // Get all "eligible" phone number formats for this country.
        // The the comments on `ELIGIBLE_FORMAT_PATTERN` for a definition
        // of an "eligible" format.
        // International format of a format is checked here,
        // because it's used both when formatting international
        // and non-international numbers.
        // It's assumed that an international format is always more
        // "eligible" than a national format.
        this.matchingFormats = this.metadata.formats().filter(function (format) {
          return ELIGIBLE_FORMAT_PATTERN.test(format.internationalFormat());
        });
      } else {
        this.matchingFormats = [];
      }
    }
  }, {
    key: "narrowDownPossibleFormats",
    value: function narrowDownPossibleFormats() {
      var _this = this;

      var leadingDigits = this.nationalSignificantNumber; // "leading digits" pattern list starts with a
      // "leading digits" pattern fitting a maximum of 3 leading digits.
      // So, after a user inputs 3 digits of a national (significant) phone number
      // this national (significant) number can already be formatted.
      // The next "leading digits" pattern is for 4 leading digits max,
      // and the "leading digits" pattern after it is for 5 leading digits max, etc.
      // This implementation is different from Google's
      // in that it searches for a fitting format
      // even if the user has entered less than
      // `MIN_LEADING_DIGITS_LENGTH` digits of a national number.
      // Because some leading digit patterns already match for a single first digit.

      var leadingDigitsPatternIndex = leadingDigits.length - MIN_LEADING_DIGITS_LENGTH;

      if (leadingDigitsPatternIndex < 0) {
        leadingDigitsPatternIndex = 0;
      }

      this.matchingFormats = this.matchingFormats.filter(function (format) {
        return _this.formatMatches(format, leadingDigits, leadingDigitsPatternIndex);
      }); // If there was a phone number format chosen
      // and it no longer holds given the new leading digits then reset it.
      // The test for this `if` condition is marked as:
      // "Reset a chosen format when it no longer holds given the new leading digits".
      // To construct a valid test case for this one can find a country
      // in `PhoneNumberMetadata.xml` yielding one format for 3 `<leadingDigits>`
      // and yielding another format for 4 `<leadingDigits>` (Australia in this case).

      if (this.chosenFormat && this.matchingFormats.indexOf(this.chosenFormat) === -1) {
        this.resetFormat();
      }
    }
  }, {
    key: "formatMatches",
    value: function formatMatches(format, leadingDigits, leadingDigitsPatternIndex) {
      // When a prefix before a national (significant) number is
      // simply a national prefix, then it's parsed as `this.nationalPrefix`.
      // In more complex cases, a prefix before national (significant) number
      // could include a national prefix as well as some "capturing groups",
      // and in that case there's no info whether a national prefix has been parsed.
      // If national prefix is not used when formatting a phone number
      // using this format, but a national prefix has been entered by the user,
      // and was extracted, then discard such phone number format.
      // In Google's "AsYouType" formatter code, the equivalent would be this part:
      // https://github.com/google/libphonenumber/blob/0a45cfd96e71cad8edb0e162a70fcc8bd9728933/java/libphonenumber/src/com/google/i18n/phonenumbers/AsYouTypeFormatter.java#L175-L184
      if (this.nationalPrefix && !format.usesNationalPrefix() && // !format.domesticCarrierCodeFormattingRule() &&
      !format.nationalPrefixIsOptionalWhenFormattingInNationalFormat()) {
        return false;
      } // If national prefix is mandatory for this phone number format
      // and there're no guarantees that a national prefix is present in user input
      // then discard this phone number format as not suitable.
      // In Google's "AsYouType" formatter code, the equivalent would be this part:
      // https://github.com/google/libphonenumber/blob/0a45cfd96e71cad8edb0e162a70fcc8bd9728933/java/libphonenumber/src/com/google/i18n/phonenumbers/AsYouTypeFormatter.java#L185-L193


      if (this.hasInputNationalPrefix === false && !this.isInternational() && format.nationalPrefixIsMandatoryWhenFormattingInNationalFormat()) {
        // Could check for `if (!this.nationalPrefix ...` instead,
        // and then check `this.hasInputNationalPrefix` here,
        // and if it's `false` then `return `false`, else somehow make the format
        // a lower-priority one due to it not being known whether a national prefix
        // has been input or not.
        return false;
      }

      var leadingDigitsPatternsCount = format.leadingDigitsPatterns().length; // If this format is not restricted to a certain
      // leading digits pattern then it fits.

      if (leadingDigitsPatternsCount === 0) {
        return true;
      } // Start excluding any non-matching formats only when the
      // national number entered so far is at least 3 digits long,
      // otherwise format matching would give false negatives.
      // For example, when the digits entered so far are `2`
      // and the leading digits pattern is `21` –
      // it's quite obvious in this case that the format could be the one
      // but due to the absence of further digits it would give false negative.


      if (leadingDigits.length < MIN_LEADING_DIGITS_LENGTH) {
        return true;
      } // If at least `MIN_LEADING_DIGITS_LENGTH` digits of a national number are available
      // then format matching starts narrowing down the list of possible formats
      // (only previously matched formats are considered for next digits).


      leadingDigitsPatternIndex = Math.min(leadingDigitsPatternIndex, leadingDigitsPatternsCount - 1);
      var leadingDigitsPattern = format.leadingDigitsPatterns()[leadingDigitsPatternIndex]; // Brackets are required for `^` to be applied to
      // all or-ed (`|`) parts, not just the first one.

      return new RegExp("^(".concat(leadingDigitsPattern, ")")).test(leadingDigits);
    }
  }, {
    key: "getSeparatorAfterNationalPrefix",
    value: function getSeparatorAfterNationalPrefix(format) {
      // `US` metadata doesn't have a `national_prefix_formatting_rule`,
      // so the `if` condition below doesn't apply to `US`,
      // but in reality there shoudl be a separator
      // between a national prefix and a national (significant) number.
      // So `US` national prefix separator is a "special" "hardcoded" case.
      if (this.metadata.countryCallingCode() === '1') {
        return ' ';
      } // If a `format` has a `national_prefix_formatting_rule`
      // and that rule has a separator after a national prefix,
      // then it means that there should be a separator
      // between a national prefix and a national (significant) number.


      if (format && format.nationalPrefixFormattingRule() && NATIONAL_PREFIX_SEPARATORS_PATTERN.test(format.nationalPrefixFormattingRule())) {
        return ' ';
      } // At this point, there seems to be no clear evidence that
      // there should be a separator between a national prefix
      // and a national (significant) number. So don't insert one.


      return '';
    } // This is in accordance to how Google's `libphonenumber` does it.
    // "Check to see if there is an exact pattern match for these digits.
    // If so, we should use this instead of any other formatting template
    // whose `leadingDigitsPattern` also matches the input."

  }, {
    key: "attemptToFormatCompletePhoneNumber",
    value: function attemptToFormatCompletePhoneNumber() {
      var nationalPrefix = this.nationalPrefix;
      var carrierCode = this.carrierCode;
      var nationalNumber = this.nationalSignificantNumber;

      if (Object(_checkNumberLength__WEBPACK_IMPORTED_MODULE_7__["default"])(nationalNumber, this.metadata) !== 'IS_POSSIBLE') {
        return;
      }

      for (var _iterator2 = this.matchingFormats, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i3 >= _iterator2.length) break;
          _ref2 = _iterator2[_i3++];
        } else {
          _i3 = _iterator2.next();
          if (_i3.done) break;
          _ref2 = _i3.value;
        }

        var format = _ref2;
        var matcher = new RegExp("^(?:".concat(format.pattern(), ")$"));

        if (!matcher.test(nationalNumber)) {
          continue;
        }

        var formattedNationalNumber = this.formatNationalNumberUsingFormat(nationalPrefix, carrierCode, nationalNumber, format);

        if (!formattedNationalNumber) {
          continue;
        } // To leave the formatter in a consistent state.


        this.resetFormat();
        this.chosenFormat = format; // Set `this.template` and `this.populatedNationalNumberTemplate`.

        /* istanbul ignore else */

        if (this.createFormattingTemplate(format)) {
          // Populate `this.populatedNationalNumberTemplate` with phone number digits.
          this.formatNextNationalNumberDigits(this.getNationalPartOfDigits());
        } else {
          // This case doesn't ever happen with the current metadata.
          // If the formatting template couldn't be created for a format,
          // create it manually from the formatted phone number.
          this.template = this.getFullNumber(formattedNationalNumber).replace(/[\d\+]/g, DIGIT_PLACEHOLDER);
          this.nationalNumberTemplate = formattedNationalNumber.replace(/[\d\+]/g, DIGIT_PLACEHOLDER);
          this.populatedNationalNumberTemplate = formattedNationalNumber;
          this.populatedNationalNumberTemplatePosition = this.populatedNationalNumberTemplate.length - 1;
        }

        return formattedNationalNumber;
      }
    }
  }, {
    key: "formatNationalNumberUsingFormat",
    value: function formatNationalNumberUsingFormat(nationalPrefix, carrierCode, nationalNumber, format) {
      // This check has already been performed in `.narrowDownPossibleFormats()`,
      // so no need to re-perform it here.
      //
      // let tryNationalPrefixFormat = true
      // if (this.hasInputNationalPrefix === false) {
      // 	if (!this.isInternational()) {
      // 		if (format.nationalPrefixIsMandatoryWhenFormattingInNationalFormat()) {
      // 			tryNationalPrefixFormat = false
      // 		}
      // 	}
      // }
      // if (tryNationalPrefixFormat) {
      // 	formatNationalNumberUsingFormat(..., { ..., withNationalPrefix: true })
      // }
      // Format the number with using `national_prefix_formatting_rule`.
      // If the resulting formatted number is a valid formatted number, then return it.
      //
      // Google's AsYouType formatter is different in a way that it doesn't try
      // to format using the "national prefix formatting rule", and instead it
      // simply prepends a national prefix followed by a " " character.
      // This code does that too, but as a fallback.
      // The reason is that "national prefix formatting rule" may use parentheses,
      // which wouldn't be included has it used the simpler Google's way.
      //
      var formattedNumber = Object(_format___WEBPACK_IMPORTED_MODULE_5__["formatNationalNumberUsingFormat"])(nationalNumber, format, {
        internationalFormat: this.isInternational(),
        withNationalPrefix: true,
        carrierCode: carrierCode,
        metadata: this.metadata
      });

      if (this.isValidFormattedNationalNumber(formattedNumber)) {
        return formattedNumber;
      } // Format the number without using `national_prefix_formatting_rule`.


      formattedNumber = Object(_format___WEBPACK_IMPORTED_MODULE_5__["formatNationalNumberUsingFormat"])(nationalNumber, format, {
        internationalFormat: this.isInternational(),
        withNationalPrefix: false,
        carrierCode: carrierCode,
        metadata: this.metadata
      }); // If a national prefix was extracted, then just prepend it,
      // followed by a " " character.
      // If `nationalPrefix` is `undefined`, then it doesn't imply
      // that a national prefix wasn't extracted: it might have been extracted
      // if there's a `national_prefix_formatting_pattern` having "capturing groups".

      if (nationalPrefix) {
        formattedNumber = nationalPrefix + this.getSeparatorAfterNationalPrefix(format) + formattedNumber;
      }

      if (this.isValidFormattedNationalNumber(formattedNumber)) {
        return formattedNumber;
      }
    } // Check that the formatted phone number contains exactly
    // the same digits that have been input by the user.
    // For example, when "0111523456789" is input for `AR` country,
    // the extracted `this.nationalSignificantNumber` is "91123456789",
    // which means that the national part of `this.digits` isn't simply equal to
    // `this.nationalPrefix` + `this.nationalSignificantNumber`.
    //
    // Also, a `format` can add extra digits to the `this.nationalSignificantNumber`
    // being formatted via `metadata[country].national_prefix_transform_rule`.
    // For example, for `VI` country, it prepends `340` to the national number,
    // and if this check hasn't been implemented, then there would be a bug
    // when `340` "area coude" is "duplicated" during input for `VI` country:
    // https://github.com/catamphetamine/libphonenumber-js/issues/318
    //
    // So, all these "gotchas" are filtered out.
    //
    // In the original Google's code, the comments say:
    // "Check that we didn't remove nor add any extra digits when we matched
    // this formatting pattern. This usually happens after we entered the last
    // digit during AYTF. Eg: In case of MX, we swallow mobile token (1) when
    // formatted but AYTF should retain all the number entered and not change
    // in order to match a format (of same leading digits and length) display
    // in that way."
    // "If it's the same (i.e entered number and format is same), then it's
    // safe to return this in formatted number as nothing is lost / added."
    // Otherwise, don't use this format.
    // https://github.com/google/libphonenumber/commit/3e7c1f04f5e7200f87fb131e6f85c6e99d60f510#diff-9149457fa9f5d608a11bb975c6ef4bc5
    // https://github.com/google/libphonenumber/commit/3ac88c7106e7dcb553bcc794b15f19185928a1c6#diff-2dcb77e833422ee304da348b905cde0b
    //

  }, {
    key: "isValidFormattedNationalNumber",
    value: function isValidFormattedNationalNumber(formattedNationalNumber) {
      return Object(_parseDigits__WEBPACK_IMPORTED_MODULE_8__["default"])(formattedNationalNumber) === this.getNationalPartOfDigits();
    }
    /**
     * Returns the part of `this.digits` that corresponds to the national number.
     * Basically, all digits that have been input by the user, except for the
     * international prefix and the country calling code part
     * (if the number is an international one).
     * @return {string}
     */

  }, {
    key: "getNationalPartOfDigits",
    value: function getNationalPartOfDigits() {
      if (this.isInternational()) {
        return this.digits.slice((this.IDDPrefix ? this.IDDPrefix.length : 0) + (this.countryCallingCode ? this.countryCallingCode.length : 0));
      }

      return this.digits;
    }
  }, {
    key: "getDigitsWithoutInternationalPrefix",
    value: function getDigitsWithoutInternationalPrefix() {
      if (this.isInternational()) {
        if (this.IDDPrefix) {
          return this.digits.slice(this.IDDPrefix.length);
        }
      }

      return this.digits;
    }
  }, {
    key: "getInternationalPrefixBeforeCountryCallingCode",
    value: function getInternationalPrefixBeforeCountryCallingCode(options) {
      return this.IDDPrefix ? options && options.spacing === false ? this.IDDPrefix : this.IDDPrefix + ' ' : '+';
    } // Prepends `+CountryCode ` in case of an international phone number

  }, {
    key: "getFullNumber",
    value: function getFullNumber(formattedNationalNumber) {
      if (this.isInternational()) {
        var prefix = this.getInternationalPrefixBeforeCountryCallingCode();

        if (!this.countryCallingCode) {
          return "".concat(prefix).concat(this.getDigitsWithoutInternationalPrefix());
        }

        if (!formattedNationalNumber) {
          return "".concat(prefix).concat(this.countryCallingCode);
        }

        return "".concat(prefix).concat(this.countryCallingCode, " ").concat(formattedNationalNumber);
      }

      return formattedNationalNumber;
    }
  }, {
    key: "getNonFormattedNationalNumberWithPrefix",
    value: function getNonFormattedNationalNumberWithPrefix() {
      var number = this.nationalSignificantNumber;
      var prefix = this.complexPrefixBeforeNationalSignificantNumber || this.nationalPrefix;

      if (prefix) {
        number = prefix + number;
      }

      return number;
    }
  }, {
    key: "getNonFormattedNumber",
    value: function getNonFormattedNumber() {
      return this.getFullNumber(this.nationalSignificantNumberMatchesInput ? this.getNonFormattedNationalNumberWithPrefix() : this.getNationalPartOfDigits());
    }
  }, {
    key: "isWaitingForCountryCallingCode",
    value: function isWaitingForCountryCallingCode() {
      return this.isInternational() && !this.countryCallingCode;
    } // Extracts a country calling code from a number
    // being entered in internatonal format.

  }, {
    key: "extractCountryCallingCode",
    value: function extractCountryCallingCode() {
      var _extractCountryCallin = Object(_parse___WEBPACK_IMPORTED_MODULE_4__["extractCountryCallingCode"])('+' + this.getDigitsWithoutInternationalPrefix(), this.defaultCountry, this.defaultCallingCode, this.metadata.metadata),
          countryCallingCode = _extractCountryCallin.countryCallingCode,
          number = _extractCountryCallin.number;

      if (countryCallingCode) {
        this.setCountryCallingCode(countryCallingCode);
        this.nationalSignificantNumber = number;
        return true;
      }
    }
    /**
     * Extracts a national (significant) number from user input.
     * Google's library is different in that it only applies `national_prefix_for_parsing`
     * and doesn't apply `national_prefix_transform_rule` after that.
     * https://github.com/google/libphonenumber/blob/a3d70b0487875475e6ad659af404943211d26456/java/libphonenumber/src/com/google/i18n/phonenumbers/AsYouTypeFormatter.java#L539
     * @return {boolean} [extracted]
     */

  }, {
    key: "extractNationalSignificantNumber",
    value: function extractNationalSignificantNumber() {
      if (!this.metadata.hasSelectedNumberingPlan()) {
        return;
      }

      var _extractNationalNumbe = Object(_parse___WEBPACK_IMPORTED_MODULE_4__["extractNationalNumberFromPossiblyIncompleteNumber"])(this.nationalSignificantNumber, this.metadata),
          nationalNumber = _extractNationalNumbe.nationalNumber,
          nationalPrefix = _extractNationalNumbe.nationalPrefix,
          carrierCode = _extractNationalNumbe.carrierCode;

      if (nationalNumber === this.nationalSignificantNumber) {
        return;
      }

      this.onExtractedNationalNumber(nationalPrefix, carrierCode, nationalNumber);
      return true;
    }
    /**
     * In Google's code this function is called "attempt to extract longer NDD".
     * "Some national prefixes are a substring of others", they say.
     * @return {boolean} [result] — Returns `true` if extracting a national prefix produced different results from what they were.
     */

  }, {
    key: "extractAnotherNationalSignificantNumber",
    value: function extractAnotherNationalSignificantNumber() {
      if (!this.hasExtractedNationalSignificantNumber) {
        return this.extractNationalSignificantNumber();
      }

      if (!this.maybeCouldExtractAnotherNationalSignificantNumber) {
        return;
      }

      var _extractNationalNumbe2 = Object(_parse___WEBPACK_IMPORTED_MODULE_4__["extractNationalNumberFromPossiblyIncompleteNumber"])(this.getNationalPartOfDigits(), this.metadata),
          nationalNumber = _extractNationalNumbe2.nationalNumber,
          nationalPrefix = _extractNationalNumbe2.nationalPrefix,
          carrierCode = _extractNationalNumbe2.carrierCode; // If a national prefix has been extracted previously,
      // then it's always extracted as additional digits are added.
      // That's assuming `extractNationalNumberFromPossiblyIncompleteNumber()`
      // doesn't do anything different from what it currently does.
      // So, just in case, here's this check, though it doesn't occur.

      /* istanbul ignore if */


      if (nationalNumber === this.nationalSignificantNumber) {
        return;
      }

      this.onExtractedNationalNumber(nationalPrefix, carrierCode, nationalNumber);
      return true;
    }
  }, {
    key: "onExtractedNationalNumber",
    value: function onExtractedNationalNumber(nationalPrefix, carrierCode, nationalNumber) {
      // Not returning a `nationalPrefix` doesn't imply
      // that the original phone number didn't contain it.
      // https://gitlab.com/catamphetamine/libphonenumber-js/-/blob/master/METADATA.md#national_prefix_for_parsing--national_prefix_transform_rule
      if (nationalPrefix) {
        this.nationalPrefix = nationalPrefix;
      }

      if (carrierCode) {
        this.carrierCode = carrierCode;
      }

      this.nationalSignificantNumber = nationalNumber;
      this.complexPrefixBeforeNationalSignificantNumber = undefined;
      this.nationalSignificantNumberMatchesInput = undefined;
      this.hasInputNationalPrefix = nationalPrefix ? true : false;
      var digits = this.getNationalPartOfDigits(); // This check also works with empty `this.nationalSignificantNumber`.

      var nationalNumberIndex = digits.lastIndexOf(nationalNumber);

      if (nationalNumberIndex === digits.length - nationalNumber.length) {
        this.nationalSignificantNumberMatchesInput = true; // If a prefix of a national (significant) number is not as simple
        // as just a basic national prefix, then such prefix is stored in
        // `this.complexPrefixBeforeNationalSignificantNumber` property and will be
        // prepended "as is" to the national (significant) number to produce
        // a formatted result.

        if (digits !== (nationalPrefix || '') + nationalNumber) {
          this.complexPrefixBeforeNationalSignificantNumber = digits.slice(0, nationalNumberIndex);
          this.hasInputNationalPrefix = undefined;
        }
      } else {
        this.hasInputNationalPrefix = undefined;
      }

      this.hasExtractedNationalSignificantNumber = true;
      this.onNationalSignificantNumberChanged();
    }
  }, {
    key: "isCountryCallingCodeAmbiguous",
    value: function isCountryCallingCodeAmbiguous() {
      var countryCodes = this.metadata.getCountryCodesForCallingCode(this.countryCallingCode);
      return countryCodes && countryCodes.length > 1;
    }
  }, {
    key: "createFormattingTemplate",
    value: function createFormattingTemplate(format) {
      // The formatter doesn't format numbers when numberPattern contains '|', e.g.
      // (20|3)\d{4}. In those cases we quickly return.
      // (Though there's no such format in current metadata)

      /* istanbul ignore if */
      if (SUPPORT_LEGACY_FORMATTING_PATTERNS && format.pattern().indexOf('|') >= 0) {
        return;
      } // Get formatting template for this phone number format


      var template = this.getTemplateForNumberFormatPattern(format); // If the national number entered is too long
      // for any phone number format, then abort.

      if (!template) {
        return;
      }

      this.template = template;
      this.nationalNumberTemplate = template;
      this.populatedNationalNumberTemplate = template; // With a new formatting template, the matched position
      // using the old template needs to be reset.

      this.populatedNationalNumberTemplatePosition = -1; // For convenience, the public `.template` property
      // contains the whole international number
      // if the phone number being input is international:
      // 'x' for the '+' sign, 'x'es for the country phone code,
      // a spacebar and then the template for the formatted national number.

      if (this.isInternational()) {
        this.template = this.getInternationalPrefixBeforeCountryCallingCode().replace(/[\d\+]/g, DIGIT_PLACEHOLDER) + repeat(DIGIT_PLACEHOLDER, this.countryCallingCode.length) + ' ' + template;
      }

      return true;
    }
    /**
     * Generates formatting template for a national phone number,
     * optionally containing a national prefix, for a format.
     * @param  {Format} format
     * @param  {string} nationalPrefix
     * @return {string}
     */

  }, {
    key: "getTemplateForNumberFormatPattern",
    value: function getTemplateForNumberFormatPattern(format) {
      var pattern = format.pattern();
      /* istanbul ignore else */

      if (SUPPORT_LEGACY_FORMATTING_PATTERNS) {
        pattern = pattern // Replace anything in the form of [..] with \d
        .replace(CREATE_CHARACTER_CLASS_PATTERN(), '\\d') // Replace any standalone digit (not the one in `{}`) with \d
        .replace(CREATE_STANDALONE_DIGIT_PATTERN(), '\\d');
      } // Generate a dummy national number (consisting of `9`s)
      // that fits this format's `pattern`.
      //
      // This match will always succeed,
      // because the "longest dummy phone number"
      // has enough length to accomodate any possible
      // national phone number format pattern.
      //


      var digits = LONGEST_DUMMY_PHONE_NUMBER.match(pattern)[0]; // If the national number entered is too long
      // for any phone number format, then abort.

      if (this.nationalSignificantNumber.length > digits.length) {
        return;
      } // Get a formatting template which can be used to efficiently format
      // a partial number where digits are added one by one.
      // Below `strictPattern` is used for the
      // regular expression (with `^` and `$`).
      // This wasn't originally in Google's `libphonenumber`
      // and I guess they don't really need it
      // because they're not using "templates" to format phone numbers
      // but I added `strictPattern` after encountering
      // South Korean phone number formatting bug.
      //
      // Non-strict regular expression bug demonstration:
      //
      // this.nationalSignificantNumber : `111111111` (9 digits)
      //
      // pattern : (\d{2})(\d{3,4})(\d{4})
      // format : `$1 $2 $3`
      // digits : `9999999999` (10 digits)
      //
      // '9999999999'.replace(new RegExp(/(\d{2})(\d{3,4})(\d{4})/g), '$1 $2 $3') = "99 9999 9999"
      //
      // template : xx xxxx xxxx
      //
      // But the correct template in this case is `xx xxx xxxx`.
      // The template was generated incorrectly because of the
      // `{3,4}` variability in the `pattern`.
      //
      // The fix is, if `this.nationalSignificantNumber` has already sufficient length
      // to satisfy the `pattern` completely then `this.nationalSignificantNumber`
      // is used instead of `digits`.


      var strictPattern = new RegExp('^' + pattern + '$');
      var nationalNumberDummyDigits = this.nationalSignificantNumber.replace(/\d/g, DUMMY_DIGIT); // If `this.nationalSignificantNumber` has already sufficient length
      // to satisfy the `pattern` completely then use it
      // instead of `digits`.

      if (strictPattern.test(nationalNumberDummyDigits)) {
        digits = nationalNumberDummyDigits;
      }

      var numberFormat = this.getFormatFormat(format);
      var nationalPrefixIncludedInTemplate; // If a user did input a national prefix (and that's guaranteed),
      // and if a `format` does have a national prefix formatting rule,
      // then see if that national prefix formatting rule
      // prepends exactly the same national prefix the user has input.
      // If that's the case, then use the `format` with the national prefix formatting rule.
      // Otherwise, use  the `format` without the national prefix formatting rule,
      // and prepend a national prefix manually to it.

      if (format.nationalPrefixFormattingRule()) {
        if (!this.complexPrefixBeforeNationalSignificantNumber) {
          // In some countries, `national_prefix_formatting_rule` is `($1)`,
          // so it applies even if the user hasn't input a national prefix.
          // `format.usesNationalPrefix()` detects such cases.
          if (this.nationalPrefix || !this.isInternational() && !format.usesNationalPrefix()) {
            var numberFormatWithNationalPrefix = numberFormat.replace(_format___WEBPACK_IMPORTED_MODULE_5__["FIRST_GROUP_PATTERN"], format.nationalPrefixFormattingRule()); // If `national_prefix_formatting_rule` of a `format` simply prepends
            // national prefix at the start of a national (significant) number,
            // then such formatting can be used with `AsYouType` formatter.
            // There seems to be no `else` case: everywhere in metadata,
            // national prefix formatting rule is national prefix + $1,
            // or `($1)`, in which case such format isn't even considered
            // when the user has input a national prefix.

            /* istanbul ignore else */

            if (Object(_parseDigits__WEBPACK_IMPORTED_MODULE_8__["default"])(format.nationalPrefixFormattingRule()) === (this.nationalPrefix || '') + Object(_parseDigits__WEBPACK_IMPORTED_MODULE_8__["default"])('$1')) {
              numberFormat = numberFormatWithNationalPrefix;
              nationalPrefixIncludedInTemplate = true; // Replace all digits of the national prefix in the formatting template
              // with `DIGIT_PLACEHOLDER`s.

              if (this.nationalPrefix) {
                var i = this.nationalPrefix.length;

                while (i > 0) {
                  numberFormat = numberFormat.replace(/\d/, DIGIT_PLACEHOLDER);
                  i--;
                }
              }
            }
          }
        }
      } // Generate formatting template for this phone number format.


      var template = digits // Format the dummy phone number according to the format.
      .replace(new RegExp(pattern), numberFormat) // Replace each dummy digit with a DIGIT_PLACEHOLDER.
      .replace(new RegExp(DUMMY_DIGIT, 'g'), DIGIT_PLACEHOLDER); // If a prefix of a national (significant) number is not as simple
      // as just a basic national prefix, then just prepend such prefix
      // before the national (significant) number, optionally spacing
      // the two with a whitespace.

      if (!nationalPrefixIncludedInTemplate) {
        if (this.complexPrefixBeforeNationalSignificantNumber) {
          // Prepend the prefix to the template manually.
          // Using the same separator as for a national prefix (for no specific reason).
          template = repeat(DIGIT_PLACEHOLDER, this.complexPrefixBeforeNationalSignificantNumber.length) + this.getSeparatorAfterNationalPrefix(format) + template;
        } else if (this.nationalPrefix) {
          // Prepend national prefix to the template manually.
          template = repeat(DIGIT_PLACEHOLDER, this.nationalPrefix.length) + this.getSeparatorAfterNationalPrefix(format) + template;
        }
      }

      return template;
    }
  }, {
    key: "formatNextNationalNumberDigits",
    value: function formatNextNationalNumberDigits(digits) {
      var result = populateTemplateWithDigits(this.populatedNationalNumberTemplate, this.populatedNationalNumberTemplatePosition, digits);

      if (!result) {
        // Reset the format.
        this.resetFormat();
        return;
      }

      this.populatedNationalNumberTemplate = result[0];
      this.populatedNationalNumberTemplatePosition = result[1]; // Return the formatted phone number so far.

      return cutAndStripNonPairedParens(this.populatedNationalNumberTemplate, this.populatedNationalNumberTemplatePosition + 1); // The old way which was good for `input-format` but is not so good
      // for `react-phone-number-input`'s default input (`InputBasic`).
      // return closeNonPairedParens(this.populatedNationalNumberTemplate, this.populatedNationalNumberTemplatePosition + 1)
      // 	.replace(new RegExp(DIGIT_PLACEHOLDER, 'g'), ' ')
    }
  }, {
    key: "getFormatFormat",
    value: function getFormatFormat(format) {
      if (this.isInternational()) {
        return Object(_format___WEBPACK_IMPORTED_MODULE_5__["applyInternationalSeparatorStyle"])(format.internationalFormat());
      } // Sometimes, national formatting rule contains additional digits
      // that are inserted in a phone number, and "as you type" formatter can't do that.


      if (ELIGIBLE_FORMAT_PATTERN.test(format.format())) {
        return format.format();
      }

      return format.internationalFormat();
    } // Determines the country of the phone number
    // entered so far based on the country phone code
    // and the national phone number.

  }, {
    key: "determineTheCountry",
    value: function determineTheCountry() {
      this.country = Object(_parse___WEBPACK_IMPORTED_MODULE_4__["findCountryCode"])(this.isInternational() ? this.countryCallingCode : this.defaultCallingCode, this.nationalSignificantNumber, this.metadata);
    }
    /**
     * Returns an instance of `PhoneNumber` class.
     * Will return `undefined` if no national (significant) number
     * digits have been entered so far, or if no `defaultCountry` has been
     * set and the user enters a phone number not in international format.
     */

  }, {
    key: "getNumber",
    value: function getNumber() {
      if (this.isInternational()) {
        if (!this.countryCallingCode) {
          return;
        }
      } else {
        if (!this.country && !this.defaultCallingCode) {
          return;
        }
      }

      if (!this.nationalSignificantNumber) {
        return undefined;
      }

      var countryCode = this.getCountry();
      var callingCode = this.getCountryCallingCode() || this.defaultCallingCode;
      var nationalNumber = this.nationalSignificantNumber;
      var carrierCode = this.carrierCode; // Google's AsYouType formatter supports sort of an "autocorrection" feature
      // when it "autocorrects" numbers that have been input for a country
      // with that country's calling code.
      // Such "autocorrection" feature looks weird, but different people have been requesting it:
      // https://github.com/catamphetamine/libphonenumber-js/issues/376
      // https://github.com/catamphetamine/libphonenumber-js/issues/375
      // https://github.com/catamphetamine/libphonenumber-js/issues/316

      if (!this.isInternational() && this.nationalSignificantNumber === this.digits) {
        var _extractCountryCallin2 = Object(_parse___WEBPACK_IMPORTED_MODULE_4__["extractCountryCallingCodeFromInternationalNumberWithoutPlusSign"])(this.digits, countryCode, callingCode, this.metadata.metadata),
            countryCallingCode = _extractCountryCallin2.countryCallingCode,
            number = _extractCountryCallin2.number;

        if (countryCallingCode) {
          var _extractNationalNumbe3 = Object(_parse___WEBPACK_IMPORTED_MODULE_4__["extractNationalNumber"])(number, this.metadata),
              newNationalNumber = _extractNationalNumbe3.nationalNumber,
              newCarrierCode = _extractNationalNumbe3.carrierCode;

          nationalNumber = newNationalNumber;
          carrierCode = newCarrierCode;
        }
      }

      var phoneNumber = new _PhoneNumber__WEBPACK_IMPORTED_MODULE_1__["default"](countryCode || callingCode, nationalNumber, this.metadata.metadata);

      if (carrierCode) {
        phoneNumber.carrierCode = carrierCode;
      } // Phone number extensions are not supported by "As You Type" formatter.


      return phoneNumber;
    }
    /**
     * Returns `true` if the phone number is "possible".
     * Is just a shortcut for `PhoneNumber.isPossible()`.
     * @return {boolean}
     */

  }, {
    key: "isPossible",
    value: function isPossible() {
      var phoneNumber = this.getNumber();

      if (!phoneNumber) {
        return false;
      }

      return phoneNumber.isPossible();
    }
    /**
     * Returns `true` if the phone number is "valid".
     * Is just a shortcut for `PhoneNumber.isValid()`.
     * @return {boolean}
     */

  }, {
    key: "isValid",
    value: function isValid() {
      var phoneNumber = this.getNumber();

      if (!phoneNumber) {
        return false;
      }

      return phoneNumber.isValid();
    }
    /**
     * @deprecated
     * This method is used in `react-phone-number-input/source/input-control.js`
     * in versions before `3.0.16`.
     */

  }, {
    key: "getNationalNumber",
    value: function getNationalNumber() {
      return this.nationalSignificantNumber;
    }
  }, {
    key: "getNonFormattedTemplate",
    value: function getNonFormattedTemplate() {
      return this.getNonFormattedNumber().replace(/[\+\d]/g, DIGIT_PLACEHOLDER);
    }
    /**
     * Returns the template for the formatted phone number.
     * @return {string} [template]
     */

  }, {
    key: "getTemplate",
    value: function getTemplate() {
      if (!this.template) {
        return this.getNonFormattedTemplate();
      } // `this.template` holds the template for a "complete" phone number.
      // The currently entered phone number is most likely not "complete",
      // so trim all non-populated digits.


      var index = -1;
      var i = 0;

      while (i < (this.isInternational() ? this.getInternationalPrefixBeforeCountryCallingCode({
        spacing: false
      }).length : 0) + this.getDigitsWithoutInternationalPrefix().length) {
        index = this.template.indexOf(DIGIT_PLACEHOLDER, index + 1);
        i++;
      }

      return cutAndStripNonPairedParens(this.template, index + 1);
    }
  }]);

  return AsYouType;
}();


function stripNonPairedParens(string) {
  var dangling_braces = [];
  var i = 0;

  while (i < string.length) {
    if (string[i] === '(') {
      dangling_braces.push(i);
    } else if (string[i] === ')') {
      dangling_braces.pop();
    }

    i++;
  }

  var start = 0;
  var cleared_string = '';
  dangling_braces.push(string.length);

  for (var _i4 = 0, _dangling_braces = dangling_braces; _i4 < _dangling_braces.length; _i4++) {
    var index = _dangling_braces[_i4];
    cleared_string += string.slice(start, index);
    start = index + 1;
  }

  return cleared_string;
}
function cutAndStripNonPairedParens(string, cutBeforeIndex) {
  if (string[cutBeforeIndex] === ')') {
    cutBeforeIndex++;
  }

  return stripNonPairedParens(string.slice(0, cutBeforeIndex));
}
function closeNonPairedParens(template, cut_before) {
  var retained_template = template.slice(0, cut_before);
  var opening_braces = countOccurences('(', retained_template);
  var closing_braces = countOccurences(')', retained_template);
  var dangling_braces = opening_braces - closing_braces;

  while (dangling_braces > 0 && cut_before < template.length) {
    if (template[cut_before] === ')') {
      dangling_braces--;
    }

    cut_before++;
  }

  return template.slice(0, cut_before);
} // Counts all occurences of a symbol in a string.
// Unicode-unsafe (because using `.split()`).

function countOccurences(symbol, string) {
  var count = 0; // Using `.split('')` to iterate through a string here
  // to avoid requiring `Symbol.iterator` polyfill.
  // `.split('')` is generally not safe for Unicode,
  // but in this particular case for counting brackets it is safe.
  // for (const character of string)

  for (var _iterator3 = string.split(''), _isArray3 = Array.isArray(_iterator3), _i5 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
    var _ref3;

    if (_isArray3) {
      if (_i5 >= _iterator3.length) break;
      _ref3 = _iterator3[_i5++];
    } else {
      _i5 = _iterator3.next();
      if (_i5.done) break;
      _ref3 = _i5.value;
    }

    var character = _ref3;

    if (character === symbol) {
      count++;
    }
  }

  return count;
} // Repeats a string (or a symbol) N times.
// http://stackoverflow.com/questions/202605/repeat-string-javascript

function repeat(string, times) {
  if (times < 1) {
    return '';
  }

  var result = '';

  while (times > 1) {
    if (times & 1) {
      result += string;
    }

    times >>= 1;
    string += string;
  }

  return result + string;
}
/**
 * Extracts formatted phone number from text (if there's any).
 * @param  {string} text
 * @return {string} [formattedPhoneNumber]
 */

function extractFormattedPhoneNumber(text) {
  // Attempt to extract a possible number from the string passed in.
  var startsAt = text.search(VALID_PHONE_NUMBER);

  if (startsAt < 0) {
    return;
  } // Trim everything to the left of the phone number.


  text = text.slice(startsAt); // Trim the `+`.

  var hasPlus;

  if (text[0] === '+') {
    hasPlus = true;
    text = text.slice('+'.length);
  } // Trim everything to the right of the phone number.


  text = text.replace(AFTER_PHONE_NUMBER_DIGITS_END_PATTERN, ''); // Re-add the previously trimmed `+`.

  if (hasPlus) {
    text = '+' + text;
  }

  return text;
}

function populateTemplateWithDigits(template, position, digits) {
  // Using `.split('')` to iterate through a string here
  // to avoid requiring `Symbol.iterator` polyfill.
  // `.split('')` is generally not safe for Unicode,
  // but in this particular case for `digits` it is safe.
  // for (const digit of digits)
  for (var _iterator4 = digits.split(''), _isArray4 = Array.isArray(_iterator4), _i6 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
    var _ref4;

    if (_isArray4) {
      if (_i6 >= _iterator4.length) break;
      _ref4 = _iterator4[_i6++];
    } else {
      _i6 = _iterator4.next();
      if (_i6.done) break;
      _ref4 = _i6.value;
    }

    var digit = _ref4;

    // If there is room for more digits in current `template`,
    // then set the next digit in the `template`,
    // and return the formatted digits so far.
    // If more digits are entered than the current format could handle.
    if (template.slice(position + 1).search(DIGIT_PLACEHOLDER_MATCHER) < 0) {
      return;
    }

    position = template.search(DIGIT_PLACEHOLDER_MATCHER);
    template = template.replace(DIGIT_PLACEHOLDER_MATCHER, digit);
  }

  return [template, position];
}
//# sourceMappingURL=AsYouType.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/IDD.js":
/*!***************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/IDD.js ***!
  \***************************************************/
/*! exports provided: getIDDPrefix, stripIDDPrefix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIDDPrefix", function() { return getIDDPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripIDDPrefix", function() { return stripIDDPrefix; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./node_modules/libphonenumber-js/es6/constants.js");


var CAPTURING_DIGIT_PATTERN = new RegExp('([' + _constants__WEBPACK_IMPORTED_MODULE_1__["VALID_DIGITS"] + '])');
/**
 * Pattern that makes it easy to distinguish whether a region has a single
 * international dialing prefix or not. If a region has a single international
 * prefix (e.g. 011 in USA), it will be represented as a string that contains
 * a sequence of ASCII digits, and possibly a tilde, which signals waiting for
 * the tone. If there are multiple available international prefixes in a
 * region, they will be represented as a regex string that always contains one
 * or more characters that are not ASCII digits or a tilde.
 */

var SINGLE_IDD_PREFIX = /^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/; // For regions that have multiple IDD prefixes
// a preferred IDD prefix is returned.

function getIDDPrefix(country, callingCode, metadata) {
  var countryMetadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](metadata);
  countryMetadata.selectNumberingPlan(country, callingCode);

  if (SINGLE_IDD_PREFIX.test(countryMetadata.IDDPrefix())) {
    return countryMetadata.IDDPrefix();
  }

  return countryMetadata.defaultIDDPrefix();
}
function stripIDDPrefix(number, country, callingCode, metadata) {
  if (!country) {
    return;
  } // Check if the number is IDD-prefixed.


  var countryMetadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](metadata);
  countryMetadata.selectNumberingPlan(country, callingCode);
  var IDDPrefixPattern = new RegExp(countryMetadata.IDDPrefix());

  if (number.search(IDDPrefixPattern) !== 0) {
    return;
  } // Strip IDD prefix.


  number = number.slice(number.match(IDDPrefixPattern)[0].length); // If there're any digits after an IDD prefix,
  // then those digits are a country calling code.
  // Since no country code starts with a `0`,
  // the code below validates that the next digit (if present) is not `0`.

  var matchedGroups = number.match(CAPTURING_DIGIT_PATTERN);

  if (matchedGroups && matchedGroups[1] != null && matchedGroups[1].length > 0) {
    if (matchedGroups[1] === '0') {
      return;
    }
  }

  return number;
}
//# sourceMappingURL=IDD.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/ParseError.js":
/*!**********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/ParseError.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ParseError; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// https://stackoverflow.com/a/46971044/970769
var ParseError = function ParseError(code) {
  _classCallCheck(this, ParseError);

  this.name = this.constructor.name;
  this.message = code;
  this.stack = new Error(code).stack;
};


ParseError.prototype = Object.create(Error.prototype);
ParseError.prototype.constructor = ParseError;
//# sourceMappingURL=ParseError.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/PhoneNumber.js":
/*!***********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/PhoneNumber.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhoneNumber; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _isPossibleNumber___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isPossibleNumber_ */ "./node_modules/libphonenumber-js/es6/isPossibleNumber_.js");
/* harmony import */ var _validate___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validate_ */ "./node_modules/libphonenumber-js/es6/validate_.js");
/* harmony import */ var _isValidNumberForRegion___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isValidNumberForRegion_ */ "./node_modules/libphonenumber-js/es6/isValidNumberForRegion_.js");
/* harmony import */ var _getNumberType___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNumberType_ */ "./node_modules/libphonenumber-js/es6/getNumberType_.js");
/* harmony import */ var _format___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./format_ */ "./node_modules/libphonenumber-js/es6/format_.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var USE_NON_GEOGRAPHIC_COUNTRY_CODE = false;

var PhoneNumber =
/*#__PURE__*/
function () {
  function PhoneNumber(countryCallingCode, nationalNumber, metadata) {
    _classCallCheck(this, PhoneNumber);

    if (!countryCallingCode) {
      throw new TypeError('`country` or `countryCallingCode` not passed');
    }

    if (!nationalNumber) {
      throw new TypeError('`nationalNumber` not passed');
    }

    var _metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](metadata); // If country code is passed then derive `countryCallingCode` from it.
    // Also store the country code as `.country`.


    if (isCountryCode(countryCallingCode)) {
      this.country = countryCallingCode;

      _metadata.country(countryCallingCode);

      countryCallingCode = _metadata.countryCallingCode();
    } else {
      /* istanbul ignore if */
      if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
        if (_metadata.isNonGeographicCallingCode(countryCallingCode)) {
          this.country = '001';
        }
      }
    }

    this.countryCallingCode = countryCallingCode;
    this.nationalNumber = nationalNumber;
    this.number = '+' + this.countryCallingCode + this.nationalNumber;
    this.metadata = metadata;
  }

  _createClass(PhoneNumber, [{
    key: "isPossible",
    value: function isPossible() {
      return Object(_isPossibleNumber___WEBPACK_IMPORTED_MODULE_1__["default"])(this, {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return Object(_validate___WEBPACK_IMPORTED_MODULE_2__["default"])(this, {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "isNonGeographic",
    value: function isNonGeographic() {
      var metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](this.metadata);
      return metadata.isNonGeographicCallingCode(this.countryCallingCode);
    }
  }, {
    key: "isEqual",
    value: function isEqual(phoneNumber) {
      return this.number === phoneNumber.number && this.ext === phoneNumber.ext;
    } // // Is just an alias for `this.isValid() && this.country === country`.
    // // https://github.com/googlei18n/libphonenumber/blob/master/FAQ.md#when-should-i-use-isvalidnumberforregion
    // isValidForRegion(country) {
    // 	return isValidNumberForRegion(this, country, { v2: true }, this.metadata)
    // }

  }, {
    key: "getType",
    value: function getType() {
      return Object(_getNumberType___WEBPACK_IMPORTED_MODULE_4__["default"])(this, {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "format",
    value: function format(_format, options) {
      return Object(_format___WEBPACK_IMPORTED_MODULE_5__["default"])(this, _format, options ? _objectSpread({}, options, {
        v2: true
      }) : {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "formatNational",
    value: function formatNational(options) {
      return this.format('NATIONAL', options);
    }
  }, {
    key: "formatInternational",
    value: function formatInternational(options) {
      return this.format('INTERNATIONAL', options);
    }
  }, {
    key: "getURI",
    value: function getURI(options) {
      return this.format('RFC3966', options);
    }
  }]);

  return PhoneNumber;
}();



var isCountryCode = function isCountryCode(value) {
  return /^[A-Z]{2}$/.test(value);
};
//# sourceMappingURL=PhoneNumber.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/PhoneNumberMatcher.js":
/*!******************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/PhoneNumberMatcher.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhoneNumberMatcher; });
/* harmony import */ var _PhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhoneNumber */ "./node_modules/libphonenumber-js/es6/PhoneNumber.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./node_modules/libphonenumber-js/es6/constants.js");
/* harmony import */ var _extension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extension */ "./node_modules/libphonenumber-js/es6/extension.js");
/* harmony import */ var _findNumbers_RegExpCache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./findNumbers/RegExpCache */ "./node_modules/libphonenumber-js/es6/findNumbers/RegExpCache.js");
/* harmony import */ var _findNumbers_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./findNumbers/util */ "./node_modules/libphonenumber-js/es6/findNumbers/util.js");
/* harmony import */ var _findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./findNumbers/utf-8 */ "./node_modules/libphonenumber-js/es6/findNumbers/utf-8.js");
/* harmony import */ var _findNumbers_Leniency__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./findNumbers/Leniency */ "./node_modules/libphonenumber-js/es6/findNumbers/Leniency.js");
/* harmony import */ var _findNumbers_parsePreCandidate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./findNumbers/parsePreCandidate */ "./node_modules/libphonenumber-js/es6/findNumbers/parsePreCandidate.js");
/* harmony import */ var _findNumbers_isValidPreCandidate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./findNumbers/isValidPreCandidate */ "./node_modules/libphonenumber-js/es6/findNumbers/isValidPreCandidate.js");
/* harmony import */ var _findNumbers_isValidCandidate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./findNumbers/isValidCandidate */ "./node_modules/libphonenumber-js/es6/findNumbers/isValidCandidate.js");
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./parse_ */ "./node_modules/libphonenumber-js/es6/parse_.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A port of Google's `PhoneNumberMatcher.java`.
 * https://github.com/googlei18n/libphonenumber/blob/master/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberMatcher.java
 * Date: 08.03.2018.
 */












/**
 * Patterns used to extract phone numbers from a larger phone-number-like pattern. These are
 * ordered according to specificity. For example, white-space is last since that is frequently
 * used in numbers, not just to separate two numbers. We have separate patterns since we don't
 * want to break up the phone-number-like text on more than one different kind of symbol at one
 * time, although symbols of the same type (e.g. space) can be safely grouped together.
 *
 * Note that if there is a match, we will always check any text found up to the first match as
 * well.
 */

var INNER_MATCHES = [// Breaks on the slash - e.g. "651-234-2345/332-445-1234"
'\\/+(.*)/', // Note that the bracket here is inside the capturing group, since we consider it part of the
// phone number. Will match a pattern like "(650) 223 3345 (754) 223 3321".
'(\\([^(]*)', // Breaks on a hyphen - e.g. "12345 - 332-445-1234 is my number."
// We require a space on either side of the hyphen for it to be considered a separator.
"(?:".concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__["pZ"], "-|-").concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__["pZ"], ")").concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__["pZ"], "*(.+)"), // Various types of wide hyphens. Note we have decided not to enforce a space here, since it's
// possible that it's supposed to be used to break two numbers without spaces, and we haven't
// seen many instances of it used within a number.
"[\u2012-\u2015\uFF0D]".concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__["pZ"], "*(.+)"), // Breaks on a full stop - e.g. "12345. 332-445-1234 is my number."
"\\.+".concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__["pZ"], "*([^.]+)"), // Breaks on space - e.g. "3324451234 8002341234"
"".concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__["pZ"], "+(").concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__["PZ"], "+)")]; // Limit on the number of leading (plus) characters.

var leadLimit = Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_4__["limit"])(0, 2); // Limit on the number of consecutive punctuation characters.

var punctuationLimit = Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_4__["limit"])(0, 4);
/* The maximum number of digits allowed in a digit-separated block. As we allow all digits in a
 * single block, set high enough to accommodate the entire national number and the international
 * country code. */

var digitBlockLimit = _constants__WEBPACK_IMPORTED_MODULE_1__["MAX_LENGTH_FOR_NSN"] + _constants__WEBPACK_IMPORTED_MODULE_1__["MAX_LENGTH_COUNTRY_CODE"]; // Limit on the number of blocks separated by punctuation.
// Uses digitBlockLimit since some formats use spaces to separate each digit.

var blockLimit = Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_4__["limit"])(0, digitBlockLimit);
/* A punctuation sequence allowing white space. */

var punctuation = "[".concat(_constants__WEBPACK_IMPORTED_MODULE_1__["VALID_PUNCTUATION"], "]") + punctuationLimit; // A digits block without punctuation.

var digitSequence = _findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__["pNd"] + Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_4__["limit"])(1, digitBlockLimit);
/**
 * Phone number pattern allowing optional punctuation.
 * The phone number pattern used by `find()`, similar to
 * VALID_PHONE_NUMBER, but with the following differences:
 * <ul>
 *   <li>All captures are limited in order to place an upper bound to the text matched by the
 *       pattern.
 * <ul>
 *   <li>Leading punctuation / plus signs are limited.
 *   <li>Consecutive occurrences of punctuation are limited.
 *   <li>Number of digits is limited.
 * </ul>
 *   <li>No whitespace is allowed at the start or end.
 *   <li>No alpha digits (vanity numbers such as 1-800-SIX-FLAGS) are currently supported.
 * </ul>
 */

var PATTERN = '(?:' + _findNumbers_isValidCandidate__WEBPACK_IMPORTED_MODULE_9__["LEAD_CLASS"] + punctuation + ')' + leadLimit + digitSequence + '(?:' + punctuation + digitSequence + ')' + blockLimit + '(?:' + _extension__WEBPACK_IMPORTED_MODULE_2__["EXTN_PATTERNS_FOR_MATCHING"] + ')?'; // Regular expression of trailing characters that we want to remove.
// We remove all characters that are not alpha or numerical characters.
// The hash character is retained here, as it may signify
// the previous block was an extension.
//
// // Don't know what does '&&' mean here.
// const UNWANTED_END_CHAR_PATTERN = new RegExp(`[[\\P{N}&&\\P{L}]&&[^#]]+$`)
//

var UNWANTED_END_CHAR_PATTERN = new RegExp("[^".concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__["_pN"]).concat(_findNumbers_utf_8__WEBPACK_IMPORTED_MODULE_5__["_pL"], "#]+$"));
var NON_DIGITS_PATTERN = /(\D+)/;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
/**
 * A stateful class that finds and extracts telephone numbers from {@linkplain CharSequence text}.
 * Instances can be created using the {@linkplain PhoneNumberUtil#findNumbers factory methods} in
 * {@link PhoneNumberUtil}.
 *
 * <p>Vanity numbers (phone numbers using alphabetic digits such as <tt>1-800-SIX-FLAGS</tt> are
 * not found.
 *
 * <p>This class is not thread-safe.
 */

var PhoneNumberMatcher =
/*#__PURE__*/
function () {
  /** The iteration tristate. */

  /** The next index to start searching at. Undefined in {@link State#DONE}. */
  // A cache for frequently used country-specific regular expressions. Set to 32 to cover ~2-3
  // countries being used for the same doc with ~10 patterns for each country. Some pages will have
  // a lot more countries in use, but typically fewer numbers for each so expanding the cache for
  // that use-case won't have a lot of benefit.

  /**
   * Creates a new instance. See the factory methods in {@link PhoneNumberUtil} on how to obtain a
   * new instance.
   *
   * @param util  the phone number util to use
   * @param text  the character sequence that we will search, null for no text
   * @param country  the country to assume for phone numbers not written in international format
   *     (with a leading plus, or with the international dialing prefix of the specified region).
   *     May be null or "ZZ" if only numbers with a leading plus should be
   *     considered.
   * @param leniency  the leniency to use when evaluating candidate phone numbers
   * @param maxTries  the maximum number of invalid numbers to try before giving up on the text.
   *     This is to cover degenerate cases where the text has a lot of false positives in it. Must
   *     be {@code >= 0}.
   */
  function PhoneNumberMatcher() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var metadata = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, PhoneNumberMatcher);

    _defineProperty(this, "state", 'NOT_READY');

    _defineProperty(this, "searchIndex", 0);

    _defineProperty(this, "regExpCache", new _findNumbers_RegExpCache__WEBPACK_IMPORTED_MODULE_3__["default"](32));

    options = _objectSpread({}, options, {
      defaultCallingCode: options.defaultCallingCode,
      defaultCountry: options.defaultCountry && Object(_metadata__WEBPACK_IMPORTED_MODULE_10__["isSupportedCountry"])(options.defaultCountry, metadata) ? options.defaultCountry : undefined,
      leniency: options.leniency || options.extended ? 'POSSIBLE' : 'VALID',
      maxTries: options.maxTries || MAX_SAFE_INTEGER
    });

    if (!options.leniency) {
      throw new TypeError('`Leniency` not supplied');
    }

    if (options.maxTries < 0) {
      throw new TypeError('`maxTries` not supplied');
    }

    this.text = text;
    this.options = options;
    this.metadata = metadata;
    /** The degree of validation requested. */

    this.leniency = _findNumbers_Leniency__WEBPACK_IMPORTED_MODULE_6__["default"][options.leniency];

    if (!this.leniency) {
      throw new TypeError("Unknown leniency: ".concat(options.leniency, "."));
    }
    /** The maximum number of retries after matching an invalid number. */


    this.maxTries = options.maxTries;
    this.PATTERN = new RegExp(PATTERN, 'ig');
  }
  /**
   * Attempts to find the next subsequence in the searched sequence on or after {@code searchIndex}
   * that represents a phone number. Returns the next match, null if none was found.
   *
   * @param index  the search index to start searching at
   * @return  the phone number match found, null if none can be found
   */


  _createClass(PhoneNumberMatcher, [{
    key: "find",
    value: function find() // (index)
    {
      // // Reset the regular expression.
      // this.PATTERN.lastIndex = index
      var matches;

      while (this.maxTries > 0 && (matches = this.PATTERN.exec(this.text)) !== null) {
        var candidate = matches[0];
        var offset = matches.index;
        candidate = Object(_findNumbers_parsePreCandidate__WEBPACK_IMPORTED_MODULE_7__["default"])(candidate);

        if (Object(_findNumbers_isValidPreCandidate__WEBPACK_IMPORTED_MODULE_8__["default"])(candidate, offset, this.text)) {
          var match = // Try to come up with a valid match given the entire candidate.
          this.parseAndVerify(candidate, offset, this.text) // If that failed, try to find an "inner match" -
          // there might be a phone number within this candidate.
          || this.extractInnerMatch(candidate, offset, this.text);

          if (match) {
            if (this.options.v2) {
              var phoneNumber = new _PhoneNumber__WEBPACK_IMPORTED_MODULE_0__["default"](match.country || match.countryCallingCode, match.phone, this.metadata);

              if (match.ext) {
                phoneNumber.ext = match.ext;
              }

              return {
                startsAt: match.startsAt,
                endsAt: match.endsAt,
                number: phoneNumber
              };
            }

            return match;
          }
        }

        this.maxTries--;
      }
    }
    /**
     * Attempts to extract a match from `candidate`
     * if the whole candidate does not qualify as a match.
     */

  }, {
    key: "extractInnerMatch",
    value: function extractInnerMatch(candidate, offset, text) {
      for (var _i = 0, _INNER_MATCHES = INNER_MATCHES; _i < _INNER_MATCHES.length; _i++) {
        var innerMatchPattern = _INNER_MATCHES[_i];
        var isFirstMatch = true;
        var matches = void 0;
        var possibleInnerMatch = new RegExp(innerMatchPattern, 'g');

        while ((matches = possibleInnerMatch.exec(candidate)) !== null && this.maxTries > 0) {
          if (isFirstMatch) {
            // We should handle any group before this one too.
            var _group = Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_4__["trimAfterFirstMatch"])(UNWANTED_END_CHAR_PATTERN, candidate.slice(0, matches.index));

            var _match = this.parseAndVerify(_group, offset, text);

            if (_match) {
              return _match;
            }

            this.maxTries--;
            isFirstMatch = false;
          }

          var group = Object(_findNumbers_util__WEBPACK_IMPORTED_MODULE_4__["trimAfterFirstMatch"])(UNWANTED_END_CHAR_PATTERN, matches[1]); // Java code does `groupMatcher.start(1)` here,
          // but there's no way in javascript to get a group match start index,
          // therefore using the overall match start index `matches.index`.

          var match = this.parseAndVerify(group, offset + matches.index, text);

          if (match) {
            return match;
          }

          this.maxTries--;
        }
      }
    }
    /**
     * Parses a phone number from the `candidate` using `parseNumber` and
     * verifies it matches the requested `leniency`. If parsing and verification succeed,
     * a corresponding `PhoneNumberMatch` is returned, otherwise this method returns `null`.
     *
     * @param candidate  the candidate match
     * @param offset  the offset of {@code candidate} within {@link #text}
     * @return  the parsed and validated phone number match, or null
     */

  }, {
    key: "parseAndVerify",
    value: function parseAndVerify(candidate, offset, text) {
      if (!Object(_findNumbers_isValidCandidate__WEBPACK_IMPORTED_MODULE_9__["default"])(candidate, offset, text, this.options.leniency)) {
        return;
      }

      var number = Object(_parse___WEBPACK_IMPORTED_MODULE_11__["default"])(candidate, {
        extended: true,
        defaultCountry: this.options.defaultCountry,
        defaultCallingCode: this.options.defaultCallingCode
      }, this.metadata);

      if (!number.possible) {
        return;
      }

      if (this.leniency(number, candidate, this.metadata, this.regExpCache)) {
        // // We used parseAndKeepRawInput to create this number,
        // // but for now we don't return the extra values parsed.
        // // TODO: stop clearing all values here and switch all users over
        // // to using rawInput() rather than the rawString() of PhoneNumberMatch.
        // number.clearCountryCodeSource()
        // number.clearRawInput()
        // number.clearPreferredDomesticCarrierCode()
        var result = {
          startsAt: offset,
          endsAt: offset + candidate.length,
          phone: number.phone
        };

        if (number.country && number.country !== '001') {
          result.country = number.country;
        } else {
          result.countryCallingCode = number.countryCallingCode;
        }

        if (number.ext) {
          result.ext = number.ext;
        }

        return result;
      }
    }
  }, {
    key: "hasNext",
    value: function hasNext() {
      if (this.state === 'NOT_READY') {
        this.lastMatch = this.find(); // (this.searchIndex)

        if (this.lastMatch) {
          // this.searchIndex = this.lastMatch.endsAt
          this.state = 'READY';
        } else {
          this.state = 'DONE';
        }
      }

      return this.state === 'READY';
    }
  }, {
    key: "next",
    value: function next() {
      // Check the state and find the next match as a side-effect if necessary.
      if (!this.hasNext()) {
        throw new Error('No next element');
      } // Don't retain that memory any longer than necessary.


      var result = this.lastMatch;
      this.lastMatch = null;
      this.state = 'NOT_READY';
      return result;
    }
  }]);

  return PhoneNumberMatcher;
}();


//# sourceMappingURL=PhoneNumberMatcher.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/RFC3966.js":
/*!*******************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/RFC3966.js ***!
  \*******************************************************/
/*! exports provided: parseRFC3966, formatRFC3966 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseRFC3966", function() { return parseRFC3966; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatRFC3966", function() { return formatRFC3966; });
/* harmony import */ var _isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isViablePhoneNumber */ "./node_modules/libphonenumber-js/es6/isViablePhoneNumber.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

 // https://www.ietf.org/rfc/rfc3966.txt

/**
 * @param  {string} text - Phone URI (RFC 3966).
 * @return {object} `{ ?number, ?ext }`.
 */

function parseRFC3966(text) {
  var number;
  var ext; // Replace "tel:" with "tel=" for parsing convenience.

  text = text.replace(/^tel:/, 'tel=');

  for (var _iterator = text.split(';'), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var part = _ref;

    var _part$split = part.split('='),
        _part$split2 = _slicedToArray(_part$split, 2),
        name = _part$split2[0],
        value = _part$split2[1];

    switch (name) {
      case 'tel':
        number = value;
        break;

      case 'ext':
        ext = value;
        break;

      case 'phone-context':
        // Only "country contexts" are supported.
        // "Domain contexts" are ignored.
        if (value[0] === '+') {
          number = value + number;
        }

        break;
    }
  } // If the phone number is not viable, then abort.


  if (!Object(_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(number)) {
    return {};
  }

  var result = {
    number: number
  };

  if (ext) {
    result.ext = ext;
  }

  return result;
}
/**
 * @param  {object} - `{ ?number, ?extension }`.
 * @return {string} Phone URI (RFC 3966).
 */

function formatRFC3966(_ref2) {
  var number = _ref2.number,
      ext = _ref2.ext;

  if (!number) {
    return '';
  }

  if (number[0] !== '+') {
    throw new Error("\"formatRFC3966()\" expects \"number\" to be in E.164 format.");
  }

  return "tel:".concat(number).concat(ext ? ';ext=' + ext : '');
}
//# sourceMappingURL=RFC3966.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/checkNumberLength.js":
/*!*****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/checkNumberLength.js ***!
  \*****************************************************************/
/*! exports provided: default, checkNumberLengthForType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return checkNumberLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkNumberLengthForType", function() { return checkNumberLengthForType; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./node_modules/libphonenumber-js/es6/util.js");

function checkNumberLength(nationalNumber, metadata) {
  return checkNumberLengthForType(nationalNumber, undefined, metadata);
} // Checks whether a number is possible for the country based on its length.
// Should only be called for the "new" metadata which has "possible lengths".

function checkNumberLengthForType(nationalNumber, type, metadata) {
  var type_info = metadata.type(type); // There should always be "<possiblePengths/>" set for every type element.
  // This is declared in the XML schema.
  // For size efficiency, where a sub-description (e.g. fixed-line)
  // has the same "<possiblePengths/>" as the "general description", this is missing,
  // so we fall back to the "general description". Where no numbers of the type
  // exist at all, there is one possible length (-1) which is guaranteed
  // not to match the length of any real phone number.

  var possible_lengths = type_info && type_info.possibleLengths() || metadata.possibleLengths(); // let local_lengths    = type_info && type.possibleLengthsLocal() || metadata.possibleLengthsLocal()
  // Metadata before version `1.0.18` didn't contain `possible_lengths`.

  if (!possible_lengths) {
    return 'IS_POSSIBLE';
  }

  if (type === 'FIXED_LINE_OR_MOBILE') {
    // No such country in metadata.

    /* istanbul ignore next */
    if (!metadata.type('FIXED_LINE')) {
      // The rare case has been encountered where no fixedLine data is available
      // (true for some non-geographic entities), so we just check mobile.
      return checkNumberLengthForType(nationalNumber, 'MOBILE', metadata);
    }

    var mobile_type = metadata.type('MOBILE');

    if (mobile_type) {
      // Merge the mobile data in if there was any. "Concat" creates a new
      // array, it doesn't edit possible_lengths in place, so we don't need a copy.
      // Note that when adding the possible lengths from mobile, we have
      // to again check they aren't empty since if they are this indicates
      // they are the same as the general desc and should be obtained from there.
      possible_lengths = Object(_util__WEBPACK_IMPORTED_MODULE_0__["mergeArrays"])(possible_lengths, mobile_type.possibleLengths()); // The current list is sorted; we need to merge in the new list and
      // re-sort (duplicates are okay). Sorting isn't so expensive because
      // the lists are very small.
      // if (local_lengths) {
      // 	local_lengths = mergeArrays(local_lengths, mobile_type.possibleLengthsLocal())
      // } else {
      // 	local_lengths = mobile_type.possibleLengthsLocal()
      // }
    }
  } // If the type doesn't exist then return 'INVALID_LENGTH'.
  else if (type && !type_info) {
      return 'INVALID_LENGTH';
    }

  var actual_length = nationalNumber.length; // In `libphonenumber-js` all "local-only" formats are dropped for simplicity.
  // // This is safe because there is never an overlap beween the possible lengths
  // // and the local-only lengths; this is checked at build time.
  // if (local_lengths && local_lengths.indexOf(nationalNumber.length) >= 0)
  // {
  // 	return 'IS_POSSIBLE_LOCAL_ONLY'
  // }

  var minimum_length = possible_lengths[0];

  if (minimum_length === actual_length) {
    return 'IS_POSSIBLE';
  }

  if (minimum_length > actual_length) {
    return 'TOO_SHORT';
  }

  if (possible_lengths[possible_lengths.length - 1] < actual_length) {
    return 'TOO_LONG';
  } // We skip the first element since we've already checked it.


  return possible_lengths.indexOf(actual_length, 1) >= 0 ? 'IS_POSSIBLE' : 'INVALID_LENGTH';
}
//# sourceMappingURL=checkNumberLength.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/constants.js":
/*!*********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/constants.js ***!
  \*********************************************************/
/*! exports provided: MIN_LENGTH_FOR_NSN, MAX_LENGTH_FOR_NSN, MAX_LENGTH_COUNTRY_CODE, VALID_DIGITS, WHITESPACE, VALID_PUNCTUATION, PLUS_CHARS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_LENGTH_FOR_NSN", function() { return MIN_LENGTH_FOR_NSN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_LENGTH_FOR_NSN", function() { return MAX_LENGTH_FOR_NSN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_LENGTH_COUNTRY_CODE", function() { return MAX_LENGTH_COUNTRY_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALID_DIGITS", function() { return VALID_DIGITS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WHITESPACE", function() { return WHITESPACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALID_PUNCTUATION", function() { return VALID_PUNCTUATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLUS_CHARS", function() { return PLUS_CHARS; });
// The minimum length of the national significant number.
var MIN_LENGTH_FOR_NSN = 2; // The ITU says the maximum length should be 15,
// but one can find longer numbers in Germany.

var MAX_LENGTH_FOR_NSN = 17; // The maximum length of the country calling code.

var MAX_LENGTH_COUNTRY_CODE = 3; // Digits accepted in phone numbers
// (ascii, fullwidth, arabic-indic, and eastern arabic digits).

var VALID_DIGITS = "0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9"; // `DASHES` will be right after the opening square bracket of the "character class"

var DASHES = "-\u2010-\u2015\u2212\u30FC\uFF0D";
var SLASHES = "\uFF0F/";
var DOTS = "\uFF0E.";
var WHITESPACE = " \xA0\xAD\u200B\u2060\u3000";
var BRACKETS = "()\uFF08\uFF09\uFF3B\uFF3D\\[\\]"; // export const OPENING_BRACKETS = '(\uFF08\uFF3B\\\['

var TILDES = "~\u2053\u223C\uFF5E"; // Regular expression of acceptable punctuation found in phone numbers. This
// excludes punctuation found as a leading character only. This consists of dash
// characters, white space characters, full stops, slashes, square brackets,
// parentheses and tildes. Full-width variants are also present.

var VALID_PUNCTUATION = "".concat(DASHES).concat(SLASHES).concat(DOTS).concat(WHITESPACE).concat(BRACKETS).concat(TILDES);
var PLUS_CHARS = "+\uFF0B"; // const LEADING_PLUS_CHARS_PATTERN = new RegExp('^[' + PLUS_CHARS + ']+')
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/extension.js":
/*!*********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/extension.js ***!
  \*********************************************************/
/*! exports provided: EXTN_PATTERNS_FOR_PARSING, EXTN_PATTERNS_FOR_MATCHING, extractExtension */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXTN_PATTERNS_FOR_PARSING", function() { return EXTN_PATTERNS_FOR_PARSING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXTN_PATTERNS_FOR_MATCHING", function() { return EXTN_PATTERNS_FOR_MATCHING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractExtension", function() { return extractExtension; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/libphonenumber-js/es6/constants.js");
 // The RFC 3966 format for extensions.

var RFC3966_EXTN_PREFIX = ';ext='; // Pattern to capture digits used in an extension.
// Places a maximum length of '7' for an extension.

var CAPTURING_EXTN_DIGITS = '([' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']{1,7})';
/**
 * Regexp of all possible ways to write extensions, for use when parsing. This
 * will be run as a case-insensitive regexp match. Wide character versions are
 * also provided after each ASCII version. There are three regular expressions
 * here. The first covers RFC 3966 format, where the extension is added using
 * ';ext='. The second more generic one starts with optional white space and
 * ends with an optional full stop (.), followed by zero or more spaces/tabs
 * /commas and then the numbers themselves. The other one covers the special
 * case of American numbers where the extension is written with a hash at the
 * end, such as '- 503#'. Note that the only capturing groups should be around
 * the digits that you want to capture as part of the extension, or else parsing
 * will fail! We allow two options for representing the accented o - the
 * character itself, and one in the unicode decomposed form with the combining
 * acute accent.
 */

function create_extension_pattern(purpose) {
  // One-character symbols that can be used to indicate an extension.
  var single_extension_characters = "x\uFF58#\uFF03~\uFF5E";

  switch (purpose) {
    // For parsing, we are slightly more lenient in our interpretation than for matching. Here we
    // allow "comma" and "semicolon" as possible extension indicators. When matching, these are
    case 'parsing':
      single_extension_characters = ',;' + single_extension_characters;
  }

  return RFC3966_EXTN_PREFIX + CAPTURING_EXTN_DIGITS + '|' + "[ \xA0\\t,]*" + "(?:e?xt(?:ensi(?:o\u0301?|\xF3))?n?|\uFF45?\uFF58\uFF54\uFF4E?|" + // "доб."
  "\u0434\u043E\u0431|" + '[' + single_extension_characters + "]|int|anexo|\uFF49\uFF4E\uFF54)" + "[:\\.\uFF0E]?[ \xA0\\t,-]*" + CAPTURING_EXTN_DIGITS + '#?|' + '[- ]+([' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']{1,5})#';
}
/**
 * Regexp of all possible ways to write extensions, for use when parsing. This
 * will be run as a case-insensitive regexp match. Wide character versions are
 * also provided after each ASCII version. There are three regular expressions
 * here. The first covers RFC 3966 format, where the extension is added using
 * ';ext='. The second more generic one starts with optional white space and
 * ends with an optional full stop (.), followed by zero or more spaces/tabs
 * /commas and then the numbers themselves. The other one covers the special
 * case of American numbers where the extension is written with a hash at the
 * end, such as '- 503#'. Note that the only capturing groups should be around
 * the digits that you want to capture as part of the extension, or else parsing
 * will fail! We allow two options for representing the accented o - the
 * character itself, and one in the unicode decomposed form with the combining
 * acute accent.
 */


var EXTN_PATTERNS_FOR_PARSING = create_extension_pattern('parsing');
var EXTN_PATTERNS_FOR_MATCHING = create_extension_pattern('matching'); // Regexp of all known extension prefixes used by different regions followed by
// 1 or more valid digits, for use when parsing.

var EXTN_PATTERN = new RegExp('(?:' + EXTN_PATTERNS_FOR_PARSING + ')$', 'i'); // Strips any extension (as in, the part of the number dialled after the call is
// connected, usually indicated with extn, ext, x or similar) from the end of
// the number, and returns it.

function extractExtension(number) {
  var start = number.search(EXTN_PATTERN);

  if (start < 0) {
    return {};
  } // If we find a potential extension, and the number preceding this is a viable
  // number, we assume it is an extension.


  var number_without_extension = number.slice(0, start);
  var matches = number.match(EXTN_PATTERN);
  var i = 1;

  while (i < matches.length) {
    if (matches[i] != null && matches[i].length > 0) {
      return {
        number: number_without_extension,
        ext: matches[i]
      };
    }

    i++;
  }
}
//# sourceMappingURL=extension.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers.js":
/*!***********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return findNumbers; });
/* harmony import */ var _findNumbers___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./findNumbers_ */ "./node_modules/libphonenumber-js/es6/findNumbers_.js");
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsePhoneNumber */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js");


function findNumbers() {
  var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__["normalizeArguments"])(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_findNumbers___WEBPACK_IMPORTED_MODULE_0__["default"])(text, options, metadata);
}
//# sourceMappingURL=findNumbers.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/LRUCache.js":
/*!********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/LRUCache.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LRUCache; });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// https://medium.com/dsinjs/implementing-lru-cache-in-javascript-94ba6755cda9
var Node = function Node(key, value) {
  var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var prev = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  _classCallCheck(this, Node);

  this.key = key;
  this.value = value;
  this.next = next;
  this.prev = prev;
};

var LRUCache =
/*#__PURE__*/
function () {
  //set default limit of 10 if limit is not passed.
  function LRUCache() {
    var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    _classCallCheck(this, LRUCache);

    this.size = 0;
    this.limit = limit;
    this.head = null;
    this.tail = null;
    this.cache = {};
  } // Write Node to head of LinkedList
  // update cache with Node key and Node reference


  _createClass(LRUCache, [{
    key: "put",
    value: function put(key, value) {
      this.ensureLimit();

      if (!this.head) {
        this.head = this.tail = new Node(key, value);
      } else {
        var node = new Node(key, value, this.head);
        this.head.prev = node;
        this.head = node;
      } //Update the cache map


      this.cache[key] = this.head;
      this.size++;
    } // Read from cache map and make that node as new Head of LinkedList

  }, {
    key: "get",
    value: function get(key) {
      if (this.cache[key]) {
        var value = this.cache[key].value; // node removed from it's position and cache

        this.remove(key); // write node again to the head of LinkedList to make it most recently used

        this.put(key, value);
        return value;
      }

      console.log("Item not available in cache for key ".concat(key));
    }
  }, {
    key: "ensureLimit",
    value: function ensureLimit() {
      if (this.size === this.limit) {
        this.remove(this.tail.key);
      }
    }
  }, {
    key: "remove",
    value: function remove(key) {
      var node = this.cache[key];

      if (node.prev !== null) {
        node.prev.next = node.next;
      } else {
        this.head = node.next;
      }

      if (node.next !== null) {
        node.next.prev = node.prev;
      } else {
        this.tail = node.prev;
      }

      delete this.cache[key];
      this.size--;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = null;
      this.tail = null;
      this.size = 0;
      this.cache = {};
    } // // Invokes the callback function with every node of the chain and the index of the node.
    // forEach(fn) {
    //   let node = this.head;
    //   let counter = 0;
    //   while (node) {
    //     fn(node, counter);
    //     node = node.next;
    //     counter++;
    //   }
    // }
    // // To iterate over LRU with a 'for...of' loop
    // *[Symbol.iterator]() {
    //   let node = this.head;
    //   while (node) {
    //     yield node;
    //     node = node.next;
    //   }
    // }

  }]);

  return LRUCache;
}();


//# sourceMappingURL=LRUCache.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/Leniency.js":
/*!********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/Leniency.js ***!
  \********************************************************************/
/*! exports provided: default, containsMoreThanOneSlashInNationalNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "containsMoreThanOneSlashInNationalNumber", function() { return containsMoreThanOneSlashInNationalNumber; });
/* harmony import */ var _validate___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validate_ */ "./node_modules/libphonenumber-js/es6/validate_.js");
/* harmony import */ var _parseDigits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parseDigits */ "./node_modules/libphonenumber-js/es6/parseDigits.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./node_modules/libphonenumber-js/es6/findNumbers/util.js");



/**
 * Leniency when finding potential phone numbers in text segments
 * The levels here are ordered in increasing strictness.
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  /**
   * Phone numbers accepted are "possible", but not necessarily "valid".
   */
  POSSIBLE: function POSSIBLE(number, candidate, metadata) {
    return true;
  },

  /**
   * Phone numbers accepted are "possible" and "valid".
   * Numbers written in national format must have their national-prefix
   * present if it is usually written for a number of this type.
   */
  VALID: function VALID(number, candidate, metadata) {
    if (!Object(_validate___WEBPACK_IMPORTED_MODULE_0__["default"])(number, undefined, metadata) || !containsOnlyValidXChars(number, candidate.toString(), metadata)) {
      return false;
    } // Skipped for simplicity.
    // return isNationalPrefixPresentIfRequired(number, metadata)


    return true;
  },

  /**
   * Phone numbers accepted are "valid" and
   * are grouped in a possible way for this locale. For example, a US number written as
   * "65 02 53 00 00" and "650253 0000" are not accepted at this leniency level, whereas
   * "650 253 0000", "650 2530000" or "6502530000" are.
   * Numbers with more than one '/' symbol in the national significant number
   * are also dropped at this level.
   *
   * Warning: This level might result in lower coverage especially for regions outside of
   * country code "+1". If you are not sure about which level to use,
   * email the discussion group libphonenumber-discuss@googlegroups.com.
   */
  STRICT_GROUPING: function STRICT_GROUPING(number, candidate, metadata, regExpCache) {
    var candidateString = candidate.toString();

    if (!Object(_validate___WEBPACK_IMPORTED_MODULE_0__["default"])(number, undefined, metadata) || !containsOnlyValidXChars(number, candidateString, metadata) || containsMoreThanOneSlashInNationalNumber(number, candidateString) || !isNationalPrefixPresentIfRequired(number, metadata)) {
      return false;
    }

    return checkNumberGroupingIsValid(number, candidate, metadata, allNumberGroupsRemainGrouped, regExpCache);
  },

  /**
   * Phone numbers accepted are {@linkplain PhoneNumberUtil#isValidNumber(PhoneNumber) valid} and
   * are grouped in the same way that we would have formatted it, or as a single block. For
   * example, a US number written as "650 2530000" is not accepted at this leniency level, whereas
   * "650 253 0000" or "6502530000" are.
   * Numbers with more than one '/' symbol are also dropped at this level.
   * <p>
   * Warning: This level might result in lower coverage especially for regions outside of country
   * code "+1". If you are not sure about which level to use, email the discussion group
   * libphonenumber-discuss@googlegroups.com.
   */
  EXACT_GROUPING: function EXACT_GROUPING(number, candidate, metadata, regExpCache) {
    var candidateString = candidate.toString();

    if (!Object(_validate___WEBPACK_IMPORTED_MODULE_0__["default"])(number, undefined, metadata) || !containsOnlyValidXChars(number, candidateString, metadata) || containsMoreThanOneSlashInNationalNumber(number, candidateString) || !isNationalPrefixPresentIfRequired(number, metadata)) {
      return false;
    }

    return checkNumberGroupingIsValid(number, candidate, metadata, allNumberGroupsAreExactlyPresent, regExpCache);
  }
});

function containsOnlyValidXChars(number, candidate, metadata) {
  // The characters 'x' and 'X' can be (1) a carrier code, in which case they always precede the
  // national significant number or (2) an extension sign, in which case they always precede the
  // extension number. We assume a carrier code is more than 1 digit, so the first case has to
  // have more than 1 consecutive 'x' or 'X', whereas the second case can only have exactly 1 'x'
  // or 'X'. We ignore the character if it appears as the last character of the string.
  for (var index = 0; index < candidate.length - 1; index++) {
    var charAtIndex = candidate.charAt(index);

    if (charAtIndex === 'x' || charAtIndex === 'X') {
      var charAtNextIndex = candidate.charAt(index + 1);

      if (charAtNextIndex === 'x' || charAtNextIndex === 'X') {
        // This is the carrier code case, in which the 'X's always precede the national
        // significant number.
        index++;

        if (util.isNumberMatch(number, candidate.substring(index)) != MatchType.NSN_MATCH) {
          return false;
        } // This is the extension sign case, in which the 'x' or 'X' should always precede the
        // extension number.

      } else if (Object(_parseDigits__WEBPACK_IMPORTED_MODULE_1__["default"])(candidate.substring(index)) !== number.ext) {
        return false;
      }
    }
  }

  return true;
}

function isNationalPrefixPresentIfRequired(number, _metadata) {
  // First, check how we deduced the country code. If it was written in international format, then
  // the national prefix is not required.
  if (number.getCountryCodeSource() != 'FROM_DEFAULT_COUNTRY') {
    return true;
  }

  var phoneNumberRegion = util.getRegionCodeForCountryCode(number.getCountryCode());
  var metadata = util.getMetadataForRegion(phoneNumberRegion);

  if (metadata == null) {
    return true;
  } // Check if a national prefix should be present when formatting this number.


  var nationalNumber = util.getNationalSignificantNumber(number);
  var formatRule = util.chooseFormattingPatternForNumber(metadata.numberFormats(), nationalNumber); // To do this, we check that a national prefix formatting rule was present
  // and that it wasn't just the first-group symbol ($1) with punctuation.

  if (formatRule && formatRule.getNationalPrefixFormattingRule().length > 0) {
    if (formatRule.getNationalPrefixOptionalWhenFormatting()) {
      // The national-prefix is optional in these cases, so we don't need to check if it was
      // present.
      return true;
    }

    if (PhoneNumberUtil.formattingRuleHasFirstGroupOnly(formatRule.getNationalPrefixFormattingRule())) {
      // National Prefix not needed for this number.
      return true;
    } // Normalize the remainder.


    var rawInputCopy = PhoneNumberUtil.normalizeDigitsOnly(number.getRawInput()); // Check if we found a national prefix and/or carrier code at the start of the raw input, and
    // return the result.

    return util.maybeStripNationalPrefixAndCarrierCode(rawInputCopy, metadata, null);
  }

  return true;
}

function containsMoreThanOneSlashInNationalNumber(number, candidate) {
  var firstSlashInBodyIndex = candidate.indexOf('/');

  if (firstSlashInBodyIndex < 0) {
    // No slashes, this is okay.
    return false;
  } // Now look for a second one.


  var secondSlashInBodyIndex = candidate.indexOf('/', firstSlashInBodyIndex + 1);

  if (secondSlashInBodyIndex < 0) {
    // Only one slash, this is okay.
    return false;
  } // If the first slash is after the country calling code, this is permitted.


  var candidateHasCountryCode = number.getCountryCodeSource() === CountryCodeSource.FROM_NUMBER_WITH_PLUS_SIGN || number.getCountryCodeSource() === CountryCodeSource.FROM_NUMBER_WITHOUT_PLUS_SIGN;

  if (candidateHasCountryCode && PhoneNumberUtil.normalizeDigitsOnly(candidate.substring(0, firstSlashInBodyIndex)) === String(number.getCountryCode())) {
    // Any more slashes and this is illegal.
    return candidate.slice(secondSlashInBodyIndex + 1).indexOf('/') >= 0;
  }

  return true;
}

function checkNumberGroupingIsValid(number, candidate, metadata, checkGroups, regExpCache) {
  var normalizedCandidate = normalizeDigits(candidate, true
  /* keep non-digits */
  );
  var formattedNumberGroups = getNationalNumberGroups(metadata, number, null);

  if (checkGroups(metadata, number, normalizedCandidate, formattedNumberGroups)) {
    return true;
  } // If this didn't pass, see if there are any alternate formats that match, and try them instead.


  var alternateFormats = MetadataManager.getAlternateFormatsForCountry(number.getCountryCode());
  var nationalSignificantNumber = util.getNationalSignificantNumber(number);

  if (alternateFormats) {
    for (var _iterator = alternateFormats.numberFormats(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var alternateFormat = _ref;

      if (alternateFormat.leadingDigitsPatterns().length > 0) {
        // There is only one leading digits pattern for alternate formats.
        var leadingDigitsRegExp = regExpCache.getPatternForRegExp('^' + alternateFormat.leadingDigitsPatterns()[0]);

        if (!leadingDigitsRegExp.test(nationalSignificantNumber)) {
          // Leading digits don't match; try another one.
          continue;
        }
      }

      formattedNumberGroups = getNationalNumberGroups(metadata, number, alternateFormat);

      if (checkGroups(metadata, number, normalizedCandidate, formattedNumberGroups)) {
        return true;
      }
    }
  }

  return false;
}
/**
 * Helper method to get the national-number part of a number, formatted without any national
 * prefix, and return it as a set of digit blocks that would be formatted together following
 * standard formatting rules.
 */


function getNationalNumberGroups(metadata, number, formattingPattern) {
  if (formattingPattern) {
    // We format the NSN only, and split that according to the separator.
    var nationalSignificantNumber = util.getNationalSignificantNumber(number);
    return util.formatNsnUsingPattern(nationalSignificantNumber, formattingPattern, 'RFC3966', metadata).split('-');
  } // This will be in the format +CC-DG1-DG2-DGX;ext=EXT where DG1..DGX represents groups of digits.


  var rfc3966Format = formatNumber(number, 'RFC3966', metadata); // We remove the extension part from the formatted string before splitting it into different
  // groups.

  var endIndex = rfc3966Format.indexOf(';');

  if (endIndex < 0) {
    endIndex = rfc3966Format.length;
  } // The country-code will have a '-' following it.


  var startIndex = rfc3966Format.indexOf('-') + 1;
  return rfc3966Format.slice(startIndex, endIndex).split('-');
}

function allNumberGroupsAreExactlyPresent(metadata, number, normalizedCandidate, formattedNumberGroups) {
  var candidateGroups = normalizedCandidate.split(NON_DIGITS_PATTERN); // Set this to the last group, skipping it if the number has an extension.

  var candidateNumberGroupIndex = number.hasExtension() ? candidateGroups.length - 2 : candidateGroups.length - 1; // First we check if the national significant number is formatted as a block.
  // We use contains and not equals, since the national significant number may be present with
  // a prefix such as a national number prefix, or the country code itself.

  if (candidateGroups.length == 1 || candidateGroups[candidateNumberGroupIndex].contains(util.getNationalSignificantNumber(number))) {
    return true;
  } // Starting from the end, go through in reverse, excluding the first group, and check the
  // candidate and number groups are the same.


  var formattedNumberGroupIndex = formattedNumberGroups.length - 1;

  while (formattedNumberGroupIndex > 0 && candidateNumberGroupIndex >= 0) {
    if (candidateGroups[candidateNumberGroupIndex] !== formattedNumberGroups[formattedNumberGroupIndex]) {
      return false;
    }

    formattedNumberGroupIndex--;
    candidateNumberGroupIndex--;
  } // Now check the first group. There may be a national prefix at the start, so we only check
  // that the candidate group ends with the formatted number group.


  return candidateNumberGroupIndex >= 0 && Object(_util__WEBPACK_IMPORTED_MODULE_2__["endsWith"])(candidateGroups[candidateNumberGroupIndex], formattedNumberGroups[0]);
}

function allNumberGroupsRemainGrouped(metadata, number, normalizedCandidate, formattedNumberGroups) {
  var fromIndex = 0;

  if (number.getCountryCodeSource() !== CountryCodeSource.FROM_DEFAULT_COUNTRY) {
    // First skip the country code if the normalized candidate contained it.
    var countryCode = String(number.getCountryCode());
    fromIndex = normalizedCandidate.indexOf(countryCode) + countryCode.length();
  } // Check each group of consecutive digits are not broken into separate groupings in the
  // {@code normalizedCandidate} string.


  for (var i = 0; i < formattedNumberGroups.length; i++) {
    // Fails if the substring of {@code normalizedCandidate} starting from {@code fromIndex}
    // doesn't contain the consecutive digits in formattedNumberGroups[i].
    fromIndex = normalizedCandidate.indexOf(formattedNumberGroups[i], fromIndex);

    if (fromIndex < 0) {
      return false;
    } // Moves {@code fromIndex} forward.


    fromIndex += formattedNumberGroups[i].length();

    if (i == 0 && fromIndex < normalizedCandidate.length()) {
      // We are at the position right after the NDC. We get the region used for formatting
      // information based on the country code in the phone number, rather than the number itself,
      // as we do not need to distinguish between different countries with the same country
      // calling code and this is faster.
      var region = util.getRegionCodeForCountryCode(number.getCountryCode());

      if (util.getNddPrefixForRegion(region, true) != null && Character.isDigit(normalizedCandidate.charAt(fromIndex))) {
        // This means there is no formatting symbol after the NDC. In this case, we only
        // accept the number if there is no formatting symbol at all in the number, except
        // for extensions. This is only important for countries with national prefixes.
        var nationalSignificantNumber = util.getNationalSignificantNumber(number);
        return Object(_util__WEBPACK_IMPORTED_MODULE_2__["startsWith"])(normalizedCandidate.slice(fromIndex - formattedNumberGroups[i].length), nationalSignificantNumber);
      }
    }
  } // The check here makes sure that we haven't mistakenly already used the extension to
  // match the last group of the subscriber number. Note the extension cannot have
  // formatting in-between digits.


  return normalizedCandidate.slice(fromIndex).contains(number.getExtension());
}
//# sourceMappingURL=Leniency.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/RegExpCache.js":
/*!***********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/RegExpCache.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RegExpCache; });
/* harmony import */ var _LRUCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LRUCache */ "./node_modules/libphonenumber-js/es6/findNumbers/LRUCache.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // A cache for frequently used country-specific regular expressions. Set to 32 to cover ~2-3
// countries being used for the same doc with ~10 patterns for each country. Some pages will have
// a lot more countries in use, but typically fewer numbers for each so expanding the cache for
// that use-case won't have a lot of benefit.

var RegExpCache =
/*#__PURE__*/
function () {
  function RegExpCache(size) {
    _classCallCheck(this, RegExpCache);

    this.cache = new _LRUCache__WEBPACK_IMPORTED_MODULE_0__["default"](size);
  }

  _createClass(RegExpCache, [{
    key: "getPatternForRegExp",
    value: function getPatternForRegExp(pattern) {
      var regExp = this.cache.get(pattern);

      if (!regExp) {
        regExp = new RegExp('^' + pattern);
        this.cache.put(pattern, regExp);
      }

      return regExp;
    }
  }]);

  return RegExpCache;
}();


//# sourceMappingURL=RegExpCache.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/isValidCandidate.js":
/*!****************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/isValidCandidate.js ***!
  \****************************************************************************/
/*! exports provided: LEAD_CLASS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEAD_CLASS", function() { return LEAD_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isValidCandidate; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./node_modules/libphonenumber-js/es6/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./node_modules/libphonenumber-js/es6/findNumbers/util.js");
/* harmony import */ var _utf_8__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utf-8 */ "./node_modules/libphonenumber-js/es6/findNumbers/utf-8.js");
// Copy-pasted from `PhoneNumberMatcher.js`.



var OPENING_PARENS = "(\\[\uFF08\uFF3B";
var CLOSING_PARENS = ")\\]\uFF09\uFF3D";
var NON_PARENS = "[^".concat(OPENING_PARENS).concat(CLOSING_PARENS, "]");
var LEAD_CLASS = "[".concat(OPENING_PARENS).concat(_constants__WEBPACK_IMPORTED_MODULE_0__["PLUS_CHARS"], "]"); // Punctuation that may be at the start of a phone number - brackets and plus signs.

var LEAD_CLASS_LEADING = new RegExp('^' + LEAD_CLASS); // Limit on the number of pairs of brackets in a phone number.

var BRACKET_PAIR_LIMIT = Object(_util__WEBPACK_IMPORTED_MODULE_1__["limit"])(0, 3);
/**
 * Pattern to check that brackets match. Opening brackets should be closed within a phone number.
 * This also checks that there is something inside the brackets. Having no brackets at all is also
 * fine.
 *
 * An opening bracket at the beginning may not be closed, but subsequent ones should be.  It's
 * also possible that the leading bracket was dropped, so we shouldn't be surprised if we see a
 * closing bracket first. We limit the sets of brackets in a phone number to four.
 */

var MATCHING_BRACKETS_ENTIRE = new RegExp('^' + "(?:[" + OPENING_PARENS + "])?" + "(?:" + NON_PARENS + "+" + "[" + CLOSING_PARENS + "])?" + NON_PARENS + "+" + "(?:[" + OPENING_PARENS + "]" + NON_PARENS + "+[" + CLOSING_PARENS + "])" + BRACKET_PAIR_LIMIT + NON_PARENS + "*" + '$');
/**
 * Matches strings that look like publication pages. Example:
 * <pre>Computing Complete Answers to Queries in the Presence of Limited Access Patterns.
 * Chen Li. VLDB J. 12(3): 211-227 (2003).</pre>
 *
 * The string "211-227 (2003)" is not a telephone number.
 */

var PUB_PAGES = /\d{1,5}-+\d{1,5}\s{0,4}\(\d{1,4}/;
function isValidCandidate(candidate, offset, text, leniency) {
  // Check the candidate doesn't contain any formatting
  // which would indicate that it really isn't a phone number.
  if (!MATCHING_BRACKETS_ENTIRE.test(candidate) || PUB_PAGES.test(candidate)) {
    return;
  } // If leniency is set to VALID or stricter, we also want to skip numbers that are surrounded
  // by Latin alphabetic characters, to skip cases like abc8005001234 or 8005001234def.


  if (leniency !== 'POSSIBLE') {
    // If the candidate is not at the start of the text,
    // and does not start with phone-number punctuation,
    // check the previous character.
    if (offset > 0 && !LEAD_CLASS_LEADING.test(candidate)) {
      var previousChar = text[offset - 1]; // We return null if it is a latin letter or an invalid punctuation symbol.

      if (Object(_utf_8__WEBPACK_IMPORTED_MODULE_2__["isInvalidPunctuationSymbol"])(previousChar) || Object(_utf_8__WEBPACK_IMPORTED_MODULE_2__["isLatinLetter"])(previousChar)) {
        return false;
      }
    }

    var lastCharIndex = offset + candidate.length;

    if (lastCharIndex < text.length) {
      var nextChar = text[lastCharIndex];

      if (Object(_utf_8__WEBPACK_IMPORTED_MODULE_2__["isInvalidPunctuationSymbol"])(nextChar) || Object(_utf_8__WEBPACK_IMPORTED_MODULE_2__["isLatinLetter"])(nextChar)) {
        return false;
      }
    }
  }

  return true;
}
//# sourceMappingURL=isValidCandidate.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/isValidPreCandidate.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/isValidPreCandidate.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isValidPreCandidate; });
// Matches strings that look like dates using "/" as a separator.
// Examples: 3/10/2011, 31/10/96 or 08/31/95.
var SLASH_SEPARATED_DATES = /(?:(?:[0-3]?\d\/[01]?\d)|(?:[01]?\d\/[0-3]?\d))\/(?:[12]\d)?\d{2}/; // Matches timestamps.
// Examples: "2012-01-02 08:00".
// Note that the reg-ex does not include the
// trailing ":\d\d" -- that is covered by TIME_STAMPS_SUFFIX.

var TIME_STAMPS = /[12]\d{3}[-/]?[01]\d[-/]?[0-3]\d +[0-2]\d$/;
var TIME_STAMPS_SUFFIX_LEADING = /^:[0-5]\d/;
function isValidPreCandidate(candidate, offset, text) {
  // Skip a match that is more likely to be a date.
  if (SLASH_SEPARATED_DATES.test(candidate)) {
    return false;
  } // Skip potential time-stamps.


  if (TIME_STAMPS.test(candidate)) {
    var followingText = text.slice(offset + candidate.length);

    if (TIME_STAMPS_SUFFIX_LEADING.test(followingText)) {
      return false;
    }
  }

  return true;
}
//# sourceMappingURL=isValidPreCandidate.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/parsePreCandidate.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/parsePreCandidate.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parsePreCandidate; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./node_modules/libphonenumber-js/es6/findNumbers/util.js");
 // Regular expression of characters typically used to start a second phone number for the purposes
// of parsing. This allows us to strip off parts of the number that are actually the start of
// another number, such as for: (530) 583-6985 x302/x2303 -> the second extension here makes this
// actually two phone numbers, (530) 583-6985 x302 and (530) 583-6985 x2303. We remove the second
// extension so that the first number is parsed correctly.
//
// Matches a slash (\ or /) followed by a space followed by an `x`.
//

var SECOND_NUMBER_START_PATTERN = /[\\/] *x/;
function parsePreCandidate(candidate) {
  // Check for extra numbers at the end.
  // TODO: This is the place to start when trying to support extraction of multiple phone number
  // from split notations (+41 79 123 45 67 / 68).
  return Object(_util__WEBPACK_IMPORTED_MODULE_0__["trimAfterFirstMatch"])(SECOND_NUMBER_START_PATTERN, candidate);
}
//# sourceMappingURL=parsePreCandidate.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/utf-8.js":
/*!*****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/utf-8.js ***!
  \*****************************************************************/
/*! exports provided: pZ, PZ, _pN, pNd, _pL, isLatinLetter, isInvalidPunctuationSymbol */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pZ", function() { return pZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PZ", function() { return PZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_pN", function() { return _pN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pNd", function() { return pNd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_pL", function() { return _pL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLatinLetter", function() { return isLatinLetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInvalidPunctuationSymbol", function() { return isInvalidPunctuationSymbol; });
// Javascript doesn't support UTF-8 regular expressions.
// So mimicking them here.
// Copy-pasted from `PhoneNumberMatcher.js`.

/**
 * "\p{Z}" is any kind of whitespace or invisible separator ("Separator").
 * http://www.regular-expressions.info/unicode.html
 * "\P{Z}" is the reverse of "\p{Z}".
 * "\p{N}" is any kind of numeric character in any script ("Number").
 * "\p{Nd}" is a digit zero through nine in any script except "ideographic scripts" ("Decimal_Digit_Number").
 * "\p{Sc}" is a currency symbol ("Currency_Symbol").
 * "\p{L}" is any kind of letter from any language ("Letter").
 * "\p{Mn}" is "non-spacing mark".
 *
 * Javascript doesn't support Unicode Regular Expressions
 * so substituting it with this explicit set of characters.
 *
 * https://stackoverflow.com/questions/13210194/javascript-regex-equivalent-of-a-za-z-using-pl
 * https://github.com/danielberndt/babel-plugin-utf-8-regex/blob/master/src/transformer.js
 */
var _pZ = " \xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000";
var pZ = "[".concat(_pZ, "]");
var PZ = "[^".concat(_pZ, "]");
var _pN = "0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19"; // const pN = `[${_pN}]`

var _pNd = "0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19";
var pNd = "[".concat(_pNd, "]");
var _pL = "A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
var pL = "[".concat(_pL, "]");
var pL_regexp = new RegExp(pL);
var _pSc = "$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20B9\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6";
var pSc = "[".concat(_pSc, "]");
var pSc_regexp = new RegExp(pSc);
var _pMn = "\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E4-\u08FE\u0900-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1DC0-\u1DE6\u1DFC-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F\uA674-\uA67D\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE26";
var pMn = "[".concat(_pMn, "]");
var pMn_regexp = new RegExp(pMn);
var _InBasic_Latin = "\0-\x7F";
var _InLatin_1_Supplement = "\x80-\xFF";
var _InLatin_Extended_A = "\u0100-\u017F";
var _InLatin_Extended_Additional = "\u1E00-\u1EFF";
var _InLatin_Extended_B = "\u0180-\u024F";
var _InCombining_Diacritical_Marks = "\u0300-\u036F";
var latinLetterRegexp = new RegExp('[' + _InBasic_Latin + _InLatin_1_Supplement + _InLatin_Extended_A + _InLatin_Extended_Additional + _InLatin_Extended_B + _InCombining_Diacritical_Marks + ']');
/**
 * Helper method to determine if a character is a Latin-script letter or not.
 * For our purposes, combining marks should also return true since we assume
 * they have been added to a preceding Latin character.
 */

function isLatinLetter(letter) {
  // Combining marks are a subset of non-spacing-mark.
  if (!pL_regexp.test(letter) && !pMn_regexp.test(letter)) {
    return false;
  }

  return latinLetterRegexp.test(letter);
}
function isInvalidPunctuationSymbol(character) {
  return character === '%' || pSc_regexp.test(character);
}
//# sourceMappingURL=utf-8.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers/util.js":
/*!****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers/util.js ***!
  \****************************************************************/
/*! exports provided: limit, trimAfterFirstMatch, startsWith, endsWith */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "limit", function() { return limit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimAfterFirstMatch", function() { return trimAfterFirstMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startsWith", function() { return startsWith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endsWith", function() { return endsWith; });
/** Returns a regular expression quantifier with an upper and lower limit. */
function limit(lower, upper) {
  if (lower < 0 || upper <= 0 || upper < lower) {
    throw new TypeError();
  }

  return "{".concat(lower, ",").concat(upper, "}");
}
/**
 * Trims away any characters after the first match of {@code pattern} in {@code candidate},
 * returning the trimmed version.
 */

function trimAfterFirstMatch(regexp, string) {
  var index = string.search(regexp);

  if (index >= 0) {
    return string.slice(0, index);
  }

  return string;
}
function startsWith(string, substring) {
  return string.indexOf(substring) === 0;
}
function endsWith(string, substring) {
  return string.indexOf(substring, string.length - substring.length) === string.length - substring.length;
}
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findNumbers_.js":
/*!************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findNumbers_.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return findNumbers; });
/* harmony import */ var _PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhoneNumberMatcher */ "./node_modules/libphonenumber-js/es6/PhoneNumberMatcher.js");

function findNumbers(text, options, metadata) {
  var matcher = new _PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_0__["default"](text, options, metadata);
  var results = [];

  while (matcher.hasNext()) {
    results.push(matcher.next());
  }

  return results;
}
//# sourceMappingURL=findNumbers_.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findPhoneNumbers.js":
/*!****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findPhoneNumbers.js ***!
  \****************************************************************/
/*! exports provided: default, searchPhoneNumbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return findPhoneNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchPhoneNumbers", function() { return searchPhoneNumbers; });
/* harmony import */ var _findPhoneNumbers___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./findPhoneNumbers_ */ "./node_modules/libphonenumber-js/es6/findPhoneNumbers_.js");
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsePhoneNumber */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js");
// This is a legacy function.
// Use `findNumbers()` instead.


function findPhoneNumbers() {
  var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__["normalizeArguments"])(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_0__["default"])(text, options, metadata);
}
/**
 * @return ES6 `for ... of` iterator.
 */

function searchPhoneNumbers() {
  var _normalizeArguments2 = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__["normalizeArguments"])(arguments),
      text = _normalizeArguments2.text,
      options = _normalizeArguments2.options,
      metadata = _normalizeArguments2.metadata;

  return Object(_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_0__["searchPhoneNumbers"])(text, options, metadata);
}
//# sourceMappingURL=findPhoneNumbers.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findPhoneNumbersInText.js":
/*!**********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findPhoneNumbersInText.js ***!
  \**********************************************************************/
/*! exports provided: default, getArguments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return findPhoneNumbersInText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getArguments", function() { return getArguments; });
/* harmony import */ var _findNumbers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./findNumbers */ "./node_modules/libphonenumber-js/es6/findNumbers.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


function findPhoneNumbersInText(text, defaultCountry, options, metadata) {
  var args = getArguments(defaultCountry, options, metadata);
  return Object(_findNumbers__WEBPACK_IMPORTED_MODULE_0__["default"])(text, args.options, args.metadata);
}
function getArguments(defaultCountry, options, metadata) {
  if (metadata) {
    if (defaultCountry) {
      options = _objectSpread({}, options, {
        defaultCountry: defaultCountry
      });
    }
  } else {
    if (options) {
      metadata = options;

      if (defaultCountry) {
        if (is_object(defaultCountry)) {
          options = defaultCountry;
        } else {
          options = {
            defaultCountry: defaultCountry
          };
        }
      } else {
        options = undefined;
      }
    } else {
      metadata = defaultCountry;
      options = undefined;
    }
  }

  return {
    options: _objectSpread({}, options, {
      v2: true
    }),
    metadata: metadata
  };
} // Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".

/* istanbul ignore next */

var is_object = function is_object(_) {
  return _typeof(_) === 'object';
};
//# sourceMappingURL=findPhoneNumbersInText.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/findPhoneNumbers_.js":
/*!*****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/findPhoneNumbers_.js ***!
  \*****************************************************************/
/*! exports provided: default, searchPhoneNumbers, PhoneNumberSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return findPhoneNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchPhoneNumbers", function() { return searchPhoneNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhoneNumberSearch", function() { return PhoneNumberSearch; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/libphonenumber-js/es6/constants.js");
/* harmony import */ var _extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extension */ "./node_modules/libphonenumber-js/es6/extension.js");
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parse_ */ "./node_modules/libphonenumber-js/es6/parse_.js");
/* harmony import */ var _findNumbers_parsePreCandidate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./findNumbers/parsePreCandidate */ "./node_modules/libphonenumber-js/es6/findNumbers/parsePreCandidate.js");
/* harmony import */ var _findNumbers_isValidPreCandidate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./findNumbers/isValidPreCandidate */ "./node_modules/libphonenumber-js/es6/findNumbers/isValidPreCandidate.js");
/* harmony import */ var _findNumbers_isValidCandidate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./findNumbers/isValidCandidate */ "./node_modules/libphonenumber-js/es6/findNumbers/isValidCandidate.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// This is a legacy function.
// Use `findNumbers()` instead.





 // Copy-pasted from `./parse.js`.

var VALID_PHONE_NUMBER = '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["PLUS_CHARS"] + ']{0,1}' + '(?:' + '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_PUNCTUATION"] + ']*' + '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']' + '){3,}' + '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_PUNCTUATION"] + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']*';
var WHITESPACE_IN_THE_BEGINNING_PATTERN = new RegExp('^[' + _constants__WEBPACK_IMPORTED_MODULE_0__["WHITESPACE"] + ']+');
var PUNCTUATION_IN_THE_END_PATTERN = new RegExp('[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_PUNCTUATION"] + ']+$'); // // Regular expression for getting opening brackets for a valid number
// // found using `PHONE_NUMBER_START_PATTERN` for prepending those brackets to the number.
// const BEFORE_NUMBER_DIGITS_PUNCTUATION = new RegExp('[' + OPENING_BRACKETS + ']+' + '[' + WHITESPACE + ']*' + '$')

var VALID_PRECEDING_CHARACTER_PATTERN = /[^a-zA-Z0-9]/;
function findPhoneNumbers(text, options, metadata) {
  /* istanbul ignore if */
  if (options === undefined) {
    options = {};
  }

  var search = new PhoneNumberSearch(text, options, metadata);
  var phones = [];

  while (search.hasNext()) {
    phones.push(search.next());
  }

  return phones;
}
/**
 * @return ES6 `for ... of` iterator.
 */

function searchPhoneNumbers(text, options, metadata) {
  /* istanbul ignore if */
  if (options === undefined) {
    options = {};
  }

  var search = new PhoneNumberSearch(text, options, metadata);
  return _defineProperty({}, Symbol.iterator, function () {
    return {
      next: function next() {
        if (search.hasNext()) {
          return {
            done: false,
            value: search.next()
          };
        }

        return {
          done: true
        };
      }
    };
  });
}
/**
 * Extracts a parseable phone number including any opening brackets, etc.
 * @param  {string} text - Input.
 * @return {object} `{ ?number, ?startsAt, ?endsAt }`.
 */

var PhoneNumberSearch =
/*#__PURE__*/
function () {
  // Iteration tristate.
  function PhoneNumberSearch(text, options, metadata) {
    _classCallCheck(this, PhoneNumberSearch);

    _defineProperty(this, "state", 'NOT_READY');

    this.text = text; // If assigning the `{}` default value is moved to the arguments above,
    // code coverage would decrease for some weird reason.

    this.options = options || {};
    this.metadata = metadata;
    this.regexp = new RegExp(VALID_PHONE_NUMBER + // Phone number extensions
    '(?:' + _extension__WEBPACK_IMPORTED_MODULE_1__["EXTN_PATTERNS_FOR_PARSING"] + ')?', 'ig'); // this.searching_from = 0
  }

  _createClass(PhoneNumberSearch, [{
    key: "find",
    value: function find() {
      var matches = this.regexp.exec(this.text);

      if (!matches) {
        return;
      }

      var number = matches[0];
      var startsAt = matches.index;
      number = number.replace(WHITESPACE_IN_THE_BEGINNING_PATTERN, '');
      startsAt += matches[0].length - number.length; // Fixes not parsing numbers with whitespace in the end.
      // Also fixes not parsing numbers with opening parentheses in the end.
      // https://github.com/catamphetamine/libphonenumber-js/issues/252

      number = number.replace(PUNCTUATION_IN_THE_END_PATTERN, '');
      number = Object(_findNumbers_parsePreCandidate__WEBPACK_IMPORTED_MODULE_3__["default"])(number);
      var result = this.parseCandidate(number, startsAt);

      if (result) {
        return result;
      } // Tail recursion.
      // Try the next one if this one is not a valid phone number.


      return this.find();
    }
  }, {
    key: "parseCandidate",
    value: function parseCandidate(number, startsAt) {
      if (!Object(_findNumbers_isValidPreCandidate__WEBPACK_IMPORTED_MODULE_4__["default"])(number, startsAt, this.text)) {
        return;
      } // Don't parse phone numbers which are non-phone numbers
      // due to being part of something else (e.g. a UUID).
      // https://github.com/catamphetamine/libphonenumber-js/issues/213
      // Copy-pasted from Google's `PhoneNumberMatcher.js` (`.parseAndValidate()`).


      if (!Object(_findNumbers_isValidCandidate__WEBPACK_IMPORTED_MODULE_5__["default"])(number, startsAt, this.text, this.options.extended ? 'POSSIBLE' : 'VALID')) {
        return;
      } // // Prepend any opening brackets left behind by the
      // // `PHONE_NUMBER_START_PATTERN` regexp.
      // const text_before_number = text.slice(this.searching_from, startsAt)
      // const full_number_starts_at = text_before_number.search(BEFORE_NUMBER_DIGITS_PUNCTUATION)
      // if (full_number_starts_at >= 0)
      // {
      // 	number   = text_before_number.slice(full_number_starts_at) + number
      // 	startsAt = full_number_starts_at
      // }
      //
      // this.searching_from = matches.lastIndex


      var result = Object(_parse___WEBPACK_IMPORTED_MODULE_2__["default"])(number, this.options, this.metadata);

      if (!result.phone) {
        return;
      }

      result.startsAt = startsAt;
      result.endsAt = startsAt + number.length;
      return result;
    }
  }, {
    key: "hasNext",
    value: function hasNext() {
      if (this.state === 'NOT_READY') {
        this.last_match = this.find();

        if (this.last_match) {
          this.state = 'READY';
        } else {
          this.state = 'DONE';
        }
      }

      return this.state === 'READY';
    }
  }, {
    key: "next",
    value: function next() {
      // Check the state and find the next match as a side-effect if necessary.
      if (!this.hasNext()) {
        throw new Error('No next element');
      } // Don't retain that memory any longer than necessary.


      var result = this.last_match;
      this.last_match = null;
      this.state = 'NOT_READY';
      return result;
    }
  }]);

  return PhoneNumberSearch;
}();
//# sourceMappingURL=findPhoneNumbers_.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/format.js":
/*!******************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/format.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return formatNumber; });
/* harmony import */ var _format___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format_ */ "./node_modules/libphonenumber-js/es6/format_.js");
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse_ */ "./node_modules/libphonenumber-js/es6/parse_.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



function formatNumber() {
  var _normalizeArguments = normalizeArguments(arguments),
      input = _normalizeArguments.input,
      format = _normalizeArguments.format,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_format___WEBPACK_IMPORTED_MODULE_0__["default"])(input, format, options, metadata);
} // Sort out arguments

function normalizeArguments(args) {
  var _Array$prototype$slic = Array.prototype.slice.call(args),
      _Array$prototype$slic2 = _slicedToArray(_Array$prototype$slic, 5),
      arg_1 = _Array$prototype$slic2[0],
      arg_2 = _Array$prototype$slic2[1],
      arg_3 = _Array$prototype$slic2[2],
      arg_4 = _Array$prototype$slic2[3],
      arg_5 = _Array$prototype$slic2[4];

  var input;
  var format;
  var options;
  var metadata; // Sort out arguments.
  // If the phone number is passed as a string.
  // `format('8005553535', ...)`.

  if (typeof arg_1 === 'string') {
    // If country code is supplied.
    // `format('8005553535', 'RU', 'NATIONAL', [options], metadata)`.
    if (typeof arg_3 === 'string') {
      format = arg_3;

      if (arg_5) {
        options = arg_4;
        metadata = arg_5;
      } else {
        metadata = arg_4;
      }

      input = Object(_parse___WEBPACK_IMPORTED_MODULE_1__["default"])(arg_1, {
        defaultCountry: arg_2,
        extended: true
      }, metadata);
    } // Just an international phone number is supplied
    // `format('+78005553535', 'NATIONAL', [options], metadata)`.
    else {
        if (typeof arg_2 !== 'string') {
          throw new Error('`format` argument not passed to `formatNumber(number, format)`');
        }

        format = arg_2;

        if (arg_4) {
          options = arg_3;
          metadata = arg_4;
        } else {
          metadata = arg_3;
        }

        input = Object(_parse___WEBPACK_IMPORTED_MODULE_1__["default"])(arg_1, {
          extended: true
        }, metadata);
      }
  } // If the phone number is passed as a parsed number object.
  // `format({ phone: '8005553535', country: 'RU' }, 'NATIONAL', [options], metadata)`.
  else if (is_object(arg_1)) {
      input = arg_1;
      format = arg_2;

      if (arg_4) {
        options = arg_3;
        metadata = arg_4;
      } else {
        metadata = arg_3;
      }
    } else throw new TypeError('A phone number must either be a string or an object of shape { phone, [country] }.'); // Legacy lowercase formats.


  if (format === 'International') {
    format = 'INTERNATIONAL';
  } else if (format === 'National') {
    format = 'NATIONAL';
  }

  return {
    input: input,
    format: format,
    options: options,
    metadata: metadata
  };
} // Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".

/* istanbul ignore next */


var is_object = function is_object(_) {
  return _typeof(_) === 'object';
};
//# sourceMappingURL=format.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/formatIncompletePhoneNumber.js":
/*!***************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/formatIncompletePhoneNumber.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return formatIncompletePhoneNumber; });
/* harmony import */ var _AsYouType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsYouType */ "./node_modules/libphonenumber-js/es6/AsYouType.js");

/**
 * Formats a (possibly incomplete) phone number.
 * The phone number can be either in E.164 format
 * or in a form of national number digits.
 * @param {string} value - A possibly incomplete phone number. Either in E.164 format or in a form of national number digits.
 * @param {string?} country - Two-letter ("ISO 3166-1 alpha-2") country code.
 * @return {string} Formatted (possibly incomplete) phone number.
 */

function formatIncompletePhoneNumber(value, country, metadata) {
  if (!metadata) {
    metadata = country;
    country = undefined;
  }

  return new _AsYouType__WEBPACK_IMPORTED_MODULE_0__["default"](country, metadata).input(value);
}
//# sourceMappingURL=formatIncompletePhoneNumber.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/format_.js":
/*!*******************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/format_.js ***!
  \*******************************************************/
/*! exports provided: default, FIRST_GROUP_PATTERN, formatNationalNumberUsingFormat, applyInternationalSeparatorStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return formatNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FIRST_GROUP_PATTERN", function() { return FIRST_GROUP_PATTERN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatNationalNumberUsingFormat", function() { return formatNationalNumberUsingFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyInternationalSeparatorStyle", function() { return applyInternationalSeparatorStyle; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/libphonenumber-js/es6/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./node_modules/libphonenumber-js/es6/util.js");
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _IDD__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IDD */ "./node_modules/libphonenumber-js/es6/IDD.js");
/* harmony import */ var _RFC3966__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RFC3966 */ "./node_modules/libphonenumber-js/es6/RFC3966.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// This is a port of Google Android `libphonenumber`'s
// `phonenumberutil.js` of December 31th, 2018.
//
// https://github.com/googlei18n/libphonenumber/commits/master/javascript/i18n/phonenumbers/phonenumberutil.js





var DEFAULT_OPTIONS = {
  formatExtension: function formatExtension(formattedNumber, extension, metadata) {
    return "".concat(formattedNumber).concat(metadata.ext()).concat(extension);
  } // Formats a phone number
  //
  // Example use cases:
  //
  // ```js
  // formatNumber('8005553535', 'RU', 'INTERNATIONAL')
  // formatNumber('8005553535', 'RU', 'INTERNATIONAL', metadata)
  // formatNumber({ phone: '8005553535', country: 'RU' }, 'INTERNATIONAL')
  // formatNumber({ phone: '8005553535', country: 'RU' }, 'INTERNATIONAL', metadata)
  // formatNumber('+78005553535', 'NATIONAL')
  // formatNumber('+78005553535', 'NATIONAL', metadata)
  // ```
  //

};
function formatNumber(input, format, options, metadata) {
  // Apply default options.
  if (options) {
    options = _objectSpread({}, DEFAULT_OPTIONS, options);
  } else {
    options = DEFAULT_OPTIONS;
  }

  metadata = new _metadata__WEBPACK_IMPORTED_MODULE_2__["default"](metadata);

  if (input.country && input.country !== '001') {
    // Validate `input.country`.
    if (!metadata.hasCountry(input.country)) {
      throw new Error("Unknown country: ".concat(input.country));
    }

    metadata.country(input.country);
  } else if (input.countryCallingCode) {
    metadata.selectNumberingPlan(input.countryCallingCode);
  } else return input.phone || '';

  var countryCallingCode = metadata.countryCallingCode();
  var nationalNumber = options.v2 ? input.nationalNumber : input.phone; // This variable should have been declared inside `case`s
  // but Babel has a bug and it says "duplicate variable declaration".

  var number;

  switch (format) {
    case 'NATIONAL':
      // Legacy argument support.
      // (`{ country: ..., phone: '' }`)
      if (!nationalNumber) {
        return '';
      }

      number = formatNationalNumber(nationalNumber, input.carrierCode, 'NATIONAL', metadata, options);
      return addExtension(number, input.ext, metadata, options.formatExtension);

    case 'INTERNATIONAL':
      // Legacy argument support.
      // (`{ country: ..., phone: '' }`)
      if (!nationalNumber) {
        return "+".concat(countryCallingCode);
      }

      number = formatNationalNumber(nationalNumber, null, 'INTERNATIONAL', metadata, options);
      number = "+".concat(countryCallingCode, " ").concat(number);
      return addExtension(number, input.ext, metadata, options.formatExtension);

    case 'E.164':
      // `E.164` doesn't define "phone number extensions".
      return "+".concat(countryCallingCode).concat(nationalNumber);

    case 'RFC3966':
      return Object(_RFC3966__WEBPACK_IMPORTED_MODULE_4__["formatRFC3966"])({
        number: "+".concat(countryCallingCode).concat(nationalNumber),
        ext: input.ext
      });
    // For reference, here's Google's IDD formatter:
    // https://github.com/google/libphonenumber/blob/32719cf74e68796788d1ca45abc85dcdc63ba5b9/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberUtil.java#L1546
    // Not saying that this IDD formatter replicates it 1:1, but it seems to work.
    // Who would even need to format phone numbers in IDD format anyway?

    case 'IDD':
      if (!options.fromCountry) {
        return; // throw new Error('`fromCountry` option not passed for IDD-prefixed formatting.')
      }

      var formattedNumber = formatIDD(nationalNumber, input.carrierCode, countryCallingCode, options.fromCountry, metadata);
      return addExtension(formattedNumber, input.ext, metadata, options.formatExtension);

    default:
      throw new Error("Unknown \"format\" argument passed to \"formatNumber()\": \"".concat(format, "\""));
  }
} // This was originally set to $1 but there are some countries for which the
// first group is not used in the national pattern (e.g. Argentina) so the $1
// group does not match correctly. Therefore, we use `\d`, so that the first
// group actually used in the pattern will be matched.

var FIRST_GROUP_PATTERN = /(\$\d)/;
function formatNationalNumberUsingFormat(number, format, _ref) {
  var internationalFormat = _ref.internationalFormat,
      withNationalPrefix = _ref.withNationalPrefix,
      carrierCode = _ref.carrierCode,
      metadata = _ref.metadata;
  var formattedNumber = number.replace(new RegExp(format.pattern()), internationalFormat ? format.internationalFormat() : // This library doesn't use `domestic_carrier_code_formatting_rule`,
  // because that one is only used when formatting phone numbers
  // for dialing from a mobile phone, and this is not a dialing library.
  // carrierCode && format.domesticCarrierCodeFormattingRule()
  // 	// First, replace the $CC in the formatting rule with the desired carrier code.
  // 	// Then, replace the $FG in the formatting rule with the first group
  // 	// and the carrier code combined in the appropriate way.
  // 	? format.format().replace(FIRST_GROUP_PATTERN, format.domesticCarrierCodeFormattingRule().replace('$CC', carrierCode))
  // 	: (
  // 		withNationalPrefix && format.nationalPrefixFormattingRule()
  // 			? format.format().replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule())
  // 			: format.format()
  // 	)
  withNationalPrefix && format.nationalPrefixFormattingRule() ? format.format().replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule()) : format.format());

  if (internationalFormat) {
    return applyInternationalSeparatorStyle(formattedNumber);
  }

  return formattedNumber;
}

function formatNationalNumber(number, carrierCode, formatAs, metadata, options) {
  var format = chooseFormatForNumber(metadata.formats(), number);

  if (!format) {
    return number;
  }

  return formatNationalNumberUsingFormat(number, format, {
    internationalFormat: formatAs === 'INTERNATIONAL',
    withNationalPrefix: format.nationalPrefixIsOptionalWhenFormattingInNationalFormat() && options && options.nationalPrefix === false ? false : true,
    carrierCode: carrierCode,
    metadata: metadata
  });
}

function chooseFormatForNumber(availableFormats, nationalNnumber) {
  for (var _iterator = availableFormats, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref2 = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref2 = _i.value;
    }

    var format = _ref2;

    // Validate leading digits
    if (format.leadingDigitsPatterns().length > 0) {
      // The last leading_digits_pattern is used here, as it is the most detailed
      var lastLeadingDigitsPattern = format.leadingDigitsPatterns()[format.leadingDigitsPatterns().length - 1]; // If leading digits don't match then move on to the next phone number format

      if (nationalNnumber.search(lastLeadingDigitsPattern) !== 0) {
        continue;
      }
    } // Check that the national number matches the phone number format regular expression


    if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(nationalNnumber, format.pattern())) {
      return format;
    }
  }
} // Removes brackets and replaces dashes with spaces.
//
// E.g. "(999) 111-22-33" -> "999 111 22 33"
//
// For some reason Google's metadata contains `<intlFormat/>`s with brackets and dashes.
// Meanwhile, there's no single opinion about using punctuation in international phone numbers.
//
// For example, Google's `<intlFormat/>` for USA is `+1 213-373-4253`.
// And here's a quote from WikiPedia's "North American Numbering Plan" page:
// https://en.wikipedia.org/wiki/North_American_Numbering_Plan
//
// "The country calling code for all countries participating in the NANP is 1.
// In international format, an NANP number should be listed as +1 301 555 01 00,
// where 301 is an area code (Maryland)."
//
// I personally prefer the international format without any punctuation.
// For example, brackets are remnants of the old age, meaning that the
// phone number part in brackets (so called "area code") can be omitted
// if dialing within the same "area".
// And hyphens were clearly introduced for splitting local numbers into memorizable groups.
// For example, remembering "5553535" is difficult but "555-35-35" is much simpler.
// Imagine a man taking a bus from home to work and seeing an ad with a phone number.
// He has a couple of seconds to memorize that number until it passes by.
// If it were spaces instead of hyphens the man wouldn't necessarily get it,
// but with hyphens instead of spaces the grouping is more explicit.
// I personally think that hyphens introduce visual clutter,
// so I prefer replacing them with spaces in international numbers.
// In the modern age all output is done on displays where spaces are clearly distinguishable
// so hyphens can be safely replaced with spaces without losing any legibility.
//


function applyInternationalSeparatorStyle(local) {
  return local.replace(new RegExp("[".concat(_constants__WEBPACK_IMPORTED_MODULE_0__["VALID_PUNCTUATION"], "]+"), 'g'), ' ').trim();
}

function addExtension(formattedNumber, ext, metadata, formatExtension) {
  return ext ? formatExtension(formattedNumber, ext, metadata) : formattedNumber;
}

function formatIDD(nationalNumber, carrierCode, countryCallingCode, fromCountry, metadata) {
  var fromCountryCallingCode = Object(_metadata__WEBPACK_IMPORTED_MODULE_2__["getCountryCallingCode"])(fromCountry, metadata.metadata); // When calling within the same country calling code.

  if (fromCountryCallingCode === countryCallingCode) {
    var formattedNumber = formatNationalNumber(nationalNumber, carrierCode, 'NATIONAL', metadata); // For NANPA regions, return the national format for these regions
    // but prefix it with the country calling code.

    if (countryCallingCode === '1') {
      return countryCallingCode + ' ' + formattedNumber;
    } // If regions share a country calling code, the country calling code need
    // not be dialled. This also applies when dialling within a region, so this
    // if clause covers both these cases. Technically this is the case for
    // dialling from La Reunion to other overseas departments of France (French
    // Guiana, Martinique, Guadeloupe), but not vice versa - so we don't cover
    // this edge case for now and for those cases return the version including
    // country calling code. Details here:
    // http://www.petitfute.com/voyage/225-info-pratiques-reunion
    //


    return formattedNumber;
  }

  var IDDPrefix = Object(_IDD__WEBPACK_IMPORTED_MODULE_3__["getIDDPrefix"])(fromCountry, undefined, metadata.metadata);

  if (IDDPrefix) {
    return "".concat(IDDPrefix, " ").concat(countryCallingCode, " ").concat(formatNationalNumber(nationalNumber, null, 'INTERNATIONAL', metadata));
  }
}
//# sourceMappingURL=format_.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/getCountries.js":
/*!************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/getCountries.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getCountries; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");

function getCountries(metadata) {
  return new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](metadata).getCountries();
}
//# sourceMappingURL=getCountries.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/getCountryCallingCode.js":
/*!*********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/getCountryCallingCode.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _metadata__WEBPACK_IMPORTED_MODULE_0__["getCountryCallingCode"]; });

// Deprecated. Import from 'metadata.js' directly instead.

//# sourceMappingURL=getCountryCallingCode.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/getExampleNumber.js":
/*!****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/getExampleNumber.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getExampleNumber; });
/* harmony import */ var _PhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhoneNumber */ "./node_modules/libphonenumber-js/es6/PhoneNumber.js");

function getExampleNumber(country, examples, metadata) {
  if (examples[country]) {
    return new _PhoneNumber__WEBPACK_IMPORTED_MODULE_0__["default"](country, examples[country], metadata);
  }
}
//# sourceMappingURL=getExampleNumber.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/getNumberType.js":
/*!*************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/getNumberType.js ***!
  \*************************************************************/
/*! exports provided: default, normalizeArguments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getNumberType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeArguments", function() { return normalizeArguments; });
/* harmony import */ var _isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isViablePhoneNumber */ "./node_modules/libphonenumber-js/es6/isViablePhoneNumber.js");
/* harmony import */ var _getNumberType___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getNumberType_ */ "./node_modules/libphonenumber-js/es6/getNumberType_.js");
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parse_ */ "./node_modules/libphonenumber-js/es6/parse_.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



 // Finds out national phone number type (fixed line, mobile, etc)

function getNumberType() {
  var _normalizeArguments = normalizeArguments(arguments),
      input = _normalizeArguments.input,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_getNumberType___WEBPACK_IMPORTED_MODULE_1__["default"])(input, options, metadata);
} // Sort out arguments

function normalizeArguments(args) {
  var _Array$prototype$slic = Array.prototype.slice.call(args),
      _Array$prototype$slic2 = _slicedToArray(_Array$prototype$slic, 4),
      arg_1 = _Array$prototype$slic2[0],
      arg_2 = _Array$prototype$slic2[1],
      arg_3 = _Array$prototype$slic2[2],
      arg_4 = _Array$prototype$slic2[3];

  var input;
  var options = {};
  var metadata; // If the phone number is passed as a string.
  // `getNumberType('88005553535', ...)`.

  if (typeof arg_1 === 'string') {
    // If "default country" argument is being passed
    // then convert it to an `options` object.
    // `getNumberType('88005553535', 'RU', metadata)`.
    if (_typeof(arg_2) !== 'object') {
      if (arg_4) {
        options = arg_3;
        metadata = arg_4;
      } else {
        metadata = arg_3;
      } // `parse` extracts phone numbers from raw text,
      // therefore it will cut off all "garbage" characters,
      // while this `validate` function needs to verify
      // that the phone number contains no "garbage"
      // therefore the explicit `isViablePhoneNumber` check.


      if (Object(_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(arg_1)) {
        input = Object(_parse___WEBPACK_IMPORTED_MODULE_2__["default"])(arg_1, {
          defaultCountry: arg_2
        }, metadata);
      } else {
        input = {};
      }
    } // No "resrict country" argument is being passed.
    // International phone number is passed.
    // `getNumberType('+78005553535', metadata)`.
    else {
        if (arg_3) {
          options = arg_2;
          metadata = arg_3;
        } else {
          metadata = arg_2;
        } // `parse` extracts phone numbers from raw text,
        // therefore it will cut off all "garbage" characters,
        // while this `validate` function needs to verify
        // that the phone number contains no "garbage"
        // therefore the explicit `isViablePhoneNumber` check.


        if (Object(_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(arg_1)) {
          input = Object(_parse___WEBPACK_IMPORTED_MODULE_2__["default"])(arg_1, undefined, metadata);
        } else {
          input = {};
        }
      }
  } // If the phone number is passed as a parsed phone number.
  // `getNumberType({ phone: '88005553535', country: 'RU' }, ...)`.
  else if (is_object(arg_1)) {
      input = arg_1;

      if (arg_3) {
        options = arg_2;
        metadata = arg_3;
      } else {
        metadata = arg_2;
      }
    } else throw new TypeError('A phone number must either be a string or an object of shape { phone, [country] }.');

  return {
    input: input,
    options: options,
    metadata: metadata
  };
} // Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".

/* istanbul ignore next */

var is_object = function is_object(_) {
  return _typeof(_) === 'object';
};
//# sourceMappingURL=getNumberType.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/getNumberType_.js":
/*!**************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/getNumberType_.js ***!
  \**************************************************************/
/*! exports provided: default, is_of_type */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getNumberType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_of_type", function() { return is_of_type; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./node_modules/libphonenumber-js/es6/util.js");


var NON_FIXED_LINE_PHONE_TYPES = ['MOBILE', 'PREMIUM_RATE', 'TOLL_FREE', 'SHARED_COST', 'VOIP', 'PERSONAL_NUMBER', 'PAGER', 'UAN', 'VOICEMAIL']; // Finds out national phone number type (fixed line, mobile, etc)

function getNumberType(input, options, metadata) {
  // If assigning the `{}` default value is moved to the arguments above,
  // code coverage would decrease for some weird reason.
  options = options || {}; // When `parse()` returned `{}`
  // meaning that the phone number is not a valid one.

  if (!input.country) {
    return;
  }

  metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](metadata);
  metadata.selectNumberingPlan(input.country, input.countryCallingCode);
  var nationalNumber = options.v2 ? input.nationalNumber : input.phone; // The following is copy-pasted from the original function:
  // https://github.com/googlei18n/libphonenumber/blob/3ea547d4fbaa2d0b67588904dfa5d3f2557c27ff/javascript/i18n/phonenumbers/phonenumberutil.js#L2835
  // Is this national number even valid for this country

  if (!Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(nationalNumber, metadata.nationalNumberPattern())) {
    return;
  } // Is it fixed line number


  if (is_of_type(nationalNumber, 'FIXED_LINE', metadata)) {
    // Because duplicate regular expressions are removed
    // to reduce metadata size, if "mobile" pattern is ""
    // then it means it was removed due to being a duplicate of the fixed-line pattern.
    //
    if (metadata.type('MOBILE') && metadata.type('MOBILE').pattern() === '') {
      return 'FIXED_LINE_OR_MOBILE';
    } // v1 metadata.
    // Legacy.
    // Deprecated.


    if (!metadata.type('MOBILE')) {
      return 'FIXED_LINE_OR_MOBILE';
    } // Check if the number happens to qualify as both fixed line and mobile.
    // (no such country in the minimal metadata set)

    /* istanbul ignore if */


    if (is_of_type(nationalNumber, 'MOBILE', metadata)) {
      return 'FIXED_LINE_OR_MOBILE';
    }

    return 'FIXED_LINE';
  }

  for (var _i = 0, _NON_FIXED_LINE_PHONE = NON_FIXED_LINE_PHONE_TYPES; _i < _NON_FIXED_LINE_PHONE.length; _i++) {
    var _type = _NON_FIXED_LINE_PHONE[_i];

    if (is_of_type(nationalNumber, _type, metadata)) {
      return _type;
    }
  }
}
function is_of_type(nationalNumber, type, metadata) {
  type = metadata.type(type);

  if (!type || !type.pattern()) {
    return false;
  } // Check if any possible number lengths are present;
  // if so, we use them to avoid checking
  // the validation pattern if they don't match.
  // If they are absent, this means they match
  // the general description, which we have
  // already checked before a specific number type.


  if (type.possibleLengths() && type.possibleLengths().indexOf(nationalNumber.length) < 0) {
    return false;
  }

  return Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(nationalNumber, type.pattern());
}
//# sourceMappingURL=getNumberType_.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/isPossibleNumber.js":
/*!****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/isPossibleNumber.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isPossibleNumber; });
/* harmony import */ var _getNumberType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNumberType */ "./node_modules/libphonenumber-js/es6/getNumberType.js");
/* harmony import */ var _isPossibleNumber___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isPossibleNumber_ */ "./node_modules/libphonenumber-js/es6/isPossibleNumber_.js");


/**
 * Checks if a given phone number is possible.
 * Which means it only checks phone number length
 * and doesn't test any regular expressions.
 *
 * Examples:
 *
 * ```js
 * isPossibleNumber('+78005553535', metadata)
 * isPossibleNumber('8005553535', 'RU', metadata)
 * isPossibleNumber('88005553535', 'RU', metadata)
 * isPossibleNumber({ phone: '8005553535', country: 'RU' }, metadata)
 * ```
 */

function isPossibleNumber() {
  var _normalizeArguments = Object(_getNumberType__WEBPACK_IMPORTED_MODULE_0__["normalizeArguments"])(arguments),
      input = _normalizeArguments.input,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_isPossibleNumber___WEBPACK_IMPORTED_MODULE_1__["default"])(input, options, metadata);
}
//# sourceMappingURL=isPossibleNumber.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/isPossibleNumber_.js":
/*!*****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/isPossibleNumber_.js ***!
  \*****************************************************************/
/*! exports provided: default, isPossibleNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isPossiblePhoneNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPossibleNumber", function() { return isPossibleNumber; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _checkNumberLength__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkNumberLength */ "./node_modules/libphonenumber-js/es6/checkNumberLength.js");


function isPossiblePhoneNumber(input, options, metadata) {
  /* istanbul ignore if */
  if (options === undefined) {
    options = {};
  }

  metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](metadata);

  if (options.v2) {
    if (!input.countryCallingCode) {
      throw new Error('Invalid phone number object passed');
    }

    metadata.selectNumberingPlan(input.countryCallingCode);
  } else {
    if (!input.phone) {
      return false;
    }

    if (input.country) {
      if (!metadata.hasCountry(input.country)) {
        throw new Error("Unknown country: ".concat(input.country));
      }

      metadata.country(input.country);
    } else {
      if (!input.countryCallingCode) {
        throw new Error('Invalid phone number object passed');
      }

      metadata.selectNumberingPlan(input.countryCallingCode);
    }
  }

  if (metadata.possibleLengths()) {
    return isPossibleNumber(input.phone || input.nationalNumber, metadata);
  } else {
    // There was a bug between `1.7.35` and `1.7.37` where "possible_lengths"
    // were missing for "non-geographical" numbering plans.
    // Just assume the number is possible in such cases:
    // it's unlikely that anyone generated their custom metadata
    // in that short period of time (one day).
    // This code can be removed in some future major version update.
    if (input.countryCallingCode && metadata.isNonGeographicCallingCode(input.countryCallingCode)) {
      // "Non-geographic entities" did't have `possibleLengths`
      // due to a bug in metadata generation process.
      return true;
    } else {
      throw new Error('Missing "possibleLengths" in metadata. Perhaps the metadata has been generated before v1.0.18.');
    }
  }
}
function isPossibleNumber(nationalNumber, metadata) {
  //, isInternational) {
  switch (Object(_checkNumberLength__WEBPACK_IMPORTED_MODULE_1__["default"])(nationalNumber, metadata)) {
    case 'IS_POSSIBLE':
      return true;
    // This library ignores "local-only" phone numbers (for simplicity).
    // See the readme for more info on what are "local-only" phone numbers.
    // case 'IS_POSSIBLE_LOCAL_ONLY':
    // 	return !isInternational

    default:
      return false;
  }
}
//# sourceMappingURL=isPossibleNumber_.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/isValidNumberForRegion.js":
/*!**********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/isValidNumberForRegion.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isValidNumberForRegion; });
/* harmony import */ var _isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isViablePhoneNumber */ "./node_modules/libphonenumber-js/es6/isViablePhoneNumber.js");
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse_ */ "./node_modules/libphonenumber-js/es6/parse_.js");
/* harmony import */ var _isValidNumberForRegion___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isValidNumberForRegion_ */ "./node_modules/libphonenumber-js/es6/isValidNumberForRegion_.js");



function isValidNumberForRegion(number, country, metadata) {
  if (typeof number !== 'string') {
    throw new TypeError('number must be a string');
  }

  if (typeof country !== 'string') {
    throw new TypeError('country must be a string');
  } // `parse` extracts phone numbers from raw text,
  // therefore it will cut off all "garbage" characters,
  // while this `validate` function needs to verify
  // that the phone number contains no "garbage"
  // therefore the explicit `isViablePhoneNumber` check.


  var input;

  if (Object(_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(number)) {
    input = Object(_parse___WEBPACK_IMPORTED_MODULE_1__["default"])(number, {
      defaultCountry: country
    }, metadata);
  } else {
    input = {};
  }

  return Object(_isValidNumberForRegion___WEBPACK_IMPORTED_MODULE_2__["default"])(input, country, undefined, metadata);
}
//# sourceMappingURL=isValidNumberForRegion.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/isValidNumberForRegion_.js":
/*!***********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/isValidNumberForRegion_.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isValidNumberForRegion; });
/* harmony import */ var _validate___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate_ */ "./node_modules/libphonenumber-js/es6/validate_.js");

/**
 * Checks if a given phone number is valid within a given region.
 * Is just an alias for `phoneNumber.isValid() && phoneNumber.country === country`.
 * https://github.com/googlei18n/libphonenumber/blob/master/FAQ.md#when-should-i-use-isvalidnumberforregion
 */

function isValidNumberForRegion(input, country, options, metadata) {
  // If assigning the `{}` default value is moved to the arguments above,
  // code coverage would decrease for some weird reason.
  options = options || {};
  return input.country === country && Object(_validate___WEBPACK_IMPORTED_MODULE_0__["default"])(input, options, metadata);
}
//# sourceMappingURL=isValidNumberForRegion_.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/isViablePhoneNumber.js":
/*!*******************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/isViablePhoneNumber.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isViablePhoneNumber; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/libphonenumber-js/es6/constants.js");
/* harmony import */ var _extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extension */ "./node_modules/libphonenumber-js/es6/extension.js");

 //  Regular expression of viable phone numbers. This is location independent.
//  Checks we have at least three leading digits, and only valid punctuation,
//  alpha characters and digits in the phone number. Does not include extension
//  data. The symbol 'x' is allowed here as valid punctuation since it is often
//  used as a placeholder for carrier codes, for example in Brazilian phone
//  numbers. We also allow multiple '+' characters at the start.
//
//  Corresponds to the following:
//  [digits]{minLengthNsn}|
//  plus_sign*
//  (([punctuation]|[star])*[digits]){3,}([punctuation]|[star]|[digits]|[alpha])*
//
//  The first reg-ex is to allow short numbers (two digits long) to be parsed if
//  they are entered as "15" etc, but only if there is no punctuation in them.
//  The second expression restricts the number of digits to three or more, but
//  then allows them to be in international form, and to have alpha-characters
//  and punctuation. We split up the two reg-exes here and combine them when
//  creating the reg-ex VALID_PHONE_NUMBER_PATTERN itself so we can prefix it
//  with ^ and append $ to each branch.
//
//  "Note VALID_PUNCTUATION starts with a -,
//   so must be the first in the range" (c) Google devs.
//  (wtf did they mean by saying that; probably nothing)
//

var MIN_LENGTH_PHONE_NUMBER_PATTERN = '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']{' + _constants__WEBPACK_IMPORTED_MODULE_0__["MIN_LENGTH_FOR_NSN"] + '}'; //
// And this is the second reg-exp:
// (see MIN_LENGTH_PHONE_NUMBER_PATTERN for a full description of this reg-exp)
//

var VALID_PHONE_NUMBER = '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["PLUS_CHARS"] + ']{0,1}' + '(?:' + '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_PUNCTUATION"] + ']*' + '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']' + '){3,}' + '[' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_PUNCTUATION"] + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']*'; // The combined regular expression for valid phone numbers:
//

var VALID_PHONE_NUMBER_PATTERN = new RegExp( // Either a short two-digit-only phone number
'^' + MIN_LENGTH_PHONE_NUMBER_PATTERN + '$' + '|' + // Or a longer fully parsed phone number (min 3 characters)
'^' + VALID_PHONE_NUMBER + // Phone number extensions
'(?:' + _extension__WEBPACK_IMPORTED_MODULE_1__["EXTN_PATTERNS_FOR_PARSING"] + ')?' + '$', 'i'); // Checks to see if the string of characters could possibly be a phone number at
// all. At the moment, checks to see that the string begins with at least 2
// digits, ignoring any punctuation commonly found in phone numbers. This method
// does not require the number to be normalized in advance - but does assume
// that leading non-number symbols have been removed, such as by the method
// `extract_possible_number`.
//

function isViablePhoneNumber(number) {
  return number.length >= _constants__WEBPACK_IMPORTED_MODULE_0__["MIN_LENGTH_FOR_NSN"] && VALID_PHONE_NUMBER_PATTERN.test(number);
}
//# sourceMappingURL=isViablePhoneNumber.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/metadata.js":
/*!********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/metadata.js ***!
  \********************************************************/
/*! exports provided: default, validateMetadata, getExtPrefix, getCountryCallingCode, isSupportedCountry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateMetadata", function() { return validateMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExtPrefix", function() { return getExtPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCountryCallingCode", function() { return getCountryCallingCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSupportedCountry", function() { return isSupportedCountry; });
/* harmony import */ var _tools_semver_compare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/semver-compare */ "./node_modules/libphonenumber-js/es6/tools/semver-compare.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // Added "possibleLengths" and renamed
// "country_phone_code_to_countries" to "country_calling_codes".

var V2 = '1.0.18'; // Added "idd_prefix" and "default_idd_prefix".

var V3 = '1.2.0'; // Moved `001` country code to "nonGeographic" section of metadata.

var V4 = '1.7.35';
var DEFAULT_EXT_PREFIX = ' ext. ';
var CALLING_CODE_REG_EXP = /^\d+$/;
/**
 * See: https://gitlab.com/catamphetamine/libphonenumber-js/blob/master/METADATA.md
 */

var Metadata =
/*#__PURE__*/
function () {
  function Metadata(metadata) {
    _classCallCheck(this, Metadata);

    validateMetadata(metadata);
    this.metadata = metadata;
    setVersion.call(this, metadata);
  }

  _createClass(Metadata, [{
    key: "getCountries",
    value: function getCountries() {
      return Object.keys(this.metadata.countries).filter(function (_) {
        return _ !== '001';
      });
    }
  }, {
    key: "getCountryMetadata",
    value: function getCountryMetadata(countryCode) {
      return this.metadata.countries[countryCode];
    }
  }, {
    key: "nonGeographic",
    value: function nonGeographic() {
      if (this.v1 || this.v2 || this.v3) return; // `nonGeographical` was a typo.
      // It's present in metadata generated from `1.7.35` to `1.7.37`.

      return this.metadata.nonGeographic || this.metadata.nonGeographical;
    }
  }, {
    key: "hasCountry",
    value: function hasCountry(country) {
      return this.getCountryMetadata(country) !== undefined;
    }
  }, {
    key: "hasCallingCode",
    value: function hasCallingCode(callingCode) {
      if (this.getCountryCodesForCallingCode(callingCode)) {
        return true;
      }

      if (this.nonGeographic()) {
        if (this.nonGeographic()[callingCode]) {
          return true;
        }
      } else {
        // A hacky workaround for old custom metadata (generated before V4).
        var countryCodes = this.countryCallingCodes()[callingCode];

        if (countryCodes && countryCodes.length === 1 && countryCodes[0] === '001') {
          return true;
        }
      }
    }
  }, {
    key: "isNonGeographicCallingCode",
    value: function isNonGeographicCallingCode(callingCode) {
      if (this.nonGeographic()) {
        return this.nonGeographic()[callingCode] ? true : false;
      } else {
        return this.getCountryCodesForCallingCode(callingCode) ? false : true;
      }
    } // Deprecated.

  }, {
    key: "country",
    value: function country(countryCode) {
      return this.selectNumberingPlan(countryCode);
    }
  }, {
    key: "selectNumberingPlan",
    value: function selectNumberingPlan(countryCode, callingCode) {
      // Supports just passing `callingCode` as the first argument.
      if (countryCode && CALLING_CODE_REG_EXP.test(countryCode)) {
        callingCode = countryCode;
        countryCode = null;
      }

      if (countryCode && countryCode !== '001') {
        if (!this.hasCountry(countryCode)) {
          throw new Error("Unknown country: ".concat(countryCode));
        }

        this.numberingPlan = new NumberingPlan(this.getCountryMetadata(countryCode), this);
      } else if (callingCode) {
        if (!this.hasCallingCode(callingCode)) {
          throw new Error("Unknown calling code: ".concat(callingCode));
        }

        this.numberingPlan = new NumberingPlan(this.getNumberingPlanMetadata(callingCode), this);
      } else {
        this.numberingPlan = undefined;
      }

      return this;
    }
  }, {
    key: "getCountryCodesForCallingCode",
    value: function getCountryCodesForCallingCode(callingCode) {
      var countryCodes = this.countryCallingCodes()[callingCode];

      if (countryCodes) {
        // Metadata before V4 included "non-geographic entity" calling codes
        // inside `country_calling_codes` (for example, `"881":["001"]`).
        // Now the semantics of `country_calling_codes` has changed:
        // it's specifically for "countries" now.
        // Older versions of custom metadata will simply skip parsing
        // "non-geographic entity" phone numbers with new versions
        // of this library: it's not considered a bug,
        // because such numbers are extremely rare,
        // and developers extremely rarely use custom metadata.
        if (countryCodes.length === 1 && countryCodes[0].length === 3) {
          return;
        }

        return countryCodes;
      }
    }
  }, {
    key: "getCountryCodeForCallingCode",
    value: function getCountryCodeForCallingCode(callingCode) {
      var countryCodes = this.getCountryCodesForCallingCode(callingCode);

      if (countryCodes) {
        return countryCodes[0];
      }
    }
  }, {
    key: "getNumberingPlanMetadata",
    value: function getNumberingPlanMetadata(callingCode) {
      var countryCode = this.getCountryCodeForCallingCode(callingCode);

      if (countryCode) {
        return this.getCountryMetadata(countryCode);
      }

      if (this.nonGeographic()) {
        var metadata = this.nonGeographic()[callingCode];

        if (metadata) {
          return metadata;
        }
      } else {
        // A hacky workaround for old custom metadata (generated before V4).
        var countryCodes = this.countryCallingCodes()[callingCode];

        if (countryCodes && countryCodes.length === 1 && countryCodes[0] === '001') {
          return this.metadata.countries['001'];
        }
      }
    } // Deprecated.

  }, {
    key: "countryCallingCode",
    value: function countryCallingCode() {
      return this.numberingPlan.callingCode();
    } // Deprecated.

  }, {
    key: "IDDPrefix",
    value: function IDDPrefix() {
      return this.numberingPlan.IDDPrefix();
    } // Deprecated.

  }, {
    key: "defaultIDDPrefix",
    value: function defaultIDDPrefix() {
      return this.numberingPlan.defaultIDDPrefix();
    } // Deprecated.

  }, {
    key: "nationalNumberPattern",
    value: function nationalNumberPattern() {
      return this.numberingPlan.nationalNumberPattern();
    } // Deprecated.

  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      return this.numberingPlan.possibleLengths();
    } // Deprecated.

  }, {
    key: "formats",
    value: function formats() {
      return this.numberingPlan.formats();
    } // Deprecated.

  }, {
    key: "nationalPrefixForParsing",
    value: function nationalPrefixForParsing() {
      return this.numberingPlan.nationalPrefixForParsing();
    } // Deprecated.

  }, {
    key: "nationalPrefixTransformRule",
    value: function nationalPrefixTransformRule() {
      return this.numberingPlan.nationalPrefixTransformRule();
    } // Deprecated.

  }, {
    key: "leadingDigits",
    value: function leadingDigits() {
      return this.numberingPlan.leadingDigits();
    } // Deprecated.

  }, {
    key: "hasTypes",
    value: function hasTypes() {
      return this.numberingPlan.hasTypes();
    } // Deprecated.

  }, {
    key: "type",
    value: function type(_type) {
      return this.numberingPlan.type(_type);
    } // Deprecated.

  }, {
    key: "ext",
    value: function ext() {
      return this.numberingPlan.ext();
    }
  }, {
    key: "countryCallingCodes",
    value: function countryCallingCodes() {
      if (this.v1) return this.metadata.country_phone_code_to_countries;
      return this.metadata.country_calling_codes;
    } // Deprecated.

  }, {
    key: "chooseCountryByCountryCallingCode",
    value: function chooseCountryByCountryCallingCode(callingCode) {
      return this.selectNumberingPlan(callingCode);
    }
  }, {
    key: "hasSelectedNumberingPlan",
    value: function hasSelectedNumberingPlan() {
      return this.numberingPlan !== undefined;
    }
  }]);

  return Metadata;
}();



var NumberingPlan =
/*#__PURE__*/
function () {
  function NumberingPlan(metadata, globalMetadataObject) {
    _classCallCheck(this, NumberingPlan);

    this.globalMetadataObject = globalMetadataObject;
    this.metadata = metadata;
    setVersion.call(this, globalMetadataObject.metadata);
  }

  _createClass(NumberingPlan, [{
    key: "callingCode",
    value: function callingCode() {
      return this.metadata[0];
    } // Formatting information for regions which share
    // a country calling code is contained by only one region
    // for performance reasons. For example, for NANPA region
    // ("North American Numbering Plan Administration",
    //  which includes USA, Canada, Cayman Islands, Bahamas, etc)
    // it will be contained in the metadata for `US`.

  }, {
    key: "getDefaultCountryMetadataForRegion",
    value: function getDefaultCountryMetadataForRegion() {
      return this.globalMetadataObject.getNumberingPlanMetadata(this.callingCode());
    }
  }, {
    key: "IDDPrefix",
    value: function IDDPrefix() {
      if (this.v1 || this.v2) return;
      return this.metadata[1];
    }
  }, {
    key: "defaultIDDPrefix",
    value: function defaultIDDPrefix() {
      if (this.v1 || this.v2) return;
      return this.metadata[12];
    }
  }, {
    key: "nationalNumberPattern",
    value: function nationalNumberPattern() {
      if (this.v1 || this.v2) return this.metadata[1];
      return this.metadata[2];
    }
  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      if (this.v1) return;
      return this.metadata[this.v2 ? 2 : 3];
    }
  }, {
    key: "_getFormats",
    value: function _getFormats(metadata) {
      return metadata[this.v1 ? 2 : this.v2 ? 3 : 4];
    } // For countries of the same region (e.g. NANPA)
    // formats are all stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".

  }, {
    key: "formats",
    value: function formats() {
      var _this = this;

      var formats = this._getFormats(this.metadata) || this._getFormats(this.getDefaultCountryMetadataForRegion()) || [];
      return formats.map(function (_) {
        return new Format(_, _this);
      });
    }
  }, {
    key: "nationalPrefix",
    value: function nationalPrefix() {
      return this.metadata[this.v1 ? 3 : this.v2 ? 4 : 5];
    }
  }, {
    key: "_getNationalPrefixFormattingRule",
    value: function _getNationalPrefixFormattingRule(metadata) {
      return metadata[this.v1 ? 4 : this.v2 ? 5 : 6];
    } // For countries of the same region (e.g. NANPA)
    // national prefix formatting rule is stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".

  }, {
    key: "nationalPrefixFormattingRule",
    value: function nationalPrefixFormattingRule() {
      return this._getNationalPrefixFormattingRule(this.metadata) || this._getNationalPrefixFormattingRule(this.getDefaultCountryMetadataForRegion());
    }
  }, {
    key: "_nationalPrefixForParsing",
    value: function _nationalPrefixForParsing() {
      return this.metadata[this.v1 ? 5 : this.v2 ? 6 : 7];
    }
  }, {
    key: "nationalPrefixForParsing",
    value: function nationalPrefixForParsing() {
      // If `national_prefix_for_parsing` is not set explicitly,
      // then infer it from `national_prefix` (if any)
      return this._nationalPrefixForParsing() || this.nationalPrefix();
    }
  }, {
    key: "nationalPrefixTransformRule",
    value: function nationalPrefixTransformRule() {
      return this.metadata[this.v1 ? 6 : this.v2 ? 7 : 8];
    }
  }, {
    key: "_getNationalPrefixIsOptionalWhenFormatting",
    value: function _getNationalPrefixIsOptionalWhenFormatting() {
      return !!this.metadata[this.v1 ? 7 : this.v2 ? 8 : 9];
    } // For countries of the same region (e.g. NANPA)
    // "national prefix is optional when formatting" flag is
    // stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".

  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
      return this._getNationalPrefixIsOptionalWhenFormatting(this.metadata) || this._getNationalPrefixIsOptionalWhenFormatting(this.getDefaultCountryMetadataForRegion());
    }
  }, {
    key: "leadingDigits",
    value: function leadingDigits() {
      return this.metadata[this.v1 ? 8 : this.v2 ? 9 : 10];
    }
  }, {
    key: "types",
    value: function types() {
      return this.metadata[this.v1 ? 9 : this.v2 ? 10 : 11];
    }
  }, {
    key: "hasTypes",
    value: function hasTypes() {
      // Versions 1.2.0 - 1.2.4: can be `[]`.

      /* istanbul ignore next */
      if (this.types() && this.types().length === 0) {
        return false;
      } // Versions <= 1.2.4: can be `undefined`.
      // Version >= 1.2.5: can be `0`.


      return !!this.types();
    }
  }, {
    key: "type",
    value: function type(_type2) {
      if (this.hasTypes() && getType(this.types(), _type2)) {
        return new Type(getType(this.types(), _type2), this);
      }
    }
  }, {
    key: "ext",
    value: function ext() {
      if (this.v1 || this.v2) return DEFAULT_EXT_PREFIX;
      return this.metadata[13] || DEFAULT_EXT_PREFIX;
    }
  }]);

  return NumberingPlan;
}();

var Format =
/*#__PURE__*/
function () {
  function Format(format, metadata) {
    _classCallCheck(this, Format);

    this._format = format;
    this.metadata = metadata;
  }

  _createClass(Format, [{
    key: "pattern",
    value: function pattern() {
      return this._format[0];
    }
  }, {
    key: "format",
    value: function format() {
      return this._format[1];
    }
  }, {
    key: "leadingDigitsPatterns",
    value: function leadingDigitsPatterns() {
      return this._format[2] || [];
    }
  }, {
    key: "nationalPrefixFormattingRule",
    value: function nationalPrefixFormattingRule() {
      return this._format[3] || this.metadata.nationalPrefixFormattingRule();
    }
  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
      return !!this._format[4] || this.metadata.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    }
  }, {
    key: "nationalPrefixIsMandatoryWhenFormattingInNationalFormat",
    value: function nationalPrefixIsMandatoryWhenFormattingInNationalFormat() {
      // National prefix is omitted if there's no national prefix formatting rule
      // set for this country, or when the national prefix formatting rule
      // contains no national prefix itself, or when this rule is set but
      // national prefix is optional for this phone number format
      // (and it is not enforced explicitly)
      return this.usesNationalPrefix() && !this.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    } // Checks whether national prefix formatting rule contains national prefix.

  }, {
    key: "usesNationalPrefix",
    value: function usesNationalPrefix() {
      return this.nationalPrefixFormattingRule() && // Check that national prefix formatting rule is not a "dummy" one.
      !FIRST_GROUP_ONLY_PREFIX_PATTERN.test(this.nationalPrefixFormattingRule()) // In compressed metadata, `this.nationalPrefixFormattingRule()` is `0`
      // when `national_prefix_formatting_rule` is not present.
      // So, `true` or `false` are returned explicitly here, so that
      // `0` number isn't returned.
      ? true : false;
    }
  }, {
    key: "internationalFormat",
    value: function internationalFormat() {
      return this._format[5] || this.format();
    }
  }]);

  return Format;
}();
/**
 * A pattern that is used to determine if the national prefix formatting rule
 * has the first group only, i.e., does not start with the national prefix.
 * Note that the pattern explicitly allows for unbalanced parentheses.
 */


var FIRST_GROUP_ONLY_PREFIX_PATTERN = /^\(?\$1\)?$/;

var Type =
/*#__PURE__*/
function () {
  function Type(type, metadata) {
    _classCallCheck(this, Type);

    this.type = type;
    this.metadata = metadata;
  }

  _createClass(Type, [{
    key: "pattern",
    value: function pattern() {
      if (this.metadata.v1) return this.type;
      return this.type[0];
    }
  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      if (this.metadata.v1) return;
      return this.type[1] || this.metadata.possibleLengths();
    }
  }]);

  return Type;
}();

function getType(types, type) {
  switch (type) {
    case 'FIXED_LINE':
      return types[0];

    case 'MOBILE':
      return types[1];

    case 'TOLL_FREE':
      return types[2];

    case 'PREMIUM_RATE':
      return types[3];

    case 'PERSONAL_NUMBER':
      return types[4];

    case 'VOICEMAIL':
      return types[5];

    case 'UAN':
      return types[6];

    case 'PAGER':
      return types[7];

    case 'VOIP':
      return types[8];

    case 'SHARED_COST':
      return types[9];
  }
}

function validateMetadata(metadata) {
  if (!metadata) {
    throw new Error('[libphonenumber-js] `metadata` argument not passed. Check your arguments.');
  } // `country_phone_code_to_countries` was renamed to
  // `country_calling_codes` in `1.0.18`.


  if (!is_object(metadata) || !is_object(metadata.countries)) {
    throw new Error("[libphonenumber-js] `metadata` argument was passed but it's not a valid metadata. Must be an object having `.countries` child object property. Got ".concat(is_object(metadata) ? 'an object of shape: { ' + Object.keys(metadata).join(', ') + ' }' : 'a ' + type_of(metadata) + ': ' + metadata, "."));
  }
} // Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".

/* istanbul ignore next */

var is_object = function is_object(_) {
  return _typeof(_) === 'object';
}; // Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".

/* istanbul ignore next */


var type_of = function type_of(_) {
  return _typeof(_);
};
/**
 * Returns extension prefix for a country.
 * @param  {string} country
 * @param  {object} metadata
 * @return {string?}
 * @example
 * // Returns " ext. "
 * getExtPrefix("US")
 */


function getExtPrefix(country, metadata) {
  metadata = new Metadata(metadata);

  if (metadata.hasCountry(country)) {
    return metadata.country(country).ext();
  }

  return DEFAULT_EXT_PREFIX;
}
/**
 * Returns "country calling code" for a country.
 * Throws an error if the country doesn't exist or isn't supported by this library.
 * @param  {string} country
 * @param  {object} metadata
 * @return {string}
 * @example
 * // Returns "44"
 * getCountryCallingCode("GB")
 */

function getCountryCallingCode(country, metadata) {
  metadata = new Metadata(metadata);

  if (metadata.hasCountry(country)) {
    return metadata.country(country).countryCallingCode();
  }

  throw new Error("Unknown country: ".concat(country));
}
function isSupportedCountry(country, metadata) {
  // metadata = new Metadata(metadata)
  // return metadata.hasCountry(country)
  return metadata.countries[country] !== undefined;
}

function setVersion(metadata) {
  this.v1 = !metadata.version;
  this.v2 = metadata.version !== undefined && Object(_tools_semver_compare__WEBPACK_IMPORTED_MODULE_0__["default"])(metadata.version, V3) === -1;
  this.v3 = metadata.version !== undefined && Object(_tools_semver_compare__WEBPACK_IMPORTED_MODULE_0__["default"])(metadata.version, V4) === -1;
  this.v4 = metadata.version !== undefined; // && compare(metadata.version, V5) === -1
} // const ISO_COUNTRY_CODE = /^[A-Z]{2}$/
// function isCountryCode(countryCode) {
// 	return ISO_COUNTRY_CODE.test(countryCodeOrCountryCallingCode)
// }
//# sourceMappingURL=metadata.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/parse.js":
/*!*****************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/parse.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseNumber; });
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse_ */ "./node_modules/libphonenumber-js/es6/parse_.js");
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsePhoneNumber */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js");

 // `options`:
//  {
//    country:
//    {
//      restrict - (a two-letter country code)
//                 the phone number must be in this country
//
//      default - (a two-letter country code)
//                default country to use for phone number parsing and validation
//                (if no country code could be derived from the phone number)
//    }
//  }
//
// Returns `{ country, number }`
//
// Example use cases:
//
// ```js
// parse('8 (800) 555-35-35', 'RU')
// parse('8 (800) 555-35-35', 'RU', metadata)
// parse('8 (800) 555-35-35', { country: { default: 'RU' } })
// parse('8 (800) 555-35-35', { country: { default: 'RU' } }, metadata)
// parse('+7 800 555 35 35')
// parse('+7 800 555 35 35', metadata)
// ```
//

function parseNumber() {
  var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__["normalizeArguments"])(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_parse___WEBPACK_IMPORTED_MODULE_0__["default"])(text, options, metadata);
}
//# sourceMappingURL=parse.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/parseDigits.js":
/*!***********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/parseDigits.js ***!
  \***********************************************************/
/*! exports provided: DIGITS, parseDigit, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIGITS", function() { return DIGITS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseDigit", function() { return parseDigit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseDigits; });
// These mappings map a character (key) to a specific digit that should
// replace it for normalization purposes. Non-European digits that
// may be used in phone numbers are mapped to a European equivalent.
//
// E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
//
var DIGITS = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  "\uFF10": '0',
  // Fullwidth digit 0
  "\uFF11": '1',
  // Fullwidth digit 1
  "\uFF12": '2',
  // Fullwidth digit 2
  "\uFF13": '3',
  // Fullwidth digit 3
  "\uFF14": '4',
  // Fullwidth digit 4
  "\uFF15": '5',
  // Fullwidth digit 5
  "\uFF16": '6',
  // Fullwidth digit 6
  "\uFF17": '7',
  // Fullwidth digit 7
  "\uFF18": '8',
  // Fullwidth digit 8
  "\uFF19": '9',
  // Fullwidth digit 9
  "\u0660": '0',
  // Arabic-indic digit 0
  "\u0661": '1',
  // Arabic-indic digit 1
  "\u0662": '2',
  // Arabic-indic digit 2
  "\u0663": '3',
  // Arabic-indic digit 3
  "\u0664": '4',
  // Arabic-indic digit 4
  "\u0665": '5',
  // Arabic-indic digit 5
  "\u0666": '6',
  // Arabic-indic digit 6
  "\u0667": '7',
  // Arabic-indic digit 7
  "\u0668": '8',
  // Arabic-indic digit 8
  "\u0669": '9',
  // Arabic-indic digit 9
  "\u06F0": '0',
  // Eastern-Arabic digit 0
  "\u06F1": '1',
  // Eastern-Arabic digit 1
  "\u06F2": '2',
  // Eastern-Arabic digit 2
  "\u06F3": '3',
  // Eastern-Arabic digit 3
  "\u06F4": '4',
  // Eastern-Arabic digit 4
  "\u06F5": '5',
  // Eastern-Arabic digit 5
  "\u06F6": '6',
  // Eastern-Arabic digit 6
  "\u06F7": '7',
  // Eastern-Arabic digit 7
  "\u06F8": '8',
  // Eastern-Arabic digit 8
  "\u06F9": '9' // Eastern-Arabic digit 9

};
function parseDigit(character) {
  return DIGITS[character];
}
/**
 * Parses phone number digits from a string.
 * Drops all punctuation leaving only digits.
 * Also converts wide-ascii and arabic-indic numerals to conventional numerals.
 * E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
 * @param  {string} string
 * @return {string}
 * @example
 * ```js
 * parseDigits('8 (800) 555')
 * // Outputs '8800555'.
 * ```
 */

function parseDigits(string) {
  var result = ''; // Using `.split('')` here instead of normal `for ... of`
  // because the importing application doesn't neccessarily include an ES6 polyfill.
  // The `.split('')` approach discards "exotic" UTF-8 characters
  // (the ones consisting of four bytes) but digits
  // (including non-European ones) don't fall into that range
  // so such "exotic" characters would be discarded anyway.

  for (var _iterator = string.split(''), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var character = _ref;
    var digit = parseDigit(character);

    if (digit) {
      result += digit;
    }
  }

  return result;
}
//# sourceMappingURL=parseDigits.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/parseIncompletePhoneNumber.js":
/*!**************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/parseIncompletePhoneNumber.js ***!
  \**************************************************************************/
/*! exports provided: default, parsePhoneNumberCharacter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseIncompletePhoneNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePhoneNumberCharacter", function() { return parsePhoneNumberCharacter; });
/* harmony import */ var _parseDigits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseDigits */ "./node_modules/libphonenumber-js/es6/parseDigits.js");

/**
 * Parses phone number characters from a string.
 * Drops all punctuation leaving only digits and the leading `+` sign (if any).
 * Also converts wide-ascii and arabic-indic numerals to conventional numerals.
 * E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
 * @param  {string} string
 * @return {string}
 * @example
 * ```js
 * // Outputs '8800555'.
 * parseIncompletePhoneNumber('8 (800) 555')
 * // Outputs '+7800555'.
 * parseIncompletePhoneNumber('+7 800 555')
 * ```
 */

function parseIncompletePhoneNumber(string) {
  var result = ''; // Using `.split('')` here instead of normal `for ... of`
  // because the importing application doesn't neccessarily include an ES6 polyfill.
  // The `.split('')` approach discards "exotic" UTF-8 characters
  // (the ones consisting of four bytes) but digits
  // (including non-European ones) don't fall into that range
  // so such "exotic" characters would be discarded anyway.

  for (var _iterator = string.split(''), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var character = _ref;
    result += parsePhoneNumberCharacter(character, result) || '';
  }

  return result;
}
/**
 * `input-format` `parse()` function.
 * https://gitlab.com/catamphetamine/input-format
 * @param  {string} character - Yet another character from raw input string.
 * @param  {string} value - The value parsed so far.
 * @param  {object} meta - Optional custom use-case-specific metadata.
 * @return {string?} The parsed character.
 */

function parsePhoneNumberCharacter(character, value) {
  // Only allow a leading `+`.
  if (character === '+') {
    // If this `+` is not the first parsed character
    // then discard it.
    if (value) {
      return;
    }

    return '+';
  } // Allow digits.


  return Object(_parseDigits__WEBPACK_IMPORTED_MODULE_0__["parseDigit"])(character);
}
//# sourceMappingURL=parseIncompletePhoneNumber.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js":
/*!****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/parsePhoneNumber.js ***!
  \****************************************************************/
/*! exports provided: default, normalizeArguments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parsePhoneNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeArguments", function() { return normalizeArguments; });
/* harmony import */ var _parsePhoneNumber___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsePhoneNumber_ */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber_.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function parsePhoneNumber() {
  var _normalizeArguments = normalizeArguments(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_parsePhoneNumber___WEBPACK_IMPORTED_MODULE_0__["default"])(text, options, metadata);
}
function normalizeArguments(args) {
  var _Array$prototype$slic = Array.prototype.slice.call(args),
      _Array$prototype$slic2 = _slicedToArray(_Array$prototype$slic, 4),
      arg_1 = _Array$prototype$slic2[0],
      arg_2 = _Array$prototype$slic2[1],
      arg_3 = _Array$prototype$slic2[2],
      arg_4 = _Array$prototype$slic2[3];

  var text;
  var options;
  var metadata; // If the phone number is passed as a string.
  // `parsePhoneNumber('88005553535', ...)`.

  if (typeof arg_1 === 'string') {
    text = arg_1;
  } else throw new TypeError('A text for parsing must be a string.'); // If "default country" argument is being passed then move it to `options`.
  // `parsePhoneNumber('88005553535', 'RU', [options], metadata)`.


  if (!arg_2 || typeof arg_2 === 'string') {
    if (arg_4) {
      options = arg_3;
      metadata = arg_4;
    } else {
      options = undefined;
      metadata = arg_3;
    }

    if (arg_2) {
      options = _objectSpread({
        defaultCountry: arg_2
      }, options);
    }
  } // `defaultCountry` is not passed.
  // Example: `parsePhoneNumber('+78005553535', [options], metadata)`.
  else if (isObject(arg_2)) {
      if (arg_3) {
        options = arg_2;
        metadata = arg_3;
      } else {
        metadata = arg_2;
      }
    } else throw new Error("Invalid second argument: ".concat(arg_2));

  return {
    text: text,
    options: options,
    metadata: metadata
  };
} // Otherwise istanbul would show this as "branch not covered".

/* istanbul ignore next */

var isObject = function isObject(_) {
  return _typeof(_) === 'object';
};
//# sourceMappingURL=parsePhoneNumber.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/parsePhoneNumberFromString.js":
/*!**************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/parsePhoneNumberFromString.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parsePhoneNumberFromString; });
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsePhoneNumber */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js");
/* harmony import */ var _parsePhoneNumberFromString___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsePhoneNumberFromString_ */ "./node_modules/libphonenumber-js/es6/parsePhoneNumberFromString_.js");


function parsePhoneNumberFromString() {
  var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__["normalizeArguments"])(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_parsePhoneNumberFromString___WEBPACK_IMPORTED_MODULE_1__["default"])(text, options, metadata);
}
//# sourceMappingURL=parsePhoneNumberFromString.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/parsePhoneNumberFromString_.js":
/*!***************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/parsePhoneNumberFromString_.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parsePhoneNumberFromString; });
/* harmony import */ var _parsePhoneNumber___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsePhoneNumber_ */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber_.js");
/* harmony import */ var _ParseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParseError */ "./node_modules/libphonenumber-js/es6/ParseError.js");
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function parsePhoneNumberFromString(text, options, metadata) {
  // Validate `defaultCountry`.
  if (options && options.defaultCountry && !Object(_metadata__WEBPACK_IMPORTED_MODULE_2__["isSupportedCountry"])(options.defaultCountry, metadata)) {
    options = _objectSpread({}, options, {
      defaultCountry: undefined
    });
  } // Parse phone number.


  try {
    return Object(_parsePhoneNumber___WEBPACK_IMPORTED_MODULE_0__["default"])(text, options, metadata);
  } catch (error) {
    /* istanbul ignore else */
    if (error instanceof _ParseError__WEBPACK_IMPORTED_MODULE_1__["default"]) {//
    } else {
      throw error;
    }
  }
}
//# sourceMappingURL=parsePhoneNumberFromString_.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/parsePhoneNumber_.js":
/*!*****************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/parsePhoneNumber_.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parsePhoneNumber; });
/* harmony import */ var _parse___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse_ */ "./node_modules/libphonenumber-js/es6/parse_.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


function parsePhoneNumber(text, options, metadata) {
  return Object(_parse___WEBPACK_IMPORTED_MODULE_0__["default"])(text, _objectSpread({}, options, {
    v2: true
  }), metadata);
}
//# sourceMappingURL=parsePhoneNumber_.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/parse_.js":
/*!******************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/parse_.js ***!
  \******************************************************/
/*! exports provided: default, extractFormattedPhoneNumber, extractNationalNumberFromPossiblyIncompleteNumber, findCountryCode, extractNationalNumber, extractCountryCallingCode, extractCountryCallingCodeFromInternationalNumberWithoutPlusSign */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractFormattedPhoneNumber", function() { return extractFormattedPhoneNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractNationalNumberFromPossiblyIncompleteNumber", function() { return extractNationalNumberFromPossiblyIncompleteNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findCountryCode", function() { return findCountryCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractNationalNumber", function() { return extractNationalNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractCountryCallingCode", function() { return extractCountryCallingCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractCountryCallingCodeFromInternationalNumberWithoutPlusSign", function() { return extractCountryCallingCodeFromInternationalNumberWithoutPlusSign; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/libphonenumber-js/es6/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./node_modules/libphonenumber-js/es6/util.js");
/* harmony import */ var _ParseError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ParseError */ "./node_modules/libphonenumber-js/es6/ParseError.js");
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isViablePhoneNumber */ "./node_modules/libphonenumber-js/es6/isViablePhoneNumber.js");
/* harmony import */ var _extension__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./extension */ "./node_modules/libphonenumber-js/es6/extension.js");
/* harmony import */ var _parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./parseIncompletePhoneNumber */ "./node_modules/libphonenumber-js/es6/parseIncompletePhoneNumber.js");
/* harmony import */ var _getCountryCallingCode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getCountryCallingCode */ "./node_modules/libphonenumber-js/es6/getCountryCallingCode.js");
/* harmony import */ var _getNumberType___WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getNumberType_ */ "./node_modules/libphonenumber-js/es6/getNumberType_.js");
/* harmony import */ var _checkNumberLength__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./checkNumberLength */ "./node_modules/libphonenumber-js/es6/checkNumberLength.js");
/* harmony import */ var _isPossibleNumber___WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./isPossibleNumber_ */ "./node_modules/libphonenumber-js/es6/isPossibleNumber_.js");
/* harmony import */ var _IDD__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./IDD */ "./node_modules/libphonenumber-js/es6/IDD.js");
/* harmony import */ var _RFC3966__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./RFC3966 */ "./node_modules/libphonenumber-js/es6/RFC3966.js");
/* harmony import */ var _PhoneNumber__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./PhoneNumber */ "./node_modules/libphonenumber-js/es6/PhoneNumber.js");
// This is a port of Google Android `libphonenumber`'s
// `phonenumberutil.js` of December 31th, 2018.
//
// https://github.com/googlei18n/libphonenumber/commits/master/javascript/i18n/phonenumbers/phonenumberutil.js













 // We don't allow input strings for parsing to be longer than 250 chars.
// This prevents malicious input from consuming CPU.

var MAX_INPUT_STRING_LENGTH = 250; // This consists of the plus symbol, digits, and arabic-indic digits.

var PHONE_NUMBER_START_PATTERN = new RegExp('[' + _constants__WEBPACK_IMPORTED_MODULE_0__["PLUS_CHARS"] + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']'); // Regular expression of trailing characters that we want to remove.

var AFTER_PHONE_NUMBER_END_PATTERN = new RegExp('[^' + _constants__WEBPACK_IMPORTED_MODULE_0__["VALID_DIGITS"] + ']+$');
var USE_NON_GEOGRAPHIC_COUNTRY_CODE = false; // `options`:
//  {
//    country:
//    {
//      restrict - (a two-letter country code)
//                 the phone number must be in this country
//
//      default - (a two-letter country code)
//                default country to use for phone number parsing and validation
//                (if no country code could be derived from the phone number)
//    }
//  }
//
// Returns `{ country, number }`
//
// Example use cases:
//
// ```js
// parse('8 (800) 555-35-35', 'RU')
// parse('8 (800) 555-35-35', 'RU', metadata)
// parse('8 (800) 555-35-35', { country: { default: 'RU' } })
// parse('8 (800) 555-35-35', { country: { default: 'RU' } }, metadata)
// parse('+7 800 555 35 35')
// parse('+7 800 555 35 35', metadata)
// ```
//

function parse(text, options, metadata) {
  // If assigning the `{}` default value is moved to the arguments above,
  // code coverage would decrease for some weird reason.
  options = options || {};
  metadata = new _metadata__WEBPACK_IMPORTED_MODULE_3__["default"](metadata); // Validate `defaultCountry`.

  if (options.defaultCountry && !metadata.hasCountry(options.defaultCountry)) {
    if (options.v2) {
      throw new _ParseError__WEBPACK_IMPORTED_MODULE_2__["default"]('INVALID_COUNTRY');
    }

    throw new Error("Unknown country: ".concat(options.defaultCountry));
  } // Parse the phone number.


  var _parseInput = parseInput(text, options.v2),
      formattedPhoneNumber = _parseInput.number,
      ext = _parseInput.ext; // If the phone number is not viable then return nothing.


  if (!formattedPhoneNumber) {
    if (options.v2) {
      throw new _ParseError__WEBPACK_IMPORTED_MODULE_2__["default"]('NOT_A_NUMBER');
    }

    return {};
  }

  var _parsePhoneNumber = parsePhoneNumber(formattedPhoneNumber, options.defaultCountry, options.defaultCallingCode, metadata),
      country = _parsePhoneNumber.country,
      nationalNumber = _parsePhoneNumber.nationalNumber,
      countryCallingCode = _parsePhoneNumber.countryCallingCode,
      carrierCode = _parsePhoneNumber.carrierCode;

  if (!metadata.hasSelectedNumberingPlan()) {
    if (options.v2) {
      throw new _ParseError__WEBPACK_IMPORTED_MODULE_2__["default"]('INVALID_COUNTRY');
    }

    return {};
  } // Validate national (significant) number length.


  if (!nationalNumber || nationalNumber.length < _constants__WEBPACK_IMPORTED_MODULE_0__["MIN_LENGTH_FOR_NSN"]) {
    // Won't throw here because the regexp already demands length > 1.

    /* istanbul ignore if */
    if (options.v2) {
      throw new _ParseError__WEBPACK_IMPORTED_MODULE_2__["default"]('TOO_SHORT');
    } // Google's demo just throws an error in this case.


    return {};
  } // Validate national (significant) number length.
  //
  // A sidenote:
  //
  // They say that sometimes national (significant) numbers
  // can be longer than `MAX_LENGTH_FOR_NSN` (e.g. in Germany).
  // https://github.com/googlei18n/libphonenumber/blob/7e1748645552da39c4e1ba731e47969d97bdb539/resources/phonenumber.proto#L36
  // Such numbers will just be discarded.
  //


  if (nationalNumber.length > _constants__WEBPACK_IMPORTED_MODULE_0__["MAX_LENGTH_FOR_NSN"]) {
    if (options.v2) {
      throw new _ParseError__WEBPACK_IMPORTED_MODULE_2__["default"]('TOO_LONG');
    } // Google's demo just throws an error in this case.


    return {};
  }

  if (options.v2) {
    var phoneNumber = new _PhoneNumber__WEBPACK_IMPORTED_MODULE_13__["default"](countryCallingCode, nationalNumber, metadata.metadata);

    if (country) {
      phoneNumber.country = country;
    }

    if (carrierCode) {
      phoneNumber.carrierCode = carrierCode;
    }

    if (ext) {
      phoneNumber.ext = ext;
    }

    return phoneNumber;
  } // Check if national phone number pattern matches the number.
  // National number pattern is different for each country,
  // even for those ones which are part of the "NANPA" group.


  var valid = (options.extended ? metadata.hasSelectedNumberingPlan() : country) ? Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(nationalNumber, metadata.nationalNumberPattern()) : false;

  if (!options.extended) {
    return valid ? result(country, nationalNumber, ext) : {};
  } // isInternational: countryCallingCode !== undefined


  return {
    country: country,
    countryCallingCode: countryCallingCode,
    carrierCode: carrierCode,
    valid: valid,
    possible: valid ? true : options.extended === true && metadata.possibleLengths() && Object(_isPossibleNumber___WEBPACK_IMPORTED_MODULE_10__["isPossibleNumber"])(nationalNumber, metadata) ? true : false,
    phone: nationalNumber,
    ext: ext
  };
}
/**
 * Extracts a formatted phone number from text.
 * Doesn't guarantee that the extracted phone number
 * is a valid phone number (for example, doesn't validate its length).
 * @param  {string} text
 * @param  {boolean} throwOnError — By default, it won't throw if the text is too long.
 * @return {string}
 * @example
 * // Returns "(213) 373-4253".
 * extractFormattedPhoneNumber("Call (213) 373-4253 for assistance.")
 */

function extractFormattedPhoneNumber(text, throwOnError) {
  if (!text) {
    return;
  }

  if (text.length > MAX_INPUT_STRING_LENGTH) {
    if (throwOnError) {
      throw new _ParseError__WEBPACK_IMPORTED_MODULE_2__["default"]('TOO_LONG');
    }

    return;
  } // Attempt to extract a possible number from the string passed in


  var startsAt = text.search(PHONE_NUMBER_START_PATTERN);

  if (startsAt < 0) {
    return;
  }

  return text // Trim everything to the left of the phone number
  .slice(startsAt) // Remove trailing non-numerical characters
  .replace(AFTER_PHONE_NUMBER_END_PATTERN, '');
}
/**
 * Strips any national prefix (such as 0, 1) present in a
 * (possibly incomplete) number provided.
 * "Carrier codes" are only used  in Colombia and Brazil,
 * and only when dialing within those countries from a mobile phone to a fixed line number.
 * Sometimes it won't actually strip national prefix
 * and will instead prepend some digits to the `number`:
 * for example, when number `2345678` is passed with `VI` country selected,
 * it will return `{ number: "3402345678" }`, because `340` area code is prepended.
 * @param {string} number — National number digits.
 * @param {object} metadata — Metadata with country selected.
 * @return {object} `{ nationalNumber: string, nationalPrefix: string? carrierCode: string? }`. Not returning a `nationalPrefix` doesn't imply that the original phone number didn't contain it.
 */

function extractNationalNumberFromPossiblyIncompleteNumber(number, metadata) {
  if (number && metadata.numberingPlan.nationalPrefixForParsing()) {
    // See METADATA.md for the description of
    // `national_prefix_for_parsing` and `national_prefix_transform_rule`.
    // Attempt to parse the first digits as a national prefix.
    var prefixPattern = new RegExp('^(?:' + metadata.numberingPlan.nationalPrefixForParsing() + ')');
    var prefixMatch = prefixPattern.exec(number);

    if (prefixMatch) {
      var nationalNumber;
      var nationalPrefix;
      var carrierCode; // https://gitlab.com/catamphetamine/libphonenumber-js/-/blob/master/METADATA.md#national_prefix_for_parsing--national_prefix_transform_rule
      // If a `national_prefix_for_parsing` has any "capturing groups"
      // then it means that the national (significant) number is equal to
      // those "capturing groups" transformed via `national_prefix_transform_rule`,
      // and nothing could be said about the actual national prefix:
      // what is it and was it even there.
      // If a `national_prefix_for_parsing` doesn't have any "capturing groups",
      // then everything it matches is a national prefix.
      // To determine whether `national_prefix_for_parsing` matched any
      // "capturing groups", the value of the result of calling `.exec()`
      // is looked at, and if it has non-undefined values where there're
      // "capturing groups" in the regular expression, then it means
      // that "capturing groups" have been matched.
      // It's not possible to tell whether there'll be any "capturing gropus"
      // before the matching process, because a `national_prefix_for_parsing`
      // could exhibit both behaviors.

      var capturedGroupsCount = prefixMatch.length - 1;
      var hasCapturedGroups = capturedGroupsCount > 0 && prefixMatch[capturedGroupsCount];

      if (metadata.nationalPrefixTransformRule() && hasCapturedGroups) {
        nationalNumber = number.replace(prefixPattern, metadata.nationalPrefixTransformRule()); // If there's more than one captured group,
        // then carrier code is the second one.

        if (capturedGroupsCount > 1) {
          carrierCode = prefixMatch[1];
        }
      } // If there're no "capturing groups",
      // or if there're "capturing groups" but no
      // `national_prefix_transform_rule`,
      // then just strip the national prefix from the number,
      // and possibly a carrier code.
      // Seems like there could be more.
      else {
          // National prefix is the whole substring matched by
          // the `national_prefix_for_parsing` regular expression.
          nationalPrefix = prefixMatch[0];
          nationalNumber = number.slice(nationalPrefix.length); // If there's at least one captured group,
          // then carrier code is the first one.

          if (capturedGroupsCount > 0) {
            carrierCode = prefixMatch[1];
          }
        }

      return {
        nationalNumber: nationalNumber,
        nationalPrefix: nationalPrefix,
        carrierCode: carrierCode
      };
    }
  }

  return {
    nationalNumber: number
  };
} // In some countries, the same digit could be a national prefix
// or a leading digit of a valid phone number.
// For example, in Russia, national prefix is `8`,
// and also `800 555 35 35` is a valid number
// in which `8` is not a national prefix, but the first digit
// of a national (significant) number.
// Same's with Belarus:
// `82004910060` is a valid national (significant) number,
// but `2004910060` is not.
// To support such cases (to prevent the code from always stripping
// national prefix), a condition is imposed: a national prefix
// is not extracted when the original number is "viable" and the
// resultant number is not, a "viable" national number being the one
// that matches `national_number_pattern`.

function shouldExtractNationalPrefix(number, nationalSignificantNumber, metadata) {
  // The equivalent in Google's code is:
  // https://github.com/google/libphonenumber/blob/e326fa1fc4283bb05eb35cb3c15c18f98a31af33/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberUtil.java#L2969-L3004
  if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(number, metadata.nationalNumberPattern()) && !Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(nationalSignificantNumber, metadata.nationalNumberPattern())) {
    return false;
  } // Just "possible" number check would be more relaxed, so it's not used.
  // if (isPossibleNumber(number, metadata) &&
  // 	!isPossibleNumber(numberWithNationalPrefixExtracted, metadata)) {
  // 	return false
  // }


  return true;
}

function findCountryCode(callingCode, nationalPhoneNumber, metadata) {
  /* istanbul ignore if */
  if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
    if (metadata.isNonGeographicCallingCode(callingCode)) {
      return '001';
    }
  } // Is always non-empty, because `callingCode` is always valid


  var possibleCountries = metadata.getCountryCodesForCallingCode(callingCode);

  if (!possibleCountries) {
    return;
  } // If there's just one country corresponding to the country code,
  // then just return it, without further phone number digits validation.


  if (possibleCountries.length === 1) {
    return possibleCountries[0];
  }

  return _findCountryCode(possibleCountries, nationalPhoneNumber, metadata.metadata);
} // Changes `metadata` `country`.

function _findCountryCode(possibleCountries, nationalPhoneNumber, metadata) {
  metadata = new _metadata__WEBPACK_IMPORTED_MODULE_3__["default"](metadata);

  for (var _iterator = possibleCountries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var country = _ref;
    metadata.country(country); // Leading digits check would be the simplest one

    if (metadata.leadingDigits()) {
      if (nationalPhoneNumber && nationalPhoneNumber.search(metadata.leadingDigits()) === 0) {
        return country;
      }
    } // Else perform full validation with all of those
    // fixed-line/mobile/etc regular expressions.
    else if (Object(_getNumberType___WEBPACK_IMPORTED_MODULE_8__["default"])({
        phone: nationalPhoneNumber,
        country: country
      }, undefined, metadata.metadata)) {
        return country;
      }
  }
}
/**
 * @param  {string} text - Input.
 * @return {object} `{ ?number, ?ext }`.
 */


function parseInput(text, v2) {
  // Parse RFC 3966 phone number URI.
  if (text && text.indexOf('tel:') === 0) {
    return Object(_RFC3966__WEBPACK_IMPORTED_MODULE_12__["parseRFC3966"])(text);
  }

  var number = extractFormattedPhoneNumber(text, v2); // If the phone number is not viable, then abort.

  if (!number || !Object(_isViablePhoneNumber__WEBPACK_IMPORTED_MODULE_4__["default"])(number)) {
    return {};
  } // Attempt to parse extension first, since it doesn't require region-specific
  // data and we want to have the non-normalised number here.


  var withExtensionStripped = Object(_extension__WEBPACK_IMPORTED_MODULE_5__["extractExtension"])(number);

  if (withExtensionStripped.ext) {
    return withExtensionStripped;
  }

  return {
    number: number
  };
}
/**
 * Creates `parse()` result object.
 */


function result(country, nationalNumber, ext) {
  var result = {
    country: country,
    phone: nationalNumber
  };

  if (ext) {
    result.ext = ext;
  }

  return result;
}
/**
 * Parses a viable phone number.
 * @param {string} formattedPhoneNumber — Example: "(213) 373-4253".
 * @param {string} [defaultCountry]
 * @param {string} [defaultCallingCode]
 * @param {Metadata} metadata
 * @return {object} Returns `{ country: string?, countryCallingCode: string?, nationalNumber: string? }`.
 */


function parsePhoneNumber(formattedPhoneNumber, defaultCountry, defaultCallingCode, metadata) {
  // Extract calling code from phone number.
  var _extractCountryCallin = extractCountryCallingCode(Object(_parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_6__["default"])(formattedPhoneNumber), defaultCountry, defaultCallingCode, metadata.metadata),
      countryCallingCode = _extractCountryCallin.countryCallingCode,
      number = _extractCountryCallin.number; // Choose a country by `countryCallingCode`.


  var country;

  if (countryCallingCode) {
    metadata.selectNumberingPlan(countryCallingCode);
  } // If `formattedPhoneNumber` is in "national" format
  // then `number` is defined and `countryCallingCode` isn't.
  else if (number && (defaultCountry || defaultCallingCode)) {
      metadata.selectNumberingPlan(defaultCountry, defaultCallingCode);

      if (defaultCountry) {
        country = defaultCountry;
      } else {
        /* istanbul ignore if */
        if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
          if (metadata.isNonGeographicCallingCode(defaultCallingCode)) {
            country = '001';
          }
        }
      }

      countryCallingCode = defaultCallingCode || Object(_getCountryCallingCode__WEBPACK_IMPORTED_MODULE_7__["default"])(defaultCountry, metadata.metadata);
    } else return {};

  if (!number) {
    return {
      countryCallingCode: countryCallingCode
    };
  }

  var _extractNationalNumbe = extractNationalNumber(Object(_parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_6__["default"])(number), metadata),
      nationalNumber = _extractNationalNumbe.nationalNumber,
      carrierCode = _extractNationalNumbe.carrierCode; // Sometimes there are several countries
  // corresponding to the same country phone code
  // (e.g. NANPA countries all having `1` country phone code).
  // Therefore, to reliably determine the exact country,
  // national (significant) number should have been parsed first.
  //
  // When `metadata.json` is generated, all "ambiguous" country phone codes
  // get their countries populated with the full set of
  // "phone number type" regular expressions.
  //


  var exactCountry = findCountryCode(countryCallingCode, nationalNumber, metadata);

  if (exactCountry) {
    country = exactCountry;
    /* istanbul ignore if */

    if (exactCountry === '001') {// Can't happen with `USE_NON_GEOGRAPHIC_COUNTRY_CODE` being `false`.
      // If `USE_NON_GEOGRAPHIC_COUNTRY_CODE` is set to `true` for some reason,
      // then remove the "istanbul ignore if".
    } else {
      metadata.country(country);
    }
  }

  return {
    country: country,
    countryCallingCode: countryCallingCode,
    nationalNumber: nationalNumber,
    carrierCode: carrierCode
  };
}
/**
 * Strips national prefix and carrier code from a complete phone number.
 * The difference from the non-"FromCompleteNumber" function is that
 * it won't extract national prefix if the resultant number is too short
 * to be a complete number for the selected phone numbering plan.
 * @param  {string} number — Complete phone number digits.
 * @param  {Metadata} metadata — Metadata with a phone numbering plan selected.
 * @return {object} `{ nationalNumber: string, carrierCode: string? }`.
 */


function extractNationalNumber(number, metadata) {
  // Parsing national prefixes and carrier codes
  // is only required for local phone numbers
  // but some people don't understand that
  // and sometimes write international phone numbers
  // with national prefixes (or maybe even carrier codes).
  // http://ucken.blogspot.ru/2016/03/trunk-prefixes-in-skype4b.html
  // Google's original library forgives such mistakes
  // and so does this library, because it has been requested:
  // https://github.com/catamphetamine/libphonenumber-js/issues/127
  var _extractNationalNumbe2 = extractNationalNumberFromPossiblyIncompleteNumber(number, metadata),
      nationalNumber = _extractNationalNumbe2.nationalNumber,
      carrierCode = _extractNationalNumbe2.carrierCode;

  if (!shouldExtractNationalPrefix(number, nationalNumber, metadata)) {
    // Don't strip the national prefix.
    return {
      nationalNumber: number
    };
  } // If a national prefix has been extracted, check to see
  // if the resultant number isn't too short.
  // Same code in Google's `libphonenumber`:
  // https://github.com/google/libphonenumber/blob/e326fa1fc4283bb05eb35cb3c15c18f98a31af33/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberUtil.java#L3291-L3302
  // For some reason, they do this check right after the `national_number_pattern` check
  // this library does in `shouldExtractNationalPrefix()` function.
  // Why is there a second "resultant" number validity check?
  // They don't provide an explanation.
  // This library just copies the behavior.


  if (number.length !== nationalNumber.length + (carrierCode ? carrierCode.length : 0)) {
    // If not using legacy generated metadata (before version `1.0.18`)
    // then it has "possible lengths", so use those to validate the number length.
    if (metadata.possibleLengths()) {
      // "We require that the NSN remaining after stripping the national prefix and
      // carrier code be long enough to be a possible length for the region.
      // Otherwise, we don't do the stripping, since the original number could be
      // a valid short number."
      // https://github.com/google/libphonenumber/blob/876268eb1ad6cdc1b7b5bef17fc5e43052702d57/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberUtil.java#L3236-L3250
      switch (Object(_checkNumberLength__WEBPACK_IMPORTED_MODULE_9__["default"])(nationalNumber, metadata)) {
        case 'TOO_SHORT':
        case 'INVALID_LENGTH':
          // case 'IS_POSSIBLE_LOCAL_ONLY':
          // Don't strip the national prefix.
          return {
            nationalNumber: number
          };
      }
    }
  }

  return {
    nationalNumber: nationalNumber,
    carrierCode: carrierCode
  };
}
/**
 * Converts a phone number digits (possibly with a `+`)
 * into a calling code and the rest phone number digits.
 * The "rest phone number digits" could include
 * a national prefix, carrier code, and national
 * (significant) number.
 * @param  {string} number — Phone number digits (possibly with a `+`).
 * @param  {string} [country] — Default country.
 * @param  {string} [callingCode] — Default calling code (some phone numbering plans are non-geographic).
 * @param  {object} metadata
 * @return {object} `{ countryCallingCode: string?, number: string }`
 * @example
 * // Returns `{ countryCallingCode: "1", number: "2133734253" }`.
 * extractCountryCallingCode('2133734253', 'US', null, metadata)
 * extractCountryCallingCode('2133734253', null, '1', metadata)
 * extractCountryCallingCode('+12133734253', null, null, metadata)
 * extractCountryCallingCode('+12133734253', 'RU', null, metadata)
 */

function extractCountryCallingCode(number, country, callingCode, metadata) {
  if (!number) {
    return {};
  } // If this is not an international phone number,
  // then either extract an "IDD" prefix, or extract a
  // country calling code from a number by autocorrecting it
  // by prepending a leading `+` in cases when it starts
  // with the country calling code.
  // https://wikitravel.org/en/International_dialling_prefix
  // https://github.com/catamphetamine/libphonenumber-js/issues/376


  if (number[0] !== '+') {
    // Convert an "out-of-country" dialing phone number
    // to a proper international phone number.
    var numberWithoutIDD = Object(_IDD__WEBPACK_IMPORTED_MODULE_11__["stripIDDPrefix"])(number, country, callingCode, metadata); // If an IDD prefix was stripped then
    // convert the number to international one
    // for subsequent parsing.

    if (numberWithoutIDD && numberWithoutIDD !== number) {
      number = '+' + numberWithoutIDD;
    } else {
      // Check to see if the number starts with the country calling code
      // for the default country. If so, we remove the country calling code,
      // and do some checks on the validity of the number before and after.
      // https://github.com/catamphetamine/libphonenumber-js/issues/376
      if (country || callingCode) {
        var _extractCountryCallin2 = extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(number, country, callingCode, metadata),
            countryCallingCode = _extractCountryCallin2.countryCallingCode,
            shorterNumber = _extractCountryCallin2.number;

        if (countryCallingCode) {
          return {
            countryCallingCode: countryCallingCode,
            number: shorterNumber
          };
        }
      }

      return {
        number: number
      };
    }
  } // Fast abortion: country codes do not begin with a '0'


  if (number[1] === '0') {
    return {};
  }

  metadata = new _metadata__WEBPACK_IMPORTED_MODULE_3__["default"](metadata); // The thing with country phone codes
  // is that they are orthogonal to each other
  // i.e. there's no such country phone code A
  // for which country phone code B exists
  // where B starts with A.
  // Therefore, while scanning digits,
  // if a valid country code is found,
  // that means that it is the country code.
  //

  var i = 2;

  while (i - 1 <= _constants__WEBPACK_IMPORTED_MODULE_0__["MAX_LENGTH_COUNTRY_CODE"] && i <= number.length) {
    var _countryCallingCode = number.slice(1, i);

    if (metadata.hasCallingCode(_countryCallingCode)) {
      metadata.selectNumberingPlan(_countryCallingCode);
      return {
        countryCallingCode: _countryCallingCode,
        number: number.slice(i)
      };
    }

    i++;
  }

  return {};
}
/**
 * Sometimes some people incorrectly input international phone numbers
 * without the leading `+`. This function corrects such input.
 * @param  {string} number — Phone number digits.
 * @param  {string?} country
 * @param  {string?} callingCode
 * @param  {object} metadata
 * @return {object} `{ countryCallingCode: string?, number: string }`.
 */

function extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(number, country, callingCode, metadata) {
  var countryCallingCode = country ? Object(_getCountryCallingCode__WEBPACK_IMPORTED_MODULE_7__["default"])(country, metadata) : callingCode;

  if (number.indexOf(countryCallingCode) === 0) {
    metadata = new _metadata__WEBPACK_IMPORTED_MODULE_3__["default"](metadata);
    metadata.selectNumberingPlan(country, callingCode);
    var possibleShorterNumber = number.slice(countryCallingCode.length);

    var _extractNationalNumbe3 = extractNationalNumber(possibleShorterNumber, metadata),
        possibleShorterNationalNumber = _extractNationalNumbe3.nationalNumber;

    var _extractNationalNumbe4 = extractNationalNumber(number, metadata),
        nationalNumber = _extractNationalNumbe4.nationalNumber; // If the number was not valid before but is valid now,
    // or if it was too long before, we consider the number
    // with the country calling code stripped to be a better result
    // and keep that instead.
    // For example, in Germany (+49), `49` is a valid area code,
    // so if a number starts with `49`, it could be both a valid
    // national German number or an international number without
    // a leading `+`.


    if (!Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(nationalNumber, metadata.nationalNumberPattern()) && Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(possibleShorterNationalNumber, metadata.nationalNumberPattern()) || Object(_checkNumberLength__WEBPACK_IMPORTED_MODULE_9__["default"])(nationalNumber, metadata) === 'TOO_LONG') {
      return {
        countryCallingCode: countryCallingCode,
        number: possibleShorterNumber
      };
    }
  }

  return {
    number: number
  };
}
//# sourceMappingURL=parse_.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/searchNumbers.js":
/*!*************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/searchNumbers.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return searchNumbers; });
/* harmony import */ var _parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsePhoneNumber */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js");
/* harmony import */ var _PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhoneNumberMatcher */ "./node_modules/libphonenumber-js/es6/PhoneNumberMatcher.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * @return ES6 `for ... of` iterator.
 */

function searchNumbers() {
  var _normalizeArguments = Object(_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_0__["normalizeArguments"])(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  var matcher = new _PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_1__["default"](text, options, metadata);
  return _defineProperty({}, Symbol.iterator, function () {
    return {
      next: function next() {
        if (matcher.hasNext()) {
          return {
            done: false,
            value: matcher.next()
          };
        }

        return {
          done: true
        };
      }
    };
  });
}
//# sourceMappingURL=searchNumbers.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/searchPhoneNumbersInText.js":
/*!************************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/searchPhoneNumbersInText.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return searchPhoneNumbersInText; });
/* harmony import */ var _searchNumbers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./searchNumbers */ "./node_modules/libphonenumber-js/es6/searchNumbers.js");
/* harmony import */ var _findPhoneNumbersInText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./findPhoneNumbersInText */ "./node_modules/libphonenumber-js/es6/findPhoneNumbersInText.js");


function searchPhoneNumbersInText(text, defaultCountry, options, metadata) {
  var args = Object(_findPhoneNumbersInText__WEBPACK_IMPORTED_MODULE_1__["getArguments"])(defaultCountry, options, metadata);
  return Object(_searchNumbers__WEBPACK_IMPORTED_MODULE_0__["default"])(text, args.options, args.metadata);
}
//# sourceMappingURL=searchPhoneNumbersInText.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/tools/semver-compare.js":
/*!********************************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/tools/semver-compare.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Copy-pasted from:
// https://github.com/substack/semver-compare/blob/master/index.js
//
// Inlining this function because some users reported issues with
// importing from `semver-compare` in a browser with ES6 "native" modules.
//
// Fixes `semver-compare` not being able to compare versions with alpha/beta/etc "tags".
// https://github.com/catamphetamine/libphonenumber-js/issues/381
/* harmony default export */ __webpack_exports__["default"] = (function (a, b) {
  a = a.split('-');
  b = b.split('-');
  var pa = a[0].split('.');
  var pb = b[0].split('.');

  for (var i = 0; i < 3; i++) {
    var na = Number(pa[i]);
    var nb = Number(pb[i]);
    if (na > nb) return 1;
    if (nb > na) return -1;
    if (!isNaN(na) && isNaN(nb)) return 1;
    if (isNaN(na) && !isNaN(nb)) return -1;
  }

  if (a[1] && b[1]) {
    return a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0;
  }

  return !a[1] && b[1] ? 1 : a[1] && !b[1] ? -1 : 0;
});
//# sourceMappingURL=semver-compare.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/util.js":
/*!****************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/util.js ***!
  \****************************************************/
/*! exports provided: matchesEntirely, mergeArrays */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchesEntirely", function() { return matchesEntirely; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeArrays", function() { return mergeArrays; });
/**
 * Checks whether the entire input sequence can be matched
 * against the regular expression.
 * @return {boolean}
 */
function matchesEntirely(text, regular_expression) {
  // If assigning the `''` default value is moved to the arguments above,
  // code coverage would decrease for some weird reason.
  text = text || '';
  return new RegExp('^(?:' + regular_expression + ')$').test(text);
}
/**
 * Merges two arrays.
 * @param  {*} a
 * @param  {*} b
 * @return {*}
 */

function mergeArrays(a, b) {
  var merged = a.slice();

  for (var _iterator = b, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var element = _ref;

    if (a.indexOf(element) < 0) {
      merged.push(element);
    }
  }

  return merged.sort(function (a, b) {
    return a - b;
  }); // ES6 version, requires Set polyfill.
  // let merged = new Set(a)
  // for (const element of b)
  // {
  // 	merged.add(i)
  // }
  // return Array.from(merged).sort((a, b) => a - b)
}
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/validate.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isValidNumber; });
/* harmony import */ var _validate___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate_ */ "./node_modules/libphonenumber-js/es6/validate_.js");
/* harmony import */ var _getNumberType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getNumberType */ "./node_modules/libphonenumber-js/es6/getNumberType.js");

 // Finds out national phone number type (fixed line, mobile, etc)

function isValidNumber() {
  var _normalizeArguments = Object(_getNumberType__WEBPACK_IMPORTED_MODULE_1__["normalizeArguments"])(arguments),
      input = _normalizeArguments.input,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return Object(_validate___WEBPACK_IMPORTED_MODULE_0__["default"])(input, options, metadata);
}
//# sourceMappingURL=validate.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/es6/validate_.js":
/*!*********************************************************!*\
  !*** ./node_modules/libphonenumber-js/es6/validate_.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isValidNumber; });
/* harmony import */ var _metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./node_modules/libphonenumber-js/es6/util.js");
/* harmony import */ var _getNumberType___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getNumberType_ */ "./node_modules/libphonenumber-js/es6/getNumberType_.js");



/**
 * Checks if a given phone number is valid.
 *
 * If the `number` is a string, it will be parsed to an object,
 * but only if it contains only valid phone number characters (including punctuation).
 * If the `number` is an object, it is used as is.
 *
 * The optional `defaultCountry` argument is the default country.
 * I.e. it does not restrict to just that country,
 * e.g. in those cases where several countries share
 * the same phone numbering rules (NANPA, Britain, etc).
 * For example, even though the number `07624 369230`
 * belongs to the Isle of Man ("IM" country code)
 * calling `isValidNumber('07624369230', 'GB', metadata)`
 * still returns `true` because the country is not restricted to `GB`,
 * it's just that `GB` is the default one for the phone numbering rules.
 * For restricting the country see `isValidNumberForRegion()`
 * though restricting a country might not be a good idea.
 * https://github.com/googlei18n/libphonenumber/blob/master/FAQ.md#when-should-i-use-isvalidnumberforregion
 *
 * Examples:
 *
 * ```js
 * isValidNumber('+78005553535', metadata)
 * isValidNumber('8005553535', 'RU', metadata)
 * isValidNumber('88005553535', 'RU', metadata)
 * isValidNumber({ phone: '8005553535', country: 'RU' }, metadata)
 * ```
 */

function isValidNumber(input, options, metadata) {
  // If assigning the `{}` default value is moved to the arguments above,
  // code coverage would decrease for some weird reason.
  options = options || {};
  metadata = new _metadata__WEBPACK_IMPORTED_MODULE_0__["default"](metadata); // This is just to support `isValidNumber({})`
  // for cases when `parseNumber()` returns `{}`.

  if (!input.country) {
    return false;
  }

  metadata.selectNumberingPlan(input.country, input.countryCallingCode); // By default, countries only have type regexps when it's required for
  // distinguishing different countries having the same `countryCallingCode`.

  if (metadata.hasTypes()) {
    return Object(_getNumberType___WEBPACK_IMPORTED_MODULE_2__["default"])(input, options, metadata.metadata) !== undefined;
  } // If there are no type regexps for this country in metadata then use
  // `nationalNumberPattern` as a "better than nothing" replacement.


  var national_number = options.v2 ? input.nationalNumber : input.phone;
  return Object(_util__WEBPACK_IMPORTED_MODULE_1__["matchesEntirely"])(national_number, metadata.nationalNumberPattern());
}
//# sourceMappingURL=validate_.js.map

/***/ }),

/***/ "./node_modules/libphonenumber-js/index.es6.js":
/*!*****************************************************!*\
  !*** ./node_modules/libphonenumber-js/index.es6.js ***!
  \*****************************************************/
/*! exports provided: Metadata, parseIncompletePhoneNumber, parsePhoneNumberCharacter, DIGITS, parseDigits, ParseError, parsePhoneNumberWithError, parsePhoneNumber, parsePhoneNumberFromString, default, parseNumber, parse, formatNumber, format, getNumberType, getExampleNumber, isPossibleNumber, isValidNumber, isValidNumberForRegion, findPhoneNumbers, searchPhoneNumbers, PhoneNumberSearch, findNumbers, searchNumbers, findPhoneNumbersInText, searchPhoneNumbersInText, PhoneNumberMatcher, AsYouType, isSupportedCountry, getExtPrefix, parseRFC3966, formatRFC3966, formatIncompletePhoneNumber, parseCustom, formatCustom, isValidNumberCustom, findPhoneNumbersCustom, searchPhoneNumbersCustom, PhoneNumberSearchCustom, getNumberTypeCustom, getCountryCallingCodeCustom, AsYouTypeCustom, DIGIT_PLACEHOLDER, getCountries, getCountryCallingCode, getPhoneCode, getPhoneCodeCustom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePhoneNumberWithError", function() { return parsePhoneNumberWithError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePhoneNumber", function() { return parsePhoneNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePhoneNumberFromString", function() { return parsePhoneNumberFromString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseNumber", function() { return parseNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatNumber", function() { return formatNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNumberType", function() { return getNumberType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExampleNumber", function() { return getExampleNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPossibleNumber", function() { return isPossibleNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidNumber", function() { return isValidNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidNumberForRegion", function() { return isValidNumberForRegion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findPhoneNumbers", function() { return findPhoneNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchPhoneNumbers", function() { return searchPhoneNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhoneNumberSearch", function() { return PhoneNumberSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findNumbers", function() { return findNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchNumbers", function() { return searchNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findPhoneNumbersInText", function() { return findPhoneNumbersInText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchPhoneNumbersInText", function() { return searchPhoneNumbersInText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhoneNumberMatcher", function() { return PhoneNumberMatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsYouType", function() { return AsYouType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSupportedCountry", function() { return isSupportedCountry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExtPrefix", function() { return getExtPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseRFC3966", function() { return parseRFC3966; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatRFC3966", function() { return formatRFC3966; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatIncompletePhoneNumber", function() { return formatIncompletePhoneNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCountries", function() { return getCountries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCountryCallingCode", function() { return getCountryCallingCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPhoneCode", function() { return getPhoneCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPhoneCodeCustom", function() { return getPhoneCodeCustom; });
/* harmony import */ var _metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metadata.min.json.js */ "./node_modules/libphonenumber-js/metadata.min.json.js");
/* harmony import */ var _es6_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./es6/parsePhoneNumber */ "./node_modules/libphonenumber-js/es6/parsePhoneNumber.js");
/* harmony import */ var _es6_parsePhoneNumberFromString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./es6/parsePhoneNumberFromString */ "./node_modules/libphonenumber-js/es6/parsePhoneNumberFromString.js");
/* harmony import */ var _es6_parse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./es6/parse */ "./node_modules/libphonenumber-js/es6/parse.js");
/* harmony import */ var _es6_format__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./es6/format */ "./node_modules/libphonenumber-js/es6/format.js");
/* harmony import */ var _es6_getNumberType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./es6/getNumberType */ "./node_modules/libphonenumber-js/es6/getNumberType.js");
/* harmony import */ var _es6_getExampleNumber__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./es6/getExampleNumber */ "./node_modules/libphonenumber-js/es6/getExampleNumber.js");
/* harmony import */ var _es6_isPossibleNumber__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./es6/isPossibleNumber */ "./node_modules/libphonenumber-js/es6/isPossibleNumber.js");
/* harmony import */ var _es6_validate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./es6/validate */ "./node_modules/libphonenumber-js/es6/validate.js");
/* harmony import */ var _es6_isValidNumberForRegion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./es6/isValidNumberForRegion */ "./node_modules/libphonenumber-js/es6/isValidNumberForRegion.js");
/* harmony import */ var _es6_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./es6/findPhoneNumbers */ "./node_modules/libphonenumber-js/es6/findPhoneNumbers.js");
/* harmony import */ var _es6_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./es6/findPhoneNumbers_ */ "./node_modules/libphonenumber-js/es6/findPhoneNumbers_.js");
/* harmony import */ var _es6_findNumbers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./es6/findNumbers */ "./node_modules/libphonenumber-js/es6/findNumbers.js");
/* harmony import */ var _es6_searchNumbers__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./es6/searchNumbers */ "./node_modules/libphonenumber-js/es6/searchNumbers.js");
/* harmony import */ var _es6_findPhoneNumbersInText__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./es6/findPhoneNumbersInText */ "./node_modules/libphonenumber-js/es6/findPhoneNumbersInText.js");
/* harmony import */ var _es6_searchPhoneNumbersInText__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./es6/searchPhoneNumbersInText */ "./node_modules/libphonenumber-js/es6/searchPhoneNumbersInText.js");
/* harmony import */ var _es6_PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./es6/PhoneNumberMatcher */ "./node_modules/libphonenumber-js/es6/PhoneNumberMatcher.js");
/* harmony import */ var _es6_AsYouType__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./es6/AsYouType */ "./node_modules/libphonenumber-js/es6/AsYouType.js");
/* harmony import */ var _es6_getCountryCallingCode__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./es6/getCountryCallingCode */ "./node_modules/libphonenumber-js/es6/getCountryCallingCode.js");
/* harmony import */ var _es6_getCountries__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./es6/getCountries */ "./node_modules/libphonenumber-js/es6/getCountries.js");
/* harmony import */ var _es6_metadata__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./es6/metadata */ "./node_modules/libphonenumber-js/es6/metadata.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Metadata", function() { return _es6_metadata__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _es6_RFC3966__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./es6/RFC3966 */ "./node_modules/libphonenumber-js/es6/RFC3966.js");
/* harmony import */ var _es6_formatIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./es6/formatIncompletePhoneNumber */ "./node_modules/libphonenumber-js/es6/formatIncompletePhoneNumber.js");
/* harmony import */ var _es6_parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./es6/parseIncompletePhoneNumber */ "./node_modules/libphonenumber-js/es6/parseIncompletePhoneNumber.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseIncompletePhoneNumber", function() { return _es6_parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parsePhoneNumberCharacter", function() { return _es6_parseIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_23__["parsePhoneNumberCharacter"]; });

/* harmony import */ var _es6_parseDigits__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./es6/parseDigits */ "./node_modules/libphonenumber-js/es6/parseDigits.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DIGITS", function() { return _es6_parseDigits__WEBPACK_IMPORTED_MODULE_24__["DIGITS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseDigits", function() { return _es6_parseDigits__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony import */ var _es6_ParseError__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./es6/ParseError */ "./node_modules/libphonenumber-js/es6/ParseError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParseError", function() { return _es6_ParseError__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseCustom", function() { return _es6_parse__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatCustom", function() { return _es6_format__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isValidNumberCustom", function() { return _es6_validate__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findPhoneNumbersCustom", function() { return _es6_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "searchPhoneNumbersCustom", function() { return _es6_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_10__["searchPhoneNumbers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PhoneNumberSearchCustom", function() { return _es6_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_11__["PhoneNumberSearch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getNumberTypeCustom", function() { return _es6_getNumberType__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getCountryCallingCodeCustom", function() { return _es6_getCountryCallingCode__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AsYouTypeCustom", function() { return _es6_AsYouType__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DIGIT_PLACEHOLDER", function() { return _es6_AsYouType__WEBPACK_IMPORTED_MODULE_17__["DIGIT_PLACEHOLDER"]; });

// Deprecated.
// Use `libphonenumber-js/min` or `libphonenumber-js/max` or `libphonenumber-js/core` instead.

// Importing from `.json.js` a workaround for a bug in web browsers' "native"
// ES6 importing system which is uncapable of importing "*.json" files.
// https://github.com/catamphetamine/libphonenumber-js/issues/239













// Deprecated


















// Deprecated: remove DIGITS export in 2.0.0.
// (it was used in `react-phone-number-input`)



function parsePhoneNumberWithError()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_parsePhoneNumber__WEBPACK_IMPORTED_MODULE_1__["default"].apply(this, parameters)
}

// `parsePhoneNumber()` named export has been renamed to `parsePhoneNumberWithError()`.
var parsePhoneNumber = parsePhoneNumberWithError

// `parsePhoneNumberFromString()` named export is now considered legacy:
// it has been promoted to a default export due to being too verbose.
function parsePhoneNumberFromString()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_parsePhoneNumberFromString__WEBPACK_IMPORTED_MODULE_2__["default"].apply(this, parameters)
}

/* harmony default export */ __webpack_exports__["default"] = (parsePhoneNumberFromString);

function parseNumber()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_parse__WEBPACK_IMPORTED_MODULE_3__["default"].apply(this, parameters)
}

// Deprecated: remove `parse()` export in 2.0.0.
// (renamed to `parseNumber()`)
function parse()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_parse__WEBPACK_IMPORTED_MODULE_3__["default"].apply(this, parameters)
}

function formatNumber()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_format__WEBPACK_IMPORTED_MODULE_4__["default"].apply(this, parameters)
}

// Deprecated: remove `format()` export in 2.0.0.
// (renamed to `formatNumber()`)
function format()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_format__WEBPACK_IMPORTED_MODULE_4__["default"].apply(this, parameters)
}

function getNumberType()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_getNumberType__WEBPACK_IMPORTED_MODULE_5__["default"].apply(this, parameters)
}

function getExampleNumber()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_getExampleNumber__WEBPACK_IMPORTED_MODULE_6__["default"].apply(this, parameters)
}

function isPossibleNumber()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_isPossibleNumber__WEBPACK_IMPORTED_MODULE_7__["default"].apply(this, parameters)
}

function isValidNumber()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_validate__WEBPACK_IMPORTED_MODULE_8__["default"].apply(this, parameters)
}

function isValidNumberForRegion()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_isValidNumberForRegion__WEBPACK_IMPORTED_MODULE_9__["default"].apply(this, parameters)
}

// Deprecated.
function findPhoneNumbers()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_10__["default"].apply(this, parameters)
}

// Deprecated.
function searchPhoneNumbers()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_findPhoneNumbers__WEBPACK_IMPORTED_MODULE_10__["searchPhoneNumbers"].apply(this, parameters)
}

// Deprecated.
function PhoneNumberSearch(text, options)
{
	_es6_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_11__["PhoneNumberSearch"].call(this, text, options, _metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
}

// Deprecated.
PhoneNumberSearch.prototype = Object.create(_es6_findPhoneNumbers___WEBPACK_IMPORTED_MODULE_11__["PhoneNumberSearch"].prototype, {})
PhoneNumberSearch.prototype.constructor = PhoneNumberSearch

function findNumbers()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_findNumbers__WEBPACK_IMPORTED_MODULE_12__["default"].apply(this, parameters)
}

function searchNumbers()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_searchNumbers__WEBPACK_IMPORTED_MODULE_13__["default"].apply(this, parameters)
}

function findPhoneNumbersInText()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_findPhoneNumbersInText__WEBPACK_IMPORTED_MODULE_14__["default"].apply(this, parameters)
}

function searchPhoneNumbersInText()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_searchPhoneNumbersInText__WEBPACK_IMPORTED_MODULE_15__["default"].apply(this, parameters)
}

function PhoneNumberMatcher(text, options)
{
	_es6_PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_16__["default"].call(this, text, options, _metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
}

PhoneNumberMatcher.prototype = Object.create(_es6_PhoneNumberMatcher__WEBPACK_IMPORTED_MODULE_16__["default"].prototype, {})
PhoneNumberMatcher.prototype.constructor = PhoneNumberMatcher

function AsYouType(country)
{
	_es6_AsYouType__WEBPACK_IMPORTED_MODULE_17__["default"].call(this, country, _metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
}

AsYouType.prototype = Object.create(_es6_AsYouType__WEBPACK_IMPORTED_MODULE_17__["default"].prototype, {})
AsYouType.prototype.constructor = AsYouType

function isSupportedCountry()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_metadata__WEBPACK_IMPORTED_MODULE_20__["isSupportedCountry"].apply(this, parameters)
}

function getExtPrefix()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_metadata__WEBPACK_IMPORTED_MODULE_20__["getExtPrefix"].apply(this, parameters)
}

function parseRFC3966()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_RFC3966__WEBPACK_IMPORTED_MODULE_21__["parseRFC3966"].apply(this, parameters)
}

function formatRFC3966()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_RFC3966__WEBPACK_IMPORTED_MODULE_21__["formatRFC3966"].apply(this, parameters)
}

function formatIncompletePhoneNumber()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
	return _es6_formatIncompletePhoneNumber__WEBPACK_IMPORTED_MODULE_22__["default"].apply(this, parameters)
}

// Deprecated: remove this in 2.0.0 and make `custom.js` in ES6
// (the old `custom.js` becomes `custom.commonjs.js`).











function getCountries()
{
	return Object(_es6_getCountries__WEBPACK_IMPORTED_MODULE_19__["default"])(_metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
}

function getCountryCallingCode(country)
{
	return Object(_es6_getCountryCallingCode__WEBPACK_IMPORTED_MODULE_18__["default"])(country, _metadata_min_json_js__WEBPACK_IMPORTED_MODULE_0__["default"])
}

// `getPhoneCode` name is deprecated, use `getCountryCallingCode` instead.
function getPhoneCode(country)
{
	return getCountryCallingCode(country)
}

// `getPhoneCodeCustom` name is deprecated, use `getCountryCallingCodeCustom` instead.
function getPhoneCodeCustom(country, metadata)
{
	return Object(_es6_getCountryCallingCode__WEBPACK_IMPORTED_MODULE_18__["default"])(country, metadata)
}

/***/ }),

/***/ "./node_modules/libphonenumber-js/metadata.min.json.js":
/*!*************************************************************!*\
  !*** ./node_modules/libphonenumber-js/metadata.min.json.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// This file is a workaround for a bug in web browsers' "native"
// ES6 importing system which is uncapable of importing "*.json" files.
// https://github.com/catamphetamine/libphonenumber-js/issues/239
/* harmony default export */ __webpack_exports__["default"] = ({"version":"1.8.7","country_calling_codes":{"1":["US","AG","AI","AS","BB","BM","BS","CA","DM","DO","GD","GU","JM","KN","KY","LC","MP","MS","PR","SX","TC","TT","VC","VG","VI"],"7":["RU","KZ"],"20":["EG"],"27":["ZA"],"30":["GR"],"31":["NL"],"32":["BE"],"33":["FR"],"34":["ES"],"36":["HU"],"39":["IT","VA"],"40":["RO"],"41":["CH"],"43":["AT"],"44":["GB","GG","IM","JE"],"45":["DK"],"46":["SE"],"47":["NO","SJ"],"48":["PL"],"49":["DE"],"51":["PE"],"52":["MX"],"53":["CU"],"54":["AR"],"55":["BR"],"56":["CL"],"57":["CO"],"58":["VE"],"60":["MY"],"61":["AU","CC","CX"],"62":["ID"],"63":["PH"],"64":["NZ"],"65":["SG"],"66":["TH"],"81":["JP"],"82":["KR"],"84":["VN"],"86":["CN"],"90":["TR"],"91":["IN"],"92":["PK"],"93":["AF"],"94":["LK"],"95":["MM"],"98":["IR"],"211":["SS"],"212":["MA","EH"],"213":["DZ"],"216":["TN"],"218":["LY"],"220":["GM"],"221":["SN"],"222":["MR"],"223":["ML"],"224":["GN"],"225":["CI"],"226":["BF"],"227":["NE"],"228":["TG"],"229":["BJ"],"230":["MU"],"231":["LR"],"232":["SL"],"233":["GH"],"234":["NG"],"235":["TD"],"236":["CF"],"237":["CM"],"238":["CV"],"239":["ST"],"240":["GQ"],"241":["GA"],"242":["CG"],"243":["CD"],"244":["AO"],"245":["GW"],"246":["IO"],"247":["AC"],"248":["SC"],"249":["SD"],"250":["RW"],"251":["ET"],"252":["SO"],"253":["DJ"],"254":["KE"],"255":["TZ"],"256":["UG"],"257":["BI"],"258":["MZ"],"260":["ZM"],"261":["MG"],"262":["RE","YT"],"263":["ZW"],"264":["NA"],"265":["MW"],"266":["LS"],"267":["BW"],"268":["SZ"],"269":["KM"],"290":["SH","TA"],"291":["ER"],"297":["AW"],"298":["FO"],"299":["GL"],"350":["GI"],"351":["PT"],"352":["LU"],"353":["IE"],"354":["IS"],"355":["AL"],"356":["MT"],"357":["CY"],"358":["FI","AX"],"359":["BG"],"370":["LT"],"371":["LV"],"372":["EE"],"373":["MD"],"374":["AM"],"375":["BY"],"376":["AD"],"377":["MC"],"378":["SM"],"380":["UA"],"381":["RS"],"382":["ME"],"383":["XK"],"385":["HR"],"386":["SI"],"387":["BA"],"389":["MK"],"420":["CZ"],"421":["SK"],"423":["LI"],"500":["FK"],"501":["BZ"],"502":["GT"],"503":["SV"],"504":["HN"],"505":["NI"],"506":["CR"],"507":["PA"],"508":["PM"],"509":["HT"],"590":["GP","BL","MF"],"591":["BO"],"592":["GY"],"593":["EC"],"594":["GF"],"595":["PY"],"596":["MQ"],"597":["SR"],"598":["UY"],"599":["CW","BQ"],"670":["TL"],"672":["NF"],"673":["BN"],"674":["NR"],"675":["PG"],"676":["TO"],"677":["SB"],"678":["VU"],"679":["FJ"],"680":["PW"],"681":["WF"],"682":["CK"],"683":["NU"],"685":["WS"],"686":["KI"],"687":["NC"],"688":["TV"],"689":["PF"],"690":["TK"],"691":["FM"],"692":["MH"],"850":["KP"],"852":["HK"],"853":["MO"],"855":["KH"],"856":["LA"],"880":["BD"],"886":["TW"],"960":["MV"],"961":["LB"],"962":["JO"],"963":["SY"],"964":["IQ"],"965":["KW"],"966":["SA"],"967":["YE"],"968":["OM"],"970":["PS"],"971":["AE"],"972":["IL"],"973":["BH"],"974":["QA"],"975":["BT"],"976":["MN"],"977":["NP"],"992":["TJ"],"993":["TM"],"994":["AZ"],"995":["GE"],"996":["KG"],"998":["UZ"]},"countries":{"AC":["247","00","(?:[01589]\\d|[46])\\d{4}",[5,6]],"AD":["376","00","(?:1|6\\d)\\d{7}|[135-9]\\d{5}",[6,8,9],[["(\\d{3})(\\d{3})","$1 $2",["[135-9]"]],["(\\d{4})(\\d{4})","$1 $2",["1"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]]]],"AE":["971","00","(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}",[5,6,7,8,9,10,11,12],[["(\\d{3})(\\d{2,9})","$1 $2",["60|8"]],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[236]|[479][2-8]"],"0$1"],["(\\d{3})(\\d)(\\d{5})","$1 $2 $3",["[479]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"]],"0"],"AF":["93","00","[2-7]\\d{8}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],"0"],"AG":["1","011","(?:268|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([457]\\d{6})$","268$1",0,"268"],"AI":["1","011","(?:264|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2457]\\d{6})$","264$1",0,"264"],"AL":["355","00","(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}",[6,7,8,9],[["(\\d{3})(\\d{3,4})","$1 $2",["80|9"],"0$1"],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["4[2-6]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2358][2-5]|4"],"0$1"],["(\\d{3})(\\d{5})","$1 $2",["[23578]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["6"],"0$1"]],"0"],"AM":["374","00","(?:[1-489]\\d|55|60|77)\\d{6}",[8],[["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[89]0"],"0 $1"],["(\\d{3})(\\d{5})","$1 $2",["2|3[12]"],"(0$1)"],["(\\d{2})(\\d{6})","$1 $2",["1|47"],"(0$1)"],["(\\d{2})(\\d{6})","$1 $2",["[3-9]"],"0$1"]],"0"],"AO":["244","00","[29]\\d{8}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[29]"]]]],"AR":["54","00","11\\d{8}|(?:[2368]|9\\d)\\d{9}",[10,11],[["(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])","2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],"0$1",1],["(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["1"],"0$1",1],["(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["[23]"],"0$1",1],["(\\d)(\\d{4})(\\d{2})(\\d{4})","$2 15-$3-$4",["9(?:2[2-469]|3[3-578])","9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))","9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],"0$1",0,"$1 $2 $3-$4"],["(\\d)(\\d{2})(\\d{4})(\\d{4})","$2 15-$3-$4",["91"],"0$1",0,"$1 $2 $3-$4"],["(\\d)(\\d{3})(\\d{3})(\\d{4})","$2 15-$3-$4",["9"],"0$1",0,"$1 $2 $3-$4"]],"0",0,"0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?","9$1"],"AS":["1","011","(?:[58]\\d\\d|684|900)\\d{7}",[10],0,"1",0,"1|([267]\\d{6})$","684$1",0,"684"],"AT":["43","00","1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}",[4,5,6,7,8,9,10,11,12,13],[["(\\d)(\\d{3,12})","$1 $2",["1(?:11|[2-9])"],"0$1"],["(\\d{3})(\\d{2})","$1 $2",["517"],"0$1"],["(\\d{2})(\\d{3,5})","$1 $2",["5[079]"],"0$1"],["(\\d{3})(\\d{3,10})","$1 $2",["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"],"0$1"],["(\\d{4})(\\d{3,9})","$1 $2",["[2-467]|5[2-6]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["5"],"0$1"],["(\\d{2})(\\d{4})(\\d{4,7})","$1 $2 $3",["5"],"0$1"]],"0"],"AU":["61","001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","1(?:[0-79]\\d{7,8}|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}",[5,6,7,8,9,10],[["(\\d{2})(\\d{3,4})","$1 $2",["16"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["14|4"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:30|[89])"]]],"0",0,"0|(183[12])",0,0,0,[["8(?:51(?:0(?:0[03-9]|[12479]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-7])|1(?:[0235689]\\d|1[0-69]|4[0-589]|7[0-47-9])|2(?:0[0-7]|3[2-4]|[4-6]\\d))|91(?:[0-57-9]\\d|6[0135-9])\\d)\\d{3}|(?:2(?:[0-26-9]\\d|3[0-8]|4[02-9]|5[0135-9])|3(?:[0-3589]\\d|4[0-578]|6[1-9]|7[0-35-9])|7(?:[013-57-9]\\d|2[0-8])|8(?:6[0-8]|[78]\\d|9[02-9]))\\d{6}",[9]],["4(?:83[0-38]|93[0-4])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-24-9]|9[0-27-9])\\d{6}",[9]],["180(?:0\\d{3}|2)\\d{3}",[7,10]],["190[0-26]\\d{6}",[10]],0,0,0,["163\\d{2,6}",[5,6,7,8,9]],["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}",[9]],["13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",[6,8,10]]],"0011"],"AW":["297","00","(?:[25-79]\\d\\d|800)\\d{4}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[25-9]"]]]],"AX":["358","00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))","2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}",[5,6,7,8,9,10,11,12],0,"0",0,0,0,0,"18",0,"00"],"AZ":["994","00","365\\d{6}|(?:[124579]\\d|60|88)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["90"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[28]|2|365|46","1[28]|2|365|46","1[28]|2|365(?:[0-46-9]|5[0-35-9])|46"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[13-9]"],"0$1"]],"0"],"BA":["387","00","6\\d{8}|(?:[35689]\\d|49|70)\\d{6}",[8,9],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-3]|[7-9]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]|6[56]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6"],"0$1"]],"0"],"BB":["1","011","(?:246|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","246$1",0,"246"],"BD":["880","00","1\\d{9}|2\\d{7,8}|88\\d{4,6}|(?:8[0-79]|9\\d)\\d{4,8}|(?:[346]\\d|[57])\\d{5,8}",[6,7,8,9,10],[["(\\d{2})(\\d{4,6})","$1-$2",["31[5-8]|[459]1"],"0$1"],["(\\d{3})(\\d{3,7})","$1-$2",["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:28|4[14]|5)|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"],"0$1"],["(\\d{4})(\\d{3,6})","$1-$2",["[13-9]"],"0$1"],["(\\d)(\\d{7,8})","$1-$2",["2"],"0$1"]],"0"],"BE":["32","00","4\\d{8}|[1-9]\\d{7}",[8,9],[["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:80|9)0"],"0$1"],["(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[239]|4[23]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[15-8]"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4"],"0$1"]],"0"],"BF":["226","00","[025-7]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[025-7]"]]]],"BG":["359","00","[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}",[6,7,8,9],[["(\\d)(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["2"],"0$1"],["(\\d{3})(\\d{4})","$1 $2",["43[1-6]|70[1-9]"],"0$1"],["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],"0$1"],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:70|8)0"],"0$1"],["(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[1-7]|7"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[48]|9[08]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"]],"0"],"BH":["973","00","[136-9]\\d{7}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[13679]|8[047]"]]]],"BI":["257","00","(?:[267]\\d|31)\\d{6}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2367]"]]]],"BJ":["229","00","(?:[2689]\\d|51)\\d{6}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[25689]"]]]],"BL":["590","00","(?:590|69\\d|976)\\d{6}",[9],0,"0",0,0,0,0,0,[["590(?:2[7-9]|5[12]|87)\\d{4}"],["69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}"],0,0,0,0,0,0,["976[01]\\d{5}"]]],"BM":["1","011","(?:441|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-8]\\d{6})$","441$1",0,"441"],"BN":["673","00","[2-578]\\d{6}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-578]"]]]],"BO":["591","00(?:1\\d)?","(?:[2-467]\\d\\d|8001)\\d{5}",[8,9],[["(\\d)(\\d{7})","$1 $2",["[23]|4[46]"]],["(\\d{8})","$1",["[67]"]],["(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["8"]]],"0",0,"0(1\\d)?"],"BQ":["599","00","(?:[34]1|7\\d)\\d{5}",[7],0,0,0,0,0,0,"[347]"],"BR":["55","00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)","(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-24679]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}",[8,9,10,11],[["(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","4(?:02|37)0|[34]00"]],["(\\d{3})(\\d{2,3})(\\d{4})","$1 $2 $3",["(?:[358]|90)0"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"],"($1)"],["(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[16][1-9]|[2-57-9]"],"($1)"]],"0",0,"(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2"],"BS":["1","011","(?:242|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([3-8]\\d{6})$","242$1",0,"242"],"BT":["975","00","[17]\\d{7}|[2-8]\\d{6}",[7,8],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[2-68]|7[246]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[67]|7"]]]],"BW":["267","00","90\\d{5}|(?:[2-6]|7\\d)\\d{6}",[7,8],[["(\\d{2})(\\d{5})","$1 $2",["90"]],["(\\d{3})(\\d{4})","$1 $2",["[2-6]"]],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["7"]]]],"BY":["375","810","(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}",[6,7,8,9,10,11],[["(\\d{3})(\\d{3})","$1 $2",["800"],"8 $1"],["(\\d{3})(\\d{2})(\\d{2,4})","$1 $2 $3",["800"],"8 $1"],["(\\d{4})(\\d{2})(\\d{3})","$1 $2-$3",["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])","1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],"8 0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["1(?:[56]|7[467])|2[1-3]"],"8 0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-4]"],"8 0$1"],["(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["[89]"],"8 $1"]],"8",0,"0|80?",0,0,0,0,"8~10"],"BZ":["501","00","(?:0800\\d|[2-8])\\d{6}",[7,11],[["(\\d{3})(\\d{4})","$1-$2",["[2-8]"]],["(\\d)(\\d{3})(\\d{4})(\\d{3})","$1-$2-$3-$4",["0"]]]],"CA":["1","011","(?:[2-8]\\d|90)\\d{8}",[10],0,"1",0,0,0,0,0,[["(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|6[57])|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47|72)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}"],[""],["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"],["900[2-9]\\d{6}"],["52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|(?:5(?:00|2[12]|33|44|66|77|88)|622)[2-9]\\d{6}"],0,0,0,["600[2-9]\\d{6}"]]],"CC":["61","001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","1(?:[0-79]\\d|8[0-24-9])\\d{7}|[148]\\d{8}|1\\d{5,7}",[6,7,8,9,10],0,"0",0,"0|([59]\\d{7})$","8$1",0,0,[["8(?:51(?:0(?:02|31|60|89)|118)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}",[9]],["4(?:83[0-38]|93[0-4])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-24-9]|9[0-27-9])\\d{6}",[9]],["180(?:0\\d{3}|2)\\d{3}",[7,10]],["190[0-26]\\d{6}",[10]],0,0,0,0,["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}",[9]],["13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",[6,8,10]]],"0011"],"CD":["243","00","[189]\\d{8}|[1-68]\\d{6}",[7,9],[["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["88"],"0$1"],["(\\d{2})(\\d{5})","$1 $2",["[1-6]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]"],"0$1"]],"0"],"CF":["236","00","(?:[27]\\d{3}|8776)\\d{4}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[278]"]]]],"CG":["242","00","222\\d{6}|(?:0\\d|80)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["801"]],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["8"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[02]"]]]],"CH":["41","00","8\\d{11}|[2-9]\\d{8}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8[047]|90"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-79]|81"],"0$1"],["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["8"],"0$1"]],"0"],"CI":["225","00","[02-9]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[02-9]"]]]],"CK":["682","00","[2-578]\\d{4}",[5],[["(\\d{2})(\\d{3})","$1 $2",["[2-578]"]]]],"CL":["56","(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0","12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}",[9,10,11],[["(\\d{5})(\\d{4})","$1 $2",["219","2196"],"($1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["44"]],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[1-3]"],"($1)"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["9[2-9]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"],"($1)"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["60|8"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],["(\\d{3})(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["60"]]]],"CM":["237","00","(?:[26]\\d\\d|88)\\d{6}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["88"]],["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[26]"]]]],"CN":["86","00|1(?:[12]\\d|79)\\d\\d00","1[127]\\d{8,9}|2\\d{9}(?:\\d{2})?|[12]\\d{6,7}|86\\d{6}|(?:1[03-689]\\d|6)\\d{7,9}|(?:[3-579]\\d|8[0-57-9])\\d{6,9}",[7,8,9,10,11,12],[["(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2[0-57-9])[19]","(?:10|2[0-57-9])(?:10|9[56])","(?:10|2[0-57-9])(?:100|9[56])"],"0$1"],["(\\d{3})(\\d{5,6})","$1 $2",["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]","(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]","85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])","85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["(?:4|80)0"]],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["10|2(?:[02-57-9]|1[1-9])","10|2(?:[02-57-9]|1[1-9])","10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"],"0$1",1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"],"0$1",1],["(\\d{3})(\\d{7,8})","$1 $2",["9"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1",1],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[3-578]"],"0$1",1],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1[3-9]"]],["(\\d{2})(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["[12]"],"0$1",1]],"0",0,"0|(1(?:[12]\\d|79)\\d\\d)",0,0,0,0,"00"],"CO":["57","00(?:4(?:[14]4|56)|[579])","(?:1\\d|[36])\\d{9}|[124-8]\\d{7}",[8,10,11],[["(\\d)(\\d{7})","$1 $2",["[146][2-9]|[2578]"],"($1)"],["(\\d{3})(\\d{7})","$1 $2",["6"],"($1)"],["(\\d{3})(\\d{7})","$1 $2",["3"]],["(\\d)(\\d{3})(\\d{7})","$1-$2-$3",["1"],"0$1",0,"$1 $2 $3"]],"0",0,"0([3579]|4(?:[14]4|56))?"],"CR":["506","00","(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}",[8,10],[["(\\d{4})(\\d{4})","$1 $2",["[2-7]|8[3-9]"]],["(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[89]"]]],0,0,"(19(?:0[0-2468]|1[09]|20|66|77|99))"],"CU":["53","119","[27]\\d{6,7}|[34]\\d{5,7}|(?:5|8\\d\\d)\\d{7}",[6,7,8,10],[["(\\d{2})(\\d{4,6})","$1 $2",["2[1-4]|[34]"],"(0$1)"],["(\\d)(\\d{6,7})","$1 $2",["7"],"(0$1)"],["(\\d)(\\d{7})","$1 $2",["5"],"0$1"],["(\\d{3})(\\d{7})","$1 $2",["8"],"0$1"]],"0"],"CV":["238","0","(?:[2-59]\\d\\d|800)\\d{4}",[7],[["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[2-589]"]]]],"CW":["599","00","(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["[3467]"]],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["9[4-8]"]]],0,0,0,0,0,"[69]"],"CX":["61","001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","1(?:[0-79]\\d|8[0-24-9])\\d{7}|[148]\\d{8}|1\\d{5,7}",[6,7,8,9,10],0,"0",0,"0|([59]\\d{7})$","8$1",0,0,[["8(?:51(?:0(?:01|30|59|88)|1(?:17|46|75)|235)|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}",[9]],["4(?:83[0-38]|93[0-4])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-24-9]|9[0-27-9])\\d{6}",[9]],["180(?:0\\d{3}|2)\\d{3}",[7,10]],["190[0-26]\\d{6}",[10]],0,0,0,0,["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}",[9]],["13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",[6,8,10]]],"0011"],"CY":["357","00","(?:[279]\\d|[58]0)\\d{6}",[8],[["(\\d{2})(\\d{6})","$1 $2",["[257-9]"]]]],"CZ":["420","00","(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]|9[015-7]"]],["(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]],["(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]]],"DE":["49","00","[2579]\\d{5,14}|49(?:[05]\\d{10}|[46][1-8]\\d{4,9})|49(?:[0-25]\\d|3[1-689]|7[1-7])\\d{4,8}|49(?:[0-2579]\\d|[34][1-9]|6[0-8])\\d{3}|49\\d{3,4}|(?:1|[368]\\d|4[0-8])\\d{3,13}",[4,5,6,7,8,9,10,11,12,13,14,15],[["(\\d{2})(\\d{3,13})","$1 $2",["3[02]|40|[68]9"],"0$1"],["(\\d{3})(\\d{3,12})","$1 $2",["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1","2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"],"0$1"],["(\\d{4})(\\d{2,11})","$1 $2",["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]","[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"],"0$1"],["(\\d{3})(\\d{4})","$1 $2",["138"],"0$1"],["(\\d{5})(\\d{2,10})","$1 $2",["3"],"0$1"],["(\\d{3})(\\d{5,11})","$1 $2",["181"],"0$1"],["(\\d{3})(\\d)(\\d{4,10})","$1 $2 $3",["1(?:3|80)|9"],"0$1"],["(\\d{3})(\\d{7,8})","$1 $2",["1[67]"],"0$1"],["(\\d{3})(\\d{7,12})","$1 $2",["8"],"0$1"],["(\\d{5})(\\d{6})","$1 $2",["185","1850","18500"],"0$1"],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"],["(\\d{4})(\\d{7})","$1 $2",["18[68]"],"0$1"],["(\\d{5})(\\d{6})","$1 $2",["15[0568]"],"0$1"],["(\\d{4})(\\d{7})","$1 $2",["15[1279]"],"0$1"],["(\\d{3})(\\d{8})","$1 $2",["18"],"0$1"],["(\\d{3})(\\d{2})(\\d{7,8})","$1 $2 $3",["1(?:6[023]|7)"],"0$1"],["(\\d{4})(\\d{2})(\\d{7})","$1 $2 $3",["15[279]"],"0$1"],["(\\d{3})(\\d{2})(\\d{8})","$1 $2 $3",["15"],"0$1"]],"0"],"DJ":["253","00","(?:2\\d|77)\\d{6}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[27]"]]]],"DK":["45","00","[2-9]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-9]"]]]],"DM":["1","011","(?:[58]\\d\\d|767|900)\\d{7}",[10],0,"1",0,"1|([2-7]\\d{6})$","767$1",0,"767"],"DO":["1","011","(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,0,0,0,"8[024]9"],"DZ":["213","00","(?:[1-4]|[5-79]\\d|80)\\d{7}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-4]"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-8]"],"0$1"]],"0"],"EC":["593","00","1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}",[8,9,10,11],[["(\\d)(\\d{3})(\\d{4})","$1 $2-$3",["[2-7]"],"(0$1)",0,"$1-$2-$3"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],["(\\d{4})(\\d{3})(\\d{3,4})","$1 $2 $3",["1"]]],"0"],"EE":["372","00","8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}",[7,8,10],[["(\\d{3})(\\d{4})","$1 $2",["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88","[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]],["(\\d{4})(\\d{3,4})","$1 $2",["[45]|8(?:00|[1-49])","[45]|8(?:00[1-9]|[1-49])"]],["(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["7"]],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["8"]]]],"EG":["20","00","[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}",[8,9,10],[["(\\d)(\\d{7,8})","$1 $2",["[23]"],"0$1"],["(\\d{2})(\\d{6,7})","$1 $2",["1[35]|[4-6]|8[2468]|9[235-7]"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[189]"],"0$1"]],"0"],"EH":["212","00","[5-8]\\d{8}",[9],0,"0",0,0,0,0,"528[89]"],"ER":["291","00","[178]\\d{6}",[7],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[178]"],"0$1"]],"0"],"ES":["34","00","[5-9]\\d{8}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-9]"]]]],"ET":["251","00","(?:11|[2-59]\\d)\\d{7}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-59]"],"0$1"]],"0"],"FI":["358","00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))","[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}",[5,6,7,8,9,10,11,12],[["(\\d)(\\d{4,9})","$1 $2",["[2568][1-8]|3(?:0[1-9]|[1-9])|9"],"0$1"],["(\\d{3})(\\d{3,7})","$1 $2",["[12]00|[368]|70[07-9]"],"0$1"],["(\\d{2})(\\d{4,8})","$1 $2",["[1245]|7[135]"],"0$1"],["(\\d{2})(\\d{6,10})","$1 $2",["7"],"0$1"]],"0",0,0,0,0,"1[03-79]|[2-9]",0,"00"],"FJ":["679","0(?:0|52)","45\\d{5}|(?:0800\\d|[235-9])\\d{6}",[7,11],[["(\\d{3})(\\d{4})","$1 $2",["[235-9]|45"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]],0,0,0,0,0,0,0,"00"],"FK":["500","00","[2-7]\\d{4}",[5]],"FM":["691","00","(?:[39]\\d\\d|820)\\d{4}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[389]"]]]],"FO":["298","00","(?:[2-8]\\d|90)\\d{4}",[6],[["(\\d{6})","$1",["[2-9]"]]],0,0,"(10(?:01|[12]0|88))"],"FR":["33","00","[1-9]\\d{8}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"],["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"]],"0"],"GA":["241","00","(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}",[7,8],[["(\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["11|[67]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]]],0,0,"0(11\\d{6}|6[256]\\d{6}|7[47]\\d{6})","$1"],"GB":["44","00","[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}",[7,9,10],[["(\\d{3})(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["845","8454","84546","845464"],"0$1"],["(\\d{3})(\\d{6})","$1 $2",["800"],"0$1"],["(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:(?:38|69)7|5(?:24|39)|768|946)","1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"],"0$1"],["(\\d{4})(\\d{5,6})","$1 $2",["1(?:[2-69][02-9]|[78])"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[25]|7(?:0|6[02-9])","[25]|7(?:0|6(?:[03-9]|2[356]))"],"0$1"],["(\\d{4})(\\d{6})","$1 $2",["7"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[1389]"],"0$1"]],"0",0,0,0,0,0,[["(?:1(?:1(?:3(?:[0-58]\\d\\d|73[03])|(?:4[0-5]|5[0-26-9]|6[0-4]|[78][0-49])\\d\\d)|2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d\\d|1(?:[0-7]\\d\\d|8(?:0\\d|2[0-35-9])))|(?:3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d\\d)|2(?:0[013478]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|7(?:26(?:6[13-9]|7[0-7])|(?:442|688)\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}",[9,10]],["7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}",[10]],["80[08]\\d{7}|800\\d{6}|8001111"],["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d",[7,10]],["70\\d{8}",[10]],0,["(?:3[0347]|55)\\d{8}",[10]],["76(?:0[0-2]|2[356]|34|4[01347]|5[49]|6[0-369]|77|81|9[139])\\d{6}",[10]],["56\\d{8}",[10]]],0," x"],"GD":["1","011","(?:473|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","473$1",0,"473"],"GE":["995","00","(?:[3-57]\\d\\d|800)\\d{6}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["32"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[57]"]],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[348]"],"0$1"]],"0"],"GF":["594","00","(?:[56]94|976)\\d{6}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[569]"],"0$1"]],"0"],"GG":["44","00","(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?",[7,9,10],0,"0",0,"0|([25-9]\\d{5})$","1481$1",0,0,[["1481[25-9]\\d{5}",[10]],["7(?:(?:781|839)\\d|911[17])\\d{5}",[10]],["80[08]\\d{7}|800\\d{6}|8001111"],["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d",[7,10]],["70\\d{8}",[10]],0,["(?:3[0347]|55)\\d{8}",[10]],["76(?:0[0-2]|2[356]|34|4[01347]|5[49]|6[0-369]|77|81|9[139])\\d{6}",[10]],["56\\d{8}",[10]]]],"GH":["233","00","(?:[235]\\d{3}|800)\\d{5}",[8,9],[["(\\d{3})(\\d{5})","$1 $2",["8"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"],"0$1"]],"0"],"GI":["350","00","[256]\\d{7}",[8],[["(\\d{3})(\\d{5})","$1 $2",["2"]]]],"GL":["299","00","(?:19|[2-689]\\d)\\d{4}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["19|[2-689]"]]]],"GM":["220","00","[2-9]\\d{6}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]]],"GN":["224","00","722\\d{6}|(?:3|6\\d)\\d{7}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["3"]],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[67]"]]]],"GP":["590","00","(?:590|69\\d|976)\\d{6}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[569]"],"0$1"]],"0",0,0,0,0,0,[["590(?:0[1-68]|1[0-2]|2[0-68]|3[1289]|4[0-24-9]|5[3-579]|6[0189]|7[08]|8[0-689]|9\\d)\\d{4}"],["69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}"],0,0,0,0,0,0,["976[01]\\d{5}"]]],"GQ":["240","00","222\\d{6}|(?:3\\d|55|[89]0)\\d{7}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235]"]],["(\\d{3})(\\d{6})","$1 $2",["[89]"]]]],"GR":["30","00","5005000\\d{3}|(?:[2689]\\d|70)\\d{8}",[10],[["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["21|7"]],["(\\d{4})(\\d{6})","$1 $2",["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2689]"]]]],"GT":["502","00","(?:1\\d{3}|[2-7])\\d{7}",[8,11],[["(\\d{4})(\\d{4})","$1 $2",["[2-7]"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]]],"GU":["1","011","(?:[58]\\d\\d|671|900)\\d{7}",[10],0,"1",0,"1|([3-9]\\d{6})$","671$1",0,"671"],"GW":["245","00","[49]\\d{8}|4\\d{6}",[7,9],[["(\\d{3})(\\d{4})","$1 $2",["40"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[49]"]]]],"GY":["592","001","(?:862\\d|9008)\\d{3}|(?:[2-46]\\d|77)\\d{5}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-46-9]"]]]],"HK":["852","00(?:30|5[09]|[126-9]?)","8[0-46-9]\\d{6,7}|9\\d{4}(?:\\d(?:\\d(?:\\d{4})?)?)?|(?:[235-79]\\d|46)\\d{6}",[5,6,7,8,9,11],[["(\\d{3})(\\d{2,5})","$1 $2",["900","9003"]],["(\\d{4})(\\d{4})","$1 $2",["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]],["(\\d{3})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]],0,0,0,0,0,0,0,"00"],"HN":["504","00","8\\d{10}|[237-9]\\d{7}",[8,11],[["(\\d{4})(\\d{4})","$1-$2",["[237-9]"]]]],"HR":["385","00","(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}",[6,7,8,9],[["(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["6[01]"],"0$1"],["(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["8"],"0$1"],["(\\d)(\\d{4})(\\d{3})","$1 $2 $3",["1"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[67]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-5]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],"0"],"HT":["509","00","[2-489]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[2-489]"]]]],"HU":["36","00","[235-7]\\d{8}|[1-9]\\d{7}",[8,9],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"(06 $1)"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"],"(06 $1)"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"06 $1"]],"06"],"ID":["62","00[89]","(?:(?:00[1-9]|8\\d)\\d{4}|[1-36])\\d{6}|00\\d{10}|[1-9]\\d{8,10}|[2-9]\\d{7}",[7,8,9,10,11,12,13],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["15"]],["(\\d{2})(\\d{5,9})","$1 $2",["2[124]|[36]1"],"(0$1)"],["(\\d{3})(\\d{5,7})","$1 $2",["800"],"0$1"],["(\\d{3})(\\d{5,8})","$1 $2",["[2-79]"],"(0$1)"],["(\\d{3})(\\d{3,4})(\\d{3})","$1-$2-$3",["8[1-35-9]"],"0$1"],["(\\d{3})(\\d{6,8})","$1 $2",["1"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["804"],"0$1"],["(\\d{3})(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80"],"0$1"],["(\\d{3})(\\d{4})(\\d{4,5})","$1-$2-$3",["8"],"0$1"]],"0"],"IE":["353","00","(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}",[7,8,9,10],[["(\\d{2})(\\d{5})","$1 $2",["2[24-9]|47|58|6[237-9]|9[35-9]"],"(0$1)"],["(\\d{3})(\\d{5})","$1 $2",["[45]0"],"(0$1)"],["(\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["1"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2569]|4[1-69]|7[14]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["81"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[78]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["4"],"(0$1)"],["(\\d{2})(\\d)(\\d{3})(\\d{4})","$1 $2 $3 $4",["8"],"0$1"]],"0"],"IL":["972","0(?:0|1[2-9])","1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}",[7,8,9,10,11,12],[["(\\d{4})(\\d{3})","$1-$2",["125"]],["(\\d{4})(\\d{2})(\\d{2})","$1-$2-$3",["121"]],["(\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[2-489]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1-$2-$3",["12"]],["(\\d{4})(\\d{6})","$1-$2",["159"]],["(\\d)(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3-$4",["1[7-9]"]],["(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})","$1-$2 $3-$4",["15"]]],"0"],"IM":["44","00","1624\\d{6}|(?:[3578]\\d|90)\\d{8}",[10],0,"0",0,"0|([5-8]\\d{5})$","1624$1",0,"74576|(?:16|7[56])24"],"IN":["91","00","(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}",[8,9,10,11,12,13],[["(\\d{8})","$1",["5(?:0|2[23]|3[03]|[67]1|88)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"],0,1],["(\\d{4})(\\d{4,5})","$1 $2",["180","1800"],0,1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["140"],0,1],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79[1-7]|80[2-46]","11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])","11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"],"0$1",1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"],"0$1",1],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807","1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]","1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"],"0$1",1],["(\\d{5})(\\d{5})","$1 $2",["[6-9]"],"0$1",1],["(\\d{4})(\\d{2,4})(\\d{4})","$1 $2 $3",["1(?:6|8[06])","1(?:6|8[06]0)"],0,1],["(\\d{4})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["18"],0,1]],"0"],"IO":["246","00","3\\d{6}",[7],[["(\\d{3})(\\d{4})","$1 $2",["3"]]]],"IQ":["964","00","(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-6]"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],"0"],"IR":["98","00","[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}",[4,5,6,7,10],[["(\\d{4,5})","$1",["96"],"0$1"],["(\\d{2})(\\d{4,5})","$1 $2",["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[1-8]"],"0$1"]],"0"],"IS":["354","00|1(?:0(?:01|[12]0)|100)","(?:38\\d|[4-9])\\d{6}",[7,9],[["(\\d{3})(\\d{4})","$1 $2",["[4-9]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["3"]]],0,0,0,0,0,0,0,"00"],"IT":["39","00","0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}",[6,7,8,9,10,11],[["(\\d{2})(\\d{4,6})","$1 $2",["0[26]"]],["(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[245])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],["(\\d{4})(\\d{2,6})","$1 $2",["0(?:[13-579][2-46-8]|8[236-8])"]],["(\\d{4})(\\d{4})","$1 $2",["894"]],["(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|5"]],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["1[4679]|[38]"]],["(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]"]],["(\\d{2})(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]],["(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["3"]]],0,0,0,0,0,0,[["0669[0-79]\\d{1,6}|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}"],["3[1-9]\\d{8}|3[2-9]\\d{7}",[9,10]],["80(?:0\\d{3}|3)\\d{3}",[6,9]],["(?:0878\\d\\d|89(?:2|4[5-9]\\d))\\d{3}|89[45][0-4]\\d\\d|(?:1(?:44|6[346])|89(?:5[5-9]|9))\\d{6}",[6,8,9,10]],["1(?:78\\d|99)\\d{6}",[9,10]],0,0,0,["55\\d{8}",[10]],["84(?:[08]\\d{3}|[17])\\d{3}",[6,9]]]],"JE":["44","00","1534\\d{6}|(?:[3578]\\d|90)\\d{8}",[10],0,"0",0,"0|([0-24-8]\\d{5})$","1534$1",0,0,[["1534[0-24-8]\\d{5}"],["7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97[7-9]))\\d{5}"],["80(?:07(?:35|81)|8901)\\d{4}"],["(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}"],["701511\\d{4}"],0,["(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}"],["76(?:0[0-2]|2[356]|34|4[01347]|5[49]|6[0-369]|77|81|9[139])\\d{6}"],["56\\d{8}"]]],"JM":["1","011","(?:[58]\\d\\d|658|900)\\d{7}",[10],0,"1",0,0,0,0,"658|876"],"JO":["962","00","(?:(?:[2689]|7\\d)\\d|32|53)\\d{6}",[8,9],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2356]|87"],"(0$1)"],["(\\d{3})(\\d{5,6})","$1 $2",["[89]"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["70"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"]],"0"],"JP":["81","010","00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}",[8,9,10,11,12,13,14,15,16,17],[["(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],["(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[457-9])|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["[36]|4(?:2[09]|7[01])","[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[279]|49|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9])|5(?:2|3[045]|4[0-369]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|49|6(?:[0-24]|36|5[0-3589]|72|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:49|55|83)[29]|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:47[59]|59[89]|8(?:6[68]|9))[019]","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|7[015-9]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17|3[015-9]))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9(?:[019]|4[1-3]|6(?:[0-47-9]|5[01346-9])))|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:223|8699)[014-9]|(?:48|829(?:2|66)|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"],"0$1"],["(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3[3-8]|5[2-9])","[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3(?:[3-6][2-9]|7|8[2-5])|5[2-9])"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]|80"],"0$1"]],"0"],"KE":["254","000","(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}",[7,8,9,10],[["(\\d{2})(\\d{5,7})","$1 $2",["[24-6]"],"0$1"],["(\\d{3})(\\d{6})","$1 $2",["[17]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],"0"],"KG":["996","00","8\\d{9}|(?:[235-8]\\d|99)\\d{7}",[9,10],[["(\\d{4})(\\d{5})","$1 $2",["3(?:1[346]|[24-79])"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235-79]|88"],"0$1"],["(\\d{3})(\\d{3})(\\d)(\\d{2,3})","$1 $2 $3 $4",["8"],"0$1"]],"0"],"KH":["855","00[14-9]","1\\d{9}|[1-9]\\d{7,8}",[8,9,10],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-9]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],"0"],"KI":["686","00","(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}",[5,8],0,"0"],"KM":["269","00","[3478]\\d{6}",[7],[["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[3478]"]]]],"KN":["1","011","(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-7]\\d{6})$","869$1",0,"869"],"KP":["850","00|99","85\\d{6}|(?:19\\d|[2-7])\\d{7}",[8,10],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"]],"0"],"KR":["82","00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))","00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}",[5,6,8,9,10,11,12,13,14],[["(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1"],["(\\d{4})(\\d{4})","$1-$2",["1"]],["(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60|8"],"0$1"],["(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["[1346]|5[1-5]"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],["(\\d{2})(\\d{5})(\\d{4})","$1-$2-$3",["5"],"0$1"]],"0",0,"0(8(?:[1-46-8]|5\\d\\d))?"],"KW":["965","00","(?:18|[2569]\\d\\d)\\d{5}",[7,8],[["(\\d{4})(\\d{3,4})","$1 $2",["[169]|2(?:[235]|4[1-35-9])|52"]],["(\\d{3})(\\d{5})","$1 $2",["[25]"]]]],"KY":["1","011","(?:345|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","345$1",0,"345"],"KZ":["7","810","33622\\d{5}|(?:7\\d|80)\\d{8}",[10],0,"8",0,0,0,0,"33|7",0,"8~10"],"LA":["856","00","[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}",[8,9,10],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2[13]|3[14]|[4-8]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["30[013-9]"],"0$1"],["(\\d{2})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["[23]"],"0$1"]],"0"],"LB":["961","00","[7-9]\\d{7}|[13-9]\\d{6}",[7,8],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"]]],"0"],"LC":["1","011","(?:[58]\\d\\d|758|900)\\d{7}",[10],0,"1",0,"1|([2-8]\\d{6})$","758$1",0,"758"],"LI":["423","00","90\\d{5}|(?:[2378]|6\\d\\d)\\d{6}",[7,9],[["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[237-9]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["69"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]]],"0",0,"0|(1001)"],"LK":["94","00","[1-9]\\d{8}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[1-689]"],"0$1"]],"0"],"LR":["231","00","(?:2|33|5\\d|77|88)\\d{7}|[4-6]\\d{6}",[7,8,9],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[4-6]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[3578]"],"0$1"]],"0"],"LS":["266","00","(?:[256]\\d\\d|800)\\d{5}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[2568]"]]]],"LT":["370","00","(?:[3469]\\d|52|[78]0)\\d{6}",[8],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["52[0-7]"],"(8-$1)",1],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[7-9]"],"8 $1",1],["(\\d{2})(\\d{6})","$1 $2",["37|4(?:[15]|6[1-8])"],"(8-$1)",1],["(\\d{3})(\\d{5})","$1 $2",["[3-6]"],"(8-$1)",1]],"8",0,"[08]"],"LU":["352","00","35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}",[4,5,6,7,8,9,10,11],[["(\\d{2})(\\d{3})","$1 $2",["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]],["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]],["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["20[2-689]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4",["2(?:[0367]|4[3-8])"]],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["80[01]|90[015]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["20"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4 $5",["2(?:[0367]|4[3-8])"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})","$1 $2 $3 $4",["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"]]],0,0,"(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)"],"LV":["371","00","(?:[268]\\d|90)\\d{6}",[8],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[269]|8[01]"]]]],"LY":["218","00","[2-9]\\d{8}",[9],[["(\\d{2})(\\d{7})","$1-$2",["[2-9]"],"0$1"]],"0"],"MA":["212","00","[5-8]\\d{8}",[9],[["(\\d{5})(\\d{4})","$1-$2",["5(?:29|38)","5(?:29|38)[89]","5(?:29|38)[89]0"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5[45]"],"0$1"],["(\\d{4})(\\d{5})","$1-$2",["5(?:2[2-489]|3[5-9]|9)|892","5(?:2(?:[2-49]|8[235-9])|3[5-9]|9)|892"],"0$1"],["(\\d{2})(\\d{7})","$1-$2",["8"],"0$1"],["(\\d{3})(\\d{6})","$1-$2",["[5-7]"],"0$1"]],"0",0,0,0,0,0,[["5(?:29(?:[189][05]|2[29]|3[01])|38[89][05])\\d{4}|5(?:2(?:[015-7]\\d|2[02-9]|3[0-578]|4[02-46-8]|8[0235-7]|90)|3(?:[0-47]\\d|5[02-9]|6[02-8]|80|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}"],["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0[0-36-8]|6[1267]|7[0-37]))\\d{6}"],["80\\d{7}"],["89\\d{7}"],0,0,0,0,["592(?:4[0-2]|93)\\d{4}"]]],"MC":["377","00","870\\d{5}|(?:[349]|6\\d)\\d{7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["4"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[39]"]],["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["6"],"0$1"]],"0"],"MD":["373","00","(?:[235-7]\\d|[89]0)\\d{6}",[8],[["(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["22|3"],"0$1"],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[25-7]"],"0$1"]],"0"],"ME":["382","00","(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"0$1"]],"0"],"MF":["590","00","(?:590|69\\d|976)\\d{6}",[9],0,"0",0,0,0,0,0,[["590(?:0[079]|[14]3|[27][79]|30|5[0-268]|87)\\d{4}"],["69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}"],0,0,0,0,0,0,["976[01]\\d{5}"]]],"MG":["261","00","[23]\\d{8}",[9],[["(\\d{2})(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3 $4",["[23]"],"0$1"]],"0",0,"0|([24-9]\\d{6})$","20$1"],"MH":["692","011","329\\d{4}|(?:[256]\\d|45)\\d{5}",[7],[["(\\d{3})(\\d{4})","$1-$2",["[2-6]"]]],"1"],"MK":["389","00","[2-578]\\d{7}",[8],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[347]"],"0$1"],["(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["[58]"],"0$1"]],"0"],"ML":["223","00","[24-9]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-9]"]]]],"MM":["95","00","1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}",[6,7,8,9,10],[["(\\d)(\\d{2})(\\d{3})","$1 $2 $3",["16|2"],"0$1"],["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[45]|6(?:0[23]|[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-6]"],"0$1"],["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[4-7]|8[1-35]"],"0$1"],["(\\d)(\\d{3})(\\d{4,6})","$1 $2 $3",["9(?:2[0-4]|[35-9]|4[137-9])"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"],["(\\d)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["92"],"0$1"],["(\\d)(\\d{5})(\\d{4})","$1 $2 $3",["9"],"0$1"]],"0"],"MN":["976","001","[12]\\d{7,9}|[57-9]\\d{7}",[8,9,10],[["(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[12]1"],"0$1"],["(\\d{4})(\\d{4})","$1 $2",["[57-9]"]],["(\\d{3})(\\d{5,6})","$1 $2",["[12]2[1-3]"],"0$1"],["(\\d{4})(\\d{5,6})","$1 $2",["[12](?:27|3[2-8]|4[2-68]|5[1-4689])","[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"],"0$1"],["(\\d{5})(\\d{4,5})","$1 $2",["[12]"],"0$1"]],"0"],"MO":["853","00","(?:28|[68]\\d)\\d{6}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[268]"]]]],"MP":["1","011","[58]\\d{9}|(?:67|90)0\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","670$1",0,"670"],"MQ":["596","00","69\\d{7}|(?:59|97)6\\d{6}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[569]"],"0$1"]],"0"],"MR":["222","00","(?:[2-4]\\d\\d|800)\\d{5}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-48]"]]]],"MS":["1","011","(?:[58]\\d\\d|664|900)\\d{7}",[10],0,"1",0,"1|([34]\\d{6})$","664$1",0,"664"],"MT":["356","00","3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[2357-9]"]]]],"MU":["230","0(?:0|[24-7]0|3[03])","(?:[2-468]|5\\d)\\d{6}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["[2-46]|8[013]"]],["(\\d{4})(\\d{4})","$1 $2",["5"]]],0,0,0,0,0,0,0,"020"],"MV":["960","0(?:0|19)","(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}",[7,10],[["(\\d{3})(\\d{4})","$1-$2",["[3467]|9[13-9]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"]]],0,0,0,0,0,0,0,"00"],"MW":["265","00","1\\d{6}(?:\\d{2})?|(?:[23]1|77|88|99)\\d{7}",[7,9],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["1[2-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[137-9]"],"0$1"]],"0"],"MX":["52","0[09]","(?:1(?:[01467]\\d|[2359][1-9]|8[1-79])|[2-9]\\d)\\d{8}",[10,11],[["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["33|5[56]|81"],0,1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2-9]"],0,1],["(\\d)(\\d{2})(\\d{4})(\\d{4})","$2 $3 $4",["1(?:33|5[56]|81)"],0,1],["(\\d)(\\d{3})(\\d{3})(\\d{4})","$2 $3 $4",["1"],0,1]],"01",0,"0(?:[12]|4[45])|1",0,0,0,0,"00"],"MY":["60","00","1\\d{8,9}|(?:3\\d|[4-9])\\d{7}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["[4-79]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1-$2 $3",["1(?:[02469]|[378][1-9])|8"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1-$2 $3",["3"],"0$1"],["(\\d)(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3-$4",["1[36-8]"]],["(\\d{3})(\\d{3})(\\d{4})","$1-$2 $3",["15"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1-$2 $3",["1"],"0$1"]],"0"],"MZ":["258","00","(?:2|8\\d)\\d{7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["2|8[2-79]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]]]],"NA":["264","00","[68]\\d{7,8}",[8,9],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["88"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["6"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["87"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"]],"0"],"NC":["687","00","[2-57-9]\\d{5}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[2-57-9]"]]]],"NE":["227","00","[027-9]\\d{7}",[8],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["08"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[089]|2[013]|7[04]"]]]],"NF":["672","00","[13]\\d{5}",[6],[["(\\d{2})(\\d{4})","$1 $2",["1[0-3]"]],["(\\d)(\\d{5})","$1 $2",["[13]"]]],0,0,"([0-258]\\d{4})$","3$1"],"NG":["234","009","(?:[124-7]|9\\d{3})\\d{6}|[1-9]\\d{7}|[78]\\d{9,13}",[7,8,10,11,12,13,14],[["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["78"],"0$1"],["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]|9(?:0[3-9]|[1-9])"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[3-7]|8[2-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[7-9]"],"0$1"],["(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["[78]"],"0$1"],["(\\d{3})(\\d{5})(\\d{5,6})","$1 $2 $3",["[78]"],"0$1"]],"0"],"NI":["505","00","(?:1800|[25-8]\\d{3})\\d{4}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[125-8]"]]]],"NL":["31","00","(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|[89]\\d{6,9}|1\\d{4,5}",[5,6,7,8,9,10],[["(\\d{3})(\\d{4,7})","$1 $2",["[89]0"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["66"],"0$1"],["(\\d)(\\d{8})","$1 $2",["6"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-57-9]"],"0$1"]],"0"],"NO":["47","00","(?:0|[2-9]\\d{3})\\d{4}",[5,8],[["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[489]|5[89]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[235-7]"]]],0,0,0,0,0,"[02-689]|7[0-8]"],"NP":["977","00","9\\d{9}|[1-9]\\d{7}",[8,10],[["(\\d)(\\d{7})","$1-$2",["1[2-6]"],"0$1"],["(\\d{2})(\\d{6})","$1-$2",["[1-8]|9(?:[1-579]|6[2-6])"],"0$1"],["(\\d{3})(\\d{7})","$1-$2",["9"]]],"0"],"NR":["674","00","(?:444|(?:55|8\\d)\\d|666)\\d{4}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[4-68]"]]]],"NU":["683","00","(?:[47]|888\\d)\\d{3}",[4,7],[["(\\d{3})(\\d{4})","$1 $2",["8"]]]],"NZ":["64","0(?:0|161)","[29]\\d{7,9}|50\\d{5}(?:\\d{2,3})?|6[0-35-9]\\d{6}|7\\d{7,8}|8\\d{4,9}|(?:11\\d|[34])\\d{7}",[5,6,7,8,9,10],[["(\\d{2})(\\d{3,8})","$1 $2",["83"],"0$1"],["(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["50[0367]|[89]0"],"0$1"],["(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["24|[346]|7[2-57-9]|9[2-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:10|74)|[59]|80"],"0$1"],["(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["1|2[028]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,5})","$1 $2 $3",["2(?:[169]|7[0-35-9])|7|86"],"0$1"]],"0",0,0,0,0,0,0,"00"],"OM":["968","00","(?:1505|[279]\\d{3}|500)\\d{4}|8007\\d{4,5}",[7,8,9],[["(\\d{3})(\\d{4,6})","$1 $2",["[58]"]],["(\\d{2})(\\d{6})","$1 $2",["2"]],["(\\d{4})(\\d{4})","$1 $2",["[179]"]]]],"PA":["507","00","8\\d{9}|[68]\\d{7}|[1-57-9]\\d{6}",[7,8,10],[["(\\d{3})(\\d{4})","$1-$2",["[1-57-9]"]],["(\\d{4})(\\d{4})","$1-$2",["[68]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]]]],"PE":["51","19(?:1[124]|77|90)00","(?:[14-8]|9\\d)\\d{7}",[8,9],[["(\\d{3})(\\d{5})","$1 $2",["80"],"(0$1)"],["(\\d)(\\d{7})","$1 $2",["1"],"(0$1)"],["(\\d{2})(\\d{6})","$1 $2",["[4-8]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"]]],"0",0,0,0,0,0,0,0," Anexo "],"PF":["689","00","[48]\\d{7}|4\\d{5}",[6,8],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["44"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[48]"]]]],"PG":["675","00|140[1-3]","(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["18|[2-69]|85"]],["(\\d{4})(\\d{4})","$1 $2",["[78]"]]],0,0,0,0,0,0,0,"00"],"PH":["63","00","1800\\d{7,9}|(?:2|[89]\\d{4})\\d{5}|[2-8]\\d{8}|[28]\\d{7}",[6,8,9,10,11,12,13],[["(\\d)(\\d{5})","$1 $2",["2"],"(0$1)"],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"(0$1)"],["(\\d{4})(\\d{4,6})","$1 $2",["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2","3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"],"(0$1)"],["(\\d{5})(\\d{4})","$1 $2",["346|4(?:27|9[35])|883","3469|4(?:279|9(?:30|56))|8834"],"(0$1)"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[3-7]|8[2-8]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],["(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["1"]]],"0"],"PK":["92","00","122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}",[8,9,10,11,12],[["(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["[89]0"],"0$1"],["(\\d{4})(\\d{5})","$1 $2",["1"]],["(\\d{3})(\\d{6,7})","$1 $2",["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])","9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"],"(0$1)"],["(\\d{2})(\\d{7,8})","$1 $2",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"],"(0$1)"],["(\\d{5})(\\d{5})","$1 $2",["58"],"(0$1)"],["(\\d{3})(\\d{7})","$1 $2",["3"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["[24-9]"],"(0$1)"]],"0"],"PL":["48","00","6\\d{5}(?:\\d{2})?|8\\d{9}|[1-9]\\d{6}(?:\\d{2})?",[6,7,8,9,10],[["(\\d{5})","$1",["19"]],["(\\d{3})(\\d{3})","$1 $2",["11|64"]],["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1","(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]],["(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["64"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["39|45|5[0137]|6[0469]|7[02389]|8(?:0[14]|8)"]],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[2-8]|[2-7]|8[1-79]|9[145]"]],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["8"]]]],"PM":["508","00","[45]\\d{5}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[45]"],"0$1"]],"0"],"PR":["1","011","(?:[589]\\d\\d|787)\\d{7}",[10],0,"1",0,0,0,0,"787|939"],"PS":["970","00","[2489]2\\d{6}|(?:1\\d|5)\\d{8}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2489]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["5"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],"0"],"PT":["351","00","(?:[26-9]\\d|30)\\d{7}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["2[12]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[236-9]"]]]],"PW":["680","01[12]","(?:[24-8]\\d\\d|345|900)\\d{4}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]]],"PY":["595","00","59\\d{4,6}|9\\d{5,10}|(?:[2-46-8]\\d|5[0-8])\\d{4,7}",[6,7,8,9,10,11],[["(\\d{3})(\\d{3,6})","$1 $2",["[2-9]0"],"0$1"],["(\\d{2})(\\d{5})","$1 $2",["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],"(0$1)"],["(\\d{3})(\\d{4,5})","$1 $2",["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["87"]],["(\\d{3})(\\d{6})","$1 $2",["9(?:[5-79]|8[1-6])"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]"],"0$1"],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["9"]]],"0"],"QA":["974","00","[2-7]\\d{7}|(?:2\\d\\d|800)\\d{4}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["2[126]|8"]],["(\\d{4})(\\d{4})","$1 $2",["[2-7]"]]]],"RE":["262","00","9769\\d{5}|(?:26|[68]\\d)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2689]"],"0$1"]],"0",0,0,0,0,"26[23]|69|[89]"],"RO":["40","00","(?:[237]\\d|[89]0)\\d{7}|[23]\\d{5}",[6,9],[["(\\d{3})(\\d{3})","$1 $2",["2[3-6]","2[3-6]\\d9"],"0$1"],["(\\d{2})(\\d{4})","$1 $2",["219|31"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23]1"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[237-9]"],"0$1"]],"0",0,0,0,0,0,0,0," int "],"RS":["381","00","38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}",[6,7,8,9,10,11,12],[["(\\d{3})(\\d{3,9})","$1 $2",["(?:2[389]|39)0|[7-9]"],"0$1"],["(\\d{2})(\\d{5,10})","$1 $2",["[1-36]"],"0$1"]],"0"],"RU":["7","810","[347-9]\\d{9}",[10],[["(\\d{4})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-8]|2[1-9])","7(?:1(?:[0-6]2|7|8[27])|2(?:1[23]|[2-9]2))","7(?:1(?:[0-6]2|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"],"8 ($1)",1],["(\\d{5})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-68]|2[1-9])","7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))","7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"],"8 ($1)",1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",1],["(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[3489]"],"8 ($1)",1]],"8",0,0,0,0,"3[04-689]|[489]",0,"8~10"],"RW":["250","00","(?:06|[27]\\d\\d|[89]00)\\d{6}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"]]],"0"],"SA":["966","00","92\\d{7}|(?:[15]|8\\d)\\d{8}",[9,10],[["(\\d{4})(\\d{5})","$1 $2",["9"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["81"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]]],"0"],"SB":["677","0[01]","(?:[1-6]|[7-9]\\d\\d)\\d{4}",[5,7],[["(\\d{2})(\\d{5})","$1 $2",["7|8[4-9]|9(?:[1-8]|9[0-8])"]]]],"SC":["248","010|0[0-2]","8000\\d{3}|(?:[249]\\d|64)\\d{5}",[7],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[246]|9[57]"]]],0,0,0,0,0,0,0,"00"],"SD":["249","00","[19]\\d{8}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[19]"],"0$1"]],"0"],"SE":["46","00","(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}",[6,7,8,9,10],[["(\\d{2})(\\d{2,3})(\\d{2})","$1-$2 $3",["20"],"0$1",0,"$1 $2 $3"],["(\\d{3})(\\d{4})","$1-$2",["9(?:00|39|44)"],"0$1",0,"$1 $2"],["(\\d{2})(\\d{3})(\\d{2})","$1-$2 $3",["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"],"0$1",0,"$1 $2 $3"],["(\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["8"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2,3})(\\d{2})","$1-$2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],"0$1",0,"$1 $2 $3"],["(\\d{3})(\\d{2,3})(\\d{3})","$1-$2 $3",["9(?:00|39|44)"],"0$1",0,"$1 $2 $3"],["(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"],"0$1",0,"$1 $2 $3 $4"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["10|7"],"0$1",0,"$1 $2 $3 $4"],["(\\d)(\\d{3})(\\d{3})(\\d{2})","$1-$2 $3 $4",["8"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1-$2 $3 $4",["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2})(\\d{2})(\\d{3})","$1-$2 $3 $4",["9"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4 $5",["[26]"],"0$1",0,"$1 $2 $3 $4 $5"]],"0"],"SG":["65","0[0-3]\\d","(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}",[8,10,11],[["(\\d{4})(\\d{4})","$1 $2",["[369]|8(?:0[1-3]|[1-9])"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]],["(\\d{4})(\\d{4})(\\d{3})","$1 $2 $3",["7"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]]],"SH":["290","00","(?:[256]\\d|8)\\d{3}",[4,5],0,0,0,0,0,0,"[256]"],"SI":["386","00|10(?:22|66|88|99)","[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}",[5,6,7,8],[["(\\d{2})(\\d{3,6})","$1 $2",["8[09]|9"],"0$1"],["(\\d{3})(\\d{5})","$1 $2",["59|8"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[37][01]|4[0139]|51|6"],"0$1"],["(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-57]"],"(0$1)"]],"0",0,0,0,0,0,0,"00"],"SJ":["47","00","0\\d{4}|(?:[4589]\\d|79)\\d{6}",[5,8],0,0,0,0,0,0,"79"],"SK":["421","00","[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}",[6,7,9],[["(\\d)(\\d{2})(\\d{3,4})","$1 $2 $3",["21"],"0$1"],["(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["[3-5][1-8]1","[3-5][1-8]1[67]"],"0$1"],["(\\d)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"],"0$1"]],"0"],"SL":["232","00","(?:[2378]\\d|66|99)\\d{6}",[8],[["(\\d{2})(\\d{6})","$1 $2",["[236-9]"],"(0$1)"]],"0"],"SM":["378","00","(?:0549|[5-7]\\d)\\d{6}",[8,10],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],["(\\d{4})(\\d{6})","$1 $2",["0"]]],0,0,"([89]\\d{5})$","0549$1"],"SN":["221","00","(?:[378]\\d{4}|93330)\\d{4}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[379]"]]]],"SO":["252","00","[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}",[6,7,8,9],[["(\\d{2})(\\d{4})","$1 $2",["8[125]"]],["(\\d{6})","$1",["[134]"]],["(\\d)(\\d{6})","$1 $2",["[15]|2[0-79]|3[0-46-8]|4[0-7]"]],["(\\d)(\\d{7})","$1 $2",["24|[67]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[3478]|64|90"]],["(\\d{2})(\\d{5,7})","$1 $2",["1|28|6[1-35-9]|9[2-9]"]]],"0"],"SR":["597","00","(?:[2-5]|68|[78]\\d)\\d{5}",[6,7],[["(\\d{2})(\\d{2})(\\d{2})","$1-$2-$3",["56"]],["(\\d{3})(\\d{3})","$1-$2",["[2-5]"]],["(\\d{3})(\\d{4})","$1-$2",["[6-8]"]]]],"SS":["211","00","[19]\\d{8}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[19]"],"0$1"]],"0"],"ST":["239","00","(?:22|9\\d)\\d{5}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[29]"]]]],"SV":["503","00","[267]\\d{7}|[89]00\\d{4}(?:\\d{4})?",[7,8,11],[["(\\d{3})(\\d{4})","$1 $2",["[89]"]],["(\\d{4})(\\d{4})","$1 $2",["[267]"]],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[89]"]]]],"SX":["1","011","7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|(5\\d{6})$","721$1",0,"721"],"SY":["963","00","[1-39]\\d{8}|[1-5]\\d{7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-5]"],"0$1",1],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1",1]],"0"],"SZ":["268","00","0800\\d{4}|(?:[237]\\d|900)\\d{6}",[8,9],[["(\\d{4})(\\d{4})","$1 $2",["[0237]"]],["(\\d{5})(\\d{4})","$1 $2",["9"]]]],"TA":["290","00","8\\d{3}",[4],0,0,0,0,0,0,"8"],"TC":["1","011","(?:[58]\\d\\d|649|900)\\d{7}",[10],0,"1",0,"1|([2-479]\\d{6})$","649$1",0,"649"],"TD":["235","00|16","(?:22|[69]\\d|77)\\d{6}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2679]"]]],0,0,0,0,0,0,0,"00"],"TG":["228","00","[279]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[279]"]]]],"TH":["66","00[1-9]","1\\d{9}|[1689]\\d{8}|[1-57]\\d{7}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[13-9]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],"0"],"TJ":["992","810","(?:[02]0|11|[3-57-9]\\d)\\d{7}",[9],[["(\\d{6})(\\d)(\\d{2})","$1 $2 $3",["331","3317"],0,1],["(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["[34]7|91[78]"],0,1],["(\\d{4})(\\d)(\\d{4})","$1 $2 $3",["3"],0,1],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[02457-9]|11"],0,1]],"8",0,0,0,0,0,0,"8~10"],"TK":["690","00","[2-47]\\d{3,6}",[4,5,6,7]],"TL":["670","00","7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["[2-489]|70"]],["(\\d{4})(\\d{4})","$1 $2",["7"]]]],"TM":["993","810","[1-6]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["12"],"(8 $1)"],["(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-5]"],"(8 $1)"],["(\\d{2})(\\d{6})","$1 $2",["6"],"8 $1"]],"8",0,0,0,0,0,0,"8~10"],"TN":["216","00","[2-57-9]\\d{7}",[8],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-57-9]"]]]],"TO":["676","00","(?:0800|[5-8]\\d{3})\\d{3}|[2-8]\\d{4}",[5,7],[["(\\d{2})(\\d{3})","$1-$2",["[2-4]|50|6[09]|7[0-24-69]|8[05]"]],["(\\d{4})(\\d{3})","$1 $2",["0"]],["(\\d{3})(\\d{4})","$1 $2",["[5-8]"]]]],"TR":["90","00","4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}",[7,10,12,13],[["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["512|8[0589]|90"],"0$1",1],["(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:[0-59]|61)","5(?:[0-59]|616)","5(?:[0-59]|6161)"],"0$1",1],["(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24][1-8]|3[1-9]"],"(0$1)",1],["(\\d{3})(\\d{3})(\\d{6,7})","$1 $2 $3",["80"],"0$1",1]],"0"],"TT":["1","011","(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-46-8]\\d{6})$","868$1",0,"868"],"TV":["688","00","(?:2|7\\d\\d|90)\\d{4}",[5,6,7],[["(\\d{2})(\\d{3})","$1 $2",["2"]],["(\\d{2})(\\d{4})","$1 $2",["90"]],["(\\d{2})(\\d{5})","$1 $2",["7"]]]],"TW":["886","0(?:0[25-79]|19)","[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}",[7,8,9,10,11],[["(\\d{2})(\\d)(\\d{4})","$1 $2 $3",["202"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[258]0"],"0$1"],["(\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["[23568]|4(?:0[02-48]|[1-47-9])|7[1-9]","[23568]|4(?:0[2-48]|[1-47-9])|(?:400|7)[1-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[49]"],"0$1"],["(\\d{2})(\\d{4})(\\d{4,5})","$1 $2 $3",["7"],"0$1"]],"0",0,0,0,0,0,0,0,"#"],"TZ":["255","00[056]","(?:[26-8]\\d|41|90)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[24]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[67]"],"0$1"]],"0"],"UA":["380","00","[89]\\d{9}|[3-9]\\d{8}",[9,10],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]","6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["4[45][0-5]|5(?:0|6[37])|6(?:[12][018]|[36-8])|7|89|9[1-9]|(?:48|57)[0137-9]","4[45][0-5]|5(?:0|6(?:3[14-7]|7))|6(?:[12][018]|[36-8])|7|89|9[1-9]|(?:48|57)[0137-9]"],"0$1"],["(\\d{4})(\\d{5})","$1 $2",["[3-6]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],"0",0,0,0,0,0,0,"0~0"],"UG":["256","00[057]","800\\d{6}|(?:[29]0|[347]\\d)\\d{7}",[9],[["(\\d{4})(\\d{5})","$1 $2",["202","2024"],"0$1"],["(\\d{3})(\\d{6})","$1 $2",["[27-9]|4(?:6[45]|[7-9])"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["[34]"],"0$1"]],"0"],"US":["1","011","[2-9]\\d{9}",[10],[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",["[2-9]"],0,1,"$1-$2-$3"]],"1",0,0,0,0,0,[["(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[01356]|3[0-24679]|4[167]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[0179]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-289]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}"],[""],["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"],["900[2-9]\\d{6}"],["52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}"]]],"UY":["598","0(?:0|1[3-9]\\d)","(?:(?:4\\d{3}|9)\\d|80)\\d{5}|[249]\\d{7}",[7,8,10],[["(\\d{3})(\\d{4})","$1 $2",["8|90"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"],["(\\d{4})(\\d{4})","$1 $2",["[24]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["4"],"0$1"]],"0",0,0,0,0,0,0,"00"," int. "],"UZ":["998","810","55501\\d{4}|(?:33|[679]\\d|88)\\d{7}",[9],[["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[35-9]"],"8 $1"]],"8",0,0,0,0,0,0,"8~10"],"VA":["39","00","0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}",[6,7,8,9,10,11],0,0,0,0,0,0,"06698"],"VC":["1","011","(?:[58]\\d\\d|784|900)\\d{7}",[10],0,"1",0,"1|([2-7]\\d{6})$","784$1",0,"784"],"VE":["58","00","[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}",[10],[["(\\d{3})(\\d{7})","$1-$2",["[24-689]"],"0$1"]],"0"],"VG":["1","011","(?:284|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-578]\\d{6})$","284$1",0,"284"],"VI":["1","011","[58]\\d{9}|(?:34|90)0\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","340$1",0,"340"],"VN":["84","00","[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}",[7,8,9,10],[["(\\d{2})(\\d{5})","$1 $2",["80"],"0$1",1],["(\\d{4})(\\d{4,6})","$1 $2",["1"],0,1],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[69]"],"0$1",1],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[3578]"],"0$1",1],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2[48]"],"0$1",1],["(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["2"],"0$1",1]],"0"],"VU":["678","00","(?:[23]\\d|[48]8)\\d{3}|(?:[57]\\d|90)\\d{5}",[5,7],[["(\\d{3})(\\d{4})","$1 $2",["[579]"]]]],"WF":["681","00","(?:[45]0|68|72|8\\d)\\d{4}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[4-8]"]]]],"WS":["685","0","(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}",[5,6,7,10],[["(\\d{5})","$1",["[2-5]|6[1-9]"]],["(\\d{3})(\\d{3,7})","$1 $2",["[68]"]],["(\\d{2})(\\d{5})","$1 $2",["7"]]]],"XK":["383","00","[23]\\d{7,8}|(?:4\\d\\d|[89]00)\\d{5}",[8,9],[["(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-4]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[23]"],"0$1"]],"0"],"YE":["967","00","(?:1|7\\d)\\d{7}|[1-7]\\d{6}",[7,8,9],[["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-6]|7[24-68]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["7"],"0$1"]],"0"],"YT":["262","00","80\\d{7}|(?:26|63)9\\d{6}",[9],0,"0",0,0,0,0,"269|63"],"ZA":["27","00","[1-79]\\d{8}|8\\d{4,9}",[5,6,7,8,9,10],[["(\\d{2})(\\d{3,4})","$1 $2",["8[1-4]"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["8[1-4]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["860"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"]],"0"],"ZM":["260","00","(?:63|80)0\\d{6}|(?:21|[79]\\d)\\d{7}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[28]"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["[79]"],"0$1"]],"0"],"ZW":["263","00","2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}",[5,6,7,8,9,10],[["(\\d{3})(\\d{3,5})","$1 $2",["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"],"0$1"],["(\\d)(\\d{3})(\\d{2,4})","$1 $2 $3",["[49]"],"0$1"],["(\\d{3})(\\d{4})","$1 $2",["80"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2","2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)","2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"],"0$1"],["(\\d{4})(\\d{6})","$1 $2",["8"],"0$1"],["(\\d{2})(\\d{3,5})","$1 $2",["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["29[013-9]|39|54"],"0$1"],["(\\d{4})(\\d{3,5})","$1 $2",["(?:25|54)8","258|5483"],"0$1"]],"0"]},"nonGeographic":{"800":["800",0,"[1-9]\\d{7}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[1-9]"]]],0,0,0,0,0,0,[0,0,["[1-9]\\d{7}"]]],"808":["808",0,"[1-9]\\d{7}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[1-9]"]]],0,0,0,0,0,0,[0,0,0,0,0,0,0,0,0,["[1-9]\\d{7}"]]],"870":["870",0,"[35-7]\\d{8}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[35-7]"]]],0,0,0,0,0,0,[0,["(?:[356]\\d|7[6-8])\\d{7}"]]],"878":["878",0,"10\\d{10}",[12],[["(\\d{2})(\\d{5})(\\d{5})","$1 $2 $3",["1"]]],0,0,0,0,0,0,[0,0,0,0,0,0,0,0,["10\\d{10}"]]],"881":["881",0,"[0-36-9]\\d{8}",[9],[["(\\d)(\\d{3})(\\d{5})","$1 $2 $3",["[0-36-9]"]]],0,0,0,0,0,0,[0,["[0-36-9]\\d{8}"]]],"882":["882",0,"[13]\\d{6}(?:\\d{2,5})?|285\\d{9}|[19]\\d{7}",[7,8,9,10,11,12],[["(\\d{2})(\\d{5})","$1 $2",["16|342"]],["(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[19]"]],["(\\d{2})(\\d{4})(\\d{3})","$1 $2 $3",["3[23]"]],["(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["1"]],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["34[57]"]],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["34"]],["(\\d{2})(\\d{4,5})(\\d{5})","$1 $2 $3",["[1-3]"]]],0,0,0,0,0,0,[0,["3(?:37\\d\\d|42)\\d{4}|3(?:2|47|7\\d{3})\\d{7}",[7,9,10,12]],0,0,0,0,0,0,["1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:(?:285\\d\\d|3(?:45|[69]\\d{3}))\\d|9[89])\\d{6}"]]],"883":["883",0,"51\\d{7}(?:\\d{3})?",[9,12],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["510"]],["(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["510"]],["(\\d{4})(\\d{4})(\\d{4})","$1 $2 $3",["5"]]],0,0,0,0,0,0,[0,0,0,0,0,0,0,0,["51[013]0\\d{8}|5100\\d{5}"]]],"888":["888",0,"\\d{11}",[11],[["(\\d{3})(\\d{3})(\\d{5})","$1 $2 $3"]],0,0,0,0,0,0,[0,0,0,0,0,0,["\\d{11}"]]],"979":["979",0,"[1359]\\d{8}",[9],[["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["[1359]"]]],0,0,0,0,0,0,[0,0,0,["[1359]\\d{8}"]]]}});

/***/ })

}]);