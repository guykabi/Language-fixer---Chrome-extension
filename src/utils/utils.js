
const index = [
    {q:"/"},{w:"'"},{e:"ק"},{r:"ר"},{t:"א"},{y:"ט"},{u:"ו"},{i:"ן"},{o:"ם"},{p:"פ"},
    {a:"ש"},{s:"ד"},{d:"ג"},{f:"כ"},{g:"ע"},{h:"י"},{j:"ח"},{k:"ל"},{l:"ך"},{';':"ף"},
    {'.':"ץ"},{',':"ת"},{m:"צ"},{n:"מ"},{b:"נ"},{v:"ה"},{c:"ב"},{x:"ס"},{z:"ז"}
]   


let regexRuleToNative = /^[0-9*#+~`!@$%^&()_=[\]\{}|':"\/<>?]+$/
let regexRuleToEnglish =  /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/

const switchToNativeLanguage = (letter) =>{
    if(letter === " ") return " "
    if(regexRuleToNative.test(letter)) return letter
    let foundOne = index.find(el => Object.keys(el) == letter)
    return foundOne[letter]
} 

const switchToEnglish = (letter) =>{
    if(letter === " ") return " " 
    if(regexRuleToEnglish.test(letter)) return letter
    let foundOne = index.find(el => Object.values(el)[0] == letter)
    return Object.keys(foundOne)[0]
} 

const setItemToLocal = (key,value)=>{
    localStorage.setItem([key],value)
 } 

 const getItemFromLocal = (value)=>{
    return localStorage.getItem(value)
 } 

const clearLocal = () =>{
    localStorage.clear()
} 

const clearField = (fieldName) =>{
    localStorage.removeItem(fieldName)
}

 export  {switchToEnglish,switchToNativeLanguage,setItemToLocal,getItemFromLocal,clearLocal,clearField} 