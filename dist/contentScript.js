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
/* harmony export */   "getItemFromLocal": () => (/* binding */ getItemFromLocal),
/* harmony export */   "setItemToLocal": () => (/* binding */ setItemToLocal),
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
var regexRuleToEnglish = /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/;
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
var setItemToLocal = function setItemToLocal(key, value) {
  localStorage.setItem([key], value);
};
var getItemFromLocal = function getItemFromLocal(value) {
  return localStorage.getItem(value);
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


//Triggers whenever user changes activation mode on the popup window
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //Every time the popup opens, check the current mode to update the button text
  if (request.message === 'currentMode') {
    var isActiveMode = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.getItemFromLocal)('mode');
    if (isActiveMode === 'unactive' || !isActiveMode) {
      sendResponse('active');
      return;
    }
    sendResponse('unactive');
    return;
  }
  //Depend on what the user decide, set the localStorage mode of activation
  (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.setItemToLocal)("mode", request.message ? "active" : "unactive");
  sendResponse(request.message ? "unactive" : "active");
});
window.addEventListener('select', function (e) {
  //Only if user switch to active
  if ((0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.getItemFromLocal)('mode') === 'active') {
    if (window.getSelection().toString().trim().length === 0) return;
    var text = window.getSelection().toString().toLowerCase().split('');
    var originalString = e.target.value;
    var inputFields = document.getElementsByTagName('input');
    var inputToInsertBack = [];
    for (var i = 0; i < inputFields.length; i++) {
      if (inputFields[i].className === e.target.className) {
        inputToInsertBack = inputFields[i];
      }
    }

    //The start and end indexes/indices of the selected string
    var start = inputToInsertBack.selectionStart;
    var end = inputToInsertBack.selectionEnd;
    var regexRule = /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-\s]+$/;
    if (regexRule.test(window.getSelection().toString())) {
      var _translateStr = text.map(function (t) {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.switchToNativeLanguage)(t);
      });
      return inputToInsertBack.value = originalString.substring(0, start) + _translateStr.join('') + originalString.substring(end);
    }
    var translateStr = text.map(function (t) {
      return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.switchToEnglish)(t);
    });
    return inputToInsertBack.value = originalString.substring(0, start) + translateStr.join('') + originalString.substring(end);
  }
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDZ0IsR0FBRyxDQUFDLFVBQUF4RSxDQUFDO1FBQUEsT0FBRXdCLG9FQUFzQixDQUFDeEIsQ0FBQyxDQUFDO01BQUEsRUFBQztNQUN6RCxPQUFPZ0UsaUJBQWlCLENBQUM1QixLQUFLLEdBQUd1QixjQUFjLENBQUNjLFNBQVMsQ0FBQyxDQUFDLEVBQUVQLEtBQUssQ0FBQyxHQUFHSyxhQUFZLENBQUNHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBR2YsY0FBYyxDQUFDYyxTQUFTLENBQUNMLEdBQUcsQ0FBQztJQUU1SDtJQUVELElBQUlHLFlBQVksR0FBR2YsSUFBSSxDQUFDZ0IsR0FBRyxDQUFDLFVBQUF4RSxDQUFDO01BQUEsT0FBRWdDLDZEQUFlLENBQUNoQyxDQUFDLENBQUM7SUFBQSxFQUFDO0lBQ2xELE9BQU9nRSxpQkFBaUIsQ0FBQzVCLEtBQUssR0FBR3VCLGNBQWMsQ0FBQ2MsU0FBUyxDQUFDLENBQUMsRUFBRVAsS0FBSyxDQUFDLEdBQUdLLFlBQVksQ0FBQ0csSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHZixjQUFjLENBQUNjLFNBQVMsQ0FBQ0wsR0FBRyxDQUFDO0VBRTVIO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci8uL3NyYy91dGlscy91dGlscy5qcyIsIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGFuZ3VhZ2VfZml4ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xhbmd1YWdlX2ZpeGVyLy4vc3JjL2NvbnRlbnRTY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IGluZGV4ID0gW1xyXG4gICAge3E6XCIvXCJ9LHt3OlwiJ1wifSx7ZTpcItenXCJ9LHtyOlwi16hcIn0se3Q6XCLXkFwifSx7eTpcIteYXCJ9LHt1Olwi15VcIn0se2k6XCLXn1wifSx7bzpcItedXCJ9LHtwOlwi16RcIn0sXHJcbiAgICB7YTpcItepXCJ9LHtzOlwi15NcIn0se2Q6XCLXklwifSx7ZjpcItebXCJ9LHtnOlwi16JcIn0se2g6XCLXmVwifSx7ajpcIteXXCJ9LHtrOlwi15xcIn0se2w6XCLXmlwifSx7JzsnOlwi16NcIn0sXHJcbiAgICB7Jy4nOlwi16VcIn0seycsJzpcIteqXCJ9LHttOlwi16ZcIn0se246XCLXnlwifSx7YjpcItegXCJ9LHt2Olwi15RcIn0se2M6XCLXkVwifSx7eDpcItehXCJ9LHt6Olwi15ZcIn1cclxuXSAgXHJcblxyXG5cclxubGV0IHJlZ2V4UnVsZVRvTmF0aXZlID0gL15bMC05KiMrfmAhQCQlXiYoKV89W1xcXVxce318JzpcIlxcLzw+P10rJC9cclxubGV0IHJlZ2V4UnVsZVRvRW5nbGlzaCA9ICAvXlt+YCFAIyQlXiYqKClfKz1bXFxdXFx7fXw7JzpcIiwuXFwvPD4/YS16QS1aMC05LV0rJC9cclxuXHJcbmNvbnN0IHN3aXRjaFRvTmF0aXZlTGFuZ3VhZ2UgPSAobGV0dGVyKSA9PntcclxuICAgIGlmKGxldHRlciA9PT0gXCIgXCIpIHJldHVybiBcIiBcIlxyXG4gICAgaWYocmVnZXhSdWxlVG9OYXRpdmUudGVzdChsZXR0ZXIpKSByZXR1cm4gbGV0dGVyXHJcbiAgICBsZXQgZm91bmRPbmUgPSBpbmRleC5maW5kKGVsID0+IE9iamVjdC5rZXlzKGVsKSA9PSBsZXR0ZXIpXHJcbiAgICByZXR1cm4gZm91bmRPbmVbbGV0dGVyXVxyXG59IFxyXG5cclxuY29uc3Qgc3dpdGNoVG9FbmdsaXNoID0gKGxldHRlcikgPT57XHJcbiAgICBpZihsZXR0ZXIgPT09IFwiIFwiKSByZXR1cm4gXCIgXCIgXHJcbiAgICBpZihyZWdleFJ1bGVUb0VuZ2xpc2gudGVzdChsZXR0ZXIpKSByZXR1cm4gbGV0dGVyXHJcbiAgICBsZXQgZm91bmRPbmUgPSBpbmRleC5maW5kKGVsID0+IE9iamVjdC52YWx1ZXMoZWwpWzBdID09IGxldHRlcilcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhmb3VuZE9uZSlbMF1cclxufSBcclxuXHJcbmNvbnN0IHNldEl0ZW1Ub0xvY2FsID0gKGtleSx2YWx1ZSk9PntcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFtrZXldLHZhbHVlKVxyXG4gfSBcclxuXHJcbiBjb25zdCBnZXRJdGVtRnJvbUxvY2FsID0gKHZhbHVlKT0+e1xyXG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKHZhbHVlKVxyXG4gfSBcclxuXHJcblxyXG4gZXhwb3J0ICB7c3dpdGNoVG9FbmdsaXNoLHN3aXRjaFRvTmF0aXZlTGFuZ3VhZ2Usc2V0SXRlbVRvTG9jYWwsZ2V0SXRlbUZyb21Mb2NhbH0gIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3N3aXRjaFRvRW5nbGlzaCxzd2l0Y2hUb05hdGl2ZUxhbmd1YWdlLHNldEl0ZW1Ub0xvY2FsLGdldEl0ZW1Gcm9tTG9jYWx9IGZyb20gJy4vdXRpbHMvdXRpbHMnXHJcblxyXG5cclxuLy9UcmlnZ2VycyB3aGVuZXZlciB1c2VyIGNoYW5nZXMgYWN0aXZhdGlvbiBtb2RlIG9uIHRoZSBwb3B1cCB3aW5kb3dcclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKFxyXG5cclxuICAgIGZ1bmN0aW9uKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XHJcbiAgICAgXHJcbiAgICAgIC8vRXZlcnkgdGltZSB0aGUgcG9wdXAgb3BlbnMsIGNoZWNrIHRoZSBjdXJyZW50IG1vZGUgdG8gdXBkYXRlIHRoZSBidXR0b24gdGV4dFxyXG4gICAgICBpZihyZXF1ZXN0Lm1lc3NhZ2UgPT09ICdjdXJyZW50TW9kZScpXHJcbiAgICAgICAgeyBcclxuICAgICAgICAgICBsZXQgaXNBY3RpdmVNb2RlID0gZ2V0SXRlbUZyb21Mb2NhbCgnbW9kZScpXHJcblxyXG4gICAgICAgICAgIGlmKGlzQWN0aXZlTW9kZSA9PT0gJ3VuYWN0aXZlJyB8fCAhaXNBY3RpdmVNb2RlKSBcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICBzZW5kUmVzcG9uc2UoJ3VuYWN0aXZlJylcclxuICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgICAvL0RlcGVuZCBvbiB3aGF0IHRoZSB1c2VyIGRlY2lkZSwgc2V0IHRoZSBsb2NhbFN0b3JhZ2UgbW9kZSBvZiBhY3RpdmF0aW9uXHJcbiAgICAgICAgICBzZXRJdGVtVG9Mb2NhbChcIm1vZGVcIixyZXF1ZXN0Lm1lc3NhZ2U/XCJhY3RpdmVcIjpcInVuYWN0aXZlXCIpXHJcbiAgICAgICAgICBzZW5kUmVzcG9uc2UocmVxdWVzdC5tZXNzYWdlP1widW5hY3RpdmVcIjpcImFjdGl2ZVwiKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgfSlcclxuXHJcblxyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0JyxlPT57XHJcbiAgICAgICAgIFxyXG4gICAgICAgIC8vT25seSBpZiB1c2VyIHN3aXRjaCB0byBhY3RpdmVcclxuICAgICAgICBpZihnZXRJdGVtRnJvbUxvY2FsKCdtb2RlJykgID09PSAnYWN0aXZlJykgXHJcbiAgICAgICAgICB7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICBsZXQgdGV4dCA9ICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcnKVxyXG4gICAgICAgICAgICAgIGxldCBvcmlnaW5hbFN0cmluZyA9ICBlLnRhcmdldC52YWx1ZVxyXG5cclxuICAgICAgICAgICAgICBsZXQgaW5wdXRGaWVsZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKTsgXHJcbiAgICAgICAgICAgICAgbGV0IGlucHV0VG9JbnNlcnRCYWNrID0gW11cclxuXHJcbiAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxpbnB1dEZpZWxkcy5sZW5ndGg7aSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIGlmKGlucHV0RmllbGRzW2ldLmNsYXNzTmFtZSA9PT0gZS50YXJnZXQuY2xhc3NOYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgICAgICAgaW5wdXRUb0luc2VydEJhY2sgPSBpbnB1dEZpZWxkc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgLy9UaGUgc3RhcnQgYW5kIGVuZCBpbmRleGVzL2luZGljZXMgb2YgdGhlIHNlbGVjdGVkIHN0cmluZ1xyXG4gICAgICAgICAgICAgICBsZXQgc3RhcnQgPSAoaW5wdXRUb0luc2VydEJhY2suc2VsZWN0aW9uU3RhcnQpXHJcbiAgICAgICAgICAgICAgIGxldCBlbmQgPSAoaW5wdXRUb0luc2VydEJhY2suc2VsZWN0aW9uRW5kKVxyXG5cclxuICAgICAgICAgICAgICAgbGV0IHJlZ2V4UnVsZSA9IC9eW35gIUAjJCVeJiooKV8rPVtcXF1cXHt9fDsnOlwiLC5cXC88Pj9hLXpBLVowLTktXFxzXSskL1xyXG5cclxuICAgICAgICAgICAgICAgaWYocmVnZXhSdWxlLnRlc3Qod2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCkpKXsgXHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIGxldCB0cmFuc2xhdGVTdHIgPSB0ZXh0Lm1hcCh0PT5zd2l0Y2hUb05hdGl2ZUxhbmd1YWdlKHQpKSBcclxuICAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXRUb0luc2VydEJhY2sudmFsdWUgPSBvcmlnaW5hbFN0cmluZy5zdWJzdHJpbmcoMCwgc3RhcnQpICsgdHJhbnNsYXRlU3RyLmpvaW4oJycpICsgb3JpZ2luYWxTdHJpbmcuc3Vic3RyaW5nKGVuZCkgXHJcblxyXG4gICAgICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgICAgIGxldCB0cmFuc2xhdGVTdHIgPSB0ZXh0Lm1hcCh0PT5zd2l0Y2hUb0VuZ2xpc2godCkpXHJcbiAgICAgICAgICAgICAgIHJldHVybiBpbnB1dFRvSW5zZXJ0QmFjay52YWx1ZSA9IG9yaWdpbmFsU3RyaW5nLnN1YnN0cmluZygwLCBzdGFydCkgKyB0cmFuc2xhdGVTdHIuam9pbignJykgKyBvcmlnaW5hbFN0cmluZy5zdWJzdHJpbmcoZW5kKVxyXG5cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KSBcclxuICAgIFxyXG4gICAgICBcclxuICAgICAiXSwibmFtZXMiOlsiaW5kZXgiLCJxIiwidyIsImUiLCJyIiwidCIsInkiLCJ1IiwiaSIsIm8iLCJwIiwiYSIsInMiLCJkIiwiZiIsImciLCJoIiwiaiIsImsiLCJsIiwibSIsIm4iLCJiIiwidiIsImMiLCJ4IiwieiIsInJlZ2V4UnVsZVRvTmF0aXZlIiwicmVnZXhSdWxlVG9FbmdsaXNoIiwic3dpdGNoVG9OYXRpdmVMYW5ndWFnZSIsImxldHRlciIsInRlc3QiLCJmb3VuZE9uZSIsImZpbmQiLCJlbCIsIk9iamVjdCIsImtleXMiLCJzd2l0Y2hUb0VuZ2xpc2giLCJ2YWx1ZXMiLCJzZXRJdGVtVG9Mb2NhbCIsImtleSIsInZhbHVlIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImdldEl0ZW1Gcm9tTG9jYWwiLCJnZXRJdGVtIiwiY2hyb21lIiwicnVudGltZSIsIm9uTWVzc2FnZSIsImFkZExpc3RlbmVyIiwicmVxdWVzdCIsInNlbmRlciIsInNlbmRSZXNwb25zZSIsIm1lc3NhZ2UiLCJpc0FjdGl2ZU1vZGUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZ2V0U2VsZWN0aW9uIiwidG9TdHJpbmciLCJ0cmltIiwibGVuZ3RoIiwidGV4dCIsInRvTG93ZXJDYXNlIiwic3BsaXQiLCJvcmlnaW5hbFN0cmluZyIsInRhcmdldCIsImlucHV0RmllbGRzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlucHV0VG9JbnNlcnRCYWNrIiwiY2xhc3NOYW1lIiwic3RhcnQiLCJzZWxlY3Rpb25TdGFydCIsImVuZCIsInNlbGVjdGlvbkVuZCIsInJlZ2V4UnVsZSIsInRyYW5zbGF0ZVN0ciIsIm1hcCIsInN1YnN0cmluZyIsImpvaW4iXSwic291cmNlUm9vdCI6IiJ9