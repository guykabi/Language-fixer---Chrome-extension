import {switchToEnglish,switchToNativeLanguage} from './utils/utils'


 chrome.runtime.sendMessage({message: 'activate extension'},response =>{

          if(response !== 'OK') return
      
           window.addEventListener('keydown',e=>{ 
              
            //Only if user press Ctrl + B
            if(e.ctrlKey && e.code === "KeyB")
              {
                
                 if(window.getSelection().toString().trim().length === 0) return 
                  
                  //Selected text to convert
                  let selectedText = window.getSelection().toString().toLowerCase().split('')
                  let originalString = e.target.value
                  
                  let inputFields = document.getElementsByTagName('input'); 
                  let textAreaFields = document.getElementsByTagName('textarea')
                  let divFields = document.getElementsByTagName('div')
                  let elementToInsertBack; let divToInsertBack;
                     
                  //Using for loop instead of high order functions -> HTMLcollection
                  for(let i=0;i<inputFields?.length;i++)
                   {                 
                      if(e.target.tagName.toLowerCase() !== 'input') break
                      if(inputFields[i] === e.target)
                        { 
                         elementToInsertBack = inputFields[i]
                        }
                   }
                    
                  for(let i=0;i<textAreaFields?.length;i++)
                   {
                      if(e.target.tagName.toLowerCase() !== 'textarea') break
                      if(textAreaFields[i] === e.target)
                        { 
                          elementToInsertBack = textAreaFields[i]               
                        }
                   }     
                    
                  for(let i=0;i<divFields?.length;i++)
                   {
                      if(e.target.tagName.toLowerCase() !== 'div') break
                      if(divFields[i] === e.target)
                        { 
                          originalString = divFields[i].innerText
                          divToInsertBack = divFields[i]                   
                        }
                   }  
                                     
                    
                   let regexRule = /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-\s]+$/ 
                                     
                   //If it is a div element to insert to
                   if(divToInsertBack)
                   {  
                      //Start & end indexes of the selected text
                      let divIndexStart = window.getSelection().anchorOffset
                      let divIndexEnd =  window.getSelection().focusOffset
                    
                      if(regexRule.test(window.getSelection().toString()))
                         {  
                          let translateStr = selectedText.map(t=>switchToNativeLanguage(t)) 
                          return divToInsertBack.innerHTML = originalString.substring(0, divIndexStart) + translateStr.join('') + originalString.substring(divIndexEnd) 
                         } 
                                 
                          let translateStr = selectedText.map(t=>switchToEnglish(t))
                          return divToInsertBack.innerHTML = originalString.substring(0, divIndexStart) + translateStr.join('') + originalString.substring(divIndexEnd)
                   }
                     
                   
                   //The start & end indexes of the selected text if it's an input
                   let start = (elementToInsertBack?.selectionStart)
                   let end = (elementToInsertBack?.selectionEnd)  

                   if(regexRule.test(window.getSelection().toString()))
                        {  
                          let translateStr = selectedText.map(t=>switchToNativeLanguage(t)) 
                          return elementToInsertBack.value = originalString.substring(0, start) + translateStr.join('') + originalString.substring(end) 
                        } 
                                    
                          let translateStr = selectedText.map(t=>switchToEnglish(t))
                          return elementToInsertBack.value = originalString.substring(0, start) + translateStr.join('') + originalString.substring(end)
                                
                }  
           }) 

    })

    
