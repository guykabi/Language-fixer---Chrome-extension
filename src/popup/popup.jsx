import React, { useEffect, useState } from 'react'
import {createRoot} from 'react-dom/client'
import styles from '../style.css'

const Popup = () => {  
  const [btnText,setBtnText]=useState('active') 

useEffect(()=>{
      sendMessage('currentMode')
},[]) 


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
      <h4>Didn't notice the language?</h4> 
      <span> - Press the active button</span> <br />
      <span> - Select your desire text</span><br />
      <span> - See the magic</span><br /><br />
      <button onClick={handleClick}>{btnText?btnText:'active'}</button>
    </div> 

  )
} 

const root = createRoot(document.getElementById('react-target'));
root.render(<Popup/>)