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
    }
}

//Removes the error message span.
function removeErrorMessage(element) {
    let elementTitle = element.previousElementSibling;
    let errorMessage = elementTitle.children[0];
    if (elementTitle.children.length != 0) {
        elementTitle.removeChild(errorMessage);
    }
}

//Adds click event to trigger validation.
function button(){
    let button = document.getElementsByTagName('button');
    for (let i = 0; i < button.length ; i++){
        button[i].addEventListener('click',function(event){
            event.preventDefault();
            fieldValidation();
            creditCardValidation();
        });
    }
}
button();

/*
Uses a regular expression to validate the email address format and
formats the field and displays an error message in real time until
the format is correct.
*/
function validateEmail() {
    removeErrorMessage(mailField);
    if (mailField.value != '') {
        let mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(mailFormat.test(mailField.value));
         if (mailFormat.test(mailField.value)) {
         mailField.removeAttribute('style');
         removeErrorMessage(mailField);
         } else {
         errorMessage(mailField,'Please enter a valid email address');
         mailField.style.borderColor = "red";
         }
    }
}