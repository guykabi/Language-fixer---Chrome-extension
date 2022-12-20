import {switchToEnglish,switchToNativeLanguage,setItemToLocal,getItemFromLocal} from './utils/utils'


//Triggers whenever user changes activation mode on the popup window
chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {
     
      //Every time the popup opens, check the current mode to update the button text
      if(request.message === 'currentMode')
        { 
           let isActiveMode = getItemFromLocal('mode')

           if(isActiveMode === 'unactive' || !isActiveMode) 
           {
              sendResponse('active')
              return
           }
           sendResponse('unactive')
           return
        }
          //Depend on what the user decide, set the localStorage mode of activation
          setItemToLocal("mode",request.message?"active":"unactive")
          sendResponse(request.message?"unactive":"active");
          
       })


      window.addEventListener('select',e=>{
         
        //Only if user switch to active
        if(getItemFromLocal('mode')  === 'active') 
          { 
            
           if (window.getSelection().toString().trim().length === 0) return 
            
              let text =  window.getSelection().toString().toLowerCase().split('')
              let originalString =  e.target.value

              let inputFields = document.getElementsByTagName('input'); 
              let inputToInsertBack = []

              for(let i=0;i<inputFields.length;i++)
                {
                 if(inputFields[i].className === e.target.className)
                   { 
                     inputToInsertBack = inputFields[i]
                   }
                } 
               
             
               //The start and end indexes/indices of the selected string
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
    
      
     