/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
chrome.action.onClicked.addListener(function (tab) {
  chrome.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    files: ['contentScript.js']
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBQSxNQUFNLENBQUNDLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxXQUFXLENBQUMsVUFBQ0MsR0FBRyxFQUFLO0VBRXpDSixNQUFNLENBQUNLLFNBQVMsQ0FBQ0MsYUFBYSxDQUFDO0lBQzdCQyxNQUFNLEVBQUU7TUFBQ0MsS0FBSyxFQUFFSixHQUFHLENBQUNLO0lBQUUsQ0FBQztJQUN2QkMsS0FBSyxFQUFFLENBQUMsa0JBQWtCO0VBQzVCLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGFuZ3VhZ2VfZml4ZXIvLi9zcmMvYmFja2dyb3VuZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjaHJvbWUuYWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcigodGFiKSA9PiB7IFxyXG4gXHJcbiAgICBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xyXG4gICAgICB0YXJnZXQ6IHt0YWJJZDogdGFiLmlkfSxcclxuICAgICAgZmlsZXM6IFsnY29udGVudFNjcmlwdC5qcyddXHJcbiAgICB9KTtcclxuICB9KTsgIl0sIm5hbWVzIjpbImNocm9tZSIsImFjdGlvbiIsIm9uQ2xpY2tlZCIsImFkZExpc3RlbmVyIiwidGFiIiwic2NyaXB0aW5nIiwiZXhlY3V0ZVNjcmlwdCIsInRhcmdldCIsInRhYklkIiwiaWQiLCJmaWxlcyJdLCJzb3VyY2VSb290IjoiIn0=