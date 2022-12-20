import React, { useEffect, useState } from 'react'
import {createRoot} from 'react-dom/client'
import  '../style.css'

const Popup = () => {  
  const [btnText,setBtnText]=useState(null) 

useEffect(()=>{ 

      //Sets the button text to the current mode of the extension
      sendMessage('currentMode')
},[]) 


//Sends message to activate or unactivate the extention
const sendMessage = (messageText) =>{
  chrome.tabs.query({currentWindow: true, active: true},async function (tabs){
    let activeTab = tabs[0];
    await chrome.tabs.sendMessage(activeTab.id, {"message": messageText},response =>{
             setBtnText(response) 
        }      
    );
});
}

  const handleClick = () =>{ 

    let messageText;

    switch(btnText){
        case 'active':
            messageText = true
            break

        case 'unactive':
            messageText = false
            break 
    }
    
    sendMessage(messageText)
} 
  
  return (
    <div>
      <div id='mainDiv'>
        <h4>Wrong language?</h4> 
        <span> - Press the active button</span> <br />
        <span> - Select wrong typed text</span><br />
        <span> - See the magic</span><br /><br />
        <button onClick={handleClick}>{btnText}</button>
      </div>
    </div> 

  )
} 

const root = createRoot(document.getElementById('react-target'));
root.render(<Popup/>)