"use strict";

/*

   Payment Form Script
   
   Author: Payton Wilkes
   Date:   30/03/2024
   
   Filename: co_payment.js
*/
window.addEventListener("load", function () {
    let formData = location.search.slice(1);
    formData = formData.replace(/\+/g," ");
    formData = decodeURIComponent(formData);
    let formFields = formData.split(/[&=]/g);
    document.forms.order.elements.orderDate.value = formFields[1];
    document.forms.order.elements.modelName.value = formFields[5];
    document.forms.order.elements.qty.value = formFields[7];
    document.forms.order.elements.initialCost.value = formFields[9];
    document.forms.order.elements.protectionName.value = formFields[13];
    document.forms.order.elements.protectionCost.value = formFields[15];
    document.forms.order.elements.subtotal.value = formFields[17];
    document.forms.order.elements.salesTax.value = formFields[19];
    document.forms.order.elements.totalCost.value = formFields[21];
});
window.addEventListener("load", function () {
    document.getElementById("subButton").onclick = runSubmit;
    document.getElementById("cardName").oninput = validateName;
    document.getElementById("cardNumber").oninput = validateNumber;
    document.getElementById("expMonth").onchange = validateMonth;
    document.getElementById("expYear").onchange = validateYear;
    document.getElementById("CVC").oninput = validateCVC;
});
function runSubmit() {
    /*Runs validation tests when the submit button is clicked*/
    validateName();
    validateCredit();
    validateNumber();
    validateMonth();
    validateYear();
    validateCVC();
}
function validateCVC() {
    /*Validates the credit card CVC number*/
    let card = document.querySelector('input[name="credit"]:checked').value;
    let cvc = document.getElementById("cvc");
    let cvcAmEx = new RegExp("^\d{3}$"); // <- American Expression
    let cvcRegEx = new RegExp("^\d{4}$"); // <- Regular Expression
    if (cvc.validity.valueMissing){
        cvc.setCustomValidity("Enter the cvc number");
    }else if (card === "amex" && cvcAmEx.test(cvc.value) !== false) {
        cvc.setCustomValidity("Enter a 4-digit cvc number");
    }else if (card !== "amex" && cvcRegEx.test(cvc.value) !== false) {
        cvc.setCustomValidity("Enter a 3-digit cvc number");
    }else{
        cvc.setCustomValidity("");
    }

}
function validateMonth() {
    /*Validates that the user has selected the expiration month of the credit card*/
    let cardMonth = document.getElementById("expMonth");
    if(cardMonth.selectedIndex === 0){
        cardMonth.setCustomValidity("Select the expiration month");
    }else {
        cardMonth.setCustomValidity("");
    }
}
function validateYear() {
    /*Validates that the user has selected the expiration year of the credit card*/
    let cardYear = document.getElementById("expYear");
    if (cardYear.selectedIndex === 0){
        cardYear.setCustomValidity("Select the expiration year");
    }else{
        cardYear.setCustomValidity("");
    }
}
function validateCredit() {
    /*Validates that the user has selected a credit card type*/
    let credit = document.forms.payment.elements.credit[0];
    if(credit.validity.valueMissing){
        credit.setCustomValidity("Select your credit card")
    }else {
        credit.setCustomValidity("")
    }
}
function validateName() {
    /*Validates that the user has specified the name on the credit card*/
    let cardName = document.getElementById("cardName");
    if (cardName.validity.valueMissing) {
        cardName.setCustomValidity("Enter your name as it appears on the card");
    }else{
        cardName.setCustomValidity("");
    }
}
function validateNumber() {
    /*Validates that the user has entered a valid and legitimate card number*/
    let cardNumber = document.getElementById("cardNumber");
    if (cardNumber.validity.valueMissing){
        cardNumber.setCustomValidity("Enter a card number");
    }else if (cardNumber.validity.patternMismatch) {
        cardNumber.setCustomValidity("Enter a valid number");
    }else if (luhn(cardNumber.value) === false) {
        cardNumber.setCustomValidity("Enter a legitimate card number");
    }else{
        cardNumber.setCustomValidity("");
    }
}

function sumDigits(numStr) {
    /*Sums the digits characters in a text string*/
    let sum = 0;
    for (let num of numStr) {
        sum += parseInt(num);
    }
    return sum;
}
function luhn(idNum) {
    /*Returns true of idNum satisfies the Luhn Algorithm*/
    let count = 0;
    let left= "", right = "";
    for (let digit of idNum) {
        if (count % 2 !== 0){
            left += digit;
        }else{
            right += digit;
            right += digit;
        }
        ++count;
    }
    return ((sumDigits(left) + sumDigits(right) % 10) === 0);
}

