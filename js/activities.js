
//Assigning Variables.
const registerForActivities = document.getElementsByClassName('activities')[0];
let checkBoxInfo = [];
let workShopInfo = [];
let total = 0;

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