import React from 'react'
import {createRoot} from 'react-dom/client'
import  '../style.css'


const Popup = () => {  
   
  return (
    <div>
      <div id='mainDiv'>
        <h4>Wrong language?</h4> 
        <span> - Select wrong typed text</span><br />
        <span> - Press Ctrl +B</span><br />
        <span> - See the magic</span><br /><br />
      </div>
    </div> 

  )
}

const root = createRoot(document.getElementById('react-target'));
root.render(<Popup/>)