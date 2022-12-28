/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
//Triggered on every page load
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'activate extension') sendResponse('OK');
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUVBO0FBQ0NBLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDQyxTQUFTLENBQUNDLFdBQVcsQ0FDbEMsVUFBU0MsT0FBTyxFQUFFQyxNQUFNLEVBQUVDLFlBQVksRUFBRTtFQUN2QyxJQUFHRixPQUFPLENBQUNHLE9BQU8sS0FBSyxvQkFBb0IsRUFDeENELFlBQVksQ0FBQyxJQUFJLENBQUM7QUFDdkIsQ0FBQyxDQUNELEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sYW5ndWFnZV9maXhlci8uL3NyYy9iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLy9UcmlnZ2VyZWQgb24gZXZlcnkgcGFnZSBsb2FkXHJcbiBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoXHJcbiAgIGZ1bmN0aW9uKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XHJcbiAgICBpZihyZXF1ZXN0Lm1lc3NhZ2UgPT09ICdhY3RpdmF0ZSBleHRlbnNpb24nKSBcclxuICAgICAgIHNlbmRSZXNwb25zZSgnT0snKSBcclxuICB9XHJcbiApXHJcbiJdLCJuYW1lcyI6WyJjaHJvbWUiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJyZXF1ZXN0Iiwic2VuZGVyIiwic2VuZFJlc3BvbnNlIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=