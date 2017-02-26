
/*
*************************************************
ASSIGNING FORM VARIABLES
*************************************************
*/

//BASIC INFO VARIABLES
const nameField = document.getElementById('name');
const mailField = document.getElementById('mail');
const jobTitle = document.getElementById('title');
//T-SHIRT VARIABLES
const tShirtDesign = document.getElementById('design');
const tShirtColor = document.getElementById('color');
//ACTIVITIES CHECKBOX VARIABLES
const registerForActivities = document.getElementsByClassName('activities')[0];
let checkBoxInfo = [];
let workShopInfo = [];
let total = 0;
//PAYMENT INFO VARIABLES
const today = new Date().toISOString().slice(0,10).split('-');
const paymentMethod = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const creditCardNum = document.getElementById('cc-num');
const creditCardZip = document.getElementById('zip');
const creditCardCvv = document.getElementById('cvv');
const creditCardExpMonth = document.getElementById('exp-month');
const creditCardExpYear = document.getElementById('exp-year');
const payPal = creditCard.nextElementSibling;
const bitCoin = creditCard.nextElementSibling.nextElementSibling;
const paymentTypes = [[creditCard,'credit card'],[payPal,'paypal'],[bitCoin,'bitcoin']];
//VALIDATION VARIABLES
const button = document.getElementsByTagName('button')[0];
let errorLog = [];

/*
 *************************************************
 ASSIGNING EVENT LISTENERS
 *************************************************
*/

//BASIC INFO LISTENERS
jobTitle.addEventListener('change',otherTextArea);
mailField.addEventListener('keypress',validateEmail);
//T-SHIRT LISTENERS
tShirtDesign.addEventListener('change',tShirtDesignNarrowed);
//ACTIVITIES CHECKBOX VARIABLES
registerForActivities.addEventListener('change', function (){
    checkBoxInfoPush();
    totalDollars();
    hideTotalDollars();
    getCheckedIndexInfo();
});
//PAYMENT INFO LISTENERS
paymentMethod.addEventListener('change', function () {
    hidePaymentElements();
    if(paymentMethod.value == 'select_method'){
        errorMessage(paymentMethod,'You have not selected a payment method');
    }else{
        removeErrorMessage(paymentMethod)
    }
});
//VALIDATION LISTENERS
button.addEventListener('click',function(event){
    fieldValidation();
    creditCardValidation();
    if(errorLog.length != 0){event.preventDefault()}
});



/*
*************************************************
JOB SELECTION SECTION
*************************************************
*/

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

/*
*************************************************
T-SHIRT SELECTION SECTION
*************************************************
*/


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

/*
*************************************************
ACTIVITIES CHECKBOX SECTION
*************************************************
*/

//Creates an array from the label element's text.
function getActivityInfo(text){
    const activityCost = parseInt(text.split('$').pop());
    if(text.indexOf('W') != -1) {
        let startDateText = text.indexOf('W') + 11;
        let endDateText = text.indexOf(',', startDateText);
        let textDate = text.substring(startDateText, endDateText);
        return [textDate,activityCost];
    }else{
        return ['no date',activityCost];
    }
}

//Creates a reference array of arrays for all checkbox info.
function getWorkshopInfo() {
    let checkboxLength = registerForActivities.children.length;
    for(let i = 0 ; i < checkboxLength ; i++){
        let elementText = registerForActivities.children[i].textContent;
        let activityText = getActivityInfo(elementText);
        activityText.unshift(i);
        workShopInfo.push(activityText);
    }
}
getWorkshopInfo();

/*
 Initializes checkBoxInfo and pushes all activity info
 from elements that are checked into checkBoxInfo. If an
 element is unchecked and still has a residual attribute
 'disabled' it removes that attribute and the 'disabled' class.
 */
function checkBoxInfoPush() {
    checkBoxInfo = [];
    let checkboxLength = registerForActivities.children.length;
    for (let i = 1; i < checkboxLength; i++) {
        let inputElement = registerForActivities.children[i].children[0];
        if (inputElement.checked) {
            checkBoxInfo.push(workShopInfo[i]);
        } else if(inputElement.hasAttribute('disabled')){
            inputElement.parentNode.classList.remove('disabled');
            inputElement.removeAttribute('disabled');
        }
    }
}
checkBoxInfoPush();

/*
 Cycles through the checkBoxInfo array and if the date of
 any checked elements matches elements that are not checked.
 If the date matches then the disabled attribute and class
 is added to the input element and label element respectively.
 */
function getCheckedIndexInfo() {
    for (let i = 0; i < checkBoxInfo.length; i++) {
        let date = checkBoxInfo[i][1];
        for (let i = 1; i < workShopInfo.length; i++) {
            let searchElementDate = workShopInfo[i][1];
            let inputElement = registerForActivities.children[i].children[0];
            if (date === searchElementDate) {
                if (inputElement.checked == false && inputElement.hasAttribute('disabled') == false) {
                    inputElement.parentNode.className = 'disabled';
                    inputElement.setAttribute('disabled', 'disabled');
                }
            }
        }
    }
}

//Creates a div element to display the total cost of the activities selected.
function displayTotalDollars() {
    let totalCostDiv = document.createElement('Div');
    let totalCostText = document.createTextNode('Total : $');
    totalCostDiv.appendChild(totalCostText);
    totalCostDiv.id = 'activityTotalCost';
    registerForActivities.parentNode.insertBefore(totalCostDiv, registerForActivities.nextSibling);
}
displayTotalDollars();

//Hides total dollars div when total equals 0.
function hideTotalDollars() {
    if (total != 0) {
        document.getElementById('activityTotalCost').style.visibility = 'visible';
    } else {
        document.getElementById('activityTotalCost').style.visibility = 'hidden';
    }
}

/*
 Generates total dollar amount clicked and dynamically
 adds that information below the activities check box.
 */
function totalDollars() {
    //Initialize total and get the total dollars currently clicked.
    total = 0;
    for (let i = 0; i < checkBoxInfo.length; i++) {
        total += checkBoxInfo[i].slice(-1)[0];
    }
    //Removes old total text.
    let totalDiv = document.getElementById('activityTotalCost');
    if (totalDiv.childNodes.length > 1) {
        let oldTotal = totalDiv.childNodes[1];
        totalDiv.removeChild(oldTotal);
    }
    //Appends current total text.
    let totalText = document.createTextNode(total.toString());
    document.getElementById('activityTotalCost').appendChild(totalText);
}

/*
*************************************************
PAYMENT INFO SECTION
*************************************************
*/


//Loops through payment types, shows the fields for the types selected, and hides the ones not selected.
function hidePaymentElements() {
    for(let i = 0 ; i < paymentTypes.length ; i++){
        if(paymentMethod.value == paymentTypes[i][1] && paymentTypes[i][0].hasAttribute('hidden')){
            paymentTypes[i][0].removeAttribute('hidden')
        } else if(paymentMethod.value != paymentTypes[i][1] && paymentTypes[i][0].hasAttribute('hidden') == false){
            paymentTypes[i][0].setAttribute('hidden','hidden');
        }
    }
}

/*
 Checks to see if the credit card option is selected. Validates that the credit
 number is 16 digits long and triggers an alert if it is not. The expiration date
 is also validated against today's date and an alert is generated if the date
 entered has expired. Both of these alerts are triggered by the submit button.
 */
function creditCardValidation() {
    //Checks to see if credit card option is selected.
    if (creditCard.hasAttribute('hidden') == false) {
        //Validates that the field is not empty.
        if (creditCardNum.value == '') {
            creditCard.children[0].firstElementChild.style.color = 'red';
            alert('Please enter a valid credit card number');
            errorLog.push('creditCard');
            //Validates length of the credit card number.
        } else if (creditCardNum.value.replace(/\s/g, "").length != 16) {
            creditCard.children[0].firstElementChild.style.color = 'red';
            alert('A valid credit card number has 16 digits, the number you have entered has ' + creditCardNum.value.length + ' digits.');
            errorLog.push('creditCard');
        } else {
            creditCard.children[0].firstElementChild.removeAttribute('style');
            removeError('creditCard');
        }
        if (creditCardZip.value.length != 5) {
            creditCard.children[1].firstElementChild.style.color = 'red';
            errorLog.push('creditCard');
        } else {
            creditCard.children[1].firstElementChild.removeAttribute('style');
            removeError('creditCard');
        }
        if (creditCardCvv.value == '') {
            creditCard.children[2].firstElementChild.style.color = 'red';
            errorLog.push('creditCard');
        } else {
            creditCard.children[2].firstElementChild.removeAttribute('style');
            removeError('creditCard');
        }
        //Validating the expiration date.
        if (parseInt(creditCardExpYear.value) < parseInt(today[0])) {
            creditCard.children[4].previousElementSibling.style.color = 'red';
            creditCard.children[6].previousElementSibling.style.color = 'red';
            alert('It seems like your credit card expired in ' + creditCardExpYear.value + ' , please enter a valid expiration date.');
            errorLog.push('creditCard');
        } else if (parseInt(creditCardExpYear.value) == parseInt(today[0]) && parseInt(creditCardExpMonth.value) < parseInt(today[1])) {
            creditCard.children[4].previousElementSibling.style.color = 'red';
            creditCard.children[6].previousElementSibling.removeAttribute('style');
            alert('It seems like your credit card expired earlier this year, please enter a valid expiration date.');
            errorLog.push('creditCard');
        } else {
            creditCard.children[4].previousElementSibling.removeAttribute('style');
            creditCard.children[6].previousElementSibling.removeAttribute('style');
            removeError('creditCard');
        }
    }
}
/*
*************************************************
FORM VALIDATION
*************************************************
*/

/*
 Cycles through various fields and displays an error message
 when the field is blank or in the default position when the
 submit button is clicked. It removes the error display if the
 fields have been filled out and the submit button is clicked.
 */
function fieldValidation() {
    if(nameField.value == '') {
        errorMessage(nameField,'Oops... it looks like you forgot to enter your name');
    }else{
        removeErrorMessage(nameField);
    }
    if(mailField.value == '') {
        errorMessage(mailField,'Oops... it looks like you forgot to enter your email address');
    }else{
        removeErrorMessage(mailField);
    }
    if(tShirtDesign.selectedIndex == 0){
        errorMessage(document.getElementById('size').parentNode,'Oops... it looks like you forgot to select a t-shirt design');
    }else{
        removeErrorMessage(document.getElementById('size').parentNode);
    }
    if(checkBoxInfo.length == 0){
        errorMessage(registerForActivities.children[1],'Oops... it looks like you forgot register for any activities');
    }else{
        removeErrorMessage(registerForActivities.children[1]);
    }
    if(paymentMethod.value == 'select_method'){
        errorMessage(paymentMethod,'You have not selected a payment method');
    }else{
        removeErrorMessage(paymentMethod);
    }
}

//Creates an error message span.
function errorMessage(element,message) {
    let elementTitle = element.previousElementSibling;
    if (elementTitle.children.length == 0) {
        let elementAlertSpan = document.createElement('Span');
        let elementTitleAlertText = document.createTextNode('(' + message + ')');
        elementAlertSpan.appendChild(elementTitleAlertText);
        elementAlertSpan.className = 'error_alert';
        elementTitle.appendChild(elementAlertSpan);
        errorLog.push(elementTitle);
    }
}

//Removes the error message span.
function removeErrorMessage(element) {
    let elementTitle = element.previousElementSibling;
    let errorMessage = elementTitle.children[0];
    if (elementTitle.children.length != 0) {
        elementTitle.removeChild(errorMessage);
    }
    if (errorLog.length != 0) {
        removeError(elementTitle);
        }
}

//Removes elements from errorLog array.
function removeError(searchItem) {
    for (let i = 0; i < errorLog.length; i++) {
        if (searchItem == errorLog[i]) {
            errorLog.splice(i, 1);
        }
    }
}
/*
Uses a regular expression to validate the email address format and
formats the field and displays an error message in real time until
the format is correct.
*/
function validateEmail() {
    removeErrorMessage(mailField);
    if (mailField.value != '') {
        let mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (mailFormat.test(mailField.value)) {
            mailField.removeAttribute('style');
            removeErrorMessage(mailField);
        } else {
            errorMessage(mailField,'Please enter a valid email address');
            mailField.style.borderColor = "red";
        }
    }
}

/*
*************************************************
INITIALIZING AND SUBMITTING
*************************************************
*/

//Initializing parameters.
let initialize = function() {
    initialize = function(){};
    nameField.focus();
    tShirtColor.appendChild(initialColorOption);
    tShirtDesignNarrowed();
    resetAndHide(0,5,tShirtColor,6);
    hideTotalDollars();
    hidePaymentElements();
};
initialize();
