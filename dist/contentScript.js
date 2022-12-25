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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxJQUFJQyxHQUFHLDRCQUFJaEIsbUJBQW1CLDBEQUFuQixzQkFBcUJpQixZQUFhO01BRTdDLElBQUdiLFNBQVMsQ0FBQ3BDLElBQUksQ0FBQ2EsTUFBTSxDQUFDSSxZQUFZLEVBQUUsQ0FBQ0MsUUFBUSxFQUFFLENBQUMsRUFDOUM7UUFDRSxJQUFJdUIsY0FBWSxHQUFHcEIsWUFBWSxDQUFDcUIsR0FBRyxDQUFDLFVBQUFwRSxDQUFDO1VBQUEsT0FBRXdCLG9FQUFzQixDQUFDeEIsQ0FBQyxDQUFDO1FBQUEsRUFBQztRQUNqRSxPQUFPMEQsbUJBQW1CLENBQUNOLEtBQUssR0FBR0YsY0FBYyxDQUFDb0IsU0FBUyxDQUFDLENBQUMsRUFBRUUsS0FBSyxDQUFDLEdBQUdMLGNBQVksQ0FBQ0ksSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHckIsY0FBYyxDQUFDb0IsU0FBUyxDQUFDSSxHQUFHLENBQUM7TUFDL0g7TUFFRSxJQUFJUCxZQUFZLEdBQUdwQixZQUFZLENBQUNxQixHQUFHLENBQUMsVUFBQXBFLENBQUM7UUFBQSxPQUFFZ0MsNkRBQWUsQ0FBQ2hDLENBQUMsQ0FBQztNQUFBLEVBQUM7TUFDMUQsT0FBTzBELG1CQUFtQixDQUFDTixLQUFLLEdBQUdGLGNBQWMsQ0FBQ29CLFNBQVMsQ0FBQyxDQUFDLEVBQUVFLEtBQUssQ0FBQyxHQUFHTCxZQUFZLENBQUNJLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBR3JCLGNBQWMsQ0FBQ29CLFNBQVMsQ0FBQ0ksR0FBRyxDQUFDO0lBRXZJO0VBQ0wsQ0FBQyxDQUFDO0FBRVQsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci8uL3NyYy91dGlscy91dGlscy5qcyIsIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGFuZ3VhZ2VfZml4ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xhbmd1YWdlX2ZpeGVyLy4vc3JjL2NvbnRlbnRTY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IGluZGV4ID0gW1xyXG4gICAge3E6XCIvXCJ9LHt3OlwiJ1wifSx7ZTpcItenXCJ9LHtyOlwi16hcIn0se3Q6XCLXkFwifSx7eTpcIteYXCJ9LHt1Olwi15VcIn0se2k6XCLXn1wifSx7bzpcItedXCJ9LHtwOlwi16RcIn0sXHJcbiAgICB7YTpcItepXCJ9LHtzOlwi15NcIn0se2Q6XCLXklwifSx7ZjpcItebXCJ9LHtnOlwi16JcIn0se2g6XCLXmVwifSx7ajpcIteXXCJ9LHtrOlwi15xcIn0se2w6XCLXmlwifSx7JzsnOlwi16NcIn0sXHJcbiAgICB7Jy4nOlwi16VcIn0seycsJzpcIteqXCJ9LHttOlwi16ZcIn0se246XCLXnlwifSx7YjpcItegXCJ9LHt2Olwi15RcIn0se2M6XCLXkVwifSx7eDpcItehXCJ9LHt6Olwi15ZcIn1cclxuXSAgXHJcblxyXG5cclxubGV0IHJlZ2V4UnVsZVRvTmF0aXZlID0gL15bMC05KiMrfmAhQCQlXiYoKV89W1xcXVxce318JzpcIlxcLzw+P10rJC9cclxubGV0IHJlZ2V4UnVsZVRvRW5nbGlzaCA9ICAvXlt+YCFAIyQlXiYqKClfKz1bXFxdXFx7fXw7JzpcIiwuXFwvPD4/YS16QS1aMC05LV0rJC9cclxuXHJcbmNvbnN0IHN3aXRjaFRvTmF0aXZlTGFuZ3VhZ2UgPSAobGV0dGVyKSA9PntcclxuICAgIGlmKGxldHRlciA9PT0gXCIgXCIpIHJldHVybiBcIiBcIlxyXG4gICAgaWYocmVnZXhSdWxlVG9OYXRpdmUudGVzdChsZXR0ZXIpKSByZXR1cm4gbGV0dGVyXHJcblxyXG4gICAgbGV0IGZvdW5kT25lID0gaW5kZXguZmluZChlbCA9PiBPYmplY3Qua2V5cyhlbCkgPT0gbGV0dGVyKVxyXG4gICAgcmV0dXJuIGZvdW5kT25lW2xldHRlcl1cclxufSBcclxuXHJcbmNvbnN0IHN3aXRjaFRvRW5nbGlzaCA9IChsZXR0ZXIpID0+e1xyXG4gICAgaWYobGV0dGVyID09PSBcIiBcIikgcmV0dXJuIFwiIFwiIFxyXG4gICAgaWYocmVnZXhSdWxlVG9FbmdsaXNoLnRlc3QobGV0dGVyKSkgcmV0dXJuIGxldHRlclxyXG4gICAgXHJcbiAgICBsZXQgZm91bmRPbmUgPSBpbmRleC5maW5kKGVsID0+IE9iamVjdC52YWx1ZXMoZWwpWzBdID09IGxldHRlcilcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhmb3VuZE9uZSlbMF1cclxufSAgIFxyXG5cclxuXHJcbiBleHBvcnQgIHtzd2l0Y2hUb0VuZ2xpc2gsc3dpdGNoVG9OYXRpdmVMYW5ndWFnZX0gIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3N3aXRjaFRvRW5nbGlzaCxzd2l0Y2hUb05hdGl2ZUxhbmd1YWdlfSBmcm9tICcuL3V0aWxzL3V0aWxzJ1xyXG5cclxuXHJcbiBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7bWVzc2FnZTogJ2FjdGl2YXRlIGV4dGVuc2lvbid9LHJlc3BvbnNlID0+e1xyXG5cclxuICAgICAgICAgIGlmKHJlc3BvbnNlICE9PSAnT0snKSByZXR1cm5cclxuICAgICAgXHJcbiAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLGU9PnsgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vT25seSBpZiB1c2VyIHByZXNzIEN0cmwgKyBCXHJcbiAgICAgICAgICAgIGlmKGUuY3RybEtleSAmJiBlLmNvZGUgPT09IFwiS2V5QlwiKVxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIGlmKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPT09IDApIHJldHVybiBcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIC8vU2VsZWN0ZWQgdGV4dCB0byBjb252ZXJ0XHJcbiAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZFRleHQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcnKVxyXG4gICAgICAgICAgICAgICAgICBsZXQgb3JpZ2luYWxTdHJpbmcgPSAgZS50YXJnZXQudmFsdWVcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIGxldCBpbnB1dEZpZWxkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpOyBcclxuICAgICAgICAgICAgICAgICAgbGV0IHRleHRBcmVhRmllbGRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RleHRhcmVhJylcclxuICAgICAgICAgICAgICAgICAgbGV0IGRpdkZpZWxkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVxyXG4gICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudFRvSW5zZXJ0QmFjazsgbGV0IGRpdlRvSW5zZXJ0QmFjaztcclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIC8vVXNpbmcgZm9yIGxvb3AgaW5zdGVhZCBvZiBoaWdoIG9yZGVyIGZ1bmN0aW9ucyAtPiBIVE1MY29sbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPGlucHV0RmllbGRzPy5sZW5ndGg7aSsrKVxyXG4gICAgICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdpbnB1dCcpIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICBpZihpbnB1dEZpZWxkc1tpXSA9PT0gZS50YXJnZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50VG9JbnNlcnRCYWNrID0gaW5wdXRGaWVsZHNbaV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRleHRBcmVhRmllbGRzPy5sZW5ndGg7aSsrKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAndGV4dGFyZWEnKSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYodGV4dEFyZWFGaWVsZHNbaV0gPT09IGUudGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUb0luc2VydEJhY2sgPSB0ZXh0QXJlYUZpZWxkc1tpXSAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9ICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxkaXZGaWVsZHM/Lmxlbmd0aDtpKyspXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdkaXYnKSBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYoZGl2RmllbGRzW2ldID09PSBlLnRhcmdldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFN0cmluZyA9IGRpdkZpZWxkc1tpXS5pbm5lclRleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXZUb0luc2VydEJhY2sgPSBkaXZGaWVsZHNbaV0gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBsZXQgcmVnZXhSdWxlID0gL15bfmAhQCMkJV4mKigpXys9W1xcXVxce318Oyc6XCIsLlxcLzw+P2EtekEtWjAtOS1cXHNdKyQvIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAvL0lmIGl0IGlzIGEgZGl2IGVsZW1lbnQgdG8gaW5zZXJ0IHRvXHJcbiAgICAgICAgICAgICAgICAgICBpZihkaXZUb0luc2VydEJhY2spXHJcbiAgICAgICAgICAgICAgICAgICB7ICBcclxuICAgICAgICAgICAgICAgICAgICAgIC8vU3RhcnQgJiBlbmQgaW5kZXhlcyBvZiB0aGUgc2VsZWN0ZWQgdGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGRpdkluZGV4U3RhcnQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuYW5jaG9yT2Zmc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgZGl2SW5kZXhFbmQgPSAgd2luZG93LmdldFNlbGVjdGlvbigpLmZvY3VzT2Zmc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICBpZihyZWdleFJ1bGUudGVzdCh3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB7ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHJhbnNsYXRlU3RyID0gc2VsZWN0ZWRUZXh0Lm1hcCh0PT5zd2l0Y2hUb05hdGl2ZUxhbmd1YWdlKHQpKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGl2VG9JbnNlcnRCYWNrLmlubmVySFRNTCA9IG9yaWdpbmFsU3RyaW5nLnN1YnN0cmluZygwLCBkaXZJbmRleFN0YXJ0KSArIHRyYW5zbGF0ZVN0ci5qb2luKCcnKSArIG9yaWdpbmFsU3RyaW5nLnN1YnN0cmluZyhkaXZJbmRleEVuZCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHJhbnNsYXRlU3RyID0gc2VsZWN0ZWRUZXh0Lm1hcCh0PT5zd2l0Y2hUb0VuZ2xpc2godCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpdlRvSW5zZXJ0QmFjay5pbm5lckhUTUwgPSBvcmlnaW5hbFN0cmluZy5zdWJzdHJpbmcoMCwgZGl2SW5kZXhTdGFydCkgKyB0cmFuc2xhdGVTdHIuam9pbignJykgKyBvcmlnaW5hbFN0cmluZy5zdWJzdHJpbmcoZGl2SW5kZXhFbmQpXHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAvL1RoZSBzdGFydCAmIGVuZCBpbmRleGVzIG9mIHRoZSBzZWxlY3RlZCB0ZXh0IGlmIGl0J3MgYW4gaW5wdXRcclxuICAgICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IChlbGVtZW50VG9JbnNlcnRCYWNrPy5zZWxlY3Rpb25TdGFydClcclxuICAgICAgICAgICAgICAgICAgIGxldCBlbmQgPSAoZWxlbWVudFRvSW5zZXJ0QmFjaz8uc2VsZWN0aW9uRW5kKSAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgaWYocmVnZXhSdWxlLnRlc3Qod2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHJhbnNsYXRlU3RyID0gc2VsZWN0ZWRUZXh0Lm1hcCh0PT5zd2l0Y2hUb05hdGl2ZUxhbmd1YWdlKHQpKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudFRvSW5zZXJ0QmFjay52YWx1ZSA9IG9yaWdpbmFsU3RyaW5nLnN1YnN0cmluZygwLCBzdGFydCkgKyB0cmFuc2xhdGVTdHIuam9pbignJykgKyBvcmlnaW5hbFN0cmluZy5zdWJzdHJpbmcoZW5kKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZVN0ciA9IHNlbGVjdGVkVGV4dC5tYXAodD0+c3dpdGNoVG9FbmdsaXNoKHQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50VG9JbnNlcnRCYWNrLnZhbHVlID0gb3JpZ2luYWxTdHJpbmcuc3Vic3RyaW5nKDAsIHN0YXJ0KSArIHRyYW5zbGF0ZVN0ci5qb2luKCcnKSArIG9yaWdpbmFsU3RyaW5nLnN1YnN0cmluZyhlbmQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICB9KSBcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIFxyXG4iXSwibmFtZXMiOlsiaW5kZXgiLCJxIiwidyIsImUiLCJyIiwidCIsInkiLCJ1IiwiaSIsIm8iLCJwIiwiYSIsInMiLCJkIiwiZiIsImciLCJoIiwiaiIsImsiLCJsIiwibSIsIm4iLCJiIiwidiIsImMiLCJ4IiwieiIsInJlZ2V4UnVsZVRvTmF0aXZlIiwicmVnZXhSdWxlVG9FbmdsaXNoIiwic3dpdGNoVG9OYXRpdmVMYW5ndWFnZSIsImxldHRlciIsInRlc3QiLCJmb3VuZE9uZSIsImZpbmQiLCJlbCIsIk9iamVjdCIsImtleXMiLCJzd2l0Y2hUb0VuZ2xpc2giLCJ2YWx1ZXMiLCJjaHJvbWUiLCJydW50aW1lIiwic2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwicmVzcG9uc2UiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiY3RybEtleSIsImNvZGUiLCJnZXRTZWxlY3Rpb24iLCJ0b1N0cmluZyIsInRyaW0iLCJsZW5ndGgiLCJzZWxlY3RlZFRleHQiLCJ0b0xvd2VyQ2FzZSIsInNwbGl0Iiwib3JpZ2luYWxTdHJpbmciLCJ0YXJnZXQiLCJ2YWx1ZSIsImlucHV0RmllbGRzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInRleHRBcmVhRmllbGRzIiwiZGl2RmllbGRzIiwiZWxlbWVudFRvSW5zZXJ0QmFjayIsImRpdlRvSW5zZXJ0QmFjayIsInRhZ05hbWUiLCJpbm5lclRleHQiLCJyZWdleFJ1bGUiLCJkaXZJbmRleFN0YXJ0IiwiYW5jaG9yT2Zmc2V0IiwiZGl2SW5kZXhFbmQiLCJmb2N1c09mZnNldCIsInRyYW5zbGF0ZVN0ciIsIm1hcCIsImlubmVySFRNTCIsInN1YnN0cmluZyIsImpvaW4iLCJzdGFydCIsInNlbGVjdGlvblN0YXJ0IiwiZW5kIiwic2VsZWN0aW9uRW5kIl0sInNvdXJjZVJvb3QiOiIifQ==