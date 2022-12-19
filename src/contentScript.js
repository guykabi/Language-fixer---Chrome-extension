import {switchToEnglish,switchToNativeLanguage} from './utils/utils'


chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {
     
      if(request.message === 'currentMode')
      { 
           let isActiveMode = localStorage.getItem('mode')
           if(isActiveMode === 'unactive' || !isActiveMode) 
           {
              sendResponse('active')
              return
           }
           sendResponse('unactive')
           return
      }

      localStorage.setItem("mode",request.message?"active":"unactive")
      sendResponse(request.message?"unactive":"active");

      window.addEventListener('mouseup',e=>{
         
        if(localStorage.getItem('mode')  === 'active') 
          { 
            
           if (window.getSelection().toString().trim().length === 0) return 
            
             let text =  window.getSelection().toString().toLowerCase().split('')
             let originalString =  e.target.value

             let inputToInsertBack = []
             let inputFields = document.getElementsByTagName('input'); 

             for(let i=0;i<inputFields.length;i++)
               {
                if(inputFields[i].className === e.target.className)
                  { 
                    inputToInsertBack = inputFields[i]
                  }
               }   

             let start = (inputToInsertBack.selectionStart)
             let end = (inputToInsertBack.selectionEnd)

             let regexRule = /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-\s]+$/

             if(regexRule.test(window.getSelection().toString())){ 
                  
                let translateStr = text.map(t=>switchToNativeLanguage(t)) 
                return inputToInsertBack.value = originalString.substring(0, start) + translateStr.join('') + originalString.substring(end) 

               } 

                let translateStr = text.map(t=>switchToEnglish(t))
                return inputToInsertBack.value = originalString.substring(0, start) + translateStr.join('') + originalString.substring(end)
              }
          }) 
    
        }
     );