"use strict";
/*

   Planisphere Script
   Author: Payton Wilkes
   Date:   03/15/2024

*/
let thisTime = new Date();
let timeString = thisTime.toLocaleString();

document.getElementById("timeStamp").innerHTML = timeString;

let thisHour = thisTime.getHours();
let thisMonth = thisTime.getMonth();
let mapNum = (2*thisMonth +thisHour)%24;

let imgStr = "<img src='/star_dust/images/sd_sky" + mapNum + ".png' alt=''/>";
document.getElementById("planisphere").insertAdjacentHTML('afterbegin', imgStr);