/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'activate extension') {
    sendResponse('OK');
  }
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUNDQSxNQUFNLENBQUNDLE9BQU8sQ0FBQ0MsU0FBUyxDQUFDQyxXQUFXLENBQ2xDLFVBQVNDLE9BQU8sRUFBRUMsTUFBTSxFQUFFQyxZQUFZLEVBQUU7RUFDdkMsSUFBR0YsT0FBTyxDQUFDRyxPQUFPLEtBQUssb0JBQW9CLEVBQzNDO0lBQ0VELFlBQVksQ0FBQyxJQUFJLENBQUM7RUFDcEI7QUFDRixDQUFDLENBQ0QsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xhbmd1YWdlX2ZpeGVyLy4vc3JjL2JhY2tncm91bmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbiBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoXHJcbiAgIGZ1bmN0aW9uKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XHJcbiAgICBpZihyZXF1ZXN0Lm1lc3NhZ2UgPT09ICdhY3RpdmF0ZSBleHRlbnNpb24nKVxyXG4gICAgeyAgIFxyXG4gICAgICBzZW5kUmVzcG9uc2UoJ09LJylcclxuICAgIH0gIFxyXG4gIH1cclxuIClcclxuIl0sIm5hbWVzIjpbImNocm9tZSIsInJ1bnRpbWUiLCJvbk1lc3NhZ2UiLCJhZGRMaXN0ZW5lciIsInJlcXVlc3QiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==