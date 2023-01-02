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
/* harmony export */   "handleLogic": () => (/* binding */ handleLogic)
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
    //window.getSelection().empty();
    return originalString.substring(0, start) + _translateStr.join('') + originalString.substring(end);
  }
  var translateStr = selectedText.map(function (t) {
    return switchToEnglish(t);
  });
  //window.getSelection().empty();
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
      e.target.value = resp;
      //For Facebook + Instagram search inputs
      e.target.blur();
      return;
    }
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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STtNQUNsQzs7TUFFQTtNQUNBLElBQUk3QixLQUFLLEdBQUl4QyxDQUFDLENBQUM4RCxNQUFNLENBQUNTLGNBQWU7TUFDckMsSUFBSTlCLEdBQUcsR0FBSXpDLENBQUMsQ0FBQzhELE1BQU0sQ0FBQ1UsWUFBYTtNQUVqQyxJQUFJSCxJQUFJLEdBQUdqQyx5REFBVyxDQUFDNEIsV0FBVyxFQUFDMUIsWUFBWSxFQUFDQyxjQUFjLEVBQUNDLEtBQUssRUFBQ0MsR0FBRyxDQUFDO01BQ3pFekMsQ0FBQyxDQUFDOEQsTUFBTSxDQUFDQyxLQUFLLEdBQUdNLElBQUk7TUFDckI7TUFDQXJFLENBQUMsQ0FBQzhELE1BQU0sQ0FBQ1csSUFBSSxFQUFFO01BQ2Y7SUFFSjtFQUNMLENBQUMsQ0FBQztBQUVOLENBQUMsQ0FDSCxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGFuZ3VhZ2VfZml4ZXIvLi9zcmMvdXRpbHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vbGFuZ3VhZ2VfZml4ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbGFuZ3VhZ2VfZml4ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xhbmd1YWdlX2ZpeGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbGFuZ3VhZ2VfZml4ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci8uL3NyYy9jb250ZW50U2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCBpbmRleCA9IFtcclxuICAgIHtxOlwiL1wifSx7dzpcIidcIn0se2U6XCLXp1wifSx7cjpcIteoXCJ9LHt0Olwi15BcIn0se3k6XCLXmFwifSx7dTpcIteVXCJ9LHtpOlwi159cIn0se286XCLXnVwifSx7cDpcItekXCJ9LFxyXG4gICAge2E6XCLXqVwifSx7czpcIteTXCJ9LHtkOlwi15JcIn0se2Y6XCLXm1wifSx7ZzpcIteiXCJ9LHtoOlwi15lcIn0se2o6XCLXl1wifSx7azpcItecXCJ9LHtsOlwi15pcIn0seyc7JzpcItejXCJ9LFxyXG4gICAgeycuJzpcItelXCJ9LHsnLCc6XCLXqlwifSx7bTpcItemXCJ9LHtuOlwi155cIn0se2I6XCLXoFwifSx7djpcIteUXCJ9LHtjOlwi15FcIn0se3g6XCLXoVwifSx7ejpcIteWXCJ9XHJcbl0gIFxyXG5cclxuXHJcbmxldCByZWdleFJ1bGVUb05hdGl2ZSA9IC9eWzAtOSojK35gIUAkJV4mKClfPVtcXF1cXHt9fCc6XCJcXC88Pj9dKyQvXHJcbmxldCByZWdleFJ1bGVUb0VuZ2xpc2ggPSAgL15bfmAhQCMkJV4mKigpXys9W1xcXVxce318OzpcIiwuXFw8Pj9hLXpBLVowLTktXSskL1xyXG5cclxuY29uc3Qgc3dpdGNoVG9OYXRpdmVMYW5ndWFnZSA9IChsZXR0ZXIpID0+e1xyXG4gICAgaWYobGV0dGVyID09PSBcIiBcIikgcmV0dXJuIFwiIFwiXHJcbiAgICBpZihyZWdleFJ1bGVUb05hdGl2ZS50ZXN0KGxldHRlcikpIHJldHVybiBsZXR0ZXJcclxuXHJcbiAgICBsZXQgZm91bmRPbmUgPSBpbmRleC5maW5kKGVsID0+IE9iamVjdC5rZXlzKGVsKSA9PSBsZXR0ZXIpXHJcbiAgICByZXR1cm4gZm91bmRPbmVbbGV0dGVyXVxyXG59IFxyXG5cclxuY29uc3Qgc3dpdGNoVG9FbmdsaXNoID0gKGxldHRlcikgPT57XHJcbiAgICBpZihsZXR0ZXIgPT09IFwiIFwiKSByZXR1cm4gXCIgXCIgXHJcbiAgICBpZihyZWdleFJ1bGVUb0VuZ2xpc2gudGVzdChsZXR0ZXIpKSByZXR1cm4gbGV0dGVyXHJcbiAgICBcclxuICAgIGxldCBmb3VuZE9uZSA9IGluZGV4LmZpbmQoZWwgPT4gT2JqZWN0LnZhbHVlcyhlbClbMF0gPT0gbGV0dGVyKVxyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGZvdW5kT25lKVswXVxyXG59ICAgIFxyXG5cclxuXHJcblxyXG5jb25zdCBoYW5kbGVMb2dpYyA9ICh0b1JlZ2V4LHNlbGVjdGVkVGV4dCxvcmlnaW5hbFN0cmluZyxzdGFydCxlbmQpID0+e1xyXG4gICAgbGV0IHJlZ2V4UnVsZSA9IC9eW35gIUAjJCVeJiooKV8rPVtcXF1cXHt9fDs6XCIsLlxcPD4/YS16QS1aMC05LVxcc10rJC8gIFxyXG4gICAgaWYocmVnZXhSdWxlLnRlc3QodG9SZWdleCkpXHJcbiAgICAgICAgeyAgXHJcbiAgICAgICAgIGxldCB0cmFuc2xhdGVTdHIgPSBzZWxlY3RlZFRleHQubWFwKHQ9PnN3aXRjaFRvTmF0aXZlTGFuZ3VhZ2UodCkpIFxyXG4gICAgICAgICAvL3dpbmRvdy5nZXRTZWxlY3Rpb24oKS5lbXB0eSgpO1xyXG4gICAgICAgICByZXR1cm4gb3JpZ2luYWxTdHJpbmcuc3Vic3RyaW5nKDAsIHN0YXJ0KSArIHRyYW5zbGF0ZVN0ci5qb2luKCcnKSArIG9yaWdpbmFsU3RyaW5nLnN1YnN0cmluZyhlbmQpIFxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBsZXQgdHJhbnNsYXRlU3RyID0gc2VsZWN0ZWRUZXh0Lm1hcCh0PT5zd2l0Y2hUb0VuZ2xpc2godCkpXHJcbiAgICAgICAgLy93aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZW1wdHkoKTtcclxuICAgICAgICByZXR1cm4gb3JpZ2luYWxTdHJpbmcuc3Vic3RyaW5nKDAsIHN0YXJ0KSArIHRyYW5zbGF0ZVN0ci5qb2luKCcnKSArIG9yaWdpbmFsU3RyaW5nLnN1YnN0cmluZyhlbmQpXHJcblxyXG59ICBcclxuXHJcblxyXG4gZXhwb3J0ICB7aGFuZGxlTG9naWN9ICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtoYW5kbGVMb2dpY30gZnJvbSAnLi91dGlscy91dGlscycgXHJcblxyXG5cclxuY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe21lc3NhZ2U6J2FjdGl2YXRlIGV4dGVuc2lvbid9LCByZXNwb25zZSA9PntcclxuICAgICAgICAgIFxyXG4gIGlmKHJlc3BvbnNlICE9PSAnT0snKSByZXR1cm4gXHJcblxyXG4gICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsZT0+e1xyXG4gICAgICAgICBcclxuICAgICAgICAgICAvL09ubHkgaWYgdXNlciBwcmVzcyBDdHJsICsgQlxyXG4gICAgICAgICAgIGlmKGUuY3RybEtleSAmJiBlLmNvZGUgPT09IFwiS2V5UVwiKVxyXG4gICAgICAgICAgICAgeyAgICBcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgaWYod2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFxyXG4gICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgLy9TZWxlY3RlZCB0ZXh0IHRvIGNvbnZlcnRcclxuICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkVGV4dCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuc3BsaXQoJycpXHJcbiAgICAgICAgICAgICAgICAgIGxldCBvcmlnaW5hbFN0cmluZyA9IGUudGFyZ2V0LnZhbHVlIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgbGV0IHRvUmVnZXhUZXN0ID0gIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIC8vSWYgaXQgaXMgYSBkaXYgZWxlbWVudCB0byBpbnNlcnQgdG9cclxuICAgICAgICAgICAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZGl2JylcclxuICAgICAgICAgICAgICAgICAgeyAgICBcclxuICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsU3RyaW5nID0gZS50YXJnZXQuaW5uZXJUZXh0ICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAvL1N0YXJ0ICYgZW5kIGluZGV4ZXMgb2YgdGhlIHNlbGVjdGVkIHRleHRcclxuICAgICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hbmNob3JPZmZzZXRcclxuICAgICAgICAgICAgICAgICAgIGxldCBlbmQgPSAgd2luZG93LmdldFNlbGVjdGlvbigpLmZvY3VzT2Zmc2V0ICBcclxuICAgICAgICAgICAgICAgICAgIGxldCByZXNwID0gaGFuZGxlTG9naWModG9SZWdleFRlc3Qsc2VsZWN0ZWRUZXh0LG9yaWdpbmFsU3RyaW5nLHN0YXJ0LGVuZClcclxuICAgICAgICAgICAgICAgICAgIHJldHVybiBlLnRhcmdldC50ZXh0Q29udGVudCA9IHJlc3AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIC8vVGhlIHN0YXJ0ICYgZW5kIGluZGV4ZXMgb2YgdGhlIHNlbGVjdGVkIHRleHQgaWYgaXQncyBhbiBpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gKGUudGFyZ2V0LnNlbGVjdGlvblN0YXJ0KVxyXG4gICAgICAgICAgICAgICAgICAgbGV0IGVuZCA9IChlLnRhcmdldC5zZWxlY3Rpb25FbmQpICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgbGV0IHJlc3AgPSBoYW5kbGVMb2dpYyh0b1JlZ2V4VGVzdCxzZWxlY3RlZFRleHQsb3JpZ2luYWxTdHJpbmcsc3RhcnQsZW5kKVxyXG4gICAgICAgICAgICAgICAgICAgZS50YXJnZXQudmFsdWUgPSByZXNwXHJcbiAgICAgICAgICAgICAgICAgICAvL0ZvciBGYWNlYm9vayArIEluc3RhZ3JhbSBzZWFyY2ggaW5wdXRzXHJcbiAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5ibHVyKCkgXHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgIH0pIFxyXG5cclxuICAgICAgfVxyXG4gICApICBcclxuXHJcbiAiXSwibmFtZXMiOlsiaW5kZXgiLCJxIiwidyIsImUiLCJyIiwidCIsInkiLCJ1IiwiaSIsIm8iLCJwIiwiYSIsInMiLCJkIiwiZiIsImciLCJoIiwiaiIsImsiLCJsIiwibSIsIm4iLCJiIiwidiIsImMiLCJ4IiwieiIsInJlZ2V4UnVsZVRvTmF0aXZlIiwicmVnZXhSdWxlVG9FbmdsaXNoIiwic3dpdGNoVG9OYXRpdmVMYW5ndWFnZSIsImxldHRlciIsInRlc3QiLCJmb3VuZE9uZSIsImZpbmQiLCJlbCIsIk9iamVjdCIsImtleXMiLCJzd2l0Y2hUb0VuZ2xpc2giLCJ2YWx1ZXMiLCJoYW5kbGVMb2dpYyIsInRvUmVnZXgiLCJzZWxlY3RlZFRleHQiLCJvcmlnaW5hbFN0cmluZyIsInN0YXJ0IiwiZW5kIiwicmVnZXhSdWxlIiwidHJhbnNsYXRlU3RyIiwibWFwIiwic3Vic3RyaW5nIiwiam9pbiIsImNocm9tZSIsInJ1bnRpbWUiLCJzZW5kTWVzc2FnZSIsIm1lc3NhZ2UiLCJyZXNwb25zZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjdHJsS2V5IiwiY29kZSIsImdldFNlbGVjdGlvbiIsInRvU3RyaW5nIiwidHJpbSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwic3BsaXQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInRvUmVnZXhUZXN0IiwidGFnTmFtZSIsImlubmVyVGV4dCIsImFuY2hvck9mZnNldCIsImZvY3VzT2Zmc2V0IiwicmVzcCIsInRleHRDb250ZW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJibHVyIl0sInNvdXJjZVJvb3QiOiIifQ==