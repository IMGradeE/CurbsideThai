"use strict"
window.addEventListener("load", init);

function set
function init() {
    const boardingFee = 19.99;
    const sizeElement = document.getElementById("size");
    let size;
    let weightElement= document.getElementById("weight");
    let weight = weightElement.value;

    weightElement.addEventListener("focusout", function (){
        weight = weightElement.value;
        if(!isNaN(weight)){
            if (weight <= 4) {
                size = "mini";
            } else if (weight <= 12) {
                size = "small";
            } else if (weight <= 50) {
                size = "medium";
            } else {
                size = "large";
            }
        }else{
            size = ("");
        }
        sizeElement.value = size;
    });

    let daysElement = document.getElementById("days");
    let boardingFeeElement = document.getElementById("boardingFee");
    let days = daysElement.value;
    let cost;
    daysElement.addEventListener("focusout", function (){
        days = parseInt(daysElement.value,10);
        if(!isNaN(days)){
            daysElement.value = (days);
            cost = days*boardingFee;
            boardingFeeElement.value = cost.toFixed(2);
        }else{
            daysElement.value =("0");
            boardingFeeElement.value =("0.00");
        }
    });
}



function totalcosts(boardingCost){
    let registrationCost = 0;
    let numberOfEvents = 0;
    if (isNaN(boardingCost)) boardingCost = 0;

    /*If the sing checkbox is checked *check below for an example*/
    /*add one to the number of events*/
    /*If the cute checkbox is checked*/
    /*add one to the number of events*/
    /*If the trick checkbox is checked*/
    /*add one to the number of events*/
    /*Compute the registration cost*/
    /*it is 120 * the number of events*/
    /*Compute the total*/
    /*it is the boarding cost + registration cost*/
    /*Display the boarding cost in the boardingCost element*/
    /*specify this value only has two digits after the decimal place*/
    /*Display the registration cost in the registrationCost element*/
    /*specify this value only has two digits after the decimal place*/
    /*Display the total in the totalCost element*/
    /*specify this value only has two digits after the decimal place*/
    /*Now go back to the days of boarding event handler*/
    /*add a call to this update total cost function*/
    /*test it to make sure the totals update as expected*/

}

/*Add checkbox event handlers
* There are three checkboxes. Each is followed by a div containing a fieldset, labels, and input elements. This div is to only be shown when the associated checkbox is checked.*/

/*In css file
* Add a style block for these three divs
Set the display property to none*/

/*Add event handler to the sing checkbox
* Have it respond to the change event
If the checkbox is checked
    set the display to block
If the checkbox is not checked (can just use else)
    set the display to none
add a call to the update total cost function
test it to make sure the totals update as expected*/

/*Add a similar event listener to the cute and trick checkboxes*/