"use strict"

/*Easier than passing arguments and acceptable in this context*/
const checkBoxes = [
    document.getElementById("trick"),
    document.getElementById("sing"),
    document.getElementById("cute"), ];
const sizeElement = document.getElementById("size");
const daysElement = document.getElementById("days");
const weightElement= document.getElementById("weight");
const boardingFeeElement = document.getElementById("boardingFee");

const totalCostEle = document.getElementById("totalCost");
const boardingCostEle = document.getElementById("boardingCost");
const registrationCostEle = document.getElementById("registrationCost");

const boardingFee = 19.99;

let numberOfEvents = 0;

window.addEventListener("load",         function () {
    document.styleSheets[document.styleSheets.length-1].insertRule('div[id$="Add"]{display:none;}');
    for (let checkBox of checkBoxes){
        checkBox.setAttribute("name", "null");
    }
    init();
    });

function fString(x){
    return x.toFixed(2);
}

function init() {
    let size;
    let weight = weightElement.value;
    /*The fact that checkboxes do not have a native indicator of their state is appalling, but it's a great example of
    * institutional inflexibility's relationship to technological determinism */
    for (let checkBox of checkBoxes) {
        checkBox.addEventListener("click", function (e) {
            /*Unchecked -> checked*/
            if (e.target.name === "null") {
                ++numberOfEvents;
                e.target.setAttribute("name", e.target.id);
                document.getElementById(e.target.id+"Add").style.display = "block";
            }
            /*Checked -> Unchecked*/
            else{
                --numberOfEvents;
                e.target.setAttribute("name",  "null");
                document.getElementById(e.target.id+"Add").style.display = "none";
            }
            totalcosts();
        } );
    }
    weightElement.addEventListener("input", function (){
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

    let days = daysElement.value;
    let cost;
    daysElement.addEventListener("input", function (){
        days = parseInt(daysElement.value,10);
        if(!isNaN(days)){
            daysElement.value = (days);
            cost = days*boardingFee;
            boardingFeeElement.value = fString(cost);
        }else{
            daysElement.value =("0");
            boardingFeeElement.value =("0.00");
        }
        totalcosts();
    });

}

function totalcosts(){
    const costPerEvent = 120;
    let registrationCost = 0;
    let totalCost = 0;
    let boardingCost = parseInt(boardingFeeElement.value);
    if (isNaN(boardingCost)){
        boardingCost = 0;
    }
    registrationCost = (costPerEvent*numberOfEvents)
    totalCost = boardingCost + registrationCost;
    registrationCostEle.value = fString(registrationCost);
    boardingCostEle.value = fString(boardingCost);
    totalCostEle.value = fString(totalCost);
}