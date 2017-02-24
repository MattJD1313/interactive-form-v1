
//Adding EventListeners for different selection fields.
jobTitle.addEventListener('change',otherTextArea);

tShirtDesign.addEventListener('change',tShirtDesignNarrowed);

registerForActivities.addEventListener('change', function (){
    checkBoxInfoPush();
    totalDollars();
    hideTotalDollars();
    getCheckedIndexInfo();
});

paymentMethod.addEventListener('change', function () {
    hidePaymentElements();
    if(paymentMethod.value == 'select_method'){
        errorMessage(paymentMethod,'You have not selected a payment method');
    }else{
        removeErrorMessage(paymentMethod)
    }
});

mailField.addEventListener('keypress',validateEmail);

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

