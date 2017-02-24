
const nameField = document.getElementById('name');
const mailField = document.getElementById('mail');
const jobTitle = document.getElementById('title');
const tShirtDesign = document.getElementById('design');
const tShirtColor = document.getElementById('color');


//Dynamically inserts a textArea when the 'other' option is selected.
function otherTextArea() {
    let textArea = document.createElement('TEXTAREA');
    textArea.placeholder = 'Your Job Role';
    textArea.id = 'text_area';
    let otherTextArea = document.getElementById('text_area');
    if (jobTitle.value == 'other') {
        jobTitle.parentNode.appendChild(textArea);
    } else if(jobTitle.parentNode.lastChild == otherTextArea){
        jobTitle.parentNode.removeChild(otherTextArea);
    }
}

//Creating an initial select option for T-shirt color.
let initialColorOption = document.createElement('Option');
let initialOptionText = document.createTextNode('<-- Please select a T-shirt theme');
initialColorOption.appendChild(initialOptionText);

//Reinitialize select options and then hides options not selected.
function resetAndHide(iBegin,iEnd,activeElement,selectIdx) {
    for(let i = 0 ; i < activeElement.length ; i++) {
        //Removes all 'hidden' attributes and sets the specified selected option.
        activeElement[selectIdx].selected = true;
        activeElement[i].removeAttribute('hidden');
    }
    for(let i = iBegin ; i <= iEnd ; i++) {
        //Hides non selected attributes.
        activeElement[i].setAttribute('hidden','hidden');
        activeElement[6].setAttribute('hidden','hidden');
    }
}

//Handles the selected 'design' options via the resetAttributes function.
function tShirtDesignNarrowed() {
    if(tShirtDesign.selectedIndex !== 0){
        document.getElementById('colors-js-puns').removeAttribute('hidden');
        if(tShirtDesign.selectedIndex === 1){
            resetAndHide(3,5,tShirtColor,0);
        } else if(tShirtDesign.selectedIndex === 2){
            resetAndHide(0,2,tShirtColor,3);
        }
    }else{
        resetAndHide(0,5,tShirtColor,6);
        document.getElementById('colors-js-puns').setAttribute('hidden','hidden');
    }
}
