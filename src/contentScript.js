import {handleLogic} from './utils/utils' 


chrome.runtime.sendMessage({message:'activate extension'}, response =>{
          
  if(response !== 'OK') return 

         window.addEventListener('keydown',e=>{
         
           //Only if user press Ctrl + B
           if(e.ctrlKey && e.code === "KeyQ")
             {    
              
               if(window.getSelection().toString().trim().length === 0) return 
         
                  //Selected text to convert
                  let selectedText = window.getSelection().toString().toLowerCase().split('')
                  let originalString = e.target.value 
                              
                  let toRegexTest =  window.getSelection().toString()                  
                  //If it is a div element to insert to
                  if(e.target.tagName.toLowerCase() === 'div')
                  {    
                   originalString = e.target.innerText  

                   //Start & end indexes of the selected text
                   let start = window.getSelection().anchorOffset
                   let end =  window.getSelection().focusOffset  
                   let resp = handleLogic(toRegexTest,selectedText,originalString,start,end)
                   return e.target.textContent = resp                                    
                   }
                             
                   //The start & end indexes of the selected text if it's an input
                   let start = (e.target.selectionStart)
                   let end = (e.target.selectionEnd)   

                   let resp = handleLogic(toRegexTest,selectedText,originalString,start,end)
                   e.target.value = resp
                   //For Facebook + Instagram search inputs
                   e.target.blur() 
                   return
                            
               }  
          }) 

      }
   )  

 