/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "switchToEnglish": () => (/* binding */ switchToEnglish),
/* harmony export */   "switchToNativeLanguage": () => (/* binding */ switchToNativeLanguage)
/* harmony export */ });
var index = [{
  q: "/"
}, {
  w: "'"
}, {
  e: "ק"
}, {
  r: "ר"
}, {
  t: "א"
}, {
  y: "ט"
}, {
  u: "ו"
}, {
  i: "ן"
}, {
  o: "ם"
}, {
  p: "פ"
}, {
  a: "ש"
}, {
  s: "ד"
}, {
  d: "ג"
}, {
  f: "כ"
}, {
  g: "ע"
}, {
  h: "י"
}, {
  j: "ח"
}, {
  k: "ל"
}, {
  l: "ך"
}, {
  ';': "ף"
}, {
  '.': "ץ"
}, {
  ',': "ת"
}, {
  m: "צ"
}, {
  n: "מ"
}, {
  b: "נ"
}, {
  v: "ה"
}, {
  c: "ב"
}, {
  x: "ס"
}, {
  z: "ז"
}];
var regexRuleToNative = /^[0-9*#+~`!@$%^&()_=[\]\{}|':"\/<>?]+$/;
var regexRuleToEnglish = /^[~`!@#$%^&*()_+=[\]\{}|;:",.\<>?a-zA-Z0-9-]+$/;
var switchToNativeLanguage = function switchToNativeLanguage(letter) {
  if (letter === " ") return " ";
  if (regexRuleToNative.test(letter)) return letter;
  var foundOne = index.find(function (el) {
    return Object.keys(el) == letter;
  });
  return foundOne[letter];
};
var switchToEnglish = function switchToEnglish(letter) {
  if (letter === " ") return " ";
  if (regexRuleToEnglish.test(letter)) return letter;
  var foundOne = index.find(function (el) {
    return Object.values(el)[0] == letter;
  });
  return Object.keys(foundOne)[0];
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/contentScript.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.js");

chrome.runtime.sendMessage({
  message: 'activate extension'
}, function (response) {
  if (response !== 'OK') return;
  window.addEventListener('keydown', function (e) {
    //Only if user press Ctrl + B
    if (e.ctrlKey && e.code === "KeyB") {
      var _elementToInsertBack, _elementToInsertBack2;
      if (window.getSelection().toString().trim().length === 0) return;

      //Selected text to convert
      var selectedText = window.getSelection().toString().toLowerCase().split('');
      var originalString = e.target.value;
      var inputFields = document.getElementsByTagName('input');
      var textAreaFields = document.getElementsByTagName('textarea');
      var divFields = document.getElementsByTagName('div');
      var elementToInsertBack;
      var divToInsertBack;

      //Using for loop instead of high order functions -> HTMLcollection
      for (var i = 0; i < (inputFields === null || inputFields === void 0 ? void 0 : inputFields.length); i++) {
        if (e.target.tagName.toLowerCase() !== 'input') break;
        if (inputFields[i] === e.target) {
          elementToInsertBack = inputFields[i];
        }
      }
      for (var _i = 0; _i < (textAreaFields === null || textAreaFields === void 0 ? void 0 : textAreaFields.length); _i++) {
        if (e.target.tagName.toLowerCase() !== 'textarea') break;
        if (textAreaFields[_i] === e.target) {
          elementToInsertBack = textAreaFields[_i];
        }
      }
      for (var _i2 = 0; _i2 < (divFields === null || divFields === void 0 ? void 0 : divFields.length); _i2++) {
        if (e.target.tagName.toLowerCase() !== 'div') break;
        if (divFields[_i2] === e.target) {
          originalString = divFields[_i2].innerText;
          divToInsertBack = divFields[_i2];
        }
      }
      var regexRule = /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-\s]+$/;

      //If it is a div element to insert to
      if (divToInsertBack) {
        //Start & end indexes of the selected text
        var divIndexStart = window.getSelection().anchorOffset;
        var divIndexEnd = window.getSelection().focusOffset;
        if (regexRule.test(window.getSelection().toString())) {
          var _translateStr2 = selectedText.map(function (t) {
            return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.switchToNativeLanguage)(t);
          });
          return divToInsertBack.innerHTML = originalString.substring(0, divIndexStart) + _translateStr2.join('') + originalString.substring(divIndexEnd);
        }
        var _translateStr = selectedText.map(function (t) {
          return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.switchToEnglish)(t);
        });
        return divToInsertBack.innerHTML = originalString.substring(0, divIndexStart) + _translateStr.join('') + originalString.substring(divIndexEnd);
      }

      //The start & end indexes of the selected text if it's an input
      var start = (_elementToInsertBack = elementToInsertBack) === null || _elementToInsertBack === void 0 ? void 0 : _elementToInsertBack.selectionStart;
      var end = (_elementToInsertBack2 = elementToInsertBack) === null || _elementToInsertBack2 === void 0 ? void 0 : _elementToInsertBack2.selectionEnd;
      if (regexRule.test(window.getSelection().toString())) {
        var _translateStr3 = selectedText.map(function (t) {
          return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.switchToNativeLanguage)(t);
        });
        return elementToInsertBack.value = originalString.substring(0, start) + _translateStr3.join('') + originalString.substring(end);
      }
      var translateStr = selectedText.map(function (t) {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.switchToEnglish)(t);
      });
      return elementToInsertBack.value = originalString.substring(0, start) + translateStr.join('') + originalString.substring(end);
    }
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxJQUFJQyxHQUFHLDRCQUFJaEIsbUJBQW1CLDBEQUFuQixzQkFBcUJpQixZQUFhO01BRTdDLElBQUdiLFNBQVMsQ0FBQ3BDLElBQUksQ0FBQ2EsTUFBTSxDQUFDSSxZQUFZLEVBQUUsQ0FBQ0MsUUFBUSxFQUFFLENBQUMsRUFDOUM7UUFDRSxJQUFJdUIsY0FBWSxHQUFHcEIsWUFBWSxDQUFDcUIsR0FBRyxDQUFDLFVBQUFwRSxDQUFDO1VBQUEsT0FBRXdCLG9FQUFzQixDQUFDeEIsQ0FBQyxDQUFDO1FBQUEsRUFBQztRQUNqRSxPQUFPMEQsbUJBQW1CLENBQUNOLEtBQUssR0FBR0YsY0FBYyxDQUFDb0IsU0FBUyxDQUFDLENBQUMsRUFBRUUsS0FBSyxDQUFDLEdBQUdMLGNBQVksQ0FBQ0ksSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHckIsY0FBYyxDQUFDb0IsU0FBUyxDQUFDSSxHQUFHLENBQUM7TUFDL0g7TUFFRSxJQUFJUCxZQUFZLEdBQUdwQixZQUFZLENBQUNxQixHQUFHLENBQUMsVUFBQXBFLENBQUM7UUFBQSxPQUFFZ0MsNkRBQWUsQ0FBQ2hDLENBQUMsQ0FBQztNQUFBLEVBQUM7TUFDMUQsT0FBTzBELG1CQUFtQixDQUFDTixLQUFLLEdBQUdGLGNBQWMsQ0FBQ29CLFNBQVMsQ0FBQyxDQUFDLEVBQUVFLEtBQUssQ0FBQyxHQUFHTCxZQUFZLENBQUNJLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBR3JCLGNBQWMsQ0FBQ29CLFNBQVMsQ0FBQ0ksR0FBRyxDQUFDO0lBRXZJO0VBQ0wsQ0FBQyxDQUFDO0FBRVQsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci8uL3NyYy91dGlscy91dGlscy5qcyIsIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGFuZ3VhZ2VfZml4ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xhbmd1YWdlX2ZpeGVyLy4vc3JjL2NvbnRlbnRTY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IGluZGV4ID0gW1xyXG4gICAge3E6XCIvXCJ9LHt3OlwiJ1wifSx7ZTpcItenXCJ9LHtyOlwi16hcIn0se3Q6XCLXkFwifSx7eTpcIteYXCJ9LHt1Olwi15VcIn0se2k6XCLXn1wifSx7bzpcItedXCJ9LHtwOlwi16RcIn0sXHJcbiAgICB7YTpcItepXCJ9LHtzOlwi15NcIn0se2Q6XCLXklwifSx7ZjpcItebXCJ9LHtnOlwi16JcIn0se2g6XCLXmVwifSx7ajpcIteXXCJ9LHtrOlwi15xcIn0se2w6XCLXmlwifSx7JzsnOlwi16NcIn0sXHJcbiAgICB7Jy4nOlwi16VcIn0seycsJzpcIteqXCJ9LHttOlwi16ZcIn0se246XCLXnlwifSx7YjpcItegXCJ9LHt2Olwi15RcIn0se2M6XCLXkVwifSx7eDpcItehXCJ9LHt6Olwi15ZcIn1cclxuXSAgXHJcblxyXG5cclxubGV0IHJlZ2V4UnVsZVRvTmF0aXZlID0gL15bMC05KiMrfmAhQCQlXiYoKV89W1xcXVxce318JzpcIlxcLzw+P10rJC9cclxubGV0IHJlZ2V4UnVsZVRvRW5nbGlzaCA9ICAvXlt+YCFAIyQlXiYqKClfKz1bXFxdXFx7fXw7OlwiLC5cXDw+P2EtekEtWjAtOS1dKyQvXHJcblxyXG5jb25zdCBzd2l0Y2hUb05hdGl2ZUxhbmd1YWdlID0gKGxldHRlcikgPT57XHJcbiAgICBpZihsZXR0ZXIgPT09IFwiIFwiKSByZXR1cm4gXCIgXCJcclxuICAgIGlmKHJlZ2V4UnVsZVRvTmF0aXZlLnRlc3QobGV0dGVyKSkgcmV0dXJuIGxldHRlclxyXG5cclxuICAgIGxldCBmb3VuZE9uZSA9IGluZGV4LmZpbmQoZWwgPT4gT2JqZWN0LmtleXMoZWwpID09IGxldHRlcilcclxuICAgIHJldHVybiBmb3VuZE9uZVtsZXR0ZXJdXHJcbn0gXHJcblxyXG5jb25zdCBzd2l0Y2hUb0VuZ2xpc2ggPSAobGV0dGVyKSA9PntcclxuICAgIGlmKGxldHRlciA9PT0gXCIgXCIpIHJldHVybiBcIiBcIiBcclxuICAgIGlmKHJlZ2V4UnVsZVRvRW5nbGlzaC50ZXN0KGxldHRlcikpIHJldHVybiBsZXR0ZXJcclxuICAgIFxyXG4gICAgbGV0IGZvdW5kT25lID0gaW5kZXguZmluZChlbCA9PiBPYmplY3QudmFsdWVzKGVsKVswXSA9PSBsZXR0ZXIpXHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZm91bmRPbmUpWzBdXHJcbn0gICBcclxuXHJcblxyXG4gZXhwb3J0ICB7c3dpdGNoVG9FbmdsaXNoLHN3aXRjaFRvTmF0aXZlTGFuZ3VhZ2V9ICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtzd2l0Y2hUb0VuZ2xpc2gsc3dpdGNoVG9OYXRpdmVMYW5ndWFnZX0gZnJvbSAnLi91dGlscy91dGlscydcclxuXHJcblxyXG4gY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe21lc3NhZ2U6ICdhY3RpdmF0ZSBleHRlbnNpb24nfSxyZXNwb25zZSA9PntcclxuXHJcbiAgICAgICAgICBpZihyZXNwb25zZSAhPT0gJ09LJykgcmV0dXJuXHJcbiAgICAgIFxyXG4gICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJyxlPT57IFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL09ubHkgaWYgdXNlciBwcmVzcyBDdHJsICsgQlxyXG4gICAgICAgICAgICBpZihlLmN0cmxLZXkgJiYgZS5jb2RlID09PSBcIktleUJcIilcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICBpZih3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoID09PSAwKSByZXR1cm4gXHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAvL1NlbGVjdGVkIHRleHQgdG8gY29udmVydFxyXG4gICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRUZXh0ID0gd2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5zcGxpdCgnJylcclxuICAgICAgICAgICAgICAgICAgbGV0IG9yaWdpbmFsU3RyaW5nID0gIGUudGFyZ2V0LnZhbHVlXHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICBsZXQgaW5wdXRGaWVsZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKTsgXHJcbiAgICAgICAgICAgICAgICAgIGxldCB0ZXh0QXJlYUZpZWxkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0ZXh0YXJlYScpXHJcbiAgICAgICAgICAgICAgICAgIGxldCBkaXZGaWVsZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylcclxuICAgICAgICAgICAgICAgICAgbGV0IGVsZW1lbnRUb0luc2VydEJhY2s7IGxldCBkaXZUb0luc2VydEJhY2s7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAvL1VzaW5nIGZvciBsb29wIGluc3RlYWQgb2YgaGlnaCBvcmRlciBmdW5jdGlvbnMgLT4gSFRNTGNvbGxlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxpbnB1dEZpZWxkcz8ubGVuZ3RoO2krKylcclxuICAgICAgICAgICAgICAgICAgIHsgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaW5wdXQnKSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXRGaWVsZHNbaV0gPT09IGUudGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFRvSW5zZXJ0QmFjayA9IGlucHV0RmllbGRzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0ZXh0QXJlYUZpZWxkcz8ubGVuZ3RoO2krKylcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ3RleHRhcmVhJykgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmKHRleHRBcmVhRmllbGRzW2ldID09PSBlLnRhcmdldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VG9JbnNlcnRCYWNrID0gdGV4dEFyZWFGaWVsZHNbaV0gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfSAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8ZGl2RmllbGRzPy5sZW5ndGg7aSsrKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnZGl2JykgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmKGRpdkZpZWxkc1tpXSA9PT0gZS50YXJnZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxTdHJpbmcgPSBkaXZGaWVsZHNbaV0uaW5uZXJUZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2VG9JbnNlcnRCYWNrID0gZGl2RmllbGRzW2ldICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgbGV0IHJlZ2V4UnVsZSA9IC9eW35gIUAjJCVeJiooKV8rPVtcXF1cXHt9fDsnOlwiLC5cXC88Pj9hLXpBLVowLTktXFxzXSskLyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgLy9JZiBpdCBpcyBhIGRpdiBlbGVtZW50IHRvIGluc2VydCB0b1xyXG4gICAgICAgICAgICAgICAgICAgaWYoZGl2VG9JbnNlcnRCYWNrKVxyXG4gICAgICAgICAgICAgICAgICAgeyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAvL1N0YXJ0ICYgZW5kIGluZGV4ZXMgb2YgdGhlIHNlbGVjdGVkIHRleHRcclxuICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXZJbmRleFN0YXJ0ID0gd2luZG93LmdldFNlbGVjdGlvbigpLmFuY2hvck9mZnNldFxyXG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGRpdkluZGV4RW5kID0gIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5mb2N1c09mZnNldFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYocmVnZXhSdWxlLnRlc3Qod2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgeyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZVN0ciA9IHNlbGVjdGVkVGV4dC5tYXAodD0+c3dpdGNoVG9OYXRpdmVMYW5ndWFnZSh0KSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpdlRvSW5zZXJ0QmFjay5pbm5lckhUTUwgPSBvcmlnaW5hbFN0cmluZy5zdWJzdHJpbmcoMCwgZGl2SW5kZXhTdGFydCkgKyB0cmFuc2xhdGVTdHIuam9pbignJykgKyBvcmlnaW5hbFN0cmluZy5zdWJzdHJpbmcoZGl2SW5kZXhFbmQpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZVN0ciA9IHNlbGVjdGVkVGV4dC5tYXAodD0+c3dpdGNoVG9FbmdsaXNoKHQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkaXZUb0luc2VydEJhY2suaW5uZXJIVE1MID0gb3JpZ2luYWxTdHJpbmcuc3Vic3RyaW5nKDAsIGRpdkluZGV4U3RhcnQpICsgdHJhbnNsYXRlU3RyLmpvaW4oJycpICsgb3JpZ2luYWxTdHJpbmcuc3Vic3RyaW5nKGRpdkluZGV4RW5kKVxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgLy9UaGUgc3RhcnQgJiBlbmQgaW5kZXhlcyBvZiB0aGUgc2VsZWN0ZWQgdGV4dCBpZiBpdCdzIGFuIGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSAoZWxlbWVudFRvSW5zZXJ0QmFjaz8uc2VsZWN0aW9uU3RhcnQpXHJcbiAgICAgICAgICAgICAgICAgICBsZXQgZW5kID0gKGVsZW1lbnRUb0luc2VydEJhY2s/LnNlbGVjdGlvbkVuZCkgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgIGlmKHJlZ2V4UnVsZS50ZXN0KHdpbmRvdy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZVN0ciA9IHNlbGVjdGVkVGV4dC5tYXAodD0+c3dpdGNoVG9OYXRpdmVMYW5ndWFnZSh0KSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRUb0luc2VydEJhY2sudmFsdWUgPSBvcmlnaW5hbFN0cmluZy5zdWJzdHJpbmcoMCwgc3RhcnQpICsgdHJhbnNsYXRlU3RyLmpvaW4oJycpICsgb3JpZ2luYWxTdHJpbmcuc3Vic3RyaW5nKGVuZCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0cmFuc2xhdGVTdHIgPSBzZWxlY3RlZFRleHQubWFwKHQ9PnN3aXRjaFRvRW5nbGlzaCh0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudFRvSW5zZXJ0QmFjay52YWx1ZSA9IG9yaWdpbmFsU3RyaW5nLnN1YnN0cmluZygwLCBzdGFydCkgKyB0cmFuc2xhdGVTdHIuam9pbignJykgKyBvcmlnaW5hbFN0cmluZy5zdWJzdHJpbmcoZW5kKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgfSkgXHJcblxyXG4gICAgfSlcclxuXHJcbiAgICBcclxuIl0sIm5hbWVzIjpbImluZGV4IiwicSIsInciLCJlIiwiciIsInQiLCJ5IiwidSIsImkiLCJvIiwicCIsImEiLCJzIiwiZCIsImYiLCJnIiwiaCIsImoiLCJrIiwibCIsIm0iLCJuIiwiYiIsInYiLCJjIiwieCIsInoiLCJyZWdleFJ1bGVUb05hdGl2ZSIsInJlZ2V4UnVsZVRvRW5nbGlzaCIsInN3aXRjaFRvTmF0aXZlTGFuZ3VhZ2UiLCJsZXR0ZXIiLCJ0ZXN0IiwiZm91bmRPbmUiLCJmaW5kIiwiZWwiLCJPYmplY3QiLCJrZXlzIiwic3dpdGNoVG9FbmdsaXNoIiwidmFsdWVzIiwiY2hyb21lIiwicnVudGltZSIsInNlbmRNZXNzYWdlIiwibWVzc2FnZSIsInJlc3BvbnNlIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImN0cmxLZXkiLCJjb2RlIiwiZ2V0U2VsZWN0aW9uIiwidG9TdHJpbmciLCJ0cmltIiwibGVuZ3RoIiwic2VsZWN0ZWRUZXh0IiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsIm9yaWdpbmFsU3RyaW5nIiwidGFyZ2V0IiwidmFsdWUiLCJpbnB1dEZpZWxkcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ0ZXh0QXJlYUZpZWxkcyIsImRpdkZpZWxkcyIsImVsZW1lbnRUb0luc2VydEJhY2siLCJkaXZUb0luc2VydEJhY2siLCJ0YWdOYW1lIiwiaW5uZXJUZXh0IiwicmVnZXhSdWxlIiwiZGl2SW5kZXhTdGFydCIsImFuY2hvck9mZnNldCIsImRpdkluZGV4RW5kIiwiZm9jdXNPZmZzZXQiLCJ0cmFuc2xhdGVTdHIiLCJtYXAiLCJpbm5lckhUTUwiLCJzdWJzdHJpbmciLCJqb2luIiwic3RhcnQiLCJzZWxlY3Rpb25TdGFydCIsImVuZCIsInNlbGVjdGlvbkVuZCJdLCJzb3VyY2VSb290IjoiIn0=