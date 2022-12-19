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
/* harmony export */   "clearField": () => (/* binding */ clearField),
/* harmony export */   "clearLocal": () => (/* binding */ clearLocal),
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
var clearLocal = function clearLocal() {
  localStorage.clear();
};
var clearField = function clearField(fieldName) {
  localStorage.removeItem(fieldName);
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'currentMode') {
    var isActiveMode = localStorage.getItem('mode');
    if (isActiveMode === 'unactive' || !isActiveMode) {
      sendResponse('active');
      return;
    }
    sendResponse('unactive');
    return;
  }
  localStorage.setItem("mode", request.message ? "active" : "unactive");
  sendResponse(request.message ? "unactive" : "active");
  window.addEventListener('mouseup', function (e) {
    if (localStorage.getItem('mode') === 'active') {
      if (window.getSelection().toString().trim().length === 0) return;
      var text = window.getSelection().toString().toLowerCase().split('');
      var originalString = e.target.value;
      var inputToInsertBack = [];
      var inputFields = document.getElementsByTagName('input');
      for (var i = 0; i < inputFields.length; i++) {
        if (inputFields[i].className === e.target.className) {
          inputToInsertBack = inputFields[i];
        }
      }
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
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SVAsaUJBQWlCLENBQUNRLFlBQWE7TUFFMUMsSUFBSUMsU0FBUyxHQUFHLG9EQUFvRDtNQUVwRSxJQUFHQSxTQUFTLENBQUNqRCxJQUFJLENBQUM2QixNQUFNLENBQUNFLFlBQVksRUFBRSxDQUFDQyxRQUFRLEVBQUUsQ0FBQyxFQUFDO1FBRWpELElBQUlrQixhQUFZLEdBQUdmLElBQUksQ0FBQ2dCLEdBQUcsQ0FBQyxVQUFBN0UsQ0FBQztVQUFBLE9BQUV3QixvRUFBc0IsQ0FBQ3hCLENBQUMsQ0FBQztRQUFBLEVBQUM7UUFDekQsT0FBT2tFLGlCQUFpQixDQUFDOUIsS0FBSyxHQUFHNEIsY0FBYyxDQUFDYyxTQUFTLENBQUMsQ0FBQyxFQUFFUCxLQUFLLENBQUMsR0FBR0ssYUFBWSxDQUFDRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUdmLGNBQWMsQ0FBQ2MsU0FBUyxDQUFDTCxHQUFHLENBQUM7TUFFNUg7TUFFQyxJQUFJRyxZQUFZLEdBQUdmLElBQUksQ0FBQ2dCLEdBQUcsQ0FBQyxVQUFBN0UsQ0FBQztRQUFBLE9BQUVnQyw2REFBZSxDQUFDaEMsQ0FBQyxDQUFDO01BQUEsRUFBQztNQUNsRCxPQUFPa0UsaUJBQWlCLENBQUM5QixLQUFLLEdBQUc0QixjQUFjLENBQUNjLFNBQVMsQ0FBQyxDQUFDLEVBQUVQLEtBQUssQ0FBQyxHQUFHSyxZQUFZLENBQUNHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBR2YsY0FBYyxDQUFDYyxTQUFTLENBQUNMLEdBQUcsQ0FBQztJQUM3SDtFQUNKLENBQUMsQ0FBQztBQUVKLENBQUMsQ0FDSCxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGFuZ3VhZ2VfZml4ZXIvLi9zcmMvdXRpbHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vbGFuZ3VhZ2VfZml4ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbGFuZ3VhZ2VfZml4ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xhbmd1YWdlX2ZpeGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbGFuZ3VhZ2VfZml4ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci8uL3NyYy9jb250ZW50U2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCBpbmRleCA9IFtcclxuICAgIHtxOlwiL1wifSx7dzpcIidcIn0se2U6XCLXp1wifSx7cjpcIteoXCJ9LHt0Olwi15BcIn0se3k6XCLXmFwifSx7dTpcIteVXCJ9LHtpOlwi159cIn0se286XCLXnVwifSx7cDpcItekXCJ9LFxyXG4gICAge2E6XCLXqVwifSx7czpcIteTXCJ9LHtkOlwi15JcIn0se2Y6XCLXm1wifSx7ZzpcIteiXCJ9LHtoOlwi15lcIn0se2o6XCLXl1wifSx7azpcItecXCJ9LHtsOlwi15pcIn0seyc7JzpcItejXCJ9LFxyXG4gICAgeycuJzpcItelXCJ9LHsnLCc6XCLXqlwifSx7bTpcItemXCJ9LHtuOlwi155cIn0se2I6XCLXoFwifSx7djpcIteUXCJ9LHtjOlwi15FcIn0se3g6XCLXoVwifSx7ejpcIteWXCJ9XHJcbl0gICBcclxuXHJcblxyXG5sZXQgcmVnZXhSdWxlVG9OYXRpdmUgPSAvXlswLTkqIyt+YCFAJCVeJigpXz1bXFxdXFx7fXwnOlwiXFwvPD4/XSskL1xyXG5sZXQgcmVnZXhSdWxlVG9FbmdsaXNoID0gIC9eW35gIUAjJCVeJiooKV8rPVtcXF1cXHt9fDsnOlwiLC5cXC88Pj9hLXpBLVowLTktXSskL1xyXG5cclxuY29uc3Qgc3dpdGNoVG9OYXRpdmVMYW5ndWFnZSA9IChsZXR0ZXIpID0+e1xyXG4gICAgaWYobGV0dGVyID09PSBcIiBcIikgcmV0dXJuIFwiIFwiXHJcbiAgICBpZihyZWdleFJ1bGVUb05hdGl2ZS50ZXN0KGxldHRlcikpIHJldHVybiBsZXR0ZXJcclxuICAgIGxldCBmb3VuZE9uZSA9IGluZGV4LmZpbmQoZWwgPT4gT2JqZWN0LmtleXMoZWwpID09IGxldHRlcilcclxuICAgIHJldHVybiBmb3VuZE9uZVtsZXR0ZXJdXHJcbn0gXHJcblxyXG5jb25zdCBzd2l0Y2hUb0VuZ2xpc2ggPSAobGV0dGVyKSA9PntcclxuICAgIGlmKGxldHRlciA9PT0gXCIgXCIpIHJldHVybiBcIiBcIiBcclxuICAgIGlmKHJlZ2V4UnVsZVRvRW5nbGlzaC50ZXN0KGxldHRlcikpIHJldHVybiBsZXR0ZXJcclxuICAgIGxldCBmb3VuZE9uZSA9IGluZGV4LmZpbmQoZWwgPT4gT2JqZWN0LnZhbHVlcyhlbClbMF0gPT0gbGV0dGVyKVxyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGZvdW5kT25lKVswXVxyXG59IFxyXG5cclxuY29uc3Qgc2V0SXRlbVRvTG9jYWwgPSAoa2V5LHZhbHVlKT0+e1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oW2tleV0sdmFsdWUpXHJcbiB9IFxyXG5cclxuIGNvbnN0IGdldEl0ZW1Gcm9tTG9jYWwgPSAodmFsdWUpPT57XHJcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0odmFsdWUpXHJcbiB9IFxyXG5cclxuY29uc3QgY2xlYXJMb2NhbCA9ICgpID0+e1xyXG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKClcclxufSBcclxuXHJcbmNvbnN0IGNsZWFyRmllbGQgPSAoZmllbGROYW1lKSA9PntcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGZpZWxkTmFtZSlcclxufVxyXG5cclxuIGV4cG9ydCAge3N3aXRjaFRvRW5nbGlzaCxzd2l0Y2hUb05hdGl2ZUxhbmd1YWdlLHNldEl0ZW1Ub0xvY2FsLGdldEl0ZW1Gcm9tTG9jYWwsY2xlYXJMb2NhbCxjbGVhckZpZWxkfSAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7c3dpdGNoVG9FbmdsaXNoLHN3aXRjaFRvTmF0aXZlTGFuZ3VhZ2V9IGZyb20gJy4vdXRpbHMvdXRpbHMnXHJcblxyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKFxyXG5cclxuICAgIGZ1bmN0aW9uKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XHJcbiAgICAgXHJcbiAgICAgIGlmKHJlcXVlc3QubWVzc2FnZSA9PT0gJ2N1cnJlbnRNb2RlJylcclxuICAgICAgeyBcclxuICAgICAgICAgICBsZXQgaXNBY3RpdmVNb2RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21vZGUnKVxyXG4gICAgICAgICAgIGlmKGlzQWN0aXZlTW9kZSA9PT0gJ3VuYWN0aXZlJyB8fCAhaXNBY3RpdmVNb2RlKSBcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICBzZW5kUmVzcG9uc2UoJ3VuYWN0aXZlJylcclxuICAgICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG5cclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJtb2RlXCIscmVxdWVzdC5tZXNzYWdlP1wiYWN0aXZlXCI6XCJ1bmFjdGl2ZVwiKVxyXG4gICAgICBzZW5kUmVzcG9uc2UocmVxdWVzdC5tZXNzYWdlP1widW5hY3RpdmVcIjpcImFjdGl2ZVwiKTtcclxuXHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJyxlPT57XHJcbiAgICAgICAgIFxyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtb2RlJykgID09PSAnYWN0aXZlJykgXHJcbiAgICAgICAgICB7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgIGxldCB0ZXh0ID0gIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuc3BsaXQoJycpXHJcbiAgICAgICAgICAgICBsZXQgb3JpZ2luYWxTdHJpbmcgPSAgZS50YXJnZXQudmFsdWVcclxuXHJcbiAgICAgICAgICAgICBsZXQgaW5wdXRUb0luc2VydEJhY2sgPSBbXVxyXG4gICAgICAgICAgICAgbGV0IGlucHV0RmllbGRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0Jyk7IFxyXG5cclxuICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8aW5wdXRGaWVsZHMubGVuZ3RoO2krKylcclxuICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoaW5wdXRGaWVsZHNbaV0uY2xhc3NOYW1lID09PSBlLnRhcmdldC5jbGFzc05hbWUpXHJcbiAgICAgICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRUb0luc2VydEJhY2sgPSBpbnB1dEZpZWxkc1tpXVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH0gICBcclxuXHJcbiAgICAgICAgICAgICBsZXQgc3RhcnQgPSAoaW5wdXRUb0luc2VydEJhY2suc2VsZWN0aW9uU3RhcnQpXHJcbiAgICAgICAgICAgICBsZXQgZW5kID0gKGlucHV0VG9JbnNlcnRCYWNrLnNlbGVjdGlvbkVuZClcclxuXHJcbiAgICAgICAgICAgICBsZXQgcmVnZXhSdWxlID0gL15bfmAhQCMkJV4mKigpXys9W1xcXVxce318Oyc6XCIsLlxcLzw+P2EtekEtWjAtOS1cXHNdKyQvXHJcblxyXG4gICAgICAgICAgICAgaWYocmVnZXhSdWxlLnRlc3Qod2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCkpKXsgXHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZVN0ciA9IHRleHQubWFwKHQ9PnN3aXRjaFRvTmF0aXZlTGFuZ3VhZ2UodCkpIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0VG9JbnNlcnRCYWNrLnZhbHVlID0gb3JpZ2luYWxTdHJpbmcuc3Vic3RyaW5nKDAsIHN0YXJ0KSArIHRyYW5zbGF0ZVN0ci5qb2luKCcnKSArIG9yaWdpbmFsU3RyaW5nLnN1YnN0cmluZyhlbmQpIFxyXG5cclxuICAgICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdHJhbnNsYXRlU3RyID0gdGV4dC5tYXAodD0+c3dpdGNoVG9FbmdsaXNoKHQpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0VG9JbnNlcnRCYWNrLnZhbHVlID0gb3JpZ2luYWxTdHJpbmcuc3Vic3RyaW5nKDAsIHN0YXJ0KSArIHRyYW5zbGF0ZVN0ci5qb2luKCcnKSArIG9yaWdpbmFsU3RyaW5nLnN1YnN0cmluZyhlbmQpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSkgXHJcbiAgICBcclxuICAgICAgICB9XHJcbiAgICAgKTsiXSwibmFtZXMiOlsiaW5kZXgiLCJxIiwidyIsImUiLCJyIiwidCIsInkiLCJ1IiwiaSIsIm8iLCJwIiwiYSIsInMiLCJkIiwiZiIsImciLCJoIiwiaiIsImsiLCJsIiwibSIsIm4iLCJiIiwidiIsImMiLCJ4IiwieiIsInJlZ2V4UnVsZVRvTmF0aXZlIiwicmVnZXhSdWxlVG9FbmdsaXNoIiwic3dpdGNoVG9OYXRpdmVMYW5ndWFnZSIsImxldHRlciIsInRlc3QiLCJmb3VuZE9uZSIsImZpbmQiLCJlbCIsIk9iamVjdCIsImtleXMiLCJzd2l0Y2hUb0VuZ2xpc2giLCJ2YWx1ZXMiLCJzZXRJdGVtVG9Mb2NhbCIsImtleSIsInZhbHVlIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImdldEl0ZW1Gcm9tTG9jYWwiLCJnZXRJdGVtIiwiY2xlYXJMb2NhbCIsImNsZWFyIiwiY2xlYXJGaWVsZCIsImZpZWxkTmFtZSIsInJlbW92ZUl0ZW0iLCJjaHJvbWUiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJyZXF1ZXN0Iiwic2VuZGVyIiwic2VuZFJlc3BvbnNlIiwibWVzc2FnZSIsImlzQWN0aXZlTW9kZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRTZWxlY3Rpb24iLCJ0b1N0cmluZyIsInRyaW0iLCJsZW5ndGgiLCJ0ZXh0IiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsIm9yaWdpbmFsU3RyaW5nIiwidGFyZ2V0IiwiaW5wdXRUb0luc2VydEJhY2siLCJpbnB1dEZpZWxkcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjbGFzc05hbWUiLCJzdGFydCIsInNlbGVjdGlvblN0YXJ0IiwiZW5kIiwic2VsZWN0aW9uRW5kIiwicmVnZXhSdWxlIiwidHJhbnNsYXRlU3RyIiwibWFwIiwic3Vic3RyaW5nIiwiam9pbiJdLCJzb3VyY2VSb290IjoiIn0=