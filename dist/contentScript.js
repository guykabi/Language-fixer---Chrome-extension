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
/* harmony export */   "handleLogic": () => (/* binding */ handleLogic),
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
var handleLogic = function handleLogic(toRegex, selectedText, originalString, start, end) {
  var regexRule = /^[~`!@#$%^&*()_+=[\]\{}|;:",.\<>?a-zA-Z0-9-\s]+$/;
  if (regexRule.test(toRegex)) {
    var _translateStr = selectedText.map(function (t) {
      return switchToNativeLanguage(t);
    });
    window.getSelection().empty();
    return originalString.substring(0, start) + _translateStr.join('') + originalString.substring(end);
  }
  var translateStr = selectedText.map(function (t) {
    return switchToEnglish(t);
  });
  window.getSelection().empty();
  return originalString.substring(0, start) + translateStr.join('') + originalString.substring(end);
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
    if (e.ctrlKey && e.code === "KeyQ") {
      if (window.getSelection().toString().trim().length === 0) return;

      //Selected text to convert
      var selectedText = window.getSelection().toString().toLowerCase().split('');
      var originalString = e.target.value;
      var toRegexTest = window.getSelection().toString();
      //If it is a div element to insert to
      if (e.target.tagName.toLowerCase() === 'div') {
        originalString = e.target.innerText;

        //Start & end indexes of the selected text
        var _start = window.getSelection().anchorOffset;
        var _end = window.getSelection().focusOffset;
        var _resp = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.handleLogic)(toRegexTest, selectedText, originalString, _start, _end);
        return e.target.textContent = _resp;
      }

      //The start & end indexes of the selected text if it's an input
      var start = e.target.selectionStart;
      var end = e.target.selectionEnd;
      var resp = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.handleLogic)(toRegexTest, selectedText, originalString, start, end);
      return e.target.value = resp;
    }
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudFNjcmlwdC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTUEsS0FBSyxHQUFHLENBQ1Y7RUFBQ0MsQ0FBQyxFQUFDO0FBQUcsQ0FBQyxFQUFDO0VBQUNDLENBQUMsRUFBQztBQUFHLENBQUMsRUFBQztFQUFDQyxDQUFDLEVBQUM7QUFBRyxDQUFDLEVBQUM7RUFBQ0MsQ0FBQyxFQUFDO0FBQUcsQ0FBQyxFQUFDO0VBQUNDLENBQUMsRUFBQztBQUFHLENBQUMsRUFBQztFQUFDQyxDQUFDLEVBQUM7QUFBRyxDQUFDLEVBQUM7RUFBQ0MsQ0FBQyxFQUFDO0FBQUcsQ0FBQyxFQUFDO0VBQUNDLENBQUMsRUFBQztBQUFHLENBQUMsRUFBQztFQUFDQyxDQUFDLEVBQUM7QUFBRyxDQUFDLEVBQUM7RUFBQ0MsQ0FBQyxFQUFDO0FBQUcsQ0FBQyxFQUMvRTtFQUFDQyxDQUFDLEVBQUM7QUFBRyxDQUFDLEVBQUM7RUFBQ0MsQ0FBQyxFQUFDO0FBQUcsQ0FBQyxFQUFDO0VBQUNDLENBQUMsRUFBQztBQUFHLENBQUMsRUFBQztFQUFDQyxDQUFDLEVBQUM7QUFBRyxDQUFDLEVBQUM7RUFBQ0MsQ0FBQyxFQUFDO0FBQUcsQ0FBQyxFQUFDO0VBQUNDLENBQUMsRUFBQztBQUFHLENBQUMsRUFBQztFQUFDQyxDQUFDLEVBQUM7QUFBRyxDQUFDLEVBQUM7RUFBQ0MsQ0FBQyxFQUFDO0FBQUcsQ0FBQyxFQUFDO0VBQUNDLENBQUMsRUFBQztBQUFHLENBQUMsRUFBQztFQUFDLEdBQUcsRUFBQztBQUFHLENBQUMsRUFDakY7RUFBQyxHQUFHLEVBQUM7QUFBRyxDQUFDLEVBQUM7RUFBQyxHQUFHLEVBQUM7QUFBRyxDQUFDLEVBQUM7RUFBQ0MsQ0FBQyxFQUFDO0FBQUcsQ0FBQyxFQUFDO0VBQUNDLENBQUMsRUFBQztBQUFHLENBQUMsRUFBQztFQUFDQyxDQUFDLEVBQUM7QUFBRyxDQUFDLEVBQUM7RUFBQ0MsQ0FBQyxFQUFDO0FBQUcsQ0FBQyxFQUFDO0VBQUNDLENBQUMsRUFBQztBQUFHLENBQUMsRUFBQztFQUFDQyxDQUFDLEVBQUM7QUFBRyxDQUFDLEVBQUM7RUFBQ0MsQ0FBQyxFQUFDO0FBQUcsQ0FBQyxDQUM5RTtBQUdELElBQUlDLGlCQUFpQixHQUFHLHdDQUF3QztBQUNoRSxJQUFJQyxrQkFBa0IsR0FBSSxnREFBZ0Q7QUFFMUUsSUFBTUMsc0JBQXNCLEdBQUcsU0FBekJBLHNCQUFzQixDQUFJQyxNQUFNLEVBQUk7RUFDdEMsSUFBR0EsTUFBTSxLQUFLLEdBQUcsRUFBRSxPQUFPLEdBQUc7RUFDN0IsSUFBR0gsaUJBQWlCLENBQUNJLElBQUksQ0FBQ0QsTUFBTSxDQUFDLEVBQUUsT0FBT0EsTUFBTTtFQUVoRCxJQUFJRSxRQUFRLEdBQUdoQyxLQUFLLENBQUNpQyxJQUFJLENBQUMsVUFBQUMsRUFBRTtJQUFBLE9BQUlDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDRixFQUFFLENBQUMsSUFBSUosTUFBTTtFQUFBLEVBQUM7RUFDMUQsT0FBT0UsUUFBUSxDQUFDRixNQUFNLENBQUM7QUFDM0IsQ0FBQztBQUVELElBQU1PLGVBQWUsR0FBRyxTQUFsQkEsZUFBZSxDQUFJUCxNQUFNLEVBQUk7RUFDL0IsSUFBR0EsTUFBTSxLQUFLLEdBQUcsRUFBRSxPQUFPLEdBQUc7RUFDN0IsSUFBR0Ysa0JBQWtCLENBQUNHLElBQUksQ0FBQ0QsTUFBTSxDQUFDLEVBQUUsT0FBT0EsTUFBTTtFQUVqRCxJQUFJRSxRQUFRLEdBQUdoQyxLQUFLLENBQUNpQyxJQUFJLENBQUMsVUFBQUMsRUFBRTtJQUFBLE9BQUlDLE1BQU0sQ0FBQ0csTUFBTSxDQUFDSixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUosTUFBTTtFQUFBLEVBQUM7RUFDL0QsT0FBT0ssTUFBTSxDQUFDQyxJQUFJLENBQUNKLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBSUQsSUFBTU8sV0FBVyxHQUFHLFNBQWRBLFdBQVcsQ0FBSUMsT0FBTyxFQUFDQyxZQUFZLEVBQUNDLGNBQWMsRUFBQ0MsS0FBSyxFQUFDQyxHQUFHLEVBQUk7RUFDbEUsSUFBSUMsU0FBUyxHQUFHLGtEQUFrRDtFQUNsRSxJQUFHQSxTQUFTLENBQUNkLElBQUksQ0FBQ1MsT0FBTyxDQUFDLEVBQ3RCO0lBQ0MsSUFBSU0sYUFBWSxHQUFHTCxZQUFZLENBQUNNLEdBQUcsQ0FBQyxVQUFBMUMsQ0FBQztNQUFBLE9BQUV3QixzQkFBc0IsQ0FBQ3hCLENBQUMsQ0FBQztJQUFBLEVBQUM7SUFDakUyQyxNQUFNLENBQUNDLFlBQVksRUFBRSxDQUFDQyxLQUFLLEVBQUU7SUFDN0IsT0FBT1IsY0FBYyxDQUFDUyxTQUFTLENBQUMsQ0FBQyxFQUFFUixLQUFLLENBQUMsR0FBR0csYUFBWSxDQUFDTSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUdWLGNBQWMsQ0FBQ1MsU0FBUyxDQUFDUCxHQUFHLENBQUM7RUFDaEY7RUFFbEIsSUFBSUUsWUFBWSxHQUFHTCxZQUFZLENBQUNNLEdBQUcsQ0FBQyxVQUFBMUMsQ0FBQztJQUFBLE9BQUVnQyxlQUFlLENBQUNoQyxDQUFDLENBQUM7RUFBQSxFQUFDO0VBQzFEMkMsTUFBTSxDQUFDQyxZQUFZLEVBQUUsQ0FBQ0MsS0FBSyxFQUFFO0VBQzdCLE9BQU9SLGNBQWMsQ0FBQ1MsU0FBUyxDQUFDLENBQUMsRUFBRVIsS0FBSyxDQUFDLEdBQUdHLFlBQVksQ0FBQ00sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHVixjQUFjLENBQUNTLFNBQVMsQ0FBQ1AsR0FBRyxDQUFDO0FBRXpHLENBQUM7Ozs7Ozs7VUMxQ0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055QztBQUd4Q1MsTUFBTSxDQUFDQyxPQUFPLENBQUNDLFdBQVcsQ0FBQztFQUFDQyxPQUFPLEVBQUM7QUFBb0IsQ0FBQyxFQUFFLFVBQUFDLFFBQVEsRUFBRztFQUU1RCxJQUFHQSxRQUFRLEtBQUssSUFBSSxFQUFFO0VBRXRCVCxNQUFNLENBQUNVLGdCQUFnQixDQUFDLFNBQVMsRUFBQyxVQUFBdkQsQ0FBQyxFQUFFO0lBRXBDO0lBQ0EsSUFBR0EsQ0FBQyxDQUFDd0QsT0FBTyxJQUFJeEQsQ0FBQyxDQUFDeUQsSUFBSSxLQUFLLE1BQU0sRUFDL0I7TUFDRSxJQUFHWixNQUFNLENBQUNDLFlBQVksRUFBRSxDQUFDWSxRQUFRLEVBQUUsQ0FBQ0MsSUFBSSxFQUFFLENBQUNDLE1BQU0sS0FBSyxDQUFDLEVBQUU7O01BRXREO01BQ0EsSUFBSXRCLFlBQVksR0FBR08sTUFBTSxDQUFDQyxZQUFZLEVBQUUsQ0FBQ1ksUUFBUSxFQUFFLENBQUNHLFdBQVcsRUFBRSxDQUFDQyxLQUFLLENBQUMsRUFBRSxDQUFDO01BQzNFLElBQUl2QixjQUFjLEdBQUd2QyxDQUFDLENBQUMrRCxNQUFNLENBQUNDLEtBQUs7TUFFbkMsSUFBSUMsV0FBVyxHQUFJcEIsTUFBTSxDQUFDQyxZQUFZLEVBQUUsQ0FBQ1ksUUFBUSxFQUFFO01BQ25EO01BQ0EsSUFBRzFELENBQUMsQ0FBQytELE1BQU0sQ0FBQ0csT0FBTyxDQUFDTCxXQUFXLEVBQUUsS0FBSyxLQUFLLEVBQzNDO1FBQ0d0QixjQUFjLEdBQUd2QyxDQUFDLENBQUMrRCxNQUFNLENBQUNJLFNBQVM7O1FBRW5DO1FBQ0EsSUFBSTNCLE1BQUssR0FBR0ssTUFBTSxDQUFDQyxZQUFZLEVBQUUsQ0FBQ3NCLFlBQVk7UUFDOUMsSUFBSTNCLElBQUcsR0FBSUksTUFBTSxDQUFDQyxZQUFZLEVBQUUsQ0FBQ3VCLFdBQVc7UUFFNUMsSUFBSUMsS0FBSSxHQUFHbEMseURBQVcsQ0FBQzZCLFdBQVcsRUFBQzNCLFlBQVksRUFBQ0MsY0FBYyxFQUFDQyxNQUFLLEVBQUNDLElBQUcsQ0FBQztRQUN6RSxPQUFPekMsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDUSxXQUFXLEdBQUdELEtBQUk7TUFDcEM7O01BRUE7TUFDQSxJQUFJOUIsS0FBSyxHQUFJeEMsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDUyxjQUFlO01BQ3JDLElBQUkvQixHQUFHLEdBQUl6QyxDQUFDLENBQUMrRCxNQUFNLENBQUNVLFlBQWE7TUFFakMsSUFBSUgsSUFBSSxHQUFHbEMseURBQVcsQ0FBQzZCLFdBQVcsRUFBQzNCLFlBQVksRUFBQ0MsY0FBYyxFQUFDQyxLQUFLLEVBQUNDLEdBQUcsQ0FBQztNQUN6RSxPQUFPekMsQ0FBQyxDQUFDK0QsTUFBTSxDQUFDQyxLQUFLLEdBQUdNLElBQUk7SUFDaEM7RUFDTCxDQUFDLENBQUM7QUFFVCxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xhbmd1YWdlX2ZpeGVyLy4vc3JjL3V0aWxzL3V0aWxzLmpzIiwid2VicGFjazovL2xhbmd1YWdlX2ZpeGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xhbmd1YWdlX2ZpeGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xhbmd1YWdlX2ZpeGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbGFuZ3VhZ2VfZml4ZXIvLi9zcmMvY29udGVudFNjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgaW5kZXggPSBbXHJcbiAgICB7cTpcIi9cIn0se3c6XCInXCJ9LHtlOlwi16dcIn0se3I6XCLXqFwifSx7dDpcIteQXCJ9LHt5Olwi15hcIn0se3U6XCLXlVwifSx7aTpcItefXCJ9LHtvOlwi151cIn0se3A6XCLXpFwifSxcclxuICAgIHthOlwi16lcIn0se3M6XCLXk1wifSx7ZDpcIteSXCJ9LHtmOlwi15tcIn0se2c6XCLXolwifSx7aDpcIteZXCJ9LHtqOlwi15dcIn0se2s6XCLXnFwifSx7bDpcIteaXCJ9LHsnOyc6XCLXo1wifSxcclxuICAgIHsnLic6XCLXpVwifSx7JywnOlwi16pcIn0se206XCLXplwifSx7bjpcIteeXCJ9LHtiOlwi16BcIn0se3Y6XCLXlFwifSx7YzpcIteRXCJ9LHt4Olwi16FcIn0se3o6XCLXllwifVxyXG5dICBcclxuXHJcblxyXG5sZXQgcmVnZXhSdWxlVG9OYXRpdmUgPSAvXlswLTkqIyt+YCFAJCVeJigpXz1bXFxdXFx7fXwnOlwiXFwvPD4/XSskL1xyXG5sZXQgcmVnZXhSdWxlVG9FbmdsaXNoID0gIC9eW35gIUAjJCVeJiooKV8rPVtcXF1cXHt9fDs6XCIsLlxcPD4/YS16QS1aMC05LV0rJC9cclxuXHJcbmNvbnN0IHN3aXRjaFRvTmF0aXZlTGFuZ3VhZ2UgPSAobGV0dGVyKSA9PntcclxuICAgIGlmKGxldHRlciA9PT0gXCIgXCIpIHJldHVybiBcIiBcIlxyXG4gICAgaWYocmVnZXhSdWxlVG9OYXRpdmUudGVzdChsZXR0ZXIpKSByZXR1cm4gbGV0dGVyXHJcblxyXG4gICAgbGV0IGZvdW5kT25lID0gaW5kZXguZmluZChlbCA9PiBPYmplY3Qua2V5cyhlbCkgPT0gbGV0dGVyKVxyXG4gICAgcmV0dXJuIGZvdW5kT25lW2xldHRlcl1cclxufSBcclxuXHJcbmNvbnN0IHN3aXRjaFRvRW5nbGlzaCA9IChsZXR0ZXIpID0+e1xyXG4gICAgaWYobGV0dGVyID09PSBcIiBcIikgcmV0dXJuIFwiIFwiIFxyXG4gICAgaWYocmVnZXhSdWxlVG9FbmdsaXNoLnRlc3QobGV0dGVyKSkgcmV0dXJuIGxldHRlclxyXG4gICAgXHJcbiAgICBsZXQgZm91bmRPbmUgPSBpbmRleC5maW5kKGVsID0+IE9iamVjdC52YWx1ZXMoZWwpWzBdID09IGxldHRlcilcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhmb3VuZE9uZSlbMF1cclxufSAgICBcclxuXHJcblxyXG5cclxuY29uc3QgaGFuZGxlTG9naWMgPSAodG9SZWdleCxzZWxlY3RlZFRleHQsb3JpZ2luYWxTdHJpbmcsc3RhcnQsZW5kKSA9PntcclxuICAgIGxldCByZWdleFJ1bGUgPSAvXlt+YCFAIyQlXiYqKClfKz1bXFxdXFx7fXw7OlwiLC5cXDw+P2EtekEtWjAtOS1cXHNdKyQvICBcclxuICAgIGlmKHJlZ2V4UnVsZS50ZXN0KHRvUmVnZXgpKVxyXG4gICAgICAgIHsgIFxyXG4gICAgICAgICBsZXQgdHJhbnNsYXRlU3RyID0gc2VsZWN0ZWRUZXh0Lm1hcCh0PT5zd2l0Y2hUb05hdGl2ZUxhbmd1YWdlKHQpKSBcclxuICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLmVtcHR5KCk7XHJcbiAgICAgICAgIHJldHVybiBvcmlnaW5hbFN0cmluZy5zdWJzdHJpbmcoMCwgc3RhcnQpICsgdHJhbnNsYXRlU3RyLmpvaW4oJycpICsgb3JpZ2luYWxTdHJpbmcuc3Vic3RyaW5nKGVuZCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCB0cmFuc2xhdGVTdHIgPSBzZWxlY3RlZFRleHQubWFwKHQ9PnN3aXRjaFRvRW5nbGlzaCh0KSlcclxuICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZW1wdHkoKTtcclxuICAgICAgICByZXR1cm4gb3JpZ2luYWxTdHJpbmcuc3Vic3RyaW5nKDAsIHN0YXJ0KSArIHRyYW5zbGF0ZVN0ci5qb2luKCcnKSArIG9yaWdpbmFsU3RyaW5nLnN1YnN0cmluZyhlbmQpXHJcblxyXG59XHJcblxyXG5cclxuIGV4cG9ydCAge3N3aXRjaFRvRW5nbGlzaCxzd2l0Y2hUb05hdGl2ZUxhbmd1YWdlLGhhbmRsZUxvZ2ljfSAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7aGFuZGxlTG9naWN9IGZyb20gJy4vdXRpbHMvdXRpbHMnXHJcblxyXG5cclxuIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHttZXNzYWdlOidhY3RpdmF0ZSBleHRlbnNpb24nfSwgcmVzcG9uc2UgPT57XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICBpZihyZXNwb25zZSAhPT0gJ09LJykgcmV0dXJuIFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLGU9PnsgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vT25seSBpZiB1c2VyIHByZXNzIEN0cmwgKyBCXHJcbiAgICAgICAgICAgIGlmKGUuY3RybEtleSAmJiBlLmNvZGUgPT09IFwiS2V5UVwiKVxyXG4gICAgICAgICAgICAgIHsgICAgXHJcbiAgICAgICAgICAgICAgICBpZih3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoID09PSAwKSByZXR1cm4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgLy9TZWxlY3RlZCB0ZXh0IHRvIGNvbnZlcnRcclxuICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZFRleHQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcnKVxyXG4gICAgICAgICAgICAgICAgICAgbGV0IG9yaWdpbmFsU3RyaW5nID0gZS50YXJnZXQudmFsdWUgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIGxldCB0b1JlZ2V4VGVzdCA9ICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKSAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgLy9JZiBpdCBpcyBhIGRpdiBlbGVtZW50IHRvIGluc2VydCB0b1xyXG4gICAgICAgICAgICAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGl2JylcclxuICAgICAgICAgICAgICAgICAgIHsgICBcclxuICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsU3RyaW5nID0gZS50YXJnZXQuaW5uZXJUZXh0ICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAvL1N0YXJ0ICYgZW5kIGluZGV4ZXMgb2YgdGhlIHNlbGVjdGVkIHRleHRcclxuICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hbmNob3JPZmZzZXRcclxuICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmQgPSAgd2luZG93LmdldFNlbGVjdGlvbigpLmZvY3VzT2Zmc2V0ICBcclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3AgPSBoYW5kbGVMb2dpYyh0b1JlZ2V4VGVzdCxzZWxlY3RlZFRleHQsb3JpZ2luYWxTdHJpbmcsc3RhcnQsZW5kKVxyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUudGFyZ2V0LnRleHRDb250ZW50ID0gcmVzcFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UaGUgc3RhcnQgJiBlbmQgaW5kZXhlcyBvZiB0aGUgc2VsZWN0ZWQgdGV4dCBpZiBpdCdzIGFuIGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gKGUudGFyZ2V0LnNlbGVjdGlvblN0YXJ0KVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmQgPSAoZS50YXJnZXQuc2VsZWN0aW9uRW5kKSAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzcCA9IGhhbmRsZUxvZ2ljKHRvUmVnZXhUZXN0LHNlbGVjdGVkVGV4dCxvcmlnaW5hbFN0cmluZyxzdGFydCxlbmQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUudGFyZ2V0LnZhbHVlID0gcmVzcFxyXG4gICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgfSkgXHJcblxyXG4gICAgfSlcclxuXHJcbiAgICBcclxuIl0sIm5hbWVzIjpbImluZGV4IiwicSIsInciLCJlIiwiciIsInQiLCJ5IiwidSIsImkiLCJvIiwicCIsImEiLCJzIiwiZCIsImYiLCJnIiwiaCIsImoiLCJrIiwibCIsIm0iLCJuIiwiYiIsInYiLCJjIiwieCIsInoiLCJyZWdleFJ1bGVUb05hdGl2ZSIsInJlZ2V4UnVsZVRvRW5nbGlzaCIsInN3aXRjaFRvTmF0aXZlTGFuZ3VhZ2UiLCJsZXR0ZXIiLCJ0ZXN0IiwiZm91bmRPbmUiLCJmaW5kIiwiZWwiLCJPYmplY3QiLCJrZXlzIiwic3dpdGNoVG9FbmdsaXNoIiwidmFsdWVzIiwiaGFuZGxlTG9naWMiLCJ0b1JlZ2V4Iiwic2VsZWN0ZWRUZXh0Iiwib3JpZ2luYWxTdHJpbmciLCJzdGFydCIsImVuZCIsInJlZ2V4UnVsZSIsInRyYW5zbGF0ZVN0ciIsIm1hcCIsIndpbmRvdyIsImdldFNlbGVjdGlvbiIsImVtcHR5Iiwic3Vic3RyaW5nIiwiam9pbiIsImNocm9tZSIsInJ1bnRpbWUiLCJzZW5kTWVzc2FnZSIsIm1lc3NhZ2UiLCJyZXNwb25zZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjdHJsS2V5IiwiY29kZSIsInRvU3RyaW5nIiwidHJpbSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwic3BsaXQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInRvUmVnZXhUZXN0IiwidGFnTmFtZSIsImlubmVyVGV4dCIsImFuY2hvck9mZnNldCIsImZvY3VzT2Zmc2V0IiwicmVzcCIsInRleHRDb250ZW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiXSwic291cmNlUm9vdCI6IiJ9