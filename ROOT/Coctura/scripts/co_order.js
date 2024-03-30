"use strict";

/*

   Order Form Script
   
   Author: Payton Wilkes
   Date:   30/03/2024
   
   Filename: co_order.js
*/
window.addEventListener("load", function (){
    let orderForm = document.forms.orderForm;
    orderForm.elements.orderDate.value = new Date().toDateString();
    orderForm.elements.model.focus();
    calcOrder();
})
function calcOrder()
{
    /*Calculates the cost of the customer order*/
    let orderForm = document.forms.orderForm;

    let mIndex = orderForm.elements.model.selectedIndex;
    let mCost= orderForm.elements.model.options[mIndex].value;
    let qIndex = orderForm.elements.qty.selectedIndex;
    let quantity = orderForm.elements.qty[qIndex].value;

    let initialCost = mCost*quantity;
    orderForm.elements.initialCost.value = formatUSACurrency(initialCost);

    let pCost = document.querySelector('input[name="protection"]:checked').value*quantity;
    orderForm.elements.protectionCost.value = formatNumber(pCost, 2);

    orderForm.elements.subtotal.value = formatNumber(initialCost + pCost,2);

    let salesTax = 0.05*(initialCost+pCost);
    orderForm.elements.salesTax.value = formatNumber(salesTax, 2);

    let totalCost = initialCost + pCost +salesTax;
    orderForm.elements.totalCost.value = formatUSACurrency(totalCost);

}
function formatNumber(val, decimals)
{
    /*Format a numeric value, val, using the local numeric format to the number of decimal places specified by decimals*/
    return val.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals})
}
function formatUSACurrency(val)
{
    /*Formats val as U.S.A. currency*/
    return val.toLocaleString('en-US', {style: "currency", currency: "USD"});
}

