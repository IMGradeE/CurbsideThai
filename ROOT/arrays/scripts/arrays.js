"use strict"

createFamilyTable();

/*Used in part Two*/
let color = [];
color.push("red",  "green",  "purple");
color.splice(0, 0, "brown",  "yellow", "pink");
let colorCount = color.unshift("blue", "orange");

colorList();
pColorList();
notBColorList();
hasNColorList();

/*Used in part Three*/
let arrayOne = ["Hotel", "Alpha", "Zebra", "Tango", "Frog", "Phone"]
let arrayTwo = [7,17,-7,-22,11,8,28,28,-2,18,15,-1,-16,11,-21,-9,-22,-6,-13,1]; /*I generated the numbers here: https://catonmat.net/tools/generate-random-integers*/

displayArray(arrayOne, 0);
displayArray(arrayTwo, 0);
displayArray(arrayOne.sort(), 1);
displayArray(arrayTwo.sort(), 1);
/*displayArray(arrayTwo.sort((a, b) => {return a-b}), 2);
Is the sort compareFn extremely efficient? I don't understand why it exists otherwise.*/
displayArray(mySort(arrayTwo), 2);

/*Used in part Four*/
const lastModified = document.lastModified;
const currentDate = new Date();
populateFooter();

/*Part One*/
function createFamilyTable(){
    const familyMembers = ["Melissa", "Lexie", "Cory", "Jeremy", "Josh", "Jaimee", "Cooper"];
    const familyMemberRelationships = ["Mother", "Sister", "Father", "Brother", "Brother", "Sister", "Nephew"];
    const familyDiv = document.getElementById("family");
    let tableHTML = "<table><tr><th>Name</th><th>Relationship</th></tr>";

    for (let i = 0; i < familyMembers.length;i++){
        tableHTML += "<tr><td>" + familyMembers[i] + "</td><td>" + familyMemberRelationships[i] + "</td></tr>";
    }
    tableHTML+= "</table>";

    familyDiv.innerHTML = tableHTML;
}

/*Part Two*/
function colorList(){
    let colorListHTML = document.getElementById("allColors");

    colorListHTML.innerHTML += "<ul>";
    for (let i = 0; i < colorCount; i++) {
        colorListHTML.innerHTML += "<li>" + color[i] + "</li>";
    }
    colorListHTML.innerHTML += "</ul>";
}
function pColorList(){
    let colorListHTML = document.getElementById("pColors");

    colorListHTML.innerHTML += "<ul>";
    for (let i = 0; i < colorCount; i++) {
        if (color[i][0] === 'p') {
            colorListHTML.innerHTML += "<li>" + color[i] + "</li>";
        }
    }
    colorListHTML.innerHTML += "</ul>";
}
function notBColorList(){
    let colorListHTML = document.getElementById("nonBColors");

    colorListHTML.innerHTML += "<ul>";
    for (let i = 0; i < colorCount; i++) {
        if (color[i][0] !== 'b') {
            colorListHTML.innerHTML += "<li>" + color[i] + "</li>";
        }
    }
    colorListHTML.innerHTML += "</ul>";
}
function hasNColorList(){
    let colorListHTML = document.getElementById("filterColors");

    colorListHTML.innerHTML += "<ul>";
    for (let i = 0; i < colorCount; i++) {
        let temp = color[i];
        for (let j = temp.length-1; j >= 0; j--){
            /*Since n is less common in the beginning of a word iterating back is better.*/
            if (temp[j] === "n") {
                colorListHTML.innerHTML += "<li>" + temp + "</li>";
                break; /*Stops looking after one occurrence.*/
            }
        }
    }
    colorListHTML.innerHTML += "</ul>";
}

/*Part Three*/
function displayArray(array, divNum){
    let divStr = "";
    if(divNum === 0){
        divStr = "twoArrays"
    }else if (divNum === 1){
        divStr = "sortedArrays"
    }else{
        divStr = "sortedNumberArray"
    }
    const divTarget = document.getElementById(divStr);

    divTarget.innerHTML+= "<p>";
    for (let i = 0; i < array.length-1; i++) {
        divTarget.innerHTML+= array[i] + ", ";
    }
    divTarget.innerHTML+= array[array.length-1].toString()+"."+"<p>";
    /*Un-fun oneliner:
     document.getElementById("twoArrays").innerHTML += '<p>'+array.toString()+'.</p>';*/
}
function mySort(array){ /*I don't remember the name of this sort. I think it's quicksort?*/
    for (let i = 0; i < array.length; i++) {
        for (let j = array.length; j > i; j--) {
            if (array[j] <= array[i]){
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
    return array;
}

/*Part Four*/
function populateFooter(){
    for (let i = 0; i < 2; i++) {
        let headingFour = '<h4>';
        if(i === 0){
            headingFour += "Last Modified: " + lastModified;
        }else{
            headingFour +="Current Date: " + currentDate;
        }
        headingFour += '</h4>';
        document.getElementById("dates").innerHTML += headingFour;
    }
}