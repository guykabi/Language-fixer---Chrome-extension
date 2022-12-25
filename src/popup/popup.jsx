import React from 'react'
import {createRoot} from 'react-dom/client'
import  '../style.css'


const Popup = () => {  
   
  return (
    <div>
      <div id='mainDiv'>
        <h4>Wrong language?</h4> 
        <span><strong> - Select wrong typed text </strong></span><br />
        <span><strong> - Press Ctrl+B </strong></span><br />
        <span><strong> - See the magic </strong></span><br /><br />
      </div>
    </div> 

  )
}

const root = createRoot(document.getElementById('react-target'));
root.render(<Popup/>)