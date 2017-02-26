
//Assigning Variables.
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
            //Validates length of the credit card number.
        } else if (creditCardNum.value.replace(/\s/g, "").length != 16) {
            creditCard.children[0].firstElementChild.style.color = 'red';
            alert('A valid credit card number has 16 digits, the number you have entered has ' + creditCardNum.value.length + ' digits.');
        } else {
            creditCard.children[0].firstElementChild.removeAttribute('style');
        }
        if (creditCardZip.value.length != 5) {
            creditCard.children[1].firstElementChild.style.color = 'red';
        } else {
            creditCard.children[1].firstElementChild.removeAttribute('style');
        }
        if (creditCardCvv.value == '') {
            creditCard.children[2].firstElementChild.style.color = 'red';
        } else {
            creditCard.children[2].firstElementChild.removeAttribute('style');
        }
        //Validating the expiration date.
        if (parseInt(creditCardExpYear.value) < parseInt(today[0])) {
            creditCard.children[4].previousElementSibling.style.color = 'red';
            creditCard.children[6].previousElementSibling.style.color = 'red';
            alert('It seems like your credit card expired in ' + creditCardExpYear.value + ' , please enter a valid expiration date.')
        } else if (parseInt(creditCardExpYear.value) == parseInt(today[0]) && parseInt(creditCardExpMonth.value) < parseInt(today[1])) {
            creditCard.children[4].previousElementSibling.style.color = 'red';
            creditCard.children[6].previousElementSibling.removeAttribute('style');
            alert('It seems like your credit card expired earlier this year, please enter a valid expiration date.')
        } else {
            creditCard.children[4].previousElementSibling.removeAttribute('style');
            creditCard.children[6].previousElementSibling.removeAttribute('style');
        }
    }
}